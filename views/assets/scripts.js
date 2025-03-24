var ao = (Qr) => {
  throw TypeError(Qr);
};
var za = (Qr, Wr, Gr) => Wr.has(Qr) || ao("Cannot " + Gr);
var Xi = (Qr, Wr, Gr) => (za(Qr, Wr, "read from private field"), Gr ? Gr.call(Qr) : Wr.get(Qr)), _i = (Qr, Wr, Gr) => Wr.has(Qr) ? ao("Cannot add the same private member more than once") : Wr instanceof WeakSet ? Wr.add(Qr) : Wr.set(Qr, Gr), zi = (Qr, Wr, Gr, Zr) => (za(Qr, Wr, "write to private field"), Zr ? Zr.call(Qr, Gr) : Wr.set(Qr, Gr), Gr), da = (Qr, Wr, Gr) => (za(Qr, Wr, "access private method"), Gr);
(() => {
  var Qr = !1, Wr = !1, Gr = [], Zr = -1;
  function Yr(ze) {
    an(ze);
  }
  function an(ze) {
    Gr.includes(ze) || Gr.push(ze), ln();
  }
  function sn(ze) {
    let Jr = Gr.indexOf(ze);
    Jr !== -1 && Jr > Zr && Gr.splice(Jr, 1);
  }
  function ln() {
    !Wr && !Qr && (Qr = !0, queueMicrotask(cn));
  }
  function cn() {
    Qr = !1, Wr = !0;
    for (let ze = 0; ze < Gr.length; ze++) Gr[ze](), Zr = ze;
    Gr.length = 0, Zr = -1, Wr = !1;
  }
  var fn, hn, pn, mn, Hn = !0;
  function Un(ze) {
    Hn = !1, ze(), Hn = !0;
  }
  function ri(ze) {
    fn = ze.reactive, pn = ze.release, hn = (Jr) => ze.effect(Jr, { scheduler: (Kr) => {
      Hn ? Yr(Kr) : Kr();
    } }), mn = ze.raw;
  }
  function Yn(ze) {
    hn = ze;
  }
  function bi(ze) {
    let Jr = () => {
    };
    return [(Kr) => {
      let en = hn(Kr);
      return ze._x_effects || (ze._x_effects = /* @__PURE__ */ new Set(), ze._x_runEffects = () => {
        ze._x_effects.forEach((tn) => tn());
      }), ze._x_effects.add(en), Jr = () => {
        en !== void 0 && (ze._x_effects.delete(en), pn(en));
      }, en;
    }, () => {
      Jr();
    }];
  }
  function ei(ze, Jr) {
    let Kr = !0, en, tn = hn(() => {
      let rn = ze();
      JSON.stringify(rn), Kr ? en = rn : queueMicrotask(() => {
        Jr(rn, en), en = rn;
      }), Kr = !1;
    });
    return () => pn(tn);
  }
  function Bn(ze, Jr, Kr = {}) {
    ze.dispatchEvent(new CustomEvent(Jr, { detail: Kr, bubbles: !0, composed: !0, cancelable: !0 }));
  }
  function Cn(ze, Jr) {
    if (typeof ShadowRoot == "function" && ze instanceof ShadowRoot) {
      Array.from(ze.children).forEach((tn) => Cn(tn, Jr));
      return;
    }
    let Kr = !1;
    if (Jr(ze, () => Kr = !0), Kr) return;
    let en = ze.firstElementChild;
    for (; en; ) Cn(en, Jr), en = en.nextElementSibling;
  }
  function Sn(ze, ...Jr) {
    console.warn(`Alpine Warning: ${ze}`, ...Jr);
  }
  var Ri = !1;
  function $n() {
    Ri && Sn("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems."), Ri = !0, document.body || Sn("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"), Bn(document, "alpine:init"), Bn(document, "alpine:initializing"), qi(), Ei((Jr) => zn(Jr, Cn)), In((Jr) => yi(Jr)), Mi((Jr, Kr) => {
      ba(Jr, Kr).forEach((en) => en());
    });
    let ze = (Jr) => !Qn(Jr.parentElement, !0);
    Array.from(document.querySelectorAll(En().join(","))).filter(ze).forEach((Jr) => {
      zn(Jr);
    }), Bn(document, "alpine:initialized");
  }
  var Rn = [], ni = [];
  function Mn() {
    return Rn.map((ze) => ze());
  }
  function En() {
    return Rn.concat(ni).map((ze) => ze());
  }
  function jn(ze) {
    Rn.push(ze);
  }
  function ii(ze) {
    ni.push(ze);
  }
  function Qn(ze, Jr = !1) {
    return bn(ze, (Kr) => {
      if ((Jr ? En() : Mn()).some((en) => Kr.matches(en))) return !0;
    });
  }
  function bn(ze, Jr) {
    if (ze) {
      if (Jr(ze)) return ze;
      if (ze._x_teleportBack && (ze = ze._x_teleportBack), !!ze.parentElement) return bn(ze.parentElement, Jr);
    }
  }
  function ci(ze) {
    return Mn().some((Jr) => ze.matches(Jr));
  }
  var Jn = [];
  function Xn(ze) {
    Jn.push(ze);
  }
  function zn(ze, Jr = Cn, Kr = () => {
  }) {
    mo(() => {
      Jr(ze, (en, tn) => {
        Kr(en, tn), Jn.forEach((rn) => rn(en, tn)), ba(en, en.attributes).forEach((rn) => rn()), en._x_ignore && tn();
      });
    });
  }
  function yi(ze, Jr = Cn) {
    Jr(ze, (Kr) => {
      Si(Kr), Vn(Kr);
    });
  }
  var ti = [], wi = [], Ii = [];
  function Ei(ze) {
    Ii.push(ze);
  }
  function In(ze, Jr) {
    typeof Jr == "function" ? (ze._x_cleanups || (ze._x_cleanups = []), ze._x_cleanups.push(Jr)) : (Jr = ze, wi.push(Jr));
  }
  function Mi(ze) {
    ti.push(ze);
  }
  function Wi(ze, Jr, Kr) {
    ze._x_attributeCleanups || (ze._x_attributeCleanups = {}), ze._x_attributeCleanups[Jr] || (ze._x_attributeCleanups[Jr] = []), ze._x_attributeCleanups[Jr].push(Kr);
  }
  function Si(ze, Jr) {
    ze._x_attributeCleanups && Object.entries(ze._x_attributeCleanups).forEach(([Kr, en]) => {
      (Jr === void 0 || Jr.includes(Kr)) && (en.forEach((tn) => tn()), delete ze._x_attributeCleanups[Kr]);
    });
  }
  function Vn(ze) {
    if (ze._x_cleanups) for (; ze._x_cleanups.length; ) ze._x_cleanups.pop()();
  }
  var Ni = new MutationObserver(va), fi = !1;
  function qi() {
    Ni.observe(document, { subtree: !0, childList: !0, attributes: !0, attributeOldValue: !0 }), fi = !0;
  }
  function On() {
    Ti(), Ni.disconnect(), fi = !1;
  }
  var Kn = [];
  function Ti() {
    let ze = Ni.takeRecords();
    Kn.push(() => ze.length > 0 && va(ze));
    let Jr = Kn.length;
    queueMicrotask(() => {
      if (Kn.length === Jr) for (; Kn.length > 0; ) Kn.shift()();
    });
  }
  function Tn(ze) {
    if (!fi) return ze();
    On();
    let Jr = ze();
    return qi(), Jr;
  }
  var qn = !1, Fn = [];
  function ai() {
    qn = !0;
  }
  function Gi() {
    qn = !1, va(Fn), Fn = [];
  }
  function va(ze) {
    if (qn) {
      Fn = Fn.concat(ze);
      return;
    }
    let Jr = /* @__PURE__ */ new Set(), Kr = /* @__PURE__ */ new Set(), en = /* @__PURE__ */ new Map(), tn = /* @__PURE__ */ new Map();
    for (let rn = 0; rn < ze.length; rn++) if (!ze[rn].target._x_ignoreMutationObserver && (ze[rn].type === "childList" && (ze[rn].addedNodes.forEach((nn) => nn.nodeType === 1 && Jr.add(nn)), ze[rn].removedNodes.forEach((nn) => nn.nodeType === 1 && Kr.add(nn))), ze[rn].type === "attributes")) {
      let nn = ze[rn].target, on = ze[rn].attributeName, un = ze[rn].oldValue, dn = () => {
        en.has(nn) || en.set(nn, []), en.get(nn).push({ name: on, value: nn.getAttribute(on) });
      }, vn = () => {
        tn.has(nn) || tn.set(nn, []), tn.get(nn).push(on);
      };
      nn.hasAttribute(on) && un === null ? dn() : nn.hasAttribute(on) ? (vn(), dn()) : vn();
    }
    tn.forEach((rn, nn) => {
      Si(nn, rn);
    }), en.forEach((rn, nn) => {
      ti.forEach((on) => on(nn, rn));
    });
    for (let rn of Kr) Jr.has(rn) || (wi.forEach((nn) => nn(rn)), yi(rn));
    Jr.forEach((rn) => {
      rn._x_ignoreSelf = !0, rn._x_ignore = !0;
    });
    for (let rn of Jr) Kr.has(rn) || rn.isConnected && (delete rn._x_ignoreSelf, delete rn._x_ignore, Ii.forEach((nn) => nn(rn)), rn._x_ignore = !0, rn._x_ignoreSelf = !0);
    Jr.forEach((rn) => {
      delete rn._x_ignoreSelf, delete rn._x_ignore;
    }), Jr = null, Kr = null, en = null, tn = null;
  }
  function Ga(ze) {
    return Hi(Li(ze));
  }
  function Pi(ze, Jr, Kr) {
    return ze._x_dataStack = [Jr, ...Li(Kr || ze)], () => {
      ze._x_dataStack = ze._x_dataStack.filter((en) => en !== Jr);
    };
  }
  function Li(ze) {
    return ze._x_dataStack ? ze._x_dataStack : typeof ShadowRoot == "function" && ze instanceof ShadowRoot ? Li(ze.host) : ze.parentNode ? Li(ze.parentNode) : [];
  }
  function Hi(ze) {
    return new Proxy({ objects: ze }, oo);
  }
  var oo = { ownKeys({ objects: ze }) {
    return Array.from(new Set(ze.flatMap((Jr) => Object.keys(Jr))));
  }, has({ objects: ze }, Jr) {
    return Jr == Symbol.unscopables ? !1 : ze.some((Kr) => Object.prototype.hasOwnProperty.call(Kr, Jr) || Reflect.has(Kr, Jr));
  }, get({ objects: ze }, Jr, Kr) {
    return Jr == "toJSON" ? lo : Reflect.get(ze.find((en) => Reflect.has(en, Jr)) || {}, Jr, Kr);
  }, set({ objects: ze }, Jr, Kr, en) {
    let tn = ze.find((nn) => Object.prototype.hasOwnProperty.call(nn, Jr)) || ze[ze.length - 1], rn = Object.getOwnPropertyDescriptor(tn, Jr);
    return rn != null && rn.set && (rn != null && rn.get) ? Reflect.set(tn, Jr, Kr, en) : Reflect.set(tn, Jr, Kr);
  } };
  function lo() {
    return Reflect.ownKeys(this).reduce((ze, Jr) => (ze[Jr] = Reflect.get(this, Jr), ze), {});
  }
  function Ja(ze) {
    let Jr = (en) => typeof en == "object" && !Array.isArray(en) && en !== null, Kr = (en, tn = "") => {
      Object.entries(Object.getOwnPropertyDescriptors(en)).forEach(([rn, { value: nn, enumerable: on }]) => {
        if (on === !1 || nn === void 0 || typeof nn == "object" && nn !== null && nn.__v_skip) return;
        let un = tn === "" ? rn : `${tn}.${rn}`;
        typeof nn == "object" && nn !== null && nn._x_interceptor ? en[rn] = nn.initialize(ze, un, rn) : Jr(nn) && nn !== en && !(nn instanceof Element) && Kr(nn, un);
      });
    };
    return Kr(ze);
  }
  function Ka(ze, Jr = () => {
  }) {
    let Kr = { initialValue: void 0, _x_interceptor: !0, initialize(en, tn, rn) {
      return ze(this.initialValue, () => uo(en, tn), (nn) => Za(en, tn, nn), tn, rn);
    } };
    return Jr(Kr), (en) => {
      if (typeof en == "object" && en !== null && en._x_interceptor) {
        let tn = Kr.initialize.bind(Kr);
        Kr.initialize = (rn, nn, on) => {
          let un = en.initialize(rn, nn, on);
          return Kr.initialValue = un, tn(rn, nn, on);
        };
      } else Kr.initialValue = en;
      return Kr;
    };
  }
  function uo(ze, Jr) {
    return Jr.split(".").reduce((Kr, en) => Kr[en], ze);
  }
  function Za(ze, Jr, Kr) {
    if (typeof Jr == "string" && (Jr = Jr.split(".")), Jr.length === 1) ze[Jr[0]] = Kr;
    else {
      if (Jr.length === 0) throw error;
      return ze[Jr[0]] || (ze[Jr[0]] = {}), Za(ze[Jr[0]], Jr.slice(1), Kr);
    }
  }
  var Ya = {};
  function Wn(ze, Jr) {
    Ya[ze] = Jr;
  }
  function ga(ze, Jr) {
    return Object.entries(Ya).forEach(([Kr, en]) => {
      let tn = null;
      function rn() {
        if (tn) return tn;
        {
          let [nn, on] = as(Jr);
          return tn = { interceptor: Ka, ...nn }, In(Jr, on), tn;
        }
      }
      Object.defineProperty(ze, `$${Kr}`, { get() {
        return en(Jr, rn());
      }, enumerable: !1 });
    }), ze;
  }
  function co(ze, Jr, Kr, ...en) {
    try {
      return Kr(...en);
    } catch (tn) {
      Bi(tn, ze, Jr);
    }
  }
  function Bi(ze, Jr, Kr = void 0) {
    ze = Object.assign(ze ?? { message: "No error message given." }, { el: Jr, expression: Kr }), console.warn(`Alpine Expression Error: ${ze.message}

${Kr ? 'Expression: "' + Kr + `"

` : ""}`, Jr), setTimeout(() => {
      throw ze;
    }, 0);
  }
  var Ji = !0;
  function es(ze) {
    let Jr = Ji;
    Ji = !1;
    let Kr = ze();
    return Ji = Jr, Kr;
  }
  function di(ze, Jr, Kr = {}) {
    let en;
    return Pn(ze, Jr)((tn) => en = tn, Kr), en;
  }
  function Pn(...ze) {
    return ts(...ze);
  }
  var ts = rs;
  function fo(ze) {
    ts = ze;
  }
  function rs(ze, Jr) {
    let Kr = {};
    ga(Kr, ze);
    let en = [Kr, ...Li(ze)], tn = typeof Jr == "function" ? ho(en, Jr) : vo(en, Jr, ze);
    return co.bind(null, ze, Jr, tn);
  }
  function ho(ze, Jr) {
    return (Kr = () => {
    }, { scope: en = {}, params: tn = [] } = {}) => {
      let rn = Jr.apply(Hi([en, ...ze]), tn);
      Ki(Kr, rn);
    };
  }
  var ma = {};
  function po(ze, Jr) {
    if (ma[ze]) return ma[ze];
    let Kr = Object.getPrototypeOf(async function() {
    }).constructor, en = /^[\n\s]*if.*\(.*\)/.test(ze.trim()) || /^(let|const)\s/.test(ze.trim()) ? `(async()=>{ ${ze} })()` : ze, tn = (() => {
      try {
        let rn = new Kr(["__self", "scope"], `with (scope) { __self.result = ${en} }; __self.finished = true; return __self.result;`);
        return Object.defineProperty(rn, "name", { value: `[Alpine] ${ze}` }), rn;
      } catch (rn) {
        return Bi(rn, Jr, ze), Promise.resolve();
      }
    })();
    return ma[ze] = tn, tn;
  }
  function vo(ze, Jr, Kr) {
    let en = po(Jr, Kr);
    return (tn = () => {
    }, { scope: rn = {}, params: nn = [] } = {}) => {
      en.result = void 0, en.finished = !1;
      let on = Hi([rn, ...ze]);
      if (typeof en == "function") {
        let un = en(en, on).catch((dn) => Bi(dn, Kr, Jr));
        en.finished ? (Ki(tn, en.result, on, nn, Kr), en.result = void 0) : un.then((dn) => {
          Ki(tn, dn, on, nn, Kr);
        }).catch((dn) => Bi(dn, Kr, Jr)).finally(() => en.result = void 0);
      }
    };
  }
  function Ki(ze, Jr, Kr, en, tn) {
    if (Ji && typeof Jr == "function") {
      let rn = Jr.apply(Kr, en);
      rn instanceof Promise ? rn.then((nn) => Ki(ze, nn, Kr, en)).catch((nn) => Bi(nn, tn, Jr)) : ze(rn);
    } else typeof Jr == "object" && Jr instanceof Promise ? Jr.then((rn) => ze(rn)) : ze(Jr);
  }
  var _a = "x-";
  function Ai(ze = "") {
    return _a + ze;
  }
  function go(ze) {
    _a = ze;
  }
  var xa = {};
  function An(ze, Jr) {
    return xa[ze] = Jr, { before(Kr) {
      if (!xa[Kr]) {
        console.warn(String.raw`Cannot find directive \`${Kr}\`. \`${ze}\` will use the default order of execution`);
        return;
      }
      let en = hi.indexOf(Kr);
      hi.splice(en >= 0 ? en : hi.indexOf("DEFAULT"), 0, ze);
    } };
  }
  function ba(ze, Jr, Kr) {
    if (Jr = Array.from(Jr), ze._x_virtualDirectives) {
      let tn = Object.entries(ze._x_virtualDirectives).map(([nn, on]) => ({ name: nn, value: on })), rn = ns(tn);
      tn = tn.map((nn) => rn.find((on) => on.name === nn.name) ? { name: `x-bind:${nn.name}`, value: `"${nn.value}"` } : nn), Jr = Jr.concat(tn);
    }
    let en = {};
    return Jr.map(ls((tn, rn) => en[tn] = rn)).filter(cs).map(xo(en, Kr)).sort(bo).map((tn) => _o(ze, tn));
  }
  function ns(ze) {
    return Array.from(ze).map(ls()).filter((Jr) => !cs(Jr));
  }
  var ya = !1, $i = /* @__PURE__ */ new Map(), is = Symbol();
  function mo(ze) {
    ya = !0;
    let Jr = Symbol();
    is = Jr, $i.set(Jr, []);
    let Kr = () => {
      for (; $i.get(Jr).length; ) $i.get(Jr).shift()();
      $i.delete(Jr);
    }, en = () => {
      ya = !1, Kr();
    };
    ze(Kr), en();
  }
  function as(ze) {
    let Jr = [], Kr = (rn) => Jr.push(rn), [en, tn] = bi(ze);
    return Jr.push(tn), [{ Alpine: Fi, effect: en, cleanup: Kr, evaluateLater: Pn.bind(Pn, ze), evaluate: di.bind(di, ze) }, () => Jr.forEach((rn) => rn())];
  }
  function _o(ze, Jr) {
    let Kr = () => {
    }, en = xa[Jr.type] || Kr, [tn, rn] = as(ze);
    Wi(ze, Jr.original, rn);
    let nn = () => {
      ze._x_ignore || ze._x_ignoreSelf || (en.inline && en.inline(ze, Jr, tn), en = en.bind(en, ze, Jr, tn), ya ? $i.get(is).push(en) : en());
    };
    return nn.runCleanups = rn, nn;
  }
  var ss = (ze, Jr) => ({ name: Kr, value: en }) => (Kr.startsWith(ze) && (Kr = Kr.replace(ze, Jr)), { name: Kr, value: en }), os = (ze) => ze;
  function ls(ze = () => {
  }) {
    return ({ name: Jr, value: Kr }) => {
      let { name: en, value: tn } = us.reduce((rn, nn) => nn(rn), { name: Jr, value: Kr });
      return en !== Jr && ze(en, Jr), { name: en, value: tn };
    };
  }
  var us = [];
  function wa(ze) {
    us.push(ze);
  }
  function cs({ name: ze }) {
    return fs().test(ze);
  }
  var fs = () => new RegExp(`^${_a}([^:^.]+)\\b`);
  function xo(ze, Jr) {
    return ({ name: Kr, value: en }) => {
      let tn = Kr.match(fs()), rn = Kr.match(/:([a-zA-Z0-9\-_:]+)/), nn = Kr.match(/\.[^.\]]+(?=[^\]]*$)/g) || [], on = Jr || ze[Kr] || Kr;
      return { type: tn ? tn[1] : null, value: rn ? rn[1] : null, modifiers: nn.map((un) => un.replace(".", "")), expression: en, original: on };
    };
  }
  var Ea = "DEFAULT", hi = ["ignore", "ref", "data", "id", "anchor", "bind", "init", "for", "model", "modelable", "transition", "show", "if", Ea, "teleport"];
  function bo(ze, Jr) {
    let Kr = hi.indexOf(ze.type) === -1 ? Ea : ze.type, en = hi.indexOf(Jr.type) === -1 ? Ea : Jr.type;
    return hi.indexOf(Kr) - hi.indexOf(en);
  }
  var Sa = [], Ta = !1;
  function La(ze = () => {
  }) {
    return queueMicrotask(() => {
      Ta || setTimeout(() => {
        Aa();
      });
    }), new Promise((Jr) => {
      Sa.push(() => {
        ze(), Jr();
      });
    });
  }
  function Aa() {
    for (Ta = !1; Sa.length; ) Sa.shift()();
  }
  function yo() {
    Ta = !0;
  }
  function Ca(ze, Jr) {
    return Array.isArray(Jr) ? ds(ze, Jr.join(" ")) : typeof Jr == "object" && Jr !== null ? wo(ze, Jr) : typeof Jr == "function" ? Ca(ze, Jr()) : ds(ze, Jr);
  }
  function ds(ze, Jr) {
    let Kr = (tn) => tn.split(" ").filter((rn) => !ze.classList.contains(rn)).filter(Boolean), en = (tn) => (ze.classList.add(...tn), () => {
      ze.classList.remove(...tn);
    });
    return Jr = Jr === !0 ? Jr = "" : Jr || "", en(Kr(Jr));
  }
  function wo(ze, Jr) {
    let Kr = (on) => on.split(" ").filter(Boolean), en = Object.entries(Jr).flatMap(([on, un]) => un ? Kr(on) : !1).filter(Boolean), tn = Object.entries(Jr).flatMap(([on, un]) => un ? !1 : Kr(on)).filter(Boolean), rn = [], nn = [];
    return tn.forEach((on) => {
      ze.classList.contains(on) && (ze.classList.remove(on), nn.push(on));
    }), en.forEach((on) => {
      ze.classList.contains(on) || (ze.classList.add(on), rn.push(on));
    }), () => {
      nn.forEach((on) => ze.classList.add(on)), rn.forEach((on) => ze.classList.remove(on));
    };
  }
  function Zi(ze, Jr) {
    return typeof Jr == "object" && Jr !== null ? Eo(ze, Jr) : So(ze, Jr);
  }
  function Eo(ze, Jr) {
    let Kr = {};
    return Object.entries(Jr).forEach(([en, tn]) => {
      Kr[en] = ze.style[en], en.startsWith("--") || (en = To(en)), ze.style.setProperty(en, tn);
    }), setTimeout(() => {
      ze.style.length === 0 && ze.removeAttribute("style");
    }), () => {
      Zi(ze, Kr);
    };
  }
  function So(ze, Jr) {
    let Kr = ze.getAttribute("style", Jr);
    return ze.setAttribute("style", Jr), () => {
      ze.setAttribute("style", Kr || "");
    };
  }
  function To(ze) {
    return ze.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }
  function Oa(ze, Jr = () => {
  }) {
    let Kr = !1;
    return function() {
      Kr ? Jr.apply(this, arguments) : (Kr = !0, ze.apply(this, arguments));
    };
  }
  An("transition", (ze, { value: Jr, modifiers: Kr, expression: en }, { evaluate: tn }) => {
    typeof en == "function" && (en = tn(en)), en !== !1 && (!en || typeof en == "boolean" ? Ao(ze, Kr, Jr) : Lo(ze, en, Jr));
  });
  function Lo(ze, Jr, Kr) {
    hs(ze, Ca, ""), { enter: (en) => {
      ze._x_transition.enter.during = en;
    }, "enter-start": (en) => {
      ze._x_transition.enter.start = en;
    }, "enter-end": (en) => {
      ze._x_transition.enter.end = en;
    }, leave: (en) => {
      ze._x_transition.leave.during = en;
    }, "leave-start": (en) => {
      ze._x_transition.leave.start = en;
    }, "leave-end": (en) => {
      ze._x_transition.leave.end = en;
    } }[Kr](Jr);
  }
  function Ao(ze, Jr, Kr) {
    hs(ze, Zi);
    let en = !Jr.includes("in") && !Jr.includes("out") && !Kr, tn = en || Jr.includes("in") || ["enter"].includes(Kr), rn = en || Jr.includes("out") || ["leave"].includes(Kr);
    Jr.includes("in") && !en && (Jr = Jr.filter((wn, Ln) => Ln < Jr.indexOf("out"))), Jr.includes("out") && !en && (Jr = Jr.filter((wn, Ln) => Ln > Jr.indexOf("out")));
    let nn = !Jr.includes("opacity") && !Jr.includes("scale"), on = nn || Jr.includes("opacity"), un = nn || Jr.includes("scale"), dn = on ? 0 : 1, vn = un ? ji(Jr, "scale", 95) / 100 : 1, _n = ji(Jr, "delay", 0) / 1e3, xn = ji(Jr, "origin", "center"), kn = "opacity, transform", ui = ji(Jr, "duration", 150) / 1e3, fa = ji(Jr, "duration", 75) / 1e3, gn = "cubic-bezier(0.4, 0.0, 0.2, 1)";
    tn && (ze._x_transition.enter.during = { transformOrigin: xn, transitionDelay: `${_n}s`, transitionProperty: kn, transitionDuration: `${ui}s`, transitionTimingFunction: gn }, ze._x_transition.enter.start = { opacity: dn, transform: `scale(${vn})` }, ze._x_transition.enter.end = { opacity: 1, transform: "scale(1)" }), rn && (ze._x_transition.leave.during = { transformOrigin: xn, transitionDelay: `${_n}s`, transitionProperty: kn, transitionDuration: `${fa}s`, transitionTimingFunction: gn }, ze._x_transition.leave.start = { opacity: 1, transform: "scale(1)" }, ze._x_transition.leave.end = { opacity: dn, transform: `scale(${vn})` });
  }
  function hs(ze, Jr, Kr = {}) {
    ze._x_transition || (ze._x_transition = { enter: { during: Kr, start: Kr, end: Kr }, leave: { during: Kr, start: Kr, end: Kr }, in(en = () => {
    }, tn = () => {
    }) {
      ka(ze, Jr, { during: this.enter.during, start: this.enter.start, end: this.enter.end }, en, tn);
    }, out(en = () => {
    }, tn = () => {
    }) {
      ka(ze, Jr, { during: this.leave.during, start: this.leave.start, end: this.leave.end }, en, tn);
    } });
  }
  window.Element.prototype._x_toggleAndCascadeWithTransitions = function(ze, Jr, Kr, en) {
    let tn = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout, rn = () => tn(Kr);
    if (Jr) {
      ze._x_transition && (ze._x_transition.enter || ze._x_transition.leave) ? ze._x_transition.enter && (Object.entries(ze._x_transition.enter.during).length || Object.entries(ze._x_transition.enter.start).length || Object.entries(ze._x_transition.enter.end).length) ? ze._x_transition.in(Kr) : rn() : ze._x_transition ? ze._x_transition.in(Kr) : rn();
      return;
    }
    ze._x_hidePromise = ze._x_transition ? new Promise((nn, on) => {
      ze._x_transition.out(() => {
      }, () => nn(en)), ze._x_transitioning && ze._x_transitioning.beforeCancel(() => on({ isFromCancelledTransition: !0 }));
    }) : Promise.resolve(en), queueMicrotask(() => {
      let nn = ps(ze);
      nn ? (nn._x_hideChildren || (nn._x_hideChildren = []), nn._x_hideChildren.push(ze)) : tn(() => {
        let on = (un) => {
          let dn = Promise.all([un._x_hidePromise, ...(un._x_hideChildren || []).map(on)]).then(([vn]) => vn());
          return delete un._x_hidePromise, delete un._x_hideChildren, dn;
        };
        on(ze).catch((un) => {
          if (!un.isFromCancelledTransition) throw un;
        });
      });
    });
  };
  function ps(ze) {
    let Jr = ze.parentNode;
    if (Jr) return Jr._x_hidePromise ? Jr : ps(Jr);
  }
  function ka(ze, Jr, { during: Kr, start: en, end: tn } = {}, rn = () => {
  }, nn = () => {
  }) {
    if (ze._x_transitioning && ze._x_transitioning.cancel(), Object.keys(Kr).length === 0 && Object.keys(en).length === 0 && Object.keys(tn).length === 0) {
      rn(), nn();
      return;
    }
    let on, un, dn;
    Co(ze, { start() {
      on = Jr(ze, en);
    }, during() {
      un = Jr(ze, Kr);
    }, before: rn, end() {
      on(), dn = Jr(ze, tn);
    }, after: nn, cleanup() {
      un(), dn();
    } });
  }
  function Co(ze, Jr) {
    let Kr, en, tn, rn = Oa(() => {
      Tn(() => {
        Kr = !0, en || Jr.before(), tn || (Jr.end(), Aa()), Jr.after(), ze.isConnected && Jr.cleanup(), delete ze._x_transitioning;
      });
    });
    ze._x_transitioning = { beforeCancels: [], beforeCancel(nn) {
      this.beforeCancels.push(nn);
    }, cancel: Oa(function() {
      for (; this.beforeCancels.length; ) this.beforeCancels.shift()();
      rn();
    }), finish: rn }, Tn(() => {
      Jr.start(), Jr.during();
    }), yo(), requestAnimationFrame(() => {
      if (Kr) return;
      let nn = Number(getComputedStyle(ze).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3, on = Number(getComputedStyle(ze).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
      nn === 0 && (nn = Number(getComputedStyle(ze).animationDuration.replace("s", "")) * 1e3), Tn(() => {
        Jr.before();
      }), en = !0, requestAnimationFrame(() => {
        Kr || (Tn(() => {
          Jr.end();
        }), Aa(), setTimeout(ze._x_transitioning.finish, nn + on), tn = !0);
      });
    });
  }
  function ji(ze, Jr, Kr) {
    if (ze.indexOf(Jr) === -1) return Kr;
    let en = ze[ze.indexOf(Jr) + 1];
    if (!en || Jr === "scale" && isNaN(en)) return Kr;
    if (Jr === "duration" || Jr === "delay") {
      let tn = en.match(/([0-9]+)ms/);
      if (tn) return tn[1];
    }
    return Jr === "origin" && ["top", "right", "left", "center", "bottom"].includes(ze[ze.indexOf(Jr) + 2]) ? [en, ze[ze.indexOf(Jr) + 2]].join(" ") : en;
  }
  var si = !1;
  function pi(ze, Jr = () => {
  }) {
    return (...Kr) => si ? Jr(...Kr) : ze(...Kr);
  }
  function Oo(ze) {
    return (...Jr) => si && ze(...Jr);
  }
  var vs = [];
  function Yi(ze) {
    vs.push(ze);
  }
  function ko(ze, Jr) {
    vs.forEach((Kr) => Kr(ze, Jr)), si = !0, gs(() => {
      zn(Jr, (Kr, en) => {
        en(Kr, () => {
        });
      });
    }), si = !1;
  }
  var Ra = !1;
  function Ro(ze, Jr) {
    Jr._x_dataStack || (Jr._x_dataStack = ze._x_dataStack), si = !0, Ra = !0, gs(() => {
      Io(Jr);
    }), si = !1, Ra = !1;
  }
  function Io(ze) {
    let Jr = !1;
    zn(ze, (Kr, en) => {
      Cn(Kr, (tn, rn) => {
        if (Jr && ci(tn)) return rn();
        Jr = !0, en(tn, rn);
      });
    });
  }
  function gs(ze) {
    let Jr = hn;
    Yn((Kr, en) => {
      let tn = Jr(Kr);
      return pn(tn), () => {
      };
    }), ze(), Yn(Jr);
  }
  function ms(ze, Jr, Kr, en = []) {
    switch (ze._x_bindings || (ze._x_bindings = fn({})), ze._x_bindings[Jr] = Kr, Jr = en.includes("camel") ? jo(Jr) : Jr, Jr) {
      case "value":
        Mo(ze, Kr);
        break;
      case "style":
        qo(ze, Kr);
        break;
      case "class":
        No(ze, Kr);
        break;
      case "selected":
      case "checked":
        Po(ze, Jr, Kr);
        break;
      default:
        _s(ze, Jr, Kr);
        break;
    }
  }
  function Mo(ze, Jr) {
    if (ze.type === "radio") ze.attributes.value === void 0 && (ze.value = Jr), window.fromModel && (typeof Jr == "boolean" ? ze.checked = ea(ze.value) === Jr : ze.checked = xs(ze.value, Jr));
    else if (ze.type === "checkbox") Number.isInteger(Jr) ? ze.value = Jr : !Array.isArray(Jr) && typeof Jr != "boolean" && ![null, void 0].includes(Jr) ? ze.value = String(Jr) : Array.isArray(Jr) ? ze.checked = Jr.some((Kr) => xs(Kr, ze.value)) : ze.checked = !!Jr;
    else if (ze.tagName === "SELECT") $o(ze, Jr);
    else {
      if (ze.value === Jr) return;
      ze.value = Jr === void 0 ? "" : Jr;
    }
  }
  function No(ze, Jr) {
    ze._x_undoAddedClasses && ze._x_undoAddedClasses(), ze._x_undoAddedClasses = Ca(ze, Jr);
  }
  function qo(ze, Jr) {
    ze._x_undoAddedStyles && ze._x_undoAddedStyles(), ze._x_undoAddedStyles = Zi(ze, Jr);
  }
  function Po(ze, Jr, Kr) {
    _s(ze, Jr, Kr), Bo(ze, Jr, Kr);
  }
  function _s(ze, Jr, Kr) {
    [null, void 0, !1].includes(Kr) && Fo(Jr) ? ze.removeAttribute(Jr) : (bs(Jr) && (Kr = Jr), Ho(ze, Jr, Kr));
  }
  function Ho(ze, Jr, Kr) {
    ze.getAttribute(Jr) != Kr && ze.setAttribute(Jr, Kr);
  }
  function Bo(ze, Jr, Kr) {
    ze[Jr] !== Kr && (ze[Jr] = Kr);
  }
  function $o(ze, Jr) {
    let Kr = [].concat(Jr).map((en) => en + "");
    Array.from(ze.options).forEach((en) => {
      en.selected = Kr.includes(en.value);
    });
  }
  function jo(ze) {
    return ze.toLowerCase().replace(/-(\w)/g, (Jr, Kr) => Kr.toUpperCase());
  }
  function xs(ze, Jr) {
    return ze == Jr;
  }
  function ea(ze) {
    return [1, "1", "true", "on", "yes", !0].includes(ze) ? !0 : [0, "0", "false", "off", "no", !1].includes(ze) ? !1 : ze ? !!ze : null;
  }
  function bs(ze) {
    return ["disabled", "checked", "required", "readonly", "hidden", "open", "selected", "autofocus", "itemscope", "multiple", "novalidate", "allowfullscreen", "allowpaymentrequest", "formnovalidate", "autoplay", "controls", "loop", "muted", "playsinline", "default", "ismap", "reversed", "async", "defer", "nomodule"].includes(ze);
  }
  function Fo(ze) {
    return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(ze);
  }
  function Do(ze, Jr, Kr) {
    return ze._x_bindings && ze._x_bindings[Jr] !== void 0 ? ze._x_bindings[Jr] : ys(ze, Jr, Kr);
  }
  function Uo(ze, Jr, Kr, en = !0) {
    if (ze._x_bindings && ze._x_bindings[Jr] !== void 0) return ze._x_bindings[Jr];
    if (ze._x_inlineBindings && ze._x_inlineBindings[Jr] !== void 0) {
      let tn = ze._x_inlineBindings[Jr];
      return tn.extract = en, es(() => di(ze, tn.expression));
    }
    return ys(ze, Jr, Kr);
  }
  function ys(ze, Jr, Kr) {
    let en = ze.getAttribute(Jr);
    return en === null ? typeof Kr == "function" ? Kr() : Kr : en === "" ? !0 : bs(Jr) ? !![Jr, "true"].includes(en) : en;
  }
  function ws(ze, Jr) {
    var Kr;
    return function() {
      var en = this, tn = arguments, rn = function() {
        Kr = null, ze.apply(en, tn);
      };
      clearTimeout(Kr), Kr = setTimeout(rn, Jr);
    };
  }
  function Es(ze, Jr) {
    let Kr;
    return function() {
      let en = this, tn = arguments;
      Kr || (ze.apply(en, tn), Kr = !0, setTimeout(() => Kr = !1, Jr));
    };
  }
  function Ss({ get: ze, set: Jr }, { get: Kr, set: en }) {
    let tn = !0, rn, nn = hn(() => {
      let on = ze(), un = Kr();
      if (tn) en(Ia(on)), tn = !1;
      else {
        let dn = JSON.stringify(on), vn = JSON.stringify(un);
        dn !== rn ? en(Ia(on)) : dn !== vn && Jr(Ia(un));
      }
      rn = JSON.stringify(ze()), JSON.stringify(Kr());
    });
    return () => {
      pn(nn);
    };
  }
  function Ia(ze) {
    return typeof ze == "object" ? JSON.parse(JSON.stringify(ze)) : ze;
  }
  function Qo(ze) {
    (Array.isArray(ze) ? ze : [ze]).forEach((Jr) => Jr(Fi));
  }
  var vi = {}, Ts = !1;
  function Xo(ze, Jr) {
    if (Ts || (vi = fn(vi), Ts = !0), Jr === void 0) return vi[ze];
    vi[ze] = Jr, typeof Jr == "object" && Jr !== null && Jr.hasOwnProperty("init") && typeof Jr.init == "function" && vi[ze].init(), Ja(vi[ze]);
  }
  function zo() {
    return vi;
  }
  var Ls = {};
  function Vo(ze, Jr) {
    let Kr = typeof Jr != "function" ? () => Jr : Jr;
    return ze instanceof Element ? As(ze, Kr()) : (Ls[ze] = Kr, () => {
    });
  }
  function Wo(ze) {
    return Object.entries(Ls).forEach(([Jr, Kr]) => {
      Object.defineProperty(ze, Jr, { get() {
        return (...en) => Kr(...en);
      } });
    }), ze;
  }
  function As(ze, Jr, Kr) {
    let en = [];
    for (; en.length; ) en.pop()();
    let tn = Object.entries(Jr).map(([nn, on]) => ({ name: nn, value: on })), rn = ns(tn);
    return tn = tn.map((nn) => rn.find((on) => on.name === nn.name) ? { name: `x-bind:${nn.name}`, value: `"${nn.value}"` } : nn), ba(ze, tn, Kr).map((nn) => {
      en.push(nn.runCleanups), nn();
    }), () => {
      for (; en.length; ) en.pop()();
    };
  }
  var Cs = {};
  function Go(ze, Jr) {
    Cs[ze] = Jr;
  }
  function Jo(ze, Jr) {
    return Object.entries(Cs).forEach(([Kr, en]) => {
      Object.defineProperty(ze, Kr, { get() {
        return (...tn) => en.bind(Jr)(...tn);
      }, enumerable: !1 });
    }), ze;
  }
  var Ko = { get reactive() {
    return fn;
  }, get release() {
    return pn;
  }, get effect() {
    return hn;
  }, get raw() {
    return mn;
  }, version: "3.13.7", flushAndStopDeferringMutations: Gi, dontAutoEvaluateFunctions: es, disableEffectScheduling: Un, startObservingMutations: qi, stopObservingMutations: On, setReactivityEngine: ri, onAttributeRemoved: Wi, onAttributesAdded: Mi, closestDataStack: Li, skipDuringClone: pi, onlyDuringClone: Oo, addRootSelector: jn, addInitSelector: ii, interceptClone: Yi, addScopeToNode: Pi, deferMutations: ai, mapAttributes: wa, evaluateLater: Pn, interceptInit: Xn, setEvaluator: fo, mergeProxies: Hi, extractProp: Uo, findClosest: bn, onElRemoved: In, closestRoot: Qn, destroyTree: yi, interceptor: Ka, transition: ka, setStyles: Zi, mutateDom: Tn, directive: An, entangle: Ss, throttle: Es, debounce: ws, evaluate: di, initTree: zn, nextTick: La, prefixed: Ai, prefix: go, plugin: Qo, magic: Wn, store: Xo, start: $n, clone: Ro, cloneNode: ko, bound: Do, $data: Ga, watch: ei, walk: Cn, data: Go, bind: Vo }, Fi = Ko;
  function Os(ze, Jr) {
    let Kr = /* @__PURE__ */ Object.create(null), en = ze.split(",");
    for (let tn = 0; tn < en.length; tn++) Kr[en[tn]] = !0;
    return (tn) => !!Kr[tn];
  }
  var Zo = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";
  Os(Zo + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");
  var Yo = Object.freeze({}), el = Object.prototype.hasOwnProperty, ta = (ze, Jr) => el.call(ze, Jr), gi = Array.isArray, Di = (ze) => ks(ze) === "[object Map]", tl = (ze) => typeof ze == "string", Ma = (ze) => typeof ze == "symbol", ra = (ze) => ze !== null && typeof ze == "object", rl = Object.prototype.toString, ks = (ze) => rl.call(ze), Rs = (ze) => ks(ze).slice(8, -1), Na = (ze) => tl(ze) && ze !== "NaN" && ze[0] !== "-" && "" + parseInt(ze, 10) === ze, nl = (ze) => {
    let Jr = /* @__PURE__ */ Object.create(null);
    return (Kr) => Jr[Kr] || (Jr[Kr] = ze(Kr));
  }, il = nl((ze) => ze.charAt(0).toUpperCase() + ze.slice(1)), Is = (ze, Jr) => ze !== Jr && (ze === ze || Jr === Jr), qa = /* @__PURE__ */ new WeakMap(), Ui = [], Zn, mi = Symbol("iterate"), Pa = Symbol("Map key iterate");
  function al(ze) {
    return ze && ze._isEffect === !0;
  }
  function sl(ze, Jr = Yo) {
    al(ze) && (ze = ze.raw);
    let Kr = ul(ze, Jr);
    return Jr.lazy || Kr(), Kr;
  }
  function ol(ze) {
    ze.active && (Ms(ze), ze.options.onStop && ze.options.onStop(), ze.active = !1);
  }
  var ll = 0;
  function ul(ze, Jr) {
    let Kr = function() {
      if (!Kr.active) return ze();
      if (!Ui.includes(Kr)) {
        Ms(Kr);
        try {
          return fl(), Ui.push(Kr), Zn = Kr, ze();
        } finally {
          Ui.pop(), Ns(), Zn = Ui[Ui.length - 1];
        }
      }
    };
    return Kr.id = ll++, Kr.allowRecurse = !!Jr.allowRecurse, Kr._isEffect = !0, Kr.active = !0, Kr.raw = ze, Kr.deps = [], Kr.options = Jr, Kr;
  }
  function Ms(ze) {
    let { deps: Jr } = ze;
    if (Jr.length) {
      for (let Kr = 0; Kr < Jr.length; Kr++) Jr[Kr].delete(ze);
      Jr.length = 0;
    }
  }
  var Ci = !0, Ha = [];
  function cl() {
    Ha.push(Ci), Ci = !1;
  }
  function fl() {
    Ha.push(Ci), Ci = !0;
  }
  function Ns() {
    let ze = Ha.pop();
    Ci = ze === void 0 ? !0 : ze;
  }
  function Gn(ze, Jr, Kr) {
    if (!Ci || Zn === void 0) return;
    let en = qa.get(ze);
    en || qa.set(ze, en = /* @__PURE__ */ new Map());
    let tn = en.get(Kr);
    tn || en.set(Kr, tn = /* @__PURE__ */ new Set()), tn.has(Zn) || (tn.add(Zn), Zn.deps.push(tn), Zn.options.onTrack && Zn.options.onTrack({ effect: Zn, target: ze, type: Jr, key: Kr }));
  }
  function oi(ze, Jr, Kr, en, tn, rn) {
    let nn = qa.get(ze);
    if (!nn) return;
    let on = /* @__PURE__ */ new Set(), un = (vn) => {
      vn && vn.forEach((_n) => {
        (_n !== Zn || _n.allowRecurse) && on.add(_n);
      });
    };
    if (Jr === "clear") nn.forEach(un);
    else if (Kr === "length" && gi(ze)) nn.forEach((vn, _n) => {
      (_n === "length" || _n >= en) && un(vn);
    });
    else switch (Kr !== void 0 && un(nn.get(Kr)), Jr) {
      case "add":
        gi(ze) ? Na(Kr) && un(nn.get("length")) : (un(nn.get(mi)), Di(ze) && un(nn.get(Pa)));
        break;
      case "delete":
        gi(ze) || (un(nn.get(mi)), Di(ze) && un(nn.get(Pa)));
        break;
      case "set":
        Di(ze) && un(nn.get(mi));
        break;
    }
    let dn = (vn) => {
      vn.options.onTrigger && vn.options.onTrigger({ effect: vn, target: ze, key: Kr, type: Jr, newValue: en, oldValue: tn, oldTarget: rn }), vn.options.scheduler ? vn.options.scheduler(vn) : vn();
    };
    on.forEach(dn);
  }
  var dl = Os("__proto__,__v_isRef,__isVue"), qs = new Set(Object.getOwnPropertyNames(Symbol).map((ze) => Symbol[ze]).filter(Ma)), hl = Hs(), pl = Hs(!0), Ps = vl();
  function vl() {
    let ze = {};
    return ["includes", "indexOf", "lastIndexOf"].forEach((Jr) => {
      ze[Jr] = function(...Kr) {
        let en = yn(this);
        for (let rn = 0, nn = this.length; rn < nn; rn++) Gn(en, "get", rn + "");
        let tn = en[Jr](...Kr);
        return tn === -1 || tn === !1 ? en[Jr](...Kr.map(yn)) : tn;
      };
    }), ["push", "pop", "shift", "unshift", "splice"].forEach((Jr) => {
      ze[Jr] = function(...Kr) {
        cl();
        let en = yn(this)[Jr].apply(this, Kr);
        return Ns(), en;
      };
    }), ze;
  }
  function Hs(ze = !1, Jr = !1) {
    return function(Kr, en, tn) {
      if (en === "__v_isReactive") return !ze;
      if (en === "__v_isReadonly") return ze;
      if (en === "__v_raw" && tn === (ze ? Jr ? Ol : Xs : Jr ? Cl : Qs).get(Kr)) return Kr;
      let rn = gi(Kr);
      if (!ze && rn && ta(Ps, en)) return Reflect.get(Ps, en, tn);
      let nn = Reflect.get(Kr, en, tn);
      return (Ma(en) ? qs.has(en) : dl(en)) || (ze || Gn(Kr, "get", en), Jr) ? nn : Da(nn) ? !rn || !Na(en) ? nn.value : nn : ra(nn) ? ze ? zs(nn) : Fa(nn) : nn;
    };
  }
  var gl = ml();
  function ml(ze = !1) {
    return function(Jr, Kr, en, tn) {
      let rn = Jr[Kr];
      if (!ze && (en = yn(en), rn = yn(rn), !gi(Jr) && Da(rn) && !Da(en))) return rn.value = en, !0;
      let nn = gi(Jr) && Na(Kr) ? Number(Kr) < Jr.length : ta(Jr, Kr), on = Reflect.set(Jr, Kr, en, tn);
      return Jr === yn(tn) && (nn ? Is(en, rn) && oi(Jr, "set", Kr, en, rn) : oi(Jr, "add", Kr, en)), on;
    };
  }
  function _l(ze, Jr) {
    let Kr = ta(ze, Jr), en = ze[Jr], tn = Reflect.deleteProperty(ze, Jr);
    return tn && Kr && oi(ze, "delete", Jr, void 0, en), tn;
  }
  function xl(ze, Jr) {
    let Kr = Reflect.has(ze, Jr);
    return (!Ma(Jr) || !qs.has(Jr)) && Gn(ze, "has", Jr), Kr;
  }
  function bl(ze) {
    return Gn(ze, "iterate", gi(ze) ? "length" : mi), Reflect.ownKeys(ze);
  }
  var yl = { get: hl, set: gl, deleteProperty: _l, has: xl, ownKeys: bl }, wl = { get: pl, set(ze, Jr) {
    return console.warn(`Set operation on key "${String(Jr)}" failed: target is readonly.`, ze), !0;
  }, deleteProperty(ze, Jr) {
    return console.warn(`Delete operation on key "${String(Jr)}" failed: target is readonly.`, ze), !0;
  } }, Ba = (ze) => ra(ze) ? Fa(ze) : ze, $a = (ze) => ra(ze) ? zs(ze) : ze, ja = (ze) => ze, na = (ze) => Reflect.getPrototypeOf(ze);
  function ia(ze, Jr, Kr = !1, en = !1) {
    ze = ze.__v_raw;
    let tn = yn(ze), rn = yn(Jr);
    Jr !== rn && !Kr && Gn(tn, "get", Jr), !Kr && Gn(tn, "get", rn);
    let { has: nn } = na(tn), on = en ? ja : Kr ? $a : Ba;
    if (nn.call(tn, Jr)) return on(ze.get(Jr));
    if (nn.call(tn, rn)) return on(ze.get(rn));
    ze !== tn && ze.get(Jr);
  }
  function aa(ze, Jr = !1) {
    let Kr = this.__v_raw, en = yn(Kr), tn = yn(ze);
    return ze !== tn && !Jr && Gn(en, "has", ze), !Jr && Gn(en, "has", tn), ze === tn ? Kr.has(ze) : Kr.has(ze) || Kr.has(tn);
  }
  function sa(ze, Jr = !1) {
    return ze = ze.__v_raw, !Jr && Gn(yn(ze), "iterate", mi), Reflect.get(ze, "size", ze);
  }
  function Bs(ze) {
    ze = yn(ze);
    let Jr = yn(this);
    return na(Jr).has.call(Jr, ze) || (Jr.add(ze), oi(Jr, "add", ze, ze)), this;
  }
  function $s(ze, Jr) {
    Jr = yn(Jr);
    let Kr = yn(this), { has: en, get: tn } = na(Kr), rn = en.call(Kr, ze);
    rn ? Us(Kr, en, ze) : (ze = yn(ze), rn = en.call(Kr, ze));
    let nn = tn.call(Kr, ze);
    return Kr.set(ze, Jr), rn ? Is(Jr, nn) && oi(Kr, "set", ze, Jr, nn) : oi(Kr, "add", ze, Jr), this;
  }
  function js(ze) {
    let Jr = yn(this), { has: Kr, get: en } = na(Jr), tn = Kr.call(Jr, ze);
    tn ? Us(Jr, Kr, ze) : (ze = yn(ze), tn = Kr.call(Jr, ze));
    let rn = en ? en.call(Jr, ze) : void 0, nn = Jr.delete(ze);
    return tn && oi(Jr, "delete", ze, void 0, rn), nn;
  }
  function Fs() {
    let ze = yn(this), Jr = ze.size !== 0, Kr = Di(ze) ? new Map(ze) : new Set(ze), en = ze.clear();
    return Jr && oi(ze, "clear", void 0, void 0, Kr), en;
  }
  function oa(ze, Jr) {
    return function(Kr, en) {
      let tn = this, rn = tn.__v_raw, nn = yn(rn), on = Jr ? ja : ze ? $a : Ba;
      return !ze && Gn(nn, "iterate", mi), rn.forEach((un, dn) => Kr.call(en, on(un), on(dn), tn));
    };
  }
  function la(ze, Jr, Kr) {
    return function(...en) {
      let tn = this.__v_raw, rn = yn(tn), nn = Di(rn), on = ze === "entries" || ze === Symbol.iterator && nn, un = ze === "keys" && nn, dn = tn[ze](...en), vn = Kr ? ja : Jr ? $a : Ba;
      return !Jr && Gn(rn, "iterate", un ? Pa : mi), { next() {
        let { value: _n, done: xn } = dn.next();
        return xn ? { value: _n, done: xn } : { value: on ? [vn(_n[0]), vn(_n[1])] : vn(_n), done: xn };
      }, [Symbol.iterator]() {
        return this;
      } };
    };
  }
  function li(ze) {
    return function(...Jr) {
      {
        let Kr = Jr[0] ? `on key "${Jr[0]}" ` : "";
        console.warn(`${il(ze)} operation ${Kr}failed: target is readonly.`, yn(this));
      }
      return ze === "delete" ? !1 : this;
    };
  }
  function El() {
    let ze = { get(tn) {
      return ia(this, tn);
    }, get size() {
      return sa(this);
    }, has: aa, add: Bs, set: $s, delete: js, clear: Fs, forEach: oa(!1, !1) }, Jr = { get(tn) {
      return ia(this, tn, !1, !0);
    }, get size() {
      return sa(this);
    }, has: aa, add: Bs, set: $s, delete: js, clear: Fs, forEach: oa(!1, !0) }, Kr = { get(tn) {
      return ia(this, tn, !0);
    }, get size() {
      return sa(this, !0);
    }, has(tn) {
      return aa.call(this, tn, !0);
    }, add: li("add"), set: li("set"), delete: li("delete"), clear: li("clear"), forEach: oa(!0, !1) }, en = { get(tn) {
      return ia(this, tn, !0, !0);
    }, get size() {
      return sa(this, !0);
    }, has(tn) {
      return aa.call(this, tn, !0);
    }, add: li("add"), set: li("set"), delete: li("delete"), clear: li("clear"), forEach: oa(!0, !0) };
    return ["keys", "values", "entries", Symbol.iterator].forEach((tn) => {
      ze[tn] = la(tn, !1, !1), Kr[tn] = la(tn, !0, !1), Jr[tn] = la(tn, !1, !0), en[tn] = la(tn, !0, !0);
    }), [ze, Kr, Jr, en];
  }
  var [Sl, Tl, Yl, eu] = El();
  function Ds(ze, Jr) {
    let Kr = ze ? Tl : Sl;
    return (en, tn, rn) => tn === "__v_isReactive" ? !ze : tn === "__v_isReadonly" ? ze : tn === "__v_raw" ? en : Reflect.get(ta(Kr, tn) && tn in en ? Kr : en, tn, rn);
  }
  var Ll = { get: Ds(!1) }, Al = { get: Ds(!0) };
  function Us(ze, Jr, Kr) {
    let en = yn(Kr);
    if (en !== Kr && Jr.call(ze, en)) {
      let tn = Rs(ze);
      console.warn(`Reactive ${tn} contains both the raw and reactive versions of the same object${tn === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
    }
  }
  var Qs = /* @__PURE__ */ new WeakMap(), Cl = /* @__PURE__ */ new WeakMap(), Xs = /* @__PURE__ */ new WeakMap(), Ol = /* @__PURE__ */ new WeakMap();
  function kl(ze) {
    switch (ze) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  function Rl(ze) {
    return ze.__v_skip || !Object.isExtensible(ze) ? 0 : kl(Rs(ze));
  }
  function Fa(ze) {
    return ze && ze.__v_isReadonly ? ze : Vs(ze, !1, yl, Ll, Qs);
  }
  function zs(ze) {
    return Vs(ze, !0, wl, Al, Xs);
  }
  function Vs(ze, Jr, Kr, en, tn) {
    if (!ra(ze)) return console.warn(`value cannot be made reactive: ${String(ze)}`), ze;
    if (ze.__v_raw && !(Jr && ze.__v_isReactive)) return ze;
    let rn = tn.get(ze);
    if (rn) return rn;
    let nn = Rl(ze);
    if (nn === 0) return ze;
    let on = new Proxy(ze, nn === 2 ? en : Kr);
    return tn.set(ze, on), on;
  }
  function yn(ze) {
    return ze && yn(ze.__v_raw) || ze;
  }
  function Da(ze) {
    return !!(ze && ze.__v_isRef === !0);
  }
  Wn("nextTick", () => La), Wn("dispatch", (ze) => Bn.bind(Bn, ze)), Wn("watch", (ze, { evaluateLater: Jr, cleanup: Kr }) => (en, tn) => {
    let rn = Jr(en), nn = ei(() => {
      let on;
      return rn((un) => on = un), on;
    }, tn);
    Kr(nn);
  }), Wn("store", zo), Wn("data", (ze) => Ga(ze)), Wn("root", (ze) => Qn(ze)), Wn("refs", (ze) => (ze._x_refs_proxy || (ze._x_refs_proxy = Hi(Il(ze))), ze._x_refs_proxy));
  function Il(ze) {
    let Jr = [];
    return bn(ze, (Kr) => {
      Kr._x_refs && Jr.push(Kr._x_refs);
    }), Jr;
  }
  var Ua = {};
  function Ws(ze) {
    return Ua[ze] || (Ua[ze] = 0), ++Ua[ze];
  }
  function Ml(ze, Jr) {
    return bn(ze, (Kr) => {
      if (Kr._x_ids && Kr._x_ids[Jr]) return !0;
    });
  }
  function Nl(ze, Jr) {
    ze._x_ids || (ze._x_ids = {}), ze._x_ids[Jr] || (ze._x_ids[Jr] = Ws(Jr));
  }
  Wn("id", (ze, { cleanup: Jr }) => (Kr, en = null) => {
    let tn = `${Kr}${en ? `-${en}` : ""}`;
    return ql(ze, tn, Jr, () => {
      let rn = Ml(ze, Kr), nn = rn ? rn._x_ids[Kr] : Ws(Kr);
      return en ? `${Kr}-${nn}-${en}` : `${Kr}-${nn}`;
    });
  }), Yi((ze, Jr) => {
    ze._x_id && (Jr._x_id = ze._x_id);
  });
  function ql(ze, Jr, Kr, en) {
    if (ze._x_id || (ze._x_id = {}), ze._x_id[Jr]) return ze._x_id[Jr];
    let tn = en();
    return ze._x_id[Jr] = tn, Kr(() => {
      delete ze._x_id[Jr];
    }), tn;
  }
  Wn("el", (ze) => ze), Gs("Focus", "focus", "focus"), Gs("Persist", "persist", "persist");
  function Gs(ze, Jr, Kr) {
    Wn(Jr, (en) => Sn(`You can't use [$${Jr}] without first installing the "${ze}" plugin here: https://alpinejs.dev/plugins/${Kr}`, en));
  }
  An("modelable", (ze, { expression: Jr }, { effect: Kr, evaluateLater: en, cleanup: tn }) => {
    let rn = en(Jr), nn = () => {
      let vn;
      return rn((_n) => vn = _n), vn;
    }, on = en(`${Jr} = __placeholder`), un = (vn) => on(() => {
    }, { scope: { __placeholder: vn } }), dn = nn();
    un(dn), queueMicrotask(() => {
      if (!ze._x_model) return;
      ze._x_removeModelListeners.default();
      let vn = ze._x_model.get, _n = ze._x_model.set, xn = Ss({ get() {
        return vn();
      }, set(kn) {
        _n(kn);
      } }, { get() {
        return nn();
      }, set(kn) {
        un(kn);
      } });
      tn(xn);
    });
  }), An("teleport", (ze, { modifiers: Jr, expression: Kr }, { cleanup: en }) => {
    ze.tagName.toLowerCase() !== "template" && Sn("x-teleport can only be used on a <template> tag", ze);
    let tn = Js(Kr), rn = ze.content.cloneNode(!0).firstElementChild;
    ze._x_teleport = rn, rn._x_teleportBack = ze, ze.setAttribute("data-teleport-template", !0), rn.setAttribute("data-teleport-target", !0), ze._x_forwardEvents && ze._x_forwardEvents.forEach((on) => {
      rn.addEventListener(on, (un) => {
        un.stopPropagation(), ze.dispatchEvent(new un.constructor(un.type, un));
      });
    }), Pi(rn, {}, ze);
    let nn = (on, un, dn) => {
      dn.includes("prepend") ? un.parentNode.insertBefore(on, un) : dn.includes("append") ? un.parentNode.insertBefore(on, un.nextSibling) : un.appendChild(on);
    };
    Tn(() => {
      nn(rn, tn, Jr), zn(rn), rn._x_ignore = !0;
    }), ze._x_teleportPutBack = () => {
      let on = Js(Kr);
      Tn(() => {
        nn(ze._x_teleport, on, Jr);
      });
    }, en(() => rn.remove());
  });
  var Pl = document.createElement("div");
  function Js(ze) {
    let Jr = pi(() => document.querySelector(ze), () => Pl)();
    return Jr || Sn(`Cannot find x-teleport element for selector: "${ze}"`), Jr;
  }
  var Ks = () => {
  };
  Ks.inline = (ze, { modifiers: Jr }, { cleanup: Kr }) => {
    Jr.includes("self") ? ze._x_ignoreSelf = !0 : ze._x_ignore = !0, Kr(() => {
      Jr.includes("self") ? delete ze._x_ignoreSelf : delete ze._x_ignore;
    });
  }, An("ignore", Ks), An("effect", pi((ze, { expression: Jr }, { effect: Kr }) => {
    Kr(Pn(ze, Jr));
  }));
  function Qa(ze, Jr, Kr, en) {
    let tn = ze, rn = (un) => en(un), nn = {}, on = (un, dn) => (vn) => dn(un, vn);
    if (Kr.includes("dot") && (Jr = Hl(Jr)), Kr.includes("camel") && (Jr = Bl(Jr)), Kr.includes("passive") && (nn.passive = !0), Kr.includes("capture") && (nn.capture = !0), Kr.includes("window") && (tn = window), Kr.includes("document") && (tn = document), Kr.includes("debounce")) {
      let un = Kr[Kr.indexOf("debounce") + 1] || "invalid-wait", dn = ua(un.split("ms")[0]) ? Number(un.split("ms")[0]) : 250;
      rn = ws(rn, dn);
    }
    if (Kr.includes("throttle")) {
      let un = Kr[Kr.indexOf("throttle") + 1] || "invalid-wait", dn = ua(un.split("ms")[0]) ? Number(un.split("ms")[0]) : 250;
      rn = Es(rn, dn);
    }
    return Kr.includes("prevent") && (rn = on(rn, (un, dn) => {
      dn.preventDefault(), un(dn);
    })), Kr.includes("stop") && (rn = on(rn, (un, dn) => {
      dn.stopPropagation(), un(dn);
    })), Kr.includes("self") && (rn = on(rn, (un, dn) => {
      dn.target === ze && un(dn);
    })), (Kr.includes("away") || Kr.includes("outside")) && (tn = document, rn = on(rn, (un, dn) => {
      ze.contains(dn.target) || dn.target.isConnected !== !1 && (ze.offsetWidth < 1 && ze.offsetHeight < 1 || ze._x_isShown !== !1 && un(dn));
    })), Kr.includes("once") && (rn = on(rn, (un, dn) => {
      un(dn), tn.removeEventListener(Jr, rn, nn);
    })), rn = on(rn, (un, dn) => {
      jl(Jr) && Fl(dn, Kr) || un(dn);
    }), tn.addEventListener(Jr, rn, nn), () => {
      tn.removeEventListener(Jr, rn, nn);
    };
  }
  function Hl(ze) {
    return ze.replace(/-/g, ".");
  }
  function Bl(ze) {
    return ze.toLowerCase().replace(/-(\w)/g, (Jr, Kr) => Kr.toUpperCase());
  }
  function ua(ze) {
    return !Array.isArray(ze) && !isNaN(ze);
  }
  function $l(ze) {
    return [" ", "_"].includes(ze) ? ze : ze.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
  }
  function jl(ze) {
    return ["keydown", "keyup"].includes(ze);
  }
  function Fl(ze, Jr) {
    let Kr = Jr.filter((tn) => !["window", "document", "prevent", "stop", "once", "capture"].includes(tn));
    if (Kr.includes("debounce")) {
      let tn = Kr.indexOf("debounce");
      Kr.splice(tn, ua((Kr[tn + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
    }
    if (Kr.includes("throttle")) {
      let tn = Kr.indexOf("throttle");
      Kr.splice(tn, ua((Kr[tn + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
    }
    if (Kr.length === 0 || Kr.length === 1 && Zs(ze.key).includes(Kr[0])) return !1;
    let en = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((tn) => Kr.includes(tn));
    return Kr = Kr.filter((tn) => !en.includes(tn)), !(en.length > 0 && en.filter((tn) => ((tn === "cmd" || tn === "super") && (tn = "meta"), ze[`${tn}Key`])).length === en.length && Zs(ze.key).includes(Kr[0]));
  }
  function Zs(ze) {
    if (!ze) return [];
    ze = $l(ze);
    let Jr = { ctrl: "control", slash: "/", space: " ", spacebar: " ", cmd: "meta", esc: "escape", up: "arrow-up", down: "arrow-down", left: "arrow-left", right: "arrow-right", period: ".", equal: "=", minus: "-", underscore: "_" };
    return Jr[ze] = ze, Object.keys(Jr).map((Kr) => {
      if (Jr[Kr] === ze) return Kr;
    }).filter((Kr) => Kr);
  }
  An("model", (ze, { modifiers: Jr, expression: Kr }, { effect: en, cleanup: tn }) => {
    let rn = ze;
    Jr.includes("parent") && (rn = ze.parentNode);
    let nn = Pn(rn, Kr), on;
    typeof Kr == "string" ? on = Pn(rn, `${Kr} = __placeholder`) : typeof Kr == "function" && typeof Kr() == "string" ? on = Pn(rn, `${Kr()} = __placeholder`) : on = () => {
    };
    let un = () => {
      let xn;
      return nn((kn) => xn = kn), Ys(xn) ? xn.get() : xn;
    }, dn = (xn) => {
      let kn;
      nn((ui) => kn = ui), Ys(kn) ? kn.set(xn) : on(() => {
      }, { scope: { __placeholder: xn } });
    };
    typeof Kr == "string" && ze.type === "radio" && Tn(() => {
      ze.hasAttribute("name") || ze.setAttribute("name", Kr);
    });
    var vn = ze.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(ze.type) || Jr.includes("lazy") ? "change" : "input";
    let _n = si ? () => {
    } : Qa(ze, vn, Jr, (xn) => {
      dn(Dl(ze, Jr, xn, un()));
    });
    if (Jr.includes("fill") && ([void 0, null, ""].includes(un()) || ze.type === "checkbox" && Array.isArray(un())) && ze.dispatchEvent(new Event(vn, {})), ze._x_removeModelListeners || (ze._x_removeModelListeners = {}), ze._x_removeModelListeners.default = _n, tn(() => ze._x_removeModelListeners.default()), ze.form) {
      let xn = Qa(ze.form, "reset", [], (kn) => {
        La(() => ze._x_model && ze._x_model.set(ze.value));
      });
      tn(() => xn());
    }
    ze._x_model = { get() {
      return un();
    }, set(xn) {
      dn(xn);
    } }, ze._x_forceModelUpdate = (xn) => {
      xn === void 0 && typeof Kr == "string" && Kr.match(/\./) && (xn = ""), window.fromModel = !0, Tn(() => ms(ze, "value", xn)), delete window.fromModel;
    }, en(() => {
      let xn = un();
      Jr.includes("unintrusive") && document.activeElement.isSameNode(ze) || ze._x_forceModelUpdate(xn);
    });
  });
  function Dl(ze, Jr, Kr, en) {
    return Tn(() => {
      if (Kr instanceof CustomEvent && Kr.detail !== void 0) return Kr.detail !== null && Kr.detail !== void 0 ? Kr.detail : Kr.target.value;
      if (ze.type === "checkbox") if (Array.isArray(en)) {
        let tn = null;
        return Jr.includes("number") ? tn = Xa(Kr.target.value) : Jr.includes("boolean") ? tn = ea(Kr.target.value) : tn = Kr.target.value, Kr.target.checked ? en.concat([tn]) : en.filter((rn) => !Ul(rn, tn));
      } else return Kr.target.checked;
      else return ze.tagName.toLowerCase() === "select" && ze.multiple ? Jr.includes("number") ? Array.from(Kr.target.selectedOptions).map((tn) => {
        let rn = tn.value || tn.text;
        return Xa(rn);
      }) : Jr.includes("boolean") ? Array.from(Kr.target.selectedOptions).map((tn) => {
        let rn = tn.value || tn.text;
        return ea(rn);
      }) : Array.from(Kr.target.selectedOptions).map((tn) => tn.value || tn.text) : Jr.includes("number") ? Xa(Kr.target.value) : Jr.includes("boolean") ? ea(Kr.target.value) : Jr.includes("trim") ? Kr.target.value.trim() : Kr.target.value;
    });
  }
  function Xa(ze) {
    let Jr = ze ? parseFloat(ze) : null;
    return Ql(Jr) ? Jr : ze;
  }
  function Ul(ze, Jr) {
    return ze == Jr;
  }
  function Ql(ze) {
    return !Array.isArray(ze) && !isNaN(ze);
  }
  function Ys(ze) {
    return ze !== null && typeof ze == "object" && typeof ze.get == "function" && typeof ze.set == "function";
  }
  An("cloak", (ze) => queueMicrotask(() => Tn(() => ze.removeAttribute(Ai("cloak"))))), ii(() => `[${Ai("init")}]`), An("init", pi((ze, { expression: Jr }, { evaluate: Kr }) => typeof Jr == "string" ? !!Jr.trim() && Kr(Jr, {}, !1) : Kr(Jr, {}, !1))), An("text", (ze, { expression: Jr }, { effect: Kr, evaluateLater: en }) => {
    let tn = en(Jr);
    Kr(() => {
      tn((rn) => {
        Tn(() => {
          ze.textContent = rn;
        });
      });
    });
  }), An("html", (ze, { expression: Jr }, { effect: Kr, evaluateLater: en }) => {
    let tn = en(Jr);
    Kr(() => {
      tn((rn) => {
        Tn(() => {
          ze.innerHTML = rn, ze._x_ignoreSelf = !0, zn(ze), delete ze._x_ignoreSelf;
        });
      });
    });
  }), wa(ss(":", os(Ai("bind:"))));
  var eo = (ze, { value: Jr, modifiers: Kr, expression: en, original: tn }, { effect: rn }) => {
    if (!Jr) {
      let on = {};
      Wo(on), Pn(ze, en)((un) => {
        As(ze, un, tn);
      }, { scope: on });
      return;
    }
    if (Jr === "key") return Xl(ze, en);
    if (ze._x_inlineBindings && ze._x_inlineBindings[Jr] && ze._x_inlineBindings[Jr].extract) return;
    let nn = Pn(ze, en);
    rn(() => nn((on) => {
      on === void 0 && typeof en == "string" && en.match(/\./) && (on = ""), Tn(() => ms(ze, Jr, on, Kr));
    }));
  };
  eo.inline = (ze, { value: Jr, modifiers: Kr, expression: en }) => {
    Jr && (ze._x_inlineBindings || (ze._x_inlineBindings = {}), ze._x_inlineBindings[Jr] = { expression: en, extract: !1 });
  }, An("bind", eo);
  function Xl(ze, Jr) {
    ze._x_keyExpression = Jr;
  }
  jn(() => `[${Ai("data")}]`), An("data", (ze, { expression: Jr }, { cleanup: Kr }) => {
    if (zl(ze)) return;
    Jr = Jr === "" ? "{}" : Jr;
    let en = {};
    ga(en, ze);
    let tn = {};
    Jo(tn, en);
    let rn = di(ze, Jr, { scope: tn });
    (rn === void 0 || rn === !0) && (rn = {}), ga(rn, ze);
    let nn = fn(rn);
    Ja(nn);
    let on = Pi(ze, nn);
    nn.init && di(ze, nn.init), Kr(() => {
      nn.destroy && di(ze, nn.destroy), on();
    });
  }), Yi((ze, Jr) => {
    ze._x_dataStack && (Jr._x_dataStack = ze._x_dataStack, Jr.setAttribute("data-has-alpine-state", !0));
  });
  function zl(ze) {
    return si ? Ra ? !0 : ze.hasAttribute("data-has-alpine-state") : !1;
  }
  An("show", (ze, { modifiers: Jr, expression: Kr }, { effect: en }) => {
    let tn = Pn(ze, Kr);
    ze._x_doHide || (ze._x_doHide = () => {
      Tn(() => {
        ze.style.setProperty("display", "none", Jr.includes("important") ? "important" : void 0);
      });
    }), ze._x_doShow || (ze._x_doShow = () => {
      Tn(() => {
        ze.style.length === 1 && ze.style.display === "none" ? ze.removeAttribute("style") : ze.style.removeProperty("display");
      });
    });
    let rn = () => {
      ze._x_doHide(), ze._x_isShown = !1;
    }, nn = () => {
      ze._x_doShow(), ze._x_isShown = !0;
    }, on = () => setTimeout(nn), un = Oa((_n) => _n ? nn() : rn(), (_n) => {
      typeof ze._x_toggleAndCascadeWithTransitions == "function" ? ze._x_toggleAndCascadeWithTransitions(ze, _n, nn, rn) : _n ? on() : rn();
    }), dn, vn = !0;
    en(() => tn((_n) => {
      !vn && _n === dn || (Jr.includes("immediate") && (_n ? on() : rn()), un(_n), dn = _n, vn = !1);
    }));
  }), An("for", (ze, { expression: Jr }, { effect: Kr, cleanup: en }) => {
    let tn = Wl(Jr), rn = Pn(ze, tn.items), nn = Pn(ze, ze._x_keyExpression || "index");
    ze._x_prevKeys = [], ze._x_lookup = {}, Kr(() => Vl(ze, tn, rn, nn)), en(() => {
      Object.values(ze._x_lookup).forEach((on) => on.remove()), delete ze._x_prevKeys, delete ze._x_lookup;
    });
  });
  function Vl(ze, Jr, Kr, en) {
    let tn = (nn) => typeof nn == "object" && !Array.isArray(nn), rn = ze;
    Kr((nn) => {
      Gl(nn) && nn >= 0 && (nn = Array.from(Array(nn).keys(), (gn) => gn + 1)), nn === void 0 && (nn = []);
      let on = ze._x_lookup, un = ze._x_prevKeys, dn = [], vn = [];
      if (tn(nn)) nn = Object.entries(nn).map(([gn, wn]) => {
        let Ln = to(Jr, wn, gn, nn);
        en((Nn) => {
          vn.includes(Nn) && Sn("Duplicate key on x-for", ze), vn.push(Nn);
        }, { scope: { index: gn, ...Ln } }), dn.push(Ln);
      });
      else for (let gn = 0; gn < nn.length; gn++) {
        let wn = to(Jr, nn[gn], gn, nn);
        en((Ln) => {
          vn.includes(Ln) && Sn("Duplicate key on x-for", ze), vn.push(Ln);
        }, { scope: { index: gn, ...wn } }), dn.push(wn);
      }
      let _n = [], xn = [], kn = [], ui = [];
      for (let gn = 0; gn < un.length; gn++) {
        let wn = un[gn];
        vn.indexOf(wn) === -1 && kn.push(wn);
      }
      un = un.filter((gn) => !kn.includes(gn));
      let fa = "template";
      for (let gn = 0; gn < vn.length; gn++) {
        let wn = vn[gn], Ln = un.indexOf(wn);
        if (Ln === -1) un.splice(gn, 0, wn), _n.push([fa, gn]);
        else if (Ln !== gn) {
          let Nn = un.splice(gn, 1)[0], Dn = un.splice(Ln - 1, 1)[0];
          un.splice(gn, 0, Dn), un.splice(Ln, 0, Nn), xn.push([Nn, Dn]);
        } else ui.push(wn);
        fa = wn;
      }
      for (let gn = 0; gn < kn.length; gn++) {
        let wn = kn[gn];
        on[wn]._x_effects && on[wn]._x_effects.forEach(sn), on[wn].remove(), on[wn] = null, delete on[wn];
      }
      for (let gn = 0; gn < xn.length; gn++) {
        let [wn, Ln] = xn[gn], Nn = on[wn], Dn = on[Ln], Oi = document.createElement("div");
        Tn(() => {
          Dn || Sn('x-for ":key" is undefined or invalid', rn, Ln, on), Dn.after(Oi), Nn.after(Dn), Dn._x_currentIfEl && Dn.after(Dn._x_currentIfEl), Oi.before(Nn), Nn._x_currentIfEl && Nn.after(Nn._x_currentIfEl), Oi.remove();
        }), Dn._x_refreshXForScope(dn[vn.indexOf(Ln)]);
      }
      for (let gn = 0; gn < _n.length; gn++) {
        let [wn, Ln] = _n[gn], Nn = wn === "template" ? rn : on[wn];
        Nn._x_currentIfEl && (Nn = Nn._x_currentIfEl);
        let Dn = dn[Ln], Oi = vn[Ln], Qi = document.importNode(rn.content, !0).firstElementChild, io = fn(Dn);
        Pi(Qi, io, rn), Qi._x_refreshXForScope = (Jl) => {
          Object.entries(Jl).forEach(([Kl, Zl]) => {
            io[Kl] = Zl;
          });
        }, Tn(() => {
          Nn.after(Qi), pi(() => zn(Qi))();
        }), typeof Oi == "object" && Sn("x-for key cannot be an object, it must be a string or an integer", rn), on[Oi] = Qi;
      }
      for (let gn = 0; gn < ui.length; gn++) on[ui[gn]]._x_refreshXForScope(dn[vn.indexOf(ui[gn])]);
      rn._x_prevKeys = vn;
    });
  }
  function Wl(ze) {
    let Jr = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, Kr = /^\s*\(|\)\s*$/g, en = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, tn = ze.match(en);
    if (!tn) return;
    let rn = {};
    rn.items = tn[2].trim();
    let nn = tn[1].replace(Kr, "").trim(), on = nn.match(Jr);
    return on ? (rn.item = nn.replace(Jr, "").trim(), rn.index = on[1].trim(), on[2] && (rn.collection = on[2].trim())) : rn.item = nn, rn;
  }
  function to(ze, Jr, Kr, en) {
    let tn = {};
    return /^\[.*\]$/.test(ze.item) && Array.isArray(Jr) ? ze.item.replace("[", "").replace("]", "").split(",").map((rn) => rn.trim()).forEach((rn, nn) => {
      tn[rn] = Jr[nn];
    }) : /^\{.*\}$/.test(ze.item) && !Array.isArray(Jr) && typeof Jr == "object" ? ze.item.replace("{", "").replace("}", "").split(",").map((rn) => rn.trim()).forEach((rn) => {
      tn[rn] = Jr[rn];
    }) : tn[ze.item] = Jr, ze.index && (tn[ze.index] = Kr), ze.collection && (tn[ze.collection] = en), tn;
  }
  function Gl(ze) {
    return !Array.isArray(ze) && !isNaN(ze);
  }
  function ro() {
  }
  ro.inline = (ze, { expression: Jr }, { cleanup: Kr }) => {
    let en = Qn(ze);
    en._x_refs || (en._x_refs = {}), en._x_refs[Jr] = ze, Kr(() => delete en._x_refs[Jr]);
  }, An("ref", ro), An("if", (ze, { expression: Jr }, { effect: Kr, cleanup: en }) => {
    ze.tagName.toLowerCase() !== "template" && Sn("x-if can only be used on a <template> tag", ze);
    let tn = Pn(ze, Jr), rn = () => {
      if (ze._x_currentIfEl) return ze._x_currentIfEl;
      let on = ze.content.cloneNode(!0).firstElementChild;
      return Pi(on, {}, ze), Tn(() => {
        ze.after(on), pi(() => zn(on))();
      }), ze._x_currentIfEl = on, ze._x_undoIf = () => {
        Cn(on, (un) => {
          un._x_effects && un._x_effects.forEach(sn);
        }), on.remove(), delete ze._x_currentIfEl;
      }, on;
    }, nn = () => {
      ze._x_undoIf && (ze._x_undoIf(), delete ze._x_undoIf);
    };
    Kr(() => tn((on) => {
      on ? rn() : nn();
    })), en(() => ze._x_undoIf && ze._x_undoIf());
  }), An("id", (ze, { expression: Jr }, { evaluate: Kr }) => {
    Kr(Jr).forEach((en) => Nl(ze, en));
  }), Yi((ze, Jr) => {
    ze._x_ids && (Jr._x_ids = ze._x_ids);
  }), wa(ss("@", os(Ai("on:")))), An("on", pi((ze, { value: Jr, modifiers: Kr, expression: en }, { cleanup: tn }) => {
    let rn = en ? Pn(ze, en) : () => {
    };
    ze.tagName.toLowerCase() === "template" && (ze._x_forwardEvents || (ze._x_forwardEvents = []), ze._x_forwardEvents.includes(Jr) || ze._x_forwardEvents.push(Jr));
    let nn = Qa(ze, Jr, Kr, (on) => {
      rn(() => {
      }, { scope: { $event: on }, params: [on] });
    });
    tn(() => nn());
  })), ca("Collapse", "collapse", "collapse"), ca("Intersect", "intersect", "intersect"), ca("Focus", "trap", "focus"), ca("Mask", "mask", "mask");
  function ca(ze, Jr, Kr) {
    An(Jr, (en) => Sn(`You can't use [x-${Jr}] without first installing the "${ze}" plugin here: https://alpinejs.dev/plugins/${Kr}`, en));
  }
  Fi.setEvaluator(rs), Fi.setReactivityEngine({ reactive: Fa, effect: sl, release: ol, raw: yn });
  var no = Fi;
  window.Alpine = no, queueMicrotask(() => {
    no.start();
  });
})();
(function(Qr, Wr) {
  typeof define == "function" && define.amd ? define([], Wr) : typeof module == "object" && module.exports ? module.exports = Wr() : Qr.htmx = Qr.htmx || Wr();
})(typeof self < "u" ? self : void 0, function() {
  return function() {
    var Q = { onLoad: B, process: zt, on: de, off: ge, trigger: ce, ajax: Nr, find: C, findAll: f, closest: v, values: function(Qr, Wr) {
      var Gr = dr(Qr, Wr || "post");
      return Gr.values;
    }, remove: _, addClass: z, removeClass: n, toggleClass: $, takeClass: W, defineExtension: Ur, removeExtension: Fr, logAll: V, logNone: j, logger: null, config: { historyEnabled: !0, historyCacheSize: 10, refreshOnHistoryMiss: !1, defaultSwapStyle: "innerHTML", defaultSwapDelay: 0, defaultSettleDelay: 20, includeIndicatorStyles: !0, indicatorClass: "htmx-indicator", requestClass: "htmx-request", addedClass: "htmx-added", settlingClass: "htmx-settling", swappingClass: "htmx-swapping", allowEval: !0, allowScriptTags: !0, inlineScriptNonce: "", attributesToSettle: ["class", "style", "width", "height"], withCredentials: !1, timeout: 0, wsReconnectDelay: "full-jitter", wsBinaryType: "blob", disableSelector: "[hx-disable], [data-hx-disable]", useTemplateFragments: !1, scrollBehavior: "smooth", defaultFocusScroll: !1, getCacheBusterParam: !1, globalViewTransitions: !1, methodsThatUseUrlParams: ["get"], selfRequestsOnly: !1, ignoreTitle: !1, scrollIntoViewOnBoost: !0, triggerSpecsCache: null }, parseInterval: d, _: t, createEventSource: function(Qr) {
      return new EventSource(Qr, { withCredentials: !0 });
    }, createWebSocket: function(Qr) {
      var Wr = new WebSocket(Qr, []);
      return Wr.binaryType = Q.config.wsBinaryType, Wr;
    }, version: "1.9.11" }, r = { addTriggerHandler: Lt, bodyContains: se, canAccessLocalStorage: U, findThisElement: xe, filterValues: yr, hasAttribute: o, getAttributeValue: te, getClosestAttributeValue: ne, getClosestMatch: c, getExpressionVars: Hr, getHeaders: xr, getInputValues: dr, getInternalData: ae, getSwapSpecification: wr, getTriggerSpecs: it, getTarget: ye, makeFragment: l, mergeObjects: le, makeSettleInfo: T, oobSwap: Ee, querySelectorExt: ue, selectAndSwap: je, settleImmediately: nr, shouldCancel: ut, triggerEvent: ce, triggerErrorEvent: fe, withExtensions: R }, w = ["get", "post", "put", "delete", "patch"], i = w.map(function(Qr) {
      return "[hx-" + Qr + "], [data-hx-" + Qr + "]";
    }).join(", "), S = e("head"), q = e("title"), H = e("svg", !0);
    function e(Qr, Wr = !1) {
      return new RegExp(`<${Qr}(\\s[^>]*>|>)([\\s\\S]*?)<\\/${Qr}>`, Wr ? "gim" : "im");
    }
    function d(Qr) {
      if (Qr == null)
        return;
      let Wr = NaN;
      return Qr.slice(-2) == "ms" ? Wr = parseFloat(Qr.slice(0, -2)) : Qr.slice(-1) == "s" ? Wr = parseFloat(Qr.slice(0, -1)) * 1e3 : Qr.slice(-1) == "m" ? Wr = parseFloat(Qr.slice(0, -1)) * 1e3 * 60 : Wr = parseFloat(Qr), isNaN(Wr) ? void 0 : Wr;
    }
    function ee(Qr, Wr) {
      return Qr.getAttribute && Qr.getAttribute(Wr);
    }
    function o(Qr, Wr) {
      return Qr.hasAttribute && (Qr.hasAttribute(Wr) || Qr.hasAttribute("data-" + Wr));
    }
    function te(Qr, Wr) {
      return ee(Qr, Wr) || ee(Qr, "data-" + Wr);
    }
    function u(Qr) {
      return Qr.parentElement;
    }
    function re() {
      return document;
    }
    function c(Qr, Wr) {
      for (; Qr && !Wr(Qr); )
        Qr = u(Qr);
      return Qr || null;
    }
    function L(Qr, Wr, Gr) {
      var Zr = te(Wr, Gr), Yr = te(Wr, "hx-disinherit");
      return Qr !== Wr && Yr && (Yr === "*" || Yr.split(" ").indexOf(Gr) >= 0) ? "unset" : Zr;
    }
    function ne(Qr, Wr) {
      var Gr = null;
      if (c(Qr, function(Zr) {
        return Gr = L(Qr, Zr, Wr);
      }), Gr !== "unset")
        return Gr;
    }
    function h(Qr, Wr) {
      var Gr = Qr.matches || Qr.matchesSelector || Qr.msMatchesSelector || Qr.mozMatchesSelector || Qr.webkitMatchesSelector || Qr.oMatchesSelector;
      return Gr && Gr.call(Qr, Wr);
    }
    function A(Qr) {
      var Wr = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i, Gr = Wr.exec(Qr);
      return Gr ? Gr[1].toLowerCase() : "";
    }
    function s(Qr, Wr) {
      for (var Gr = new DOMParser(), Zr = Gr.parseFromString(Qr, "text/html"), Yr = Zr.body; Wr > 0; )
        Wr--, Yr = Yr.firstChild;
      return Yr == null && (Yr = re().createDocumentFragment()), Yr;
    }
    function N(Qr) {
      return /<body/.test(Qr);
    }
    function l(Qr) {
      var Wr = !N(Qr), Gr = A(Qr), Zr = Qr;
      if (Gr === "head" && (Zr = Zr.replace(S, "")), Q.config.useTemplateFragments && Wr) {
        var Yr = s("<body><template>" + Zr + "</template></body>", 0), an = Yr.querySelector("template").content;
        return Q.config.allowScriptTags ? oe(an.querySelectorAll("script"), function(sn) {
          Q.config.inlineScriptNonce && (sn.nonce = Q.config.inlineScriptNonce), sn.htmxExecuted = navigator.userAgent.indexOf("Firefox") === -1;
        }) : oe(an.querySelectorAll("script"), function(sn) {
          _(sn);
        }), an;
      }
      switch (Gr) {
        case "thead":
        case "tbody":
        case "tfoot":
        case "colgroup":
        case "caption":
          return s("<table>" + Zr + "</table>", 1);
        case "col":
          return s("<table><colgroup>" + Zr + "</colgroup></table>", 2);
        case "tr":
          return s("<table><tbody>" + Zr + "</tbody></table>", 2);
        case "td":
        case "th":
          return s("<table><tbody><tr>" + Zr + "</tr></tbody></table>", 3);
        case "script":
        case "style":
          return s("<div>" + Zr + "</div>", 1);
        default:
          return s(Zr, 0);
      }
    }
    function ie(Qr) {
      Qr && Qr();
    }
    function I(Qr, Wr) {
      return Object.prototype.toString.call(Qr) === "[object " + Wr + "]";
    }
    function k(Qr) {
      return I(Qr, "Function");
    }
    function P(Qr) {
      return I(Qr, "Object");
    }
    function ae(Qr) {
      var Wr = "htmx-internal-data", Gr = Qr[Wr];
      return Gr || (Gr = Qr[Wr] = {}), Gr;
    }
    function M(Qr) {
      var Wr = [];
      if (Qr)
        for (var Gr = 0; Gr < Qr.length; Gr++)
          Wr.push(Qr[Gr]);
      return Wr;
    }
    function oe(Qr, Wr) {
      if (Qr)
        for (var Gr = 0; Gr < Qr.length; Gr++)
          Wr(Qr[Gr]);
    }
    function X(Qr) {
      var Wr = Qr.getBoundingClientRect(), Gr = Wr.top, Zr = Wr.bottom;
      return Gr < window.innerHeight && Zr >= 0;
    }
    function se(Qr) {
      return Qr.getRootNode && Qr.getRootNode() instanceof window.ShadowRoot ? re().body.contains(Qr.getRootNode().host) : re().body.contains(Qr);
    }
    function D(Qr) {
      return Qr.trim().split(/\s+/);
    }
    function le(Qr, Wr) {
      for (var Gr in Wr)
        Wr.hasOwnProperty(Gr) && (Qr[Gr] = Wr[Gr]);
      return Qr;
    }
    function E(Qr) {
      try {
        return JSON.parse(Qr);
      } catch (Wr) {
        return b(Wr), null;
      }
    }
    function U() {
      var Qr = "htmx:localStorageTest";
      try {
        return localStorage.setItem(Qr, Qr), localStorage.removeItem(Qr), !0;
      } catch {
        return !1;
      }
    }
    function F(Qr) {
      try {
        var Wr = new URL(Qr);
        return Wr && (Qr = Wr.pathname + Wr.search), /^\/$/.test(Qr) || (Qr = Qr.replace(/\/+$/, "")), Qr;
      } catch {
        return Qr;
      }
    }
    function t(e) {
      return Tr(re().body, function() {
        return eval(e);
      });
    }
    function B(Qr) {
      var Wr = Q.on("htmx:load", function(Gr) {
        Qr(Gr.detail.elt);
      });
      return Wr;
    }
    function V() {
      Q.logger = function(Qr, Wr, Gr) {
        console && console.log(Wr, Qr, Gr);
      };
    }
    function j() {
      Q.logger = null;
    }
    function C(Qr, Wr) {
      return Wr ? Qr.querySelector(Wr) : C(re(), Qr);
    }
    function f(Qr, Wr) {
      return Wr ? Qr.querySelectorAll(Wr) : f(re(), Qr);
    }
    function _(Qr, Wr) {
      Qr = p(Qr), Wr ? setTimeout(function() {
        _(Qr), Qr = null;
      }, Wr) : Qr.parentElement.removeChild(Qr);
    }
    function z(Qr, Wr, Gr) {
      Qr = p(Qr), Gr ? setTimeout(function() {
        z(Qr, Wr), Qr = null;
      }, Gr) : Qr.classList && Qr.classList.add(Wr);
    }
    function n(Qr, Wr, Gr) {
      Qr = p(Qr), Gr ? setTimeout(function() {
        n(Qr, Wr), Qr = null;
      }, Gr) : Qr.classList && (Qr.classList.remove(Wr), Qr.classList.length === 0 && Qr.removeAttribute("class"));
    }
    function $(Qr, Wr) {
      Qr = p(Qr), Qr.classList.toggle(Wr);
    }
    function W(Qr, Wr) {
      Qr = p(Qr), oe(Qr.parentElement.children, function(Gr) {
        n(Gr, Wr);
      }), z(Qr, Wr);
    }
    function v(Qr, Wr) {
      if (Qr = p(Qr), Qr.closest)
        return Qr.closest(Wr);
      do
        if (Qr == null || h(Qr, Wr))
          return Qr;
      while (Qr = Qr && u(Qr));
      return null;
    }
    function g(Qr, Wr) {
      return Qr.substring(0, Wr.length) === Wr;
    }
    function G(Qr, Wr) {
      return Qr.substring(Qr.length - Wr.length) === Wr;
    }
    function J(Qr) {
      var Wr = Qr.trim();
      return g(Wr, "<") && G(Wr, "/>") ? Wr.substring(1, Wr.length - 2) : Wr;
    }
    function Z(Qr, Wr) {
      return Wr.indexOf("closest ") === 0 ? [v(Qr, J(Wr.substr(8)))] : Wr.indexOf("find ") === 0 ? [C(Qr, J(Wr.substr(5)))] : Wr === "next" ? [Qr.nextElementSibling] : Wr.indexOf("next ") === 0 ? [K(Qr, J(Wr.substr(5)))] : Wr === "previous" ? [Qr.previousElementSibling] : Wr.indexOf("previous ") === 0 ? [Y(Qr, J(Wr.substr(9)))] : Wr === "document" ? [document] : Wr === "window" ? [window] : Wr === "body" ? [document.body] : re().querySelectorAll(J(Wr));
    }
    var K = function(Qr, Wr) {
      for (var Gr = re().querySelectorAll(Wr), Zr = 0; Zr < Gr.length; Zr++) {
        var Yr = Gr[Zr];
        if (Yr.compareDocumentPosition(Qr) === Node.DOCUMENT_POSITION_PRECEDING)
          return Yr;
      }
    }, Y = function(Qr, Wr) {
      for (var Gr = re().querySelectorAll(Wr), Zr = Gr.length - 1; Zr >= 0; Zr--) {
        var Yr = Gr[Zr];
        if (Yr.compareDocumentPosition(Qr) === Node.DOCUMENT_POSITION_FOLLOWING)
          return Yr;
      }
    };
    function ue(Qr, Wr) {
      return Wr ? Z(Qr, Wr)[0] : Z(re().body, Qr)[0];
    }
    function p(Qr) {
      return I(Qr, "String") ? C(Qr) : Qr;
    }
    function ve(Qr, Wr, Gr) {
      return k(Wr) ? { target: re().body, event: Qr, listener: Wr } : { target: p(Qr), event: Wr, listener: Gr };
    }
    function de(Qr, Wr, Gr) {
      jr(function() {
        var Yr = ve(Qr, Wr, Gr);
        Yr.target.addEventListener(Yr.event, Yr.listener);
      });
      var Zr = k(Wr);
      return Zr ? Wr : Gr;
    }
    function ge(Qr, Wr, Gr) {
      return jr(function() {
        var Zr = ve(Qr, Wr, Gr);
        Zr.target.removeEventListener(Zr.event, Zr.listener);
      }), k(Wr) ? Wr : Gr;
    }
    var pe = re().createElement("output");
    function me(Qr, Wr) {
      var Gr = ne(Qr, Wr);
      if (Gr) {
        if (Gr === "this")
          return [xe(Qr, Wr)];
        var Zr = Z(Qr, Gr);
        return Zr.length === 0 ? (b('The selector "' + Gr + '" on ' + Wr + " returned no matches!"), [pe]) : Zr;
      }
    }
    function xe(Qr, Wr) {
      return c(Qr, function(Gr) {
        return te(Gr, Wr) != null;
      });
    }
    function ye(Qr) {
      var Wr = ne(Qr, "hx-target");
      if (Wr)
        return Wr === "this" ? xe(Qr, "hx-target") : ue(Qr, Wr);
      var Gr = ae(Qr);
      return Gr.boosted ? re().body : Qr;
    }
    function be(Qr) {
      for (var Wr = Q.config.attributesToSettle, Gr = 0; Gr < Wr.length; Gr++)
        if (Qr === Wr[Gr])
          return !0;
      return !1;
    }
    function we(Qr, Wr) {
      oe(Qr.attributes, function(Gr) {
        !Wr.hasAttribute(Gr.name) && be(Gr.name) && Qr.removeAttribute(Gr.name);
      }), oe(Wr.attributes, function(Gr) {
        be(Gr.name) && Qr.setAttribute(Gr.name, Gr.value);
      });
    }
    function Se(Qr, Wr) {
      for (var Gr = Br(Wr), Zr = 0; Zr < Gr.length; Zr++) {
        var Yr = Gr[Zr];
        try {
          if (Yr.isInlineSwap(Qr))
            return !0;
        } catch (an) {
          b(an);
        }
      }
      return Qr === "outerHTML";
    }
    function Ee(Qr, Wr, Gr) {
      var Zr = "#" + ee(Wr, "id"), Yr = "outerHTML";
      Qr === "true" || (Qr.indexOf(":") > 0 ? (Yr = Qr.substr(0, Qr.indexOf(":")), Zr = Qr.substr(Qr.indexOf(":") + 1, Qr.length)) : Yr = Qr);
      var an = re().querySelectorAll(Zr);
      return an ? (oe(an, function(sn) {
        var ln, cn = Wr.cloneNode(!0);
        ln = re().createDocumentFragment(), ln.appendChild(cn), Se(Yr, sn) || (ln = cn);
        var fn = { shouldSwap: !0, target: sn, fragment: ln };
        ce(sn, "htmx:oobBeforeSwap", fn) && (sn = fn.target, fn.shouldSwap && Be(Yr, sn, sn, ln, Gr), oe(Gr.elts, function(hn) {
          ce(hn, "htmx:oobAfterSwap", fn);
        }));
      }), Wr.parentNode.removeChild(Wr)) : (Wr.parentNode.removeChild(Wr), fe(re().body, "htmx:oobErrorNoTarget", { content: Wr })), Qr;
    }
    function Ce(Qr, Wr, Gr) {
      var Zr = ne(Qr, "hx-select-oob");
      if (Zr)
        for (var Yr = Zr.split(","), an = 0; an < Yr.length; an++) {
          var sn = Yr[an].split(":", 2), ln = sn[0].trim();
          ln.indexOf("#") === 0 && (ln = ln.substring(1));
          var cn = sn[1] || "true", fn = Wr.querySelector("#" + ln);
          fn && Ee(cn, fn, Gr);
        }
      oe(f(Wr, "[hx-swap-oob], [data-hx-swap-oob]"), function(hn) {
        var pn = te(hn, "hx-swap-oob");
        pn != null && Ee(pn, hn, Gr);
      });
    }
    function Re(Qr) {
      oe(f(Qr, "[hx-preserve], [data-hx-preserve]"), function(Wr) {
        var Gr = te(Wr, "id"), Zr = re().getElementById(Gr);
        Zr != null && Wr.parentNode.replaceChild(Zr, Wr);
      });
    }
    function Te(Qr, Wr, Gr) {
      oe(Wr.querySelectorAll("[id]"), function(Zr) {
        var Yr = ee(Zr, "id");
        if (Yr && Yr.length > 0) {
          var an = Yr.replace("'", "\\'"), sn = Zr.tagName.replace(":", "\\:"), ln = Qr.querySelector(sn + "[id='" + an + "']");
          if (ln && ln !== Qr) {
            var cn = Zr.cloneNode();
            we(Zr, ln), Gr.tasks.push(function() {
              we(Zr, cn);
            });
          }
        }
      });
    }
    function Oe(Qr) {
      return function() {
        n(Qr, Q.config.addedClass), zt(Qr), Nt(Qr), qe(Qr), ce(Qr, "htmx:load");
      };
    }
    function qe(Qr) {
      var Wr = "[autofocus]", Gr = h(Qr, Wr) ? Qr : Qr.querySelector(Wr);
      Gr != null && Gr.focus();
    }
    function a(Qr, Wr, Gr, Zr) {
      for (Te(Qr, Gr, Zr); Gr.childNodes.length > 0; ) {
        var Yr = Gr.firstChild;
        z(Yr, Q.config.addedClass), Qr.insertBefore(Yr, Wr), Yr.nodeType !== Node.TEXT_NODE && Yr.nodeType !== Node.COMMENT_NODE && Zr.tasks.push(Oe(Yr));
      }
    }
    function He(Qr, Wr) {
      for (var Gr = 0; Gr < Qr.length; )
        Wr = (Wr << 5) - Wr + Qr.charCodeAt(Gr++) | 0;
      return Wr;
    }
    function Le(Qr) {
      var Wr = 0;
      if (Qr.attributes)
        for (var Gr = 0; Gr < Qr.attributes.length; Gr++) {
          var Zr = Qr.attributes[Gr];
          Zr.value && (Wr = He(Zr.name, Wr), Wr = He(Zr.value, Wr));
        }
      return Wr;
    }
    function Ae(Qr) {
      var Wr = ae(Qr);
      if (Wr.onHandlers) {
        for (var Gr = 0; Gr < Wr.onHandlers.length; Gr++) {
          const Zr = Wr.onHandlers[Gr];
          Qr.removeEventListener(Zr.event, Zr.listener);
        }
        delete Wr.onHandlers;
      }
    }
    function Ne(Qr) {
      var Wr = ae(Qr);
      Wr.timeout && clearTimeout(Wr.timeout), Wr.webSocket && Wr.webSocket.close(), Wr.sseEventSource && Wr.sseEventSource.close(), Wr.listenerInfos && oe(Wr.listenerInfos, function(Gr) {
        Gr.on && Gr.on.removeEventListener(Gr.trigger, Gr.listener);
      }), Ae(Qr), oe(Object.keys(Wr), function(Gr) {
        delete Wr[Gr];
      });
    }
    function m(Qr) {
      ce(Qr, "htmx:beforeCleanupElement"), Ne(Qr), Qr.children && oe(Qr.children, function(Wr) {
        m(Wr);
      });
    }
    function Ie(Qr, Wr, Gr) {
      if (Qr.tagName === "BODY")
        return Ue(Qr, Wr, Gr);
      var Zr, Yr = Qr.previousSibling;
      for (a(u(Qr), Qr, Wr, Gr), Yr == null ? Zr = u(Qr).firstChild : Zr = Yr.nextSibling, Gr.elts = Gr.elts.filter(function(an) {
        return an != Qr;
      }); Zr && Zr !== Qr; )
        Zr.nodeType === Node.ELEMENT_NODE && Gr.elts.push(Zr), Zr = Zr.nextElementSibling;
      m(Qr), u(Qr).removeChild(Qr);
    }
    function ke(Qr, Wr, Gr) {
      return a(Qr, Qr.firstChild, Wr, Gr);
    }
    function Pe(Qr, Wr, Gr) {
      return a(u(Qr), Qr, Wr, Gr);
    }
    function Me(Qr, Wr, Gr) {
      return a(Qr, null, Wr, Gr);
    }
    function Xe(Qr, Wr, Gr) {
      return a(u(Qr), Qr.nextSibling, Wr, Gr);
    }
    function De(Qr, Wr, Gr) {
      return m(Qr), u(Qr).removeChild(Qr);
    }
    function Ue(Qr, Wr, Gr) {
      var Zr = Qr.firstChild;
      if (a(Qr, Zr, Wr, Gr), Zr) {
        for (; Zr.nextSibling; )
          m(Zr.nextSibling), Qr.removeChild(Zr.nextSibling);
        m(Zr), Qr.removeChild(Zr);
      }
    }
    function Fe(Qr, Wr, Gr) {
      var Zr = Gr || ne(Qr, "hx-select");
      if (Zr) {
        var Yr = re().createDocumentFragment();
        oe(Wr.querySelectorAll(Zr), function(an) {
          Yr.appendChild(an);
        }), Wr = Yr;
      }
      return Wr;
    }
    function Be(Qr, Wr, Gr, Zr, Yr) {
      switch (Qr) {
        case "none":
          return;
        case "outerHTML":
          Ie(Gr, Zr, Yr);
          return;
        case "afterbegin":
          ke(Gr, Zr, Yr);
          return;
        case "beforebegin":
          Pe(Gr, Zr, Yr);
          return;
        case "beforeend":
          Me(Gr, Zr, Yr);
          return;
        case "afterend":
          Xe(Gr, Zr, Yr);
          return;
        case "delete":
          De(Gr);
          return;
        default:
          for (var an = Br(Wr), sn = 0; sn < an.length; sn++) {
            var ln = an[sn];
            try {
              var cn = ln.handleSwap(Qr, Gr, Zr, Yr);
              if (cn) {
                if (typeof cn.length < "u")
                  for (var fn = 0; fn < cn.length; fn++) {
                    var hn = cn[fn];
                    hn.nodeType !== Node.TEXT_NODE && hn.nodeType !== Node.COMMENT_NODE && Yr.tasks.push(Oe(hn));
                  }
                return;
              }
            } catch (pn) {
              b(pn);
            }
          }
          Qr === "innerHTML" ? Ue(Gr, Zr, Yr) : Be(Q.config.defaultSwapStyle, Wr, Gr, Zr, Yr);
      }
    }
    function Ve(Qr) {
      if (Qr.indexOf("<title") > -1) {
        var Wr = Qr.replace(H, ""), Gr = Wr.match(q);
        if (Gr)
          return Gr[2];
      }
    }
    function je(Qr, Wr, Gr, Zr, Yr, an) {
      Yr.title = Ve(Zr);
      var sn = l(Zr);
      if (sn)
        return Ce(Gr, sn, Yr), sn = Fe(Gr, sn, an), Re(sn), Be(Qr, Gr, Wr, sn, Yr);
    }
    function _e(Qr, Wr, Gr) {
      var Zr = Qr.getResponseHeader(Wr);
      if (Zr.indexOf("{") === 0) {
        var Yr = E(Zr);
        for (var an in Yr)
          if (Yr.hasOwnProperty(an)) {
            var sn = Yr[an];
            P(sn) || (sn = { value: sn }), ce(Gr, an, sn);
          }
      } else
        for (var ln = Zr.split(","), cn = 0; cn < ln.length; cn++)
          ce(Gr, ln[cn].trim(), []);
    }
    var x = /[\s,]/, $e = /[_$a-zA-Z]/, We = /[_$a-zA-Z0-9]/, Ge = ['"', "'", "/"], Je = /[^\s]/, Ze = /[{(]/, Ke = /[})]/;
    function Ye(Qr) {
      for (var Wr = [], Gr = 0; Gr < Qr.length; ) {
        if ($e.exec(Qr.charAt(Gr))) {
          for (var Zr = Gr; We.exec(Qr.charAt(Gr + 1)); )
            Gr++;
          Wr.push(Qr.substr(Zr, Gr - Zr + 1));
        } else if (Ge.indexOf(Qr.charAt(Gr)) !== -1) {
          var Yr = Qr.charAt(Gr), Zr = Gr;
          for (Gr++; Gr < Qr.length && Qr.charAt(Gr) !== Yr; )
            Qr.charAt(Gr) === "\\" && Gr++, Gr++;
          Wr.push(Qr.substr(Zr, Gr - Zr + 1));
        } else {
          var an = Qr.charAt(Gr);
          Wr.push(an);
        }
        Gr++;
      }
      return Wr;
    }
    function Qe(Qr, Wr, Gr) {
      return $e.exec(Qr.charAt(0)) && Qr !== "true" && Qr !== "false" && Qr !== "this" && Qr !== Gr && Wr !== ".";
    }
    function et(Qr, Wr, Gr) {
      if (Wr[0] === "[") {
        Wr.shift();
        for (var Zr = 1, Yr = " return (function(" + Gr + "){ return (", an = null; Wr.length > 0; ) {
          var sn = Wr[0];
          if (sn === "]") {
            if (Zr--, Zr === 0) {
              an === null && (Yr = Yr + "true"), Wr.shift(), Yr += ")})";
              try {
                var ln = Tr(Qr, function() {
                  return Function(Yr)();
                }, function() {
                  return !0;
                });
                return ln.source = Yr, ln;
              } catch (cn) {
                return fe(re().body, "htmx:syntax:error", { error: cn, source: Yr }), null;
              }
            }
          } else sn === "[" && Zr++;
          Qe(sn, an, Gr) ? Yr += "((" + Gr + "." + sn + ") ? (" + Gr + "." + sn + ") : (window." + sn + "))" : Yr = Yr + sn, an = Wr.shift();
        }
      }
    }
    function y(Qr, Wr) {
      for (var Gr = ""; Qr.length > 0 && !Wr.test(Qr[0]); )
        Gr += Qr.shift();
      return Gr;
    }
    function tt(Qr) {
      var Wr;
      return Qr.length > 0 && Ze.test(Qr[0]) ? (Qr.shift(), Wr = y(Qr, Ke).trim(), Qr.shift()) : Wr = y(Qr, x), Wr;
    }
    var rt = "input, textarea, select";
    function nt(Qr, Wr, Gr) {
      var Zr = [], Yr = Ye(Wr);
      do {
        y(Yr, Je);
        var an = Yr.length, sn = y(Yr, /[,\[\s]/);
        if (sn !== "")
          if (sn === "every") {
            var ln = { trigger: "every" };
            y(Yr, Je), ln.pollInterval = d(y(Yr, /[,\[\s]/)), y(Yr, Je);
            var cn = et(Qr, Yr, "event");
            cn && (ln.eventFilter = cn), Zr.push(ln);
          } else if (sn.indexOf("sse:") === 0)
            Zr.push({ trigger: "sse", sseEvent: sn.substr(4) });
          else {
            var fn = { trigger: sn }, cn = et(Qr, Yr, "event");
            for (cn && (fn.eventFilter = cn); Yr.length > 0 && Yr[0] !== ","; ) {
              y(Yr, Je);
              var hn = Yr.shift();
              if (hn === "changed")
                fn.changed = !0;
              else if (hn === "once")
                fn.once = !0;
              else if (hn === "consume")
                fn.consume = !0;
              else if (hn === "delay" && Yr[0] === ":")
                Yr.shift(), fn.delay = d(y(Yr, x));
              else if (hn === "from" && Yr[0] === ":") {
                if (Yr.shift(), Ze.test(Yr[0]))
                  var pn = tt(Yr);
                else {
                  var pn = y(Yr, x);
                  if (pn === "closest" || pn === "find" || pn === "next" || pn === "previous") {
                    Yr.shift();
                    var mn = tt(Yr);
                    mn.length > 0 && (pn += " " + mn);
                  }
                }
                fn.from = pn;
              } else hn === "target" && Yr[0] === ":" ? (Yr.shift(), fn.target = tt(Yr)) : hn === "throttle" && Yr[0] === ":" ? (Yr.shift(), fn.throttle = d(y(Yr, x))) : hn === "queue" && Yr[0] === ":" ? (Yr.shift(), fn.queue = y(Yr, x)) : hn === "root" && Yr[0] === ":" ? (Yr.shift(), fn[hn] = tt(Yr)) : hn === "threshold" && Yr[0] === ":" ? (Yr.shift(), fn[hn] = y(Yr, x)) : fe(Qr, "htmx:syntax:error", { token: Yr.shift() });
            }
            Zr.push(fn);
          }
        Yr.length === an && fe(Qr, "htmx:syntax:error", { token: Yr.shift() }), y(Yr, Je);
      } while (Yr[0] === "," && Yr.shift());
      return Gr && (Gr[Wr] = Zr), Zr;
    }
    function it(Qr) {
      var Wr = te(Qr, "hx-trigger"), Gr = [];
      if (Wr) {
        var Zr = Q.config.triggerSpecsCache;
        Gr = Zr && Zr[Wr] || nt(Qr, Wr, Zr);
      }
      return Gr.length > 0 ? Gr : h(Qr, "form") ? [{ trigger: "submit" }] : h(Qr, 'input[type="button"], input[type="submit"]') ? [{ trigger: "click" }] : h(Qr, rt) ? [{ trigger: "change" }] : [{ trigger: "click" }];
    }
    function at(Qr) {
      ae(Qr).cancelled = !0;
    }
    function ot(Qr, Wr, Gr) {
      var Zr = ae(Qr);
      Zr.timeout = setTimeout(function() {
        se(Qr) && Zr.cancelled !== !0 && (ct(Gr, Qr, Wt("hx:poll:trigger", { triggerSpec: Gr, target: Qr })) || Wr(Qr), ot(Qr, Wr, Gr));
      }, Gr.pollInterval);
    }
    function st(Qr) {
      return location.hostname === Qr.hostname && ee(Qr, "href") && ee(Qr, "href").indexOf("#") !== 0;
    }
    function lt(Qr, Wr, Gr) {
      if (Qr.tagName === "A" && st(Qr) && (Qr.target === "" || Qr.target === "_self") || Qr.tagName === "FORM") {
        Wr.boosted = !0;
        var Zr, Yr;
        if (Qr.tagName === "A")
          Zr = "get", Yr = ee(Qr, "href");
        else {
          var an = ee(Qr, "method");
          Zr = an ? an.toLowerCase() : "get", Yr = ee(Qr, "action");
        }
        Gr.forEach(function(sn) {
          ht(Qr, function(ln, cn) {
            if (v(ln, Q.config.disableSelector)) {
              m(ln);
              return;
            }
            he(Zr, Yr, ln, cn);
          }, Wr, sn, !0);
        });
      }
    }
    function ut(Qr, Wr) {
      return !!((Qr.type === "submit" || Qr.type === "click") && (Wr.tagName === "FORM" || h(Wr, 'input[type="submit"], button') && v(Wr, "form") !== null || Wr.tagName === "A" && Wr.href && (Wr.getAttribute("href") === "#" || Wr.getAttribute("href").indexOf("#") !== 0)));
    }
    function ft(Qr, Wr) {
      return ae(Qr).boosted && Qr.tagName === "A" && Wr.type === "click" && (Wr.ctrlKey || Wr.metaKey);
    }
    function ct(Qr, Wr, Gr) {
      var Zr = Qr.eventFilter;
      if (Zr)
        try {
          return Zr.call(Wr, Gr) !== !0;
        } catch (Yr) {
          return fe(re().body, "htmx:eventFilter:error", { error: Yr, source: Zr.source }), !0;
        }
      return !1;
    }
    function ht(Qr, Wr, Gr, Zr, Yr) {
      var an = ae(Qr), sn;
      Zr.from ? sn = Z(Qr, Zr.from) : sn = [Qr], Zr.changed && sn.forEach(function(ln) {
        var cn = ae(ln);
        cn.lastValue = ln.value;
      }), oe(sn, function(ln) {
        var cn = function(fn) {
          if (!se(Qr)) {
            ln.removeEventListener(Zr.trigger, cn);
            return;
          }
          if (!ft(Qr, fn) && ((Yr || ut(fn, Qr)) && fn.preventDefault(), !ct(Zr, Qr, fn))) {
            var hn = ae(fn);
            if (hn.triggerSpec = Zr, hn.handledFor == null && (hn.handledFor = []), hn.handledFor.indexOf(Qr) < 0) {
              if (hn.handledFor.push(Qr), Zr.consume && fn.stopPropagation(), Zr.target && fn.target && !h(fn.target, Zr.target))
                return;
              if (Zr.once) {
                if (an.triggeredOnce)
                  return;
                an.triggeredOnce = !0;
              }
              if (Zr.changed) {
                var pn = ae(ln);
                if (pn.lastValue === ln.value)
                  return;
                pn.lastValue = ln.value;
              }
              if (an.delayed && clearTimeout(an.delayed), an.throttle)
                return;
              Zr.throttle > 0 ? an.throttle || (Wr(Qr, fn), an.throttle = setTimeout(function() {
                an.throttle = null;
              }, Zr.throttle)) : Zr.delay > 0 ? an.delayed = setTimeout(function() {
                Wr(Qr, fn);
              }, Zr.delay) : (ce(Qr, "htmx:trigger"), Wr(Qr, fn));
            }
          }
        };
        Gr.listenerInfos == null && (Gr.listenerInfos = []), Gr.listenerInfos.push({ trigger: Zr.trigger, listener: cn, on: ln }), ln.addEventListener(Zr.trigger, cn);
      });
    }
    var vt = !1, dt = null;
    function gt() {
      dt || (dt = function() {
        vt = !0;
      }, window.addEventListener("scroll", dt), setInterval(function() {
        vt && (vt = !1, oe(re().querySelectorAll("[hx-trigger='revealed'],[data-hx-trigger='revealed']"), function(Qr) {
          pt(Qr);
        }));
      }, 200));
    }
    function pt(Qr) {
      if (!o(Qr, "data-hx-revealed") && X(Qr)) {
        Qr.setAttribute("data-hx-revealed", "true");
        var Wr = ae(Qr);
        Wr.initHash ? ce(Qr, "revealed") : Qr.addEventListener("htmx:afterProcessNode", function(Gr) {
          ce(Qr, "revealed");
        }, { once: !0 });
      }
    }
    function mt(Qr, Wr, Gr) {
      for (var Zr = D(Gr), Yr = 0; Yr < Zr.length; Yr++) {
        var an = Zr[Yr].split(/:(.+)/);
        an[0] === "connect" && xt(Qr, an[1], 0), an[0] === "send" && bt(Qr);
      }
    }
    function xt(Qr, Wr, Gr) {
      if (se(Qr)) {
        if (Wr.indexOf("/") == 0) {
          var Zr = location.hostname + (location.port ? ":" + location.port : "");
          location.protocol == "https:" ? Wr = "wss://" + Zr + Wr : location.protocol == "http:" && (Wr = "ws://" + Zr + Wr);
        }
        var Yr = Q.createWebSocket(Wr);
        Yr.onerror = function(an) {
          fe(Qr, "htmx:wsError", { error: an, socket: Yr }), yt(Qr);
        }, Yr.onclose = function(an) {
          if ([1006, 1012, 1013].indexOf(an.code) >= 0) {
            var sn = wt(Gr);
            setTimeout(function() {
              xt(Qr, Wr, Gr + 1);
            }, sn);
          }
        }, Yr.onopen = function(an) {
          Gr = 0;
        }, ae(Qr).webSocket = Yr, Yr.addEventListener("message", function(an) {
          if (!yt(Qr)) {
            var sn = an.data;
            R(Qr, function(mn) {
              sn = mn.transformResponse(sn, null, Qr);
            });
            for (var ln = T(Qr), cn = l(sn), fn = M(cn.children), hn = 0; hn < fn.length; hn++) {
              var pn = fn[hn];
              Ee(te(pn, "hx-swap-oob") || "true", pn, ln);
            }
            nr(ln.tasks);
          }
        });
      }
    }
    function yt(Qr) {
      if (!se(Qr))
        return ae(Qr).webSocket.close(), !0;
    }
    function bt(Qr) {
      var Wr = c(Qr, function(Gr) {
        return ae(Gr).webSocket != null;
      });
      Wr ? Qr.addEventListener(it(Qr)[0].trigger, function(Gr) {
        var Zr = ae(Wr).webSocket, Yr = xr(Qr, Wr), an = dr(Qr, "post"), sn = an.errors, ln = an.values, cn = Hr(Qr), fn = le(ln, cn), hn = yr(fn, Qr);
        if (hn.HEADERS = Yr, sn && sn.length > 0) {
          ce(Qr, "htmx:validation:halted", sn);
          return;
        }
        Zr.send(JSON.stringify(hn)), ut(Gr, Qr) && Gr.preventDefault();
      }) : fe(Qr, "htmx:noWebSocketSourceError");
    }
    function wt(Qr) {
      var Wr = Q.config.wsReconnectDelay;
      if (typeof Wr == "function")
        return Wr(Qr);
      if (Wr === "full-jitter") {
        var Gr = Math.min(Qr, 6), Zr = 1e3 * Math.pow(2, Gr);
        return Zr * Math.random();
      }
      b('htmx.config.wsReconnectDelay must either be a function or the string "full-jitter"');
    }
    function St(Qr, Wr, Gr) {
      for (var Zr = D(Gr), Yr = 0; Yr < Zr.length; Yr++) {
        var an = Zr[Yr].split(/:(.+)/);
        an[0] === "connect" && Et(Qr, an[1]), an[0] === "swap" && Ct(Qr, an[1]);
      }
    }
    function Et(Qr, Wr) {
      var Gr = Q.createEventSource(Wr);
      Gr.onerror = function(Zr) {
        fe(Qr, "htmx:sseError", { error: Zr, source: Gr }), Tt(Qr);
      }, ae(Qr).sseEventSource = Gr;
    }
    function Ct(Qr, Wr) {
      var Gr = c(Qr, Ot);
      if (Gr) {
        var Zr = ae(Gr).sseEventSource, Yr = function(an) {
          if (!Tt(Gr)) {
            if (!se(Qr)) {
              Zr.removeEventListener(Wr, Yr);
              return;
            }
            var sn = an.data;
            R(Qr, function(hn) {
              sn = hn.transformResponse(sn, null, Qr);
            });
            var ln = wr(Qr), cn = ye(Qr), fn = T(Qr);
            je(ln.swapStyle, cn, Qr, sn, fn), nr(fn.tasks), ce(Qr, "htmx:sseMessage", an);
          }
        };
        ae(Qr).sseListener = Yr, Zr.addEventListener(Wr, Yr);
      } else
        fe(Qr, "htmx:noSSESourceError");
    }
    function Rt(Qr, Wr, Gr) {
      var Zr = c(Qr, Ot);
      if (Zr) {
        var Yr = ae(Zr).sseEventSource, an = function() {
          Tt(Zr) || (se(Qr) ? Wr(Qr) : Yr.removeEventListener(Gr, an));
        };
        ae(Qr).sseListener = an, Yr.addEventListener(Gr, an);
      } else
        fe(Qr, "htmx:noSSESourceError");
    }
    function Tt(Qr) {
      if (!se(Qr))
        return ae(Qr).sseEventSource.close(), !0;
    }
    function Ot(Qr) {
      return ae(Qr).sseEventSource != null;
    }
    function qt(Qr, Wr, Gr, Zr) {
      var Yr = function() {
        Gr.loaded || (Gr.loaded = !0, Wr(Qr));
      };
      Zr > 0 ? setTimeout(Yr, Zr) : Yr();
    }
    function Ht(Qr, Wr, Gr) {
      var Zr = !1;
      return oe(w, function(Yr) {
        if (o(Qr, "hx-" + Yr)) {
          var an = te(Qr, "hx-" + Yr);
          Zr = !0, Wr.path = an, Wr.verb = Yr, Gr.forEach(function(sn) {
            Lt(Qr, sn, Wr, function(ln, cn) {
              if (v(ln, Q.config.disableSelector)) {
                m(ln);
                return;
              }
              he(Yr, an, ln, cn);
            });
          });
        }
      }), Zr;
    }
    function Lt(Qr, Wr, Gr, Zr) {
      if (Wr.sseEvent)
        Rt(Qr, Zr, Wr.sseEvent);
      else if (Wr.trigger === "revealed")
        gt(), ht(Qr, Zr, Gr, Wr), pt(Qr);
      else if (Wr.trigger === "intersect") {
        var Yr = {};
        Wr.root && (Yr.root = ue(Qr, Wr.root)), Wr.threshold && (Yr.threshold = parseFloat(Wr.threshold));
        var an = new IntersectionObserver(function(sn) {
          for (var ln = 0; ln < sn.length; ln++) {
            var cn = sn[ln];
            if (cn.isIntersecting) {
              ce(Qr, "intersect");
              break;
            }
          }
        }, Yr);
        an.observe(Qr), ht(Qr, Zr, Gr, Wr);
      } else Wr.trigger === "load" ? ct(Wr, Qr, Wt("load", { elt: Qr })) || qt(Qr, Zr, Gr, Wr.delay) : Wr.pollInterval > 0 ? (Gr.polling = !0, ot(Qr, Zr, Wr)) : ht(Qr, Zr, Gr, Wr);
    }
    function At(Qr) {
      if (!Qr.htmxExecuted && Q.config.allowScriptTags && (Qr.type === "text/javascript" || Qr.type === "module" || Qr.type === "")) {
        var Wr = re().createElement("script");
        oe(Qr.attributes, function(Zr) {
          Wr.setAttribute(Zr.name, Zr.value);
        }), Wr.textContent = Qr.textContent, Wr.async = !1, Q.config.inlineScriptNonce && (Wr.nonce = Q.config.inlineScriptNonce);
        var Gr = Qr.parentElement;
        try {
          Gr.insertBefore(Wr, Qr);
        } catch (Zr) {
          b(Zr);
        } finally {
          Qr.parentElement && Qr.parentElement.removeChild(Qr);
        }
      }
    }
    function Nt(Qr) {
      h(Qr, "script") && At(Qr), oe(f(Qr, "script"), function(Wr) {
        At(Wr);
      });
    }
    function It(Qr) {
      for (var Wr = Qr.attributes, Gr = 0; Gr < Wr.length; Gr++) {
        var Zr = Wr[Gr].name;
        if (g(Zr, "hx-on:") || g(Zr, "data-hx-on:") || g(Zr, "hx-on-") || g(Zr, "data-hx-on-"))
          return !0;
      }
      return !1;
    }
    function kt(Qr) {
      var Wr = null, Gr = [];
      if (It(Qr) && Gr.push(Qr), document.evaluate)
        for (var Zr = document.evaluate('.//*[@*[ starts-with(name(), "hx-on:") or starts-with(name(), "data-hx-on:") or starts-with(name(), "hx-on-") or starts-with(name(), "data-hx-on-") ]]', Qr); Wr = Zr.iterateNext(); ) Gr.push(Wr);
      else
        for (var Yr = Qr.getElementsByTagName("*"), an = 0; an < Yr.length; an++)
          It(Yr[an]) && Gr.push(Yr[an]);
      return Gr;
    }
    function Pt(Qr) {
      if (Qr.querySelectorAll) {
        var Wr = ", [hx-boost] a, [data-hx-boost] a, a[hx-boost], a[data-hx-boost]", Gr = Qr.querySelectorAll(i + Wr + ", form, [type='submit'], [hx-sse], [data-hx-sse], [hx-ws], [data-hx-ws], [hx-ext], [data-hx-ext], [hx-trigger], [data-hx-trigger], [hx-on], [data-hx-on]");
        return Gr;
      } else
        return [];
    }
    function Mt(Qr) {
      var Wr = v(Qr.target, "button, input[type='submit']"), Gr = Dt(Qr);
      Gr && (Gr.lastButtonClicked = Wr);
    }
    function Xt(Qr) {
      var Wr = Dt(Qr);
      Wr && (Wr.lastButtonClicked = null);
    }
    function Dt(Qr) {
      var Wr = v(Qr.target, "button, input[type='submit']");
      if (Wr) {
        var Gr = p("#" + ee(Wr, "form")) || v(Wr, "form");
        if (Gr)
          return ae(Gr);
      }
    }
    function Ut(Qr) {
      Qr.addEventListener("click", Mt), Qr.addEventListener("focusin", Mt), Qr.addEventListener("focusout", Xt);
    }
    function Ft(Qr) {
      for (var Wr = Ye(Qr), Gr = 0, Zr = 0; Zr < Wr.length; Zr++) {
        const Yr = Wr[Zr];
        Yr === "{" ? Gr++ : Yr === "}" && Gr--;
      }
      return Gr;
    }
    function Bt(Qr, Wr, Gr) {
      var Zr = ae(Qr);
      Array.isArray(Zr.onHandlers) || (Zr.onHandlers = []);
      var Yr, an = function(sn) {
        return Tr(Qr, function() {
          Yr || (Yr = new Function("event", Gr)), Yr.call(Qr, sn);
        });
      };
      Qr.addEventListener(Wr, an), Zr.onHandlers.push({ event: Wr, listener: an });
    }
    function Vt(Qr) {
      var Wr = te(Qr, "hx-on");
      if (Wr) {
        for (var Gr = {}, Zr = Wr.split(`
`), Yr = null, an = 0; Zr.length > 0; ) {
          var sn = Zr.shift(), ln = sn.match(/^\s*([a-zA-Z:\-\.]+:)(.*)/);
          an === 0 && ln ? (sn.split(":"), Yr = ln[1].slice(0, -1), Gr[Yr] = ln[2]) : Gr[Yr] += sn, an += Ft(sn);
        }
        for (var cn in Gr)
          Bt(Qr, cn, Gr[cn]);
      }
    }
    function jt(Qr) {
      Ae(Qr);
      for (var Wr = 0; Wr < Qr.attributes.length; Wr++) {
        var Gr = Qr.attributes[Wr].name, Zr = Qr.attributes[Wr].value;
        if (g(Gr, "hx-on") || g(Gr, "data-hx-on")) {
          var Yr = Gr.indexOf("-on") + 3, an = Gr.slice(Yr, Yr + 1);
          if (an === "-" || an === ":") {
            var sn = Gr.slice(Yr + 1);
            g(sn, ":") ? sn = "htmx" + sn : g(sn, "-") ? sn = "htmx:" + sn.slice(1) : g(sn, "htmx-") && (sn = "htmx:" + sn.slice(5)), Bt(Qr, sn, Zr);
          }
        }
      }
    }
    function _t(Qr) {
      if (v(Qr, Q.config.disableSelector)) {
        m(Qr);
        return;
      }
      var Wr = ae(Qr);
      if (Wr.initHash !== Le(Qr)) {
        Ne(Qr), Wr.initHash = Le(Qr), Vt(Qr), ce(Qr, "htmx:beforeProcessNode"), Qr.value && (Wr.lastValue = Qr.value);
        var Gr = it(Qr), Zr = Ht(Qr, Wr, Gr);
        Zr || (ne(Qr, "hx-boost") === "true" ? lt(Qr, Wr, Gr) : o(Qr, "hx-trigger") && Gr.forEach(function(sn) {
          Lt(Qr, sn, Wr, function() {
          });
        })), (Qr.tagName === "FORM" || ee(Qr, "type") === "submit" && o(Qr, "form")) && Ut(Qr);
        var Yr = te(Qr, "hx-sse");
        Yr && St(Qr, Wr, Yr);
        var an = te(Qr, "hx-ws");
        an && mt(Qr, Wr, an), ce(Qr, "htmx:afterProcessNode");
      }
    }
    function zt(Qr) {
      if (Qr = p(Qr), v(Qr, Q.config.disableSelector)) {
        m(Qr);
        return;
      }
      _t(Qr), oe(Pt(Qr), function(Wr) {
        _t(Wr);
      }), oe(kt(Qr), jt);
    }
    function $t(Qr) {
      return Qr.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
    }
    function Wt(Qr, Wr) {
      var Gr;
      return window.CustomEvent && typeof window.CustomEvent == "function" ? Gr = new CustomEvent(Qr, { bubbles: !0, cancelable: !0, detail: Wr }) : (Gr = re().createEvent("CustomEvent"), Gr.initCustomEvent(Qr, !0, !0, Wr)), Gr;
    }
    function fe(Qr, Wr, Gr) {
      ce(Qr, Wr, le({ error: Wr }, Gr));
    }
    function Gt(Qr) {
      return Qr === "htmx:afterProcessNode";
    }
    function R(Qr, Wr) {
      oe(Br(Qr), function(Gr) {
        try {
          Wr(Gr);
        } catch (Zr) {
          b(Zr);
        }
      });
    }
    function b(Qr) {
      console.error ? console.error(Qr) : console.log && console.log("ERROR: ", Qr);
    }
    function ce(Qr, Wr, Gr) {
      Qr = p(Qr), Gr == null && (Gr = {}), Gr.elt = Qr;
      var Zr = Wt(Wr, Gr);
      Q.logger && !Gt(Wr) && Q.logger(Qr, Wr, Gr), Gr.error && (b(Gr.error), ce(Qr, "htmx:error", { errorInfo: Gr }));
      var Yr = Qr.dispatchEvent(Zr), an = $t(Wr);
      if (Yr && an !== Wr) {
        var sn = Wt(an, Zr.detail);
        Yr = Yr && Qr.dispatchEvent(sn);
      }
      return R(Qr, function(ln) {
        Yr = Yr && ln.onEvent(Wr, Zr) !== !1 && !Zr.defaultPrevented;
      }), Yr;
    }
    var Jt = location.pathname + location.search;
    function Zt() {
      var Qr = re().querySelector("[hx-history-elt],[data-hx-history-elt]");
      return Qr || re().body;
    }
    function Kt(Qr, Wr, Gr, Zr) {
      if (U()) {
        if (Q.config.historyCacheSize <= 0) {
          localStorage.removeItem("htmx-history-cache");
          return;
        }
        Qr = F(Qr);
        for (var Yr = E(localStorage.getItem("htmx-history-cache")) || [], an = 0; an < Yr.length; an++)
          if (Yr[an].url === Qr) {
            Yr.splice(an, 1);
            break;
          }
        var sn = { url: Qr, content: Wr, title: Gr, scroll: Zr };
        for (ce(re().body, "htmx:historyItemCreated", { item: sn, cache: Yr }), Yr.push(sn); Yr.length > Q.config.historyCacheSize; )
          Yr.shift();
        for (; Yr.length > 0; )
          try {
            localStorage.setItem("htmx-history-cache", JSON.stringify(Yr));
            break;
          } catch (ln) {
            fe(re().body, "htmx:historyCacheError", { cause: ln, cache: Yr }), Yr.shift();
          }
      }
    }
    function Yt(Qr) {
      if (!U())
        return null;
      Qr = F(Qr);
      for (var Wr = E(localStorage.getItem("htmx-history-cache")) || [], Gr = 0; Gr < Wr.length; Gr++)
        if (Wr[Gr].url === Qr)
          return Wr[Gr];
      return null;
    }
    function Qt(Qr) {
      var Wr = Q.config.requestClass, Gr = Qr.cloneNode(!0);
      return oe(f(Gr, "." + Wr), function(Zr) {
        n(Zr, Wr);
      }), Gr.innerHTML;
    }
    function er() {
      var Qr = Zt(), Wr = Jt || location.pathname + location.search, Gr;
      try {
        Gr = re().querySelector('[hx-history="false" i],[data-hx-history="false" i]');
      } catch {
        Gr = re().querySelector('[hx-history="false"],[data-hx-history="false"]');
      }
      Gr || (ce(re().body, "htmx:beforeHistorySave", { path: Wr, historyElt: Qr }), Kt(Wr, Qt(Qr), re().title, window.scrollY)), Q.config.historyEnabled && history.replaceState({ htmx: !0 }, re().title, window.location.href);
    }
    function tr(Qr) {
      Q.config.getCacheBusterParam && (Qr = Qr.replace(/org\.htmx\.cache-buster=[^&]*&?/, ""), (G(Qr, "&") || G(Qr, "?")) && (Qr = Qr.slice(0, -1))), Q.config.historyEnabled && history.pushState({ htmx: !0 }, "", Qr), Jt = Qr;
    }
    function rr(Qr) {
      Q.config.historyEnabled && history.replaceState({ htmx: !0 }, "", Qr), Jt = Qr;
    }
    function nr(Qr) {
      oe(Qr, function(Wr) {
        Wr.call();
      });
    }
    function ir(Qr) {
      var Wr = new XMLHttpRequest(), Gr = { path: Qr, xhr: Wr };
      ce(re().body, "htmx:historyCacheMiss", Gr), Wr.open("GET", Qr, !0), Wr.setRequestHeader("HX-Request", "true"), Wr.setRequestHeader("HX-History-Restore-Request", "true"), Wr.setRequestHeader("HX-Current-URL", re().location.href), Wr.onload = function() {
        if (this.status >= 200 && this.status < 400) {
          ce(re().body, "htmx:historyCacheMissLoad", Gr);
          var Zr = l(this.response);
          Zr = Zr.querySelector("[hx-history-elt],[data-hx-history-elt]") || Zr;
          var Yr = Zt(), an = T(Yr), sn = Ve(this.response);
          if (sn) {
            var ln = C("title");
            ln ? ln.innerHTML = sn : window.document.title = sn;
          }
          Ue(Yr, Zr, an), nr(an.tasks), Jt = Qr, ce(re().body, "htmx:historyRestore", { path: Qr, cacheMiss: !0, serverResponse: this.response });
        } else
          fe(re().body, "htmx:historyCacheMissLoadError", Gr);
      }, Wr.send();
    }
    function ar(Qr) {
      er(), Qr = Qr || location.pathname + location.search;
      var Wr = Yt(Qr);
      if (Wr) {
        var Gr = l(Wr.content), Zr = Zt(), Yr = T(Zr);
        Ue(Zr, Gr, Yr), nr(Yr.tasks), document.title = Wr.title, setTimeout(function() {
          window.scrollTo(0, Wr.scroll);
        }, 0), Jt = Qr, ce(re().body, "htmx:historyRestore", { path: Qr, item: Wr });
      } else
        Q.config.refreshOnHistoryMiss ? window.location.reload(!0) : ir(Qr);
    }
    function or(Qr) {
      var Wr = me(Qr, "hx-indicator");
      return Wr == null && (Wr = [Qr]), oe(Wr, function(Gr) {
        var Zr = ae(Gr);
        Zr.requestCount = (Zr.requestCount || 0) + 1, Gr.classList.add.call(Gr.classList, Q.config.requestClass);
      }), Wr;
    }
    function sr(Qr) {
      var Wr = me(Qr, "hx-disabled-elt");
      return Wr == null && (Wr = []), oe(Wr, function(Gr) {
        var Zr = ae(Gr);
        Zr.requestCount = (Zr.requestCount || 0) + 1, Gr.setAttribute("disabled", "");
      }), Wr;
    }
    function lr(Qr, Wr) {
      oe(Qr, function(Gr) {
        var Zr = ae(Gr);
        Zr.requestCount = (Zr.requestCount || 0) - 1, Zr.requestCount === 0 && Gr.classList.remove.call(Gr.classList, Q.config.requestClass);
      }), oe(Wr, function(Gr) {
        var Zr = ae(Gr);
        Zr.requestCount = (Zr.requestCount || 0) - 1, Zr.requestCount === 0 && Gr.removeAttribute("disabled");
      });
    }
    function ur(Qr, Wr) {
      for (var Gr = 0; Gr < Qr.length; Gr++) {
        var Zr = Qr[Gr];
        if (Zr.isSameNode(Wr))
          return !0;
      }
      return !1;
    }
    function fr(Qr) {
      return Qr.name === "" || Qr.name == null || Qr.disabled || v(Qr, "fieldset[disabled]") || Qr.type === "button" || Qr.type === "submit" || Qr.tagName === "image" || Qr.tagName === "reset" || Qr.tagName === "file" ? !1 : Qr.type === "checkbox" || Qr.type === "radio" ? Qr.checked : !0;
    }
    function cr(Qr, Wr, Gr) {
      if (Qr != null && Wr != null) {
        var Zr = Gr[Qr];
        Zr === void 0 ? Gr[Qr] = Wr : Array.isArray(Zr) ? Array.isArray(Wr) ? Gr[Qr] = Zr.concat(Wr) : Zr.push(Wr) : Array.isArray(Wr) ? Gr[Qr] = [Zr].concat(Wr) : Gr[Qr] = [Zr, Wr];
      }
    }
    function hr(Qr, Wr, Gr, Zr, Yr) {
      if (!(Zr == null || ur(Qr, Zr))) {
        if (Qr.push(Zr), fr(Zr)) {
          var an = ee(Zr, "name"), sn = Zr.value;
          Zr.multiple && Zr.tagName === "SELECT" && (sn = M(Zr.querySelectorAll("option:checked")).map(function(cn) {
            return cn.value;
          })), Zr.files && (sn = M(Zr.files)), cr(an, sn, Wr), Yr && vr(Zr, Gr);
        }
        if (h(Zr, "form")) {
          var ln = Zr.elements;
          oe(ln, function(cn) {
            hr(Qr, Wr, Gr, cn, Yr);
          });
        }
      }
    }
    function vr(Qr, Wr) {
      Qr.willValidate && (ce(Qr, "htmx:validation:validate"), Qr.checkValidity() || (Wr.push({ elt: Qr, message: Qr.validationMessage, validity: Qr.validity }), ce(Qr, "htmx:validation:failed", { message: Qr.validationMessage, validity: Qr.validity })));
    }
    function dr(Qr, Wr) {
      var Gr = [], Zr = {}, Yr = {}, an = [], sn = ae(Qr);
      sn.lastButtonClicked && !se(sn.lastButtonClicked) && (sn.lastButtonClicked = null);
      var ln = h(Qr, "form") && Qr.noValidate !== !0 || te(Qr, "hx-validate") === "true";
      if (sn.lastButtonClicked && (ln = ln && sn.lastButtonClicked.formNoValidate !== !0), Wr !== "get" && hr(Gr, Yr, an, v(Qr, "form"), ln), hr(Gr, Zr, an, Qr, ln), sn.lastButtonClicked || Qr.tagName === "BUTTON" || Qr.tagName === "INPUT" && ee(Qr, "type") === "submit") {
        var cn = sn.lastButtonClicked || Qr, fn = ee(cn, "name");
        cr(fn, cn.value, Yr);
      }
      var hn = me(Qr, "hx-include");
      return oe(hn, function(pn) {
        hr(Gr, Zr, an, pn, ln), h(pn, "form") || oe(pn.querySelectorAll(rt), function(mn) {
          hr(Gr, Zr, an, mn, ln);
        });
      }), Zr = le(Zr, Yr), { errors: an, values: Zr };
    }
    function gr(Qr, Wr, Gr) {
      Qr !== "" && (Qr += "&"), String(Gr) === "[object Object]" && (Gr = JSON.stringify(Gr));
      var Zr = encodeURIComponent(Gr);
      return Qr += encodeURIComponent(Wr) + "=" + Zr, Qr;
    }
    function pr(Qr) {
      var Wr = "";
      for (var Gr in Qr)
        if (Qr.hasOwnProperty(Gr)) {
          var Zr = Qr[Gr];
          Array.isArray(Zr) ? oe(Zr, function(Yr) {
            Wr = gr(Wr, Gr, Yr);
          }) : Wr = gr(Wr, Gr, Zr);
        }
      return Wr;
    }
    function mr(Qr) {
      var Wr = new FormData();
      for (var Gr in Qr)
        if (Qr.hasOwnProperty(Gr)) {
          var Zr = Qr[Gr];
          Array.isArray(Zr) ? oe(Zr, function(Yr) {
            Wr.append(Gr, Yr);
          }) : Wr.append(Gr, Zr);
        }
      return Wr;
    }
    function xr(Qr, Wr, Gr) {
      var Zr = { "HX-Request": "true", "HX-Trigger": ee(Qr, "id"), "HX-Trigger-Name": ee(Qr, "name"), "HX-Target": te(Wr, "id"), "HX-Current-URL": re().location.href };
      return Rr(Qr, "hx-headers", !1, Zr), Gr !== void 0 && (Zr["HX-Prompt"] = Gr), ae(Qr).boosted && (Zr["HX-Boosted"] = "true"), Zr;
    }
    function yr(Qr, Wr) {
      var Gr = ne(Wr, "hx-params");
      if (Gr) {
        if (Gr === "none")
          return {};
        if (Gr === "*")
          return Qr;
        if (Gr.indexOf("not ") === 0)
          return oe(Gr.substr(4).split(","), function(Yr) {
            Yr = Yr.trim(), delete Qr[Yr];
          }), Qr;
        var Zr = {};
        return oe(Gr.split(","), function(Yr) {
          Yr = Yr.trim(), Zr[Yr] = Qr[Yr];
        }), Zr;
      } else
        return Qr;
    }
    function br(Qr) {
      return ee(Qr, "href") && ee(Qr, "href").indexOf("#") >= 0;
    }
    function wr(Qr, Wr) {
      var Gr = Wr || ne(Qr, "hx-swap"), Zr = { swapStyle: ae(Qr).boosted ? "innerHTML" : Q.config.defaultSwapStyle, swapDelay: Q.config.defaultSwapDelay, settleDelay: Q.config.defaultSettleDelay };
      if (Q.config.scrollIntoViewOnBoost && ae(Qr).boosted && !br(Qr) && (Zr.show = "top"), Gr) {
        var Yr = D(Gr);
        if (Yr.length > 0)
          for (var an = 0; an < Yr.length; an++) {
            var sn = Yr[an];
            if (sn.indexOf("swap:") === 0)
              Zr.swapDelay = d(sn.substr(5));
            else if (sn.indexOf("settle:") === 0)
              Zr.settleDelay = d(sn.substr(7));
            else if (sn.indexOf("transition:") === 0)
              Zr.transition = sn.substr(11) === "true";
            else if (sn.indexOf("ignoreTitle:") === 0)
              Zr.ignoreTitle = sn.substr(12) === "true";
            else if (sn.indexOf("scroll:") === 0) {
              var ln = sn.substr(7), cn = ln.split(":"), fn = cn.pop(), hn = cn.length > 0 ? cn.join(":") : null;
              Zr.scroll = fn, Zr.scrollTarget = hn;
            } else if (sn.indexOf("show:") === 0) {
              var pn = sn.substr(5), cn = pn.split(":"), mn = cn.pop(), hn = cn.length > 0 ? cn.join(":") : null;
              Zr.show = mn, Zr.showTarget = hn;
            } else if (sn.indexOf("focus-scroll:") === 0) {
              var Hn = sn.substr(13);
              Zr.focusScroll = Hn == "true";
            } else an == 0 ? Zr.swapStyle = sn : b("Unknown modifier in hx-swap: " + sn);
          }
      }
      return Zr;
    }
    function Sr(Qr) {
      return ne(Qr, "hx-encoding") === "multipart/form-data" || h(Qr, "form") && ee(Qr, "enctype") === "multipart/form-data";
    }
    function Er(Qr, Wr, Gr) {
      var Zr = null;
      return R(Wr, function(Yr) {
        Zr == null && (Zr = Yr.encodeParameters(Qr, Gr, Wr));
      }), Zr ?? (Sr(Wr) ? mr(Gr) : pr(Gr));
    }
    function T(Qr) {
      return { tasks: [], elts: [Qr] };
    }
    function Cr(Qr, Wr) {
      var Gr = Qr[0], Zr = Qr[Qr.length - 1];
      if (Wr.scroll) {
        var Yr = null;
        Wr.scrollTarget && (Yr = ue(Gr, Wr.scrollTarget)), Wr.scroll === "top" && (Gr || Yr) && (Yr = Yr || Gr, Yr.scrollTop = 0), Wr.scroll === "bottom" && (Zr || Yr) && (Yr = Yr || Zr, Yr.scrollTop = Yr.scrollHeight);
      }
      if (Wr.show) {
        var Yr = null;
        if (Wr.showTarget) {
          var an = Wr.showTarget;
          Wr.showTarget === "window" && (an = "body"), Yr = ue(Gr, an);
        }
        Wr.show === "top" && (Gr || Yr) && (Yr = Yr || Gr, Yr.scrollIntoView({ block: "start", behavior: Q.config.scrollBehavior })), Wr.show === "bottom" && (Zr || Yr) && (Yr = Yr || Zr, Yr.scrollIntoView({ block: "end", behavior: Q.config.scrollBehavior }));
      }
    }
    function Rr(Qr, Wr, Gr, Zr) {
      if (Zr == null && (Zr = {}), Qr == null)
        return Zr;
      var Yr = te(Qr, Wr);
      if (Yr) {
        var an = Yr.trim(), sn = Gr;
        if (an === "unset")
          return null;
        an.indexOf("javascript:") === 0 ? (an = an.substr(11), sn = !0) : an.indexOf("js:") === 0 && (an = an.substr(3), sn = !0), an.indexOf("{") !== 0 && (an = "{" + an + "}");
        var ln;
        sn ? ln = Tr(Qr, function() {
          return Function("return (" + an + ")")();
        }, {}) : ln = E(an);
        for (var cn in ln)
          ln.hasOwnProperty(cn) && Zr[cn] == null && (Zr[cn] = ln[cn]);
      }
      return Rr(u(Qr), Wr, Gr, Zr);
    }
    function Tr(Qr, Wr, Gr) {
      return Q.config.allowEval ? Wr() : (fe(Qr, "htmx:evalDisallowedError"), Gr);
    }
    function Or(Qr, Wr) {
      return Rr(Qr, "hx-vars", !0, Wr);
    }
    function qr(Qr, Wr) {
      return Rr(Qr, "hx-vals", !1, Wr);
    }
    function Hr(Qr) {
      return le(Or(Qr), qr(Qr));
    }
    function Lr(Qr, Wr, Gr) {
      if (Gr !== null)
        try {
          Qr.setRequestHeader(Wr, Gr);
        } catch {
          Qr.setRequestHeader(Wr, encodeURIComponent(Gr)), Qr.setRequestHeader(Wr + "-URI-AutoEncoded", "true");
        }
    }
    function Ar(Qr) {
      if (Qr.responseURL && typeof URL < "u")
        try {
          var Wr = new URL(Qr.responseURL);
          return Wr.pathname + Wr.search;
        } catch {
          fe(re().body, "htmx:badResponseUrl", { url: Qr.responseURL });
        }
    }
    function O(Qr, Wr) {
      return Wr.test(Qr.getAllResponseHeaders());
    }
    function Nr(Qr, Wr, Gr) {
      return Qr = Qr.toLowerCase(), Gr ? Gr instanceof Element || I(Gr, "String") ? he(Qr, Wr, null, null, { targetOverride: p(Gr), returnPromise: !0 }) : he(Qr, Wr, p(Gr.source), Gr.event, { handler: Gr.handler, headers: Gr.headers, values: Gr.values, targetOverride: p(Gr.target), swapOverride: Gr.swap, select: Gr.select, returnPromise: !0 }) : he(Qr, Wr, null, null, { returnPromise: !0 });
    }
    function Ir(Qr) {
      for (var Wr = []; Qr; )
        Wr.push(Qr), Qr = Qr.parentElement;
      return Wr;
    }
    function kr(Qr, Wr, Gr) {
      var Zr, Yr;
      if (typeof URL == "function") {
        Yr = new URL(Wr, document.location.href);
        var an = document.location.origin;
        Zr = an === Yr.origin;
      } else
        Yr = Wr, Zr = g(Wr, document.location.origin);
      return Q.config.selfRequestsOnly && !Zr ? !1 : ce(Qr, "htmx:validateUrl", le({ url: Yr, sameHost: Zr }, Gr));
    }
    function he(Qr, Wr, Gr, Zr, Yr, an) {
      var sn = null, ln = null;
      if (Yr = Yr ?? {}, Yr.returnPromise && typeof Promise < "u")
        var cn = new Promise(function(qn, Fn) {
          sn = qn, ln = Fn;
        });
      Gr == null && (Gr = re().body);
      var fn = Yr.handler || Mr, hn = Yr.select || null;
      if (!se(Gr))
        return ie(sn), cn;
      var pn = Yr.targetOverride || ye(Gr);
      if (pn == null || pn == pe)
        return fe(Gr, "htmx:targetError", { target: te(Gr, "hx-target") }), ie(ln), cn;
      var mn = ae(Gr), Hn = mn.lastButtonClicked;
      if (Hn) {
        var Un = ee(Hn, "formaction");
        Un != null && (Wr = Un);
        var ri = ee(Hn, "formmethod");
        ri != null && ri.toLowerCase() !== "dialog" && (Qr = ri);
      }
      var Yn = ne(Gr, "hx-confirm");
      if (an === void 0) {
        var bi = function(qn) {
          return he(Qr, Wr, Gr, Zr, Yr, !!qn);
        }, ei = { target: pn, elt: Gr, path: Wr, verb: Qr, triggeringEvent: Zr, etc: Yr, issueRequest: bi, question: Yn };
        if (ce(Gr, "htmx:confirm", ei) === !1)
          return ie(sn), cn;
      }
      var Bn = Gr, Cn = ne(Gr, "hx-sync"), Sn = null, Ri = !1;
      if (Cn) {
        var $n = Cn.split(":"), Rn = $n[0].trim();
        if (Rn === "this" ? Bn = xe(Gr, "hx-sync") : Bn = ue(Gr, Rn), Cn = ($n[1] || "drop").trim(), mn = ae(Bn), Cn === "drop" && mn.xhr && mn.abortable !== !0)
          return ie(sn), cn;
        if (Cn === "abort") {
          if (mn.xhr)
            return ie(sn), cn;
          Ri = !0;
        } else if (Cn === "replace")
          ce(Bn, "htmx:abort");
        else if (Cn.indexOf("queue") === 0) {
          var ni = Cn.split(" ");
          Sn = (ni[1] || "last").trim();
        }
      }
      if (mn.xhr)
        if (mn.abortable)
          ce(Bn, "htmx:abort");
        else {
          if (Sn == null) {
            if (Zr) {
              var Mn = ae(Zr);
              Mn && Mn.triggerSpec && Mn.triggerSpec.queue && (Sn = Mn.triggerSpec.queue);
            }
            Sn == null && (Sn = "last");
          }
          return mn.queuedRequests == null && (mn.queuedRequests = []), Sn === "first" && mn.queuedRequests.length === 0 ? mn.queuedRequests.push(function() {
            he(Qr, Wr, Gr, Zr, Yr);
          }) : Sn === "all" ? mn.queuedRequests.push(function() {
            he(Qr, Wr, Gr, Zr, Yr);
          }) : Sn === "last" && (mn.queuedRequests = [], mn.queuedRequests.push(function() {
            he(Qr, Wr, Gr, Zr, Yr);
          })), ie(sn), cn;
        }
      var En = new XMLHttpRequest();
      mn.xhr = En, mn.abortable = Ri;
      var jn = function() {
        if (mn.xhr = null, mn.abortable = !1, mn.queuedRequests != null && mn.queuedRequests.length > 0) {
          var qn = mn.queuedRequests.shift();
          qn();
        }
      }, ii = ne(Gr, "hx-prompt");
      if (ii) {
        var Qn = prompt(ii);
        if (Qn === null || !ce(Gr, "htmx:prompt", { prompt: Qn, target: pn }))
          return ie(sn), jn(), cn;
      }
      if (Yn && !an && !confirm(Yn))
        return ie(sn), jn(), cn;
      var bn = xr(Gr, pn, Qn);
      Qr !== "get" && !Sr(Gr) && (bn["Content-Type"] = "application/x-www-form-urlencoded"), Yr.headers && (bn = le(bn, Yr.headers));
      var ci = dr(Gr, Qr), Jn = ci.errors, Xn = ci.values;
      Yr.values && (Xn = le(Xn, Yr.values));
      var zn = Hr(Gr), yi = le(Xn, zn), ti = yr(yi, Gr);
      Q.config.getCacheBusterParam && Qr === "get" && (ti["org.htmx.cache-buster"] = ee(pn, "id") || "true"), (Wr == null || Wr === "") && (Wr = re().location.href);
      var wi = Rr(Gr, "hx-request"), Ii = ae(Gr).boosted, Ei = Q.config.methodsThatUseUrlParams.indexOf(Qr) >= 0, In = { boosted: Ii, useUrlParams: Ei, parameters: ti, unfilteredParameters: yi, headers: bn, target: pn, verb: Qr, errors: Jn, withCredentials: Yr.credentials || wi.credentials || Q.config.withCredentials, timeout: Yr.timeout || wi.timeout || Q.config.timeout, path: Wr, triggeringEvent: Zr };
      if (!ce(Gr, "htmx:configRequest", In))
        return ie(sn), jn(), cn;
      if (Wr = In.path, Qr = In.verb, bn = In.headers, ti = In.parameters, Jn = In.errors, Ei = In.useUrlParams, Jn && Jn.length > 0)
        return ce(Gr, "htmx:validation:halted", In), ie(sn), jn(), cn;
      var Mi = Wr.split("#"), Wi = Mi[0], Si = Mi[1], Vn = Wr;
      if (Ei) {
        Vn = Wi;
        var Ni = Object.keys(ti).length !== 0;
        Ni && (Vn.indexOf("?") < 0 ? Vn += "?" : Vn += "&", Vn += pr(ti), Si && (Vn += "#" + Si));
      }
      if (!kr(Gr, Vn, In))
        return fe(Gr, "htmx:invalidPath", In), ie(ln), cn;
      if (En.open(Qr.toUpperCase(), Vn, !0), En.overrideMimeType("text/html"), En.withCredentials = In.withCredentials, En.timeout = In.timeout, !wi.noHeaders) {
        for (var fi in bn)
          if (bn.hasOwnProperty(fi)) {
            var qi = bn[fi];
            Lr(En, fi, qi);
          }
      }
      var On = { xhr: En, target: pn, requestConfig: In, etc: Yr, boosted: Ii, select: hn, pathInfo: { requestPath: Wr, finalRequestPath: Vn, anchor: Si } };
      if (En.onload = function() {
        try {
          var qn = Ir(Gr);
          if (On.pathInfo.responsePath = Ar(En), fn(Gr, On), lr(Kn, Ti), ce(Gr, "htmx:afterRequest", On), ce(Gr, "htmx:afterOnLoad", On), !se(Gr)) {
            for (var Fn = null; qn.length > 0 && Fn == null; ) {
              var ai = qn.shift();
              se(ai) && (Fn = ai);
            }
            Fn && (ce(Fn, "htmx:afterRequest", On), ce(Fn, "htmx:afterOnLoad", On));
          }
          ie(sn), jn();
        } catch (Gi) {
          throw fe(Gr, "htmx:onLoadError", le({ error: Gi }, On)), Gi;
        }
      }, En.onerror = function() {
        lr(Kn, Ti), fe(Gr, "htmx:afterRequest", On), fe(Gr, "htmx:sendError", On), ie(ln), jn();
      }, En.onabort = function() {
        lr(Kn, Ti), fe(Gr, "htmx:afterRequest", On), fe(Gr, "htmx:sendAbort", On), ie(ln), jn();
      }, En.ontimeout = function() {
        lr(Kn, Ti), fe(Gr, "htmx:afterRequest", On), fe(Gr, "htmx:timeout", On), ie(ln), jn();
      }, !ce(Gr, "htmx:beforeRequest", On))
        return ie(sn), jn(), cn;
      var Kn = or(Gr), Ti = sr(Gr);
      oe(["loadstart", "loadend", "progress", "abort"], function(qn) {
        oe([En, En.upload], function(Fn) {
          Fn.addEventListener(qn, function(ai) {
            ce(Gr, "htmx:xhr:" + qn, { lengthComputable: ai.lengthComputable, loaded: ai.loaded, total: ai.total });
          });
        });
      }), ce(Gr, "htmx:beforeSend", On);
      var Tn = Ei ? null : Er(En, Gr, ti);
      return En.send(Tn), cn;
    }
    function Pr(Qr, Wr) {
      var Gr = Wr.xhr, Zr = null, Yr = null;
      if (O(Gr, /HX-Push:/i) ? (Zr = Gr.getResponseHeader("HX-Push"), Yr = "push") : O(Gr, /HX-Push-Url:/i) ? (Zr = Gr.getResponseHeader("HX-Push-Url"), Yr = "push") : O(Gr, /HX-Replace-Url:/i) && (Zr = Gr.getResponseHeader("HX-Replace-Url"), Yr = "replace"), Zr)
        return Zr === "false" ? {} : { type: Yr, path: Zr };
      var an = Wr.pathInfo.finalRequestPath, sn = Wr.pathInfo.responsePath, ln = ne(Qr, "hx-push-url"), cn = ne(Qr, "hx-replace-url"), fn = ae(Qr).boosted, hn = null, pn = null;
      return ln ? (hn = "push", pn = ln) : cn ? (hn = "replace", pn = cn) : fn && (hn = "push", pn = sn || an), pn ? pn === "false" ? {} : (pn === "true" && (pn = sn || an), Wr.pathInfo.anchor && pn.indexOf("#") === -1 && (pn = pn + "#" + Wr.pathInfo.anchor), { type: hn, path: pn }) : {};
    }
    function Mr(Qr, Wr) {
      var Gr = Wr.xhr, Zr = Wr.target, Yr = Wr.etc;
      Wr.requestConfig;
      var an = Wr.select;
      if (ce(Qr, "htmx:beforeOnLoad", Wr)) {
        if (O(Gr, /HX-Trigger:/i) && _e(Gr, "HX-Trigger", Qr), O(Gr, /HX-Location:/i)) {
          er();
          var sn = Gr.getResponseHeader("HX-Location"), ln;
          sn.indexOf("{") === 0 && (ln = E(sn), sn = ln.path, delete ln.path), Nr("GET", sn, ln).then(function() {
            tr(sn);
          });
          return;
        }
        var cn = O(Gr, /HX-Refresh:/i) && Gr.getResponseHeader("HX-Refresh") === "true";
        if (O(Gr, /HX-Redirect:/i)) {
          location.href = Gr.getResponseHeader("HX-Redirect"), cn && location.reload();
          return;
        }
        if (cn) {
          location.reload();
          return;
        }
        O(Gr, /HX-Retarget:/i) && (Gr.getResponseHeader("HX-Retarget") === "this" ? Wr.target = Qr : Wr.target = ue(Qr, Gr.getResponseHeader("HX-Retarget")));
        var fn = Pr(Qr, Wr), hn = Gr.status >= 200 && Gr.status < 400 && Gr.status !== 204, pn = Gr.response, mn = Gr.status >= 400, Hn = Q.config.ignoreTitle, Un = le({ shouldSwap: hn, serverResponse: pn, isError: mn, ignoreTitle: Hn }, Wr);
        if (ce(Zr, "htmx:beforeSwap", Un)) {
          if (Zr = Un.target, pn = Un.serverResponse, mn = Un.isError, Hn = Un.ignoreTitle, Wr.target = Zr, Wr.failed = mn, Wr.successful = !mn, Un.shouldSwap) {
            Gr.status === 286 && at(Qr), R(Qr, function($n) {
              pn = $n.transformResponse(pn, Gr, Qr);
            }), fn.type && er();
            var ri = Yr.swapOverride;
            O(Gr, /HX-Reswap:/i) && (ri = Gr.getResponseHeader("HX-Reswap"));
            var ln = wr(Qr, ri);
            ln.hasOwnProperty("ignoreTitle") && (Hn = ln.ignoreTitle), Zr.classList.add(Q.config.swappingClass);
            var Yn = null, bi = null, ei = function() {
              try {
                var $n = document.activeElement, Rn = {};
                try {
                  Rn = { elt: $n, start: $n ? $n.selectionStart : null, end: $n ? $n.selectionEnd : null };
                } catch {
                }
                var ni;
                an && (ni = an), O(Gr, /HX-Reselect:/i) && (ni = Gr.getResponseHeader("HX-Reselect")), fn.type && (ce(re().body, "htmx:beforeHistoryUpdate", le({ history: fn }, Wr)), fn.type === "push" ? (tr(fn.path), ce(re().body, "htmx:pushedIntoHistory", { path: fn.path })) : (rr(fn.path), ce(re().body, "htmx:replacedInHistory", { path: fn.path })));
                var Mn = T(Zr);
                if (je(ln.swapStyle, Zr, Qr, pn, Mn, ni), Rn.elt && !se(Rn.elt) && ee(Rn.elt, "id")) {
                  var En = document.getElementById(ee(Rn.elt, "id")), jn = { preventScroll: ln.focusScroll !== void 0 ? !ln.focusScroll : !Q.config.defaultFocusScroll };
                  if (En) {
                    if (Rn.start && En.setSelectionRange)
                      try {
                        En.setSelectionRange(Rn.start, Rn.end);
                      } catch {
                      }
                    En.focus(jn);
                  }
                }
                if (Zr.classList.remove(Q.config.swappingClass), oe(Mn.elts, function(bn) {
                  bn.classList && bn.classList.add(Q.config.settlingClass), ce(bn, "htmx:afterSwap", Wr);
                }), O(Gr, /HX-Trigger-After-Swap:/i)) {
                  var ii = Qr;
                  se(Qr) || (ii = re().body), _e(Gr, "HX-Trigger-After-Swap", ii);
                }
                var Qn = function() {
                  if (oe(Mn.tasks, function(Xn) {
                    Xn.call();
                  }), oe(Mn.elts, function(Xn) {
                    Xn.classList && Xn.classList.remove(Q.config.settlingClass), ce(Xn, "htmx:afterSettle", Wr);
                  }), Wr.pathInfo.anchor) {
                    var bn = re().getElementById(Wr.pathInfo.anchor);
                    bn && bn.scrollIntoView({ block: "start", behavior: "auto" });
                  }
                  if (Mn.title && !Hn) {
                    var ci = C("title");
                    ci ? ci.innerHTML = Mn.title : window.document.title = Mn.title;
                  }
                  if (Cr(Mn.elts, ln), O(Gr, /HX-Trigger-After-Settle:/i)) {
                    var Jn = Qr;
                    se(Qr) || (Jn = re().body), _e(Gr, "HX-Trigger-After-Settle", Jn);
                  }
                  ie(Yn);
                };
                ln.settleDelay > 0 ? setTimeout(Qn, ln.settleDelay) : Qn();
              } catch (bn) {
                throw fe(Qr, "htmx:swapError", Wr), ie(bi), bn;
              }
            }, Bn = Q.config.globalViewTransitions;
            if (ln.hasOwnProperty("transition") && (Bn = ln.transition), Bn && ce(Qr, "htmx:beforeTransition", Wr) && typeof Promise < "u" && document.startViewTransition) {
              var Cn = new Promise(function($n, Rn) {
                Yn = $n, bi = Rn;
              }), Sn = ei;
              ei = function() {
                document.startViewTransition(function() {
                  return Sn(), Cn;
                });
              };
            }
            ln.swapDelay > 0 ? setTimeout(ei, ln.swapDelay) : ei();
          }
          mn && fe(Qr, "htmx:responseError", le({ error: "Response Status Error Code " + Gr.status + " from " + Wr.pathInfo.requestPath }, Wr));
        }
      }
    }
    var Xr = {};
    function Dr() {
      return { init: function(Qr) {
        return null;
      }, onEvent: function(Qr, Wr) {
        return !0;
      }, transformResponse: function(Qr, Wr, Gr) {
        return Qr;
      }, isInlineSwap: function(Qr) {
        return !1;
      }, handleSwap: function(Qr, Wr, Gr, Zr) {
        return !1;
      }, encodeParameters: function(Qr, Wr, Gr) {
        return null;
      } };
    }
    function Ur(Qr, Wr) {
      Wr.init && Wr.init(r), Xr[Qr] = le(Dr(), Wr);
    }
    function Fr(Qr) {
      delete Xr[Qr];
    }
    function Br(Qr, Wr, Gr) {
      if (Qr == null)
        return Wr;
      Wr == null && (Wr = []), Gr == null && (Gr = []);
      var Zr = te(Qr, "hx-ext");
      return Zr && oe(Zr.split(","), function(Yr) {
        if (Yr = Yr.replace(/ /g, ""), Yr.slice(0, 7) == "ignore:") {
          Gr.push(Yr.slice(7));
          return;
        }
        if (Gr.indexOf(Yr) < 0) {
          var an = Xr[Yr];
          an && Wr.indexOf(an) < 0 && Wr.push(an);
        }
      }), Br(u(Qr), Wr, Gr);
    }
    var Vr = !1;
    re().addEventListener("DOMContentLoaded", function() {
      Vr = !0;
    });
    function jr(Qr) {
      Vr || re().readyState === "complete" ? Qr() : re().addEventListener("DOMContentLoaded", Qr);
    }
    function _r() {
      Q.config.includeIndicatorStyles !== !1 && re().head.insertAdjacentHTML("beforeend", "<style>                      ." + Q.config.indicatorClass + "{opacity:0}                      ." + Q.config.requestClass + " ." + Q.config.indicatorClass + "{opacity:1; transition: opacity 200ms ease-in;}                      ." + Q.config.requestClass + "." + Q.config.indicatorClass + "{opacity:1; transition: opacity 200ms ease-in;}                    </style>");
    }
    function zr() {
      var Qr = re().querySelector('meta[name="htmx-config"]');
      return Qr ? E(Qr.content) : null;
    }
    function $r() {
      var Qr = zr();
      Qr && (Q.config = le(Q.config, Qr));
    }
    return jr(function() {
      $r(), _r();
      var Qr = re().body;
      zt(Qr);
      var Wr = re().querySelectorAll("[hx-trigger='restored'],[data-hx-trigger='restored']");
      Qr.addEventListener("htmx:abort", function(Zr) {
        var Yr = Zr.target, an = ae(Yr);
        an && an.xhr && an.xhr.abort();
      });
      const Gr = window.onpopstate ? window.onpopstate.bind(window) : null;
      window.onpopstate = function(Zr) {
        Zr.state && Zr.state.htmx ? (ar(), oe(Wr, function(Yr) {
          ce(Yr, "htmx:restored", { document: re(), triggerEvent: ce });
        })) : Gr && Gr(Zr);
      }, setTimeout(function() {
        ce(Qr, "htmx:load", {}), Qr = null;
      }, 0);
    }), Q;
  }();
});
const ATTR_XSLT_ONLOAD = "script[xslt-onload]", ATTR_XSLT_TEMPLATE = "xslt-template", ATTR_XSLT_STATE = "xslt-transformed", FILTER_LIST_ELEMENT = "filter-list", FILTER_LIST_LIST = "filter-list-list", FILTER_LIST_ITEM = "filter-list-item", FILTER_LIST_INPUT = "filter-list-input", FILTER_LIST_SEARCHABLE = "filter-list-searchable", SCROLL_BUTTON_ELEMENT = "scroll-button", TOOLTIP_ELEMENT = "tool-tip", ABBREV_TOOLTIPS_ELEMENT = "abbrev-tooltips", INT_LINK_ELEMENT = "int-link", POPUP_IMAGE_ELEMENT = "popup-image", TABLIST_ELEMENT = "tab-list", FILTER_PILL_ELEMENT = "filter-pill", IMAGE_REEL_ELEMENT = "image-reel";
var ki, ha, so;
class XSLTParseProcess {
  constructor() {
    _i(this, ha);
    _i(this, ki);
    zi(this, ki, /* @__PURE__ */ new Map());
  }
  setup() {
    let Wr = htmx.findAll(ATTR_XSLT_ONLOAD);
    for (let Gr of Wr)
      da(this, ha, so).call(this, Gr);
  }
  hookupHTMX() {
    htmx.on("htmx:load", (Wr) => {
      this.setup();
    });
  }
}
ki = new WeakMap(), ha = new WeakSet(), so = function(Wr) {
  if (Wr.getAttribute(ATTR_XSLT_STATE) === "true" || !Wr.hasAttribute(ATTR_XSLT_TEMPLATE))
    return;
  let Gr = "#" + Wr.getAttribute(ATTR_XSLT_TEMPLATE), Zr = Xi(this, ki).get(Gr);
  if (!Zr) {
    let ln = htmx.find(Gr);
    if (ln) {
      let cn = ln.innerHTML ? new DOMParser().parseFromString(ln.innerHTML, "application/xml") : ln.contentDocument;
      Zr = new XSLTProcessor(), Zr.importStylesheet(cn), Xi(this, ki).set(Gr, Zr);
    } else
      throw new Error("Unknown XSLT template: " + Gr);
  }
  let Yr = new DOMParser().parseFromString(Wr.innerHTML, "application/xml"), an = Zr.transformToFragment(Yr, document), sn = new XMLSerializer().serializeToString(an);
  Wr.outerHTML = sn;
};
class FilterPill extends HTMLElement {
  constructor() {
    super(), this._value = "", this.render();
  }
  static get observedAttributes() {
    return ["data-text", "data-queryparam", "data-value"];
  }
  set value(Wr) {
    this.setAttribute("data-value", Wr);
  }
  get value() {
    return this.getAttribute("data-value") || "";
  }
  set text(Wr) {
    this.setAttribute("data-text", Wr);
  }
  get text() {
    return this.getAttribute("data-text") || "";
  }
  set queryparam(Wr) {
    this.setAttribute("data-queryparam", Wr);
  }
  get queryparam() {
    return this.getAttribute("data-queryparam") || "";
  }
  connectedCallback() {
    this._filter = this.text, this._queryparam = this.queryparam, this.render(), htmx.process(this);
  }
  attributeChangedCallback(Wr, Gr, Zr) {
    Gr !== Zr && (Wr === "data-text" && (this._filter = Zr), Wr === "data-queryparam" && (this._queryparam = Zr), Wr === "data-value" && (this._value = Zr), this.render());
  }
  getURL() {
    if (this._queryparam) {
      let Wr = new URL(window.location), Gr = new URLSearchParams(Wr.search);
      return Gr.delete(this._queryparam), Gr.delete("page"), Wr.search = Gr.toString(), Wr.toString();
    }
    return "#";
  }
  render() {
    this.innerHTML = `
		<a href="${this.getURL()}" class="!no-underline block text-base" hx-target="#searchresults" hx-select="#searchresults" hx-indicator="body" hx-swap="outerHTML show:window:top">
			<div class="flex flex-row filter-pill rounded-lg bg-orange-100 hover:saturate-50 px-2.5">
				${this.renderIcon()}
				<div class="flex flex-row filter-pill-label-value !items-baseline text-slate-700">
					<div class="filter-pill-label font-bold mr-1.5 align-baseline">${this.text}</div>
					${this.renderValue()}
				</div>
			</div>
		</a>
		`;
  }
  renderIcon() {
    return this.value === "true" || this.value === "false" ? `
			<div href="${this.getURL()}" class="filter-pill-close no-underline font-bold mr-1 text-orange-900 hover:text-orange-800">
				<i class="ri-close-circle-line"></i>
			</div>
		` : `<div
				href="${this.getURL()}"
				class="filter-pill-close no-underline font-bold mr-1 text-orange-900 hover:text-orange-800">
				<i class="ri-arrow-left-s-line"></i>
			</div>
			`;
  }
  renderValue() {
    return this.value === "true" || this.value === "false" ? "" : `
			<div class="filter-pill-value">${this.value}</div>
		`;
  }
}
var xi, Wa, Vi, Va;
class FilterList extends HTMLElement {
  constructor() {
    super();
    _i(this, Vi);
    _i(this, xi, !1);
    _i(this, Wa, "");
    this._items = [], this._url = "", this._filterstart = !1, this._placeholder = "Liste filtern...", this._queryparam = "", this._startparams = null, this.render();
  }
  static get observedAttributes() {
    return ["data-url"];
  }
  set items(Gr) {
    Array.isArray(Gr) && (this._items = Gr, this.render());
  }
  get items() {
    return this._items;
  }
  connectedCallback() {
    this._url = this.getAttribute("data-url") || "./", this._filterstart = this.getAttribute("data-filterstart") === "true", this._placeholder = this.getAttribute("data-placeholder") || "Liste filtern...", this._queryparam = this.getAttribute("data-queryparam") || "", this._queryparam, this._filterstart && zi(this, xi, !0), this.addEventListener("input", this.onInput.bind(this)), this.addEventListener("keydown", this.onEnter.bind(this)), this.addEventListener("focusin", this.onGainFocus.bind(this)), this.addEventListener("focusout", this.onLoseFocus.bind(this));
  }
  attributeChangedCallback(Gr, Zr, Yr) {
    Gr === "data-url" && Zr !== Yr && (this._url = Yr, this.render()), Gr === "data-filterstart" && Zr !== Yr && (this._filterstart = Yr === "true", this.render()), Gr === "data-placeholder" && Zr !== Yr && (this._placeholder = Yr, this.render()), Gr === "data-queryparam" && Zr !== Yr && (this._queryparam = Yr, this.render());
  }
  onInput(Gr) {
    Gr.target && Gr.target.tagName.toLowerCase() === "input" && (this._filter = Gr.target.value, this.renderList());
  }
  onGainFocus(Gr) {
    Gr.target && Gr.target.tagName.toLowerCase() === "input" && (zi(this, xi, !1), this.renderList());
  }
  onLoseFocus(Gr) {
    let Zr = this.querySelector("input");
    if (Gr.target && Gr.target === Zr) {
      if (relatedElement = Gr.relatedTarget, relatedElement && this.contains(relatedElement))
        return;
      Zr.value = "", this._filter = "", this._filterstart && zi(this, xi, !0), this.renderList();
    }
  }
  onEnter(Gr) {
    if (Gr.target && Gr.target.tagName.toLowerCase() === "input" && Gr.key === "Enter") {
      Gr.preventDefault();
      const Zr = this.querySelector("a");
      Zr && Zr.click();
    }
  }
  mark() {
    if (typeof Mark != "function")
      return;
    let Gr = this.querySelector("#" + FILTER_LIST_LIST);
    if (!Gr)
      return;
    let Zr = new Mark(Gr.querySelectorAll("." + FILTER_LIST_SEARCHABLE));
    this._filter && Zr.mark(this._filter, {
      separateWordSearch: !0
    });
  }
  // INFO: allows for setting a custom HREF of the list item
  // The function takes the item as parameter fn(item) and should return a string.
  setHREFFunc(Gr) {
    this.getHREF = Gr, this.render();
  }
  // INFO: allows for setting a custom link text of the list item
  // The function takes the item as parameter fn(item) and should return a string or
  // an HTML template literal.
  setLinkTextFunc(Gr) {
    this.getLinkText = Gr, this.render();
  }
  // INFO: allows for setting the text that will be filtered for.
  // The function takes the item as parameter fn(item) and should return a string.
  setSearchTextFunc(Gr) {
    this.getSearchText = Gr, this.render();
  }
  getHREF(Gr) {
    if (Gr) {
      if (!Gr.id)
        return "";
    } else return "";
    return Gr.id;
  }
  getHREFEncoded(Gr) {
    return encodeURIComponent(this.getHREF(Gr));
  }
  getSearchText(Gr) {
    if (Gr) {
      if (!Gr.name)
        return "";
    } else return "";
    return Gr.name;
  }
  getLinkText(Gr) {
    let Zr = this.getSearchText(Gr);
    return Zr === "" ? "" : `<span class="${FILTER_LIST_SEARCHABLE}">${Zr}</span>`;
  }
  getURL(Gr) {
    if (this._queryparam) {
      let Zr = new URL(window.location), Yr = new URLSearchParams(Zr.search);
      return Yr.set(this._queryparam, this.getHREF(Gr)), Yr.delete("page"), Zr.search = Yr.toString(), Zr.toString();
    }
    return this._url + this.getHREFEncoded(Gr);
  }
  renderList() {
    let Gr = this.querySelector("#" + FILTER_LIST_LIST);
    Gr && (Gr.outerHTML = this.List()), this.mark();
  }
  render() {
    this.innerHTML = `
            <div class="font-serif text-base shadow-inner border border-stone-100">
							${this.Input()}
							${this.List()}
            </div>
        `, htmx && htmx.process(this);
  }
  ActiveDot(Gr) {
    return da(this, Vi, Va).call(this, Gr), "";
  }
  NoItems(Gr) {
    return Gr.length === 0 ? '<div class="px-2 py-0.5 italic text-gray-500">Keine Einträge gefunden</div>' : "";
  }
  Input() {
    return `
			<div class="flex w-full py-0.5 border-b border-zinc-600 bg-stone-50">
						<i class="ri-arrow-right-s-line pl-2"></i>
						<div class="grow">
						<input
								type="text"
								placeholder="${this._placeholder}"
								class="${FILTER_LIST_INPUT} w-full placeholder:italic px-2 py-0.5" />
						</div>
				</div>
				`;
  }
  List() {
    let Gr = this._items;
    if (this._filter)
      if (this._filterstart)
        Gr = this._items.filter((Zr) => this.getSearchText(Zr).toLowerCase().startsWith(this._filter.toLowerCase()));
      else {
        let Zr = this._filter.split(" ");
        Gr = this._items.filter((Yr) => Zr.every((an) => this.getSearchText(Yr).toLowerCase().includes(an.toLowerCase())));
      }
    return `
							<div id="${FILTER_LIST_LIST}" class="${FILTER_LIST_LIST} pt-1 max-h-60 overflow-auto bg-stone-50 ${Xi(this, xi) ? "hidden" : ""}">
								${Gr.map(
      (Zr, Yr) => `
									<a
										href="${this.getURL(Zr)}"
										hx-indicator="body"
										hx-swap="outerHTML show:none"
										hx-select="main"
										hx-target="main"
										class="${FILTER_LIST_ITEM} block px-2.5 py-0.5 hover:bg-slate-200 no-underline ${Yr % 2 === 0 ? "bg-stone-100" : "bg-stone-50"}"
										${da(this, Vi, Va).call(this, Zr) ? 'aria-current="page"' : ""}>
										${this.ActiveDot(Zr)}
										${this.getLinkText(Zr)}
									</a>
								`
    ).join("")}
								${this.NoItems(Gr)}
							</div>
				`;
  }
}
xi = new WeakMap(), Wa = new WeakMap(), Vi = new WeakSet(), Va = function(Gr) {
  if (!Gr)
    return !1;
  let Zr = this.getHREF(Gr);
  return Zr === "" ? !1 : this._queryparam && (new URLSearchParams(window.location.search).get(this._queryparam) || "") === Zr ? !0 : !!window.location.href.endsWith(Zr);
};
class ScrollButton extends HTMLElement {
  constructor() {
    super(), this.handleScroll = this.handleScroll.bind(this), this.scrollToTop = this.scrollToTop.bind(this);
  }
  connectedCallback() {
    this.innerHTML = `
          <button
            class="
              scroll-to-top
              fixed bottom-5 right-5
              hidden
              bg-gray-800 text-white
              p-2
              rounded-md
              cursor-pointer
              text-2xl
              hover:opacity-80
              transition-opacity
              border-0
            "
            aria-label="Scroll to top"
          >
					<i class="ri-arrow-up-double-line"></i>
          </button>
        `, this._button = this.querySelector(".scroll-to-top"), window.addEventListener("scroll", this.handleScroll), this._button.addEventListener("click", this.scrollToTop);
  }
  disconnectedCallback() {
    window.removeEventListener("scroll", this.handleScroll), this._button.removeEventListener("click", this.scrollToTop);
  }
  handleScroll() {
    (window.scrollY || document.documentElement.scrollTop) > 300 ? this._button.classList.remove("hidden") : this._button.classList.add("hidden");
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
class ToolTip extends HTMLElement {
  static get observedAttributes() {
    return ["position", "timeout"];
  }
  constructor() {
    super(), this._tooltipBox = null, this._timeout = 200, this._hideTimeout = null, this._hiddenTimeout = null;
  }
  connectedCallback() {
    this.classList.add(
      "w-full",
      "h-full",
      "relative",
      "block",
      "leading-none",
      "[&>*]:leading-normal"
    );
    const Wr = this.querySelector(".data-tip"), Gr = Wr ? Wr.innerHTML : "Tooltip";
    Wr && Wr.classList.add("hidden"), this._tooltipBox = document.createElement("div"), this._tooltipBox.innerHTML = Gr, this._tooltipBox.className = [
      "opacity-0",
      "hidden",
      "absolute",
      "px-2",
      "py-1",
      "text-sm",
      "text-white",
      "bg-gray-900",
      "rounded",
      "shadow",
      "z-10",
      "whitespace-nowrap",
      "transition-all",
      "duration-200",
      "font-sans"
    ].join(" "), this.appendChild(this._tooltipBox), this._updatePosition(), this.addEventListener("mouseenter", () => this._showTooltip()), this.addEventListener("mouseleave", () => this._hideTooltip());
  }
  attributeChangedCallback(Wr, Gr, Zr) {
    Wr === "position" && this._tooltipBox && this._updatePosition(), Wr === "timeout" && Zr && (this._timeout = parseInt(Zr) || 200);
  }
  _showTooltip() {
    clearTimeout(this._hideTimeout), clearTimeout(this._hiddenTimeout), this._tooltipBox.classList.remove("hidden"), setTimeout(() => {
      this._tooltipBox.classList.remove("opacity-0"), this._tooltipBox.classList.add("opacity-100");
    }, 16);
  }
  _hideTooltip() {
    this._hideTimeout = setTimeout(() => {
      this._tooltipBox.classList.remove("opacity-100"), this._tooltipBox.classList.add("opacity-0"), this._hiddenTimeout = setTimeout(() => {
        this._tooltipBox.classList.add("hidden");
      }, this._timeout + 100);
    }, this._timeout);
  }
  _updatePosition() {
    switch (this._tooltipBox.classList.remove(
      "bottom-full",
      "left-1/2",
      "-translate-x-1/2",
      "mb-2",
      // top
      "top-full",
      "mt-2",
      // bottom
      "right-full",
      "-translate-y-1/2",
      "mr-2",
      "top-1/2",
      // left
      "left-full",
      "ml-2"
      // right
    ), this.getAttribute("position") || "top") {
      case "bottom":
        this._tooltipBox.classList.add(
          "top-full",
          "left-1/2",
          "transform",
          "-translate-x-1/2",
          "mt-0.5"
        );
        break;
      case "left":
        this._tooltipBox.classList.add(
          "right-full",
          "top-1/2",
          "transform",
          "-translate-y-1/2",
          "mr-0.5"
        );
        break;
      case "right":
        this._tooltipBox.classList.add(
          "left-full",
          "top-1/2",
          "transform",
          "-translate-y-1/2",
          "ml-0.5"
        );
        break;
      case "top":
      default:
        this._tooltipBox.classList.add(
          "bottom-full",
          "left-1/2",
          "transform",
          "-translate-x-1/2",
          "mb-0.5"
        );
    }
  }
}
class PopupImage extends HTMLElement {
  constructor() {
    super(), this.overlay = null, this._preview = null, this._description = null, this._imageURL = "", this._hideDLButton = !1;
  }
  connectedCallback() {
    this.classList.add("cursor-pointer"), this.classList.add("select-none"), this._imageURL = this.getAttribute("data-image-url") || "", this._hideDLButton = this.getAttribute("data-hide-dl-button") || !1, this._preview = this.querySelector("img"), this._description = this.querySelector(".image-description"), this._preview && this._preview.addEventListener("click", () => {
      this.showOverlay();
    });
  }
  disconnectedCallback() {
    this.overlay && this.overlay.parentNode && this.overlay.parentNode.removeChild(this.overlay);
  }
  showOverlay() {
    this.overlay = document.createElement("div"), this.overlay.classList.add(
      "fixed",
      "inset-0",
      "z-50",
      "bg-black/70",
      "flex",
      "items-center",
      "justify-center",
      "p-4"
    ), this.overlay.innerHTML = `
      <div class="relative w-max max-w-dvw max-h-dvh shadow-lg flex flex-col items-center justify-center gap-4">
				<div>
				<div class="absolute -right-16 text-white text-4xl flex flex-col">
					<button class="hover:text-gray-300 cursor-pointer focus:outline-none" aria-label="Close popup">
						<i class="ri-close-fill text-4xl"></i>
					</button>
					${this.downloadButton()}
				</div>
        <img
          src="${this._imageURL}"
          alt="Popup Image"
          class="full max-h-[80vh] max-w-[80vw] object-contain block relative ${this.descriptionImgClass()}"
        />
				${this.description()}
					</div>
      </div>
    `;
    const Wr = this.overlay.querySelector("button");
    Wr && Wr.addEventListener("click", () => {
      this.hideOverlay();
    }), this.overlay.addEventListener("click", (Gr) => {
      Gr.target === this.overlay && this.hideOverlay();
    }), document.body.appendChild(this.overlay);
  }
  descriptionImgClass() {
    return this.description ? "" : "0";
  }
  description() {
    return this._description ? `
        <div class="font-serif text-left description-content mt-3 text-slate-900 ">
					<div class="max-w-[80ch] hyphens-auto px-6 py-2 bg-stone-50 shadow-lg">
          ${this._description.innerHTML}
						</div>
        </div>
			` : "";
  }
  downloadButton() {
    return this._hideDLButton ? "" : `
					<tool-tip position="right">
					<a href="${this._imageURL}" target="_blank" class="text-white no-underline hover:text-gray-300"><i class="ri-file-download-line"></i></a>
					<div class="data-tip">Bild herunterladen</div>
					</tool-tip>
		`;
  }
  hideOverlay() {
    this.overlay.parentNode.removeChild(this.overlay), this.overlay = null;
  }
}
class Tablist extends HTMLElement {
  static get observedAttributes() {
  }
  constructor() {
    super(), this._showall = !1, this.shown = -1, this._headings = [], this._contents = [];
  }
  connectedCallback() {
    this._headings = Array.from(this.querySelectorAll(".tab-list-head")), this._contents = Array.from(this.querySelectorAll(".tab-list-panel")), this.hookupEvtHandlers(), this.hideDependent(), this._headings.length === 1 && this.expand(0);
  }
  expand(Wr) {
    Wr < 0 || Wr >= this._headings.length || (this.shown = Wr, this._contents.forEach((Gr, Zr) => {
      Zr === Wr ? (Gr.classList.remove("hidden"), this._headings[Zr].setAttribute("aria-pressed", "true")) : (Gr.classList.add("hidden"), this._headings[Zr].setAttribute("aria-pressed", "false"));
    }));
  }
  hookupEvtHandlers() {
    for (let Wr of this._headings)
      Wr.addEventListener("click", this.handleTabClick.bind(this)), Wr.classList.add("cursor-pointer"), Wr.classList.add("select-none"), Wr.setAttribute("role", "button"), Wr.setAttribute("aria-pressed", "false"), Wr.setAttribute("tabindex", "0");
    for (let Wr of this._contents)
      Wr.classList.add("hidden");
  }
  restore() {
    for (let Wr of this._headings)
      Wr.classList.add("cursor-pointer"), Wr.classList.add("select-none"), Wr.setAttribute("role", "button"), Wr.setAttribute("aria-pressed", "false"), Wr.setAttribute("tabindex", "0"), Wr.classList.remove("pointer-events-none"), Wr.classList.remove("!text-slate-900");
    for (let Wr of this._contents)
      Wr.classList.add("hidden");
  }
  disable() {
    for (let Wr of this._headings)
      Wr.classList.remove("cursor-pointer"), Wr.classList.remove("select-none"), Wr.removeAttribute("role"), Wr.removeAttribute("aria-pressed"), Wr.removeAttribute("tabindex"), Wr.classList.add("pointer-events-none"), Wr.classList.add("!text-slate-900");
  }
  showAll() {
    this._showall = !0, this.shown = -1, this.disable(), this._contents.forEach((Wr, Gr) => {
      Wr.classList.remove("hidden");
      let Zr = this._headings[Gr], Yr = Zr.querySelectorAll(".show-opened");
      for (let sn of Yr)
        sn.classList.add("hidden");
      let an = Zr.querySelectorAll(".show-closed");
      for (let sn of an)
        sn.classList.add("hidden");
    });
  }
  default() {
    this._showall = !1, this.restore(), this.hideDependent();
  }
  hideDependent() {
    if (this.shown < 0)
      for (const Wr of this._headings)
        this._hideAllDep(Wr, !1);
    else
      this._headings.forEach((Wr, Gr) => {
        this._hideAllDep(Wr, Gr === this.shown);
      });
  }
  _hideAllDep(Wr, Gr) {
    const Zr = Wr.querySelectorAll(".show-closed");
    for (let an of Zr)
      Gr ? an.classList.add("hidden") : an.classList.remove("hidden");
    const Yr = Array.from(Wr.querySelectorAll(".show-opened"));
    for (let an of Yr)
      Gr ? an.classList.remove("hidden") : an.classList.add("hidden");
  }
  handleTabClick(Wr) {
    if (!Wr.target) {
      console.warn("Invalid event target");
      return;
    }
    const Gr = this.findParentWithClass(Wr.target, "tab-list-head");
    if (!Gr) {
      console.warn("No parent found with class 'tab-list-head'");
      return;
    }
    const Zr = this._headings.indexOf(Gr);
    Zr === this.shown ? (this._contents[Zr].classList.toggle("hidden"), this._headings[Zr].setAttribute("aria-pressed", "false"), this.shown = -1) : this.expand(Zr), this.hideDependent();
  }
  findParentWithClass(Wr, Gr) {
    for (; Wr; ) {
      if (Wr.classList && Wr.classList.contains(Gr))
        return Wr;
      Wr = Wr.parentElement;
    }
    return null;
  }
}
class AbbreviationTooltips extends HTMLElement {
  static get observedAttributes() {
    return ["data-text", "data-abbrevmap"];
  }
  static get defaultAbbrevMap() {
    return {
      "#": "Hinweis auf weitere Informationen in der Anmerkung.",
      $: "vermutlich",
      "+++": "Inhalte aus mehreren Almanachen interpoliert",
      B: "Blatt",
      BB: "Blätter",
      C: "Corrigenda",
      Diagr: "Diagramm",
      G: "Graphik",
      "G-Verz": "Verzeichnis der Kupfer u. ä.",
      GG: "Graphiken",
      Hrsg: "Herausgeber",
      "I-Verz": "Inhaltsverzeichnis",
      Kal: "Kalendarium",
      Kr: "Karte",
      MusB: "Musikbeigabe",
      MusBB: "Musikbeigaben",
      S: "Seite",
      SS: "Seiten",
      Sp: "Spiegel",
      T: "Titel",
      TG: "Titelgraphik, Titelportrait etc",
      "TG r": "Titelgraphik, Titelportrait etc recto",
      "TG v": "Titelgraphik, Titelportrait etc verso",
      Tab: "Tabelle",
      UG: "Umschlaggraphik",
      "UG r": "Umschlaggraphik recto",
      "UG v": "Umschlaggraphik verso",
      VB: "Vorsatzblatt",
      Vf: "Verfasser",
      VrlgM: "Verlagsmitteilung",
      Vrwrt: "Vorwort",
      ar: "arabische Paginierung",
      ar1: "erste arabische Paginierung",
      ar2: "zweite arabische Paginierung",
      ar3: "dritte arabische Paginierung",
      ar4: "vierte arabische Paginierung",
      ar5: "fünfte arabische Paginierung",
      ar6: "sechste arabische Paginierung",
      ar7: "siebte arabische Paginierung",
      gA: "graphische Anleitung",
      gT: "graphischer Titel",
      gTzA: "graphische Tanzanleitung",
      nT: "Nachtitel",
      röm: "römische Paginierung",
      röm1: "erste römische Paginierung",
      röm2: "zweite römische Paginierung",
      röm3: "dritte römische Paginierung",
      röm4: "vierte römische Paginierung",
      röm5: "fünfte römische Paginierung",
      röm6: "sechste römische Paginierung",
      röm7: "siebte römische Paginierung",
      vT: "Vortitel",
      zT: "Zwischentitel",
      "§§": "Hinweis auf Mängel im Almanach (Beschädigungen, fehlende Graphiken, unvollständige Sammlungen etc) in der Anmerkung"
    };
  }
  constructor() {
    super(), this._abbrevMap = AbbreviationTooltips.defaultAbbrevMap;
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback(Wr, Gr, Zr) {
    Gr !== Zr && (Wr === "data-abbrevmap" && this._parseAndSetAbbrevMap(Zr), this.render());
  }
  _parseAndSetAbbrevMap(Wr) {
    if (!Wr) {
      this._abbrevMap = AbbreviationTooltips.defaultAbbrevMap;
      return;
    }
    try {
      this._abbrevMap = JSON.parse(Wr);
    } catch {
      this._abbrevMap = AbbreviationTooltips.defaultAbbrevMap;
    }
  }
  setAbbrevMap(Wr) {
    typeof Wr == "object" && Wr !== null && (this._abbrevMap = Wr, this.render());
  }
  get text() {
    return this.getAttribute("data-text") || "";
  }
  set text(Wr) {
    this.setAttribute("data-text", Wr);
  }
  render() {
    this.innerHTML = this.transformText(this.text, this._abbrevMap);
  }
  transformText(Wr, Gr) {
    let Zr = "", Yr = 0;
    for (; Yr < Wr.length; ) {
      if (Yr > 0 && !this.isSpaceOrPunct(Wr[Yr - 1])) {
        Zr += Wr[Yr], Yr++;
        continue;
      }
      const an = this.findLongestAbbrevAt(Wr, Yr, Gr);
      if (an) {
        const { match: sn, meaning: ln } = an;
        Zr += `
            <tool-tip position="top" class="!inline" timeout="300">
              <div class="data-tip p-2 text-sm text-white bg-gray-700 rounded shadow">
                ${ln}
              </div>
              <span class="cursor-help text-blue-900 hover:text-slate-800">
                ${sn}
              </span>
            </tool-tip>
          `, Yr += sn.length;
      } else
        Zr += Wr[Yr], Yr++;
    }
    return Zr;
  }
  findLongestAbbrevAt(Wr, Gr, Zr) {
    let Yr = null, an = 0;
    for (const sn of Object.keys(Zr))
      Wr.startsWith(sn, Gr) && sn.length > an && (Yr = sn, an = sn.length);
    return Yr ? { match: Yr, meaning: Zr[Yr] } : null;
  }
  isSpaceOrPunct(Wr) {
    return /\s|[.,;:!?]/.test(Wr);
  }
}
class IntLink extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.style.cursor = "pointer", this.addEventListener("click", this.handleClick);
  }
  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick);
  }
  handleClick(Wr) {
    const Gr = this.getAttribute("data-jump");
    if (Gr) {
      const Zr = document.querySelector(Gr);
      Zr ? Zr.scrollIntoView({ behavior: "smooth" }) : console.warn(`No element found for selector: ${Gr}`);
    }
  }
}
var pa;
class ImageReel extends HTMLElement {
  constructor() {
    super();
    _i(this, pa, 176);
    this._images = [];
  }
  connectedCallback() {
    this._images = Array.from(this.querySelectorAll(".primages")), this.calculateShownImages();
    const Gr = new ResizeObserver((Zr, Yr) => {
      this.calculateShownImages();
    });
    this._resizeObserver = Gr, Gr.observe(this);
  }
  disconnectedCallback() {
    this._resizeObserver.unobserve(this);
  }
  calculateShownImages() {
    const Gr = this.getBoundingClientRect();
    console.log(Gr);
    const Zr = Math.floor(Gr.width / (Xi(this, pa) + 10));
    for (let Yr = 0; Yr < this._images.length; Yr++)
      Yr < Zr - 1 ? this._images[Yr].classList.remove("hidden") : this._images[Yr].classList.add("hidden");
  }
}
pa = new WeakMap();
customElements.define(INT_LINK_ELEMENT, IntLink);
customElements.define(ABBREV_TOOLTIPS_ELEMENT, AbbreviationTooltips);
customElements.define(FILTER_LIST_ELEMENT, FilterList);
customElements.define(SCROLL_BUTTON_ELEMENT, ScrollButton);
customElements.define(TOOLTIP_ELEMENT, ToolTip);
customElements.define(POPUP_IMAGE_ELEMENT, PopupImage);
customElements.define(TABLIST_ELEMENT, Tablist);
customElements.define(FILTER_PILL_ELEMENT, FilterPill);
customElements.define(IMAGE_REEL_ELEMENT, ImageReel);
export {
  AbbreviationTooltips,
  FilterList,
  ScrollButton,
  XSLTParseProcess
};
