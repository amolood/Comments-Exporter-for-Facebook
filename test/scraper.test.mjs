// Runs content/scraper.js against test/fixture.html in jsdom.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';

const root = new URL('..', import.meta.url);
const scraper = readFileSync(new URL('content/scraper.js', root), 'utf8');
const fixture = readFileSync(new URL('test/fixture.html', root), 'utf8');

function setup() {
  const dom = new JSDOM(fixture, {
    url: 'https://www.facebook.com/somepage/posts/123',
    runScripts: 'outside-only',
  });
  const { window } = dom;
  const doc = window.document;
  const downloads = [];
  const blobs = new Map();
  window.URL.createObjectURL = (b) => {
    const u = `blob:${blobs.size}`;
    blobs.set(u, b);
    return u;
  };
  window.URL.revokeObjectURL = () => {};
  // jsdom's Blob has no .text(); keep the raw string instead.
  window.Blob = class {
    constructor(parts) {
      this.content = parts.join('');
    }
    async text() {
      return this.content;
    }
  };
  window.HTMLAnchorElement.prototype.click = function () {
    if (this.download) downloads.push({ name: this.download, blob: blobs.get(this.href) });
  };

  // Simulate Facebook loading content when buttons are clicked.
  doc.getElementById('sort').addEventListener('click', () => (doc.getElementById('menu').hidden = false));
  doc.getElementById('allItem').addEventListener('click', () => {
    doc.querySelector('#sort span').textContent = 'All comments';
  });
  doc.getElementById('viewReplies').addEventListener('click', (e) => {
    e.currentTarget.outerHTML = `
      <div role="article" aria-label="Reply by Omar to Ali Ahmed's comment">
        <a href="https://www.facebook.com/omar?comment_id=111&amp;reply_comment_id=444"><span dir="auto">Omar</span></a>
        <div dir="auto" style="text-align: start;">A reply</div>
        <div role="button" aria-label="3 reactions; see who reacted to this"></div>
        <a href="https://www.facebook.com/somepage/posts/123?comment_id=111&amp;reply_comment_id=444">5m</a>
      </div>`;
  });
  doc.getElementById('more').addEventListener('click', (e) => {
    e.currentTarget.outerHTML = `
      <div role="article" aria-label="Comment by Lina">
        <a href="https://www.facebook.com/groups/9/user/555/?comment_id=666"><span dir="auto">Lina</span></a>
        <div dir="auto" style="text-align: start;">Loaded later</div>
        <a href="https://www.facebook.com/somepage/posts/123?comment_id=666">3h</a>
      </div>`;
  });

  window.eval(scraper);
  return { window, downloads };
}

test('parseCount handles suffixes, separators and Arabic digits', () => {
  const { parseCount } = setup().window.__fbce._test;
  assert.equal(parseCount('12 reactions'), 12);
  assert.equal(parseCount('1,234'), 1234);
  assert.equal(parseCount('1.2K reactions'), 1200);
  assert.equal(parseCount('3M'), 3000000);
  assert.equal(parseCount('١٢ تفاعلًا'), 12);
  assert.equal(parseCount('٣ ألف'), 3000);
  assert.equal(parseCount(''), 0);
});

test('run expands, parses and downloads CSV + JSON', async () => {
  const { window, downloads } = setup();
  const res = await window.__fbce.run({ format: 'both', delay: 5 });
  assert.equal(res.ok, true, res.error);

  assert.equal(window.document.querySelector('#sort span').textContent, 'All comments');
  assert.deepEqual(
    [...downloads.map((d) => d.name.replace(/-\d{4}.*\./, '.'))],
    ['comments-123.csv', 'comments-123.json']
  );

  const json = JSON.parse(await downloads[1].blob.text());
  const byId = Object.fromEntries(json.comments.map((c) => [c.id, c]));
  assert.deepEqual(Object.keys(byId).sort(), ['111', '222', '333', '444', '666']);

  assert.deepEqual(
    { ...byId['111'], permalink: undefined },
    {
      id: '111', parentId: null, type: 'comment', author: 'Ali Ahmed',
      authorUrl: 'https://www.facebook.com/ali.ahmed', authorId: '',
      text: 'First comment, with "quotes" and a mention Sara', mentions: 1,
      reactions: 1200, replies: 1, time: '2h', permalink: undefined,
    }
  );
  assert.equal(byId['222'].author, 'سارة محمد');
  assert.equal(byId['222'].authorUrl, 'https://www.facebook.com/profile.php?id=100099');
  assert.equal(byId['222'].authorId, '100099');
  assert.equal(byId['222'].text, '=تعليق ثاني\nسطر ثاني');
  assert.equal(byId['222'].reactions, 12);
  assert.equal(byId['444'].parentId, '111');
  assert.equal(byId['444'].type, 'reply');
  assert.equal(byId['666'].authorId, '555');

  assert.equal(json.summary.total, 5);
  assert.equal(json.summary.replies, 1);
  assert.equal(json.summary.uniqueAuthors, 4);
  assert.equal(json.summary.topCommenters[0].author, 'Ali Ahmed');
  assert.equal(json.summary.topCommenters[0].comments, 2);
  assert.equal(json.summary.topComments[0].reactions, 1200);

  const csv = await downloads[0].blob.text();
  assert.ok(csv.startsWith('﻿id,parentId,type,'));
  assert.ok(csv.includes('"First comment, with ""quotes"" and a mention Sara"'));
  assert.ok(csv.includes(`"'=تعليق ثاني\nسطر ثاني"`), 'formula injection guarded');
});

test('includeReplies=false skips replies', async () => {
  const { window, downloads } = setup();
  const res = await window.__fbce.run({ format: 'json', delay: 5, includeReplies: false });
  assert.equal(res.ok, true);
  const json = JSON.parse(await downloads[0].blob.text());
  assert.ok(json.comments.every((c) => !c.parentId));
  assert.equal(json.comments.length, 4);
});

test('reports no-comments on a page without comments', async () => {
  const dom = new JSDOM('<div role="main"><p>nothing</p></div>', {
    url: 'https://www.facebook.com/',
    runScripts: 'outside-only',
  });
  dom.window.eval(scraper);
  const res = await dom.window.__fbce.run({ delay: 1 });
  assert.deepEqual({ ...res }, { ok: false, error: 'no-comments' });
});

test('drawWinners filters by the rules and never picks a person twice', () => {
  const { drawWinners } = setup().window.__fbce._test;
  const c = (id, author, text, extra = {}) => ({
    id, author, authorUrl: `https://www.facebook.com/${author}`, text, mentions: 0, parentId: null, ...extra,
  });
  const comments = [
    c('1', 'ali', 'أنا مشارك #مسابقة', { mentions: 2 }),
    c('2', 'ali', 'مشارك مرة تانية #مسابقة', { mentions: 3 }),
    c('3', 'sara', 'مشاركة #مسابقة', { mentions: 1 }),
    c('4', 'omar', 'بدون هاشتاق', { mentions: 5 }),
    c('5', 'lina', 'رد #مسابقة', { mentions: 2, parentId: '1' }),
    c('6', 'page', 'المنشور #مسابقة', { mentions: 2 }),
    c('7', 'nour', 'إشتراك #مسابقة', { mentions: 2 }),
  ];
  const rules = { winners: 2, backups: 5, keywords: '#مسابقة', minMentions: 2, topLevelOnly: true, exclude: 'Page' };
  const res = drawWinners(comments, rules, () => 0);
  assert.equal(res.entries, 2); // ali (once) + nour
  assert.deepEqual({ ...res.rejected }, { reply: 1, excluded: 1, keyword: 1, mentions: 1, length: 0, duplicate: 1 });
  assert.deepEqual([...[...res.winners, ...res.backups].map((w) => w.author)].sort(), ['ali', 'nour']);
  assert.equal(res.backups.length, 0);

  // Without one-entry-per-person, ali has 2 entries but still wins only once.
  const multi = drawWinners(comments, { ...rules, onePerPerson: false, winners: 3 }, () => 0);
  assert.equal(multi.entries, 3);
  assert.deepEqual([...multi.winners.map((w) => w.author)].sort(), ['ali', 'nour']);

  // Keyword matching ignores diacritics and alef forms: "اشتراك" matches "إشتراك".
  assert.equal(drawWinners(comments, { keywords: 'اشتراك' }).entries, 1);

  // Real RNG: over many draws, every eligible person can win.
  const seen = new Set();
  for (let i = 0; i < 200; i++) seen.add(drawWinners(comments, rules).winners[0].author);
  assert.deepEqual([...seen].sort(), ['ali', 'nour']);
});

test('in a dialog, scrolls the dialog\'s own scroller and never the page behind it', async () => {
  const html = `<div role="main"><div role="article" id="behind">page post</div></div>
    <div role="dialog"><div id="scroller" style="overflow-y: auto">
      <div role="article"><a href="https://www.facebook.com/a?comment_id=1"><span dir="auto">A</span></a>
        <div dir="auto" style="text-align: start;">hi</div></div>
    </div></div>`;
  const dom = new JSDOM(html, { url: 'https://www.facebook.com/p/posts/1', runScripts: 'outside-only' });
  const { window } = dom;
  const scroller = window.document.getElementById('scroller');
  Object.defineProperty(scroller, 'scrollHeight', { get: () => 900 });
  Object.defineProperty(scroller, 'clientHeight', { get: () => 300 });
  const tops = [];
  Object.defineProperty(scroller, 'scrollTop', { get: () => 0, set: (v) => tops.push(v) });
  let pageScrolls = 0;
  window.Element.prototype.scrollIntoView = () => pageScrolls++;
  window.scrollTo = window.scrollBy = () => pageScrolls++;

  window.eval(scraper);
  const res = await window.__fbce.analyze(null, { delay: 1, sortAll: false });
  assert.equal(res.ok, true);
  assert.equal(res.summary.total, 1);
  assert.ok(tops.length >= 1 && tops.every((v) => v === 900), 'dialog scroller scrolled');
  assert.equal(pageScrolls, 0, 'page behind the dialog not scrolled');
});

test('keeps scrolling while scrolling still loads comments', async () => {
  const dom = new JSDOM('<div role="dialog"><div id="sc" style="overflow-y: auto"></div></div>', {
    url: 'https://www.facebook.com/p/posts/1',
    runScripts: 'outside-only',
  });
  const { window } = dom;
  const sc = window.document.getElementById('sc');
  let n = 0;
  const add = () => {
    for (let i = 0; i < 5 && n < 40; i++) {
      n++;
      sc.insertAdjacentHTML(
        'beforeend',
        `<div role="article"><a href="https://www.facebook.com/u${n}?comment_id=${n}"><span dir="auto">U${n}</span></a>
         <div dir="auto" style="text-align: start;">c${n}</div></div>`
      );
    }
  };
  add();
  Object.defineProperty(sc, 'scrollHeight', { get: () => 1000 });
  Object.defineProperty(sc, 'clientHeight', { get: () => 300 });
  Object.defineProperty(sc, 'scrollTop', { get: () => 0, set: add }); // each scroll loads 5 more
  window.eval(scraper);
  const res = await window.__fbce.analyze(null, { delay: 1, sortAll: false });
  assert.equal(res.summary.total, 40);
});

test('finds the scroller when it wraps the dialog (Facebook\'s layer), not inside it', async () => {
  const dom = new JSDOM('<div id="layer" style="overflow-y: auto"><div role="dialog" id="dlg"></div></div>', {
    url: 'https://www.facebook.com/p/posts/1',
    runScripts: 'outside-only',
  });
  const { window } = dom;
  const layer = window.document.getElementById('layer');
  const dlg = window.document.getElementById('dlg');
  let n = 0;
  const add = () => {
    for (let i = 0; i < 10 && n < 35; i++) {
      n++;
      dlg.insertAdjacentHTML(
        'beforeend',
        `<div role="article"><a href="https://www.facebook.com/u${n}?comment_id=${n}"><span dir="auto">U${n}</span></a>
         <div dir="auto" style="text-align: start;">c${n}</div></div>`
      );
    }
  };
  add(); // Facebook shows the first 10
  Object.defineProperty(layer, 'scrollHeight', { get: () => 1000 });
  Object.defineProperty(layer, 'clientHeight', { get: () => 300 });
  Object.defineProperty(layer, 'scrollTop', { get: () => 0, set: add });
  let pageScrolls = 0;
  window.Element.prototype.scrollIntoView = () => pageScrolls++;
  window.eval(scraper);
  const res = await window.__fbce.analyze(null, { delay: 1, sortAll: false });
  assert.equal(res.summary.total, 35);
  assert.equal(pageScrolls, 0);
});

test('with no scroller found, scrolls into view but puts the page back', async () => {
  const dom = new JSDOM(
    `<div role="dialog"><div role="article"><a href="https://www.facebook.com/a?comment_id=1"><span dir="auto">A</span></a>
     <div dir="auto" style="text-align: start;">hi</div></div></div>`,
    { url: 'https://www.facebook.com/p/posts/1', runScripts: 'outside-only' }
  );
  const { window } = dom;
  let y = 500;
  Object.defineProperty(window, 'scrollY', { get: () => y });
  let intoView = 0;
  window.Element.prototype.scrollIntoView = () => {
    intoView++;
    y = 900; // the browser also moved the page
  };
  const restored = [];
  window.scrollTo = (sx, sy) => {
    restored.push(sy);
    y = sy;
  };
  window.eval(scraper);
  await window.__fbce.analyze(null, { delay: 1, sortAll: false });
  assert.ok(intoView >= 1);
  assert.ok(restored.length >= 1 && restored.every((v) => v === 500));
  assert.equal(y, 500);
});
