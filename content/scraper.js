// Comment Exporter — content script.
// Loaded on Facebook pages (and re-injected by the popup if missing). It expands
// the comment thread, reads the comments from the DOM, and downloads them.
// Exposes window.__fbce = { run, analyze, exportFile, stop, isRunning, util }.
(() => {
  if (window.__fbce) return;

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();
  const textOf = (el) => clean(el?.textContent);

  // Buttons that load more comments / replies (English + Arabic).
  const EXPAND = [
    /^view (\d[\d,.]*\s*)?(more|previous) (comments?|replies|repl(y|ies))/i,
    /^view all \d[\d,.]*\s*(replies|comments)/i,
    /^view \d[\d,.]*\s*(more )?repl(y|ies)/i,
    /^(see|show) (\d[\d,.]*\s*)?more (comments?|replies)/i,
    /^\d[\d,.]*\s*(more )?repl(y|ies)$/i,
    /^.{0,40} replied\s*·\s*\d+ repl(y|ies)$/i,
    /^(عرض|مشاهدة|شاهد).{0,30}(تعليق|تعليقات|التعليقات|رد|ردود|الردود|ردًا)/,
    /^[\d٠-٩]+\s*(رد|ردود|ردًا|الردود)$/,
  ];
  // "See more" inside a truncated comment.
  const SEE_MORE = [/^see more$/i, /^عرض المزيد$/, /^المزيد$/, /^قراءة المزيد$/];
  const REPLY_WORD = /repl|رد/i;
  const HIDE = /hide|إخفاء|اخفاء|masquer|ocultar|ausblenden/i;
  const SORT_BUTTON =
    /^(most relevant|newest|top comments|all comments|الأكثر صلة|الأحدث|أهم التعليقات|كل التعليقات|جميع التعليقات)$/i;
  const ALL_COMMENTS = /^(all comments|كل التعليقات|جميع التعليقات)/i;
  const REACTION_LABEL = /react|تفاعل|réaction|reacci|reaç|reakt|reazion/i;

  let running = false;
  let stopRequested = false;

  // ---------- helpers ----------

  function normDigits(s) {
    return String(s)
      .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
      .replace(/٫/g, '.')
      .replace(/٬/g, ',');
  }

  // "12" -> 12, "1,234" -> 1234, "1.2K" -> 1200, "٣ ألف" -> 3000
  function parseCount(s) {
    if (!s) return 0;
    const m = normDigits(s).match(/(\d+(?:[.,]\d+)*)\s*(K|M|ألف|مليون)?/i);
    if (!m) return 0;
    const [, num, suffix] = m;
    if (!suffix) return parseInt(num.replace(/[.,]/g, ''), 10) || 0;
    let n = parseFloat(num.replace(',', '.'));
    if (/^(k|ألف)$/i.test(suffix)) n *= 1e3;
    else n *= 1e6;
    return Math.round(n);
  }

  function idsFromHref(href) {
    try {
      const u = new URL(href, location.href);
      const c = u.searchParams.get('comment_id');
      const r = u.searchParams.get('reply_comment_id');
      if (!c) return {};
      return { id: r || c, parentId: r ? c : null };
    } catch {
      return {};
    }
  }

  function cleanProfile(href) {
    try {
      const u = new URL(href, location.href);
      if (u.pathname === '/profile.php') {
        const id = u.searchParams.get('id');
        return { url: `${u.origin}/profile.php?id=${id}`, userId: id };
      }
      const m = u.pathname.match(/\/user\/(\d+)/);
      return { url: u.origin + u.pathname.replace(/\/$/, ''), userId: m ? m[1] : null };
    } catch {
      return { url: href, userId: null };
    }
  }

  // Elements matching `sel` that belong to `article` itself, not to a nested article.
  function own(article, sel) {
    return [...article.querySelectorAll(sel)].filter(
      (el) => el.closest('[role="article"]') === article
    );
  }

  // The post dialog if one is open, otherwise the main column.
  function findScope() {
    const dialogs = [...document.querySelectorAll('[role="dialog"]')].filter((d) =>
      d.querySelector('a[href*="comment_id="]')
    );
    if (dialogs.length) return dialogs[dialogs.length - 1];
    return document.querySelector('[role="main"]') || document.body;
  }

  function countFound(scope) {
    const ids = new Set();
    for (const a of scope.querySelectorAll('a[href*="comment_id="]')) {
      const { id } = idsFromHref(a.getAttribute('href'));
      if (id) ids.add(id);
    }
    return ids.size;
  }

  // ---------- expanding ----------

  function findExpandButtons(scope, clicks, opts) {
    return [...scope.querySelectorAll('[role="button"]')].filter((el) => {
      if (!el.isConnected || (clicks.get(el) || 0) >= 5) return false;
      const t = textOf(el);
      if (!t || t.length > 80 || HIDE.test(t)) return false;
      if (opts.expandText && SEE_MORE.some((r) => r.test(t))) return true;
      if (!EXPAND.some((r) => r.test(t))) return false;
      // "View more comments" is always wanted; reply expanders only if replies are.
      return opts.includeReplies || !REPLY_WORD.test(t) || /comment|تعليق/i.test(t);
    });
  }

  function isScroller(el) {
    const oy = getComputedStyle(el).overflowY;
    return /auto|scroll|overlay/.test(oy) && el.scrollHeight > el.clientHeight;
  }

  // Scroll the box the comments live in, so Facebook loads more. That box
  // can be inside the dialog or the layer wrapping it, so look at every
  // ancestor. The page itself is never scrolled while a dialog is involved.
  // `covered` = a dialog opened over the page during this run.
  function scrollDown(scope, covered = false) {
    const arts = scope.querySelectorAll('[role="article"]');
    const last = arts[arts.length - 1] || scope;
    const page = document.scrollingElement || document.documentElement;
    for (let el = last.parentElement; el && el !== document.body && el !== page; el = el.parentElement) {
      if (isScroller(el)) {
        el.scrollTop = el.scrollHeight;
        return;
      }
    }
    const inDialog = !!scope.closest('[role="dialog"]');
    if (covered && !inDialog) return;
    if (!last.scrollIntoView) return;
    // No scroller found: let the browser find it, then put the page back.
    const x = window.scrollX;
    const y = window.scrollY;
    last.scrollIntoView({ block: 'end' });
    if (inDialog && (window.scrollX !== x || window.scrollY !== y)) window.scrollTo(x, y);
  }

  async function selectAllComments(scope, report) {
    const btn = [...scope.querySelectorAll('[role="button"]')].find((el) =>
      SORT_BUTTON.test(textOf(el))
    );
    if (!btn || ALL_COMMENTS.test(textOf(btn))) return;
    report({ phase: 'sorting' });
    btn.click();
    await sleep(800);
    const item = [...document.querySelectorAll('[role="menuitem"], [role="menuitemradio"]')].find(
      (el) => ALL_COMMENTS.test(textOf(el))
    );
    if (item) {
      item.click();
      await sleep(2000);
    } else {
      document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    }
  }

  const visibleDialogs = () =>
    [...document.querySelectorAll('[role="dialog"]')].filter((d) => d.getClientRects?.().length !== 0);

  // ctx.scope can change mid-run: when Facebook opens the post in a dialog,
  // opts.rescope(scope) returns that dialog and we carry on there.
  async function expandAll(ctx, opts, report) {
    const clicks = new WeakMap();
    const startDialogs = new Set(visibleDialogs());
    let idle = 0;
    let lastFound = -1;
    for (let round = 0; round < opts.maxRounds && !stopRequested; round++) {
      const next = opts.rescope?.(ctx.scope);
      if (next && next !== ctx.scope) {
        ctx.scope = next;
        idle = 0;
        if (opts.sortAll) await selectAllComments(next, report);
      }
      const scope = ctx.scope;
      const found = countFound(scope);
      report({ phase: 'expanding', found });
      // Scrolling that still loads comments is progress, not idling.
      if (found > lastFound) idle = 0;
      lastFound = found;
      if (opts.maxComments && found >= opts.maxComments) break;

      const buttons = findExpandButtons(scope, clicks, opts);
      if (!buttons.length) {
        if (++idle >= 3) break;
        const covered = !scope.closest('[role="dialog"]') && visibleDialogs().some((d) => !startDialogs.has(d));
        scrollDown(scope, covered);
        await sleep(opts.delay);
        continue;
      }
      idle = 0;
      for (const b of buttons) {
        if (stopRequested) break;
        clicks.set(b, (clicks.get(b) || 0) + 1);
        b.click();
        await sleep(250);
      }
      await sleep(opts.delay);
    }
  }

  // ---------- parsing ----------

  function bodyText(article, authorAnchor) {
    let cands = own(article, 'div[dir="auto"]').filter((el) =>
      /text-align/.test(el.getAttribute('style') || '')
    );
    if (!cands.length) {
      cands = own(article, '[dir="auto"]').filter(
        (el) => !el.closest('a') && !el.closest('[role="button"]')
      );
    }
    cands = cands.filter((el) => !(authorAnchor && authorAnchor.contains(el)));
    // Keep outermost elements only, so nested dir="auto" spans aren't duplicated.
    const set = new Set(cands);
    const top = cands.filter((el) => {
      for (let p = el.parentElement; p && p !== article; p = p.parentElement) {
        if (set.has(p)) return false;
      }
      return true;
    });
    const text = top
      .map((el) => (el.innerText ?? el.textContent ?? '').trim())
      .filter(Boolean)
      .join('\n');
    // Tagged people: profile links inside the body (not hashtags or outside links).
    const tagged = new Set();
    for (const el of top) {
      for (const a of el.querySelectorAll('a[href]')) {
        const href = a.getAttribute('href') || '';
        if (!textOf(a) || /\/hashtag\/|l\.facebook\.com|comment_id=/.test(href)) continue;
        let u;
        try {
          u = new URL(href, location.href);
        } catch {
          continue;
        }
        if (!/(^|\.)facebook\.com$/.test(u.hostname)) continue;
        tagged.add(cleanProfile(u.href).url);
      }
    }
    return { text, mentions: tagged.size };
  }

  function reactionCount(article) {
    for (const el of own(article, '[aria-label]')) {
      const label = el.getAttribute('aria-label');
      if (REACTION_LABEL.test(label) && /[\d٠-٩]/.test(label)) return parseCount(label);
    }
    return 0;
  }

  function parseComments(scope) {
    const byId = new Map();
    for (const article of scope.querySelectorAll('[role="article"]')) {
      const idLinks = own(article, 'a[href*="comment_id="]');
      if (!idLinks.length) continue;
      const { id, parentId } = idsFromHref(idLinks[0].getAttribute('href'));
      if (!id || byId.has(id)) continue;

      const authorAnchor = own(article, 'a[href]').find((a) => textOf(a));
      const author = textOf(authorAnchor);
      const profile = authorAnchor ? cleanProfile(authorAnchor.getAttribute('href')) : {};
      const timeLink = [...idLinks]
        .reverse()
        .find((a) => a !== authorAnchor && textOf(a) && textOf(a).length <= 25);

      const body = bodyText(article, authorAnchor);
      byId.set(id, {
        id,
        parentId,
        type: parentId ? 'reply' : 'comment',
        author,
        authorUrl: profile.url || '',
        authorId: profile.userId || '',
        text: body.text,
        mentions: body.mentions,
        reactions: reactionCount(article),
        replies: 0,
        time: timeLink ? textOf(timeLink) : '',
        permalink: (timeLink || idLinks[0]).href,
      });
    }
    const comments = [...byId.values()];
    for (const c of comments) {
      if (c.parentId && byId.has(c.parentId)) byId.get(c.parentId).replies++;
    }
    return comments;
  }

  // ---------- output ----------

  const CSV_COLUMNS = [
    'id', 'parentId', 'type', 'author', 'authorUrl', 'authorId',
    'text', 'mentions', 'reactions', 'replies', 'time', 'permalink',
  ];

  function toCSV(rows, columns = CSV_COLUMNS) {
    const esc = (v) => {
      let s = v == null ? '' : String(v);
      if (/^[=+\-@\t\r]/.test(s)) s = "'" + s; // block spreadsheet formula injection
      return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const lines = [columns.join(',')];
    for (const r of rows) lines.push(columns.map((c) => esc(r[c])).join(','));
    return '﻿' + lines.join('\r\n'); // BOM so Excel reads Arabic correctly
  }

  // Words that say nothing about the topic (English + Arabic, incl. common dialect).
  const STOP_WORDS = new Set(
    (
      'the and for you that this with are was were have has had not but all can just your what they them its from our out will his her him she get got like him who how why when there here been more very also any one about into than then too only some would could should their which over really dont im ive its thats '
      + 'من في على الى إلى عن ان أن إن او أو و يا ما لا لم لن مع كان كانت كل قد هو هي هم انا أنا انت أنت انتي نحن هذا هذه ذلك تلك التي الذي الذين ثم بس شي شو ده دي دا دى كده كدا عشان علي لي له لها بعد قبل عند حتى اذا إذا لو مش مو ليس كما اللي الي فيه فيها منه منها عليه عليها ايه انو انه أنه إنه وين هنا هناك بين غير كمان برضو ياخ زي'
    )
      .split(/\s+/)
      .map((w) => normWord(w))
  );

  // Lowercase, drop Arabic diacritics/tatweel, unify alef forms.
  function normWord(w) {
    return w
      .toLowerCase()
      .replace(/[\u064B-\u0652\u0670\u0640]/g, '')
      .replace(/[أإآ]/g, 'ا')
      .replace(/[’']/g, '');
  }

  function topWords(comments, limit = 15) {
    const counts = new Map();
    for (const c of comments) {
      const text = c.text.replace(/https?:\/\/\S+/g, ' ');
      const seen = new Set(); // count each word once per comment
      for (const raw of text.match(/[\p{L}\p{N}_]+/gu) || []) {
        const w = normWord(raw);
        if (w.length < 2 || /^[\d٠-٩_]+$/.test(w) || STOP_WORDS.has(w) || seen.has(w)) continue;
        seen.add(w);
        counts.set(w, (counts.get(w) || 0) + 1);
      }
    }
    return [...counts]
      .filter(([, n]) => n > 1)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([word, count]) => ({ word, count }));
  }

  function topEmojis(comments, limit = 10) {
    const counts = new Map();
    for (const c of comments) {
      for (const e of c.text.match(/\p{Extended_Pictographic}/gu) || []) {
        counts.set(e, (counts.get(e) || 0) + 1);
      }
    }
    return [...counts]
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([emoji, count]) => ({ emoji, count }));
  }

  const brief = (c) => ({
    author: c.author,
    text: c.text.length > 120 ? c.text.slice(0, 117) + '…' : c.text,
    reactions: c.reactions,
    replies: c.replies,
    permalink: c.permalink,
  });

  function summarize(comments) {
    const authors = new Map();
    for (const c of comments) {
      const key = c.authorUrl || c.author;
      if (!key) continue;
      const a = authors.get(key) || { author: c.author, authorUrl: c.authorUrl, comments: 0, reactions: 0 };
      a.comments++;
      a.reactions += c.reactions;
      authors.set(key, a);
    }
    const totalReactions = comments.reduce((s, c) => s + c.reactions, 0);
    return {
      total: comments.length,
      topLevel: comments.filter((c) => !c.parentId).length,
      replies: comments.filter((c) => c.parentId).length,
      uniqueAuthors: authors.size,
      totalReactions,
      avgReactions: comments.length ? Math.round((totalReactions / comments.length) * 10) / 10 : 0,
      topCommenters: [...authors.values()]
        .sort((a, b) => b.comments - a.comments || b.reactions - a.reactions)
        .slice(0, 10),
      topComments: [...comments]
        .filter((c) => c.reactions > 0)
        .sort((a, b) => b.reactions - a.reactions)
        .slice(0, 5)
        .map(brief),
      mostReplied: [...comments]
        .filter((c) => c.replies > 0)
        .sort((a, b) => b.replies - a.replies)
        .slice(0, 5)
        .map(brief),
      topWords: topWords(comments),
      topEmojis: topEmojis(comments),
    };
  }

  function download(filename, content, mime) {
    const url = URL.createObjectURL(new Blob([content], { type: mime }));
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }

  function fileBase(href = location.href) {
    const u = new URL(href, location.href);
    const id =
      u.searchParams.get('story_fbid') ||
      u.searchParams.get('v') ||
      u.searchParams.get('fbid') ||
      (u.pathname.match(/\/(?:posts|videos|reel|permalink)\/([\w-]+)/) || [])[1] ||
      'post';
    const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
    return `comments-${id}-${stamp}`;
  }

  function report(p) {
    try {
      globalThis.chrome?.runtime?.sendMessage?.({ type: 'fbce-progress', ...p })?.catch?.(() => {});
    } catch {
      /* popup closed */
    }
  }

  // ---------- giveaway draw ----------

  // Uniform random integer in [0, n), from the browser's cryptographic RNG.
  function randomInt(n) {
    const max = Math.floor(0x100000000 / n) * n; // reject the biased tail
    const buf = new Uint32Array(1);
    do globalThis.crypto.getRandomValues(buf);
    while (buf[0] >= max);
    return buf[0] % n;
  }

  const normText = (s) => normWord(String(s || '')).replace(/\s+/g, ' ').trim();
  const personKey = (c) => c.authorUrl || c.author;

  // Why `c` can't enter the draw, or null if it can.
  function rejectReason(c, rules) {
    if (rules.topLevelOnly && c.parentId) return 'reply';
    const name = normText(c.author);
    if (rules.exclude.some((x) => x && (name === x || normText(c.authorUrl) === x))) return 'excluded';
    if (rules.keywords.length) {
      const text = normText(c.text);
      const hit = (k) => text.includes(k);
      if (rules.keywordMode === 'all' ? !rules.keywords.every(hit) : !rules.keywords.some(hit)) return 'keyword';
    }
    if ((c.mentions || 0) < rules.minMentions) return 'mentions';
    if ((c.text.match(/[\p{L}\p{N}]+/gu) || []).length < rules.minWords) return 'length';
    return null;
  }

  // Pick winners at random among the comments that meet the rules.
  // A person never wins twice. With onePerPerson, each person has one entry;
  // otherwise each qualifying comment is one entry (more comments, more chances).
  function drawWinners(comments, rawRules = {}, rand = randomInt) {
    const list = (v) =>
      (Array.isArray(v) ? v : String(v || '').split(/[\n,،]+/)).map(normText).filter(Boolean);
    const rules = {
      winners: 1,
      backups: 0,
      keywordMode: 'any',
      minMentions: 0,
      minWords: 0,
      topLevelOnly: false,
      onePerPerson: true,
      ...rawRules,
    };
    rules.keywords = list(rawRules.keywords);
    rules.exclude = list(rawRules.exclude);
    for (const k of ['winners', 'backups', 'minMentions', 'minWords']) rules[k] = Math.max(0, parseInt(rules[k], 10) || 0);

    const rejected = { reply: 0, excluded: 0, keyword: 0, mentions: 0, length: 0, duplicate: 0 };
    const entries = [];
    const people = new Set();
    for (const c of comments) {
      const key = personKey(c);
      if (!key) continue;
      const why = rejectReason(c, rules);
      if (why) {
        rejected[why]++;
        continue;
      }
      if (rules.onePerPerson && people.has(key)) {
        rejected.duplicate++;
        continue;
      }
      people.add(key);
      entries.push(c);
    }

    // Fisher–Yates shuffle, then take people in order, skipping repeat winners.
    const pool = [...entries];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = rand(i + 1);
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const chosen = [];
    const seen = new Set();
    for (const c of pool) {
      if (chosen.length >= rules.winners + rules.backups) break;
      if (seen.has(personKey(c))) continue;
      seen.add(personKey(c));
      chosen.push(c);
    }
    return {
      drawnAt: new Date().toISOString(),
      rules,
      total: comments.length,
      entries: entries.length,
      people: people.size,
      rejected,
      eligibleComments: entries,
      winners: chosen.slice(0, rules.winners),
      backups: chosen.slice(rules.winners),
    };
  }

  function saveCSV(filename, rows, columns) {
    download(filename, toCSV(rows, columns), 'text/csv;charset=utf-8');
  }

  // ---------- entry points ----------

  const DEFAULTS = {
    format: 'csv', // csv | json | both
    includeReplies: true,
    expandText: true,
    sortAll: true,
    maxComments: 0, // 0 = no limit
    maxRounds: 400,
    delay: 1200,
  };

  // Expand and read the comments inside `scope` (default: the post dialog or main column).
  // Does not download anything. onProgress gets { phase, found }.
  async function analyze(scope, options = {}, onProgress = () => {}) {
    if (running) return { ok: false, error: 'already-running' };
    running = true;
    stopRequested = false;
    const opts = { ...DEFAULTS, ...options };
    try {
      const ctx = { scope: scope || findScope() };
      if (opts.sortAll) await selectAllComments(ctx.scope, onProgress);
      await expandAll(ctx, opts, onProgress);

      let comments = parseComments(ctx.scope);
      if (!opts.includeReplies) comments = comments.filter((c) => !c.parentId);
      if (opts.maxComments) comments = comments.slice(0, opts.maxComments);
      if (!comments.length) throw new Error('no-comments');
      return { ok: true, comments, summary: summarize(comments), stopped: stopRequested };
    } catch (e) {
      return { ok: false, error: e.message };
    } finally {
      running = false;
    }
  }

  function exportFile(comments, summary, format = 'csv', source = location.href) {
    const base = fileBase(source);
    if (format !== 'json') download(`${base}.csv`, toCSV(comments), 'text/csv;charset=utf-8');
    if (format !== 'csv') {
      const json = { source, exportedAt: new Date().toISOString(), summary, comments };
      download(`${base}.json`, JSON.stringify(json, null, 2), 'application/json');
    }
  }

  // Popup entry point: analyze the open post and download the file(s).
  async function run(options = {}) {
    const opts = { ...DEFAULTS, ...options };
    const res = await analyze(null, opts, report);
    if (!res.ok) {
      if (res.error !== 'already-running') report({ phase: 'error', error: res.error });
      return res;
    }
    exportFile(res.comments, res.summary, opts.format);
    const result = { ok: true, summary: res.summary, stopped: res.stopped, source: location.href };
    try {
      await globalThis.chrome?.storage?.local?.set({ lastResult: result });
    } catch {
      /* storage unavailable */
    }
    report({ phase: 'done', ...result });
    return result;
  }

  window.__fbce = {
    run,
    analyze,
    exportFile,
    drawWinners,
    saveCSV,
    fileBase,
    stop: () => {
      stopRequested = true;
    },
    isRunning: () => running,
    util: { countFound, findScope, parseCount, textOf, idsFromHref },
    _test: { parseComments, parseCount, toCSV, summarize, findScope, drawWinners },
  };
})();
