// Comment Exporter — per-post tools.
// Loaded on every Facebook page after scraper.js. It finds the posts on the
// page (feed, groups, a post's own page, the comments dialog), adds a toolbar
// to each one, and shows the comment analysis and the giveaway draw in a
// panel under it. The UI lives in shadow roots so Facebook's CSS can't touch
// it and the scraper (which reads the light DOM) never sees it.
(() => {
  if (window.__fbcePostTools) return;
  window.__fbcePostTools = true;
  const api = window.__fbce;
  if (!api) return;
  const { countFound, findScope, parseCount, textOf } = api.util;

  // ---------- strings ----------

  const STRINGS = {
    en: {
      brand: 'Comment tools',
      analyze: 'Analyze comments',
      analyzing: 'Analyzing…',
      draw: 'Pick winners',
      exportAs: 'Export',
      csv: 'CSV',
      json: 'JSON',
      refresh: 'Analyze again',
      close: 'Close',
      title: 'Comment analysis',
      tabOverview: 'Overview',
      tabPeople: 'People',
      tabComments: 'Comments',
      tabWords: 'Words',
      tabDraw: 'Giveaway',
      starting: 'Starting…',
      opening: 'Opening comments…',
      sorting: 'Switching to "All comments"…',
      progressOf: '{n} of ~{total} comments',
      progressFound: '{n} comments loaded',
      cancel: 'Cancel',
      stop: 'Stop and show loaded',
      cancelled: 'Analysis cancelled.',
      stopped: 'Stopped early. Showing the {n} comments loaded so far.',
      'no-comments': 'No comments found for this post. Open its comments and try again.',
      'already-running': 'Another analysis is running. Wait for it to finish or cancel it.',
      coverage: 'of the comments loaded',
      coverageOf: '{n} of {total} by Facebook\'s count',
      loadedOnly: 'comments loaded',
      postReactions: 'Reactions',
      postComments: 'Comments',
      postShares: 'Shares',
      comments: 'Comments',
      replies: 'Replies',
      people: 'People',
      reactions: 'Reactions on comments',
      avgReactions: 'Avg. reactions per comment',
      replyRate: 'Replies share',
      topCommenters: 'Most active people',
      topComments: 'Most reacted comments',
      mostReplied: 'Most replied comments',
      topWords: 'Most used words',
      topEmojis: 'Most used emojis',
      commentsUnit: 'comments',
      reactionsUnit: 'reactions',
      repliesUnit: 'replies',
      none: 'Nothing to show yet.',
      noData: 'Press "Analyze comments" to load this post\'s comments.',
      drawTitle: 'Giveaway draw',
      drawIntro: 'Winners are picked at random from the comments that meet every condition.',
      secWinners: 'Winners',
      secRules: 'Conditions',
      secExclude: 'Exclusions',
      winnersCount: 'Number of winners',
      backupsCount: 'Backup winners',
      keywords: 'Comment must contain',
      keywordsHint: 'Separate words with commas, e.g. #contest, done',
      anyWord: 'any of the words',
      allWords: 'all of the words',
      minMentions: 'Tagged friends, at least',
      minWords: 'Words in comment, at least',
      topLevelOnly: 'Comments only, not replies',
      onePerPerson: 'One entry per person',
      excludeAuthor: 'Exclude the post author ({name})',
      exclude: 'Exclude these people',
      excludeHint: 'A name or profile link on each line',
      doDraw: 'Draw winners',
      redraw: 'Draw again',
      copy: 'Copy result',
      copied: 'Copied',
      winnersCsv: 'Winners CSV',
      entriesCsv: 'Eligible CSV',
      winners: 'Winners',
      backups: 'Backups',
      eligible: '{e} eligible entries from {p} people, out of {t} comments',
      noEligible: 'No comment meets these conditions. Loosen a condition and draw again.',
      fewer: 'Only {n} people qualify, fewer than the number of winners you asked for.',
      drawnAt: 'Drawn {time}',
      rej_reply: 'Replies',
      rej_excluded: 'Excluded',
      rej_keyword: 'Missing words',
      rej_mentions: 'Too few tags',
      rej_length: 'Too short',
      rej_duplicate: 'Repeat entries',
      rejectedTitle: 'Not eligible',
      viewComment: 'View comment',
    },
    ar: {
      brand: 'أدوات التعليقات',
      analyze: 'تحليل التعليقات',
      analyzing: 'جارٍ التحليل…',
      draw: 'سحب الفائزين',
      exportAs: 'تصدير',
      csv: 'CSV',
      json: 'JSON',
      refresh: 'إعادة التحليل',
      close: 'إغلاق',
      title: 'تحليل التعليقات',
      tabOverview: 'نظرة عامة',
      tabPeople: 'الأشخاص',
      tabComments: 'التعليقات',
      tabWords: 'الكلمات',
      tabDraw: 'السحب',
      starting: 'جارٍ البدء…',
      opening: 'جارٍ فتح التعليقات…',
      sorting: 'جارٍ التبديل إلى "كل التعليقات"…',
      progressOf: '{n} من ~{total} تعليق',
      progressFound: 'حُمّل {n} تعليق',
      cancel: 'إلغاء',
      stop: 'إيقاف وعرض ما حُمّل',
      cancelled: 'تم إلغاء التحليل.',
      stopped: 'أُوقف التحميل. يعرض {n} تعليق حُمّلت حتى الآن.',
      'no-comments': 'لم يتم العثور على تعليقات لهذا المنشور. افتح التعليقات وحاول مجددًا.',
      'already-running': 'يوجد تحليل آخر قيد التشغيل. انتظر حتى ينتهي أو ألغِه.',
      coverage: 'من التعليقات تم تحميلها',
      coverageOf: '{n} من {total} حسب عدّاد فيسبوك',
      loadedOnly: 'تعليق تم تحميله',
      postReactions: 'التفاعلات',
      postComments: 'التعليقات',
      postShares: 'المشاركات',
      comments: 'التعليقات',
      replies: 'الردود',
      people: 'أشخاص',
      reactions: 'تفاعلات التعليقات',
      avgReactions: 'متوسط التفاعل للتعليق',
      replyRate: 'نسبة الردود',
      topCommenters: 'الأكثر نشاطًا',
      topComments: 'أكثر التعليقات تفاعلاً',
      mostReplied: 'أكثر التعليقات ردودًا',
      topWords: 'أكثر الكلمات تكرارًا',
      topEmojis: 'أكثر الإيموجي استخدامًا',
      commentsUnit: 'تعليق',
      reactionsUnit: 'تفاعل',
      repliesUnit: 'رد',
      none: 'لا يوجد ما يُعرض بعد.',
      noData: 'اضغط "تحليل التعليقات" لتحميل تعليقات هذا المنشور.',
      drawTitle: 'السحب على الفائزين',
      drawIntro: 'يُختار الفائزون عشوائيًا من التعليقات التي تحقق كل الشروط.',
      secWinners: 'الفائزون',
      secRules: 'الشروط',
      secExclude: 'الاستبعاد',
      winnersCount: 'عدد الفائزين',
      backupsCount: 'فائزون احتياطيون',
      keywords: 'التعليق لازم يحتوي على',
      keywordsHint: 'افصل الكلمات بفاصلة، مثل: #مسابقة، تم',
      anyWord: 'أي كلمة منها',
      allWords: 'كل الكلمات',
      minMentions: 'منشن لأصدقاء، على الأقل',
      minWords: 'كلمات في التعليق، على الأقل',
      topLevelOnly: 'التعليقات فقط بدون الردود',
      onePerPerson: 'فرصة واحدة لكل شخص',
      excludeAuthor: 'استبعاد صاحب المنشور ({name})',
      exclude: 'استبعاد أشخاص',
      excludeHint: 'اسم أو رابط حساب في كل سطر',
      doDraw: 'اسحب الفائزين',
      redraw: 'سحب جديد',
      copy: 'نسخ النتيجة',
      copied: 'تم النسخ',
      winnersCsv: 'CSV الفائزين',
      entriesCsv: 'CSV المؤهلين',
      winners: 'الفائزون',
      backups: 'الاحتياطي',
      eligible: '{e} مشاركة مؤهلة من {p} شخص، من أصل {t} تعليق',
      noEligible: 'لا يوجد تعليق يحقق هذه الشروط. خفّف أحد الشروط واسحب مجددًا.',
      fewer: 'المؤهلون {n} أشخاص فقط، أقل من عدد الفائزين المطلوب.',
      drawnAt: 'وقت السحب {time}',
      rej_reply: 'ردود',
      rej_excluded: 'مستبعدون',
      rej_keyword: 'بدون الكلمات المطلوبة',
      rej_mentions: 'منشن أقل من المطلوب',
      rej_length: 'قصيرة',
      rej_duplicate: 'مشاركات مكررة',
      rejectedTitle: 'غير مؤهل',
      viewComment: 'عرض التعليق',
    },
  };
  const AR = /^ar/i.test(document.documentElement.lang || navigator.language || '');
  const t = (key, vars = {}) =>
    (STRINGS[AR ? 'ar' : 'en'][key] ?? STRINGS.en[key] ?? key).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
  const fmt = (n) => Number(n || 0).toLocaleString();
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const reducedMotion = () => globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  // ---------- finding posts ----------

  const COMMENT_LINK = 'a[href*="comment_id="]';
  const POST_LINK = /\/(posts|permalink|videos|reel|photos?)\/|story_fbid=|[?&]fbid=|\/watch\/?\?v=/;
  const COMMENTS_COUNT = /^([\d٠-٩][\d٠-٩.,]*\s*(K|M|ألف|مليون)?)\s*(comments?|تعليقات?|تعليقًا)$/i;
  const SHARES_COUNT = /^([\d٠-٩][\d٠-٩.,]*\s*(K|M|ألف|مليون)?)\s*(shares?|مشاركات?|مشاركة)$/i;
  const ALL_REACTIONS = /^(all reactions|كل التفاعلات|جميع التفاعلات):?\s*([\d٠-٩].*)$/i;
  // Newer layout: the action buttons show bare numbers ("٢٢٩") and carry the
  // meaning in aria-label: "Comment on X's post, ٢٢٩ comments".
  const COMMENTS_LABEL = /([\d٠-٩][\d٠-٩.,٬٫]*\s*(K|M|ألف|مليون)?)\s*(comments?|تعليقات?|تعليقًا)\s*$/i;
  const SHARES_LABEL = /([\d٠-٩][\d٠-٩.,٬٫]*\s*(K|M|ألف|مليون)?)\s*(shares?|مشاركات?|مشاركة)\s*$/i;
  const REACT_LABEL = /^(react with|react to|تفاعل)/i;
  const BARE_NUMBER = /^[\d٠-٩][\d٠-٩.,٬٫]*\s*(K|M|ألف|مليون)?$/i;
  const label = (el) => el.getAttribute?.('aria-label') || '';
  const isCommentsCount = (el) => COMMENTS_COUNT.test(textOf(el)) || COMMENTS_LABEL.test(label(el));
  const CLOSE_LABEL = /^(close|إغلاق|اغلاق)$/i;
  // Messenger: the inbox pages, and chat windows / message lists on any page.
  const CHAT_PATH = /^\/(messages|t)\//;
  const CHAT_CONTAINER = [
    '[role="grid"]', '[role="row"]', '[role="gridcell"]', '[role="log"]', '[role="complementary"]',
    '[aria-label*="Chat" i]', '[aria-label*="Messenger" i]', '[aria-label*="conversation" i]',
    '[aria-label*="دردشة"]', '[aria-label*="محادثة"]', '[aria-label*="ماسنجر"]', '[aria-label*="الرسائل"]',
  ].join(',');

  // Elements of `post` that are not inside one of its comments.
  function ownPost(post, sel) {
    return [...post.querySelectorAll(sel)].filter((el) => {
      const a = el.closest('[role="article"]');
      return !a || a === post || a.contains(post);
    });
  }

  // A comment is a role="article" that has its own comment_id link.
  function isComment(el) {
    return [...el.querySelectorAll(COMMENT_LINK)].some((a) => a.closest('[role="article"]') === el);
  }

  const inChat = (el) => !!el.closest(CHAT_CONTAINER);

  // Evidence that an article is a post and not, say, a chat message.
  function looksLikePost(el) {
    if (el.closest('[role="feed"]')) return true;
    if (el.querySelector(COMMENT_LINK)) return true;
    return ownPost(el, 'a[href], [role="button"]').some((x) => {
      const h = x.getAttribute('href') || '';
      return (h && POST_LINK.test(h)) || isCommentsCount(x);
    });
  }

  function findPosts() {
    if (CHAT_PATH.test(location.pathname)) return [];
    const cands = new Set(document.querySelectorAll('[role="feed"] [aria-posinset]'));
    for (const a of document.querySelectorAll('[role="article"]')) {
      if (!a.parentElement?.closest('[role="article"]') && !isComment(a)) cands.add(a);
    }
    const list = [...cands].filter((el) => el.isConnected && !el.closest('.fbce-host') && !inChat(el) && looksLikePost(el));
    // Keep the outermost candidates only.
    return list.filter((el) => !list.some((o) => o !== el && o.contains(el)));
  }

  // A comments dialog whose post we didn't find as an article: tools go above the comments.
  function findDialogs(posts) {
    if (CHAT_PATH.test(location.pathname)) return [];
    return [...document.querySelectorAll('[role="dialog"]')].filter(
      (d) => d.querySelector(COMMENT_LINK) && !inChat(d) && !posts.some((p) => d.contains(p))
    );
  }

  function permalinkOf(el) {
    const a = ownPost(el, 'a[href]').find((x) => {
      const h = x.getAttribute('href') || '';
      return POST_LINK.test(h) && !h.includes('comment_id=');
    });
    return a ? a.href : location.href;
  }

  function postStats(post) {
    const stats = {};
    for (const el of ownPost(post, '[role="button"], span, a')) {
      const txt = textOf(el);
      const lab = label(el);
      if ((!txt || txt.length > 40) && !lab) continue;
      let m;
      if (stats.comments == null && ((m = txt.match(COMMENTS_COUNT)) || (m = lab.match(COMMENTS_LABEL)))) {
        stats.comments = parseCount(m[1]);
      } else if (stats.shares == null && ((m = txt.match(SHARES_COUNT)) || (m = lab.match(SHARES_LABEL)))) {
        stats.shares = parseCount(m[1]);
      } else if (stats.reactions == null && (m = txt.match(ALL_REACTIONS))) {
        stats.reactions = parseCount(m[2]);
      } else if (stats.reactions == null && REACT_LABEL.test(lab) && BARE_NUMBER.test(txt)) {
        stats.reactions = parseCount(txt);
      }
    }
    return stats;
  }

  // The page/person who published the post: its first named link.
  function postAuthor(target) {
    const a = ownPost(target, 'a[href]').find((x) => {
      const h = x.getAttribute('href') || '';
      return textOf(x) && textOf(x).length <= 80 && !POST_LINK.test(h) && !/hashtag|comment_id=/.test(h);
    });
    return a ? { name: textOf(a), url: a.href.split('?')[0] } : null;
  }

  // ---------- fonts ----------

  // Readex Pro ships with the extension (Facebook's CSP blocks font CDNs).
  // @font-face must live in the document; shadow roots then inherit it.
  function loadFonts() {
    const url = globalThis.chrome?.runtime?.getURL;
    if (!url || document.getElementById('fbce-fonts')) return;
    const faces = [];
    for (const w of [400, 500, 600, 700]) {
      for (const [sub, range] of [
        ['arabic', 'U+0600-06FF, U+0750-077F, U+0870-088E, U+0890-0891, U+0898-08E1, U+08E3-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC'],
        ['latin', 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'],
      ]) {
        faces.push(
          `@font-face{font-family:"FBCE Readex";font-style:normal;font-weight:${w};font-display:swap;` +
            `src:url(${url(`fonts/readex-pro-${sub}-${w}-normal.woff2`)}) format("woff2");unicode-range:${range};}`
        );
      }
    }
    const style = document.createElement('style');
    style.id = 'fbce-fonts';
    style.textContent = faces.join('\n');
    (document.head || document.documentElement).append(style);
  }

  // ---------- icons ----------

  const ICONS = {
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v9H5v-9M7.5 8a2.5 2.5 0 1 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 1 1 0 5"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
    refresh: '<path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    comments: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    share: '<path d="M14 5l7 7-7 7M21 12H9a6 6 0 0 0-6 6"/>',
    copy: '<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
    dice: '<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8.5" cy="8.5" r="1.2" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    check: '<path d="M5 12l5 5 9-10"/>',
  };
  function icon(name) {
    const span = document.createElement('span');
    span.className = 'ic';
    span.setAttribute('aria-hidden', 'true');
    span.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg>`;
    return span;
  }

  // ---------- UI ----------

  const CSS = `
    :host { all: initial; display: block; }
    .wrap {
      --head: #0E4F4B; --head-ink: #FFFFFF; --head-muted: #B9D6D2;
      --brand: #0E4F4B; --brand-ink: #FFFFFF; --brand-soft: #E3EFED;
      --gold: #D9A21B; --gold-ink: #3D2B00; --gold-soft: #FBF1D6;
      --bg: #FFFFFF; --surface: #F2F6F5; --line: #DCE5E3;
      --fg: #16302E; --muted: #5B6F6C; --bar: rgba(14, 79, 75, .14); --err: #B3392B; --ok: #1E7B4F;
      font-family: "FBCE Readex", "Segoe UI", Tahoma, system-ui, sans-serif;
      font-size: 14px; line-height: 1.5; color: var(--fg);
      -webkit-font-smoothing: antialiased;
    }
    .wrap.dark {
      --head: #12403D; --head-ink: #F1F7F6; --head-muted: #94BDB8;
      --brand: #3AA198; --brand-ink: #07211F; --brand-soft: #1F3533;
      --gold: #E8B53A; --gold-ink: #2B1E00; --gold-soft: #3A3220;
      --bg: #1E2423; --surface: #273130; --line: #36423F;
      --fg: #E6EEEC; --muted: #9DB0AC; --bar: rgba(58, 161, 152, .22); --err: #FF8A7A; --ok: #5CC495;
    }
    * { box-sizing: border-box; }
    [hidden] { display: none !important; }
    .ic { display: inline-flex; width: 16px; height: 16px; flex: none; }
    .ic svg { width: 100%; height: 100%; }

    button {
      font: inherit; font-size: 13px; font-weight: 500; cursor: pointer; display: inline-flex;
      align-items: center; gap: 6px; border: 1px solid var(--line); background: var(--bg);
      color: var(--fg); border-radius: 8px; padding: 6px 12px; line-height: 1.2;
      transition: background-color .15s, border-color .15s, color .15s;
    }
    button:hover:not(:disabled) { background: var(--surface); }
    button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible, a:focus-visible {
      outline: 2px solid var(--gold); outline-offset: 2px;
    }
    button:disabled { opacity: .55; cursor: default; }
    button.primary { background: var(--brand); color: var(--brand-ink); border-color: var(--brand); }
    button.primary:hover:not(:disabled) { background: var(--brand); filter: brightness(1.1); }
    button.gift { background: var(--gold); color: var(--gold-ink); border-color: var(--gold); }
    button.gift:hover:not(:disabled) { background: var(--gold); filter: brightness(1.06); }
    button.danger { background: transparent; color: var(--err); border-color: currentColor; }
    button.ghost { background: transparent; border-color: transparent; color: inherit; padding: 6px; }
    button.ghost:hover:not(:disabled) { background: rgba(255, 255, 255, .12); }

    /* toolbar */
    .toolbar { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; padding: 8px 12px;
               border-bottom: 1px solid var(--line); }
    .mark { display: inline-flex; align-items: center; gap: 6px; color: var(--brand); font-weight: 600;
            font-size: 12px; margin-inline-end: 4px; }
    .mark .dot { width: 22px; height: 22px; border-radius: 6px; background: var(--brand); color: var(--brand-ink);
                 display: inline-flex; align-items: center; justify-content: center; }
    .mark .dot .ic { width: 13px; height: 13px; }
    .seg { display: inline-flex; border: 1px solid var(--line); border-radius: 8px; overflow: hidden; }
    .seg button { border: 0; border-radius: 0; }
    .seg button + button { border-inline-start: 1px solid var(--line); }
    .seg .label { display: inline-flex; align-items: center; gap: 4px; padding: 0 10px; color: var(--muted);
                  font-size: 12px; background: var(--surface); }
    .spacer { flex: 1; }

    /* panel */
    .panel { margin: 10px 12px 14px; border: 1px solid var(--line); border-radius: 12px; background: var(--bg);
             overflow: hidden; }
    .head { background: var(--head); color: var(--head-ink); padding: 14px 16px 0; }
    .head-row { display: flex; align-items: flex-start; gap: 8px; }
    .head h3 { margin: 0; font-size: 17px; font-weight: 600; flex: 1; }
    .head .sub { color: var(--head-muted); font-size: 12px; margin-top: 2px; }
    .tabs { display: flex; gap: 2px; margin-top: 12px; overflow-x: auto; scrollbar-width: none; }
    .tab { background: transparent; border: 0; border-radius: 8px 8px 0 0; color: var(--head-muted);
           padding: 8px 14px; font-weight: 500; white-space: nowrap; flex: none; }
    .tab:hover:not(:disabled) { background: rgba(255, 255, 255, .08); color: var(--head-ink); }
    .tab[aria-selected="true"] { background: var(--bg); color: var(--fg); }
    .tab[aria-selected="true"]:hover { background: var(--bg); color: var(--fg); }
    .tab .count { font-size: 11px; background: var(--gold); color: var(--gold-ink); border-radius: 999px;
                  padding: 0 6px; margin-inline-start: 2px; }
    .content { padding: 16px; }

    .progress { padding: 12px 16px; border-bottom: 1px solid var(--line); background: var(--surface); }
    .track { position: relative; height: 6px; border-radius: 3px; background: var(--line); overflow: hidden; }
    .pfill { position: absolute; inset-block: 0; inset-inline-start: 0; width: 0; background: var(--brand);
             border-radius: 3px; transition: width .35s ease; }
    .track.indeterminate .pfill { width: 30%; animation: slide 1.2s ease-in-out infinite; }
    @keyframes slide { from { inset-inline-start: -30%; } to { inset-inline-start: 100%; } }
    .prow { display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-top: 10px;
            flex-wrap: wrap; }
    .ptext { color: var(--fg); font-size: 13px; font-variant-numeric: tabular-nums; }
    .pbtns { display: flex; gap: 6px; }

    .status { color: var(--muted); font-size: 13px; margin: 0 0 12px; }
    .status.error { color: var(--err); }
    .empty { color: var(--muted); text-align: center; padding: 24px 8px; }

    h4 { margin: 20px 0 10px; font-size: 14px; font-weight: 600; color: var(--fg); }
    h4:first-child { margin-top: 0; }

    /* overview */
    .hero { display: flex; align-items: center; gap: 18px; padding: 4px 0 16px; border-bottom: 1px solid var(--line); }
    .ring { position: relative; width: 96px; height: 96px; flex: none; }
    .ring svg { width: 100%; height: 100%; transform: rotate(-90deg); }
    .ring .bg { stroke: var(--surface); }
    .ring .fg { stroke: var(--brand); transition: stroke-dashoffset .8s ease; }
    .ring .val { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
                 font-size: 19px; font-weight: 700; font-variant-numeric: tabular-nums; }
    .hero .big { font-size: 34px; font-weight: 700; line-height: 1.1; font-variant-numeric: tabular-nums; }
    .hero .lbl { color: var(--muted); font-size: 13px; }
    .hero .facts { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 8px; }
    .fact { display: inline-flex; align-items: center; gap: 5px; font-size: 13px; color: var(--muted); }
    .fact b { color: var(--fg); font-weight: 600; font-variant-numeric: tabular-nums; }
    .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1px; background: var(--line);
            border: 1px solid var(--line); border-radius: 10px; overflow: hidden; margin-top: 16px; }
    .stat { background: var(--bg); padding: 10px 12px; }
    .stat b { display: block; font-size: 20px; font-weight: 600; font-variant-numeric: tabular-nums; }
    .stat span { font-size: 12px; color: var(--muted); }
    @media (max-width: 480px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }

    /* people */
    .row { display: flex; align-items: center; gap: 10px; padding: 6px 0; }
    .row + .row { border-top: 1px solid var(--surface); }
    .rank { width: 18px; color: var(--muted); font-size: 12px; text-align: center; font-variant-numeric: tabular-nums; }
    .avatar { width: 32px; height: 32px; border-radius: 50%; flex: none; display: inline-flex; align-items: center;
              justify-content: center; font-weight: 600; font-size: 14px; color: #fff; }
    .row .who { flex: 1; min-width: 0; }
    .row .name { display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: 500; }
    .meter { height: 4px; border-radius: 2px; background: var(--surface); margin-top: 4px; overflow: hidden; }
    .meter i { display: block; height: 100%; background: var(--brand); border-radius: 2px; }
    .row .num { font-size: 12px; color: var(--muted); white-space: nowrap; text-align: end; font-variant-numeric: tabular-nums; }
    .row .num b { display: block; color: var(--fg); font-size: 14px; }

    /* comments */
    .quote { border: 1px solid var(--line); border-radius: 10px; padding: 10px 12px; margin-bottom: 8px; }
    .quote .top { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
    .quote .top .avatar { width: 26px; height: 26px; font-size: 12px; }
    .quote .top a { font-weight: 600; }
    .quote .top .badge { margin-inline-start: auto; }
    .quote p { margin: 0; overflow-wrap: anywhere; white-space: pre-line; }
    .badge { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; color: var(--brand);
             background: var(--brand-soft); border-radius: 999px; padding: 2px 8px; font-variant-numeric: tabular-nums; }
    .badge .ic { width: 12px; height: 12px; }

    a { color: var(--brand); text-decoration: none; }
    .wrap.dark a { color: #6FD0C6; }
    a:hover { text-decoration: underline; }

    /* words */
    .cloud { display: flex; flex-wrap: wrap; gap: 6px 8px; align-items: baseline; }
    .chip { display: inline-flex; align-items: baseline; gap: 4px; background: var(--surface); border-radius: 8px;
            padding: 3px 10px; color: var(--fg); }
    .chip small { color: var(--muted); font-size: 11px; font-variant-numeric: tabular-nums; }
    .emoji { font-size: 20px; line-height: 1.2; }

    /* draw */
    .intro { color: var(--muted); margin: 0 0 14px; }
    fieldset { border: 1px solid var(--line); border-radius: 10px; padding: 12px 14px 14px; margin: 0 0 12px; }
    legend { padding: 0 6px; font-weight: 600; font-size: 13px; }
    .fields { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
    .field { display: flex; flex-direction: column; gap: 4px; font-size: 13px; }
    .field .hint { color: var(--muted); font-size: 12px; }
    .field.wide { grid-column: 1 / -1; }
    @media (max-width: 480px) { .fields { grid-template-columns: 1fr; } }
    input, select, textarea {
      font: inherit; font-size: 14px; color: var(--fg); background: var(--bg);
      border: 1px solid var(--line); border-radius: 8px; padding: 7px 10px; width: 100%;
    }
    input[type="number"] { font-variant-numeric: tabular-nums; }
    textarea { min-height: 64px; resize: vertical; }
    .kw { display: flex; gap: 8px; }
    .kw input { flex: 1; min-width: 0; }
    .kw select { width: auto; }
    .switch { display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 14px; padding: 4px 0; }
    .switch input { appearance: none; width: 34px; height: 20px; border-radius: 999px; background: var(--line);
                    position: relative; border: 0; padding: 0; margin: 0; cursor: pointer; flex: none;
                    transition: background-color .15s; }
    .switch input::after { content: ""; position: absolute; top: 2px; inset-inline-start: 2px; width: 16px; height: 16px;
                           border-radius: 50%; background: #fff; transition: inset-inline-start .15s;
                           box-shadow: 0 1px 2px rgba(0, 0, 0, .25); }
    .switch input:checked { background: var(--brand); }
    .switch input:checked::after { inset-inline-start: 16px; }
    .actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
    .actions .big { padding: 9px 18px; font-size: 14px; }

    .stage { position: relative; margin-top: 16px; }
    .roll { text-align: center; padding: 26px 12px; border-radius: 12px; background: var(--gold-soft);
            border: 1px dashed var(--gold); }
    .roll .name { font-size: 26px; font-weight: 700; color: var(--fg); }
    .roll .lbl { font-size: 12px; color: var(--muted); margin-top: 4px; }
    .summary { color: var(--muted); font-size: 13px; margin: 0 0 12px; }
    .winner { display: flex; gap: 12px; align-items: flex-start; padding: 12px; margin: 8px 0; border-radius: 12px;
              background: var(--gold-soft); border: 1px solid var(--gold); }
    .winner.backup { background: var(--surface); border-color: var(--line); }
    .winner .place { font-size: 22px; line-height: 32px; width: 32px; text-align: center; flex: none; }
    .winner.backup .place { font-size: 13px; color: var(--muted); font-weight: 600; }
    .winner .who { flex: 1; min-width: 0; }
    .winner .who > a { font-weight: 600; font-size: 15px; }
    .winner .meta { font-size: 12px; color: var(--muted); }
    .winner p { margin: 6px 0 0; overflow-wrap: anywhere; font-size: 13px; }
    .rejects { display: flex; flex-wrap: wrap; gap: 6px; }
    .warn { color: var(--err); font-size: 13px; margin: 8px 0; }

    .confetti { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
    .confetti i { position: absolute; top: -10px; width: 7px; height: 11px; border-radius: 2px; opacity: 0;
                  animation: fall 1.6s cubic-bezier(.2, .6, .4, 1) forwards; }
    @keyframes fall {
      0% { opacity: 1; transform: translateY(0) rotate(0); }
      100% { opacity: 0; transform: translateY(240px) rotate(540deg); }
    }
    @media (prefers-reduced-motion: reduce) {
      .track.indeterminate .pfill { animation: none; width: 100%; opacity: .4; }
      .confetti { display: none; }
      .ring .fg, .pfill { transition: none; }
    }
  `;

  const el = (tag, props = {}, ...kids) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(props)) {
      if (k === 'class') n.className = v;
      else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
      else if (k.startsWith('aria-') || k === 'role' || k === 'for') n.setAttribute(k, v);
      else if (v != null) n[k] = v;
    }
    n.append(...kids.flat().filter((k) => k != null));
    return n;
  };
  const btn = (cls, iconName, label, onclick, extra = {}) =>
    el('button', { class: cls, type: 'button', onclick, ...extra }, iconName ? icon(iconName) : null, label ? el('span', { className: 'lbl', textContent: label }) : null);

  const isDark = () => document.documentElement.classList.contains('__fb-dark-mode');

  // A steady colour per person, from a palette that sits well with the brand.
  const AVATAR_COLORS = ['#0E4F4B', '#B7791F', '#2F6B8F', '#7A4E8C', '#A1453A', '#3D7A3A', '#55606E'];
  function avatar(name) {
    let h = 0;
    for (const ch of name || '?') h = (h * 31 + ch.codePointAt(0)) >>> 0;
    const letter = [...(name || '?').trim()][0] || '?';
    return el('span', { class: 'avatar', textContent: letter.toUpperCase(), style: `background:${AVATAR_COLORS[h % AVATAR_COLORS.length]}` });
  }

  function createHost(kind) {
    const host = document.createElement('div');
    host.className = 'fbce-host';
    host.dataset.fbce = kind;
    // Keep clicks inside our UI from reaching Facebook's handlers (which may open the post).
    host.addEventListener('click', (e) => e.stopPropagation());
    const root = host.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = CSS;
    const wrap = el('div', { class: 'wrap' + (isDark() ? ' dark' : ''), dir: AR ? 'rtl' : 'ltr' });
    root.append(style, wrap);
    return { host, wrap };
  }

  // Bring part of our UI into view. Inside a dialog, scrollIntoView would
  // also move the page behind it, so put the page back (no smooth scroll there).
  function reveal(node) {
    if (!node.scrollIntoView) return;
    const host = node.getRootNode?.().host || node;
    if (!host.closest?.('[role="dialog"]')) {
      node.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      return;
    }
    const x = window.scrollX;
    const y = window.scrollY;
    node.scrollIntoView({ block: 'nearest' });
    if (window.scrollX !== x || window.scrollY !== y) window.scrollTo(x, y);
  }

  const controllers = new Map(); // target element -> controller

  function mount(target, kind) {
    const ctrl = { target, kind, data: null, busy: false };

    const tb = createHost('toolbar');
    ctrl.toolbarHost = tb.host;
    ctrl.toolbarWrap = tb.wrap;
    ctrl.analyzeBtn = btn('primary', 'chart', t('analyze'), () => analyzePost(ctrl));
    ctrl.drawBtn = btn('gift', 'gift', t('draw'), () => openDraw(ctrl));
    ctrl.csvBtn = btn('', 'download', t('csv'), () => exportPost(ctrl, 'csv'));
    ctrl.jsonBtn = btn('', 'download', t('json'), () => exportPost(ctrl, 'json'));
    tb.wrap.append(
      el(
        'div',
        { class: 'toolbar' },
        el('span', { class: 'mark' }, el('span', { class: 'dot' }, icon('comments')), t('brand')),
        ctrl.analyzeBtn,
        ctrl.drawBtn,
        el('span', { class: 'spacer' }),
        el('span', { class: 'seg' }, el('span', { class: 'label', textContent: t('exportAs') }), ctrl.csvBtn, ctrl.jsonBtn)
      )
    );

    const pn = createHost('panel');
    ctrl.panelHost = pn.host;
    ctrl.panelWrap = pn.wrap;
    pn.host.hidden = true;

    place(ctrl);
    controllers.set(target, ctrl);
    return ctrl;
  }

  // (Re)insert the toolbar and panel; Facebook re-renders can remove them.
  function place(ctrl) {
    const { target, kind, toolbarHost, panelHost } = ctrl;
    if (kind === 'post') {
      if (toolbarHost.parentElement !== target) target.prepend(toolbarHost);
      if (panelHost.parentElement !== target) target.append(panelHost);
      return;
    }
    // Dialog: put both above the first comment.
    const first = [...target.querySelectorAll('[role="article"]')].find(isComment);
    if (!first) return;
    const anchor = first.closest('li') || first;
    if (!toolbarHost.isConnected || !target.contains(toolbarHost)) anchor.before(toolbarHost);
    if (!panelHost.isConnected || !target.contains(panelHost)) toolbarHost.after(panelHost);
  }

  function setBusy(ctrl, busy) {
    ctrl.busy = busy;
    for (const b of [ctrl.analyzeBtn, ctrl.drawBtn, ctrl.csvBtn, ctrl.jsonBtn]) b.disabled = busy;
    ctrl.analyzeBtn.querySelector('.lbl').textContent = busy ? t('analyzing') : t('analyze');
    if (ctrl.refreshBtn) ctrl.refreshBtn.disabled = busy;
  }

  const TABS = ['overview', 'people', 'comments', 'words', 'draw'];
  const TAB_LABEL = { overview: 'tabOverview', people: 'tabPeople', comments: 'tabComments', words: 'tabWords', draw: 'tabDraw' };

  // Panel skeleton: header with tabs, progress strip, status line, one pane per tab.
  function openPanel(ctrl) {
    ctrl.panelHost.hidden = false;
    ctrl.panelWrap.classList.toggle('dark', isDark());
    ctrl.toolbarWrap.classList.toggle('dark', isDark());
    if (ctrl.panel) return;

    ctrl.sub = el('div', { class: 'sub' });
    ctrl.refreshBtn = btn('ghost', 'refresh', null, () => analyzePost(ctrl), { title: t('refresh'), 'aria-label': t('refresh') });
    const closeBtn = btn('ghost', 'close', null, () => (ctrl.panelHost.hidden = true), { title: t('close'), 'aria-label': t('close') });

    ctrl.tabs = {};
    ctrl.panes = {};
    const tabBar = el('div', { class: 'tabs', role: 'tablist' });
    for (const name of TABS) {
      const tab = el('button', { class: 'tab', type: 'button', role: 'tab', 'aria-selected': 'false', onclick: () => selectTab(ctrl, name) }, t(TAB_LABEL[name]));
      ctrl.tabs[name] = tab;
      ctrl.panes[name] = el('div', { class: 'pane', role: 'tabpanel', hidden: true });
      tabBar.append(tab);
    }

    ctrl.progressFill = el('div', { class: 'pfill' });
    ctrl.progressText = el('span', { class: 'ptext' });
    ctrl.cancelBtn = btn('danger', 'close', t('cancel'), () => cancelAnalysis(ctrl));
    ctrl.stopBtn = btn('', null, t('stop'), () => api.stop());
    ctrl.progress = el(
      'div',
      { class: 'progress', hidden: true },
      el('div', { class: 'track', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': '100' }, ctrl.progressFill),
      el('div', { class: 'prow' }, ctrl.progressText, el('span', { class: 'pbtns' }, ctrl.stopBtn, ctrl.cancelBtn))
    );
    ctrl.status = el('div', { class: 'status', hidden: true });

    ctrl.panel = el(
      'div',
      { class: 'panel' },
      el(
        'div',
        { class: 'head' },
        el('div', { class: 'head-row' }, el('div', { style: 'flex:1;min-width:0' }, el('h3', { textContent: t('title') }), ctrl.sub), ctrl.refreshBtn, closeBtn),
        tabBar
      ),
      ctrl.progress,
      el('div', { class: 'content' }, ctrl.status, ...TABS.map((n) => ctrl.panes[n]))
    );
    ctrl.panelWrap.append(ctrl.panel);
    for (const n of TABS) ctrl.panes[n].append(el('div', { class: 'empty', textContent: t('noData') }));
    selectTab(ctrl, 'overview');
  }

  function selectTab(ctrl, name) {
    ctrl.activeTab = name;
    for (const n of TABS) {
      ctrl.tabs[n].setAttribute('aria-selected', String(n === name));
      ctrl.panes[n].hidden = n !== name;
    }
    if (name === 'draw' && ctrl.data && !ctrl.drawForm) buildDrawForm(ctrl, ctrl.savedRules || {});
  }

  // pct = null -> indeterminate (moving) bar.
  function setProgress(ctrl, label, pct = null) {
    ctrl.progress.hidden = false;
    ctrl.progressText.textContent = label;
    const track = ctrl.progressFill.parentElement;
    track.classList.toggle('indeterminate', pct == null);
    if (pct == null) {
      ctrl.progressFill.style.width = '';
      track.removeAttribute('aria-valuenow');
    } else {
      ctrl.progressFill.style.width = pct + '%';
      track.setAttribute('aria-valuenow', String(pct));
    }
  }

  function cancelAnalysis(ctrl) {
    ctrl.cancelled = true;
    ctrl.cancelBtn.disabled = ctrl.stopBtn.disabled = true;
    api.stop();
  }

  function setStatus(ctrl, msg, isError = false) {
    ctrl.status.textContent = msg || '';
    ctrl.status.hidden = !msg;
    ctrl.status.classList.toggle('error', isError);
  }

  const profileLink = (name, href) =>
    href ? el('a', { href, target: '_blank', rel: 'noopener', textContent: name || '?' }) : el('span', { textContent: name || '?' });

  const stat = (label, value) => el('div', { class: 'stat' }, el('b', { textContent: value }), el('span', { textContent: label }));

  function ring(pct) {
    const r = 42;
    const c = 2 * Math.PI * r;
    const wrap = el('div', { class: 'ring', role: 'img', 'aria-label': `${pct}% ${t('coverage')}` });
    wrap.innerHTML = `<svg viewBox="0 0 100 100"><circle class="bg" cx="50" cy="50" r="${r}" fill="none" stroke-width="10"/>` +
      `<circle class="fg" cx="50" cy="50" r="${r}" fill="none" stroke-width="10" stroke-linecap="round" ` +
      `stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - pct / 100)}"/></svg>`;
    wrap.append(el('div', { class: 'val', textContent: `${pct}%` }));
    return wrap;
  }

  function renderOverview(ctrl) {
    const { summary: s, post } = ctrl.data;
    const facts = [];
    if (post.reactions != null) facts.push(el('span', { class: 'fact' }, icon('heart'), el('b', { textContent: fmt(post.reactions) }), t('postReactions')));
    if (post.comments != null) facts.push(el('span', { class: 'fact' }, icon('comments'), el('b', { textContent: fmt(post.comments) }), t('postComments')));
    if (post.shares != null) facts.push(el('span', { class: 'fact' }, icon('share'), el('b', { textContent: fmt(post.shares) }), t('postShares')));

    const hero = el('div', { class: 'hero' });
    if (post.comments) {
      const pct = Math.min(100, Math.round((s.total / post.comments) * 100));
      hero.append(
        ring(pct),
        el(
          'div',
          {},
          el('div', { class: 'big', textContent: fmt(s.total) }),
          el('div', { class: 'lbl', textContent: `${t('loadedOnly')} · ${t('coverageOf', { n: fmt(s.total), total: fmt(post.comments) })}` }),
          facts.length ? el('div', { class: 'facts' }, facts) : null
        )
      );
    } else {
      hero.append(
        el(
          'div',
          {},
          el('div', { class: 'big', textContent: fmt(s.total) }),
          el('div', { class: 'lbl', textContent: t('loadedOnly') }),
          facts.length ? el('div', { class: 'facts' }, facts) : null
        )
      );
    }

    const pct = (a, b) => (b ? Math.round((a / b) * 100) + '%' : '0%');
    ctrl.panes.overview.replaceChildren(
      hero,
      el(
        'div',
        { class: 'grid' },
        stat(t('comments'), fmt(s.topLevel)),
        stat(t('replies'), fmt(s.replies)),
        stat(t('people'), fmt(s.uniqueAuthors)),
        stat(t('reactions'), fmt(s.totalReactions)),
        stat(t('avgReactions'), fmt(s.avgReactions)),
        stat(t('replyRate'), pct(s.replies, s.total))
      )
    );
  }

  function renderPeople(ctrl) {
    const s = ctrl.data.summary;
    const max = s.topCommenters[0]?.comments || 1;
    ctrl.panes.people.replaceChildren(
      el('h4', { textContent: t('topCommenters') }),
      s.topCommenters.length
        ? el(
            'div',
            {},
            s.topCommenters.map((a, i) =>
              el(
                'div',
                { class: 'row' },
                el('span', { class: 'rank', textContent: fmt(i + 1) }),
                avatar(a.author),
                el(
                  'div',
                  { class: 'who' },
                  el('span', { class: 'name' }, profileLink(a.author, a.authorUrl)),
                  el('div', { class: 'meter' }, el('i', { style: `width:${(a.comments / max) * 100}%` }))
                ),
                el('div', { class: 'num' }, el('b', { textContent: `${fmt(a.comments)} ${t('commentsUnit')}` }), `${fmt(a.reactions)} ${t('reactionsUnit')}`)
              )
            )
          )
        : el('div', { class: 'empty', textContent: t('none') })
    );
  }

  function quoteCard(c, badgeIcon, badgeText) {
    return el(
      'div',
      { class: 'quote' },
      el(
        'div',
        { class: 'top' },
        avatar(c.author),
        el('a', { href: c.permalink, target: '_blank', rel: 'noopener', textContent: c.author || '?', title: t('viewComment') }),
        el('span', { class: 'badge' }, icon(badgeIcon), badgeText)
      ),
      el('p', { textContent: c.text })
    );
  }

  function renderComments(ctrl) {
    const s = ctrl.data.summary;
    const list = (items, ic, metric) =>
      items.length ? items.map((c) => quoteCard(c, ic, metric(c))) : [el('div', { class: 'empty', textContent: t('none') })];
    ctrl.panes.comments.replaceChildren(
      el('h4', { textContent: t('topComments') }),
      ...list(s.topComments, 'heart', (c) => `${fmt(c.reactions)} ${t('reactionsUnit')}`),
      el('h4', { textContent: t('mostReplied') }),
      ...list(s.mostReplied, 'comments', (c) => `${fmt(c.replies)} ${t('repliesUnit')}`)
    );
  }

  function renderWords(ctrl) {
    const s = ctrl.data.summary;
    const parts = [];
    if (s.topWords.length) {
      const max = s.topWords[0].count;
      const min = s.topWords[s.topWords.length - 1].count;
      const size = (n) => (max === min ? 15 : 13 + ((n - min) / (max - min)) * 9);
      parts.push(
        el('h4', { textContent: t('topWords') }),
        el(
          'div',
          { class: 'cloud' },
          s.topWords.map((w) =>
            el('span', { class: 'chip', style: `font-size:${size(w.count).toFixed(1)}px` }, w.word, el('small', { textContent: fmt(w.count) }))
          )
        )
      );
    }
    if (s.topEmojis.length) {
      parts.push(
        el('h4', { textContent: t('topEmojis') }),
        el(
          'div',
          { class: 'cloud' },
          s.topEmojis.map((e) => el('span', { class: 'chip' }, el('span', { class: 'emoji', textContent: e.emoji }), el('small', { textContent: fmt(e.count) })))
        )
      );
    }
    ctrl.panes.words.replaceChildren(...(parts.length ? parts : [el('div', { class: 'empty', textContent: t('none') })]));
  }

  function render(ctrl) {
    const { summary: s } = ctrl.data;
    ctrl.sub.textContent = `${fmt(s.total)} ${t('commentsUnit')} · ${fmt(s.uniqueAuthors)} ${t('people')}`;
    renderOverview(ctrl);
    renderPeople(ctrl);
    renderComments(ctrl);
    renderWords(ctrl);
    // A new analysis means the old draw (and its form's author) no longer apply.
    ctrl.drawForm = null;
    ctrl.panes.draw.replaceChildren();
    if (ctrl.activeTab === 'draw') buildDrawForm(ctrl, ctrl.savedRules || {});
  }

  // ---------- actions ----------

  async function loadOptions() {
    try {
      const { options } = (await globalThis.chrome?.storage?.local?.get('options')) || {};
      return options || {};
    } catch {
      return {};
    }
  }

  const openDialogs = () =>
    [...document.querySelectorAll('[role="dialog"]')].filter((d) => d.querySelector(COMMENT_LINK));

  // Where this post's comments are. In the feed, comments may not be loaded
  // yet: clicking "N comments" either shows them inline or opens a dialog.
  async function resolveScope(ctrl) {
    const { target } = ctrl;
    if (ctrl.kind === 'dialog' || countFound(target) > 0) return { scope: target };

    const before = new Set(openDialogs());
    const opener = ownPost(target, '[role="button"], span').find(isCommentsCount);
    if (opener) {
      opener.click();
      for (let i = 0; i < 10 && !ctrl.cancelled; i++) {
        await sleep(400);
        const dlg = openDialogs().find((d) => !before.has(d));
        if (dlg) return { scope: dlg, openedDialog: dlg };
        if (countFound(target) > 0) return { scope: target };
      }
    }
    // A post on its own page: the comments sit next to it, not inside it.
    if (!target.closest('[role="feed"]')) return { scope: target.closest('[role="dialog"]') || findScope() };
    return { scope: target };
  }

  function closeDialog(dlg) {
    const b = [...dlg.querySelectorAll('[aria-label]')].find((x) => CLOSE_LABEL.test(x.getAttribute('aria-label')));
    if (b) b.click();
    else document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  }

  async function analyzePost(ctrl) {
    if (ctrl.busy) return false;
    openPanel(ctrl);
    if (api.isRunning()) {
      setStatus(ctrl, t('already-running'), true);
      return false;
    }
    setBusy(ctrl, true);
    ctrl.cancelled = false;
    ctrl.cancelBtn.disabled = ctrl.stopBtn.disabled = false;
    setStatus(ctrl, '');
    setProgress(ctrl, t('starting'));
    let openedDialog = null;
    try {
      const options = await loadOptions();
      // Facebook's own count ("120 comments") lets us show a real percentage.
      const expected = ctrl.kind === 'post' ? postStats(ctrl.target).comments : null;
      setProgress(ctrl, t('opening'));
      const before = new Set(openDialogs());
      const resolved = await resolveScope(ctrl);
      openedDialog = resolved.openedDialog;
      if (ctrl.cancelled) throw new Error('cancelled');

      // If Facebook opens the post in a dialog while we load (e.g. "View more
      // comments" in the feed), follow the comments into it.
      const rescope = (cur) => {
        if (cur.closest('[role="dialog"]')) return cur;
        const dlg = openDialogs().find((d) => !before.has(d));
        if (!dlg) return cur;
        openedDialog = dlg;
        return dlg;
      };
      const res = await api.analyze(resolved.scope, { ...options, rescope }, (p) => {
        if (ctrl.cancelled) return;
        if (p.phase === 'sorting') setProgress(ctrl, t('sorting'));
        if (p.phase !== 'expanding') return;
        const cap = options.maxComments ? Math.min(options.maxComments, expected || Infinity) : expected;
        if (cap) {
          const pct = Math.min(99, Math.round((p.found / cap) * 100));
          setProgress(ctrl, `${t('progressOf', { n: fmt(p.found), total: fmt(cap) })} · ${pct}%`, pct);
        } else {
          setProgress(ctrl, t('progressFound', { n: fmt(p.found) }));
        }
      });
      if (ctrl.cancelled) throw new Error('cancelled');
      if (!res.ok) {
        setStatus(ctrl, t(res.error), true);
        return false;
      }
      setProgress(ctrl, t('progressFound', { n: fmt(res.summary.total) }), 100);
      const post = ctrl.kind === 'post' ? postStats(ctrl.target) : {};
      ctrl.data = { ...res, post, source: permalinkOf(ctrl.target) };
      setStatus(ctrl, res.stopped ? t('stopped', { n: fmt(res.summary.total) }) : '');
      render(ctrl);
      place(ctrl);
      reveal(ctrl.panelHost);
      return true;
    } catch (e) {
      if (e.message === 'cancelled') setStatus(ctrl, t('cancelled'));
      else setStatus(ctrl, e.message, true);
      return false;
    } finally {
      if (openedDialog) closeDialog(openedDialog);
      ctrl.progress.hidden = true;
      setBusy(ctrl, false);
    }
  }

  async function exportPost(ctrl, format) {
    if (!ctrl.data && !(await analyzePost(ctrl))) return;
    const { comments, summary, source } = ctrl.data;
    api.exportFile(comments, summary, format, source);
  }

  // ---------- giveaway draw ----------

  const storage = () => globalThis.chrome?.storage?.local;

  async function loadDrawRules() {
    try {
      return (await storage()?.get('drawRules'))?.drawRules || {};
    } catch {
      return {};
    }
  }

  function saveDrawRules(rules) {
    try {
      storage()?.set({ drawRules: rules })?.catch?.(() => {});
    } catch {
      /* storage unavailable */
    }
  }

  async function openDraw(ctrl) {
    if (ctrl.busy) return;
    openPanel(ctrl);
    ctrl.savedRules = await loadDrawRules();
    if (!ctrl.data && !(await analyzePost(ctrl))) return;
    selectTab(ctrl, 'draw');
    reveal(ctrl.panelHost);
  }

  function buildDrawForm(ctrl, saved) {
    const v = (k, d) => saved[k] ?? d;
    const f = {
      winners: el('input', { type: 'number', min: 1, value: v('winners', 1), id: 'w' }),
      backups: el('input', { type: 'number', min: 0, value: v('backups', 0), id: 'b' }),
      keywords: el('input', { type: 'text', value: v('keywords', ''), id: 'k', placeholder: AR ? '#مسابقة' : '#contest' }),
      keywordMode: el(
        'select',
        { 'aria-label': t('keywords') },
        el('option', { value: 'any', textContent: t('anyWord') }),
        el('option', { value: 'all', textContent: t('allWords') })
      ),
      minMentions: el('input', { type: 'number', min: 0, value: v('minMentions', 0), id: 'm' }),
      minWords: el('input', { type: 'number', min: 0, value: v('minWords', 0), id: 'n' }),
      topLevelOnly: el('input', { type: 'checkbox', checked: v('topLevelOnly', true) }),
      onePerPerson: el('input', { type: 'checkbox', checked: v('onePerPerson', true) }),
      excludeAuthor: el('input', { type: 'checkbox', checked: v('excludeAuthor', true) }),
      exclude: el('textarea', { value: v('exclude', ''), id: 'x' }),
    };
    f.keywordMode.value = v('keywordMode', 'any');
    ctrl.drawForm = f;
    ctrl.author = postAuthor(ctrl.target);

    const field = (label, input, hint, cls = '') =>
      el('label', { class: `field ${cls}` }, el('span', { textContent: label }), input, hint ? el('span', { class: 'hint', textContent: hint }) : null);
    const toggle = (label, input) => el('label', { class: 'switch' }, input, el('span', { textContent: label }));

    ctrl.drawResult = el('div', { class: 'stage' });
    ctrl.panes.draw.replaceChildren(
      el('p', { class: 'intro', textContent: t('drawIntro') }),
      el(
        'div',
        { class: 'draw' },
        el('fieldset', {}, el('legend', { textContent: t('secWinners') }), el('div', { class: 'fields' }, field(t('winnersCount'), f.winners), field(t('backupsCount'), f.backups))),
        el(
          'fieldset',
          {},
          el('legend', { textContent: t('secRules') }),
          el(
            'div',
            { class: 'fields' },
            field(t('keywords'), el('div', { class: 'kw' }, f.keywords, f.keywordMode), t('keywordsHint'), 'wide'),
            field(t('minMentions'), f.minMentions),
            field(t('minWords'), f.minWords),
            el('div', { class: 'field wide' }, toggle(t('topLevelOnly'), f.topLevelOnly), toggle(t('onePerPerson'), f.onePerPerson))
          )
        ),
        el(
          'fieldset',
          {},
          el('legend', { textContent: t('secExclude') }),
          el(
            'div',
            { class: 'fields' },
            ctrl.author ? el('div', { class: 'field wide' }, toggle(t('excludeAuthor', { name: ctrl.author.name }), f.excludeAuthor)) : null,
            field(t('exclude'), f.exclude, t('excludeHint'), 'wide')
          )
        ),
        el('div', { class: 'actions' }, btn('gift big', 'dice', t('doDraw'), () => runDraw(ctrl)))
      ),
      ctrl.drawResult
    );
  }

  function readRules(ctrl) {
    const f = ctrl.drawForm;
    const raw = {
      winners: Math.max(1, parseInt(f.winners.value, 10) || 1),
      backups: Math.max(0, parseInt(f.backups.value, 10) || 0),
      keywords: f.keywords.value,
      keywordMode: f.keywordMode.value,
      minMentions: Math.max(0, parseInt(f.minMentions.value, 10) || 0),
      minWords: Math.max(0, parseInt(f.minWords.value, 10) || 0),
      topLevelOnly: f.topLevelOnly.checked,
      onePerPerson: f.onePerPerson.checked,
      excludeAuthor: f.excludeAuthor.checked,
      exclude: f.exclude.value,
    };
    const exclude = raw.exclude.split('\n');
    if (raw.excludeAuthor && ctrl.author) exclude.push(ctrl.author.name, ctrl.author.url);
    return { raw, rules: { ...raw, exclude } };
  }

  async function runDraw(ctrl) {
    if (ctrl.drawing) return;
    const { raw, rules } = readRules(ctrl);
    ctrl.savedRules = raw;
    saveDrawRules(raw);
    const res = api.drawWinners(ctrl.data.comments, rules);
    ctrl.lastDraw = res;
    ctrl.drawing = true;
    try {
      // A short "rolling names" moment before the reveal.
      const names = res.eligibleComments.map((c) => c.author).filter(Boolean);
      if (names.length > 1 && res.winners.length && !reducedMotion()) {
        const name = el('div', { class: 'name' });
        ctrl.drawResult.replaceChildren(el('div', { class: 'roll' }, name, el('div', { class: 'lbl', textContent: t('eligible', { e: fmt(res.entries), p: fmt(res.people), t: fmt(res.total) }) })));
        reveal(ctrl.drawResult);
        const end = Date.now() + 1400;
        let wait = 50;
        while (Date.now() < end) {
          name.textContent = names[Math.floor(Math.random() * names.length)]; // display only
          await sleep(wait);
          wait = Math.min(180, wait * 1.08); // slow down toward the reveal
        }
      }
      renderDraw(ctrl, res);
    } finally {
      ctrl.drawing = false;
    }
  }

  const MEDALS = ['🥇', '🥈', '🥉'];
  const CONFETTI = ['#D9A21B', '#0E4F4B', '#3AA198', '#F3D27A', '#B7791F', '#7FC8BF'];

  function confetti() {
    const box = el('div', { class: 'confetti', 'aria-hidden': 'true' });
    for (let i = 0; i < 36; i++) {
      box.append(
        el('i', {
          style: `left:${Math.random() * 100}%;background:${CONFETTI[i % CONFETTI.length]};` +
            `animation-delay:${(Math.random() * 0.35).toFixed(2)}s;transform:rotate(${Math.round(Math.random() * 180)}deg)`,
        })
      );
    }
    setTimeout(() => box.remove(), 2400);
    return box;
  }

  function winnerCard(c, rank, isBackup) {
    return el(
      'div',
      { class: 'winner' + (isBackup ? ' backup' : '') },
      el('div', { class: 'place', textContent: isBackup ? `#${rank}` : MEDALS[rank - 1] || `🏆` }),
      avatar(c.author),
      el(
        'div',
        { class: 'who' },
        profileLink(c.author, c.authorUrl),
        el('div', { class: 'meta' }, el('a', { href: c.permalink, target: '_blank', rel: 'noopener' }, t('viewComment')), c.time ? ` · ${c.time}` : ''),
        el('p', { textContent: c.text.length > 220 ? c.text.slice(0, 217) + '…' : c.text })
      )
    );
  }

  function renderDraw(ctrl, res) {
    const parts = [];
    const when = new Date(res.drawnAt).toLocaleString();
    parts.push(el('p', { class: 'summary', textContent: t('eligible', { e: fmt(res.entries), p: fmt(res.people), t: fmt(res.total) }) }));

    if (!res.winners.length) {
      parts.push(el('div', { class: 'warn', textContent: t('noEligible') }));
    } else {
      parts.push(el('h4', { textContent: t('winners') }), ...res.winners.map((c, i) => winnerCard(c, i + 1, false)));
      if (res.backups.length) {
        parts.push(el('h4', { textContent: t('backups') }), ...res.backups.map((c, i) => winnerCard(c, i + 1, true)));
      }
      if (res.winners.length < res.rules.winners) parts.push(el('div', { class: 'warn', textContent: t('fewer', { n: fmt(res.people) }) }));
    }

    const rej = Object.entries(res.rejected).filter(([, n]) => n > 0);
    if (rej.length) {
      parts.push(
        el('h4', { textContent: t('rejectedTitle') }),
        el('div', { class: 'rejects' }, rej.map(([k, n]) => el('span', { class: 'chip' }, t('rej_' + k), el('small', { textContent: fmt(n) }))))
      );
    }
    parts.push(el('p', { class: 'summary', style: 'margin-top:12px', textContent: t('drawnAt', { time: when }) }));

    const copyBtn = btn('', 'copy', t('copy'), async () => {
      await copyText(drawText(ctrl, res, when));
      copyBtn.querySelector('.lbl').textContent = t('copied');
      setTimeout(() => (copyBtn.querySelector('.lbl').textContent = t('copy')), 1500);
    });
    parts.push(
      el(
        'div',
        { class: 'actions' },
        btn('gift', 'dice', t('redraw'), () => runDraw(ctrl)),
        res.winners.length ? copyBtn : null,
        res.winners.length ? btn('', 'download', t('winnersCsv'), () => saveWinners(ctrl, res)) : null,
        res.entries ? btn('', 'download', t('entriesCsv'), () => saveEligible(ctrl, res)) : null
      )
    );
    if (res.winners.length && !reducedMotion()) parts.push(confetti());
    ctrl.drawResult.replaceChildren(...parts);
  }

  function drawText(ctrl, res, when) {
    const line = (c, i) => `${i + 1}. ${c.author}${c.authorUrl ? ' — ' + c.authorUrl : ''}`;
    return [
      `🎁 ${t('drawTitle')} — ${ctrl.data.source}`,
      '',
      `🏆 ${t('winners')}:`,
      ...res.winners.map(line),
      ...(res.backups.length ? ['', `${t('backups')}:`, ...res.backups.map(line)] : []),
      '',
      t('eligible', { e: res.entries, p: res.people, t: res.total }),
      t('drawnAt', { time: when }),
    ].join('\n');
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.append(ta);
      ta.select();
      document.execCommand?.('copy');
      ta.remove();
    }
  }

  const ENTRY_COLUMNS = ['author', 'authorUrl', 'authorId', 'text', 'mentions', 'reactions', 'time', 'permalink'];

  function saveWinners(ctrl, res) {
    const rows = [
      ...res.winners.map((c, i) => ({ rank: i + 1, role: 'winner', ...c })),
      ...res.backups.map((c, i) => ({ rank: i + 1, role: 'backup', ...c })),
    ];
    const name = api.fileBase(ctrl.data.source).replace(/^comments-/, 'winners-') + '.csv';
    api.saveCSV(name, rows, ['rank', 'role', ...ENTRY_COLUMNS]);
  }

  function saveEligible(ctrl, res) {
    const name = api.fileBase(ctrl.data.source).replace(/^comments-/, 'eligible-') + '.csv';
    api.saveCSV(name, res.eligibleComments, ENTRY_COLUMNS);
  }

  // ---------- keep the page in sync ----------

  function scan() {
    for (const [target, ctrl] of controllers) {
      if (!target.isConnected || inChat(target) || CHAT_PATH.test(location.pathname)) {
        ctrl.toolbarHost.remove();
        ctrl.panelHost.remove();
        controllers.delete(target);
      } else {
        place(ctrl);
      }
    }
    const posts = findPosts();
    for (const p of posts) if (!controllers.has(p)) mount(p, 'post');
    for (const d of findDialogs(posts)) if (!controllers.has(d)) mount(d, 'dialog');
  }

  loadFonts();
  let timer = 0;
  const isHost = (n) => n.classList?.contains('fbce-host');
  new MutationObserver((records) => {
    // Ignore our own insertions (changes inside our shadow roots aren't observed at all).
    if (records.every((r) => !r.removedNodes.length && [...r.addedNodes].every(isHost))) return;
    clearTimeout(timer);
    timer = setTimeout(scan, 400);
  }).observe(document.body, { childList: true, subtree: true });
  scan();
})();
