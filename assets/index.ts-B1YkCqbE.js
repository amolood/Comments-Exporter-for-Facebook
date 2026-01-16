import {
  m as h,
  k as f,
  T as p,
  w as _,
  M as q,
  p as I,
  h as C,
  e as ne,
} from "./const-1bIVNtXv.js";
import {
  b as re,
  A as ae,
  I as ie,
  h as oe,
  g as ce,
  C as ue,
  y as le,
  m as de,
  u as me,
  p as N,
  d as K,
  P as V,
} from "./index-4Xml3FNN.js";
var ge = Object.defineProperty,
  fe = (s, e, t) =>
    e in s
      ? ge(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
      : (s[e] = t),
  T = (s, e, t) => fe(s, typeof e != "symbol" ? e + "" : e, t);
let he = class {
  constructor(e, t) {
    T(this, "listeners", {}),
      T(this, "tabs", []),
      T(this, "slug"),
      T(this, "isDebugger"),
      (this.slug = e),
      (this.isDebugger = !!t),
      this.bindMessage(),
      this.bindEvent();
  }
  on(e, t) {
    if (this.listeners[e])
      throw new Error(`event listener ${String(e)} already exist!`);
    return (
      (this.listeners[e] = t),
      () => {
        delete this.listeners[e];
      }
    );
  }
  async send(e, ...t) {
    this.isDebugger &&
      console.log("send message from background script", {
        action: e,
        payload: t,
        tabs: this.tabs,
      });
    for (let n of this.tabs)
      try {
        const r = await chrome.tabs.get(n);
        r && r.id
          ? chrome.tabs.sendMessage(r.id, {
              from: this.slug,
              payload: { action: e, payload: t },
            })
          : this.deleteTabById(n);
      } catch (r) {
        console.log(r), this.deleteTabById(n);
      }
  }
  bindMessage() {
    chrome.runtime.onMessageExternal.addListener((e, t, n) => {
      var r, i;
      if ((r = t == null ? void 0 : t.tab) != null && r.id) {
        if (
          (this.isDebugger &&
            console.log("received message from page", {
              request: e,
              sender: t,
            }),
          e.action === "__connect")
        )
          return this.tabs.includes(t.tab.id) || this.tabs.push(t.tab.id), n();
        if (e.action === "__disconnect")
          return this.deleteTabById(t.tab.id), n();
        if (this.listeners[e.action])
          return (i = t == null ? void 0 : t.tab) != null && i.id
            ? (this.tabs.includes(t.tab.id) || this.tabs.push(t.tab.id),
              this.listeners[e.action](...e.payload).then((a) => {
                this.isDebugger &&
                  console.log("send to callback from background", {
                    request: e,
                    sender: t,
                    res: a,
                  }),
                  n(a);
              }),
              !0)
            : n();
        console.log(`unknown event ${e.action}`);
      }
    });
  }
  bindEvent() {
    chrome.tabs.onRemoved.addListener((e) => {
      this.deleteTabById(e);
    });
  }
  deleteTabById(e) {
    if (this.tabs.includes(e)) {
      const t = this.tabs.indexOf(e);
      this.tabs.splice(t, 1);
    }
  }
};
function Z(s) {
  const e = new TextEncoder().encode(s);
  return Array.from(e);
}
function ye(s) {
  return s.map((e) => e.toString(16).padStart(2, "0")).join("");
}
function pe(s, e) {
  const t = function (o, m, d) {
      return o(m, d);
    },
    n = function (o, m, d) {
      return o(m, d);
    },
    r = function (o, m) {
      return (function (d, c) {
        return d < c;
      })(o, m);
    },
    i = function (o, m) {
      return (function (d, c) {
        return d % c;
      })(o, m);
    },
    a = Z(s),
    u = [];
  for (let o = 0; t(r, o, e); o++) u.push(a[n(i, o, a.length)]);
  return u;
}
function be(s, e) {
  const t = function (d, c, g) {
      return d(c, g);
    },
    n = function (d, c, g) {
      return d(c, g);
    },
    r = function (d, c) {
      return (function (g, l) {
        return g(l);
      })(d, c);
    },
    i = function (d, c) {
      return (function (g, l) {
        return g < l;
      })(d, c);
    },
    a = function (d, c) {
      return (function (g, l) {
        return g ^ l;
      })(d, c);
    },
    u = t(r, Z, s),
    o = t(pe, e, u.length),
    m = [];
  for (let d = 0; t(i, d, u.length); d++) m.push(t(a, u[d], o[d]));
  return n(r, btoa, n(r, ye, m));
}
function we(s) {
  const { hostMatch: e, extensionId: t, extensionName: n } = s;
  (function (r) {
    const { extensionId: i, extensionName: a } = r;
    new he(i, !1).on("sentry", (u) => {
      (u.tags = u.tags || {}),
        (u.tags.projectId = i),
        (u.tags.projectName = a),
        fetch("https://esuit-dev-sentry-6b0d6.web.app/api/sentry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: be(JSON.stringify(u), "sentry") }),
        });
    });
  })(s),
    chrome.tabs.onUpdated.addListener(async (r, i, a) => {
      if (a && a.url && a && a.url && i && i.status === "loading") {
        const u = new URL(a.url).hostname;
        if (e.find((o) => !!~o.indexOf(u))) {
          const o = chrome.runtime.getManifest();
          chrome.scripting.executeScript({
            injectImmediately: !0,
            world: "MAIN",
            target: { tabId: r, allFrames: !0 },
            func: (m) => {
              window[m.slug] = m;
            },
            args: [
              {
                id: chrome.runtime.id,
                slug: t,
                extensionName: n,
                version: o.version,
                icons: o.icons,
                extensionFolderUri: chrome.runtime.getURL("/"),
                isProdMode: "update_url" in chrome.runtime.getManifest(),
              },
            ],
          });
        }
      }
    });
}
var ee = ((s) => (
  (s[(s.FREE = 0)] = "FREE"),
  (s[(s.BASIC = 1)] = "BASIC"),
  (s[(s.PREMIUM = 2)] = "PREMIUM"),
  s
))(ee || {});
const ve = {
    type: "object",
    properties: {
      uid: { type: "string", default: "" },
      email: { type: "string", default: "" },
      stripeId: { type: "string", default: "" },
      name: { type: "string", default: "" },
      payments: {
        type: "array",
        items: { type: "object", properties: {}, required: [], default: {} },
        default: [],
      },
      plan: { type: "string", default: ee.FREE },
      isSubscriptionActive: { type: "boolean", default: !1 },
      lastCheckAt: { type: "number", default: 0 },
    },
    required: [
      "uid",
      "email",
      "stripeId",
      "name",
      "payments",
      "plan",
      "isSubscriptionActive",
      "lastCheckAt",
    ],
    default: {},
  },
  Ie = { type: "object", properties: {}, required: [], default: {} },
  Ce = { type: "object", properties: {}, required: [], default: {} },
  F = { customerDataV2: ve, features: Ie, persistLocalStorage: Ce };
function J(s, e) {
  Object.keys(s).map((t) => e(s[t], t, s));
}
function D(s, e) {
  function t(i, a) {
    switch (i.type) {
      case "object":
        return n(i, a);
      case "array":
        return r(i, a);
      default:
        return a !== void 0 ? a : i.default !== void 0 ? i.default : void 0;
    }
  }
  function n(i, a) {
    const u = {},
      o = i.properties ?? {};
    return (
      J(o, (m, d) => {
        if (i.required.includes(d) || (a !== void 0 && a[d] !== void 0)) {
          let c = a !== void 0 ? a[d] : void 0;
          !m.properties &&
            m.default &&
            m.type === "object" &&
            m.additionalProperties &&
            (c = m.default),
            (u[d] = t(m, c));
        }
      }),
      a &&
        J(a, (m, d) => {
          u[d] === void 0 && m !== void 0 && (u[d] = m);
        }),
      u
    );
  }
  function r(i, a) {
    if (a === void 0) return i.default ? i.default : void 0;
    const u = [];
    for (let o = 0; o < a.length; o++) u.push(t(i.items ?? {}, a[o]));
    return u;
  }
  return t(e, s);
}
const j = "__storage-local-version";
function Te(s) {
  const e = Object.keys(s);
  chrome.runtime.onInstalled.addListener((n) => {
    (n.reason === "install" || n.reason === "update") && t();
  });
  async function t() {
    let n = (await chrome.storage.local.get(j))[j];
    const r = chrome.runtime.getManifest().version;
    if (r !== n) {
      const i = await chrome.storage.local.get(e),
        a = e.reduce(
          (u, o) => {
            let m = i[o] || {};
            return (m = D(m, s[o])), (u[o] = m), u;
          },
          { [j]: r }
        );
      await chrome.storage.local.set(a);
    }
  }
}
function B(s, e) {
  async function t(a) {
    let u;
    return (
      await navigator.locks.request(k(a), { mode: "shared" }, async () => {
        u = (await H(a))[a];
      }),
      u === void 0 && (u = D(u, s[a])),
      u
    );
  }
  async function n(a, u) {
    await navigator.locks.request(k(a), { mode: "exclusive" }, async () => {
      let o = (await H(a))[a];
      o === void 0 && (o = D(o, s[a]));
      const m = await u(o);
      await chrome.storage.local.set({ [a]: m });
    });
  }
  async function r(a, u) {
    await navigator.locks.request(k(a), { mode: "exclusive" }, async () => {
      let o = u || {};
      u || (o = D(o, s[a])), await chrome.storage.local.set({ [a]: o });
    });
  }
  async function i(a) {
    return (
      await navigator.locks.request(k(a), { mode: "exclusive" }, async () => {
        await chrome.storage.local.remove([a]);
      }),
      Promise.resolve()
    );
  }
  return { updateBucket: n, setBucket: r, getBucket: t, deleteBucket: i };
}
function k(s) {
  return `storage.local.${s}`;
}
function H(s) {
  return new Promise((e) => {
    chrome.storage.local.get(s, (t) => {
      e(t);
    });
  });
}
function te() {
  return Math.floor(new Date().getTime() / 1e3);
}
function X(s) {
  return s + 86400 < te();
}
async function ke(s) {
  const e = await chrome.tabs.query({
    url: s.filter((t) => !~t.indexOf("esuit")),
  });
  for (let t of e) t.id && (await chrome.tabs.reload(t.id));
}
let S = [];
const { updateBucket: W, getBucket: L, deleteBucket: z } = B(F);
function Se(s) {
  h("logout", async () => {
    await z("customerDataV2"), await z("features");
  }),
    h("login", async () => {
      const e = new URLSearchParams({
        [q.RETURN_EXT_LOCAL]: chrome.runtime.id,
      }).toString();
      await chrome.tabs.create({
        url: `https://esuit.dev/login?${e}`,
        active: !0,
      });
    }),
    h("closePopup", async () => {
      chrome.extension.getViews({ type: "popup" }).forEach((e) => {
        e.window.close();
      });
    }),
    h("openOptionsPage", async (e) => {
      const t = chrome.runtime.getURL(
        "src/pages/options/index.html" + (e ? "#showSubscription=1" : "")
      );
      (await chrome.tabs.query({ url: [t] })).forEach(
        (n) => (n == null ? void 0 : n.id) && chrome.tabs.remove(n.id)
      ),
        await new Promise((n) => setTimeout(n, 300)),
        await chrome.tabs.create({ url: t, active: !0 });
    }),
    h("getCustomerData", async () => {
      let e = await L("customerDataV2");
      if (!e.uid || e.plan !== p.PREMIUM) {
        e = {
          uid: "mock_uid",
          stripeId: "mock_stripe_id",
          email: "mock@email.com",
          name: "Pro User",
          payments: [],
          plan: p.PREMIUM,
          isSubscriptionActive: true,
          lastCheckAt: te(),
        };
        await W("customerDataV2", () => e);
      }
      return e;
    }),
    h("reFetchCustomerData", async (e = !1) => {
      const u = p.PREMIUM;
      await W("customerDataV2", async (o) => ({
        uid: "mock_uid",
        stripeId: "mock_stripe_id",
        email: "mock@email.com",
        name: "Pro User",
        payments: [],
        plan: u,
        isSubscriptionActive: true,
        lastCheckAt: te(),
      }));
      f("rejectFeaturesToWindow");
      return !0;
    }),
    h("visitPricingPage", async () => {
      const e = `https://esuit.dev/pricing/${s.projectId}`,
        t = new URLSearchParams({
          [q.RETURN_EXT_LOCAL]: chrome.runtime.id,
        }).toString();
      await chrome.tabs.create({ url: e + `?${t}`, active: !0 });
    }),
    h("visitDashboard", async () => {
      await chrome.tabs.create({
        url: "https://esuit.dev/dashboard",
        active: !0,
      }),
        f("closePopup");
    }),
    _("ifUserLogin", async () => true),
    _("userInfoUpdate", async ([e]) => {
      e &&
        (await W("customerDataV2", (t) => ((t.uid = e), t)),
        await f("reFetchCustomerData", !0),
        f("openOptionsPage", !0),
        setTimeout(() => {
          ke(s.hostMatch);
        }, 2e3));
    });
}
async function Me() {
  if (S.length > 0) return S;
  const s = await fetch("https://static-data.esuit.dev/index.json").then((e) =>
    e.json()
  );
  return (S = le(s)), S;
}
function G(s, e, t) {
  return !!s.find((n) => {
    if (
      ![...de, ...me, ...N, ...K, ...V].includes(n.status) ||
      ([...N].includes(n.status) &&
        (!n.nextBillingDate ||
          n.nextBillingDate < Math.ceil(new Date().getTime() / 1e3))) ||
      ([...K].includes(n.status) &&
        (!n.nextBillingDate ||
          n.nextBillingDate < Math.ceil(new Date().getTime() / 1e3))) ||
      ([...V].includes(n.status) &&
        (!n.nextBillingDate ||
          n.nextBillingDate < Math.ceil(new Date().getTime() / 1e3)))
    )
      return !1;
    const r = e.prices.find((i) => i.id === n.priceId);
    return !(!r || r.plan !== t);
  });
}
var Pe = Object.defineProperty,
  xe = (s, e, t) =>
    e in s
      ? Pe(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
      : (s[e] = t),
  M = (s, e, t) => (xe(s, typeof e != "symbol" ? e + "" : e, t), t);
class O {
  constructor(e, t) {
    M(this, "listeners", {}),
      M(this, "tabs", []),
      M(this, "slug"),
      M(this, "isDebugger"),
      (this.slug = e),
      (this.isDebugger = !!t),
      this.bindMessage(),
      this.bindEvent();
  }
  on(e, t) {
    if (this.listeners[e])
      throw new Error(`event listener ${String(e)} already exist!`);
    return (
      (this.listeners[e] = t),
      () => {
        delete this.listeners[e];
      }
    );
  }
  async send(e, ...t) {
    this.isDebugger &&
      console.log("send message from background script", {
        action: e,
        payload: t,
        tabs: this.tabs,
      });
    for (let n of this.tabs)
      try {
        const r = await chrome.tabs.get(n);
        r && r.id
          ? chrome.tabs.sendMessage(r.id, {
              from: this.slug,
              payload: { action: e, payload: t },
            })
          : this.deleteTabById(n);
      } catch (r) {
        console.log(r), this.deleteTabById(n);
      }
  }
  bindMessage() {
    chrome.runtime.onMessageExternal.addListener((e, t, n) => {
      var r, i;
      if ((r = t == null ? void 0 : t.tab) != null && r.id) {
        if (
          (this.isDebugger &&
            console.log("received message from page", {
              request: e,
              sender: t,
            }),
          e.action === "__connect")
        )
          return this.tabs.includes(t.tab.id) || this.tabs.push(t.tab.id), n();
        if (e.action === "__disconnect")
          return this.deleteTabById(t.tab.id), n();
        if (this.listeners[e.action])
          return (i = t == null ? void 0 : t.tab) != null && i.id
            ? (this.tabs.includes(t.tab.id) || this.tabs.push(t.tab.id),
              this.listeners[e.action](...e.payload).then((a) => {
                this.isDebugger &&
                  console.log("send to callback from background", {
                    request: e,
                    sender: t,
                    res: a,
                  }),
                  n(a);
              }),
              !0)
            : n();
        console.log(`unknown event ${e.action}`);
      }
    });
  }
  bindEvent() {
    chrome.tabs.onRemoved.addListener((e) => {
      this.deleteTabById(e);
    });
  }
  deleteTabById(e) {
    if (this.tabs.includes(e)) {
      const t = this.tabs.indexOf(e);
      this.tabs.splice(t, 1);
    }
  }
}
function Ee(s) {
  return [p.FREE, p.BASIC, p.PREMIUM].indexOf(s);
}
function De(s, e) {
  const t = Ee(e);
  return s.limitation ? s.limitation[t] : 0;
}
function R(s, e) {
  return { [p.FREE]: 1, [p.BASIC]: 10, [p.PREMIUM]: 100 }[e] >= s.permission;
}
function P(s, e) {
  return (
    s.map((t) => {
      e[t.key]
        ? ((e[t.key].enable = e[t.key].enable ?? t.defaultEnable),
          (e[t.key].currentFreeTryCount = e[t.key].currentFreeTryCount ?? 0))
        : (e[t.key] = { enable: t.defaultEnable, currentFreeTryCount: 0 });
    }),
    e
  );
}
function Fe(s) {
  const { cacheId: e, defaultMemoConfig: t } = s;
  h("setUIMemoSettings", async (n) => {
    await chrome.storage.local.set({ [e]: n });
  }),
    h("getUIMemoSettings", async () => {
      const n = await f("getFeaturesDataByPlan");
      let r = await new Promise((i) => {
        chrome.storage.local.get([e]).then((a) => {
          a[e] ? i(a[e]) : i(!1);
        });
      });
      return (
        r || (r = { ...t }),
        Object.keys(r).map((i) => {
          const a = Object.values(n).find((o) => o._.memoKey === i);
          if (
            a &&
            a.needUpgrade &&
            (!a.enable ||
              (!(a.freeTryLeft > 0 || a.limitation > 0) && t[i] !== void 0))
          )
            return u();
          function u() {
            r[i] = t[i];
          }
        }),
        { ...t, ...r }
      );
    });
}
let se = !1;
function Be() {
  return se;
}
function je() {
  se = !0;
}
const { updateBucket: U, getBucket: Q } = B(F);
function Le(s) {
  if (Be()) return;
  je();
  const e = new O(s, !0);
  return (
    h("getAllPersistLocalStorage", () => Q("persistLocalStorage")),
    h("setPersistLocalStorage", async (t, n) => {
      await U("persistLocalStorage", (r) => {
        try {
          n = JSON.stringify(n);
        } catch {}
        return (r[t] = n), r;
      });
    }),
    h("getPersistLocalStorage", async (t, n) => {
      const r = await Q("persistLocalStorage");
      if (r[t]) {
        try {
          return JSON.parse(r[t]);
        } catch {}
        return r[t];
      }
      return n ?? void 0;
    }),
    h("clearPersistLocalStorage", async () => {
      U("persistLocalStorage", () => ({}));
    }),
    h("removePersistLocalStorage", async (t) => {
      U("persistLocalStorage", (n) => (delete n[t], n));
    }),
    e.on("getAllPersistLocalStorage", () => f("getAllPersistLocalStorage")),
    e.on("setPersistLocalStorage", (...t) => f("setPersistLocalStorage", ...t)),
    e.on("getPersistLocalStorage", (...t) => f("getPersistLocalStorage", ...t)),
    e.on("clearPersistLocalStorage", () => f("clearPersistLocalStorage")),
    void e.on("removePersistLocalStorage", (t) =>
      f("removePersistLocalStorage", t)
    )
  );
}
const { setBucket: $, getBucket: x } = B(F);
function Re(s) {
  const {
      projectId: e,
      hostMatch: t,
      cacheId: n,
      features: r,
      defaultMemoConfig: i,
    } = s,
    a = new O(e, !0);
  return (
    Le(s.projectId),
    Fe({ cacheId: n, defaultMemoConfig: i }),
    chrome.tabs.onUpdated.addListener(async (c, g, l) => {
      if (l && l.url && g.status === "loading") {
        const y = new URL(l.url).hostname;
        t.find((w) => !!~w.indexOf(y)) && o(c);
      }
    }),
    chrome.storage.onChanged.addListener((c, g) => {
      g === "local" && c && c.features && u();
    }),
    h("rejectFeaturesToWindow", async () => {
      u();
    }),
    h("getFeature", async (c) => m()[c]),
    h("consumeFeaturesTreeTryByMemoUIConfigs", async (c) => {
      const g = await m();
      let l = [];
      Object.entries(c).map(([y, w]) => {
        if (i[y] !== void 0 && i[y] !== w) {
          const b = Object.values(g).find((v) => v._.memoKey === y);
          b && b.isCanFreeTry && l.push(b._.key);
        }
      }),
        l.length > 0 && f("consumeFeatureTreeTry", l);
    }),
    h("consumeFeatureFreeTryByCount", async (c) => {
      let g = P(r, await x("features"));
      const l = await d();
      let y = !1;
      Object.entries(c).map(([w, b]) => {
        const v = r.find((A) => A.key === w || A.memoKey === w);
        v && (R(v, l) || ((g[v.key].currentFreeTryCount += b), (y = !0)));
      }),
        y && (await $("features", g));
    }),
    h("consumeFeatureTreeTry", async (c) => {
      let g = P(r, await x("features"));
      const l = await d();
      let y = !1;
      c.map((w) => {
        const b = r.find((v) => v.key === w || v.memoKey === w);
        b && (R(b, l) || (g[b.key].currentFreeTryCount++, (y = !0)));
      }),
        y && (await $("features", g));
    }),
    h("saveFeaturesEnables", async (c) => {
      let g = P(r, await x("features"));
      Object.entries(c).map(([l, y]) => {
        g[l].enable = y;
      }),
        await $("features", g);
    }),
    h("getFeaturesDataByPlan", m),
    a.on("getUIMemoSettings", () => f("getUIMemoSettings")),
    a.on("setUIMemoSettings", (c) => f("setUIMemoSettings", c)),
    a.on("consumeFeatureTreeTry", (c) => f("consumeFeatureTreeTry", c)),
    a.on("consumeFeatureFreeTryByCount", (c) =>
      f("consumeFeatureFreeTryByCount", c)
    ),
    a.on("visitPricingPage", () => f("visitPricingPage")),
    void a.on("consumeFeaturesTreeTryByMemoUIConfigs", (c) => {
      f("consumeFeaturesTreeTryByMemoUIConfigs", c);
    })
  );
  async function u() {
    const c = await chrome.tabs.query({ url: t });
    c &&
      c.map((g) => {
        g && g.id && o(g.id);
      });
  }
  async function o(c) {
    const g = await m();
    chrome.scripting.executeScript({
      injectImmediately: !0,
      world: "MAIN",
      target: { tabId: c, allFrames: !0 },
      func: (l, y) => {
        window[y] = JSON.parse(l);
      },
      args: [JSON.stringify(g), `${e.replaceAll("-", "_")}`],
    });
  }
  async function m() {
    const c = await d();
    let g = P(r, await x("features"));
    return r
      .map((l) => {
        var y;
        const w = R(l, c);
        let b,
          v = 0;
        return (
          l.memoKey && (b = i[l.memoKey]),
          l.maxFreeTryCount &&
            g[l.key].currentFreeTryCount !== void 0 &&
            (v = Math.max(0, l.maxFreeTryCount - g[l.key].currentFreeTryCount)),
          {
            enable:
              ((y = g[l.key]) == null ? void 0 : y.enable) ?? l.defaultEnable,
            needUpgrade: !w,
            limitation: De(l, c),
            permission: l.permission,
            freeTryLeft: l.maxFreeTryCount ? v : 0,
            isCanFreeTry: !!l.maxFreeTryCount && l.maxFreeTryCount > 0,
            defaultValue: b,
            _: l,
          }
        );
      })
      .reduce((l, y) => ((l[y._.key] = y), l), {});
  }
  async function d() {
    const c = await f("getCustomerData");
    return c ? c.plan : p.FREE;
  }
}
function Ue(s, e) {
  (async () => {
    let t = 0,
      n = (await chrome.declarativeNetRequest.getDynamicRules()).map(
        (i) => i.id
      );
    const r = s.map(
      (i, a) => (
        (t = a + 1),
        {
          id: t,
          priority: 1,
          action: {
            type: "modifyHeaders",
            responseHeaders: [
              { header: "Content-Security-Policy", operation: "remove" },
              {
                header: "Content-Security-Policy-Report-Only",
                operation: "remove",
              },
            ],
          },
          condition: {
            regexFilter: i,
            resourceTypes: ["main_frame", "xmlhttprequest"],
          },
        }
      )
    );
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: n,
      addRules: r,
    });
  })();
}
function $e(s) {
  const e = new O(s, !0);
  e.on("reFetchCustomerData", (t) => f("reFetchCustomerData", t)),
    e.on("visitDashboard", () => f("visitDashboard")),
    e.on("getCustomerData", () => f("getCustomerData")),
    e.on("logout", () => f("logout")),
    e.on("login", () => f("login"));
}
function Oe(s) {
  Te(F), Se(s), $e(s.projectId);
}
const Ae = [
    {
      key: "fetchLimit",
      name: "Include Nesting Comment",
      permission: 0,
      limitation: [99999, 99999, 99999],
      defaultEnable: !0,
      memoKey: null,
    },
    {
      key: "nestingComment",
      name: "Fetch Count limit",
      permission: 0,
      maxFreeTryCount: 0,
      defaultEnable: !0,
      memoKey: "isIncludeNesting",
    },
    {
      key: "RESUME_EXPORTING",
      name: "Resume exporting",
      permission: 0,
      defaultEnable: !0,
      memoKey: null,
    },
  ],
  _e = {
    fetchLimit: 200,
    isIncludeNesting: !1,
    fullSpeed: !1,
    nestingDepth: 2,
  };
var qe = Object.defineProperty,
  Ne = (s, e, t) =>
    e in s
      ? qe(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
      : (s[e] = t),
  E = (s, e, t) => Ne(s, typeof e != "symbol" ? e + "" : e, t);
class Ke {
  constructor(e, t) {
    E(this, "listeners", {}),
      E(this, "tabs", []),
      E(this, "slug"),
      E(this, "isDebugger"),
      (this.slug = e),
      (this.isDebugger = !!t),
      this.bindMessage(),
      this.bindEvent();
  }
  on(e, t) {
    if (this.listeners[e])
      throw new Error(`event listener ${String(e)} already exist!`);
    return (
      (this.listeners[e] = t),
      () => {
        delete this.listeners[e];
      }
    );
  }
  async send(e, ...t) {
    this.isDebugger &&
      console.log("send message from background script", {
        action: e,
        payload: t,
        tabs: this.tabs,
      });
    for (let n of this.tabs)
      try {
        const r = await chrome.tabs.get(n);
        r && r.id
          ? chrome.tabs.sendMessage(r.id, {
              from: this.slug,
              payload: { action: e, payload: t },
            })
          : this.deleteTabById(n);
      } catch (r) {
        console.log(r), this.deleteTabById(n);
      }
  }
  bindMessage() {
    chrome.runtime.onMessageExternal.addListener((e, t, n) => {
      var r, i;
      if ((r = t == null ? void 0 : t.tab) != null && r.id) {
        if (
          (this.isDebugger &&
            console.log("received message from page", {
              request: e,
              sender: t,
            }),
          e.action === "__connect")
        )
          return this.tabs.includes(t.tab.id) || this.tabs.push(t.tab.id), n();
        if (e.action === "__disconnect")
          return this.deleteTabById(t.tab.id), n();
        if (this.listeners[e.action])
          return (i = t == null ? void 0 : t.tab) != null && i.id
            ? (this.tabs.includes(t.tab.id) || this.tabs.push(t.tab.id),
              this.listeners[e.action](...e.payload).then((a) => {
                this.isDebugger &&
                  console.log("send to callback from background", {
                    request: e,
                    sender: t,
                    res: a,
                  }),
                  n(a);
              }),
              !0)
            : n();
        console.log(`unknown event ${e.action}`);
      }
    });
  }
  bindEvent() {
    chrome.tabs.onRemoved.addListener((e) => {
      this.deleteTabById(e);
    });
  }
  deleteTabById(e) {
    if (this.tabs.includes(e)) {
      const t = this.tabs.indexOf(e);
      this.tabs.splice(t, 1);
    }
  }
}
function Ve() {
  return Math.floor(new Date().getTime() / 1e3);
}
const Je = {
    type: "array",
    items: {
      type: "object",
      properties: {
        feedbackId: { type: "string", default: "" },
        lastCursor: { type: "string", default: "" },
        lastUpdateAt: { type: "number", default: 0 },
      },
      required: ["feedbackId", "lastCursor", "lastUpdateAt"],
    },
    default: [],
  },
  He = { resumeCursor: Je },
  { updateBucket: Y, getBucket: Xe } = B(He);
function We() {
  const s = new Ke(I, !0);
  s.on("visitPricing", async () => {
    f("visitPricingPage");
  }),
    s.on("setResumeCursor", async (e) => {
      e.feedbackId &&
        (await Y("resumeCursor", (t) => {
          const n = t.findIndex((a) => a.feedbackId === e.feedbackId),
            r = Ve(),
            i = { ...e, lastUpdateAt: r };
          return ~n ? (t[n] = i) : t.push(i), t;
        }));
    }),
    s.on(
      "getResumeCursor",
      (e) =>
        new Promise(async (t) => {
          const r = (await Xe("resumeCursor")).find((i) => i.feedbackId === e);
          t(r ?? null);
        })
    ),
    s.on("removeResumeCursor", async (e) => {
      await Y("resumeCursor", (t) => {
        const n = t.findIndex((r) => r.feedbackId === e);
        return ~n && t.splice(n, 1), t;
      });
    });
}
Ue(C);
We();
we({ hostMatch: C, extensionId: I, extensionName: ne });
Oe({ projectId: I, callbackExtId: chrome.runtime.id, hostMatch: C });
Re({
  projectId: I,
  hostMatch: C,
  cacheId: "app-2.1.0",
  features: Ae,
  defaultMemoConfig: _e,
});
chrome.scripting.registerContentScripts([
  {
    id: `inject-${I}`,
    js: ["injects/proxy.js"],
    matches: C,
    runAt: "document_start",
    world: "MAIN",
  },
]);
chrome.scripting.registerContentScripts([
  {
    id: `inject-${I}-module`,
    js: ["injects/vendors.js", "injects/index.js"],
    matches: C,
    runAt: "document_end",
    world: "MAIN",
  },
]);
