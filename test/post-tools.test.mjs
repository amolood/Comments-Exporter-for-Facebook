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
