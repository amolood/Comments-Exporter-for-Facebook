// Runs content/scraper.js + content/post-tools.js against a feed-like page in jsdom.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';

const root = new URL('..', import.meta.url);
const scraper = readFileSync(new URL('content/scraper.js', root), 'utf8');
const tools = readFileSync(new URL('content/post-tools.js', root), 'utf8');

const comment = (id, author, text, reactions = '') => `
  <div role="article" aria-label="Comment by ${author}">
    <a href="https://www.facebook.com/${author}?comment_id=${id}"><span dir="auto">${author}</span></a>
    <div dir="auto" style="text-align: start;">${text}</div>
    ${reactions ? `<div role="button" aria-label="${reactions} reactions; see who reacted to this"></div>` : ''}
    <a href="https://www.facebook.com/p/posts/1?comment_id=${id}">1h</a>
  </div>`;

const FEED = `<!doctype html><html lang="ar"><body><div role="main"><div role="feed">
  <div aria-posinset="1" id="p1">
    <a href="https://www.facebook.com/p/posts/1"><span>Page</span></a>
    <div dir="auto">Post one</div>
    <span>كل التفاعلات:2.5K</span>
    <div role="button"><span>4 comments</span></div>
    <span>7 shares</span>
    ${comment(11, 'ali', 'الخدمة ممتازة جدا 😍😍')}
    ${comment(12, 'sara', 'الخدمة سيئة 😡', '5')}
    <div role="button" id="more"><span>View more comments</span></div>
  </div>
  <div aria-posinset="2" id="p2">
    <a href="https://www.facebook.com/p/posts/2"><span>Page</span></a>
    <div dir="auto">Post two, no comments loaded</div>
  </div>
</div></div></body></html>`;

function setup() {
  const dom = new JSDOM(FEED, { url: 'https://www.facebook.com/', runScripts: 'outside-only' });
  const { window } = dom;
  const doc = window.document;
  const downloads = [];
  window.URL.createObjectURL = () => 'blob:x';
  window.URL.revokeObjectURL = () => {};
  window.Blob = class {
    constructor(parts) {
      this.content = parts.join('');
    }
  };
  window.HTMLAnchorElement.prototype.click = function () {
    if (this.download) downloads.push(this.download);
  };
  doc.getElementById('more').addEventListener('click', (e) => {
    e.currentTarget.outerHTML = comment(13, 'ali', 'فعلا الخدمة ممتازة', '2');
  });
  window.eval(scraper);
  window.eval(tools);
  return { window, doc, downloads };
}

const shadow = (doc, postId, kind) =>
  doc.querySelector(`#${postId} > .fbce-host[data-fbce="${kind}"]`).shadowRoot;

async function until(fn, ms = 3000) {
  const end = Date.now() + ms;
  while (!fn()) {
    if (Date.now() > end) throw new Error('timeout');
    await new Promise((r) => setTimeout(r, 20));
  }
}

test('adds a toolbar to each feed post, and a hidden panel under it', () => {
  const { doc } = setup();
  for (const id of ['p1', 'p2']) {
    const post = doc.getElementById(id);
    assert.equal(post.firstElementChild.dataset.fbce, 'toolbar');
    assert.equal(post.lastElementChild.dataset.fbce, 'panel');
    assert.equal(post.lastElementChild.hidden, true);
  }
  const labels = [...shadow(doc, 'p1', 'toolbar').querySelectorAll('button')].map((b) => b.textContent);
  assert.deepEqual(labels, ['تحليل التعليقات', 'سحب الفائزين', 'CSV', 'JSON']);
  // Comments don't get toolbars.
  assert.equal(doc.querySelectorAll('.fbce-host[data-fbce="toolbar"]').length, 2);
});

test('Analyze loads the comments and renders the analysis under the post', async () => {
  const { window, doc } = setup();
  // Fast run: the toolbar reads options from storage; give it a tiny delay.
  window.chrome = { storage: { local: { get: async () => ({ options: { delay: 5 } }) } } };
  shadow(doc, 'p1', 'toolbar').querySelector('button.primary').click();

  const panel = shadow(doc, 'p1', 'panel');
  await until(() => panel.querySelector('.grid'));
  assert.equal(doc.getElementById('p1').lastElementChild.hidden, false);

  const stats = Object.fromEntries(
    [...panel.querySelectorAll('.stat')].map((s) => [s.querySelector('span').textContent, s.querySelector('b').textContent])
  );
  const facts = [...panel.querySelectorAll('.fact')].map((f) => f.textContent);
  assert.deepEqual(facts, ['2,500التفاعلات', '4التعليقات', '7المشاركات']);
  // Coverage ring: 3 loaded of Facebook's 4.
  assert.equal(panel.querySelector('.ring .val').textContent, '75%');
  assert.equal(stats['التعليقات'], '3'); // 2 + 1 loaded by "View more comments"
  assert.equal(stats['أشخاص'], '2');
  assert.equal(stats['تفاعلات التعليقات'], '7');

  const text = panel.textContent;
  assert.match(text, /الأكثر نشاطًا/);
  assert.match(text, /ali.*2 تعليق/);
  const chips = [...panel.querySelectorAll('.chip')].map((c) => c.textContent);
  assert.ok(chips.includes('الخدمة3'), chips.join(' | '));
  assert.ok(chips.includes('ممتازة2'), chips.join(' | '));
  assert.ok(chips.includes('😍2'), chips.join(' | '));
  // Comments of the other post are untouched.
  assert.equal(doc.getElementById('p2').lastElementChild.hidden, true);
});

test('CSV button analyzes if needed, then downloads with the post id in the name', async () => {
  const { window, doc, downloads } = setup();
  window.chrome = { storage: { local: { get: async () => ({ options: { delay: 5 } }) } } };
  shadow(doc, 'p1', 'toolbar').querySelectorAll('button')[2].click();
  await until(() => downloads.length);
  assert.match(downloads[0], /^comments-1-.*\.csv$/);
});

test('re-adds the toolbar if Facebook re-renders the post', async () => {
  const { doc } = setup();
  const post = doc.getElementById('p2');
  post.firstElementChild.remove();
  await until(() => post.firstElementChild?.dataset?.fbce === 'toolbar');
});

test('Analyze shows a progress bar with a percentage, and Cancel discards the run', async () => {
  const { window, doc } = setup();
  // Slow rounds so there is time to cancel.
  window.chrome = { storage: { local: { get: async () => ({ options: { delay: 400 } }) } } };
  const toolbar = shadow(doc, 'p1', 'toolbar');
  toolbar.querySelector('button.primary').click();

  const panel = shadow(doc, 'p1', 'panel');
  const progress = () => panel.querySelector('.progress');
  await until(() => progress() && !progress().hidden && /%/.test(panel.querySelector('.ptext').textContent));
  assert.match(panel.querySelector('.ptext').textContent, /من ~4 تعليق · \d+%/);
  assert.match(panel.querySelector('.pfill').style.width, /^\d+%$/);
  assert.equal(toolbar.querySelector('button.primary').textContent, 'جارٍ التحليل…');

  panel.querySelector('button.danger').click();
  await until(() => progress().hidden);
  assert.equal(panel.querySelector('.status').textContent, 'تم إلغاء التحليل.');
  assert.equal(panel.querySelector('.grid'), null, 'no results after cancel');
  assert.equal(toolbar.querySelector('button.primary').textContent, 'تحليل التعليقات');
  assert.equal(window.__fbce.isRunning(), false);
});

test('Pick winners: applies the conditions and shows the winners', async () => {
  const { window, doc, downloads } = setup();
  const saved = {};
  window.chrome = {
    storage: {
      local: {
        get: async (k) => (k === 'drawRules' ? { drawRules: saved.drawRules } : { options: { delay: 5 } }),
        set: async (o) => Object.assign(saved, o),
      },
    },
  };
  shadow(doc, 'p1', 'toolbar').querySelector('button.gift').click();
  const panel = shadow(doc, 'p1', 'panel');
  await until(() => panel.querySelector('[role="tabpanel"]:not([hidden]) .draw fieldset'));
  assert.equal(panel.querySelector('[role="tab"][aria-selected="true"]').textContent, 'السحب');

  // Only comments containing "ممتازة" qualify -> ali (2 such comments, one entry).
  const kw = panel.querySelector('.kw input');
  kw.value = 'ممتازة';
  panel.querySelector('.draw .actions button').click();
  await until(() => panel.querySelector('.winner'));

  const winners = [...panel.querySelectorAll('.winner .who > a')].map((a) => a.textContent);
  assert.deepEqual(winners, ['ali']);
  const stage = panel.querySelector('.stage').textContent;
  assert.match(stage, /1 مشاركة مؤهلة من 1 شخص، من أصل 3 تعليق/);
  assert.match(stage, /بدون الكلمات المطلوبة1/);
  assert.match(stage, /مشاركات مكررة1/);
  assert.equal(saved.drawRules.keywords, 'ممتازة');

  [...panel.querySelectorAll('.stage .actions button')].find((b) => /CSV الفائزين/.test(b.textContent)).click();
  assert.match(downloads.at(-1), /^winners-1-.*\.csv$/);
});

test('does not add buttons to chat windows, message lists or Messenger pages', async () => {
  const html = `<!doctype html><html lang="ar"><body>
    <div role="main"><div role="feed"><div aria-posinset="1" id="post">
      <a href="https://www.facebook.com/p/posts/9"><span>Page</span></a><div dir="auto">A post</div>
    </div></div></div>
    <div aria-label="Chat with Sara" id="chat">
      <div role="article" id="msg1"><div dir="auto">hi, see https://www.facebook.com/p/posts/9</div>
        <a href="https://www.facebook.com/p/posts/9">shared post</a></div>
    </div>
    <div role="grid" aria-label="Messages"><div role="row"><div role="article" id="msg2">
      <a href="https://www.facebook.com/p/posts/9">shared</a></div></div></div>
    <div role="article" id="plain"><div dir="auto">An article with no post signals</div></div>
  </body></html>`;
  const dom = new JSDOM(html, { url: 'https://www.facebook.com/', runScripts: 'outside-only' });
  dom.window.eval(scraper);
  dom.window.eval(tools);
  const doc = dom.window.document;
  const hosts = [...doc.querySelectorAll('.fbce-host[data-fbce="toolbar"]')].map((h) => h.parentElement.id);
  assert.deepEqual(hosts, ['post']);

  const msgr = new JSDOM(html, { url: 'https://www.facebook.com/messages/t/123', runScripts: 'outside-only' });
  msgr.window.eval(scraper);
  msgr.window.eval(tools);
  assert.equal(msgr.window.document.querySelectorAll('.fbce-host').length, 0);
});

test('follows the comments into the popup Facebook opens, and stops scrolling the page', async () => {
  const { window, doc } = setup();
  window.chrome = { storage: { local: { get: async () => ({ options: { delay: 5 } }) } } };
  // In the feed, "View more comments" opens the post in a dialog instead of loading inline.
  const more = doc.getElementById('more');
  more.replaceWith(more.cloneNode(true)); // drop the inline-loading handler from setup()
  let closed = 0;
  doc.getElementById('more').addEventListener('click', () => {
    if (doc.querySelector('[role="dialog"]')) return;
    const dlg = doc.createElement('div');
    dlg.setAttribute('role', 'dialog');
    dlg.innerHTML = `<div aria-label="Close" role="button" id="x"></div><div id="dscroll" style="overflow-y:auto">
      ${comment(11, 'ali', 'الخدمة ممتازة جدا 😍😍')}${comment(12, 'sara', 'الخدمة سيئة 😡', '5')}
      ${comment(21, 'omar', 'تعليق داخل النافذة')}${comment(22, 'huda', 'تعليق آخر داخل النافذة')}</div>`;
    doc.body.append(dlg);
    dlg.querySelector('#x').addEventListener('click', () => {
      closed++;
      dlg.remove();
    });
  });
  const pageScrolls = [];
  window.Element.prototype.scrollIntoView = function () {
    if (!this.closest('[role="dialog"]')) pageScrolls.push(this);
  };

  shadow(doc, 'p1', 'toolbar').querySelector('button.primary').click();
  const panel = shadow(doc, 'p1', 'panel');
  await until(() => panel.querySelector('.grid'), 8000);

  const stats = Object.fromEntries(
    [...panel.querySelectorAll('.stat')].map((s) => [s.querySelector('span').textContent, s.querySelector('b').textContent])
  );
  assert.equal(stats['التعليقات'], '4', 'comments read from the dialog');
  assert.equal(closed, 1, 'the dialog we followed is closed at the end');
  // Only our panel may be scrolled into view; no comment or post in the page behind.
  assert.deepEqual(pageScrolls.filter((e) => !e.classList.contains('fbce-host')), []);
});

// Modelled on a real Facebook post dialog (English UI, Arabic digits):
// comments load when the "Loading..." marker is scrolled into view, reply
// buttons read "View ١ reply", comment reactions are labelled "NaN reactions"
// with the number as text, and the post's counts live in aria-labels.
test('real dialog layout: loads past the first 10, opens "View ١ reply", reads Arabic-digit counts', async () => {
  const ar = (n) => String(n).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);
  const cmt = (i) => `
    <div role="article" aria-label="Comment by User ${i} ${ar(2)} hours ago">
      <a href="https://www.facebook.com/u${i}?comment_id=${i}"><span dir="auto">User ${i}</span></a>
      <div dir="auto" style="text-align: start;">comment ${i}</div>
      <div role="button" aria-label="NaN reactions; see who reacted to this"><span>${ar(2)}</span></div>
      <a href="https://www.facebook.com/x/posts/1?comment_id=${i}">${ar(2)}h</a>
    </div>`;
  let first = '';
  for (let i = 1; i <= 10; i++) first += cmt(i);
  const html = `<!doctype html><html lang="en"><body><div role="main"><div style="height:3000px">feed</div></div>
    <div role="dialog" aria-modal="true"><div id="scroller" style="overflow-y:auto">
      <div role="article">
        <a href="https://www.facebook.com/x"><span>Some Page</span></a>
        <div role="button" aria-label="React with Like to Some Page's post"><span>${ar(40)}</span></div>
        <div role="button" aria-label="Comment on Some Page's post, ${ar(25)} comments"><span>${ar(25)}</span></div>
        <div role="button" aria-label="Share Some Page's post, ${ar(3)} shares"><span>${ar(3)}</span></div>
        <div id="list">${first}<div role="button" id="vr"><span>View ${ar(1)} reply</span></div></div>
        <div aria-label="Loading..." role="status" data-visualcompletion="loading-state" id="loading"></div>
      </div>
    </div></div></body></html>`;
  const dom = new JSDOM(html, { url: 'https://www.facebook.com/x/posts/1', runScripts: 'outside-only' });
  const { window } = dom;
  const doc = window.document;
  window.chrome = { storage: { local: { get: async () => ({ options: { delay: 5, sortAll: false } }) } } };

  let n = 10;
  let pageY = 0;
  Object.defineProperty(window, 'scrollY', { get: () => pageY });
  window.scrollTo = (x, y) => (pageY = y);
  window.Element.prototype.scrollIntoView = function () {
    pageY = 999; // the browser would move the page too
    if (this.id !== 'loading') return;
    const list = doc.getElementById('list');
    for (let k = 0; k < 10 && n < 25; k++) list.insertAdjacentHTML('beforeend', cmt(++n));
    if (n >= 25) this.remove(); // no more to load
  };
  doc.getElementById('vr').addEventListener('click', (e) => {
    e.currentTarget.outerHTML = `<div role="article" aria-label="Reply by User 99">
      <a href="https://www.facebook.com/u99?comment_id=1&amp;reply_comment_id=99"><span dir="auto">User 99</span></a>
      <div dir="auto" style="text-align: start;">a reply</div></div>`;
  });

  window.eval(scraper);
  window.eval(tools);
  const toolbar = doc.querySelector('.fbce-host[data-fbce="toolbar"]');
  assert.equal(toolbar.parentElement.getAttribute('role'), 'article');
  toolbar.shadowRoot.querySelector('button.primary').click();
  const panel = doc.querySelector('.fbce-host[data-fbce="panel"]').shadowRoot;
  await until(() => panel.querySelector('.grid'), 8000);

  const stats = Object.fromEntries(
    [...panel.querySelectorAll('.stat')].map((s) => [s.querySelector('span').textContent, s.querySelector('b').textContent])
  );
  assert.equal(stats['Comments'], '25', 'loaded past the first 10');
  assert.equal(stats['Replies'], '1', '"View ١ reply" was opened');
  assert.equal(stats['Reactions on comments'], '50', '"NaN reactions" read from the button text (25 comments x 2)');
  const facts = [...panel.querySelectorAll('.fact')].map((f) => f.textContent);
  assert.deepEqual(facts, ['40Reactions', '25Comments', '3Shares']);
  assert.equal(pageY, 0, 'the page behind the dialog was put back');
});
