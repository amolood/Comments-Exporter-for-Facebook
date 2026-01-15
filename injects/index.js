/** @license ESUIT
 * COPYRIGHT (C) 2023 ESUIT. ALL RIGHTS RESERVED.
 *
 * This code is the intellectual property of ESUIT and is protected by
 * copyright law. Any unauthorized use, copying or reproduction of this
 * code without the expressed written permission of ESUIT is strictly
 * prohibited.
 *
 * For more information, please visit https://esuit.dev/.
 */ (function () {
  function le(Z, gn) {
    function re() {
      Z() ? gn() : requestAnimationFrame(re);
    }
    re();
  }
  le(
    () => !!window.requireLazy,
    () => {
      le(
        () =>
          !!window.export_comments_for_facebook_vendors &&
          !!window["export-comments-for-facebook"] &&
          !!window.export_comments_for_facebook,
        () => {
          window.requireLazy(["react", "__debug"], Ee);
        }
      );
    }
  );
  function Ee() {
    const Z = je();
    if (Z) {
      const gn = window.require("react"),
        re = window.require(Z),
        Ue = ze();
      (function (z, q, _, a, Fn) {
        "use strict";
        const Mn = "ESUIT | Comments Exporter for Facebook™",
          en = "export-comments-for-facebook",
          Ye = "flhbkccofabjoiphncbedainkoipgggf",
          Ge =
            "https://chromewebstore.google.com/detail/esuit-comments-exporter-f/flhbkccofabjoiphncbedainkoipgggf",
          de =
            "https://www.facebook.com/permalink.php?story_fbid=pfbid02vPiLksPLZsgENUzKYyxhn9cnrFVQoLz8PaSXJ5vSZDrTPuMykHEcrpsQbhJn2fqjl&id=61563089216213",
          Be = {
            projectId: "a",
            chromeExtId: "b",
            name: "c",
            link: "d",
            description: "e",
            type: "f",
            ytb: "g",
            prices: "h",
            plan: "i",
            platform: "j",
            price: "k",
            id: "l",
            period: "m",
          };
        function pe(n) {
          const e = Object.fromEntries(
            Object.entries(Be).map(([u, t]) => [t, u])
          );
          return n.map((u) => {
            let t = {};
            for (let i in u) {
              const r = e[i] || i;
              Array.isArray(u[i])
                ? (t[r] = u[i].map((l) => pe([l])[0]))
                : (t[r] = u[i]);
            }
            return t;
          });
        }
        const Qe = "https://static-data.esuit.dev/index.json",
          He = "https://stats.esuit.dev/index.json",
          Ke = "https://esuit.dev/";
        let Qn = [];
        const Hn = "mHxGWIqCotRcnLgFbr4YcdaZWDMHJlWu";
        function Ze(n) {
          const e = {
              LtNqI: function (o, c) {
                return o(c);
              },
              nFKBK: function (o, c) {
                return o(c);
              },
              lDzqW: function (o) {
                return o();
              },
              lRqrs: function (o, c, h) {
                return o(c, h);
              },
              nXQsE: `
      .esuit-exts{
        opacity: 0.6;
        transition: opacity 300ms;
      }
      
      .esuit-exts:hover,.esuit-ext:hover{
        opacity: 1 !important
      }
    `,
              AfrAG: "horizontal",
              hqFMA: "normal",
              GQcVl: function (o, c) {
                return o(c);
              },
              ZTXSH: function (o, c) {
                return o(c);
              },
              cOkwP: function (o, c, h) {
                return o(c, h);
              },
              gLeuJ: "section",
              IAizE: "inherit",
              wqjsm: function (o, c) {
                return o + c;
              },
              yICKo: "24px",
              QsRRd: " auto 0 auto",
              BDkjS: "esuit-exts",
              FuFGW: "div",
              ZEZJY: "flex",
              fZwZQ: function (o, c) {
                return o === c;
              },
              mLwpp: "vertical",
              UBEdM: "column",
              lncUK: "row",
              fKTyc: function (o, c) {
                return o === c;
              },
              cQQCx: "space-between",
              ykaTa: "center",
              yOcha: "Useful extensions for you",
              wWfeM: function (o, c, h) {
                return o(c, h);
              },
              roddu: "_blank",
              nVnFc: "none",
              XryVw: "Find more extensions",
              ucGjf: function (o, c, h) {
                return o(c, h);
              },
              OeTvX: "grid",
            },
            {
              extsProjectIdArr: u = [],
              perRow: t = 3,
              direction: i = e.AfrAG,
              size: r = e.hqFMA,
              avtarSize: l = 48,
              withTitleBar: s = !0,
            } = n,
            [f, d] = e.GQcVl(q.useState, {}),
            [p, w] = e.ZTXSH(q.useState, []),
            b = e.cOkwP(
              q.useMemo,
              () =>
                u
                  .map((o) => {
                    const c = p.find((h) => h.projectId === o);
                    if (c) {
                      const h = f[o] ?? {};
                      return { ...c, ...h };
                    }
                    return !1;
                  })
                  .filter((o) => !!o),
              [u, f, p]
            );
          return (
            e.cOkwP(
              q.useEffect,
              () => {
                const o = function (h, v) {
                    return e.LtNqI(h, v);
                  },
                  c = function (h, v) {
                    return e.nFKBK(h, v);
                  };
                Promise.all([e.lDzqW(Ve), e.lDzqW(We)]).then(([h, v]) => {
                  o(d, h), c(w, v);
                }),
                  e.lRqrs(Xe, Hn, e.nXQsE);
              },
              []
            ),
            e.cOkwP(a.jsxs, e.gLeuJ, {
              style: {
                color: e.IAizE,
                margin: e.wqjsm(s ? e.yICKo : "0", e.QsRRd),
              },
              className: e.BDkjS,
              children: [
                s &&
                  e.cOkwP(a.jsxs, e.FuFGW, {
                    style: {
                      fontSize: 14,
                      opacity: 0.8,
                      marginBottom: 8,
                      display: e.ZEZJY,
                      flexDirection: e.fZwZQ(e.mLwpp, i) ? e.UBEdM : e.lncUK,
                      gap: e.fKTyc(e.mLwpp, i) ? 8 : 0,
                      justifyContent: e.cQQCx,
                      alignItems: e.ykaTa,
                    },
                    children: [
                      e.lRqrs(a.jsx, e.FuFGW, { children: e.yOcha }),
                      e.wWfeM(a.jsx, "a", {
                        href: Ke,
                        target: e.roddu,
                        style: { fontSize: 12, textDecoration: e.nVnFc },
                        children: e.XryVw,
                      }),
                    ],
                  }),
                e.ucGjf(a.jsx, e.FuFGW, {
                  style: {
                    display: e.OeTvX,
                    gridTemplateColumns: "repeat(" + t + ", 1fr)",
                    gap: 12,
                  },
                  children: b.map((o) =>
                    a.jsx(
                      _.Tooltip,
                      {
                        title: a.jsxs("div", {
                          children: [
                            a.jsx("div", { children: o.description }),
                            a.jsx("div", {
                              style: {
                                paddingTop: 8,
                                paddingBottom: 4,
                                textAlign: "center",
                                fontSize: 16,
                              },
                              children: "Click it to install",
                            }),
                          ],
                        }),
                        children: a.jsxs("div", {
                          className: "esuit-ext",
                          style: {
                            display: "flex",
                            flexDirection: i === "vertical" ? "column" : "row",
                            alignItems: "center",
                            gap: 8,
                            cursor: "pointer",
                            minWidth: r === "normal" ? 330 : 180,
                            paddingRight: i === "vertical" ? 0 : 16,
                            opacity: 0.6,
                            lineHeight: 1.4,
                            textAlign: "center",
                          },
                          onClick: () => window.open(o.link, "_blank"),
                          children: [
                            a.jsx("img", {
                              style: { width: l, height: l, display: "block" },
                              src:
                                "https://esuit.dev/extensions/" +
                                o.projectId +
                                ".png",
                              alt: "",
                            }),
                            a.jsxs("div", {
                              children: [
                                a.jsx("div", {
                                  style: { fontSize: r === "normal" ? 16 : 14 },
                                  children: o.name,
                                }),
                                a.jsxs("div", {
                                  style: {
                                    fontSize: 12,
                                    display: "flex",
                                    opacity: 0.6,
                                    justifyContent:
                                      i === "vertical"
                                        ? "center"
                                        : "flex-start",
                                  },
                                  children: [
                                    a.jsxs("div", {
                                      children: ["Users: ", o.users],
                                    }),
                                    a.jsxs("div", {
                                      style: { marginLeft: 12 },
                                      children: ["Rate: ", o.rating],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      },
                      o.projectId
                    )
                  ),
                }),
              ],
            })
          );
        }
        async function We() {
          const n = function (t, i) {
              return t(i);
            },
            e = function (t, i) {
              return t(i);
            };
          if (
            (function (t, i) {
              return t > i;
            })(Qn.length, 0)
          )
            return Qn;
          const u = await n(fetch, Qe).then((t) => t.json());
          return (Qn = e(pe, u)), Qn;
        }
        function Ve() {
          const n = function (e, u) {
            return e(u);
          };
          return window[Hn]
            ? Promise.resolve(window[Hn])
            : new Promise((e) => {
                const u = function (t, i) {
                  return n(t, i);
                };
                n(fetch, He)
                  .then((t) => t.json())
                  .then((t) => {
                    (window[Hn] = t.exts), u(e, t.exts);
                  });
              });
        }
        function Xe(n, e) {
          const u = "style",
            t = document.getElementById(n);
          if (t) t.innerText = e;
          else {
            const i = document.createElement(u);
            (i.innerHTML = e), document.head.appendChild(i);
          }
        }
        function Je(n) {
          const e = {
              txTOK: "_blank",
              YzCmg: function (t, i, r) {
                return t(i, r);
              },
              yMUAe: "div",
              WspkY: "inherit",
              eTJny: "24px auto 0 auto",
              RruQT: function (t, i, r) {
                return t(i, r);
              },
              ysVIP: " 🙏We greatly appreciate your support! 🙏",
              JlCuj: "Help us out with a review for our Chrome extension!",
              YccUx: function (t, i, r) {
                return t(i, r);
              },
              ufRPh: "Your feedback is essential.👍🏼👍🏼👍🏼",
            },
            u = n.extLink + "/reviews";
          return e.YzCmg(a.jsxs, e.yMUAe, {
            style: { color: e.WspkY, margin: e.eTJny },
            children: [
              e.RruQT(a.jsx, e.yMUAe, { children: e.ysVIP }),
              e.RruQT(a.jsx, _.Rate, {
                onChange: () => {
                  window.open(u, e.txTOK);
                },
                defaultValue: 5,
              }),
              e.RruQT(a.jsx, e.yMUAe, {
                children: e.RruQT(a.jsx, "a", {
                  href: u,
                  target: e.txTOK,
                  children: e.JlCuj,
                }),
              }),
              e.YccUx(a.jsx, e.yMUAe, { children: e.ufRPh }),
            ],
          });
        }
        function oe(n) {
          const e = function (I, m) {
              return I != m;
            },
            u = function (I, m) {
              return I == m;
            },
            t = function (I, m) {
              return I == m;
            },
            i = function (I, m) {
              return I != m;
            },
            r = function (I, m) {
              return I == m;
            },
            l = function (I, m) {
              return I != m;
            },
            s = function (I, m) {
              return I == m;
            };
          var f, d, p, w, b, o, c, h;
          if (!n) return "unknown errors";
          if (e(null, (f = u(null, n) ? void 0 : n.error)) && f.message)
            return n.error.message;
          if (
            e(
              null,
              (p = u(null, (d = u(null, n) ? void 0 : n[0])) ? void 0 : d.error)
            ) &&
            p.message
          )
            return n[0].error.message;
          if (e(null, n) && n.error_subcode && e(null, n) && n.message)
            return n.message;
          if (
            e(
              null,
              (b = u(null, (w = t(null, n) ? void 0 : n.errors))
                ? void 0
                : w[0])
            ) &&
            b.message
          )
            return n.errors[0].message;
          if (
            (i(null, (o = t(null, n) ? void 0 : n[0])) &&
              o.message &&
              e(null, (c = r(null, n) ? void 0 : n[0])) &&
              c.error_subcode) ||
            (l(null, (h = s(null, n) ? void 0 : n[0])) && h.message)
          )
            return n[0].message;
          if (l(null, n) && n.message) return n.message;
          let v = "";
          try {
            v = JSON.stringify(n);
          } catch {}
          return v.toString();
        }
        const he = "__fb_error_records";
        function Kn(n, e, u) {
          const t = function (s) {
              return s();
            },
            i = function (s, f) {
              return s > f;
            },
            r = "Error to save error records to localStorage:";
          try {
            const s = {
                from: n,
                error: e,
                payload: u,
                readableTime: new Date().toLocaleString(),
                href: window.location.href,
              },
              f = t(Re);
            f.unshift(s),
              (l = f.length),
              i(l, 10) && (f.length = 10),
              localStorage.setItem(he, JSON.stringify(f));
          } catch (s) {
            console.error(r, s);
          }
          var l;
        }
        function Re() {
          const n = "Error to get error records from localStorage:";
          try {
            const e = localStorage.getItem(he);
            return e ? JSON.parse(e) : [];
          } catch (e) {
            return console.error(n, e), [];
          }
        }
        function $e(n) {
          const e = {
              boXSe: function (r, l, s) {
                return r(l, s);
              },
              WsfVd: function (r, l, s) {
                return r(l, s);
              },
              YnOqB: function (r, l) {
                return r + l;
              },
              wcbEV: "https://docs.esuit.dev",
              Tjckn: "_blank",
              jIwqh: "Click to see how to use this feature",
              kLcPu: "span",
              GqQcA: "pointer",
            },
            u = {
              ZpLJl: e.Tjckn,
              RrXsC: e.jIwqh,
              XgsGt: function (r, l, s) {
                return e.boXSe(r, l, s);
              },
              hXMGo: e.kLcPu,
              NDgSx: function (r, l, s) {
                return e.WsfVd(r, l, s);
              },
              nXwuA: e.GqQcA,
            },
            { title: t = u.RrXsC, bold: i = !0 } = n;
          return u.XgsGt(a.jsxs, u.hXMGo, {
            style: { lineHeight: 1, paddingBottom: 4 },
            children: [
              i ? u.NDgSx(a.jsx, "b", { children: n.children }) : n.children,
              n.linkPath &&
                u.XgsGt(a.jsx, _.Tooltip, {
                  title: t,
                  children: u.NDgSx(a.jsx, u.hXMGo, {
                    style: { cursor: u.nXwuA },
                    onClick: function () {
                      window.open(e.YnOqB(e.wcbEV, n.linkPath), u.ZpLJl);
                    },
                    children: "❓",
                  }),
                }),
            ],
          });
        }
        var nt = Object.defineProperty,
          et = (n, e, u) =>
            e in n
              ? nt(n, e, {
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                  value: u,
                })
              : (n[e] = u),
          Zn = (n, e, u) => et(n, typeof e != "symbol" ? e + "" : e, u);
        class tt {
          constructor(e, u) {
            const t = function (p, w, b) {
                return p(w, b);
              },
              i = function (p, w, b, o) {
                return p(w, b, o);
              },
              r = "listeners",
              l = function (p, w, b, o) {
                return p(w, b, o);
              },
              s = "slug",
              f = "isDebugger",
              d = function (p, w, b) {
                return t(p, w, b);
              };
            (function (p, w, b, o) {
              p(w, b, o);
            })(d, Zn, this, "id"),
              i(Zn, this, r, {}),
              l(d, Zn, this, s),
              t(Zn, this, f),
              (this.slug = e),
              (this.isDebugger = !!u),
              (this.id = window[e].id),
              this.bindEvent();
          }
          on(e, u) {
            return (
              (this.listeners[e] = this.listeners[e] || []),
              this.listeners[e].push(u),
              () => {
                if (this.listeners[e].includes(u)) {
                  const t = this.listeners[e].indexOf(u);
                  this.listeners[e].splice(t, 1);
                }
              }
            );
          }
          send(e, ...u) {
            const t = {
              HvKMf: function (i, r) {
                return i(r);
              },
              EyLAi: "received message from page send callback",
              hbpbC: "send message from page",
            };
            return new Promise(async (i) => {
              const r = {
                vGmZu: function (s, f) {
                  return t.HvKMf(s, f);
                },
                CfSTD: t.EyLAi,
              };
              let l = { action: e, payload: u };
              this.isDebugger && console.log(t.hbpbC, l),
                chrome.runtime.sendMessage(this.id, l, {}, (s) => {
                  this.isDebugger && console.log(r.CfSTD, s), r.vGmZu(i, s);
                });
            });
          }
          connect() {
            chrome.runtime.sendMessage(this.id, { action: "__connect" });
          }
          disconnect() {
            chrome.runtime.sendMessage(this.id, { action: "__disconnect" });
          }
          bindEvent() {
            window.addEventListener(
              "message",
              this._handleReceivingMessage.bind(this)
            );
          }
          destroy() {
            this.disconnect(),
              (this.listeners = {}),
              window.removeEventListener(
                "message",
                this._handleReceivingMessage.bind(this)
              );
          }
          _handleReceivingMessage(e) {
            const u = function (s, ...f) {
                return s(...f);
              },
              t = function (s, f) {
                return s === f;
              },
              i = "received message from background",
              r = function (s, f, ...d) {
                return s(f, ...d);
              },
              l = function (s, ...f) {
                return u(s, ...f);
              };
            if (e.data && t(e.data.from, this.slug) && e.data.payload) {
              const { action: s, payload: f } = e.data.payload;
              if (
                (this.isDebugger && console.log(i, e.data), this.listeners[s])
              )
                for (let d of this.listeners[s]) r(l, d, ...f);
            }
          }
        }
        function rt(n) {
          const e = new TextEncoder().encode(n);
          return Array.from(e);
        }
        function ot(n) {
          const e = new TextDecoder(),
            u = new Uint8Array(n);
          return e.decode(u);
        }
        function it(n) {
          const e = function (s, f) {
              return s < f;
            },
            u = function (s, f, d) {
              return s(f, d);
            },
            t = function (s, f, d, p) {
              return s(f, d, p);
            },
            i = function (s, f) {
              return e(s, f);
            },
            r = function (s, f, d) {
              return u(s, f, d);
            },
            l = [];
          for (let s = 0; u(i, s, n.length); s += 2)
            l.push(t(r, parseInt, n.substr(s, 2), 16));
          return l;
        }
        function ut(n, e) {
          const u = function (p, w) {
              return p < w;
            },
            t = function (p, w) {
              return p % w;
            },
            i = function (p, w, b) {
              return p(w, b);
            },
            r = function (p, w, b) {
              return p(w, b);
            },
            l = function (p, w) {
              return u(p, w);
            },
            s = function (p, w) {
              return t(p, w);
            },
            f = (function (p, w) {
              return p(w);
            })(rt, n),
            d = [];
          for (let p = 0; i(l, p, e); p++) d.push(f[r(s, p, f.length)]);
          return d;
        }
        function ct(n, e) {
          const u = function (I, m) {
              return I < m;
            },
            t = function (I, m) {
              return I ^ m;
            },
            i = function (I, m) {
              return I(m);
            },
            r = function (I, m, A) {
              return I(m, A);
            },
            l = function (I, m) {
              return I(m);
            },
            s = function (I, m) {
              return u(I, m);
            },
            f = function (I, m) {
              return t(I, m);
            },
            d = ((h = it), (v = l(atob, n)), i(h, v)),
            p = ((b = ut), (o = e), (c = d.length), r(b, o, c)),
            w = [];
          var b, o, c, h, v;
          for (let I = 0; r(s, I, d.length); I++) w.push(r(f, d[I], p[I]));
          return l(ot, w);
        }
        function ge(n, e = 5e3) {
          const u = function (h) {
              return h();
            },
            t = function (h, v) {
              return h >= v;
            },
            i = function (h, v) {
              return h - v;
            },
            r = function (h, v) {
              return h(v);
            },
            l = function (h, v) {
              return h(v);
            },
            s = function (h, v) {
              return h(v);
            },
            f = function (h, v, I) {
              return h(v, I);
            },
            d = function (h) {
              return u(h);
            },
            p = function (h) {
              return u(h);
            },
            w = function (h, v) {
              return t(h, v);
            },
            b = function (h, v) {
              return i(h, v);
            },
            o = function (h, v) {
              return r(h, v);
            },
            c = "waitUtil timeout";
          return new Promise(async (h, v) => {
            const I = function (g, x, O) {
                return f(g, x, O);
              },
              m = {
                dIqeO: function (g) {
                  return l(d, g);
                },
                OwUat: function (g) {
                  return s(p, g);
                },
                iSUDh: function (g, x) {
                  return f(w, g, x);
                },
                eHoNR: function (g, x) {
                  return I(b, g, x);
                },
                tZVJr: function (g, x) {
                  return I(o, g, x);
                },
                DiGAU: c,
                TgCjW: function (g, x) {
                  return I(o, g, x);
                },
              },
              A = Date.now();
            (async function g() {
              try {
                if (await m.dIqeO(n)) return void m.OwUat(h);
              } catch {}
              m.iSUDh(m.eHoNR(Date.now(), A), e)
                ? m.tZVJr(v, new Error(m.DiGAU))
                : m.TgCjW(requestAnimationFrame, g);
            })();
          });
        }
        const st = 15e3,
          me = 5e3,
          Wn = "https://graphql-info.esuit.dev",
          ft = "graphql_config_cache_",
          we = { maxRetries: 3, retryDelay: 1e3 };
        function Vn(n, e = []) {
          const u = { iZDQO: "error", geJUa: "graphql_load" };
          return {
            level: u.iZDQO,
            errorMessage: n,
            tags: { scope: u.geJUa },
            extras: { pageLink: window.location.href },
            context: e,
          };
        }
        const at = (n) => new Promise((e) => setTimeout(e, n));
        async function lt(n, e, u) {
          const t = function (y, T, L) {
              return y(T, L);
            },
            i = function (y, T) {
              return y(T);
            },
            r = function (y, T, L, H) {
              return y(T, L, H);
            },
            l = function (y, T) {
              return y !== T;
            },
            s = function (y, T) {
              return y(T);
            },
            f = function (y, T) {
              return y(T);
            },
            d = function (y, T) {
              return y instanceof T;
            },
            p = function (y, T) {
              return y === T;
            },
            w = function (y, T) {
              return y / T;
            },
            b = function (y, T) {
              return y + T;
            },
            o = function (y, T) {
              return y + T;
            },
            c = function (y, T, L) {
              return y(T, L);
            },
            h = "HTTP error! status: ",
            v = function (y, T, L, H) {
              return y(T, L, H);
            },
            I = function (y, T, L, H, ee) {
              return y(T, L, H, ee);
            },
            m = function (y, T) {
              return y + T;
            },
            A = "ssss_",
            g = function (y, T, L) {
              return y(T, L);
            },
            x = function (y, T) {
              return y + T;
            },
            O = function (y, T, L) {
              return y(T, L);
            },
            U = function (y, T, L, H) {
              return y(T, L, H);
            },
            G = function (y, T, L) {
              return y(T, L);
            },
            E = function (y, T, L) {
              return y(T, L);
            },
            B = function (y, T) {
              return y + T;
            },
            P = "Failed to connect to ",
            Y = ": Request timeout (exceeded ",
            W = function (y, T) {
              return y + T;
            },
            X = function (y, T) {
              return y + T;
            },
            mn = function (y, T) {
              return y + T;
            },
            un = function (y, T) {
              return y + T;
            },
            J = ": Unknown error",
            R = function (y, T, L) {
              return t(y, T, L);
            },
            wn = function (y, T, L) {
              return t(y, T, L);
            },
            yn = "GET",
            In = "text/plain",
            on = function (y, T) {
              return i(y, T);
            },
            Cn = "string",
            cn = function (y, T, L, H) {
              return r(y, T, L, H);
            },
            F = function (y, T) {
              return l(y, T);
            },
            M = function (y, T) {
              return i(y, T);
            },
            Q = "warning",
            $ = "docId 发生变化",
            nn = "graphql_doc_id_change",
            bn = function (y, T) {
              return s(y, T);
            },
            Ln = function (y, T) {
              return f(y, T);
            },
            En = function (y, T, L) {
              return t(y, T, L);
            },
            jn = "获取远程 GraphQL 配置信息失败",
            zn = "errors",
            sn = function (y, T) {
              return d(y, T);
            },
            Dn = function (y, T) {
              return p(y, T);
            },
            fn = "AbortError",
            Tn = function (y, T) {
              return w(y, T);
            },
            k = b(
              (function (y, T) {
                return y + T;
              })("", ft),
              n
            );
          if (window[k]) return window[k];
          const D = new AbortController(),
            N = r(
              R,
              setTimeout,
              () => {
                D.abort();
              },
              me
            );
          try {
            const y = await r(wn, fetch, o(b(Wn, "/"), n), {
              signal: D.signal,
              method: yn,
              headers: { "Content-Type": In },
            });
            if ((c(on, clearTimeout, N), !y.ok))
              throw new Error(b(h, y.status));
            const T = v(R, ct, await y.text(), Cn);
            let L = JSON.parse(T);
            const H = { ...L };
            return (
              (L = await I(cn, pt, L, e, u)),
              t(F, H.docId, L.docId) &&
                (window.localStorage.getItem(m(A, H.docId)) ||
                  (g(M, u, {
                    level: Q,
                    errorMessage: $,
                    tags: { scope: nn },
                    extras: {
                      pageLink: window.location.href,
                      graphqlName: n,
                      oldDocId: H.docId,
                      newDocId: L.docId,
                    },
                  }),
                  window.localStorage.setItem(x(A, H.docId), "1"))),
              (window[k] = L),
              L
            );
          } catch (y) {
            throw (
              (O(bn, clearTimeout, N),
              O(
                Ln,
                u,
                U(En, Vn, jn, [
                  [
                    zn,
                    {
                      errorString: g(sn, y, Error)
                        ? y.message
                        : G(bn, String, y),
                      graphqlName: n,
                    },
                  ],
                ])
              ),
              E(sn, y, Error)
                ? E(Dn, fn, y.name)
                  ? new Error(o(B(b(B(P, Wn), Y), c(Tn, me, 1e3)), "s)"))
                  : new Error(W(X(mn(P, Wn), ": "), y.message))
                : new Error(un(m(P, Wn), J)))
            );
          }
        }
        function dt(n, e, u = !1) {
          const t = function (d, p, w) {
              return d(p, w);
            },
            i = function (d, p) {
              return d !== p;
            },
            r = function (d, p, w, b) {
              return d(p, w, b);
            },
            l = function (d, p, w) {
              return t(d, p, w);
            },
            s = function (d, p) {
              return i(d, p);
            };
          if (!Array.isArray(n) || !e) return;
          const f = u ? [...n].reverse() : n;
          for (const d of f) {
            const p = r(l, z.get, d, e);
            if (t(s, void 0, p)) return p;
          }
        }
        async function pt(n, e, u) {
          const t = function (k, D) {
              return k === D;
            },
            i = function (k, D, N) {
              return k(D, N);
            },
            r = function (k, D, N, y, T) {
              return k(D, N, y, T);
            },
            l = function (k, D) {
              return k === D;
            },
            s = function (k, D, N, y) {
              return k(D, N, y);
            },
            f = function (k, D) {
              return k(D);
            },
            d = function (k, D) {
              return k(D);
            },
            p = function (k, D) {
              return k(D);
            },
            w = function (k, D) {
              return k instanceof D;
            },
            b = function (k, D) {
              return k(D);
            },
            o = function (k, D, N) {
              return k(D, N);
            },
            c = function (k, D) {
              return k(D);
            },
            h = function (k, D, N, y) {
              return k(D, N, y);
            },
            v = function (k, D, N, y, T, L) {
              return k(D, N, y, T, L);
            },
            I = function (k, D) {
              return k + D;
            },
            m = ".graphql",
            A = function (k, D, N, y, T) {
              return k(D, N, y, T);
            },
            g = function (k, D) {
              return k + D;
            },
            x = function (k, D) {
              return k != D;
            },
            O = function (k, D) {
              return k == D;
            },
            U = function (k, D, N) {
              return k(D, N);
            },
            G = function (k, D, N) {
              return k(D, N);
            },
            E = function (k, D, N) {
              return k(D, N);
            },
            B = function (k, D, N, y) {
              return k(D, N, y);
            },
            P = function (k, D, N) {
              return k(D, N);
            },
            Y = function (k, D, N) {
              return k(D, N);
            },
            W = function (k, D, N, y) {
              return k(D, N, y);
            },
            X = function (k, D) {
              return k != D;
            },
            mn = function (k, D) {
              return k == D;
            };
          var un, J;
          const R = function (k, D) {
              return t(k, D);
            },
            wn = "Bootloader",
            yn = function (k, D, N) {
              return i(k, D, N);
            },
            In = "preloadRouteCode",
            on = function (k, D, N, y, T) {
              return r(k, D, N, y, T);
            },
            Cn = function (k, D) {
              return l(k, D);
            },
            cn = "entrypoint",
            F = function (k, D, N, y) {
              return s(k, D, N, y);
            },
            M = function (k, D) {
              return f(k, D);
            },
            Q = function (k, D) {
              return d(k, D);
            },
            $ = "加载本地模块失败",
            nn = "preloadConfig",
            bn = function (k, D) {
              return p(k, D);
            },
            Ln = function (k, D) {
              return w(k, D);
            },
            En = function (k, D) {
              return b(k, D);
            },
            jn = function (k, D) {
              return p(k, D);
            },
            zn = function (k, D, N) {
              return o(k, D, N);
            },
            sn = "errors";
          if (
            ((Dn = Xn),
            (fn = (function (k, D) {
              return k + D;
            })(n.queryName, m)),
            c(Dn, fn))
          ) {
            const k = o(M, ye, g(n.queryName, m));
            if (x(null, (un = O(null, k) ? void 0 : k.params)) && un.id)
              return { ...n, docId: k.params.id };
          }
          var Dn, fn;
          if (!n.preload || U(R, 0, n.preload.length)) return n;
          for (const k of n.preload) {
            const D = Array.isArray(k) ? k : [k];
            try {
              const N = await Promise.all(
                D.map(
                  (y) =>
                    new Promise((T, L) => {
                      o(R, wn, y.loader)
                        ? h(yn, ht, y.args, y.timeout).then(T).catch(L)
                        : i(R, In, y.loader)
                        ? v(
                            on,
                            mt,
                            y.args[0],
                            y.waitFor || I(n.queryName, m),
                            y.timeout,
                            e
                          )
                            .then(T)
                            .catch(L)
                        : o(Cn, cn, y.loader) &&
                          A(
                            F,
                            gt,
                            y.args[0],
                            y.waitFor || I(n.queryName, m),
                            y.timeout
                          )
                            .then(T)
                            .catch(L);
                    })
                )
              );
              if (G(Cn, 1, D.length)) {
                if (E(Cn, !1, N[0]))
                  return (
                    i(
                      Q,
                      u,
                      B(yn, Vn, $, [
                        [
                          nn,
                          {
                            currentPreload: k,
                            preload: n.preload,
                            queryName: n.queryName,
                          },
                        ],
                      ])
                    ),
                    n
                  );
              } else if (!N.find((y) => y === !0))
                return (
                  i(
                    bn,
                    u,
                    B(yn, Vn, $, [
                      [
                        nn,
                        {
                          currentPreload: k,
                          preload: n.preload,
                          queryName: n.queryName,
                        },
                      ],
                    ])
                  ),
                  n
                );
            } catch (N) {
              const y = P(Ln, N, Error) ? N.message : Y(En, String, N);
              return (
                Y(
                  jn,
                  u,
                  W(zn, Vn, $, [
                    [
                      nn,
                      {
                        currentPreload: k,
                        preload: n.preload,
                        queryName: n.queryName,
                      },
                    ],
                    [sn, { errorString: y }],
                  ])
                ),
                n
              );
            }
          }
          const Tn = i(
            function (k, D) {
              return b(k, D);
            },
            ye,
            g(n.queryName, m)
          );
          return X(null, (J = mn(null, Tn) ? void 0 : Tn.params)) && J.id
            ? { ...n, docId: Tn.params.id }
            : n;
        }
        async function ht(n, e = 5e3) {
          const u = function (r, l, s) {
              return r(l, s);
            },
            t = function (r, l) {
              return r(l);
            },
            i = "sfebpmuppC";
          return new Promise((r) => {
            const l = function (w, b) {
                return t(w, b);
              },
              s = function (w, b) {
                return t(w, b);
              },
              f = function (w, b) {
                return t(w, b);
              },
              d =
                ((p = setTimeout),
                u(
                  p,
                  () => {
                    l(r, !1);
                  },
                  e
                ));
            var p;
            window.zKjQYvgSmF(i).loadModules(n, () => {
              const w = function (o, c) {
                return f(o, c);
              };
              var b;
              (b = clearTimeout), s(b, d), w(r, !0);
            });
          });
        }
        async function gt(n, e, u = 5e3) {
          const t = "GFzbmfSufnpD",
            i = function (f, d, p) {
              return f(d, p);
            };
          try {
            return (
              window.zKjQYvgSmF(t).fetchPredictedResources(window.require(n), {
                routeParams: {},
                routeProps: {},
              }),
              await ((r = ge), (l = () => Xn(e)), (s = u), i(r, l, s)),
              !0
            );
          } catch {
            return !1;
          }
          var r, l, s;
        }
        async function mt(n, e, u = 5e3, t) {
          const i = function (p, w, b) {
              return p(w, b);
            },
            r = function (p, w) {
              return p(w);
            },
            l = "msVsfuvpSufnpDf{jmbnspo";
          try {
            if (await ((s = Xn), (f = e), r(s, f))) return !0;
          } catch {}
          var s, f, d;
          try {
            return (
              (n = window.zKjQYvgSmF(l)(n)),
              t.preloadRouteCode(n),
              await ((d = u), i(ge, () => Xn(e), d)),
              !0
            );
          } catch {
            return !1;
          }
        }
        function ye(n) {
          const e = "hvcfe``",
            u = function (s, f) {
              return s + f;
            },
            t = function (s, f) {
              return s + f;
            },
            i = "Module ",
            r = " is not loaded",
            l = window.zKjQYvgSmF(e).modulesMap[n];
          if (!l) throw new Error(u(t(i, n), r));
          return l.exports ? l.exports : window.require(n);
        }
        function Xn(n) {
          return !!window.zKjQYvgSmF("hvcfe``").modulesMap[n];
        }
        async function wt(n, e, u, t) {
          const i = function (C, S, j, tn) {
              return C(S, j, tn);
            },
            r = function (C, S) {
              return C(S);
            },
            l = function (C, S) {
              return C(S);
            },
            s = function (C, S) {
              return C === S;
            },
            f = function (C, S) {
              return C === S;
            },
            d = function (C, S) {
              return C(S);
            },
            p = function (C, S, j) {
              return C(S, j);
            },
            w = function (C, S) {
              return C instanceof S;
            },
            b = function (C, S) {
              return C(S);
            },
            o = function (C, S) {
              return C && S;
            },
            c = function (C, S) {
              return C instanceof S;
            },
            h = function (C, S, j, tn, Sn) {
              return C(S, j, tn, Sn);
            },
            v = function (C, S, j) {
              return C(S, j);
            },
            I = function (C, S) {
              return C + S;
            },
            m = function (C, S) {
              return C + S;
            },
            A = "graphql request error [",
            g = "]: ",
            x = function (C, S) {
              return C != S;
            },
            O = function (C, S, j) {
              return C(S, j);
            },
            U = function (C, S, j, tn, Sn) {
              return C(S, j, tn, Sn);
            },
            G = function (C, S, j) {
              return C(S, j);
            },
            E = function (C, S) {
              return C + S;
            },
            B = function (C, S) {
              return C + S;
            },
            P = function (C, S) {
              return C + S;
            },
            Y = function (C, S) {
              return C + S;
            },
            W = function (C, S) {
              return C + S;
            },
            X = function (C, S) {
              return C + S;
            },
            mn = "graphql request warning [",
            un = function (C, S, j) {
              return C(S, j);
            },
            J = function (C, S) {
              return C + S;
            },
            R = function (C, S) {
              return C + S;
            },
            wn = "graphql request parser error [",
            yn = "graphql request timeout [",
            In = function (C, S) {
              return C == S;
            },
            on = function (C, S, j) {
              return C(S, j);
            },
            Cn = function (C, S, j) {
              return C(S, j);
            },
            cn = function (C, S, j) {
              return C(S, j);
            },
            F = function (C, S, j) {
              return C(S, j);
            },
            M = function (C, S, j) {
              return C(S, j);
            },
            Q = "graphql request unknown error [",
            $ = function (C, S, j, tn, Sn) {
              return C(S, j, tn, Sn);
            },
            nn = function (C, S, j) {
              return C(S, j);
            },
            bn = function (C, S, j) {
              return C(S, j);
            },
            Ln = function (C, S) {
              return C + S;
            },
            En = function (C, S) {
              return C + S;
            },
            jn = function (C, S) {
              return C + S;
            },
            zn = "graphql config error [",
            sn = function (C, S, j, tn) {
              return i(C, S, j, tn);
            },
            Dn = "graphqlRequest 1",
            fn = function (C, S) {
              return r(C, S);
            },
            Tn = "complete/next stuck",
            k = function (C, S) {
              return l(C, S);
            },
            D = function (C, S) {
              return s(C, S);
            },
            N = function (C, S) {
              return f(C, S);
            },
            y = "CRITICAL",
            T = "graphqlRequest 2",
            L = function (C, S) {
              return d(C, S);
            },
            H = function (C, S, j) {
              return p(C, S, j);
            },
            ee = function (C, S) {
              return w(C, S);
            },
            Ae = function (C, S) {
              return d(C, S);
            },
            rr = "graphqlRequest 3",
            Fe = function (C, S) {
              return b(C, S);
            },
            or = "utfvrfSSIY",
            ir = "tnbsbQdoztBufh",
            Me = "POST",
            ur = "hjgopDJQBzbmfS",
            cr = "sftsbQftopqtfSefloviDzbmfSfubfsd",
            sr = "tmjuVutfvrfSMRiqbsHzbmfS",
            fr = function (C, S) {
              return o(C, S);
            },
            ar = "Required dependencies are not available",
            lr = "/graphql/query/",
            dr = "/api/graphql/",
            pr = "RelayModern",
            hr = "application/x-www-form-urlencoded",
            gr = "X-BLOKS-VERSION-ID",
            mr = "EJhojopjtsfWtlpmCcfX",
            wr = "X-CSRFToken",
            qe = "hjgopDtjsbmpQ",
            yr = "X-IG-App-ID",
            Cr = "graphqlRequest 4",
            Sr = function (C, S) {
              return r(C, S);
            },
            vr = "pjubSmfyjQcfX",
            br = function (C, S) {
              return c(C, S);
            },
            xr = function (C, S) {
              return r(C, S);
            },
            kr = function (C, S) {
              return b(C, S);
            },
            { graphqlName: an, afterArgs: Ir, skipLabelData: Tr = !1 } = n;
          try {
            const C = await $(sn, lt, an, e, t),
              S = nn(fn, Ir, C.variables);
            S.scale || (S.scale = window.zKjQYvgSmF(vr).get());
            const { docId: j } = C;
            let tn = 0,
              Sn = !1;
            return new Promise((_e, Un) => {
              const Dr = function (ln, vn, An) {
                  return O(ln, vn, An);
                },
                Ar = function (ln, vn, An) {
                  return v(ln, vn, An);
                };
              var Oe;
              const Yn = {
                fb_api_req_friendly_name: an,
                variables: JSON.stringify(S),
                doc_id: j,
              };
              try {
                const ln = window.zKjQYvgSmF(or),
                  vn = window.zKjQYvgSmF(ir)(Me),
                  An = window.zKjQYvgSmF(ur),
                  Pe = window.zKjQYvgSmF(cr),
                  Ne = In(null, (Oe = window.zKjQYvgSmF(sr)))
                    ? void 0
                    : Oe.parsePayload;
                if (!(on(fr, ln, vn) && An && Pe && Ne)) throw new Error(ar);
                const fe = [];
                let Le = 0;
                const ae = new ln(u ? lr : dr),
                  Fr = An.actorID;
                ae.setMethod(Me)
                  .setData({
                    av: Fr,
                    ...vn,
                    fb_api_caller_class: pr,
                    server_timestamps: !0,
                    ...Yn,
                  })
                  .setErrorHandler((dn) => {
                    const pn = [dn.errorCode, dn.errorType, dn.errorMsg]
                      .filter(Boolean)
                      .join(" ");
                    h(sn, Kn, Dn, pn, Yn),
                      v(fn, Un, new Error(I(I(m(A, an), g), pn)));
                  })
                  .setResponseHandler(
                    Cn(Fe, Pe, (dn) => {
                      const pn = {
                        HwqHW: Tn,
                        uRxsq: function (xn, hn) {
                          return Dr(fn, xn, hn);
                        },
                      };
                      try {
                        for (const xn of dn) {
                          const hn = v(k, Ne, xn.responseText);
                          if (x(null, hn) && hn.errors && v(D, 0, Le)) {
                            const Gn =
                              hn.errors.find(
                                (Bn) => Bn.severity === "CRITICAL"
                              ) || hn.errors[0];
                            if (Gn) {
                              const Bn = [Gn.code, Gn.message, Gn.description]
                                .filter(Boolean)
                                .join("  ");
                              if (O(N, y, Gn.severity))
                                return (
                                  U(sn, Kn, T, Bn, Yn),
                                  G(L, Un, new Error(E(B(P(A, an), g), Bn)))
                                );
                              console.warn(Y(W(X(mn, an), g), Bn));
                            }
                          }
                          if ((fe.push(hn), Tr || xn.isComplete))
                            return (Sn = !0), void G(k, _e, fe);
                          Le++,
                            window.clearTimeout(tn),
                            (tn = i(
                              H,
                              setTimeout,
                              () => {
                                Sn ||
                                  (console.log(pn.HwqHW),
                                  (Sn = !0),
                                  pn.uRxsq(_e, fe));
                              },
                              st
                            ));
                        }
                      } catch (xn) {
                        const hn = O(ee, xn, Error)
                          ? un(Ae, oe, xn)
                          : G(L, String, xn);
                        h(sn, Kn, rr, hn, Yn),
                          v(fn, Un, new Error(B(J(R(wn, an), g), hn)));
                      }
                    })
                  )
                  .setTimeout(3e4)
                  .setTimeoutHandler(() => {
                    var dn, pn;
                    (dn = Un),
                      (pn = new Error(E(X(yn, an), "]"))),
                      Ar(Fe, dn, pn);
                  });
                const te = { "Content-Type": hr, "X-FB-Friendly-Name": an };
                u &&
                  ((te[gr] = window.zKjQYvgSmF(mr).versioningID),
                  (te[wr] = window.zKjQYvgSmF(qe).getCSRFToken()),
                  (te[yr] = window.zKjQYvgSmF(qe).getIGAppID())),
                  Object.entries(te).forEach(([dn, pn]) => {
                    ae.setRequestHeader(dn, pn);
                  }),
                  ae.send();
              } catch (ln) {
                const vn = p(ee, ln, Error)
                  ? cn(Ae, oe, ln)
                  : F(fn, String, ln);
                U(sn, Kn, Cr, vn, Yn),
                  M(Sr, Un, new Error(J(E(I(Q, an), g), vn)));
              }
            });
          } catch (C) {
            const S = bn(br, C, Error) ? on(xr, oe, C) : F(kr, String, C);
            throw new Error(Ln(En(jn(zn, an), g), S));
          }
        }
        async function yt(n, e, u, t, i = we) {
          const r = function (F, M) {
              return F <= M;
            },
            l = function (F, M) {
              return F > M;
            },
            s = function (F, M) {
              return F * M;
            },
            f = function (F, M) {
              return F - M;
            },
            d = function (F, M) {
              return F(M);
            },
            p = function (F, M, Q, $, nn) {
              return F(M, Q, $, nn);
            },
            w = function (F, M) {
              return F instanceof M;
            },
            b = function (F, M) {
              return F === M;
            },
            o = function (F, M, Q) {
              return F(M, Q);
            },
            c = function (F, M, Q) {
              return F(M, Q);
            },
            h = function (F, M, Q) {
              return F(M, Q);
            },
            v = function (F, M) {
              return F + M;
            },
            I = function (F, M) {
              return F + M;
            },
            m = function (F, M) {
              return F + M;
            },
            A = function (F, M) {
              return F + M;
            },
            g = "Retrying GraphQL request [",
            x = "], attempt ",
            O = " of ",
            U = function (F, M, Q, $, nn, bn) {
              return F(M, Q, $, nn, bn);
            },
            G = function (F, M, Q) {
              return F(M, Q);
            },
            E = function (F, M, Q) {
              return F(M, Q);
            },
            B = function (F, M) {
              return F + M;
            },
            P = "GraphQL request failed after ",
            Y = " retries:",
            W = "Unknown error occurred",
            X = function (F, M) {
              return r(F, M);
            },
            mn = function (F, M) {
              return l(F, M);
            },
            un = function (F, M) {
              return s(F, M);
            },
            J = function (F, M) {
              return f(F, M);
            },
            R = function (F, M) {
              return d(F, M);
            },
            wn = function (F, M, Q, $, nn) {
              return p(F, M, Q, $, nn);
            },
            yn = function (F, M) {
              return w(F, M);
            },
            In = function (F, M) {
              return b(F, M);
            },
            { maxRetries: on, retryDelay: Cn } = i;
          let cn = null;
          for (let F = 0; o(X, F, on); F++)
            try {
              if (c(mn, F, 0)) {
                const M = h(un, Cn, Math.pow(2, h(J, F, 1)));
                console.warn(v(I(I(m(A(g, n.graphqlName), x), F), O), on)),
                  await h(R, at, M);
              }
              return await U(wn, wt, n, e, u, t);
            } catch (M) {
              if (
                ((cn = G(yn, M, Error) ? M : new Error(h(R, String, M))),
                E(In, F, on))
              )
                throw (console.error(B(A(P, on), Y), cn), cn);
            }
          throw cn || new Error(W);
        }
        function Ct(n) {
          const e = "debug",
            u = "sentry",
            t = function (w, b, o, c, h, v) {
              return w(b, o, c, h, v);
            },
            i = "instagram",
            r = "sfidubqtjEsfuvpSufnpDftv",
            l = function (w, b, o) {
              return w(b, o);
            },
            { projectId: s } = n,
            f = !!window.location.host.includes(i),
            d = window.zKjQYvgSmF(r)(),
            p = l(
              q.useMemo,
              () => {
                let w = !1;
                return (
                  ~window.location.search.indexOf(e) && (w = !0),
                  (w = !window[s] || !window[s].isProdMode),
                  new tt(s, w)
                );
              },
              [s]
            );
          return {
            graphqlRequest: async function (w, b = we) {
              return (function (o, c, h, v, I, m) {
                return t(o, c, h, v, I, m);
              })(
                yt,
                w,
                d,
                f,
                (o) => {
                  p.send(u, o);
                },
                b
              );
            },
            findValueFromLoadQueryData: dt,
          };
        }
        var St = ((n) => (
            (n[(n.FREE = 0)] = "FREE"),
            (n[(n.BASIC = 1)] = "BASIC"),
            (n[(n.PREMIUM = 2)] = "PREMIUM"),
            n
          ))(St || {}),
          vt = ((n) => (
            (n[(n.SUBSCRIPTION = 0)] = "SUBSCRIPTION"),
            (n[(n.ONETIME_PAYMENT = 1)] = "ONETIME_PAYMENT"),
            n
          ))(vt || {}),
          bt = ((n) => (
            (n[(n.ONE_MONTH = 1)] = "ONE_MONTH"),
            (n[(n.THREE_MONTH = 3)] = "THREE_MONTH"),
            (n[(n.SIX_MONTH = 6)] = "SIX_MONTH"),
            (n[(n.A_YEAR = 12)] = "A_YEAR"),
            n
          ))(bt || {}),
          xt = ((n) => (
            (n[(n.STRIPE = 0)] = "STRIPE"), (n[(n.PAYPAL = 1)] = "PAYPAL"), n
          ))(xt || {}),
          kt = ((n) => (
            (n[(n.FACEBOOK = 0)] = "FACEBOOK"),
            (n[(n.INSTAGRAM = 1)] = "INSTAGRAM"),
            n
          ))(kt || {}),
          It = ((n) => (
            (n.SUBSCRIPTION = "paypal_subscription"),
            (n.PAYMENT = "paypal_payment"),
            n
          ))(It || {}),
          Tt = ((n) => (
            (n.RETURN_PAGE = "RETURN_PAGE"),
            (n.RETURN_EXT = "RETURN_EXT"),
            (n.RETURN_EXT_LOCAL = "RETURN_EXT_LOCAL"),
            n
          ))(Tt || {});
        function Dt(n) {
          const e = {
              GEKRV: "visitPricingPage",
              LGKbY: function (o, c, h) {
                return o(c, h);
              },
              rbZDq: "div",
              MzmGx: "var(--primary-text)",
              tzBPO: function (o, c, h) {
                return o(c, h);
              },
              SMFRo: "1.4em",
              nknJs: "This feature is designed for professional users.",
              coafb: function (o, c, h) {
                return o(c, h);
              },
              mlTuM: function (o, c, h) {
                return o(c, h);
              },
              fgwcs: "12px 0 0 0",
              vxqcB: "left",
              ejZRQ: function (o, c, h) {
                return o(c, h);
              },
              nCztG: "Upgrade to the",
              muWil: function (o, c) {
                return o === c;
              },
              bkgxe: "span",
              wSOYO: "inline-block",
              rDpft: "0 7px",
              sVzvI: "1px solid #389e0d",
              fuVrU: "#389e0d",
              bjLDv: "Basic",
              cRJMf: function (o, c, h) {
                return o(c, h);
              },
              CVqWK: "1px solid #0958d9",
              jIVkU: "#0958d9",
              zGVrm: "Premium",
              KIQfi: "plan to unlock the unlimited version.",
              jLinz: function (o, c, h) {
                return o(c, h);
              },
              fisSz: "button",
              PaiJC: "#1677ff",
              NALIA: "transparent",
              HfkpO: "none",
              NGHtA: "center",
              xNofr: "pointer",
              AzqAk: "Upgrade Now!",
              SEOUo: function (o, c) {
                return o(c);
              },
              ataVJ: "setPersistLocalStorage",
              fEMuS: "getPersistLocalStorage",
              DPvVW: "getUIMemoSettings",
              dgqkk: function (o, c) {
                return o(c);
              },
              QejfJ: function (o, c) {
                return o(c);
              },
              MgFIi: function (o, c) {
                return o(c);
              },
              mvzhA: "Free trial",
              oWpaC: function (o, c, h) {
                return o(c, h);
              },
              IeFjy: " FREE try remaining.",
              dkKGg: "flex",
              ULfcG: "end",
              lZqVS: function (o, c, h) {
                return o(c, h);
              },
              RzCTi: "text",
              stMGh: "Do not show me again!",
              xCEfc: function (o, c, h) {
                return o(c, h);
              },
              xtfsn: "primary",
              FKcfC: "Continue",
              unMJJ: "Message",
              RDKxB: function (o, c, h) {
                return o(c, h);
              },
              ZRaRf: "No free try left.",
              SbvXh: "Upgrade Now",
              kfrra: "close",
              snMzB: function (o, c) {
                return o > c;
              },
              joARK: function (o, c, h) {
                return o(c, h);
              },
              iFRkn: function (o, c, h) {
                return o(c, h);
              },
              Dktgi: "The first ",
              NbYET: function (o, c) {
                return o ?? c;
              },
              JEZWO: "times",
              YAing: " are FREE.",
              JjLlW: function (o, c, h) {
                return o(c, h);
              },
              HkMon: function (o, c, h) {
                return o(c, h);
              },
              NHADU: function (o, c) {
                return o(c);
              },
              gsmhV: function (o) {
                return o();
              },
              EUpoh: "not exist",
              Xbqkv: function (o, c) {
                return o !== c;
              },
              FQbDH: function (o, c) {
                return o === c;
              },
              YyHdt: "setUIMemoSettings",
              uKCPU: "feature._.memoKey not exist",
              tuGYj: function (o, c) {
                return o > c;
              },
              wwBld: "freeTry",
              lCIzx: function (o, c) {
                return o > c;
              },
              WHVZo: "limitation",
            },
            {
              messageInstance: u,
              defaultMemoConfig: t,
              onGetMemoSettings: i,
              modalApi: r,
              projectId: l,
              extId: s,
            } = n,
            f = "" + n.projectId.replaceAll("-", "_");
          async function d() {
            u.send(e.GEKRV);
          }
          function p(o, c) {
            return e.LGKbY(a.jsxs, e.rbZDq, {
              style: { color: e.MzmGx },
              children: [
                e.tzBPO(a.jsx, e.rbZDq, {
                  style: {
                    marginBottom: 12,
                    fontSize: 14,
                    lineHeight: e.SMFRo,
                  },
                  children: e.nknJs,
                }),
                c
                  ? e.tzBPO(a.jsxs, a.Fragment, {
                      children: [
                        e.coafb(a.jsx, e.rbZDq, {
                          style: { fontSize: 18 },
                          children: c,
                        }),
                        e.mlTuM(a.jsx, e.rbZDq, {
                          style: {
                            margin: e.fgwcs,
                            textAlign: e.vxqcB,
                            fontSize: 12,
                            opacity: 0.4,
                          },
                          children: "OR",
                        }),
                      ],
                    })
                  : null,
                e.ejZRQ(a.jsxs, e.rbZDq, {
                  style: { fontSize: 14, lineHeight: e.SMFRo },
                  children: [
                    e.nCztG,
                    " ",
                    e.tzBPO(a.jsx, a.Fragment, {
                      children: e.muWil(10, o.permission)
                        ? e.tzBPO(a.jsx, e.bkgxe, {
                            style: {
                              fontSize: 12,
                              display: e.wSOYO,
                              padding: e.rDpft,
                              border: e.sVzvI,
                              color: e.fuVrU,
                              borderRadius: 4,
                            },
                            children: e.bjLDv,
                          })
                        : e.cRJMf(a.jsx, e.bkgxe, {
                            style: {
                              fontSize: 12,
                              display: e.wSOYO,
                              padding: e.rDpft,
                              border: e.CVqWK,
                              color: e.jIVkU,
                              borderRadius: 4,
                            },
                            children: e.zGVrm,
                          }),
                    }),
                    " ",
                    e.KIQfi,
                    e.jLinz(a.jsx, e.fisSz, {
                      style: {
                        color: e.PaiJC,
                        backgroundColor: e.NALIA,
                        fontSize: 14,
                        padding: "0",
                        outline: e.HfkpO,
                        textAlign: e.NGHtA,
                        cursor: e.xNofr,
                        border: e.HfkpO,
                        marginLeft: 8,
                      },
                      onClick: d,
                      children: e.AzqAk,
                    }),
                  ],
                }),
              ],
            });
          }
          function w(o) {
            const c =
              "do-not-show-permission-check" + e.SEOUo(encodeURIComponent, o);
            u.send(e.ataVJ, c, 1);
          }
          async function b(o) {
            const c =
              "do-not-show-permission-check" + e.SEOUo(encodeURIComponent, o);
            return await u.send(e.fEMuS, c, 0);
          }
          return (
            e.joARK(
              q.useEffect,
              () => {
                (async () => {
                  const o = await u.send(e.DPvVW);
                  e.dgqkk(i, o);
                })();
              },
              []
            ),
            {
              checkIfCanUseWithModal: function (o, c, h) {
                const v = function (A, g) {
                    return e.MgFIi(A, g);
                  },
                  I = function (A) {
                    return e.gsmhV(A);
                  };
                if (!window[f][o])
                  return console.error(o, e.EUpoh), Promise.resolve(!1);
                const m = window[f][o];
                return !m.needUpgrade ||
                  (m._.memoKey &&
                    e.Xbqkv(void 0, t[m._.memoKey]) &&
                    e.FQbDH(c, t[m._.memoKey]))
                  ? Promise.resolve(!0)
                  : new Promise(async (A) => {
                      const g = function (O, U) {
                          return e.dgqkk(O, U);
                        },
                        x = function (O, U) {
                          return e.QejfJ(O, U);
                        };
                      if (m.isCanFreeTry)
                        if (m.freeTryLeft) {
                          if (await e.SEOUo(b, o)) return e.MgFIi(A, !0);
                          const O = r.confirm({
                            title: e.mvzhA,
                            content: e.oWpaC(
                              p,
                              m,
                              e.ejZRQ(a.jsxs, a.Fragment, {
                                children: [
                                  e.jLinz(a.jsx, "b", {
                                    style: { fontSize: 18 },
                                    children: m.freeTryLeft,
                                  }),
                                  e.IeFjy,
                                ],
                              })
                            ),
                            footer: e.LGKbY(a.jsx, e.rbZDq, {
                              style: {
                                display: e.dkKGg,
                                justifyContent: e.ULfcG,
                                marginTop: 24,
                              },
                              children: e.jLinz(a.jsxs, _.Space, {
                                size: 12,
                                children: [
                                  e.lZqVS(a.jsx, _.Button, {
                                    type: e.RzCTi,
                                    onClick: () => {
                                      O.destroy(), g(w, o), g(A, !0);
                                    },
                                    children: e.stMGh,
                                  }),
                                  e.xCEfc(a.jsx, _.Button, {
                                    type: e.xtfsn,
                                    onClick: () => {
                                      O.destroy(), v(A, !0);
                                    },
                                    children: e.FKcfC,
                                  }),
                                ],
                              }),
                            }),
                          });
                        } else
                          r.confirm({
                            title: e.unMJJ,
                            content: e.RDKxB(
                              p,
                              m,
                              e.RDKxB(a.jsx, a.Fragment, { children: e.ZRaRf })
                            ),
                            okText: e.SbvXh,
                            cancelText: e.kfrra,
                            onOk() {
                              I(d), v(A, !1);
                            },
                            onCancel() {
                              x(A, !1);
                            },
                          });
                      else if (m.limitation && e.snMzB(m.limitation, 0)) {
                        if (await e.QejfJ(b, o)) return e.MgFIi(A, !0);
                        const O = r.confirm({
                          content: e.joARK(
                            p,
                            m,
                            e.iFRkn(a.jsxs, a.Fragment, {
                              children: [
                                e.Dktgi,
                                e.RDKxB(a.jsx, "b", { children: m.limitation }),
                                " ",
                                e.NbYET(h, e.JEZWO),
                                e.YAing,
                              ],
                            })
                          ),
                          footer: e.oWpaC(a.jsx, e.rbZDq, {
                            style: {
                              display: e.dkKGg,
                              justifyContent: e.ULfcG,
                              marginTop: 24,
                            },
                            children: e.JjLlW(a.jsxs, _.Space, {
                              size: 12,
                              children: [
                                e.HkMon(a.jsx, _.Button, {
                                  type: e.RzCTi,
                                  onClick: () => {
                                    O.destroy(), v(w, o), v(A, !0);
                                  },
                                  children: e.stMGh,
                                }),
                                e.LGKbY(a.jsx, _.Button, {
                                  type: e.xtfsn,
                                  onClick: () => {
                                    O.destroy(), v(A, !0);
                                  },
                                  children: e.FKcfC,
                                }),
                              ],
                            }),
                          }),
                        });
                      } else
                        r.confirm({
                          title: e.unMJJ,
                          content: e.NHADU(p, m),
                          okText: "ok",
                          cancelText: e.kfrra,
                          onOk() {
                            x(A, !1);
                          },
                          onCancel() {
                            v(A, !1);
                          },
                        });
                    });
              },
              setUIMemoSettings: async function (o) {
                await u.send(e.YyHdt, o);
              },
              getFeatureLimitProcessTimeValue: function (o) {
                const { featureKey: c, currentIndex: h, currentValue: v } = o;
                if (!window[f][c])
                  throw (
                    (console.error(c, e.EUpoh), new Error(c + " not exist"))
                  );
                const I = window[f][c];
                if (!I._.memoKey)
                  throw (
                    (console.error(c, e.uKCPU),
                    new Error(c + " feature._.memoKey not exist"))
                  );
                const m = t[I._.memoKey];
                return I.needUpgrade && e.tuGYj(h, I.limitation) ? m : v;
              },
              checkIfCanUse: function (o) {
                if (!window[f][o]) return console.error(o, e.EUpoh), !1;
                const c = window[f][o];
                return (
                  !c.needUpgrade ||
                  (c.isCanFreeTry && c.freeTryLeft
                    ? e.wwBld
                    : !(!c.limitation || !e.lCIzx(c.limitation, 0)) && e.WHVZo)
                );
              },
              getUIMemoSettings: async function () {
                return await u.send(e.DPvVW);
              },
            }
          );
        }
        var ie = ((n) => (
          (n.FETCH_LIMIT = "fetchLimit"),
          (n.NESTING_COMMENT = "nestingComment"),
          (n.RESUME_EXPORTING = "RESUME_EXPORTING"),
          n
        ))(ie || {});
        const qn = {
            fetchLimit: 200,
            isIncludeNesting: !1,
            fullSpeed: !1,
            nestingDepth: 2,
          },
          Jn = q.createContext(null);
        function At(n) {
          const [e, u] = _.message.useMessage(),
            [t, i] = _.Modal.useModal();
          return (
            (r = a.jsxs),
            (l = Jn.Provider),
            (s = {
              value: { messageApi: e, modalApi: t },
              children: [u, i, n.children],
            }),
            r(l, s)
          );
          var r, l, s;
        }
        var Ft = Object.defineProperty,
          Mt = (n, e, u) =>
            e in n
              ? Ft(n, e, {
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                  value: u,
                })
              : (n[e] = u),
          Rn = (n, e, u) => Mt(n, typeof e != "symbol" ? e + "" : e, u);
        class qt {
          constructor(e, u) {
            const t = function (d, p, w) {
                return d(p, w);
              },
              i = function (d, p, w, b) {
                return d(p, w, b);
              },
              r = "listeners",
              l = "slug",
              s = function (d, p, w) {
                return d(p, w);
              };
            t(Rn, this, "id"),
              i(Rn, this, r, {}),
              t(Rn, this, l),
              s(Rn, this, "isDebugger"),
              (this.slug = e),
              (this.isDebugger = !!u),
              (this.id = window[e].id),
              this.bindEvent();
          }
          on(e, u) {
            return (
              (this.listeners[e] = this.listeners[e] || []),
              this.listeners[e].push(u),
              () => {
                if (this.listeners[e].includes(u)) {
                  const t = this.listeners[e].indexOf(u);
                  this.listeners[e].splice(t, 1);
                }
              }
            );
          }
          send(e, ...u) {
            const t = "received message from page send callback",
              i = function (l, s) {
                return l(s);
              },
              r = "send message from page";
            return new Promise(async (l) => {
              let s = { action: e, payload: u };
              this.isDebugger && console.log(r, s),
                chrome.runtime.sendMessage(this.id, s, {}, (f) => {
                  this.isDebugger && console.log(t, f), i(l, f);
                });
            });
          }
          connect() {
            chrome.runtime.sendMessage(this.id, { action: "__connect" });
          }
          disconnect() {
            chrome.runtime.sendMessage(this.id, { action: "__disconnect" });
          }
          bindEvent() {
            window.addEventListener(
              "message",
              this._handleReceivingMessage.bind(this)
            );
          }
          destroy() {
            this.disconnect(),
              (this.listeners = {}),
              window.removeEventListener(
                "message",
                this._handleReceivingMessage.bind(this)
              );
          }
          _handleReceivingMessage(e) {
            const u = function (r, l) {
                return r === l;
              },
              t = "received message from background",
              i = function (r, ...l) {
                return r(...l);
              };
            if (e.data && u(e.data.from, this.slug) && e.data.payload) {
              const { action: r, payload: l } = e.data.payload;
              if (
                (this.isDebugger && console.log(t, e.data), this.listeners[r])
              )
                for (let s of this.listeners[r]) i(s, ...l);
            }
          }
        }
        function Ce(n, e) {
          const u = window.URL.createObjectURL(n),
            t = document.createElement("a");
          (t.style.display = "none"),
            (t.href = u),
            (t.download = e),
            document.body.appendChild(t),
            t.click(),
            window.URL.revokeObjectURL(u);
        }
        function _t() {
          return (
            !!~window.location.search.indexOf("debug") ||
            !window[en] ||
            !window[en].isProdMode
          );
        }
        function Se(n, e) {
          const u = "text/plain",
            t = [
              new ClipboardItem({
                "text/plain": new Blob(
                  [
                    (function (i, r) {
                      return i(r);
                    })(Ot, n),
                  ],
                  { type: u }
                ),
              }),
            ];
          window.navigator.clipboard.write(t).then(e);
        }
        function Ot(n) {
          const e = function (r, l) {
              return r < l;
            },
            u = function (r, l) {
              return r - l;
            },
            t = function (r, l) {
              return r - l;
            };
          let i = "";
          return (
            n.map((r, l) => {
              const s = function (d, p) {
                  return e(d, p);
                },
                f = function (d, p) {
                  return u(d, p);
                };
              r.map((d, p) => {
                (i += d), (i += s(p, f(r.length, 1)) ? "	" : "");
              }),
                (i += e(l, t(n.length, 1))
                  ? `
`
                  : "");
            }),
            i
          );
        }
        let Pt = new qt(en, _t());
        function _n() {
          return Pt;
        }
        const On = "CHRONOLOGICAL_UNFILTERED_INTENT_V1",
          kn = q.createContext(null);
        function Nt(n) {
          const e = {
              yyelo: function (m, A) {
                return m(A);
              },
              PeGYQ: function (m, A) {
                return m(A);
              },
              pricd: function (m, A) {
                return m(A);
              },
              eTnIe: function (m, A) {
                return m(A);
              },
              pRhYz: function (m, A, g, x) {
                return m(A, g, x);
              },
              LppPr: "comments",
              hQryQ: function (m, A) {
                return m && A;
              },
              eAdSc: function (m, A, g) {
                return m(A, g);
              },
              ilMhY: "div",
              SfjVP: "FullSpeed option will cause frequent API requests, you",
              rzMqn: "have to",
              YSygt: " agree our",
              CEAzF: "_blank",
              nnzkH: "#385898",
              jXAcZ: "https://esuit.dev/disclaimer",
              yrjLr: "Disclaimer",
              dRilk: "span",
              ZGnTD: "disclaimer-level level1",
              SArWB: " to turn on this option",
              FbyFO: "AGREE",
              ZuUnm: function (m, A) {
                return m(A);
              },
              CBnxN: function (m, A) {
                return m(A);
              },
              xjEHc: function (m, A) {
                return m(A);
              },
              ZpdXE: function (m) {
                return m();
              },
            },
            { modalApi: u, messageApi: t } = e.pricd(q.useContext, Jn),
            [i, r] = e.eTnIe(q.useState, qn.fetchLimit),
            [l, s] = e.ZuUnm(q.useState, qn.isIncludeNesting),
            [f, d] = e.CBnxN(q.useState, qn.fullSpeed),
            [p, w] = e.eTnIe(q.useState, qn.nestingDepth),
            [b, o] = e.xjEHc(q.useState, On),
            {
              setUIMemoSettings: c,
              checkIfCanUseWithModal: h,
              getFeatureLimitProcessTimeValue: v,
            } = e.yyelo(Dt, {
              projectId: en,
              extId: Ye,
              modalApi: u,
              messageApi: t,
              messageInstance: e.ZpdXE(_n),
              defaultMemoConfig: qn,
              onGetMemoSettings(m) {
                e.yyelo(r, m.fetchLimit),
                  e.yyelo(s, m.isIncludeNesting),
                  e.PeGYQ(d, m.fullSpeed),
                  e.pricd(w, m.nestingDepth);
              },
            }),
            I = e.eAdSc(
              q.useCallback,
              () => {
                e.eTnIe(c, {
                  fetchLimit: i,
                  isIncludeNesting: l,
                  fullSpeed: f,
                  nestingDepth: p,
                });
              },
              [i, l, f, p]
            );
          return e.eAdSc(a.jsx, kn.Provider, {
            value: {
              fetchLimit: i,
              setFetchLimit: r,
              isIncludeNesting: l,
              async setIsIncludeNesting(m) {
                (await e.pRhYz(h, ie.NESTING_COMMENT, m, e.LppPr)) &&
                  e.eTnIe(s, m);
              },
              fullSpeed: f,
              setFullSpeed: function (m) {
                const A = en + "-disclaimer",
                  g = localStorage.getItem(A);
                e.hQryQ(m, !g)
                  ? u.confirm({
                      content: e.eAdSc(a.jsxs, e.ilMhY, {
                        children: [
                          e.SfjVP,
                          " ",
                          e.eAdSc(a.jsx, "b", { children: e.rzMqn }),
                          e.YSygt,
                          " ",
                          e.eAdSc(a.jsx, "a", {
                            target: e.CEAzF,
                            style: { color: e.nnzkH },
                            href: e.jXAcZ,
                            children: e.yrjLr,
                          }),
                          e.eAdSc(a.jsx, e.dRilk, { className: e.ZGnTD }),
                          e.SArWB,
                        ],
                      }),
                      okText: e.FbyFO,
                      onOk: () => {
                        localStorage.setItem(A, "1"), e.eTnIe(d, !0);
                      },
                    })
                  : e.eTnIe(d, m);
              },
              nestingDepth: p,
              setNestingDepth: w,
              saveMemoSettings: I,
              sortBy: b,
              setSortBy: o,
              checkIfCanUseWithModal: h,
              getFeatureLimitProcessTimeValue: v,
            },
            children: n.children,
          });
        }
        const Pn = q.createContext(null);
        var K = ((n) => (
          (n[(n.START = 0)] = "START"),
          (n[(n.FETCHING = 1)] = "FETCHING"),
          (n[(n.FETCHED = 2)] = "FETCHED"),
          (n[(n.DOWNLOADED = 3)] = "DOWNLOADED"),
          n
        ))(K || {});
        const rn = q.createContext(null);
        function Lt(n) {
          const e = function (P) {
              return P();
            },
            u = function (P, Y) {
              return P(Y);
            },
            t = function (P) {
              return P();
            },
            i = function (P, Y) {
              return P(Y);
            },
            r = function (P) {
              return P();
            },
            l = function (P, Y) {
              return P(Y);
            },
            s = function (P, Y) {
              return P(Y);
            },
            f = function (P, Y) {
              return P(Y);
            },
            d = function (P, Y) {
              return P(Y);
            },
            p = function (P, Y) {
              return P(Y);
            },
            w = function (P, Y, W) {
              return P(Y, W);
            },
            b = function (P, Y, W) {
              return P(Y, W);
            },
            o = s(q.useRef, !1),
            c = s(q.useRef, []),
            h = f(q.useRef, []),
            v = d(q.useRef, null),
            [I, m] = p(q.useState, 0),
            [A, g] = p(q.useState, !1),
            [x, O] = p(q.useState, 0);
          w(
            q.useEffect,
            () => {
              !A && e(B);
            },
            [A]
          );
          const U = () => {
              u(m, Math.random);
            },
            G = (P) => {
              (c.current = P), e(U);
            },
            E = (P) => {
              (h.current = P), t(U);
            };
          function B() {
            (o.current = !0),
              (v.current = null),
              u(O, 0),
              i(G, []),
              u(E, []),
              r(U);
          }
          return b(a.jsx, rn.Provider, {
            value: {
              open: A,
              setOpen: g,
              isStopManually: o,
              commentsRef: c,
              appendComments: (P) => {
                l(G, [...c.current, ...P]);
              },
              setComments: G,
              clearComments: () => G([]),
              logsRef: h,
              appendLog: (P) => E([...h.current, P]),
              setLogs: E,
              clearLogs: () => E([]),
              setStep: O,
              step: x,
              resetStatus: B,
              updateUI: U,
              resumeDownloadPayload: v,
            },
            children: n.children,
          });
        }
        const ve = [{ label: "All comments", value: On }];
        function Et() {
          const n =
              "^comment_rendering_instance_for_feed_location{$1}.^^selectable_intents.*",
            e = function (c, h) {
              return c > h;
            },
            u = function (c, h) {
              return c(h);
            },
            t = function (c, h) {
              return c > h;
            },
            i = function (c, h) {
              return c(h);
            },
            r = function (c, h) {
              return c(h);
            },
            l = function (c, h, v) {
              return c(h, v);
            },
            s = function (c, h, v) {
              return c(h, v);
            },
            { setSortBy: f } = u(q.useContext, kn),
            { open: d } = u(q.useContext, rn),
            { feedback: p } = i(q.useContext, Pn),
            w = l(
              q.useMemo,
              () => {
                const c =
                    window.zKjqYvcSmF(p.__id, n, {
                      $1: {
                        location: p.__fragmentOwner.variables.feedLocation,
                      },
                    }) ?? !1,
                  h = c
                    ? c
                        .map(({ $1: v }) => ({
                          label: window.zKjqYvcSmF(v, "title"),
                          value: window.zKjqYvcSmF(v, "intent_token"),
                        }))
                        .filter((v) => v && v.label.trim() && v.value.trim())
                    : ve;
                return e(h.length, 0) ? h : ve;
              },
              [p]
            ),
            b = s(
              q.useMemo,
              () =>
                window.zKjqYvcSmF(
                  p.__id,
                  "^comment_rendering_instance_for_feed_location{$1}.^selected_intent.intent_token",
                  { $1: { location: p.__fragmentOwner.variables.feedLocation } }
                ) ?? On,
              [d, p]
            ),
            o = l(q.useMemo, () => w.length === 1 && w[0].value === On, [w]);
          return (
            l(
              q.useEffect,
              () => {
                const c = w.find((h) => [b].includes(h.value));
                c
                  ? u(f, c.value)
                  : t(w.length, 1)
                  ? i(f, w[0].value)
                  : r(f, On);
              },
              [p.__id, w, b]
            ),
            { sortBySelections: w, isDisabledSortBy: o }
          );
        }
        const jt = window.export_comments_for_facebook.fetchLimit.limitation,
          zt = window.export_comments_for_facebook.fetchLimit.limitation
            ? window.export_comments_for_facebook.fetchLimit.limitation
            : void 0;
        function Ut() {
          const n = {
              whkOP: function (o) {
                return o();
              },
              tFuxh: "visitPricing",
              OQIER: function (o, c) {
                return o(c);
              },
              nYrkV: function (o) {
                return o();
              },
              HECDT: function (o, c, h) {
                return o(c, h);
              },
              PKCaD: "vertical",
              syTSm: function (o, c, h) {
                return o(c, h);
              },
              ZJfZk: "span",
              fyFhz: "Fetch Count:",
              vQgCT: "small",
              sMmoR: "text",
              Cibts: "#3C89E8",
              ZCGht: "Upgrade to fetch more!",
              vlAyd: "/export-comments-for-facebook/how-to-use-sortby.html",
              qfvpb: "Click to see how it works",
              NXyHA: "Sort By:",
              RYDwC: function (o, c, h) {
                return o(c, h);
              },
              UIOjU: "The current entrance does not support sortBy options.",
              DDBfS: function (o, c, h) {
                return o(c, h);
              },
              SxNAV:
                "https://docs.esuit.dev/export-comments-for-facebook/how-to-use-sortby.html#how-to-solve-the-issue-of-being-unable-to-switch-the-sortby-value",
              ybyrW: "_blank",
              JYAHx: "Please check how to resolve.",
              ggwnL: function (o, c, h) {
                return o(c, h);
              },
              nFIll: function (o, c, h) {
                return o(c, h);
              },
              LNXFB: "⚡️Full Speed",
              GLIBm: function (o, c, h) {
                return o(c, h);
              },
              pNVqL: "📄Includes Nesting Comments",
              EOSnX: function (o, c, h) {
                return o(c, h);
              },
              IDVhM: "(The request speed will be slowed down.)",
              YJAqR: function (o, c, h) {
                return o(c, h);
              },
              LwWFF: "the maximum nesting depth of the comments.",
              xIjfj: "right",
              lTuiX: "Nesting Depth:",
              dKTBt: function (o, c, h) {
                return o(c, h);
              },
            },
            {
              fetchLimit: e,
              setFetchLimit: u,
              isIncludeNesting: t,
              setIsIncludeNesting: i,
              fullSpeed: r,
              setFullSpeed: l,
              nestingDepth: s,
              setNestingDepth: f,
              setSortBy: d,
              sortBy: p,
            } = n.OQIER(q.useContext, kn),
            { sortBySelections: w, isDisabledSortBy: b } = n.nYrkV(Et);
          return n.HECDT(a.jsx, _.Space, {
            direction: n.PKCaD,
            size: 12,
            children: n.HECDT(a.jsxs, _.Space, {
              size: 12,
              direction: n.PKCaD,
              children: [
                n.HECDT(a.jsxs, _.Space, {
                  size: 42,
                  children: [
                    n.syTSm(a.jsxs, _.Space, {
                      size: 8,
                      children: [
                        n.syTSm(a.jsx, n.ZJfZk, { children: n.fyFhz }),
                        n.HECDT(a.jsx, _.InputNumber, {
                          min: 50,
                          max: zt,
                          value: e,
                          onChange: (o) => u(o ?? 50),
                        }),
                        !!jt &&
                          n.syTSm(a.jsx, _.Button, {
                            size: n.vQgCT,
                            type: n.sMmoR,
                            style: { color: n.Cibts },
                            onClick: function () {
                              n.whkOP(_n).send(n.tFuxh);
                            },
                            children: n.ZCGht,
                          }),
                      ],
                    }),
                    n.HECDT(a.jsxs, _.Space, {
                      size: 8,
                      children: [
                        n.syTSm(a.jsx, $e, {
                          linkPath: n.vlAyd,
                          title: n.qfvpb,
                          children: n.NXyHA,
                        }),
                        n.syTSm(a.jsx, _.Tooltip, {
                          title: b
                            ? n.RYDwC(a.jsxs, a.Fragment, {
                                children: [
                                  n.UIOjU,
                                  " ",
                                  n.DDBfS(a.jsx, "a", {
                                    href: n.SxNAV,
                                    target: n.ybyrW,
                                    children: n.JYAHx,
                                  }),
                                ],
                              })
                            : "",
                          children: n.ggwnL(a.jsx, _.Select, {
                            style: { minWidth: 200 },
                            value: p,
                            onChange: (o) => d(o),
                            options: w,
                            disabled: b,
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
                n.nFIll(a.jsx, _.Checkbox, {
                  checked: r,
                  onChange: (o) => l(o.target.checked),
                  children: n.LNXFB,
                }),
                n.GLIBm(a.jsxs, _.Checkbox, {
                  checked: t,
                  onChange: (o) => i(o.target.checked),
                  children: [
                    n.pNVqL,
                    " ",
                    t &&
                      n.EOSnX(a.jsx, n.ZJfZk, {
                        style: { fontSize: 10, opacity: 0.8 },
                        children: n.IDVhM,
                      }),
                  ],
                }),
                t &&
                  n.YJAqR(a.jsx, _.Tooltip, {
                    title: n.LwWFF,
                    placement: n.xIjfj,
                    children: n.syTSm(a.jsxs, _.Space, {
                      size: 8,
                      children: [
                        n.syTSm(a.jsx, n.ZJfZk, { children: n.lTuiX }),
                        n.dKTBt(a.jsx, _.InputNumber, {
                          min: 1,
                          max: 5,
                          value: s,
                          onChange: (o) => f(o ?? 5),
                        }),
                      ],
                    }),
                  }),
              ],
            }),
          });
        }
        function $n(n) {
          const e = function (t, i) {
              return t > i;
            },
            u = function (t, i) {
              return t(i);
            };
          return (function t(i) {
            let r = [];
            for (let l of i)
              r.push(l),
                l.children &&
                  e(l.children.length, 0) &&
                  r.push(...u(t, l.children));
            return r;
          })(u(ue, n));
        }
        function ue(n) {
          const e = function (i, r) {
              return i === r;
            },
            u = function (i, r, l) {
              return i(r, l);
            },
            t = function (i, r) {
              return i > r;
            };
          return (function i(r, l = "") {
            const s = [];
            for (const f of r)
              if (e(f.parentFeedbackId, l)) {
                const d = u(i, r, f.id);
                t(d.length, 0) && (f.children = d), s.push(f);
              }
            return s;
          })((n = u(z.uniqBy, n, "id")));
        }
        const V = {
          Id: "id",
          UserId: "author.id",
          Avatar: "author.avatar",
          Author: "author.name",
          Content: "content",
          Url: "url",
          "Reaction Count": "reactionsCount",
          Depth: "depth",
          "Reply Count": "subCommentsCount",
          CommentAt: (n) =>
            Fn.unix(n.createdAt).format("MM/DD/YYYY hh:mm:ss A"),
        };
        function Yt(n) {
          const e = function (l, s) {
              return l < s;
            },
            u = function (l, s) {
              return l + s;
            },
            t = function (l, s) {
              return l + s;
            },
            i = [],
            r = n;
          for (let l = 0; e(l, r.length); l++) {
            const s = r[l];
            let f = [];
            Object.keys(V).map((d) =>
              typeof V[d] == "string"
                ? f.push(Nn(z.get(s, V[d], "")))
                : typeof V[d] == "function"
                ? f.push(Nn(V[d](s)))
                : void 0
            ),
              i.push(f);
          }
          return u(
            t(
              Object.keys(V)
                .map((l) => '"' + l + '"')
                .join(","),
              `\r
`
            ),
            i.map((l) => l.join(",")).join(`\r
`)
          );
        }
        function Nn(n) {
          return (function (e, u) {
            return e + u;
          })(
            (function (e, u) {
              return e + u;
            })(
              '"',
              (n = (function (e, u) {
                return e(u);
              })(String, n)).replaceAll('"', '""')
            ),
            '"'
          );
        }
        function Gt() {
          const n = {
              hgxGB: "Story",
              lSFSj: "Feedback.Story",
              CBTPs: function (s, f) {
                return s(f);
              },
              SCGKt: "application/json;charset=utf-8",
              QOBoM: function (s, f, d) {
                return s(f, d);
              },
              vrwfV: "Downloaded successfully",
              bOpEm: function (s, f) {
                return s(f);
              },
              UtVGZ: function (s, f) {
                return s(f);
              },
              PBUOt: function (s, f) {
                return s(f);
              },
              ldbOx: "data:application/csv;charset=utf-8,",
              XARlX: function (s, f) {
                return s(f);
              },
              HDZgn: "Copied succeeded",
              WbpQK: function (s, f) {
                return s(f);
              },
              xqDrF: function (s, f) {
                return s < f;
              },
              RAlVq: function (s, f) {
                return s(f);
              },
              BcYFu: function (s, f, d) {
                return s(f, d);
              },
              sRHTI: function (s, f) {
                return s(f);
              },
              gcVmI: function (s, f, d) {
                return s(f, d);
              },
            },
            { commentsRef: e, setStep: u } = n.sRHTI(q.useContext, rn),
            { messageApi: t } = n.sRHTI(q.useContext, Jn),
            { feedback: i } = n.bOpEm(q.useContext, Pn),
            r = n.BcYFu(
              q.useMemo,
              () => {
                let s = window.zkJQyvcSmF(i.__id, n.hgxGB, { depth: 5 });
                return (
                  s || (s = window.zKjQYvCSMf(i.__id, n.lSFSj)),
                  (s == null ? void 0 : s.post_id) ?? ""
                );
              },
              [i]
            ),
            l = n.gcVmI(q.useMemo, () => (r ? Mn + " postId_" + r : Mn), [r]);
          return {
            downloadAsJSON: function () {
              const s = n.CBTPs(ue, e.current),
                f = new TextEncoder().encode(JSON.stringify(n.CBTPs(ue, s))),
                d = new Blob([f], { type: n.SCGKt });
              n.QOBoM(Ce, d, l + " total_" + s.length + ".json"),
                t.success(n.vrwfV),
                n.bOpEm(u, K.DOWNLOADED);
            },
            downloadAsCsv: function () {
              const s = n
                  .UtVGZ(z.cloneDeep, n.bOpEm($n, e.current))
                  .map(
                    (p) => ((p.content = "-".repeat(p.depth) + p.content), p)
                  ),
                f = new TextEncoder().encode(n.PBUOt(Yt, s)),
                d = new Blob([f], { type: n.ldbOx });
              n.QOBoM(Ce, d, l + " total_" + s.length + ".csv"),
                t.success(n.vrwfV),
                n.XARlX(u, K.DOWNLOADED);
            },
            copyToClipboard: function () {
              const s = n
                  .XARlX(z.cloneDeep, n.WbpQK($n, e.current))
                  .map(
                    (d) => ((d.content = "-".repeat(d.depth) + d.content), d)
                  ),
                f = [];
              f.push(Object.keys(V));
              for (let d = 0; n.xqDrF(d, s.length); d++) {
                const p = s[d];
                let w = [];
                Object.keys(V).map((b) =>
                  typeof V[b] == "string"
                    ? b === "Avatar"
                      ? w.push(Nn('=IMAGE("' + z.get(p, V[b], "") + '")'))
                      : w.push(Nn(z.get(p, V[b], "")))
                    : typeof V[b] == "function"
                    ? w.push(Nn(V[b](p)))
                    : void 0
                ),
                  f.push(w);
              }
              n.QOBoM(Se, f, () => {
                t.success(n.HDZgn), n.UtVGZ(u, K.DOWNLOADED);
              });
            },
            copyIDs: function () {
              const s = n.PBUOt($n, e.current),
                f = [...new Set(s.map((d) => d.author.id))];
              n.BcYFu(
                Se,
                f.map((d) => [d]),
                () => {
                  t.success(n.HDZgn), n.RAlVq(u, K.DOWNLOADED);
                }
              );
            },
          };
        }
        function be() {
          const n = {
              eWtul: function (r) {
                return r();
              },
              YINAp: function (r, l, s) {
                return r(l, s);
              },
              ROEmW: "vertical",
              EWRcS: function (r, l, s) {
                return r(l, s);
              },
              RvNcE: "div",
              jnVJQ: "Select a Format to start the Downloading:",
              qYIhz: function (r, l, s) {
                return r(l, s);
              },
              ADxeG: "JSON",
              OtbYN: function (r, l, s) {
                return r(l, s);
              },
              PJzbk: "CSV",
              Tbqpm: function (r, l, s) {
                return r(l, s);
              },
              ZRXcg:
                "Set comments data to Your clipboard as Google sheet formats. and it allows You paste it on Google sheet!",
              WQqMA: "Clipboard",
              WVeVf:
                "Only copy the commenter's ID and filter out duplicate users.",
              KbNkd: "Copy IDs Only",
            },
            {
              downloadAsCsv: e,
              downloadAsJSON: u,
              copyToClipboard: t,
              copyIDs: i,
            } = n.eWtul(Gt);
          return n.YINAp(a.jsxs, _.Space, {
            direction: n.ROEmW,
            size: 8,
            children: [
              n.EWRcS(a.jsx, n.RvNcE, { children: n.jnVJQ }),
              n.EWRcS(a.jsxs, _.Space, {
                size: 12,
                children: [
                  n.qYIhz(a.jsx, _.Button, { onClick: u, children: n.ADxeG }),
                  n.OtbYN(a.jsx, _.Button, { onClick: e, children: n.PJzbk }),
                  n.Tbqpm(a.jsx, _.Tooltip, {
                    title: n.ZRXcg,
                    children: n.EWRcS(a.jsx, _.Button, {
                      onClick: t,
                      children: n.WQqMA,
                    }),
                  }),
                  n.YINAp(a.jsx, _.Tooltip, {
                    title: n.WVeVf,
                    children: n.OtbYN(a.jsx, _.Button, {
                      onClick: i,
                      children: n.KbNkd,
                    }),
                  }),
                ],
              }),
            ],
          });
        }
        function xe() {
          const n = function (v, I) {
              return v(I);
            },
            e = function (v, I) {
              return v(I);
            },
            u = function (v, I, m) {
              return v(I, m);
            },
            t = function (v, I) {
              return v === I;
            },
            i = function (v, I, m) {
              return v(I, m);
            },
            r = function (v, I, m) {
              return v(I, m);
            },
            l = "span",
            s = "Found ",
            f = " comments",
            d = "small",
            p = "Stop",
            {
              step: w,
              commentsRef: b,
              isStopManually: o,
              setStep: c,
            } = e(q.useContext, rn),
            { fetchLimit: h } = e(q.useContext, kn);
          return u(a.jsxs, _.Space, {
            size: 12,
            children: [
              t(w, K.FETCHING) && i(a.jsx, _.Spin, {}),
              r(a.jsxs, l, { children: [s, Math.min(b.current.length, h), f] }),
              t(w, K.FETCHING) &&
                u(a.jsx, _.Button, {
                  danger: !0,
                  size: d,
                  onClick: function () {
                    (o.current = !0), n(c, K.FETCHED);
                  },
                  children: p,
                }),
            ],
          });
        }
        function ke() {
          const n = {
              agIBS: function (t) {
                return t();
              },
              duYSC: function (t, i) {
                return t(i);
              },
              cpvJi: function (t, i, r) {
                return t(i, r);
              },
              oCFxy: function (t, i, r) {
                return t(i, r);
              },
              UZyqP: "div",
              ggquB: "scroll",
              WJiDA: "hidden",
              jhuLf: "var(--primary-text)",
              Iziiv: "1px solid var(--secondary-text)",
            },
            e = n.agIBS(q.useRef),
            { logsRef: u } = n.duYSC(q.useContext, rn);
          return (
            n.cpvJi(
              q.useEffect,
              () => {
                e.current && (e.current.scrollTop = e.current.scrollHeight);
              },
              [u.current]
            ),
            n.oCFxy(a.jsx, n.UZyqP, {
              ref: e,
              style: {
                maxHeight: 140,
                height: 140,
                overflow: n.ggquB,
                overflowX: n.WJiDA,
                borderRadius: 4,
                padding: 8,
                fontSize: 12,
                color: n.jhuLf,
                border: n.Iziiv,
              },
              children: u.current
                .slice(-50)
                .map((t) => a.jsx("div", { children: t })),
            })
          );
        }
        function Ie() {
          const n = function (m, A) {
              return m(A);
            },
            e = function (m, A, g) {
              return m(A, g);
            },
            u = function (m, A) {
              return m(A);
            },
            t = "small",
            i = "240px",
            r = function (m, A, g, x) {
              return m(A, g, x);
            },
            l = "feedbackId",
            s = function (m, A, g, x) {
              return m(A, g, x);
            },
            f = "Author",
            d = "author",
            p = function (m, A, g, x) {
              return m(A, g, x);
            },
            w = "Content",
            b = "content",
            o = function (m, A, g, x) {
              return m(A, g, x);
            },
            c = "Comment At",
            h = "createdAt",
            { commentsRef: v } = n(q.useContext, rn),
            I = v.current.slice(0, 20);
          return e(a.jsxs, _.Table, {
            dataSource: u($n, I),
            pagination: !1,
            bordered: !0,
            size: t,
            expandable: { childrenColumnName: "__" },
            scroll: { y: i },
            footer: () =>
              v.current.length > 20
                ? a.jsx("div", { children: "View more after download it." })
                : a.jsx(a.Fragment, {}),
            children: [
              r(
                a.jsx,
                _.Table.Column,
                { title: "ID", width: 80, ellipsis: !0, dataIndex: l },
                l
              ),
              s(
                a.jsx,
                _.Table.Column,
                {
                  title: f,
                  dataIndex: d,
                  ellipsis: !0,
                  width: 120,
                  render: (m) =>
                    a.jsxs("a", {
                      href: m.url,
                      target: "_blank",
                      children: [
                        a.jsx(_.Avatar, { size: 24, src: m.avatar }),
                        a.jsx("span", {
                          style: { paddingLeft: 8 },
                          children: m.name,
                        }),
                      ],
                    }),
                },
                d
              ),
              p(
                a.jsx,
                _.Table.Column,
                {
                  title: w,
                  dataIndex: b,
                  ellipsis: !0,
                  render: (m, A) => "" + "-".repeat(A.depth) + m,
                },
                b
              ),
              o(
                a.jsx,
                _.Table.Column,
                {
                  title: c,
                  dataIndex: h,
                  width: 200,
                  render: (m) => Fn.unix(m).format("MM/DD/YYYY hh:mm:ss A"),
                },
                h
              ),
            ],
          });
        }
        function Bt() {
          const n = {
            pxpIx: function (e, u, t) {
              return e(u, t);
            },
            cAINo: "Have issues or 🐛Bug during Download?",
            pGpXc: function (e, u, t) {
              return e(u, t);
            },
            oBXiG: "https://esuit.dev/RedirectingToFBPage.html",
            XpsOh: "_blank",
            zUrYE: "Give us feedback on Facebook",
            XiVZJ: "and we'll help you fix it!",
          };
          return n.pxpIx(a.jsxs, "p", {
            style: { opacity: 0.6 },
            children: [
              n.cAINo,
              " ",
              n.pGpXc(a.jsx, "a", {
                href: n.oBXiG,
                target: n.XpsOh,
                style: { paddingRight: 8 },
                children: n.zUrYE,
              }),
              n.XiVZJ,
            ],
          });
        }
        function Qt() {
          const n = {
              dEMbl: function (t, i) {
                return t + i;
              },
              euDaq: "sftVuofssvD",
              erEBD: function (t, i, r) {
                return t(i, r);
              },
              UqfTQ: "flex",
              ADDFC: "row",
              LPLiz: "wrap",
              xRHvL: "flex-start",
              uxgnt: "center",
              ZVJEC: "var(--primary-text)",
              sxncT: "It Seems",
              OWucf: function (t, i, r) {
                return t(i, r);
              },
              yuMNw: "img",
              YGJkt: "block",
              PkdZD: "0 8px",
              ZNxbc: "#0a7cff",
              JwijW: " not working right now.",
              divOe: "https://esuit.dev/RedirectingToFBPage.html",
              gAKyy: "_blank",
              CphJN: "Give us feedback on Facebook",
              PjKTy: "and we'll help you fix it!",
              nPqOn: " You have to logged in!",
            },
            e = n.dEMbl(window[en].extensionFolderUri, window[en].icons[128]),
            u = !!window.zKjQYvgSmF(n.euDaq).getID();
          return n.erEBD(
            a.jsxs,
            "p",
            u
              ? {
                  style: {
                    display: n.UqfTQ,
                    flexDirection: n.ADDFC,
                    flexWrap: n.LPLiz,
                    justifyContent: n.xRHvL,
                    alignItems: n.uxgnt,
                    color: n.ZVJEC,
                  },
                  children: [
                    n.sxncT,
                    " ",
                    n.OWucf(a.jsx, n.yuMNw, {
                      src: e,
                      style: {
                        width: 24,
                        height: 24,
                        display: n.YGJkt,
                        margin: n.PkdZD,
                        color: n.ZNxbc,
                      },
                    }),
                    Mn,
                    n.JwijW,
                    n.erEBD(a.jsx, "a", {
                      href: n.divOe,
                      target: n.gAKyy,
                      style: { paddingRight: 8 },
                      children: n.CphJN,
                    }),
                    n.PjKTy,
                  ],
                }
              : {
                  style: {
                    display: n.UqfTQ,
                    flexDirection: n.ADDFC,
                    flexWrap: n.LPLiz,
                    justifyContent: n.xRHvL,
                    alignItems: n.uxgnt,
                    color: n.ZVJEC,
                  },
                  children: [
                    n.erEBD(a.jsx, n.yuMNw, {
                      src: e,
                      style: {
                        width: 24,
                        height: 24,
                        display: n.YGJkt,
                        margin: n.PkdZD,
                      },
                    }),
                    Mn,
                    n.nPqOn,
                  ],
                }
          );
        }
        function Ht() {
          const n = {
              clRFY: function (u, t) {
                return u(t);
              },
              EcnWT: "Copy successful.",
              muWCA: function (u, t, i) {
                return u(t, i);
              },
              AwzzT:
                "Encountering an issue? Click this icon to copy the Case ID and contact us on Facebook.",
              hrhef: "text",
              puEXM: "small",
            },
            { messageApi: e } = n.clRFY(q.useContext, Jn);
          return n.muWCA(a.jsx, _.Tooltip, {
            title: n.AwzzT,
            children: n.muWCA(a.jsx, _.Button, {
              type: n.hrhef,
              size: n.puEXM,
              onClick: function () {
                navigator.clipboard.writeText(
                  n.clRFY(
                    btoa,
                    n.clRFY(encodeURIComponent, window.location.href)
                  )
                ),
                  e.success(n.EcnWT);
              },
              children: "🐛",
            }),
          });
        }
        const ce = q.createContext(null);
        function Kt(n) {
          const e = function (v, I) {
              return v(I);
            },
            u = function (v, I) {
              return v && I;
            },
            t = "getResumeCursor",
            i = function (v, I) {
              return v === I;
            },
            r = "setResumeCursor",
            l = "removeResumeCursor",
            s = function (v) {
              return v();
            },
            f = function (v, I, m) {
              return v(I, m);
            },
            { feedback: d } = e(q.useContext, Pn),
            p = d.__id,
            { open: w, resumeDownloadPayload: b } = e(q.useContext, rn),
            o = s(_n),
            [c, h] = e(q.useState, null);
          return (
            f(
              q.useEffect,
              () => {
                u(p, w) &&
                  o.send(t, p).then((v) => {
                    e(h, v);
                  });
              },
              [p, w]
            ),
            f(a.jsx, ce.Provider, {
              value: {
                resumeCursor: c,
                updateResumeCursor: function (v) {
                  var I;
                  (b.current &&
                    i((I = b.current) == null ? void 0 : I.lastCursor, v)) ||
                    o.send(r, { feedbackId: p, lastCursor: v });
                },
                removeResumeCursor: function () {
                  p && o.send(l, p);
                },
              },
              children: n.children,
            })
          );
        }
        function Zt(n) {
          return n &&
            n.__esModule &&
            Object.prototype.hasOwnProperty.call(n, "default")
            ? n.default
            : n;
        }
        var Te = { exports: {} };
        (function (n, e) {
          var u,
            t = {
              PNWQE: "second",
              FgyVu: "minute",
              oBNvf: "hour",
              TXgkF: "day",
              qkwHs: "month",
              IZbKY: "year",
              yeGRI: function (i, r) {
                return i < r;
              },
              kgZiG: function (i, r) {
                return i(r);
              },
              Qoopv: function (i, r) {
                return i > r;
              },
              kBcBg: function (i, r) {
                return i <= r;
              },
              qLySK: function (i, r) {
                return i <= r;
              },
              FwVZL: function (i, r) {
                return i - r;
              },
              qFIzI: function (i, r) {
                return i + r;
              },
              aXPYH: function (i, r) {
                return i == r;
              },
              nbCyF: "string",
              PxqEM: function (i, r, l, s, f) {
                return i(r, l, s, f);
              },
              aIGqU: "function",
              sIWWl: function (i) {
                return i();
              },
              ZLVQN: function (i, r) {
                return i(r);
              },
              slYpS: function (i, r) {
                return i || r;
              },
              iaZrW: "in %s",
              nJiLs: "%s ago",
              NhqCf: "a few seconds",
              BVDLG: "a minute",
              HOuJr: "%d minutes",
              Zxsaw: "an hour",
              CTATb: "%d hours",
              CEXlC: "a day",
              walPW: "%d days",
              xCnKm: "a month",
              ltzXA: "%d months",
              EQnvM: "a year",
              cYskT: "%d years",
              WQDEE: function (i, r, l, s) {
                return i(r, l, s);
              },
              jQwha: function (i) {
                return i();
              },
            };
          (u = function () {
            var i = function (r, l, s, f) {
              return t.WQDEE(r, l, s, f);
            };
            return function (r, l, s) {
              var f = {
                LDXsy: t.PNWQE,
                qXgrd: t.FgyVu,
                Pwhlq: t.oBNvf,
                BfGSv: t.TXgkF,
                cFLbg: t.qkwHs,
                lOcGy: t.IZbKY,
                igyrj: function (o, c) {
                  return t.yeGRI(o, c);
                },
                MEbup: function (o, c) {
                  return t.kgZiG(o, c);
                },
                qfCmZ: function (o, c) {
                  return t.Qoopv(o, c);
                },
                bCfkF: function (o, c) {
                  return t.kBcBg(o, c);
                },
                pcpks: function (o, c) {
                  return t.qLySK(o, c);
                },
                lUtvD: function (o, c) {
                  return t.Qoopv(o, c);
                },
                fDejq: function (o, c) {
                  return t.FwVZL(o, c);
                },
                gXrKN: function (o, c) {
                  return t.qFIzI(o, c);
                },
                IdSJS: function (o, c) {
                  return t.aXPYH(o, c);
                },
                eiOLG: t.nbCyF,
                IJRWq: function (o, c, h, v, I) {
                  return t.PxqEM(o, c, h, v, I);
                },
                xUmZJ: t.aIGqU,
                OHQqU: function (o, c) {
                  return t.kgZiG(o, c);
                },
                EPKcP: function (o) {
                  return t.sIWWl(o);
                },
                BoglT: function (o, c) {
                  return t.kgZiG(o, c);
                },
                YvJnF: function (o, c) {
                  return t.ZLVQN(o, c);
                },
              };
              r = t.slYpS(r, {});
              var d = l.prototype,
                p = {
                  future: t.iaZrW,
                  past: t.nJiLs,
                  s: t.NhqCf,
                  m: t.BVDLG,
                  mm: t.HOuJr,
                  h: t.Zxsaw,
                  hh: t.CTATb,
                  d: t.CEXlC,
                  dd: t.walPW,
                  M: t.xCnKm,
                  MM: t.ltzXA,
                  y: t.EQnvM,
                  yy: t.cYskT,
                };
              function w(o, c, h, v) {
                return d.fromToBase(o, c, h, v);
              }
              (s.en.relativeTime = p),
                (d.fromToBase = function (o, c, h, v, I) {
                  for (
                    var m,
                      A,
                      g,
                      x = h.$locale().relativeTime || p,
                      O = r.thresholds || [
                        { l: "s", r: 44, d: f.LDXsy },
                        { l: "m", r: 89 },
                        { l: "mm", r: 44, d: f.qXgrd },
                        { l: "h", r: 89 },
                        { l: "hh", r: 21, d: f.Pwhlq },
                        { l: "d", r: 35 },
                        { l: "dd", r: 25, d: f.BfGSv },
                        { l: "M", r: 45 },
                        { l: "MM", r: 10, d: f.cFLbg },
                        { l: "y", r: 17 },
                        { l: "yy", d: f.lOcGy },
                      ],
                      U = O.length,
                      G = 0;
                    f.igyrj(G, U);
                    G += 1
                  ) {
                    var E = O[G];
                    E.d &&
                      (m = v
                        ? f.MEbup(s, o).diff(h, E.d, !0)
                        : h.diff(o, E.d, !0));
                    var B = (r.rounding || Math.round)(Math.abs(m));
                    if (((g = f.qfCmZ(m, 0)), f.bCfkF(B, E.r) || !E.r)) {
                      f.pcpks(B, 1) && f.lUtvD(G, 0) && (E = O[f.fDejq(G, 1)]);
                      var P = x[E.l];
                      I && (B = f.MEbup(I, f.gXrKN("", B))),
                        (A = f.IdSJS(f.eiOLG, typeof P)
                          ? P.replace("%d", B)
                          : f.IJRWq(P, B, c, E.l, g));
                      break;
                    }
                  }
                  if (c) return A;
                  var Y = g ? x.future : x.past;
                  return f.IdSJS(f.xUmZJ, typeof Y)
                    ? f.OHQqU(Y, A)
                    : Y.replace("%s", A);
                }),
                (d.to = function (o, c) {
                  return f.IJRWq(w, o, c, this, !0);
                }),
                (d.from = function (o, c) {
                  return i(w, o, c, this);
                });
              var b = function (o) {
                return o.$u ? s.utc() : f.EPKcP(s);
              };
              (d.toNow = function (o) {
                return this.to(f.BoglT(b, this), o);
              }),
                (d.fromNow = function (o) {
                  return this.from(f.YvJnF(b, this), o);
                });
            };
          }),
            (n.exports = t.jQwha(u));
        })(Te);
        var Wt = Te.exports;
        const Vt = Zt(Wt);
        Fn.extend(Vt);
        function Xt(n) {
          const e = {
              kVRlG: function (r, l, s, f) {
                return r(l, s, f);
              },
              isPAx: "comments",
              wRkGc: function (r, l) {
                return r(l);
              },
              QlFWS: function (r, l) {
                return r(l);
              },
              pANXu: function (r, l, s) {
                return r(l, s);
              },
              Ibmgs: "Resume exporting from the last exported point.",
              Xeddy: function (r, l, s) {
                return r(l, s);
              },
              RYLBP: "vertical",
              wNjhf: "nowrap",
              YiVVx: "div",
              UmSAC: "From: ",
              UMLJx: "Date:",
              rEmkY: "MM/DD/YYYY hh:mm:ss",
              SctXO: function (r, l, s) {
                return r(l, s);
              },
              JkjOg: "primary",
              HulIl: "Resume exporting?",
            },
            { resumeCursor: u } = e.wRkGc(q.useContext, ce),
            { resumeDownloadPayload: t } = e.wRkGc(q.useContext, rn),
            { checkIfCanUseWithModal: i } = e.QlFWS(q.useContext, kn);
          if (u)
            return e.pANXu(a.jsx, _.Popover, {
              title: e.Ibmgs,
              content: e.Xeddy(a.jsxs, _.Space, {
                direction: e.RYLBP,
                size: 8,
                style: { whiteSpace: e.wNjhf, fontSize: 14 },
                children: [
                  e.Xeddy(a.jsxs, e.YiVVx, {
                    children: [e.UmSAC, Fn.unix(u.lastUpdateAt).fromNow()],
                  }),
                  e.pANXu(a.jsxs, e.YiVVx, {
                    children: [
                      e.UMLJx,
                      " ",
                      Fn.unix(u.lastUpdateAt).format(e.rEmkY),
                    ],
                  }),
                ],
              }),
              children: e.SctXO(a.jsx, _.Button, {
                type: e.JkjOg,
                ghost: !0,
                onClick: function () {
                  e.kVRlG(i, ie.RESUME_EXPORTING, null, e.isPAx).then((r) => {
                    r &&
                      ((t.current = u),
                      t.current && n.onClick(t.current.lastCursor));
                  });
                },
                children: e.HulIl,
              }),
            });
        }
        let ne = 0;
        function Jt() {
          const n = {
              lejRZ: function (g) {
                return g();
              },
              GMuRW: function (g) {
                return g();
              },
              mefjS: function (g, x) {
                return g(x);
              },
              ghsYy: "CommentsListComponentsPaginationQuery",
              mgZPo: function (g, x, O, U) {
                return g(x, O, U);
              },
              Poavs:
                "[0]data.node.comment_rendering_instance_for_feed_location.comments.edges",
              zHDMM: function (g, x, O, U) {
                return g(x, O, U);
              },
              FLnqK:
                "[0]data.node.comment_rendering_instance_for_feed_location.comments.page_info.has_next_page",
              uxiao:
                "[0]data.node.comment_rendering_instance_for_feed_location.comments.page_info.end_cursor",
              OjvNu: function (g, x) {
                return g(x);
              },
              uMQQx: function (g, x) {
                return g(x);
              },
              WvSja: function (g, x) {
                return g(x);
              },
              iqMGu: function (g, x) {
                return g(x);
              },
              dPZPU: function (g) {
                return g();
              },
              Parfm: function (g, x) {
                return g > x;
              },
              XasYx: "multiple relay data",
              yHllM: function (g) {
                return g();
              },
              qVLif: function (g, x, O) {
                return g(x, O);
              },
              thjOv: "node.feedback.id",
              nZbIG: "node.feedback.expansion_info.expansion_token",
              AYAgh: function (g) {
                return g();
              },
              FwAUh: function (g, x) {
                return g(x);
              },
              oNeeS: "Depth1CommentsListPaginationQuery",
              OfXiL: function (g, x, O, U) {
                return g(x, O, U);
              },
              NrdXY: "[0]data.node.replies_connection.edges",
              Pcurz: "[0]data.node.replies_connection.page_info.has_next_page",
              iBaGV: "[0]data.node.replies_connection.page_info.end_cursor",
              GzQTs: function (g, x) {
                return g(x);
              },
              CDZVG: function (g, x) {
                return g < x;
              },
              WPruL: function (g, x, O) {
                return g(x, O);
              },
              gZUVp: function (g) {
                return g();
              },
              bLyDw: function (g) {
                return g();
              },
              gOnLg: function (g) {
                return g();
              },
              CfPCQ: function (g, x) {
                return g >= x;
              },
              Cdoil: "node.feedback.replies_fields.total_count",
              SiSfX: function (g, x) {
                return g === x;
              },
              ZoJPR: function (g, x, O, U) {
                return g(x, O, U);
              },
              KIFlM: "node.feedback.replies_connection.edges",
              FLHuC: function (g, x) {
                return g !== x;
              },
              ICctv: function (g, x) {
                return g < x;
              },
              KUtUt: function (g, x) {
                return g(x);
              },
              dRIPU: function (g, x) {
                return g ?? x;
              },
              VIsMh: function (g, x) {
                return g + x;
              },
              UCxJo: function (g, x) {
                return g * x;
              },
              TYmly: function (g, x) {
                return g * x;
              },
              CJgRW: function (g, x) {
                return g(x);
              },
              CYdOP: function (g, x) {
                return g / x;
              },
              OfMGO: function (g, x) {
                return g(x);
              },
              hUNeU: function (g, x) {
                return g(x);
              },
              JpCEx: function (g, x) {
                return g(x);
              },
              daNwq: function (g, x) {
                return g(x);
              },
            },
            { feedback: e } = n.OfMGO(q.useContext, Pn),
            {
              isIncludeNesting: u,
              nestingDepth: t,
              fullSpeed: i,
              fetchLimit: r,
              sortBy: l,
            } = n.hUNeU(q.useContext, kn),
            {
              commentsRef: s,
              appendLog: f,
              isStopManually: d,
              appendComments: p,
            } = n.JpCEx(q.useContext, rn),
            { removeResumeCursor: w, updateResumeCursor: b } = n.daNwq(
              q.useContext,
              ce
            ),
            o = e.__id,
            c = e.__fragmentOwner.variables,
            { graphqlRequest: h } =
              (n.WPruL(
                q.useMemo,
                () => window.zKjQYvgSmF("zbmfSufnpD").useRelayEnvironment(),
                []
              ),
              n.CJgRW(Ct, { projectId: en })),
            v = (g) =>
              d.current || s.current.length >= r
                ? Promise.resolve()
                : (g
                    ? f("start: fetching next page")
                    : (f("start: fetching comments"), (ne = 0)),
                  g && b(g),
                  new Promise(async (x) => {
                    await n.lejRZ(m), await n.GMuRW(A);
                    const O = await n.mefjS(h, {
                      graphqlName: n.ghsYy,
                      afterArgs: (U) => {
                        return {
                          ...U,
                          ...((G = g),
                          (E = o),
                          {
                            commentsAfterCursor: n.dRIPU(G, null),
                            commentsIntentToken: l,
                            feedLocation: c.feedLocation,
                            id: E,
                          }),
                        };
                        var G, E;
                      },
                    });
                    if (O[0]) {
                      const U = n.mgZPo(z.get, O, n.Poavs, []),
                        G = n.zHDMM(z.get, O, n.FLnqK, !1),
                        E = n.zHDMM(z.get, O, n.uxiao, void 0),
                        B = n.OjvNu(se, U);
                      if (
                        (n.uMQQx(p, B),
                        n.WvSja(f, "done: fetched " + B.length + " comments."),
                        u)
                      )
                        for (let P of U) await n.iqMGu(I, P);
                      return G
                        ? n.WvSja(x, await n.WvSja(v, E))
                        : (n.GMuRW(w), n.dPZPU(x));
                    }
                    return (
                      n.Parfm(O.length, 1) && console.log(n.XasYx, O),
                      n.dPZPU(x)
                    );
                  }));
          async function I(g, x) {
            var G;
            if (d.current || n.CfPCQ(s.current.length, r))
              return Promise.resolve();
            const O = n.OfXiL(z.get, g, n.Cdoil, 0);
            if (n.SiSfX(0, O)) return;
            const U = n.ZoJPR(z.get, g, n.KIFlM, []);
            if (n.FLHuC(U.length, O))
              await new Promise(async (E) => {
                var W;
                d.current && n.yHllM(E);
                const B = n.qVLif(z.get, g, n.thjOv),
                  P = n.qVLif(z.get, g, n.nZbIG);
                if (!B) {
                  console.warn(
                    "ESUIT: Missing Feedback ID (B), skipping replies fetch",
                    g
                  );
                  return;
                }
                const vars = {
                  expansionToken: P || null,
                  feedLocation: c.feedLocation || null,
                  repliesAfterCursor: x || null,
                  id: B,
                };
                console.log("ESUIT: Fetching replies with vars:", vars);
                await n.GMuRW(m), await n.AYAgh(A);
                const Y = await n.FwAUh(h, {
                  graphqlName: n.oNeeS,
                  afterArgs: (X) => ({
                    ...X,
                    ...vars,
                  }),
                });
                if (Y[0]) {
                  const X = n.OfXiL(z.get, Y, n.NrdXY, []),
                    mn = n.zHDMM(z.get, Y, n.Pcurz, !1),
                    un = n.mgZPo(z.get, Y, n.iBaGV, void 0),
                    J = n.GzQTs(se, X);
                  n.WvSja(p, J);
                  const R = (W = J[0]) == null ? void 0 : W.depth;
                  if (
                    (n.uMQQx(
                      f,
                      "done: fetched " + J.length + " sub comments. (b)"
                    ),
                    n.CDZVG(R, t))
                  )
                    for (let wn of X) await n.qVLif(I, wn, void 0);
                  mn ? (await n.WPruL(I, g, un), n.gZUVp(E)) : n.bLyDw(E);
                }
                n.gOnLg(E);
              });
            else {
              const E = n.FwAUh(se, U),
                B = (G = E[0]) == null ? void 0 : G.depth;
              if (
                (n.mefjS(p, E),
                n.FwAUh(
                  f,
                  "done: found existing " + E.length + " sub comments. (a)"
                ),
                n.ICctv(B, t))
              )
                for (let P of U) await n.KUtUt(I, P);
            }
          }
          async function m() {
            i ||
              (await new Promise((g) =>
                setTimeout(g, 1e3 * Math.random() + 500)
              ));
          }
          async function A() {
            if (i) return;
            ne++;
            let g = n.VIsMh(n.UCxJo(300, ne), 200);
            (g = Math.ceil(n.VIsMh(n.TYmly(Math.random(), g), 500))),
              n.CDZVG(g, 1e3) ||
                (n.Parfm(g, 5e3)
                  ? (ne = 0)
                  : (n.CJgRW(
                      f,
                      "To avoid account restrictions, please wait for " +
                        n.CYdOP(g, 1e3).toFixed(1) +
                        " seconds."
                    ),
                    await new Promise((x) => setTimeout(x, g))));
          }
          return { fetchComments: v };
        }
        function se(n) {
          const e = {
            eIjwB: function (u, t, i, r) {
              return u(t, i, r);
            },
            uJeOG: "style_type_renderer.attachment.media.image.uri",
            ZvEku: "node.attachments",
            ziefW: function (u, t, i, r) {
              return u(t, i, r);
            },
            frTDu: "node.body.text",
            kYGhd: "node.id",
            mYduK: function (u, t, i, r) {
              return u(t, i, r);
            },
            IUONG: "node.feedback.id",
            CQXfs: function (u, t, i, r) {
              return u(t, i, r);
            },
            fIHbB: function (u, t) {
              return u + t;
            },
            MtgwA: "node.feedback.url",
            cfbUZ: function (u, t, i, r) {
              return u(t, i, r);
            },
            DLpkC: "node.author.name",
            PeQhP: "node.author.id",
            LhvDO: function (u, t, i, r) {
              return u(t, i, r);
            },
            yTExO: "node.author.url",
            xqOTl: function (u, t, i, r) {
              return u(t, i, r);
            },
            wuyaK: "node.author.profile_picture_depth_0.uri",
            QtFzN: function (u, t, i, r) {
              return u(t, i, r);
            },
            uXNDf: "node.feedback.reactors.count_reduced",
            uWxoS: function (u, t, i, r) {
              return u(t, i, r);
            },
            pxOSG: "node.feedback.replies_fields.total_count",
            NzLni: "node.created_time",
            oPjDe: function (u, t, i) {
              return u(t, i);
            },
            qKUYj: "node.comment_parent.id",
            SSUmr: "node.reply_parent_comment.id",
            IRMOi: function (u, t, i, r) {
              return u(t, i, r);
            },
            Sxaov: "node.depth",
          };
          function parseReactionCount(val) {
            if (typeof val === "number") return val;
            if (!val) return 0;
            try {
              let s = val.toString().toUpperCase().replace(/,/g, "");
              let m = 1;
              if (s.includes("K")) m = 1000;
              else if (s.includes("M")) m = 1000000;
              else if (s.includes("B")) m = 1000000000;
              return Math.floor(parseFloat(s.replace(/[^0-9.]/g, "")) * m);
            } catch (e) {
              return 0;
            }
          }
          return n.map((u) => {
            console.log("ESUIT Debug Node:", u);
            console.log("ESUIT Debug Feedback:", z.get(u, "node.feedback"));
            const t = {
                lhqHF: function (f, d, p, w) {
                  return e.eIjwB(f, d, p, w);
                },
                vMDYo: e.uJeOG,
              },
              i = e.eIjwB(z.get, u, e.ZvEku, []);
            let r = "";
            i.map((f) => {
              let d = t.lhqHF(z.get, f, t.vMDYo, "");
              d &&
                (r +=
                  d +
                  `
`);
            });
            const l = e.ziefW(z.get, u, e.frTDu, ""),
              s = r
                ? `

` + r
                : "";
            return {
              id: e.ziefW(z.get, u, e.kYGhd, ""),
              feedbackId: e.mYduK(z.get, u, e.IUONG, ""),
              commentId: e.CQXfs(z.get, u, e.kYGhd, ""),
              content: e.fIHbB(l, s).trim(),
              url: e.ziefW(z.get, u, e.MtgwA, ""),
              author: {
                name: e.cfbUZ(z.get, u, e.DLpkC, ""),
                id: e.mYduK(z.get, u, e.PeQhP, ""),
                url: e.LhvDO(z.get, u, e.yTExO, ""),
                avatar: e.xqOTl(z.get, u, e.wuyaK, ""),
              },
              reactionsCount: parseReactionCount(
                z.get(u, "node.feedback.reactors.count") ||
                  z.get(u, "node.feedback.reactors.count_reduced") ||
                  z.get(u, "node.feedback.reaction_count.count") ||
                  z.get(u, "node.feedback.top_reactions.count") ||
                  z.get(u, "node.feedback.reactors.i18n_reaction_count") ||
                  z.get(u, "node.feedback.reaction_count_reduced") ||
                  0
              ),
              subCommentsCount: e.uWxoS(z.get, u, e.pxOSG, 0),
              createdAt: e.mYduK(z.get, u, e.NzLni, 0),
              parentFeedbackId:
                e.oPjDe(z.get, u, e.qKUYj) ?? e.oPjDe(z.get, u, e.SSUmr) ?? "",
              depth: e.IRMOi(z.get, u, e.Sxaov, 0),
              children: [],
            };
          });
        }
        function Rt() {
          const n = {
              ZxYHD: function (d, p) {
                return d(p);
              },
              oAutj: "done: Completed the fetching",
              OzkxF: function (d) {
                return d();
              },
              SXrnA: "consumeFeaturesTreeTryByMemoUIConfigs",
              rlbQF: function (d, p) {
                return d(p);
              },
              TTAqq: function (d, p) {
                return d(p);
              },
              kUKiG: function (d, p) {
                return d(p);
              },
              kYYdv: function (d) {
                return d();
              },
              kRIys: function (d, p, w) {
                return d(p, w);
              },
              pXOCw: "vertical",
              wLGnD: "100%",
              KsqPD: function (d, p) {
                return d === p;
              },
              utDkd: function (d, p, w) {
                return d(p, w);
              },
              QGNuJ: function (d, p, w) {
                return d(p, w);
              },
              HUFnY: function (d, p, w) {
                return d(p, w);
              },
              sSBsq: function (d, p, w) {
                return d(p, w);
              },
              eqBgF: function (d, p, w) {
                return d(p, w);
              },
              ePkZd: "success",
              zmNAK: "center",
              lYUab: "comments-exporter-for-instagram",
              YZosH: "export-posts-for-facebook",
              AxzXK: "space-between",
              tDcLg: function (d, p, w) {
                return d(p, w);
              },
              xFvfH: function (d, p) {
                return d === p;
              },
              PNHue: function (d, p, w) {
                return d(p, w);
              },
              DpWSg: "primary",
              cubSn: "Start the Fetching",
              zAkQa: function (d, p, w) {
                return d(p, w);
              },
            },
            {
              step: e,
              setStep: u,
              appendLog: t,
              isStopManually: i,
            } = n.rlbQF(q.useContext, rn),
            { saveMemoSettings: r, isIncludeNesting: l } = n.kUKiG(
              q.useContext,
              kn
            ),
            { fetchComments: s } = n.kYYdv(Jt);
          function f(d) {
            const p = {
              dSeTN: function (w, b) {
                return n.ZxYHD(w, b);
              },
              TQLny: n.oAutj,
            };
            n.OzkxF(r),
              (i.current = !1),
              n.OzkxF(_n).send(n.SXrnA, { isIncludeNesting: l }),
              n.rlbQF(u, K.FETCHING),
              n.TTAqq(s, d).then(() => {
                p.dSeTN(t, p.TQLny), p.dSeTN(u, K.FETCHED);
              });
          }
          return n.kRIys(a.jsxs, _.Space, {
            direction: n.pXOCw,
            size: 12,
            style: { width: n.wLGnD },
            children: [
              n.KsqPD(e, K.START) &&
                n.kRIys(a.jsx, a.Fragment, {
                  children: n.kRIys(a.jsx, Ut, {}),
                }),
              n.KsqPD(e, K.FETCHING) &&
                n.kRIys(a.jsxs, a.Fragment, {
                  children: [
                    n.kRIys(a.jsx, xe, {}),
                    n.kRIys(a.jsx, Ie, {}),
                    n.utDkd(a.jsx, ke, {}),
                  ],
                }),
              n.KsqPD(e, K.FETCHED) &&
                n.QGNuJ(a.jsxs, a.Fragment, {
                  children: [
                    n.utDkd(a.jsx, xe, {}),
                    n.HUFnY(a.jsx, Ie, {}),
                    n.HUFnY(a.jsx, ke, {}),
                    n.utDkd(a.jsx, be, {}),
                  ],
                }),
              n.KsqPD(e, K.DOWNLOADED) &&
                n.kRIys(a.jsxs, a.Fragment, {
                  children: [
                    n.sSBsq(a.jsx, be, {}),
                    n.eqBgF(a.jsx, _.Alert, {
                      type: n.ePkZd,
                      message: n.sSBsq(a.jsxs, _.Space, {
                        direction: n.pXOCw,
                        size: 12,
                        style: { textAlign: n.zmNAK, width: n.wLGnD },
                        children: [
                          n.HUFnY(a.jsx, Je, { extLink: Ge }),
                          n.sSBsq(a.jsx, Bt, {}),
                        ],
                      }),
                    }),
                    n.QGNuJ(a.jsx, Ze, {
                      extsProjectIdArr: [n.lYUab, n.YZosH],
                      perRow: 2,
                    }),
                  ],
                }),
              n.utDkd(a.jsxs, _.Row, {
                justify: n.AxzXK,
                children: [
                  n.tDcLg(a.jsx, _.Space, {
                    size: 12,
                    children: n.HUFnY(a.jsx, Ht, {}),
                  }),
                  n.sSBsq(a.jsx, _.Space, {
                    size: 12,
                    children:
                      n.xFvfH(e, K.START) &&
                      n.PNHue(a.jsxs, a.Fragment, {
                        children: [
                          n.sSBsq(a.jsx, _.Button, {
                            type: n.DpWSg,
                            onClick: () => f(),
                            children: n.cubSn,
                          }),
                          n.zAkQa(a.jsx, Xt, { onClick: f }),
                        ],
                      }),
                  }),
                ],
              }),
            ],
          });
        }
        function $t() {
          const n =
              "https://www.facebook.com/zuck/posts/pfbid0wJSNsN9X6gtdHJrv6ECaKrs9QMAGcbpBmXAFAGoCpur3YboUyn4bLceW2spaChNUl",
            e = function (r, l, s) {
              return r(l, s);
            },
            u = "sfidubqtjEsfuvpSufnpDftv",
            t = function (r, l, s) {
              return r(l, s);
            },
            i = window.zKjQYvgSmF(u)();
          t(
            q.useEffect,
            () => {
              window.jslakfjakal ||
                (i.prefetchRouteQueries(n),
                e(
                  setTimeout,
                  () => {
                    i.prefetchRouteQueries(n);
                  },
                  1e3
                ),
                (window.jslakfjakal = !0));
            },
            []
          );
        }
        const nr = "2.6.13";
        function er() {
          const n = {
              fLxjr: function (t, i) {
                return t(i);
              },
              Ltcel: function (t) {
                return t();
              },
              jrAuj: function (t, i, r) {
                return t(i, r);
              },
              zOtMd: function (t, i, r) {
                return t(i, r);
              },
              dPoyZ: function (t, i, r) {
                return t(i, r);
              },
              Suatu: function (t, i) {
                return t + i;
              },
              wnays: "square",
              vFQmE: "span",
              pSNwE: "#999",
              zBkjt: function (t, i) {
                return t > i;
              },
              UlUep: "_blank",
              kTHRH: "rgb(47, 129, 247)",
              ihCrj: "what's new?",
              bqHud: function (t, i, r) {
                return t(i, r);
              },
              euSFO: "div",
              intEZ: function (t, i, r) {
                return t(i, r);
              },
              kGTZz: "javascript:;",
              FCtln: "pricing",
              FSKlC: function (t, i, r) {
                return t(i, r);
              },
              XGWPm: function (t, i, r) {
                return t(i, r);
              },
              VCRYl: "https://esuit.dev/faq",
              jxAGq: "❓FAQ",
              NahTA: function (t, i, r) {
                return t(i, r);
              },
              JqeOq: "Export all the comments below.",
              HIfZa: function (t, i, r) {
                return t(i, r);
              },
              lxgma: "pointer",
              oPwSK: function (t, i) {
                return t + i;
              },
            },
            { open: e, setOpen: u } = n.fLxjr(q.useContext, rn);
          return (
            n.Ltcel($t),
            n.jrAuj(a.jsxs, a.Fragment, {
              children: [
                n.zOtMd(a.jsx, _.Modal, {
                  open: e,
                  onCancel: () => u(!1),
                  width: 820,
                  title: n.dPoyZ(a.jsxs, _.Space, {
                    size: 12,
                    children: [
                      n.jrAuj(a.jsx, _.Avatar, {
                        size: 24,
                        src: n.Suatu(
                          window[en].extensionFolderUri,
                          window[en].icons[128]
                        ),
                        shape: n.wnays,
                      }),
                      n.jrAuj(a.jsxs, n.vFQmE, {
                        children: [
                          Mn,
                          " ",
                          n.jrAuj(a.jsxs, n.vFQmE, {
                            style: { color: n.pSNwE, fontSize: 12 },
                            children: ["v", nr],
                          }),
                          " ",
                          n.zBkjt(de.length, 0)
                            ? n.zOtMd(a.jsx, "a", {
                                href: de,
                                target: n.UlUep,
                                style: { fontSize: 12, color: n.kTHRH },
                                children: n.ihCrj,
                              })
                            : null,
                        ],
                      }),
                      n.bqHud(a.jsx, n.euSFO, {
                        style: { marginLeft: 12 },
                        children: n.intEZ(a.jsx, "a", {
                          href: n.kGTZz,
                          style: { fontSize: 12, color: n.kTHRH },
                          onClick: () => _n().send("visitPricing"),
                          children: n.FCtln,
                        }),
                      }),
                      n.FSKlC(a.jsx, n.euSFO, {
                        style: { marginLeft: 24 },
                        children: n.XGWPm(a.jsx, "a", {
                          href: n.VCRYl,
                          target: n.UlUep,
                          style: { fontSize: 12, color: n.kTHRH },
                          children: n.jxAGq,
                        }),
                      }),
                    ],
                  }),
                  footer: null,
                  children: n.NahTA(a.jsx, Rt, {}),
                }),
                n.intEZ(a.jsx, _.Tooltip, {
                  title: n.JqeOq,
                  children: n.HIfZa(a.jsx, _.Avatar, {
                    size: 24,
                    style: { marginRight: 8, cursor: n.lxgma },
                    src: n.oPwSK(
                      window[en].extensionFolderUri,
                      window[en].icons[128]
                    ),
                    shape: n.wnays,
                    onClick: () => u(!0),
                  }),
                }),
              ],
            })
          );
        }
        function De(n) {
          const e = "udbfs/zsbeovpCspssFufnpD",
            u = function (b, o) {
              return b === o;
            },
            t = "ENABLED",
            i = "fepNlsbEufnpD",
            r = function (b, o, c) {
              return b(o, c);
            },
            l = function (b, o, c) {
              return b(o, c);
            },
            s = function (b, o, c) {
              return b(o, c);
            },
            f = function (b, o, c) {
              return b(o, c);
            },
            d = function (b, o, c) {
              return b(o, c);
            },
            p = window.zKjQYvgSmF(e),
            w = u(t, window.zKjQYvgSmF(i).getDarkModeSetting());
          return r(a.jsx, p, {
            fallback: tr,
            children: r(a.jsx, _.ConfigProvider, {
              theme: {
                algorithm: w ? _.theme.darkAlgorithm : _.theme.defaultAlgorithm,
                token: { motion: !1 },
              },
              children: r(a.jsx, Pn.Provider, {
                value: { feedback: n.feedback },
                children: l(a.jsx, At, {
                  children: l(a.jsx, Lt, {
                    children: s(a.jsx, Nt, {
                      children: f(a.jsx, Kt, { children: d(a.jsx, er, {}) }),
                    }),
                  }),
                }),
              }),
            }),
          });
        }
        function tr(n) {
          return console.error(n), a.jsx(Qt, {});
        }
        window.zKjQYvcSmF(
          "lppcfdbg.spg.tuofnnpd.uspqyf}udbfs/uovpDtuofnnpDJGVufnpD",
          (n) => {
            const e = function (f, d, p) {
                return f(d, p);
              },
              u = "feedback",
              t = "div",
              i = "flex",
              r = "center",
              l = function (f, d, p) {
                return f(d, p);
              },
              s = e(z.get, n.payload, u);
            return s
              ? e(a.jsxs, t, {
                  style: { display: i, alignItems: r, marginTop: -6 },
                  children: [
                    l(a.jsx, De, { feedback: s }),
                    l(a.jsx, a.Fragment, { children: n.lastCmp }),
                  ],
                })
              : n.lastCmp;
          }
        ),
          window.zKjQYvcSmF(
            "lppcfdbg.spg.tuofnnpd.uspqyf}udbfs/spudfmfTuofuoJhojsfeofSuofnnpDJGVufnpD",
            (n) => {
              const e = function (r, l, s) {
                  return r(l, s);
                },
                u = "feedback",
                t = function (r, l, s) {
                  return r(l, s);
                },
                i = e(z.get, n.payload, u);
              return i
                ? e(a.jsxs, a.Fragment, {
                    children: [
                      t(a.jsx, De, { feedback: i }),
                      e(a.jsx, a.Fragment, { children: n.lastCmp }),
                    ],
                  })
                : n.lastCmp;
            }
          );
      })(
        window.export_comments_for_facebook_vendors._["lodash-es"],
        gn,
        window.export_comments_for_facebook_vendors._.antd,
        Ue,
        window.export_comments_for_facebook_vendors._.dayjs
      );
    } else console.error(`${Z} Not Found`);
  }
  function je() {
    return Object.keys(window.require("__debug").modulesMap)
      .filter((Z) => Z.indexOf("ReactDOM") === 0)
      .find((Z) => {
        const gn = window.require("__debug").modulesMap[Z];
        return !!(
          gn.exports &&
          gn.exports.version &&
          gn.depPosition > 3 &&
          Z.includes("classic")
        );
      });
  }
  function ze() {
    function Z(...gn) {
      return window.require("react").jsx(...gn);
    }
    return {
      Fragment: Symbol.for("react.fragment"),
      jsx: Z,
      jsxs: Z,
      jsxDEV: Z,
    };
  }
})();
