const STRINGS = {
  en: {
    title: 'Comment Exporter',
    hint: 'Open a post (or its comments dialog), then press Export.',
    format: 'Format',
    maxComments: 'Max comments (0 = all)',
    includeReplies: 'Include replies',
    expandText: 'Expand long comments ("See more")',
    sortAll: 'Switch to "All comments"',
    export: 'Export',
    stop: 'Stop',
    topCommenters: 'Top commenters',
    topComments: 'Most reacted comments',
    notFacebook: 'Open a Facebook post in this tab first.',
    starting: 'Starting…',
    sorting: 'Switching to "All comments"…',
    expanding: 'Loading comments… {n} found',
    done: 'Done — {n} comments exported.',
    stopped: 'Stopped — {n} comments exported.',
    total: 'Total',
    replies: 'Replies',
    people: 'People',
    commentsUnit: 'comments',
    reactionsUnit: 'reactions',
    'no-comments': 'No comments found. Open the post itself (or its comments dialog) and try again.',
    'already-running': 'An export is already running in this tab.',
  },
  ar: {
    title: 'مُصدِّر التعليقات',
    hint: 'افتح المنشور (أو نافذة التعليقات) ثم اضغط تصدير.',
    format: 'الصيغة',
    maxComments: 'أقصى عدد (0 = الكل)',
    includeReplies: 'تضمين الردود',
    expandText: 'توسيع التعليقات الطويلة ("عرض المزيد")',
    sortAll: 'التبديل إلى "كل التعليقات"',
    export: 'تصدير',
    stop: 'إيقاف',
    topCommenters: 'أكثر المعلّقين',
    topComments: 'أكثر التعليقات تفاعلاً',
    notFacebook: 'افتح منشورًا على فيسبوك في هذا التبويب أولاً.',
    starting: 'جارٍ البدء…',
    sorting: 'جارٍ التبديل إلى "كل التعليقات"…',
    expanding: 'جارٍ تحميل التعليقات… {n}',
    done: 'تم — صُدِّر {n} تعليق.',
    stopped: 'أُوقف — صُدِّر {n} تعليق.',
    total: 'الإجمالي',
    replies: 'الردود',
    people: 'أشخاص',
    commentsUnit: 'تعليق',
    reactionsUnit: 'تفاعل',
    'no-comments': 'لم يتم العثور على تعليقات. افتح المنشور نفسه (أو نافذة التعليقات) وحاول مجددًا.',
    'already-running': 'يوجد تصدير قيد التشغيل في هذا التبويب.',
  },
};

const lang = chrome.i18n.getUILanguage().toLowerCase().startsWith('ar') ? 'ar' : 'en';
const t = (key, vars = {}) =>
  (STRINGS[lang][key] ?? STRINGS.en[key] ?? key).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');

document.documentElement.lang = lang;
document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
for (const el of document.querySelectorAll('[data-i18n]')) el.textContent = t(el.dataset.i18n);

const $ = (id) => document.getElementById(id);
const form = $('opts');
const exportBtn = $('export');
const stopBtn = $('stop');
const statusEl = $('status');

const FB_URL = /^https:\/\/(www|web)\.facebook\.com\//;
const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
const tabId = tab?.id;

function setStatus(msg, isError = false) {
  statusEl.textContent = msg;
  statusEl.classList.toggle('error', isError);
}

function setRunning(running) {
  exportBtn.disabled = running;
  stopBtn.hidden = !running;
  for (const el of form.elements) el.disabled = running;
}

function readOptions() {
  const f = form.elements;
  return {
    format: f.format.value,
    maxComments: Math.max(0, parseInt(f.maxComments.value, 10) || 0),
    includeReplies: f.includeReplies.checked,
    expandText: f.expandText.checked,
    sortAll: f.sortAll.checked,
  };
}

function applyOptions(o = {}) {
  const f = form.elements;
  if (o.format) f.format.value = o.format;
  if (o.maxComments != null) f.maxComments.value = o.maxComments;
  for (const k of ['includeReplies', 'expandText', 'sortAll']) if (k in o) f[k].checked = o[k];
}

function li(parent, build) {
  const item = document.createElement('li');
  build(item);
  parent.appendChild(item);
}

function link(text, href) {
  const a = document.createElement('a');
  a.textContent = text;
  a.href = href;
  a.target = '_blank';
  a.rel = 'noopener';
  return a;
}

function small(text) {
  const s = document.createElement('small');
  s.textContent = ` — ${text}`;
  return s;
}

function renderSummary(s) {
  if (!s) return;
  $('summary').hidden = false;
  const stats = $('stats');
  stats.replaceChildren();
  for (const [label, value] of [
    [t('total'), s.total],
    [t('replies'), s.replies],
    [t('people'), s.uniqueAuthors],
  ]) {
    const d = document.createElement('div');
    d.className = 'stat';
    const b = document.createElement('b');
    b.textContent = value.toLocaleString();
    const sp = document.createElement('span');
    sp.textContent = label;
    d.append(b, sp);
    stats.appendChild(d);
  }

  const tc = $('topCommenters');
  tc.replaceChildren();
  for (const a of s.topCommenters) {
    li(tc, (item) => {
      item.append(
        a.authorUrl ? link(a.author || '?', a.authorUrl) : document.createTextNode(a.author || '?'),
        small(`${a.comments} ${t('commentsUnit')} · ${a.reactions} ${t('reactionsUnit')}`)
      );
    });
  }

  const top = $('topComments');
  top.replaceChildren();
  for (const c of s.topComments) {
    li(top, (item) => {
      item.append(link(c.author || '?', c.permalink), small(`${c.reactions} ${t('reactionsUnit')}`));
      const p = document.createElement('div');
      p.textContent = c.text;
      item.appendChild(p);
    });
  }
}

function onProgress(msg) {
  if (msg?.type !== 'fbce-progress') return;
  switch (msg.phase) {
    case 'sorting':
      setStatus(t('sorting'));
      break;
    case 'expanding':
      setStatus(t('expanding', { n: msg.found }));
      break;
    case 'done':
      setRunning(false);
      setStatus(t(msg.stopped ? 'stopped' : 'done', { n: msg.summary.total }));
      renderSummary(msg.summary);
      break;
    case 'error':
      setRunning(false);
      setStatus(t(msg.error), true);
      break;
  }
}

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (sender.tab?.id === tabId) onProgress(msg);
});

async function inject() {
  await chrome.scripting.executeScript({ target: { tabId }, files: ['content/scraper.js'] });
}

exportBtn.addEventListener('click', async () => {
  const opts = readOptions();
  chrome.storage.local.set({ options: opts });
  setRunning(true);
  setStatus(t('starting'));
  $('summary').hidden = true;
  try {
    await inject();
    // Don't await the run: progress arrives via messages, and the export
    // keeps going (and downloads) even if this popup is closed.
    chrome.scripting
      .executeScript({ target: { tabId }, func: (o) => window.__fbce.run(o), args: [opts] })
      .catch((e) => {
        setRunning(false);
        setStatus(e.message, true);
      });
  } catch (e) {
    setRunning(false);
    setStatus(e.message, true);
  }
});

stopBtn.addEventListener('click', () => {
  chrome.scripting.executeScript({ target: { tabId }, func: () => window.__fbce?.stop() });
});

// ---------- init ----------
const { options, lastResult } = await chrome.storage.local.get(['options', 'lastResult']);
applyOptions(options);

if (!FB_URL.test(tab?.url || '')) {
  exportBtn.disabled = true;
  setStatus(t('notFacebook'), true);
} else {
  if (lastResult?.source === tab.url) renderSummary(lastResult.summary);
  try {
    const [res] = await chrome.scripting.executeScript({
      target: { tabId },
      func: () => window.__fbce?.isRunning?.() ?? false,
    });
    if (res?.result) {
      setRunning(true);
      setStatus(t('starting'));
    }
  } catch {
    /* page not scriptable yet */
  }
}
