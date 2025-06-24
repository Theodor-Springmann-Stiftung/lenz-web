var Js = (Gr) => {
  throw TypeError(Gr);
};
var Ba = (Gr, ze, Wr) => ze.has(Gr) || Js("Cannot " + Wr);
var Na = (Gr, ze, Wr) => (Ba(Gr, ze, "read from private field"), Wr ? Wr.call(Gr) : ze.get(Gr)), Da = (Gr, ze, Wr) => ze.has(Gr) ? Js("Cannot add the same private member more than once") : ze instanceof WeakSet ? ze.add(Gr) : ze.set(Gr, Wr), eo = (Gr, ze, Wr, Yr) => (Ba(Gr, ze, "write to private field"), Yr ? Yr.call(Gr, Wr) : ze.set(Gr, Wr), Wr), to = (Gr, ze, Wr) => (Ba(Gr, ze, "access private method"), Wr);
(() => {
  var Gr = !1, ze = !1, Wr = [], Yr = -1;
  function Qr(Jr) {
    Kr(Jr);
  }
  function Kr(Jr) {
    Wr.includes(Jr) || Wr.push(Jr), en();
  }
  function Zr(Jr) {
    let nn = Wr.indexOf(Jr);
    nn !== -1 && nn > Yr && Wr.splice(nn, 1);
  }
  function en() {
    !ze && !Gr && (Gr = !0, queueMicrotask(tn));
  }
  function tn() {
    Gr = !1, ze = !0;
    for (let Jr = 0; Jr < Wr.length; Jr++) Wr[Jr](), Yr = Jr;
    Wr.length = 0, Yr = -1, ze = !1;
  }
  var rn, sn, on, an, dn = !0;
  function pn(Jr) {
    dn = !1, Jr(), dn = !0;
  }
  function mn(Jr) {
    rn = Jr.reactive, on = Jr.release, sn = (nn) => Jr.effect(nn, { scheduler: (ln) => {
      dn ? Qr(ln) : ln();
    } }), an = Jr.raw;
  }
  function vn(Jr) {
    sn = Jr;
  }
  function xn(Jr) {
    let nn = () => {
    };
    return [(ln) => {
      let hn = sn(ln);
      return Jr._x_effects || (Jr._x_effects = /* @__PURE__ */ new Set(), Jr._x_runEffects = () => {
        Jr._x_effects.forEach((yn) => yn());
      }), Jr._x_effects.add(hn), nn = () => {
        hn !== void 0 && (Jr._x_effects.delete(hn), on(hn));
      }, hn;
    }, () => {
      nn();
    }];
  }
  function gn(Jr, nn) {
    let ln = !0, hn, yn = sn(() => {
      let wn = Jr();
      JSON.stringify(wn), ln ? hn = wn : queueMicrotask(() => {
        nn(wn, hn), hn = wn;
      }), ln = !1;
    });
    return () => on(yn);
  }
  function un(Jr, nn, ln = {}) {
    Jr.dispatchEvent(new CustomEvent(nn, { detail: ln, bubbles: !0, composed: !0, cancelable: !0 }));
  }
  function fn(Jr, nn) {
    if (typeof ShadowRoot == "function" && Jr instanceof ShadowRoot) {
      Array.from(Jr.children).forEach((yn) => fn(yn, nn));
      return;
    }
    let ln = !1;
    if (nn(Jr, () => ln = !0), ln) return;
    let hn = Jr.firstElementChild;
    for (; hn; ) fn(hn, nn), hn = hn.nextElementSibling;
  }
  function cn(Jr, ...nn) {
    console.warn(`Alpine Warning: ${Jr}`, ...nn);
  }
  var Cn = !1;
  function bn() {
    Cn && cn("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems."), Cn = !0, document.body || cn("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"), un(document, "alpine:init"), un(document, "alpine:initializing"), $n(), On((nn) => En(nn, fn)), Wn((nn) => Yn(nn)), Fn((nn, ln) => {
      ma(nn, ln).forEach((hn) => hn());
    });
    let Jr = (nn) => !Mn(nn.parentElement, !0);
    Array.from(document.querySelectorAll(Ln().join(","))).filter(Jr).forEach((nn) => {
      En(nn);
    }), un(document, "alpine:initialized");
  }
  var Sn = [], _n = [];
  function Tn() {
    return Sn.map((Jr) => Jr());
  }
  function Ln() {
    return Sn.concat(_n).map((Jr) => Jr());
  }
  function Pn(Jr) {
    Sn.push(Jr);
  }
  function In(Jr) {
    _n.push(Jr);
  }
  function Mn(Jr, nn = !1) {
    return Nn(Jr, (ln) => {
      if ((nn ? Ln() : Tn()).some((hn) => ln.matches(hn))) return !0;
    });
  }
  function Nn(Jr, nn) {
    if (Jr) {
      if (nn(Jr)) return Jr;
      if (Jr._x_teleportBack && (Jr = Jr._x_teleportBack), !!Jr.parentElement) return Nn(Jr.parentElement, nn);
    }
  }
  function Gn(Jr) {
    return Tn().some((nn) => Jr.matches(nn));
  }
  var Un = [];
  function Hn(Jr) {
    Un.push(Jr);
  }
  function En(Jr, nn = fn, ln = () => {
  }) {
    mo(() => {
      nn(Jr, (hn, yn) => {
        ln(hn, yn), Un.forEach((wn) => wn(hn, yn)), ma(hn, hn.attributes).forEach((wn) => wn()), hn._x_ignore && yn();
      });
    });
  }
  function Yn(Jr, nn = fn) {
    nn(Jr, (ln) => {
      pi(ln), ui(ln);
    });
  }
  var Xn = [], ni = [], Rn = [];
  function On(Jr) {
    Rn.push(Jr);
  }
  function Wn(Jr, nn) {
    typeof nn == "function" ? (Jr._x_cleanups || (Jr._x_cleanups = []), Jr._x_cleanups.push(nn)) : (nn = Jr, ni.push(nn));
  }
  function Fn(Jr) {
    Xn.push(Jr);
  }
  function Qn(Jr, nn, ln) {
    Jr._x_attributeCleanups || (Jr._x_attributeCleanups = {}), Jr._x_attributeCleanups[nn] || (Jr._x_attributeCleanups[nn] = []), Jr._x_attributeCleanups[nn].push(ln);
  }
  function pi(Jr, nn) {
    Jr._x_attributeCleanups && Object.entries(Jr._x_attributeCleanups).forEach(([ln, hn]) => {
      (nn === void 0 || nn.includes(ln)) && (hn.forEach((yn) => yn()), delete Jr._x_attributeCleanups[ln]);
    });
  }
  function ui(Jr) {
    if (Jr._x_cleanups) for (; Jr._x_cleanups.length; ) Jr._x_cleanups.pop()();
  }
  var qn = new MutationObserver(la), jn = !1;
  function $n() {
    qn.observe(document, { subtree: !0, childList: !0, attributes: !0, attributeOldValue: !0 }), jn = !0;
  }
  function Kn() {
    ei(), qn.disconnect(), jn = !1;
  }
  var Jn = [];
  function ei() {
    let Jr = qn.takeRecords();
    Jn.push(() => Jr.length > 0 && la(Jr));
    let nn = Jn.length;
    queueMicrotask(() => {
      if (Jn.length === nn) for (; Jn.length > 0; ) Jn.shift()();
    });
  }
  function ri(Jr) {
    if (!jn) return Jr();
    Kn();
    let nn = Jr();
    return $n(), nn;
  }
  var oi = !1, ii = [];
  function fi() {
    oi = !0;
  }
  function Hi() {
    oi = !1, la(ii), ii = [];
  }
  function la(Jr) {
    if (oi) {
      ii = ii.concat(Jr);
      return;
    }
    let nn = /* @__PURE__ */ new Set(), ln = /* @__PURE__ */ new Set(), hn = /* @__PURE__ */ new Map(), yn = /* @__PURE__ */ new Map();
    for (let wn = 0; wn < Jr.length; wn++) if (!Jr[wn].target._x_ignoreMutationObserver && (Jr[wn].type === "childList" && (Jr[wn].addedNodes.forEach((kn) => kn.nodeType === 1 && nn.add(kn)), Jr[wn].removedNodes.forEach((kn) => kn.nodeType === 1 && ln.add(kn))), Jr[wn].type === "attributes")) {
      let kn = Jr[wn].target, An = Jr[wn].attributeName, zn = Jr[wn].oldValue, Bn = () => {
        hn.has(kn) || hn.set(kn, []), hn.get(kn).push({ name: An, value: kn.getAttribute(An) });
      }, Dn = () => {
        yn.has(kn) || yn.set(kn, []), yn.get(kn).push(An);
      };
      kn.hasAttribute(An) && zn === null ? Bn() : kn.hasAttribute(An) ? (Dn(), Bn()) : Dn();
    }
    yn.forEach((wn, kn) => {
      pi(kn, wn);
    }), hn.forEach((wn, kn) => {
      Xn.forEach((An) => An(kn, wn));
    });
    for (let wn of ln) nn.has(wn) || (ni.forEach((kn) => kn(wn)), Yn(wn));
    nn.forEach((wn) => {
      wn._x_ignoreSelf = !0, wn._x_ignore = !0;
    });
    for (let wn of nn) ln.has(wn) || wn.isConnected && (delete wn._x_ignoreSelf, delete wn._x_ignore, Rn.forEach((kn) => kn(wn)), wn._x_ignore = !0, wn._x_ignoreSelf = !0);
    nn.forEach((wn) => {
      delete wn._x_ignoreSelf, delete wn._x_ignore;
    }), nn = null, ln = null, hn = null, yn = null;
  }
  function $a(Jr) {
    return Pi(Oi(Jr));
  }
  function Ii(Jr, nn, ln) {
    return Jr._x_dataStack = [nn, ...Oi(ln || Jr)], () => {
      Jr._x_dataStack = Jr._x_dataStack.filter((hn) => hn !== nn);
    };
  }
  function Oi(Jr) {
    return Jr._x_dataStack ? Jr._x_dataStack : typeof ShadowRoot == "function" && Jr instanceof ShadowRoot ? Oi(Jr.host) : Jr.parentNode ? Oi(Jr.parentNode) : [];
  }
  function Pi(Jr) {
    return new Proxy({ objects: Jr }, no);
  }
  var no = { ownKeys({ objects: Jr }) {
    return Array.from(new Set(Jr.flatMap((nn) => Object.keys(nn))));
  }, has({ objects: Jr }, nn) {
    return nn == Symbol.unscopables ? !1 : Jr.some((ln) => Object.prototype.hasOwnProperty.call(ln, nn) || Reflect.has(ln, nn));
  }, get({ objects: Jr }, nn, ln) {
    return nn == "toJSON" ? io : Reflect.get(Jr.find((hn) => Reflect.has(hn, nn)) || {}, nn, ln);
  }, set({ objects: Jr }, nn, ln, hn) {
    let yn = Jr.find((kn) => Object.prototype.hasOwnProperty.call(kn, nn)) || Jr[Jr.length - 1], wn = Object.getOwnPropertyDescriptor(yn, nn);
    return wn != null && wn.set && (wn != null && wn.get) ? Reflect.set(yn, nn, ln, hn) : Reflect.set(yn, nn, ln);
  } };
  function io() {
    return Reflect.ownKeys(this).reduce((Jr, nn) => (Jr[nn] = Reflect.get(this, nn), Jr), {});
  }
  function Fa(Jr) {
    let nn = (hn) => typeof hn == "object" && !Array.isArray(hn) && hn !== null, ln = (hn, yn = "") => {
      Object.entries(Object.getOwnPropertyDescriptors(hn)).forEach(([wn, { value: kn, enumerable: An }]) => {
        if (An === !1 || kn === void 0 || typeof kn == "object" && kn !== null && kn.__v_skip) return;
        let zn = yn === "" ? wn : `${yn}.${wn}`;
        typeof kn == "object" && kn !== null && kn._x_interceptor ? hn[wn] = kn.initialize(Jr, zn, wn) : nn(kn) && kn !== hn && !(kn instanceof Element) && ln(kn, zn);
      });
    };
    return ln(Jr);
  }
  function Ha(Jr, nn = () => {
  }) {
    let ln = { initialValue: void 0, _x_interceptor: !0, initialize(hn, yn, wn) {
      return Jr(this.initialValue, () => ao(hn, yn), (kn) => Va(hn, yn, kn), yn, wn);
    } };
    return nn(ln), (hn) => {
      if (typeof hn == "object" && hn !== null && hn._x_interceptor) {
        let yn = ln.initialize.bind(ln);
        ln.initialize = (wn, kn, An) => {
          let zn = hn.initialize(wn, kn, An);
          return ln.initialValue = zn, yn(wn, kn, An);
        };
      } else ln.initialValue = hn;
      return ln;
    };
  }
  function ao(Jr, nn) {
    return nn.split(".").reduce((ln, hn) => ln[hn], Jr);
  }
  function Va(Jr, nn, ln) {
    if (typeof nn == "string" && (nn = nn.split(".")), nn.length === 1) Jr[nn[0]] = ln;
    else {
      if (nn.length === 0) throw error;
      return Jr[nn[0]] || (Jr[nn[0]] = {}), Va(Jr[nn[0]], nn.slice(1), ln);
    }
  }
  var Ga = {};
  function vi(Jr, nn) {
    Ga[Jr] = nn;
  }
  function da(Jr, nn) {
    return Object.entries(Ga).forEach(([ln, hn]) => {
      let yn = null;
      function wn() {
        if (yn) return yn;
        {
          let [kn, An] = Za(nn);
          return yn = { interceptor: Ha, ...kn }, Wn(nn, An), yn;
        }
      }
      Object.defineProperty(Jr, `$${ln}`, { get() {
        return hn(nn, wn());
      }, enumerable: !1 });
    }), Jr;
  }
  function so(Jr, nn, ln, ...hn) {
    try {
      return ln(...hn);
    } catch (yn) {
      Wi(yn, Jr, nn);
    }
  }
  function Wi(Jr, nn, ln = void 0) {
    Jr = Object.assign(Jr ?? { message: "No error message given." }, { el: nn, expression: ln }), console.warn(`Alpine Expression Error: ${Jr.message}

${ln ? 'Expression: "' + ln + `"

` : ""}`, nn), setTimeout(() => {
      throw Jr;
    }, 0);
  }
  var Vi = !0;
  function Ua(Jr) {
    let nn = Vi;
    Vi = !1;
    let ln = Jr();
    return Vi = nn, ln;
  }
  function ki(Jr, nn, ln = {}) {
    let hn;
    return hi(Jr, nn)((yn) => hn = yn, ln), hn;
  }
  function hi(...Jr) {
    return Ya(...Jr);
  }
  var Ya = Qa;
  function oo(Jr) {
    Ya = Jr;
  }
  function Qa(Jr, nn) {
    let ln = {};
    da(ln, Jr);
    let hn = [ln, ...Oi(Jr)], yn = typeof nn == "function" ? lo(hn, nn) : co(hn, nn, Jr);
    return so.bind(null, Jr, nn, yn);
  }
  function lo(Jr, nn) {
    return (ln = () => {
    }, { scope: hn = {}, params: yn = [] } = {}) => {
      let wn = nn.apply(Pi([hn, ...Jr]), yn);
      Gi(ln, wn);
    };
  }
  var ua = {};
  function uo(Jr, nn) {
    if (ua[Jr]) return ua[Jr];
    let ln = Object.getPrototypeOf(async function() {
    }).constructor, hn = /^[\n\s]*if.*\(.*\)/.test(Jr.trim()) || /^(let|const)\s/.test(Jr.trim()) ? `(async()=>{ ${Jr} })()` : Jr, yn = (() => {
      try {
        let wn = new ln(["__self", "scope"], `with (scope) { __self.result = ${hn} }; __self.finished = true; return __self.result;`);
        return Object.defineProperty(wn, "name", { value: `[Alpine] ${Jr}` }), wn;
      } catch (wn) {
        return Wi(wn, nn, Jr), Promise.resolve();
      }
    })();
    return ua[Jr] = yn, yn;
  }
  function co(Jr, nn, ln) {
    let hn = uo(nn, ln);
    return (yn = () => {
    }, { scope: wn = {}, params: kn = [] } = {}) => {
      hn.result = void 0, hn.finished = !1;
      let An = Pi([wn, ...Jr]);
      if (typeof hn == "function") {
        let zn = hn(hn, An).catch((Bn) => Wi(Bn, ln, nn));
        hn.finished ? (Gi(yn, hn.result, An, kn, ln), hn.result = void 0) : zn.then((Bn) => {
          Gi(yn, Bn, An, kn, ln);
        }).catch((Bn) => Wi(Bn, ln, nn)).finally(() => hn.result = void 0);
      }
    };
  }
  function Gi(Jr, nn, ln, hn, yn) {
    if (Vi && typeof nn == "function") {
      let wn = nn.apply(ln, hn);
      wn instanceof Promise ? wn.then((kn) => Gi(Jr, kn, ln, hn)).catch((kn) => Wi(kn, yn, nn)) : Jr(wn);
    } else typeof nn == "object" && nn instanceof Promise ? nn.then((wn) => Jr(wn)) : Jr(nn);
  }
  var ca = "x-";
  function Ri(Jr = "") {
    return ca + Jr;
  }
  function po(Jr) {
    ca = Jr;
  }
  var pa = {};
  function di(Jr, nn) {
    return pa[Jr] = nn, { before(ln) {
      if (!pa[ln]) {
        console.warn(String.raw`Cannot find directive \`${ln}\`. \`${Jr}\` will use the default order of execution`);
        return;
      }
      let hn = Ti.indexOf(ln);
      Ti.splice(hn >= 0 ? hn : Ti.indexOf("DEFAULT"), 0, Jr);
    } };
  }
  function ma(Jr, nn, ln) {
    if (nn = Array.from(nn), Jr._x_virtualDirectives) {
      let yn = Object.entries(Jr._x_virtualDirectives).map(([kn, An]) => ({ name: kn, value: An })), wn = Ka(yn);
      yn = yn.map((kn) => wn.find((An) => An.name === kn.name) ? { name: `x-bind:${kn.name}`, value: `"${kn.value}"` } : kn), nn = nn.concat(yn);
    }
    let hn = {};
    return nn.map(ts((yn, wn) => hn[yn] = wn)).filter(ns).map(fo(hn, ln)).sort(go).map((yn) => ho(Jr, yn));
  }
  function Ka(Jr) {
    return Array.from(Jr).map(ts()).filter((nn) => !ns(nn));
  }
  var ha = !1, Mi = /* @__PURE__ */ new Map(), Xa = Symbol();
  function mo(Jr) {
    ha = !0;
    let nn = Symbol();
    Xa = nn, Mi.set(nn, []);
    let ln = () => {
      for (; Mi.get(nn).length; ) Mi.get(nn).shift()();
      Mi.delete(nn);
    }, hn = () => {
      ha = !1, ln();
    };
    Jr(ln), hn();
  }
  function Za(Jr) {
    let nn = [], ln = (wn) => nn.push(wn), [hn, yn] = xn(Jr);
    return nn.push(yn), [{ Alpine: Ni, effect: hn, cleanup: ln, evaluateLater: hi.bind(hi, Jr), evaluate: ki.bind(ki, Jr) }, () => nn.forEach((wn) => wn())];
  }
  function ho(Jr, nn) {
    let ln = () => {
    }, hn = pa[nn.type] || ln, [yn, wn] = Za(Jr);
    Qn(Jr, nn.original, wn);
    let kn = () => {
      Jr._x_ignore || Jr._x_ignoreSelf || (hn.inline && hn.inline(Jr, nn, yn), hn = hn.bind(hn, Jr, nn, yn), ha ? Mi.get(Xa).push(hn) : hn());
    };
    return kn.runCleanups = wn, kn;
  }
  var Ja = (Jr, nn) => ({ name: ln, value: hn }) => (ln.startsWith(Jr) && (ln = ln.replace(Jr, nn)), { name: ln, value: hn }), es = (Jr) => Jr;
  function ts(Jr = () => {
  }) {
    return ({ name: nn, value: ln }) => {
      let { name: hn, value: yn } = rs.reduce((wn, kn) => kn(wn), { name: nn, value: ln });
      return hn !== nn && Jr(hn, nn), { name: hn, value: yn };
    };
  }
  var rs = [];
  function fa(Jr) {
    rs.push(Jr);
  }
  function ns({ name: Jr }) {
    return as().test(Jr);
  }
  var as = () => new RegExp(`^${ca}([^:^.]+)\\b`);
  function fo(Jr, nn) {
    return ({ name: ln, value: hn }) => {
      let yn = ln.match(as()), wn = ln.match(/:([a-zA-Z0-9\-_:]+)/), kn = ln.match(/\.[^.\]]+(?=[^\]]*$)/g) || [], An = nn || Jr[ln] || ln;
      return { type: yn ? yn[1] : null, value: wn ? wn[1] : null, modifiers: kn.map((zn) => zn.replace(".", "")), expression: hn, original: An };
    };
  }
  var ga = "DEFAULT", Ti = ["ignore", "ref", "data", "id", "anchor", "bind", "init", "for", "model", "modelable", "transition", "show", "if", ga, "teleport"];
  function go(Jr, nn) {
    let ln = Ti.indexOf(Jr.type) === -1 ? ga : Jr.type, hn = Ti.indexOf(nn.type) === -1 ? ga : nn.type;
    return Ti.indexOf(ln) - Ti.indexOf(hn);
  }
  var va = [], ya = !1;
  function ba(Jr = () => {
  }) {
    return queueMicrotask(() => {
      ya || setTimeout(() => {
        Sa();
      });
    }), new Promise((nn) => {
      va.push(() => {
        Jr(), nn();
      });
    });
  }
  function Sa() {
    for (ya = !1; va.length; ) va.shift()();
  }
  function vo() {
    ya = !0;
  }
  function xa(Jr, nn) {
    return Array.isArray(nn) ? ss(Jr, nn.join(" ")) : typeof nn == "object" && nn !== null ? yo(Jr, nn) : typeof nn == "function" ? xa(Jr, nn()) : ss(Jr, nn);
  }
  function ss(Jr, nn) {
    let ln = (yn) => yn.split(" ").filter((wn) => !Jr.classList.contains(wn)).filter(Boolean), hn = (yn) => (Jr.classList.add(...yn), () => {
      Jr.classList.remove(...yn);
    });
    return nn = nn === !0 ? nn = "" : nn || "", hn(ln(nn));
  }
  function yo(Jr, nn) {
    let ln = (An) => An.split(" ").filter(Boolean), hn = Object.entries(nn).flatMap(([An, zn]) => zn ? ln(An) : !1).filter(Boolean), yn = Object.entries(nn).flatMap(([An, zn]) => zn ? !1 : ln(An)).filter(Boolean), wn = [], kn = [];
    return yn.forEach((An) => {
      Jr.classList.contains(An) && (Jr.classList.remove(An), kn.push(An));
    }), hn.forEach((An) => {
      Jr.classList.contains(An) || (Jr.classList.add(An), wn.push(An));
    }), () => {
      kn.forEach((An) => Jr.classList.add(An)), wn.forEach((An) => Jr.classList.remove(An));
    };
  }
  function Ui(Jr, nn) {
    return typeof nn == "object" && nn !== null ? bo(Jr, nn) : So(Jr, nn);
  }
  function bo(Jr, nn) {
    let ln = {};
    return Object.entries(nn).forEach(([hn, yn]) => {
      ln[hn] = Jr.style[hn], hn.startsWith("--") || (hn = xo(hn)), Jr.style.setProperty(hn, yn);
    }), setTimeout(() => {
      Jr.style.length === 0 && Jr.removeAttribute("style");
    }), () => {
      Ui(Jr, ln);
    };
  }
  function So(Jr, nn) {
    let ln = Jr.getAttribute("style", nn);
    return Jr.setAttribute("style", nn), () => {
      Jr.setAttribute("style", ln || "");
    };
  }
  function xo(Jr) {
    return Jr.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }
  function Ca(Jr, nn = () => {
  }) {
    let ln = !1;
    return function() {
      ln ? nn.apply(this, arguments) : (ln = !0, Jr.apply(this, arguments));
    };
  }
  di("transition", (Jr, { value: nn, modifiers: ln, expression: hn }, { evaluate: yn }) => {
    typeof hn == "function" && (hn = yn(hn)), hn !== !1 && (!hn || typeof hn == "boolean" ? wo(Jr, ln, nn) : Co(Jr, hn, nn));
  });
  function Co(Jr, nn, ln) {
    os(Jr, xa, ""), { enter: (hn) => {
      Jr._x_transition.enter.during = hn;
    }, "enter-start": (hn) => {
      Jr._x_transition.enter.start = hn;
    }, "enter-end": (hn) => {
      Jr._x_transition.enter.end = hn;
    }, leave: (hn) => {
      Jr._x_transition.leave.during = hn;
    }, "leave-start": (hn) => {
      Jr._x_transition.leave.start = hn;
    }, "leave-end": (hn) => {
      Jr._x_transition.leave.end = hn;
    } }[ln](nn);
  }
  function wo(Jr, nn, ln) {
    os(Jr, Ui);
    let hn = !nn.includes("in") && !nn.includes("out") && !ln, yn = hn || nn.includes("in") || ["enter"].includes(ln), wn = hn || nn.includes("out") || ["leave"].includes(ln);
    nn.includes("in") && !hn && (nn = nn.filter((si, li) => li < nn.indexOf("out"))), nn.includes("out") && !hn && (nn = nn.filter((si, li) => li > nn.indexOf("out")));
    let kn = !nn.includes("opacity") && !nn.includes("scale"), An = kn || nn.includes("opacity"), zn = kn || nn.includes("scale"), Bn = An ? 0 : 1, Dn = zn ? Bi(nn, "scale", 95) / 100 : 1, Zn = Bi(nn, "delay", 0) / 1e3, ti = Bi(nn, "origin", "center"), ci = "opacity, transform", wi = Bi(nn, "duration", 150) / 1e3, sa = Bi(nn, "duration", 75) / 1e3, Vn = "cubic-bezier(0.4, 0.0, 0.2, 1)";
    yn && (Jr._x_transition.enter.during = { transformOrigin: ti, transitionDelay: `${Zn}s`, transitionProperty: ci, transitionDuration: `${wi}s`, transitionTimingFunction: Vn }, Jr._x_transition.enter.start = { opacity: Bn, transform: `scale(${Dn})` }, Jr._x_transition.enter.end = { opacity: 1, transform: "scale(1)" }), wn && (Jr._x_transition.leave.during = { transformOrigin: ti, transitionDelay: `${Zn}s`, transitionProperty: ci, transitionDuration: `${sa}s`, transitionTimingFunction: Vn }, Jr._x_transition.leave.start = { opacity: 1, transform: "scale(1)" }, Jr._x_transition.leave.end = { opacity: Bn, transform: `scale(${Dn})` });
  }
  function os(Jr, nn, ln = {}) {
    Jr._x_transition || (Jr._x_transition = { enter: { during: ln, start: ln, end: ln }, leave: { during: ln, start: ln, end: ln }, in(hn = () => {
    }, yn = () => {
    }) {
      wa(Jr, nn, { during: this.enter.during, start: this.enter.start, end: this.enter.end }, hn, yn);
    }, out(hn = () => {
    }, yn = () => {
    }) {
      wa(Jr, nn, { during: this.leave.during, start: this.leave.start, end: this.leave.end }, hn, yn);
    } });
  }
  window.Element.prototype._x_toggleAndCascadeWithTransitions = function(Jr, nn, ln, hn) {
    let yn = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout, wn = () => yn(ln);
    if (nn) {
      Jr._x_transition && (Jr._x_transition.enter || Jr._x_transition.leave) ? Jr._x_transition.enter && (Object.entries(Jr._x_transition.enter.during).length || Object.entries(Jr._x_transition.enter.start).length || Object.entries(Jr._x_transition.enter.end).length) ? Jr._x_transition.in(ln) : wn() : Jr._x_transition ? Jr._x_transition.in(ln) : wn();
      return;
    }
    Jr._x_hidePromise = Jr._x_transition ? new Promise((kn, An) => {
      Jr._x_transition.out(() => {
      }, () => kn(hn)), Jr._x_transitioning && Jr._x_transitioning.beforeCancel(() => An({ isFromCancelledTransition: !0 }));
    }) : Promise.resolve(hn), queueMicrotask(() => {
      let kn = ls(Jr);
      kn ? (kn._x_hideChildren || (kn._x_hideChildren = []), kn._x_hideChildren.push(Jr)) : yn(() => {
        let An = (zn) => {
          let Bn = Promise.all([zn._x_hidePromise, ...(zn._x_hideChildren || []).map(An)]).then(([Dn]) => Dn());
          return delete zn._x_hidePromise, delete zn._x_hideChildren, Bn;
        };
        An(Jr).catch((zn) => {
          if (!zn.isFromCancelledTransition) throw zn;
        });
      });
    });
  };
  function ls(Jr) {
    let nn = Jr.parentNode;
    if (nn) return nn._x_hidePromise ? nn : ls(nn);
  }
  function wa(Jr, nn, { during: ln, start: hn, end: yn } = {}, wn = () => {
  }, kn = () => {
  }) {
    if (Jr._x_transitioning && Jr._x_transitioning.cancel(), Object.keys(ln).length === 0 && Object.keys(hn).length === 0 && Object.keys(yn).length === 0) {
      wn(), kn();
      return;
    }
    let An, zn, Bn;
    ko(Jr, { start() {
      An = nn(Jr, hn);
    }, during() {
      zn = nn(Jr, ln);
    }, before: wn, end() {
      An(), Bn = nn(Jr, yn);
    }, after: kn, cleanup() {
      zn(), Bn();
    } });
  }
  function ko(Jr, nn) {
    let ln, hn, yn, wn = Ca(() => {
      ri(() => {
        ln = !0, hn || nn.before(), yn || (nn.end(), Sa()), nn.after(), Jr.isConnected && nn.cleanup(), delete Jr._x_transitioning;
      });
    });
    Jr._x_transitioning = { beforeCancels: [], beforeCancel(kn) {
      this.beforeCancels.push(kn);
    }, cancel: Ca(function() {
      for (; this.beforeCancels.length; ) this.beforeCancels.shift()();
      wn();
    }), finish: wn }, ri(() => {
      nn.start(), nn.during();
    }), vo(), requestAnimationFrame(() => {
      if (ln) return;
      let kn = Number(getComputedStyle(Jr).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3, An = Number(getComputedStyle(Jr).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
      kn === 0 && (kn = Number(getComputedStyle(Jr).animationDuration.replace("s", "")) * 1e3), ri(() => {
        nn.before();
      }), hn = !0, requestAnimationFrame(() => {
        ln || (ri(() => {
          nn.end();
        }), Sa(), setTimeout(Jr._x_transitioning.finish, kn + An), yn = !0);
      });
    });
  }
  function Bi(Jr, nn, ln) {
    if (Jr.indexOf(nn) === -1) return ln;
    let hn = Jr[Jr.indexOf(nn) + 1];
    if (!hn || nn === "scale" && isNaN(hn)) return ln;
    if (nn === "duration" || nn === "delay") {
      let yn = hn.match(/([0-9]+)ms/);
      if (yn) return yn[1];
    }
    return nn === "origin" && ["top", "right", "left", "center", "bottom"].includes(Jr[Jr.indexOf(nn) + 2]) ? [hn, Jr[Jr.indexOf(nn) + 2]].join(" ") : hn;
  }
  var Si = !1;
  function _i(Jr, nn = () => {
  }) {
    return (...ln) => Si ? nn(...ln) : Jr(...ln);
  }
  function To(Jr) {
    return (...nn) => Si && Jr(...nn);
  }
  var ds = [];
  function Yi(Jr) {
    ds.push(Jr);
  }
  function _o(Jr, nn) {
    ds.forEach((ln) => ln(Jr, nn)), Si = !0, us(() => {
      En(nn, (ln, hn) => {
        hn(ln, () => {
        });
      });
    }), Si = !1;
  }
  var ka = !1;
  function Eo(Jr, nn) {
    nn._x_dataStack || (nn._x_dataStack = Jr._x_dataStack), Si = !0, ka = !0, us(() => {
      qo(nn);
    }), Si = !1, ka = !1;
  }
  function qo(Jr) {
    let nn = !1;
    En(Jr, (ln, hn) => {
      fn(ln, (yn, wn) => {
        if (nn && Gn(yn)) return wn();
        nn = !0, hn(yn, wn);
      });
    });
  }
  function us(Jr) {
    let nn = sn;
    vn((ln, hn) => {
      let yn = nn(ln);
      return on(yn), () => {
      };
    }), Jr(), vn(nn);
  }
  function cs(Jr, nn, ln, hn = []) {
    switch (Jr._x_bindings || (Jr._x_bindings = rn({})), Jr._x_bindings[nn] = ln, nn = hn.includes("camel") ? Po(nn) : nn, nn) {
      case "value":
        Ao(Jr, ln);
        break;
      case "style":
        Ro(Jr, ln);
        break;
      case "class":
        Oo(Jr, ln);
        break;
      case "selected":
      case "checked":
        zo(Jr, nn, ln);
        break;
      default:
        ps(Jr, nn, ln);
        break;
    }
  }
  function Ao(Jr, nn) {
    if (Jr.type === "radio") Jr.attributes.value === void 0 && (Jr.value = nn), window.fromModel && (typeof nn == "boolean" ? Jr.checked = Qi(Jr.value) === nn : Jr.checked = ms(Jr.value, nn));
    else if (Jr.type === "checkbox") Number.isInteger(nn) ? Jr.value = nn : !Array.isArray(nn) && typeof nn != "boolean" && ![null, void 0].includes(nn) ? Jr.value = String(nn) : Array.isArray(nn) ? Jr.checked = nn.some((ln) => ms(ln, Jr.value)) : Jr.checked = !!nn;
    else if (Jr.tagName === "SELECT") Io(Jr, nn);
    else {
      if (Jr.value === nn) return;
      Jr.value = nn === void 0 ? "" : nn;
    }
  }
  function Oo(Jr, nn) {
    Jr._x_undoAddedClasses && Jr._x_undoAddedClasses(), Jr._x_undoAddedClasses = xa(Jr, nn);
  }
  function Ro(Jr, nn) {
    Jr._x_undoAddedStyles && Jr._x_undoAddedStyles(), Jr._x_undoAddedStyles = Ui(Jr, nn);
  }
  function zo(Jr, nn, ln) {
    ps(Jr, nn, ln), jo(Jr, nn, ln);
  }
  function ps(Jr, nn, ln) {
    [null, void 0, !1].includes(ln) && Wo(nn) ? Jr.removeAttribute(nn) : (hs(nn) && (ln = nn), Lo(Jr, nn, ln));
  }
  function Lo(Jr, nn, ln) {
    Jr.getAttribute(nn) != ln && Jr.setAttribute(nn, ln);
  }
  function jo(Jr, nn, ln) {
    Jr[nn] !== ln && (Jr[nn] = ln);
  }
  function Io(Jr, nn) {
    let ln = [].concat(nn).map((hn) => hn + "");
    Array.from(Jr.options).forEach((hn) => {
      hn.selected = ln.includes(hn.value);
    });
  }
  function Po(Jr) {
    return Jr.toLowerCase().replace(/-(\w)/g, (nn, ln) => ln.toUpperCase());
  }
  function ms(Jr, nn) {
    return Jr == nn;
  }
  function Qi(Jr) {
    return [1, "1", "true", "on", "yes", !0].includes(Jr) ? !0 : [0, "0", "false", "off", "no", !1].includes(Jr) ? !1 : Jr ? !!Jr : null;
  }
  function hs(Jr) {
    return ["disabled", "checked", "required", "readonly", "hidden", "open", "selected", "autofocus", "itemscope", "multiple", "novalidate", "allowfullscreen", "allowpaymentrequest", "formnovalidate", "autoplay", "controls", "loop", "muted", "playsinline", "default", "ismap", "reversed", "async", "defer", "nomodule"].includes(Jr);
  }
  function Wo(Jr) {
    return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(Jr);
  }
  function Mo(Jr, nn, ln) {
    return Jr._x_bindings && Jr._x_bindings[nn] !== void 0 ? Jr._x_bindings[nn] : fs(Jr, nn, ln);
  }
  function Bo(Jr, nn, ln, hn = !0) {
    if (Jr._x_bindings && Jr._x_bindings[nn] !== void 0) return Jr._x_bindings[nn];
    if (Jr._x_inlineBindings && Jr._x_inlineBindings[nn] !== void 0) {
      let yn = Jr._x_inlineBindings[nn];
      return yn.extract = hn, Ua(() => ki(Jr, yn.expression));
    }
    return fs(Jr, nn, ln);
  }
  function fs(Jr, nn, ln) {
    let hn = Jr.getAttribute(nn);
    return hn === null ? typeof ln == "function" ? ln() : ln : hn === "" ? !0 : hs(nn) ? !![nn, "true"].includes(hn) : hn;
  }
  function gs(Jr, nn) {
    var ln;
    return function() {
      var hn = this, yn = arguments, wn = function() {
        ln = null, Jr.apply(hn, yn);
      };
      clearTimeout(ln), ln = setTimeout(wn, nn);
    };
  }
  function vs(Jr, nn) {
    let ln;
    return function() {
      let hn = this, yn = arguments;
      ln || (Jr.apply(hn, yn), ln = !0, setTimeout(() => ln = !1, nn));
    };
  }
  function ys({ get: Jr, set: nn }, { get: ln, set: hn }) {
    let yn = !0, wn, kn = sn(() => {
      let An = Jr(), zn = ln();
      if (yn) hn(Ta(An)), yn = !1;
      else {
        let Bn = JSON.stringify(An), Dn = JSON.stringify(zn);
        Bn !== wn ? hn(Ta(An)) : Bn !== Dn && nn(Ta(zn));
      }
      wn = JSON.stringify(Jr()), JSON.stringify(ln());
    });
    return () => {
      on(kn);
    };
  }
  function Ta(Jr) {
    return typeof Jr == "object" ? JSON.parse(JSON.stringify(Jr)) : Jr;
  }
  function No(Jr) {
    (Array.isArray(Jr) ? Jr : [Jr]).forEach((nn) => nn(Ni));
  }
  var Ei = {}, bs = !1;
  function Do(Jr, nn) {
    if (bs || (Ei = rn(Ei), bs = !0), nn === void 0) return Ei[Jr];
    Ei[Jr] = nn, typeof nn == "object" && nn !== null && nn.hasOwnProperty("init") && typeof nn.init == "function" && Ei[Jr].init(), Fa(Ei[Jr]);
  }
  function $o() {
    return Ei;
  }
  var Ss = {};
  function Fo(Jr, nn) {
    let ln = typeof nn != "function" ? () => nn : nn;
    return Jr instanceof Element ? xs(Jr, ln()) : (Ss[Jr] = ln, () => {
    });
  }
  function Ho(Jr) {
    return Object.entries(Ss).forEach(([nn, ln]) => {
      Object.defineProperty(Jr, nn, { get() {
        return (...hn) => ln(...hn);
      } });
    }), Jr;
  }
  function xs(Jr, nn, ln) {
    let hn = [];
    for (; hn.length; ) hn.pop()();
    let yn = Object.entries(nn).map(([kn, An]) => ({ name: kn, value: An })), wn = Ka(yn);
    return yn = yn.map((kn) => wn.find((An) => An.name === kn.name) ? { name: `x-bind:${kn.name}`, value: `"${kn.value}"` } : kn), ma(Jr, yn, ln).map((kn) => {
      hn.push(kn.runCleanups), kn();
    }), () => {
      for (; hn.length; ) hn.pop()();
    };
  }
  var Cs = {};
  function Vo(Jr, nn) {
    Cs[Jr] = nn;
  }
  function Go(Jr, nn) {
    return Object.entries(Cs).forEach(([ln, hn]) => {
      Object.defineProperty(Jr, ln, { get() {
        return (...yn) => hn.bind(nn)(...yn);
      }, enumerable: !1 });
    }), Jr;
  }
  var Uo = { get reactive() {
    return rn;
  }, get release() {
    return on;
  }, get effect() {
    return sn;
  }, get raw() {
    return an;
  }, version: "3.13.7", flushAndStopDeferringMutations: Hi, dontAutoEvaluateFunctions: Ua, disableEffectScheduling: pn, startObservingMutations: $n, stopObservingMutations: Kn, setReactivityEngine: mn, onAttributeRemoved: Qn, onAttributesAdded: Fn, closestDataStack: Oi, skipDuringClone: _i, onlyDuringClone: To, addRootSelector: Pn, addInitSelector: In, interceptClone: Yi, addScopeToNode: Ii, deferMutations: fi, mapAttributes: fa, evaluateLater: hi, interceptInit: Hn, setEvaluator: oo, mergeProxies: Pi, extractProp: Bo, findClosest: Nn, onElRemoved: Wn, closestRoot: Mn, destroyTree: Yn, interceptor: Ha, transition: wa, setStyles: Ui, mutateDom: ri, directive: di, entangle: ys, throttle: vs, debounce: gs, evaluate: ki, initTree: En, nextTick: ba, prefixed: Ri, prefix: po, plugin: No, magic: vi, store: Do, start: bn, clone: Eo, cloneNode: _o, bound: Mo, $data: $a, watch: gn, walk: fn, data: Vo, bind: Fo }, Ni = Uo;
  function ws(Jr, nn) {
    let ln = /* @__PURE__ */ Object.create(null), hn = Jr.split(",");
    for (let yn = 0; yn < hn.length; yn++) ln[hn[yn]] = !0;
    return (yn) => !!ln[yn];
  }
  var Yo = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";
  ws(Yo + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");
  var Qo = Object.freeze({}), Ko = Object.prototype.hasOwnProperty, Ki = (Jr, nn) => Ko.call(Jr, nn), qi = Array.isArray, Di = (Jr) => ks(Jr) === "[object Map]", Xo = (Jr) => typeof Jr == "string", _a = (Jr) => typeof Jr == "symbol", Xi = (Jr) => Jr !== null && typeof Jr == "object", Zo = Object.prototype.toString, ks = (Jr) => Zo.call(Jr), Ts = (Jr) => ks(Jr).slice(8, -1), Ea = (Jr) => Xo(Jr) && Jr !== "NaN" && Jr[0] !== "-" && "" + parseInt(Jr, 10) === Jr, Jo = (Jr) => {
    let nn = /* @__PURE__ */ Object.create(null);
    return (ln) => nn[ln] || (nn[ln] = Jr(ln));
  }, el = Jo((Jr) => Jr.charAt(0).toUpperCase() + Jr.slice(1)), _s = (Jr, nn) => Jr !== nn && (Jr === Jr || nn === nn), qa = /* @__PURE__ */ new WeakMap(), $i = [], bi, Ai = Symbol("iterate"), Aa = Symbol("Map key iterate");
  function tl(Jr) {
    return Jr && Jr._isEffect === !0;
  }
  function rl(Jr, nn = Qo) {
    tl(Jr) && (Jr = Jr.raw);
    let ln = al(Jr, nn);
    return nn.lazy || ln(), ln;
  }
  function nl(Jr) {
    Jr.active && (Es(Jr), Jr.options.onStop && Jr.options.onStop(), Jr.active = !1);
  }
  var il = 0;
  function al(Jr, nn) {
    let ln = function() {
      if (!ln.active) return Jr();
      if (!$i.includes(ln)) {
        Es(ln);
        try {
          return ol(), $i.push(ln), bi = ln, Jr();
        } finally {
          $i.pop(), qs(), bi = $i[$i.length - 1];
        }
      }
    };
    return ln.id = il++, ln.allowRecurse = !!nn.allowRecurse, ln._isEffect = !0, ln.active = !0, ln.raw = Jr, ln.deps = [], ln.options = nn, ln;
  }
  function Es(Jr) {
    let { deps: nn } = Jr;
    if (nn.length) {
      for (let ln = 0; ln < nn.length; ln++) nn[ln].delete(Jr);
      nn.length = 0;
    }
  }
  var zi = !0, Oa = [];
  function sl() {
    Oa.push(zi), zi = !1;
  }
  function ol() {
    Oa.push(zi), zi = !0;
  }
  function qs() {
    let Jr = Oa.pop();
    zi = Jr === void 0 ? !0 : Jr;
  }
  function yi(Jr, nn, ln) {
    if (!zi || bi === void 0) return;
    let hn = qa.get(Jr);
    hn || qa.set(Jr, hn = /* @__PURE__ */ new Map());
    let yn = hn.get(ln);
    yn || hn.set(ln, yn = /* @__PURE__ */ new Set()), yn.has(bi) || (yn.add(bi), bi.deps.push(yn), bi.options.onTrack && bi.options.onTrack({ effect: bi, target: Jr, type: nn, key: ln }));
  }
  function xi(Jr, nn, ln, hn, yn, wn) {
    let kn = qa.get(Jr);
    if (!kn) return;
    let An = /* @__PURE__ */ new Set(), zn = (Dn) => {
      Dn && Dn.forEach((Zn) => {
        (Zn !== bi || Zn.allowRecurse) && An.add(Zn);
      });
    };
    if (nn === "clear") kn.forEach(zn);
    else if (ln === "length" && qi(Jr)) kn.forEach((Dn, Zn) => {
      (Zn === "length" || Zn >= hn) && zn(Dn);
    });
    else switch (ln !== void 0 && zn(kn.get(ln)), nn) {
      case "add":
        qi(Jr) ? Ea(ln) && zn(kn.get("length")) : (zn(kn.get(Ai)), Di(Jr) && zn(kn.get(Aa)));
        break;
      case "delete":
        qi(Jr) || (zn(kn.get(Ai)), Di(Jr) && zn(kn.get(Aa)));
        break;
      case "set":
        Di(Jr) && zn(kn.get(Ai));
        break;
    }
    let Bn = (Dn) => {
      Dn.options.onTrigger && Dn.options.onTrigger({ effect: Dn, target: Jr, key: ln, type: nn, newValue: hn, oldValue: yn, oldTarget: wn }), Dn.options.scheduler ? Dn.options.scheduler(Dn) : Dn();
    };
    An.forEach(Bn);
  }
  var ll = ws("__proto__,__v_isRef,__isVue"), As = new Set(Object.getOwnPropertyNames(Symbol).map((Jr) => Symbol[Jr]).filter(_a)), dl = Rs(), ul = Rs(!0), Os = cl();
  function cl() {
    let Jr = {};
    return ["includes", "indexOf", "lastIndexOf"].forEach((nn) => {
      Jr[nn] = function(...ln) {
        let hn = ai(this);
        for (let wn = 0, kn = this.length; wn < kn; wn++) yi(hn, "get", wn + "");
        let yn = hn[nn](...ln);
        return yn === -1 || yn === !1 ? hn[nn](...ln.map(ai)) : yn;
      };
    }), ["push", "pop", "shift", "unshift", "splice"].forEach((nn) => {
      Jr[nn] = function(...ln) {
        sl();
        let hn = ai(this)[nn].apply(this, ln);
        return qs(), hn;
      };
    }), Jr;
  }
  function Rs(Jr = !1, nn = !1) {
    return function(ln, hn, yn) {
      if (hn === "__v_isReactive") return !Jr;
      if (hn === "__v_isReadonly") return Jr;
      if (hn === "__v_raw" && yn === (Jr ? nn ? Tl : Bs : nn ? kl : Ms).get(ln)) return ln;
      let wn = qi(ln);
      if (!Jr && wn && Ki(Os, hn)) return Reflect.get(Os, hn, yn);
      let kn = Reflect.get(ln, hn, yn);
      return (_a(hn) ? As.has(hn) : ll(hn)) || (Jr || yi(ln, "get", hn), nn) ? kn : Ia(kn) ? !wn || !Ea(hn) ? kn.value : kn : Xi(kn) ? Jr ? Ns(kn) : ja(kn) : kn;
    };
  }
  var pl = ml();
  function ml(Jr = !1) {
    return function(nn, ln, hn, yn) {
      let wn = nn[ln];
      if (!Jr && (hn = ai(hn), wn = ai(wn), !qi(nn) && Ia(wn) && !Ia(hn))) return wn.value = hn, !0;
      let kn = qi(nn) && Ea(ln) ? Number(ln) < nn.length : Ki(nn, ln), An = Reflect.set(nn, ln, hn, yn);
      return nn === ai(yn) && (kn ? _s(hn, wn) && xi(nn, "set", ln, hn, wn) : xi(nn, "add", ln, hn)), An;
    };
  }
  function hl(Jr, nn) {
    let ln = Ki(Jr, nn), hn = Jr[nn], yn = Reflect.deleteProperty(Jr, nn);
    return yn && ln && xi(Jr, "delete", nn, void 0, hn), yn;
  }
  function fl(Jr, nn) {
    let ln = Reflect.has(Jr, nn);
    return (!_a(nn) || !As.has(nn)) && yi(Jr, "has", nn), ln;
  }
  function gl(Jr) {
    return yi(Jr, "iterate", qi(Jr) ? "length" : Ai), Reflect.ownKeys(Jr);
  }
  var vl = { get: dl, set: pl, deleteProperty: hl, has: fl, ownKeys: gl }, yl = { get: ul, set(Jr, nn) {
    return console.warn(`Set operation on key "${String(nn)}" failed: target is readonly.`, Jr), !0;
  }, deleteProperty(Jr, nn) {
    return console.warn(`Delete operation on key "${String(nn)}" failed: target is readonly.`, Jr), !0;
  } }, Ra = (Jr) => Xi(Jr) ? ja(Jr) : Jr, za = (Jr) => Xi(Jr) ? Ns(Jr) : Jr, La = (Jr) => Jr, Zi = (Jr) => Reflect.getPrototypeOf(Jr);
  function Ji(Jr, nn, ln = !1, hn = !1) {
    Jr = Jr.__v_raw;
    let yn = ai(Jr), wn = ai(nn);
    nn !== wn && !ln && yi(yn, "get", nn), !ln && yi(yn, "get", wn);
    let { has: kn } = Zi(yn), An = hn ? La : ln ? za : Ra;
    if (kn.call(yn, nn)) return An(Jr.get(nn));
    if (kn.call(yn, wn)) return An(Jr.get(wn));
    Jr !== yn && Jr.get(nn);
  }
  function ea(Jr, nn = !1) {
    let ln = this.__v_raw, hn = ai(ln), yn = ai(Jr);
    return Jr !== yn && !nn && yi(hn, "has", Jr), !nn && yi(hn, "has", yn), Jr === yn ? ln.has(Jr) : ln.has(Jr) || ln.has(yn);
  }
  function ta(Jr, nn = !1) {
    return Jr = Jr.__v_raw, !nn && yi(ai(Jr), "iterate", Ai), Reflect.get(Jr, "size", Jr);
  }
  function zs(Jr) {
    Jr = ai(Jr);
    let nn = ai(this);
    return Zi(nn).has.call(nn, Jr) || (nn.add(Jr), xi(nn, "add", Jr, Jr)), this;
  }
  function Ls(Jr, nn) {
    nn = ai(nn);
    let ln = ai(this), { has: hn, get: yn } = Zi(ln), wn = hn.call(ln, Jr);
    wn ? Ws(ln, hn, Jr) : (Jr = ai(Jr), wn = hn.call(ln, Jr));
    let kn = yn.call(ln, Jr);
    return ln.set(Jr, nn), wn ? _s(nn, kn) && xi(ln, "set", Jr, nn, kn) : xi(ln, "add", Jr, nn), this;
  }
  function js(Jr) {
    let nn = ai(this), { has: ln, get: hn } = Zi(nn), yn = ln.call(nn, Jr);
    yn ? Ws(nn, ln, Jr) : (Jr = ai(Jr), yn = ln.call(nn, Jr));
    let wn = hn ? hn.call(nn, Jr) : void 0, kn = nn.delete(Jr);
    return yn && xi(nn, "delete", Jr, void 0, wn), kn;
  }
  function Is() {
    let Jr = ai(this), nn = Jr.size !== 0, ln = Di(Jr) ? new Map(Jr) : new Set(Jr), hn = Jr.clear();
    return nn && xi(Jr, "clear", void 0, void 0, ln), hn;
  }
  function ra(Jr, nn) {
    return function(ln, hn) {
      let yn = this, wn = yn.__v_raw, kn = ai(wn), An = nn ? La : Jr ? za : Ra;
      return !Jr && yi(kn, "iterate", Ai), wn.forEach((zn, Bn) => ln.call(hn, An(zn), An(Bn), yn));
    };
  }
  function na(Jr, nn, ln) {
    return function(...hn) {
      let yn = this.__v_raw, wn = ai(yn), kn = Di(wn), An = Jr === "entries" || Jr === Symbol.iterator && kn, zn = Jr === "keys" && kn, Bn = yn[Jr](...hn), Dn = ln ? La : nn ? za : Ra;
      return !nn && yi(wn, "iterate", zn ? Aa : Ai), { next() {
        let { value: Zn, done: ti } = Bn.next();
        return ti ? { value: Zn, done: ti } : { value: An ? [Dn(Zn[0]), Dn(Zn[1])] : Dn(Zn), done: ti };
      }, [Symbol.iterator]() {
        return this;
      } };
    };
  }
  function Ci(Jr) {
    return function(...nn) {
      {
        let ln = nn[0] ? `on key "${nn[0]}" ` : "";
        console.warn(`${el(Jr)} operation ${ln}failed: target is readonly.`, ai(this));
      }
      return Jr === "delete" ? !1 : this;
    };
  }
  function bl() {
    let Jr = { get(yn) {
      return Ji(this, yn);
    }, get size() {
      return ta(this);
    }, has: ea, add: zs, set: Ls, delete: js, clear: Is, forEach: ra(!1, !1) }, nn = { get(yn) {
      return Ji(this, yn, !1, !0);
    }, get size() {
      return ta(this);
    }, has: ea, add: zs, set: Ls, delete: js, clear: Is, forEach: ra(!1, !0) }, ln = { get(yn) {
      return Ji(this, yn, !0);
    }, get size() {
      return ta(this, !0);
    }, has(yn) {
      return ea.call(this, yn, !0);
    }, add: Ci("add"), set: Ci("set"), delete: Ci("delete"), clear: Ci("clear"), forEach: ra(!0, !1) }, hn = { get(yn) {
      return Ji(this, yn, !0, !0);
    }, get size() {
      return ta(this, !0);
    }, has(yn) {
      return ea.call(this, yn, !0);
    }, add: Ci("add"), set: Ci("set"), delete: Ci("delete"), clear: Ci("clear"), forEach: ra(!0, !0) };
    return ["keys", "values", "entries", Symbol.iterator].forEach((yn) => {
      Jr[yn] = na(yn, !1, !1), ln[yn] = na(yn, !0, !1), nn[yn] = na(yn, !1, !0), hn[yn] = na(yn, !0, !0);
    }), [Jr, ln, nn, hn];
  }
  var [Sl, xl, Ql, Kl] = bl();
  function Ps(Jr, nn) {
    let ln = Jr ? xl : Sl;
    return (hn, yn, wn) => yn === "__v_isReactive" ? !Jr : yn === "__v_isReadonly" ? Jr : yn === "__v_raw" ? hn : Reflect.get(Ki(ln, yn) && yn in hn ? ln : hn, yn, wn);
  }
  var Cl = { get: Ps(!1) }, wl = { get: Ps(!0) };
  function Ws(Jr, nn, ln) {
    let hn = ai(ln);
    if (hn !== ln && nn.call(Jr, hn)) {
      let yn = Ts(Jr);
      console.warn(`Reactive ${yn} contains both the raw and reactive versions of the same object${yn === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
    }
  }
  var Ms = /* @__PURE__ */ new WeakMap(), kl = /* @__PURE__ */ new WeakMap(), Bs = /* @__PURE__ */ new WeakMap(), Tl = /* @__PURE__ */ new WeakMap();
  function _l(Jr) {
    switch (Jr) {
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
  function El(Jr) {
    return Jr.__v_skip || !Object.isExtensible(Jr) ? 0 : _l(Ts(Jr));
  }
  function ja(Jr) {
    return Jr && Jr.__v_isReadonly ? Jr : Ds(Jr, !1, vl, Cl, Ms);
  }
  function Ns(Jr) {
    return Ds(Jr, !0, yl, wl, Bs);
  }
  function Ds(Jr, nn, ln, hn, yn) {
    if (!Xi(Jr)) return console.warn(`value cannot be made reactive: ${String(Jr)}`), Jr;
    if (Jr.__v_raw && !(nn && Jr.__v_isReactive)) return Jr;
    let wn = yn.get(Jr);
    if (wn) return wn;
    let kn = El(Jr);
    if (kn === 0) return Jr;
    let An = new Proxy(Jr, kn === 2 ? hn : ln);
    return yn.set(Jr, An), An;
  }
  function ai(Jr) {
    return Jr && ai(Jr.__v_raw) || Jr;
  }
  function Ia(Jr) {
    return !!(Jr && Jr.__v_isRef === !0);
  }
  vi("nextTick", () => ba), vi("dispatch", (Jr) => un.bind(un, Jr)), vi("watch", (Jr, { evaluateLater: nn, cleanup: ln }) => (hn, yn) => {
    let wn = nn(hn), kn = gn(() => {
      let An;
      return wn((zn) => An = zn), An;
    }, yn);
    ln(kn);
  }), vi("store", $o), vi("data", (Jr) => $a(Jr)), vi("root", (Jr) => Mn(Jr)), vi("refs", (Jr) => (Jr._x_refs_proxy || (Jr._x_refs_proxy = Pi(ql(Jr))), Jr._x_refs_proxy));
  function ql(Jr) {
    let nn = [];
    return Nn(Jr, (ln) => {
      ln._x_refs && nn.push(ln._x_refs);
    }), nn;
  }
  var Pa = {};
  function $s(Jr) {
    return Pa[Jr] || (Pa[Jr] = 0), ++Pa[Jr];
  }
  function Al(Jr, nn) {
    return Nn(Jr, (ln) => {
      if (ln._x_ids && ln._x_ids[nn]) return !0;
    });
  }
  function Ol(Jr, nn) {
    Jr._x_ids || (Jr._x_ids = {}), Jr._x_ids[nn] || (Jr._x_ids[nn] = $s(nn));
  }
  vi("id", (Jr, { cleanup: nn }) => (ln, hn = null) => {
    let yn = `${ln}${hn ? `-${hn}` : ""}`;
    return Rl(Jr, yn, nn, () => {
      let wn = Al(Jr, ln), kn = wn ? wn._x_ids[ln] : $s(ln);
      return hn ? `${ln}-${kn}-${hn}` : `${ln}-${kn}`;
    });
  }), Yi((Jr, nn) => {
    Jr._x_id && (nn._x_id = Jr._x_id);
  });
  function Rl(Jr, nn, ln, hn) {
    if (Jr._x_id || (Jr._x_id = {}), Jr._x_id[nn]) return Jr._x_id[nn];
    let yn = hn();
    return Jr._x_id[nn] = yn, ln(() => {
      delete Jr._x_id[nn];
    }), yn;
  }
  vi("el", (Jr) => Jr), Fs("Focus", "focus", "focus"), Fs("Persist", "persist", "persist");
  function Fs(Jr, nn, ln) {
    vi(nn, (hn) => cn(`You can't use [$${nn}] without first installing the "${Jr}" plugin here: https://alpinejs.dev/plugins/${ln}`, hn));
  }
  di("modelable", (Jr, { expression: nn }, { effect: ln, evaluateLater: hn, cleanup: yn }) => {
    let wn = hn(nn), kn = () => {
      let Dn;
      return wn((Zn) => Dn = Zn), Dn;
    }, An = hn(`${nn} = __placeholder`), zn = (Dn) => An(() => {
    }, { scope: { __placeholder: Dn } }), Bn = kn();
    zn(Bn), queueMicrotask(() => {
      if (!Jr._x_model) return;
      Jr._x_removeModelListeners.default();
      let Dn = Jr._x_model.get, Zn = Jr._x_model.set, ti = ys({ get() {
        return Dn();
      }, set(ci) {
        Zn(ci);
      } }, { get() {
        return kn();
      }, set(ci) {
        zn(ci);
      } });
      yn(ti);
    });
  }), di("teleport", (Jr, { modifiers: nn, expression: ln }, { cleanup: hn }) => {
    Jr.tagName.toLowerCase() !== "template" && cn("x-teleport can only be used on a <template> tag", Jr);
    let yn = Hs(ln), wn = Jr.content.cloneNode(!0).firstElementChild;
    Jr._x_teleport = wn, wn._x_teleportBack = Jr, Jr.setAttribute("data-teleport-template", !0), wn.setAttribute("data-teleport-target", !0), Jr._x_forwardEvents && Jr._x_forwardEvents.forEach((An) => {
      wn.addEventListener(An, (zn) => {
        zn.stopPropagation(), Jr.dispatchEvent(new zn.constructor(zn.type, zn));
      });
    }), Ii(wn, {}, Jr);
    let kn = (An, zn, Bn) => {
      Bn.includes("prepend") ? zn.parentNode.insertBefore(An, zn) : Bn.includes("append") ? zn.parentNode.insertBefore(An, zn.nextSibling) : zn.appendChild(An);
    };
    ri(() => {
      kn(wn, yn, nn), En(wn), wn._x_ignore = !0;
    }), Jr._x_teleportPutBack = () => {
      let An = Hs(ln);
      ri(() => {
        kn(Jr._x_teleport, An, nn);
      });
    }, hn(() => wn.remove());
  });
  var zl = document.createElement("div");
  function Hs(Jr) {
    let nn = _i(() => document.querySelector(Jr), () => zl)();
    return nn || cn(`Cannot find x-teleport element for selector: "${Jr}"`), nn;
  }
  var Vs = () => {
  };
  Vs.inline = (Jr, { modifiers: nn }, { cleanup: ln }) => {
    nn.includes("self") ? Jr._x_ignoreSelf = !0 : Jr._x_ignore = !0, ln(() => {
      nn.includes("self") ? delete Jr._x_ignoreSelf : delete Jr._x_ignore;
    });
  }, di("ignore", Vs), di("effect", _i((Jr, { expression: nn }, { effect: ln }) => {
    ln(hi(Jr, nn));
  }));
  function Wa(Jr, nn, ln, hn) {
    let yn = Jr, wn = (zn) => hn(zn), kn = {}, An = (zn, Bn) => (Dn) => Bn(zn, Dn);
    if (ln.includes("dot") && (nn = Ll(nn)), ln.includes("camel") && (nn = jl(nn)), ln.includes("passive") && (kn.passive = !0), ln.includes("capture") && (kn.capture = !0), ln.includes("window") && (yn = window), ln.includes("document") && (yn = document), ln.includes("debounce")) {
      let zn = ln[ln.indexOf("debounce") + 1] || "invalid-wait", Bn = ia(zn.split("ms")[0]) ? Number(zn.split("ms")[0]) : 250;
      wn = gs(wn, Bn);
    }
    if (ln.includes("throttle")) {
      let zn = ln[ln.indexOf("throttle") + 1] || "invalid-wait", Bn = ia(zn.split("ms")[0]) ? Number(zn.split("ms")[0]) : 250;
      wn = vs(wn, Bn);
    }
    return ln.includes("prevent") && (wn = An(wn, (zn, Bn) => {
      Bn.preventDefault(), zn(Bn);
    })), ln.includes("stop") && (wn = An(wn, (zn, Bn) => {
      Bn.stopPropagation(), zn(Bn);
    })), ln.includes("self") && (wn = An(wn, (zn, Bn) => {
      Bn.target === Jr && zn(Bn);
    })), (ln.includes("away") || ln.includes("outside")) && (yn = document, wn = An(wn, (zn, Bn) => {
      Jr.contains(Bn.target) || Bn.target.isConnected !== !1 && (Jr.offsetWidth < 1 && Jr.offsetHeight < 1 || Jr._x_isShown !== !1 && zn(Bn));
    })), ln.includes("once") && (wn = An(wn, (zn, Bn) => {
      zn(Bn), yn.removeEventListener(nn, wn, kn);
    })), wn = An(wn, (zn, Bn) => {
      Pl(nn) && Wl(Bn, ln) || zn(Bn);
    }), yn.addEventListener(nn, wn, kn), () => {
      yn.removeEventListener(nn, wn, kn);
    };
  }
  function Ll(Jr) {
    return Jr.replace(/-/g, ".");
  }
  function jl(Jr) {
    return Jr.toLowerCase().replace(/-(\w)/g, (nn, ln) => ln.toUpperCase());
  }
  function ia(Jr) {
    return !Array.isArray(Jr) && !isNaN(Jr);
  }
  function Il(Jr) {
    return [" ", "_"].includes(Jr) ? Jr : Jr.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
  }
  function Pl(Jr) {
    return ["keydown", "keyup"].includes(Jr);
  }
  function Wl(Jr, nn) {
    let ln = nn.filter((yn) => !["window", "document", "prevent", "stop", "once", "capture"].includes(yn));
    if (ln.includes("debounce")) {
      let yn = ln.indexOf("debounce");
      ln.splice(yn, ia((ln[yn + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
    }
    if (ln.includes("throttle")) {
      let yn = ln.indexOf("throttle");
      ln.splice(yn, ia((ln[yn + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
    }
    if (ln.length === 0 || ln.length === 1 && Gs(Jr.key).includes(ln[0])) return !1;
    let hn = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((yn) => ln.includes(yn));
    return ln = ln.filter((yn) => !hn.includes(yn)), !(hn.length > 0 && hn.filter((yn) => ((yn === "cmd" || yn === "super") && (yn = "meta"), Jr[`${yn}Key`])).length === hn.length && Gs(Jr.key).includes(ln[0]));
  }
  function Gs(Jr) {
    if (!Jr) return [];
    Jr = Il(Jr);
    let nn = { ctrl: "control", slash: "/", space: " ", spacebar: " ", cmd: "meta", esc: "escape", up: "arrow-up", down: "arrow-down", left: "arrow-left", right: "arrow-right", period: ".", equal: "=", minus: "-", underscore: "_" };
    return nn[Jr] = Jr, Object.keys(nn).map((ln) => {
      if (nn[ln] === Jr) return ln;
    }).filter((ln) => ln);
  }
  di("model", (Jr, { modifiers: nn, expression: ln }, { effect: hn, cleanup: yn }) => {
    let wn = Jr;
    nn.includes("parent") && (wn = Jr.parentNode);
    let kn = hi(wn, ln), An;
    typeof ln == "string" ? An = hi(wn, `${ln} = __placeholder`) : typeof ln == "function" && typeof ln() == "string" ? An = hi(wn, `${ln()} = __placeholder`) : An = () => {
    };
    let zn = () => {
      let ti;
      return kn((ci) => ti = ci), Us(ti) ? ti.get() : ti;
    }, Bn = (ti) => {
      let ci;
      kn((wi) => ci = wi), Us(ci) ? ci.set(ti) : An(() => {
      }, { scope: { __placeholder: ti } });
    };
    typeof ln == "string" && Jr.type === "radio" && ri(() => {
      Jr.hasAttribute("name") || Jr.setAttribute("name", ln);
    });
    var Dn = Jr.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(Jr.type) || nn.includes("lazy") ? "change" : "input";
    let Zn = Si ? () => {
    } : Wa(Jr, Dn, nn, (ti) => {
      Bn(Ml(Jr, nn, ti, zn()));
    });
    if (nn.includes("fill") && ([void 0, null, ""].includes(zn()) || Jr.type === "checkbox" && Array.isArray(zn())) && Jr.dispatchEvent(new Event(Dn, {})), Jr._x_removeModelListeners || (Jr._x_removeModelListeners = {}), Jr._x_removeModelListeners.default = Zn, yn(() => Jr._x_removeModelListeners.default()), Jr.form) {
      let ti = Wa(Jr.form, "reset", [], (ci) => {
        ba(() => Jr._x_model && Jr._x_model.set(Jr.value));
      });
      yn(() => ti());
    }
    Jr._x_model = { get() {
      return zn();
    }, set(ti) {
      Bn(ti);
    } }, Jr._x_forceModelUpdate = (ti) => {
      ti === void 0 && typeof ln == "string" && ln.match(/\./) && (ti = ""), window.fromModel = !0, ri(() => cs(Jr, "value", ti)), delete window.fromModel;
    }, hn(() => {
      let ti = zn();
      nn.includes("unintrusive") && document.activeElement.isSameNode(Jr) || Jr._x_forceModelUpdate(ti);
    });
  });
  function Ml(Jr, nn, ln, hn) {
    return ri(() => {
      if (ln instanceof CustomEvent && ln.detail !== void 0) return ln.detail !== null && ln.detail !== void 0 ? ln.detail : ln.target.value;
      if (Jr.type === "checkbox") if (Array.isArray(hn)) {
        let yn = null;
        return nn.includes("number") ? yn = Ma(ln.target.value) : nn.includes("boolean") ? yn = Qi(ln.target.value) : yn = ln.target.value, ln.target.checked ? hn.concat([yn]) : hn.filter((wn) => !Bl(wn, yn));
      } else return ln.target.checked;
      else return Jr.tagName.toLowerCase() === "select" && Jr.multiple ? nn.includes("number") ? Array.from(ln.target.selectedOptions).map((yn) => {
        let wn = yn.value || yn.text;
        return Ma(wn);
      }) : nn.includes("boolean") ? Array.from(ln.target.selectedOptions).map((yn) => {
        let wn = yn.value || yn.text;
        return Qi(wn);
      }) : Array.from(ln.target.selectedOptions).map((yn) => yn.value || yn.text) : nn.includes("number") ? Ma(ln.target.value) : nn.includes("boolean") ? Qi(ln.target.value) : nn.includes("trim") ? ln.target.value.trim() : ln.target.value;
    });
  }
  function Ma(Jr) {
    let nn = Jr ? parseFloat(Jr) : null;
    return Nl(nn) ? nn : Jr;
  }
  function Bl(Jr, nn) {
    return Jr == nn;
  }
  function Nl(Jr) {
    return !Array.isArray(Jr) && !isNaN(Jr);
  }
  function Us(Jr) {
    return Jr !== null && typeof Jr == "object" && typeof Jr.get == "function" && typeof Jr.set == "function";
  }
  di("cloak", (Jr) => queueMicrotask(() => ri(() => Jr.removeAttribute(Ri("cloak"))))), In(() => `[${Ri("init")}]`), di("init", _i((Jr, { expression: nn }, { evaluate: ln }) => typeof nn == "string" ? !!nn.trim() && ln(nn, {}, !1) : ln(nn, {}, !1))), di("text", (Jr, { expression: nn }, { effect: ln, evaluateLater: hn }) => {
    let yn = hn(nn);
    ln(() => {
      yn((wn) => {
        ri(() => {
          Jr.textContent = wn;
        });
      });
    });
  }), di("html", (Jr, { expression: nn }, { effect: ln, evaluateLater: hn }) => {
    let yn = hn(nn);
    ln(() => {
      yn((wn) => {
        ri(() => {
          Jr.innerHTML = wn, Jr._x_ignoreSelf = !0, En(Jr), delete Jr._x_ignoreSelf;
        });
      });
    });
  }), fa(Ja(":", es(Ri("bind:"))));
  var Ys = (Jr, { value: nn, modifiers: ln, expression: hn, original: yn }, { effect: wn }) => {
    if (!nn) {
      let An = {};
      Ho(An), hi(Jr, hn)((zn) => {
        xs(Jr, zn, yn);
      }, { scope: An });
      return;
    }
    if (nn === "key") return Dl(Jr, hn);
    if (Jr._x_inlineBindings && Jr._x_inlineBindings[nn] && Jr._x_inlineBindings[nn].extract) return;
    let kn = hi(Jr, hn);
    wn(() => kn((An) => {
      An === void 0 && typeof hn == "string" && hn.match(/\./) && (An = ""), ri(() => cs(Jr, nn, An, ln));
    }));
  };
  Ys.inline = (Jr, { value: nn, modifiers: ln, expression: hn }) => {
    nn && (Jr._x_inlineBindings || (Jr._x_inlineBindings = {}), Jr._x_inlineBindings[nn] = { expression: hn, extract: !1 });
  }, di("bind", Ys);
  function Dl(Jr, nn) {
    Jr._x_keyExpression = nn;
  }
  Pn(() => `[${Ri("data")}]`), di("data", (Jr, { expression: nn }, { cleanup: ln }) => {
    if ($l(Jr)) return;
    nn = nn === "" ? "{}" : nn;
    let hn = {};
    da(hn, Jr);
    let yn = {};
    Go(yn, hn);
    let wn = ki(Jr, nn, { scope: yn });
    (wn === void 0 || wn === !0) && (wn = {}), da(wn, Jr);
    let kn = rn(wn);
    Fa(kn);
    let An = Ii(Jr, kn);
    kn.init && ki(Jr, kn.init), ln(() => {
      kn.destroy && ki(Jr, kn.destroy), An();
    });
  }), Yi((Jr, nn) => {
    Jr._x_dataStack && (nn._x_dataStack = Jr._x_dataStack, nn.setAttribute("data-has-alpine-state", !0));
  });
  function $l(Jr) {
    return Si ? ka ? !0 : Jr.hasAttribute("data-has-alpine-state") : !1;
  }
  di("show", (Jr, { modifiers: nn, expression: ln }, { effect: hn }) => {
    let yn = hi(Jr, ln);
    Jr._x_doHide || (Jr._x_doHide = () => {
      ri(() => {
        Jr.style.setProperty("display", "none", nn.includes("important") ? "important" : void 0);
      });
    }), Jr._x_doShow || (Jr._x_doShow = () => {
      ri(() => {
        Jr.style.length === 1 && Jr.style.display === "none" ? Jr.removeAttribute("style") : Jr.style.removeProperty("display");
      });
    });
    let wn = () => {
      Jr._x_doHide(), Jr._x_isShown = !1;
    }, kn = () => {
      Jr._x_doShow(), Jr._x_isShown = !0;
    }, An = () => setTimeout(kn), zn = Ca((Zn) => Zn ? kn() : wn(), (Zn) => {
      typeof Jr._x_toggleAndCascadeWithTransitions == "function" ? Jr._x_toggleAndCascadeWithTransitions(Jr, Zn, kn, wn) : Zn ? An() : wn();
    }), Bn, Dn = !0;
    hn(() => yn((Zn) => {
      !Dn && Zn === Bn || (nn.includes("immediate") && (Zn ? An() : wn()), zn(Zn), Bn = Zn, Dn = !1);
    }));
  }), di("for", (Jr, { expression: nn }, { effect: ln, cleanup: hn }) => {
    let yn = Hl(nn), wn = hi(Jr, yn.items), kn = hi(Jr, Jr._x_keyExpression || "index");
    Jr._x_prevKeys = [], Jr._x_lookup = {}, ln(() => Fl(Jr, yn, wn, kn)), hn(() => {
      Object.values(Jr._x_lookup).forEach((An) => An.remove()), delete Jr._x_prevKeys, delete Jr._x_lookup;
    });
  });
  function Fl(Jr, nn, ln, hn) {
    let yn = (kn) => typeof kn == "object" && !Array.isArray(kn), wn = Jr;
    ln((kn) => {
      Vl(kn) && kn >= 0 && (kn = Array.from(Array(kn).keys(), (Vn) => Vn + 1)), kn === void 0 && (kn = []);
      let An = Jr._x_lookup, zn = Jr._x_prevKeys, Bn = [], Dn = [];
      if (yn(kn)) kn = Object.entries(kn).map(([Vn, si]) => {
        let li = Qs(nn, si, Vn, kn);
        hn((mi) => {
          Dn.includes(mi) && cn("Duplicate key on x-for", Jr), Dn.push(mi);
        }, { scope: { index: Vn, ...li } }), Bn.push(li);
      });
      else for (let Vn = 0; Vn < kn.length; Vn++) {
        let si = Qs(nn, kn[Vn], Vn, kn);
        hn((li) => {
          Dn.includes(li) && cn("Duplicate key on x-for", Jr), Dn.push(li);
        }, { scope: { index: Vn, ...si } }), Bn.push(si);
      }
      let Zn = [], ti = [], ci = [], wi = [];
      for (let Vn = 0; Vn < zn.length; Vn++) {
        let si = zn[Vn];
        Dn.indexOf(si) === -1 && ci.push(si);
      }
      zn = zn.filter((Vn) => !ci.includes(Vn));
      let sa = "template";
      for (let Vn = 0; Vn < Dn.length; Vn++) {
        let si = Dn[Vn], li = zn.indexOf(si);
        if (li === -1) zn.splice(Vn, 0, si), Zn.push([sa, Vn]);
        else if (li !== Vn) {
          let mi = zn.splice(Vn, 1)[0], gi = zn.splice(li - 1, 1)[0];
          zn.splice(Vn, 0, gi), zn.splice(li, 0, mi), ti.push([mi, gi]);
        } else wi.push(si);
        sa = si;
      }
      for (let Vn = 0; Vn < ci.length; Vn++) {
        let si = ci[Vn];
        An[si]._x_effects && An[si]._x_effects.forEach(Zr), An[si].remove(), An[si] = null, delete An[si];
      }
      for (let Vn = 0; Vn < ti.length; Vn++) {
        let [si, li] = ti[Vn], mi = An[si], gi = An[li], Li = document.createElement("div");
        ri(() => {
          gi || cn('x-for ":key" is undefined or invalid', wn, li, An), gi.after(Li), mi.after(gi), gi._x_currentIfEl && gi.after(gi._x_currentIfEl), Li.before(mi), mi._x_currentIfEl && mi.after(mi._x_currentIfEl), Li.remove();
        }), gi._x_refreshXForScope(Bn[Dn.indexOf(li)]);
      }
      for (let Vn = 0; Vn < Zn.length; Vn++) {
        let [si, li] = Zn[Vn], mi = si === "template" ? wn : An[si];
        mi._x_currentIfEl && (mi = mi._x_currentIfEl);
        let gi = Bn[li], Li = Dn[li], Fi = document.importNode(wn.content, !0).firstElementChild, Zs = rn(gi);
        Ii(Fi, Zs, wn), Fi._x_refreshXForScope = (Gl) => {
          Object.entries(Gl).forEach(([Ul, Yl]) => {
            Zs[Ul] = Yl;
          });
        }, ri(() => {
          mi.after(Fi), _i(() => En(Fi))();
        }), typeof Li == "object" && cn("x-for key cannot be an object, it must be a string or an integer", wn), An[Li] = Fi;
      }
      for (let Vn = 0; Vn < wi.length; Vn++) An[wi[Vn]]._x_refreshXForScope(Bn[Dn.indexOf(wi[Vn])]);
      wn._x_prevKeys = Dn;
    });
  }
  function Hl(Jr) {
    let nn = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, ln = /^\s*\(|\)\s*$/g, hn = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, yn = Jr.match(hn);
    if (!yn) return;
    let wn = {};
    wn.items = yn[2].trim();
    let kn = yn[1].replace(ln, "").trim(), An = kn.match(nn);
    return An ? (wn.item = kn.replace(nn, "").trim(), wn.index = An[1].trim(), An[2] && (wn.collection = An[2].trim())) : wn.item = kn, wn;
  }
  function Qs(Jr, nn, ln, hn) {
    let yn = {};
    return /^\[.*\]$/.test(Jr.item) && Array.isArray(nn) ? Jr.item.replace("[", "").replace("]", "").split(",").map((wn) => wn.trim()).forEach((wn, kn) => {
      yn[wn] = nn[kn];
    }) : /^\{.*\}$/.test(Jr.item) && !Array.isArray(nn) && typeof nn == "object" ? Jr.item.replace("{", "").replace("}", "").split(",").map((wn) => wn.trim()).forEach((wn) => {
      yn[wn] = nn[wn];
    }) : yn[Jr.item] = nn, Jr.index && (yn[Jr.index] = ln), Jr.collection && (yn[Jr.collection] = hn), yn;
  }
  function Vl(Jr) {
    return !Array.isArray(Jr) && !isNaN(Jr);
  }
  function Ks() {
  }
  Ks.inline = (Jr, { expression: nn }, { cleanup: ln }) => {
    let hn = Mn(Jr);
    hn._x_refs || (hn._x_refs = {}), hn._x_refs[nn] = Jr, ln(() => delete hn._x_refs[nn]);
  }, di("ref", Ks), di("if", (Jr, { expression: nn }, { effect: ln, cleanup: hn }) => {
    Jr.tagName.toLowerCase() !== "template" && cn("x-if can only be used on a <template> tag", Jr);
    let yn = hi(Jr, nn), wn = () => {
      if (Jr._x_currentIfEl) return Jr._x_currentIfEl;
      let An = Jr.content.cloneNode(!0).firstElementChild;
      return Ii(An, {}, Jr), ri(() => {
        Jr.after(An), _i(() => En(An))();
      }), Jr._x_currentIfEl = An, Jr._x_undoIf = () => {
        fn(An, (zn) => {
          zn._x_effects && zn._x_effects.forEach(Zr);
        }), An.remove(), delete Jr._x_currentIfEl;
      }, An;
    }, kn = () => {
      Jr._x_undoIf && (Jr._x_undoIf(), delete Jr._x_undoIf);
    };
    ln(() => yn((An) => {
      An ? wn() : kn();
    })), hn(() => Jr._x_undoIf && Jr._x_undoIf());
  }), di("id", (Jr, { expression: nn }, { evaluate: ln }) => {
    ln(nn).forEach((hn) => Ol(Jr, hn));
  }), Yi((Jr, nn) => {
    Jr._x_ids && (nn._x_ids = Jr._x_ids);
  }), fa(Ja("@", es(Ri("on:")))), di("on", _i((Jr, { value: nn, modifiers: ln, expression: hn }, { cleanup: yn }) => {
    let wn = hn ? hi(Jr, hn) : () => {
    };
    Jr.tagName.toLowerCase() === "template" && (Jr._x_forwardEvents || (Jr._x_forwardEvents = []), Jr._x_forwardEvents.includes(nn) || Jr._x_forwardEvents.push(nn));
    let kn = Wa(Jr, nn, ln, (An) => {
      wn(() => {
      }, { scope: { $event: An }, params: [An] });
    });
    yn(() => kn());
  })), aa("Collapse", "collapse", "collapse"), aa("Intersect", "intersect", "intersect"), aa("Focus", "trap", "focus"), aa("Mask", "mask", "mask");
  function aa(Jr, nn, ln) {
    di(nn, (hn) => cn(`You can't use [x-${nn}] without first installing the "${Jr}" plugin here: https://alpinejs.dev/plugins/${ln}`, hn));
  }
  Ni.setEvaluator(Qa), Ni.setReactivityEngine({ reactive: ja, effect: rl, release: nl, raw: ai });
  var Xs = Ni;
  window.Alpine = Xs, queueMicrotask(() => {
    Xs.start();
  });
})();
(function(Gr, ze) {
  typeof define == "function" && define.amd ? define([], ze) : typeof module == "object" && module.exports ? module.exports = ze() : Gr.htmx = Gr.htmx || ze();
})(typeof self < "u" ? self : void 0, function() {
  return function() {
    var Q = { onLoad: B, process: zt, on: de, off: ge, trigger: ce, ajax: Nr, find: C, findAll: f, closest: v, values: function(Gr, ze) {
      var Wr = dr(Gr, ze || "post");
      return Wr.values;
    }, remove: _, addClass: z, removeClass: n, toggleClass: $, takeClass: W, defineExtension: Ur, removeExtension: Fr, logAll: V, logNone: j, logger: null, config: { historyEnabled: !0, historyCacheSize: 10, refreshOnHistoryMiss: !1, defaultSwapStyle: "innerHTML", defaultSwapDelay: 0, defaultSettleDelay: 20, includeIndicatorStyles: !0, indicatorClass: "htmx-indicator", requestClass: "htmx-request", addedClass: "htmx-added", settlingClass: "htmx-settling", swappingClass: "htmx-swapping", allowEval: !0, allowScriptTags: !0, inlineScriptNonce: "", attributesToSettle: ["class", "style", "width", "height"], withCredentials: !1, timeout: 0, wsReconnectDelay: "full-jitter", wsBinaryType: "blob", disableSelector: "[hx-disable], [data-hx-disable]", useTemplateFragments: !1, scrollBehavior: "smooth", defaultFocusScroll: !1, getCacheBusterParam: !1, globalViewTransitions: !1, methodsThatUseUrlParams: ["get"], selfRequestsOnly: !1, ignoreTitle: !1, scrollIntoViewOnBoost: !0, triggerSpecsCache: null }, parseInterval: d, _: t, createEventSource: function(Gr) {
      return new EventSource(Gr, { withCredentials: !0 });
    }, createWebSocket: function(Gr) {
      var ze = new WebSocket(Gr, []);
      return ze.binaryType = Q.config.wsBinaryType, ze;
    }, version: "1.9.11" }, r = { addTriggerHandler: Lt, bodyContains: se, canAccessLocalStorage: U, findThisElement: xe, filterValues: yr, hasAttribute: o, getAttributeValue: te, getClosestAttributeValue: ne, getClosestMatch: c, getExpressionVars: Hr, getHeaders: xr, getInputValues: dr, getInternalData: ae, getSwapSpecification: wr, getTriggerSpecs: it, getTarget: ye, makeFragment: l, mergeObjects: le, makeSettleInfo: T, oobSwap: Ee, querySelectorExt: ue, selectAndSwap: je, settleImmediately: nr, shouldCancel: ut, triggerEvent: ce, triggerErrorEvent: fe, withExtensions: R }, w = ["get", "post", "put", "delete", "patch"], i = w.map(function(Gr) {
      return "[hx-" + Gr + "], [data-hx-" + Gr + "]";
    }).join(", "), S = e("head"), q = e("title"), H = e("svg", !0);
    function e(Gr, ze = !1) {
      return new RegExp(`<${Gr}(\\s[^>]*>|>)([\\s\\S]*?)<\\/${Gr}>`, ze ? "gim" : "im");
    }
    function d(Gr) {
      if (Gr == null)
        return;
      let ze = NaN;
      return Gr.slice(-2) == "ms" ? ze = parseFloat(Gr.slice(0, -2)) : Gr.slice(-1) == "s" ? ze = parseFloat(Gr.slice(0, -1)) * 1e3 : Gr.slice(-1) == "m" ? ze = parseFloat(Gr.slice(0, -1)) * 1e3 * 60 : ze = parseFloat(Gr), isNaN(ze) ? void 0 : ze;
    }
    function ee(Gr, ze) {
      return Gr.getAttribute && Gr.getAttribute(ze);
    }
    function o(Gr, ze) {
      return Gr.hasAttribute && (Gr.hasAttribute(ze) || Gr.hasAttribute("data-" + ze));
    }
    function te(Gr, ze) {
      return ee(Gr, ze) || ee(Gr, "data-" + ze);
    }
    function u(Gr) {
      return Gr.parentElement;
    }
    function re() {
      return document;
    }
    function c(Gr, ze) {
      for (; Gr && !ze(Gr); )
        Gr = u(Gr);
      return Gr || null;
    }
    function L(Gr, ze, Wr) {
      var Yr = te(ze, Wr), Qr = te(ze, "hx-disinherit");
      return Gr !== ze && Qr && (Qr === "*" || Qr.split(" ").indexOf(Wr) >= 0) ? "unset" : Yr;
    }
    function ne(Gr, ze) {
      var Wr = null;
      if (c(Gr, function(Yr) {
        return Wr = L(Gr, Yr, ze);
      }), Wr !== "unset")
        return Wr;
    }
    function h(Gr, ze) {
      var Wr = Gr.matches || Gr.matchesSelector || Gr.msMatchesSelector || Gr.mozMatchesSelector || Gr.webkitMatchesSelector || Gr.oMatchesSelector;
      return Wr && Wr.call(Gr, ze);
    }
    function A(Gr) {
      var ze = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i, Wr = ze.exec(Gr);
      return Wr ? Wr[1].toLowerCase() : "";
    }
    function s(Gr, ze) {
      for (var Wr = new DOMParser(), Yr = Wr.parseFromString(Gr, "text/html"), Qr = Yr.body; ze > 0; )
        ze--, Qr = Qr.firstChild;
      return Qr == null && (Qr = re().createDocumentFragment()), Qr;
    }
    function N(Gr) {
      return /<body/.test(Gr);
    }
    function l(Gr) {
      var ze = !N(Gr), Wr = A(Gr), Yr = Gr;
      if (Wr === "head" && (Yr = Yr.replace(S, "")), Q.config.useTemplateFragments && ze) {
        var Qr = s("<body><template>" + Yr + "</template></body>", 0), Kr = Qr.querySelector("template").content;
        return Q.config.allowScriptTags ? oe(Kr.querySelectorAll("script"), function(Zr) {
          Q.config.inlineScriptNonce && (Zr.nonce = Q.config.inlineScriptNonce), Zr.htmxExecuted = navigator.userAgent.indexOf("Firefox") === -1;
        }) : oe(Kr.querySelectorAll("script"), function(Zr) {
          _(Zr);
        }), Kr;
      }
      switch (Wr) {
        case "thead":
        case "tbody":
        case "tfoot":
        case "colgroup":
        case "caption":
          return s("<table>" + Yr + "</table>", 1);
        case "col":
          return s("<table><colgroup>" + Yr + "</colgroup></table>", 2);
        case "tr":
          return s("<table><tbody>" + Yr + "</tbody></table>", 2);
        case "td":
        case "th":
          return s("<table><tbody><tr>" + Yr + "</tr></tbody></table>", 3);
        case "script":
        case "style":
          return s("<div>" + Yr + "</div>", 1);
        default:
          return s(Yr, 0);
      }
    }
    function ie(Gr) {
      Gr && Gr();
    }
    function I(Gr, ze) {
      return Object.prototype.toString.call(Gr) === "[object " + ze + "]";
    }
    function k(Gr) {
      return I(Gr, "Function");
    }
    function P(Gr) {
      return I(Gr, "Object");
    }
    function ae(Gr) {
      var ze = "htmx-internal-data", Wr = Gr[ze];
      return Wr || (Wr = Gr[ze] = {}), Wr;
    }
    function M(Gr) {
      var ze = [];
      if (Gr)
        for (var Wr = 0; Wr < Gr.length; Wr++)
          ze.push(Gr[Wr]);
      return ze;
    }
    function oe(Gr, ze) {
      if (Gr)
        for (var Wr = 0; Wr < Gr.length; Wr++)
          ze(Gr[Wr]);
    }
    function X(Gr) {
      var ze = Gr.getBoundingClientRect(), Wr = ze.top, Yr = ze.bottom;
      return Wr < window.innerHeight && Yr >= 0;
    }
    function se(Gr) {
      return Gr.getRootNode && Gr.getRootNode() instanceof window.ShadowRoot ? re().body.contains(Gr.getRootNode().host) : re().body.contains(Gr);
    }
    function D(Gr) {
      return Gr.trim().split(/\s+/);
    }
    function le(Gr, ze) {
      for (var Wr in ze)
        ze.hasOwnProperty(Wr) && (Gr[Wr] = ze[Wr]);
      return Gr;
    }
    function E(Gr) {
      try {
        return JSON.parse(Gr);
      } catch (ze) {
        return b(ze), null;
      }
    }
    function U() {
      var Gr = "htmx:localStorageTest";
      try {
        return localStorage.setItem(Gr, Gr), localStorage.removeItem(Gr), !0;
      } catch {
        return !1;
      }
    }
    function F(Gr) {
      try {
        var ze = new URL(Gr);
        return ze && (Gr = ze.pathname + ze.search), /^\/$/.test(Gr) || (Gr = Gr.replace(/\/+$/, "")), Gr;
      } catch {
        return Gr;
      }
    }
    function t(e) {
      return Tr(re().body, function() {
        return eval(e);
      });
    }
    function B(Gr) {
      var ze = Q.on("htmx:load", function(Wr) {
        Gr(Wr.detail.elt);
      });
      return ze;
    }
    function V() {
      Q.logger = function(Gr, ze, Wr) {
        console && console.log(ze, Gr, Wr);
      };
    }
    function j() {
      Q.logger = null;
    }
    function C(Gr, ze) {
      return ze ? Gr.querySelector(ze) : C(re(), Gr);
    }
    function f(Gr, ze) {
      return ze ? Gr.querySelectorAll(ze) : f(re(), Gr);
    }
    function _(Gr, ze) {
      Gr = p(Gr), ze ? setTimeout(function() {
        _(Gr), Gr = null;
      }, ze) : Gr.parentElement.removeChild(Gr);
    }
    function z(Gr, ze, Wr) {
      Gr = p(Gr), Wr ? setTimeout(function() {
        z(Gr, ze), Gr = null;
      }, Wr) : Gr.classList && Gr.classList.add(ze);
    }
    function n(Gr, ze, Wr) {
      Gr = p(Gr), Wr ? setTimeout(function() {
        n(Gr, ze), Gr = null;
      }, Wr) : Gr.classList && (Gr.classList.remove(ze), Gr.classList.length === 0 && Gr.removeAttribute("class"));
    }
    function $(Gr, ze) {
      Gr = p(Gr), Gr.classList.toggle(ze);
    }
    function W(Gr, ze) {
      Gr = p(Gr), oe(Gr.parentElement.children, function(Wr) {
        n(Wr, ze);
      }), z(Gr, ze);
    }
    function v(Gr, ze) {
      if (Gr = p(Gr), Gr.closest)
        return Gr.closest(ze);
      do
        if (Gr == null || h(Gr, ze))
          return Gr;
      while (Gr = Gr && u(Gr));
      return null;
    }
    function g(Gr, ze) {
      return Gr.substring(0, ze.length) === ze;
    }
    function G(Gr, ze) {
      return Gr.substring(Gr.length - ze.length) === ze;
    }
    function J(Gr) {
      var ze = Gr.trim();
      return g(ze, "<") && G(ze, "/>") ? ze.substring(1, ze.length - 2) : ze;
    }
    function Z(Gr, ze) {
      return ze.indexOf("closest ") === 0 ? [v(Gr, J(ze.substr(8)))] : ze.indexOf("find ") === 0 ? [C(Gr, J(ze.substr(5)))] : ze === "next" ? [Gr.nextElementSibling] : ze.indexOf("next ") === 0 ? [K(Gr, J(ze.substr(5)))] : ze === "previous" ? [Gr.previousElementSibling] : ze.indexOf("previous ") === 0 ? [Y(Gr, J(ze.substr(9)))] : ze === "document" ? [document] : ze === "window" ? [window] : ze === "body" ? [document.body] : re().querySelectorAll(J(ze));
    }
    var K = function(Gr, ze) {
      for (var Wr = re().querySelectorAll(ze), Yr = 0; Yr < Wr.length; Yr++) {
        var Qr = Wr[Yr];
        if (Qr.compareDocumentPosition(Gr) === Node.DOCUMENT_POSITION_PRECEDING)
          return Qr;
      }
    }, Y = function(Gr, ze) {
      for (var Wr = re().querySelectorAll(ze), Yr = Wr.length - 1; Yr >= 0; Yr--) {
        var Qr = Wr[Yr];
        if (Qr.compareDocumentPosition(Gr) === Node.DOCUMENT_POSITION_FOLLOWING)
          return Qr;
      }
    };
    function ue(Gr, ze) {
      return ze ? Z(Gr, ze)[0] : Z(re().body, Gr)[0];
    }
    function p(Gr) {
      return I(Gr, "String") ? C(Gr) : Gr;
    }
    function ve(Gr, ze, Wr) {
      return k(ze) ? { target: re().body, event: Gr, listener: ze } : { target: p(Gr), event: ze, listener: Wr };
    }
    function de(Gr, ze, Wr) {
      jr(function() {
        var Qr = ve(Gr, ze, Wr);
        Qr.target.addEventListener(Qr.event, Qr.listener);
      });
      var Yr = k(ze);
      return Yr ? ze : Wr;
    }
    function ge(Gr, ze, Wr) {
      return jr(function() {
        var Yr = ve(Gr, ze, Wr);
        Yr.target.removeEventListener(Yr.event, Yr.listener);
      }), k(ze) ? ze : Wr;
    }
    var pe = re().createElement("output");
    function me(Gr, ze) {
      var Wr = ne(Gr, ze);
      if (Wr) {
        if (Wr === "this")
          return [xe(Gr, ze)];
        var Yr = Z(Gr, Wr);
        return Yr.length === 0 ? (b('The selector "' + Wr + '" on ' + ze + " returned no matches!"), [pe]) : Yr;
      }
    }
    function xe(Gr, ze) {
      return c(Gr, function(Wr) {
        return te(Wr, ze) != null;
      });
    }
    function ye(Gr) {
      var ze = ne(Gr, "hx-target");
      if (ze)
        return ze === "this" ? xe(Gr, "hx-target") : ue(Gr, ze);
      var Wr = ae(Gr);
      return Wr.boosted ? re().body : Gr;
    }
    function be(Gr) {
      for (var ze = Q.config.attributesToSettle, Wr = 0; Wr < ze.length; Wr++)
        if (Gr === ze[Wr])
          return !0;
      return !1;
    }
    function we(Gr, ze) {
      oe(Gr.attributes, function(Wr) {
        !ze.hasAttribute(Wr.name) && be(Wr.name) && Gr.removeAttribute(Wr.name);
      }), oe(ze.attributes, function(Wr) {
        be(Wr.name) && Gr.setAttribute(Wr.name, Wr.value);
      });
    }
    function Se(Gr, ze) {
      for (var Wr = Br(ze), Yr = 0; Yr < Wr.length; Yr++) {
        var Qr = Wr[Yr];
        try {
          if (Qr.isInlineSwap(Gr))
            return !0;
        } catch (Kr) {
          b(Kr);
        }
      }
      return Gr === "outerHTML";
    }
    function Ee(Gr, ze, Wr) {
      var Yr = "#" + ee(ze, "id"), Qr = "outerHTML";
      Gr === "true" || (Gr.indexOf(":") > 0 ? (Qr = Gr.substr(0, Gr.indexOf(":")), Yr = Gr.substr(Gr.indexOf(":") + 1, Gr.length)) : Qr = Gr);
      var Kr = re().querySelectorAll(Yr);
      return Kr ? (oe(Kr, function(Zr) {
        var en, tn = ze.cloneNode(!0);
        en = re().createDocumentFragment(), en.appendChild(tn), Se(Qr, Zr) || (en = tn);
        var rn = { shouldSwap: !0, target: Zr, fragment: en };
        ce(Zr, "htmx:oobBeforeSwap", rn) && (Zr = rn.target, rn.shouldSwap && Be(Qr, Zr, Zr, en, Wr), oe(Wr.elts, function(sn) {
          ce(sn, "htmx:oobAfterSwap", rn);
        }));
      }), ze.parentNode.removeChild(ze)) : (ze.parentNode.removeChild(ze), fe(re().body, "htmx:oobErrorNoTarget", { content: ze })), Gr;
    }
    function Ce(Gr, ze, Wr) {
      var Yr = ne(Gr, "hx-select-oob");
      if (Yr)
        for (var Qr = Yr.split(","), Kr = 0; Kr < Qr.length; Kr++) {
          var Zr = Qr[Kr].split(":", 2), en = Zr[0].trim();
          en.indexOf("#") === 0 && (en = en.substring(1));
          var tn = Zr[1] || "true", rn = ze.querySelector("#" + en);
          rn && Ee(tn, rn, Wr);
        }
      oe(f(ze, "[hx-swap-oob], [data-hx-swap-oob]"), function(sn) {
        var on = te(sn, "hx-swap-oob");
        on != null && Ee(on, sn, Wr);
      });
    }
    function Re(Gr) {
      oe(f(Gr, "[hx-preserve], [data-hx-preserve]"), function(ze) {
        var Wr = te(ze, "id"), Yr = re().getElementById(Wr);
        Yr != null && ze.parentNode.replaceChild(Yr, ze);
      });
    }
    function Te(Gr, ze, Wr) {
      oe(ze.querySelectorAll("[id]"), function(Yr) {
        var Qr = ee(Yr, "id");
        if (Qr && Qr.length > 0) {
          var Kr = Qr.replace("'", "\\'"), Zr = Yr.tagName.replace(":", "\\:"), en = Gr.querySelector(Zr + "[id='" + Kr + "']");
          if (en && en !== Gr) {
            var tn = Yr.cloneNode();
            we(Yr, en), Wr.tasks.push(function() {
              we(Yr, tn);
            });
          }
        }
      });
    }
    function Oe(Gr) {
      return function() {
        n(Gr, Q.config.addedClass), zt(Gr), Nt(Gr), qe(Gr), ce(Gr, "htmx:load");
      };
    }
    function qe(Gr) {
      var ze = "[autofocus]", Wr = h(Gr, ze) ? Gr : Gr.querySelector(ze);
      Wr != null && Wr.focus();
    }
    function a(Gr, ze, Wr, Yr) {
      for (Te(Gr, Wr, Yr); Wr.childNodes.length > 0; ) {
        var Qr = Wr.firstChild;
        z(Qr, Q.config.addedClass), Gr.insertBefore(Qr, ze), Qr.nodeType !== Node.TEXT_NODE && Qr.nodeType !== Node.COMMENT_NODE && Yr.tasks.push(Oe(Qr));
      }
    }
    function He(Gr, ze) {
      for (var Wr = 0; Wr < Gr.length; )
        ze = (ze << 5) - ze + Gr.charCodeAt(Wr++) | 0;
      return ze;
    }
    function Le(Gr) {
      var ze = 0;
      if (Gr.attributes)
        for (var Wr = 0; Wr < Gr.attributes.length; Wr++) {
          var Yr = Gr.attributes[Wr];
          Yr.value && (ze = He(Yr.name, ze), ze = He(Yr.value, ze));
        }
      return ze;
    }
    function Ae(Gr) {
      var ze = ae(Gr);
      if (ze.onHandlers) {
        for (var Wr = 0; Wr < ze.onHandlers.length; Wr++) {
          const Yr = ze.onHandlers[Wr];
          Gr.removeEventListener(Yr.event, Yr.listener);
        }
        delete ze.onHandlers;
      }
    }
    function Ne(Gr) {
      var ze = ae(Gr);
      ze.timeout && clearTimeout(ze.timeout), ze.webSocket && ze.webSocket.close(), ze.sseEventSource && ze.sseEventSource.close(), ze.listenerInfos && oe(ze.listenerInfos, function(Wr) {
        Wr.on && Wr.on.removeEventListener(Wr.trigger, Wr.listener);
      }), Ae(Gr), oe(Object.keys(ze), function(Wr) {
        delete ze[Wr];
      });
    }
    function m(Gr) {
      ce(Gr, "htmx:beforeCleanupElement"), Ne(Gr), Gr.children && oe(Gr.children, function(ze) {
        m(ze);
      });
    }
    function Ie(Gr, ze, Wr) {
      if (Gr.tagName === "BODY")
        return Ue(Gr, ze, Wr);
      var Yr, Qr = Gr.previousSibling;
      for (a(u(Gr), Gr, ze, Wr), Qr == null ? Yr = u(Gr).firstChild : Yr = Qr.nextSibling, Wr.elts = Wr.elts.filter(function(Kr) {
        return Kr != Gr;
      }); Yr && Yr !== Gr; )
        Yr.nodeType === Node.ELEMENT_NODE && Wr.elts.push(Yr), Yr = Yr.nextElementSibling;
      m(Gr), u(Gr).removeChild(Gr);
    }
    function ke(Gr, ze, Wr) {
      return a(Gr, Gr.firstChild, ze, Wr);
    }
    function Pe(Gr, ze, Wr) {
      return a(u(Gr), Gr, ze, Wr);
    }
    function Me(Gr, ze, Wr) {
      return a(Gr, null, ze, Wr);
    }
    function Xe(Gr, ze, Wr) {
      return a(u(Gr), Gr.nextSibling, ze, Wr);
    }
    function De(Gr, ze, Wr) {
      return m(Gr), u(Gr).removeChild(Gr);
    }
    function Ue(Gr, ze, Wr) {
      var Yr = Gr.firstChild;
      if (a(Gr, Yr, ze, Wr), Yr) {
        for (; Yr.nextSibling; )
          m(Yr.nextSibling), Gr.removeChild(Yr.nextSibling);
        m(Yr), Gr.removeChild(Yr);
      }
    }
    function Fe(Gr, ze, Wr) {
      var Yr = Wr || ne(Gr, "hx-select");
      if (Yr) {
        var Qr = re().createDocumentFragment();
        oe(ze.querySelectorAll(Yr), function(Kr) {
          Qr.appendChild(Kr);
        }), ze = Qr;
      }
      return ze;
    }
    function Be(Gr, ze, Wr, Yr, Qr) {
      switch (Gr) {
        case "none":
          return;
        case "outerHTML":
          Ie(Wr, Yr, Qr);
          return;
        case "afterbegin":
          ke(Wr, Yr, Qr);
          return;
        case "beforebegin":
          Pe(Wr, Yr, Qr);
          return;
        case "beforeend":
          Me(Wr, Yr, Qr);
          return;
        case "afterend":
          Xe(Wr, Yr, Qr);
          return;
        case "delete":
          De(Wr);
          return;
        default:
          for (var Kr = Br(ze), Zr = 0; Zr < Kr.length; Zr++) {
            var en = Kr[Zr];
            try {
              var tn = en.handleSwap(Gr, Wr, Yr, Qr);
              if (tn) {
                if (typeof tn.length < "u")
                  for (var rn = 0; rn < tn.length; rn++) {
                    var sn = tn[rn];
                    sn.nodeType !== Node.TEXT_NODE && sn.nodeType !== Node.COMMENT_NODE && Qr.tasks.push(Oe(sn));
                  }
                return;
              }
            } catch (on) {
              b(on);
            }
          }
          Gr === "innerHTML" ? Ue(Wr, Yr, Qr) : Be(Q.config.defaultSwapStyle, ze, Wr, Yr, Qr);
      }
    }
    function Ve(Gr) {
      if (Gr.indexOf("<title") > -1) {
        var ze = Gr.replace(H, ""), Wr = ze.match(q);
        if (Wr)
          return Wr[2];
      }
    }
    function je(Gr, ze, Wr, Yr, Qr, Kr) {
      Qr.title = Ve(Yr);
      var Zr = l(Yr);
      if (Zr)
        return Ce(Wr, Zr, Qr), Zr = Fe(Wr, Zr, Kr), Re(Zr), Be(Gr, Wr, ze, Zr, Qr);
    }
    function _e(Gr, ze, Wr) {
      var Yr = Gr.getResponseHeader(ze);
      if (Yr.indexOf("{") === 0) {
        var Qr = E(Yr);
        for (var Kr in Qr)
          if (Qr.hasOwnProperty(Kr)) {
            var Zr = Qr[Kr];
            P(Zr) || (Zr = { value: Zr }), ce(Wr, Kr, Zr);
          }
      } else
        for (var en = Yr.split(","), tn = 0; tn < en.length; tn++)
          ce(Wr, en[tn].trim(), []);
    }
    var x = /[\s,]/, $e = /[_$a-zA-Z]/, We = /[_$a-zA-Z0-9]/, Ge = ['"', "'", "/"], Je = /[^\s]/, Ze = /[{(]/, Ke = /[})]/;
    function Ye(Gr) {
      for (var ze = [], Wr = 0; Wr < Gr.length; ) {
        if ($e.exec(Gr.charAt(Wr))) {
          for (var Yr = Wr; We.exec(Gr.charAt(Wr + 1)); )
            Wr++;
          ze.push(Gr.substr(Yr, Wr - Yr + 1));
        } else if (Ge.indexOf(Gr.charAt(Wr)) !== -1) {
          var Qr = Gr.charAt(Wr), Yr = Wr;
          for (Wr++; Wr < Gr.length && Gr.charAt(Wr) !== Qr; )
            Gr.charAt(Wr) === "\\" && Wr++, Wr++;
          ze.push(Gr.substr(Yr, Wr - Yr + 1));
        } else {
          var Kr = Gr.charAt(Wr);
          ze.push(Kr);
        }
        Wr++;
      }
      return ze;
    }
    function Qe(Gr, ze, Wr) {
      return $e.exec(Gr.charAt(0)) && Gr !== "true" && Gr !== "false" && Gr !== "this" && Gr !== Wr && ze !== ".";
    }
    function et(Gr, ze, Wr) {
      if (ze[0] === "[") {
        ze.shift();
        for (var Yr = 1, Qr = " return (function(" + Wr + "){ return (", Kr = null; ze.length > 0; ) {
          var Zr = ze[0];
          if (Zr === "]") {
            if (Yr--, Yr === 0) {
              Kr === null && (Qr = Qr + "true"), ze.shift(), Qr += ")})";
              try {
                var en = Tr(Gr, function() {
                  return Function(Qr)();
                }, function() {
                  return !0;
                });
                return en.source = Qr, en;
              } catch (tn) {
                return fe(re().body, "htmx:syntax:error", { error: tn, source: Qr }), null;
              }
            }
          } else Zr === "[" && Yr++;
          Qe(Zr, Kr, Wr) ? Qr += "((" + Wr + "." + Zr + ") ? (" + Wr + "." + Zr + ") : (window." + Zr + "))" : Qr = Qr + Zr, Kr = ze.shift();
        }
      }
    }
    function y(Gr, ze) {
      for (var Wr = ""; Gr.length > 0 && !ze.test(Gr[0]); )
        Wr += Gr.shift();
      return Wr;
    }
    function tt(Gr) {
      var ze;
      return Gr.length > 0 && Ze.test(Gr[0]) ? (Gr.shift(), ze = y(Gr, Ke).trim(), Gr.shift()) : ze = y(Gr, x), ze;
    }
    var rt = "input, textarea, select";
    function nt(Gr, ze, Wr) {
      var Yr = [], Qr = Ye(ze);
      do {
        y(Qr, Je);
        var Kr = Qr.length, Zr = y(Qr, /[,\[\s]/);
        if (Zr !== "")
          if (Zr === "every") {
            var en = { trigger: "every" };
            y(Qr, Je), en.pollInterval = d(y(Qr, /[,\[\s]/)), y(Qr, Je);
            var tn = et(Gr, Qr, "event");
            tn && (en.eventFilter = tn), Yr.push(en);
          } else if (Zr.indexOf("sse:") === 0)
            Yr.push({ trigger: "sse", sseEvent: Zr.substr(4) });
          else {
            var rn = { trigger: Zr }, tn = et(Gr, Qr, "event");
            for (tn && (rn.eventFilter = tn); Qr.length > 0 && Qr[0] !== ","; ) {
              y(Qr, Je);
              var sn = Qr.shift();
              if (sn === "changed")
                rn.changed = !0;
              else if (sn === "once")
                rn.once = !0;
              else if (sn === "consume")
                rn.consume = !0;
              else if (sn === "delay" && Qr[0] === ":")
                Qr.shift(), rn.delay = d(y(Qr, x));
              else if (sn === "from" && Qr[0] === ":") {
                if (Qr.shift(), Ze.test(Qr[0]))
                  var on = tt(Qr);
                else {
                  var on = y(Qr, x);
                  if (on === "closest" || on === "find" || on === "next" || on === "previous") {
                    Qr.shift();
                    var an = tt(Qr);
                    an.length > 0 && (on += " " + an);
                  }
                }
                rn.from = on;
              } else sn === "target" && Qr[0] === ":" ? (Qr.shift(), rn.target = tt(Qr)) : sn === "throttle" && Qr[0] === ":" ? (Qr.shift(), rn.throttle = d(y(Qr, x))) : sn === "queue" && Qr[0] === ":" ? (Qr.shift(), rn.queue = y(Qr, x)) : sn === "root" && Qr[0] === ":" ? (Qr.shift(), rn[sn] = tt(Qr)) : sn === "threshold" && Qr[0] === ":" ? (Qr.shift(), rn[sn] = y(Qr, x)) : fe(Gr, "htmx:syntax:error", { token: Qr.shift() });
            }
            Yr.push(rn);
          }
        Qr.length === Kr && fe(Gr, "htmx:syntax:error", { token: Qr.shift() }), y(Qr, Je);
      } while (Qr[0] === "," && Qr.shift());
      return Wr && (Wr[ze] = Yr), Yr;
    }
    function it(Gr) {
      var ze = te(Gr, "hx-trigger"), Wr = [];
      if (ze) {
        var Yr = Q.config.triggerSpecsCache;
        Wr = Yr && Yr[ze] || nt(Gr, ze, Yr);
      }
      return Wr.length > 0 ? Wr : h(Gr, "form") ? [{ trigger: "submit" }] : h(Gr, 'input[type="button"], input[type="submit"]') ? [{ trigger: "click" }] : h(Gr, rt) ? [{ trigger: "change" }] : [{ trigger: "click" }];
    }
    function at(Gr) {
      ae(Gr).cancelled = !0;
    }
    function ot(Gr, ze, Wr) {
      var Yr = ae(Gr);
      Yr.timeout = setTimeout(function() {
        se(Gr) && Yr.cancelled !== !0 && (ct(Wr, Gr, Wt("hx:poll:trigger", { triggerSpec: Wr, target: Gr })) || ze(Gr), ot(Gr, ze, Wr));
      }, Wr.pollInterval);
    }
    function st(Gr) {
      return location.hostname === Gr.hostname && ee(Gr, "href") && ee(Gr, "href").indexOf("#") !== 0;
    }
    function lt(Gr, ze, Wr) {
      if (Gr.tagName === "A" && st(Gr) && (Gr.target === "" || Gr.target === "_self") || Gr.tagName === "FORM") {
        ze.boosted = !0;
        var Yr, Qr;
        if (Gr.tagName === "A")
          Yr = "get", Qr = ee(Gr, "href");
        else {
          var Kr = ee(Gr, "method");
          Yr = Kr ? Kr.toLowerCase() : "get", Qr = ee(Gr, "action");
        }
        Wr.forEach(function(Zr) {
          ht(Gr, function(en, tn) {
            if (v(en, Q.config.disableSelector)) {
              m(en);
              return;
            }
            he(Yr, Qr, en, tn);
          }, ze, Zr, !0);
        });
      }
    }
    function ut(Gr, ze) {
      return !!((Gr.type === "submit" || Gr.type === "click") && (ze.tagName === "FORM" || h(ze, 'input[type="submit"], button') && v(ze, "form") !== null || ze.tagName === "A" && ze.href && (ze.getAttribute("href") === "#" || ze.getAttribute("href").indexOf("#") !== 0)));
    }
    function ft(Gr, ze) {
      return ae(Gr).boosted && Gr.tagName === "A" && ze.type === "click" && (ze.ctrlKey || ze.metaKey);
    }
    function ct(Gr, ze, Wr) {
      var Yr = Gr.eventFilter;
      if (Yr)
        try {
          return Yr.call(ze, Wr) !== !0;
        } catch (Qr) {
          return fe(re().body, "htmx:eventFilter:error", { error: Qr, source: Yr.source }), !0;
        }
      return !1;
    }
    function ht(Gr, ze, Wr, Yr, Qr) {
      var Kr = ae(Gr), Zr;
      Yr.from ? Zr = Z(Gr, Yr.from) : Zr = [Gr], Yr.changed && Zr.forEach(function(en) {
        var tn = ae(en);
        tn.lastValue = en.value;
      }), oe(Zr, function(en) {
        var tn = function(rn) {
          if (!se(Gr)) {
            en.removeEventListener(Yr.trigger, tn);
            return;
          }
          if (!ft(Gr, rn) && ((Qr || ut(rn, Gr)) && rn.preventDefault(), !ct(Yr, Gr, rn))) {
            var sn = ae(rn);
            if (sn.triggerSpec = Yr, sn.handledFor == null && (sn.handledFor = []), sn.handledFor.indexOf(Gr) < 0) {
              if (sn.handledFor.push(Gr), Yr.consume && rn.stopPropagation(), Yr.target && rn.target && !h(rn.target, Yr.target))
                return;
              if (Yr.once) {
                if (Kr.triggeredOnce)
                  return;
                Kr.triggeredOnce = !0;
              }
              if (Yr.changed) {
                var on = ae(en);
                if (on.lastValue === en.value)
                  return;
                on.lastValue = en.value;
              }
              if (Kr.delayed && clearTimeout(Kr.delayed), Kr.throttle)
                return;
              Yr.throttle > 0 ? Kr.throttle || (ze(Gr, rn), Kr.throttle = setTimeout(function() {
                Kr.throttle = null;
              }, Yr.throttle)) : Yr.delay > 0 ? Kr.delayed = setTimeout(function() {
                ze(Gr, rn);
              }, Yr.delay) : (ce(Gr, "htmx:trigger"), ze(Gr, rn));
            }
          }
        };
        Wr.listenerInfos == null && (Wr.listenerInfos = []), Wr.listenerInfos.push({ trigger: Yr.trigger, listener: tn, on: en }), en.addEventListener(Yr.trigger, tn);
      });
    }
    var vt = !1, dt = null;
    function gt() {
      dt || (dt = function() {
        vt = !0;
      }, window.addEventListener("scroll", dt), setInterval(function() {
        vt && (vt = !1, oe(re().querySelectorAll("[hx-trigger='revealed'],[data-hx-trigger='revealed']"), function(Gr) {
          pt(Gr);
        }));
      }, 200));
    }
    function pt(Gr) {
      if (!o(Gr, "data-hx-revealed") && X(Gr)) {
        Gr.setAttribute("data-hx-revealed", "true");
        var ze = ae(Gr);
        ze.initHash ? ce(Gr, "revealed") : Gr.addEventListener("htmx:afterProcessNode", function(Wr) {
          ce(Gr, "revealed");
        }, { once: !0 });
      }
    }
    function mt(Gr, ze, Wr) {
      for (var Yr = D(Wr), Qr = 0; Qr < Yr.length; Qr++) {
        var Kr = Yr[Qr].split(/:(.+)/);
        Kr[0] === "connect" && xt(Gr, Kr[1], 0), Kr[0] === "send" && bt(Gr);
      }
    }
    function xt(Gr, ze, Wr) {
      if (se(Gr)) {
        if (ze.indexOf("/") == 0) {
          var Yr = location.hostname + (location.port ? ":" + location.port : "");
          location.protocol == "https:" ? ze = "wss://" + Yr + ze : location.protocol == "http:" && (ze = "ws://" + Yr + ze);
        }
        var Qr = Q.createWebSocket(ze);
        Qr.onerror = function(Kr) {
          fe(Gr, "htmx:wsError", { error: Kr, socket: Qr }), yt(Gr);
        }, Qr.onclose = function(Kr) {
          if ([1006, 1012, 1013].indexOf(Kr.code) >= 0) {
            var Zr = wt(Wr);
            setTimeout(function() {
              xt(Gr, ze, Wr + 1);
            }, Zr);
          }
        }, Qr.onopen = function(Kr) {
          Wr = 0;
        }, ae(Gr).webSocket = Qr, Qr.addEventListener("message", function(Kr) {
          if (!yt(Gr)) {
            var Zr = Kr.data;
            R(Gr, function(an) {
              Zr = an.transformResponse(Zr, null, Gr);
            });
            for (var en = T(Gr), tn = l(Zr), rn = M(tn.children), sn = 0; sn < rn.length; sn++) {
              var on = rn[sn];
              Ee(te(on, "hx-swap-oob") || "true", on, en);
            }
            nr(en.tasks);
          }
        });
      }
    }
    function yt(Gr) {
      if (!se(Gr))
        return ae(Gr).webSocket.close(), !0;
    }
    function bt(Gr) {
      var ze = c(Gr, function(Wr) {
        return ae(Wr).webSocket != null;
      });
      ze ? Gr.addEventListener(it(Gr)[0].trigger, function(Wr) {
        var Yr = ae(ze).webSocket, Qr = xr(Gr, ze), Kr = dr(Gr, "post"), Zr = Kr.errors, en = Kr.values, tn = Hr(Gr), rn = le(en, tn), sn = yr(rn, Gr);
        if (sn.HEADERS = Qr, Zr && Zr.length > 0) {
          ce(Gr, "htmx:validation:halted", Zr);
          return;
        }
        Yr.send(JSON.stringify(sn)), ut(Wr, Gr) && Wr.preventDefault();
      }) : fe(Gr, "htmx:noWebSocketSourceError");
    }
    function wt(Gr) {
      var ze = Q.config.wsReconnectDelay;
      if (typeof ze == "function")
        return ze(Gr);
      if (ze === "full-jitter") {
        var Wr = Math.min(Gr, 6), Yr = 1e3 * Math.pow(2, Wr);
        return Yr * Math.random();
      }
      b('htmx.config.wsReconnectDelay must either be a function or the string "full-jitter"');
    }
    function St(Gr, ze, Wr) {
      for (var Yr = D(Wr), Qr = 0; Qr < Yr.length; Qr++) {
        var Kr = Yr[Qr].split(/:(.+)/);
        Kr[0] === "connect" && Et(Gr, Kr[1]), Kr[0] === "swap" && Ct(Gr, Kr[1]);
      }
    }
    function Et(Gr, ze) {
      var Wr = Q.createEventSource(ze);
      Wr.onerror = function(Yr) {
        fe(Gr, "htmx:sseError", { error: Yr, source: Wr }), Tt(Gr);
      }, ae(Gr).sseEventSource = Wr;
    }
    function Ct(Gr, ze) {
      var Wr = c(Gr, Ot);
      if (Wr) {
        var Yr = ae(Wr).sseEventSource, Qr = function(Kr) {
          if (!Tt(Wr)) {
            if (!se(Gr)) {
              Yr.removeEventListener(ze, Qr);
              return;
            }
            var Zr = Kr.data;
            R(Gr, function(sn) {
              Zr = sn.transformResponse(Zr, null, Gr);
            });
            var en = wr(Gr), tn = ye(Gr), rn = T(Gr);
            je(en.swapStyle, tn, Gr, Zr, rn), nr(rn.tasks), ce(Gr, "htmx:sseMessage", Kr);
          }
        };
        ae(Gr).sseListener = Qr, Yr.addEventListener(ze, Qr);
      } else
        fe(Gr, "htmx:noSSESourceError");
    }
    function Rt(Gr, ze, Wr) {
      var Yr = c(Gr, Ot);
      if (Yr) {
        var Qr = ae(Yr).sseEventSource, Kr = function() {
          Tt(Yr) || (se(Gr) ? ze(Gr) : Qr.removeEventListener(Wr, Kr));
        };
        ae(Gr).sseListener = Kr, Qr.addEventListener(Wr, Kr);
      } else
        fe(Gr, "htmx:noSSESourceError");
    }
    function Tt(Gr) {
      if (!se(Gr))
        return ae(Gr).sseEventSource.close(), !0;
    }
    function Ot(Gr) {
      return ae(Gr).sseEventSource != null;
    }
    function qt(Gr, ze, Wr, Yr) {
      var Qr = function() {
        Wr.loaded || (Wr.loaded = !0, ze(Gr));
      };
      Yr > 0 ? setTimeout(Qr, Yr) : Qr();
    }
    function Ht(Gr, ze, Wr) {
      var Yr = !1;
      return oe(w, function(Qr) {
        if (o(Gr, "hx-" + Qr)) {
          var Kr = te(Gr, "hx-" + Qr);
          Yr = !0, ze.path = Kr, ze.verb = Qr, Wr.forEach(function(Zr) {
            Lt(Gr, Zr, ze, function(en, tn) {
              if (v(en, Q.config.disableSelector)) {
                m(en);
                return;
              }
              he(Qr, Kr, en, tn);
            });
          });
        }
      }), Yr;
    }
    function Lt(Gr, ze, Wr, Yr) {
      if (ze.sseEvent)
        Rt(Gr, Yr, ze.sseEvent);
      else if (ze.trigger === "revealed")
        gt(), ht(Gr, Yr, Wr, ze), pt(Gr);
      else if (ze.trigger === "intersect") {
        var Qr = {};
        ze.root && (Qr.root = ue(Gr, ze.root)), ze.threshold && (Qr.threshold = parseFloat(ze.threshold));
        var Kr = new IntersectionObserver(function(Zr) {
          for (var en = 0; en < Zr.length; en++) {
            var tn = Zr[en];
            if (tn.isIntersecting) {
              ce(Gr, "intersect");
              break;
            }
          }
        }, Qr);
        Kr.observe(Gr), ht(Gr, Yr, Wr, ze);
      } else ze.trigger === "load" ? ct(ze, Gr, Wt("load", { elt: Gr })) || qt(Gr, Yr, Wr, ze.delay) : ze.pollInterval > 0 ? (Wr.polling = !0, ot(Gr, Yr, ze)) : ht(Gr, Yr, Wr, ze);
    }
    function At(Gr) {
      if (!Gr.htmxExecuted && Q.config.allowScriptTags && (Gr.type === "text/javascript" || Gr.type === "module" || Gr.type === "")) {
        var ze = re().createElement("script");
        oe(Gr.attributes, function(Yr) {
          ze.setAttribute(Yr.name, Yr.value);
        }), ze.textContent = Gr.textContent, ze.async = !1, Q.config.inlineScriptNonce && (ze.nonce = Q.config.inlineScriptNonce);
        var Wr = Gr.parentElement;
        try {
          Wr.insertBefore(ze, Gr);
        } catch (Yr) {
          b(Yr);
        } finally {
          Gr.parentElement && Gr.parentElement.removeChild(Gr);
        }
      }
    }
    function Nt(Gr) {
      h(Gr, "script") && At(Gr), oe(f(Gr, "script"), function(ze) {
        At(ze);
      });
    }
    function It(Gr) {
      for (var ze = Gr.attributes, Wr = 0; Wr < ze.length; Wr++) {
        var Yr = ze[Wr].name;
        if (g(Yr, "hx-on:") || g(Yr, "data-hx-on:") || g(Yr, "hx-on-") || g(Yr, "data-hx-on-"))
          return !0;
      }
      return !1;
    }
    function kt(Gr) {
      var ze = null, Wr = [];
      if (It(Gr) && Wr.push(Gr), document.evaluate)
        for (var Yr = document.evaluate('.//*[@*[ starts-with(name(), "hx-on:") or starts-with(name(), "data-hx-on:") or starts-with(name(), "hx-on-") or starts-with(name(), "data-hx-on-") ]]', Gr); ze = Yr.iterateNext(); ) Wr.push(ze);
      else
        for (var Qr = Gr.getElementsByTagName("*"), Kr = 0; Kr < Qr.length; Kr++)
          It(Qr[Kr]) && Wr.push(Qr[Kr]);
      return Wr;
    }
    function Pt(Gr) {
      if (Gr.querySelectorAll) {
        var ze = ", [hx-boost] a, [data-hx-boost] a, a[hx-boost], a[data-hx-boost]", Wr = Gr.querySelectorAll(i + ze + ", form, [type='submit'], [hx-sse], [data-hx-sse], [hx-ws], [data-hx-ws], [hx-ext], [data-hx-ext], [hx-trigger], [data-hx-trigger], [hx-on], [data-hx-on]");
        return Wr;
      } else
        return [];
    }
    function Mt(Gr) {
      var ze = v(Gr.target, "button, input[type='submit']"), Wr = Dt(Gr);
      Wr && (Wr.lastButtonClicked = ze);
    }
    function Xt(Gr) {
      var ze = Dt(Gr);
      ze && (ze.lastButtonClicked = null);
    }
    function Dt(Gr) {
      var ze = v(Gr.target, "button, input[type='submit']");
      if (ze) {
        var Wr = p("#" + ee(ze, "form")) || v(ze, "form");
        if (Wr)
          return ae(Wr);
      }
    }
    function Ut(Gr) {
      Gr.addEventListener("click", Mt), Gr.addEventListener("focusin", Mt), Gr.addEventListener("focusout", Xt);
    }
    function Ft(Gr) {
      for (var ze = Ye(Gr), Wr = 0, Yr = 0; Yr < ze.length; Yr++) {
        const Qr = ze[Yr];
        Qr === "{" ? Wr++ : Qr === "}" && Wr--;
      }
      return Wr;
    }
    function Bt(Gr, ze, Wr) {
      var Yr = ae(Gr);
      Array.isArray(Yr.onHandlers) || (Yr.onHandlers = []);
      var Qr, Kr = function(Zr) {
        return Tr(Gr, function() {
          Qr || (Qr = new Function("event", Wr)), Qr.call(Gr, Zr);
        });
      };
      Gr.addEventListener(ze, Kr), Yr.onHandlers.push({ event: ze, listener: Kr });
    }
    function Vt(Gr) {
      var ze = te(Gr, "hx-on");
      if (ze) {
        for (var Wr = {}, Yr = ze.split(`
`), Qr = null, Kr = 0; Yr.length > 0; ) {
          var Zr = Yr.shift(), en = Zr.match(/^\s*([a-zA-Z:\-\.]+:)(.*)/);
          Kr === 0 && en ? (Zr.split(":"), Qr = en[1].slice(0, -1), Wr[Qr] = en[2]) : Wr[Qr] += Zr, Kr += Ft(Zr);
        }
        for (var tn in Wr)
          Bt(Gr, tn, Wr[tn]);
      }
    }
    function jt(Gr) {
      Ae(Gr);
      for (var ze = 0; ze < Gr.attributes.length; ze++) {
        var Wr = Gr.attributes[ze].name, Yr = Gr.attributes[ze].value;
        if (g(Wr, "hx-on") || g(Wr, "data-hx-on")) {
          var Qr = Wr.indexOf("-on") + 3, Kr = Wr.slice(Qr, Qr + 1);
          if (Kr === "-" || Kr === ":") {
            var Zr = Wr.slice(Qr + 1);
            g(Zr, ":") ? Zr = "htmx" + Zr : g(Zr, "-") ? Zr = "htmx:" + Zr.slice(1) : g(Zr, "htmx-") && (Zr = "htmx:" + Zr.slice(5)), Bt(Gr, Zr, Yr);
          }
        }
      }
    }
    function _t(Gr) {
      if (v(Gr, Q.config.disableSelector)) {
        m(Gr);
        return;
      }
      var ze = ae(Gr);
      if (ze.initHash !== Le(Gr)) {
        Ne(Gr), ze.initHash = Le(Gr), Vt(Gr), ce(Gr, "htmx:beforeProcessNode"), Gr.value && (ze.lastValue = Gr.value);
        var Wr = it(Gr), Yr = Ht(Gr, ze, Wr);
        Yr || (ne(Gr, "hx-boost") === "true" ? lt(Gr, ze, Wr) : o(Gr, "hx-trigger") && Wr.forEach(function(Zr) {
          Lt(Gr, Zr, ze, function() {
          });
        })), (Gr.tagName === "FORM" || ee(Gr, "type") === "submit" && o(Gr, "form")) && Ut(Gr);
        var Qr = te(Gr, "hx-sse");
        Qr && St(Gr, ze, Qr);
        var Kr = te(Gr, "hx-ws");
        Kr && mt(Gr, ze, Kr), ce(Gr, "htmx:afterProcessNode");
      }
    }
    function zt(Gr) {
      if (Gr = p(Gr), v(Gr, Q.config.disableSelector)) {
        m(Gr);
        return;
      }
      _t(Gr), oe(Pt(Gr), function(ze) {
        _t(ze);
      }), oe(kt(Gr), jt);
    }
    function $t(Gr) {
      return Gr.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
    }
    function Wt(Gr, ze) {
      var Wr;
      return window.CustomEvent && typeof window.CustomEvent == "function" ? Wr = new CustomEvent(Gr, { bubbles: !0, cancelable: !0, detail: ze }) : (Wr = re().createEvent("CustomEvent"), Wr.initCustomEvent(Gr, !0, !0, ze)), Wr;
    }
    function fe(Gr, ze, Wr) {
      ce(Gr, ze, le({ error: ze }, Wr));
    }
    function Gt(Gr) {
      return Gr === "htmx:afterProcessNode";
    }
    function R(Gr, ze) {
      oe(Br(Gr), function(Wr) {
        try {
          ze(Wr);
        } catch (Yr) {
          b(Yr);
        }
      });
    }
    function b(Gr) {
      console.error ? console.error(Gr) : console.log && console.log("ERROR: ", Gr);
    }
    function ce(Gr, ze, Wr) {
      Gr = p(Gr), Wr == null && (Wr = {}), Wr.elt = Gr;
      var Yr = Wt(ze, Wr);
      Q.logger && !Gt(ze) && Q.logger(Gr, ze, Wr), Wr.error && (b(Wr.error), ce(Gr, "htmx:error", { errorInfo: Wr }));
      var Qr = Gr.dispatchEvent(Yr), Kr = $t(ze);
      if (Qr && Kr !== ze) {
        var Zr = Wt(Kr, Yr.detail);
        Qr = Qr && Gr.dispatchEvent(Zr);
      }
      return R(Gr, function(en) {
        Qr = Qr && en.onEvent(ze, Yr) !== !1 && !Yr.defaultPrevented;
      }), Qr;
    }
    var Jt = location.pathname + location.search;
    function Zt() {
      var Gr = re().querySelector("[hx-history-elt],[data-hx-history-elt]");
      return Gr || re().body;
    }
    function Kt(Gr, ze, Wr, Yr) {
      if (U()) {
        if (Q.config.historyCacheSize <= 0) {
          localStorage.removeItem("htmx-history-cache");
          return;
        }
        Gr = F(Gr);
        for (var Qr = E(localStorage.getItem("htmx-history-cache")) || [], Kr = 0; Kr < Qr.length; Kr++)
          if (Qr[Kr].url === Gr) {
            Qr.splice(Kr, 1);
            break;
          }
        var Zr = { url: Gr, content: ze, title: Wr, scroll: Yr };
        for (ce(re().body, "htmx:historyItemCreated", { item: Zr, cache: Qr }), Qr.push(Zr); Qr.length > Q.config.historyCacheSize; )
          Qr.shift();
        for (; Qr.length > 0; )
          try {
            localStorage.setItem("htmx-history-cache", JSON.stringify(Qr));
            break;
          } catch (en) {
            fe(re().body, "htmx:historyCacheError", { cause: en, cache: Qr }), Qr.shift();
          }
      }
    }
    function Yt(Gr) {
      if (!U())
        return null;
      Gr = F(Gr);
      for (var ze = E(localStorage.getItem("htmx-history-cache")) || [], Wr = 0; Wr < ze.length; Wr++)
        if (ze[Wr].url === Gr)
          return ze[Wr];
      return null;
    }
    function Qt(Gr) {
      var ze = Q.config.requestClass, Wr = Gr.cloneNode(!0);
      return oe(f(Wr, "." + ze), function(Yr) {
        n(Yr, ze);
      }), Wr.innerHTML;
    }
    function er() {
      var Gr = Zt(), ze = Jt || location.pathname + location.search, Wr;
      try {
        Wr = re().querySelector('[hx-history="false" i],[data-hx-history="false" i]');
      } catch {
        Wr = re().querySelector('[hx-history="false"],[data-hx-history="false"]');
      }
      Wr || (ce(re().body, "htmx:beforeHistorySave", { path: ze, historyElt: Gr }), Kt(ze, Qt(Gr), re().title, window.scrollY)), Q.config.historyEnabled && history.replaceState({ htmx: !0 }, re().title, window.location.href);
    }
    function tr(Gr) {
      Q.config.getCacheBusterParam && (Gr = Gr.replace(/org\.htmx\.cache-buster=[^&]*&?/, ""), (G(Gr, "&") || G(Gr, "?")) && (Gr = Gr.slice(0, -1))), Q.config.historyEnabled && history.pushState({ htmx: !0 }, "", Gr), Jt = Gr;
    }
    function rr(Gr) {
      Q.config.historyEnabled && history.replaceState({ htmx: !0 }, "", Gr), Jt = Gr;
    }
    function nr(Gr) {
      oe(Gr, function(ze) {
        ze.call();
      });
    }
    function ir(Gr) {
      var ze = new XMLHttpRequest(), Wr = { path: Gr, xhr: ze };
      ce(re().body, "htmx:historyCacheMiss", Wr), ze.open("GET", Gr, !0), ze.setRequestHeader("HX-Request", "true"), ze.setRequestHeader("HX-History-Restore-Request", "true"), ze.setRequestHeader("HX-Current-URL", re().location.href), ze.onload = function() {
        if (this.status >= 200 && this.status < 400) {
          ce(re().body, "htmx:historyCacheMissLoad", Wr);
          var Yr = l(this.response);
          Yr = Yr.querySelector("[hx-history-elt],[data-hx-history-elt]") || Yr;
          var Qr = Zt(), Kr = T(Qr), Zr = Ve(this.response);
          if (Zr) {
            var en = C("title");
            en ? en.innerHTML = Zr : window.document.title = Zr;
          }
          Ue(Qr, Yr, Kr), nr(Kr.tasks), Jt = Gr, ce(re().body, "htmx:historyRestore", { path: Gr, cacheMiss: !0, serverResponse: this.response });
        } else
          fe(re().body, "htmx:historyCacheMissLoadError", Wr);
      }, ze.send();
    }
    function ar(Gr) {
      er(), Gr = Gr || location.pathname + location.search;
      var ze = Yt(Gr);
      if (ze) {
        var Wr = l(ze.content), Yr = Zt(), Qr = T(Yr);
        Ue(Yr, Wr, Qr), nr(Qr.tasks), document.title = ze.title, setTimeout(function() {
          window.scrollTo(0, ze.scroll);
        }, 0), Jt = Gr, ce(re().body, "htmx:historyRestore", { path: Gr, item: ze });
      } else
        Q.config.refreshOnHistoryMiss ? window.location.reload(!0) : ir(Gr);
    }
    function or(Gr) {
      var ze = me(Gr, "hx-indicator");
      return ze == null && (ze = [Gr]), oe(ze, function(Wr) {
        var Yr = ae(Wr);
        Yr.requestCount = (Yr.requestCount || 0) + 1, Wr.classList.add.call(Wr.classList, Q.config.requestClass);
      }), ze;
    }
    function sr(Gr) {
      var ze = me(Gr, "hx-disabled-elt");
      return ze == null && (ze = []), oe(ze, function(Wr) {
        var Yr = ae(Wr);
        Yr.requestCount = (Yr.requestCount || 0) + 1, Wr.setAttribute("disabled", "");
      }), ze;
    }
    function lr(Gr, ze) {
      oe(Gr, function(Wr) {
        var Yr = ae(Wr);
        Yr.requestCount = (Yr.requestCount || 0) - 1, Yr.requestCount === 0 && Wr.classList.remove.call(Wr.classList, Q.config.requestClass);
      }), oe(ze, function(Wr) {
        var Yr = ae(Wr);
        Yr.requestCount = (Yr.requestCount || 0) - 1, Yr.requestCount === 0 && Wr.removeAttribute("disabled");
      });
    }
    function ur(Gr, ze) {
      for (var Wr = 0; Wr < Gr.length; Wr++) {
        var Yr = Gr[Wr];
        if (Yr.isSameNode(ze))
          return !0;
      }
      return !1;
    }
    function fr(Gr) {
      return Gr.name === "" || Gr.name == null || Gr.disabled || v(Gr, "fieldset[disabled]") || Gr.type === "button" || Gr.type === "submit" || Gr.tagName === "image" || Gr.tagName === "reset" || Gr.tagName === "file" ? !1 : Gr.type === "checkbox" || Gr.type === "radio" ? Gr.checked : !0;
    }
    function cr(Gr, ze, Wr) {
      if (Gr != null && ze != null) {
        var Yr = Wr[Gr];
        Yr === void 0 ? Wr[Gr] = ze : Array.isArray(Yr) ? Array.isArray(ze) ? Wr[Gr] = Yr.concat(ze) : Yr.push(ze) : Array.isArray(ze) ? Wr[Gr] = [Yr].concat(ze) : Wr[Gr] = [Yr, ze];
      }
    }
    function hr(Gr, ze, Wr, Yr, Qr) {
      if (!(Yr == null || ur(Gr, Yr))) {
        if (Gr.push(Yr), fr(Yr)) {
          var Kr = ee(Yr, "name"), Zr = Yr.value;
          Yr.multiple && Yr.tagName === "SELECT" && (Zr = M(Yr.querySelectorAll("option:checked")).map(function(tn) {
            return tn.value;
          })), Yr.files && (Zr = M(Yr.files)), cr(Kr, Zr, ze), Qr && vr(Yr, Wr);
        }
        if (h(Yr, "form")) {
          var en = Yr.elements;
          oe(en, function(tn) {
            hr(Gr, ze, Wr, tn, Qr);
          });
        }
      }
    }
    function vr(Gr, ze) {
      Gr.willValidate && (ce(Gr, "htmx:validation:validate"), Gr.checkValidity() || (ze.push({ elt: Gr, message: Gr.validationMessage, validity: Gr.validity }), ce(Gr, "htmx:validation:failed", { message: Gr.validationMessage, validity: Gr.validity })));
    }
    function dr(Gr, ze) {
      var Wr = [], Yr = {}, Qr = {}, Kr = [], Zr = ae(Gr);
      Zr.lastButtonClicked && !se(Zr.lastButtonClicked) && (Zr.lastButtonClicked = null);
      var en = h(Gr, "form") && Gr.noValidate !== !0 || te(Gr, "hx-validate") === "true";
      if (Zr.lastButtonClicked && (en = en && Zr.lastButtonClicked.formNoValidate !== !0), ze !== "get" && hr(Wr, Qr, Kr, v(Gr, "form"), en), hr(Wr, Yr, Kr, Gr, en), Zr.lastButtonClicked || Gr.tagName === "BUTTON" || Gr.tagName === "INPUT" && ee(Gr, "type") === "submit") {
        var tn = Zr.lastButtonClicked || Gr, rn = ee(tn, "name");
        cr(rn, tn.value, Qr);
      }
      var sn = me(Gr, "hx-include");
      return oe(sn, function(on) {
        hr(Wr, Yr, Kr, on, en), h(on, "form") || oe(on.querySelectorAll(rt), function(an) {
          hr(Wr, Yr, Kr, an, en);
        });
      }), Yr = le(Yr, Qr), { errors: Kr, values: Yr };
    }
    function gr(Gr, ze, Wr) {
      Gr !== "" && (Gr += "&"), String(Wr) === "[object Object]" && (Wr = JSON.stringify(Wr));
      var Yr = encodeURIComponent(Wr);
      return Gr += encodeURIComponent(ze) + "=" + Yr, Gr;
    }
    function pr(Gr) {
      var ze = "";
      for (var Wr in Gr)
        if (Gr.hasOwnProperty(Wr)) {
          var Yr = Gr[Wr];
          Array.isArray(Yr) ? oe(Yr, function(Qr) {
            ze = gr(ze, Wr, Qr);
          }) : ze = gr(ze, Wr, Yr);
        }
      return ze;
    }
    function mr(Gr) {
      var ze = new FormData();
      for (var Wr in Gr)
        if (Gr.hasOwnProperty(Wr)) {
          var Yr = Gr[Wr];
          Array.isArray(Yr) ? oe(Yr, function(Qr) {
            ze.append(Wr, Qr);
          }) : ze.append(Wr, Yr);
        }
      return ze;
    }
    function xr(Gr, ze, Wr) {
      var Yr = { "HX-Request": "true", "HX-Trigger": ee(Gr, "id"), "HX-Trigger-Name": ee(Gr, "name"), "HX-Target": te(ze, "id"), "HX-Current-URL": re().location.href };
      return Rr(Gr, "hx-headers", !1, Yr), Wr !== void 0 && (Yr["HX-Prompt"] = Wr), ae(Gr).boosted && (Yr["HX-Boosted"] = "true"), Yr;
    }
    function yr(Gr, ze) {
      var Wr = ne(ze, "hx-params");
      if (Wr) {
        if (Wr === "none")
          return {};
        if (Wr === "*")
          return Gr;
        if (Wr.indexOf("not ") === 0)
          return oe(Wr.substr(4).split(","), function(Qr) {
            Qr = Qr.trim(), delete Gr[Qr];
          }), Gr;
        var Yr = {};
        return oe(Wr.split(","), function(Qr) {
          Qr = Qr.trim(), Yr[Qr] = Gr[Qr];
        }), Yr;
      } else
        return Gr;
    }
    function br(Gr) {
      return ee(Gr, "href") && ee(Gr, "href").indexOf("#") >= 0;
    }
    function wr(Gr, ze) {
      var Wr = ze || ne(Gr, "hx-swap"), Yr = { swapStyle: ae(Gr).boosted ? "innerHTML" : Q.config.defaultSwapStyle, swapDelay: Q.config.defaultSwapDelay, settleDelay: Q.config.defaultSettleDelay };
      if (Q.config.scrollIntoViewOnBoost && ae(Gr).boosted && !br(Gr) && (Yr.show = "top"), Wr) {
        var Qr = D(Wr);
        if (Qr.length > 0)
          for (var Kr = 0; Kr < Qr.length; Kr++) {
            var Zr = Qr[Kr];
            if (Zr.indexOf("swap:") === 0)
              Yr.swapDelay = d(Zr.substr(5));
            else if (Zr.indexOf("settle:") === 0)
              Yr.settleDelay = d(Zr.substr(7));
            else if (Zr.indexOf("transition:") === 0)
              Yr.transition = Zr.substr(11) === "true";
            else if (Zr.indexOf("ignoreTitle:") === 0)
              Yr.ignoreTitle = Zr.substr(12) === "true";
            else if (Zr.indexOf("scroll:") === 0) {
              var en = Zr.substr(7), tn = en.split(":"), rn = tn.pop(), sn = tn.length > 0 ? tn.join(":") : null;
              Yr.scroll = rn, Yr.scrollTarget = sn;
            } else if (Zr.indexOf("show:") === 0) {
              var on = Zr.substr(5), tn = on.split(":"), an = tn.pop(), sn = tn.length > 0 ? tn.join(":") : null;
              Yr.show = an, Yr.showTarget = sn;
            } else if (Zr.indexOf("focus-scroll:") === 0) {
              var dn = Zr.substr(13);
              Yr.focusScroll = dn == "true";
            } else Kr == 0 ? Yr.swapStyle = Zr : b("Unknown modifier in hx-swap: " + Zr);
          }
      }
      return Yr;
    }
    function Sr(Gr) {
      return ne(Gr, "hx-encoding") === "multipart/form-data" || h(Gr, "form") && ee(Gr, "enctype") === "multipart/form-data";
    }
    function Er(Gr, ze, Wr) {
      var Yr = null;
      return R(ze, function(Qr) {
        Yr == null && (Yr = Qr.encodeParameters(Gr, Wr, ze));
      }), Yr ?? (Sr(ze) ? mr(Wr) : pr(Wr));
    }
    function T(Gr) {
      return { tasks: [], elts: [Gr] };
    }
    function Cr(Gr, ze) {
      var Wr = Gr[0], Yr = Gr[Gr.length - 1];
      if (ze.scroll) {
        var Qr = null;
        ze.scrollTarget && (Qr = ue(Wr, ze.scrollTarget)), ze.scroll === "top" && (Wr || Qr) && (Qr = Qr || Wr, Qr.scrollTop = 0), ze.scroll === "bottom" && (Yr || Qr) && (Qr = Qr || Yr, Qr.scrollTop = Qr.scrollHeight);
      }
      if (ze.show) {
        var Qr = null;
        if (ze.showTarget) {
          var Kr = ze.showTarget;
          ze.showTarget === "window" && (Kr = "body"), Qr = ue(Wr, Kr);
        }
        ze.show === "top" && (Wr || Qr) && (Qr = Qr || Wr, Qr.scrollIntoView({ block: "start", behavior: Q.config.scrollBehavior })), ze.show === "bottom" && (Yr || Qr) && (Qr = Qr || Yr, Qr.scrollIntoView({ block: "end", behavior: Q.config.scrollBehavior }));
      }
    }
    function Rr(Gr, ze, Wr, Yr) {
      if (Yr == null && (Yr = {}), Gr == null)
        return Yr;
      var Qr = te(Gr, ze);
      if (Qr) {
        var Kr = Qr.trim(), Zr = Wr;
        if (Kr === "unset")
          return null;
        Kr.indexOf("javascript:") === 0 ? (Kr = Kr.substr(11), Zr = !0) : Kr.indexOf("js:") === 0 && (Kr = Kr.substr(3), Zr = !0), Kr.indexOf("{") !== 0 && (Kr = "{" + Kr + "}");
        var en;
        Zr ? en = Tr(Gr, function() {
          return Function("return (" + Kr + ")")();
        }, {}) : en = E(Kr);
        for (var tn in en)
          en.hasOwnProperty(tn) && Yr[tn] == null && (Yr[tn] = en[tn]);
      }
      return Rr(u(Gr), ze, Wr, Yr);
    }
    function Tr(Gr, ze, Wr) {
      return Q.config.allowEval ? ze() : (fe(Gr, "htmx:evalDisallowedError"), Wr);
    }
    function Or(Gr, ze) {
      return Rr(Gr, "hx-vars", !0, ze);
    }
    function qr(Gr, ze) {
      return Rr(Gr, "hx-vals", !1, ze);
    }
    function Hr(Gr) {
      return le(Or(Gr), qr(Gr));
    }
    function Lr(Gr, ze, Wr) {
      if (Wr !== null)
        try {
          Gr.setRequestHeader(ze, Wr);
        } catch {
          Gr.setRequestHeader(ze, encodeURIComponent(Wr)), Gr.setRequestHeader(ze + "-URI-AutoEncoded", "true");
        }
    }
    function Ar(Gr) {
      if (Gr.responseURL && typeof URL < "u")
        try {
          var ze = new URL(Gr.responseURL);
          return ze.pathname + ze.search;
        } catch {
          fe(re().body, "htmx:badResponseUrl", { url: Gr.responseURL });
        }
    }
    function O(Gr, ze) {
      return ze.test(Gr.getAllResponseHeaders());
    }
    function Nr(Gr, ze, Wr) {
      return Gr = Gr.toLowerCase(), Wr ? Wr instanceof Element || I(Wr, "String") ? he(Gr, ze, null, null, { targetOverride: p(Wr), returnPromise: !0 }) : he(Gr, ze, p(Wr.source), Wr.event, { handler: Wr.handler, headers: Wr.headers, values: Wr.values, targetOverride: p(Wr.target), swapOverride: Wr.swap, select: Wr.select, returnPromise: !0 }) : he(Gr, ze, null, null, { returnPromise: !0 });
    }
    function Ir(Gr) {
      for (var ze = []; Gr; )
        ze.push(Gr), Gr = Gr.parentElement;
      return ze;
    }
    function kr(Gr, ze, Wr) {
      var Yr, Qr;
      if (typeof URL == "function") {
        Qr = new URL(ze, document.location.href);
        var Kr = document.location.origin;
        Yr = Kr === Qr.origin;
      } else
        Qr = ze, Yr = g(ze, document.location.origin);
      return Q.config.selfRequestsOnly && !Yr ? !1 : ce(Gr, "htmx:validateUrl", le({ url: Qr, sameHost: Yr }, Wr));
    }
    function he(Gr, ze, Wr, Yr, Qr, Kr) {
      var Zr = null, en = null;
      if (Qr = Qr ?? {}, Qr.returnPromise && typeof Promise < "u")
        var tn = new Promise(function(oi, ii) {
          Zr = oi, en = ii;
        });
      Wr == null && (Wr = re().body);
      var rn = Qr.handler || Mr, sn = Qr.select || null;
      if (!se(Wr))
        return ie(Zr), tn;
      var on = Qr.targetOverride || ye(Wr);
      if (on == null || on == pe)
        return fe(Wr, "htmx:targetError", { target: te(Wr, "hx-target") }), ie(en), tn;
      var an = ae(Wr), dn = an.lastButtonClicked;
      if (dn) {
        var pn = ee(dn, "formaction");
        pn != null && (ze = pn);
        var mn = ee(dn, "formmethod");
        mn != null && mn.toLowerCase() !== "dialog" && (Gr = mn);
      }
      var vn = ne(Wr, "hx-confirm");
      if (Kr === void 0) {
        var xn = function(oi) {
          return he(Gr, ze, Wr, Yr, Qr, !!oi);
        }, gn = { target: on, elt: Wr, path: ze, verb: Gr, triggeringEvent: Yr, etc: Qr, issueRequest: xn, question: vn };
        if (ce(Wr, "htmx:confirm", gn) === !1)
          return ie(Zr), tn;
      }
      var un = Wr, fn = ne(Wr, "hx-sync"), cn = null, Cn = !1;
      if (fn) {
        var bn = fn.split(":"), Sn = bn[0].trim();
        if (Sn === "this" ? un = xe(Wr, "hx-sync") : un = ue(Wr, Sn), fn = (bn[1] || "drop").trim(), an = ae(un), fn === "drop" && an.xhr && an.abortable !== !0)
          return ie(Zr), tn;
        if (fn === "abort") {
          if (an.xhr)
            return ie(Zr), tn;
          Cn = !0;
        } else if (fn === "replace")
          ce(un, "htmx:abort");
        else if (fn.indexOf("queue") === 0) {
          var _n = fn.split(" ");
          cn = (_n[1] || "last").trim();
        }
      }
      if (an.xhr)
        if (an.abortable)
          ce(un, "htmx:abort");
        else {
          if (cn == null) {
            if (Yr) {
              var Tn = ae(Yr);
              Tn && Tn.triggerSpec && Tn.triggerSpec.queue && (cn = Tn.triggerSpec.queue);
            }
            cn == null && (cn = "last");
          }
          return an.queuedRequests == null && (an.queuedRequests = []), cn === "first" && an.queuedRequests.length === 0 ? an.queuedRequests.push(function() {
            he(Gr, ze, Wr, Yr, Qr);
          }) : cn === "all" ? an.queuedRequests.push(function() {
            he(Gr, ze, Wr, Yr, Qr);
          }) : cn === "last" && (an.queuedRequests = [], an.queuedRequests.push(function() {
            he(Gr, ze, Wr, Yr, Qr);
          })), ie(Zr), tn;
        }
      var Ln = new XMLHttpRequest();
      an.xhr = Ln, an.abortable = Cn;
      var Pn = function() {
        if (an.xhr = null, an.abortable = !1, an.queuedRequests != null && an.queuedRequests.length > 0) {
          var oi = an.queuedRequests.shift();
          oi();
        }
      }, In = ne(Wr, "hx-prompt");
      if (In) {
        var Mn = prompt(In);
        if (Mn === null || !ce(Wr, "htmx:prompt", { prompt: Mn, target: on }))
          return ie(Zr), Pn(), tn;
      }
      if (vn && !Kr && !confirm(vn))
        return ie(Zr), Pn(), tn;
      var Nn = xr(Wr, on, Mn);
      Gr !== "get" && !Sr(Wr) && (Nn["Content-Type"] = "application/x-www-form-urlencoded"), Qr.headers && (Nn = le(Nn, Qr.headers));
      var Gn = dr(Wr, Gr), Un = Gn.errors, Hn = Gn.values;
      Qr.values && (Hn = le(Hn, Qr.values));
      var En = Hr(Wr), Yn = le(Hn, En), Xn = yr(Yn, Wr);
      Q.config.getCacheBusterParam && Gr === "get" && (Xn["org.htmx.cache-buster"] = ee(on, "id") || "true"), (ze == null || ze === "") && (ze = re().location.href);
      var ni = Rr(Wr, "hx-request"), Rn = ae(Wr).boosted, On = Q.config.methodsThatUseUrlParams.indexOf(Gr) >= 0, Wn = { boosted: Rn, useUrlParams: On, parameters: Xn, unfilteredParameters: Yn, headers: Nn, target: on, verb: Gr, errors: Un, withCredentials: Qr.credentials || ni.credentials || Q.config.withCredentials, timeout: Qr.timeout || ni.timeout || Q.config.timeout, path: ze, triggeringEvent: Yr };
      if (!ce(Wr, "htmx:configRequest", Wn))
        return ie(Zr), Pn(), tn;
      if (ze = Wn.path, Gr = Wn.verb, Nn = Wn.headers, Xn = Wn.parameters, Un = Wn.errors, On = Wn.useUrlParams, Un && Un.length > 0)
        return ce(Wr, "htmx:validation:halted", Wn), ie(Zr), Pn(), tn;
      var Fn = ze.split("#"), Qn = Fn[0], pi = Fn[1], ui = ze;
      if (On) {
        ui = Qn;
        var qn = Object.keys(Xn).length !== 0;
        qn && (ui.indexOf("?") < 0 ? ui += "?" : ui += "&", ui += pr(Xn), pi && (ui += "#" + pi));
      }
      if (!kr(Wr, ui, Wn))
        return fe(Wr, "htmx:invalidPath", Wn), ie(en), tn;
      if (Ln.open(Gr.toUpperCase(), ui, !0), Ln.overrideMimeType("text/html"), Ln.withCredentials = Wn.withCredentials, Ln.timeout = Wn.timeout, !ni.noHeaders) {
        for (var jn in Nn)
          if (Nn.hasOwnProperty(jn)) {
            var $n = Nn[jn];
            Lr(Ln, jn, $n);
          }
      }
      var Kn = { xhr: Ln, target: on, requestConfig: Wn, etc: Qr, boosted: Rn, select: sn, pathInfo: { requestPath: ze, finalRequestPath: ui, anchor: pi } };
      if (Ln.onload = function() {
        try {
          var oi = Ir(Wr);
          if (Kn.pathInfo.responsePath = Ar(Ln), rn(Wr, Kn), lr(Jn, ei), ce(Wr, "htmx:afterRequest", Kn), ce(Wr, "htmx:afterOnLoad", Kn), !se(Wr)) {
            for (var ii = null; oi.length > 0 && ii == null; ) {
              var fi = oi.shift();
              se(fi) && (ii = fi);
            }
            ii && (ce(ii, "htmx:afterRequest", Kn), ce(ii, "htmx:afterOnLoad", Kn));
          }
          ie(Zr), Pn();
        } catch (Hi) {
          throw fe(Wr, "htmx:onLoadError", le({ error: Hi }, Kn)), Hi;
        }
      }, Ln.onerror = function() {
        lr(Jn, ei), fe(Wr, "htmx:afterRequest", Kn), fe(Wr, "htmx:sendError", Kn), ie(en), Pn();
      }, Ln.onabort = function() {
        lr(Jn, ei), fe(Wr, "htmx:afterRequest", Kn), fe(Wr, "htmx:sendAbort", Kn), ie(en), Pn();
      }, Ln.ontimeout = function() {
        lr(Jn, ei), fe(Wr, "htmx:afterRequest", Kn), fe(Wr, "htmx:timeout", Kn), ie(en), Pn();
      }, !ce(Wr, "htmx:beforeRequest", Kn))
        return ie(Zr), Pn(), tn;
      var Jn = or(Wr), ei = sr(Wr);
      oe(["loadstart", "loadend", "progress", "abort"], function(oi) {
        oe([Ln, Ln.upload], function(ii) {
          ii.addEventListener(oi, function(fi) {
            ce(Wr, "htmx:xhr:" + oi, { lengthComputable: fi.lengthComputable, loaded: fi.loaded, total: fi.total });
          });
        });
      }), ce(Wr, "htmx:beforeSend", Kn);
      var ri = On ? null : Er(Ln, Wr, Xn);
      return Ln.send(ri), tn;
    }
    function Pr(Gr, ze) {
      var Wr = ze.xhr, Yr = null, Qr = null;
      if (O(Wr, /HX-Push:/i) ? (Yr = Wr.getResponseHeader("HX-Push"), Qr = "push") : O(Wr, /HX-Push-Url:/i) ? (Yr = Wr.getResponseHeader("HX-Push-Url"), Qr = "push") : O(Wr, /HX-Replace-Url:/i) && (Yr = Wr.getResponseHeader("HX-Replace-Url"), Qr = "replace"), Yr)
        return Yr === "false" ? {} : { type: Qr, path: Yr };
      var Kr = ze.pathInfo.finalRequestPath, Zr = ze.pathInfo.responsePath, en = ne(Gr, "hx-push-url"), tn = ne(Gr, "hx-replace-url"), rn = ae(Gr).boosted, sn = null, on = null;
      return en ? (sn = "push", on = en) : tn ? (sn = "replace", on = tn) : rn && (sn = "push", on = Zr || Kr), on ? on === "false" ? {} : (on === "true" && (on = Zr || Kr), ze.pathInfo.anchor && on.indexOf("#") === -1 && (on = on + "#" + ze.pathInfo.anchor), { type: sn, path: on }) : {};
    }
    function Mr(Gr, ze) {
      var Wr = ze.xhr, Yr = ze.target, Qr = ze.etc;
      ze.requestConfig;
      var Kr = ze.select;
      if (ce(Gr, "htmx:beforeOnLoad", ze)) {
        if (O(Wr, /HX-Trigger:/i) && _e(Wr, "HX-Trigger", Gr), O(Wr, /HX-Location:/i)) {
          er();
          var Zr = Wr.getResponseHeader("HX-Location"), en;
          Zr.indexOf("{") === 0 && (en = E(Zr), Zr = en.path, delete en.path), Nr("GET", Zr, en).then(function() {
            tr(Zr);
          });
          return;
        }
        var tn = O(Wr, /HX-Refresh:/i) && Wr.getResponseHeader("HX-Refresh") === "true";
        if (O(Wr, /HX-Redirect:/i)) {
          location.href = Wr.getResponseHeader("HX-Redirect"), tn && location.reload();
          return;
        }
        if (tn) {
          location.reload();
          return;
        }
        O(Wr, /HX-Retarget:/i) && (Wr.getResponseHeader("HX-Retarget") === "this" ? ze.target = Gr : ze.target = ue(Gr, Wr.getResponseHeader("HX-Retarget")));
        var rn = Pr(Gr, ze), sn = Wr.status >= 200 && Wr.status < 400 && Wr.status !== 204, on = Wr.response, an = Wr.status >= 400, dn = Q.config.ignoreTitle, pn = le({ shouldSwap: sn, serverResponse: on, isError: an, ignoreTitle: dn }, ze);
        if (ce(Yr, "htmx:beforeSwap", pn)) {
          if (Yr = pn.target, on = pn.serverResponse, an = pn.isError, dn = pn.ignoreTitle, ze.target = Yr, ze.failed = an, ze.successful = !an, pn.shouldSwap) {
            Wr.status === 286 && at(Gr), R(Gr, function(bn) {
              on = bn.transformResponse(on, Wr, Gr);
            }), rn.type && er();
            var mn = Qr.swapOverride;
            O(Wr, /HX-Reswap:/i) && (mn = Wr.getResponseHeader("HX-Reswap"));
            var en = wr(Gr, mn);
            en.hasOwnProperty("ignoreTitle") && (dn = en.ignoreTitle), Yr.classList.add(Q.config.swappingClass);
            var vn = null, xn = null, gn = function() {
              try {
                var bn = document.activeElement, Sn = {};
                try {
                  Sn = { elt: bn, start: bn ? bn.selectionStart : null, end: bn ? bn.selectionEnd : null };
                } catch {
                }
                var _n;
                Kr && (_n = Kr), O(Wr, /HX-Reselect:/i) && (_n = Wr.getResponseHeader("HX-Reselect")), rn.type && (ce(re().body, "htmx:beforeHistoryUpdate", le({ history: rn }, ze)), rn.type === "push" ? (tr(rn.path), ce(re().body, "htmx:pushedIntoHistory", { path: rn.path })) : (rr(rn.path), ce(re().body, "htmx:replacedInHistory", { path: rn.path })));
                var Tn = T(Yr);
                if (je(en.swapStyle, Yr, Gr, on, Tn, _n), Sn.elt && !se(Sn.elt) && ee(Sn.elt, "id")) {
                  var Ln = document.getElementById(ee(Sn.elt, "id")), Pn = { preventScroll: en.focusScroll !== void 0 ? !en.focusScroll : !Q.config.defaultFocusScroll };
                  if (Ln) {
                    if (Sn.start && Ln.setSelectionRange)
                      try {
                        Ln.setSelectionRange(Sn.start, Sn.end);
                      } catch {
                      }
                    Ln.focus(Pn);
                  }
                }
                if (Yr.classList.remove(Q.config.swappingClass), oe(Tn.elts, function(Nn) {
                  Nn.classList && Nn.classList.add(Q.config.settlingClass), ce(Nn, "htmx:afterSwap", ze);
                }), O(Wr, /HX-Trigger-After-Swap:/i)) {
                  var In = Gr;
                  se(Gr) || (In = re().body), _e(Wr, "HX-Trigger-After-Swap", In);
                }
                var Mn = function() {
                  if (oe(Tn.tasks, function(Hn) {
                    Hn.call();
                  }), oe(Tn.elts, function(Hn) {
                    Hn.classList && Hn.classList.remove(Q.config.settlingClass), ce(Hn, "htmx:afterSettle", ze);
                  }), ze.pathInfo.anchor) {
                    var Nn = re().getElementById(ze.pathInfo.anchor);
                    Nn && Nn.scrollIntoView({ block: "start", behavior: "auto" });
                  }
                  if (Tn.title && !dn) {
                    var Gn = C("title");
                    Gn ? Gn.innerHTML = Tn.title : window.document.title = Tn.title;
                  }
                  if (Cr(Tn.elts, en), O(Wr, /HX-Trigger-After-Settle:/i)) {
                    var Un = Gr;
                    se(Gr) || (Un = re().body), _e(Wr, "HX-Trigger-After-Settle", Un);
                  }
                  ie(vn);
                };
                en.settleDelay > 0 ? setTimeout(Mn, en.settleDelay) : Mn();
              } catch (Nn) {
                throw fe(Gr, "htmx:swapError", ze), ie(xn), Nn;
              }
            }, un = Q.config.globalViewTransitions;
            if (en.hasOwnProperty("transition") && (un = en.transition), un && ce(Gr, "htmx:beforeTransition", ze) && typeof Promise < "u" && document.startViewTransition) {
              var fn = new Promise(function(bn, Sn) {
                vn = bn, xn = Sn;
              }), cn = gn;
              gn = function() {
                document.startViewTransition(function() {
                  return cn(), fn;
                });
              };
            }
            en.swapDelay > 0 ? setTimeout(gn, en.swapDelay) : gn();
          }
          an && fe(Gr, "htmx:responseError", le({ error: "Response Status Error Code " + Wr.status + " from " + ze.pathInfo.requestPath }, ze));
        }
      }
    }
    var Xr = {};
    function Dr() {
      return { init: function(Gr) {
        return null;
      }, onEvent: function(Gr, ze) {
        return !0;
      }, transformResponse: function(Gr, ze, Wr) {
        return Gr;
      }, isInlineSwap: function(Gr) {
        return !1;
      }, handleSwap: function(Gr, ze, Wr, Yr) {
        return !1;
      }, encodeParameters: function(Gr, ze, Wr) {
        return null;
      } };
    }
    function Ur(Gr, ze) {
      ze.init && ze.init(r), Xr[Gr] = le(Dr(), ze);
    }
    function Fr(Gr) {
      delete Xr[Gr];
    }
    function Br(Gr, ze, Wr) {
      if (Gr == null)
        return ze;
      ze == null && (ze = []), Wr == null && (Wr = []);
      var Yr = te(Gr, "hx-ext");
      return Yr && oe(Yr.split(","), function(Qr) {
        if (Qr = Qr.replace(/ /g, ""), Qr.slice(0, 7) == "ignore:") {
          Wr.push(Qr.slice(7));
          return;
        }
        if (Wr.indexOf(Qr) < 0) {
          var Kr = Xr[Qr];
          Kr && ze.indexOf(Kr) < 0 && ze.push(Kr);
        }
      }), Br(u(Gr), ze, Wr);
    }
    var Vr = !1;
    re().addEventListener("DOMContentLoaded", function() {
      Vr = !0;
    });
    function jr(Gr) {
      Vr || re().readyState === "complete" ? Gr() : re().addEventListener("DOMContentLoaded", Gr);
    }
    function _r() {
      Q.config.includeIndicatorStyles !== !1 && re().head.insertAdjacentHTML("beforeend", "<style>                      ." + Q.config.indicatorClass + "{opacity:0}                      ." + Q.config.requestClass + " ." + Q.config.indicatorClass + "{opacity:1; transition: opacity 200ms ease-in;}                      ." + Q.config.requestClass + "." + Q.config.indicatorClass + "{opacity:1; transition: opacity 200ms ease-in;}                    </style>");
    }
    function zr() {
      var Gr = re().querySelector('meta[name="htmx-config"]');
      return Gr ? E(Gr.content) : null;
    }
    function $r() {
      var Gr = zr();
      Gr && (Q.config = le(Q.config, Gr));
    }
    return jr(function() {
      $r(), _r();
      var Gr = re().body;
      zt(Gr);
      var ze = re().querySelectorAll("[hx-trigger='restored'],[data-hx-trigger='restored']");
      Gr.addEventListener("htmx:abort", function(Yr) {
        var Qr = Yr.target, Kr = ae(Qr);
        Kr && Kr.xhr && Kr.xhr.abort();
      });
      const Wr = window.onpopstate ? window.onpopstate.bind(window) : null;
      window.onpopstate = function(Yr) {
        Yr.state && Yr.state.htmx ? (ar(), oe(ze, function(Qr) {
          ce(Qr, "htmx:restored", { document: re(), triggerEvent: ce });
        })) : Wr && Wr(Yr);
      }, setTimeout(function() {
        ce(Gr, "htmx:load", {}), Gr = null;
      }, 0);
    }), Q;
  }();
});
(function() {
  var Gr, ze = "hx-target-";
  function Wr(Kr, Zr) {
    return Kr.substring(0, Zr.length) === Zr;
  }
  function Yr(Kr, Zr) {
    if (!Kr || !Zr) return null;
    var en = Zr.toString(), tn = [
      en,
      en.substr(0, 2) + "*",
      en.substr(0, 2) + "x",
      en.substr(0, 1) + "*",
      en.substr(0, 1) + "x",
      en.substr(0, 1) + "**",
      en.substr(0, 1) + "xx",
      "*",
      "x",
      "***",
      "xxx"
    ];
    (Wr(en, "4") || Wr(en, "5")) && tn.push("error");
    for (var rn = 0; rn < tn.length; rn++) {
      var sn = ze + tn[rn], on = Gr.getClosestAttributeValue(Kr, sn);
      if (on)
        return on === "this" ? Gr.findThisElement(Kr, sn) : Gr.querySelectorExt(Kr, on);
    }
    return null;
  }
  function Qr(Kr) {
    Kr.detail.isError ? htmx.config.responseTargetUnsetsError && (Kr.detail.isError = !1) : htmx.config.responseTargetSetsError && (Kr.detail.isError = !0);
  }
  htmx.defineExtension("response-targets", {
    /** @param {import("../htmx").HtmxInternalApi} apiRef */
    init: function(Kr) {
      Gr = Kr, htmx.config.responseTargetUnsetsError === void 0 && (htmx.config.responseTargetUnsetsError = !0), htmx.config.responseTargetSetsError === void 0 && (htmx.config.responseTargetSetsError = !1), htmx.config.responseTargetPrefersExisting === void 0 && (htmx.config.responseTargetPrefersExisting = !1), htmx.config.responseTargetPrefersRetargetHeader === void 0 && (htmx.config.responseTargetPrefersRetargetHeader = !0);
    },
    /**
     * @param {string} name
     * @param {Event} evt
     */
    onEvent: function(Kr, Zr) {
      if (Kr === "htmx:beforeSwap" && Zr.detail.xhr && Zr.detail.xhr.status !== 200) {
        if (Zr.detail.target && (htmx.config.responseTargetPrefersExisting || htmx.config.responseTargetPrefersRetargetHeader && Zr.detail.xhr.getAllResponseHeaders().match(/HX-Retarget:/i)))
          return Zr.detail.shouldSwap = !0, Qr(Zr), !0;
        if (!Zr.detail.requestConfig)
          return !0;
        var en = Yr(Zr.detail.requestConfig.elt, Zr.detail.xhr.status);
        return en && (Qr(Zr), Zr.detail.shouldSwap = !0, Zr.detail.target = en), !0;
      }
    }
  });
})();
function getBoundingClientRect(Gr) {
  if (!Gr)
    return;
  let ze;
  if (typeof Gr.getBoundingClientRect < "u")
    ze = Gr.getBoundingClientRect();
  else {
    let Wr = document.createRange();
    Wr.selectNode(Gr), ze = Wr.getBoundingClientRect();
  }
  return ze;
}
function getClientRects(Gr) {
  if (!Gr)
    return;
  let ze;
  if (typeof Gr.getClientRects < "u")
    ze = Gr.getClientRects();
  else {
    let Wr = document.createRange();
    Wr.selectNode(Gr), ze = Wr.getClientRects();
  }
  return ze;
}
function UUID() {
  var Gr = (/* @__PURE__ */ new Date()).getTime();
  return typeof performance < "u" && typeof performance.now == "function" && (Gr += performance.now()), "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(ze) {
    var Wr = (Gr + Math.random() * 16) % 16 | 0;
    return Gr = Math.floor(Gr / 16), (ze === "x" ? Wr : Wr & 3 | 8).toString(16);
  });
}
function attr(Gr, ze) {
  for (var Wr = 0; Wr < ze.length; Wr++)
    if (Gr.hasAttribute(ze[Wr]))
      return Gr.getAttribute(ze[Wr]);
}
function querySelectorEscape(Gr) {
  if (arguments.length == 0)
    throw new TypeError("`CSS.escape` requires an argument.");
  for (var ze = String(Gr), Wr = ze.length, Yr = -1, Qr, Kr = "", Zr = ze.charCodeAt(0); ++Yr < Wr; ) {
    if (Qr = ze.charCodeAt(Yr), Qr == 0) {
      Kr += "�";
      continue;
    }
    if (
      // If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
      // U+007F, […]
      Qr >= 1 && Qr <= 31 || Qr == 127 || // If the character is the first character and is in the range [0-9]
      // (U+0030 to U+0039), […]
      Yr == 0 && Qr >= 48 && Qr <= 57 || // If the character is the second character and is in the range [0-9]
      // (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
      Yr == 1 && Qr >= 48 && Qr <= 57 && Zr == 45
    ) {
      Kr += "\\" + Qr.toString(16) + " ";
      continue;
    }
    if (
      // If the character is the first character and is a `-` (U+002D), and
      // there is no second character, […]
      Yr == 0 && Wr == 1 && Qr == 45
    ) {
      Kr += "\\" + ze.charAt(Yr);
      continue;
    }
    if (Qr == 46 && ze.charAt(0) == "#") {
      Kr += "\\.";
      continue;
    }
    if (Qr >= 128 || Qr == 45 || Qr == 95 || Qr == 35 || // Allow #
    Qr == 46 || // Allow .
    Qr >= 48 && Qr <= 57 || Qr >= 65 && Qr <= 90 || Qr >= 97 && Qr <= 122) {
      Kr += ze.charAt(Yr);
      continue;
    }
    Kr += "\\" + ze.charAt(Yr);
  }
  return Kr;
}
function defer() {
  this.resolve = null, this.reject = null, this.id = UUID(), this.promise = new Promise((Gr, ze) => {
    this.resolve = Gr, this.reject = ze;
  }), Object.freeze(this);
}
const requestIdleCallback = typeof window < "u" && ("requestIdleCallback" in window ? window.requestIdleCallback : window.requestAnimationFrame);
function CSSValueToString(Gr) {
  return Gr.value + (Gr.unit || "");
}
function isElement(Gr) {
  return Gr && Gr.nodeType === 1;
}
function isText(Gr) {
  return Gr && Gr.nodeType === 3;
}
function* walk$1(Gr, ze) {
  let Wr = Gr;
  for (; Wr; )
    if (yield Wr, Wr.childNodes.length)
      Wr = Wr.firstChild;
    else if (Wr.nextSibling) {
      if (ze && Wr === ze) {
        Wr = void 0;
        break;
      }
      Wr = Wr.nextSibling;
    } else
      for (; Wr; ) {
        if (Wr = Wr.parentNode, ze && Wr === ze) {
          Wr = void 0;
          break;
        }
        if (Wr && Wr.nextSibling) {
          Wr = Wr.nextSibling;
          break;
        }
      }
}
function nodeAfter(Gr, ze) {
  if (ze && Gr === ze)
    return;
  let Wr = nextSignificantNode(Gr);
  if (Wr)
    return Wr;
  if (Gr.parentNode)
    for (; Gr = Gr.parentNode; ) {
      if (ze && Gr === ze)
        return;
      if (Wr = nextSignificantNode(Gr), Wr)
        return Wr;
    }
}
function nodeBefore(Gr, ze) {
  if (ze && Gr === ze)
    return;
  let Wr = previousSignificantNode(Gr);
  if (Wr)
    return Wr;
  if (Gr.parentNode)
    for (; Gr = Gr.parentNode; ) {
      if (ze && Gr === ze)
        return;
      if (Wr = previousSignificantNode(Gr), Wr)
        return Wr;
    }
}
function elementAfter(Gr, ze) {
  let Wr = nodeAfter(Gr, ze);
  for (; Wr && Wr.nodeType !== 1; )
    Wr = nodeAfter(Wr, ze);
  return Wr;
}
function elementBefore(Gr, ze) {
  let Wr = nodeBefore(Gr, ze);
  for (; Wr && Wr.nodeType !== 1; )
    Wr = nodeBefore(Wr, ze);
  return Wr;
}
function displayedElementAfter(Gr, ze) {
  let Wr = elementAfter(Gr, ze);
  for (; Wr && Wr.dataset.undisplayed; )
    Wr = elementAfter(Wr, ze);
  return Wr;
}
function displayedElementBefore(Gr, ze) {
  let Wr = elementBefore(Gr, ze);
  for (; Wr && Wr.dataset.undisplayed; )
    Wr = elementBefore(Wr, ze);
  return Wr;
}
function rebuildAncestors(Gr) {
  let ze, Wr, Yr = [], Qr = [], Kr = document.createDocumentFragment();
  if (Gr.nodeName === "TR") {
    let tn = Gr.previousElementSibling, rn = 1;
    for (; tn; ) {
      if (tn.childElementCount > Gr.childElementCount) {
        const sn = Array.from(Gr.children);
        for (; Gr.firstChild; )
          Gr.firstChild.remove();
        let on = 0;
        for (let an = 0; an < tn.children.length; an++) {
          let dn = tn.children[an];
          if (dn.rowSpan && dn.rowSpan > rn) {
            const pn = dn.cloneNode(!0);
            pn.rowSpan = dn.rowSpan - rn, Gr.appendChild(pn);
          } else {
            const pn = sn[on++];
            pn && Gr.appendChild(pn);
          }
        }
      }
      tn = tn.previousElementSibling, rn++;
    }
  }
  let Zr = Gr;
  for (; Zr.parentNode && Zr.parentNode.nodeType === 1; )
    Yr.unshift(Zr.parentNode), Zr = Zr.parentNode;
  for (var en = 0; en < Yr.length; en++) {
    if (Wr = Yr[en], ze = Wr.cloneNode(!1), ze.setAttribute("data-split-from", ze.getAttribute("data-ref")), ze.hasAttribute("id")) {
      let tn = ze.getAttribute("id");
      ze.setAttribute("data-id", tn), ze.removeAttribute("id");
    }
    if (ze.hasAttribute("data-break-before") && ze.removeAttribute("data-break-before"), ze.hasAttribute("data-previous-break-after") && ze.removeAttribute("data-previous-break-after"), Qr.length ? Qr[Qr.length - 1].appendChild(ze) : Kr.appendChild(ze), Qr.push(ze), ze.nodeName === "TD" && Wr.parentElement.contains(Wr)) {
      let tn = Wr, rn = ze;
      for (; tn = tn.previousElementSibling; ) {
        let sn = tn.cloneNode(!1);
        ze.parentElement.insertBefore(sn, rn), rn = sn;
      }
    }
  }
  return Qr = void 0, Kr;
}
function needsBreakBefore(Gr) {
  return typeof Gr < "u" && typeof Gr.dataset < "u" && typeof Gr.dataset.breakBefore < "u" && (Gr.dataset.breakBefore === "always" || Gr.dataset.breakBefore === "page" || Gr.dataset.breakBefore === "left" || Gr.dataset.breakBefore === "right" || Gr.dataset.breakBefore === "recto" || Gr.dataset.breakBefore === "verso");
}
function needsPreviousBreakAfter(Gr) {
  return typeof Gr < "u" && typeof Gr.dataset < "u" && typeof Gr.dataset.previousBreakAfter < "u" && (Gr.dataset.previousBreakAfter === "always" || Gr.dataset.previousBreakAfter === "page" || Gr.dataset.previousBreakAfter === "left" || Gr.dataset.previousBreakAfter === "right" || Gr.dataset.previousBreakAfter === "recto" || Gr.dataset.previousBreakAfter === "verso");
}
function needsPageBreak(Gr, ze) {
  if (typeof Gr > "u" || !ze || isIgnorable(Gr) || Gr.dataset && Gr.dataset.undisplayed)
    return !1;
  let Wr = ze.dataset ? ze.dataset.page : void 0;
  if (typeof Wr > "u") {
    const Qr = getNodeWithNamedPage(ze);
    Qr && (Wr = Qr.dataset.page);
  }
  let Yr = Gr.dataset ? Gr.dataset.page : void 0;
  if (typeof Yr > "u") {
    const Qr = getNodeWithNamedPage(Gr, ze);
    Qr && (Yr = Qr.dataset.page);
  }
  return Yr !== Wr;
}
function* words(Gr) {
  let ze = Gr.nodeValue, Wr = ze.length, Yr = 0, Qr, Kr;
  const Zr = Gr.parentElement && Gr.parentElement.nodeName === "PRE";
  for (; Yr < Wr; )
    Qr = ze[Yr], /^[\S\u202F\u00A0]$/.test(Qr) || Zr ? Kr || (Kr = document.createRange(), Kr.setStart(Gr, Yr)) : Kr && (Kr.setEnd(Gr, Yr), yield Kr, Kr = void 0), Yr += 1;
  Kr && (Kr.setEnd(Gr, Yr), yield Kr);
}
function* letters(Gr) {
  let ze = Gr.startContainer, Wr = ze.length, Yr = Gr.startOffset, Qr;
  for (; Yr < Wr; )
    Qr = document.createRange(), Qr.setStart(ze, Yr), Qr.setEnd(ze, Yr + 1), yield Qr, Yr += 1;
}
function isContainer(Gr) {
  let ze;
  if (typeof Gr.tagName > "u")
    return !0;
  if (Gr.style && Gr.style.display === "none")
    return !1;
  switch (Gr.tagName) {
    // Inline
    case "A":
    case "ABBR":
    case "ACRONYM":
    case "B":
    case "BDO":
    case "BIG":
    case "BR":
    case "BUTTON":
    case "CITE":
    case "CODE":
    case "DFN":
    case "EM":
    case "I":
    case "IMG":
    case "INPUT":
    case "KBD":
    case "LABEL":
    case "MAP":
    case "OBJECT":
    case "Q":
    case "SAMP":
    case "SCRIPT":
    case "SELECT":
    case "SMALL":
    case "SPAN":
    case "STRONG":
    case "SUB":
    case "SUP":
    case "TEXTAREA":
    case "TIME":
    case "TT":
    case "VAR":
    case "P":
    case "H1":
    case "H2":
    case "H3":
    case "H4":
    case "H5":
    case "H6":
    case "FIGCAPTION":
    case "BLOCKQUOTE":
    case "PRE":
    case "LI":
    case "TD":
    case "DT":
    case "DD":
    case "VIDEO":
    case "CANVAS":
      ze = !1;
      break;
    default:
      ze = !0;
  }
  return ze;
}
function cloneNode(Gr, ze = !1) {
  return Gr.cloneNode(ze);
}
function findElement(Gr, ze, Wr) {
  const Yr = Gr.getAttribute("data-ref");
  return findRef(Yr, ze, Wr);
}
function findRef(Gr, ze, Wr) {
  return !Wr && ze.indexOfRefs && ze.indexOfRefs[Gr] ? ze.indexOfRefs[Gr] : ze.querySelector(`[data-ref='${Gr}']`);
}
function validNode(Gr) {
  return !!(isText(Gr) || isElement(Gr) && Gr.dataset.ref);
}
function prevValidNode(Gr) {
  for (; !validNode(Gr) && (Gr.previousSibling ? Gr = Gr.previousSibling : Gr = Gr.parentNode, !!Gr); )
    ;
  return Gr;
}
function indexOf(Gr) {
  let ze = Gr.parentNode;
  return ze ? Array.prototype.indexOf.call(ze.childNodes, Gr) : 0;
}
function child(Gr, ze) {
  return Gr.childNodes[ze];
}
function hasContent(Gr) {
  return isElement(Gr) ? !0 : !!(isText(Gr) && Gr.textContent.trim().length);
}
function indexOfTextNode(Gr, ze) {
  if (!isText(Gr))
    return -1;
  let Wr = Gr.textContent, Yr, Qr = -1;
  for (var Kr = 0; Kr < ze.childNodes.length; Kr++)
    if (Yr = ze.childNodes[Kr], Yr.nodeType === 3 && ze.childNodes[Kr].textContent.includes(Wr)) {
      Qr = Kr;
      break;
    }
  return Qr;
}
function isIgnorable(Gr) {
  return Gr.nodeType === 8 || // A comment node
  Gr.nodeType === 3 && isAllWhitespace(Gr);
}
function isAllWhitespace(Gr) {
  return !/[^\t\n\r ]/.test(Gr.textContent);
}
function previousSignificantNode(Gr) {
  for (; Gr = Gr.previousSibling; )
    if (!isIgnorable(Gr)) return Gr;
  return null;
}
function getNodeWithNamedPage(Gr, ze) {
  if (Gr && Gr.dataset && Gr.dataset.page)
    return Gr;
  if (Gr.parentNode)
    for (; Gr = Gr.parentNode; ) {
      if (ze && Gr === ze)
        return;
      if (Gr.dataset && Gr.dataset.page)
        return Gr;
    }
  return null;
}
function breakInsideAvoidParentNode(Gr) {
  for (; Gr = Gr.parentNode; )
    if (Gr && Gr.dataset && Gr.dataset.breakInside === "avoid")
      return Gr;
  return null;
}
function parentOf(Gr, ze, Wr) {
  if (!(Wr && Gr === Wr) && Gr.parentNode)
    for (; Gr = Gr.parentNode; ) {
      if (Wr && Gr === Wr)
        return;
      if (Gr.nodeName === ze)
        return Gr;
    }
}
function nextSignificantNode(Gr) {
  for (; Gr = Gr.nextSibling; )
    if (!isIgnorable(Gr)) return Gr;
  return null;
}
function filterTree(Gr, ze, Wr) {
  const Yr = document.createTreeWalker(
    Gr || this.dom,
    Wr || NodeFilter.SHOW_ALL,
    ze ? { acceptNode: ze } : null,
    !1
  );
  let Qr, Kr;
  for (Qr = Yr.nextNode(); Qr; )
    Kr = Qr, Qr = Yr.nextNode(), Kr.parentNode.removeChild(Kr);
}
class BreakToken {
  constructor(ze, Wr) {
    this.node = ze, this.offset = Wr;
  }
  equals(ze) {
    return !(!ze || this.node && ze.node && this.node !== ze.node || this.offset && ze.offset && this.offset !== ze.offset);
  }
  toJSON(ze) {
    let Wr, Yr = 0;
    return this.node ? (isElement(this.node) && this.node.dataset.ref ? Wr = this.node.dataset.ref : ze && (Wr = this.node.parentElement.dataset.ref), this.node.parentElement && (Yr = Array.from(this.node.parentElement.childNodes).indexOf(this.node)), JSON.stringify({
      node: Wr,
      index: Yr,
      offset: this.offset
    })) : {};
  }
}
class RenderResult {
  constructor(ze, Wr) {
    this.breakToken = ze, this.error = Wr;
  }
}
class OverflowContentError extends Error {
  constructor(ze, Wr) {
    super(ze), this.items = Wr;
  }
}
function getDefaultExportFromCjs(Gr) {
  return Gr && Gr.__esModule && Object.prototype.hasOwnProperty.call(Gr, "default") ? Gr.default : Gr;
}
var eventEmitter = { exports: {} }, d = { exports: {} }, is$4, hasRequiredIs$4;
function requireIs$4() {
  if (hasRequiredIs$4) return is$4;
  hasRequiredIs$4 = 1;
  var Gr = void 0;
  return is$4 = function(ze) {
    return ze !== Gr && ze !== null;
  }, is$4;
}
var is$3, hasRequiredIs$3;
function requireIs$3() {
  if (hasRequiredIs$3) return is$3;
  hasRequiredIs$3 = 1;
  var Gr = requireIs$4(), ze = {
    object: !0,
    function: !0,
    undefined: !0
    /* document.all */
  };
  return is$3 = function(Wr) {
    return Gr(Wr) ? hasOwnProperty.call(ze, typeof Wr) : !1;
  }, is$3;
}
var is$2, hasRequiredIs$2;
function requireIs$2() {
  if (hasRequiredIs$2) return is$2;
  hasRequiredIs$2 = 1;
  var Gr = requireIs$3();
  return is$2 = function(ze) {
    if (!Gr(ze)) return !1;
    try {
      return ze.constructor ? ze.constructor.prototype === ze : !1;
    } catch {
      return !1;
    }
  }, is$2;
}
var is$1, hasRequiredIs$1;
function requireIs$1() {
  if (hasRequiredIs$1) return is$1;
  hasRequiredIs$1 = 1;
  var Gr = requireIs$2();
  return is$1 = function(ze) {
    if (typeof ze != "function" || !hasOwnProperty.call(ze, "length")) return !1;
    try {
      if (typeof ze.length != "number" || typeof ze.call != "function" || typeof ze.apply != "function") return !1;
    } catch {
      return !1;
    }
    return !Gr(ze);
  }, is$1;
}
var is, hasRequiredIs;
function requireIs() {
  if (hasRequiredIs) return is;
  hasRequiredIs = 1;
  var Gr = requireIs$1(), ze = /^\s*class[\s{/}]/, Wr = Function.prototype.toString;
  return is = function(Yr) {
    return !(!Gr(Yr) || ze.test(Wr.call(Yr)));
  }, is;
}
var isImplemented$7, hasRequiredIsImplemented$7;
function requireIsImplemented$7() {
  return hasRequiredIsImplemented$7 || (hasRequiredIsImplemented$7 = 1, isImplemented$7 = function() {
    var Gr = Object.assign, ze;
    return typeof Gr != "function" ? !1 : (ze = { foo: "raz" }, Gr(ze, { bar: "dwa" }, { trzy: "trzy" }), ze.foo + ze.bar + ze.trzy === "razdwatrzy");
  }), isImplemented$7;
}
var isImplemented$6, hasRequiredIsImplemented$6;
function requireIsImplemented$6() {
  return hasRequiredIsImplemented$6 || (hasRequiredIsImplemented$6 = 1, isImplemented$6 = function() {
    try {
      return Object.keys("primitive"), !0;
    } catch {
      return !1;
    }
  }), isImplemented$6;
}
var noop, hasRequiredNoop;
function requireNoop() {
  return hasRequiredNoop || (hasRequiredNoop = 1, noop = function() {
  }), noop;
}
var isValue, hasRequiredIsValue;
function requireIsValue() {
  if (hasRequiredIsValue) return isValue;
  hasRequiredIsValue = 1;
  var Gr = requireNoop()();
  return isValue = function(ze) {
    return ze !== Gr && ze !== null;
  }, isValue;
}
var shim$5, hasRequiredShim$5;
function requireShim$5() {
  if (hasRequiredShim$5) return shim$5;
  hasRequiredShim$5 = 1;
  var Gr = requireIsValue(), ze = Object.keys;
  return shim$5 = function(Wr) {
    return ze(Gr(Wr) ? Object(Wr) : Wr);
  }, shim$5;
}
var keys, hasRequiredKeys;
function requireKeys() {
  return hasRequiredKeys || (hasRequiredKeys = 1, keys = requireIsImplemented$6()() ? Object.keys : requireShim$5()), keys;
}
var validValue, hasRequiredValidValue;
function requireValidValue() {
  if (hasRequiredValidValue) return validValue;
  hasRequiredValidValue = 1;
  var Gr = requireIsValue();
  return validValue = function(ze) {
    if (!Gr(ze)) throw new TypeError("Cannot use null or undefined");
    return ze;
  }, validValue;
}
var shim$4, hasRequiredShim$4;
function requireShim$4() {
  if (hasRequiredShim$4) return shim$4;
  hasRequiredShim$4 = 1;
  var Gr = requireKeys(), ze = requireValidValue(), Wr = Math.max;
  return shim$4 = function(Yr, Qr) {
    var Kr, Zr, en = Wr(arguments.length, 2), tn;
    for (Yr = Object(ze(Yr)), tn = function(rn) {
      try {
        Yr[rn] = Qr[rn];
      } catch (sn) {
        Kr || (Kr = sn);
      }
    }, Zr = 1; Zr < en; ++Zr)
      Qr = arguments[Zr], Gr(Qr).forEach(tn);
    if (Kr !== void 0) throw Kr;
    return Yr;
  }, shim$4;
}
var assign, hasRequiredAssign;
function requireAssign() {
  return hasRequiredAssign || (hasRequiredAssign = 1, assign = requireIsImplemented$7()() ? Object.assign : requireShim$4()), assign;
}
var normalizeOptions, hasRequiredNormalizeOptions;
function requireNormalizeOptions() {
  if (hasRequiredNormalizeOptions) return normalizeOptions;
  hasRequiredNormalizeOptions = 1;
  var Gr = requireIsValue(), ze = Array.prototype.forEach, Wr = Object.create, Yr = function(Qr, Kr) {
    var Zr;
    for (Zr in Qr) Kr[Zr] = Qr[Zr];
  };
  return normalizeOptions = function(Qr) {
    var Kr = Wr(null);
    return ze.call(arguments, function(Zr) {
      Gr(Zr) && Yr(Object(Zr), Kr);
    }), Kr;
  }, normalizeOptions;
}
var isImplemented$5, hasRequiredIsImplemented$5;
function requireIsImplemented$5() {
  if (hasRequiredIsImplemented$5) return isImplemented$5;
  hasRequiredIsImplemented$5 = 1;
  var Gr = "razdwatrzy";
  return isImplemented$5 = function() {
    return typeof Gr.contains != "function" ? !1 : Gr.contains("dwa") === !0 && Gr.contains("foo") === !1;
  }, isImplemented$5;
}
var shim$3, hasRequiredShim$3;
function requireShim$3() {
  if (hasRequiredShim$3) return shim$3;
  hasRequiredShim$3 = 1;
  var Gr = String.prototype.indexOf;
  return shim$3 = function(ze) {
    return Gr.call(this, ze, arguments[1]) > -1;
  }, shim$3;
}
var contains, hasRequiredContains;
function requireContains() {
  return hasRequiredContains || (hasRequiredContains = 1, contains = requireIsImplemented$5()() ? String.prototype.contains : requireShim$3()), contains;
}
var hasRequiredD;
function requireD() {
  if (hasRequiredD) return d.exports;
  hasRequiredD = 1;
  var Gr = requireIs$4(), ze = requireIs(), Wr = requireAssign(), Yr = requireNormalizeOptions(), Qr = requireContains(), Kr = d.exports = function(Zr, en) {
    var tn, rn, sn, on, an;
    return arguments.length < 2 || typeof Zr != "string" ? (on = en, en = Zr, Zr = null) : on = arguments[2], Gr(Zr) ? (tn = Qr.call(Zr, "c"), rn = Qr.call(Zr, "e"), sn = Qr.call(Zr, "w")) : (tn = sn = !0, rn = !1), an = { value: en, configurable: tn, enumerable: rn, writable: sn }, on ? Wr(Yr(on), an) : an;
  };
  return Kr.gs = function(Zr, en, tn) {
    var rn, sn, on, an;
    return typeof Zr != "string" ? (on = tn, tn = en, en = Zr, Zr = null) : on = arguments[3], Gr(en) ? ze(en) ? Gr(tn) ? ze(tn) || (on = tn, tn = void 0) : tn = void 0 : (on = en, en = tn = void 0) : en = void 0, Gr(Zr) ? (rn = Qr.call(Zr, "c"), sn = Qr.call(Zr, "e")) : (rn = !0, sn = !1), an = { get: en, set: tn, configurable: rn, enumerable: sn }, on ? Wr(Yr(on), an) : an;
  }, d.exports;
}
var validCallable, hasRequiredValidCallable;
function requireValidCallable() {
  return hasRequiredValidCallable || (hasRequiredValidCallable = 1, validCallable = function(Gr) {
    if (typeof Gr != "function") throw new TypeError(Gr + " is not a function");
    return Gr;
  }), validCallable;
}
var hasRequiredEventEmitter;
function requireEventEmitter() {
  return hasRequiredEventEmitter || (hasRequiredEventEmitter = 1, function(Gr, ze) {
    var Wr = requireD(), Yr = requireValidCallable(), Qr = Function.prototype.apply, Kr = Function.prototype.call, Zr = Object.create, en = Object.defineProperty, tn = Object.defineProperties, rn = Object.prototype.hasOwnProperty, sn = { configurable: !0, enumerable: !1, writable: !0 }, on, an, dn, pn, mn, vn, xn;
    on = function(gn, un) {
      var fn;
      return Yr(un), rn.call(this, "__ee__") ? fn = this.__ee__ : (fn = sn.value = Zr(null), en(this, "__ee__", sn), sn.value = null), fn[gn] ? typeof fn[gn] == "object" ? fn[gn].push(un) : fn[gn] = [fn[gn], un] : fn[gn] = un, this;
    }, an = function(gn, un) {
      var fn, cn;
      return Yr(un), cn = this, on.call(this, gn, fn = function() {
        dn.call(cn, gn, fn), Qr.call(un, this, arguments);
      }), fn.__eeOnceListener__ = un, this;
    }, dn = function(gn, un) {
      var fn, cn, Cn, bn;
      if (Yr(un), !rn.call(this, "__ee__")) return this;
      if (fn = this.__ee__, !fn[gn]) return this;
      if (cn = fn[gn], typeof cn == "object")
        for (bn = 0; Cn = cn[bn]; ++bn)
          (Cn === un || Cn.__eeOnceListener__ === un) && (cn.length === 2 ? fn[gn] = cn[bn ? 0 : 1] : cn.splice(bn, 1));
      else
        (cn === un || cn.__eeOnceListener__ === un) && delete fn[gn];
      return this;
    }, pn = function(gn) {
      var un, fn, cn, Cn, bn;
      if (rn.call(this, "__ee__") && (Cn = this.__ee__[gn], !!Cn))
        if (typeof Cn == "object") {
          for (fn = arguments.length, bn = new Array(fn - 1), un = 1; un < fn; ++un) bn[un - 1] = arguments[un];
          for (Cn = Cn.slice(), un = 0; cn = Cn[un]; ++un)
            Qr.call(cn, this, bn);
        } else
          switch (arguments.length) {
            case 1:
              Kr.call(Cn, this);
              break;
            case 2:
              Kr.call(Cn, this, arguments[1]);
              break;
            case 3:
              Kr.call(Cn, this, arguments[1], arguments[2]);
              break;
            default:
              for (fn = arguments.length, bn = new Array(fn - 1), un = 1; un < fn; ++un)
                bn[un - 1] = arguments[un];
              Qr.call(Cn, this, bn);
          }
    }, mn = {
      on,
      once: an,
      off: dn,
      emit: pn
    }, vn = {
      on: Wr(on),
      once: Wr(an),
      off: Wr(dn),
      emit: Wr(pn)
    }, xn = tn({}, vn), Gr.exports = ze = function(gn) {
      return gn == null ? Zr(xn) : tn(Object(gn), vn);
    }, ze.methods = mn;
  }(eventEmitter, eventEmitter.exports)), eventEmitter.exports;
}
var eventEmitterExports = requireEventEmitter();
const EventEmitter = /* @__PURE__ */ getDefaultExportFromCjs(eventEmitterExports);
class Hook {
  constructor(ze) {
    this.context = ze || this, this.hooks = [];
  }
  /**
   * Adds a function to be run before a hook completes
   * @example this.content.register(function(){...});
   * @return {undefined} void
   */
  register() {
    for (var ze = 0; ze < arguments.length; ++ze)
      if (typeof arguments[ze] == "function")
        this.hooks.push(arguments[ze]);
      else
        for (var Wr = 0; Wr < arguments[ze].length; ++Wr)
          this.hooks.push(arguments[ze][Wr]);
  }
  /**
   * Triggers a hook to run all functions
   * @example this.content.trigger(args).then(function(){...});
   * @return {Promise} results
   */
  trigger() {
    var ze = arguments, Wr = this.context, Yr = [];
    return this.hooks.forEach(function(Qr) {
      var Kr = Qr.apply(Wr, ze);
      Kr && typeof Kr.then == "function" ? Yr.push(Kr) : Yr.push(new Promise((Zr, en) => {
        Zr(Kr);
      }));
    }), Promise.all(Yr);
  }
  /**
    * Triggers a hook to run all functions synchronously
    * @example this.content.trigger(args).then(function(){...});
    * @return {Array} results
    */
  triggerSync() {
    var ze = arguments, Wr = this.context, Yr = [];
    return this.hooks.forEach(function(Qr) {
      var Kr = Qr.apply(Wr, ze);
      Yr.push(Kr);
    }), Yr;
  }
  // Adds a function to be run before a hook completes
  list() {
    return this.hooks;
  }
  clear() {
    return this.hooks = [];
  }
}
const MAX_CHARS_PER_BREAK = 1500;
class Layout {
  constructor(ze, Wr, Yr) {
    this.element = ze, this.bounds = this.element.getBoundingClientRect(), this.parentBounds = this.element.offsetParent.getBoundingClientRect();
    let Qr = parseFloat(window.getComputedStyle(this.element).columnGap);
    if (Qr) {
      let Kr = this.bounds.left - this.parentBounds.left;
      this.gap = Qr - Kr;
    } else
      this.gap = 0;
    Wr ? this.hooks = Wr : (this.hooks = {}, this.hooks.onPageLayout = new Hook(), this.hooks.layout = new Hook(), this.hooks.renderNode = new Hook(), this.hooks.layoutNode = new Hook(), this.hooks.beforeOverflow = new Hook(), this.hooks.onOverflow = new Hook(), this.hooks.afterOverflowRemoved = new Hook(), this.hooks.onBreakToken = new Hook(), this.hooks.beforeRenderResult = new Hook()), this.settings = Yr || {}, this.maxChars = this.settings.maxChars || MAX_CHARS_PER_BREAK, this.forceRenderBreak = !1;
  }
  async renderTo(ze, Wr, Yr, Qr = this.bounds) {
    let Kr = this.getStart(Wr, Yr), Zr = walk$1(Kr, Wr), en, tn, rn, sn, on = !1, an, dn = 0, pn = Yr || new BreakToken(Kr);
    for (this.hooks && this.hooks.onPageLayout.trigger(ze, pn, this); !rn && !an; ) {
      if (sn = Zr.next(), tn = en, en = sn.value, rn = sn.done, !en) {
        this.hooks && this.hooks.layout.trigger(ze, this);
        let xn = ze.querySelectorAll("img");
        return xn.length && await this.waitForImages(xn), an = this.findBreakToken(ze, Wr, Qr, pn), an && an.equals(pn) ? (console.warn("Unable to layout item: ", tn), this.hooks && this.hooks.beforeRenderResult.trigger(void 0, ze, this), new RenderResult(void 0, new OverflowContentError("Unable to layout item", [tn]))) : (this.rebuildTableFromBreakToken(an, ze), this.hooks && this.hooks.beforeRenderResult.trigger(an, ze, this), new RenderResult(an));
      }
      if (this.hooks && this.hooks.layoutNode.trigger(en), on && this.shouldBreak(en, Kr)) {
        this.hooks && this.hooks.layout.trigger(ze, this);
        let xn = ze.querySelectorAll("img");
        if (xn.length && await this.waitForImages(xn), an = this.findBreakToken(ze, Wr, Qr, pn), an ? this.rebuildTableFromBreakToken(an, ze) : an = this.breakAt(en), an && an.equals(pn)) {
          console.warn("Unable to layout item: ", en);
          let gn = an.node && nodeAfter(an.node);
          if (gn)
            an = new BreakToken(gn);
          else
            return new RenderResult(void 0, new OverflowContentError("Unable to layout item", [en]));
        }
        dn = 0;
        break;
      }
      if (en.dataset && en.dataset.page) {
        let xn = en.dataset.page, gn = this.element.closest(".pagedjs_page");
        gn.classList.add("pagedjs_named_page"), gn.classList.add("pagedjs_" + xn + "_page"), en.dataset.splitFrom || gn.classList.add("pagedjs_" + xn + "_first_page");
      }
      let mn = isContainer(en), vn = this.append(en, ze, Yr, mn);
      if (dn += vn.textContent.length, on || (on = hasContent(en)), mn || (Zr = walk$1(nodeAfter(en, Wr), Wr)), this.forceRenderBreak) {
        this.hooks && this.hooks.layout.trigger(ze, this), an = this.findBreakToken(ze, Wr, Qr, pn), an ? this.rebuildTableFromBreakToken(an, ze) : an = this.breakAt(en), dn = 0, this.forceRenderBreak = !1;
        break;
      }
      if (dn >= this.maxChars) {
        this.hooks && this.hooks.layout.trigger(ze, this);
        let xn = ze.querySelectorAll("img");
        if (xn.length && await this.waitForImages(xn), an = this.findBreakToken(ze, Wr, Qr, pn), an && (dn = 0, this.rebuildTableFromBreakToken(an, ze)), an && an.equals(pn)) {
          console.warn("Unable to layout item: ", en);
          let gn = an.node && nodeAfter(an.node);
          if (gn)
            an = new BreakToken(gn);
          else
            return this.hooks && this.hooks.beforeRenderResult.trigger(void 0, ze, this), new RenderResult(void 0, new OverflowContentError("Unable to layout item", [en]));
        }
      }
    }
    return this.hooks && this.hooks.beforeRenderResult.trigger(an, ze, this), new RenderResult(an);
  }
  breakAt(ze, Wr = 0) {
    let Yr = new BreakToken(
      ze,
      Wr
    );
    return this.hooks.onBreakToken.triggerSync(Yr, void 0, ze, this).forEach((Kr) => {
      typeof Kr < "u" && (Yr = Kr);
    }), Yr;
  }
  shouldBreak(ze, Wr) {
    let Yr = nodeBefore(ze, Wr), Qr = ze.parentNode, Kr = needsBreakBefore(ze) && Qr && !Yr && needsBreakBefore(Qr), Zr;
    return Kr && (Zr = ze.dataset.breakBefore === Qr.dataset.breakBefore), !Zr && needsBreakBefore(ze) || needsPreviousBreakAfter(ze) || needsPageBreak(ze, Yr);
  }
  forceBreak() {
    this.forceRenderBreak = !0;
  }
  getStart(ze, Wr) {
    let Yr, Qr = Wr && Wr.node;
    return Qr ? Yr = Qr : Yr = ze.firstChild, Yr;
  }
  append(ze, Wr, Yr, Qr = !0, Kr = !0) {
    let Zr = cloneNode(ze, !Qr);
    if (ze.parentNode && isElement(ze.parentNode)) {
      let tn = findElement(ze.parentNode, Wr);
      if (tn)
        tn.appendChild(Zr);
      else if (Kr) {
        let rn = rebuildAncestors(ze);
        tn = findElement(ze.parentNode, rn), tn ? (Yr && isText(Yr.node) && Yr.offset > 0 && (Zr.textContent = Zr.textContent.substring(Yr.offset)), tn.appendChild(Zr)) : Wr.appendChild(Zr), Wr.appendChild(rn);
      } else
        Wr.appendChild(Zr);
    } else
      Wr.appendChild(Zr);
    return Zr.dataset && Zr.dataset.ref && (Wr.indexOfRefs || (Wr.indexOfRefs = {}), Wr.indexOfRefs[Zr.dataset.ref] = Zr), this.hooks.renderNode.triggerSync(Zr, ze, this).forEach((tn) => {
      typeof tn < "u" && (Zr = tn);
    }), Zr;
  }
  rebuildTableFromBreakToken(ze, Wr) {
    if (!ze || !ze.node)
      return;
    let Yr = ze.node, Qr = isElement(Yr) ? Yr.closest("td") : Yr.parentElement.closest("td");
    if (Qr) {
      if (!findElement(Qr, Wr, !0))
        return;
      for (; Qr = Qr.nextElementSibling; )
        this.append(Qr, Wr, null, !0);
    }
  }
  async waitForImages(ze) {
    let Wr = Array.from(ze).map(async (Yr) => this.awaitImageLoaded(Yr));
    await Promise.all(Wr);
  }
  async awaitImageLoaded(ze) {
    return new Promise((Wr) => {
      if (ze.complete !== !0)
        ze.onload = function() {
          let { width: Yr, height: Qr } = window.getComputedStyle(ze);
          Wr(Yr, Qr);
        }, ze.onerror = function(Yr) {
          let { width: Qr, height: Kr } = window.getComputedStyle(ze);
          Wr(Qr, Kr, Yr);
        };
      else {
        let { width: Yr, height: Qr } = window.getComputedStyle(ze);
        Wr(Yr, Qr);
      }
    });
  }
  avoidBreakInside(ze, Wr) {
    let Yr;
    if (ze !== Wr) {
      for (; ze.parentNode && (ze = ze.parentNode, ze !== Wr); )
        if (window.getComputedStyle(ze)["break-inside"] === "avoid") {
          Yr = ze;
          break;
        }
      return Yr;
    }
  }
  createBreakToken(ze, Wr, Yr) {
    let Qr = ze.startContainer, Kr = ze.startOffset, Zr, en, tn, rn, sn;
    if (isElement(Qr))
      if (sn = child(Qr, Kr), isElement(sn))
        if (en = findElement(sn, Wr), en)
          Zr = findElement(en, Yr), Kr = 0;
        else {
          let on = prevValidNode(sn);
          if (isElement(on) || (on = on.parentElement), en = findElement(on, Wr), !sn.nextSibling) {
            const an = findElement(en, Yr), pn = document.createTreeWalker(an, NodeFilter.SHOW_ELEMENT).lastChild();
            if (!findElement(pn, Wr))
              return;
          }
          Zr = findElement(en, Yr).nextSibling, Kr = 0;
        }
      else
        en = findElement(Qr, Wr), en || (en = findElement(prevValidNode(Qr), Wr)), tn = findElement(en, Yr), rn = indexOfTextNode(sn, tn), rn === 0 ? (Zr = tn, Kr = 0) : (Zr = child(tn, rn), Kr = 0);
    else {
      if (en = findElement(Qr.parentNode, Wr), en || (en = findElement(prevValidNode(Qr.parentNode), Wr)), tn = findElement(en, Yr), rn = indexOfTextNode(Qr, tn), rn === -1)
        return;
      Zr = child(tn, rn), Kr += Zr.textContent.indexOf(Qr.textContent);
    }
    if (Zr)
      return new BreakToken(
        Zr,
        Kr
      );
  }
  findBreakToken(ze, Wr, Yr = this.bounds, Qr, Kr = !0) {
    let Zr = this.findOverflow(ze, Yr), en, tn;
    if (this.hooks.onOverflow.triggerSync(Zr, ze, Yr, this).forEach((sn) => {
      typeof sn < "u" && (Zr = sn);
    }), Zr) {
      if (en = this.createBreakToken(Zr, ze, Wr), this.hooks.onBreakToken.triggerSync(en, Zr, ze, this).forEach((on) => {
        typeof on < "u" && (en = on);
      }), en && en.equals(Qr))
        return en;
      if (en && en.node && en.offset && en.node.textContent ? tn = en.node.textContent.charAt(en.offset) : tn = void 0, en && en.node && Kr) {
        let on = this.removeOverflow(Zr, tn);
        this.hooks && this.hooks.afterOverflowRemoved.trigger(on, ze, this);
      }
    }
    return en;
  }
  hasOverflow(ze, Wr = this.bounds) {
    let Yr = ze && ze.parentNode, { width: Qr, height: Kr } = ze.getBoundingClientRect(), Zr = Yr ? Yr.scrollWidth : 0, en = Yr ? Yr.scrollHeight : 0;
    return Math.max(Math.floor(Qr), Zr) > Math.round(Wr.width) || Math.max(Math.floor(Kr), en) > Math.round(Wr.height);
  }
  findOverflow(ze, Wr = this.bounds, Yr = this.gap) {
    if (!this.hasOverflow(ze, Wr)) return;
    let Qr = Math.floor(Wr.left), Kr = Math.round(Wr.right + Yr), Zr = Math.round(Wr.top), en = Math.round(Wr.bottom), tn, rn = walk$1(ze.firstChild, ze), sn, on, an, dn, pn, mn, vn, xn;
    for (; !on; )
      if (sn = rn.next(), on = sn.done, an = sn.value, pn = !1, mn = !1, vn = void 0, xn = void 0, an) {
        let un = getBoundingClientRect(an), fn = Math.round(un.left), cn = Math.floor(un.right), Cn = Math.round(un.top), bn = Math.floor(un.bottom);
        if (!tn && (fn >= Kr || Cn >= en)) {
          let Sn = !1;
          const _n = parentOf(an, "TD", ze);
          if (_n && window.getComputedStyle(_n)["break-inside"] === "avoid")
            vn = _n.parentElement;
          else if (isElement(an)) {
            let Ln = window.getComputedStyle(an);
            Sn = Ln.getPropertyValue("float") !== "none", pn = Ln.getPropertyValue("break-inside") === "avoid", mn = an.dataset.breakBefore === "avoid" || an.dataset.previousBreakAfter === "avoid", vn = mn && nodeBefore(an, ze), xn = an.tagName === "BR" || an.tagName === "WBR";
          }
          let Tn;
          if (an.nodeName === "TR" ? Tn = an : Tn = parentOf(an, "TR", ze), Tn) {
            let Ln = Tn.parentElement;
            ["TBODY", "THEAD"].includes(Ln.nodeName) && window.getComputedStyle(Ln).getPropertyValue("break-inside") === "avoid" && (vn = Ln);
            const Pn = parentOf(Tn, "TABLE", ze), In = Pn.querySelector("[colspan]");
            if (Pn && In) {
              let Mn = 0;
              for (const Nn of Array.from(Pn.rows[0].cells))
                Mn += parseInt(Nn.getAttribute("colspan") || "1");
              if (Tn.cells.length !== Mn) {
                let Nn = Tn.previousElementSibling, Gn;
                for (; Nn !== null; ) {
                  Gn = 0;
                  for (const Un of Array.from(Nn.cells))
                    Gn += parseInt(Un.getAttribute("colspan") || "1");
                  if (Gn === Mn)
                    break;
                  Nn = Nn.previousElementSibling;
                }
                Gn === Mn && (vn = Nn);
              }
            }
          }
          if (vn) {
            tn = document.createRange(), tn.selectNode(vn);
            break;
          }
          if (!xn && !Sn && isElement(an)) {
            tn = document.createRange(), tn.selectNode(an);
            break;
          }
          if (isText(an) && an.textContent.trim().length) {
            tn = document.createRange(), tn.selectNode(an);
            break;
          }
        }
        if (!tn && isText(an) && an.textContent.trim().length && !breakInsideAvoidParentNode(an.parentNode)) {
          let Sn = getClientRects(an), _n;
          fn = 0, Cn = 0;
          for (var gn = 0; gn != Sn.length; gn++)
            _n = Sn[gn], _n.width > 0 && (!fn || _n.left > fn) && (fn = _n.left), _n.height > 0 && (!Cn || _n.top > Cn) && (Cn = _n.top);
          if (fn >= Kr || Cn >= en) {
            tn = document.createRange(), dn = this.textBreak(an, Qr, Kr, Zr, en), dn ? tn.setStart(an, dn) : tn = void 0;
            break;
          }
        }
        (pn || cn <= Kr && bn <= en) && (sn = nodeAfter(an, ze), sn && (rn = walk$1(sn, ze)));
      }
    if (tn)
      return tn.setEndAfter(ze.lastChild), tn;
  }
  findEndToken(ze, Wr) {
    if (ze.childNodes.length === 0)
      return;
    let Yr = ze.lastChild, Qr;
    for (; Yr && Yr.lastChild; )
      if (!validNode(Yr))
        Yr = Yr.previousSibling;
      else if (validNode(Yr.lastChild))
        Yr = Yr.lastChild;
      else {
        Yr = prevValidNode(Yr.lastChild);
        break;
      }
    isText(Yr) && (Yr.parentNode.dataset.ref ? (Qr = indexOf(Yr), Yr = Yr.parentNode) : Yr = Yr.previousSibling);
    let Kr = findElement(Yr, Wr);
    Qr && (Kr = Kr.childNodes[Qr]);
    let Zr = nodeAfter(Kr);
    return this.breakAt(Zr);
  }
  textBreak(ze, Wr, Yr, Qr, Kr) {
    let Zr = words(ze), en = 0, tn = 0, rn = 0, sn = 0, on, an, dn, pn, mn;
    for (; !dn && (an = Zr.next(), on = an.value, dn = an.done, !!on); ) {
      if (pn = getBoundingClientRect(on), en = Math.floor(pn.left), tn = Math.floor(pn.right), rn = Math.floor(pn.top), sn = Math.floor(pn.bottom), en >= Yr || rn >= Kr) {
        mn = on.startOffset;
        break;
      }
      if (tn > Yr || sn > Kr) {
        let vn = letters(on), xn, gn, un;
        for (; !un && (gn = vn.next(), xn = gn.value, un = gn.done, !!xn); )
          if (pn = getBoundingClientRect(xn), en = Math.floor(pn.left), rn = Math.floor(pn.top), en >= Yr || rn >= Kr) {
            mn = xn.startOffset, dn = !0;
            break;
          }
      }
    }
    return mn;
  }
  removeOverflow(ze, Wr) {
    let { startContainer: Yr } = ze, Qr = ze.extractContents();
    return this.hyphenateAtBreak(Yr, Wr), Qr;
  }
  hyphenateAtBreak(ze, Wr) {
    if (isText(ze)) {
      let Yr = ze.textContent, Qr = Yr[Yr.length - 1];
      (Wr && /^\w|\u00AD$/.test(Qr) && /^\w|\u00AD$/.test(Wr) || !Wr && /^\w|\u00AD$/.test(Qr)) && (ze.parentNode.classList.add("pagedjs_hyphen"), ze.textContent += this.settings.hyphenGlyph || "‑");
    }
  }
  equalTokens(ze, Wr) {
    return !(!ze || !Wr || ze.node && Wr.node && ze.node !== Wr.node || ze.offset && Wr.offset && ze.offset !== Wr.offset);
  }
}
EventEmitter(Layout.prototype);
class Page {
  constructor(ze, Wr, Yr, Qr, Kr) {
    this.pagesArea = ze, this.pageTemplate = Wr, this.blank = Yr, this.width = void 0, this.height = void 0, this.hooks = Qr, this.settings = Kr || {};
  }
  create(ze, Wr) {
    let Yr = document.importNode(this.pageTemplate.content, !0), Qr, Kr;
    Wr ? (this.pagesArea.insertBefore(Yr, Wr.nextElementSibling), Kr = Array.prototype.indexOf.call(this.pagesArea.children, Wr.nextElementSibling), Qr = this.pagesArea.children[Kr]) : (this.pagesArea.appendChild(Yr), Qr = this.pagesArea.lastChild);
    let Zr = Qr.querySelector(".pagedjs_pagebox"), en = Qr.querySelector(".pagedjs_page_content"), tn = Qr.querySelector(".pagedjs_footnote_area"), rn = en.getBoundingClientRect();
    return en.style.columnWidth = Math.round(rn.width) + "px", en.style.columnGap = "calc(var(--pagedjs-margin-right) + var(--pagedjs-margin-left) + var(--pagedjs-bleed-right) + var(--pagedjs-bleed-left) + var(--pagedjs-column-gap-offset))", this.width = Math.round(rn.width), this.height = Math.round(rn.height), this.element = Qr, this.pagebox = Zr, this.area = en, this.footnotesArea = tn, Qr;
  }
  createWrapper() {
    let ze = document.createElement("div");
    return this.area.appendChild(ze), this.wrapper = ze, ze;
  }
  index(ze) {
    this.position = ze;
    let Wr = this.element, Yr = ze + 1, Qr = `page-${Yr}`;
    this.id = Qr, Wr.dataset.pageNumber = Yr, Wr.setAttribute("id", Qr), this.name && Wr.classList.add("pagedjs_" + this.name + "_page"), this.blank && Wr.classList.add("pagedjs_blank_page"), ze === 0 && Wr.classList.add("pagedjs_first_page"), ze % 2 !== 1 ? (Wr.classList.remove("pagedjs_left_page"), Wr.classList.add("pagedjs_right_page")) : (Wr.classList.remove("pagedjs_right_page"), Wr.classList.add("pagedjs_left_page"));
  }
  /*
  	size(width, height) {
  		if (width === this.width && height === this.height) {
  			return;
  		}
  		this.width = width;
  		this.height = height;
  
  		this.element.style.width = Math.round(width) + "px";
  		this.element.style.height = Math.round(height) + "px";
  		this.element.style.columnWidth = Math.round(width) + "px";
  	}
  	*/
  async layout(ze, Wr, Yr) {
    this.clear(), this.startToken = Wr;
    let Qr = this.settings;
    !Qr.maxChars && Yr && (Qr.maxChars = Yr), this.layoutMethod = new Layout(this.area, this.hooks, Qr);
    let Zr = (await this.layoutMethod.renderTo(this.wrapper, ze, Wr)).breakToken;
    return this.addListeners(ze), this.endToken = Zr, Zr;
  }
  async append(ze, Wr) {
    if (!this.layoutMethod)
      return this.layout(ze, Wr);
    let Qr = (await this.layoutMethod.renderTo(this.wrapper, ze, Wr)).breakToken;
    return this.endToken = Qr, Qr;
  }
  getByParent(ze, Wr) {
    let Yr;
    for (var Qr = 0; Qr < Wr.length; Qr++)
      if (Yr = Wr[Qr], Yr.dataset.ref === ze)
        return Yr;
  }
  onOverflow(ze) {
    this._onOverflow = ze;
  }
  onUnderflow(ze) {
    this._onUnderflow = ze;
  }
  clear() {
    this.removeListeners(), this.wrapper && this.wrapper.remove(), this.createWrapper();
  }
  addListeners(ze) {
    return typeof ResizeObserver < "u" ? this.addResizeObserver(ze) : (this._checkOverflowAfterResize = this.checkOverflowAfterResize.bind(this, ze), this.element.addEventListener("overflow", this._checkOverflowAfterResize, !1), this.element.addEventListener("underflow", this._checkOverflowAfterResize, !1)), this._onScroll = (function() {
      this.listening && (this.element.scrollLeft = 0);
    }).bind(this), this.element.addEventListener("scroll", this._onScroll), this.listening = !0, !0;
  }
  removeListeners() {
    this.listening = !1, typeof ResizeObserver < "u" && this.ro ? this.ro.disconnect() : this.element && (this.element.removeEventListener("overflow", this._checkOverflowAfterResize, !1), this.element.removeEventListener("underflow", this._checkOverflowAfterResize, !1)), this.element && this.element.removeEventListener("scroll", this._onScroll);
  }
  addResizeObserver(ze) {
    let Wr = this.wrapper, Yr = Wr.getBoundingClientRect().height;
    this.ro = new ResizeObserver((Qr) => {
      this.listening && requestAnimationFrame(() => {
        for (let Kr of Qr) {
          const Zr = Kr.contentRect;
          Zr.height > Yr ? (this.checkOverflowAfterResize(ze), Yr = Wr.getBoundingClientRect().height) : Zr.height < Yr && (this.checkUnderflowAfterResize(ze), Yr = Zr.height);
        }
      });
    }), this.ro.observe(Wr);
  }
  checkOverflowAfterResize(ze) {
    if (!this.listening || !this.layoutMethod)
      return;
    let Wr = this.layoutMethod.findBreakToken(this.wrapper, ze, this.startToken);
    Wr && (this.endToken = Wr, this._onOverflow && this._onOverflow(Wr));
  }
  checkUnderflowAfterResize(ze) {
    if (!this.listening || !this.layoutMethod)
      return;
    let Wr = this.layoutMethod.findEndToken(this.wrapper, ze);
    Wr && this._onUnderflow && this._onUnderflow(Wr);
  }
  destroy() {
    this.removeListeners(), this.element.remove(), this.element = void 0, this.wrapper = void 0;
  }
}
EventEmitter(Page.prototype);
class ContentParser {
  constructor(ze, Wr) {
    return ze && ze.nodeType ? this.dom = this.add(ze) : typeof ze == "string" && (this.dom = this.parse(ze)), this.dom;
  }
  parse(ze, Wr) {
    let Qr = document.createRange().createContextualFragment(ze);
    return this.addRefs(Qr), Qr;
  }
  add(ze) {
    return this.addRefs(ze), ze;
  }
  addRefs(ze) {
    var Wr = document.createTreeWalker(
      ze,
      NodeFilter.SHOW_ELEMENT,
      null,
      !1
    );
    let Yr = Wr.nextNode();
    for (; Yr; ) {
      if (!Yr.hasAttribute("data-ref")) {
        let Qr = UUID();
        Yr.setAttribute("data-ref", Qr);
      }
      Yr.id && Yr.setAttribute("data-id", Yr.id), Yr = Wr.nextNode();
    }
  }
  find(ze) {
    return this.refs[ze];
  }
  destroy() {
    this.refs = void 0, this.dom = void 0;
  }
}
class Queue {
  constructor(ze) {
    this._q = [], this.context = ze, this.tick = requestAnimationFrame, this.running = !1, this.paused = !1;
  }
  /**
   * Add an item to the queue
   * @return {Promise} enqueued
   */
  enqueue() {
    var ze, Wr, Yr, Qr = [].shift.call(arguments), Kr = arguments;
    if (!Qr)
      throw new Error("No Task Provided");
    return typeof Qr == "function" ? (ze = new defer(), Wr = ze.promise, Yr = {
      task: Qr,
      args: Kr,
      //"context"  : context,
      deferred: ze,
      promise: Wr
    }) : Yr = {
      promise: Qr
    }, this._q.push(Yr), this.paused == !1 && !this.running && this.run(), Yr.promise;
  }
  /**
   * Run one item
   * @return {Promise} dequeued
   */
  dequeue() {
    var ze, Wr, Yr;
    if (this._q.length && !this.paused) {
      if (ze = this._q.shift(), Wr = ze.task, Wr)
        return Yr = Wr.apply(this.context, ze.args), Yr && typeof Yr.then == "function" ? Yr.then((function() {
          ze.deferred.resolve.apply(this.context, arguments);
        }).bind(this), (function() {
          ze.deferred.reject.apply(this.context, arguments);
        }).bind(this)) : (ze.deferred.resolve.apply(this.context, Yr), ze.promise);
      if (ze.promise)
        return ze.promise;
    } else
      return ze = new defer(), ze.deferred.resolve(), ze.promise;
  }
  // Run All Immediately
  dump() {
    for (; this._q.length; )
      this.dequeue();
  }
  /**
   * Run all tasks sequentially, at convince
   * @return {Promise} all run
   */
  run() {
    return this.running || (this.running = !0, this.defered = new defer()), this.tick.call(window, () => {
      this._q.length ? this.dequeue().then((function() {
        this.run();
      }).bind(this)) : (this.defered.resolve(), this.running = void 0);
    }), this.paused == !0 && (this.paused = !1), this.defered.promise;
  }
  /**
   * Flush all, as quickly as possible
   * @return {Promise} ran
   */
  flush() {
    if (this.running)
      return this.running;
    if (this._q.length)
      return this.running = this.dequeue().then((function() {
        return this.running = void 0, this.flush();
      }).bind(this)), this.running;
  }
  /**
   * Clear all items in wait
   * @return {void}
   */
  clear() {
    this._q = [];
  }
  /**
   * Get the number of tasks in the queue
   * @return {number} tasks
   */
  length() {
    return this._q.length;
  }
  /**
   * Pause a running queue
   * @return {void}
   */
  pause() {
    this.paused = !0;
  }
  /**
   * End the queue
   * @return {void}
   */
  stop() {
    this._q = [], this.running = !1, this.paused = !0;
  }
}
const TEMPLATE = `
<div class="pagedjs_page">
	<div class="pagedjs_sheet">
		<div class="pagedjs_bleed pagedjs_bleed-top">
			<div class="pagedjs_marks-crop"></div>
			<div class="pagedjs_marks-middle">
				<div class="pagedjs_marks-cross"></div>
			</div>
			<div class="pagedjs_marks-crop"></div>
		</div>
		<div class="pagedjs_bleed pagedjs_bleed-bottom">
			<div class="pagedjs_marks-crop"></div>
			<div class="pagedjs_marks-middle">
				<div class="pagedjs_marks-cross"></div>
			</div>		<div class="pagedjs_marks-crop"></div>
		</div>
		<div class="pagedjs_bleed pagedjs_bleed-left">
			<div class="pagedjs_marks-crop"></div>
			<div class="pagedjs_marks-middle">
				<div class="pagedjs_marks-cross"></div>
			</div>		<div class="pagedjs_marks-crop"></div>
		</div>
		<div class="pagedjs_bleed pagedjs_bleed-right">
			<div class="pagedjs_marks-crop"></div>
			<div class="pagedjs_marks-middle">
				<div class="pagedjs_marks-cross"></div>
			</div>
			<div class="pagedjs_marks-crop"></div>
		</div>
		<div class="pagedjs_pagebox">
			<div class="pagedjs_margin-top-left-corner-holder">
				<div class="pagedjs_margin pagedjs_margin-top-left-corner"><div class="pagedjs_margin-content"></div></div>
			</div>
			<div class="pagedjs_margin-top">
				<div class="pagedjs_margin pagedjs_margin-top-left"><div class="pagedjs_margin-content"></div></div>
				<div class="pagedjs_margin pagedjs_margin-top-center"><div class="pagedjs_margin-content"></div></div>
				<div class="pagedjs_margin pagedjs_margin-top-right"><div class="pagedjs_margin-content"></div></div>
			</div>
			<div class="pagedjs_margin-top-right-corner-holder">
				<div class="pagedjs_margin pagedjs_margin-top-right-corner"><div class="pagedjs_margin-content"></div></div>
			</div>
			<div class="pagedjs_margin-right">
				<div class="pagedjs_margin pagedjs_margin-right-top"><div class="pagedjs_margin-content"></div></div>
				<div class="pagedjs_margin pagedjs_margin-right-middle"><div class="pagedjs_margin-content"></div></div>
				<div class="pagedjs_margin pagedjs_margin-right-bottom"><div class="pagedjs_margin-content"></div></div>
			</div>
			<div class="pagedjs_margin-left">
				<div class="pagedjs_margin pagedjs_margin-left-top"><div class="pagedjs_margin-content"></div></div>
				<div class="pagedjs_margin pagedjs_margin-left-middle"><div class="pagedjs_margin-content"></div></div>
				<div class="pagedjs_margin pagedjs_margin-left-bottom"><div class="pagedjs_margin-content"></div></div>
			</div>
			<div class="pagedjs_margin-bottom-left-corner-holder">
				<div class="pagedjs_margin pagedjs_margin-bottom-left-corner"><div class="pagedjs_margin-content"></div></div>
			</div>
			<div class="pagedjs_margin-bottom">
				<div class="pagedjs_margin pagedjs_margin-bottom-left"><div class="pagedjs_margin-content"></div></div>
				<div class="pagedjs_margin pagedjs_margin-bottom-center"><div class="pagedjs_margin-content"></div></div>
				<div class="pagedjs_margin pagedjs_margin-bottom-right"><div class="pagedjs_margin-content"></div></div>
			</div>
			<div class="pagedjs_margin-bottom-right-corner-holder">
				<div class="pagedjs_margin pagedjs_margin-bottom-right-corner"><div class="pagedjs_margin-content"></div></div>
			</div>
			<div class="pagedjs_area">
				<div class="pagedjs_page_content"></div>
				<div class="pagedjs_footnote_area">
					<div class="pagedjs_footnote_content pagedjs_footnote_empty">
						<div class="pagedjs_footnote_inner_content"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>`;
class Chunker {
  constructor(ze, Wr, Yr) {
    this.settings = Yr || {}, this.hooks = {}, this.hooks.beforeParsed = new Hook(this), this.hooks.filter = new Hook(this), this.hooks.afterParsed = new Hook(this), this.hooks.beforePageLayout = new Hook(this), this.hooks.onPageLayout = new Hook(this), this.hooks.layout = new Hook(this), this.hooks.renderNode = new Hook(this), this.hooks.layoutNode = new Hook(this), this.hooks.onOverflow = new Hook(this), this.hooks.afterOverflowRemoved = new Hook(this), this.hooks.onBreakToken = new Hook(), this.hooks.beforeRenderResult = new Hook(this), this.hooks.afterPageLayout = new Hook(this), this.hooks.finalizePage = new Hook(this), this.hooks.afterRendered = new Hook(this), this.pages = [], this.total = 0, this.q = new Queue(this), this.stopped = !1, this.rendered = !1, this.content = ze, this.charsPerBreak = [], this.maxChars, ze && this.flow(ze, Wr);
  }
  setup(ze) {
    this.pagesArea = document.createElement("div"), this.pagesArea.classList.add("pagedjs_pages"), ze ? ze.appendChild(this.pagesArea) : document.querySelector("body").appendChild(this.pagesArea), this.pageTemplate = document.createElement("template"), this.pageTemplate.innerHTML = TEMPLATE;
  }
  async flow(ze, Wr) {
    let Yr;
    await this.hooks.beforeParsed.trigger(ze, this), Yr = new ContentParser(ze), this.hooks.filter.triggerSync(Yr), this.source = Yr, this.breakToken = void 0, this.pagesArea && this.pageTemplate ? (this.q.clear(), this.removePages()) : this.setup(Wr), this.emit("rendering", Yr), await this.hooks.afterParsed.trigger(Yr, this), await this.loadFonts();
    let Qr = await this.render(Yr, this.breakToken);
    for (; Qr.canceled; )
      this.start(), Qr = await this.render(Yr, this.breakToken);
    return this.rendered = !0, this.pagesArea.style.setProperty("--pagedjs-page-count", this.total), await this.hooks.afterRendered.trigger(this.pages, this), this.emit("rendered", this.pages), this;
  }
  // oversetPages() {
  // 	let overset = [];
  // 	for (let i = 0; i < this.pages.length; i++) {
  // 		let page = this.pages[i];
  // 		if (page.overset) {
  // 			overset.push(page);
  // 			// page.overset = false;
  // 		}
  // 	}
  // 	return overset;
  // }
  //
  // async handleOverset(parsed) {
  // 	let overset = this.oversetPages();
  // 	if (overset.length) {
  // 		console.log("overset", overset);
  // 		let index = this.pages.indexOf(overset[0]) + 1;
  // 		console.log("INDEX", index);
  //
  // 		// Remove pages
  // 		// this.removePages(index);
  //
  // 		// await this.render(parsed, overset[0].overset);
  //
  // 		// return this.handleOverset(parsed);
  // 	}
  // }
  async render(ze, Wr) {
    let Yr = this.layout(ze, Wr), Qr = !1, Kr;
    for (; !Qr; )
      Kr = await this.q.enqueue(() => this.renderAsync(Yr)), Qr = Kr.done;
    return Kr;
  }
  start() {
    this.rendered = !1, this.stopped = !1;
  }
  stop() {
    this.stopped = !0;
  }
  renderOnIdle(ze) {
    return new Promise((Wr) => {
      requestIdleCallback(async () => {
        if (this.stopped)
          return Wr({ done: !0, canceled: !0 });
        let Yr = await ze.next();
        this.stopped ? Wr({ done: !0, canceled: !0 }) : Wr(Yr);
      });
    });
  }
  async renderAsync(ze) {
    if (this.stopped)
      return { done: !0, canceled: !0 };
    let Wr = await ze.next();
    return this.stopped ? { done: !0, canceled: !0 } : Wr;
  }
  async handleBreaks(ze, Wr) {
    let Yr = this.total + 1, Qr = Yr % 2 === 0 ? "left" : "right", Kr = Yr % 2 === 0 ? "verso" : "recto", Zr, en, tn;
    Yr !== 1 && (ze && typeof ze.dataset < "u" && typeof ze.dataset.previousBreakAfter < "u" && (Zr = ze.dataset.previousBreakAfter), ze && typeof ze.dataset < "u" && typeof ze.dataset.breakBefore < "u" && (en = ze.dataset.breakBefore), Wr ? tn = this.addPage(!0) : Zr && (Zr === "left" || Zr === "right") && Zr !== Qr ? tn = this.addPage(!0) : Zr && (Zr === "verso" || Zr === "recto") && Zr !== Kr ? tn = this.addPage(!0) : en && (en === "left" || en === "right") && en !== Qr ? tn = this.addPage(!0) : en && (en === "verso" || en === "recto") && en !== Kr && (tn = this.addPage(!0)), tn && (await this.hooks.beforePageLayout.trigger(tn, void 0, void 0, this), this.emit("page", tn), await this.hooks.afterPageLayout.trigger(tn.element, tn, void 0, this), await this.hooks.finalizePage.trigger(tn.element, tn, void 0, this), this.emit("renderedPage", tn)));
  }
  async *layout(ze, Wr) {
    let Yr = Wr || !1, Qr = [];
    for (; Yr !== void 0; ) {
      Yr && Yr.node ? await this.handleBreaks(Yr.node) : await this.handleBreaks(ze.firstChild);
      let Kr = this.addPage();
      if (await this.hooks.beforePageLayout.trigger(Kr, ze, Yr, this), this.emit("page", Kr), Yr = await Kr.layout(ze, Yr, this.maxChars), Yr) {
        let Zr = Yr.toJSON(!0);
        if (Qr.lastIndexOf(Zr) > -1) {
          let en = new OverflowContentError("Layout repeated", [Yr.node]);
          return console.error("Layout repeated at: ", Yr.node), en;
        } else
          Qr.push(Zr);
      }
      await this.hooks.afterPageLayout.trigger(Kr.element, Kr, Yr, this), await this.hooks.finalizePage.trigger(Kr.element, Kr, void 0, this), this.emit("renderedPage", Kr), this.recoredCharLength(Kr.wrapper.textContent.length), yield Yr;
    }
  }
  recoredCharLength(ze) {
    ze !== 0 && (this.charsPerBreak.push(ze), this.charsPerBreak.length > 4 && this.charsPerBreak.shift(), this.maxChars = this.charsPerBreak.reduce((Wr, Yr) => Wr + Yr, 0) / this.charsPerBreak.length);
  }
  removePages(ze = 0) {
    if (!(ze >= this.pages.length)) {
      for (let Wr = ze; Wr < this.pages.length; Wr++)
        this.pages[Wr].destroy();
      ze > 0 ? this.pages.splice(ze) : this.pages = [], this.total = this.pages.length;
    }
  }
  addPage(ze) {
    let Wr = this.pages[this.pages.length - 1], Yr = new Page(this.pagesArea, this.pageTemplate, ze, this.hooks, this.settings);
    return this.pages.push(Yr), Yr.create(void 0, Wr && Wr.element), Yr.index(this.total), ze || (Yr.onOverflow((Qr) => {
      if (console.warn("overflow on", Yr.id, Qr), this.rendered)
        return;
      let Kr = this.pages.indexOf(Yr) + 1;
      this.stop(), this.breakToken = Qr, this.removePages(Kr), this.rendered === !0 && (this.rendered = !1, this.q.enqueue(async () => {
        this.start(), await this.render(this.source, this.breakToken), this.rendered = !0;
      }));
    }), Yr.onUnderflow((Qr) => {
    })), this.total = this.pages.length, Yr;
  }
  /*
  	insertPage(index, blank) {
  		let lastPage = this.pages[index];
  		// Create a new page from the template
  		let page = new Page(this.pagesArea, this.pageTemplate, blank, this.hooks);
  
  		let total = this.pages.splice(index, 0, page);
  
  		// Create the pages
  		page.create(undefined, lastPage && lastPage.element);
  
  		page.index(index + 1);
  
  		for (let i = index + 2; i < this.pages.length; i++) {
  			this.pages[i].index(i);
  		}
  
  		if (!blank) {
  			// Listen for page overflow
  			page.onOverflow((overflowToken) => {
  				if (total < this.pages.length) {
  					this.pages[total].layout(this.source, overflowToken);
  				} else {
  					let newPage = this.addPage();
  					newPage.layout(this.source, overflowToken);
  				}
  			});
  
  			page.onUnderflow(() => {
  				// console.log("underflow on", page.id);
  			});
  		}
  
  		this.total += 1;
  
  		return page;
  	}
  	*/
  async clonePage(ze) {
    let Wr = this.pages[this.pages.length - 1], Yr = new Page(this.pagesArea, this.pageTemplate, !1, this.hooks);
    this.pages.push(Yr), Yr.create(void 0, Wr && Wr.element), Yr.index(this.total), await this.hooks.beforePageLayout.trigger(Yr, void 0, void 0, this), this.emit("page", Yr);
    for (const Qr of ze.element.classList)
      Qr !== "pagedjs_left_page" && Qr !== "pagedjs_right_page" && Yr.element.classList.add(Qr);
    await this.hooks.afterPageLayout.trigger(Yr.element, Yr, void 0, this), await this.hooks.finalizePage.trigger(Yr.element, Yr, void 0, this), this.emit("renderedPage", Yr);
  }
  loadFonts() {
    let ze = [];
    return (document.fonts || []).forEach((Wr) => {
      if (Wr.status !== "loaded") {
        let Yr = Wr.load().then((Qr) => Wr.family, (Qr) => (console.warn("Failed to preload font-family:", Wr.family), Wr.family));
        ze.push(Yr);
      }
    }), Promise.all(ze).catch((Wr) => {
      console.warn(Wr);
    });
  }
  destroy() {
    this.pagesArea.remove(), this.pageTemplate.remove();
  }
}
EventEmitter(Chunker.prototype);
var syntax = { exports: {} }, create$4 = {}, List_1, hasRequiredList;
function requireList() {
  if (hasRequiredList) return List_1;
  hasRequiredList = 1;
  function Gr(Kr) {
    return {
      prev: null,
      next: null,
      data: Kr
    };
  }
  function ze(Kr, Zr, en) {
    var tn;
    return Yr !== null ? (tn = Yr, Yr = Yr.cursor, tn.prev = Zr, tn.next = en, tn.cursor = Kr.cursor) : tn = {
      prev: Zr,
      next: en,
      cursor: Kr.cursor
    }, Kr.cursor = tn, tn;
  }
  function Wr(Kr) {
    var Zr = Kr.cursor;
    Kr.cursor = Zr.cursor, Zr.prev = null, Zr.next = null, Zr.cursor = Yr, Yr = Zr;
  }
  var Yr = null, Qr = function() {
    this.cursor = null, this.head = null, this.tail = null;
  };
  return Qr.createItem = Gr, Qr.prototype.createItem = Gr, Qr.prototype.updateCursors = function(Kr, Zr, en, tn) {
    for (var rn = this.cursor; rn !== null; )
      rn.prev === Kr && (rn.prev = Zr), rn.next === en && (rn.next = tn), rn = rn.cursor;
  }, Qr.prototype.getSize = function() {
    for (var Kr = 0, Zr = this.head; Zr; )
      Kr++, Zr = Zr.next;
    return Kr;
  }, Qr.prototype.fromArray = function(Kr) {
    var Zr = null;
    this.head = null;
    for (var en = 0; en < Kr.length; en++) {
      var tn = Gr(Kr[en]);
      Zr !== null ? Zr.next = tn : this.head = tn, tn.prev = Zr, Zr = tn;
    }
    return this.tail = Zr, this;
  }, Qr.prototype.toArray = function() {
    for (var Kr = this.head, Zr = []; Kr; )
      Zr.push(Kr.data), Kr = Kr.next;
    return Zr;
  }, Qr.prototype.toJSON = Qr.prototype.toArray, Qr.prototype.isEmpty = function() {
    return this.head === null;
  }, Qr.prototype.first = function() {
    return this.head && this.head.data;
  }, Qr.prototype.last = function() {
    return this.tail && this.tail.data;
  }, Qr.prototype.each = function(Kr, Zr) {
    var en;
    Zr === void 0 && (Zr = this);
    for (var tn = ze(this, null, this.head); tn.next !== null; )
      en = tn.next, tn.next = en.next, Kr.call(Zr, en.data, en, this);
    Wr(this);
  }, Qr.prototype.forEach = Qr.prototype.each, Qr.prototype.eachRight = function(Kr, Zr) {
    var en;
    Zr === void 0 && (Zr = this);
    for (var tn = ze(this, this.tail, null); tn.prev !== null; )
      en = tn.prev, tn.prev = en.prev, Kr.call(Zr, en.data, en, this);
    Wr(this);
  }, Qr.prototype.forEachRight = Qr.prototype.eachRight, Qr.prototype.reduce = function(Kr, Zr, en) {
    var tn;
    en === void 0 && (en = this);
    for (var rn = ze(this, null, this.head), sn = Zr; rn.next !== null; )
      tn = rn.next, rn.next = tn.next, sn = Kr.call(en, sn, tn.data, tn, this);
    return Wr(this), sn;
  }, Qr.prototype.reduceRight = function(Kr, Zr, en) {
    var tn;
    en === void 0 && (en = this);
    for (var rn = ze(this, this.tail, null), sn = Zr; rn.prev !== null; )
      tn = rn.prev, rn.prev = tn.prev, sn = Kr.call(en, sn, tn.data, tn, this);
    return Wr(this), sn;
  }, Qr.prototype.nextUntil = function(Kr, Zr, en) {
    if (Kr !== null) {
      var tn;
      en === void 0 && (en = this);
      for (var rn = ze(this, null, Kr); rn.next !== null && (tn = rn.next, rn.next = tn.next, !Zr.call(en, tn.data, tn, this)); )
        ;
      Wr(this);
    }
  }, Qr.prototype.prevUntil = function(Kr, Zr, en) {
    if (Kr !== null) {
      var tn;
      en === void 0 && (en = this);
      for (var rn = ze(this, Kr, null); rn.prev !== null && (tn = rn.prev, rn.prev = tn.prev, !Zr.call(en, tn.data, tn, this)); )
        ;
      Wr(this);
    }
  }, Qr.prototype.some = function(Kr, Zr) {
    var en = this.head;
    for (Zr === void 0 && (Zr = this); en !== null; ) {
      if (Kr.call(Zr, en.data, en, this))
        return !0;
      en = en.next;
    }
    return !1;
  }, Qr.prototype.map = function(Kr, Zr) {
    var en = new Qr(), tn = this.head;
    for (Zr === void 0 && (Zr = this); tn !== null; )
      en.appendData(Kr.call(Zr, tn.data, tn, this)), tn = tn.next;
    return en;
  }, Qr.prototype.filter = function(Kr, Zr) {
    var en = new Qr(), tn = this.head;
    for (Zr === void 0 && (Zr = this); tn !== null; )
      Kr.call(Zr, tn.data, tn, this) && en.appendData(tn.data), tn = tn.next;
    return en;
  }, Qr.prototype.clear = function() {
    this.head = null, this.tail = null;
  }, Qr.prototype.copy = function() {
    for (var Kr = new Qr(), Zr = this.head; Zr !== null; )
      Kr.insert(Gr(Zr.data)), Zr = Zr.next;
    return Kr;
  }, Qr.prototype.prepend = function(Kr) {
    return this.updateCursors(null, Kr, this.head, Kr), this.head !== null ? (this.head.prev = Kr, Kr.next = this.head) : this.tail = Kr, this.head = Kr, this;
  }, Qr.prototype.prependData = function(Kr) {
    return this.prepend(Gr(Kr));
  }, Qr.prototype.append = function(Kr) {
    return this.insert(Kr);
  }, Qr.prototype.appendData = function(Kr) {
    return this.insert(Gr(Kr));
  }, Qr.prototype.insert = function(Kr, Zr) {
    if (Zr != null)
      if (this.updateCursors(Zr.prev, Kr, Zr, Kr), Zr.prev === null) {
        if (this.head !== Zr)
          throw new Error("before doesn't belong to list");
        this.head = Kr, Zr.prev = Kr, Kr.next = Zr, this.updateCursors(null, Kr);
      } else
        Zr.prev.next = Kr, Kr.prev = Zr.prev, Zr.prev = Kr, Kr.next = Zr;
    else
      this.updateCursors(this.tail, Kr, null, Kr), this.tail !== null ? (this.tail.next = Kr, Kr.prev = this.tail) : this.head = Kr, this.tail = Kr;
    return this;
  }, Qr.prototype.insertData = function(Kr, Zr) {
    return this.insert(Gr(Kr), Zr);
  }, Qr.prototype.remove = function(Kr) {
    if (this.updateCursors(Kr, Kr.prev, Kr, Kr.next), Kr.prev !== null)
      Kr.prev.next = Kr.next;
    else {
      if (this.head !== Kr)
        throw new Error("item doesn't belong to list");
      this.head = Kr.next;
    }
    if (Kr.next !== null)
      Kr.next.prev = Kr.prev;
    else {
      if (this.tail !== Kr)
        throw new Error("item doesn't belong to list");
      this.tail = Kr.prev;
    }
    return Kr.prev = null, Kr.next = null, Kr;
  }, Qr.prototype.push = function(Kr) {
    this.insert(Gr(Kr));
  }, Qr.prototype.pop = function() {
    if (this.tail !== null)
      return this.remove(this.tail);
  }, Qr.prototype.unshift = function(Kr) {
    this.prepend(Gr(Kr));
  }, Qr.prototype.shift = function() {
    if (this.head !== null)
      return this.remove(this.head);
  }, Qr.prototype.prependList = function(Kr) {
    return this.insertList(Kr, this.head);
  }, Qr.prototype.appendList = function(Kr) {
    return this.insertList(Kr);
  }, Qr.prototype.insertList = function(Kr, Zr) {
    return Kr.head === null ? this : (Zr != null ? (this.updateCursors(Zr.prev, Kr.tail, Zr, Kr.head), Zr.prev !== null ? (Zr.prev.next = Kr.head, Kr.head.prev = Zr.prev) : this.head = Kr.head, Zr.prev = Kr.tail, Kr.tail.next = Zr) : (this.updateCursors(this.tail, Kr.tail, null, Kr.head), this.tail !== null ? (this.tail.next = Kr.head, Kr.head.prev = this.tail) : this.head = Kr.head, this.tail = Kr.tail), Kr.head = null, Kr.tail = null, this);
  }, Qr.prototype.replace = function(Kr, Zr) {
    "head" in Zr ? this.insertList(Zr, Kr) : this.insert(Zr, Kr), this.remove(Kr);
  }, List_1 = Qr, List_1;
}
var createCustomError, hasRequiredCreateCustomError;
function requireCreateCustomError() {
  return hasRequiredCreateCustomError || (hasRequiredCreateCustomError = 1, createCustomError = function(ze, Wr) {
    var Yr = Object.create(SyntaxError.prototype), Qr = new Error();
    return Yr.name = ze, Yr.message = Wr, Object.defineProperty(Yr, "stack", {
      get: function() {
        return (Qr.stack || "").replace(/^(.+\n){1,3}/, ze + ": " + Wr + `
`);
      }
    }), Yr;
  }), createCustomError;
}
var _SyntaxError$1, hasRequired_SyntaxError$1;
function require_SyntaxError$1() {
  if (hasRequired_SyntaxError$1) return _SyntaxError$1;
  hasRequired_SyntaxError$1 = 1;
  var Gr = requireCreateCustomError(), ze = 100, Wr = 60, Yr = "    ";
  function Qr(Zr, en) {
    function tn(xn, gn) {
      return rn.slice(xn, gn).map(function(un, fn) {
        for (var cn = String(xn + fn + 1); cn.length < pn; )
          cn = " " + cn;
        return cn + " |" + un;
      }).join(`
`);
    }
    var rn = Zr.source.split(/\r\n?|\n|\f/), sn = Zr.line, on = Zr.column, an = Math.max(1, sn - en) - 1, dn = Math.min(sn + en, rn.length + 1), pn = Math.max(4, String(dn).length) + 1, mn = 0;
    on += (Yr.length - 1) * (rn[sn - 1].substr(0, on - 1).match(/\t/g) || []).length, on > ze && (mn = on - Wr + 3, on = Wr - 2);
    for (var vn = an; vn <= dn; vn++)
      vn >= 0 && vn < rn.length && (rn[vn] = rn[vn].replace(/\t/g, Yr), rn[vn] = (mn > 0 && rn[vn].length > mn ? "…" : "") + rn[vn].substr(mn, ze - 2) + (rn[vn].length > mn + ze - 1 ? "…" : ""));
    return [
      tn(an, sn),
      new Array(on + pn + 2).join("-") + "^",
      tn(sn, dn)
    ].filter(Boolean).join(`
`);
  }
  var Kr = function(Zr, en, tn, rn, sn) {
    var on = Gr("SyntaxError", Zr);
    return on.source = en, on.offset = tn, on.line = rn, on.column = sn, on.sourceFragment = function(an) {
      return Qr(on, isNaN(an) ? 0 : an);
    }, Object.defineProperty(on, "formattedMessage", {
      get: function() {
        return "Parse error: " + on.message + `
` + Qr(on, 2);
      }
    }), on.parseError = {
      offset: tn,
      line: rn,
      column: sn
    }, on;
  };
  return _SyntaxError$1 = Kr, _SyntaxError$1;
}
var _const, hasRequired_const;
function require_const() {
  if (hasRequired_const) return _const;
  hasRequired_const = 1;
  var Gr = {
    EOF: 0,
    // <EOF-token>
    Ident: 1,
    // <ident-token>
    Function: 2,
    // <function-token>
    AtKeyword: 3,
    // <at-keyword-token>
    Hash: 4,
    // <hash-token>
    String: 5,
    // <string-token>
    BadString: 6,
    // <bad-string-token>
    Url: 7,
    // <url-token>
    BadUrl: 8,
    // <bad-url-token>
    Delim: 9,
    // <delim-token>
    Number: 10,
    // <number-token>
    Percentage: 11,
    // <percentage-token>
    Dimension: 12,
    // <dimension-token>
    WhiteSpace: 13,
    // <whitespace-token>
    CDO: 14,
    // <CDO-token>
    CDC: 15,
    // <CDC-token>
    Colon: 16,
    // <colon-token>     :
    Semicolon: 17,
    // <semicolon-token> ;
    Comma: 18,
    // <comma-token>     ,
    LeftSquareBracket: 19,
    // <[-token>
    RightSquareBracket: 20,
    // <]-token>
    LeftParenthesis: 21,
    // <(-token>
    RightParenthesis: 22,
    // <)-token>
    LeftCurlyBracket: 23,
    // <{-token>
    RightCurlyBracket: 24,
    // <}-token>
    Comment: 25
  }, ze = Object.keys(Gr).reduce(function(Wr, Yr) {
    return Wr[Gr[Yr]] = Yr, Wr;
  }, {});
  return _const = {
    TYPE: Gr,
    NAME: ze
  }, _const;
}
var charCodeDefinitions, hasRequiredCharCodeDefinitions;
function requireCharCodeDefinitions() {
  if (hasRequiredCharCodeDefinitions) return charCodeDefinitions;
  hasRequiredCharCodeDefinitions = 1;
  var Gr = 0;
  function ze(un) {
    return un >= 48 && un <= 57;
  }
  function Wr(un) {
    return ze(un) || // 0 .. 9
    un >= 65 && un <= 70 || // A .. F
    un >= 97 && un <= 102;
  }
  function Yr(un) {
    return un >= 65 && un <= 90;
  }
  function Qr(un) {
    return un >= 97 && un <= 122;
  }
  function Kr(un) {
    return Yr(un) || Qr(un);
  }
  function Zr(un) {
    return un >= 128;
  }
  function en(un) {
    return Kr(un) || Zr(un) || un === 95;
  }
  function tn(un) {
    return en(un) || ze(un) || un === 45;
  }
  function rn(un) {
    return un >= 0 && un <= 8 || un === 11 || un >= 14 && un <= 31 || un === 127;
  }
  function sn(un) {
    return un === 10 || un === 13 || un === 12;
  }
  function on(un) {
    return sn(un) || un === 32 || un === 9;
  }
  function an(un, fn) {
    return !(un !== 92 || sn(fn) || fn === Gr);
  }
  function dn(un, fn, cn) {
    return un === 45 ? en(fn) || fn === 45 || an(fn, cn) : en(un) ? !0 : un === 92 ? an(un, fn) : !1;
  }
  function pn(un, fn, cn) {
    return un === 43 || un === 45 ? ze(fn) ? 2 : fn === 46 && ze(cn) ? 3 : 0 : un === 46 ? ze(fn) ? 2 : 0 : ze(un) ? 1 : 0;
  }
  function mn(un) {
    return un === 65279 || un === 65534 ? 1 : 0;
  }
  var vn = new Array(128);
  gn.Eof = 128, gn.WhiteSpace = 130, gn.Digit = 131, gn.NameStart = 132, gn.NonPrintable = 133;
  for (var xn = 0; xn < vn.length; xn++)
    switch (!0) {
      case on(xn):
        vn[xn] = gn.WhiteSpace;
        break;
      case ze(xn):
        vn[xn] = gn.Digit;
        break;
      case en(xn):
        vn[xn] = gn.NameStart;
        break;
      case rn(xn):
        vn[xn] = gn.NonPrintable;
        break;
      default:
        vn[xn] = xn || gn.Eof;
    }
  function gn(un) {
    return un < 128 ? vn[un] : gn.NameStart;
  }
  return charCodeDefinitions = {
    isDigit: ze,
    isHexDigit: Wr,
    isUppercaseLetter: Yr,
    isLowercaseLetter: Qr,
    isLetter: Kr,
    isNonAscii: Zr,
    isNameStart: en,
    isName: tn,
    isNonPrintable: rn,
    isNewline: sn,
    isWhiteSpace: on,
    isValidEscape: an,
    isIdentifierStart: dn,
    isNumberStart: pn,
    isBOM: mn,
    charCodeCategory: gn
  }, charCodeDefinitions;
}
var utils, hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  var Gr = requireCharCodeDefinitions(), ze = Gr.isDigit, Wr = Gr.isHexDigit, Yr = Gr.isUppercaseLetter, Qr = Gr.isName, Kr = Gr.isWhiteSpace, Zr = Gr.isValidEscape;
  function en(gn, un) {
    return un < gn.length ? gn.charCodeAt(un) : 0;
  }
  function tn(gn, un, fn) {
    return fn === 13 && en(gn, un + 1) === 10 ? 2 : 1;
  }
  function rn(gn, un, fn) {
    var cn = gn.charCodeAt(un);
    return Yr(cn) && (cn = cn | 32), cn === fn;
  }
  function sn(gn, un, fn, cn) {
    if (fn - un !== cn.length || un < 0 || fn > gn.length)
      return !1;
    for (var Cn = un; Cn < fn; Cn++) {
      var bn = gn.charCodeAt(Cn), Sn = cn.charCodeAt(Cn - un);
      if (Yr(bn) && (bn = bn | 32), bn !== Sn)
        return !1;
    }
    return !0;
  }
  function on(gn, un) {
    for (; un >= 0 && Kr(gn.charCodeAt(un)); un--)
      ;
    return un + 1;
  }
  function an(gn, un) {
    for (; un < gn.length && Kr(gn.charCodeAt(un)); un++)
      ;
    return un;
  }
  function dn(gn, un) {
    for (; un < gn.length && ze(gn.charCodeAt(un)); un++)
      ;
    return un;
  }
  function pn(gn, un) {
    if (un += 2, Wr(en(gn, un - 1))) {
      for (var fn = Math.min(gn.length, un + 5); un < fn && Wr(en(gn, un)); un++)
        ;
      var cn = en(gn, un);
      Kr(cn) && (un += tn(gn, un, cn));
    }
    return un;
  }
  function mn(gn, un) {
    for (; un < gn.length; un++) {
      var fn = gn.charCodeAt(un);
      if (!Qr(fn)) {
        if (Zr(fn, en(gn, un + 1))) {
          un = pn(gn, un) - 1;
          continue;
        }
        break;
      }
    }
    return un;
  }
  function vn(gn, un) {
    var fn = gn.charCodeAt(un);
    if ((fn === 43 || fn === 45) && (fn = gn.charCodeAt(un += 1)), ze(fn) && (un = dn(gn, un + 1), fn = gn.charCodeAt(un)), fn === 46 && ze(gn.charCodeAt(un + 1)) && (fn = gn.charCodeAt(un += 2), un = dn(gn, un)), rn(
      gn,
      un,
      101
      /* e */
    )) {
      var cn = 0;
      fn = gn.charCodeAt(un + 1), (fn === 45 || fn === 43) && (cn = 1, fn = gn.charCodeAt(un + 2)), ze(fn) && (un = dn(gn, un + 1 + cn + 1));
    }
    return un;
  }
  function xn(gn, un) {
    for (; un < gn.length; un++) {
      var fn = gn.charCodeAt(un);
      if (fn === 41) {
        un++;
        break;
      }
      Zr(fn, en(gn, un + 1)) && (un = pn(gn, un));
    }
    return un;
  }
  return utils = {
    consumeEscaped: pn,
    consumeName: mn,
    consumeNumber: vn,
    consumeBadUrlRemnants: xn,
    cmpChar: rn,
    cmpStr: sn,
    getNewlineLength: tn,
    findWhiteSpaceStart: on,
    findWhiteSpaceEnd: an
  }, utils;
}
var TokenStream_1, hasRequiredTokenStream;
function requireTokenStream() {
  if (hasRequiredTokenStream) return TokenStream_1;
  hasRequiredTokenStream = 1;
  var Gr = require_const(), ze = Gr.TYPE, Wr = Gr.NAME, Yr = requireUtils(), Qr = Yr.cmpStr, Kr = ze.EOF, Zr = ze.WhiteSpace, en = ze.Comment, tn = 16777215, rn = 24, sn = function() {
    this.offsetAndType = null, this.balance = null, this.reset();
  };
  return sn.prototype = {
    reset: function() {
      this.eof = !1, this.tokenIndex = -1, this.tokenType = 0, this.tokenStart = this.firstCharOffset, this.tokenEnd = this.firstCharOffset;
    },
    lookupType: function(on) {
      return on += this.tokenIndex, on < this.tokenCount ? this.offsetAndType[on] >> rn : Kr;
    },
    lookupOffset: function(on) {
      return on += this.tokenIndex, on < this.tokenCount ? this.offsetAndType[on - 1] & tn : this.source.length;
    },
    lookupValue: function(on, an) {
      return on += this.tokenIndex, on < this.tokenCount ? Qr(
        this.source,
        this.offsetAndType[on - 1] & tn,
        this.offsetAndType[on] & tn,
        an
      ) : !1;
    },
    getTokenStart: function(on) {
      return on === this.tokenIndex ? this.tokenStart : on > 0 ? on < this.tokenCount ? this.offsetAndType[on - 1] & tn : this.offsetAndType[this.tokenCount] & tn : this.firstCharOffset;
    },
    // TODO: -> skipUntilBalanced
    getRawLength: function(on, an) {
      var dn = on, pn, mn = this.offsetAndType[Math.max(dn - 1, 0)] & tn, vn;
      e:
        for (; dn < this.tokenCount; dn++) {
          if (pn = this.balance[dn], pn < on)
            break e;
          switch (vn = this.offsetAndType[dn] >> rn, an(vn, this.source, mn)) {
            case 1:
              break e;
            case 2:
              dn++;
              break e;
            default:
              this.balance[pn] === dn && (dn = pn), mn = this.offsetAndType[dn] & tn;
          }
        }
      return dn - this.tokenIndex;
    },
    isBalanceEdge: function(on) {
      return this.balance[this.tokenIndex] < on;
    },
    isDelim: function(on, an) {
      return an ? this.lookupType(an) === ze.Delim && this.source.charCodeAt(this.lookupOffset(an)) === on : this.tokenType === ze.Delim && this.source.charCodeAt(this.tokenStart) === on;
    },
    getTokenValue: function() {
      return this.source.substring(this.tokenStart, this.tokenEnd);
    },
    getTokenLength: function() {
      return this.tokenEnd - this.tokenStart;
    },
    substrToCursor: function(on) {
      return this.source.substring(on, this.tokenStart);
    },
    skipWS: function() {
      for (var on = this.tokenIndex, an = 0; on < this.tokenCount && this.offsetAndType[on] >> rn === Zr; on++, an++)
        ;
      an > 0 && this.skip(an);
    },
    skipSC: function() {
      for (; this.tokenType === Zr || this.tokenType === en; )
        this.next();
    },
    skip: function(on) {
      var an = this.tokenIndex + on;
      an < this.tokenCount ? (this.tokenIndex = an, this.tokenStart = this.offsetAndType[an - 1] & tn, an = this.offsetAndType[an], this.tokenType = an >> rn, this.tokenEnd = an & tn) : (this.tokenIndex = this.tokenCount, this.next());
    },
    next: function() {
      var on = this.tokenIndex + 1;
      on < this.tokenCount ? (this.tokenIndex = on, this.tokenStart = this.tokenEnd, on = this.offsetAndType[on], this.tokenType = on >> rn, this.tokenEnd = on & tn) : (this.tokenIndex = this.tokenCount, this.eof = !0, this.tokenType = Kr, this.tokenStart = this.tokenEnd = this.source.length);
    },
    forEachToken(on) {
      for (var an = 0, dn = this.firstCharOffset; an < this.tokenCount; an++) {
        var pn = dn, mn = this.offsetAndType[an], vn = mn & tn, xn = mn >> rn;
        dn = vn, on(xn, pn, vn, an);
      }
    },
    dump() {
      var on = new Array(this.tokenCount);
      return this.forEachToken((an, dn, pn, mn) => {
        on[mn] = {
          idx: mn,
          type: Wr[an],
          chunk: this.source.substring(dn, pn),
          balance: this.balance[mn]
        };
      }), on;
    }
  }, TokenStream_1 = sn, TokenStream_1;
}
var generate_1, hasRequiredGenerate;
function requireGenerate() {
  if (hasRequiredGenerate) return generate_1;
  hasRequiredGenerate = 1;
  function Gr(Kr) {
    return Kr;
  }
  function ze(Kr) {
    return Kr.min === 0 && Kr.max === 0 ? "*" : Kr.min === 0 && Kr.max === 1 ? "?" : Kr.min === 1 && Kr.max === 0 ? Kr.comma ? "#" : "+" : Kr.min === 1 && Kr.max === 1 ? "" : (Kr.comma ? "#" : "") + (Kr.min === Kr.max ? "{" + Kr.min + "}" : "{" + Kr.min + "," + (Kr.max !== 0 ? Kr.max : "") + "}");
  }
  function Wr(Kr) {
    switch (Kr.type) {
      case "Range":
        return " [" + (Kr.min === null ? "-∞" : Kr.min) + "," + (Kr.max === null ? "∞" : Kr.max) + "]";
      default:
        throw new Error("Unknown node type `" + Kr.type + "`");
    }
  }
  function Yr(Kr, Zr, en, tn) {
    var rn = Kr.combinator === " " || tn ? Kr.combinator : " " + Kr.combinator + " ", sn = Kr.terms.map(function(on) {
      return Qr(on, Zr, en, tn);
    }).join(rn);
    return (Kr.explicit || en) && (sn = (tn || sn[0] === "," ? "[" : "[ ") + sn + (tn ? "]" : " ]")), sn;
  }
  function Qr(Kr, Zr, en, tn) {
    var rn;
    switch (Kr.type) {
      case "Group":
        rn = Yr(Kr, Zr, en, tn) + (Kr.disallowEmpty ? "!" : "");
        break;
      case "Multiplier":
        return Qr(Kr.term, Zr, en, tn) + Zr(ze(Kr), Kr);
      case "Type":
        rn = "<" + Kr.name + (Kr.opts ? Zr(Wr(Kr.opts), Kr.opts) : "") + ">";
        break;
      case "Property":
        rn = "<'" + Kr.name + "'>";
        break;
      case "Keyword":
        rn = Kr.name;
        break;
      case "AtKeyword":
        rn = "@" + Kr.name;
        break;
      case "Function":
        rn = Kr.name + "(";
        break;
      case "String":
      case "Token":
        rn = Kr.value;
        break;
      case "Comma":
        rn = ",";
        break;
      default:
        throw new Error("Unknown node type `" + Kr.type + "`");
    }
    return Zr(rn, Kr);
  }
  return generate_1 = function(Kr, Zr) {
    var en = Gr, tn = !1, rn = !1;
    return typeof Zr == "function" ? en = Zr : Zr && (tn = !!Zr.forceBraces, rn = !!Zr.compact, typeof Zr.decorate == "function" && (en = Zr.decorate)), Qr(Kr, en, tn, rn);
  }, generate_1;
}
var error$1, hasRequiredError;
function requireError() {
  if (hasRequiredError) return error$1;
  hasRequiredError = 1;
  const Gr = requireCreateCustomError(), ze = requireGenerate(), Wr = { offset: 0, line: 1, column: 1 };
  function Yr(tn, rn) {
    const sn = tn.tokens, on = tn.longestMatch, an = on < sn.length && sn[on].node || null, dn = an !== rn ? an : null;
    let pn = 0, mn = 0, vn = 0, xn = "", gn, un;
    for (let fn = 0; fn < sn.length; fn++) {
      const cn = sn[fn].value;
      fn === on && (mn = cn.length, pn = xn.length), dn !== null && sn[fn].node === dn && (fn <= on ? vn++ : vn = 0), xn += cn;
    }
    return on === sn.length || vn > 1 ? (gn = Qr(dn || rn, "end") || Kr(Wr, xn), un = Kr(gn)) : (gn = Qr(dn, "start") || Kr(Qr(rn, "start") || Wr, xn.slice(0, pn)), un = Qr(dn, "end") || Kr(gn, xn.substr(pn, mn))), {
      css: xn,
      mismatchOffset: pn,
      mismatchLength: mn,
      start: gn,
      end: un
    };
  }
  function Qr(tn, rn) {
    const sn = tn && tn.loc && tn.loc[rn];
    return sn ? "line" in sn ? Kr(sn) : sn : null;
  }
  function Kr({ offset: tn, line: rn, column: sn }, on) {
    const an = {
      offset: tn,
      line: rn,
      column: sn
    };
    if (on) {
      const dn = on.split(/\n|\r\n?|\f/);
      an.offset += on.length, an.line += dn.length - 1, an.column = dn.length === 1 ? an.column + on.length : dn.pop().length + 1;
    }
    return an;
  }
  return error$1 = {
    SyntaxReferenceError: function(tn, rn) {
      const sn = Gr(
        "SyntaxReferenceError",
        tn + (rn ? " `" + rn + "`" : "")
      );
      return sn.reference = rn, sn;
    },
    SyntaxMatchError: function(tn, rn, sn, on) {
      const an = Gr("SyntaxMatchError", tn), {
        css: dn,
        mismatchOffset: pn,
        mismatchLength: mn,
        start: vn,
        end: xn
      } = Yr(on, sn);
      return an.rawMessage = tn, an.syntax = rn ? ze(rn) : "<generic>", an.css = dn, an.mismatchOffset = pn, an.mismatchLength = mn, an.message = tn + `
  syntax: ` + an.syntax + `
   value: ` + (dn || "<empty string>") + `
  --------` + new Array(an.mismatchOffset + 1).join("-") + "^", Object.assign(an, vn), an.loc = {
        source: sn && sn.loc && sn.loc.source || "<unknown>",
        start: vn,
        end: xn
      }, an;
    }
  }, error$1;
}
var names, hasRequiredNames;
function requireNames() {
  if (hasRequiredNames) return names;
  hasRequiredNames = 1;
  var Gr = Object.prototype.hasOwnProperty, ze = /* @__PURE__ */ Object.create(null), Wr = /* @__PURE__ */ Object.create(null), Yr = 45;
  function Qr(tn, rn) {
    return rn = rn || 0, tn.length - rn >= 2 && tn.charCodeAt(rn) === Yr && tn.charCodeAt(rn + 1) === Yr;
  }
  function Kr(tn, rn) {
    if (rn = rn || 0, tn.length - rn >= 3 && tn.charCodeAt(rn) === Yr && tn.charCodeAt(rn + 1) !== Yr) {
      var sn = tn.indexOf("-", rn + 2);
      if (sn !== -1)
        return tn.substring(rn, sn + 1);
    }
    return "";
  }
  function Zr(tn) {
    if (Gr.call(ze, tn))
      return ze[tn];
    var rn = tn.toLowerCase();
    if (Gr.call(ze, rn))
      return ze[tn] = ze[rn];
    var sn = Qr(rn, 0), on = sn ? "" : Kr(rn, 0);
    return ze[tn] = Object.freeze({
      basename: rn.substr(on.length),
      name: rn,
      vendor: on,
      prefix: on,
      custom: sn
    });
  }
  function en(tn) {
    if (Gr.call(Wr, tn))
      return Wr[tn];
    var rn = tn, sn = tn[0];
    sn === "/" ? sn = tn[1] === "/" ? "//" : "/" : sn !== "_" && sn !== "*" && sn !== "$" && sn !== "#" && sn !== "+" && sn !== "&" && (sn = "");
    var on = Qr(rn, sn.length);
    if (!on && (rn = rn.toLowerCase(), Gr.call(Wr, rn)))
      return Wr[tn] = Wr[rn];
    var an = on ? "" : Kr(rn, sn.length), dn = rn.substr(0, sn.length + an.length);
    return Wr[tn] = Object.freeze({
      basename: rn.substr(dn.length),
      name: rn.substr(sn.length),
      hack: sn,
      vendor: an,
      prefix: dn,
      custom: on
    });
  }
  return names = {
    keyword: Zr,
    property: en,
    isCustomProperty: Qr,
    vendorPrefix: Kr
  }, names;
}
var adoptBuffer, hasRequiredAdoptBuffer;
function requireAdoptBuffer() {
  if (hasRequiredAdoptBuffer) return adoptBuffer;
  hasRequiredAdoptBuffer = 1;
  var Gr = 16 * 1024, ze = typeof Uint32Array < "u" ? Uint32Array : Array;
  return adoptBuffer = function(Yr, Qr) {
    return Yr === null || Yr.length < Qr ? new ze(Math.max(Qr + 1024, Gr)) : Yr;
  }, adoptBuffer;
}
var tokenizer$1, hasRequiredTokenizer$1;
function requireTokenizer$1() {
  if (hasRequiredTokenizer$1) return tokenizer$1;
  hasRequiredTokenizer$1 = 1;
  var Gr = requireTokenStream(), ze = requireAdoptBuffer(), Wr = require_const(), Yr = Wr.TYPE, Qr = requireCharCodeDefinitions(), Kr = Qr.isNewline, Zr = Qr.isName, en = Qr.isValidEscape, tn = Qr.isNumberStart, rn = Qr.isIdentifierStart, sn = Qr.charCodeCategory, on = Qr.isBOM, an = requireUtils(), dn = an.cmpStr, pn = an.getNewlineLength, mn = an.findWhiteSpaceEnd, vn = an.consumeEscaped, xn = an.consumeName, gn = an.consumeNumber, un = an.consumeBadUrlRemnants, fn = 16777215, cn = 24;
  function Cn(bn, Sn) {
    function _n(Wn) {
      return Wn < Mn ? bn.charCodeAt(Wn) : 0;
    }
    function Tn() {
      if (En = gn(bn, En), rn(_n(En), _n(En + 1), _n(En + 2))) {
        On = Yr.Dimension, En = xn(bn, En);
        return;
      }
      if (_n(En) === 37) {
        On = Yr.Percentage, En++;
        return;
      }
      On = Yr.Number;
    }
    function Ln() {
      const Wn = En;
      if (En = xn(bn, En), dn(bn, Wn, En, "url") && _n(En) === 40) {
        if (En = mn(bn, En + 1), _n(En) === 34 || _n(En) === 39) {
          On = Yr.Function, En = Wn + 4;
          return;
        }
        In();
        return;
      }
      if (_n(En) === 40) {
        On = Yr.Function, En++;
        return;
      }
      On = Yr.Ident;
    }
    function Pn(Wn) {
      for (Wn || (Wn = _n(En++)), On = Yr.String; En < bn.length; En++) {
        var Fn = bn.charCodeAt(En);
        switch (sn(Fn)) {
          // ending code point
          case Wn:
            En++;
            return;
          // EOF
          case sn.Eof:
            return;
          // newline
          case sn.WhiteSpace:
            if (Kr(Fn)) {
              En += pn(bn, En, Fn), On = Yr.BadString;
              return;
            }
            break;
          // U+005C REVERSE SOLIDUS (\)
          case 92:
            if (En === bn.length - 1)
              break;
            var Qn = _n(En + 1);
            Kr(Qn) ? En += pn(bn, En + 1, Qn) : en(Fn, Qn) && (En = vn(bn, En) - 1);
            break;
        }
      }
    }
    function In() {
      for (On = Yr.Url, En = mn(bn, En); En < bn.length; En++) {
        var Wn = bn.charCodeAt(En);
        switch (sn(Wn)) {
          // U+0029 RIGHT PARENTHESIS ())
          case 41:
            En++;
            return;
          // EOF
          case sn.Eof:
            return;
          // whitespace
          case sn.WhiteSpace:
            if (En = mn(bn, En), _n(En) === 41 || En >= bn.length) {
              En < bn.length && En++;
              return;
            }
            En = un(bn, En), On = Yr.BadUrl;
            return;
          // U+0022 QUOTATION MARK (")
          // U+0027 APOSTROPHE (')
          // U+0028 LEFT PARENTHESIS (()
          // non-printable code point
          case 34:
          case 39:
          case 40:
          case sn.NonPrintable:
            En = un(bn, En), On = Yr.BadUrl;
            return;
          // U+005C REVERSE SOLIDUS (\)
          case 92:
            if (en(Wn, _n(En + 1))) {
              En = vn(bn, En) - 1;
              break;
            }
            En = un(bn, En), On = Yr.BadUrl;
            return;
        }
      }
    }
    Sn || (Sn = new Gr()), bn = String(bn || "");
    for (var Mn = bn.length, Nn = ze(Sn.offsetAndType, Mn + 1), Gn = ze(Sn.balance, Mn + 1), Un = 0, Hn = on(_n(0)), En = Hn, Yn = 0, Xn = 0, ni = 0; En < Mn; ) {
      var Rn = bn.charCodeAt(En), On = 0;
      switch (Gn[Un] = Mn, sn(Rn)) {
        // whitespace
        case sn.WhiteSpace:
          On = Yr.WhiteSpace, En = mn(bn, En + 1);
          break;
        // U+0022 QUOTATION MARK (")
        case 34:
          Pn();
          break;
        // U+0023 NUMBER SIGN (#)
        case 35:
          Zr(_n(En + 1)) || en(_n(En + 1), _n(En + 2)) ? (On = Yr.Hash, En = xn(bn, En + 1)) : (On = Yr.Delim, En++);
          break;
        // U+0027 APOSTROPHE (')
        case 39:
          Pn();
          break;
        // U+0028 LEFT PARENTHESIS (()
        case 40:
          On = Yr.LeftParenthesis, En++;
          break;
        // U+0029 RIGHT PARENTHESIS ())
        case 41:
          On = Yr.RightParenthesis, En++;
          break;
        // U+002B PLUS SIGN (+)
        case 43:
          tn(Rn, _n(En + 1), _n(En + 2)) ? Tn() : (On = Yr.Delim, En++);
          break;
        // U+002C COMMA (,)
        case 44:
          On = Yr.Comma, En++;
          break;
        // U+002D HYPHEN-MINUS (-)
        case 45:
          tn(Rn, _n(En + 1), _n(En + 2)) ? Tn() : _n(En + 1) === 45 && _n(En + 2) === 62 ? (On = Yr.CDC, En = En + 3) : rn(Rn, _n(En + 1), _n(En + 2)) ? Ln() : (On = Yr.Delim, En++);
          break;
        // U+002E FULL STOP (.)
        case 46:
          tn(Rn, _n(En + 1), _n(En + 2)) ? Tn() : (On = Yr.Delim, En++);
          break;
        // U+002F SOLIDUS (/)
        case 47:
          _n(En + 1) === 42 ? (On = Yr.Comment, En = bn.indexOf("*/", En + 2) + 2, En === 1 && (En = bn.length)) : (On = Yr.Delim, En++);
          break;
        // U+003A COLON (:)
        case 58:
          On = Yr.Colon, En++;
          break;
        // U+003B SEMICOLON (;)
        case 59:
          On = Yr.Semicolon, En++;
          break;
        // U+003C LESS-THAN SIGN (<)
        case 60:
          _n(En + 1) === 33 && _n(En + 2) === 45 && _n(En + 3) === 45 ? (On = Yr.CDO, En = En + 4) : (On = Yr.Delim, En++);
          break;
        // U+0040 COMMERCIAL AT (@)
        case 64:
          rn(_n(En + 1), _n(En + 2), _n(En + 3)) ? (On = Yr.AtKeyword, En = xn(bn, En + 1)) : (On = Yr.Delim, En++);
          break;
        // U+005B LEFT SQUARE BRACKET ([)
        case 91:
          On = Yr.LeftSquareBracket, En++;
          break;
        // U+005C REVERSE SOLIDUS (\)
        case 92:
          en(Rn, _n(En + 1)) ? Ln() : (On = Yr.Delim, En++);
          break;
        // U+005D RIGHT SQUARE BRACKET (])
        case 93:
          On = Yr.RightSquareBracket, En++;
          break;
        // U+007B LEFT CURLY BRACKET ({)
        case 123:
          On = Yr.LeftCurlyBracket, En++;
          break;
        // U+007D RIGHT CURLY BRACKET (})
        case 125:
          On = Yr.RightCurlyBracket, En++;
          break;
        // digit
        case sn.Digit:
          Tn();
          break;
        // name-start code point
        case sn.NameStart:
          Ln();
          break;
        // EOF
        case sn.Eof:
          break;
        // anything else
        default:
          On = Yr.Delim, En++;
      }
      switch (On) {
        case Yn:
          for (ni = Xn & fn, Xn = Gn[ni], Yn = Xn >> cn, Gn[Un] = ni, Gn[ni++] = Un; ni < Un; ni++)
            Gn[ni] === Mn && (Gn[ni] = Un);
          break;
        case Yr.LeftParenthesis:
        case Yr.Function:
          Gn[Un] = Xn, Yn = Yr.RightParenthesis, Xn = Yn << cn | Un;
          break;
        case Yr.LeftSquareBracket:
          Gn[Un] = Xn, Yn = Yr.RightSquareBracket, Xn = Yn << cn | Un;
          break;
        case Yr.LeftCurlyBracket:
          Gn[Un] = Xn, Yn = Yr.RightCurlyBracket, Xn = Yn << cn | Un;
          break;
      }
      Nn[Un++] = On << cn | En;
    }
    for (Nn[Un] = Yr.EOF << cn | En, Gn[Un] = Mn, Gn[Mn] = Mn; Xn !== 0; )
      ni = Xn & fn, Xn = Gn[ni], Gn[ni] = Mn;
    return Sn.source = bn, Sn.firstCharOffset = Hn, Sn.offsetAndType = Nn, Sn.tokenCount = Un, Sn.balance = Gn, Sn.reset(), Sn.next(), Sn;
  }
  return Object.keys(Wr).forEach(function(bn) {
    Cn[bn] = Wr[bn];
  }), Object.keys(Qr).forEach(function(bn) {
    Cn[bn] = Qr[bn];
  }), Object.keys(an).forEach(function(bn) {
    Cn[bn] = an[bn];
  }), tokenizer$1 = Cn, tokenizer$1;
}
var genericAnPlusB, hasRequiredGenericAnPlusB;
function requireGenericAnPlusB() {
  if (hasRequiredGenericAnPlusB) return genericAnPlusB;
  hasRequiredGenericAnPlusB = 1;
  var Gr = requireTokenizer$1().isDigit, ze = requireTokenizer$1().cmpChar, Wr = requireTokenizer$1().TYPE, Yr = Wr.Delim, Qr = Wr.WhiteSpace, Kr = Wr.Comment, Zr = Wr.Ident, en = Wr.Number, tn = Wr.Dimension, rn = 43, sn = 45, on = 110, an = !0, dn = !1;
  function pn(gn, un) {
    return gn !== null && gn.type === Yr && gn.value.charCodeAt(0) === un;
  }
  function mn(gn, un, fn) {
    for (; gn !== null && (gn.type === Qr || gn.type === Kr); )
      gn = fn(++un);
    return un;
  }
  function vn(gn, un, fn, cn) {
    if (!gn)
      return 0;
    var Cn = gn.value.charCodeAt(un);
    if (Cn === rn || Cn === sn) {
      if (fn)
        return 0;
      un++;
    }
    for (; un < gn.value.length; un++)
      if (!Gr(gn.value.charCodeAt(un)))
        return 0;
    return cn + 1;
  }
  function xn(gn, un, fn) {
    var cn = !1, Cn = mn(gn, un, fn);
    if (gn = fn(Cn), gn === null)
      return un;
    if (gn.type !== en)
      if (pn(gn, rn) || pn(gn, sn)) {
        if (cn = !0, Cn = mn(fn(++Cn), Cn, fn), gn = fn(Cn), gn === null && gn.type !== en)
          return 0;
      } else
        return un;
    if (!cn) {
      var bn = gn.value.charCodeAt(0);
      if (bn !== rn && bn !== sn)
        return 0;
    }
    return vn(gn, cn ? 0 : 1, cn, Cn);
  }
  return genericAnPlusB = function(un, fn) {
    var cn = 0;
    if (!un)
      return 0;
    if (un.type === en)
      return vn(un, 0, dn, cn);
    if (un.type === Zr && un.value.charCodeAt(0) === sn) {
      if (!ze(un.value, 1, on))
        return 0;
      switch (un.value.length) {
        // -n
        // -n <signed-integer>
        // -n ['+' | '-'] <signless-integer>
        case 2:
          return xn(fn(++cn), cn, fn);
        // -n- <signless-integer>
        case 3:
          return un.value.charCodeAt(2) !== sn ? 0 : (cn = mn(fn(++cn), cn, fn), un = fn(cn), vn(un, 0, an, cn));
        // <dashndashdigit-ident>
        default:
          return un.value.charCodeAt(2) !== sn ? 0 : vn(un, 3, an, cn);
      }
    } else if (un.type === Zr || pn(un, rn) && fn(cn + 1).type === Zr) {
      if (un.type !== Zr && (un = fn(++cn)), un === null || !ze(un.value, 0, on))
        return 0;
      switch (un.value.length) {
        // '+'? n
        // '+'? n <signed-integer>
        // '+'? n ['+' | '-'] <signless-integer>
        case 1:
          return xn(fn(++cn), cn, fn);
        // '+'? n- <signless-integer>
        case 2:
          return un.value.charCodeAt(1) !== sn ? 0 : (cn = mn(fn(++cn), cn, fn), un = fn(cn), vn(un, 0, an, cn));
        // '+'? <ndashdigit-ident>
        default:
          return un.value.charCodeAt(1) !== sn ? 0 : vn(un, 2, an, cn);
      }
    } else if (un.type === tn) {
      for (var Cn = un.value.charCodeAt(0), bn = Cn === rn || Cn === sn ? 1 : 0, Sn = bn; Sn < un.value.length && Gr(un.value.charCodeAt(Sn)); Sn++)
        ;
      return Sn === bn || !ze(un.value, Sn, on) ? 0 : Sn + 1 === un.value.length ? xn(fn(++cn), cn, fn) : un.value.charCodeAt(Sn + 1) !== sn ? 0 : Sn + 2 === un.value.length ? (cn = mn(fn(++cn), cn, fn), un = fn(cn), vn(un, 0, an, cn)) : vn(un, Sn + 2, an, cn);
    }
    return 0;
  }, genericAnPlusB;
}
var genericUrange, hasRequiredGenericUrange;
function requireGenericUrange() {
  if (hasRequiredGenericUrange) return genericUrange;
  hasRequiredGenericUrange = 1;
  var Gr = requireTokenizer$1().isHexDigit, ze = requireTokenizer$1().cmpChar, Wr = requireTokenizer$1().TYPE, Yr = Wr.Ident, Qr = Wr.Delim, Kr = Wr.Number, Zr = Wr.Dimension, en = 43, tn = 45, rn = 63, sn = 117;
  function on(mn, vn) {
    return mn !== null && mn.type === Qr && mn.value.charCodeAt(0) === vn;
  }
  function an(mn, vn) {
    return mn.value.charCodeAt(0) === vn;
  }
  function dn(mn, vn, xn) {
    for (var gn = vn, un = 0; gn < mn.value.length; gn++) {
      var fn = mn.value.charCodeAt(gn);
      if (fn === tn && xn && un !== 0)
        return dn(mn, vn + un + 1, !1) > 0 ? 6 : 0;
      if (!Gr(fn) || ++un > 6)
        return 0;
    }
    return un;
  }
  function pn(mn, vn, xn) {
    if (!mn)
      return 0;
    for (; on(xn(vn), rn); ) {
      if (++mn > 6)
        return 0;
      vn++;
    }
    return vn;
  }
  return genericUrange = function(vn, xn) {
    var gn = 0;
    if (vn === null || vn.type !== Yr || !ze(vn.value, 0, sn) || (vn = xn(++gn), vn === null))
      return 0;
    if (on(vn, en))
      return vn = xn(++gn), vn === null ? 0 : vn.type === Yr ? pn(dn(vn, 0, !0), ++gn, xn) : on(vn, rn) ? pn(1, ++gn, xn) : 0;
    if (vn.type === Kr) {
      if (!an(vn, en))
        return 0;
      var un = dn(vn, 1, !0);
      return un === 0 ? 0 : (vn = xn(++gn), vn === null ? gn : vn.type === Zr || vn.type === Kr ? !an(vn, tn) || !dn(vn, 1, !1) ? 0 : gn + 1 : pn(un, gn, xn));
    }
    return vn.type === Zr && an(vn, en) ? pn(dn(vn, 1, !0), ++gn, xn) : 0;
  }, genericUrange;
}
var generic, hasRequiredGeneric;
function requireGeneric() {
  if (hasRequiredGeneric) return generic;
  hasRequiredGeneric = 1;
  var Gr = requireTokenizer$1(), ze = Gr.isIdentifierStart, Wr = Gr.isHexDigit, Yr = Gr.isDigit, Qr = Gr.cmpStr, Kr = Gr.consumeNumber, Zr = Gr.TYPE, en = requireGenericAnPlusB(), tn = requireGenericUrange(), rn = ["unset", "initial", "inherit"], sn = ["calc(", "-moz-calc(", "-webkit-calc("], on = {
    // absolute length units
    px: !0,
    mm: !0,
    cm: !0,
    in: !0,
    pt: !0,
    pc: !0,
    q: !0,
    // relative length units
    em: !0,
    ex: !0,
    ch: !0,
    rem: !0,
    // viewport-percentage lengths
    vh: !0,
    vw: !0,
    vmin: !0,
    vmax: !0,
    vm: !0
  }, an = {
    deg: !0,
    grad: !0,
    rad: !0,
    turn: !0
  }, dn = {
    s: !0,
    ms: !0
  }, pn = {
    hz: !0,
    khz: !0
  }, mn = {
    dpi: !0,
    dpcm: !0,
    dppx: !0,
    x: !0
    // https://github.com/w3c/csswg-drafts/issues/461
  }, vn = {
    fr: !0
  }, xn = {
    db: !0
  }, gn = {
    st: !0
  };
  function un(Rn, On) {
    return On < Rn.length ? Rn.charCodeAt(On) : 0;
  }
  function fn(Rn, On) {
    return Qr(Rn, 0, Rn.length, On);
  }
  function cn(Rn, On) {
    for (var Wn = 0; Wn < On.length; Wn++)
      if (fn(Rn, On[Wn]))
        return !0;
    return !1;
  }
  function Cn(Rn, On) {
    return On !== Rn.length - 2 ? !1 : Rn.charCodeAt(On) === 92 && // U+005C REVERSE SOLIDUS (\)
    Yr(Rn.charCodeAt(On + 1));
  }
  function bn(Rn, On, Wn) {
    if (Rn && Rn.type === "Range") {
      var Fn = Number(
        Wn !== void 0 && Wn !== On.length ? On.substr(0, Wn) : On
      );
      if (isNaN(Fn) || Rn.min !== null && Fn < Rn.min || Rn.max !== null && Fn > Rn.max)
        return !0;
    }
    return !1;
  }
  function Sn(Rn, On) {
    var Wn = Rn.index, Fn = 0;
    do
      if (Fn++, Rn.balance <= Wn)
        break;
    while (Rn = On(Fn));
    return Fn;
  }
  function _n(Rn) {
    return function(On, Wn, Fn) {
      return On === null ? 0 : On.type === Zr.Function && cn(On.value, sn) ? Sn(On, Wn) : Rn(On, Wn, Fn);
    };
  }
  function Tn(Rn) {
    return function(On) {
      return On === null || On.type !== Rn ? 0 : 1;
    };
  }
  function Ln(Rn) {
    return Rn = Rn + "(", function(On, Wn) {
      return On !== null && fn(On.value, Rn) ? Sn(On, Wn) : 0;
    };
  }
  function Pn(Rn) {
    if (Rn === null || Rn.type !== Zr.Ident)
      return 0;
    var On = Rn.value.toLowerCase();
    return cn(On, rn) || fn(On, "default") ? 0 : 1;
  }
  function In(Rn) {
    return Rn === null || Rn.type !== Zr.Ident || un(Rn.value, 0) !== 45 || un(Rn.value, 1) !== 45 ? 0 : 1;
  }
  function Mn(Rn) {
    if (Rn === null || Rn.type !== Zr.Hash)
      return 0;
    var On = Rn.value.length;
    if (On !== 4 && On !== 5 && On !== 7 && On !== 9)
      return 0;
    for (var Wn = 1; Wn < On; Wn++)
      if (!Wr(Rn.value.charCodeAt(Wn)))
        return 0;
    return 1;
  }
  function Nn(Rn) {
    return Rn === null || Rn.type !== Zr.Hash || !ze(un(Rn.value, 1), un(Rn.value, 2), un(Rn.value, 3)) ? 0 : 1;
  }
  function Gn(Rn, On) {
    if (!Rn)
      return 0;
    var Wn = 0, Fn = 0, Qn = Rn.index;
    e:
      do {
        switch (Rn.type) {
          // ... does not contain <bad-string-token>, <bad-url-token>,
          case Zr.BadString:
          case Zr.BadUrl:
            break e;
          // ... unmatched <)-token>, <]-token>, or <}-token>,
          case Zr.RightCurlyBracket:
          case Zr.RightParenthesis:
          case Zr.RightSquareBracket:
            if (Rn.balance > Rn.index || Rn.balance < Qn)
              break e;
            Fn--;
            break;
          // ... or top-level <semicolon-token> tokens
          case Zr.Semicolon:
            if (Fn === 0)
              break e;
            break;
          // ... or <delim-token> tokens with a value of "!"
          case Zr.Delim:
            if (Rn.value === "!" && Fn === 0)
              break e;
            break;
          case Zr.Function:
          case Zr.LeftParenthesis:
          case Zr.LeftSquareBracket:
          case Zr.LeftCurlyBracket:
            Fn++;
            break;
        }
        if (Wn++, Rn.balance <= Qn)
          break;
      } while (Rn = On(Wn));
    return Wn;
  }
  function Un(Rn, On) {
    if (!Rn)
      return 0;
    var Wn = Rn.index, Fn = 0;
    e:
      do {
        switch (Rn.type) {
          // ... does not contain <bad-string-token>, <bad-url-token>,
          case Zr.BadString:
          case Zr.BadUrl:
            break e;
          // ... unmatched <)-token>, <]-token>, or <}-token>,
          case Zr.RightCurlyBracket:
          case Zr.RightParenthesis:
          case Zr.RightSquareBracket:
            if (Rn.balance > Rn.index || Rn.balance < Wn)
              break e;
            break;
        }
        if (Fn++, Rn.balance <= Wn)
          break;
      } while (Rn = On(Fn));
    return Fn;
  }
  function Hn(Rn) {
    return function(On, Wn, Fn) {
      if (On === null || On.type !== Zr.Dimension)
        return 0;
      var Qn = Kr(On.value, 0);
      if (Rn !== null) {
        var pi = On.value.indexOf("\\", Qn), ui = pi === -1 || !Cn(On.value, pi) ? On.value.substr(Qn) : On.value.substring(Qn, pi);
        if (Rn.hasOwnProperty(ui.toLowerCase()) === !1)
          return 0;
      }
      return bn(Fn, On.value, Qn) ? 0 : 1;
    };
  }
  function En(Rn, On, Wn) {
    return Rn === null || Rn.type !== Zr.Percentage || bn(Wn, Rn.value, Rn.value.length - 1) ? 0 : 1;
  }
  function Yn(Rn) {
    return typeof Rn != "function" && (Rn = function() {
      return 0;
    }), function(On, Wn, Fn) {
      return On !== null && On.type === Zr.Number && Number(On.value) === 0 ? 1 : Rn(On, Wn, Fn);
    };
  }
  function Xn(Rn, On, Wn) {
    if (Rn === null)
      return 0;
    var Fn = Kr(Rn.value, 0), Qn = Fn === Rn.value.length;
    return !Qn && !Cn(Rn.value, Fn) || bn(Wn, Rn.value, Fn) ? 0 : 1;
  }
  function ni(Rn, On, Wn) {
    if (Rn === null || Rn.type !== Zr.Number)
      return 0;
    for (var Fn = Rn.value.charCodeAt(0) === 43 || // U+002B PLUS SIGN (+)
    Rn.value.charCodeAt(0) === 45 ? 1 : 0; Fn < Rn.value.length; Fn++)
      if (!Yr(Rn.value.charCodeAt(Fn)))
        return 0;
    return bn(Wn, Rn.value, Fn) ? 0 : 1;
  }
  return generic = {
    // token types
    "ident-token": Tn(Zr.Ident),
    "function-token": Tn(Zr.Function),
    "at-keyword-token": Tn(Zr.AtKeyword),
    "hash-token": Tn(Zr.Hash),
    "string-token": Tn(Zr.String),
    "bad-string-token": Tn(Zr.BadString),
    "url-token": Tn(Zr.Url),
    "bad-url-token": Tn(Zr.BadUrl),
    "delim-token": Tn(Zr.Delim),
    "number-token": Tn(Zr.Number),
    "percentage-token": Tn(Zr.Percentage),
    "dimension-token": Tn(Zr.Dimension),
    "whitespace-token": Tn(Zr.WhiteSpace),
    "CDO-token": Tn(Zr.CDO),
    "CDC-token": Tn(Zr.CDC),
    "colon-token": Tn(Zr.Colon),
    "semicolon-token": Tn(Zr.Semicolon),
    "comma-token": Tn(Zr.Comma),
    "[-token": Tn(Zr.LeftSquareBracket),
    "]-token": Tn(Zr.RightSquareBracket),
    "(-token": Tn(Zr.LeftParenthesis),
    ")-token": Tn(Zr.RightParenthesis),
    "{-token": Tn(Zr.LeftCurlyBracket),
    "}-token": Tn(Zr.RightCurlyBracket),
    // token type aliases
    string: Tn(Zr.String),
    ident: Tn(Zr.Ident),
    // complex types
    "custom-ident": Pn,
    "custom-property-name": In,
    "hex-color": Mn,
    "id-selector": Nn,
    // element( <id-selector> )
    "an-plus-b": en,
    urange: tn,
    "declaration-value": Gn,
    "any-value": Un,
    // dimensions
    dimension: _n(Hn(null)),
    angle: _n(Hn(an)),
    decibel: _n(Hn(xn)),
    frequency: _n(Hn(pn)),
    flex: _n(Hn(vn)),
    length: _n(Yn(Hn(on))),
    resolution: _n(Hn(mn)),
    semitones: _n(Hn(gn)),
    time: _n(Hn(dn)),
    // percentage
    percentage: _n(En),
    // numeric
    zero: Yn(),
    number: _n(Xn),
    integer: _n(ni),
    // old IE stuff
    "-ms-legacy-expression": Ln("expression")
  }, generic;
}
var _SyntaxError, hasRequired_SyntaxError;
function require_SyntaxError() {
  if (hasRequired_SyntaxError) return _SyntaxError;
  hasRequired_SyntaxError = 1;
  var Gr = requireCreateCustomError();
  return _SyntaxError = function(Wr, Yr, Qr) {
    var Kr = Gr("SyntaxError", Wr);
    return Kr.input = Yr, Kr.offset = Qr, Kr.rawMessage = Wr, Kr.message = Kr.rawMessage + `
  ` + Kr.input + `
--` + new Array((Kr.offset || Kr.input.length) + 1).join("-") + "^", Kr;
  }, _SyntaxError;
}
var tokenizer, hasRequiredTokenizer;
function requireTokenizer() {
  if (hasRequiredTokenizer) return tokenizer;
  hasRequiredTokenizer = 1;
  var Gr = require_SyntaxError(), ze = 9, Wr = 10, Yr = 12, Qr = 13, Kr = 32, Zr = function(en) {
    this.str = en, this.pos = 0;
  };
  return Zr.prototype = {
    charCodeAt: function(en) {
      return en < this.str.length ? this.str.charCodeAt(en) : 0;
    },
    charCode: function() {
      return this.charCodeAt(this.pos);
    },
    nextCharCode: function() {
      return this.charCodeAt(this.pos + 1);
    },
    nextNonWsCode: function(en) {
      return this.charCodeAt(this.findWsEnd(en));
    },
    findWsEnd: function(en) {
      for (; en < this.str.length; en++) {
        var tn = this.str.charCodeAt(en);
        if (tn !== Qr && tn !== Wr && tn !== Yr && tn !== Kr && tn !== ze)
          break;
      }
      return en;
    },
    substringToPos: function(en) {
      return this.str.substring(this.pos, this.pos = en);
    },
    eat: function(en) {
      this.charCode() !== en && this.error("Expect `" + String.fromCharCode(en) + "`"), this.pos++;
    },
    peek: function() {
      return this.pos < this.str.length ? this.str.charAt(this.pos++) : "";
    },
    error: function(en) {
      throw new Gr(en, this.str, this.pos);
    }
  }, tokenizer = Zr, tokenizer;
}
var parse_1, hasRequiredParse;
function requireParse() {
  if (hasRequiredParse) return parse_1;
  hasRequiredParse = 1;
  var Gr = requireTokenizer(), ze = 9, Wr = 10, Yr = 12, Qr = 13, Kr = 32, Zr = 33, en = 35, tn = 38, rn = 39, sn = 40, on = 41, an = 42, dn = 43, pn = 44, mn = 45, vn = 60, xn = 62, gn = 63, un = 64, fn = 91, cn = 93, Cn = 123, bn = 124, Sn = 125, _n = 8734, Tn = Pn(function(qn) {
    return /[a-zA-Z0-9\-]/.test(qn);
  }), Ln = {
    " ": 1,
    "&&": 2,
    "||": 3,
    "|": 4
  };
  function Pn(qn) {
    for (var jn = typeof Uint32Array == "function" ? new Uint32Array(128) : new Array(128), $n = 0; $n < 128; $n++)
      jn[$n] = qn(String.fromCharCode($n)) ? 1 : 0;
    return jn;
  }
  function In(qn) {
    return qn.substringToPos(
      qn.findWsEnd(qn.pos)
    );
  }
  function Mn(qn) {
    for (var jn = qn.pos; jn < qn.str.length; jn++) {
      var $n = qn.str.charCodeAt(jn);
      if ($n >= 128 || Tn[$n] === 0)
        break;
    }
    return qn.pos === jn && qn.error("Expect a keyword"), qn.substringToPos(jn);
  }
  function Nn(qn) {
    for (var jn = qn.pos; jn < qn.str.length; jn++) {
      var $n = qn.str.charCodeAt(jn);
      if ($n < 48 || $n > 57)
        break;
    }
    return qn.pos === jn && qn.error("Expect a number"), qn.substringToPos(jn);
  }
  function Gn(qn) {
    var jn = qn.str.indexOf("'", qn.pos + 1);
    return jn === -1 && (qn.pos = qn.str.length, qn.error("Expect an apostrophe")), qn.substringToPos(jn + 1);
  }
  function Un(qn) {
    var jn = null, $n = null;
    return qn.eat(Cn), jn = Nn(qn), qn.charCode() === pn ? (qn.pos++, qn.charCode() !== Sn && ($n = Nn(qn))) : $n = jn, qn.eat(Sn), {
      min: Number(jn),
      max: $n ? Number($n) : 0
    };
  }
  function Hn(qn) {
    var jn = null, $n = !1;
    switch (qn.charCode()) {
      case an:
        qn.pos++, jn = {
          min: 0,
          max: 0
        };
        break;
      case dn:
        qn.pos++, jn = {
          min: 1,
          max: 0
        };
        break;
      case gn:
        qn.pos++, jn = {
          min: 0,
          max: 1
        };
        break;
      case en:
        qn.pos++, $n = !0, qn.charCode() === Cn ? jn = Un(qn) : jn = {
          min: 1,
          max: 0
        };
        break;
      case Cn:
        jn = Un(qn);
        break;
      default:
        return null;
    }
    return {
      type: "Multiplier",
      comma: $n,
      min: jn.min,
      max: jn.max,
      term: null
    };
  }
  function En(qn, jn) {
    var $n = Hn(qn);
    return $n !== null ? ($n.term = jn, $n) : jn;
  }
  function Yn(qn) {
    var jn = qn.peek();
    return jn === "" ? null : {
      type: "Token",
      value: jn
    };
  }
  function Xn(qn) {
    var jn;
    return qn.eat(vn), qn.eat(rn), jn = Mn(qn), qn.eat(rn), qn.eat(xn), En(qn, {
      type: "Property",
      name: jn
    });
  }
  function ni(qn) {
    var jn = null, $n = null, Kn = 1;
    return qn.eat(fn), qn.charCode() === mn && (qn.peek(), Kn = -1), Kn == -1 && qn.charCode() === _n ? qn.peek() : jn = Kn * Number(Nn(qn)), In(qn), qn.eat(pn), In(qn), qn.charCode() === _n ? qn.peek() : (Kn = 1, qn.charCode() === mn && (qn.peek(), Kn = -1), $n = Kn * Number(Nn(qn))), qn.eat(cn), jn === null && $n === null ? null : {
      type: "Range",
      min: jn,
      max: $n
    };
  }
  function Rn(qn) {
    var jn, $n = null;
    return qn.eat(vn), jn = Mn(qn), qn.charCode() === sn && qn.nextCharCode() === on && (qn.pos += 2, jn += "()"), qn.charCodeAt(qn.findWsEnd(qn.pos)) === fn && (In(qn), $n = ni(qn)), qn.eat(xn), En(qn, {
      type: "Type",
      name: jn,
      opts: $n
    });
  }
  function On(qn) {
    var jn;
    return jn = Mn(qn), qn.charCode() === sn ? (qn.pos++, {
      type: "Function",
      name: jn
    }) : En(qn, {
      type: "Keyword",
      name: jn
    });
  }
  function Wn(qn, jn) {
    function $n(oi, ii) {
      return {
        type: "Group",
        terms: oi,
        combinator: ii,
        disallowEmpty: !1,
        explicit: !1
      };
    }
    for (jn = Object.keys(jn).sort(function(oi, ii) {
      return Ln[oi] - Ln[ii];
    }); jn.length > 0; ) {
      for (var Kn = jn.shift(), Jn = 0, ei = 0; Jn < qn.length; Jn++) {
        var ri = qn[Jn];
        ri.type === "Combinator" && (ri.value === Kn ? (ei === -1 && (ei = Jn - 1), qn.splice(Jn, 1), Jn--) : (ei !== -1 && Jn - ei > 1 && (qn.splice(
          ei,
          Jn - ei,
          $n(qn.slice(ei, Jn), Kn)
        ), Jn = ei + 1), ei = -1));
      }
      ei !== -1 && jn.length && qn.splice(
        ei,
        Jn - ei,
        $n(qn.slice(ei, Jn), Kn)
      );
    }
    return Kn;
  }
  function Fn(qn) {
    for (var jn = [], $n = {}, Kn, Jn = null, ei = qn.pos; Kn = pi(qn); )
      Kn.type !== "Spaces" && (Kn.type === "Combinator" ? ((Jn === null || Jn.type === "Combinator") && (qn.pos = ei, qn.error("Unexpected combinator")), $n[Kn.value] = !0) : Jn !== null && Jn.type !== "Combinator" && ($n[" "] = !0, jn.push({
        type: "Combinator",
        value: " "
      })), jn.push(Kn), Jn = Kn, ei = qn.pos);
    return Jn !== null && Jn.type === "Combinator" && (qn.pos -= ei, qn.error("Unexpected combinator")), {
      type: "Group",
      terms: jn,
      combinator: Wn(jn, $n) || " ",
      disallowEmpty: !1,
      explicit: !1
    };
  }
  function Qn(qn) {
    var jn;
    return qn.eat(fn), jn = Fn(qn), qn.eat(cn), jn.explicit = !0, qn.charCode() === Zr && (qn.pos++, jn.disallowEmpty = !0), jn;
  }
  function pi(qn) {
    var jn = qn.charCode();
    if (jn < 128 && Tn[jn] === 1)
      return On(qn);
    switch (jn) {
      case cn:
        break;
      case fn:
        return En(qn, Qn(qn));
      case vn:
        return qn.nextCharCode() === rn ? Xn(qn) : Rn(qn);
      case bn:
        return {
          type: "Combinator",
          value: qn.substringToPos(
            qn.nextCharCode() === bn ? qn.pos + 2 : qn.pos + 1
          )
        };
      case tn:
        return qn.pos++, qn.eat(tn), {
          type: "Combinator",
          value: "&&"
        };
      case pn:
        return qn.pos++, {
          type: "Comma"
        };
      case rn:
        return En(qn, {
          type: "String",
          value: Gn(qn)
        });
      case Kr:
      case ze:
      case Wr:
      case Qr:
      case Yr:
        return {
          type: "Spaces",
          value: In(qn)
        };
      case un:
        return jn = qn.nextCharCode(), jn < 128 && Tn[jn] === 1 ? (qn.pos++, {
          type: "AtKeyword",
          name: Mn(qn)
        }) : Yn(qn);
      case an:
      case dn:
      case gn:
      case en:
      case Zr:
        break;
      case Cn:
        if (jn = qn.nextCharCode(), jn < 48 || jn > 57)
          return Yn(qn);
        break;
      default:
        return Yn(qn);
    }
  }
  function ui(qn) {
    var jn = new Gr(qn), $n = Fn(jn);
    return jn.pos !== qn.length && jn.error("Unexpected input"), $n.terms.length === 1 && $n.terms[0].type === "Group" && ($n = $n.terms[0]), $n;
  }
  return ui("[a&&<b>#|<'c'>*||e() f{2} /,(% g#{1,2} h{2,})]!"), parse_1 = ui, parse_1;
}
var walk, hasRequiredWalk;
function requireWalk() {
  if (hasRequiredWalk) return walk;
  hasRequiredWalk = 1;
  var Gr = function() {
  };
  function ze(Wr) {
    return typeof Wr == "function" ? Wr : Gr;
  }
  return walk = function(Wr, Yr, Qr) {
    function Kr(tn) {
      switch (Zr.call(Qr, tn), tn.type) {
        case "Group":
          tn.terms.forEach(Kr);
          break;
        case "Multiplier":
          Kr(tn.term);
          break;
        case "Type":
        case "Property":
        case "Keyword":
        case "AtKeyword":
        case "Function":
        case "String":
        case "Token":
        case "Comma":
          break;
        default:
          throw new Error("Unknown type: " + tn.type);
      }
      en.call(Qr, tn);
    }
    var Zr = Gr, en = Gr;
    if (typeof Yr == "function" ? Zr = Yr : Yr && (Zr = ze(Yr.enter), en = ze(Yr.leave)), Zr === Gr && en === Gr)
      throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function");
    Kr(Wr);
  }, walk;
}
var prepareTokens_1, hasRequiredPrepareTokens;
function requirePrepareTokens() {
  if (hasRequiredPrepareTokens) return prepareTokens_1;
  hasRequiredPrepareTokens = 1;
  var Gr = requireTokenizer$1(), ze = requireTokenStream(), Wr = new ze(), Yr = {
    decorator: function(Kr) {
      var Zr = null, en = { len: 0, node: null }, tn = [en], rn = "";
      return {
        children: Kr.children,
        node: function(sn) {
          var on = Zr;
          Zr = sn, Kr.node.call(this, sn), Zr = on;
        },
        chunk: function(sn) {
          rn += sn, en.node !== Zr ? tn.push({
            len: sn.length,
            node: Zr
          }) : en.len += sn.length;
        },
        result: function() {
          return Qr(rn, tn);
        }
      };
    }
  };
  function Qr(Kr, Zr) {
    var en = [], tn = 0, rn = 0, sn = Zr ? Zr[rn].node : null;
    for (Gr(Kr, Wr); !Wr.eof; ) {
      if (Zr)
        for (; rn < Zr.length && tn + Zr[rn].len <= Wr.tokenStart; )
          tn += Zr[rn++].len, sn = Zr[rn].node;
      en.push({
        type: Wr.tokenType,
        value: Wr.getTokenValue(),
        index: Wr.tokenIndex,
        // TODO: remove it, temporary solution
        balance: Wr.balance[Wr.tokenIndex],
        // TODO: remove it, temporary solution
        node: sn
      }), Wr.next();
    }
    return en;
  }
  return prepareTokens_1 = function(Kr, Zr) {
    return typeof Kr == "string" ? Qr(Kr, null) : Zr.generate(Kr, Yr);
  }, prepareTokens_1;
}
var matchGraph, hasRequiredMatchGraph;
function requireMatchGraph() {
  if (hasRequiredMatchGraph) return matchGraph;
  hasRequiredMatchGraph = 1;
  var Gr = requireParse(), ze = { type: "Match" }, Wr = { type: "Mismatch" }, Yr = { type: "DisallowEmpty" }, Qr = 40, Kr = 41;
  function Zr(an, dn, pn) {
    return dn === ze && pn === Wr || an === ze && dn === ze && pn === ze ? an : (an.type === "If" && an.else === Wr && dn === ze && (dn = an.then, an = an.match), {
      type: "If",
      match: an,
      then: dn,
      else: pn
    });
  }
  function en(an) {
    return an.length > 2 && an.charCodeAt(an.length - 2) === Qr && an.charCodeAt(an.length - 1) === Kr;
  }
  function tn(an) {
    return an.type === "Keyword" || an.type === "AtKeyword" || an.type === "Function" || an.type === "Type" && en(an.name);
  }
  function rn(an, dn, pn) {
    switch (an) {
      case " ":
        for (var fn = ze, mn = dn.length - 1; mn >= 0; mn--) {
          var vn = dn[mn];
          fn = Zr(
            vn,
            fn,
            Wr
          );
        }
        return fn;
      case "|":
        for (var fn = Wr, xn = null, mn = dn.length - 1; mn >= 0; mn--) {
          var vn = dn[mn];
          if (tn(vn) && (xn === null && mn > 0 && tn(dn[mn - 1]) && (xn = /* @__PURE__ */ Object.create(null), fn = Zr(
            {
              type: "Enum",
              map: xn
            },
            ze,
            fn
          )), xn !== null)) {
            var gn = (en(vn.name) ? vn.name.slice(0, -1) : vn.name).toLowerCase();
            if (!(gn in xn)) {
              xn[gn] = vn;
              continue;
            }
          }
          xn = null, fn = Zr(
            vn,
            ze,
            fn
          );
        }
        return fn;
      case "&&":
        if (dn.length > 5)
          return {
            type: "MatchOnce",
            terms: dn,
            all: !0
          };
        for (var fn = Wr, mn = dn.length - 1; mn >= 0; mn--) {
          var vn = dn[mn], un;
          dn.length > 1 ? un = rn(
            an,
            dn.filter(function(bn) {
              return bn !== vn;
            }),
            !1
          ) : un = ze, fn = Zr(
            vn,
            un,
            fn
          );
        }
        return fn;
      case "||":
        if (dn.length > 5)
          return {
            type: "MatchOnce",
            terms: dn,
            all: !1
          };
        for (var fn = pn ? ze : Wr, mn = dn.length - 1; mn >= 0; mn--) {
          var vn = dn[mn], un;
          dn.length > 1 ? un = rn(
            an,
            dn.filter(function(Sn) {
              return Sn !== vn;
            }),
            !0
          ) : un = ze, fn = Zr(
            vn,
            un,
            fn
          );
        }
        return fn;
    }
  }
  function sn(an) {
    var dn = ze, pn = on(an.term);
    if (an.max === 0)
      pn = Zr(
        pn,
        Yr,
        Wr
      ), dn = Zr(
        pn,
        null,
        // will be a loop
        Wr
      ), dn.then = Zr(
        ze,
        ze,
        dn
        // make a loop
      ), an.comma && (dn.then.else = Zr(
        { type: "Comma", syntax: an },
        dn,
        Wr
      ));
    else
      for (var mn = an.min || 1; mn <= an.max; mn++)
        an.comma && dn !== ze && (dn = Zr(
          { type: "Comma", syntax: an },
          dn,
          Wr
        )), dn = Zr(
          pn,
          Zr(
            ze,
            ze,
            dn
          ),
          Wr
        );
    if (an.min === 0)
      dn = Zr(
        ze,
        ze,
        dn
      );
    else
      for (var mn = 0; mn < an.min - 1; mn++)
        an.comma && dn !== ze && (dn = Zr(
          { type: "Comma", syntax: an },
          dn,
          Wr
        )), dn = Zr(
          pn,
          dn,
          Wr
        );
    return dn;
  }
  function on(an) {
    if (typeof an == "function")
      return {
        type: "Generic",
        fn: an
      };
    switch (an.type) {
      case "Group":
        var dn = rn(
          an.combinator,
          an.terms.map(on),
          !1
        );
        return an.disallowEmpty && (dn = Zr(
          dn,
          Yr,
          Wr
        )), dn;
      case "Multiplier":
        return sn(an);
      case "Type":
      case "Property":
        return {
          type: an.type,
          name: an.name,
          syntax: an
        };
      case "Keyword":
        return {
          type: an.type,
          name: an.name.toLowerCase(),
          syntax: an
        };
      case "AtKeyword":
        return {
          type: an.type,
          name: "@" + an.name.toLowerCase(),
          syntax: an
        };
      case "Function":
        return {
          type: an.type,
          name: an.name.toLowerCase() + "(",
          syntax: an
        };
      case "String":
        return an.value.length === 3 ? {
          type: "Token",
          value: an.value.charAt(1),
          syntax: an
        } : {
          type: an.type,
          value: an.value.substr(1, an.value.length - 2).replace(/\\'/g, "'"),
          syntax: an
        };
      case "Token":
        return {
          type: an.type,
          value: an.value,
          syntax: an
        };
      case "Comma":
        return {
          type: an.type,
          syntax: an
        };
      default:
        throw new Error("Unknown node type:", an.type);
    }
  }
  return matchGraph = {
    MATCH: ze,
    MISMATCH: Wr,
    DISALLOW_EMPTY: Yr,
    buildMatchGraph: function(an, dn) {
      return typeof an == "string" && (an = Gr(an)), {
        type: "MatchGraph",
        match: on(an),
        syntax: dn || null,
        source: an
      };
    }
  }, matchGraph;
}
var match, hasRequiredMatch;
function requireMatch() {
  if (hasRequiredMatch) return match;
  hasRequiredMatch = 1;
  var Gr = Object.prototype.hasOwnProperty, ze = requireMatchGraph(), Wr = ze.MATCH, Yr = ze.MISMATCH, Qr = ze.DISALLOW_EMPTY, Kr = require_const().TYPE, Zr = 0, en = 1, tn = 2, rn = 3, sn = "Match", on = "Mismatch", an = "Maximum iteration number exceeded (please fill an issue on https://github.com/csstree/csstree/issues)", dn = 15e3, pn = 0;
  function mn(bn) {
    for (var Sn = null, _n = null, Tn = bn; Tn !== null; )
      _n = Tn.prev, Tn.prev = Sn, Sn = Tn, Tn = _n;
    return Sn;
  }
  function vn(bn, Sn) {
    if (bn.length !== Sn.length)
      return !1;
    for (var _n = 0; _n < bn.length; _n++) {
      var Tn = bn.charCodeAt(_n), Ln = Sn.charCodeAt(_n);
      if (Tn >= 65 && Tn <= 90 && (Tn = Tn | 32), Tn !== Ln)
        return !1;
    }
    return !0;
  }
  function xn(bn) {
    return bn.type !== Kr.Delim ? !1 : bn.value !== "?";
  }
  function gn(bn) {
    return bn === null ? !0 : bn.type === Kr.Comma || bn.type === Kr.Function || bn.type === Kr.LeftParenthesis || bn.type === Kr.LeftSquareBracket || bn.type === Kr.LeftCurlyBracket || xn(bn);
  }
  function un(bn) {
    return bn === null ? !0 : bn.type === Kr.RightParenthesis || bn.type === Kr.RightSquareBracket || bn.type === Kr.RightCurlyBracket || bn.type === Kr.Delim;
  }
  function fn(bn, Sn, _n) {
    function Tn() {
      do
        Wn++, On = Wn < bn.length ? bn[Wn] : null;
      while (On !== null && (On.type === Kr.WhiteSpace || On.type === Kr.Comment));
    }
    function Ln(ii) {
      var fi = Wn + ii;
      return fi < bn.length ? bn[fi] : null;
    }
    function Pn(ii, fi) {
      return {
        nextState: ii,
        matchStack: Qn,
        syntaxStack: Hn,
        thenStack: En,
        tokenIndex: Wn,
        prev: fi
      };
    }
    function In(ii) {
      En = {
        nextState: ii,
        matchStack: Qn,
        syntaxStack: Hn,
        prev: En
      };
    }
    function Mn(ii) {
      Yn = Pn(ii, Yn);
    }
    function Nn() {
      Qn = {
        type: en,
        syntax: Sn.syntax,
        token: On,
        prev: Qn
      }, Tn(), Xn = null, Wn > Fn && (Fn = Wn);
    }
    function Gn() {
      Hn = {
        syntax: Sn.syntax,
        opts: Sn.syntax.opts || Hn !== null && Hn.opts || null,
        prev: Hn
      }, Qn = {
        type: tn,
        syntax: Sn.syntax,
        token: Qn.token,
        prev: Qn
      };
    }
    function Un() {
      Qn.type === tn ? Qn = Qn.prev : Qn = {
        type: rn,
        syntax: Hn.syntax,
        token: Qn.token,
        prev: Qn
      }, Hn = Hn.prev;
    }
    var Hn = null, En = null, Yn = null, Xn = null, ni = 0, Rn = null, On = null, Wn = -1, Fn = 0, Qn = {
      type: Zr,
      syntax: null,
      token: null,
      prev: null
    };
    for (Tn(); Rn === null && ++ni < dn; )
      switch (Sn.type) {
        case "Match":
          if (En === null) {
            if (On !== null && (Wn !== bn.length - 1 || On.value !== "\\0" && On.value !== "\\9")) {
              Sn = Yr;
              break;
            }
            Rn = sn;
            break;
          }
          if (Sn = En.nextState, Sn === Qr)
            if (En.matchStack === Qn) {
              Sn = Yr;
              break;
            } else
              Sn = Wr;
          for (; En.syntaxStack !== Hn; )
            Un();
          En = En.prev;
          break;
        case "Mismatch":
          if (Xn !== null && Xn !== !1)
            (Yn === null || Wn > Yn.tokenIndex) && (Yn = Xn, Xn = !1);
          else if (Yn === null) {
            Rn = on;
            break;
          }
          Sn = Yn.nextState, En = Yn.thenStack, Hn = Yn.syntaxStack, Qn = Yn.matchStack, Wn = Yn.tokenIndex, On = Wn < bn.length ? bn[Wn] : null, Yn = Yn.prev;
          break;
        case "MatchGraph":
          Sn = Sn.match;
          break;
        case "If":
          Sn.else !== Yr && Mn(Sn.else), Sn.then !== Wr && In(Sn.then), Sn = Sn.match;
          break;
        case "MatchOnce":
          Sn = {
            type: "MatchOnceBuffer",
            syntax: Sn,
            index: 0,
            mask: 0
          };
          break;
        case "MatchOnceBuffer":
          var pi = Sn.syntax.terms;
          if (Sn.index === pi.length) {
            if (Sn.mask === 0 || Sn.syntax.all) {
              Sn = Yr;
              break;
            }
            Sn = Wr;
            break;
          }
          if (Sn.mask === (1 << pi.length) - 1) {
            Sn = Wr;
            break;
          }
          for (; Sn.index < pi.length; Sn.index++) {
            var ui = 1 << Sn.index;
            if ((Sn.mask & ui) === 0) {
              Mn(Sn), In({
                type: "AddMatchOnce",
                syntax: Sn.syntax,
                mask: Sn.mask | ui
              }), Sn = pi[Sn.index++];
              break;
            }
          }
          break;
        case "AddMatchOnce":
          Sn = {
            type: "MatchOnceBuffer",
            syntax: Sn.syntax,
            index: 0,
            mask: Sn.mask
          };
          break;
        case "Enum":
          if (On !== null) {
            var ei = On.value.toLowerCase();
            if (ei.indexOf("\\") !== -1 && (ei = ei.replace(/\\[09].*$/, "")), Gr.call(Sn.map, ei)) {
              Sn = Sn.map[ei];
              break;
            }
          }
          Sn = Yr;
          break;
        case "Generic":
          var qn = Hn !== null ? Hn.opts : null, jn = Wn + Math.floor(Sn.fn(On, Ln, qn));
          if (!isNaN(jn) && jn > Wn) {
            for (; Wn < jn; )
              Nn();
            Sn = Wr;
          } else
            Sn = Yr;
          break;
        case "Type":
        case "Property":
          var $n = Sn.type === "Type" ? "types" : "properties", Kn = Gr.call(_n, $n) ? _n[$n][Sn.name] : null;
          if (!Kn || !Kn.match)
            throw new Error(
              "Bad syntax reference: " + (Sn.type === "Type" ? "<" + Sn.name + ">" : "<'" + Sn.name + "'>")
            );
          if (Xn !== !1 && On !== null && Sn.type === "Type") {
            var Jn = (
              // https://drafts.csswg.org/css-values-4/#custom-idents
              // When parsing positionally-ambiguous keywords in a property value, a <custom-ident> production
              // can only claim the keyword if no other unfulfilled production can claim it.
              Sn.name === "custom-ident" && On.type === Kr.Ident || // https://drafts.csswg.org/css-values-4/#lengths
              // ... if a `0` could be parsed as either a <number> or a <length> in a property (such as line-height),
              // it must parse as a <number>
              Sn.name === "length" && On.value === "0"
            );
            if (Jn) {
              Xn === null && (Xn = Pn(Sn, Yn)), Sn = Yr;
              break;
            }
          }
          Gn(), Sn = Kn.match;
          break;
        case "Keyword":
          var ei = Sn.name;
          if (On !== null) {
            var ri = On.value;
            if (ri.indexOf("\\") !== -1 && (ri = ri.replace(/\\[09].*$/, "")), vn(ri, ei)) {
              Nn(), Sn = Wr;
              break;
            }
          }
          Sn = Yr;
          break;
        case "AtKeyword":
        case "Function":
          if (On !== null && vn(On.value, Sn.name)) {
            Nn(), Sn = Wr;
            break;
          }
          Sn = Yr;
          break;
        case "Token":
          if (On !== null && On.value === Sn.value) {
            Nn(), Sn = Wr;
            break;
          }
          Sn = Yr;
          break;
        case "Comma":
          On !== null && On.type === Kr.Comma ? gn(Qn.token) ? Sn = Yr : (Nn(), Sn = un(On) ? Yr : Wr) : Sn = gn(Qn.token) || un(On) ? Wr : Yr;
          break;
        case "String":
          for (var oi = "", jn = Wn; jn < bn.length && oi.length < Sn.value.length; jn++)
            oi += bn[jn].value;
          if (vn(oi, Sn.value)) {
            for (; Wn < jn; )
              Nn();
            Sn = Wr;
          } else
            Sn = Yr;
          break;
        default:
          throw new Error("Unknown node type: " + Sn.type);
      }
    switch (pn += ni, Rn) {
      case null:
        console.warn("[csstree-match] BREAK after " + dn + " iterations"), Rn = an, Qn = null;
        break;
      case sn:
        for (; Hn !== null; )
          Un();
        break;
      default:
        Qn = null;
    }
    return {
      tokens: bn,
      reason: Rn,
      iterations: ni,
      match: Qn,
      longestMatch: Fn
    };
  }
  function cn(bn, Sn, _n) {
    var Tn = fn(bn, Sn, _n || {});
    if (Tn.match !== null) {
      var Ln = mn(Tn.match).prev;
      for (Tn.match = []; Ln !== null; ) {
        switch (Ln.type) {
          case Zr:
            break;
          case tn:
          case rn:
            Tn.match.push({
              type: Ln.type,
              syntax: Ln.syntax
            });
            break;
          default:
            Tn.match.push({
              token: Ln.token.value,
              node: Ln.token.node
            });
            break;
        }
        Ln = Ln.prev;
      }
    }
    return Tn;
  }
  function Cn(bn, Sn, _n) {
    var Tn = fn(bn, Sn, _n || {});
    if (Tn.match === null)
      return Tn;
    var Ln = Tn.match, Pn = Tn.match = {
      syntax: Sn.syntax || null,
      match: []
    }, In = [Pn];
    for (Ln = mn(Ln).prev; Ln !== null; ) {
      switch (Ln.type) {
        case tn:
          Pn.match.push(Pn = {
            syntax: Ln.syntax,
            match: []
          }), In.push(Pn);
          break;
        case rn:
          In.pop(), Pn = In[In.length - 1];
          break;
        default:
          Pn.match.push({
            syntax: Ln.syntax || null,
            token: Ln.token.value,
            node: Ln.token.node
          });
      }
      Ln = Ln.prev;
    }
    return Tn;
  }
  return match = {
    matchAsList: cn,
    matchAsTree: Cn,
    getTotalIterationCount: function() {
      return pn;
    }
  }, match;
}
var trace, hasRequiredTrace;
function requireTrace() {
  if (hasRequiredTrace) return trace;
  hasRequiredTrace = 1;
  function Gr(Kr) {
    function Zr(rn) {
      return rn === null ? !1 : rn.type === "Type" || rn.type === "Property" || rn.type === "Keyword";
    }
    function en(rn) {
      if (Array.isArray(rn.match)) {
        for (var sn = 0; sn < rn.match.length; sn++)
          if (en(rn.match[sn]))
            return Zr(rn.syntax) && tn.unshift(rn.syntax), !0;
      } else if (rn.node === Kr)
        return tn = Zr(rn.syntax) ? [rn.syntax] : [], !0;
      return !1;
    }
    var tn = null;
    return this.matched !== null && en(this.matched), tn;
  }
  function ze(Kr, Zr, en) {
    var tn = Gr.call(Kr, Zr);
    return tn === null ? !1 : tn.some(en);
  }
  function Wr(Kr, Zr) {
    return ze(this, Kr, function(en) {
      return en.type === "Type" && en.name === Zr;
    });
  }
  function Yr(Kr, Zr) {
    return ze(this, Kr, function(en) {
      return en.type === "Property" && en.name === Zr;
    });
  }
  function Qr(Kr) {
    return ze(this, Kr, function(Zr) {
      return Zr.type === "Keyword";
    });
  }
  return trace = {
    getTrace: Gr,
    isType: Wr,
    isProperty: Yr,
    isKeyword: Qr
  }, trace;
}
var search, hasRequiredSearch;
function requireSearch() {
  if (hasRequiredSearch) return search;
  hasRequiredSearch = 1;
  var Gr = requireList();
  function ze(Qr) {
    return "node" in Qr ? Qr.node : ze(Qr.match[0]);
  }
  function Wr(Qr) {
    return "node" in Qr ? Qr.node : Wr(Qr.match[Qr.match.length - 1]);
  }
  function Yr(Qr, Kr, Zr, en, tn) {
    function rn(on) {
      if (on.syntax !== null && on.syntax.type === en && on.syntax.name === tn) {
        var an = ze(on), dn = Wr(on);
        Qr.syntax.walk(Kr, function(pn, mn, vn) {
          if (pn === an) {
            var xn = new Gr();
            do {
              if (xn.appendData(mn.data), mn.data === dn)
                break;
              mn = mn.next;
            } while (mn !== null);
            sn.push({
              parent: vn,
              nodes: xn
            });
          }
        });
      }
      Array.isArray(on.match) && on.match.forEach(rn);
    }
    var sn = [];
    return Zr.matched !== null && rn(Zr.matched), sn;
  }
  return search = {
    matchFragments: Yr
  }, search;
}
var structure, hasRequiredStructure;
function requireStructure() {
  if (hasRequiredStructure) return structure;
  hasRequiredStructure = 1;
  var Gr = requireList(), ze = Object.prototype.hasOwnProperty;
  function Wr(Zr) {
    return typeof Zr == "number" && isFinite(Zr) && Math.floor(Zr) === Zr && Zr >= 0;
  }
  function Yr(Zr) {
    return !!Zr && Wr(Zr.offset) && Wr(Zr.line) && Wr(Zr.column);
  }
  function Qr(Zr, en) {
    return function(rn, sn) {
      if (!rn || rn.constructor !== Object)
        return sn(rn, "Type of node should be an Object");
      for (var on in rn) {
        var an = !0;
        if (ze.call(rn, on) !== !1) {
          if (on === "type")
            rn.type !== Zr && sn(rn, "Wrong node type `" + rn.type + "`, expected `" + Zr + "`");
          else if (on === "loc") {
            if (rn.loc === null)
              continue;
            if (rn.loc && rn.loc.constructor === Object)
              if (typeof rn.loc.source != "string")
                on += ".source";
              else if (!Yr(rn.loc.start))
                on += ".start";
              else if (!Yr(rn.loc.end))
                on += ".end";
              else
                continue;
            an = !1;
          } else if (en.hasOwnProperty(on))
            for (var dn = 0, an = !1; !an && dn < en[on].length; dn++) {
              var pn = en[on][dn];
              switch (pn) {
                case String:
                  an = typeof rn[on] == "string";
                  break;
                case Boolean:
                  an = typeof rn[on] == "boolean";
                  break;
                case null:
                  an = rn[on] === null;
                  break;
                default:
                  typeof pn == "string" ? an = rn[on] && rn[on].type === pn : Array.isArray(pn) && (an = rn[on] instanceof Gr);
              }
            }
          else
            sn(rn, "Unknown field `" + on + "` for " + Zr + " node type");
          an || sn(rn, "Bad value for `" + Zr + "." + on + "`");
        }
      }
      for (var on in en)
        ze.call(en, on) && ze.call(rn, on) === !1 && sn(rn, "Field `" + Zr + "." + on + "` is missed");
    };
  }
  function Kr(Zr, en) {
    var tn = en.structure, rn = {
      type: String,
      loc: !0
    }, sn = {
      type: '"' + Zr + '"'
    };
    for (var on in tn)
      if (ze.call(tn, on) !== !1) {
        for (var an = [], dn = rn[on] = Array.isArray(tn[on]) ? tn[on].slice() : [tn[on]], pn = 0; pn < dn.length; pn++) {
          var mn = dn[pn];
          if (mn === String || mn === Boolean)
            an.push(mn.name);
          else if (mn === null)
            an.push("null");
          else if (typeof mn == "string")
            an.push("<" + mn + ">");
          else if (Array.isArray(mn))
            an.push("List");
          else
            throw new Error("Wrong value `" + mn + "` in `" + Zr + "." + on + "` structure definition");
        }
        sn[on] = an.join(" | ");
      }
    return {
      docs: sn,
      check: Qr(Zr, rn)
    };
  }
  return structure = {
    getStructureFromConfig: function(Zr) {
      var en = {};
      if (Zr.node) {
        for (var tn in Zr.node)
          if (ze.call(Zr.node, tn)) {
            var rn = Zr.node[tn];
            if (rn.structure)
              en[tn] = Kr(tn, rn);
            else
              throw new Error("Missed `structure` field in `" + tn + "` node type definition");
          }
      }
      return en;
    }
  }, structure;
}
var Lexer_1, hasRequiredLexer$1;
function requireLexer$1() {
  if (hasRequiredLexer$1) return Lexer_1;
  hasRequiredLexer$1 = 1;
  var Gr = requireError().SyntaxReferenceError, ze = requireError().SyntaxMatchError, Wr = requireNames(), Yr = requireGeneric(), Qr = requireParse(), Kr = requireGenerate(), Zr = requireWalk(), en = requirePrepareTokens(), tn = requireMatchGraph().buildMatchGraph, rn = requireMatch().matchAsTree, sn = requireTrace(), on = requireSearch(), an = requireStructure().getStructureFromConfig, dn = tn("inherit | initial | unset"), pn = tn("inherit | initial | unset | <-ms-legacy-expression>");
  function mn(cn, Cn, bn) {
    var Sn = {};
    for (var _n in cn)
      cn[_n].syntax && (Sn[_n] = bn ? cn[_n].syntax : Kr(cn[_n].syntax, { compact: Cn }));
    return Sn;
  }
  function vn(cn, Cn, bn) {
    const Sn = {};
    for (const [_n, Tn] of Object.entries(cn))
      Sn[_n] = {
        prelude: Tn.prelude && (bn ? Tn.prelude.syntax : Kr(Tn.prelude.syntax, { compact: Cn })),
        descriptors: Tn.descriptors && mn(Tn.descriptors, Cn, bn)
      };
    return Sn;
  }
  function xn(cn) {
    for (var Cn = 0; Cn < cn.length; Cn++)
      if (cn[Cn].value.toLowerCase() === "var(")
        return !0;
    return !1;
  }
  function gn(cn, Cn, bn) {
    return {
      matched: cn,
      iterations: bn,
      error: Cn,
      getTrace: sn.getTrace,
      isType: sn.isType,
      isProperty: sn.isProperty,
      isKeyword: sn.isKeyword
    };
  }
  function un(cn, Cn, bn, Sn) {
    var _n = en(bn, cn.syntax), Tn;
    return xn(_n) ? gn(null, new Error("Matching for a tree with var() is not supported")) : (Sn && (Tn = rn(_n, cn.valueCommonSyntax, cn)), (!Sn || !Tn.match) && (Tn = rn(_n, Cn.match, cn), !Tn.match) ? gn(
      null,
      new ze(Tn.reason, Cn.syntax, bn, Tn),
      Tn.iterations
    ) : gn(Tn.match, null, Tn.iterations));
  }
  var fn = function(cn, Cn, bn) {
    if (this.valueCommonSyntax = dn, this.syntax = Cn, this.generic = !1, this.atrules = {}, this.properties = {}, this.types = {}, this.structure = bn || an(cn), cn) {
      if (cn.types)
        for (var Sn in cn.types)
          this.addType_(Sn, cn.types[Sn]);
      if (cn.generic) {
        this.generic = !0;
        for (var Sn in Yr)
          this.addType_(Sn, Yr[Sn]);
      }
      if (cn.atrules)
        for (var Sn in cn.atrules)
          this.addAtrule_(Sn, cn.atrules[Sn]);
      if (cn.properties)
        for (var Sn in cn.properties)
          this.addProperty_(Sn, cn.properties[Sn]);
    }
  };
  return fn.prototype = {
    structure: {},
    checkStructure: function(cn) {
      function Cn(_n, Tn) {
        Sn.push({
          node: _n,
          message: Tn
        });
      }
      var bn = this.structure, Sn = [];
      return this.syntax.walk(cn, function(_n) {
        bn.hasOwnProperty(_n.type) ? bn[_n.type].check(_n, Cn) : Cn(_n, "Unknown node type `" + _n.type + "`");
      }), Sn.length ? Sn : !1;
    },
    createDescriptor: function(cn, Cn, bn, Sn = null) {
      var _n = {
        type: Cn,
        name: bn
      }, Tn = {
        type: Cn,
        name: bn,
        parent: Sn,
        syntax: null,
        match: null
      };
      return typeof cn == "function" ? Tn.match = tn(cn, _n) : (typeof cn == "string" ? Object.defineProperty(Tn, "syntax", {
        get: function() {
          return Object.defineProperty(Tn, "syntax", {
            value: Qr(cn)
          }), Tn.syntax;
        }
      }) : Tn.syntax = cn, Object.defineProperty(Tn, "match", {
        get: function() {
          return Object.defineProperty(Tn, "match", {
            value: tn(Tn.syntax, _n)
          }), Tn.match;
        }
      })), Tn;
    },
    addAtrule_: function(cn, Cn) {
      Cn && (this.atrules[cn] = {
        type: "Atrule",
        name: cn,
        prelude: Cn.prelude ? this.createDescriptor(Cn.prelude, "AtrulePrelude", cn) : null,
        descriptors: Cn.descriptors ? Object.keys(Cn.descriptors).reduce((bn, Sn) => (bn[Sn] = this.createDescriptor(Cn.descriptors[Sn], "AtruleDescriptor", Sn, cn), bn), {}) : null
      });
    },
    addProperty_: function(cn, Cn) {
      Cn && (this.properties[cn] = this.createDescriptor(Cn, "Property", cn));
    },
    addType_: function(cn, Cn) {
      Cn && (this.types[cn] = this.createDescriptor(Cn, "Type", cn), Cn === Yr["-ms-legacy-expression"] && (this.valueCommonSyntax = pn));
    },
    checkAtruleName: function(cn) {
      if (!this.getAtrule(cn))
        return new Gr("Unknown at-rule", "@" + cn);
    },
    checkAtrulePrelude: function(cn, Cn) {
      let bn = this.checkAtruleName(cn);
      if (bn)
        return bn;
      var Sn = this.getAtrule(cn);
      if (!Sn.prelude && Cn)
        return new SyntaxError("At-rule `@" + cn + "` should not contain a prelude");
      if (Sn.prelude && !Cn)
        return new SyntaxError("At-rule `@" + cn + "` should contain a prelude");
    },
    checkAtruleDescriptorName: function(cn, Cn) {
      let bn = this.checkAtruleName(cn);
      if (bn)
        return bn;
      var Sn = this.getAtrule(cn), _n = Wr.keyword(Cn);
      if (!Sn.descriptors)
        return new SyntaxError("At-rule `@" + cn + "` has no known descriptors");
      if (!Sn.descriptors[_n.name] && !Sn.descriptors[_n.basename])
        return new Gr("Unknown at-rule descriptor", Cn);
    },
    checkPropertyName: function(cn) {
      var Cn = Wr.property(cn);
      if (Cn.custom)
        return new Error("Lexer matching doesn't applicable for custom properties");
      if (!this.getProperty(cn))
        return new Gr("Unknown property", cn);
    },
    matchAtrulePrelude: function(cn, Cn) {
      var bn = this.checkAtrulePrelude(cn, Cn);
      return bn ? gn(null, bn) : Cn ? un(this, this.getAtrule(cn).prelude, Cn, !1) : gn(null, null);
    },
    matchAtruleDescriptor: function(cn, Cn, bn) {
      var Sn = this.checkAtruleDescriptorName(cn, Cn);
      if (Sn)
        return gn(null, Sn);
      var _n = this.getAtrule(cn), Tn = Wr.keyword(Cn);
      return un(this, _n.descriptors[Tn.name] || _n.descriptors[Tn.basename], bn, !1);
    },
    matchDeclaration: function(cn) {
      return cn.type !== "Declaration" ? gn(null, new Error("Not a Declaration node")) : this.matchProperty(cn.property, cn.value);
    },
    matchProperty: function(cn, Cn) {
      var bn = this.checkPropertyName(cn);
      return bn ? gn(null, bn) : un(this, this.getProperty(cn), Cn, !0);
    },
    matchType: function(cn, Cn) {
      var bn = this.getType(cn);
      return bn ? un(this, bn, Cn, !1) : gn(null, new Gr("Unknown type", cn));
    },
    match: function(cn, Cn) {
      return typeof cn != "string" && (!cn || !cn.type) ? gn(null, new Gr("Bad syntax")) : ((typeof cn == "string" || !cn.match) && (cn = this.createDescriptor(cn, "Type", "anonymous")), un(this, cn, Cn, !1));
    },
    findValueFragments: function(cn, Cn, bn, Sn) {
      return on.matchFragments(this, Cn, this.matchProperty(cn, Cn), bn, Sn);
    },
    findDeclarationValueFragments: function(cn, Cn, bn) {
      return on.matchFragments(this, cn.value, this.matchDeclaration(cn), Cn, bn);
    },
    findAllFragments: function(cn, Cn, bn) {
      var Sn = [];
      return this.syntax.walk(cn, {
        visit: "Declaration",
        enter: (function(_n) {
          Sn.push.apply(Sn, this.findDeclarationValueFragments(_n, Cn, bn));
        }).bind(this)
      }), Sn;
    },
    getAtrule: function(cn, Cn = !0) {
      var bn = Wr.keyword(cn), Sn = bn.vendor && Cn ? this.atrules[bn.name] || this.atrules[bn.basename] : this.atrules[bn.name];
      return Sn || null;
    },
    getAtrulePrelude: function(cn, Cn = !0) {
      const bn = this.getAtrule(cn, Cn);
      return bn && bn.prelude || null;
    },
    getAtruleDescriptor: function(cn, Cn) {
      return this.atrules.hasOwnProperty(cn) && this.atrules.declarators && this.atrules[cn].declarators[Cn] || null;
    },
    getProperty: function(cn, Cn = !0) {
      var bn = Wr.property(cn), Sn = bn.vendor && Cn ? this.properties[bn.name] || this.properties[bn.basename] : this.properties[bn.name];
      return Sn || null;
    },
    getType: function(cn) {
      return this.types.hasOwnProperty(cn) ? this.types[cn] : null;
    },
    validate: function() {
      function cn(_n, Tn, Ln, Pn) {
        if (Ln.hasOwnProperty(Tn))
          return Ln[Tn];
        Ln[Tn] = !1, Pn.syntax !== null && Zr(Pn.syntax, function(In) {
          if (!(In.type !== "Type" && In.type !== "Property")) {
            var Mn = In.type === "Type" ? _n.types : _n.properties, Nn = In.type === "Type" ? Cn : bn;
            (!Mn.hasOwnProperty(In.name) || cn(_n, In.name, Nn, Mn[In.name])) && (Ln[Tn] = !0);
          }
        }, this);
      }
      var Cn = {}, bn = {};
      for (var Sn in this.types)
        cn(this, Sn, Cn, this.types[Sn]);
      for (var Sn in this.properties)
        cn(this, Sn, bn, this.properties[Sn]);
      return Cn = Object.keys(Cn).filter(function(_n) {
        return Cn[_n];
      }), bn = Object.keys(bn).filter(function(_n) {
        return bn[_n];
      }), Cn.length || bn.length ? {
        types: Cn,
        properties: bn
      } : null;
    },
    dump: function(cn, Cn) {
      return {
        generic: this.generic,
        types: mn(this.types, !Cn, cn),
        properties: mn(this.properties, !Cn, cn),
        atrules: vn(this.atrules, !Cn, cn)
      };
    },
    toString: function() {
      return JSON.stringify(this.dump());
    }
  }, Lexer_1 = fn, Lexer_1;
}
var definitionSyntax, hasRequiredDefinitionSyntax;
function requireDefinitionSyntax() {
  return hasRequiredDefinitionSyntax || (hasRequiredDefinitionSyntax = 1, definitionSyntax = {
    SyntaxError: require_SyntaxError(),
    parse: requireParse(),
    generate: requireGenerate(),
    walk: requireWalk()
  }), definitionSyntax;
}
var OffsetToLocation_1, hasRequiredOffsetToLocation;
function requireOffsetToLocation() {
  if (hasRequiredOffsetToLocation) return OffsetToLocation_1;
  hasRequiredOffsetToLocation = 1;
  var Gr = requireAdoptBuffer(), ze = requireTokenizer$1().isBOM, Wr = 10, Yr = 12, Qr = 13;
  function Kr(en, tn) {
    for (var rn = tn.length, sn = Gr(en.lines, rn), on = en.startLine, an = Gr(en.columns, rn), dn = en.startColumn, pn = tn.length > 0 ? ze(tn.charCodeAt(0)) : 0, mn = pn; mn < rn; mn++) {
      var vn = tn.charCodeAt(mn);
      sn[mn] = on, an[mn] = dn++, (vn === Wr || vn === Qr || vn === Yr) && (vn === Qr && mn + 1 < rn && tn.charCodeAt(mn + 1) === Wr && (mn++, sn[mn] = on, an[mn] = dn), on++, dn = 1);
    }
    sn[mn] = on, an[mn] = dn, en.lines = sn, en.columns = an;
  }
  var Zr = function() {
    this.lines = null, this.columns = null, this.linesAndColumnsComputed = !1;
  };
  return Zr.prototype = {
    setSource: function(en, tn, rn, sn) {
      this.source = en, this.startOffset = typeof tn > "u" ? 0 : tn, this.startLine = typeof rn > "u" ? 1 : rn, this.startColumn = typeof sn > "u" ? 1 : sn, this.linesAndColumnsComputed = !1;
    },
    ensureLinesAndColumnsComputed: function() {
      this.linesAndColumnsComputed || (Kr(this, this.source), this.linesAndColumnsComputed = !0);
    },
    getLocation: function(en, tn) {
      return this.ensureLinesAndColumnsComputed(), {
        source: tn,
        offset: this.startOffset + en,
        line: this.lines[en],
        column: this.columns[en]
      };
    },
    getLocationRange: function(en, tn, rn) {
      return this.ensureLinesAndColumnsComputed(), {
        source: rn,
        start: {
          offset: this.startOffset + en,
          line: this.lines[en],
          column: this.columns[en]
        },
        end: {
          offset: this.startOffset + tn,
          line: this.lines[tn],
          column: this.columns[tn]
        }
      };
    }
  }, OffsetToLocation_1 = Zr, OffsetToLocation_1;
}
var sequence, hasRequiredSequence;
function requireSequence() {
  if (hasRequiredSequence) return sequence;
  hasRequiredSequence = 1;
  var Gr = requireTokenizer$1().TYPE, ze = Gr.WhiteSpace, Wr = Gr.Comment;
  return sequence = function(Qr) {
    var Kr = this.createList(), Zr = null, en = {
      recognizer: Qr,
      space: null,
      ignoreWS: !1,
      ignoreWSAfter: !1
    };
    for (this.scanner.skipSC(); !this.scanner.eof; ) {
      switch (this.scanner.tokenType) {
        case Wr:
          this.scanner.next();
          continue;
        case ze:
          en.ignoreWS ? this.scanner.next() : en.space = this.WhiteSpace();
          continue;
      }
      if (Zr = Qr.getNode.call(this, en), Zr === void 0)
        break;
      en.space !== null && (Kr.push(en.space), en.space = null), Kr.push(Zr), en.ignoreWSAfter ? (en.ignoreWSAfter = !1, en.ignoreWS = !0) : en.ignoreWS = !1;
    }
    return Kr;
  }, sequence;
}
var create$3, hasRequiredCreate$4;
function requireCreate$4() {
  if (hasRequiredCreate$4) return create$3;
  hasRequiredCreate$4 = 1;
  var Gr = requireOffsetToLocation(), ze = require_SyntaxError$1(), Wr = requireTokenStream(), Yr = requireList(), Qr = requireTokenizer$1(), Kr = require_const(), { findWhiteSpaceStart: Zr, cmpStr: en } = requireUtils(), tn = requireSequence(), rn = function() {
  }, sn = Kr.TYPE, on = Kr.NAME, an = sn.WhiteSpace, dn = sn.Comment, pn = sn.Ident, mn = sn.Function, vn = sn.Url, xn = sn.Hash, gn = sn.Percentage, un = sn.Number, fn = 35, cn = 0;
  function Cn(Sn) {
    return function() {
      return this[Sn]();
    };
  }
  function bn(Sn) {
    var _n = {
      context: {},
      scope: {},
      atrule: {},
      pseudo: {}
    };
    if (Sn.parseContext)
      for (var Tn in Sn.parseContext)
        switch (typeof Sn.parseContext[Tn]) {
          case "function":
            _n.context[Tn] = Sn.parseContext[Tn];
            break;
          case "string":
            _n.context[Tn] = Cn(Sn.parseContext[Tn]);
            break;
        }
    if (Sn.scope)
      for (var Tn in Sn.scope)
        _n.scope[Tn] = Sn.scope[Tn];
    if (Sn.atrule)
      for (var Tn in Sn.atrule) {
        var Ln = Sn.atrule[Tn];
        Ln.parse && (_n.atrule[Tn] = Ln.parse);
      }
    if (Sn.pseudo)
      for (var Tn in Sn.pseudo) {
        var Pn = Sn.pseudo[Tn];
        Pn.parse && (_n.pseudo[Tn] = Pn.parse);
      }
    if (Sn.node)
      for (var Tn in Sn.node)
        _n[Tn] = Sn.node[Tn].parse;
    return _n;
  }
  return create$3 = function(_n) {
    var Tn = {
      scanner: new Wr(),
      locationMap: new Gr(),
      filename: "<unknown>",
      needPositions: !1,
      onParseError: rn,
      onParseErrorThrow: !1,
      parseAtrulePrelude: !0,
      parseRulePrelude: !0,
      parseValue: !0,
      parseCustomProperty: !1,
      readSequence: tn,
      createList: function() {
        return new Yr();
      },
      createSingleNodeList: function(Pn) {
        return new Yr().appendData(Pn);
      },
      getFirstListNode: function(Pn) {
        return Pn && Pn.first();
      },
      getLastListNode: function(Pn) {
        return Pn.last();
      },
      parseWithFallback: function(Pn, In) {
        var Mn = this.scanner.tokenIndex;
        try {
          return Pn.call(this);
        } catch (Gn) {
          if (this.onParseErrorThrow)
            throw Gn;
          var Nn = In.call(this, Mn);
          return this.onParseErrorThrow = !0, this.onParseError(Gn, Nn), this.onParseErrorThrow = !1, Nn;
        }
      },
      lookupNonWSType: function(Pn) {
        do {
          var In = this.scanner.lookupType(Pn++);
          if (In !== an)
            return In;
        } while (In !== cn);
        return cn;
      },
      eat: function(Pn) {
        if (this.scanner.tokenType !== Pn) {
          var In = this.scanner.tokenStart, Mn = on[Pn] + " is expected";
          switch (Pn) {
            case pn:
              this.scanner.tokenType === mn || this.scanner.tokenType === vn ? (In = this.scanner.tokenEnd - 1, Mn = "Identifier is expected but function found") : Mn = "Identifier is expected";
              break;
            case xn:
              this.scanner.isDelim(fn) && (this.scanner.next(), In++, Mn = "Name is expected");
              break;
            case gn:
              this.scanner.tokenType === un && (In = this.scanner.tokenEnd, Mn = "Percent sign is expected");
              break;
            default:
              this.scanner.source.charCodeAt(this.scanner.tokenStart) === Pn && (In = In + 1);
          }
          this.error(Mn, In);
        }
        this.scanner.next();
      },
      consume: function(Pn) {
        var In = this.scanner.getTokenValue();
        return this.eat(Pn), In;
      },
      consumeFunctionName: function() {
        var Pn = this.scanner.source.substring(this.scanner.tokenStart, this.scanner.tokenEnd - 1);
        return this.eat(mn), Pn;
      },
      getLocation: function(Pn, In) {
        return this.needPositions ? this.locationMap.getLocationRange(
          Pn,
          In,
          this.filename
        ) : null;
      },
      getLocationFromList: function(Pn) {
        if (this.needPositions) {
          var In = this.getFirstListNode(Pn), Mn = this.getLastListNode(Pn);
          return this.locationMap.getLocationRange(
            In !== null ? In.loc.start.offset - this.locationMap.startOffset : this.scanner.tokenStart,
            Mn !== null ? Mn.loc.end.offset - this.locationMap.startOffset : this.scanner.tokenStart,
            this.filename
          );
        }
        return null;
      },
      error: function(Pn, In) {
        var Mn = typeof In < "u" && In < this.scanner.source.length ? this.locationMap.getLocation(In) : this.scanner.eof ? this.locationMap.getLocation(Zr(this.scanner.source, this.scanner.source.length - 1)) : this.locationMap.getLocation(this.scanner.tokenStart);
        throw new ze(
          Pn || "Unexpected input",
          this.scanner.source,
          Mn.offset,
          Mn.line,
          Mn.column
        );
      }
    };
    _n = bn(_n || {});
    for (var Ln in _n)
      Tn[Ln] = _n[Ln];
    return function(Pn, In) {
      In = In || {};
      var Mn = In.context || "default", Nn = In.onComment, Gn;
      if (Qr(Pn, Tn.scanner), Tn.locationMap.setSource(
        Pn,
        In.offset,
        In.line,
        In.column
      ), Tn.filename = In.filename || "<unknown>", Tn.needPositions = !!In.positions, Tn.onParseError = typeof In.onParseError == "function" ? In.onParseError : rn, Tn.onParseErrorThrow = !1, Tn.parseAtrulePrelude = "parseAtrulePrelude" in In ? !!In.parseAtrulePrelude : !0, Tn.parseRulePrelude = "parseRulePrelude" in In ? !!In.parseRulePrelude : !0, Tn.parseValue = "parseValue" in In ? !!In.parseValue : !0, Tn.parseCustomProperty = "parseCustomProperty" in In ? !!In.parseCustomProperty : !1, !Tn.context.hasOwnProperty(Mn))
        throw new Error("Unknown context `" + Mn + "`");
      return typeof Nn == "function" && Tn.scanner.forEachToken((Un, Hn, En) => {
        if (Un === dn) {
          const Yn = Tn.getLocation(Hn, En), Xn = en(Pn, En - 2, En, "*/") ? Pn.slice(Hn + 2, En - 2) : Pn.slice(Hn + 2, En);
          Nn(Xn, Yn);
        }
      }), Gn = Tn.context[Mn].call(Tn, In), Tn.scanner.eof || Tn.error(), Gn;
    };
  }, create$3;
}
var sourceMapGenerator = {}, base64Vlq = {}, base64 = {}, hasRequiredBase64;
function requireBase64() {
  if (hasRequiredBase64) return base64;
  hasRequiredBase64 = 1;
  var Gr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
  return base64.encode = function(ze) {
    if (0 <= ze && ze < Gr.length)
      return Gr[ze];
    throw new TypeError("Must be between 0 and 63: " + ze);
  }, base64.decode = function(ze) {
    var Wr = 65, Yr = 90, Qr = 97, Kr = 122, Zr = 48, en = 57, tn = 43, rn = 47, sn = 26, on = 52;
    return Wr <= ze && ze <= Yr ? ze - Wr : Qr <= ze && ze <= Kr ? ze - Qr + sn : Zr <= ze && ze <= en ? ze - Zr + on : ze == tn ? 62 : ze == rn ? 63 : -1;
  }, base64;
}
var hasRequiredBase64Vlq;
function requireBase64Vlq() {
  if (hasRequiredBase64Vlq) return base64Vlq;
  hasRequiredBase64Vlq = 1;
  var Gr = requireBase64(), ze = 5, Wr = 1 << ze, Yr = Wr - 1, Qr = Wr;
  function Kr(en) {
    return en < 0 ? (-en << 1) + 1 : (en << 1) + 0;
  }
  function Zr(en) {
    var tn = (en & 1) === 1, rn = en >> 1;
    return tn ? -rn : rn;
  }
  return base64Vlq.encode = function(tn) {
    var rn = "", sn, on = Kr(tn);
    do
      sn = on & Yr, on >>>= ze, on > 0 && (sn |= Qr), rn += Gr.encode(sn);
    while (on > 0);
    return rn;
  }, base64Vlq.decode = function(tn, rn, sn) {
    var on = tn.length, an = 0, dn = 0, pn, mn;
    do {
      if (rn >= on)
        throw new Error("Expected more digits in base 64 VLQ value.");
      if (mn = Gr.decode(tn.charCodeAt(rn++)), mn === -1)
        throw new Error("Invalid base64 digit: " + tn.charAt(rn - 1));
      pn = !!(mn & Qr), mn &= Yr, an = an + (mn << dn), dn += ze;
    } while (pn);
    sn.value = Zr(an), sn.rest = rn;
  }, base64Vlq;
}
var util = {}, hasRequiredUtil;
function requireUtil() {
  return hasRequiredUtil || (hasRequiredUtil = 1, function(Gr) {
    function ze(fn, cn, Cn) {
      if (cn in fn)
        return fn[cn];
      if (arguments.length === 3)
        return Cn;
      throw new Error('"' + cn + '" is a required argument.');
    }
    Gr.getArg = ze;
    var Wr = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/, Yr = /^data:.+\,.+$/;
    function Qr(fn) {
      var cn = fn.match(Wr);
      return cn ? {
        scheme: cn[1],
        auth: cn[2],
        host: cn[3],
        port: cn[4],
        path: cn[5]
      } : null;
    }
    Gr.urlParse = Qr;
    function Kr(fn) {
      var cn = "";
      return fn.scheme && (cn += fn.scheme + ":"), cn += "//", fn.auth && (cn += fn.auth + "@"), fn.host && (cn += fn.host), fn.port && (cn += ":" + fn.port), fn.path && (cn += fn.path), cn;
    }
    Gr.urlGenerate = Kr;
    function Zr(fn) {
      var cn = fn, Cn = Qr(fn);
      if (Cn) {
        if (!Cn.path)
          return fn;
        cn = Cn.path;
      }
      for (var bn = Gr.isAbsolute(cn), Sn = cn.split(/\/+/), _n, Tn = 0, Ln = Sn.length - 1; Ln >= 0; Ln--)
        _n = Sn[Ln], _n === "." ? Sn.splice(Ln, 1) : _n === ".." ? Tn++ : Tn > 0 && (_n === "" ? (Sn.splice(Ln + 1, Tn), Tn = 0) : (Sn.splice(Ln, 2), Tn--));
      return cn = Sn.join("/"), cn === "" && (cn = bn ? "/" : "."), Cn ? (Cn.path = cn, Kr(Cn)) : cn;
    }
    Gr.normalize = Zr;
    function en(fn, cn) {
      fn === "" && (fn = "."), cn === "" && (cn = ".");
      var Cn = Qr(cn), bn = Qr(fn);
      if (bn && (fn = bn.path || "/"), Cn && !Cn.scheme)
        return bn && (Cn.scheme = bn.scheme), Kr(Cn);
      if (Cn || cn.match(Yr))
        return cn;
      if (bn && !bn.host && !bn.path)
        return bn.host = cn, Kr(bn);
      var Sn = cn.charAt(0) === "/" ? cn : Zr(fn.replace(/\/+$/, "") + "/" + cn);
      return bn ? (bn.path = Sn, Kr(bn)) : Sn;
    }
    Gr.join = en, Gr.isAbsolute = function(fn) {
      return fn.charAt(0) === "/" || Wr.test(fn);
    };
    function tn(fn, cn) {
      fn === "" && (fn = "."), fn = fn.replace(/\/$/, "");
      for (var Cn = 0; cn.indexOf(fn + "/") !== 0; ) {
        var bn = fn.lastIndexOf("/");
        if (bn < 0 || (fn = fn.slice(0, bn), fn.match(/^([^\/]+:\/)?\/*$/)))
          return cn;
        ++Cn;
      }
      return Array(Cn + 1).join("../") + cn.substr(fn.length + 1);
    }
    Gr.relative = tn;
    var rn = function() {
      var fn = /* @__PURE__ */ Object.create(null);
      return !("__proto__" in fn);
    }();
    function sn(fn) {
      return fn;
    }
    function on(fn) {
      return dn(fn) ? "$" + fn : fn;
    }
    Gr.toSetString = rn ? sn : on;
    function an(fn) {
      return dn(fn) ? fn.slice(1) : fn;
    }
    Gr.fromSetString = rn ? sn : an;
    function dn(fn) {
      if (!fn)
        return !1;
      var cn = fn.length;
      if (cn < 9 || fn.charCodeAt(cn - 1) !== 95 || fn.charCodeAt(cn - 2) !== 95 || fn.charCodeAt(cn - 3) !== 111 || fn.charCodeAt(cn - 4) !== 116 || fn.charCodeAt(cn - 5) !== 111 || fn.charCodeAt(cn - 6) !== 114 || fn.charCodeAt(cn - 7) !== 112 || fn.charCodeAt(cn - 8) !== 95 || fn.charCodeAt(cn - 9) !== 95)
        return !1;
      for (var Cn = cn - 10; Cn >= 0; Cn--)
        if (fn.charCodeAt(Cn) !== 36)
          return !1;
      return !0;
    }
    function pn(fn, cn, Cn) {
      var bn = vn(fn.source, cn.source);
      return bn !== 0 || (bn = fn.originalLine - cn.originalLine, bn !== 0) || (bn = fn.originalColumn - cn.originalColumn, bn !== 0 || Cn) || (bn = fn.generatedColumn - cn.generatedColumn, bn !== 0) || (bn = fn.generatedLine - cn.generatedLine, bn !== 0) ? bn : vn(fn.name, cn.name);
    }
    Gr.compareByOriginalPositions = pn;
    function mn(fn, cn, Cn) {
      var bn = fn.generatedLine - cn.generatedLine;
      return bn !== 0 || (bn = fn.generatedColumn - cn.generatedColumn, bn !== 0 || Cn) || (bn = vn(fn.source, cn.source), bn !== 0) || (bn = fn.originalLine - cn.originalLine, bn !== 0) || (bn = fn.originalColumn - cn.originalColumn, bn !== 0) ? bn : vn(fn.name, cn.name);
    }
    Gr.compareByGeneratedPositionsDeflated = mn;
    function vn(fn, cn) {
      return fn === cn ? 0 : fn === null ? 1 : cn === null ? -1 : fn > cn ? 1 : -1;
    }
    function xn(fn, cn) {
      var Cn = fn.generatedLine - cn.generatedLine;
      return Cn !== 0 || (Cn = fn.generatedColumn - cn.generatedColumn, Cn !== 0) || (Cn = vn(fn.source, cn.source), Cn !== 0) || (Cn = fn.originalLine - cn.originalLine, Cn !== 0) || (Cn = fn.originalColumn - cn.originalColumn, Cn !== 0) ? Cn : vn(fn.name, cn.name);
    }
    Gr.compareByGeneratedPositionsInflated = xn;
    function gn(fn) {
      return JSON.parse(fn.replace(/^\)]}'[^\n]*\n/, ""));
    }
    Gr.parseSourceMapInput = gn;
    function un(fn, cn, Cn) {
      if (cn = cn || "", fn && (fn[fn.length - 1] !== "/" && cn[0] !== "/" && (fn += "/"), cn = fn + cn), Cn) {
        var bn = Qr(Cn);
        if (!bn)
          throw new Error("sourceMapURL could not be parsed");
        if (bn.path) {
          var Sn = bn.path.lastIndexOf("/");
          Sn >= 0 && (bn.path = bn.path.substring(0, Sn + 1));
        }
        cn = en(Kr(bn), cn);
      }
      return Zr(cn);
    }
    Gr.computeSourceURL = un;
  }(util)), util;
}
var arraySet = {}, hasRequiredArraySet;
function requireArraySet() {
  if (hasRequiredArraySet) return arraySet;
  hasRequiredArraySet = 1;
  var Gr = requireUtil(), ze = Object.prototype.hasOwnProperty, Wr = typeof Map < "u";
  function Yr() {
    this._array = [], this._set = Wr ? /* @__PURE__ */ new Map() : /* @__PURE__ */ Object.create(null);
  }
  return Yr.fromArray = function(Kr, Zr) {
    for (var en = new Yr(), tn = 0, rn = Kr.length; tn < rn; tn++)
      en.add(Kr[tn], Zr);
    return en;
  }, Yr.prototype.size = function() {
    return Wr ? this._set.size : Object.getOwnPropertyNames(this._set).length;
  }, Yr.prototype.add = function(Kr, Zr) {
    var en = Wr ? Kr : Gr.toSetString(Kr), tn = Wr ? this.has(Kr) : ze.call(this._set, en), rn = this._array.length;
    (!tn || Zr) && this._array.push(Kr), tn || (Wr ? this._set.set(Kr, rn) : this._set[en] = rn);
  }, Yr.prototype.has = function(Kr) {
    if (Wr)
      return this._set.has(Kr);
    var Zr = Gr.toSetString(Kr);
    return ze.call(this._set, Zr);
  }, Yr.prototype.indexOf = function(Kr) {
    if (Wr) {
      var Zr = this._set.get(Kr);
      if (Zr >= 0)
        return Zr;
    } else {
      var en = Gr.toSetString(Kr);
      if (ze.call(this._set, en))
        return this._set[en];
    }
    throw new Error('"' + Kr + '" is not in the set.');
  }, Yr.prototype.at = function(Kr) {
    if (Kr >= 0 && Kr < this._array.length)
      return this._array[Kr];
    throw new Error("No element indexed by " + Kr);
  }, Yr.prototype.toArray = function() {
    return this._array.slice();
  }, arraySet.ArraySet = Yr, arraySet;
}
var mappingList = {}, hasRequiredMappingList;
function requireMappingList() {
  if (hasRequiredMappingList) return mappingList;
  hasRequiredMappingList = 1;
  var Gr = requireUtil();
  function ze(Yr, Qr) {
    var Kr = Yr.generatedLine, Zr = Qr.generatedLine, en = Yr.generatedColumn, tn = Qr.generatedColumn;
    return Zr > Kr || Zr == Kr && tn >= en || Gr.compareByGeneratedPositionsInflated(Yr, Qr) <= 0;
  }
  function Wr() {
    this._array = [], this._sorted = !0, this._last = { generatedLine: -1, generatedColumn: 0 };
  }
  return Wr.prototype.unsortedForEach = function(Qr, Kr) {
    this._array.forEach(Qr, Kr);
  }, Wr.prototype.add = function(Qr) {
    ze(this._last, Qr) ? (this._last = Qr, this._array.push(Qr)) : (this._sorted = !1, this._array.push(Qr));
  }, Wr.prototype.toArray = function() {
    return this._sorted || (this._array.sort(Gr.compareByGeneratedPositionsInflated), this._sorted = !0), this._array;
  }, mappingList.MappingList = Wr, mappingList;
}
var hasRequiredSourceMapGenerator;
function requireSourceMapGenerator() {
  if (hasRequiredSourceMapGenerator) return sourceMapGenerator;
  hasRequiredSourceMapGenerator = 1;
  var Gr = requireBase64Vlq(), ze = requireUtil(), Wr = requireArraySet().ArraySet, Yr = requireMappingList().MappingList;
  function Qr(Kr) {
    Kr || (Kr = {}), this._file = ze.getArg(Kr, "file", null), this._sourceRoot = ze.getArg(Kr, "sourceRoot", null), this._skipValidation = ze.getArg(Kr, "skipValidation", !1), this._sources = new Wr(), this._names = new Wr(), this._mappings = new Yr(), this._sourcesContents = null;
  }
  return Qr.prototype._version = 3, Qr.fromSourceMap = function(Zr) {
    var en = Zr.sourceRoot, tn = new Qr({
      file: Zr.file,
      sourceRoot: en
    });
    return Zr.eachMapping(function(rn) {
      var sn = {
        generated: {
          line: rn.generatedLine,
          column: rn.generatedColumn
        }
      };
      rn.source != null && (sn.source = rn.source, en != null && (sn.source = ze.relative(en, sn.source)), sn.original = {
        line: rn.originalLine,
        column: rn.originalColumn
      }, rn.name != null && (sn.name = rn.name)), tn.addMapping(sn);
    }), Zr.sources.forEach(function(rn) {
      var sn = rn;
      en !== null && (sn = ze.relative(en, rn)), tn._sources.has(sn) || tn._sources.add(sn);
      var on = Zr.sourceContentFor(rn);
      on != null && tn.setSourceContent(rn, on);
    }), tn;
  }, Qr.prototype.addMapping = function(Zr) {
    var en = ze.getArg(Zr, "generated"), tn = ze.getArg(Zr, "original", null), rn = ze.getArg(Zr, "source", null), sn = ze.getArg(Zr, "name", null);
    this._skipValidation || this._validateMapping(en, tn, rn, sn), rn != null && (rn = String(rn), this._sources.has(rn) || this._sources.add(rn)), sn != null && (sn = String(sn), this._names.has(sn) || this._names.add(sn)), this._mappings.add({
      generatedLine: en.line,
      generatedColumn: en.column,
      originalLine: tn != null && tn.line,
      originalColumn: tn != null && tn.column,
      source: rn,
      name: sn
    });
  }, Qr.prototype.setSourceContent = function(Zr, en) {
    var tn = Zr;
    this._sourceRoot != null && (tn = ze.relative(this._sourceRoot, tn)), en != null ? (this._sourcesContents || (this._sourcesContents = /* @__PURE__ */ Object.create(null)), this._sourcesContents[ze.toSetString(tn)] = en) : this._sourcesContents && (delete this._sourcesContents[ze.toSetString(tn)], Object.keys(this._sourcesContents).length === 0 && (this._sourcesContents = null));
  }, Qr.prototype.applySourceMap = function(Zr, en, tn) {
    var rn = en;
    if (en == null) {
      if (Zr.file == null)
        throw new Error(
          `SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`
        );
      rn = Zr.file;
    }
    var sn = this._sourceRoot;
    sn != null && (rn = ze.relative(sn, rn));
    var on = new Wr(), an = new Wr();
    this._mappings.unsortedForEach(function(dn) {
      if (dn.source === rn && dn.originalLine != null) {
        var pn = Zr.originalPositionFor({
          line: dn.originalLine,
          column: dn.originalColumn
        });
        pn.source != null && (dn.source = pn.source, tn != null && (dn.source = ze.join(tn, dn.source)), sn != null && (dn.source = ze.relative(sn, dn.source)), dn.originalLine = pn.line, dn.originalColumn = pn.column, pn.name != null && (dn.name = pn.name));
      }
      var mn = dn.source;
      mn != null && !on.has(mn) && on.add(mn);
      var vn = dn.name;
      vn != null && !an.has(vn) && an.add(vn);
    }, this), this._sources = on, this._names = an, Zr.sources.forEach(function(dn) {
      var pn = Zr.sourceContentFor(dn);
      pn != null && (tn != null && (dn = ze.join(tn, dn)), sn != null && (dn = ze.relative(sn, dn)), this.setSourceContent(dn, pn));
    }, this);
  }, Qr.prototype._validateMapping = function(Zr, en, tn, rn) {
    if (en && typeof en.line != "number" && typeof en.column != "number")
      throw new Error(
        "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values."
      );
    if (!(Zr && "line" in Zr && "column" in Zr && Zr.line > 0 && Zr.column >= 0 && !en && !tn && !rn)) {
      if (Zr && "line" in Zr && "column" in Zr && en && "line" in en && "column" in en && Zr.line > 0 && Zr.column >= 0 && en.line > 0 && en.column >= 0 && tn)
        return;
      throw new Error("Invalid mapping: " + JSON.stringify({
        generated: Zr,
        source: tn,
        original: en,
        name: rn
      }));
    }
  }, Qr.prototype._serializeMappings = function() {
    for (var Zr = 0, en = 1, tn = 0, rn = 0, sn = 0, on = 0, an = "", dn, pn, mn, vn, xn = this._mappings.toArray(), gn = 0, un = xn.length; gn < un; gn++) {
      if (pn = xn[gn], dn = "", pn.generatedLine !== en)
        for (Zr = 0; pn.generatedLine !== en; )
          dn += ";", en++;
      else if (gn > 0) {
        if (!ze.compareByGeneratedPositionsInflated(pn, xn[gn - 1]))
          continue;
        dn += ",";
      }
      dn += Gr.encode(pn.generatedColumn - Zr), Zr = pn.generatedColumn, pn.source != null && (vn = this._sources.indexOf(pn.source), dn += Gr.encode(vn - on), on = vn, dn += Gr.encode(pn.originalLine - 1 - rn), rn = pn.originalLine - 1, dn += Gr.encode(pn.originalColumn - tn), tn = pn.originalColumn, pn.name != null && (mn = this._names.indexOf(pn.name), dn += Gr.encode(mn - sn), sn = mn)), an += dn;
    }
    return an;
  }, Qr.prototype._generateSourcesContent = function(Zr, en) {
    return Zr.map(function(tn) {
      if (!this._sourcesContents)
        return null;
      en != null && (tn = ze.relative(en, tn));
      var rn = ze.toSetString(tn);
      return Object.prototype.hasOwnProperty.call(this._sourcesContents, rn) ? this._sourcesContents[rn] : null;
    }, this);
  }, Qr.prototype.toJSON = function() {
    var Zr = {
      version: this._version,
      sources: this._sources.toArray(),
      names: this._names.toArray(),
      mappings: this._serializeMappings()
    };
    return this._file != null && (Zr.file = this._file), this._sourceRoot != null && (Zr.sourceRoot = this._sourceRoot), this._sourcesContents && (Zr.sourcesContent = this._generateSourcesContent(Zr.sources, Zr.sourceRoot)), Zr;
  }, Qr.prototype.toString = function() {
    return JSON.stringify(this.toJSON());
  }, sourceMapGenerator.SourceMapGenerator = Qr, sourceMapGenerator;
}
var sourceMap, hasRequiredSourceMap;
function requireSourceMap() {
  if (hasRequiredSourceMap) return sourceMap;
  hasRequiredSourceMap = 1;
  var Gr = requireSourceMapGenerator().SourceMapGenerator, ze = {
    Atrule: !0,
    Selector: !0,
    Declaration: !0
  };
  return sourceMap = function(Yr) {
    var Qr = new Gr(), Kr = 1, Zr = 0, en = {
      line: 1,
      column: 0
    }, tn = {
      line: 0,
      // should be zero to add first mapping
      column: 0
    }, rn = !1, sn = {
      line: 1,
      column: 0
    }, on = {
      generated: sn
    }, an = Yr.node;
    Yr.node = function(mn) {
      if (mn.loc && mn.loc.start && ze.hasOwnProperty(mn.type)) {
        var vn = mn.loc.start.line, xn = mn.loc.start.column - 1;
        (tn.line !== vn || tn.column !== xn) && (tn.line = vn, tn.column = xn, en.line = Kr, en.column = Zr, rn && (rn = !1, (en.line !== sn.line || en.column !== sn.column) && Qr.addMapping(on)), rn = !0, Qr.addMapping({
          source: mn.loc.source,
          original: tn,
          generated: en
        }));
      }
      an.call(this, mn), rn && ze.hasOwnProperty(mn.type) && (sn.line = Kr, sn.column = Zr);
    };
    var dn = Yr.chunk;
    Yr.chunk = function(mn) {
      for (var vn = 0; vn < mn.length; vn++)
        mn.charCodeAt(vn) === 10 ? (Kr++, Zr = 0) : Zr++;
      dn(mn);
    };
    var pn = Yr.result;
    return Yr.result = function() {
      return rn && Qr.addMapping(on), {
        css: pn(),
        map: Qr
      };
    }, Yr;
  }, sourceMap;
}
var create$2, hasRequiredCreate$3;
function requireCreate$3() {
  if (hasRequiredCreate$3) return create$2;
  hasRequiredCreate$3 = 1;
  var Gr = requireSourceMap(), ze = Object.prototype.hasOwnProperty;
  function Wr(Yr, Qr) {
    var Kr = Yr.children, Zr = null;
    typeof Qr != "function" ? Kr.forEach(this.node, this) : Kr.forEach(function(en) {
      Zr !== null && Qr.call(this, Zr), this.node(en), Zr = en;
    }, this);
  }
  return create$2 = function(Qr) {
    function Kr(tn) {
      if (ze.call(Zr, tn.type))
        Zr[tn.type].call(this, tn);
      else
        throw new Error("Unknown node type: " + tn.type);
    }
    var Zr = {};
    if (Qr.node)
      for (var en in Qr.node)
        Zr[en] = Qr.node[en].generate;
    return function(tn, rn) {
      var sn = "", on = {
        children: Wr,
        node: Kr,
        chunk: function(an) {
          sn += an;
        },
        result: function() {
          return sn;
        }
      };
      return rn && (typeof rn.decorator == "function" && (on = rn.decorator(on)), rn.sourceMap && (on = Gr(on))), on.node(tn), on.result();
    };
  }, create$2;
}
var create$1, hasRequiredCreate$2;
function requireCreate$2() {
  if (hasRequiredCreate$2) return create$1;
  hasRequiredCreate$2 = 1;
  var Gr = requireList();
  return create$1 = function(Wr) {
    return {
      fromPlainObject: function(Yr) {
        return Wr(Yr, {
          enter: function(Qr) {
            Qr.children && !(Qr.children instanceof Gr) && (Qr.children = new Gr().fromArray(Qr.children));
          }
        }), Yr;
      },
      toPlainObject: function(Yr) {
        return Wr(Yr, {
          leave: function(Qr) {
            Qr.children && Qr.children instanceof Gr && (Qr.children = Qr.children.toArray());
          }
        }), Yr;
      }
    };
  }, create$1;
}
var create, hasRequiredCreate$1;
function requireCreate$1() {
  if (hasRequiredCreate$1) return create;
  hasRequiredCreate$1 = 1;
  var Gr = Object.prototype.hasOwnProperty, ze = function() {
  };
  function Wr(tn) {
    return typeof tn == "function" ? tn : ze;
  }
  function Yr(tn, rn) {
    return function(sn, on, an) {
      sn.type === rn && tn.call(this, sn, on, an);
    };
  }
  function Qr(tn, rn) {
    var sn = rn.structure, on = [];
    for (var an in sn)
      if (Gr.call(sn, an) !== !1) {
        var dn = sn[an], pn = {
          name: an,
          type: !1,
          nullable: !1
        };
        Array.isArray(sn[an]) || (dn = [sn[an]]);
        for (var mn = 0; mn < dn.length; mn++) {
          var vn = dn[mn];
          vn === null ? pn.nullable = !0 : typeof vn == "string" ? pn.type = "node" : Array.isArray(vn) && (pn.type = "list");
        }
        pn.type && on.push(pn);
      }
    return on.length ? {
      context: rn.walkContext,
      fields: on
    } : null;
  }
  function Kr(tn) {
    var rn = {};
    for (var sn in tn.node)
      if (Gr.call(tn.node, sn)) {
        var on = tn.node[sn];
        if (!on.structure)
          throw new Error("Missed `structure` field in `" + sn + "` node type definition");
        rn[sn] = Qr(sn, on);
      }
    return rn;
  }
  function Zr(tn, rn) {
    var sn = tn.fields.slice(), on = tn.context, an = typeof on == "string";
    return rn && sn.reverse(), function(dn, pn, mn, vn) {
      var xn;
      an && (xn = pn[on], pn[on] = dn);
      for (var gn = 0; gn < sn.length; gn++) {
        var un = sn[gn], fn = dn[un.name];
        if (!un.nullable || fn) {
          if (un.type === "list") {
            var cn = rn ? fn.reduceRight(vn, !1) : fn.reduce(vn, !1);
            if (cn)
              return !0;
          } else if (mn(fn))
            return !0;
        }
      }
      an && (pn[on] = xn);
    };
  }
  function en(tn) {
    return {
      Atrule: {
        StyleSheet: tn.StyleSheet,
        Atrule: tn.Atrule,
        Rule: tn.Rule,
        Block: tn.Block
      },
      Rule: {
        StyleSheet: tn.StyleSheet,
        Atrule: tn.Atrule,
        Rule: tn.Rule,
        Block: tn.Block
      },
      Declaration: {
        StyleSheet: tn.StyleSheet,
        Atrule: tn.Atrule,
        Rule: tn.Rule,
        Block: tn.Block,
        DeclarationList: tn.DeclarationList
      }
    };
  }
  return create = function(rn) {
    var sn = Kr(rn), on = {}, an = {}, dn = Symbol("break-walk"), pn = Symbol("skip-node");
    for (var mn in sn)
      Gr.call(sn, mn) && sn[mn] !== null && (on[mn] = Zr(sn[mn], !1), an[mn] = Zr(sn[mn], !0));
    var vn = en(on), xn = en(an), gn = function(un, fn) {
      function cn(Ln, Pn, In) {
        var Mn = bn.call(Tn, Ln, Pn, In);
        if (Mn === dn) {
          debugger;
          return !0;
        }
        return Mn === pn ? !1 : !!(_n.hasOwnProperty(Ln.type) && _n[Ln.type](Ln, Tn, cn, Cn) || Sn.call(Tn, Ln, Pn, In) === dn);
      }
      var Cn = (Ln, Pn, In, Mn) => Ln || cn(Pn, In, Mn), bn = ze, Sn = ze, _n = on, Tn = {
        break: dn,
        skip: pn,
        root: un,
        stylesheet: null,
        atrule: null,
        atrulePrelude: null,
        rule: null,
        selector: null,
        block: null,
        declaration: null,
        function: null
      };
      if (typeof fn == "function")
        bn = fn;
      else if (fn && (bn = Wr(fn.enter), Sn = Wr(fn.leave), fn.reverse && (_n = an), fn.visit)) {
        if (vn.hasOwnProperty(fn.visit))
          _n = fn.reverse ? xn[fn.visit] : vn[fn.visit];
        else if (!sn.hasOwnProperty(fn.visit))
          throw new Error("Bad value `" + fn.visit + "` for `visit` option (should be: " + Object.keys(sn).join(", ") + ")");
        bn = Yr(bn, fn.visit), Sn = Yr(Sn, fn.visit);
      }
      if (bn === ze && Sn === ze)
        throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function");
      cn(un);
    };
    return gn.break = dn, gn.skip = pn, gn.find = function(un, fn) {
      var cn = null;
      return gn(un, function(Cn, bn, Sn) {
        if (fn.call(this, Cn, bn, Sn))
          return cn = Cn, dn;
      }), cn;
    }, gn.findLast = function(un, fn) {
      var cn = null;
      return gn(un, {
        reverse: !0,
        enter: function(Cn, bn, Sn) {
          if (fn.call(this, Cn, bn, Sn))
            return cn = Cn, dn;
        }
      }), cn;
    }, gn.findAll = function(un, fn) {
      var cn = [];
      return gn(un, function(Cn, bn, Sn) {
        fn.call(this, Cn, bn, Sn) && cn.push(Cn);
      }), cn;
    }, gn;
  }, create;
}
var clone, hasRequiredClone;
function requireClone() {
  if (hasRequiredClone) return clone;
  hasRequiredClone = 1;
  var Gr = requireList();
  return clone = function ze(Wr) {
    var Yr = {};
    for (var Qr in Wr) {
      var Kr = Wr[Qr];
      Kr && (Array.isArray(Kr) || Kr instanceof Gr ? Kr = Kr.map(ze) : Kr.constructor === Object && (Kr = ze(Kr))), Yr[Qr] = Kr;
    }
    return Yr;
  }, clone;
}
var mix_1, hasRequiredMix;
function requireMix() {
  if (hasRequiredMix) return mix_1;
  hasRequiredMix = 1;
  const Gr = Object.prototype.hasOwnProperty, ze = {
    generic: !0,
    types: en,
    atrules: {
      prelude: tn,
      descriptors: tn
    },
    properties: en,
    parseContext: Qr,
    scope: Kr,
    atrule: ["parse"],
    pseudo: ["parse"],
    node: ["name", "structure", "parse", "generate", "walkContext"]
  };
  function Wr(sn) {
    return sn && sn.constructor === Object;
  }
  function Yr(sn) {
    return Wr(sn) ? Object.assign({}, sn) : sn;
  }
  function Qr(sn, on) {
    return Object.assign(sn, on);
  }
  function Kr(sn, on) {
    for (const an in on)
      Gr.call(on, an) && (Wr(sn[an]) ? Kr(sn[an], Yr(on[an])) : sn[an] = Yr(on[an]));
    return sn;
  }
  function Zr(sn, on) {
    return typeof on == "string" && /^\s*\|/.test(on) ? typeof sn == "string" ? sn + on : on.replace(/^\s*\|\s*/, "") : on || null;
  }
  function en(sn, on) {
    if (typeof on == "string")
      return Zr(sn, on);
    const an = Object.assign({}, sn);
    for (let dn in on)
      Gr.call(on, dn) && (an[dn] = Zr(Gr.call(sn, dn) ? sn[dn] : void 0, on[dn]));
    return an;
  }
  function tn(sn, on) {
    const an = en(sn, on);
    return !Wr(an) || Object.keys(an).length ? an : null;
  }
  function rn(sn, on, an) {
    for (const dn in an)
      if (Gr.call(an, dn) !== !1) {
        if (an[dn] === !0)
          dn in on && Gr.call(on, dn) && (sn[dn] = Yr(on[dn]));
        else if (an[dn]) {
          if (typeof an[dn] == "function") {
            const pn = an[dn];
            sn[dn] = pn({}, sn[dn]), sn[dn] = pn(sn[dn] || {}, on[dn]);
          } else if (Wr(an[dn])) {
            const pn = {};
            for (let mn in sn[dn])
              pn[mn] = rn({}, sn[dn][mn], an[dn]);
            for (let mn in on[dn])
              pn[mn] = rn(pn[mn] || {}, on[dn][mn], an[dn]);
            sn[dn] = pn;
          } else if (Array.isArray(an[dn])) {
            const pn = {}, mn = an[dn].reduce(function(vn, xn) {
              return vn[xn] = !0, vn;
            }, {});
            for (const [vn, xn] of Object.entries(sn[dn] || {}))
              pn[vn] = {}, xn && rn(pn[vn], xn, mn);
            for (const vn in on[dn])
              Gr.call(on[dn], vn) && (pn[vn] || (pn[vn] = {}), on[dn] && on[dn][vn] && rn(pn[vn], on[dn][vn], mn));
            sn[dn] = pn;
          }
        }
      }
    return sn;
  }
  return mix_1 = (sn, on) => rn(sn, on, ze), mix_1;
}
var hasRequiredCreate;
function requireCreate() {
  if (hasRequiredCreate) return create$4;
  hasRequiredCreate = 1;
  var Gr = requireList(), ze = require_SyntaxError$1(), Wr = requireTokenStream(), Yr = requireLexer$1(), Qr = requireDefinitionSyntax(), Kr = requireTokenizer$1(), Zr = requireCreate$4(), en = requireCreate$3(), tn = requireCreate$2(), rn = requireCreate$1(), sn = requireClone(), on = requireNames(), an = requireMix();
  function dn(pn) {
    var mn = Zr(pn), vn = rn(pn), xn = en(pn), gn = tn(vn), un = {
      List: Gr,
      SyntaxError: ze,
      TokenStream: Wr,
      Lexer: Yr,
      vendorPrefix: on.vendorPrefix,
      keyword: on.keyword,
      property: on.property,
      isCustomProperty: on.isCustomProperty,
      definitionSyntax: Qr,
      lexer: null,
      createLexer: function(fn) {
        return new Yr(fn, un, un.lexer.structure);
      },
      tokenize: Kr,
      parse: mn,
      walk: vn,
      generate: xn,
      find: vn.find,
      findLast: vn.findLast,
      findAll: vn.findAll,
      clone: sn,
      fromPlainObject: gn.fromPlainObject,
      toPlainObject: gn.toPlainObject,
      createSyntax: function(fn) {
        return dn(an({}, fn));
      },
      fork: function(fn) {
        var cn = an({}, pn);
        return dn(
          typeof fn == "function" ? fn(cn, Object.assign) : an(cn, fn)
        );
      }
    };
    return un.lexer = new Yr({
      generic: !0,
      types: pn.types,
      atrules: pn.atrules,
      properties: pn.properties,
      node: pn.node
    }, un), un;
  }
  return create$4.create = function(pn) {
    return dn(an({}, pn));
  }, create$4;
}
const require$$0 = {
  "@charset": { syntax: '@charset "<charset>";', groups: ["CSS Charsets"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/@charset" },
  "@counter-style": { syntax: `@counter-style <counter-style-name> {
  [ system: <counter-system>; ] ||
  [ symbols: <counter-symbols>; ] ||
  [ additive-symbols: <additive-symbols>; ] ||
  [ negative: <negative-symbol>; ] ||
  [ prefix: <prefix>; ] ||
  [ suffix: <suffix>; ] ||
  [ range: <range>; ] ||
  [ pad: <padding>; ] ||
  [ speak-as: <speak-as>; ] ||
  [ fallback: <counter-style-name>; ]
}`, interfaces: ["CSSCounterStyleRule"], groups: ["CSS Counter Styles"], descriptors: { "additive-symbols": { syntax: "[ <integer> && <symbol> ]#", media: "all", initial: "n/a (required)", percentages: "no", computed: "asSpecified", order: "orderOfAppearance", status: "standard" }, fallback: { syntax: "<counter-style-name>", media: "all", initial: "decimal", percentages: "no", computed: "asSpecified", order: "uniqueOrder", status: "standard" }, negative: { syntax: "<symbol> <symbol>?", media: "all", initial: '"-" hyphen-minus', percentages: "no", computed: "asSpecified", order: "orderOfAppearance", status: "standard" }, pad: { syntax: "<integer> && <symbol>", media: "all", initial: '0 ""', percentages: "no", computed: "asSpecified", order: "uniqueOrder", status: "standard" }, prefix: { syntax: "<symbol>", media: "all", initial: '""', percentages: "no", computed: "asSpecified", order: "uniqueOrder", status: "standard" }, range: { syntax: "[ [ <integer> | infinite ]{2} ]# | auto", media: "all", initial: "auto", percentages: "no", computed: "asSpecified", order: "orderOfAppearance", status: "standard" }, "speak-as": { syntax: "auto | bullets | numbers | words | spell-out | <counter-style-name>", media: "all", initial: "auto", percentages: "no", computed: "asSpecified", order: "uniqueOrder", status: "standard" }, suffix: { syntax: "<symbol>", media: "all", initial: '". "', percentages: "no", computed: "asSpecified", order: "uniqueOrder", status: "standard" }, symbols: { syntax: "<symbol>+", media: "all", initial: "n/a (required)", percentages: "no", computed: "asSpecified", order: "orderOfAppearance", status: "standard" }, system: { syntax: "cyclic | numeric | alphabetic | symbolic | additive | [ fixed <integer>? ] | [ extends <counter-style-name> ]", media: "all", initial: "symbolic", percentages: "no", computed: "asSpecified", order: "uniqueOrder", status: "standard" } }, status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/@counter-style" },
  "@document": { syntax: `@document [ <url> | url-prefix(<string>) | domain(<string>) | media-document(<string>) | regexp(<string>) ]# {
  <group-rule-body>
}`, interfaces: ["CSSGroupingRule", "CSSConditionRule"], groups: ["CSS Conditional Rules"], status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/@document" },
  "@font-face": { syntax: `@font-face {
  [ font-family: <family-name>; ] ||
  [ src: <src>; ] ||
  [ unicode-range: <unicode-range>; ] ||
  [ font-variant: <font-variant>; ] ||
  [ font-feature-settings: <font-feature-settings>; ] ||
  [ font-variation-settings: <font-variation-settings>; ] ||
  [ font-stretch: <font-stretch>; ] ||
  [ font-weight: <font-weight>; ] ||
  [ font-style: <font-style>; ]
}`, interfaces: ["CSSFontFaceRule"], groups: ["CSS Fonts"], descriptors: { "font-display": { syntax: "[ auto | block | swap | fallback | optional ]", media: "visual", percentages: "no", initial: "auto", computed: "asSpecified", order: "uniqueOrder", status: "experimental" }, "font-family": { syntax: "<family-name>", media: "all", initial: "n/a (required)", percentages: "no", computed: "asSpecified", order: "uniqueOrder", status: "standard" }, "font-feature-settings": { syntax: "normal | <feature-tag-value>#", media: "all", initial: "normal", percentages: "no", computed: "asSpecified", order: "orderOfAppearance", status: "standard" }, "font-variation-settings": { syntax: "normal | [ <string> <number> ]#", media: "all", initial: "normal", percentages: "no", computed: "asSpecified", order: "orderOfAppearance", status: "standard" }, "font-stretch": { syntax: "<font-stretch-absolute>{1,2}", media: "all", initial: "normal", percentages: "no", computed: "asSpecified", order: "uniqueOrder", status: "standard" }, "font-style": { syntax: "normal | italic | oblique <angle>{0,2}", media: "all", initial: "normal", percentages: "no", computed: "asSpecified", order: "uniqueOrder", status: "standard" }, "font-weight": { syntax: "<font-weight-absolute>{1,2}", media: "all", initial: "normal", percentages: "no", computed: "asSpecified", order: "uniqueOrder", status: "standard" }, "font-variant": { syntax: "normal | none | [ <common-lig-values> || <discretionary-lig-values> || <historical-lig-values> || <contextual-alt-values> || stylistic(<feature-value-name>) || historical-forms || styleset(<feature-value-name>#) || character-variant(<feature-value-name>#) || swash(<feature-value-name>) || ornaments(<feature-value-name>) || annotation(<feature-value-name>) || [ small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps ] || <numeric-figure-values> || <numeric-spacing-values> || <numeric-fraction-values> || ordinal || slashed-zero || <east-asian-variant-values> || <east-asian-width-values> || ruby ]", media: "all", initial: "normal", percentages: "no", computed: "asSpecified", order: "orderOfAppearance", status: "standard" }, src: { syntax: "[ <url> [ format( <string># ) ]? | local( <family-name> ) ]#", media: "all", initial: "n/a (required)", percentages: "no", computed: "asSpecified", order: "orderOfAppearance", status: "standard" }, "unicode-range": { syntax: "<unicode-range>#", media: "all", initial: "U+0-10FFFF", percentages: "no", computed: "asSpecified", order: "orderOfAppearance", status: "standard" } }, status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/@font-face" },
  "@font-feature-values": { syntax: `@font-feature-values <family-name># {
  <feature-value-block-list>
}`, interfaces: ["CSSFontFeatureValuesRule"], groups: ["CSS Fonts"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/@font-feature-values" },
  "@import": { syntax: "@import [ <string> | <url> ] [ <media-query-list> ]?;", groups: ["Media Queries"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/@import" },
  "@keyframes": { syntax: `@keyframes <keyframes-name> {
  <keyframe-block-list>
}`, interfaces: ["CSSKeyframeRule", "CSSKeyframesRule"], groups: ["CSS Animations"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/@keyframes" },
  "@media": { syntax: `@media <media-query-list> {
  <group-rule-body>
}`, interfaces: ["CSSGroupingRule", "CSSConditionRule", "CSSMediaRule", "CSSCustomMediaRule"], groups: ["CSS Conditional Rules", "Media Queries"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/@media" },
  "@namespace": { syntax: "@namespace <namespace-prefix>? [ <string> | <url> ];", groups: ["CSS Namespaces"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/@namespace" },
  "@page": { syntax: `@page <page-selector-list> {
  <page-body>
}`, interfaces: ["CSSPageRule"], groups: ["CSS Pages"], descriptors: { bleed: { syntax: "auto | <length>", media: ["visual", "paged"], initial: "auto", percentages: "no", computed: "asSpecified", order: "uniqueOrder", status: "standard" }, marks: { syntax: "none | [ crop || cross ]", media: ["visual", "paged"], initial: "none", percentages: "no", computed: "asSpecified", order: "orderOfAppearance", status: "standard" }, size: { syntax: "<length>{1,2} | auto | [ <page-size> || [ portrait | landscape ] ]", media: ["visual", "paged"], initial: "auto", percentages: "no", computed: "asSpecifiedRelativeToAbsoluteLengths", order: "orderOfAppearance", status: "standard" } }, status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/@page" },
  "@property": { syntax: `@property <custom-property-name> {
  <declaration-list>
}`, interfaces: ["CSS", "CSSPropertyRule"], groups: ["CSS Houdini"], descriptors: { syntax: { syntax: "<string>", media: "all", percentages: "no", initial: "n/a (required)", computed: "asSpecified", order: "uniqueOrder", status: "experimental" }, inherits: { syntax: "true | false", media: "all", percentages: "no", initial: "auto", computed: "asSpecified", order: "uniqueOrder", status: "experimental" }, "initial-value": { syntax: "<string>", media: "all", initial: "n/a (required)", percentages: "no", computed: "asSpecified", order: "uniqueOrder", status: "experimental" } }, status: "experimental", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/@property" },
  "@supports": { syntax: `@supports <supports-condition> {
  <group-rule-body>
}`, interfaces: ["CSSGroupingRule", "CSSConditionRule", "CSSSupportsRule"], groups: ["CSS Conditional Rules"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/@supports" },
  "@viewport": { syntax: `@viewport {
  <group-rule-body>
}`, interfaces: ["CSSViewportRule"], groups: ["CSS Device Adaptation"], descriptors: { height: { syntax: "<viewport-length>{1,2}", media: ["visual", "continuous"], initial: ["min-height", "max-height"], percentages: ["min-height", "max-height"], computed: ["min-height", "max-height"], order: "orderOfAppearance", status: "standard" }, "max-height": { syntax: "<viewport-length>", media: ["visual", "continuous"], initial: "auto", percentages: "referToHeightOfInitialViewport", computed: "lengthAbsolutePercentageAsSpecifiedOtherwiseAuto", order: "uniqueOrder", status: "standard" }, "max-width": { syntax: "<viewport-length>", media: ["visual", "continuous"], initial: "auto", percentages: "referToWidthOfInitialViewport", computed: "lengthAbsolutePercentageAsSpecifiedOtherwiseAuto", order: "uniqueOrder", status: "standard" }, "max-zoom": { syntax: "auto | <number> | <percentage>", media: ["visual", "continuous"], initial: "auto", percentages: "the zoom factor itself", computed: "autoNonNegativeOrPercentage", order: "uniqueOrder", status: "standard" }, "min-height": { syntax: "<viewport-length>", media: ["visual", "continuous"], initial: "auto", percentages: "referToHeightOfInitialViewport", computed: "lengthAbsolutePercentageAsSpecifiedOtherwiseAuto", order: "uniqueOrder", status: "standard" }, "min-width": { syntax: "<viewport-length>", media: ["visual", "continuous"], initial: "auto", percentages: "referToWidthOfInitialViewport", computed: "lengthAbsolutePercentageAsSpecifiedOtherwiseAuto", order: "uniqueOrder", status: "standard" }, "min-zoom": { syntax: "auto | <number> | <percentage>", media: ["visual", "continuous"], initial: "auto", percentages: "the zoom factor itself", computed: "autoNonNegativeOrPercentage", order: "uniqueOrder", status: "standard" }, orientation: { syntax: "auto | portrait | landscape", media: ["visual", "continuous"], initial: "auto", percentages: "referToSizeOfBoundingBox", computed: "asSpecified", order: "uniqueOrder", status: "standard" }, "user-zoom": { syntax: "zoom | fixed", media: ["visual", "continuous"], initial: "zoom", percentages: "referToSizeOfBoundingBox", computed: "asSpecified", order: "uniqueOrder", status: "standard" }, "viewport-fit": { syntax: "auto | contain | cover", media: ["visual", "continuous"], initial: "auto", percentages: "no", computed: "asSpecified", order: "uniqueOrder", status: "standard" }, width: { syntax: "<viewport-length>{1,2}", media: ["visual", "continuous"], initial: ["min-width", "max-width"], percentages: ["min-width", "max-width"], computed: ["min-width", "max-width"], order: "orderOfAppearance", status: "standard" }, zoom: { syntax: "auto | <number> | <percentage>", media: ["visual", "continuous"], initial: "auto", percentages: "the zoom factor itself", computed: "autoNonNegativeOrPercentage", order: "uniqueOrder", status: "standard" } }, status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/@viewport" }
}, all = { syntax: "initial | inherit | unset | revert", media: "noPracticalMedia", inherited: !1, animationType: "eachOfShorthandPropertiesExceptUnicodeBiDiAndDirection", percentages: "no", groups: ["CSS Miscellaneous"], initial: "noPracticalInitialValue", appliesto: "allElements", computed: "asSpecifiedAppliesToEachProperty", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/all" }, animation = { syntax: "<single-animation>#", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Animations"], initial: ["animation-name", "animation-duration", "animation-timing-function", "animation-delay", "animation-iteration-count", "animation-direction", "animation-fill-mode", "animation-play-state"], appliesto: "allElementsAndPseudos", computed: ["animation-name", "animation-duration", "animation-timing-function", "animation-delay", "animation-direction", "animation-iteration-count", "animation-fill-mode", "animation-play-state"], order: "orderOfAppearance", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/animation" }, appearance = { syntax: "none | auto | textfield | menulist-button | <compat-auto>", media: "all", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Basic User Interface"], initial: "auto", appliesto: "allElements", computed: "asSpecified", order: "perGrammar", status: "experimental", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/appearance" }, azimuth = { syntax: "<angle> | [ [ left-side | far-left | left | center-left | center | center-right | right | far-right | right-side ] || behind ] | leftwards | rightwards", media: "aural", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Speech"], initial: "center", appliesto: "allElements", computed: "normalizedAngle", order: "orderOfAppearance", status: "obsolete", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/azimuth" }, background = { syntax: "[ <bg-layer> , ]* <final-bg-layer>", media: "visual", inherited: !1, animationType: ["background-color", "background-image", "background-clip", "background-position", "background-size", "background-repeat", "background-attachment"], percentages: ["background-position", "background-size"], groups: ["CSS Backgrounds and Borders"], initial: ["background-image", "background-position", "background-size", "background-repeat", "background-origin", "background-clip", "background-attachment", "background-color"], appliesto: "allElements", computed: ["background-image", "background-position", "background-size", "background-repeat", "background-origin", "background-clip", "background-attachment", "background-color"], order: "orderOfAppearance", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/background" }, border = { syntax: "<line-width> || <line-style> || <color>", media: "visual", inherited: !1, animationType: ["border-color", "border-style", "border-width"], percentages: "no", groups: ["CSS Backgrounds and Borders"], initial: ["border-width", "border-style", "border-color"], appliesto: "allElements", computed: ["border-width", "border-style", "border-color"], order: "orderOfAppearance", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border" }, bottom = { syntax: "<length> | <percentage> | auto", media: "visual", inherited: !1, animationType: "lpc", percentages: "referToContainingBlockHeight", groups: ["CSS Positioning"], initial: "auto", appliesto: "positionedElements", computed: "lengthAbsolutePercentageAsSpecifiedOtherwiseAuto", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/bottom" }, clear = { syntax: "none | left | right | both | inline-start | inline-end", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Positioning"], initial: "none", appliesto: "blockLevelElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/clear" }, clip = { syntax: "<shape> | auto", media: "visual", inherited: !1, animationType: "rectangle", percentages: "no", groups: ["CSS Masking"], initial: "auto", appliesto: "absolutelyPositionedElements", computed: "autoOrRectangle", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/clip" }, color$1 = { syntax: "<color>", media: "visual", inherited: !0, animationType: "color", percentages: "no", groups: ["CSS Color"], initial: "variesFromBrowserToBrowser", appliesto: "allElements", computed: "translucentValuesRGBAOtherwiseRGB", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/color" }, columns = { syntax: "<'column-width'> || <'column-count'>", media: "visual", inherited: !1, animationType: ["column-width", "column-count"], percentages: "no", groups: ["CSS Columns"], initial: ["column-width", "column-count"], appliesto: "blockContainersExceptTableWrappers", computed: ["column-width", "column-count"], order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/columns" }, contain = { syntax: "none | strict | content | [ size || layout || style || paint ]", media: "all", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Containment"], initial: "none", appliesto: "allElements", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/contain" }, content = { syntax: "normal | none | [ <content-replacement> | <content-list> ] [/ <string> ]?", media: "all", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Generated Content"], initial: "normal", appliesto: "beforeAndAfterPseudos", computed: "normalOnElementsForPseudosNoneAbsoluteURIStringOrAsSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/content" }, cursor = { syntax: "[ [ <url> [ <x> <y> ]? , ]* [ auto | default | none | context-menu | help | pointer | progress | wait | cell | crosshair | text | vertical-text | alias | copy | move | no-drop | not-allowed | e-resize | n-resize | ne-resize | nw-resize | s-resize | se-resize | sw-resize | w-resize | ew-resize | ns-resize | nesw-resize | nwse-resize | col-resize | row-resize | all-scroll | zoom-in | zoom-out | grab | grabbing ] ]", media: ["visual", "interactive"], inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Basic User Interface"], initial: "auto", appliesto: "allElements", computed: "asSpecifiedURLsAbsolute", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/cursor" }, direction = { syntax: "ltr | rtl", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Writing Modes"], initial: "ltr", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/direction" }, display = { syntax: "[ <display-outside> || <display-inside> ] | <display-listitem> | <display-internal> | <display-box> | <display-legacy>", media: "all", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Display"], initial: "inline", appliesto: "allElements", computed: "asSpecifiedExceptPositionedFloatingAndRootElementsKeywordMaybeDifferent", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/display" }, filter = { syntax: "none | <filter-function-list>", media: "visual", inherited: !1, animationType: "filterList", percentages: "no", groups: ["Filter Effects"], initial: "none", appliesto: "allElementsSVGContainerElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/filter" }, flex = { syntax: "none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]", media: "visual", inherited: !1, animationType: ["flex-grow", "flex-shrink", "flex-basis"], percentages: "no", groups: ["CSS Flexible Box Layout"], initial: ["flex-grow", "flex-shrink", "flex-basis"], appliesto: "flexItemsAndInFlowPseudos", computed: ["flex-grow", "flex-shrink", "flex-basis"], order: "orderOfAppearance", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/flex" }, float = { syntax: "left | right | none | inline-start | inline-end", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Positioning"], initial: "none", appliesto: "allElementsNoEffectIfDisplayNone", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/float" }, font = { syntax: "[ [ <'font-style'> || <font-variant-css21> || <'font-weight'> || <'font-stretch'> ]? <'font-size'> [ / <'line-height'> ]? <'font-family'> ] | caption | icon | menu | message-box | small-caption | status-bar", media: "visual", inherited: !0, animationType: ["font-style", "font-variant", "font-weight", "font-stretch", "font-size", "line-height", "font-family"], percentages: ["font-size", "line-height"], groups: ["CSS Fonts"], initial: ["font-style", "font-variant", "font-weight", "font-stretch", "font-size", "line-height", "font-family"], appliesto: "allElements", computed: ["font-style", "font-variant", "font-weight", "font-stretch", "font-size", "line-height", "font-family"], order: "orderOfAppearance", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font" }, gap = { syntax: "<'row-gap'> <'column-gap'>?", media: "visual", inherited: !1, animationType: ["row-gap", "column-gap"], percentages: "no", groups: ["CSS Box Alignment"], initial: ["row-gap", "column-gap"], appliesto: "multiColumnElementsFlexContainersGridContainers", computed: ["row-gap", "column-gap"], order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/gap" }, grid = { syntax: "<'grid-template'> | <'grid-template-rows'> / [ auto-flow && dense? ] <'grid-auto-columns'>? | [ auto-flow && dense? ] <'grid-auto-rows'>? / <'grid-template-columns'>", media: "visual", inherited: !1, animationType: "discrete", percentages: ["grid-template-rows", "grid-template-columns", "grid-auto-rows", "grid-auto-columns"], groups: ["CSS Grid Layout"], initial: ["grid-template-rows", "grid-template-columns", "grid-template-areas", "grid-auto-rows", "grid-auto-columns", "grid-auto-flow", "grid-column-gap", "grid-row-gap", "column-gap", "row-gap"], appliesto: "gridContainers", computed: ["grid-template-rows", "grid-template-columns", "grid-template-areas", "grid-auto-rows", "grid-auto-columns", "grid-auto-flow", "grid-column-gap", "grid-row-gap", "column-gap", "row-gap"], order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/grid" }, height = { syntax: "auto | <length> | <percentage> | min-content | max-content | fit-content(<length-percentage>)", media: "visual", inherited: !1, animationType: "lpc", percentages: "regardingHeightOfGeneratedBoxContainingBlockPercentagesRelativeToContainingBlock", groups: ["CSS Box Model"], initial: "auto", appliesto: "allElementsButNonReplacedAndTableColumns", computed: "percentageAutoOrAbsoluteLength", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/height" }, hyphens = { syntax: "none | manual | auto", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Text"], initial: "manual", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/hyphens" }, inset = { syntax: "<'top'>{1,4}", media: "visual", inherited: !1, animationType: "lpc", percentages: "logicalHeightOfContainingBlock", groups: ["CSS Logical Properties"], initial: "auto", appliesto: "positionedElements", computed: "sameAsBoxOffsets", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/inset" }, isolation = { syntax: "auto | isolate", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Compositing and Blending"], initial: "auto", appliesto: "allElementsSVGContainerGraphicsAndGraphicsReferencingElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/isolation" }, left = { syntax: "<length> | <percentage> | auto", media: "visual", inherited: !1, animationType: "lpc", percentages: "referToWidthOfContainingBlock", groups: ["CSS Positioning"], initial: "auto", appliesto: "positionedElements", computed: "lengthAbsolutePercentageAsSpecifiedOtherwiseAuto", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/left" }, margin = { syntax: "[ <length> | <percentage> | auto ]{1,4}", media: "visual", inherited: !1, animationType: "length", percentages: "referToWidthOfContainingBlock", groups: ["CSS Box Model"], initial: ["margin-bottom", "margin-left", "margin-right", "margin-top"], appliesto: "allElementsExceptTableDisplayTypes", computed: ["margin-bottom", "margin-left", "margin-right", "margin-top"], order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/margin" }, mask = { syntax: "<mask-layer>#", media: "visual", inherited: !1, animationType: ["mask-image", "mask-mode", "mask-repeat", "mask-position", "mask-clip", "mask-origin", "mask-size", "mask-composite"], percentages: ["mask-position"], groups: ["CSS Masking"], initial: ["mask-image", "mask-mode", "mask-repeat", "mask-position", "mask-clip", "mask-origin", "mask-size", "mask-composite"], appliesto: "allElementsSVGContainerElements", computed: ["mask-image", "mask-mode", "mask-repeat", "mask-position", "mask-clip", "mask-origin", "mask-size", "mask-composite"], order: "perGrammar", stacking: !0, status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask" }, offset = { syntax: "[ <'offset-position'>? [ <'offset-path'> [ <'offset-distance'> || <'offset-rotate'> ]? ]? ]! [ / <'offset-anchor'> ]?", media: "visual", inherited: !1, animationType: ["offset-position", "offset-path", "offset-distance", "offset-anchor", "offset-rotate"], percentages: ["offset-position", "offset-distance", "offset-anchor"], groups: ["CSS Motion Path"], initial: ["offset-position", "offset-path", "offset-distance", "offset-anchor", "offset-rotate"], appliesto: "transformableElements", computed: ["offset-position", "offset-path", "offset-distance", "offset-anchor", "offset-rotate"], order: "perGrammar", stacking: !0, status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/offset" }, opacity = { syntax: "<alpha-value>", media: "visual", inherited: !1, animationType: "number", percentages: "no", groups: ["CSS Color"], initial: "1.0", appliesto: "allElements", computed: "specifiedValueClipped0To1", order: "uniqueOrder", alsoAppliesTo: ["::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/opacity" }, order = { syntax: "<integer>", media: "visual", inherited: !1, animationType: "integer", percentages: "no", groups: ["CSS Flexible Box Layout"], initial: "0", appliesto: "flexItemsGridItemsAbsolutelyPositionedContainerChildren", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/order" }, orphans = { syntax: "<integer>", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Fragmentation"], initial: "2", appliesto: "blockContainerElements", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/orphans" }, outline = { syntax: "[ <'outline-color'> || <'outline-style'> || <'outline-width'> ]", media: ["visual", "interactive"], inherited: !1, animationType: ["outline-color", "outline-width", "outline-style"], percentages: "no", groups: ["CSS Basic User Interface"], initial: ["outline-color", "outline-style", "outline-width"], appliesto: "allElements", computed: ["outline-color", "outline-width", "outline-style"], order: "orderOfAppearance", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/outline" }, overflow = { syntax: "[ visible | hidden | clip | scroll | auto ]{1,2}", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Overflow"], initial: "visible", appliesto: "blockContainersFlexContainersGridContainers", computed: ["overflow-x", "overflow-y"], order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/overflow" }, padding = { syntax: "[ <length> | <percentage> ]{1,4}", media: "visual", inherited: !1, animationType: "length", percentages: "referToWidthOfContainingBlock", groups: ["CSS Box Model"], initial: ["padding-bottom", "padding-left", "padding-right", "padding-top"], appliesto: "allElementsExceptInternalTableDisplayTypes", computed: ["padding-bottom", "padding-left", "padding-right", "padding-top"], order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/padding" }, perspective = { syntax: "none | <length>", media: "visual", inherited: !1, animationType: "length", percentages: "no", groups: ["CSS Transforms"], initial: "none", appliesto: "transformableElements", computed: "absoluteLengthOrNone", order: "uniqueOrder", stacking: !0, status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/perspective" }, position$1 = { syntax: "static | relative | absolute | sticky | fixed", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Positioning"], initial: "static", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", stacking: !0, status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/position" }, quotes = { syntax: "none | auto | [ <string> <string> ]+", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Generated Content"], initial: "dependsOnUserAgent", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/quotes" }, resize = { syntax: "none | both | horizontal | vertical | block | inline", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Basic User Interface"], initial: "none", appliesto: "elementsWithOverflowNotVisibleAndReplacedElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/resize" }, right = { syntax: "<length> | <percentage> | auto", media: "visual", inherited: !1, animationType: "lpc", percentages: "referToWidthOfContainingBlock", groups: ["CSS Positioning"], initial: "auto", appliesto: "positionedElements", computed: "lengthAbsolutePercentageAsSpecifiedOtherwiseAuto", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/right" }, rotate = { syntax: "none | <angle> | [ x | y | z | <number>{3} ] && <angle>", media: "visual", inherited: !1, animationType: "transform", percentages: "no", groups: ["CSS Transforms"], initial: "none", appliesto: "transformableElements", computed: "asSpecified", order: "perGrammar", stacking: !0, status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/rotate" }, scale = { syntax: "none | <number>{1,3}", media: "visual", inherited: !1, animationType: "transform", percentages: "no", groups: ["CSS Transforms"], initial: "none", appliesto: "transformableElements", computed: "asSpecified", order: "perGrammar", stacking: !0, status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scale" }, top = { syntax: "<length> | <percentage> | auto", media: "visual", inherited: !1, animationType: "lpc", percentages: "referToContainingBlockHeight", groups: ["CSS Positioning"], initial: "auto", appliesto: "positionedElements", computed: "lengthAbsolutePercentageAsSpecifiedOtherwiseAuto", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/top" }, transform = { syntax: "none | <transform-list>", media: "visual", inherited: !1, animationType: "transform", percentages: "referToSizeOfBoundingBox", groups: ["CSS Transforms"], initial: "none", appliesto: "transformableElements", computed: "asSpecifiedRelativeToAbsoluteLengths", order: "uniqueOrder", stacking: !0, status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/transform" }, transition = { syntax: "<single-transition>#", media: "interactive", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Transitions"], initial: ["transition-delay", "transition-duration", "transition-property", "transition-timing-function"], appliesto: "allElementsAndPseudos", computed: ["transition-delay", "transition-duration", "transition-property", "transition-timing-function"], order: "orderOfAppearance", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/transition" }, translate = { syntax: "none | <length-percentage> [ <length-percentage> <length>? ]?", media: "visual", inherited: !1, animationType: "transform", percentages: "referToSizeOfBoundingBox", groups: ["CSS Transforms"], initial: "none", appliesto: "transformableElements", computed: "asSpecifiedRelativeToAbsoluteLengths", order: "perGrammar", stacking: !0, status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/translate" }, visibility = { syntax: "visible | hidden | collapse", media: "visual", inherited: !0, animationType: "visibility", percentages: "no", groups: ["CSS Box Model"], initial: "visible", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/visibility" }, widows = { syntax: "<integer>", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Fragmentation"], initial: "2", appliesto: "blockContainerElements", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/widows" }, width = { syntax: "auto | <length> | <percentage> | min-content | max-content | fit-content(<length-percentage>)", media: "visual", inherited: !1, animationType: "lpc", percentages: "referToWidthOfContainingBlock", groups: ["CSS Box Model"], initial: "auto", appliesto: "allElementsButNonReplacedAndTableRows", computed: "percentageAutoOrAbsoluteLength", order: "lengthOrPercentageBeforeKeywordIfBothPresent", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/width" }, zoom = { syntax: "normal | reset | <number> | <percentage>", media: "visual", inherited: !1, animationType: "integer", percentages: "no", groups: ["Microsoft Extensions"], initial: "normal", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/zoom" }, require$$1 = {
  "--*": { syntax: "<declaration-value>", media: "all", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Variables"], initial: "seeProse", appliesto: "allElements", computed: "asSpecifiedWithVarsSubstituted", order: "perGrammar", status: "experimental", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/--*" },
  "-ms-accelerator": { syntax: "false | true", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "false", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-accelerator" },
  "-ms-block-progression": { syntax: "tb | rl | bt | lr", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "tb", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-block-progression" },
  "-ms-content-zoom-chaining": { syntax: "none | chained", media: "interactive", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "none", appliesto: "nonReplacedBlockAndInlineBlockElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-content-zoom-chaining" },
  "-ms-content-zooming": { syntax: "none | zoom", media: "interactive", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "zoomForTheTopLevelNoneForTheRest", appliesto: "nonReplacedBlockAndInlineBlockElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-content-zooming" },
  "-ms-content-zoom-limit": { syntax: "<'-ms-content-zoom-limit-min'> <'-ms-content-zoom-limit-max'>", media: "interactive", inherited: !1, animationType: "discrete", percentages: ["-ms-content-zoom-limit-max", "-ms-content-zoom-limit-min"], groups: ["Microsoft Extensions"], initial: ["-ms-content-zoom-limit-max", "-ms-content-zoom-limit-min"], appliesto: "nonReplacedBlockAndInlineBlockElements", computed: ["-ms-content-zoom-limit-max", "-ms-content-zoom-limit-min"], order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-content-zoom-limit" },
  "-ms-content-zoom-limit-max": { syntax: "<percentage>", media: "interactive", inherited: !1, animationType: "discrete", percentages: "maxZoomFactor", groups: ["Microsoft Extensions"], initial: "400%", appliesto: "nonReplacedBlockAndInlineBlockElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-content-zoom-limit-max" },
  "-ms-content-zoom-limit-min": { syntax: "<percentage>", media: "interactive", inherited: !1, animationType: "discrete", percentages: "minZoomFactor", groups: ["Microsoft Extensions"], initial: "100%", appliesto: "nonReplacedBlockAndInlineBlockElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-content-zoom-limit-min" },
  "-ms-content-zoom-snap": { syntax: "<'-ms-content-zoom-snap-type'> || <'-ms-content-zoom-snap-points'>", media: "interactive", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: ["-ms-content-zoom-snap-type", "-ms-content-zoom-snap-points"], appliesto: "nonReplacedBlockAndInlineBlockElements", computed: ["-ms-content-zoom-snap-type", "-ms-content-zoom-snap-points"], order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-content-zoom-snap" },
  "-ms-content-zoom-snap-points": { syntax: "snapInterval( <percentage>, <percentage> ) | snapList( <percentage># )", media: "interactive", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "snapInterval(0%, 100%)", appliesto: "nonReplacedBlockAndInlineBlockElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-content-zoom-snap-points" },
  "-ms-content-zoom-snap-type": { syntax: "none | proximity | mandatory", media: "interactive", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "none", appliesto: "nonReplacedBlockAndInlineBlockElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-content-zoom-snap-type" },
  "-ms-filter": { syntax: "<string>", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: '""', appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-filter" },
  "-ms-flow-from": { syntax: "[ none | <custom-ident> ]#", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "none", appliesto: "nonReplacedElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-flow-from" },
  "-ms-flow-into": { syntax: "[ none | <custom-ident> ]#", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "none", appliesto: "iframeElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-flow-into" },
  "-ms-grid-columns": { syntax: "none | <track-list> | <auto-track-list>", media: "visual", inherited: !1, animationType: "simpleListOfLpcDifferenceLpc", percentages: "referToDimensionOfContentArea", groups: ["CSS Grid Layout"], initial: "none", appliesto: "gridContainers", computed: "asSpecifiedRelativeToAbsoluteLengths", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-grid-columns" },
  "-ms-grid-rows": { syntax: "none | <track-list> | <auto-track-list>", media: "visual", inherited: !1, animationType: "simpleListOfLpcDifferenceLpc", percentages: "referToDimensionOfContentArea", groups: ["CSS Grid Layout"], initial: "none", appliesto: "gridContainers", computed: "asSpecifiedRelativeToAbsoluteLengths", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-grid-rows" },
  "-ms-high-contrast-adjust": { syntax: "auto | none", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "auto", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-high-contrast-adjust" },
  "-ms-hyphenate-limit-chars": { syntax: "auto | <integer>{1,3}", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "auto", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-hyphenate-limit-chars" },
  "-ms-hyphenate-limit-lines": { syntax: "no-limit | <integer>", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "no-limit", appliesto: "blockContainerElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-hyphenate-limit-lines" },
  "-ms-hyphenate-limit-zone": { syntax: "<percentage> | <length>", media: "visual", inherited: !0, animationType: "discrete", percentages: "referToLineBoxWidth", groups: ["Microsoft Extensions"], initial: "0", appliesto: "blockContainerElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-hyphenate-limit-zone" },
  "-ms-ime-align": { syntax: "auto | after", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "auto", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-ime-align" },
  "-ms-overflow-style": { syntax: "auto | none | scrollbar | -ms-autohiding-scrollbar", media: "interactive", inherited: !0, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "auto", appliesto: "nonReplacedBlockAndInlineBlockElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-overflow-style" },
  "-ms-scrollbar-3dlight-color": { syntax: "<color>", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "dependsOnUserAgent", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scrollbar-3dlight-color" },
  "-ms-scrollbar-arrow-color": { syntax: "<color>", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "ButtonText", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scrollbar-arrow-color" },
  "-ms-scrollbar-base-color": { syntax: "<color>", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "dependsOnUserAgent", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scrollbar-base-color" },
  "-ms-scrollbar-darkshadow-color": { syntax: "<color>", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "ThreeDDarkShadow", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scrollbar-darkshadow-color" },
  "-ms-scrollbar-face-color": { syntax: "<color>", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "ThreeDFace", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scrollbar-face-color" },
  "-ms-scrollbar-highlight-color": { syntax: "<color>", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "ThreeDHighlight", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scrollbar-highlight-color" },
  "-ms-scrollbar-shadow-color": { syntax: "<color>", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "ThreeDDarkShadow", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scrollbar-shadow-color" },
  "-ms-scrollbar-track-color": { syntax: "<color>", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "Scrollbar", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scrollbar-track-color" },
  "-ms-scroll-chaining": { syntax: "chained | none", media: "interactive", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "chained", appliesto: "nonReplacedBlockAndInlineBlockElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-chaining" },
  "-ms-scroll-limit": { syntax: "<'-ms-scroll-limit-x-min'> <'-ms-scroll-limit-y-min'> <'-ms-scroll-limit-x-max'> <'-ms-scroll-limit-y-max'>", media: "interactive", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: ["-ms-scroll-limit-x-min", "-ms-scroll-limit-y-min", "-ms-scroll-limit-x-max", "-ms-scroll-limit-y-max"], appliesto: "nonReplacedBlockAndInlineBlockElements", computed: ["-ms-scroll-limit-x-min", "-ms-scroll-limit-y-min", "-ms-scroll-limit-x-max", "-ms-scroll-limit-y-max"], order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-limit" },
  "-ms-scroll-limit-x-max": { syntax: "auto | <length>", media: "interactive", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "auto", appliesto: "nonReplacedBlockAndInlineBlockElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-limit-x-max" },
  "-ms-scroll-limit-x-min": { syntax: "<length>", media: "interactive", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "0", appliesto: "nonReplacedBlockAndInlineBlockElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-limit-x-min" },
  "-ms-scroll-limit-y-max": { syntax: "auto | <length>", media: "interactive", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "auto", appliesto: "nonReplacedBlockAndInlineBlockElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-limit-y-max" },
  "-ms-scroll-limit-y-min": { syntax: "<length>", media: "interactive", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "0", appliesto: "nonReplacedBlockAndInlineBlockElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-limit-y-min" },
  "-ms-scroll-rails": { syntax: "none | railed", media: "interactive", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "railed", appliesto: "nonReplacedBlockAndInlineBlockElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-rails" },
  "-ms-scroll-snap-points-x": { syntax: "snapInterval( <length-percentage>, <length-percentage> ) | snapList( <length-percentage># )", media: "interactive", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "snapInterval(0px, 100%)", appliesto: "nonReplacedBlockAndInlineBlockElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-snap-points-x" },
  "-ms-scroll-snap-points-y": { syntax: "snapInterval( <length-percentage>, <length-percentage> ) | snapList( <length-percentage># )", media: "interactive", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "snapInterval(0px, 100%)", appliesto: "nonReplacedBlockAndInlineBlockElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-snap-points-y" },
  "-ms-scroll-snap-type": { syntax: "none | proximity | mandatory", media: "interactive", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "none", appliesto: "nonReplacedBlockAndInlineBlockElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-snap-type" },
  "-ms-scroll-snap-x": { syntax: "<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-x'>", media: "interactive", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: ["-ms-scroll-snap-type", "-ms-scroll-snap-points-x"], appliesto: "nonReplacedBlockAndInlineBlockElements", computed: ["-ms-scroll-snap-type", "-ms-scroll-snap-points-x"], order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-snap-x" },
  "-ms-scroll-snap-y": { syntax: "<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-y'>", media: "interactive", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: ["-ms-scroll-snap-type", "-ms-scroll-snap-points-y"], appliesto: "nonReplacedBlockAndInlineBlockElements", computed: ["-ms-scroll-snap-type", "-ms-scroll-snap-points-y"], order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-snap-y" },
  "-ms-scroll-translation": { syntax: "none | vertical-to-horizontal", media: "interactive", inherited: !0, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "none", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-translation" },
  "-ms-text-autospace": { syntax: "none | ideograph-alpha | ideograph-numeric | ideograph-parenthesis | ideograph-space", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "none", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-text-autospace" },
  "-ms-touch-select": { syntax: "grippers | none", media: "interactive", inherited: !0, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "grippers", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-touch-select" },
  "-ms-user-select": { syntax: "none | element | text", media: "interactive", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "text", appliesto: "nonReplacedElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-user-select" },
  "-ms-wrap-flow": { syntax: "auto | both | start | end | maximum | clear", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "auto", appliesto: "blockLevelElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-wrap-flow" },
  "-ms-wrap-margin": { syntax: "<length>", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "0", appliesto: "exclusionElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-wrap-margin" },
  "-ms-wrap-through": { syntax: "wrap | none", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Microsoft Extensions"], initial: "wrap", appliesto: "blockLevelElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-wrap-through" },
  "-moz-appearance": { syntax: "none | button | button-arrow-down | button-arrow-next | button-arrow-previous | button-arrow-up | button-bevel | button-focus | caret | checkbox | checkbox-container | checkbox-label | checkmenuitem | dualbutton | groupbox | listbox | listitem | menuarrow | menubar | menucheckbox | menuimage | menuitem | menuitemtext | menulist | menulist-button | menulist-text | menulist-textfield | menupopup | menuradio | menuseparator | meterbar | meterchunk | progressbar | progressbar-vertical | progresschunk | progresschunk-vertical | radio | radio-container | radio-label | radiomenuitem | range | range-thumb | resizer | resizerpanel | scale-horizontal | scalethumbend | scalethumb-horizontal | scalethumbstart | scalethumbtick | scalethumb-vertical | scale-vertical | scrollbarbutton-down | scrollbarbutton-left | scrollbarbutton-right | scrollbarbutton-up | scrollbarthumb-horizontal | scrollbarthumb-vertical | scrollbartrack-horizontal | scrollbartrack-vertical | searchfield | separator | sheet | spinner | spinner-downbutton | spinner-textfield | spinner-upbutton | splitter | statusbar | statusbarpanel | tab | tabpanel | tabpanels | tab-scroll-arrow-back | tab-scroll-arrow-forward | textfield | textfield-multiline | toolbar | toolbarbutton | toolbarbutton-dropdown | toolbargripper | toolbox | tooltip | treeheader | treeheadercell | treeheadersortarrow | treeitem | treeline | treetwisty | treetwistyopen | treeview | -moz-mac-unified-toolbar | -moz-win-borderless-glass | -moz-win-browsertabbar-toolbox | -moz-win-communicationstext | -moz-win-communications-toolbox | -moz-win-exclude-glass | -moz-win-glass | -moz-win-mediatext | -moz-win-media-toolbox | -moz-window-button-box | -moz-window-button-box-maximized | -moz-window-button-close | -moz-window-button-maximize | -moz-window-button-minimize | -moz-window-button-restore | -moz-window-frame-bottom | -moz-window-frame-left | -moz-window-frame-right | -moz-window-titlebar | -moz-window-titlebar-maximized", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Mozilla Extensions", "WebKit Extensions"], initial: "noneButOverriddenInUserAgentCSS", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/appearance" },
  "-moz-binding": { syntax: "<url> | none", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Mozilla Extensions"], initial: "none", appliesto: "allElementsExceptGeneratedContentOrPseudoElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-binding" },
  "-moz-border-bottom-colors": { syntax: "<color>+ | none", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Mozilla Extensions"], initial: "none", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-border-bottom-colors" },
  "-moz-border-left-colors": { syntax: "<color>+ | none", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Mozilla Extensions"], initial: "none", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-border-left-colors" },
  "-moz-border-right-colors": { syntax: "<color>+ | none", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Mozilla Extensions"], initial: "none", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-border-right-colors" },
  "-moz-border-top-colors": { syntax: "<color>+ | none", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Mozilla Extensions"], initial: "none", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-border-top-colors" },
  "-moz-context-properties": { syntax: "none | [ fill | fill-opacity | stroke | stroke-opacity ]#", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["Mozilla Extensions"], initial: "none", appliesto: "allElementsThatCanReferenceImages", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-context-properties" },
  "-moz-float-edge": { syntax: "border-box | content-box | margin-box | padding-box", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Mozilla Extensions"], initial: "content-box", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-float-edge" },
  "-moz-force-broken-image-icon": { syntax: "<integer [0,1]>", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Mozilla Extensions"], initial: "0", appliesto: "images", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-force-broken-image-icon" },
  "-moz-image-region": { syntax: "<shape> | auto", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["Mozilla Extensions"], initial: "auto", appliesto: "xulImageElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-image-region" },
  "-moz-orient": { syntax: "inline | block | horizontal | vertical", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Mozilla Extensions"], initial: "inline", appliesto: "anyElementEffectOnProgressAndMeter", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-orient" },
  "-moz-outline-radius": { syntax: "<outline-radius>{1,4} [ / <outline-radius>{1,4} ]?", media: "visual", inherited: !1, animationType: ["-moz-outline-radius-topleft", "-moz-outline-radius-topright", "-moz-outline-radius-bottomright", "-moz-outline-radius-bottomleft"], percentages: ["-moz-outline-radius-topleft", "-moz-outline-radius-topright", "-moz-outline-radius-bottomright", "-moz-outline-radius-bottomleft"], groups: ["Mozilla Extensions"], initial: ["-moz-outline-radius-topleft", "-moz-outline-radius-topright", "-moz-outline-radius-bottomright", "-moz-outline-radius-bottomleft"], appliesto: "allElements", computed: ["-moz-outline-radius-topleft", "-moz-outline-radius-topright", "-moz-outline-radius-bottomright", "-moz-outline-radius-bottomleft"], order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-outline-radius" },
  "-moz-outline-radius-bottomleft": { syntax: "<outline-radius>", media: "visual", inherited: !1, animationType: "lpc", percentages: "referToDimensionOfBorderBox", groups: ["Mozilla Extensions"], initial: "0", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-outline-radius-bottomleft" },
  "-moz-outline-radius-bottomright": { syntax: "<outline-radius>", media: "visual", inherited: !1, animationType: "lpc", percentages: "referToDimensionOfBorderBox", groups: ["Mozilla Extensions"], initial: "0", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-outline-radius-bottomright" },
  "-moz-outline-radius-topleft": { syntax: "<outline-radius>", media: "visual", inherited: !1, animationType: "lpc", percentages: "referToDimensionOfBorderBox", groups: ["Mozilla Extensions"], initial: "0", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-outline-radius-topleft" },
  "-moz-outline-radius-topright": { syntax: "<outline-radius>", media: "visual", inherited: !1, animationType: "lpc", percentages: "referToDimensionOfBorderBox", groups: ["Mozilla Extensions"], initial: "0", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-outline-radius-topright" },
  "-moz-stack-sizing": { syntax: "ignore | stretch-to-fit", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["Mozilla Extensions"], initial: "stretch-to-fit", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-stack-sizing" },
  "-moz-text-blink": { syntax: "none | blink", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Mozilla Extensions"], initial: "none", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-text-blink" },
  "-moz-user-focus": { syntax: "ignore | normal | select-after | select-before | select-menu | select-same | select-all | none", media: "interactive", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Mozilla Extensions"], initial: "none", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-user-focus" },
  "-moz-user-input": { syntax: "auto | none | enabled | disabled", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["Mozilla Extensions"], initial: "auto", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-user-input" },
  "-moz-user-modify": { syntax: "read-only | read-write | write-only", media: "interactive", inherited: !0, animationType: "discrete", percentages: "no", groups: ["Mozilla Extensions"], initial: "read-only", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-user-modify" },
  "-moz-window-dragging": { syntax: "drag | no-drag", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Mozilla Extensions"], initial: "drag", appliesto: "allElementsCreatingNativeWindows", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-window-dragging" },
  "-moz-window-shadow": { syntax: "default | menu | tooltip | sheet | none", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Mozilla Extensions"], initial: "default", appliesto: "allElementsCreatingNativeWindows", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-window-shadow" },
  "-webkit-appearance": { syntax: "none | button | button-bevel | caret | checkbox | default-button | inner-spin-button | listbox | listitem | media-controls-background | media-controls-fullscreen-background | media-current-time-display | media-enter-fullscreen-button | media-exit-fullscreen-button | media-fullscreen-button | media-mute-button | media-overlay-play-button | media-play-button | media-seek-back-button | media-seek-forward-button | media-slider | media-sliderthumb | media-time-remaining-display | media-toggle-closed-captions-button | media-volume-slider | media-volume-slider-container | media-volume-sliderthumb | menulist | menulist-button | menulist-text | menulist-textfield | meter | progress-bar | progress-bar-value | push-button | radio | searchfield | searchfield-cancel-button | searchfield-decoration | searchfield-results-button | searchfield-results-decoration | slider-horizontal | slider-vertical | sliderthumb-horizontal | sliderthumb-vertical | square-button | textarea | textfield | -apple-pay-button", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["WebKit Extensions"], initial: "noneButOverriddenInUserAgentCSS", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/appearance" },
  "-webkit-border-before": { syntax: "<'border-width'> || <'border-style'> || <'color'>", media: "visual", inherited: !0, animationType: "discrete", percentages: ["-webkit-border-before-width"], groups: ["WebKit Extensions"], initial: ["border-width", "border-style", "color"], appliesto: "allElements", computed: ["border-width", "border-style", "color"], order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-border-before" },
  "-webkit-border-before-color": { syntax: "<'color'>", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["WebKit Extensions"], initial: "currentcolor", appliesto: "allElements", computed: "computedColor", order: "uniqueOrder", status: "nonstandard" },
  "-webkit-border-before-style": { syntax: "<'border-style'>", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["WebKit Extensions"], initial: "none", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard" },
  "-webkit-border-before-width": { syntax: "<'border-width'>", media: "visual", inherited: !0, animationType: "discrete", percentages: "logicalWidthOfContainingBlock", groups: ["WebKit Extensions"], initial: "medium", appliesto: "allElements", computed: "absoluteLengthZeroIfBorderStyleNoneOrHidden", order: "uniqueOrder", status: "nonstandard" },
  "-webkit-box-reflect": { syntax: "[ above | below | right | left ]? <length>? <image>?", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["WebKit Extensions"], initial: "none", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-box-reflect" },
  "-webkit-line-clamp": { syntax: "none | <integer>", media: "visual", inherited: !1, animationType: "byComputedValueType", percentages: "no", groups: ["WebKit Extensions", "CSS Overflow"], initial: "none", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-line-clamp" },
  "-webkit-mask": { syntax: "[ <mask-reference> || <position> [ / <bg-size> ]? || <repeat-style> || [ <box> | border | padding | content | text ] || [ <box> | border | padding | content ] ]#", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["WebKit Extensions"], initial: ["-webkit-mask-image", "-webkit-mask-repeat", "-webkit-mask-attachment", "-webkit-mask-position", "-webkit-mask-origin", "-webkit-mask-clip"], appliesto: "allElements", computed: ["-webkit-mask-image", "-webkit-mask-repeat", "-webkit-mask-attachment", "-webkit-mask-position", "-webkit-mask-origin", "-webkit-mask-clip"], order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask" },
  "-webkit-mask-attachment": { syntax: "<attachment>#", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["WebKit Extensions"], initial: "scroll", appliesto: "allElements", computed: "asSpecified", order: "orderOfAppearance", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-attachment" },
  "-webkit-mask-clip": { syntax: "[ <box> | border | padding | content | text ]#", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["WebKit Extensions"], initial: "border", appliesto: "allElements", computed: "asSpecified", order: "orderOfAppearance", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-clip" },
  "-webkit-mask-composite": { syntax: "<composite-style>#", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["WebKit Extensions"], initial: "source-over", appliesto: "allElements", computed: "asSpecified", order: "orderOfAppearance", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-composite" },
  "-webkit-mask-image": { syntax: "<mask-reference>#", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["WebKit Extensions"], initial: "none", appliesto: "allElements", computed: "absoluteURIOrNone", order: "orderOfAppearance", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-image" },
  "-webkit-mask-origin": { syntax: "[ <box> | border | padding | content ]#", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["WebKit Extensions"], initial: "padding", appliesto: "allElements", computed: "asSpecified", order: "orderOfAppearance", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-origin" },
  "-webkit-mask-position": { syntax: "<position>#", media: "visual", inherited: !1, animationType: "discrete", percentages: "referToSizeOfElement", groups: ["WebKit Extensions"], initial: "0% 0%", appliesto: "allElements", computed: "absoluteLengthOrPercentage", order: "orderOfAppearance", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-position" },
  "-webkit-mask-position-x": { syntax: "[ <length-percentage> | left | center | right ]#", media: "visual", inherited: !1, animationType: "discrete", percentages: "referToSizeOfElement", groups: ["WebKit Extensions"], initial: "0%", appliesto: "allElements", computed: "absoluteLengthOrPercentage", order: "orderOfAppearance", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-position-x" },
  "-webkit-mask-position-y": { syntax: "[ <length-percentage> | top | center | bottom ]#", media: "visual", inherited: !1, animationType: "discrete", percentages: "referToSizeOfElement", groups: ["WebKit Extensions"], initial: "0%", appliesto: "allElements", computed: "absoluteLengthOrPercentage", order: "orderOfAppearance", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-position-y" },
  "-webkit-mask-repeat": { syntax: "<repeat-style>#", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["WebKit Extensions"], initial: "repeat", appliesto: "allElements", computed: "asSpecified", order: "orderOfAppearance", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-repeat" },
  "-webkit-mask-repeat-x": { syntax: "repeat | no-repeat | space | round", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["WebKit Extensions"], initial: "repeat", appliesto: "allElements", computed: "asSpecified", order: "orderOfAppearance", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-repeat-x" },
  "-webkit-mask-repeat-y": { syntax: "repeat | no-repeat | space | round", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["WebKit Extensions"], initial: "repeat", appliesto: "allElements", computed: "absoluteLengthOrPercentage", order: "orderOfAppearance", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-repeat-y" },
  "-webkit-mask-size": { syntax: "<bg-size>#", media: "visual", inherited: !1, animationType: "discrete", percentages: "relativeToBackgroundPositioningArea", groups: ["WebKit Extensions"], initial: "auto auto", appliesto: "allElements", computed: "asSpecified", order: "orderOfAppearance", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-size" },
  "-webkit-overflow-scrolling": { syntax: "auto | touch", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["WebKit Extensions"], initial: "auto", appliesto: "scrollingBoxes", computed: "asSpecified", order: "orderOfAppearance", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-overflow-scrolling" },
  "-webkit-tap-highlight-color": { syntax: "<color>", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["WebKit Extensions"], initial: "black", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-tap-highlight-color" },
  "-webkit-text-fill-color": { syntax: "<color>", media: "visual", inherited: !0, animationType: "color", percentages: "no", groups: ["WebKit Extensions"], initial: "currentcolor", appliesto: "allElements", computed: "computedColor", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-text-fill-color" },
  "-webkit-text-stroke": { syntax: "<length> || <color>", media: "visual", inherited: !0, animationType: ["-webkit-text-stroke-width", "-webkit-text-stroke-color"], percentages: "no", groups: ["WebKit Extensions"], initial: ["-webkit-text-stroke-width", "-webkit-text-stroke-color"], appliesto: "allElements", computed: ["-webkit-text-stroke-width", "-webkit-text-stroke-color"], order: "canonicalOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-text-stroke" },
  "-webkit-text-stroke-color": { syntax: "<color>", media: "visual", inherited: !0, animationType: "color", percentages: "no", groups: ["WebKit Extensions"], initial: "currentcolor", appliesto: "allElements", computed: "computedColor", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-text-stroke-color" },
  "-webkit-text-stroke-width": { syntax: "<length>", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["WebKit Extensions"], initial: "0", appliesto: "allElements", computed: "absoluteLength", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-text-stroke-width" },
  "-webkit-touch-callout": { syntax: "default | none", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["WebKit Extensions"], initial: "default", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-touch-callout" },
  "-webkit-user-modify": { syntax: "read-only | read-write | read-write-plaintext-only", media: "interactive", inherited: !0, animationType: "discrete", percentages: "no", groups: ["WebKit Extensions"], initial: "read-only", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard" },
  "align-content": { syntax: "normal | <baseline-position> | <content-distribution> | <overflow-position>? <content-position>", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Box Alignment"], initial: "normal", appliesto: "multilineFlexContainers", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/align-content" },
  "align-items": { syntax: "normal | stretch | <baseline-position> | [ <overflow-position>? <self-position> ]", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Box Alignment"], initial: "normal", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/align-items" },
  "align-self": { syntax: "auto | normal | stretch | <baseline-position> | <overflow-position>? <self-position>", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Box Alignment"], initial: "auto", appliesto: "flexItemsGridItemsAndAbsolutelyPositionedBoxes", computed: "autoOnAbsolutelyPositionedElementsValueOfAlignItemsOnParent", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/align-self" },
  "align-tracks": { syntax: "[ normal | <baseline-position> | <content-distribution> | <overflow-position>? <content-position> ]#", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Grid Layout"], initial: "normal", appliesto: "gridContainersWithMasonryLayoutInTheirBlockAxis", computed: "asSpecified", order: "uniqueOrder", status: "experimental", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/align-tracks" },
  all,
  animation,
  "animation-delay": { syntax: "<time>#", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Animations"], initial: "0s", appliesto: "allElementsAndPseudos", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/animation-delay" },
  "animation-direction": { syntax: "<single-animation-direction>#", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Animations"], initial: "normal", appliesto: "allElementsAndPseudos", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/animation-direction" },
  "animation-duration": { syntax: "<time>#", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Animations"], initial: "0s", appliesto: "allElementsAndPseudos", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/animation-duration" },
  "animation-fill-mode": { syntax: "<single-animation-fill-mode>#", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Animations"], initial: "none", appliesto: "allElementsAndPseudos", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/animation-fill-mode" },
  "animation-iteration-count": { syntax: "<single-animation-iteration-count>#", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Animations"], initial: "1", appliesto: "allElementsAndPseudos", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/animation-iteration-count" },
  "animation-name": { syntax: "[ none | <keyframes-name> ]#", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Animations"], initial: "none", appliesto: "allElementsAndPseudos", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/animation-name" },
  "animation-play-state": { syntax: "<single-animation-play-state>#", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Animations"], initial: "running", appliesto: "allElementsAndPseudos", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/animation-play-state" },
  "animation-timing-function": { syntax: "<timing-function>#", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Animations"], initial: "ease", appliesto: "allElementsAndPseudos", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/animation-timing-function" },
  appearance,
  "aspect-ratio": { syntax: "auto | <ratio>", media: "all", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Basic User Interface"], initial: "auto", appliesto: "allElementsExceptInlineBoxesAndInternalRubyOrTableBoxes", computed: "asSpecified", order: "perGrammar", status: "experimental", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/aspect-ratio" },
  azimuth,
  "backdrop-filter": { syntax: "none | <filter-function-list>", media: "visual", inherited: !1, animationType: "filterList", percentages: "no", groups: ["Filter Effects"], initial: "none", appliesto: "allElementsSVGContainerElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/backdrop-filter" },
  "backface-visibility": { syntax: "visible | hidden", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Transforms"], initial: "visible", appliesto: "transformableElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/backface-visibility" },
  background,
  "background-attachment": { syntax: "<attachment>#", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Backgrounds and Borders"], initial: "scroll", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/background-attachment" },
  "background-blend-mode": { syntax: "<blend-mode>#", media: "none", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Compositing and Blending"], initial: "normal", appliesto: "allElementsSVGContainerGraphicsAndGraphicsReferencingElements", computed: "asSpecified", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/background-blend-mode" },
  "background-clip": { syntax: "<box>#", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Backgrounds and Borders"], initial: "border-box", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/background-clip" },
  "background-color": { syntax: "<color>", media: "visual", inherited: !1, animationType: "color", percentages: "no", groups: ["CSS Backgrounds and Borders"], initial: "transparent", appliesto: "allElements", computed: "computedColor", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/background-color" },
  "background-image": { syntax: "<bg-image>#", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Backgrounds and Borders"], initial: "none", appliesto: "allElements", computed: "asSpecifiedURLsAbsolute", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/background-image" },
  "background-origin": { syntax: "<box>#", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Backgrounds and Borders"], initial: "padding-box", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/background-origin" },
  "background-position": { syntax: "<bg-position>#", media: "visual", inherited: !1, animationType: "repeatableListOfSimpleListOfLpc", percentages: "referToSizeOfBackgroundPositioningAreaMinusBackgroundImageSize", groups: ["CSS Backgrounds and Borders"], initial: "0% 0%", appliesto: "allElements", computed: "listEachItemTwoKeywordsOriginOffsets", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/background-position" },
  "background-position-x": { syntax: "[ center | [ [ left | right | x-start | x-end ]? <length-percentage>? ]! ]#", media: "visual", inherited: !1, animationType: "discrete", percentages: "referToWidthOfBackgroundPositioningAreaMinusBackgroundImageHeight", groups: ["CSS Backgrounds and Borders"], initial: "left", appliesto: "allElements", computed: "listEachItemConsistingOfAbsoluteLengthPercentageAndOrigin", order: "uniqueOrder", status: "experimental", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/background-position-x" },
  "background-position-y": { syntax: "[ center | [ [ top | bottom | y-start | y-end ]? <length-percentage>? ]! ]#", media: "visual", inherited: !1, animationType: "discrete", percentages: "referToHeightOfBackgroundPositioningAreaMinusBackgroundImageHeight", groups: ["CSS Backgrounds and Borders"], initial: "top", appliesto: "allElements", computed: "listEachItemConsistingOfAbsoluteLengthPercentageAndOrigin", order: "uniqueOrder", status: "experimental", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/background-position-y" },
  "background-repeat": { syntax: "<repeat-style>#", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Backgrounds and Borders"], initial: "repeat", appliesto: "allElements", computed: "listEachItemHasTwoKeywordsOnePerDimension", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/background-repeat" },
  "background-size": { syntax: "<bg-size>#", media: "visual", inherited: !1, animationType: "repeatableListOfSimpleListOfLpc", percentages: "relativeToBackgroundPositioningArea", groups: ["CSS Backgrounds and Borders"], initial: "auto auto", appliesto: "allElements", computed: "asSpecifiedRelativeToAbsoluteLengths", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/background-size" },
  "block-overflow": { syntax: "clip | ellipsis | <string>", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Overflow"], initial: "clip", appliesto: "blockContainers", computed: "asSpecified", order: "perGrammar", status: "experimental" },
  "block-size": { syntax: "<'width'>", media: "visual", inherited: !1, animationType: "lpc", percentages: "blockSizeOfContainingBlock", groups: ["CSS Logical Properties"], initial: "auto", appliesto: "sameAsWidthAndHeight", computed: "sameAsWidthAndHeight", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/block-size" },
  border,
  "border-block": { syntax: "<'border-top-width'> || <'border-top-style'> || <'color'>", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Logical Properties"], initial: ["border-top-width", "border-top-style", "border-top-color"], appliesto: "allElements", computed: ["border-top-width", "border-top-style", "border-top-color"], order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-block" },
  "border-block-color": { syntax: "<'border-top-color'>{1,2}", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Logical Properties"], initial: "currentcolor", appliesto: "allElements", computed: "computedColor", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-block-color" },
  "border-block-style": { syntax: "<'border-top-style'>", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Logical Properties"], initial: "none", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-block-style" },
  "border-block-width": { syntax: "<'border-top-width'>", media: "visual", inherited: !1, animationType: "discrete", percentages: "logicalWidthOfContainingBlock", groups: ["CSS Logical Properties"], initial: "medium", appliesto: "allElements", computed: "absoluteLengthZeroIfBorderStyleNoneOrHidden", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-block-width" },
  "border-block-end": { syntax: "<'border-top-width'> || <'border-top-style'> || <'color'>", media: "visual", inherited: !1, animationType: ["border-block-end-color", "border-block-end-style", "border-block-end-width"], percentages: "no", groups: ["CSS Logical Properties"], initial: ["border-top-width", "border-top-style", "border-top-color"], appliesto: "allElements", computed: ["border-top-width", "border-top-style", "border-top-color"], order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-block-end" },
  "border-block-end-color": { syntax: "<'border-top-color'>", media: "visual", inherited: !1, animationType: "color", percentages: "no", groups: ["CSS Logical Properties"], initial: "currentcolor", appliesto: "allElements", computed: "computedColor", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-block-end-color" },
  "border-block-end-style": { syntax: "<'border-top-style'>", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Logical Properties"], initial: "none", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-block-end-style" },
  "border-block-end-width": { syntax: "<'border-top-width'>", media: "visual", inherited: !1, animationType: "length", percentages: "logicalWidthOfContainingBlock", groups: ["CSS Logical Properties"], initial: "medium", appliesto: "allElements", computed: "absoluteLengthZeroIfBorderStyleNoneOrHidden", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-block-end-width" },
  "border-block-start": { syntax: "<'border-top-width'> || <'border-top-style'> || <'color'>", media: "visual", inherited: !1, animationType: ["border-block-start-color", "border-block-start-style", "border-block-start-width"], percentages: "no", groups: ["CSS Logical Properties"], initial: ["border-width", "border-style", "color"], appliesto: "allElements", computed: ["border-width", "border-style", "border-block-start-color"], order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-block-start" },
  "border-block-start-color": { syntax: "<'border-top-color'>", media: "visual", inherited: !1, animationType: "color", percentages: "no", groups: ["CSS Logical Properties"], initial: "currentcolor", appliesto: "allElements", computed: "computedColor", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-block-start-color" },
  "border-block-start-style": { syntax: "<'border-top-style'>", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Logical Properties"], initial: "none", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-block-start-style" },
  "border-block-start-width": { syntax: "<'border-top-width'>", media: "visual", inherited: !1, animationType: "length", percentages: "logicalWidthOfContainingBlock", groups: ["CSS Logical Properties"], initial: "medium", appliesto: "allElements", computed: "absoluteLengthZeroIfBorderStyleNoneOrHidden", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-block-start-width" },
  "border-bottom": { syntax: "<line-width> || <line-style> || <color>", media: "visual", inherited: !1, animationType: ["border-bottom-color", "border-bottom-style", "border-bottom-width"], percentages: "no", groups: ["CSS Backgrounds and Borders"], initial: ["border-bottom-width", "border-bottom-style", "border-bottom-color"], appliesto: "allElements", computed: ["border-bottom-width", "border-bottom-style", "border-bottom-color"], order: "orderOfAppearance", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-bottom" },
  "border-bottom-color": { syntax: "<'border-top-color'>", media: "visual", inherited: !1, animationType: "color", percentages: "no", groups: ["CSS Backgrounds and Borders"], initial: "currentcolor", appliesto: "allElements", computed: "computedColor", order: "uniqueOrder", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-bottom-color" },
  "border-bottom-left-radius": { syntax: "<length-percentage>{1,2}", media: "visual", inherited: !1, animationType: "lpc", percentages: "referToDimensionOfBorderBox", groups: ["CSS Backgrounds and Borders"], initial: "0", appliesto: "allElementsUAsNotRequiredWhenCollapse", computed: "twoAbsoluteLengthOrPercentages", order: "uniqueOrder", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-bottom-left-radius" },
  "border-bottom-right-radius": { syntax: "<length-percentage>{1,2}", media: "visual", inherited: !1, animationType: "lpc", percentages: "referToDimensionOfBorderBox", groups: ["CSS Backgrounds and Borders"], initial: "0", appliesto: "allElementsUAsNotRequiredWhenCollapse", computed: "twoAbsoluteLengthOrPercentages", order: "uniqueOrder", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-bottom-right-radius" },
  "border-bottom-style": { syntax: "<line-style>", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Backgrounds and Borders"], initial: "none", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-bottom-style" },
  "border-bottom-width": { syntax: "<line-width>", media: "visual", inherited: !1, animationType: "length", percentages: "no", groups: ["CSS Backgrounds and Borders"], initial: "medium", appliesto: "allElements", computed: "absoluteLengthOr0IfBorderBottomStyleNoneOrHidden", order: "uniqueOrder", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-bottom-width" },
  "border-collapse": { syntax: "collapse | separate", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Table"], initial: "separate", appliesto: "tableElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-collapse" },
  "border-color": { syntax: "<color>{1,4}", media: "visual", inherited: !1, animationType: ["border-bottom-color", "border-left-color", "border-right-color", "border-top-color"], percentages: "no", groups: ["CSS Backgrounds and Borders"], initial: ["border-top-color", "border-right-color", "border-bottom-color", "border-left-color"], appliesto: "allElements", computed: ["border-bottom-color", "border-left-color", "border-right-color", "border-top-color"], order: "uniqueOrder", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-color" },
  "border-end-end-radius": { syntax: "<length-percentage>{1,2}", media: "visual", inherited: !1, animationType: "lpc", percentages: "referToDimensionOfBorderBox", groups: ["CSS Logical Properties"], initial: "0", appliesto: "allElementsUAsNotRequiredWhenCollapse", computed: "twoAbsoluteLengthOrPercentages", order: "uniqueOrder", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-end-end-radius" },
  "border-end-start-radius": { syntax: "<length-percentage>{1,2}", media: "visual", inherited: !1, animationType: "lpc", percentages: "referToDimensionOfBorderBox", groups: ["CSS Logical Properties"], initial: "0", appliesto: "allElementsUAsNotRequiredWhenCollapse", computed: "twoAbsoluteLengthOrPercentages", order: "uniqueOrder", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-end-start-radius" },
  "border-image": { syntax: "<'border-image-source'> || <'border-image-slice'> [ / <'border-image-width'> | / <'border-image-width'>? / <'border-image-outset'> ]? || <'border-image-repeat'>", media: "visual", inherited: !1, animationType: "discrete", percentages: ["border-image-slice", "border-image-width"], groups: ["CSS Backgrounds and Borders"], initial: ["border-image-source", "border-image-slice", "border-image-width", "border-image-outset", "border-image-repeat"], appliesto: "allElementsExceptTableElementsWhenCollapse", computed: ["border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width"], order: "uniqueOrder", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-image" },
  "border-image-outset": { syntax: "[ <length> | <number> ]{1,4}", media: "visual", inherited: !1, animationType: "byComputedValueType", percentages: "no", groups: ["CSS Backgrounds and Borders"], initial: "0", appliesto: "allElementsExceptTableElementsWhenCollapse", computed: "asSpecifiedRelativeToAbsoluteLengths", order: "uniqueOrder", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-image-outset" },
  "border-image-repeat": { syntax: "[ stretch | repeat | round | space ]{1,2}", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Backgrounds and Borders"], initial: "stretch", appliesto: "allElementsExceptTableElementsWhenCollapse", computed: "asSpecified", order: "uniqueOrder", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-image-repeat" },
  "border-image-slice": { syntax: "<number-percentage>{1,4} && fill?", media: "visual", inherited: !1, animationType: "byComputedValueType", percentages: "referToSizeOfBorderImage", groups: ["CSS Backgrounds and Borders"], initial: "100%", appliesto: "allElementsExceptTableElementsWhenCollapse", computed: "oneToFourPercentagesOrAbsoluteLengthsPlusFill", order: "percentagesOrLengthsFollowedByFill", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-image-slice" },
  "border-image-source": { syntax: "none | <image>", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Backgrounds and Borders"], initial: "none", appliesto: "allElementsExceptTableElementsWhenCollapse", computed: "noneOrImageWithAbsoluteURI", order: "uniqueOrder", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-image-source" },
  "border-image-width": { syntax: "[ <length-percentage> | <number> | auto ]{1,4}", media: "visual", inherited: !1, animationType: "byComputedValueType", percentages: "referToWidthOrHeightOfBorderImageArea", groups: ["CSS Backgrounds and Borders"], initial: "1", appliesto: "allElementsExceptTableElementsWhenCollapse", computed: "asSpecifiedRelativeToAbsoluteLengths", order: "uniqueOrder", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-image-width" },
  "border-inline": { syntax: "<'border-top-width'> || <'border-top-style'> || <'color'>", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Logical Properties"], initial: ["border-top-width", "border-top-style", "border-top-color"], appliesto: "allElements", computed: ["border-top-width", "border-top-style", "border-top-color"], order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-inline" },
  "border-inline-end": { syntax: "<'border-top-width'> || <'border-top-style'> || <'color'>", media: "visual", inherited: !1, animationType: ["border-inline-end-color", "border-inline-end-style", "border-inline-end-width"], percentages: "no", groups: ["CSS Logical Properties"], initial: ["border-width", "border-style", "color"], appliesto: "allElements", computed: ["border-width", "border-style", "border-inline-end-color"], order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-inline-end" },
  "border-inline-color": { syntax: "<'border-top-color'>{1,2}", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Logical Properties"], initial: "currentcolor", appliesto: "allElements", computed: "computedColor", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-inline-color" },
  "border-inline-style": { syntax: "<'border-top-style'>", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Logical Properties"], initial: "none", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-inline-style" },
  "border-inline-width": { syntax: "<'border-top-width'>", media: "visual", inherited: !1, animationType: "discrete", percentages: "logicalWidthOfContainingBlock", groups: ["CSS Logical Properties"], initial: "medium", appliesto: "allElements", computed: "absoluteLengthZeroIfBorderStyleNoneOrHidden", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-inline-width" },
  "border-inline-end-color": { syntax: "<'border-top-color'>", media: "visual", inherited: !1, animationType: "color", percentages: "no", groups: ["CSS Logical Properties"], initial: "currentcolor", appliesto: "allElements", computed: "computedColor", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-inline-end-color" },
  "border-inline-end-style": { syntax: "<'border-top-style'>", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Logical Properties"], initial: "none", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-inline-end-style" },
  "border-inline-end-width": { syntax: "<'border-top-width'>", media: "visual", inherited: !1, animationType: "length", percentages: "logicalWidthOfContainingBlock", groups: ["CSS Logical Properties"], initial: "medium", appliesto: "allElements", computed: "absoluteLengthZeroIfBorderStyleNoneOrHidden", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-inline-end-width" },
  "border-inline-start": { syntax: "<'border-top-width'> || <'border-top-style'> || <'color'>", media: "visual", inherited: !1, animationType: ["border-inline-start-color", "border-inline-start-style", "border-inline-start-width"], percentages: "no", groups: ["CSS Logical Properties"], initial: ["border-width", "border-style", "color"], appliesto: "allElements", computed: ["border-width", "border-style", "border-inline-start-color"], order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-inline-start" },
  "border-inline-start-color": { syntax: "<'border-top-color'>", media: "visual", inherited: !1, animationType: "color", percentages: "no", groups: ["CSS Logical Properties"], initial: "currentcolor", appliesto: "allElements", computed: "computedColor", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-inline-start-color" },
  "border-inline-start-style": { syntax: "<'border-top-style'>", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Logical Properties"], initial: "none", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-inline-start-style" },
  "border-inline-start-width": { syntax: "<'border-top-width'>", media: "visual", inherited: !1, animationType: "length", percentages: "logicalWidthOfContainingBlock", groups: ["CSS Logical Properties"], initial: "medium", appliesto: "allElements", computed: "absoluteLengthZeroIfBorderStyleNoneOrHidden", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-inline-start-width" },
  "border-left": { syntax: "<line-width> || <line-style> || <color>", media: "visual", inherited: !1, animationType: ["border-left-color", "border-left-style", "border-left-width"], percentages: "no", groups: ["CSS Backgrounds and Borders"], initial: ["border-left-width", "border-left-style", "border-left-color"], appliesto: "allElements", computed: ["border-left-width", "border-left-style", "border-left-color"], order: "orderOfAppearance", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-left" },
  "border-left-color": { syntax: "<color>", media: "visual", inherited: !1, animationType: "color", percentages: "no", groups: ["CSS Backgrounds and Borders"], initial: "currentcolor", appliesto: "allElements", computed: "computedColor", order: "uniqueOrder", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-left-color" },
  "border-left-style": { syntax: "<line-style>", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Backgrounds and Borders"], initial: "none", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-left-style" },
  "border-left-width": { syntax: "<line-width>", media: "visual", inherited: !1, animationType: "length", percentages: "no", groups: ["CSS Backgrounds and Borders"], initial: "medium", appliesto: "allElements", computed: "absoluteLengthOr0IfBorderLeftStyleNoneOrHidden", order: "uniqueOrder", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-left-width" },
  "border-radius": { syntax: "<length-percentage>{1,4} [ / <length-percentage>{1,4} ]?", media: "visual", inherited: !1, animationType: ["border-top-left-radius", "border-top-right-radius", "border-bottom-right-radius", "border-bottom-left-radius"], percentages: "referToDimensionOfBorderBox", groups: ["CSS Backgrounds and Borders"], initial: ["border-top-left-radius", "border-top-right-radius", "border-bottom-right-radius", "border-bottom-left-radius"], appliesto: "allElementsUAsNotRequiredWhenCollapse", computed: ["border-bottom-left-radius", "border-bottom-right-radius", "border-top-left-radius", "border-top-right-radius"], order: "uniqueOrder", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-radius" },
  "border-right": { syntax: "<line-width> || <line-style> || <color>", media: "visual", inherited: !1, animationType: ["border-right-color", "border-right-style", "border-right-width"], percentages: "no", groups: ["CSS Backgrounds and Borders"], initial: ["border-right-width", "border-right-style", "border-right-color"], appliesto: "allElements", computed: ["border-right-width", "border-right-style", "border-right-color"], order: "orderOfAppearance", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-right" },
  "border-right-color": { syntax: "<color>", media: "visual", inherited: !1, animationType: "color", percentages: "no", groups: ["CSS Backgrounds and Borders"], initial: "currentcolor", appliesto: "allElements", computed: "computedColor", order: "uniqueOrder", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-right-color" },
  "border-right-style": { syntax: "<line-style>", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Backgrounds and Borders"], initial: "none", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-right-style" },
  "border-right-width": { syntax: "<line-width>", media: "visual", inherited: !1, animationType: "length", percentages: "no", groups: ["CSS Backgrounds and Borders"], initial: "medium", appliesto: "allElements", computed: "absoluteLengthOr0IfBorderRightStyleNoneOrHidden", order: "uniqueOrder", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-right-width" },
  "border-spacing": { syntax: "<length> <length>?", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Table"], initial: "0", appliesto: "tableElements", computed: "twoAbsoluteLengths", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-spacing" },
  "border-start-end-radius": { syntax: "<length-percentage>{1,2}", media: "visual", inherited: !1, animationType: "lpc", percentages: "referToDimensionOfBorderBox", groups: ["CSS Logical Properties"], initial: "0", appliesto: "allElementsUAsNotRequiredWhenCollapse", computed: "twoAbsoluteLengthOrPercentages", order: "uniqueOrder", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-start-end-radius" },
  "border-start-start-radius": { syntax: "<length-percentage>{1,2}", media: "visual", inherited: !1, animationType: "lpc", percentages: "referToDimensionOfBorderBox", groups: ["CSS Logical Properties"], initial: "0", appliesto: "allElementsUAsNotRequiredWhenCollapse", computed: "twoAbsoluteLengthOrPercentages", order: "uniqueOrder", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-start-start-radius" },
  "border-style": { syntax: "<line-style>{1,4}", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Backgrounds and Borders"], initial: ["border-top-style", "border-right-style", "border-bottom-style", "border-left-style"], appliesto: "allElements", computed: ["border-bottom-style", "border-left-style", "border-right-style", "border-top-style"], order: "uniqueOrder", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-style" },
  "border-top": { syntax: "<line-width> || <line-style> || <color>", media: "visual", inherited: !1, animationType: ["border-top-color", "border-top-style", "border-top-width"], percentages: "no", groups: ["CSS Backgrounds and Borders"], initial: ["border-top-width", "border-top-style", "border-top-color"], appliesto: "allElements", computed: ["border-top-width", "border-top-style", "border-top-color"], order: "orderOfAppearance", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-top" },
  "border-top-color": { syntax: "<color>", media: "visual", inherited: !1, animationType: "color", percentages: "no", groups: ["CSS Backgrounds and Borders"], initial: "currentcolor", appliesto: "allElements", computed: "computedColor", order: "uniqueOrder", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-top-color" },
  "border-top-left-radius": { syntax: "<length-percentage>{1,2}", media: "visual", inherited: !1, animationType: "lpc", percentages: "referToDimensionOfBorderBox", groups: ["CSS Backgrounds and Borders"], initial: "0", appliesto: "allElementsUAsNotRequiredWhenCollapse", computed: "twoAbsoluteLengthOrPercentages", order: "uniqueOrder", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-top-left-radius" },
  "border-top-right-radius": { syntax: "<length-percentage>{1,2}", media: "visual", inherited: !1, animationType: "lpc", percentages: "referToDimensionOfBorderBox", groups: ["CSS Backgrounds and Borders"], initial: "0", appliesto: "allElementsUAsNotRequiredWhenCollapse", computed: "twoAbsoluteLengthOrPercentages", order: "uniqueOrder", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-top-right-radius" },
  "border-top-style": { syntax: "<line-style>", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Backgrounds and Borders"], initial: "none", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-top-style" },
  "border-top-width": { syntax: "<line-width>", media: "visual", inherited: !1, animationType: "length", percentages: "no", groups: ["CSS Backgrounds and Borders"], initial: "medium", appliesto: "allElements", computed: "absoluteLengthOr0IfBorderTopStyleNoneOrHidden", order: "uniqueOrder", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-top-width" },
  "border-width": { syntax: "<line-width>{1,4}", media: "visual", inherited: !1, animationType: ["border-bottom-width", "border-left-width", "border-right-width", "border-top-width"], percentages: "no", groups: ["CSS Backgrounds and Borders"], initial: ["border-top-width", "border-right-width", "border-bottom-width", "border-left-width"], appliesto: "allElements", computed: ["border-bottom-width", "border-left-width", "border-right-width", "border-top-width"], order: "uniqueOrder", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-width" },
  bottom,
  "box-align": { syntax: "start | center | end | baseline | stretch", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Mozilla Extensions", "WebKit Extensions"], initial: "stretch", appliesto: "elementsWithDisplayBoxOrInlineBox", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/box-align" },
  "box-decoration-break": { syntax: "slice | clone", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Fragmentation"], initial: "slice", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/box-decoration-break" },
  "box-direction": { syntax: "normal | reverse | inherit", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Mozilla Extensions", "WebKit Extensions"], initial: "normal", appliesto: "elementsWithDisplayBoxOrInlineBox", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/box-direction" },
  "box-flex": { syntax: "<number>", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Mozilla Extensions", "WebKit Extensions"], initial: "0", appliesto: "directChildrenOfElementsWithDisplayMozBoxMozInlineBox", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/box-flex" },
  "box-flex-group": { syntax: "<integer>", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Mozilla Extensions", "WebKit Extensions"], initial: "1", appliesto: "inFlowChildrenOfBoxElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/box-flex-group" },
  "box-lines": { syntax: "single | multiple", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Mozilla Extensions", "WebKit Extensions"], initial: "single", appliesto: "boxElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/box-lines" },
  "box-ordinal-group": { syntax: "<integer>", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Mozilla Extensions", "WebKit Extensions"], initial: "1", appliesto: "childrenOfBoxElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/box-ordinal-group" },
  "box-orient": { syntax: "horizontal | vertical | inline-axis | block-axis | inherit", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Mozilla Extensions", "WebKit Extensions"], initial: "inlineAxisHorizontalInXUL", appliesto: "elementsWithDisplayBoxOrInlineBox", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/box-orient" },
  "box-pack": { syntax: "start | center | end | justify", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Mozilla Extensions", "WebKit Extensions"], initial: "start", appliesto: "elementsWithDisplayMozBoxMozInlineBox", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/box-pack" },
  "box-shadow": { syntax: "none | <shadow>#", media: "visual", inherited: !1, animationType: "shadowList", percentages: "no", groups: ["CSS Backgrounds and Borders"], initial: "none", appliesto: "allElements", computed: "absoluteLengthsSpecifiedColorAsSpecified", order: "uniqueOrder", alsoAppliesTo: ["::first-letter"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/box-shadow" },
  "box-sizing": { syntax: "content-box | border-box", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Basic User Interface"], initial: "content-box", appliesto: "allElementsAcceptingWidthOrHeight", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/box-sizing" },
  "break-after": { syntax: "auto | avoid | always | all | avoid-page | page | left | right | recto | verso | avoid-column | column | avoid-region | region", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Fragmentation"], initial: "auto", appliesto: "blockLevelElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/break-after" },
  "break-before": { syntax: "auto | avoid | always | all | avoid-page | page | left | right | recto | verso | avoid-column | column | avoid-region | region", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Fragmentation"], initial: "auto", appliesto: "blockLevelElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/break-before" },
  "break-inside": { syntax: "auto | avoid | avoid-page | avoid-column | avoid-region", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Fragmentation"], initial: "auto", appliesto: "blockLevelElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/break-inside" },
  "caption-side": { syntax: "top | bottom | block-start | block-end | inline-start | inline-end", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Table"], initial: "top", appliesto: "tableCaptionElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/caption-side" },
  "caret-color": { syntax: "auto | <color>", media: "interactive", inherited: !0, animationType: "color", percentages: "no", groups: ["CSS Basic User Interface"], initial: "auto", appliesto: "allElements", computed: "asAutoOrColor", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/caret-color" },
  clear,
  clip,
  "clip-path": { syntax: "<clip-source> | [ <basic-shape> || <geometry-box> ] | none", media: "visual", inherited: !1, animationType: "basicShapeOtherwiseNo", percentages: "referToReferenceBoxWhenSpecifiedOtherwiseBorderBox", groups: ["CSS Masking"], initial: "none", appliesto: "allElementsSVGContainerElements", computed: "asSpecifiedURLsAbsolute", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/clip-path" },
  color: color$1,
  "color-adjust": { syntax: "economy | exact", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Color"], initial: "economy", appliesto: "allElements", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/color-adjust" },
  "column-count": { syntax: "<integer> | auto", media: "visual", inherited: !1, animationType: "integer", percentages: "no", groups: ["CSS Columns"], initial: "auto", appliesto: "blockContainersExceptTableWrappers", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/column-count" },
  "column-fill": { syntax: "auto | balance | balance-all", media: "visualInContinuousMediaNoEffectInOverflowColumns", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Columns"], initial: "balance", appliesto: "multicolElements", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/column-fill" },
  "column-gap": { syntax: "normal | <length-percentage>", media: "visual", inherited: !1, animationType: "lpc", percentages: "referToDimensionOfContentArea", groups: ["CSS Box Alignment"], initial: "normal", appliesto: "multiColumnElementsFlexContainersGridContainers", computed: "asSpecifiedWithLengthsAbsoluteAndNormalComputingToZeroExceptMultiColumn", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/column-gap" },
  "column-rule": { syntax: "<'column-rule-width'> || <'column-rule-style'> || <'column-rule-color'>", media: "visual", inherited: !1, animationType: ["column-rule-color", "column-rule-style", "column-rule-width"], percentages: "no", groups: ["CSS Columns"], initial: ["column-rule-width", "column-rule-style", "column-rule-color"], appliesto: "multicolElements", computed: ["column-rule-color", "column-rule-style", "column-rule-width"], order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/column-rule" },
  "column-rule-color": { syntax: "<color>", media: "visual", inherited: !1, animationType: "color", percentages: "no", groups: ["CSS Columns"], initial: "currentcolor", appliesto: "multicolElements", computed: "computedColor", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/column-rule-color" },
  "column-rule-style": { syntax: "<'border-style'>", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Columns"], initial: "none", appliesto: "multicolElements", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/column-rule-style" },
  "column-rule-width": { syntax: "<'border-width'>", media: "visual", inherited: !1, animationType: "length", percentages: "no", groups: ["CSS Columns"], initial: "medium", appliesto: "multicolElements", computed: "absoluteLength0IfColumnRuleStyleNoneOrHidden", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/column-rule-width" },
  "column-span": { syntax: "none | all", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Columns"], initial: "none", appliesto: "inFlowBlockLevelElements", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/column-span" },
  "column-width": { syntax: "<length> | auto", media: "visual", inherited: !1, animationType: "length", percentages: "no", groups: ["CSS Columns"], initial: "auto", appliesto: "blockContainersExceptTableWrappers", computed: "absoluteLengthZeroOrLarger", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/column-width" },
  columns,
  contain,
  content,
  "counter-increment": { syntax: "[ <custom-ident> <integer>? ]+ | none", media: "all", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Counter Styles"], initial: "none", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/counter-increment" },
  "counter-reset": { syntax: "[ <custom-ident> <integer>? ]+ | none", media: "all", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Counter Styles"], initial: "none", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/counter-reset" },
  "counter-set": { syntax: "[ <custom-ident> <integer>? ]+ | none", media: "all", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Counter Styles"], initial: "none", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/counter-set" },
  cursor,
  direction,
  display,
  "empty-cells": { syntax: "show | hide", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Table"], initial: "show", appliesto: "tableCellElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/empty-cells" },
  filter,
  flex,
  "flex-basis": { syntax: "content | <'width'>", media: "visual", inherited: !1, animationType: "lpc", percentages: "referToFlexContainersInnerMainSize", groups: ["CSS Flexible Box Layout"], initial: "auto", appliesto: "flexItemsAndInFlowPseudos", computed: "asSpecifiedRelativeToAbsoluteLengths", order: "lengthOrPercentageBeforeKeywordIfBothPresent", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/flex-basis" },
  "flex-direction": { syntax: "row | row-reverse | column | column-reverse", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Flexible Box Layout"], initial: "row", appliesto: "flexContainers", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/flex-direction" },
  "flex-flow": { syntax: "<'flex-direction'> || <'flex-wrap'>", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Flexible Box Layout"], initial: ["flex-direction", "flex-wrap"], appliesto: "flexContainers", computed: ["flex-direction", "flex-wrap"], order: "orderOfAppearance", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/flex-flow" },
  "flex-grow": { syntax: "<number>", media: "visual", inherited: !1, animationType: "number", percentages: "no", groups: ["CSS Flexible Box Layout"], initial: "0", appliesto: "flexItemsAndInFlowPseudos", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/flex-grow" },
  "flex-shrink": { syntax: "<number>", media: "visual", inherited: !1, animationType: "number", percentages: "no", groups: ["CSS Flexible Box Layout"], initial: "1", appliesto: "flexItemsAndInFlowPseudos", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/flex-shrink" },
  "flex-wrap": { syntax: "nowrap | wrap | wrap-reverse", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Flexible Box Layout"], initial: "nowrap", appliesto: "flexContainers", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/flex-wrap" },
  float,
  font,
  "font-family": { syntax: "[ <family-name> | <generic-family> ]#", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Fonts"], initial: "dependsOnUserAgent", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-family" },
  "font-feature-settings": { syntax: "normal | <feature-tag-value>#", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Fonts"], initial: "normal", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-feature-settings" },
  "font-kerning": { syntax: "auto | normal | none", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Fonts"], initial: "auto", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-kerning" },
  "font-language-override": { syntax: "normal | <string>", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Fonts"], initial: "normal", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-language-override" },
  "font-optical-sizing": { syntax: "auto | none", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Fonts"], initial: "auto", appliesto: "allElements", computed: "asSpecified", order: "perGrammar", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-optical-sizing" },
  "font-variation-settings": { syntax: "normal | [ <string> <number> ]#", media: "visual", inherited: !0, animationType: "transform", percentages: "no", groups: ["CSS Fonts"], initial: "normal", appliesto: "allElements", computed: "asSpecified", order: "perGrammar", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-variation-settings" },
  "font-size": { syntax: "<absolute-size> | <relative-size> | <length-percentage>", media: "visual", inherited: !0, animationType: "length", percentages: "referToParentElementsFontSize", groups: ["CSS Fonts"], initial: "medium", appliesto: "allElements", computed: "asSpecifiedRelativeToAbsoluteLengths", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-size" },
  "font-size-adjust": { syntax: "none | <number>", media: "visual", inherited: !0, animationType: "number", percentages: "no", groups: ["CSS Fonts"], initial: "none", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-size-adjust" },
  "font-smooth": { syntax: "auto | never | always | <absolute-size> | <length>", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Fonts"], initial: "auto", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-smooth" },
  "font-stretch": { syntax: "<font-stretch-absolute>", media: "visual", inherited: !0, animationType: "fontStretch", percentages: "no", groups: ["CSS Fonts"], initial: "normal", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-stretch" },
  "font-style": { syntax: "normal | italic | oblique <angle>?", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Fonts"], initial: "normal", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-style" },
  "font-synthesis": { syntax: "none | [ weight || style ]", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Fonts"], initial: "weight style", appliesto: "allElements", computed: "asSpecified", order: "orderOfAppearance", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-synthesis" },
  "font-variant": { syntax: "normal | none | [ <common-lig-values> || <discretionary-lig-values> || <historical-lig-values> || <contextual-alt-values> || stylistic( <feature-value-name> ) || historical-forms || styleset( <feature-value-name># ) || character-variant( <feature-value-name># ) || swash( <feature-value-name> ) || ornaments( <feature-value-name> ) || annotation( <feature-value-name> ) || [ small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps ] || <numeric-figure-values> || <numeric-spacing-values> || <numeric-fraction-values> || ordinal || slashed-zero || <east-asian-variant-values> || <east-asian-width-values> || ruby ]", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Fonts"], initial: "normal", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-variant" },
  "font-variant-alternates": { syntax: "normal | [ stylistic( <feature-value-name> ) || historical-forms || styleset( <feature-value-name># ) || character-variant( <feature-value-name># ) || swash( <feature-value-name> ) || ornaments( <feature-value-name> ) || annotation( <feature-value-name> ) ]", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Fonts"], initial: "normal", appliesto: "allElements", computed: "asSpecified", order: "orderOfAppearance", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-variant-alternates" },
  "font-variant-caps": { syntax: "normal | small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Fonts"], initial: "normal", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-variant-caps" },
  "font-variant-east-asian": { syntax: "normal | [ <east-asian-variant-values> || <east-asian-width-values> || ruby ]", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Fonts"], initial: "normal", appliesto: "allElements", computed: "asSpecified", order: "orderOfAppearance", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-variant-east-asian" },
  "font-variant-ligatures": { syntax: "normal | none | [ <common-lig-values> || <discretionary-lig-values> || <historical-lig-values> || <contextual-alt-values> ]", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Fonts"], initial: "normal", appliesto: "allElements", computed: "asSpecified", order: "orderOfAppearance", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-variant-ligatures" },
  "font-variant-numeric": { syntax: "normal | [ <numeric-figure-values> || <numeric-spacing-values> || <numeric-fraction-values> || ordinal || slashed-zero ]", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Fonts"], initial: "normal", appliesto: "allElements", computed: "asSpecified", order: "orderOfAppearance", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-variant-numeric" },
  "font-variant-position": { syntax: "normal | sub | super", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Fonts"], initial: "normal", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-variant-position" },
  "font-weight": { syntax: "<font-weight-absolute> | bolder | lighter", media: "visual", inherited: !0, animationType: "fontWeight", percentages: "no", groups: ["CSS Fonts"], initial: "normal", appliesto: "allElements", computed: "keywordOrNumericalValueBolderLighterTransformedToRealValue", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-weight" },
  gap,
  grid,
  "grid-area": { syntax: "<grid-line> [ / <grid-line> ]{0,3}", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Grid Layout"], initial: ["grid-row-start", "grid-column-start", "grid-row-end", "grid-column-end"], appliesto: "gridItemsAndBoxesWithinGridContainer", computed: ["grid-row-start", "grid-column-start", "grid-row-end", "grid-column-end"], order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/grid-area" },
  "grid-auto-columns": { syntax: "<track-size>+", media: "visual", inherited: !1, animationType: "discrete", percentages: "referToDimensionOfContentArea", groups: ["CSS Grid Layout"], initial: "auto", appliesto: "gridContainers", computed: "percentageAsSpecifiedOrAbsoluteLength", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/grid-auto-columns" },
  "grid-auto-flow": { syntax: "[ row | column ] || dense", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Grid Layout"], initial: "row", appliesto: "gridContainers", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/grid-auto-flow" },
  "grid-auto-rows": { syntax: "<track-size>+", media: "visual", inherited: !1, animationType: "discrete", percentages: "referToDimensionOfContentArea", groups: ["CSS Grid Layout"], initial: "auto", appliesto: "gridContainers", computed: "percentageAsSpecifiedOrAbsoluteLength", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/grid-auto-rows" },
  "grid-column": { syntax: "<grid-line> [ / <grid-line> ]?", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Grid Layout"], initial: ["grid-column-start", "grid-column-end"], appliesto: "gridItemsAndBoxesWithinGridContainer", computed: ["grid-column-start", "grid-column-end"], order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/grid-column" },
  "grid-column-end": { syntax: "<grid-line>", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Grid Layout"], initial: "auto", appliesto: "gridItemsAndBoxesWithinGridContainer", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/grid-column-end" },
  "grid-column-gap": { syntax: "<length-percentage>", media: "visual", inherited: !1, animationType: "length", percentages: "referToDimensionOfContentArea", groups: ["CSS Grid Layout"], initial: "0", appliesto: "gridContainers", computed: "percentageAsSpecifiedOrAbsoluteLength", order: "uniqueOrder", status: "obsolete", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/column-gap" },
  "grid-column-start": { syntax: "<grid-line>", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Grid Layout"], initial: "auto", appliesto: "gridItemsAndBoxesWithinGridContainer", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/grid-column-start" },
  "grid-gap": { syntax: "<'grid-row-gap'> <'grid-column-gap'>?", media: "visual", inherited: !1, animationType: ["grid-row-gap", "grid-column-gap"], percentages: "no", groups: ["CSS Grid Layout"], initial: ["grid-row-gap", "grid-column-gap"], appliesto: "gridContainers", computed: ["grid-row-gap", "grid-column-gap"], order: "uniqueOrder", status: "obsolete", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/gap" },
  "grid-row": { syntax: "<grid-line> [ / <grid-line> ]?", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Grid Layout"], initial: ["grid-row-start", "grid-row-end"], appliesto: "gridItemsAndBoxesWithinGridContainer", computed: ["grid-row-start", "grid-row-end"], order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/grid-row" },
  "grid-row-end": { syntax: "<grid-line>", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Grid Layout"], initial: "auto", appliesto: "gridItemsAndBoxesWithinGridContainer", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/grid-row-end" },
  "grid-row-gap": { syntax: "<length-percentage>", media: "visual", inherited: !1, animationType: "length", percentages: "referToDimensionOfContentArea", groups: ["CSS Grid Layout"], initial: "0", appliesto: "gridContainers", computed: "percentageAsSpecifiedOrAbsoluteLength", order: "uniqueOrder", status: "obsolete", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/row-gap" },
  "grid-row-start": { syntax: "<grid-line>", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Grid Layout"], initial: "auto", appliesto: "gridItemsAndBoxesWithinGridContainer", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/grid-row-start" },
  "grid-template": { syntax: "none | [ <'grid-template-rows'> / <'grid-template-columns'> ] | [ <line-names>? <string> <track-size>? <line-names>? ]+ [ / <explicit-track-list> ]?", media: "visual", inherited: !1, animationType: "discrete", percentages: ["grid-template-columns", "grid-template-rows"], groups: ["CSS Grid Layout"], initial: ["grid-template-columns", "grid-template-rows", "grid-template-areas"], appliesto: "gridContainers", computed: ["grid-template-columns", "grid-template-rows", "grid-template-areas"], order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/grid-template" },
  "grid-template-areas": { syntax: "none | <string>+", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Grid Layout"], initial: "none", appliesto: "gridContainers", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/grid-template-areas" },
  "grid-template-columns": { syntax: "none | <track-list> | <auto-track-list> | subgrid <line-name-list>?", media: "visual", inherited: !1, animationType: "simpleListOfLpcDifferenceLpc", percentages: "referToDimensionOfContentArea", groups: ["CSS Grid Layout"], initial: "none", appliesto: "gridContainers", computed: "asSpecifiedRelativeToAbsoluteLengths", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/grid-template-columns" },
  "grid-template-rows": { syntax: "none | <track-list> | <auto-track-list> | subgrid <line-name-list>?", media: "visual", inherited: !1, animationType: "simpleListOfLpcDifferenceLpc", percentages: "referToDimensionOfContentArea", groups: ["CSS Grid Layout"], initial: "none", appliesto: "gridContainers", computed: "asSpecifiedRelativeToAbsoluteLengths", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/grid-template-rows" },
  "hanging-punctuation": { syntax: "none | [ first || [ force-end | allow-end ] || last ]", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Text"], initial: "none", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/hanging-punctuation" },
  height,
  hyphens,
  "image-orientation": { syntax: "from-image | <angle> | [ <angle>? flip ]", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Images"], initial: "from-image", appliesto: "allElements", computed: "angleRoundedToNextQuarter", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/image-orientation" },
  "image-rendering": { syntax: "auto | crisp-edges | pixelated", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Images"], initial: "auto", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/image-rendering" },
  "image-resolution": { syntax: "[ from-image || <resolution> ] && snap?", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Images"], initial: "1dppx", appliesto: "allElements", computed: "asSpecifiedWithExceptionOfResolution", order: "uniqueOrder", status: "experimental" },
  "ime-mode": { syntax: "auto | normal | active | inactive | disabled", media: "interactive", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Basic User Interface"], initial: "auto", appliesto: "textFields", computed: "asSpecified", order: "uniqueOrder", status: "obsolete", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/ime-mode" },
  "initial-letter": { syntax: "normal | [ <number> <integer>? ]", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Inline"], initial: "normal", appliesto: "firstLetterPseudoElementsAndInlineLevelFirstChildren", computed: "asSpecified", order: "uniqueOrder", status: "experimental", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/initial-letter" },
  "initial-letter-align": { syntax: "[ auto | alphabetic | hanging | ideographic ]", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Inline"], initial: "auto", appliesto: "firstLetterPseudoElementsAndInlineLevelFirstChildren", computed: "asSpecified", order: "uniqueOrder", status: "experimental", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/initial-letter-align" },
  "inline-size": { syntax: "<'width'>", media: "visual", inherited: !1, animationType: "lpc", percentages: "inlineSizeOfContainingBlock", groups: ["CSS Logical Properties"], initial: "auto", appliesto: "sameAsWidthAndHeight", computed: "sameAsWidthAndHeight", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/inline-size" },
  inset,
  "inset-block": { syntax: "<'top'>{1,2}", media: "visual", inherited: !1, animationType: "lpc", percentages: "logicalHeightOfContainingBlock", groups: ["CSS Logical Properties"], initial: "auto", appliesto: "positionedElements", computed: "sameAsBoxOffsets", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/inset-block" },
  "inset-block-end": { syntax: "<'top'>", media: "visual", inherited: !1, animationType: "lpc", percentages: "logicalHeightOfContainingBlock", groups: ["CSS Logical Properties"], initial: "auto", appliesto: "positionedElements", computed: "sameAsBoxOffsets", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/inset-block-end" },
  "inset-block-start": { syntax: "<'top'>", media: "visual", inherited: !1, animationType: "lpc", percentages: "logicalHeightOfContainingBlock", groups: ["CSS Logical Properties"], initial: "auto", appliesto: "positionedElements", computed: "sameAsBoxOffsets", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/inset-block-start" },
  "inset-inline": { syntax: "<'top'>{1,2}", media: "visual", inherited: !1, animationType: "lpc", percentages: "logicalWidthOfContainingBlock", groups: ["CSS Logical Properties"], initial: "auto", appliesto: "positionedElements", computed: "sameAsBoxOffsets", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/inset-inline" },
  "inset-inline-end": { syntax: "<'top'>", media: "visual", inherited: !1, animationType: "lpc", percentages: "logicalWidthOfContainingBlock", groups: ["CSS Logical Properties"], initial: "auto", appliesto: "positionedElements", computed: "sameAsBoxOffsets", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/inset-inline-end" },
  "inset-inline-start": { syntax: "<'top'>", media: "visual", inherited: !1, animationType: "lpc", percentages: "logicalWidthOfContainingBlock", groups: ["CSS Logical Properties"], initial: "auto", appliesto: "positionedElements", computed: "sameAsBoxOffsets", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/inset-inline-start" },
  isolation,
  "justify-content": { syntax: "normal | <content-distribution> | <overflow-position>? [ <content-position> | left | right ]", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Box Alignment"], initial: "normal", appliesto: "flexContainers", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/justify-content" },
  "justify-items": { syntax: "normal | stretch | <baseline-position> | <overflow-position>? [ <self-position> | left | right ] | legacy | legacy && [ left | right | center ]", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Box Alignment"], initial: "legacy", appliesto: "allElements", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/justify-items" },
  "justify-self": { syntax: "auto | normal | stretch | <baseline-position> | <overflow-position>? [ <self-position> | left | right ]", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Box Alignment"], initial: "auto", appliesto: "blockLevelBoxesAndAbsolutelyPositionedBoxesAndGridItems", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/justify-self" },
  "justify-tracks": { syntax: "[ normal | <content-distribution> | <overflow-position>? [ <content-position> | left | right ] ]#", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Grid Layout"], initial: "normal", appliesto: "gridContainersWithMasonryLayoutInTheirInlineAxis", computed: "asSpecified", order: "uniqueOrder", status: "experimental", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/justify-tracks" },
  left,
  "letter-spacing": { syntax: "normal | <length>", media: "visual", inherited: !0, animationType: "length", percentages: "no", groups: ["CSS Text"], initial: "normal", appliesto: "allElements", computed: "optimumValueOfAbsoluteLengthOrNormal", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/letter-spacing" },
  "line-break": { syntax: "auto | loose | normal | strict | anywhere", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Text"], initial: "auto", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/line-break" },
  "line-clamp": { syntax: "none | <integer>", media: "visual", inherited: !1, animationType: "integer", percentages: "no", groups: ["CSS Overflow"], initial: "none", appliesto: "blockContainersExceptMultiColumnContainers", computed: "asSpecified", order: "perGrammar", status: "experimental" },
  "line-height": { syntax: "normal | <number> | <length> | <percentage>", media: "visual", inherited: !0, animationType: "numberOrLength", percentages: "referToElementFontSize", groups: ["CSS Fonts"], initial: "normal", appliesto: "allElements", computed: "absoluteLengthOrAsSpecified", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/line-height" },
  "line-height-step": { syntax: "<length>", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Fonts"], initial: "0", appliesto: "blockContainers", computed: "absoluteLength", order: "perGrammar", status: "experimental", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/line-height-step" },
  "list-style": { syntax: "<'list-style-type'> || <'list-style-position'> || <'list-style-image'>", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Lists and Counters"], initial: ["list-style-type", "list-style-position", "list-style-image"], appliesto: "listItems", computed: ["list-style-image", "list-style-position", "list-style-type"], order: "orderOfAppearance", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/list-style" },
  "list-style-image": { syntax: "<url> | none", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Lists and Counters"], initial: "none", appliesto: "listItems", computed: "noneOrImageWithAbsoluteURI", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/list-style-image" },
  "list-style-position": { syntax: "inside | outside", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Lists and Counters"], initial: "outside", appliesto: "listItems", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/list-style-position" },
  "list-style-type": { syntax: "<counter-style> | <string> | none", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Lists and Counters"], initial: "disc", appliesto: "listItems", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/list-style-type" },
  margin,
  "margin-block": { syntax: "<'margin-left'>{1,2}", media: "visual", inherited: !1, animationType: "discrete", percentages: "dependsOnLayoutModel", groups: ["CSS Logical Properties"], initial: "0", appliesto: "sameAsMargin", computed: "lengthAbsolutePercentageAsSpecifiedOtherwiseAuto", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/margin-block" },
  "margin-block-end": { syntax: "<'margin-left'>", media: "visual", inherited: !1, animationType: "length", percentages: "dependsOnLayoutModel", groups: ["CSS Logical Properties"], initial: "0", appliesto: "sameAsMargin", computed: "lengthAbsolutePercentageAsSpecifiedOtherwiseAuto", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/margin-block-end" },
  "margin-block-start": { syntax: "<'margin-left'>", media: "visual", inherited: !1, animationType: "length", percentages: "dependsOnLayoutModel", groups: ["CSS Logical Properties"], initial: "0", appliesto: "sameAsMargin", computed: "lengthAbsolutePercentageAsSpecifiedOtherwiseAuto", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/margin-block-start" },
  "margin-bottom": { syntax: "<length> | <percentage> | auto", media: "visual", inherited: !1, animationType: "length", percentages: "referToWidthOfContainingBlock", groups: ["CSS Box Model"], initial: "0", appliesto: "allElementsExceptTableDisplayTypes", computed: "percentageAsSpecifiedOrAbsoluteLength", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/margin-bottom" },
  "margin-inline": { syntax: "<'margin-left'>{1,2}", media: "visual", inherited: !1, animationType: "discrete", percentages: "dependsOnLayoutModel", groups: ["CSS Logical Properties"], initial: "0", appliesto: "sameAsMargin", computed: "lengthAbsolutePercentageAsSpecifiedOtherwiseAuto", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/margin-inline" },
  "margin-inline-end": { syntax: "<'margin-left'>", media: "visual", inherited: !1, animationType: "length", percentages: "dependsOnLayoutModel", groups: ["CSS Logical Properties"], initial: "0", appliesto: "sameAsMargin", computed: "lengthAbsolutePercentageAsSpecifiedOtherwiseAuto", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/margin-inline-end" },
  "margin-inline-start": { syntax: "<'margin-left'>", media: "visual", inherited: !1, animationType: "length", percentages: "dependsOnLayoutModel", groups: ["CSS Logical Properties"], initial: "0", appliesto: "sameAsMargin", computed: "lengthAbsolutePercentageAsSpecifiedOtherwiseAuto", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/margin-inline-start" },
  "margin-left": { syntax: "<length> | <percentage> | auto", media: "visual", inherited: !1, animationType: "length", percentages: "referToWidthOfContainingBlock", groups: ["CSS Box Model"], initial: "0", appliesto: "allElementsExceptTableDisplayTypes", computed: "percentageAsSpecifiedOrAbsoluteLength", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/margin-left" },
  "margin-right": { syntax: "<length> | <percentage> | auto", media: "visual", inherited: !1, animationType: "length", percentages: "referToWidthOfContainingBlock", groups: ["CSS Box Model"], initial: "0", appliesto: "allElementsExceptTableDisplayTypes", computed: "percentageAsSpecifiedOrAbsoluteLength", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/margin-right" },
  "margin-top": { syntax: "<length> | <percentage> | auto", media: "visual", inherited: !1, animationType: "length", percentages: "referToWidthOfContainingBlock", groups: ["CSS Box Model"], initial: "0", appliesto: "allElementsExceptTableDisplayTypes", computed: "percentageAsSpecifiedOrAbsoluteLength", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/margin-top" },
  "margin-trim": { syntax: "none | in-flow | all", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Box Model"], initial: "none", appliesto: "blockContainersAndMultiColumnContainers", computed: "asSpecified", order: "perGrammar", alsoAppliesTo: ["::first-letter", "::first-line"], status: "experimental", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/margin-trim" },
  mask,
  "mask-border": { syntax: "<'mask-border-source'> || <'mask-border-slice'> [ / <'mask-border-width'>? [ / <'mask-border-outset'> ]? ]? || <'mask-border-repeat'> || <'mask-border-mode'>", media: "visual", inherited: !1, animationType: ["mask-border-mode", "mask-border-outset", "mask-border-repeat", "mask-border-slice", "mask-border-source", "mask-border-width"], percentages: ["mask-border-slice", "mask-border-width"], groups: ["CSS Masking"], initial: ["mask-border-mode", "mask-border-outset", "mask-border-repeat", "mask-border-slice", "mask-border-source", "mask-border-width"], appliesto: "allElementsSVGContainerElements", computed: ["mask-border-mode", "mask-border-outset", "mask-border-repeat", "mask-border-slice", "mask-border-source", "mask-border-width"], order: "perGrammar", stacking: !0, status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-border" },
  "mask-border-mode": { syntax: "luminance | alpha", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Masking"], initial: "alpha", appliesto: "allElementsSVGContainerElements", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-border-mode" },
  "mask-border-outset": { syntax: "[ <length> | <number> ]{1,4}", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Masking"], initial: "0", appliesto: "allElementsSVGContainerElements", computed: "asSpecifiedRelativeToAbsoluteLengths", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-border-outset" },
  "mask-border-repeat": { syntax: "[ stretch | repeat | round | space ]{1,2}", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Masking"], initial: "stretch", appliesto: "allElementsSVGContainerElements", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-border-repeat" },
  "mask-border-slice": { syntax: "<number-percentage>{1,4} fill?", media: "visual", inherited: !1, animationType: "discrete", percentages: "referToSizeOfMaskBorderImage", groups: ["CSS Masking"], initial: "0", appliesto: "allElementsSVGContainerElements", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-border-slice" },
  "mask-border-source": { syntax: "none | <image>", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Masking"], initial: "none", appliesto: "allElementsSVGContainerElements", computed: "asSpecifiedURLsAbsolute", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-border-source" },
  "mask-border-width": { syntax: "[ <length-percentage> | <number> | auto ]{1,4}", media: "visual", inherited: !1, animationType: "discrete", percentages: "relativeToMaskBorderImageArea", groups: ["CSS Masking"], initial: "auto", appliesto: "allElementsSVGContainerElements", computed: "asSpecifiedRelativeToAbsoluteLengths", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-border-width" },
  "mask-clip": { syntax: "[ <geometry-box> | no-clip ]#", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Masking"], initial: "border-box", appliesto: "allElementsSVGContainerElements", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-clip" },
  "mask-composite": { syntax: "<compositing-operator>#", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Masking"], initial: "add", appliesto: "allElementsSVGContainerElements", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-composite" },
  "mask-image": { syntax: "<mask-reference>#", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Masking"], initial: "none", appliesto: "allElementsSVGContainerElements", computed: "asSpecifiedURLsAbsolute", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-image" },
  "mask-mode": { syntax: "<masking-mode>#", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Masking"], initial: "match-source", appliesto: "allElementsSVGContainerElements", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-mode" },
  "mask-origin": { syntax: "<geometry-box>#", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Masking"], initial: "border-box", appliesto: "allElementsSVGContainerElements", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-origin" },
  "mask-position": { syntax: "<position>#", media: "visual", inherited: !1, animationType: "repeatableListOfSimpleListOfLpc", percentages: "referToSizeOfMaskPaintingArea", groups: ["CSS Masking"], initial: "center", appliesto: "allElementsSVGContainerElements", computed: "consistsOfTwoKeywordsForOriginAndOffsets", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-position" },
  "mask-repeat": { syntax: "<repeat-style>#", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Masking"], initial: "no-repeat", appliesto: "allElementsSVGContainerElements", computed: "consistsOfTwoDimensionKeywords", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-repeat" },
  "mask-size": { syntax: "<bg-size>#", media: "visual", inherited: !1, animationType: "repeatableListOfSimpleListOfLpc", percentages: "no", groups: ["CSS Masking"], initial: "auto", appliesto: "allElementsSVGContainerElements", computed: "asSpecifiedRelativeToAbsoluteLengths", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-size" },
  "mask-type": { syntax: "luminance | alpha", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Masking"], initial: "luminance", appliesto: "maskElements", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-type" },
  "masonry-auto-flow": { syntax: "[ pack | next ] || [ definite-first | ordered ]", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Grid Layout"], initial: "pack", appliesto: "gridContainersWithMasonryLayout", computed: "asSpecified", order: "uniqueOrder", status: "experimental", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/masonry-auto-flow" },
  "math-style": { syntax: "normal | compact", media: "visual", inherited: !0, animationType: "notAnimatable", percentages: "no", groups: ["MathML"], initial: "normal", appliesto: "allElements", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/math-style" },
  "max-block-size": { syntax: "<'max-width'>", media: "visual", inherited: !1, animationType: "lpc", percentages: "blockSizeOfContainingBlock", groups: ["CSS Logical Properties"], initial: "0", appliesto: "sameAsWidthAndHeight", computed: "sameAsMaxWidthAndMaxHeight", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/max-block-size" },
  "max-height": { syntax: "none | <length-percentage> | min-content | max-content | fit-content(<length-percentage>)", media: "visual", inherited: !1, animationType: "lpc", percentages: "regardingHeightOfGeneratedBoxContainingBlockPercentagesNone", groups: ["CSS Box Model"], initial: "none", appliesto: "allElementsButNonReplacedAndTableColumns", computed: "percentageAsSpecifiedAbsoluteLengthOrNone", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/max-height" },
  "max-inline-size": { syntax: "<'max-width'>", media: "visual", inherited: !1, animationType: "lpc", percentages: "inlineSizeOfContainingBlock", groups: ["CSS Logical Properties"], initial: "0", appliesto: "sameAsWidthAndHeight", computed: "sameAsMaxWidthAndMaxHeight", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/max-inline-size" },
  "max-lines": { syntax: "none | <integer>", media: "visual", inherited: !1, animationType: "integer", percentages: "no", groups: ["CSS Overflow"], initial: "none", appliesto: "blockContainersExceptMultiColumnContainers", computed: "asSpecified", order: "perGrammar", status: "experimental" },
  "max-width": { syntax: "none | <length-percentage> | min-content | max-content | fit-content(<length-percentage>)", media: "visual", inherited: !1, animationType: "lpc", percentages: "referToWidthOfContainingBlock", groups: ["CSS Box Model"], initial: "none", appliesto: "allElementsButNonReplacedAndTableRows", computed: "percentageAsSpecifiedAbsoluteLengthOrNone", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/max-width" },
  "min-block-size": { syntax: "<'min-width'>", media: "visual", inherited: !1, animationType: "lpc", percentages: "blockSizeOfContainingBlock", groups: ["CSS Logical Properties"], initial: "0", appliesto: "sameAsWidthAndHeight", computed: "sameAsMinWidthAndMinHeight", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/min-block-size" },
  "min-height": { syntax: "auto | <length> | <percentage> | min-content | max-content | fit-content(<length-percentage>)", media: "visual", inherited: !1, animationType: "lpc", percentages: "regardingHeightOfGeneratedBoxContainingBlockPercentages0", groups: ["CSS Box Model"], initial: "auto", appliesto: "allElementsButNonReplacedAndTableColumns", computed: "percentageAsSpecifiedOrAbsoluteLength", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/min-height" },
  "min-inline-size": { syntax: "<'min-width'>", media: "visual", inherited: !1, animationType: "lpc", percentages: "inlineSizeOfContainingBlock", groups: ["CSS Logical Properties"], initial: "0", appliesto: "sameAsWidthAndHeight", computed: "sameAsMinWidthAndMinHeight", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/min-inline-size" },
  "min-width": { syntax: "auto | <length> | <percentage> | min-content | max-content | fit-content(<length-percentage>)", media: "visual", inherited: !1, animationType: "lpc", percentages: "referToWidthOfContainingBlock", groups: ["CSS Box Model"], initial: "auto", appliesto: "allElementsButNonReplacedAndTableRows", computed: "percentageAsSpecifiedOrAbsoluteLength", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/min-width" },
  "mix-blend-mode": { syntax: "<blend-mode>", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Compositing and Blending"], initial: "normal", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", stacking: !0, status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mix-blend-mode" },
  "object-fit": { syntax: "fill | contain | cover | none | scale-down", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Images"], initial: "fill", appliesto: "replacedElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/object-fit" },
  "object-position": { syntax: "<position>", media: "visual", inherited: !0, animationType: "repeatableListOfSimpleListOfLpc", percentages: "referToWidthAndHeightOfElement", groups: ["CSS Images"], initial: "50% 50%", appliesto: "replacedElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/object-position" },
  offset,
  "offset-anchor": { syntax: "auto | <position>", media: "visual", inherited: !1, animationType: "position", percentages: "relativeToWidthAndHeight", groups: ["CSS Motion Path"], initial: "auto", appliesto: "transformableElements", computed: "forLengthAbsoluteValueOtherwisePercentage", order: "perGrammar", status: "standard" },
  "offset-distance": { syntax: "<length-percentage>", media: "visual", inherited: !1, animationType: "lpc", percentages: "referToTotalPathLength", groups: ["CSS Motion Path"], initial: "0", appliesto: "transformableElements", computed: "forLengthAbsoluteValueOtherwisePercentage", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/offset-distance" },
  "offset-path": { syntax: "none | ray( [ <angle> && <size> && contain? ] ) | <path()> | <url> | [ <basic-shape> || <geometry-box> ]", media: "visual", inherited: !1, animationType: "angleOrBasicShapeOrPath", percentages: "no", groups: ["CSS Motion Path"], initial: "none", appliesto: "transformableElements", computed: "asSpecified", order: "perGrammar", stacking: !0, status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/offset-path" },
  "offset-position": { syntax: "auto | <position>", media: "visual", inherited: !1, animationType: "position", percentages: "referToSizeOfContainingBlock", groups: ["CSS Motion Path"], initial: "auto", appliesto: "transformableElements", computed: "forLengthAbsoluteValueOtherwisePercentage", order: "perGrammar", status: "experimental" },
  "offset-rotate": { syntax: "[ auto | reverse ] || <angle>", media: "visual", inherited: !1, animationType: "angleOrBasicShapeOrPath", percentages: "no", groups: ["CSS Motion Path"], initial: "auto", appliesto: "transformableElements", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/offset-rotate" },
  opacity,
  order,
  orphans,
  outline,
  "outline-color": { syntax: "<color> | invert", media: ["visual", "interactive"], inherited: !1, animationType: "color", percentages: "no", groups: ["CSS Basic User Interface"], initial: "invertOrCurrentColor", appliesto: "allElements", computed: "invertForTranslucentColorRGBAOtherwiseRGB", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/outline-color" },
  "outline-offset": { syntax: "<length>", media: ["visual", "interactive"], inherited: !1, animationType: "length", percentages: "no", groups: ["CSS Basic User Interface"], initial: "0", appliesto: "allElements", computed: "asSpecifiedRelativeToAbsoluteLengths", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/outline-offset" },
  "outline-style": { syntax: "auto | <'border-style'>", media: ["visual", "interactive"], inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Basic User Interface"], initial: "none", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/outline-style" },
  "outline-width": { syntax: "<line-width>", media: ["visual", "interactive"], inherited: !1, animationType: "length", percentages: "no", groups: ["CSS Basic User Interface"], initial: "medium", appliesto: "allElements", computed: "absoluteLength0ForNone", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/outline-width" },
  overflow,
  "overflow-anchor": { syntax: "auto | none", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Scroll Anchoring"], initial: "auto", appliesto: "allElements", computed: "asSpecified", order: "perGrammar", status: "standard" },
  "overflow-block": { syntax: "visible | hidden | clip | scroll | auto", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Overflow"], initial: "auto", appliesto: "blockContainersFlexContainersGridContainers", computed: "asSpecifiedButVisibleOrClipReplacedToAutoOrHiddenIfOtherValueDifferent", order: "perGrammar", status: "standard" },
  "overflow-clip-box": { syntax: "padding-box | content-box", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Mozilla Extensions"], initial: "padding-box", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Mozilla/CSS/overflow-clip-box" },
  "overflow-inline": { syntax: "visible | hidden | clip | scroll | auto", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Overflow"], initial: "auto", appliesto: "blockContainersFlexContainersGridContainers", computed: "asSpecifiedButVisibleOrClipReplacedToAutoOrHiddenIfOtherValueDifferent", order: "perGrammar", status: "standard" },
  "overflow-wrap": { syntax: "normal | break-word | anywhere", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Text"], initial: "normal", appliesto: "nonReplacedInlineElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/overflow-wrap" },
  "overflow-x": { syntax: "visible | hidden | clip | scroll | auto", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Overflow"], initial: "visible", appliesto: "blockContainersFlexContainersGridContainers", computed: "asSpecifiedButVisibleOrClipReplacedToAutoOrHiddenIfOtherValueDifferent", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/overflow-x" },
  "overflow-y": { syntax: "visible | hidden | clip | scroll | auto", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Overflow"], initial: "visible", appliesto: "blockContainersFlexContainersGridContainers", computed: "asSpecifiedButVisibleOrClipReplacedToAutoOrHiddenIfOtherValueDifferent", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/overflow-y" },
  "overscroll-behavior": { syntax: "[ contain | none | auto ]{1,2}", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Box Model"], initial: "auto", appliesto: "nonReplacedBlockAndInlineBlockElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/overscroll-behavior" },
  "overscroll-behavior-block": { syntax: "contain | none | auto", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Box Model"], initial: "auto", appliesto: "nonReplacedBlockAndInlineBlockElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/overscroll-behavior-block" },
  "overscroll-behavior-inline": { syntax: "contain | none | auto", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Box Model"], initial: "auto", appliesto: "nonReplacedBlockAndInlineBlockElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/overscroll-behavior-inline" },
  "overscroll-behavior-x": { syntax: "contain | none | auto", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Box Model"], initial: "auto", appliesto: "nonReplacedBlockAndInlineBlockElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/overscroll-behavior-x" },
  "overscroll-behavior-y": { syntax: "contain | none | auto", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Box Model"], initial: "auto", appliesto: "nonReplacedBlockAndInlineBlockElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/overscroll-behavior-y" },
  padding,
  "padding-block": { syntax: "<'padding-left'>{1,2}", media: "visual", inherited: !1, animationType: "discrete", percentages: "logicalWidthOfContainingBlock", groups: ["CSS Logical Properties"], initial: "0", appliesto: "allElements", computed: "asLength", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/padding-block" },
  "padding-block-end": { syntax: "<'padding-left'>", media: "visual", inherited: !1, animationType: "length", percentages: "logicalWidthOfContainingBlock", groups: ["CSS Logical Properties"], initial: "0", appliesto: "allElements", computed: "asLength", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/padding-block-end" },
  "padding-block-start": { syntax: "<'padding-left'>", media: "visual", inherited: !1, animationType: "length", percentages: "logicalWidthOfContainingBlock", groups: ["CSS Logical Properties"], initial: "0", appliesto: "allElements", computed: "asLength", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/padding-block-start" },
  "padding-bottom": { syntax: "<length> | <percentage>", media: "visual", inherited: !1, animationType: "length", percentages: "referToWidthOfContainingBlock", groups: ["CSS Box Model"], initial: "0", appliesto: "allElementsExceptInternalTableDisplayTypes", computed: "percentageAsSpecifiedOrAbsoluteLength", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/padding-bottom" },
  "padding-inline": { syntax: "<'padding-left'>{1,2}", media: "visual", inherited: !1, animationType: "discrete", percentages: "logicalWidthOfContainingBlock", groups: ["CSS Logical Properties"], initial: "0", appliesto: "allElements", computed: "asLength", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/padding-inline" },
  "padding-inline-end": { syntax: "<'padding-left'>", media: "visual", inherited: !1, animationType: "length", percentages: "logicalWidthOfContainingBlock", groups: ["CSS Logical Properties"], initial: "0", appliesto: "allElements", computed: "asLength", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/padding-inline-end" },
  "padding-inline-start": { syntax: "<'padding-left'>", media: "visual", inherited: !1, animationType: "length", percentages: "logicalWidthOfContainingBlock", groups: ["CSS Logical Properties"], initial: "0", appliesto: "allElements", computed: "asLength", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/padding-inline-start" },
  "padding-left": { syntax: "<length> | <percentage>", media: "visual", inherited: !1, animationType: "length", percentages: "referToWidthOfContainingBlock", groups: ["CSS Box Model"], initial: "0", appliesto: "allElementsExceptInternalTableDisplayTypes", computed: "percentageAsSpecifiedOrAbsoluteLength", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/padding-left" },
  "padding-right": { syntax: "<length> | <percentage>", media: "visual", inherited: !1, animationType: "length", percentages: "referToWidthOfContainingBlock", groups: ["CSS Box Model"], initial: "0", appliesto: "allElementsExceptInternalTableDisplayTypes", computed: "percentageAsSpecifiedOrAbsoluteLength", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/padding-right" },
  "padding-top": { syntax: "<length> | <percentage>", media: "visual", inherited: !1, animationType: "length", percentages: "referToWidthOfContainingBlock", groups: ["CSS Box Model"], initial: "0", appliesto: "allElementsExceptInternalTableDisplayTypes", computed: "percentageAsSpecifiedOrAbsoluteLength", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/padding-top" },
  "page-break-after": { syntax: "auto | always | avoid | left | right | recto | verso", media: ["visual", "paged"], inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Pages"], initial: "auto", appliesto: "blockElementsInNormalFlow", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/page-break-after" },
  "page-break-before": { syntax: "auto | always | avoid | left | right | recto | verso", media: ["visual", "paged"], inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Pages"], initial: "auto", appliesto: "blockElementsInNormalFlow", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/page-break-before" },
  "page-break-inside": { syntax: "auto | avoid", media: ["visual", "paged"], inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Pages"], initial: "auto", appliesto: "blockElementsInNormalFlow", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/page-break-inside" },
  "paint-order": { syntax: "normal | [ fill || stroke || markers ]", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Text"], initial: "normal", appliesto: "textElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/paint-order" },
  perspective,
  "perspective-origin": { syntax: "<position>", media: "visual", inherited: !1, animationType: "simpleListOfLpc", percentages: "referToSizeOfBoundingBox", groups: ["CSS Transforms"], initial: "50% 50%", appliesto: "transformableElements", computed: "forLengthAbsoluteValueOtherwisePercentage", order: "oneOrTwoValuesLengthAbsoluteKeywordsPercentages", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/perspective-origin" },
  "place-content": { syntax: "<'align-content'> <'justify-content'>?", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Box Alignment"], initial: "normal", appliesto: "multilineFlexContainers", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/place-content" },
  "place-items": { syntax: "<'align-items'> <'justify-items'>?", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Box Alignment"], initial: ["align-items", "justify-items"], appliesto: "allElements", computed: ["align-items", "justify-items"], order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/place-items" },
  "place-self": { syntax: "<'align-self'> <'justify-self'>?", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Box Alignment"], initial: ["align-self", "justify-self"], appliesto: "blockLevelBoxesAndAbsolutelyPositionedBoxesAndGridItems", computed: ["align-self", "justify-self"], order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/place-self" },
  "pointer-events": { syntax: "auto | none | visiblePainted | visibleFill | visibleStroke | visible | painted | fill | stroke | all | inherit", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["Pointer Events"], initial: "auto", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/pointer-events" },
  position: position$1,
  quotes,
  resize,
  right,
  rotate,
  "row-gap": { syntax: "normal | <length-percentage>", media: "visual", inherited: !1, animationType: "lpc", percentages: "referToDimensionOfContentArea", groups: ["CSS Box Alignment"], initial: "normal", appliesto: "multiColumnElementsFlexContainersGridContainers", computed: "asSpecifiedWithLengthsAbsoluteAndNormalComputingToZeroExceptMultiColumn", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/row-gap" },
  "ruby-align": { syntax: "start | center | space-between | space-around", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Ruby"], initial: "space-around", appliesto: "rubyBasesAnnotationsBaseAnnotationContainers", computed: "asSpecified", order: "uniqueOrder", status: "experimental", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/ruby-align" },
  "ruby-merge": { syntax: "separate | collapse | auto", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Ruby"], initial: "separate", appliesto: "rubyAnnotationsContainers", computed: "asSpecified", order: "uniqueOrder", status: "experimental" },
  "ruby-position": { syntax: "over | under | inter-character", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Ruby"], initial: "over", appliesto: "rubyAnnotationsContainers", computed: "asSpecified", order: "uniqueOrder", status: "experimental", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/ruby-position" },
  scale,
  "scrollbar-color": { syntax: "auto | dark | light | <color>{2}", media: "visual", inherited: !0, animationType: "color", percentages: "no", groups: ["CSS Scrollbars"], initial: "auto", appliesto: "scrollingBoxes", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scrollbar-color" },
  "scrollbar-gutter": { syntax: "auto | [ stable | always ] && both? && force?", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Overflow"], initial: "auto", appliesto: "allElements", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scrollbar-gutter" },
  "scrollbar-width": { syntax: "auto | thin | none", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Scrollbars"], initial: "auto", appliesto: "scrollingBoxes", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scrollbar-width" },
  "scroll-behavior": { syntax: "auto | smooth", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSSOM View"], initial: "auto", appliesto: "scrollingBoxes", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-behavior" },
  "scroll-margin": { syntax: "<length>{1,4}", media: "visual", inherited: !1, animationType: "byComputedValueType", percentages: "no", groups: ["CSS Scroll Snap"], initial: "0", appliesto: "allElements", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-margin" },
  "scroll-margin-block": { syntax: "<length>{1,2}", media: "visual", inherited: !1, animationType: "byComputedValueType", percentages: "no", groups: ["CSS Scroll Snap"], initial: "0", appliesto: "allElements", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-margin-block" },
  "scroll-margin-block-start": { syntax: "<length>", media: "visual", inherited: !1, animationType: "byComputedValueType", percentages: "no", groups: ["CSS Scroll Snap"], initial: "0", appliesto: "allElements", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-margin-block-start" },
  "scroll-margin-block-end": { syntax: "<length>", media: "visual", inherited: !1, animationType: "byComputedValueType", percentages: "no", groups: ["CSS Scroll Snap"], initial: "0", appliesto: "allElements", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-margin-block-end" },
  "scroll-margin-bottom": { syntax: "<length>", media: "visual", inherited: !1, animationType: "byComputedValueType", percentages: "no", groups: ["CSS Scroll Snap"], initial: "0", appliesto: "allElements", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-margin-bottom" },
  "scroll-margin-inline": { syntax: "<length>{1,2}", media: "visual", inherited: !1, animationType: "byComputedValueType", percentages: "no", groups: ["CSS Scroll Snap"], initial: "0", appliesto: "allElements", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-margin-inline" },
  "scroll-margin-inline-start": { syntax: "<length>", media: "visual", inherited: !1, animationType: "byComputedValueType", percentages: "no", groups: ["CSS Scroll Snap"], initial: "0", appliesto: "allElements", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-margin-inline-start" },
  "scroll-margin-inline-end": { syntax: "<length>", media: "visual", inherited: !1, animationType: "byComputedValueType", percentages: "no", groups: ["CSS Scroll Snap"], initial: "0", appliesto: "allElements", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-margin-inline-end" },
  "scroll-margin-left": { syntax: "<length>", media: "visual", inherited: !1, animationType: "byComputedValueType", percentages: "no", groups: ["CSS Scroll Snap"], initial: "0", appliesto: "allElements", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-margin-left" },
  "scroll-margin-right": { syntax: "<length>", media: "visual", inherited: !1, animationType: "byComputedValueType", percentages: "no", groups: ["CSS Scroll Snap"], initial: "0", appliesto: "allElements", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-margin-right" },
  "scroll-margin-top": { syntax: "<length>", media: "visual", inherited: !1, animationType: "byComputedValueType", percentages: "no", groups: ["CSS Scroll Snap"], initial: "0", appliesto: "allElements", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-margin-top" },
  "scroll-padding": { syntax: "[ auto | <length-percentage> ]{1,4}", media: "visual", inherited: !1, animationType: "byComputedValueType", percentages: "relativeToTheScrollContainersScrollport", groups: ["CSS Scroll Snap"], initial: "auto", appliesto: "scrollContainers", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-padding" },
  "scroll-padding-block": { syntax: "[ auto | <length-percentage> ]{1,2}", media: "visual", inherited: !1, animationType: "byComputedValueType", percentages: "relativeToTheScrollContainersScrollport", groups: ["CSS Scroll Snap"], initial: "auto", appliesto: "scrollContainers", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-padding-block" },
  "scroll-padding-block-start": { syntax: "auto | <length-percentage>", media: "visual", inherited: !1, animationType: "byComputedValueType", percentages: "relativeToTheScrollContainersScrollport", groups: ["CSS Scroll Snap"], initial: "auto", appliesto: "scrollContainers", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-padding-block-start" },
  "scroll-padding-block-end": { syntax: "auto | <length-percentage>", media: "visual", inherited: !1, animationType: "byComputedValueType", percentages: "relativeToTheScrollContainersScrollport", groups: ["CSS Scroll Snap"], initial: "auto", appliesto: "scrollContainers", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-padding-block-end" },
  "scroll-padding-bottom": { syntax: "auto | <length-percentage>", media: "visual", inherited: !1, animationType: "byComputedValueType", percentages: "relativeToTheScrollContainersScrollport", groups: ["CSS Scroll Snap"], initial: "auto", appliesto: "scrollContainers", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-padding-bottom" },
  "scroll-padding-inline": { syntax: "[ auto | <length-percentage> ]{1,2}", media: "visual", inherited: !1, animationType: "byComputedValueType", percentages: "relativeToTheScrollContainersScrollport", groups: ["CSS Scroll Snap"], initial: "auto", appliesto: "scrollContainers", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-padding-inline" },
  "scroll-padding-inline-start": { syntax: "auto | <length-percentage>", media: "visual", inherited: !1, animationType: "byComputedValueType", percentages: "relativeToTheScrollContainersScrollport", groups: ["CSS Scroll Snap"], initial: "auto", appliesto: "scrollContainers", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-padding-inline-start" },
  "scroll-padding-inline-end": { syntax: "auto | <length-percentage>", media: "visual", inherited: !1, animationType: "byComputedValueType", percentages: "relativeToTheScrollContainersScrollport", groups: ["CSS Scroll Snap"], initial: "auto", appliesto: "scrollContainers", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-padding-inline-end" },
  "scroll-padding-left": { syntax: "auto | <length-percentage>", media: "visual", inherited: !1, animationType: "byComputedValueType", percentages: "relativeToTheScrollContainersScrollport", groups: ["CSS Scroll Snap"], initial: "auto", appliesto: "scrollContainers", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-padding-left" },
  "scroll-padding-right": { syntax: "auto | <length-percentage>", media: "visual", inherited: !1, animationType: "byComputedValueType", percentages: "relativeToTheScrollContainersScrollport", groups: ["CSS Scroll Snap"], initial: "auto", appliesto: "scrollContainers", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-padding-right" },
  "scroll-padding-top": { syntax: "auto | <length-percentage>", media: "visual", inherited: !1, animationType: "byComputedValueType", percentages: "relativeToTheScrollContainersScrollport", groups: ["CSS Scroll Snap"], initial: "auto", appliesto: "scrollContainers", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-padding-top" },
  "scroll-snap-align": { syntax: "[ none | start | end | center ]{1,2}", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Scroll Snap"], initial: "none", appliesto: "allElements", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-snap-align" },
  "scroll-snap-coordinate": { syntax: "none | <position>#", media: "interactive", inherited: !1, animationType: "position", percentages: "referToBorderBox", groups: ["CSS Scroll Snap"], initial: "none", appliesto: "allElements", computed: "asSpecifiedRelativeToAbsoluteLengths", order: "uniqueOrder", status: "obsolete", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-snap-coordinate" },
  "scroll-snap-destination": { syntax: "<position>", media: "interactive", inherited: !1, animationType: "position", percentages: "relativeToScrollContainerPaddingBoxAxis", groups: ["CSS Scroll Snap"], initial: "0px 0px", appliesto: "scrollContainers", computed: "asSpecifiedRelativeToAbsoluteLengths", order: "uniqueOrder", status: "obsolete", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-snap-destination" },
  "scroll-snap-points-x": { syntax: "none | repeat( <length-percentage> )", media: "interactive", inherited: !1, animationType: "discrete", percentages: "relativeToScrollContainerPaddingBoxAxis", groups: ["CSS Scroll Snap"], initial: "none", appliesto: "scrollContainers", computed: "asSpecifiedRelativeToAbsoluteLengths", order: "uniqueOrder", status: "obsolete", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-snap-points-x" },
  "scroll-snap-points-y": { syntax: "none | repeat( <length-percentage> )", media: "interactive", inherited: !1, animationType: "discrete", percentages: "relativeToScrollContainerPaddingBoxAxis", groups: ["CSS Scroll Snap"], initial: "none", appliesto: "scrollContainers", computed: "asSpecifiedRelativeToAbsoluteLengths", order: "uniqueOrder", status: "obsolete", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-snap-points-y" },
  "scroll-snap-stop": { syntax: "normal | always", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Scroll Snap"], initial: "normal", appliesto: "allElements", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-snap-stop" },
  "scroll-snap-type": { syntax: "none | [ x | y | block | inline | both ] [ mandatory | proximity ]?", media: "interactive", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Scroll Snap"], initial: "none", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-snap-type" },
  "scroll-snap-type-x": { syntax: "none | mandatory | proximity", media: "interactive", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Scroll Snap"], initial: "none", appliesto: "scrollContainers", computed: "asSpecified", order: "uniqueOrder", status: "obsolete", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-snap-type-x" },
  "scroll-snap-type-y": { syntax: "none | mandatory | proximity", media: "interactive", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Scroll Snap"], initial: "none", appliesto: "scrollContainers", computed: "asSpecified", order: "uniqueOrder", status: "obsolete", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-snap-type-y" },
  "shape-image-threshold": { syntax: "<alpha-value>", media: "visual", inherited: !1, animationType: "number", percentages: "no", groups: ["CSS Shapes"], initial: "0.0", appliesto: "floats", computed: "specifiedValueNumberClipped0To1", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/shape-image-threshold" },
  "shape-margin": { syntax: "<length-percentage>", media: "visual", inherited: !1, animationType: "lpc", percentages: "referToWidthOfContainingBlock", groups: ["CSS Shapes"], initial: "0", appliesto: "floats", computed: "asSpecifiedRelativeToAbsoluteLengths", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/shape-margin" },
  "shape-outside": { syntax: "none | <shape-box> || <basic-shape> | <image>", media: "visual", inherited: !1, animationType: "basicShapeOtherwiseNo", percentages: "no", groups: ["CSS Shapes"], initial: "none", appliesto: "floats", computed: "asDefinedForBasicShapeWithAbsoluteURIOtherwiseAsSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/shape-outside" },
  "tab-size": { syntax: "<integer> | <length>", media: "visual", inherited: !0, animationType: "length", percentages: "no", groups: ["CSS Text"], initial: "8", appliesto: "blockContainers", computed: "specifiedIntegerOrAbsoluteLength", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/tab-size" },
  "table-layout": { syntax: "auto | fixed", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Table"], initial: "auto", appliesto: "tableElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/table-layout" },
  "text-align": { syntax: "start | end | left | right | center | justify | match-parent", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Text"], initial: "startOrNamelessValueIfLTRRightIfRTL", appliesto: "blockContainers", computed: "asSpecifiedExceptMatchParent", order: "orderOfAppearance", alsoAppliesTo: ["::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-align" },
  "text-align-last": { syntax: "auto | start | end | left | right | center | justify", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Text"], initial: "auto", appliesto: "blockContainers", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-align-last" },
  "text-combine-upright": { syntax: "none | all | [ digits <integer>? ]", media: "visual", inherited: !0, animationType: "notAnimatable", percentages: "no", groups: ["CSS Writing Modes"], initial: "none", appliesto: "nonReplacedInlineElements", computed: "keywordPlusIntegerIfDigits", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-combine-upright" },
  "text-decoration": { syntax: "<'text-decoration-line'> || <'text-decoration-style'> || <'text-decoration-color'> || <'text-decoration-thickness'>", media: "visual", inherited: !1, animationType: ["text-decoration-color", "text-decoration-style", "text-decoration-line", "text-decoration-thickness"], percentages: "no", groups: ["CSS Text Decoration"], initial: ["text-decoration-color", "text-decoration-style", "text-decoration-line"], appliesto: "allElements", computed: ["text-decoration-line", "text-decoration-style", "text-decoration-color", "text-decoration-thickness"], order: "orderOfAppearance", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-decoration" },
  "text-decoration-color": { syntax: "<color>", media: "visual", inherited: !1, animationType: "color", percentages: "no", groups: ["CSS Text Decoration"], initial: "currentcolor", appliesto: "allElements", computed: "computedColor", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-decoration-color" },
  "text-decoration-line": { syntax: "none | [ underline || overline || line-through || blink ] | spelling-error | grammar-error", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Text Decoration"], initial: "none", appliesto: "allElements", computed: "asSpecified", order: "orderOfAppearance", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-decoration-line" },
  "text-decoration-skip": { syntax: "none | [ objects || [ spaces | [ leading-spaces || trailing-spaces ] ] || edges || box-decoration ]", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Text Decoration"], initial: "objects", appliesto: "allElements", computed: "asSpecified", order: "orderOfAppearance", status: "experimental", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-decoration-skip" },
  "text-decoration-skip-ink": { syntax: "auto | all | none", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Text Decoration"], initial: "auto", appliesto: "allElements", computed: "asSpecified", order: "orderOfAppearance", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-decoration-skip-ink" },
  "text-decoration-style": { syntax: "solid | double | dotted | dashed | wavy", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Text Decoration"], initial: "solid", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-decoration-style" },
  "text-decoration-thickness": { syntax: "auto | from-font | <length> | <percentage> ", media: "visual", inherited: !1, animationType: "byComputedValueType", percentages: "referToElementFontSize", groups: ["CSS Text Decoration"], initial: "auto", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-decoration-thickness" },
  "text-emphasis": { syntax: "<'text-emphasis-style'> || <'text-emphasis-color'>", media: "visual", inherited: !1, animationType: ["text-emphasis-color", "text-emphasis-style"], percentages: "no", groups: ["CSS Text Decoration"], initial: ["text-emphasis-style", "text-emphasis-color"], appliesto: "allElements", computed: ["text-emphasis-style", "text-emphasis-color"], order: "orderOfAppearance", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-emphasis" },
  "text-emphasis-color": { syntax: "<color>", media: "visual", inherited: !1, animationType: "color", percentages: "no", groups: ["CSS Text Decoration"], initial: "currentcolor", appliesto: "allElements", computed: "computedColor", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-emphasis-color" },
  "text-emphasis-position": { syntax: "[ over | under ] && [ right | left ]", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Text Decoration"], initial: "over right", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-emphasis-position" },
  "text-emphasis-style": { syntax: "none | [ [ filled | open ] || [ dot | circle | double-circle | triangle | sesame ] ] | <string>", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Text Decoration"], initial: "none", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-emphasis-style" },
  "text-indent": { syntax: "<length-percentage> && hanging? && each-line?", media: "visual", inherited: !0, animationType: "lpc", percentages: "referToWidthOfContainingBlock", groups: ["CSS Text"], initial: "0", appliesto: "blockContainers", computed: "percentageOrAbsoluteLengthPlusKeywords", order: "lengthOrPercentageBeforeKeywords", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-indent" },
  "text-justify": { syntax: "auto | inter-character | inter-word | none", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Text"], initial: "auto", appliesto: "inlineLevelAndTableCellElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-justify" },
  "text-orientation": { syntax: "mixed | upright | sideways", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Writing Modes"], initial: "mixed", appliesto: "allElementsExceptTableRowGroupsRowsColumnGroupsAndColumns", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-orientation" },
  "text-overflow": { syntax: "[ clip | ellipsis | <string> ]{1,2}", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Basic User Interface"], initial: "clip", appliesto: "blockContainerElements", computed: "asSpecified", order: "uniqueOrder", alsoAppliesTo: ["::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-overflow" },
  "text-rendering": { syntax: "auto | optimizeSpeed | optimizeLegibility | geometricPrecision", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Miscellaneous"], initial: "auto", appliesto: "textElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-rendering" },
  "text-shadow": { syntax: "none | <shadow-t>#", media: "visual", inherited: !0, animationType: "shadowList", percentages: "no", groups: ["CSS Text Decoration"], initial: "none", appliesto: "allElements", computed: "colorPlusThreeAbsoluteLengths", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-shadow" },
  "text-size-adjust": { syntax: "none | auto | <percentage>", media: "visual", inherited: !0, animationType: "discrete", percentages: "referToSizeOfFont", groups: ["CSS Text"], initial: "autoForSmartphoneBrowsersSupportingInflation", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "experimental", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-size-adjust" },
  "text-transform": { syntax: "none | capitalize | uppercase | lowercase | full-width | full-size-kana", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Text"], initial: "none", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-transform" },
  "text-underline-offset": { syntax: "auto | <length> | <percentage> ", media: "visual", inherited: !0, animationType: "byComputedValueType", percentages: "referToElementFontSize", groups: ["CSS Text Decoration"], initial: "auto", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-underline-offset" },
  "text-underline-position": { syntax: "auto | from-font | [ under || [ left | right ] ]", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Text Decoration"], initial: "auto", appliesto: "allElements", computed: "asSpecified", order: "orderOfAppearance", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-underline-position" },
  top,
  "touch-action": { syntax: "auto | none | [ [ pan-x | pan-left | pan-right ] || [ pan-y | pan-up | pan-down ] || pinch-zoom ] | manipulation", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["Pointer Events"], initial: "auto", appliesto: "allElementsExceptNonReplacedInlineElementsTableRowsColumnsRowColumnGroups", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/touch-action" },
  transform,
  "transform-box": { syntax: "content-box | border-box | fill-box | stroke-box | view-box", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Transforms"], initial: "view-box", appliesto: "transformableElements", computed: "asSpecified", order: "perGrammar", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/transform-box" },
  "transform-origin": { syntax: "[ <length-percentage> | left | center | right | top | bottom ] | [ [ <length-percentage> | left | center | right ] && [ <length-percentage> | top | center | bottom ] ] <length>?", media: "visual", inherited: !1, animationType: "simpleListOfLpc", percentages: "referToSizeOfBoundingBox", groups: ["CSS Transforms"], initial: "50% 50% 0", appliesto: "transformableElements", computed: "forLengthAbsoluteValueOtherwisePercentage", order: "oneOrTwoValuesLengthAbsoluteKeywordsPercentages", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/transform-origin" },
  "transform-style": { syntax: "flat | preserve-3d", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Transforms"], initial: "flat", appliesto: "transformableElements", computed: "asSpecified", order: "uniqueOrder", stacking: !0, status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/transform-style" },
  transition,
  "transition-delay": { syntax: "<time>#", media: "interactive", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Transitions"], initial: "0s", appliesto: "allElementsAndPseudos", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/transition-delay" },
  "transition-duration": { syntax: "<time>#", media: "interactive", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Transitions"], initial: "0s", appliesto: "allElementsAndPseudos", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/transition-duration" },
  "transition-property": { syntax: "none | <single-transition-property>#", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Transitions"], initial: "all", appliesto: "allElementsAndPseudos", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/transition-property" },
  "transition-timing-function": { syntax: "<timing-function>#", media: "interactive", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Transitions"], initial: "ease", appliesto: "allElementsAndPseudos", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/transition-timing-function" },
  translate,
  "unicode-bidi": { syntax: "normal | embed | isolate | bidi-override | isolate-override | plaintext", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Writing Modes"], initial: "normal", appliesto: "allElementsSomeValuesNoEffectOnNonInlineElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/unicode-bidi" },
  "user-select": { syntax: "auto | text | none | contain | all", media: "visual", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Basic User Interface"], initial: "auto", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "nonstandard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/user-select" },
  "vertical-align": { syntax: "baseline | sub | super | text-top | text-bottom | middle | top | bottom | <percentage> | <length>", media: "visual", inherited: !1, animationType: "length", percentages: "referToLineHeight", groups: ["CSS Table"], initial: "baseline", appliesto: "inlineLevelAndTableCellElements", computed: "absoluteLengthOrKeyword", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/vertical-align" },
  visibility,
  "white-space": { syntax: "normal | pre | nowrap | pre-wrap | pre-line | break-spaces", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Text"], initial: "normal", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/white-space" },
  widows,
  width,
  "will-change": { syntax: "auto | <animateable-feature>#", media: "all", inherited: !1, animationType: "discrete", percentages: "no", groups: ["CSS Will Change"], initial: "auto", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/will-change" },
  "word-break": { syntax: "normal | break-all | keep-all | break-word", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Text"], initial: "normal", appliesto: "allElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/word-break" },
  "word-spacing": { syntax: "normal | <length-percentage>", media: "visual", inherited: !0, animationType: "length", percentages: "referToWidthOfAffectedGlyph", groups: ["CSS Text"], initial: "normal", appliesto: "allElements", computed: "optimumMinAndMaxValueOfAbsoluteLengthPercentageOrNormal", order: "uniqueOrder", alsoAppliesTo: ["::first-letter", "::first-line", "::placeholder"], status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/word-spacing" },
  "word-wrap": { syntax: "normal | break-word", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Text"], initial: "normal", appliesto: "nonReplacedInlineElements", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/overflow-wrap" },
  "writing-mode": { syntax: "horizontal-tb | vertical-rl | vertical-lr | sideways-rl | sideways-lr", media: "visual", inherited: !0, animationType: "discrete", percentages: "no", groups: ["CSS Writing Modes"], initial: "horizontal-tb", appliesto: "allElementsExceptTableRowColumnGroupsTableRowsColumns", computed: "asSpecified", order: "uniqueOrder", status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/writing-mode" },
  "z-index": { syntax: "auto | <integer>", media: "visual", inherited: !1, animationType: "integer", percentages: "no", groups: ["CSS Positioning"], initial: "auto", appliesto: "positionedElements", computed: "asSpecified", order: "uniqueOrder", stacking: !0, status: "standard", mdn_url: "https://developer.mozilla.org/docs/Web/CSS/z-index" },
  zoom
}, attachment = { syntax: "scroll | fixed | local" }, box = { syntax: "border-box | padding-box | content-box" }, color = { syntax: "<rgb()> | <rgba()> | <hsl()> | <hsla()> | <hex-color> | <named-color> | currentcolor | <deprecated-system-color>" }, combinator = { syntax: "'>' | '+' | '~' | [ '||' ]" }, gradient = { syntax: "<linear-gradient()> | <repeating-linear-gradient()> | <radial-gradient()> | <repeating-radial-gradient()> | <conic-gradient()>" }, hue = { syntax: "<number> | <angle>" }, image = { syntax: "<url> | <image()> | <image-set()> | <element()> | <paint()> | <cross-fade()> | <gradient>" }, nth$1 = { syntax: "<an-plus-b> | even | odd" }, position = { syntax: "[ [ left | center | right ] || [ top | center | bottom ] | [ left | center | right | <length-percentage> ] [ top | center | bottom | <length-percentage> ]? | [ [ left | right ] <length-percentage> ] && [ [ top | bottom ] <length-percentage> ] ]" }, quote = { syntax: "open-quote | close-quote | no-open-quote | no-close-quote" }, shadow = { syntax: "inset? && <length>{2,4} && <color>?" }, shape = { syntax: "rect(<top>, <right>, <bottom>, <left>)" }, size = { syntax: "closest-side | farthest-side | closest-corner | farthest-corner | <length> | <length-percentage>{2}" }, symbol = { syntax: "<string> | <image> | <custom-ident>" }, target = { syntax: "<target-counter()> | <target-counters()> | <target-text()>" }, require$$2 = {
  "absolute-size": { syntax: "xx-small | x-small | small | medium | large | x-large | xx-large | xxx-large" },
  "alpha-value": { syntax: "<number> | <percentage>" },
  "angle-percentage": { syntax: "<angle> | <percentage>" },
  "angular-color-hint": { syntax: "<angle-percentage>" },
  "angular-color-stop": { syntax: "<color> && <color-stop-angle>?" },
  "angular-color-stop-list": { syntax: "[ <angular-color-stop> [, <angular-color-hint>]? ]# , <angular-color-stop>" },
  "animateable-feature": { syntax: "scroll-position | contents | <custom-ident>" },
  attachment,
  "attr()": { syntax: "attr( <attr-name> <type-or-unit>? [, <attr-fallback> ]? )" },
  "attr-matcher": { syntax: "[ '~' | '|' | '^' | '$' | '*' ]? '='" },
  "attr-modifier": { syntax: "i | s" },
  "attribute-selector": { syntax: "'[' <wq-name> ']' | '[' <wq-name> <attr-matcher> [ <string-token> | <ident-token> ] <attr-modifier>? ']'" },
  "auto-repeat": { syntax: "repeat( [ auto-fill | auto-fit ] , [ <line-names>? <fixed-size> ]+ <line-names>? )" },
  "auto-track-list": { syntax: `[ <line-names>? [ <fixed-size> | <fixed-repeat> ] ]* <line-names>? <auto-repeat>
[ <line-names>? [ <fixed-size> | <fixed-repeat> ] ]* <line-names>?` },
  "baseline-position": { syntax: "[ first | last ]? baseline" },
  "basic-shape": { syntax: "<inset()> | <circle()> | <ellipse()> | <polygon()> | <path()>" },
  "bg-image": { syntax: "none | <image>" },
  "bg-layer": { syntax: "<bg-image> || <bg-position> [ / <bg-size> ]? || <repeat-style> || <attachment> || <box> || <box>" },
  "bg-position": { syntax: "[ [ left | center | right | top | bottom | <length-percentage> ] | [ left | center | right | <length-percentage> ] [ top | center | bottom | <length-percentage> ] | [ center | [ left | right ] <length-percentage>? ] && [ center | [ top | bottom ] <length-percentage>? ] ]" },
  "bg-size": { syntax: "[ <length-percentage> | auto ]{1,2} | cover | contain" },
  "blur()": { syntax: "blur( <length> )" },
  "blend-mode": { syntax: "normal | multiply | screen | overlay | darken | lighten | color-dodge | color-burn | hard-light | soft-light | difference | exclusion | hue | saturation | color | luminosity" },
  box,
  "brightness()": { syntax: "brightness( <number-percentage> )" },
  "calc()": { syntax: "calc( <calc-sum> )" },
  "calc-sum": { syntax: "<calc-product> [ [ '+' | '-' ] <calc-product> ]*" },
  "calc-product": { syntax: "<calc-value> [ '*' <calc-value> | '/' <number> ]*" },
  "calc-value": { syntax: "<number> | <dimension> | <percentage> | ( <calc-sum> )" },
  "cf-final-image": { syntax: "<image> | <color>" },
  "cf-mixing-image": { syntax: "<percentage>? && <image>" },
  "circle()": { syntax: "circle( [ <shape-radius> ]? [ at <position> ]? )" },
  "clamp()": { syntax: "clamp( <calc-sum>#{3} )" },
  "class-selector": { syntax: "'.' <ident-token>" },
  "clip-source": { syntax: "<url>" },
  color,
  "color-stop": { syntax: "<color-stop-length> | <color-stop-angle>" },
  "color-stop-angle": { syntax: "<angle-percentage>{1,2}" },
  "color-stop-length": { syntax: "<length-percentage>{1,2}" },
  "color-stop-list": { syntax: "[ <linear-color-stop> [, <linear-color-hint>]? ]# , <linear-color-stop>" },
  combinator,
  "common-lig-values": { syntax: "[ common-ligatures | no-common-ligatures ]" },
  "compat-auto": { syntax: "searchfield | textarea | push-button | slider-horizontal | checkbox | radio | square-button | menulist | listbox | meter | progress-bar | button" },
  "composite-style": { syntax: "clear | copy | source-over | source-in | source-out | source-atop | destination-over | destination-in | destination-out | destination-atop | xor" },
  "compositing-operator": { syntax: "add | subtract | intersect | exclude" },
  "compound-selector": { syntax: "[ <type-selector>? <subclass-selector>* [ <pseudo-element-selector> <pseudo-class-selector>* ]* ]!" },
  "compound-selector-list": { syntax: "<compound-selector>#" },
  "complex-selector": { syntax: "<compound-selector> [ <combinator>? <compound-selector> ]*" },
  "complex-selector-list": { syntax: "<complex-selector>#" },
  "conic-gradient()": { syntax: "conic-gradient( [ from <angle> ]? [ at <position> ]?, <angular-color-stop-list> )" },
  "contextual-alt-values": { syntax: "[ contextual | no-contextual ]" },
  "content-distribution": { syntax: "space-between | space-around | space-evenly | stretch" },
  "content-list": { syntax: "[ <string> | contents | <image> | <quote> | <target> | <leader()> ]+" },
  "content-position": { syntax: "center | start | end | flex-start | flex-end" },
  "content-replacement": { syntax: "<image>" },
  "contrast()": { syntax: "contrast( [ <number-percentage> ] )" },
  "counter()": { syntax: "counter( <custom-ident>, <counter-style>? )" },
  "counter-style": { syntax: "<counter-style-name> | symbols()" },
  "counter-style-name": { syntax: "<custom-ident>" },
  "counters()": { syntax: "counters( <custom-ident>, <string>, <counter-style>? )" },
  "cross-fade()": { syntax: "cross-fade( <cf-mixing-image> , <cf-final-image>? )" },
  "cubic-bezier-timing-function": { syntax: "ease | ease-in | ease-out | ease-in-out | cubic-bezier(<number [0,1]>, <number>, <number [0,1]>, <number>)" },
  "deprecated-system-color": { syntax: "ActiveBorder | ActiveCaption | AppWorkspace | Background | ButtonFace | ButtonHighlight | ButtonShadow | ButtonText | CaptionText | GrayText | Highlight | HighlightText | InactiveBorder | InactiveCaption | InactiveCaptionText | InfoBackground | InfoText | Menu | MenuText | Scrollbar | ThreeDDarkShadow | ThreeDFace | ThreeDHighlight | ThreeDLightShadow | ThreeDShadow | Window | WindowFrame | WindowText" },
  "discretionary-lig-values": { syntax: "[ discretionary-ligatures | no-discretionary-ligatures ]" },
  "display-box": { syntax: "contents | none" },
  "display-inside": { syntax: "flow | flow-root | table | flex | grid | ruby" },
  "display-internal": { syntax: "table-row-group | table-header-group | table-footer-group | table-row | table-cell | table-column-group | table-column | table-caption | ruby-base | ruby-text | ruby-base-container | ruby-text-container" },
  "display-legacy": { syntax: "inline-block | inline-list-item | inline-table | inline-flex | inline-grid" },
  "display-listitem": { syntax: "<display-outside>? && [ flow | flow-root ]? && list-item" },
  "display-outside": { syntax: "block | inline | run-in" },
  "drop-shadow()": { syntax: "drop-shadow( <length>{2,3} <color>? )" },
  "east-asian-variant-values": { syntax: "[ jis78 | jis83 | jis90 | jis04 | simplified | traditional ]" },
  "east-asian-width-values": { syntax: "[ full-width | proportional-width ]" },
  "element()": { syntax: "element( <id-selector> )" },
  "ellipse()": { syntax: "ellipse( [ <shape-radius>{2} ]? [ at <position> ]? )" },
  "ending-shape": { syntax: "circle | ellipse" },
  "env()": { syntax: "env( <custom-ident> , <declaration-value>? )" },
  "explicit-track-list": { syntax: "[ <line-names>? <track-size> ]+ <line-names>?" },
  "family-name": { syntax: "<string> | <custom-ident>+" },
  "feature-tag-value": { syntax: "<string> [ <integer> | on | off ]?" },
  "feature-type": { syntax: "@stylistic | @historical-forms | @styleset | @character-variant | @swash | @ornaments | @annotation" },
  "feature-value-block": { syntax: "<feature-type> '{' <feature-value-declaration-list> '}'" },
  "feature-value-block-list": { syntax: "<feature-value-block>+" },
  "feature-value-declaration": { syntax: "<custom-ident>: <integer>+;" },
  "feature-value-declaration-list": { syntax: "<feature-value-declaration>" },
  "feature-value-name": { syntax: "<custom-ident>" },
  "fill-rule": { syntax: "nonzero | evenodd" },
  "filter-function": { syntax: "<blur()> | <brightness()> | <contrast()> | <drop-shadow()> | <grayscale()> | <hue-rotate()> | <invert()> | <opacity()> | <saturate()> | <sepia()>" },
  "filter-function-list": { syntax: "[ <filter-function> | <url> ]+" },
  "final-bg-layer": { syntax: "<'background-color'> || <bg-image> || <bg-position> [ / <bg-size> ]? || <repeat-style> || <attachment> || <box> || <box>" },
  "fit-content()": { syntax: "fit-content( [ <length> | <percentage> ] )" },
  "fixed-breadth": { syntax: "<length-percentage>" },
  "fixed-repeat": { syntax: "repeat( [ <positive-integer> ] , [ <line-names>? <fixed-size> ]+ <line-names>? )" },
  "fixed-size": { syntax: "<fixed-breadth> | minmax( <fixed-breadth> , <track-breadth> ) | minmax( <inflexible-breadth> , <fixed-breadth> )" },
  "font-stretch-absolute": { syntax: "normal | ultra-condensed | extra-condensed | condensed | semi-condensed | semi-expanded | expanded | extra-expanded | ultra-expanded | <percentage>" },
  "font-variant-css21": { syntax: "[ normal | small-caps ]" },
  "font-weight-absolute": { syntax: "normal | bold | <number [1,1000]>" },
  "frequency-percentage": { syntax: "<frequency> | <percentage>" },
  "general-enclosed": { syntax: "[ <function-token> <any-value> ) ] | ( <ident> <any-value> )" },
  "generic-family": { syntax: "serif | sans-serif | cursive | fantasy | monospace" },
  "generic-name": { syntax: "serif | sans-serif | cursive | fantasy | monospace" },
  "geometry-box": { syntax: "<shape-box> | fill-box | stroke-box | view-box" },
  gradient,
  "grayscale()": { syntax: "grayscale( <number-percentage> )" },
  "grid-line": { syntax: "auto | <custom-ident> | [ <integer> && <custom-ident>? ] | [ span && [ <integer> || <custom-ident> ] ]" },
  "historical-lig-values": { syntax: "[ historical-ligatures | no-historical-ligatures ]" },
  "hsl()": { syntax: "hsl( <hue> <percentage> <percentage> [ / <alpha-value> ]? ) | hsl( <hue>, <percentage>, <percentage>, <alpha-value>? )" },
  "hsla()": { syntax: "hsla( <hue> <percentage> <percentage> [ / <alpha-value> ]? ) | hsla( <hue>, <percentage>, <percentage>, <alpha-value>? )" },
  hue,
  "hue-rotate()": { syntax: "hue-rotate( <angle> )" },
  "id-selector": { syntax: "<hash-token>" },
  image,
  "image()": { syntax: "image( <image-tags>? [ <image-src>? , <color>? ]! )" },
  "image-set()": { syntax: "image-set( <image-set-option># )" },
  "image-set-option": { syntax: "[ <image> | <string> ] <resolution>" },
  "image-src": { syntax: "<url> | <string>" },
  "image-tags": { syntax: "ltr | rtl" },
  "inflexible-breadth": { syntax: "<length> | <percentage> | min-content | max-content | auto" },
  "inset()": { syntax: "inset( <length-percentage>{1,4} [ round <'border-radius'> ]? )" },
  "invert()": { syntax: "invert( <number-percentage> )" },
  "keyframes-name": { syntax: "<custom-ident> | <string>" },
  "keyframe-block": { syntax: `<keyframe-selector># {
  <declaration-list>
}` },
  "keyframe-block-list": { syntax: "<keyframe-block>+" },
  "keyframe-selector": { syntax: "from | to | <percentage>" },
  "leader()": { syntax: "leader( <leader-type> )" },
  "leader-type": { syntax: "dotted | solid | space | <string>" },
  "length-percentage": { syntax: "<length> | <percentage>" },
  "line-names": { syntax: "'[' <custom-ident>* ']'" },
  "line-name-list": { syntax: "[ <line-names> | <name-repeat> ]+" },
  "line-style": { syntax: "none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset" },
  "line-width": { syntax: "<length> | thin | medium | thick" },
  "linear-color-hint": { syntax: "<length-percentage>" },
  "linear-color-stop": { syntax: "<color> <color-stop-length>?" },
  "linear-gradient()": { syntax: "linear-gradient( [ <angle> | to <side-or-corner> ]? , <color-stop-list> )" },
  "mask-layer": { syntax: "<mask-reference> || <position> [ / <bg-size> ]? || <repeat-style> || <geometry-box> || [ <geometry-box> | no-clip ] || <compositing-operator> || <masking-mode>" },
  "mask-position": { syntax: "[ <length-percentage> | left | center | right ] [ <length-percentage> | top | center | bottom ]?" },
  "mask-reference": { syntax: "none | <image> | <mask-source>" },
  "mask-source": { syntax: "<url>" },
  "masking-mode": { syntax: "alpha | luminance | match-source" },
  "matrix()": { syntax: "matrix( <number>#{6} )" },
  "matrix3d()": { syntax: "matrix3d( <number>#{16} )" },
  "max()": { syntax: "max( <calc-sum># )" },
  "media-and": { syntax: "<media-in-parens> [ and <media-in-parens> ]+" },
  "media-condition": { syntax: "<media-not> | <media-and> | <media-or> | <media-in-parens>" },
  "media-condition-without-or": { syntax: "<media-not> | <media-and> | <media-in-parens>" },
  "media-feature": { syntax: "( [ <mf-plain> | <mf-boolean> | <mf-range> ] )" },
  "media-in-parens": { syntax: "( <media-condition> ) | <media-feature> | <general-enclosed>" },
  "media-not": { syntax: "not <media-in-parens>" },
  "media-or": { syntax: "<media-in-parens> [ or <media-in-parens> ]+" },
  "media-query": { syntax: "<media-condition> | [ not | only ]? <media-type> [ and <media-condition-without-or> ]?" },
  "media-query-list": { syntax: "<media-query>#" },
  "media-type": { syntax: "<ident>" },
  "mf-boolean": { syntax: "<mf-name>" },
  "mf-name": { syntax: "<ident>" },
  "mf-plain": { syntax: "<mf-name> : <mf-value>" },
  "mf-range": { syntax: `<mf-name> [ '<' | '>' ]? '='? <mf-value>
| <mf-value> [ '<' | '>' ]? '='? <mf-name>
| <mf-value> '<' '='? <mf-name> '<' '='? <mf-value>
| <mf-value> '>' '='? <mf-name> '>' '='? <mf-value>` },
  "mf-value": { syntax: "<number> | <dimension> | <ident> | <ratio>" },
  "min()": { syntax: "min( <calc-sum># )" },
  "minmax()": { syntax: "minmax( [ <length> | <percentage> | min-content | max-content | auto ] , [ <length> | <percentage> | <flex> | min-content | max-content | auto ] )" },
  "named-color": { syntax: "transparent | aliceblue | antiquewhite | aqua | aquamarine | azure | beige | bisque | black | blanchedalmond | blue | blueviolet | brown | burlywood | cadetblue | chartreuse | chocolate | coral | cornflowerblue | cornsilk | crimson | cyan | darkblue | darkcyan | darkgoldenrod | darkgray | darkgreen | darkgrey | darkkhaki | darkmagenta | darkolivegreen | darkorange | darkorchid | darkred | darksalmon | darkseagreen | darkslateblue | darkslategray | darkslategrey | darkturquoise | darkviolet | deeppink | deepskyblue | dimgray | dimgrey | dodgerblue | firebrick | floralwhite | forestgreen | fuchsia | gainsboro | ghostwhite | gold | goldenrod | gray | green | greenyellow | grey | honeydew | hotpink | indianred | indigo | ivory | khaki | lavender | lavenderblush | lawngreen | lemonchiffon | lightblue | lightcoral | lightcyan | lightgoldenrodyellow | lightgray | lightgreen | lightgrey | lightpink | lightsalmon | lightseagreen | lightskyblue | lightslategray | lightslategrey | lightsteelblue | lightyellow | lime | limegreen | linen | magenta | maroon | mediumaquamarine | mediumblue | mediumorchid | mediumpurple | mediumseagreen | mediumslateblue | mediumspringgreen | mediumturquoise | mediumvioletred | midnightblue | mintcream | mistyrose | moccasin | navajowhite | navy | oldlace | olive | olivedrab | orange | orangered | orchid | palegoldenrod | palegreen | paleturquoise | palevioletred | papayawhip | peachpuff | peru | pink | plum | powderblue | purple | rebeccapurple | red | rosybrown | royalblue | saddlebrown | salmon | sandybrown | seagreen | seashell | sienna | silver | skyblue | slateblue | slategray | slategrey | snow | springgreen | steelblue | tan | teal | thistle | tomato | turquoise | violet | wheat | white | whitesmoke | yellow | yellowgreen" },
  "namespace-prefix": { syntax: "<ident>" },
  "ns-prefix": { syntax: "[ <ident-token> | '*' ]? '|'" },
  "number-percentage": { syntax: "<number> | <percentage>" },
  "numeric-figure-values": { syntax: "[ lining-nums | oldstyle-nums ]" },
  "numeric-fraction-values": { syntax: "[ diagonal-fractions | stacked-fractions ]" },
  "numeric-spacing-values": { syntax: "[ proportional-nums | tabular-nums ]" },
  nth: nth$1,
  "opacity()": { syntax: "opacity( [ <number-percentage> ] )" },
  "overflow-position": { syntax: "unsafe | safe" },
  "outline-radius": { syntax: "<length> | <percentage>" },
  "page-body": { syntax: "<declaration>? [ ; <page-body> ]? | <page-margin-box> <page-body>" },
  "page-margin-box": { syntax: "<page-margin-box-type> '{' <declaration-list> '}'" },
  "page-margin-box-type": { syntax: "@top-left-corner | @top-left | @top-center | @top-right | @top-right-corner | @bottom-left-corner | @bottom-left | @bottom-center | @bottom-right | @bottom-right-corner | @left-top | @left-middle | @left-bottom | @right-top | @right-middle | @right-bottom" },
  "page-selector-list": { syntax: "[ <page-selector># ]?" },
  "page-selector": { syntax: "<pseudo-page>+ | <ident> <pseudo-page>*" },
  "path()": { syntax: "path( [ <fill-rule>, ]? <string> )" },
  "paint()": { syntax: "paint( <ident>, <declaration-value>? )" },
  "perspective()": { syntax: "perspective( <length> )" },
  "polygon()": { syntax: "polygon( <fill-rule>? , [ <length-percentage> <length-percentage> ]# )" },
  position,
  "pseudo-class-selector": { syntax: "':' <ident-token> | ':' <function-token> <any-value> ')'" },
  "pseudo-element-selector": { syntax: "':' <pseudo-class-selector>" },
  "pseudo-page": { syntax: ": [ left | right | first | blank ]" },
  quote,
  "radial-gradient()": { syntax: "radial-gradient( [ <ending-shape> || <size> ]? [ at <position> ]? , <color-stop-list> )" },
  "relative-selector": { syntax: "<combinator>? <complex-selector>" },
  "relative-selector-list": { syntax: "<relative-selector>#" },
  "relative-size": { syntax: "larger | smaller" },
  "repeat-style": { syntax: "repeat-x | repeat-y | [ repeat | space | round | no-repeat ]{1,2}" },
  "repeating-linear-gradient()": { syntax: "repeating-linear-gradient( [ <angle> | to <side-or-corner> ]? , <color-stop-list> )" },
  "repeating-radial-gradient()": { syntax: "repeating-radial-gradient( [ <ending-shape> || <size> ]? [ at <position> ]? , <color-stop-list> )" },
  "rgb()": { syntax: "rgb( <percentage>{3} [ / <alpha-value> ]? ) | rgb( <number>{3} [ / <alpha-value> ]? ) | rgb( <percentage>#{3} , <alpha-value>? ) | rgb( <number>#{3} , <alpha-value>? )" },
  "rgba()": { syntax: "rgba( <percentage>{3} [ / <alpha-value> ]? ) | rgba( <number>{3} [ / <alpha-value> ]? ) | rgba( <percentage>#{3} , <alpha-value>? ) | rgba( <number>#{3} , <alpha-value>? )" },
  "rotate()": { syntax: "rotate( [ <angle> | <zero> ] )" },
  "rotate3d()": { syntax: "rotate3d( <number> , <number> , <number> , [ <angle> | <zero> ] )" },
  "rotateX()": { syntax: "rotateX( [ <angle> | <zero> ] )" },
  "rotateY()": { syntax: "rotateY( [ <angle> | <zero> ] )" },
  "rotateZ()": { syntax: "rotateZ( [ <angle> | <zero> ] )" },
  "saturate()": { syntax: "saturate( <number-percentage> )" },
  "scale()": { syntax: "scale( <number> , <number>? )" },
  "scale3d()": { syntax: "scale3d( <number> , <number> , <number> )" },
  "scaleX()": { syntax: "scaleX( <number> )" },
  "scaleY()": { syntax: "scaleY( <number> )" },
  "scaleZ()": { syntax: "scaleZ( <number> )" },
  "self-position": { syntax: "center | start | end | self-start | self-end | flex-start | flex-end" },
  "shape-radius": { syntax: "<length-percentage> | closest-side | farthest-side" },
  "skew()": { syntax: "skew( [ <angle> | <zero> ] , [ <angle> | <zero> ]? )" },
  "skewX()": { syntax: "skewX( [ <angle> | <zero> ] )" },
  "skewY()": { syntax: "skewY( [ <angle> | <zero> ] )" },
  "sepia()": { syntax: "sepia( <number-percentage> )" },
  shadow,
  "shadow-t": { syntax: "[ <length>{2,3} && <color>? ]" },
  shape,
  "shape-box": { syntax: "<box> | margin-box" },
  "side-or-corner": { syntax: "[ left | right ] || [ top | bottom ]" },
  "single-animation": { syntax: "<time> || <timing-function> || <time> || <single-animation-iteration-count> || <single-animation-direction> || <single-animation-fill-mode> || <single-animation-play-state> || [ none | <keyframes-name> ]" },
  "single-animation-direction": { syntax: "normal | reverse | alternate | alternate-reverse" },
  "single-animation-fill-mode": { syntax: "none | forwards | backwards | both" },
  "single-animation-iteration-count": { syntax: "infinite | <number>" },
  "single-animation-play-state": { syntax: "running | paused" },
  "single-transition": { syntax: "[ none | <single-transition-property> ] || <time> || <timing-function> || <time>" },
  "single-transition-property": { syntax: "all | <custom-ident>" },
  size,
  "step-position": { syntax: "jump-start | jump-end | jump-none | jump-both | start | end" },
  "step-timing-function": { syntax: "step-start | step-end | steps(<integer>[, <step-position>]?)" },
  "subclass-selector": { syntax: "<id-selector> | <class-selector> | <attribute-selector> | <pseudo-class-selector>" },
  "supports-condition": { syntax: "not <supports-in-parens> | <supports-in-parens> [ and <supports-in-parens> ]* | <supports-in-parens> [ or <supports-in-parens> ]*" },
  "supports-in-parens": { syntax: "( <supports-condition> ) | <supports-feature> | <general-enclosed>" },
  "supports-feature": { syntax: "<supports-decl> | <supports-selector-fn>" },
  "supports-decl": { syntax: "( <declaration> )" },
  "supports-selector-fn": { syntax: "selector( <complex-selector> )" },
  symbol,
  target,
  "target-counter()": { syntax: "target-counter( [ <string> | <url> ] , <custom-ident> , <counter-style>? )" },
  "target-counters()": { syntax: "target-counters( [ <string> | <url> ] , <custom-ident> , <string> , <counter-style>? )" },
  "target-text()": { syntax: "target-text( [ <string> | <url> ] , [ content | before | after | first-letter ]? )" },
  "time-percentage": { syntax: "<time> | <percentage>" },
  "timing-function": { syntax: "linear | <cubic-bezier-timing-function> | <step-timing-function>" },
  "track-breadth": { syntax: "<length-percentage> | <flex> | min-content | max-content | auto" },
  "track-list": { syntax: "[ <line-names>? [ <track-size> | <track-repeat> ] ]+ <line-names>?" },
  "track-repeat": { syntax: "repeat( [ <positive-integer> ] , [ <line-names>? <track-size> ]+ <line-names>? )" },
  "track-size": { syntax: "<track-breadth> | minmax( <inflexible-breadth> , <track-breadth> ) | fit-content( [ <length> | <percentage> ] )" },
  "transform-function": { syntax: "<matrix()> | <translate()> | <translateX()> | <translateY()> | <scale()> | <scaleX()> | <scaleY()> | <rotate()> | <skew()> | <skewX()> | <skewY()> | <matrix3d()> | <translate3d()> | <translateZ()> | <scale3d()> | <scaleZ()> | <rotate3d()> | <rotateX()> | <rotateY()> | <rotateZ()> | <perspective()>" },
  "transform-list": { syntax: "<transform-function>+" },
  "translate()": { syntax: "translate( <length-percentage> , <length-percentage>? )" },
  "translate3d()": { syntax: "translate3d( <length-percentage> , <length-percentage> , <length> )" },
  "translateX()": { syntax: "translateX( <length-percentage> )" },
  "translateY()": { syntax: "translateY( <length-percentage> )" },
  "translateZ()": { syntax: "translateZ( <length> )" },
  "type-or-unit": { syntax: "string | color | url | integer | number | length | angle | time | frequency | cap | ch | em | ex | ic | lh | rlh | rem | vb | vi | vw | vh | vmin | vmax | mm | Q | cm | in | pt | pc | px | deg | grad | rad | turn | ms | s | Hz | kHz | %" },
  "type-selector": { syntax: "<wq-name> | <ns-prefix>? '*'" },
  "var()": { syntax: "var( <custom-property-name> , <declaration-value>? )" },
  "viewport-length": { syntax: "auto | <length-percentage>" },
  "wq-name": { syntax: "<ns-prefix>? <ident-token>" }
}, atrules = { charset: { prelude: "<string>" }, "font-face": { descriptors: { "unicode-range": { comment: "replaces <unicode-range>, an old production name", syntax: "<urange>#" } } } }, properties = /* @__PURE__ */ JSON.parse(`{"-moz-background-clip":{"comment":"deprecated syntax in old Firefox, https://developer.mozilla.org/en/docs/Web/CSS/background-clip","syntax":"padding | border"},"-moz-border-radius-bottomleft":{"comment":"https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-left-radius","syntax":"<'border-bottom-left-radius'>"},"-moz-border-radius-bottomright":{"comment":"https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-right-radius","syntax":"<'border-bottom-right-radius'>"},"-moz-border-radius-topleft":{"comment":"https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-left-radius","syntax":"<'border-top-left-radius'>"},"-moz-border-radius-topright":{"comment":"https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-right-radius","syntax":"<'border-bottom-right-radius'>"},"-moz-control-character-visibility":{"comment":"firefox specific keywords, https://bugzilla.mozilla.org/show_bug.cgi?id=947588","syntax":"visible | hidden"},"-moz-osx-font-smoothing":{"comment":"misssed old syntax https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth","syntax":"auto | grayscale"},"-moz-user-select":{"comment":"https://developer.mozilla.org/en-US/docs/Web/CSS/user-select","syntax":"none | text | all | -moz-none"},"-ms-flex-align":{"comment":"misssed old syntax implemented in IE, https://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-align","syntax":"start | end | center | baseline | stretch"},"-ms-flex-item-align":{"comment":"misssed old syntax implemented in IE, https://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-align","syntax":"auto | start | end | center | baseline | stretch"},"-ms-flex-line-pack":{"comment":"misssed old syntax implemented in IE, https://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-line-pack","syntax":"start | end | center | justify | distribute | stretch"},"-ms-flex-negative":{"comment":"misssed old syntax implemented in IE; TODO: find references for comfirmation","syntax":"<'flex-shrink'>"},"-ms-flex-pack":{"comment":"misssed old syntax implemented in IE, https://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-pack","syntax":"start | end | center | justify | distribute"},"-ms-flex-order":{"comment":"misssed old syntax implemented in IE; https://msdn.microsoft.com/en-us/library/jj127303(v=vs.85).aspx","syntax":"<integer>"},"-ms-flex-positive":{"comment":"misssed old syntax implemented in IE; TODO: find references for comfirmation","syntax":"<'flex-grow'>"},"-ms-flex-preferred-size":{"comment":"misssed old syntax implemented in IE; TODO: find references for comfirmation","syntax":"<'flex-basis'>"},"-ms-interpolation-mode":{"comment":"https://msdn.microsoft.com/en-us/library/ff521095(v=vs.85).aspx","syntax":"nearest-neighbor | bicubic"},"-ms-grid-column-align":{"comment":"add this property first since it uses as fallback for flexbox, https://msdn.microsoft.com/en-us/library/windows/apps/hh466338.aspx","syntax":"start | end | center | stretch"},"-ms-grid-row-align":{"comment":"add this property first since it uses as fallback for flexbox, https://msdn.microsoft.com/en-us/library/windows/apps/hh466348.aspx","syntax":"start | end | center | stretch"},"-ms-hyphenate-limit-last":{"comment":"misssed old syntax implemented in IE; https://www.w3.org/TR/css-text-4/#hyphenate-line-limits","syntax":"none | always | column | page | spread"},"-webkit-appearance":{"comment":"webkit specific keywords","references":["http://css-infos.net/property/-webkit-appearance"],"syntax":"none | button | button-bevel | caps-lock-indicator | caret | checkbox | default-button | inner-spin-button | listbox | listitem | media-controls-background | media-controls-fullscreen-background | media-current-time-display | media-enter-fullscreen-button | media-exit-fullscreen-button | media-fullscreen-button | media-mute-button | media-overlay-play-button | media-play-button | media-seek-back-button | media-seek-forward-button | media-slider | media-sliderthumb | media-time-remaining-display | media-toggle-closed-captions-button | media-volume-slider | media-volume-slider-container | media-volume-sliderthumb | menulist | menulist-button | menulist-text | menulist-textfield | meter | progress-bar | progress-bar-value | push-button | radio | scrollbarbutton-down | scrollbarbutton-left | scrollbarbutton-right | scrollbarbutton-up | scrollbargripper-horizontal | scrollbargripper-vertical | scrollbarthumb-horizontal | scrollbarthumb-vertical | scrollbartrack-horizontal | scrollbartrack-vertical | searchfield | searchfield-cancel-button | searchfield-decoration | searchfield-results-button | searchfield-results-decoration | slider-horizontal | slider-vertical | sliderthumb-horizontal | sliderthumb-vertical | square-button | textarea | textfield | -apple-pay-button"},"-webkit-background-clip":{"comment":"https://developer.mozilla.org/en/docs/Web/CSS/background-clip","syntax":"[ <box> | border | padding | content | text ]#"},"-webkit-column-break-after":{"comment":"added, http://help.dottoro.com/lcrthhhv.php","syntax":"always | auto | avoid"},"-webkit-column-break-before":{"comment":"added, http://help.dottoro.com/lcxquvkf.php","syntax":"always | auto | avoid"},"-webkit-column-break-inside":{"comment":"added, http://help.dottoro.com/lclhnthl.php","syntax":"always | auto | avoid"},"-webkit-font-smoothing":{"comment":"https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth","syntax":"auto | none | antialiased | subpixel-antialiased"},"-webkit-mask-box-image":{"comment":"missed; https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-mask-box-image","syntax":"[ <url> | <gradient> | none ] [ <length-percentage>{4} <-webkit-mask-box-repeat>{2} ]?"},"-webkit-print-color-adjust":{"comment":"missed","references":["https://developer.mozilla.org/en/docs/Web/CSS/-webkit-print-color-adjust"],"syntax":"economy | exact"},"-webkit-text-security":{"comment":"missed; http://help.dottoro.com/lcbkewgt.php","syntax":"none | circle | disc | square"},"-webkit-user-drag":{"comment":"missed; http://help.dottoro.com/lcbixvwm.php","syntax":"none | element | auto"},"-webkit-user-select":{"comment":"auto is supported by old webkit, https://developer.mozilla.org/en-US/docs/Web/CSS/user-select","syntax":"auto | none | text | all"},"alignment-baseline":{"comment":"added SVG property","references":["https://www.w3.org/TR/SVG/text.html#AlignmentBaselineProperty"],"syntax":"auto | baseline | before-edge | text-before-edge | middle | central | after-edge | text-after-edge | ideographic | alphabetic | hanging | mathematical"},"baseline-shift":{"comment":"added SVG property","references":["https://www.w3.org/TR/SVG/text.html#BaselineShiftProperty"],"syntax":"baseline | sub | super | <svg-length>"},"behavior":{"comment":"added old IE property https://msdn.microsoft.com/en-us/library/ms530723(v=vs.85).aspx","syntax":"<url>+"},"clip-rule":{"comment":"added SVG property","references":["https://www.w3.org/TR/SVG/masking.html#ClipRuleProperty"],"syntax":"nonzero | evenodd"},"cue":{"comment":"https://www.w3.org/TR/css3-speech/#property-index","syntax":"<'cue-before'> <'cue-after'>?"},"cue-after":{"comment":"https://www.w3.org/TR/css3-speech/#property-index","syntax":"<url> <decibel>? | none"},"cue-before":{"comment":"https://www.w3.org/TR/css3-speech/#property-index","syntax":"<url> <decibel>? | none"},"cursor":{"comment":"added legacy keywords: hand, -webkit-grab. -webkit-grabbing, -webkit-zoom-in, -webkit-zoom-out, -moz-grab, -moz-grabbing, -moz-zoom-in, -moz-zoom-out","references":["https://www.sitepoint.com/css3-cursor-styles/"],"syntax":"[ [ <url> [ <x> <y> ]? , ]* [ auto | default | none | context-menu | help | pointer | progress | wait | cell | crosshair | text | vertical-text | alias | copy | move | no-drop | not-allowed | e-resize | n-resize | ne-resize | nw-resize | s-resize | se-resize | sw-resize | w-resize | ew-resize | ns-resize | nesw-resize | nwse-resize | col-resize | row-resize | all-scroll | zoom-in | zoom-out | grab | grabbing | hand | -webkit-grab | -webkit-grabbing | -webkit-zoom-in | -webkit-zoom-out | -moz-grab | -moz-grabbing | -moz-zoom-in | -moz-zoom-out ] ]"},"display":{"comment":"extended with -ms-flexbox","syntax":"| <-non-standard-display>"},"position":{"comment":"extended with -webkit-sticky","syntax":"| -webkit-sticky"},"dominant-baseline":{"comment":"added SVG property","references":["https://www.w3.org/TR/SVG/text.html#DominantBaselineProperty"],"syntax":"auto | use-script | no-change | reset-size | ideographic | alphabetic | hanging | mathematical | central | middle | text-after-edge | text-before-edge"},"image-rendering":{"comment":"extended with <-non-standard-image-rendering>, added SVG keywords optimizeSpeed and optimizeQuality","references":["https://developer.mozilla.org/en/docs/Web/CSS/image-rendering","https://www.w3.org/TR/SVG/painting.html#ImageRenderingProperty"],"syntax":"| optimizeSpeed | optimizeQuality | <-non-standard-image-rendering>"},"fill":{"comment":"added SVG property","references":["https://www.w3.org/TR/SVG/painting.html#FillProperty"],"syntax":"<paint>"},"fill-opacity":{"comment":"added SVG property","references":["https://www.w3.org/TR/SVG/painting.html#FillProperty"],"syntax":"<number-zero-one>"},"fill-rule":{"comment":"added SVG property","references":["https://www.w3.org/TR/SVG/painting.html#FillProperty"],"syntax":"nonzero | evenodd"},"filter":{"comment":"extend with IE legacy syntaxes","syntax":"| <-ms-filter-function-list>"},"glyph-orientation-horizontal":{"comment":"added SVG property","references":["https://www.w3.org/TR/SVG/text.html#GlyphOrientationHorizontalProperty"],"syntax":"<angle>"},"glyph-orientation-vertical":{"comment":"added SVG property","references":["https://www.w3.org/TR/SVG/text.html#GlyphOrientationVerticalProperty"],"syntax":"<angle>"},"kerning":{"comment":"added SVG property","references":["https://www.w3.org/TR/SVG/text.html#KerningProperty"],"syntax":"auto | <svg-length>"},"letter-spacing":{"comment":"fix syntax <length> -> <length-percentage>","references":["https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/letter-spacing"],"syntax":"normal | <length-percentage>"},"marker":{"comment":"added SVG property","references":["https://www.w3.org/TR/SVG/painting.html#MarkerProperties"],"syntax":"none | <url>"},"marker-end":{"comment":"added SVG property","references":["https://www.w3.org/TR/SVG/painting.html#MarkerProperties"],"syntax":"none | <url>"},"marker-mid":{"comment":"added SVG property","references":["https://www.w3.org/TR/SVG/painting.html#MarkerProperties"],"syntax":"none | <url>"},"marker-start":{"comment":"added SVG property","references":["https://www.w3.org/TR/SVG/painting.html#MarkerProperties"],"syntax":"none | <url>"},"max-width":{"comment":"fix auto -> none (https://github.com/mdn/data/pull/431); extend by non-standard width keywords https://developer.mozilla.org/en-US/docs/Web/CSS/max-width","syntax":"none | <length-percentage> | min-content | max-content | fit-content(<length-percentage>) | <-non-standard-width>"},"width":{"comment":"per spec fit-content should be a function, however browsers are supporting it as a keyword (https://github.com/csstree/stylelint-validator/issues/29)","syntax":"| fit-content | -moz-fit-content | -webkit-fit-content"},"min-width":{"comment":"extend by non-standard width keywords https://developer.mozilla.org/en-US/docs/Web/CSS/width","syntax":"auto | <length-percentage> | min-content | max-content | fit-content(<length-percentage>) | <-non-standard-width>"},"overflow":{"comment":"extend by vendor keywords https://developer.mozilla.org/en-US/docs/Web/CSS/overflow","syntax":"| <-non-standard-overflow>"},"pause":{"comment":"https://www.w3.org/TR/css3-speech/#property-index","syntax":"<'pause-before'> <'pause-after'>?"},"pause-after":{"comment":"https://www.w3.org/TR/css3-speech/#property-index","syntax":"<time> | none | x-weak | weak | medium | strong | x-strong"},"pause-before":{"comment":"https://www.w3.org/TR/css3-speech/#property-index","syntax":"<time> | none | x-weak | weak | medium | strong | x-strong"},"rest":{"comment":"https://www.w3.org/TR/css3-speech/#property-index","syntax":"<'rest-before'> <'rest-after'>?"},"rest-after":{"comment":"https://www.w3.org/TR/css3-speech/#property-index","syntax":"<time> | none | x-weak | weak | medium | strong | x-strong"},"rest-before":{"comment":"https://www.w3.org/TR/css3-speech/#property-index","syntax":"<time> | none | x-weak | weak | medium | strong | x-strong"},"shape-rendering":{"comment":"added SVG property","references":["https://www.w3.org/TR/SVG/painting.html#ShapeRenderingPropert"],"syntax":"auto | optimizeSpeed | crispEdges | geometricPrecision"},"src":{"comment":"added @font-face's src property https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/src","syntax":"[ <url> [ format( <string># ) ]? | local( <family-name> ) ]#"},"speak":{"comment":"https://www.w3.org/TR/css3-speech/#property-index","syntax":"auto | none | normal"},"speak-as":{"comment":"https://www.w3.org/TR/css3-speech/#property-index","syntax":"normal | spell-out || digits || [ literal-punctuation | no-punctuation ]"},"stroke":{"comment":"added SVG property","references":["https://www.w3.org/TR/SVG/painting.html#StrokeProperties"],"syntax":"<paint>"},"stroke-dasharray":{"comment":"added SVG property; a list of comma and/or white space separated <length>s and <percentage>s","references":["https://www.w3.org/TR/SVG/painting.html#StrokeProperties"],"syntax":"none | [ <svg-length>+ ]#"},"stroke-dashoffset":{"comment":"added SVG property","references":["https://www.w3.org/TR/SVG/painting.html#StrokeProperties"],"syntax":"<svg-length>"},"stroke-linecap":{"comment":"added SVG property","references":["https://www.w3.org/TR/SVG/painting.html#StrokeProperties"],"syntax":"butt | round | square"},"stroke-linejoin":{"comment":"added SVG property","references":["https://www.w3.org/TR/SVG/painting.html#StrokeProperties"],"syntax":"miter | round | bevel"},"stroke-miterlimit":{"comment":"added SVG property (<miterlimit> = <number-one-or-greater>) ","references":["https://www.w3.org/TR/SVG/painting.html#StrokeProperties"],"syntax":"<number-one-or-greater>"},"stroke-opacity":{"comment":"added SVG property","references":["https://www.w3.org/TR/SVG/painting.html#StrokeProperties"],"syntax":"<number-zero-one>"},"stroke-width":{"comment":"added SVG property","references":["https://www.w3.org/TR/SVG/painting.html#StrokeProperties"],"syntax":"<svg-length>"},"text-anchor":{"comment":"added SVG property","references":["https://www.w3.org/TR/SVG/text.html#TextAlignmentProperties"],"syntax":"start | middle | end"},"unicode-bidi":{"comment":"added prefixed keywords https://developer.mozilla.org/en-US/docs/Web/CSS/unicode-bidi","syntax":"| -moz-isolate | -moz-isolate-override | -moz-plaintext | -webkit-isolate | -webkit-isolate-override | -webkit-plaintext"},"unicode-range":{"comment":"added missed property https://developer.mozilla.org/en-US/docs/Web/CSS/%40font-face/unicode-range","syntax":"<urange>#"},"voice-balance":{"comment":"https://www.w3.org/TR/css3-speech/#property-index","syntax":"<number> | left | center | right | leftwards | rightwards"},"voice-duration":{"comment":"https://www.w3.org/TR/css3-speech/#property-index","syntax":"auto | <time>"},"voice-family":{"comment":"<name> -> <family-name>, https://www.w3.org/TR/css3-speech/#property-index","syntax":"[ [ <family-name> | <generic-voice> ] , ]* [ <family-name> | <generic-voice> ] | preserve"},"voice-pitch":{"comment":"https://www.w3.org/TR/css3-speech/#property-index","syntax":"<frequency> && absolute | [ [ x-low | low | medium | high | x-high ] || [ <frequency> | <semitones> | <percentage> ] ]"},"voice-range":{"comment":"https://www.w3.org/TR/css3-speech/#property-index","syntax":"<frequency> && absolute | [ [ x-low | low | medium | high | x-high ] || [ <frequency> | <semitones> | <percentage> ] ]"},"voice-rate":{"comment":"https://www.w3.org/TR/css3-speech/#property-index","syntax":"[ normal | x-slow | slow | medium | fast | x-fast ] || <percentage>"},"voice-stress":{"comment":"https://www.w3.org/TR/css3-speech/#property-index","syntax":"normal | strong | moderate | none | reduced"},"voice-volume":{"comment":"https://www.w3.org/TR/css3-speech/#property-index","syntax":"silent | [ [ x-soft | soft | medium | loud | x-loud ] || <decibel> ]"},"writing-mode":{"comment":"extend with SVG keywords","syntax":"| <svg-writing-mode>"}}`), syntaxes = /* @__PURE__ */ JSON.parse(`{"-legacy-gradient":{"comment":"added collection of legacy gradient syntaxes","syntax":"<-webkit-gradient()> | <-legacy-linear-gradient> | <-legacy-repeating-linear-gradient> | <-legacy-radial-gradient> | <-legacy-repeating-radial-gradient>"},"-legacy-linear-gradient":{"comment":"like standard syntax but w/o \`to\` keyword https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient","syntax":"-moz-linear-gradient( <-legacy-linear-gradient-arguments> ) | -webkit-linear-gradient( <-legacy-linear-gradient-arguments> ) | -o-linear-gradient( <-legacy-linear-gradient-arguments> )"},"-legacy-repeating-linear-gradient":{"comment":"like standard syntax but w/o \`to\` keyword https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient","syntax":"-moz-repeating-linear-gradient( <-legacy-linear-gradient-arguments> ) | -webkit-repeating-linear-gradient( <-legacy-linear-gradient-arguments> ) | -o-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )"},"-legacy-linear-gradient-arguments":{"comment":"like standard syntax but w/o \`to\` keyword https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient","syntax":"[ <angle> | <side-or-corner> ]? , <color-stop-list>"},"-legacy-radial-gradient":{"comment":"deprecated syntax that implemented by some browsers https://www.w3.org/TR/2011/WD-css3-images-20110908/#radial-gradients","syntax":"-moz-radial-gradient( <-legacy-radial-gradient-arguments> ) | -webkit-radial-gradient( <-legacy-radial-gradient-arguments> ) | -o-radial-gradient( <-legacy-radial-gradient-arguments> )"},"-legacy-repeating-radial-gradient":{"comment":"deprecated syntax that implemented by some browsers https://www.w3.org/TR/2011/WD-css3-images-20110908/#radial-gradients","syntax":"-moz-repeating-radial-gradient( <-legacy-radial-gradient-arguments> ) | -webkit-repeating-radial-gradient( <-legacy-radial-gradient-arguments> ) | -o-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )"},"-legacy-radial-gradient-arguments":{"comment":"deprecated syntax that implemented by some browsers https://www.w3.org/TR/2011/WD-css3-images-20110908/#radial-gradients","syntax":"[ <position> , ]? [ [ [ <-legacy-radial-gradient-shape> || <-legacy-radial-gradient-size> ] | [ <length> | <percentage> ]{2} ] , ]? <color-stop-list>"},"-legacy-radial-gradient-size":{"comment":"before a standard it contains 2 extra keywords (\`contain\` and \`cover\`) https://www.w3.org/TR/2011/WD-css3-images-20110908/#ltsize","syntax":"closest-side | closest-corner | farthest-side | farthest-corner | contain | cover"},"-legacy-radial-gradient-shape":{"comment":"define to double sure it doesn't extends in future https://www.w3.org/TR/2011/WD-css3-images-20110908/#ltshape","syntax":"circle | ellipse"},"-non-standard-font":{"comment":"non standard fonts","references":["https://webkit.org/blog/3709/using-the-system-font-in-web-content/"],"syntax":"-apple-system-body | -apple-system-headline | -apple-system-subheadline | -apple-system-caption1 | -apple-system-caption2 | -apple-system-footnote | -apple-system-short-body | -apple-system-short-headline | -apple-system-short-subheadline | -apple-system-short-caption1 | -apple-system-short-footnote | -apple-system-tall-body"},"-non-standard-color":{"comment":"non standard colors","references":["http://cssdot.ru/%D0%A1%D0%BF%D1%80%D0%B0%D0%B2%D0%BE%D1%87%D0%BD%D0%B8%D0%BA_CSS/color-i305.html","https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#Mozilla_Color_Preference_Extensions"],"syntax":"-moz-ButtonDefault | -moz-ButtonHoverFace | -moz-ButtonHoverText | -moz-CellHighlight | -moz-CellHighlightText | -moz-Combobox | -moz-ComboboxText | -moz-Dialog | -moz-DialogText | -moz-dragtargetzone | -moz-EvenTreeRow | -moz-Field | -moz-FieldText | -moz-html-CellHighlight | -moz-html-CellHighlightText | -moz-mac-accentdarkestshadow | -moz-mac-accentdarkshadow | -moz-mac-accentface | -moz-mac-accentlightesthighlight | -moz-mac-accentlightshadow | -moz-mac-accentregularhighlight | -moz-mac-accentregularshadow | -moz-mac-chrome-active | -moz-mac-chrome-inactive | -moz-mac-focusring | -moz-mac-menuselect | -moz-mac-menushadow | -moz-mac-menutextselect | -moz-MenuHover | -moz-MenuHoverText | -moz-MenuBarText | -moz-MenuBarHoverText | -moz-nativehyperlinktext | -moz-OddTreeRow | -moz-win-communicationstext | -moz-win-mediatext | -moz-activehyperlinktext | -moz-default-background-color | -moz-default-color | -moz-hyperlinktext | -moz-visitedhyperlinktext | -webkit-activelink | -webkit-focus-ring-color | -webkit-link | -webkit-text"},"-non-standard-image-rendering":{"comment":"non-standard keywords http://phrogz.net/tmp/canvas_image_zoom.html","syntax":"optimize-contrast | -moz-crisp-edges | -o-crisp-edges | -webkit-optimize-contrast"},"-non-standard-overflow":{"comment":"non-standard keywords https://developer.mozilla.org/en-US/docs/Web/CSS/overflow","syntax":"-moz-scrollbars-none | -moz-scrollbars-horizontal | -moz-scrollbars-vertical | -moz-hidden-unscrollable"},"-non-standard-width":{"comment":"non-standard keywords https://developer.mozilla.org/en-US/docs/Web/CSS/width","syntax":"fill-available | min-intrinsic | intrinsic | -moz-available | -moz-fit-content | -moz-min-content | -moz-max-content | -webkit-min-content | -webkit-max-content"},"-webkit-gradient()":{"comment":"first Apple proposal gradient syntax https://webkit.org/blog/175/introducing-css-gradients/ - TODO: simplify when after match algorithm improvement ( [, point, radius | , point] -> [, radius]? , point )","syntax":"-webkit-gradient( <-webkit-gradient-type>, <-webkit-gradient-point> [, <-webkit-gradient-point> | , <-webkit-gradient-radius>, <-webkit-gradient-point> ] [, <-webkit-gradient-radius>]? [, <-webkit-gradient-color-stop>]* )"},"-webkit-gradient-color-stop":{"comment":"first Apple proposal gradient syntax https://webkit.org/blog/175/introducing-css-gradients/","syntax":"from( <color> ) | color-stop( [ <number-zero-one> | <percentage> ] , <color> ) | to( <color> )"},"-webkit-gradient-point":{"comment":"first Apple proposal gradient syntax https://webkit.org/blog/175/introducing-css-gradients/","syntax":"[ left | center | right | <length-percentage> ] [ top | center | bottom | <length-percentage> ]"},"-webkit-gradient-radius":{"comment":"first Apple proposal gradient syntax https://webkit.org/blog/175/introducing-css-gradients/","syntax":"<length> | <percentage>"},"-webkit-gradient-type":{"comment":"first Apple proposal gradient syntax https://webkit.org/blog/175/introducing-css-gradients/","syntax":"linear | radial"},"-webkit-mask-box-repeat":{"comment":"missed; https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-mask-box-image","syntax":"repeat | stretch | round"},"-webkit-mask-clip-style":{"comment":"missed; there is no enough information about \`-webkit-mask-clip\` property, but looks like all those keywords are working","syntax":"border | border-box | padding | padding-box | content | content-box | text"},"-ms-filter-function-list":{"comment":"https://developer.mozilla.org/en-US/docs/Web/CSS/-ms-filter","syntax":"<-ms-filter-function>+"},"-ms-filter-function":{"comment":"https://developer.mozilla.org/en-US/docs/Web/CSS/-ms-filter","syntax":"<-ms-filter-function-progid> | <-ms-filter-function-legacy>"},"-ms-filter-function-progid":{"comment":"https://developer.mozilla.org/en-US/docs/Web/CSS/-ms-filter","syntax":"'progid:' [ <ident-token> '.' ]* [ <ident-token> | <function-token> <any-value>? ) ]"},"-ms-filter-function-legacy":{"comment":"https://developer.mozilla.org/en-US/docs/Web/CSS/-ms-filter","syntax":"<ident-token> | <function-token> <any-value>? )"},"-ms-filter":{"syntax":"<string>"},"age":{"comment":"https://www.w3.org/TR/css3-speech/#voice-family","syntax":"child | young | old"},"attr-name":{"syntax":"<wq-name>"},"attr-fallback":{"syntax":"<any-value>"},"border-radius":{"comment":"missed, https://drafts.csswg.org/css-backgrounds-3/#the-border-radius","syntax":"<length-percentage>{1,2}"},"bottom":{"comment":"missed; not sure we should add it, but no others except \`shape\` is using it so it's ok for now; https://drafts.fxtf.org/css-masking-1/#funcdef-clip-rect","syntax":"<length> | auto"},"content-list":{"comment":"missed -> https://drafts.csswg.org/css-content/#typedef-content-list (document-url, <target> and leader() is omitted util stabilization)","syntax":"[ <string> | contents | <image> | <quote> | <target> | <leader()> | <attr()> | counter( <ident>, <'list-style-type'>? ) ]+"},"element()":{"comment":"https://drafts.csswg.org/css-gcpm/#element-syntax & https://drafts.csswg.org/css-images-4/#element-notation","syntax":"element( <custom-ident> , [ first | start | last | first-except ]? ) | element( <id-selector> )"},"generic-voice":{"comment":"https://www.w3.org/TR/css3-speech/#voice-family","syntax":"[ <age>? <gender> <integer>? ]"},"gender":{"comment":"https://www.w3.org/TR/css3-speech/#voice-family","syntax":"male | female | neutral"},"generic-family":{"comment":"added -apple-system","references":["https://webkit.org/blog/3709/using-the-system-font-in-web-content/"],"syntax":"| -apple-system"},"gradient":{"comment":"added legacy syntaxes support","syntax":"| <-legacy-gradient>"},"left":{"comment":"missed; not sure we should add it, but no others except \`shape\` is using it so it's ok for now; https://drafts.fxtf.org/css-masking-1/#funcdef-clip-rect","syntax":"<length> | auto"},"mask-image":{"comment":"missed; https://drafts.fxtf.org/css-masking-1/#the-mask-image","syntax":"<mask-reference>#"},"name-repeat":{"comment":"missed, and looks like obsolete, keep it as is since other property syntaxes should be changed too; https://www.w3.org/TR/2015/WD-css-grid-1-20150917/#typedef-name-repeat","syntax":"repeat( [ <positive-integer> | auto-fill ], <line-names>+)"},"named-color":{"comment":"added non standard color names","syntax":"| <-non-standard-color>"},"paint":{"comment":"used by SVG https://www.w3.org/TR/SVG/painting.html#SpecifyingPaint","syntax":"none | <color> | <url> [ none | <color> ]? | context-fill | context-stroke"},"page-size":{"comment":"https://www.w3.org/TR/css-page-3/#typedef-page-size-page-size","syntax":"A5 | A4 | A3 | B5 | B4 | JIS-B5 | JIS-B4 | letter | legal | ledger"},"ratio":{"comment":"missed, https://drafts.csswg.org/mediaqueries-4/#typedef-ratio","syntax":"<integer> / <integer>"},"right":{"comment":"missed; not sure we should add it, but no others except \`shape\` is using it so it's ok for now; https://drafts.fxtf.org/css-masking-1/#funcdef-clip-rect","syntax":"<length> | auto"},"shape":{"comment":"missed spaces in function body and add backwards compatible syntax","syntax":"rect( <top>, <right>, <bottom>, <left> ) | rect( <top> <right> <bottom> <left> )"},"svg-length":{"comment":"All coordinates and lengths in SVG can be specified with or without a unit identifier","references":["https://www.w3.org/TR/SVG11/coords.html#Units"],"syntax":"<percentage> | <length> | <number>"},"svg-writing-mode":{"comment":"SVG specific keywords (deprecated for CSS)","references":["https://developer.mozilla.org/en/docs/Web/CSS/writing-mode","https://www.w3.org/TR/SVG/text.html#WritingModeProperty"],"syntax":"lr-tb | rl-tb | tb-rl | lr | rl | tb"},"top":{"comment":"missed; not sure we should add it, but no others except \`shape\` is using it so it's ok for now; https://drafts.fxtf.org/css-masking-1/#funcdef-clip-rect","syntax":"<length> | auto"},"track-group":{"comment":"used by old grid-columns and grid-rows syntax v0","syntax":"'(' [ <string>* <track-minmax> <string>* ]+ ')' [ '[' <positive-integer> ']' ]? | <track-minmax>"},"track-list-v0":{"comment":"used by old grid-columns and grid-rows syntax v0","syntax":"[ <string>* <track-group> <string>* ]+ | none"},"track-minmax":{"comment":"used by old grid-columns and grid-rows syntax v0","syntax":"minmax( <track-breadth> , <track-breadth> ) | auto | <track-breadth> | fit-content"},"x":{"comment":"missed; not sure we should add it, but no others except \`cursor\` is using it so it's ok for now; https://drafts.csswg.org/css-ui-3/#cursor","syntax":"<number>"},"y":{"comment":"missed; not sure we should add it, but no others except \`cursor\` is using so it's ok for now; https://drafts.csswg.org/css-ui-3/#cursor","syntax":"<number>"},"declaration":{"comment":"missed, restored by https://drafts.csswg.org/css-syntax","syntax":"<ident-token> : <declaration-value>? [ '!' important ]?"},"declaration-list":{"comment":"missed, restored by https://drafts.csswg.org/css-syntax","syntax":"[ <declaration>? ';' ]* <declaration>?"},"url":{"comment":"https://drafts.csswg.org/css-values-4/#urls","syntax":"url( <string> <url-modifier>* ) | <url-token>"},"url-modifier":{"comment":"https://drafts.csswg.org/css-values-4/#typedef-url-modifier","syntax":"<ident> | <function-token> <any-value> )"},"number-zero-one":{"syntax":"<number [0,1]>"},"number-one-or-greater":{"syntax":"<number [1,∞]>"},"positive-integer":{"syntax":"<integer [0,∞]>"},"-non-standard-display":{"syntax":"-ms-inline-flexbox | -ms-grid | -ms-inline-grid | -webkit-flex | -webkit-inline-flex | -webkit-box | -webkit-inline-box | -moz-inline-stack | -moz-box | -moz-inline-box"}}`), require$$3 = {
  atrules,
  properties,
  syntaxes
};
var data, hasRequiredData;
function requireData() {
  if (hasRequiredData) return data;
  hasRequiredData = 1;
  const Gr = require$$0, ze = require$$1, Wr = require$$2, Yr = require$$3, Qr = /^\s*\|\s*/;
  function Kr(rn) {
    const sn = /* @__PURE__ */ Object.create(null);
    for (const on in rn) {
      const an = rn[on];
      let dn = null;
      if (an.descriptors) {
        dn = /* @__PURE__ */ Object.create(null);
        for (const pn in an.descriptors)
          dn[pn] = an.descriptors[pn].syntax;
      }
      sn[on.substr(1)] = {
        prelude: an.syntax.trim().match(/^@\S+\s+([^;\{]*)/)[1].trim() || null,
        descriptors: dn
      };
    }
    return sn;
  }
  function Zr(rn, sn) {
    const on = {};
    for (const an in rn)
      on[an] = rn[an].syntax || rn[an];
    for (const an in sn)
      an in rn ? sn[an].syntax ? on[an] = Qr.test(sn[an].syntax) ? on[an] + " " + sn[an].syntax.trim() : sn[an].syntax : delete on[an] : sn[an].syntax && (on[an] = sn[an].syntax.replace(Qr, ""));
    return on;
  }
  function en(rn) {
    const sn = {};
    for (const on in rn)
      sn[on] = rn[on].syntax;
    return sn;
  }
  function tn(rn, sn) {
    const on = {};
    for (const an in rn) {
      const dn = sn[an] && sn[an].descriptors || null;
      on[an] = {
        prelude: an in sn && "prelude" in sn[an] ? sn[an].prelude : rn[an].prelude || null,
        descriptors: rn[an].descriptors ? Zr(rn[an].descriptors, dn || {}) : dn && en(dn)
      };
    }
    for (const an in sn)
      hasOwnProperty.call(rn, an) || (on[an] = {
        prelude: sn[an].prelude || null,
        descriptors: sn[an].descriptors && en(sn[an].descriptors)
      });
    return on;
  }
  return data = {
    types: Zr(Wr, Yr.syntaxes),
    atrules: tn(Kr(Gr), Yr.atrules),
    properties: Zr(ze, Yr.properties)
  }, data;
}
var AnPlusB, hasRequiredAnPlusB;
function requireAnPlusB() {
  if (hasRequiredAnPlusB) return AnPlusB;
  hasRequiredAnPlusB = 1;
  var Gr = requireTokenizer$1().cmpChar, ze = requireTokenizer$1().isDigit, Wr = requireTokenizer$1().TYPE, Yr = Wr.WhiteSpace, Qr = Wr.Comment, Kr = Wr.Ident, Zr = Wr.Number, en = Wr.Dimension, tn = 43, rn = 45, sn = 110, on = !0, an = !1;
  function dn(xn, gn) {
    var un = this.scanner.tokenStart + xn, fn = this.scanner.source.charCodeAt(un);
    for ((fn === tn || fn === rn) && (gn && this.error("Number sign is not allowed"), un++); un < this.scanner.tokenEnd; un++)
      ze(this.scanner.source.charCodeAt(un)) || this.error("Integer is expected", un);
  }
  function pn(xn) {
    return dn.call(this, 0, xn);
  }
  function mn(xn, gn) {
    if (!Gr(this.scanner.source, this.scanner.tokenStart + xn, gn)) {
      var un = "";
      switch (gn) {
        case sn:
          un = "N is expected";
          break;
        case rn:
          un = "HyphenMinus is expected";
          break;
      }
      this.error(un, this.scanner.tokenStart + xn);
    }
  }
  function vn() {
    for (var xn = 0, gn = 0, un = this.scanner.tokenType; un === Yr || un === Qr; )
      un = this.scanner.lookupType(++xn);
    if (un !== Zr)
      if (this.scanner.isDelim(tn, xn) || this.scanner.isDelim(rn, xn)) {
        gn = this.scanner.isDelim(tn, xn) ? tn : rn;
        do
          un = this.scanner.lookupType(++xn);
        while (un === Yr || un === Qr);
        un !== Zr && (this.scanner.skip(xn), pn.call(this, on));
      } else
        return null;
    return xn > 0 && this.scanner.skip(xn), gn === 0 && (un = this.scanner.source.charCodeAt(this.scanner.tokenStart), un !== tn && un !== rn && this.error("Number sign is expected")), pn.call(this, gn !== 0), gn === rn ? "-" + this.consume(Zr) : this.consume(Zr);
  }
  return AnPlusB = {
    name: "AnPlusB",
    structure: {
      a: [String, null],
      b: [String, null]
    },
    parse: function() {
      var xn = this.scanner.tokenStart, gn = null, un = null;
      if (this.scanner.tokenType === Zr)
        pn.call(this, an), un = this.consume(Zr);
      else if (this.scanner.tokenType === Kr && Gr(this.scanner.source, this.scanner.tokenStart, rn))
        switch (gn = "-1", mn.call(this, 1, sn), this.scanner.getTokenLength()) {
          // -n
          // -n <signed-integer>
          // -n ['+' | '-'] <signless-integer>
          case 2:
            this.scanner.next(), un = vn.call(this);
            break;
          // -n- <signless-integer>
          case 3:
            mn.call(this, 2, rn), this.scanner.next(), this.scanner.skipSC(), pn.call(this, on), un = "-" + this.consume(Zr);
            break;
          // <dashndashdigit-ident>
          default:
            mn.call(this, 2, rn), dn.call(this, 3, on), this.scanner.next(), un = this.scanner.substrToCursor(xn + 2);
        }
      else if (this.scanner.tokenType === Kr || this.scanner.isDelim(tn) && this.scanner.lookupType(1) === Kr) {
        var fn = 0;
        switch (gn = "1", this.scanner.isDelim(tn) && (fn = 1, this.scanner.next()), mn.call(this, 0, sn), this.scanner.getTokenLength()) {
          // '+'? n
          // '+'? n <signed-integer>
          // '+'? n ['+' | '-'] <signless-integer>
          case 1:
            this.scanner.next(), un = vn.call(this);
            break;
          // '+'? n- <signless-integer>
          case 2:
            mn.call(this, 1, rn), this.scanner.next(), this.scanner.skipSC(), pn.call(this, on), un = "-" + this.consume(Zr);
            break;
          // '+'? <ndashdigit-ident>
          default:
            mn.call(this, 1, rn), dn.call(this, 2, on), this.scanner.next(), un = this.scanner.substrToCursor(xn + fn + 1);
        }
      } else if (this.scanner.tokenType === en) {
        for (var cn = this.scanner.source.charCodeAt(this.scanner.tokenStart), fn = cn === tn || cn === rn, Cn = this.scanner.tokenStart + fn; Cn < this.scanner.tokenEnd && ze(this.scanner.source.charCodeAt(Cn)); Cn++)
          ;
        Cn === this.scanner.tokenStart + fn && this.error("Integer is expected", this.scanner.tokenStart + fn), mn.call(this, Cn - this.scanner.tokenStart, sn), gn = this.scanner.source.substring(xn, Cn), Cn + 1 === this.scanner.tokenEnd ? (this.scanner.next(), un = vn.call(this)) : (mn.call(this, Cn - this.scanner.tokenStart + 1, rn), Cn + 2 === this.scanner.tokenEnd ? (this.scanner.next(), this.scanner.skipSC(), pn.call(this, on), un = "-" + this.consume(Zr)) : (dn.call(this, Cn - this.scanner.tokenStart + 2, on), this.scanner.next(), un = this.scanner.substrToCursor(Cn + 1)));
      } else
        this.error();
      return gn !== null && gn.charCodeAt(0) === tn && (gn = gn.substr(1)), un !== null && un.charCodeAt(0) === tn && (un = un.substr(1)), {
        type: "AnPlusB",
        loc: this.getLocation(xn, this.scanner.tokenStart),
        a: gn,
        b: un
      };
    },
    generate: function(xn) {
      var gn = xn.a !== null && xn.a !== void 0, un = xn.b !== null && xn.b !== void 0;
      gn ? (this.chunk(
        xn.a === "+1" ? "+n" : (
          // eslint-disable-line operator-linebreak, indent
          xn.a === "1" ? "n" : (
            // eslint-disable-line operator-linebreak, indent
            xn.a === "-1" ? "-n" : (
              // eslint-disable-line operator-linebreak, indent
              xn.a + "n"
            )
          )
        )
        // eslint-disable-line operator-linebreak, indent
      ), un && (un = String(xn.b), un.charAt(0) === "-" || un.charAt(0) === "+" ? (this.chunk(un.charAt(0)), this.chunk(un.substr(1))) : (this.chunk("+"), this.chunk(un)))) : this.chunk(String(xn.b));
    }
  }, AnPlusB;
}
var Raw, hasRequiredRaw;
function requireRaw() {
  if (hasRequiredRaw) return Raw;
  hasRequiredRaw = 1;
  var Gr = requireTokenizer$1(), ze = Gr.TYPE, Wr = ze.WhiteSpace, Yr = ze.Semicolon, Qr = ze.LeftCurlyBracket, Kr = ze.Delim, Zr = 33;
  function en() {
    return this.scanner.tokenIndex > 0 && this.scanner.lookupType(-1) === Wr ? this.scanner.tokenIndex > 1 ? this.scanner.getTokenStart(this.scanner.tokenIndex - 1) : this.scanner.firstCharOffset : this.scanner.tokenStart;
  }
  function tn() {
    return 0;
  }
  function rn(dn) {
    return dn === Qr ? 1 : 0;
  }
  function sn(dn) {
    return dn === Qr || dn === Yr ? 1 : 0;
  }
  function on(dn, pn, mn) {
    return dn === Kr && pn.charCodeAt(mn) === Zr || dn === Yr ? 1 : 0;
  }
  function an(dn) {
    return dn === Yr ? 2 : 0;
  }
  return Raw = {
    name: "Raw",
    structure: {
      value: String
    },
    parse: function(dn, pn, mn) {
      var vn = this.scanner.getTokenStart(dn), xn;
      return this.scanner.skip(
        this.scanner.getRawLength(dn, pn || tn)
      ), mn && this.scanner.tokenStart > vn ? xn = en.call(this) : xn = this.scanner.tokenStart, {
        type: "Raw",
        loc: this.getLocation(vn, xn),
        value: this.scanner.source.substring(vn, xn)
      };
    },
    generate: function(dn) {
      this.chunk(dn.value);
    },
    mode: {
      default: tn,
      leftCurlyBracket: rn,
      leftCurlyBracketOrSemicolon: sn,
      exclamationMarkOrSemicolon: on,
      semicolonIncluded: an
    }
  }, Raw;
}
var Atrule, hasRequiredAtrule$1;
function requireAtrule$1() {
  if (hasRequiredAtrule$1) return Atrule;
  hasRequiredAtrule$1 = 1;
  var Gr = requireTokenizer$1().TYPE, ze = requireRaw().mode, Wr = Gr.AtKeyword, Yr = Gr.Semicolon, Qr = Gr.LeftCurlyBracket, Kr = Gr.RightCurlyBracket;
  function Zr(tn) {
    return this.Raw(tn, ze.leftCurlyBracketOrSemicolon, !0);
  }
  function en() {
    for (var tn = 1, rn; rn = this.scanner.lookupType(tn); tn++) {
      if (rn === Kr)
        return !0;
      if (rn === Qr || rn === Wr)
        return !1;
    }
    return !1;
  }
  return Atrule = {
    name: "Atrule",
    structure: {
      name: String,
      prelude: ["AtrulePrelude", "Raw", null],
      block: ["Block", null]
    },
    parse: function() {
      var tn = this.scanner.tokenStart, rn, sn, on = null, an = null;
      switch (this.eat(Wr), rn = this.scanner.substrToCursor(tn + 1), sn = rn.toLowerCase(), this.scanner.skipSC(), this.scanner.eof === !1 && this.scanner.tokenType !== Qr && this.scanner.tokenType !== Yr && (this.parseAtrulePrelude ? (on = this.parseWithFallback(this.AtrulePrelude.bind(this, rn), Zr), on.type === "AtrulePrelude" && on.children.head === null && (on = null)) : on = Zr.call(this, this.scanner.tokenIndex), this.scanner.skipSC()), this.scanner.tokenType) {
        case Yr:
          this.scanner.next();
          break;
        case Qr:
          this.atrule.hasOwnProperty(sn) && typeof this.atrule[sn].block == "function" ? an = this.atrule[sn].block.call(this) : an = this.Block(en.call(this));
          break;
      }
      return {
        type: "Atrule",
        loc: this.getLocation(tn, this.scanner.tokenStart),
        name: rn,
        prelude: on,
        block: an
      };
    },
    generate: function(tn) {
      this.chunk("@"), this.chunk(tn.name), tn.prelude !== null && (this.chunk(" "), this.node(tn.prelude)), tn.block ? this.node(tn.block) : this.chunk(";");
    },
    walkContext: "atrule"
  }, Atrule;
}
var AtrulePrelude, hasRequiredAtrulePrelude$1;
function requireAtrulePrelude$1() {
  if (hasRequiredAtrulePrelude$1) return AtrulePrelude;
  hasRequiredAtrulePrelude$1 = 1;
  var Gr = requireTokenizer$1().TYPE, ze = Gr.Semicolon, Wr = Gr.LeftCurlyBracket;
  return AtrulePrelude = {
    name: "AtrulePrelude",
    structure: {
      children: [[]]
    },
    parse: function(Yr) {
      var Qr = null;
      return Yr !== null && (Yr = Yr.toLowerCase()), this.scanner.skipSC(), this.atrule.hasOwnProperty(Yr) && typeof this.atrule[Yr].prelude == "function" ? Qr = this.atrule[Yr].prelude.call(this) : Qr = this.readSequence(this.scope.AtrulePrelude), this.scanner.skipSC(), this.scanner.eof !== !0 && this.scanner.tokenType !== Wr && this.scanner.tokenType !== ze && this.error("Semicolon or block is expected"), Qr === null && (Qr = this.createList()), {
        type: "AtrulePrelude",
        loc: this.getLocationFromList(Qr),
        children: Qr
      };
    },
    generate: function(Yr) {
      this.children(Yr);
    },
    walkContext: "atrulePrelude"
  }, AtrulePrelude;
}
var AttributeSelector, hasRequiredAttributeSelector;
function requireAttributeSelector() {
  if (hasRequiredAttributeSelector) return AttributeSelector;
  hasRequiredAttributeSelector = 1;
  var Gr = requireTokenizer$1().TYPE, ze = Gr.Ident, Wr = Gr.String, Yr = Gr.Colon, Qr = Gr.LeftSquareBracket, Kr = Gr.RightSquareBracket, Zr = 36, en = 42, tn = 61, rn = 94, sn = 124, on = 126;
  function an() {
    this.scanner.eof && this.error("Unexpected end of input");
    var pn = this.scanner.tokenStart, mn = !1, vn = !0;
    return this.scanner.isDelim(en) ? (mn = !0, vn = !1, this.scanner.next()) : this.scanner.isDelim(sn) || this.eat(ze), this.scanner.isDelim(sn) ? this.scanner.source.charCodeAt(this.scanner.tokenStart + 1) !== tn ? (this.scanner.next(), this.eat(ze)) : mn && this.error("Identifier is expected", this.scanner.tokenEnd) : mn && this.error("Vertical line is expected"), vn && this.scanner.tokenType === Yr && (this.scanner.next(), this.eat(ze)), {
      type: "Identifier",
      loc: this.getLocation(pn, this.scanner.tokenStart),
      name: this.scanner.substrToCursor(pn)
    };
  }
  function dn() {
    var pn = this.scanner.tokenStart, mn = this.scanner.source.charCodeAt(pn);
    return mn !== tn && // =
    mn !== on && // ~=
    mn !== rn && // ^=
    mn !== Zr && // $=
    mn !== en && // *=
    mn !== sn && this.error("Attribute selector (=, ~=, ^=, $=, *=, |=) is expected"), this.scanner.next(), mn !== tn && (this.scanner.isDelim(tn) || this.error("Equal sign is expected"), this.scanner.next()), this.scanner.substrToCursor(pn);
  }
  return AttributeSelector = {
    name: "AttributeSelector",
    structure: {
      name: "Identifier",
      matcher: [String, null],
      value: ["String", "Identifier", null],
      flags: [String, null]
    },
    parse: function() {
      var pn = this.scanner.tokenStart, mn, vn = null, xn = null, gn = null;
      return this.eat(Qr), this.scanner.skipSC(), mn = an.call(this), this.scanner.skipSC(), this.scanner.tokenType !== Kr && (this.scanner.tokenType !== ze && (vn = dn.call(this), this.scanner.skipSC(), xn = this.scanner.tokenType === Wr ? this.String() : this.Identifier(), this.scanner.skipSC()), this.scanner.tokenType === ze && (gn = this.scanner.getTokenValue(), this.scanner.next(), this.scanner.skipSC())), this.eat(Kr), {
        type: "AttributeSelector",
        loc: this.getLocation(pn, this.scanner.tokenStart),
        name: mn,
        matcher: vn,
        value: xn,
        flags: gn
      };
    },
    generate: function(pn) {
      var mn = " ";
      this.chunk("["), this.node(pn.name), pn.matcher !== null && (this.chunk(pn.matcher), pn.value !== null && (this.node(pn.value), pn.value.type === "String" && (mn = ""))), pn.flags !== null && (this.chunk(mn), this.chunk(pn.flags)), this.chunk("]");
    }
  }, AttributeSelector;
}
var Block, hasRequiredBlock;
function requireBlock() {
  if (hasRequiredBlock) return Block;
  hasRequiredBlock = 1;
  var Gr = requireTokenizer$1().TYPE, ze = requireRaw().mode, Wr = Gr.WhiteSpace, Yr = Gr.Comment, Qr = Gr.Semicolon, Kr = Gr.AtKeyword, Zr = Gr.LeftCurlyBracket, en = Gr.RightCurlyBracket;
  function tn(an) {
    return this.Raw(an, null, !0);
  }
  function rn() {
    return this.parseWithFallback(this.Rule, tn);
  }
  function sn(an) {
    return this.Raw(an, ze.semicolonIncluded, !0);
  }
  function on() {
    if (this.scanner.tokenType === Qr)
      return sn.call(this, this.scanner.tokenIndex);
    var an = this.parseWithFallback(this.Declaration, sn);
    return this.scanner.tokenType === Qr && this.scanner.next(), an;
  }
  return Block = {
    name: "Block",
    structure: {
      children: [[
        "Atrule",
        "Rule",
        "Declaration"
      ]]
    },
    parse: function(an) {
      var dn = an ? on : rn, pn = this.scanner.tokenStart, mn = this.createList();
      this.eat(Zr);
      e:
        for (; !this.scanner.eof; )
          switch (this.scanner.tokenType) {
            case en:
              break e;
            case Wr:
            case Yr:
              this.scanner.next();
              break;
            case Kr:
              mn.push(this.parseWithFallback(this.Atrule, tn));
              break;
            default:
              mn.push(dn.call(this));
          }
      return this.scanner.eof || this.eat(en), {
        type: "Block",
        loc: this.getLocation(pn, this.scanner.tokenStart),
        children: mn
      };
    },
    generate: function(an) {
      this.chunk("{"), this.children(an, function(dn) {
        dn.type === "Declaration" && this.chunk(";");
      }), this.chunk("}");
    },
    walkContext: "block"
  }, Block;
}
var Brackets, hasRequiredBrackets;
function requireBrackets() {
  if (hasRequiredBrackets) return Brackets;
  hasRequiredBrackets = 1;
  var Gr = requireTokenizer$1().TYPE, ze = Gr.LeftSquareBracket, Wr = Gr.RightSquareBracket;
  return Brackets = {
    name: "Brackets",
    structure: {
      children: [[]]
    },
    parse: function(Yr, Qr) {
      var Kr = this.scanner.tokenStart, Zr = null;
      return this.eat(ze), Zr = Yr.call(this, Qr), this.scanner.eof || this.eat(Wr), {
        type: "Brackets",
        loc: this.getLocation(Kr, this.scanner.tokenStart),
        children: Zr
      };
    },
    generate: function(Yr) {
      this.chunk("["), this.children(Yr), this.chunk("]");
    }
  }, Brackets;
}
var CDC_1, hasRequiredCDC;
function requireCDC() {
  if (hasRequiredCDC) return CDC_1;
  hasRequiredCDC = 1;
  var Gr = requireTokenizer$1().TYPE.CDC;
  return CDC_1 = {
    name: "CDC",
    structure: [],
    parse: function() {
      var ze = this.scanner.tokenStart;
      return this.eat(Gr), {
        type: "CDC",
        loc: this.getLocation(ze, this.scanner.tokenStart)
      };
    },
    generate: function() {
      this.chunk("-->");
    }
  }, CDC_1;
}
var CDO_1, hasRequiredCDO;
function requireCDO() {
  if (hasRequiredCDO) return CDO_1;
  hasRequiredCDO = 1;
  var Gr = requireTokenizer$1().TYPE.CDO;
  return CDO_1 = {
    name: "CDO",
    structure: [],
    parse: function() {
      var ze = this.scanner.tokenStart;
      return this.eat(Gr), {
        type: "CDO",
        loc: this.getLocation(ze, this.scanner.tokenStart)
      };
    },
    generate: function() {
      this.chunk("<!--");
    }
  }, CDO_1;
}
var ClassSelector, hasRequiredClassSelector;
function requireClassSelector() {
  if (hasRequiredClassSelector) return ClassSelector;
  hasRequiredClassSelector = 1;
  var Gr = requireTokenizer$1().TYPE, ze = Gr.Ident, Wr = 46;
  return ClassSelector = {
    name: "ClassSelector",
    structure: {
      name: String
    },
    parse: function() {
      return this.scanner.isDelim(Wr) || this.error("Full stop is expected"), this.scanner.next(), {
        type: "ClassSelector",
        loc: this.getLocation(this.scanner.tokenStart - 1, this.scanner.tokenEnd),
        name: this.consume(ze)
      };
    },
    generate: function(Yr) {
      this.chunk("."), this.chunk(Yr.name);
    }
  }, ClassSelector;
}
var Combinator, hasRequiredCombinator;
function requireCombinator() {
  if (hasRequiredCombinator) return Combinator;
  hasRequiredCombinator = 1;
  var Gr = requireTokenizer$1().TYPE, ze = Gr.Ident, Wr = 43, Yr = 47, Qr = 62, Kr = 126;
  return Combinator = {
    name: "Combinator",
    structure: {
      name: String
    },
    parse: function() {
      var Zr = this.scanner.tokenStart, en = this.scanner.source.charCodeAt(this.scanner.tokenStart);
      switch (en) {
        case Qr:
        case Wr:
        case Kr:
          this.scanner.next();
          break;
        case Yr:
          this.scanner.next(), (this.scanner.tokenType !== ze || this.scanner.lookupValue(0, "deep") === !1) && this.error("Identifier `deep` is expected"), this.scanner.next(), this.scanner.isDelim(Yr) || this.error("Solidus is expected"), this.scanner.next();
          break;
        default:
          this.error("Combinator is expected");
      }
      return {
        type: "Combinator",
        loc: this.getLocation(Zr, this.scanner.tokenStart),
        name: this.scanner.substrToCursor(Zr)
      };
    },
    generate: function(Zr) {
      this.chunk(Zr.name);
    }
  }, Combinator;
}
var Comment, hasRequiredComment;
function requireComment() {
  if (hasRequiredComment) return Comment;
  hasRequiredComment = 1;
  var Gr = requireTokenizer$1().TYPE, ze = Gr.Comment, Wr = 42, Yr = 47;
  return Comment = {
    name: "Comment",
    structure: {
      value: String
    },
    parse: function() {
      var Qr = this.scanner.tokenStart, Kr = this.scanner.tokenEnd;
      return this.eat(ze), Kr - Qr + 2 >= 2 && this.scanner.source.charCodeAt(Kr - 2) === Wr && this.scanner.source.charCodeAt(Kr - 1) === Yr && (Kr -= 2), {
        type: "Comment",
        loc: this.getLocation(Qr, this.scanner.tokenStart),
        value: this.scanner.source.substring(Qr + 2, Kr)
      };
    },
    generate: function(Qr) {
      this.chunk("/*"), this.chunk(Qr.value), this.chunk("*/");
    }
  }, Comment;
}
var Declaration, hasRequiredDeclaration;
function requireDeclaration() {
  if (hasRequiredDeclaration) return Declaration;
  hasRequiredDeclaration = 1;
  var Gr = requireNames().isCustomProperty, ze = requireTokenizer$1().TYPE, Wr = requireRaw().mode, Yr = ze.Ident, Qr = ze.Hash, Kr = ze.Colon, Zr = ze.Semicolon, en = ze.Delim, tn = ze.WhiteSpace, rn = 33, sn = 35, on = 36, an = 38, dn = 42, pn = 43, mn = 47;
  function vn(cn) {
    return this.Raw(cn, Wr.exclamationMarkOrSemicolon, !0);
  }
  function xn(cn) {
    return this.Raw(cn, Wr.exclamationMarkOrSemicolon, !1);
  }
  function gn() {
    var cn = this.scanner.tokenIndex, Cn = this.Value();
    return Cn.type !== "Raw" && this.scanner.eof === !1 && this.scanner.tokenType !== Zr && this.scanner.isDelim(rn) === !1 && this.scanner.isBalanceEdge(cn) === !1 && this.error(), Cn;
  }
  Declaration = {
    name: "Declaration",
    structure: {
      important: [Boolean, String],
      property: String,
      value: ["Value", "Raw"]
    },
    parse: function() {
      var cn = this.scanner.tokenStart, Cn = this.scanner.tokenIndex, bn = un.call(this), Sn = Gr(bn), _n = Sn ? this.parseCustomProperty : this.parseValue, Tn = Sn ? xn : vn, Ln = !1, Pn;
      this.scanner.skipSC(), this.eat(Kr);
      const In = this.scanner.tokenIndex;
      if (Sn || this.scanner.skipSC(), _n ? Pn = this.parseWithFallback(gn, Tn) : Pn = Tn.call(this, this.scanner.tokenIndex), Sn && Pn.type === "Value" && Pn.children.isEmpty()) {
        for (let Mn = In - this.scanner.tokenIndex; Mn <= 0; Mn++)
          if (this.scanner.lookupType(Mn) === tn) {
            Pn.children.appendData({
              type: "WhiteSpace",
              loc: null,
              value: " "
            });
            break;
          }
      }
      return this.scanner.isDelim(rn) && (Ln = fn.call(this), this.scanner.skipSC()), this.scanner.eof === !1 && this.scanner.tokenType !== Zr && this.scanner.isBalanceEdge(Cn) === !1 && this.error(), {
        type: "Declaration",
        loc: this.getLocation(cn, this.scanner.tokenStart),
        important: Ln,
        property: bn,
        value: Pn
      };
    },
    generate: function(cn) {
      this.chunk(cn.property), this.chunk(":"), this.node(cn.value), cn.important && this.chunk(cn.important === !0 ? "!important" : "!" + cn.important);
    },
    walkContext: "declaration"
  };
  function un() {
    var cn = this.scanner.tokenStart;
    if (this.scanner.tokenType === en)
      switch (this.scanner.source.charCodeAt(this.scanner.tokenStart)) {
        case dn:
        case on:
        case pn:
        case sn:
        case an:
          this.scanner.next();
          break;
        // TODO: not sure we should support this hack
        case mn:
          this.scanner.next(), this.scanner.isDelim(mn) && this.scanner.next();
          break;
      }
    return this.scanner.tokenType === Qr ? this.eat(Qr) : this.eat(Yr), this.scanner.substrToCursor(cn);
  }
  function fn() {
    this.eat(en), this.scanner.skipSC();
    var cn = this.consume(Yr);
    return cn === "important" ? !0 : cn;
  }
  return Declaration;
}
var DeclarationList, hasRequiredDeclarationList;
function requireDeclarationList() {
  if (hasRequiredDeclarationList) return DeclarationList;
  hasRequiredDeclarationList = 1;
  var Gr = requireTokenizer$1().TYPE, ze = requireRaw().mode, Wr = Gr.WhiteSpace, Yr = Gr.Comment, Qr = Gr.Semicolon;
  function Kr(Zr) {
    return this.Raw(Zr, ze.semicolonIncluded, !0);
  }
  return DeclarationList = {
    name: "DeclarationList",
    structure: {
      children: [[
        "Declaration"
      ]]
    },
    parse: function() {
      for (var Zr = this.createList(); !this.scanner.eof; )
        switch (this.scanner.tokenType) {
          case Wr:
          case Yr:
          case Qr:
            this.scanner.next();
            break;
          default:
            Zr.push(this.parseWithFallback(this.Declaration, Kr));
        }
      return {
        type: "DeclarationList",
        loc: this.getLocationFromList(Zr),
        children: Zr
      };
    },
    generate: function(Zr) {
      this.children(Zr, function(en) {
        en.type === "Declaration" && this.chunk(";");
      });
    }
  }, DeclarationList;
}
var Dimension, hasRequiredDimension;
function requireDimension() {
  if (hasRequiredDimension) return Dimension;
  hasRequiredDimension = 1;
  var Gr = requireUtils().consumeNumber, ze = requireTokenizer$1().TYPE, Wr = ze.Dimension;
  return Dimension = {
    name: "Dimension",
    structure: {
      value: String,
      unit: String
    },
    parse: function() {
      var Yr = this.scanner.tokenStart, Qr = Gr(this.scanner.source, Yr);
      return this.eat(Wr), {
        type: "Dimension",
        loc: this.getLocation(Yr, this.scanner.tokenStart),
        value: this.scanner.source.substring(Yr, Qr),
        unit: this.scanner.source.substring(Qr, this.scanner.tokenStart)
      };
    },
    generate: function(Yr) {
      this.chunk(Yr.value), this.chunk(Yr.unit);
    }
  }, Dimension;
}
var _Function, hasRequired_Function;
function require_Function() {
  if (hasRequired_Function) return _Function;
  hasRequired_Function = 1;
  var Gr = requireTokenizer$1().TYPE, ze = Gr.RightParenthesis;
  return _Function = {
    name: "Function",
    structure: {
      name: String,
      children: [[]]
    },
    parse: function(Wr, Yr) {
      var Qr = this.scanner.tokenStart, Kr = this.consumeFunctionName(), Zr = Kr.toLowerCase(), en;
      return en = Yr.hasOwnProperty(Zr) ? Yr[Zr].call(this, Yr) : Wr.call(this, Yr), this.scanner.eof || this.eat(ze), {
        type: "Function",
        loc: this.getLocation(Qr, this.scanner.tokenStart),
        name: Kr,
        children: en
      };
    },
    generate: function(Wr) {
      this.chunk(Wr.name), this.chunk("("), this.children(Wr), this.chunk(")");
    },
    walkContext: "function"
  }, _Function;
}
var Hash, hasRequiredHash;
function requireHash() {
  if (hasRequiredHash) return Hash;
  hasRequiredHash = 1;
  var Gr = requireTokenizer$1().TYPE, ze = Gr.Hash;
  return Hash = {
    name: "Hash",
    structure: {
      value: String
    },
    parse: function() {
      var Wr = this.scanner.tokenStart;
      return this.eat(ze), {
        type: "Hash",
        loc: this.getLocation(Wr, this.scanner.tokenStart),
        value: this.scanner.substrToCursor(Wr + 1)
      };
    },
    generate: function(Wr) {
      this.chunk("#"), this.chunk(Wr.value);
    }
  }, Hash;
}
var Identifier, hasRequiredIdentifier;
function requireIdentifier() {
  if (hasRequiredIdentifier) return Identifier;
  hasRequiredIdentifier = 1;
  var Gr = requireTokenizer$1().TYPE, ze = Gr.Ident;
  return Identifier = {
    name: "Identifier",
    structure: {
      name: String
    },
    parse: function() {
      return {
        type: "Identifier",
        loc: this.getLocation(this.scanner.tokenStart, this.scanner.tokenEnd),
        name: this.consume(ze)
      };
    },
    generate: function(Wr) {
      this.chunk(Wr.name);
    }
  }, Identifier;
}
var IdSelector, hasRequiredIdSelector;
function requireIdSelector() {
  if (hasRequiredIdSelector) return IdSelector;
  hasRequiredIdSelector = 1;
  var Gr = requireTokenizer$1().TYPE, ze = Gr.Hash;
  return IdSelector = {
    name: "IdSelector",
    structure: {
      name: String
    },
    parse: function() {
      var Wr = this.scanner.tokenStart;
      return this.eat(ze), {
        type: "IdSelector",
        loc: this.getLocation(Wr, this.scanner.tokenStart),
        name: this.scanner.substrToCursor(Wr + 1)
      };
    },
    generate: function(Wr) {
      this.chunk("#"), this.chunk(Wr.name);
    }
  }, IdSelector;
}
var MediaFeature, hasRequiredMediaFeature;
function requireMediaFeature() {
  if (hasRequiredMediaFeature) return MediaFeature;
  hasRequiredMediaFeature = 1;
  var Gr = requireTokenizer$1().TYPE, ze = Gr.Ident, Wr = Gr.Number, Yr = Gr.Dimension, Qr = Gr.LeftParenthesis, Kr = Gr.RightParenthesis, Zr = Gr.Colon, en = Gr.Delim;
  return MediaFeature = {
    name: "MediaFeature",
    structure: {
      name: String,
      value: ["Identifier", "Number", "Dimension", "Ratio", null]
    },
    parse: function() {
      var tn = this.scanner.tokenStart, rn, sn = null;
      if (this.eat(Qr), this.scanner.skipSC(), rn = this.consume(ze), this.scanner.skipSC(), this.scanner.tokenType !== Kr) {
        switch (this.eat(Zr), this.scanner.skipSC(), this.scanner.tokenType) {
          case Wr:
            this.lookupNonWSType(1) === en ? sn = this.Ratio() : sn = this.Number();
            break;
          case Yr:
            sn = this.Dimension();
            break;
          case ze:
            sn = this.Identifier();
            break;
          default:
            this.error("Number, dimension, ratio or identifier is expected");
        }
        this.scanner.skipSC();
      }
      return this.eat(Kr), {
        type: "MediaFeature",
        loc: this.getLocation(tn, this.scanner.tokenStart),
        name: rn,
        value: sn
      };
    },
    generate: function(tn) {
      this.chunk("("), this.chunk(tn.name), tn.value !== null && (this.chunk(":"), this.node(tn.value)), this.chunk(")");
    }
  }, MediaFeature;
}
var MediaQuery, hasRequiredMediaQuery;
function requireMediaQuery() {
  if (hasRequiredMediaQuery) return MediaQuery;
  hasRequiredMediaQuery = 1;
  var Gr = requireTokenizer$1().TYPE, ze = Gr.WhiteSpace, Wr = Gr.Comment, Yr = Gr.Ident, Qr = Gr.LeftParenthesis;
  return MediaQuery = {
    name: "MediaQuery",
    structure: {
      children: [[
        "Identifier",
        "MediaFeature",
        "WhiteSpace"
      ]]
    },
    parse: function() {
      this.scanner.skipSC();
      var Kr = this.createList(), Zr = null, en = null;
      e:
        for (; !this.scanner.eof; ) {
          switch (this.scanner.tokenType) {
            case Wr:
              this.scanner.next();
              continue;
            case ze:
              en = this.WhiteSpace();
              continue;
            case Yr:
              Zr = this.Identifier();
              break;
            case Qr:
              Zr = this.MediaFeature();
              break;
            default:
              break e;
          }
          en !== null && (Kr.push(en), en = null), Kr.push(Zr);
        }
      return Zr === null && this.error("Identifier or parenthesis is expected"), {
        type: "MediaQuery",
        loc: this.getLocationFromList(Kr),
        children: Kr
      };
    },
    generate: function(Kr) {
      this.children(Kr);
    }
  }, MediaQuery;
}
var MediaQueryList, hasRequiredMediaQueryList;
function requireMediaQueryList() {
  if (hasRequiredMediaQueryList) return MediaQueryList;
  hasRequiredMediaQueryList = 1;
  var Gr = requireTokenizer$1().TYPE.Comma;
  return MediaQueryList = {
    name: "MediaQueryList",
    structure: {
      children: [[
        "MediaQuery"
      ]]
    },
    parse: function(ze) {
      var Wr = this.createList();
      for (this.scanner.skipSC(); !this.scanner.eof && (Wr.push(this.MediaQuery(ze)), this.scanner.tokenType === Gr); )
        this.scanner.next();
      return {
        type: "MediaQueryList",
        loc: this.getLocationFromList(Wr),
        children: Wr
      };
    },
    generate: function(ze) {
      this.children(ze, function() {
        this.chunk(",");
      });
    }
  }, MediaQueryList;
}
var Nth, hasRequiredNth$1;
function requireNth$1() {
  return hasRequiredNth$1 || (hasRequiredNth$1 = 1, Nth = {
    name: "Nth",
    structure: {
      nth: ["AnPlusB", "Identifier"],
      selector: ["SelectorList", null]
    },
    parse: function(Gr) {
      this.scanner.skipSC();
      var ze = this.scanner.tokenStart, Wr = ze, Yr = null, Qr;
      return this.scanner.lookupValue(0, "odd") || this.scanner.lookupValue(0, "even") ? Qr = this.Identifier() : Qr = this.AnPlusB(), this.scanner.skipSC(), Gr && this.scanner.lookupValue(0, "of") ? (this.scanner.next(), Yr = this.SelectorList(), this.needPositions && (Wr = this.getLastListNode(Yr.children).loc.end.offset)) : this.needPositions && (Wr = Qr.loc.end.offset), {
        type: "Nth",
        loc: this.getLocation(ze, Wr),
        nth: Qr,
        selector: Yr
      };
    },
    generate: function(Gr) {
      this.node(Gr.nth), Gr.selector !== null && (this.chunk(" of "), this.node(Gr.selector));
    }
  }), Nth;
}
var _Number, hasRequired_Number;
function require_Number() {
  if (hasRequired_Number) return _Number;
  hasRequired_Number = 1;
  var Gr = requireTokenizer$1().TYPE.Number;
  return _Number = {
    name: "Number",
    structure: {
      value: String
    },
    parse: function() {
      return {
        type: "Number",
        loc: this.getLocation(this.scanner.tokenStart, this.scanner.tokenEnd),
        value: this.consume(Gr)
      };
    },
    generate: function(ze) {
      this.chunk(ze.value);
    }
  }, _Number;
}
var Operator, hasRequiredOperator;
function requireOperator() {
  return hasRequiredOperator || (hasRequiredOperator = 1, Operator = {
    name: "Operator",
    structure: {
      value: String
    },
    parse: function() {
      var Gr = this.scanner.tokenStart;
      return this.scanner.next(), {
        type: "Operator",
        loc: this.getLocation(Gr, this.scanner.tokenStart),
        value: this.scanner.substrToCursor(Gr)
      };
    },
    generate: function(Gr) {
      this.chunk(Gr.value);
    }
  }), Operator;
}
var Parentheses, hasRequiredParentheses;
function requireParentheses() {
  if (hasRequiredParentheses) return Parentheses;
  hasRequiredParentheses = 1;
  var Gr = requireTokenizer$1().TYPE, ze = Gr.LeftParenthesis, Wr = Gr.RightParenthesis;
  return Parentheses = {
    name: "Parentheses",
    structure: {
      children: [[]]
    },
    parse: function(Yr, Qr) {
      var Kr = this.scanner.tokenStart, Zr = null;
      return this.eat(ze), Zr = Yr.call(this, Qr), this.scanner.eof || this.eat(Wr), {
        type: "Parentheses",
        loc: this.getLocation(Kr, this.scanner.tokenStart),
        children: Zr
      };
    },
    generate: function(Yr) {
      this.chunk("("), this.children(Yr), this.chunk(")");
    }
  }, Parentheses;
}
var Percentage, hasRequiredPercentage;
function requirePercentage() {
  if (hasRequiredPercentage) return Percentage;
  hasRequiredPercentage = 1;
  var Gr = requireUtils().consumeNumber, ze = requireTokenizer$1().TYPE, Wr = ze.Percentage;
  return Percentage = {
    name: "Percentage",
    structure: {
      value: String
    },
    parse: function() {
      var Yr = this.scanner.tokenStart, Qr = Gr(this.scanner.source, Yr);
      return this.eat(Wr), {
        type: "Percentage",
        loc: this.getLocation(Yr, this.scanner.tokenStart),
        value: this.scanner.source.substring(Yr, Qr)
      };
    },
    generate: function(Yr) {
      this.chunk(Yr.value), this.chunk("%");
    }
  }, Percentage;
}
var PseudoClassSelector, hasRequiredPseudoClassSelector;
function requirePseudoClassSelector() {
  if (hasRequiredPseudoClassSelector) return PseudoClassSelector;
  hasRequiredPseudoClassSelector = 1;
  var Gr = requireTokenizer$1().TYPE, ze = Gr.Ident, Wr = Gr.Function, Yr = Gr.Colon, Qr = Gr.RightParenthesis;
  return PseudoClassSelector = {
    name: "PseudoClassSelector",
    structure: {
      name: String,
      children: [["Raw"], null]
    },
    parse: function() {
      var Kr = this.scanner.tokenStart, Zr = null, en, tn;
      return this.eat(Yr), this.scanner.tokenType === Wr ? (en = this.consumeFunctionName(), tn = en.toLowerCase(), this.pseudo.hasOwnProperty(tn) ? (this.scanner.skipSC(), Zr = this.pseudo[tn].call(this), this.scanner.skipSC()) : (Zr = this.createList(), Zr.push(
        this.Raw(this.scanner.tokenIndex, null, !1)
      )), this.eat(Qr)) : en = this.consume(ze), {
        type: "PseudoClassSelector",
        loc: this.getLocation(Kr, this.scanner.tokenStart),
        name: en,
        children: Zr
      };
    },
    generate: function(Kr) {
      this.chunk(":"), this.chunk(Kr.name), Kr.children !== null && (this.chunk("("), this.children(Kr), this.chunk(")"));
    },
    walkContext: "function"
  }, PseudoClassSelector;
}
var PseudoElementSelector, hasRequiredPseudoElementSelector;
function requirePseudoElementSelector() {
  if (hasRequiredPseudoElementSelector) return PseudoElementSelector;
  hasRequiredPseudoElementSelector = 1;
  var Gr = requireTokenizer$1().TYPE, ze = Gr.Ident, Wr = Gr.Function, Yr = Gr.Colon, Qr = Gr.RightParenthesis;
  return PseudoElementSelector = {
    name: "PseudoElementSelector",
    structure: {
      name: String,
      children: [["Raw"], null]
    },
    parse: function() {
      var Kr = this.scanner.tokenStart, Zr = null, en, tn;
      return this.eat(Yr), this.eat(Yr), this.scanner.tokenType === Wr ? (en = this.consumeFunctionName(), tn = en.toLowerCase(), this.pseudo.hasOwnProperty(tn) ? (this.scanner.skipSC(), Zr = this.pseudo[tn].call(this), this.scanner.skipSC()) : (Zr = this.createList(), Zr.push(
        this.Raw(this.scanner.tokenIndex, null, !1)
      )), this.eat(Qr)) : en = this.consume(ze), {
        type: "PseudoElementSelector",
        loc: this.getLocation(Kr, this.scanner.tokenStart),
        name: en,
        children: Zr
      };
    },
    generate: function(Kr) {
      this.chunk("::"), this.chunk(Kr.name), Kr.children !== null && (this.chunk("("), this.children(Kr), this.chunk(")"));
    },
    walkContext: "function"
  }, PseudoElementSelector;
}
var Ratio, hasRequiredRatio;
function requireRatio() {
  if (hasRequiredRatio) return Ratio;
  hasRequiredRatio = 1;
  var Gr = requireTokenizer$1().isDigit, ze = requireTokenizer$1().TYPE, Wr = ze.Number, Yr = ze.Delim, Qr = 47, Kr = 46;
  function Zr() {
    this.scanner.skipWS();
    for (var en = this.consume(Wr), tn = 0; tn < en.length; tn++) {
      var rn = en.charCodeAt(tn);
      !Gr(rn) && rn !== Kr && this.error("Unsigned number is expected", this.scanner.tokenStart - en.length + tn);
    }
    return Number(en) === 0 && this.error("Zero number is not allowed", this.scanner.tokenStart - en.length), en;
  }
  return Ratio = {
    name: "Ratio",
    structure: {
      left: String,
      right: String
    },
    parse: function() {
      var en = this.scanner.tokenStart, tn = Zr.call(this), rn;
      return this.scanner.skipWS(), this.scanner.isDelim(Qr) || this.error("Solidus is expected"), this.eat(Yr), rn = Zr.call(this), {
        type: "Ratio",
        loc: this.getLocation(en, this.scanner.tokenStart),
        left: tn,
        right: rn
      };
    },
    generate: function(en) {
      this.chunk(en.left), this.chunk("/"), this.chunk(en.right);
    }
  }, Ratio;
}
var Rule, hasRequiredRule;
function requireRule() {
  if (hasRequiredRule) return Rule;
  hasRequiredRule = 1;
  var Gr = requireTokenizer$1().TYPE, ze = requireRaw().mode, Wr = Gr.LeftCurlyBracket;
  function Yr(Kr) {
    return this.Raw(Kr, ze.leftCurlyBracket, !0);
  }
  function Qr() {
    var Kr = this.SelectorList();
    return Kr.type !== "Raw" && this.scanner.eof === !1 && this.scanner.tokenType !== Wr && this.error(), Kr;
  }
  return Rule = {
    name: "Rule",
    structure: {
      prelude: ["SelectorList", "Raw"],
      block: ["Block"]
    },
    parse: function() {
      var Kr = this.scanner.tokenIndex, Zr = this.scanner.tokenStart, en, tn;
      return this.parseRulePrelude ? en = this.parseWithFallback(Qr, Yr) : en = Yr.call(this, Kr), tn = this.Block(!0), {
        type: "Rule",
        loc: this.getLocation(Zr, this.scanner.tokenStart),
        prelude: en,
        block: tn
      };
    },
    generate: function(Kr) {
      this.node(Kr.prelude), this.node(Kr.block);
    },
    walkContext: "rule"
  }, Rule;
}
var Selector, hasRequiredSelector$1;
function requireSelector$1() {
  return hasRequiredSelector$1 || (hasRequiredSelector$1 = 1, Selector = {
    name: "Selector",
    structure: {
      children: [[
        "TypeSelector",
        "IdSelector",
        "ClassSelector",
        "AttributeSelector",
        "PseudoClassSelector",
        "PseudoElementSelector",
        "Combinator",
        "WhiteSpace"
      ]]
    },
    parse: function() {
      var Gr = this.readSequence(this.scope.Selector);
      return this.getFirstListNode(Gr) === null && this.error("Selector is expected"), {
        type: "Selector",
        loc: this.getLocationFromList(Gr),
        children: Gr
      };
    },
    generate: function(Gr) {
      this.children(Gr);
    }
  }), Selector;
}
var SelectorList, hasRequiredSelectorList$1;
function requireSelectorList$1() {
  if (hasRequiredSelectorList$1) return SelectorList;
  hasRequiredSelectorList$1 = 1;
  var Gr = requireTokenizer$1().TYPE, ze = Gr.Comma;
  return SelectorList = {
    name: "SelectorList",
    structure: {
      children: [[
        "Selector",
        "Raw"
      ]]
    },
    parse: function() {
      for (var Wr = this.createList(); !this.scanner.eof; ) {
        if (Wr.push(this.Selector()), this.scanner.tokenType === ze) {
          this.scanner.next();
          continue;
        }
        break;
      }
      return {
        type: "SelectorList",
        loc: this.getLocationFromList(Wr),
        children: Wr
      };
    },
    generate: function(Wr) {
      this.children(Wr, function() {
        this.chunk(",");
      });
    },
    walkContext: "selector"
  }, SelectorList;
}
var _String, hasRequired_String;
function require_String() {
  if (hasRequired_String) return _String;
  hasRequired_String = 1;
  var Gr = requireTokenizer$1().TYPE.String;
  return _String = {
    name: "String",
    structure: {
      value: String
    },
    parse: function() {
      return {
        type: "String",
        loc: this.getLocation(this.scanner.tokenStart, this.scanner.tokenEnd),
        value: this.consume(Gr)
      };
    },
    generate: function(ze) {
      this.chunk(ze.value);
    }
  }, _String;
}
var StyleSheet, hasRequiredStyleSheet;
function requireStyleSheet() {
  if (hasRequiredStyleSheet) return StyleSheet;
  hasRequiredStyleSheet = 1;
  var Gr = requireTokenizer$1().TYPE, ze = Gr.WhiteSpace, Wr = Gr.Comment, Yr = Gr.AtKeyword, Qr = Gr.CDO, Kr = Gr.CDC, Zr = 33;
  function en(tn) {
    return this.Raw(tn, null, !1);
  }
  return StyleSheet = {
    name: "StyleSheet",
    structure: {
      children: [[
        "Comment",
        "CDO",
        "CDC",
        "Atrule",
        "Rule",
        "Raw"
      ]]
    },
    parse: function() {
      for (var tn = this.scanner.tokenStart, rn = this.createList(), sn; !this.scanner.eof; ) {
        switch (this.scanner.tokenType) {
          case ze:
            this.scanner.next();
            continue;
          case Wr:
            if (this.scanner.source.charCodeAt(this.scanner.tokenStart + 2) !== Zr) {
              this.scanner.next();
              continue;
            }
            sn = this.Comment();
            break;
          case Qr:
            sn = this.CDO();
            break;
          case Kr:
            sn = this.CDC();
            break;
          // CSS Syntax Module Level 3
          // §2.2 Error handling
          // At the "top level" of a stylesheet, an <at-keyword-token> starts an at-rule.
          case Yr:
            sn = this.parseWithFallback(this.Atrule, en);
            break;
          // Anything else starts a qualified rule ...
          default:
            sn = this.parseWithFallback(this.Rule, en);
        }
        rn.push(sn);
      }
      return {
        type: "StyleSheet",
        loc: this.getLocation(tn, this.scanner.tokenStart),
        children: rn
      };
    },
    generate: function(tn) {
      this.children(tn);
    },
    walkContext: "stylesheet"
  }, StyleSheet;
}
var TypeSelector, hasRequiredTypeSelector;
function requireTypeSelector() {
  if (hasRequiredTypeSelector) return TypeSelector;
  hasRequiredTypeSelector = 1;
  var Gr = requireTokenizer$1().TYPE, ze = Gr.Ident, Wr = 42, Yr = 124;
  function Qr() {
    this.scanner.tokenType !== ze && this.scanner.isDelim(Wr) === !1 && this.error("Identifier or asterisk is expected"), this.scanner.next();
  }
  return TypeSelector = {
    name: "TypeSelector",
    structure: {
      name: String
    },
    parse: function() {
      var Kr = this.scanner.tokenStart;
      return this.scanner.isDelim(Yr) ? (this.scanner.next(), Qr.call(this)) : (Qr.call(this), this.scanner.isDelim(Yr) && (this.scanner.next(), Qr.call(this))), {
        type: "TypeSelector",
        loc: this.getLocation(Kr, this.scanner.tokenStart),
        name: this.scanner.substrToCursor(Kr)
      };
    },
    generate: function(Kr) {
      this.chunk(Kr.name);
    }
  }, TypeSelector;
}
var UnicodeRange, hasRequiredUnicodeRange;
function requireUnicodeRange() {
  if (hasRequiredUnicodeRange) return UnicodeRange;
  hasRequiredUnicodeRange = 1;
  var Gr = requireTokenizer$1().isHexDigit, ze = requireTokenizer$1().cmpChar, Wr = requireTokenizer$1().TYPE, Yr = requireTokenizer$1().NAME, Qr = Wr.Ident, Kr = Wr.Number, Zr = Wr.Dimension, en = 43, tn = 45, rn = 63, sn = 117;
  function on(mn, vn) {
    for (var xn = this.scanner.tokenStart + mn, gn = 0; xn < this.scanner.tokenEnd; xn++) {
      var un = this.scanner.source.charCodeAt(xn);
      if (un === tn && vn && gn !== 0)
        return on.call(this, mn + gn + 1, !1) === 0 && this.error(), -1;
      Gr(un) || this.error(
        vn && gn !== 0 ? "HyphenMinus" + (gn < 6 ? " or hex digit" : "") + " is expected" : gn < 6 ? "Hex digit is expected" : "Unexpected input",
        xn
      ), ++gn > 6 && this.error("Too many hex digits", xn);
    }
    return this.scanner.next(), gn;
  }
  function an(mn) {
    for (var vn = 0; this.scanner.isDelim(rn); )
      ++vn > mn && this.error("Too many question marks"), this.scanner.next();
  }
  function dn(mn) {
    this.scanner.source.charCodeAt(this.scanner.tokenStart) !== mn && this.error(Yr[mn] + " is expected");
  }
  function pn() {
    var mn = 0;
    if (this.scanner.isDelim(en)) {
      if (this.scanner.next(), this.scanner.tokenType === Qr) {
        mn = on.call(this, 0, !0), mn > 0 && an.call(this, 6 - mn);
        return;
      }
      if (this.scanner.isDelim(rn)) {
        this.scanner.next(), an.call(this, 5);
        return;
      }
      this.error("Hex digit or question mark is expected");
      return;
    }
    if (this.scanner.tokenType === Kr) {
      if (dn.call(this, en), mn = on.call(this, 1, !0), this.scanner.isDelim(rn)) {
        an.call(this, 6 - mn);
        return;
      }
      if (this.scanner.tokenType === Zr || this.scanner.tokenType === Kr) {
        dn.call(this, tn), on.call(this, 1, !1);
        return;
      }
      return;
    }
    if (this.scanner.tokenType === Zr) {
      dn.call(this, en), mn = on.call(this, 1, !0), mn > 0 && an.call(this, 6 - mn);
      return;
    }
    this.error();
  }
  return UnicodeRange = {
    name: "UnicodeRange",
    structure: {
      value: String
    },
    parse: function() {
      var mn = this.scanner.tokenStart;
      return ze(this.scanner.source, mn, sn) || this.error("U is expected"), ze(this.scanner.source, mn + 1, en) || this.error("Plus sign is expected"), this.scanner.next(), pn.call(this), {
        type: "UnicodeRange",
        loc: this.getLocation(mn, this.scanner.tokenStart),
        value: this.scanner.substrToCursor(mn)
      };
    },
    generate: function(mn) {
      this.chunk(mn.value);
    }
  }, UnicodeRange;
}
var Url, hasRequiredUrl;
function requireUrl() {
  if (hasRequiredUrl) return Url;
  hasRequiredUrl = 1;
  var Gr = requireTokenizer$1().isWhiteSpace, ze = requireTokenizer$1().cmpStr, Wr = requireTokenizer$1().TYPE, Yr = Wr.Function, Qr = Wr.Url, Kr = Wr.RightParenthesis;
  return Url = {
    name: "Url",
    structure: {
      value: ["String", "Raw"]
    },
    parse: function() {
      var Zr = this.scanner.tokenStart, en;
      switch (this.scanner.tokenType) {
        case Qr:
          for (var tn = Zr + 4, rn = this.scanner.tokenEnd - 1; tn < rn && Gr(this.scanner.source.charCodeAt(tn)); )
            tn++;
          for (; tn < rn && Gr(this.scanner.source.charCodeAt(rn - 1)); )
            rn--;
          en = {
            type: "Raw",
            loc: this.getLocation(tn, rn),
            value: this.scanner.source.substring(tn, rn)
          }, this.eat(Qr);
          break;
        case Yr:
          ze(this.scanner.source, this.scanner.tokenStart, this.scanner.tokenEnd, "url(") || this.error("Function name must be `url`"), this.eat(Yr), this.scanner.skipSC(), en = this.String(), this.scanner.skipSC(), this.eat(Kr);
          break;
        default:
          this.error("Url or Function is expected");
      }
      return {
        type: "Url",
        loc: this.getLocation(Zr, this.scanner.tokenStart),
        value: en
      };
    },
    generate: function(Zr) {
      this.chunk("url"), this.chunk("("), this.node(Zr.value), this.chunk(")");
    }
  }, Url;
}
var Value, hasRequiredValue$1;
function requireValue$1() {
  return hasRequiredValue$1 || (hasRequiredValue$1 = 1, Value = {
    name: "Value",
    structure: {
      children: [[]]
    },
    parse: function() {
      var Gr = this.scanner.tokenStart, ze = this.readSequence(this.scope.Value);
      return {
        type: "Value",
        loc: this.getLocation(Gr, this.scanner.tokenStart),
        children: ze
      };
    },
    generate: function(Gr) {
      this.children(Gr);
    }
  }), Value;
}
var WhiteSpace, hasRequiredWhiteSpace;
function requireWhiteSpace() {
  if (hasRequiredWhiteSpace) return WhiteSpace;
  hasRequiredWhiteSpace = 1;
  var Gr = requireTokenizer$1().TYPE.WhiteSpace, ze = Object.freeze({
    type: "WhiteSpace",
    loc: null,
    value: " "
  });
  return WhiteSpace = {
    name: "WhiteSpace",
    structure: {
      value: String
    },
    parse: function() {
      return this.eat(Gr), ze;
    },
    generate: function(Wr) {
      this.chunk(Wr.value);
    }
  }, WhiteSpace;
}
var node, hasRequiredNode;
function requireNode() {
  return hasRequiredNode || (hasRequiredNode = 1, node = {
    AnPlusB: requireAnPlusB(),
    Atrule: requireAtrule$1(),
    AtrulePrelude: requireAtrulePrelude$1(),
    AttributeSelector: requireAttributeSelector(),
    Block: requireBlock(),
    Brackets: requireBrackets(),
    CDC: requireCDC(),
    CDO: requireCDO(),
    ClassSelector: requireClassSelector(),
    Combinator: requireCombinator(),
    Comment: requireComment(),
    Declaration: requireDeclaration(),
    DeclarationList: requireDeclarationList(),
    Dimension: requireDimension(),
    Function: require_Function(),
    Hash: requireHash(),
    Identifier: requireIdentifier(),
    IdSelector: requireIdSelector(),
    MediaFeature: requireMediaFeature(),
    MediaQuery: requireMediaQuery(),
    MediaQueryList: requireMediaQueryList(),
    Nth: requireNth$1(),
    Number: require_Number(),
    Operator: requireOperator(),
    Parentheses: requireParentheses(),
    Percentage: requirePercentage(),
    PseudoClassSelector: requirePseudoClassSelector(),
    PseudoElementSelector: requirePseudoElementSelector(),
    Ratio: requireRatio(),
    Raw: requireRaw(),
    Rule: requireRule(),
    Selector: requireSelector$1(),
    SelectorList: requireSelectorList$1(),
    String: require_String(),
    StyleSheet: requireStyleSheet(),
    TypeSelector: requireTypeSelector(),
    UnicodeRange: requireUnicodeRange(),
    Url: requireUrl(),
    Value: requireValue$1(),
    WhiteSpace: requireWhiteSpace()
  }), node;
}
var lexer, hasRequiredLexer;
function requireLexer() {
  if (hasRequiredLexer) return lexer;
  hasRequiredLexer = 1;
  var Gr = requireData();
  return lexer = {
    generic: !0,
    types: Gr.types,
    atrules: Gr.atrules,
    properties: Gr.properties,
    node: requireNode()
  }, lexer;
}
var _default, hasRequired_default;
function require_default() {
  if (hasRequired_default) return _default;
  hasRequired_default = 1;
  var Gr = requireTokenizer$1().cmpChar, ze = requireTokenizer$1().cmpStr, Wr = requireTokenizer$1().TYPE, Yr = Wr.Ident, Qr = Wr.String, Kr = Wr.Number, Zr = Wr.Function, en = Wr.Url, tn = Wr.Hash, rn = Wr.Dimension, sn = Wr.Percentage, on = Wr.LeftParenthesis, an = Wr.LeftSquareBracket, dn = Wr.Comma, pn = Wr.Delim, mn = 35, vn = 42, xn = 43, gn = 45, un = 47, fn = 117;
  return _default = function(Cn) {
    switch (this.scanner.tokenType) {
      case tn:
        return this.Hash();
      case dn:
        return Cn.space = null, Cn.ignoreWSAfter = !0, this.Operator();
      case on:
        return this.Parentheses(this.readSequence, Cn.recognizer);
      case an:
        return this.Brackets(this.readSequence, Cn.recognizer);
      case Qr:
        return this.String();
      case rn:
        return this.Dimension();
      case sn:
        return this.Percentage();
      case Kr:
        return this.Number();
      case Zr:
        return ze(this.scanner.source, this.scanner.tokenStart, this.scanner.tokenEnd, "url(") ? this.Url() : this.Function(this.readSequence, Cn.recognizer);
      case en:
        return this.Url();
      case Yr:
        return Gr(this.scanner.source, this.scanner.tokenStart, fn) && Gr(this.scanner.source, this.scanner.tokenStart + 1, xn) ? this.UnicodeRange() : this.Identifier();
      case pn:
        var bn = this.scanner.source.charCodeAt(this.scanner.tokenStart);
        if (bn === un || bn === vn || bn === xn || bn === gn)
          return this.Operator();
        bn === mn && this.error("Hex or identifier is expected", this.scanner.tokenStart + 1);
        break;
    }
  }, _default;
}
var atrulePrelude, hasRequiredAtrulePrelude;
function requireAtrulePrelude() {
  return hasRequiredAtrulePrelude || (hasRequiredAtrulePrelude = 1, atrulePrelude = {
    getNode: require_default()
  }), atrulePrelude;
}
var selector, hasRequiredSelector;
function requireSelector() {
  if (hasRequiredSelector) return selector;
  hasRequiredSelector = 1;
  var Gr = requireTokenizer$1().TYPE, ze = Gr.Delim, Wr = Gr.Ident, Yr = Gr.Dimension, Qr = Gr.Percentage, Kr = Gr.Number, Zr = Gr.Hash, en = Gr.Colon, tn = Gr.LeftSquareBracket, rn = 35, sn = 42, on = 43, an = 47, dn = 46, pn = 62, mn = 124, vn = 126;
  function xn(gn) {
    switch (this.scanner.tokenType) {
      case tn:
        return this.AttributeSelector();
      case Zr:
        return this.IdSelector();
      case en:
        return this.scanner.lookupType(1) === en ? this.PseudoElementSelector() : this.PseudoClassSelector();
      case Wr:
        return this.TypeSelector();
      case Kr:
      case Qr:
        return this.Percentage();
      case Yr:
        this.scanner.source.charCodeAt(this.scanner.tokenStart) === dn && this.error("Identifier is expected", this.scanner.tokenStart + 1);
        break;
      case ze:
        var un = this.scanner.source.charCodeAt(this.scanner.tokenStart);
        switch (un) {
          case on:
          case pn:
          case vn:
            return gn.space = null, gn.ignoreWSAfter = !0, this.Combinator();
          case an:
            return this.Combinator();
          case dn:
            return this.ClassSelector();
          case sn:
          case mn:
            return this.TypeSelector();
          case rn:
            return this.IdSelector();
        }
        break;
    }
  }
  return selector = {
    getNode: xn
  }, selector;
}
var expression, hasRequiredExpression;
function requireExpression() {
  return hasRequiredExpression || (hasRequiredExpression = 1, expression = function() {
    return this.createSingleNodeList(
      this.Raw(this.scanner.tokenIndex, null, !1)
    );
  }), expression;
}
var _var, hasRequired_var;
function require_var() {
  if (hasRequired_var) return _var;
  hasRequired_var = 1;
  var Gr = requireTokenizer$1().TYPE, ze = requireRaw().mode, Wr = Gr.Comma, Yr = Gr.WhiteSpace;
  return _var = function() {
    var Qr = this.createList();
    if (this.scanner.skipSC(), Qr.push(this.Identifier()), this.scanner.skipSC(), this.scanner.tokenType === Wr) {
      Qr.push(this.Operator());
      const Kr = this.scanner.tokenIndex, Zr = this.parseCustomProperty ? this.Value(null) : this.Raw(this.scanner.tokenIndex, ze.exclamationMarkOrSemicolon, !1);
      if (Zr.type === "Value" && Zr.children.isEmpty()) {
        for (let en = Kr - this.scanner.tokenIndex; en <= 0; en++)
          if (this.scanner.lookupType(en) === Yr) {
            Zr.children.appendData({
              type: "WhiteSpace",
              loc: null,
              value: " "
            });
            break;
          }
      }
      Qr.push(Zr);
    }
    return Qr;
  }, _var;
}
var value, hasRequiredValue;
function requireValue() {
  return hasRequiredValue || (hasRequiredValue = 1, value = {
    getNode: require_default(),
    expression: requireExpression(),
    var: require_var()
  }), value;
}
var scope, hasRequiredScope;
function requireScope() {
  return hasRequiredScope || (hasRequiredScope = 1, scope = {
    AtrulePrelude: requireAtrulePrelude(),
    Selector: requireSelector(),
    Value: requireValue()
  }), scope;
}
var fontFace, hasRequiredFontFace;
function requireFontFace() {
  return hasRequiredFontFace || (hasRequiredFontFace = 1, fontFace = {
    parse: {
      prelude: null,
      block: function() {
        return this.Block(!0);
      }
    }
  }), fontFace;
}
var _import, hasRequired_import;
function require_import() {
  if (hasRequired_import) return _import;
  hasRequired_import = 1;
  var Gr = requireTokenizer$1().TYPE, ze = Gr.String, Wr = Gr.Ident, Yr = Gr.Url, Qr = Gr.Function, Kr = Gr.LeftParenthesis;
  return _import = {
    parse: {
      prelude: function() {
        var Zr = this.createList();
        switch (this.scanner.skipSC(), this.scanner.tokenType) {
          case ze:
            Zr.push(this.String());
            break;
          case Yr:
          case Qr:
            Zr.push(this.Url());
            break;
          default:
            this.error("String or url() is expected");
        }
        return (this.lookupNonWSType(0) === Wr || this.lookupNonWSType(0) === Kr) && (Zr.push(this.WhiteSpace()), Zr.push(this.MediaQueryList())), Zr;
      },
      block: null
    }
  }, _import;
}
var media, hasRequiredMedia;
function requireMedia() {
  return hasRequiredMedia || (hasRequiredMedia = 1, media = {
    parse: {
      prelude: function() {
        return this.createSingleNodeList(
          this.MediaQueryList()
        );
      },
      block: function() {
        return this.Block(!1);
      }
    }
  }), media;
}
var page, hasRequiredPage;
function requirePage() {
  return hasRequiredPage || (hasRequiredPage = 1, page = {
    parse: {
      prelude: function() {
        return this.createSingleNodeList(
          this.SelectorList()
        );
      },
      block: function() {
        return this.Block(!0);
      }
    }
  }), page;
}
var supports, hasRequiredSupports;
function requireSupports() {
  if (hasRequiredSupports) return supports;
  hasRequiredSupports = 1;
  var Gr = requireTokenizer$1().TYPE, ze = Gr.WhiteSpace, Wr = Gr.Comment, Yr = Gr.Ident, Qr = Gr.Function, Kr = Gr.Colon, Zr = Gr.LeftParenthesis;
  function en() {
    return this.createSingleNodeList(
      this.Raw(this.scanner.tokenIndex, null, !1)
    );
  }
  function tn() {
    return this.scanner.skipSC(), this.scanner.tokenType === Yr && this.lookupNonWSType(1) === Kr ? this.createSingleNodeList(
      this.Declaration()
    ) : rn.call(this);
  }
  function rn() {
    var sn = this.createList(), on = null, an;
    this.scanner.skipSC();
    e:
      for (; !this.scanner.eof; ) {
        switch (this.scanner.tokenType) {
          case ze:
            on = this.WhiteSpace();
            continue;
          case Wr:
            this.scanner.next();
            continue;
          case Qr:
            an = this.Function(en, this.scope.AtrulePrelude);
            break;
          case Yr:
            an = this.Identifier();
            break;
          case Zr:
            an = this.Parentheses(tn, this.scope.AtrulePrelude);
            break;
          default:
            break e;
        }
        on !== null && (sn.push(on), on = null), sn.push(an);
      }
    return sn;
  }
  return supports = {
    parse: {
      prelude: function() {
        var sn = rn.call(this);
        return this.getFirstListNode(sn) === null && this.error("Condition is expected"), sn;
      },
      block: function() {
        return this.Block(!1);
      }
    }
  }, supports;
}
var atrule, hasRequiredAtrule;
function requireAtrule() {
  return hasRequiredAtrule || (hasRequiredAtrule = 1, atrule = {
    "font-face": requireFontFace(),
    import: require_import(),
    media: requireMedia(),
    page: requirePage(),
    supports: requireSupports()
  }), atrule;
}
var dir, hasRequiredDir;
function requireDir() {
  return hasRequiredDir || (hasRequiredDir = 1, dir = {
    parse: function() {
      return this.createSingleNodeList(
        this.Identifier()
      );
    }
  }), dir;
}
var has, hasRequiredHas;
function requireHas() {
  return hasRequiredHas || (hasRequiredHas = 1, has = {
    parse: function() {
      return this.createSingleNodeList(
        this.SelectorList()
      );
    }
  }), has;
}
var lang, hasRequiredLang;
function requireLang() {
  return hasRequiredLang || (hasRequiredLang = 1, lang = {
    parse: function() {
      return this.createSingleNodeList(
        this.Identifier()
      );
    }
  }), lang;
}
var selectorList, hasRequiredSelectorList;
function requireSelectorList() {
  return hasRequiredSelectorList || (hasRequiredSelectorList = 1, selectorList = {
    parse: function() {
      return this.createSingleNodeList(
        this.SelectorList()
      );
    }
  }), selectorList;
}
var matches, hasRequiredMatches;
function requireMatches() {
  return hasRequiredMatches || (hasRequiredMatches = 1, matches = requireSelectorList()), matches;
}
var not, hasRequiredNot;
function requireNot() {
  return hasRequiredNot || (hasRequiredNot = 1, not = requireSelectorList()), not;
}
var nthWithOfClause, hasRequiredNthWithOfClause;
function requireNthWithOfClause() {
  if (hasRequiredNthWithOfClause) return nthWithOfClause;
  hasRequiredNthWithOfClause = 1;
  var Gr = !0;
  return nthWithOfClause = {
    parse: function() {
      return this.createSingleNodeList(
        this.Nth(Gr)
      );
    }
  }, nthWithOfClause;
}
var nthChild, hasRequiredNthChild;
function requireNthChild() {
  return hasRequiredNthChild || (hasRequiredNthChild = 1, nthChild = requireNthWithOfClause()), nthChild;
}
var nthLastChild, hasRequiredNthLastChild;
function requireNthLastChild() {
  return hasRequiredNthLastChild || (hasRequiredNthLastChild = 1, nthLastChild = requireNthWithOfClause()), nthLastChild;
}
var nth, hasRequiredNth;
function requireNth() {
  if (hasRequiredNth) return nth;
  hasRequiredNth = 1;
  var Gr = !1;
  return nth = {
    parse: function() {
      return this.createSingleNodeList(
        this.Nth(Gr)
      );
    }
  }, nth;
}
var nthLastOfType, hasRequiredNthLastOfType;
function requireNthLastOfType() {
  return hasRequiredNthLastOfType || (hasRequiredNthLastOfType = 1, nthLastOfType = requireNth()), nthLastOfType;
}
var nthOfType, hasRequiredNthOfType;
function requireNthOfType() {
  return hasRequiredNthOfType || (hasRequiredNthOfType = 1, nthOfType = requireNth()), nthOfType;
}
var slotted, hasRequiredSlotted;
function requireSlotted() {
  return hasRequiredSlotted || (hasRequiredSlotted = 1, slotted = {
    parse: function() {
      return this.createSingleNodeList(
        this.Selector()
      );
    }
  }), slotted;
}
var pseudo, hasRequiredPseudo;
function requirePseudo() {
  return hasRequiredPseudo || (hasRequiredPseudo = 1, pseudo = {
    dir: requireDir(),
    has: requireHas(),
    lang: requireLang(),
    matches: requireMatches(),
    not: requireNot(),
    "nth-child": requireNthChild(),
    "nth-last-child": requireNthLastChild(),
    "nth-last-of-type": requireNthLastOfType(),
    "nth-of-type": requireNthOfType(),
    slotted: requireSlotted()
  }), pseudo;
}
var parser, hasRequiredParser;
function requireParser() {
  return hasRequiredParser || (hasRequiredParser = 1, parser = {
    parseContext: {
      default: "StyleSheet",
      stylesheet: "StyleSheet",
      atrule: "Atrule",
      atrulePrelude: function(Gr) {
        return this.AtrulePrelude(Gr.atrule ? String(Gr.atrule) : null);
      },
      mediaQueryList: "MediaQueryList",
      mediaQuery: "MediaQuery",
      rule: "Rule",
      selectorList: "SelectorList",
      selector: "Selector",
      block: function() {
        return this.Block(!0);
      },
      declarationList: "DeclarationList",
      declaration: "Declaration",
      value: "Value"
    },
    scope: requireScope(),
    atrule: requireAtrule(),
    pseudo: requirePseudo(),
    node: requireNode()
  }), parser;
}
var walker, hasRequiredWalker;
function requireWalker() {
  return hasRequiredWalker || (hasRequiredWalker = 1, walker = {
    node: requireNode()
  }), walker;
}
const version = "1.1.3", require$$4 = {
  version
};
var hasRequiredSyntax;
function requireSyntax() {
  if (hasRequiredSyntax) return syntax.exports;
  hasRequiredSyntax = 1;
  function Gr() {
    for (var ze = {}, Wr = 0; Wr < arguments.length; Wr++) {
      var Yr = arguments[Wr];
      for (var Qr in Yr)
        ze[Qr] = Yr[Qr];
    }
    return ze;
  }
  return syntax.exports = requireCreate().create(
    Gr(
      requireLexer(),
      requireParser(),
      requireWalker()
    )
  ), syntax.exports.version = require$$4.version, syntax.exports;
}
var lib, hasRequiredLib;
function requireLib() {
  return hasRequiredLib || (hasRequiredLib = 1, lib = requireSyntax()), lib;
}
var libExports = requireLib();
const csstree = /* @__PURE__ */ getDefaultExportFromCjs(libExports);
class Sheet {
  constructor(ze, Wr) {
    Wr ? this.hooks = Wr : (this.hooks = {}, this.hooks.onUrl = new Hook(this), this.hooks.onAtPage = new Hook(this), this.hooks.onAtMedia = new Hook(this), this.hooks.onRule = new Hook(this), this.hooks.onDeclaration = new Hook(this), this.hooks.onSelector = new Hook(this), this.hooks.onPseudoSelector = new Hook(this), this.hooks.onContent = new Hook(this), this.hooks.onImport = new Hook(this), this.hooks.beforeTreeParse = new Hook(this), this.hooks.beforeTreeWalk = new Hook(this), this.hooks.afterTreeWalk = new Hook(this));
    try {
      this.url = new URL(ze, window.location.href);
    } catch {
      this.url = new URL(window.location.href);
    }
  }
  // parse
  async parse(ze) {
    return this.text = ze, await this.hooks.beforeTreeParse.trigger(this.text, this), this.ast = csstree.parse(this._text), await this.hooks.beforeTreeWalk.trigger(this.ast), this.replaceUrls(this.ast), this.id = UUID(), this.replaceIds(this.ast), this.imported = [], this.urls(this.ast), this.rules(this.ast), this.atrules(this.ast), await this.hooks.afterTreeWalk.trigger(this.ast, this), this.ast;
  }
  insertRule(ze) {
    let Wr = this.ast.children.appendData(ze);
    return this.declarations(ze), Wr;
  }
  urls(ze) {
    csstree.walk(ze, {
      visit: "Url",
      enter: (Wr, Yr, Qr) => {
        this.hooks.onUrl.trigger(Wr, Yr, Qr);
      }
    });
  }
  atrules(ze) {
    csstree.walk(ze, {
      visit: "Atrule",
      enter: (Wr, Yr, Qr) => {
        const Kr = csstree.keyword(Wr.name).basename;
        Kr === "page" && (this.hooks.onAtPage.trigger(Wr, Yr, Qr), this.declarations(Wr, Yr, Qr)), Kr === "media" && (this.hooks.onAtMedia.trigger(Wr, Yr, Qr), this.declarations(Wr, Yr, Qr)), Kr === "import" && (this.hooks.onImport.trigger(Wr, Yr, Qr), this.imports(Wr, Yr, Qr));
      }
    });
  }
  rules(ze) {
    csstree.walk(ze, {
      visit: "Rule",
      enter: (Wr, Yr, Qr) => {
        this.hooks.onRule.trigger(Wr, Yr, Qr), this.declarations(Wr, Yr, Qr), this.onSelector(Wr, Yr, Qr);
      }
    });
  }
  declarations(ze, Wr, Yr) {
    csstree.walk(ze, {
      visit: "Declaration",
      enter: (Qr, Kr, Zr) => {
        this.hooks.onDeclaration.trigger(Qr, Kr, Zr, { ruleNode: ze, ruleItem: Wr, rulelist: Yr }), Qr.property === "content" && csstree.walk(Qr, {
          visit: "Function",
          enter: (en, tn, rn) => {
            this.hooks.onContent.trigger(en, tn, rn, { declarationNode: Qr, dItem: Kr, dList: Zr }, { ruleNode: ze, ruleItem: Wr, rulelist: Yr });
          }
        });
      }
    });
  }
  // add pseudo elements to parser
  onSelector(ze, Wr, Yr) {
    csstree.walk(ze, {
      visit: "Selector",
      enter: (Qr, Kr, Zr) => {
        this.hooks.onSelector.trigger(Qr, Kr, Zr, { ruleNode: ze, ruleItem: Wr, rulelist: Yr }), Qr.children.forEach((en) => {
          en.type === "PseudoElementSelector" && csstree.walk(en, {
            visit: "PseudoElementSelector",
            enter: (tn, rn, sn) => {
              this.hooks.onPseudoSelector.trigger(tn, rn, sn, { selectNode: Qr, selectItem: Kr, selectList: Zr }, { ruleNode: ze, ruleItem: Wr, rulelist: Yr });
            }
          });
        });
      }
    });
  }
  replaceUrls(ze) {
    csstree.walk(ze, {
      visit: "Url",
      enter: (Wr, Yr, Qr) => {
        let Kr = Wr.value.value;
        if (!(Wr.value.type === "Raw" && Kr.startsWith("data:") || Wr.value.type === "String" && (Kr.startsWith('"data:') || Kr.startsWith("'data:")))) {
          let Zr = Kr.replace(/["']/g, ""), en = new URL(Zr, this.url);
          Wr.value.value = en.toString();
        }
      }
    });
  }
  addScope(ze, Wr) {
    csstree.walk(ze, {
      visit: "Selector",
      enter: (Yr, Qr, Kr) => {
        let Zr = Yr.children;
        Zr.prepend(Zr.createItem({
          type: "WhiteSpace",
          value: " "
        })), Zr.prepend(Zr.createItem({
          type: "IdSelector",
          name: Wr,
          loc: null,
          children: null
        }));
      }
    });
  }
  getNamedPageSelectors(ze) {
    let Wr = {};
    return csstree.walk(ze, {
      visit: "Rule",
      enter: (Yr, Qr, Kr) => {
        csstree.walk(Yr, {
          visit: "Declaration",
          enter: (Zr, en, tn) => {
            if (Zr.property === "page") {
              let rn = Zr.value.children.first(), sn = rn.name, on = csstree.generate(Yr.prelude);
              Wr[sn] = {
                name: sn,
                selector: on
              }, Zr.property = "break-before", rn.type = "Identifier", rn.name = "always";
            }
          }
        });
      }
    }), Wr;
  }
  replaceIds(ze) {
    csstree.walk(ze, {
      visit: "Rule",
      enter: (Wr, Yr, Qr) => {
        csstree.walk(Wr, {
          visit: "IdSelector",
          enter: (Kr, Zr, en) => {
            let tn = Kr.name;
            Kr.flags = null, Kr.matcher = "=", Kr.name = { type: "Identifier", loc: null, name: "data-id" }, Kr.type = "AttributeSelector", Kr.value = { type: "String", loc: null, value: `"${tn}"` };
          }
        });
      }
    });
  }
  imports(ze, Wr, Yr) {
    let Qr = [];
    csstree.walk(ze, {
      visit: "MediaQuery",
      enter: (Zr, en, tn) => {
        csstree.walk(Zr, {
          visit: "Identifier",
          enter: (rn, sn, on) => {
            Qr.push(rn.name);
          }
        });
      }
    }), !Qr.some((Zr, en) => {
      let tn = Zr;
      return tn === "not" ? (tn = Qr[en + 1], !(tn === "screen" || tn === "speech")) : tn === "screen" || tn === "speech";
    }) && csstree.walk(ze, {
      visit: "String",
      enter: (Zr, en, tn) => {
        let rn = Zr.value.replace(/["']/g, ""), on = new URL(rn, this.url).toString();
        this.imported.push(on), Yr.remove(Wr);
      }
    });
  }
  set text(ze) {
    this._text = ze;
  }
  get text() {
    return this._text;
  }
  // generate string
  toString(ze) {
    return csstree.generate(ze || this.ast);
  }
}
const baseStyles = `
:root {
	--pagedjs-width: 8.5in;
	--pagedjs-height: 11in;
	--pagedjs-width-right: 8.5in;
	--pagedjs-height-right: 11in;
	--pagedjs-width-left: 8.5in;
	--pagedjs-height-left: 11in;
	--pagedjs-pagebox-width: 8.5in;
	--pagedjs-pagebox-height: 11in;
	--pagedjs-footnotes-height: 0mm;
	--pagedjs-margin-top: 1in;
	--pagedjs-margin-right: 1in;
	--pagedjs-margin-bottom: 1in;
	--pagedjs-margin-left: 1in;
	--pagedjs-padding-top: 0mm;
	--pagedjs-padding-right: 0mm;
	--pagedjs-padding-bottom: 0mm;
	--pagedjs-padding-left: 0mm;
	--pagedjs-border-top: 0mm;
	--pagedjs-border-right: 0mm;
	--pagedjs-border-bottom: 0mm;
	--pagedjs-border-left: 0mm;
	--pagedjs-bleed-top: 0mm;
	--pagedjs-bleed-right: 0mm;
	--pagedjs-bleed-bottom: 0mm;
	--pagedjs-bleed-left: 0mm;
	--pagedjs-bleed-right-top: 0mm;
	--pagedjs-bleed-right-right: 0mm;
	--pagedjs-bleed-right-bottom: 0mm;
	--pagedjs-bleed-right-left: 0mm;
	--pagedjs-bleed-left-top: 0mm;
	--pagedjs-bleed-left-right: 0mm;
	--pagedjs-bleed-left-bottom: 0mm;
	--pagedjs-bleed-left-left: 0mm;
	--pagedjs-crop-color: black;
	--pagedjs-crop-shadow: white;
	--pagedjs-crop-offset: 2mm;
	--pagedjs-crop-stroke: 1px;
	--pagedjs-cross-size: 5mm;
	--pagedjs-mark-cross-display: none;
	--pagedjs-mark-crop-display: none;
	--pagedjs-page-count: 0;
	--pagedjs-page-counter-increment: 1;
	--pagedjs-footnotes-count: 0;
	--pagedjs-column-gap-offset: 1000px;
}

@page {
	size: letter;
	margin: 0;
}

.pagedjs_sheet {
	box-sizing: border-box;
	width: var(--pagedjs-width);
	height: var(--pagedjs-height);
	overflow: hidden;
	position: relative;
	display: grid;
	grid-template-columns: [bleed-left] var(--pagedjs-bleed-left) [sheet-center] calc(var(--pagedjs-width) - var(--pagedjs-bleed-left) - var(--pagedjs-bleed-right)) [bleed-right] var(--pagedjs-bleed-right);
	grid-template-rows: [bleed-top] var(--pagedjs-bleed-top) [sheet-middle] calc(var(--pagedjs-height) - var(--pagedjs-bleed-top) - var(--pagedjs-bleed-bottom)) [bleed-bottom] var(--pagedjs-bleed-bottom);
}

.pagedjs_right_page .pagedjs_sheet {
	width: var(--pagedjs-width-right);
	height: var(--pagedjs-height-right);
	grid-template-columns: [bleed-left] var(--pagedjs-bleed-right-left) [sheet-center] calc(var(--pagedjs-width) - var(--pagedjs-bleed-right-left) - var(--pagedjs-bleed-right-right)) [bleed-right] var(--pagedjs-bleed-right-right);
	grid-template-rows: [bleed-top] var(--pagedjs-bleed-right-top) [sheet-middle] calc(var(--pagedjs-height) - var(--pagedjs-bleed-right-top) - var(--pagedjs-bleed-right-bottom)) [bleed-bottom] var(--pagedjs-bleed-right-bottom);
}

.pagedjs_left_page .pagedjs_sheet {
	width: var(--pagedjs-width-left);
	height: var(--pagedjs-height-left);
	grid-template-columns: [bleed-left] var(--pagedjs-bleed-left-left) [sheet-center] calc(var(--pagedjs-width) - var(--pagedjs-bleed-left-left) - var(--pagedjs-bleed-left-right)) [bleed-right] var(--pagedjs-bleed-left-right);
	grid-template-rows: [bleed-top] var(--pagedjs-bleed-left-top) [sheet-middle] calc(var(--pagedjs-height) - var(--pagedjs-bleed-left-top) - var(--pagedjs-bleed-left-bottom)) [bleed-bottom] var(--pagedjs-bleed-left-bottom);
}

.pagedjs_bleed {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: nowrap;
	overflow: hidden;
}

.pagedjs_bleed-top {
	grid-column: bleed-left / -1;
	grid-row: bleed-top;
	flex-direction: row;
}

.pagedjs_bleed-bottom {
	grid-column: bleed-left / -1;
	grid-row: bleed-bottom;
	flex-direction: row;
}

.pagedjs_bleed-left {
	grid-column: bleed-left;
	grid-row: bleed-top / -1;
	flex-direction: column;
}

.pagedjs_bleed-right {
	grid-column: bleed-right;
	grid-row: bleed-top / -1;
	flex-direction: column;
}

.pagedjs_marks-crop {
	display: var(--pagedjs-mark-crop-display);
	flex-grow: 0;
	flex-shrink: 0;
	z-index: 9999999999;
}

.pagedjs_bleed-top .pagedjs_marks-crop:nth-child(1),
.pagedjs_bleed-bottom .pagedjs_marks-crop:nth-child(1) {
	width: calc(var(--pagedjs-bleed-left) - var(--pagedjs-crop-stroke));
	border-right: var(--pagedjs-crop-stroke) solid var(--pagedjs-crop-color);
	box-shadow: 1px 0px 0px 0px var(--pagedjs-crop-shadow);
}

.pagedjs_right_page .pagedjs_bleed-top .pagedjs_marks-crop:nth-child(1),
.pagedjs_right_page .pagedjs_bleed-bottom .pagedjs_marks-crop:nth-child(1) {
	width: calc(var(--pagedjs-bleed-right-left) - var(--pagedjs-crop-stroke));
}

.pagedjs_left_page .pagedjs_bleed-top .pagedjs_marks-crop:nth-child(1),
.pagedjs_left_page .pagedjs_bleed-bottom .pagedjs_marks-crop:nth-child(1) {
	width: calc(var(--pagedjs-bleed-left-left) - var(--pagedjs-crop-stroke));
}

.pagedjs_bleed-top .pagedjs_marks-crop:nth-child(3),
.pagedjs_bleed-bottom .pagedjs_marks-crop:nth-child(3) {
	width: calc(var(--pagedjs-bleed-right) - var(--pagedjs-crop-stroke));
	border-left: var(--pagedjs-crop-stroke) solid var(--pagedjs-crop-color);
	box-shadow: -1px 0px 0px 0px var(--pagedjs-crop-shadow);
}

.pagedjs_right_page .pagedjs_bleed-top .pagedjs_marks-crop:nth-child(3),
.pagedjs_right_page .pagedjs_bleed-bottom .pagedjs_marks-crop:nth-child(3) {
	width: calc(var(--pagedjs-bleed-right-right) - var(--pagedjs-crop-stroke));
}

.pagedjs_left_page .pagedjs_bleed-top .pagedjs_marks-crop:nth-child(3),
.pagedjs_left_page .pagedjs_bleed-bottom .pagedjs_marks-crop:nth-child(3) {
	width: calc(var(--pagedjs-bleed-left-right) - var(--pagedjs-crop-stroke));
}

.pagedjs_bleed-top .pagedjs_marks-crop {
	align-self: flex-start;
	height: calc(var(--pagedjs-bleed-top) - var(--pagedjs-crop-offset));
}

.pagedjs_right_page .pagedjs_bleed-top .pagedjs_marks-crop {
	height: calc(var(--pagedjs-bleed-right-top) - var(--pagedjs-crop-offset));
}

.pagedjs_left_page .pagedjs_bleed-top .pagedjs_marks-crop {
	height: calc(var(--pagedjs-bleed-left-top) - var(--pagedjs-crop-offset));
}

.pagedjs_bleed-bottom .pagedjs_marks-crop {
	align-self: flex-end;
	height: calc(var(--pagedjs-bleed-bottom) - var(--pagedjs-crop-offset));
}

.pagedjs_right_page .pagedjs_bleed-bottom .pagedjs_marks-crop {
	height: calc(var(--pagedjs-bleed-right-bottom) - var(--pagedjs-crop-offset));
}

.pagedjs_left_page .pagedjs_bleed-bottom .pagedjs_marks-crop {
	height: calc(var(--pagedjs-bleed-left-bottom) - var(--pagedjs-crop-offset));
}

.pagedjs_bleed-left .pagedjs_marks-crop:nth-child(1),
.pagedjs_bleed-right .pagedjs_marks-crop:nth-child(1) {
	height: calc(var(--pagedjs-bleed-top) - var(--pagedjs-crop-stroke));
	border-bottom: var(--pagedjs-crop-stroke) solid var(--pagedjs-crop-color);
	box-shadow: 0px 1px 0px 0px var(--pagedjs-crop-shadow);
}

.pagedjs_right_page .pagedjs_bleed-left .pagedjs_marks-crop:nth-child(1),
.pagedjs_right_page .pagedjs_bleed-right .pagedjs_marks-crop:nth-child(1) {
	height: calc(var(--pagedjs-bleed-right-top) - var(--pagedjs-crop-stroke));
}

.pagedjs_left_page .pagedjs_bleed-left .pagedjs_marks-crop:nth-child(1),
.pagedjs_left_page .pagedjs_bleed-right .pagedjs_marks-crop:nth-child(1) {
	height: calc(var(--pagedjs-bleed-left-top) - var(--pagedjs-crop-stroke));
}

.pagedjs_bleed-left .pagedjs_marks-crop:nth-child(3),
.pagedjs_bleed-right .pagedjs_marks-crop:nth-child(3) {
	height: calc(var(--pagedjs-bleed-bottom) - var(--pagedjs-crop-stroke));
	border-top: var(--pagedjs-crop-stroke) solid var(--pagedjs-crop-color);
	box-shadow: 0px -1px 0px 0px var(--pagedjs-crop-shadow);
}

.pagedjs_right_page .pagedjs_bleed-left .pagedjs_marks-crop:nth-child(3),
.pagedjs_right_page .pagedjs_bleed-right .pagedjs_marks-crop:nth-child(3) {
	height: calc(var(--pagedjs-bleed-right-bottom) - var(--pagedjs-crop-stroke));
}

.pagedjs_left_page .pagedjs_bleed-left .pagedjs_marks-crop:nth-child(3),
.pagedjs_left_page .pagedjs_bleed-right .pagedjs_marks-crop:nth-child(3) {
	height: calc(var(--pagedjs-bleed-left-bottom) - var(--pagedjs-crop-stroke));
}

.pagedjs_bleed-left .pagedjs_marks-crop {
	width: calc(var(--pagedjs-bleed-left) - var(--pagedjs-crop-offset));
	align-self: flex-start;
}

.pagedjs_right_page .pagedjs_bleed-left .pagedjs_marks-crop {
	width: calc(var(--pagedjs-bleed-right-left) - var(--pagedjs-crop-offset));
}

.pagedjs_left_page .pagedjs_bleed-left .pagedjs_marks-crop {
	width: calc(var(--pagedjs-bleed-left-left) - var(--pagedjs-crop-offset));
}

.pagedjs_bleed-right .pagedjs_marks-crop {
	width: calc(var(--pagedjs-bleed-right) - var(--pagedjs-crop-offset));
	align-self: flex-end;
}

.pagedjs_right_page .pagedjs_bleed-right .pagedjs_marks-crop {
	width: calc(var(--pagedjs-bleed-right-right) - var(--pagedjs-crop-offset));
}

.pagedjs_left_page .pagedjs_bleed-right .pagedjs_marks-crop {
	width: calc(var(--pagedjs-bleed-left-right) - var(--pagedjs-crop-offset));
}

.pagedjs_marks-middle {
	display: flex;
	flex-grow: 1;
	flex-shrink: 0;
	align-items: center;
	justify-content: center;
}

.pagedjs_marks-cross {
	display: var(--pagedjs-mark-cross-display);
	background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIzMi41MzdweCIgaGVpZ2h0PSIzMi41MzdweCIgdmlld0JveD0iMC4xMDQgMC4xMDQgMzIuNTM3IDMyLjUzNyIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwLjEwNCAwLjEwNCAzMi41MzcgMzIuNTM3IiB4bWw6c3BhY2U9InByZXNlcnZlIj48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMy4zODkzIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0yOS45MzEsMTYuMzczYzAsNy40ODktNi4wNjgsMTMuNTYtMTMuNTU4LDEzLjU2Yy03LjQ4MywwLTEzLjU1Ny02LjA3Mi0xMy41NTctMTMuNTZjMC03LjQ4Niw2LjA3NC0xMy41NTQsMTMuNTU3LTEzLjU1NEMyMy44NjIsMi44MTksMjkuOTMxLDguODg3LDI5LjkzMSwxNi4zNzN6Ii8+PGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjMuMzg5MyIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB4MT0iMC4xMDQiIHkxPSIxNi4zNzMiIHgyPSIzMi42NDIiIHkyPSIxNi4zNzMiLz48bGluZSBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMy4zODkzIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHgxPSIxNi4zNzMiIHkxPSIwLjEwNCIgeDI9IjE2LjM3MyIgeTI9IjMyLjY0MiIvPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIzLjM4OTMiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTI0LjUwOCwxNi4zNzNjMCw0LjQ5Ni0zLjYzOCw4LjEzNS04LjEzNSw4LjEzNWMtNC40OTEsMC04LjEzNS0zLjYzOC04LjEzNS04LjEzNWMwLTQuNDg5LDMuNjQ0LTguMTM1LDguMTM1LTguMTM1QzIwLjg2OSw4LjIzOSwyNC41MDgsMTEuODg0LDI0LjUwOCwxNi4zNzN6Ii8+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjAuNjc3OCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMjkuOTMxLDE2LjM3M2MwLDcuNDg5LTYuMDY4LDEzLjU2LTEzLjU1OCwxMy41NmMtNy40ODMsMC0xMy41NTctNi4wNzItMTMuNTU3LTEzLjU2YzAtNy40ODYsNi4wNzQtMTMuNTU0LDEzLjU1Ny0xMy41NTRDMjMuODYyLDIuODE5LDI5LjkzMSw4Ljg4NywyOS45MzEsMTYuMzczeiIvPjxsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIwLjY3NzgiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeDE9IjAuMTA0IiB5MT0iMTYuMzczIiB4Mj0iMzIuNjQyIiB5Mj0iMTYuMzczIi8+PGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjAuNjc3OCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB4MT0iMTYuMzczIiB5MT0iMC4xMDQiIHgyPSIxNi4zNzMiIHkyPSIzMi42NDIiLz48cGF0aCBkPSJNMjQuNTA4LDE2LjM3M2MwLDQuNDk2LTMuNjM4LDguMTM1LTguMTM1LDguMTM1Yy00LjQ5MSwwLTguMTM1LTMuNjM4LTguMTM1LTguMTM1YzAtNC40ODksMy42NDQtOC4xMzUsOC4xMzUtOC4xMzVDMjAuODY5LDguMjM5LDI0LjUwOCwxMS44ODQsMjQuNTA4LDE2LjM3MyIvPjxsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIwLjY3NzgiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeDE9IjguMjM5IiB5MT0iMTYuMzczIiB4Mj0iMjQuNTA4IiB5Mj0iMTYuMzczIi8+PGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjAuNjc3OCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB4MT0iMTYuMzczIiB5MT0iOC4yMzkiIHgyPSIxNi4zNzMiIHkyPSIyNC41MDgiLz48L3N2Zz4=);
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: var(--pagedjs-cross-size);

  z-index: 2147483647;
	width: var(--pagedjs-cross-size);
	height: var(--pagedjs-cross-size);
}

.pagedjs_pagebox {
	box-sizing: border-box;
	width: var(--pagedjs-pagebox-width);
	height: var(--pagedjs-pagebox-height);
	position: relative;
	display: grid;
	grid-template-columns: [left] var(--pagedjs-margin-left) [center] calc(var(--pagedjs-pagebox-width) - var(--pagedjs-margin-left) - var(--pagedjs-margin-right)) [right] var(--pagedjs-margin-right);
	grid-template-rows: [header] var(--pagedjs-margin-top) [page] calc(var(--pagedjs-pagebox-height) - var(--pagedjs-margin-top) - var(--pagedjs-margin-bottom)) [footer] var(--pagedjs-margin-bottom);
	grid-column: sheet-center;
	grid-row: sheet-middle;
}

.pagedjs_pagebox * {
	box-sizing: border-box;
}

.pagedjs_margin-top {
	width: calc(var(--pagedjs-pagebox-width) - var(--pagedjs-margin-left) - var(--pagedjs-margin-right));
	height: var(--pagedjs-margin-top);
	grid-column: center;
	grid-row: header;
	flex-wrap: nowrap;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: 100%;
}

.pagedjs_margin-top-left-corner-holder {
	width: var(--pagedjs-margin-left);
	height: var(--pagedjs-margin-top);
	display: flex;
	grid-column: left;
	grid-row: header;
}

.pagedjs_margin-top-right-corner-holder {
	width: var(--pagedjs-margin-right);
	height: var(--pagedjs-margin-top);
	display: flex;
	grid-column: right;
	grid-row: header;
}

.pagedjs_margin-top-left-corner {
	width: var(--pagedjs-margin-left);
}

.pagedjs_margin-top-right-corner {
	width: var(--pagedjs-margin-right);
}

.pagedjs_margin-right {
	height: calc(var(--pagedjs-pagebox-height) - var(--pagedjs-margin-top) - var(--pagedjs-margin-bottom));
	width: var(--pagedjs-margin-right);
	right: 0;
	grid-column: right;
	grid-row: page;
	display: grid;
	grid-template-rows: repeat(3, 33.3333%);
	grid-template-columns: 100%;
}

.pagedjs_margin-bottom {
	width: calc(var(--pagedjs-pagebox-width) - var(--pagedjs-margin-left) - var(--pagedjs-margin-right));
	height: var(--pagedjs-margin-bottom);
	grid-column: center;
	grid-row: footer;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: 100%;
}

.pagedjs_margin-bottom-left-corner-holder {
	width: var(--pagedjs-margin-left);
	height: var(--pagedjs-margin-bottom);
	display: flex;
	grid-column: left;
	grid-row: footer;
}

.pagedjs_margin-bottom-right-corner-holder {
	width: var(--pagedjs-margin-right);
	height: var(--pagedjs-margin-bottom);
	display: flex;
	grid-column: right;
	grid-row: footer;
}

.pagedjs_margin-bottom-left-corner {
	width: var(--pagedjs-margin-left);
}

.pagedjs_margin-bottom-right-corner {
	width: var(--pagedjs-margin-right);
}



.pagedjs_margin-left {
	height: calc(var(--pagedjs-pagebox-height) - var(--pagedjs-margin-top) - var(--pagedjs-margin-bottom));
	width: var(--pagedjs-margin-left);
	grid-column: left;
	grid-row: page;
	display: grid;
	grid-template-rows: repeat(3, 33.33333%);
	grid-template-columns: 100%;
}

.pagedjs_pages .pagedjs_pagebox .pagedjs_margin:not(.hasContent) {
	visibility: hidden;
}

.pagedjs_pagebox > .pagedjs_area {
	grid-column: center;
	grid-row: page;
	width: 100%;
	height: 100%;
	padding: var(--pagedjs-padding-top) var(--pagedjs-padding-right) var(--pagedjs-padding-bottom) var(--pagedjs-padding-left);
	border-top: var(--pagedjs-border-top);
	border-right: var(--pagedjs-border-right);
	border-bottom: var(--pagedjs-border-bottom);
	border-left: var(--pagedjs-border-left);
}

.pagedjs_pagebox > .pagedjs_area > .pagedjs_page_content {
	width: 100%;
	height: calc(100% - var(--pagedjs-footnotes-height));
	position: relative;
	column-fill: auto;
}

.pagedjs_pagebox > .pagedjs_area > .pagedjs_page_content > div {
	height: inherit;
}

.pagedjs_pagebox > .pagedjs_area > .pagedjs_footnote_area {
	position: relative;
	overflow: hidden;
	height: var(--pagedjs-footnotes-height);
	display: flex;
    justify-content: flex-end;
    flex-flow: column;
}

.pagedjs_pagebox > .pagedjs_area > .pagedjs_footnote_area > .pagedjs_footnote_content {
	overflow: hidden;
}

.pagedjs_pagebox > .pagedjs_area > .pagedjs_footnote_area > .pagedjs_footnote_inner_content {
	overflow: hidden;
}

.pagedjs_area [data-footnote-call] {
	all: unset;
	counter-increment: footnote;
}

.pagedjs_area [data-split-from] {
	counter-increment: unset;
	counter-reset: unset;
}

[data-footnote-call]::after {
	vertical-align: super;
	font-size: 65%;
	line-height: normal;
	content: counter(footnote);
}

@supports ( font-variant-position: super ) {
	[data-footnote-call]::after {
		vertical-align: baseline;
		font-size: 100%;
		line-height: inherit;
		font-variant-position: super;
	}
}

.pagedjs_footnote_empty {
	display: none;
}

.pagedjs_area [data-split-from] {
	counter-increment: unset;
	counter-reset: unset;
}

[data-footnote-marker] {
	text-indent: 0;
	display: list-item;
	list-style-position: inside;
}

[data-footnote-marker][data-split-from] {
	list-style: none;
}

[data-footnote-marker]:not([data-split-from]) {
	counter-increment: footnote-marker;
}

[data-footnote-marker]::marker {
	content: counter(footnote-marker) ". ";
}

[data-footnote-marker][data-split-from]::marker {
	content: unset;
}

.pagedjs_area .pagedjs_footnote_inner_content [data-note-display="inline"] {
 	display: inline;
}

.pagedjs_page {
	counter-increment: page var(--pagedjs-page-counter-increment);
	width: var(--pagedjs-width);
	height: var(--pagedjs-height);
}

.pagedjs_page.pagedjs_right_page {
	width: var(--pagedjs-width-right);
	height: var(--pagedjs-height-right);
}

.pagedjs_page.pagedjs_left_page {
	width: var(--pagedjs-width-left);
	height: var(--pagedjs-height-left);
}

.pagedjs_pages {
	counter-reset: pages var(--pagedjs-page-count) footnote var(--pagedjs-footnotes-count) footnote-marker var(--pagedjs-footnotes-count);
}

.pagedjs_pagebox .pagedjs_margin-top-left-corner,
.pagedjs_pagebox .pagedjs_margin-top-right-corner,
.pagedjs_pagebox .pagedjs_margin-bottom-left-corner,
.pagedjs_pagebox .pagedjs_margin-bottom-right-corner,
.pagedjs_pagebox .pagedjs_margin-top-left,
.pagedjs_pagebox .pagedjs_margin-top-right,
.pagedjs_pagebox .pagedjs_margin-bottom-left,
.pagedjs_pagebox .pagedjs_margin-bottom-right,
.pagedjs_pagebox .pagedjs_margin-top-center,
.pagedjs_pagebox .pagedjs_margin-bottom-center,
.pagedjs_pagebox .pagedjs_margin-top-center,
.pagedjs_pagebox .pagedjs_margin-bottom-center,
.pagedjs_margin-right-middle,
.pagedjs_margin-left-middle  {
	display: flex;
	align-items: center;
}

.pagedjs_margin-right-top,
.pagedjs_margin-left-top  {
	display: flex;
	align-items: flex-top;
}


.pagedjs_margin-right-bottom,
.pagedjs_margin-left-bottom  {
	display: flex;
	align-items: flex-end;
}



/*
.pagedjs_pagebox .pagedjs_margin-top-center,
.pagedjs_pagebox .pagedjs_margin-bottom-center {
	height: 100%;
	display: none;
	align-items: center;
	flex: 1 0 33%;
	margin: 0 auto;
}

.pagedjs_pagebox .pagedjs_margin-top-left-corner,
.pagedjs_pagebox .pagedjs_margin-top-right-corner,
.pagedjs_pagebox .pagedjs_margin-bottom-right-corner,
.pagedjs_pagebox .pagedjs_margin-bottom-left-corner {
	display: none;
	align-items: center;
}

.pagedjs_pagebox .pagedjs_margin-left-top,
.pagedjs_pagebox .pagedjs_margin-right-top {
	display: none;
	align-items: flex-start;
}

.pagedjs_pagebox .pagedjs_margin-right-middle,
.pagedjs_pagebox .pagedjs_margin-left-middle {
	display: none;
	align-items: center;
}

.pagedjs_pagebox .pagedjs_margin-left-bottom,
.pagedjs_pagebox .pagedjs_margin-right-bottom {
	display: none;
	align-items: flex-end;
}
*/

.pagedjs_pagebox .pagedjs_margin-top-left,
.pagedjs_pagebox .pagedjs_margin-top-right-corner,
.pagedjs_pagebox .pagedjs_margin-bottom-left,
.pagedjs_pagebox .pagedjs_margin-bottom-right-corner { text-align: left; }

.pagedjs_pagebox .pagedjs_margin-top-left-corner,
.pagedjs_pagebox .pagedjs_margin-top-right,
.pagedjs_pagebox .pagedjs_margin-bottom-left-corner,
.pagedjs_pagebox .pagedjs_margin-bottom-right { text-align: right; }

.pagedjs_pagebox .pagedjs_margin-top-center,
.pagedjs_pagebox .pagedjs_margin-bottom-center,
.pagedjs_pagebox .pagedjs_margin-left-top,
.pagedjs_pagebox .pagedjs_margin-left-middle,
.pagedjs_pagebox .pagedjs_margin-left-bottom,
.pagedjs_pagebox .pagedjs_margin-right-top,
.pagedjs_pagebox .pagedjs_margin-right-middle,
.pagedjs_pagebox .pagedjs_margin-right-bottom { text-align: center; }

.pagedjs_pages .pagedjs_margin .pagedjs_margin-content {
	width: 100%;
}

.pagedjs_pages .pagedjs_margin-left .pagedjs_margin-content::after,
.pagedjs_pages .pagedjs_margin-top .pagedjs_margin-content::after,
.pagedjs_pages .pagedjs_margin-right .pagedjs_margin-content::after,
.pagedjs_pages .pagedjs_margin-bottom .pagedjs_margin-content::after {
	display: block;
}

.pagedjs_pages > .pagedjs_page > .pagedjs_sheet > .pagedjs_pagebox > .pagedjs_area > div [data-split-to] {
	margin-bottom: unset;
	padding-bottom: unset;
}

.pagedjs_pages > .pagedjs_page > .pagedjs_sheet > .pagedjs_pagebox > .pagedjs_area > div [data-split-from] {
	text-indent: unset;
	margin-top: unset;
	padding-top: unset;
	initial-letter: unset;
}

.pagedjs_pages > .pagedjs_page > .pagedjs_sheet > .pagedjs_pagebox > .pagedjs_area > div [data-split-from] > *::first-letter,
.pagedjs_pages > .pagedjs_page > .pagedjs_sheet > .pagedjs_pagebox > .pagedjs_area > div [data-split-from]::first-letter {
	color: unset;
	font-size: unset;
	font-weight: unset;
	font-family: unset;
	color: unset;
	line-height: unset;
	float: unset;
	padding: unset;
	margin: unset;
}

.pagedjs_pages > .pagedjs_page > .pagedjs_sheet > .pagedjs_pagebox > .pagedjs_area > div [data-split-to]:not([data-footnote-call]):after,
.pagedjs_pages > .pagedjs_page > .pagedjs_sheet > .pagedjs_pagebox > .pagedjs_area > div [data-split-to]:not([data-footnote-call])::after {
	content: unset;
}

.pagedjs_pages > .pagedjs_page > .pagedjs_sheet > .pagedjs_pagebox > .pagedjs_area > div [data-split-from]:not([data-footnote-call]):before,
.pagedjs_pages > .pagedjs_page > .pagedjs_sheet > .pagedjs_pagebox > .pagedjs_area > div [data-split-from]:not([data-footnote-call])::before {
	content: unset;
}

.pagedjs_pages > .pagedjs_page > .pagedjs_sheet > .pagedjs_pagebox > .pagedjs_area > div li[data-split-from]:first-of-type {
	list-style: none;
}

/*
[data-page]:not([data-split-from]),
[data-break-before="page"]:not([data-split-from]),
[data-break-before="always"]:not([data-split-from]),
[data-break-before="left"]:not([data-split-from]),
[data-break-before="right"]:not([data-split-from]),
[data-break-before="recto"]:not([data-split-from]),
[data-break-before="verso"]:not([data-split-from])
{
	break-before: column;
}

[data-page]:not([data-split-to]),
[data-break-after="page"]:not([data-split-to]),
[data-break-after="always"]:not([data-split-to]),
[data-break-after="left"]:not([data-split-to]),
[data-break-after="right"]:not([data-split-to]),
[data-break-after="recto"]:not([data-split-to]),
[data-break-after="verso"]:not([data-split-to])
{
	break-after: column;
}
*/

.pagedjs_clear-after::after {
	content: none !important;
}

[data-align-last-split-element='justify'] {
	text-align-last: justify;
}


@media print {
	html {
		width: 100%;
		height: 100%;
		-webkit-print-color-adjust: exact;
		print-color-adjust: exact;
	}
	body {
		margin: 0;
		padding: 0;
		width: 100% !important;
		height: 100% !important;
		min-width: 100%;
		max-width: 100%;
		min-height: 100%;
		max-height: 100%;
	}
	.pagedjs_pages {
		width: auto;
		display: block !important;
		transform: none !important;
		height: 100% !important;
		min-height: 100%;
		max-height: 100%;
		overflow: visible;
	}
	.pagedjs_page {
		margin: 0;
		padding: 0;
		max-height: 100%;
		min-height: 100%;
		height: 100% !important;
		page-break-after: always;
		break-after: page;
	}
	.pagedjs_sheet {
		margin: 0;
		padding: 0;
		max-height: 100%;
		min-height: 100%;
		height: 100% !important;
	}
}
`;
async function request(Gr, ze = {}) {
  return new Promise(function(Wr, Yr) {
    let Qr = new XMLHttpRequest();
    Qr.open(ze.method || "get", Gr, !0);
    for (let Kr in ze.headers)
      Qr.setRequestHeader(Kr, ze.headers[Kr]);
    Qr.withCredentials = ze.credentials === "include", Qr.onload = () => {
      const Kr = Qr.status === 0 && Gr.startsWith("file://") ? 200 : Qr.status;
      Wr(new Response(Qr.responseText, { status: Kr }));
    }, Qr.onerror = Yr, Qr.send(ze.body || null);
  });
}
class Polisher {
  constructor(ze) {
    this.sheets = [], this.inserted = [], this.hooks = {}, this.hooks.onUrl = new Hook(this), this.hooks.onAtPage = new Hook(this), this.hooks.onAtMedia = new Hook(this), this.hooks.onRule = new Hook(this), this.hooks.onDeclaration = new Hook(this), this.hooks.onContent = new Hook(this), this.hooks.onSelector = new Hook(this), this.hooks.onPseudoSelector = new Hook(this), this.hooks.onImport = new Hook(this), this.hooks.beforeTreeParse = new Hook(this), this.hooks.beforeTreeWalk = new Hook(this), this.hooks.afterTreeWalk = new Hook(this), ze !== !1 && this.setup();
  }
  setup() {
    return this.base = this.insert(baseStyles), this.styleEl = document.createElement("style"), document.head.appendChild(this.styleEl), this.styleSheet = this.styleEl.sheet, this.styleSheet;
  }
  async add() {
    let ze = [], Wr = [];
    for (var Yr = 0; Yr < arguments.length; Yr++) {
      let Qr;
      if (typeof arguments[Yr] == "object")
        for (let Kr in arguments[Yr]) {
          let Zr = arguments[Yr];
          Qr = new Promise(function(en, tn) {
            Wr.push(Kr), en(Zr[Kr]);
          });
        }
      else
        Wr.push(arguments[Yr]), Qr = request(arguments[Yr]).then((Kr) => Kr.text());
      ze.push(Qr);
    }
    return await Promise.all(ze).then(async (Qr) => {
      let Kr = "";
      for (let Zr = 0; Zr < Qr.length; Zr++)
        Kr = await this.convertViaSheet(Qr[Zr], Wr[Zr]), this.insert(Kr);
      return Kr;
    });
  }
  async convertViaSheet(ze, Wr) {
    let Yr = new Sheet(Wr, this.hooks);
    await Yr.parse(ze);
    for (let Qr of Yr.imported) {
      let Kr = await request(Qr).then((en) => en.text()), Zr = await this.convertViaSheet(Kr, Qr);
      this.insert(Zr);
    }
    return this.sheets.push(Yr), typeof Yr.width < "u" && (this.width = Yr.width), typeof Yr.height < "u" && (this.height = Yr.height), typeof Yr.orientation < "u" && (this.orientation = Yr.orientation), Yr.toString();
  }
  insert(ze) {
    let Wr = document.querySelector("head"), Yr = document.createElement("style");
    return Yr.setAttribute("data-pagedjs-inserted-styles", "true"), Yr.appendChild(document.createTextNode(ze)), Wr.appendChild(Yr), this.inserted.push(Yr), Yr;
  }
  destroy() {
    this.styleEl.remove(), this.inserted.forEach((ze) => {
      ze.remove();
    }), this.sheets = [];
  }
}
class Handler {
  constructor(ze, Wr, Yr) {
    let Qr = Object.assign({}, ze && ze.hooks, Wr && Wr.hooks, Yr && Yr.hooks);
    this.chunker = ze, this.polisher = Wr, this.caller = Yr;
    for (let Kr in Qr)
      Kr in this && Qr[Kr].register(this[Kr].bind(this));
  }
}
EventEmitter(Handler.prototype);
const pageSizes = {
  A0: {
    width: {
      value: 841,
      unit: "mm"
    },
    height: {
      value: 1189,
      unit: "mm"
    }
  },
  A1: {
    width: {
      value: 594,
      unit: "mm"
    },
    height: {
      value: 841,
      unit: "mm"
    }
  },
  A2: {
    width: {
      value: 420,
      unit: "mm"
    },
    height: {
      value: 594,
      unit: "mm"
    }
  },
  A3: {
    width: {
      value: 297,
      unit: "mm"
    },
    height: {
      value: 420,
      unit: "mm"
    }
  },
  A4: {
    width: {
      value: 210,
      unit: "mm"
    },
    height: {
      value: 297,
      unit: "mm"
    }
  },
  A5: {
    width: {
      value: 148,
      unit: "mm"
    },
    height: {
      value: 210,
      unit: "mm"
    }
  },
  A6: {
    width: {
      value: 105,
      unit: "mm"
    },
    height: {
      value: 148,
      unit: "mm"
    }
  },
  A7: {
    width: {
      value: 74,
      unit: "mm"
    },
    height: {
      value: 105,
      unit: "mm"
    }
  },
  A8: {
    width: {
      value: 52,
      unit: "mm"
    },
    height: {
      value: 74,
      unit: "mm"
    }
  },
  A9: {
    width: {
      value: 37,
      unit: "mm"
    },
    height: {
      value: 52,
      unit: "mm"
    }
  },
  A10: {
    width: {
      value: 26,
      unit: "mm"
    },
    height: {
      value: 37,
      unit: "mm"
    }
  },
  B4: {
    width: {
      value: 250,
      unit: "mm"
    },
    height: {
      value: 353,
      unit: "mm"
    }
  },
  B5: {
    width: {
      value: 176,
      unit: "mm"
    },
    height: {
      value: 250,
      unit: "mm"
    }
  },
  letter: {
    width: {
      value: 8.5,
      unit: "in"
    },
    height: {
      value: 11,
      unit: "in"
    }
  },
  legal: {
    width: {
      value: 8.5,
      unit: "in"
    },
    height: {
      value: 14,
      unit: "in"
    }
  },
  ledger: {
    width: {
      value: 11,
      unit: "in"
    },
    height: {
      value: 17,
      unit: "in"
    }
  }
};
class AtPage extends Handler {
  constructor(ze, Wr, Yr) {
    super(ze, Wr, Yr), this.pages = {}, this.width = void 0, this.height = void 0, this.orientation = void 0, this.marginalia = {};
  }
  pageModel(ze) {
    return {
      selector: ze,
      name: void 0,
      psuedo: void 0,
      nth: void 0,
      marginalia: {},
      width: void 0,
      height: void 0,
      orientation: void 0,
      margin: {
        top: {},
        right: {},
        left: {},
        bottom: {}
      },
      padding: {
        top: {},
        right: {},
        left: {},
        bottom: {}
      },
      border: {
        top: {},
        right: {},
        left: {},
        bottom: {}
      },
      backgroundOrigin: void 0,
      block: {},
      marks: void 0,
      notes: void 0,
      added: !1
    };
  }
  // Find and Remove @page rules
  onAtPage(ze, Wr, Yr) {
    let Qr, Kr, Zr = "", en, tn, rn, sn = !1;
    ze.prelude ? (en = this.getTypeSelector(ze), tn = this.getPsuedoSelector(ze), rn = this.getNthSelector(ze), Zr = csstree.generate(ze.prelude)) : Zr = "*", Zr in this.pages ? (Qr = this.pages[Zr], Kr = this.replaceMarginalia(ze), sn = !0, Qr.added = !1) : (Qr = this.pageModel(Zr), Kr = this.replaceMarginalia(ze), this.pages[Zr] = Qr), Qr.name = en, Qr.psuedo = tn, Qr.nth = rn, sn ? Qr.marginalia = Object.assign(Qr.marginalia, Kr) : Qr.marginalia = Kr;
    let on = this.replaceNotes(ze);
    Qr.notes = on;
    let an = this.replaceDeclarations(ze);
    if (an.size && (Qr.size = an.size, Qr.width = an.size.width, Qr.height = an.size.height, Qr.orientation = an.size.orientation, Qr.format = an.size.format), an.bleed && an.bleed[0] != "auto")
      switch (an.bleed.length) {
        case 4:
          Qr.bleed = {
            top: an.bleed[0],
            right: an.bleed[1],
            bottom: an.bleed[2],
            left: an.bleed[3]
          };
          break;
        case 3:
          Qr.bleed = {
            top: an.bleed[0],
            right: an.bleed[1],
            bottom: an.bleed[2],
            left: an.bleed[1]
          };
          break;
        case 2:
          Qr.bleed = {
            top: an.bleed[0],
            right: an.bleed[1],
            bottom: an.bleed[0],
            left: an.bleed[1]
          };
          break;
        default:
          Qr.bleed = {
            top: an.bleed[0],
            right: an.bleed[0],
            bottom: an.bleed[0],
            left: an.bleed[0]
          };
      }
    an.marks && ((!an.bleed || an.bleed && an.bleed[0] === "auto") && (Qr.bleed = {
      top: { value: 6, unit: "mm" },
      right: { value: 6, unit: "mm" },
      bottom: { value: 6, unit: "mm" },
      left: { value: 6, unit: "mm" }
    }), Qr.marks = an.marks), an.margin && (Qr.margin = an.margin), an.padding && (Qr.padding = an.padding), an.border && (Qr.border = an.border), an.marks && (Qr.marks = an.marks), sn ? Qr.block.children.appendList(ze.block.children) : Qr.block = ze.block, Yr.remove(Wr);
  }
  /* Handled in breaks */
  /*
  afterParsed(parsed) {
  	for (let b in this.named) {
  		// Find elements
  		let elements = parsed.querySelectorAll(b);
  		// Add break data
  		for (var i = 0; i < elements.length; i++) {
  			elements[i].setAttribute("data-page", this.named[b]);
  		}
  	}
  }
  */
  afterTreeWalk(ze, Wr) {
    let Yr = "*" in this.pages && this.pages["*"].added === !1;
    if (this.addPageClasses(this.pages, ze, Wr), Yr) {
      let Qr = this.pages["*"].width, Kr = this.pages["*"].height, Zr = this.pages["*"].format, en = this.pages["*"].orientation, tn = this.pages["*"].bleed, rn = this.pages["*"].marks, sn, on;
      ":left" in this.pages && (sn = this.pages[":left"].bleed), ":right" in this.pages && (on = this.pages[":right"].bleed), Qr && Kr && (this.width !== Qr || this.height !== Kr) && (this.width = Qr, this.height = Kr, this.format = Zr, this.orientation = en, this.addRootVars(ze, Qr, Kr, en, tn, on, sn, rn), this.addRootPage(ze, this.pages["*"].size, tn, on, sn), this.emit("size", { width: Qr, height: Kr, orientation: en, format: Zr, bleed: tn }), this.emit("atpages", this.pages));
    }
  }
  getTypeSelector(ze) {
    let Wr;
    return csstree.walk(ze, {
      visit: "TypeSelector",
      enter: (Yr, Qr, Kr) => {
        Wr = Yr.name;
      }
    }), Wr;
  }
  getPsuedoSelector(ze) {
    let Wr;
    return csstree.walk(ze, {
      visit: "PseudoClassSelector",
      enter: (Yr, Qr, Kr) => {
        Yr.name !== "nth" && (Wr = Yr.name);
      }
    }), Wr;
  }
  getNthSelector(ze) {
    let Wr;
    return csstree.walk(ze, {
      visit: "PseudoClassSelector",
      enter: (Yr, Qr, Kr) => {
        Yr.name === "nth" && Yr.children && (Wr = Yr.children.first().value);
      }
    }), Wr;
  }
  replaceMarginalia(ze) {
    let Wr = {};
    const Yr = [
      "top-left-corner",
      "top-left",
      "top",
      "top-center",
      "top-right",
      "top-right-corner",
      "bottom-left-corner",
      "bottom-left",
      "bottom",
      "bottom-center",
      "bottom-right",
      "bottom-right-corner",
      "left-top",
      "left-middle",
      "left",
      "left-bottom",
      "top-right-corner",
      "right-top",
      "right-middle",
      "right",
      "right-bottom",
      "right-right-corner"
    ];
    return csstree.walk(ze.block, {
      visit: "Atrule",
      enter: (Qr, Kr, Zr) => {
        let en = Qr.name;
        Yr.includes(en) && (en === "top" && (en = "top-center"), en === "right" && (en = "right-middle"), en === "left" && (en = "left-middle"), en === "bottom" && (en = "bottom-center"), Wr[en] = Qr.block, Zr.remove(Kr));
      }
    }), Wr;
  }
  replaceNotes(ze) {
    let Wr = {};
    return csstree.walk(ze.block, {
      visit: "Atrule",
      enter: (Yr, Qr, Kr) => {
        let Zr = Yr.name;
        Zr === "footnote" && (Wr[Zr] = Yr.block, Kr.remove(Qr));
      }
    }), Wr;
  }
  replaceDeclarations(ze) {
    let Wr = {};
    return csstree.walk(ze.block, {
      visit: "Declaration",
      enter: (Yr, Qr, Kr) => {
        let Zr = csstree.property(Yr.property).name;
        if (Zr === "marks")
          Wr.marks = [], csstree.walk(Yr, {
            visit: "Identifier",
            enter: (en) => {
              Wr.marks.push(en.name);
            }
          }), Kr.remove(Qr);
        else if (Zr === "margin")
          Wr.margin = this.getMargins(Yr), Kr.remove(Qr);
        else if (Zr.indexOf("margin-") === 0) {
          let en = Zr.substring(7);
          Wr.margin || (Wr.margin = {
            top: {},
            right: {},
            left: {},
            bottom: {}
          }), Wr.margin[en] = Yr.value.children.first(), Kr.remove(Qr);
        } else if (Zr === "padding")
          Wr.padding = this.getPaddings(Yr.value), Kr.remove(Qr);
        else if (Zr.indexOf("padding-") === 0) {
          let en = Zr.substring(8);
          Wr.padding || (Wr.padding = {
            top: {},
            right: {},
            left: {},
            bottom: {}
          }), Wr.padding[en] = Yr.value.children.first(), Kr.remove(Qr);
        } else if (Zr === "border")
          Wr.border || (Wr.border = {
            top: {},
            right: {},
            left: {},
            bottom: {}
          }), Wr.border.top = csstree.generate(Yr.value), Wr.border.right = csstree.generate(Yr.value), Wr.border.left = csstree.generate(Yr.value), Wr.border.bottom = csstree.generate(Yr.value), Kr.remove(Qr);
        else if (Zr.indexOf("border-") === 0) {
          Wr.border || (Wr.border = {
            top: {},
            right: {},
            left: {},
            bottom: {}
          });
          let en = Zr.substring(7);
          Wr.border[en] = csstree.generate(Yr.value), Kr.remove(Qr);
        } else Zr === "size" ? (Wr.size = this.getSize(Yr), Kr.remove(Qr)) : Zr === "bleed" && (Wr.bleed = [], csstree.walk(Yr, {
          enter: (en) => {
            switch (en.type) {
              case "String":
                en.value.indexOf("auto") > -1 && Wr.bleed.push("auto");
                break;
              case "Dimension":
                Wr.bleed.push({
                  value: en.value,
                  unit: en.unit
                });
                break;
              case "Number":
                Wr.bleed.push({
                  value: en.value,
                  unit: "px"
                });
                break;
            }
          }
        }), Kr.remove(Qr));
      }
    }), Wr;
  }
  getSize(ze) {
    let Wr, Yr, Qr, Kr;
    return csstree.walk(ze, {
      visit: "Dimension",
      enter: (Zr, en, tn) => {
        let { value: rn, unit: sn } = Zr;
        typeof Wr > "u" ? Wr = { value: rn, unit: sn } : typeof Yr > "u" && (Yr = { value: rn, unit: sn });
      }
    }), csstree.walk(ze, {
      visit: "String",
      enter: (Zr, en, tn) => {
        let rn = Zr.value.replace(/["|']/g, ""), sn = pageSizes[rn];
        sn && (Wr = sn.width, Yr = sn.height);
      }
    }), csstree.walk(ze, {
      visit: "Identifier",
      enter: (Zr, en, tn) => {
        let rn = Zr.name;
        if (rn === "landscape" || rn === "portrait")
          Qr = Zr.name;
        else if (rn !== "auto") {
          let sn = pageSizes[rn];
          sn && (Wr = sn.width, Yr = sn.height), Kr = rn;
        }
      }
    }), {
      width: Wr,
      height: Yr,
      orientation: Qr,
      format: Kr
    };
  }
  getMargins(ze) {
    let Wr = [], Yr = {
      top: {},
      right: {},
      left: {},
      bottom: {}
    };
    if (csstree.walk(ze, {
      enter: (Qr) => {
        switch (Qr.type) {
          case "Dimension":
            Wr.push(Qr);
            break;
          case "Number":
            Wr.push({ value: Qr.value, unit: "px" });
            break;
        }
      }
    }), Wr.length === 1)
      for (let Qr in Yr)
        Yr[Qr] = Wr[0];
    else Wr.length === 2 ? (Yr.top = Wr[0], Yr.right = Wr[1], Yr.bottom = Wr[0], Yr.left = Wr[1]) : Wr.length === 3 ? (Yr.top = Wr[0], Yr.right = Wr[1], Yr.bottom = Wr[2], Yr.left = Wr[1]) : Wr.length === 4 && (Yr.top = Wr[0], Yr.right = Wr[1], Yr.bottom = Wr[2], Yr.left = Wr[3]);
    return Yr;
  }
  getPaddings(ze) {
    let Wr = [], Yr = {
      top: {},
      right: {},
      left: {},
      bottom: {}
    };
    if (csstree.walk(ze, {
      enter: (Qr) => {
        switch (Qr.type) {
          case "Dimension":
            Wr.push(Qr);
            break;
          case "Number":
            Wr.push({ value: Qr.value, unit: "px" });
            break;
        }
      }
    }), Wr.length === 1)
      for (let Qr in Yr)
        Yr[Qr] = Wr[0];
    else Wr.length === 2 ? (Yr.top = Wr[0], Yr.right = Wr[1], Yr.bottom = Wr[0], Yr.left = Wr[1]) : Wr.length === 3 ? (Yr.top = Wr[0], Yr.right = Wr[1], Yr.bottom = Wr[2], Yr.left = Wr[1]) : Wr.length === 4 && (Yr.top = Wr[0], Yr.right = Wr[1], Yr.bottom = Wr[2], Yr.left = Wr[3]);
    return Yr;
  }
  // get values for the border on the @page to pass them to the element with the .pagedjs_area class
  getBorders(ze) {
    let Wr = {
      top: {},
      right: {},
      left: {},
      bottom: {}
    };
    return ze.prop == "border" ? (Wr.top = csstree.generate(ze.value), Wr.right = csstree.generate(ze.value), Wr.bottom = csstree.generate(ze.value), Wr.left = csstree.generate(ze.value)) : ze.prop == "border-top" ? Wr.top = csstree.generate(ze.value) : ze.prop == "border-right" ? Wr.right = csstree.generate(ze.value) : ze.prop == "border-bottom" ? Wr.bottom = csstree.generate(ze.value) : ze.prop == "border-left" && (Wr.left = csstree.generate(ze.value)), Wr;
  }
  addPageClasses(ze, Wr, Yr) {
    if ("*" in ze && ze["*"].added === !1) {
      let Qr = this.createPage(ze["*"], Wr.children, Yr);
      Yr.insertRule(Qr), ze["*"].added = !0;
    }
    if (":left" in ze && ze[":left"].added === !1) {
      let Qr = this.createPage(ze[":left"], Wr.children, Yr);
      Yr.insertRule(Qr), ze[":left"].added = !0;
    }
    if (":right" in ze && ze[":right"].added === !1) {
      let Qr = this.createPage(ze[":right"], Wr.children, Yr);
      Yr.insertRule(Qr), ze[":right"].added = !0;
    }
    if (":first" in ze && ze[":first"].added === !1) {
      let Qr = this.createPage(ze[":first"], Wr.children, Yr);
      Yr.insertRule(Qr), ze[":first"].added = !0;
    }
    if (":blank" in ze && ze[":blank"].added === !1) {
      let Qr = this.createPage(ze[":blank"], Wr.children, Yr);
      Yr.insertRule(Qr), ze[":blank"].added = !0;
    }
    for (let Qr in ze)
      if (ze[Qr].nth && ze[Qr].added === !1) {
        let Kr = this.createPage(ze[Qr], Wr.children, Yr);
        Yr.insertRule(Kr), ze[Qr].added = !0;
      }
    for (let Qr in ze)
      if (ze[Qr].name && ze[Qr].added === !1) {
        let Kr = this.createPage(ze[Qr], Wr.children, Yr);
        Yr.insertRule(Kr), ze[Qr].added = !0;
      }
  }
  createPage(ze, Wr, Yr) {
    let Qr = this.selectorsForPage(ze), Kr = ze.block.children.copy(), Zr = {
      type: "Block",
      loc: 0,
      children: Kr
    }, en = this.createRule(Qr, Zr);
    return this.addMarginVars(ze.margin, Kr, Kr.first()), this.addPaddingVars(ze.padding, Kr, Kr.first()), this.addBorderVars(ze.border, Kr, Kr.first()), ze.width && this.addDimensions(ze.width, ze.height, ze.orientation, Kr, Kr.first()), ze.marginalia && (this.addMarginaliaStyles(ze, Wr, en, Yr), this.addMarginaliaContent(ze, Wr, en, Yr)), ze.notes && this.addNotesStyles(ze.notes, ze, Wr, en, Yr), en;
  }
  addMarginVars(ze, Wr, Yr) {
    for (let Qr in ze)
      if (typeof ze[Qr].value < "u") {
        let Kr = ze[Qr].value + (ze[Qr].unit || ""), Zr = Wr.createItem({
          type: "Declaration",
          property: "--pagedjs-margin-" + Qr,
          value: {
            type: "Raw",
            value: Kr
          }
        });
        Wr.append(Zr, Yr);
      }
  }
  addPaddingVars(ze, Wr, Yr) {
    for (let Qr in ze)
      if (typeof ze[Qr].value < "u") {
        let Kr = ze[Qr].value + (ze[Qr].unit || ""), Zr = Wr.createItem({
          type: "Declaration",
          property: "--pagedjs-padding-" + Qr,
          value: {
            type: "Raw",
            value: Kr
          }
        });
        Wr.append(Zr, Yr);
      }
  }
  addBorderVars(ze, Wr, Yr) {
    for (const Qr of Object.keys(ze)) {
      const Kr = ze[Qr];
      if (typeof Kr == "string") {
        const Zr = Wr.createItem({
          type: "Declaration",
          property: "--pagedjs-border-" + Qr,
          value: {
            type: "Raw",
            value: Kr
          }
        });
        Wr.append(Zr, Yr);
      }
    }
  }
  addDimensions(ze, Wr, Yr, Qr, Kr) {
    let Zr, en;
    Zr = CSSValueToString(ze), en = CSSValueToString(Wr), Yr && Yr !== "portrait" && ([Zr, en] = [en, Zr]);
    let tn = this.createVariable("--pagedjs-pagebox-width", Zr);
    Qr.appendData(tn);
    let rn = this.createVariable("--pagedjs-pagebox-height", en);
    Qr.appendData(rn);
  }
  addMarginaliaStyles(ze, Wr, Yr, Qr) {
    for (let Kr in ze.marginalia) {
      let Zr = csstree.clone(ze.marginalia[Kr]), en = !1;
      if (Zr.children.isEmpty())
        continue;
      csstree.walk(Zr, {
        visit: "Declaration",
        enter: (on, an, dn) => {
          if (on.property === "content" && (on.value.children && on.value.children.first().name === "none" ? en = !1 : en = !0, dn.remove(an)), on.property === "vertical-align" && (csstree.walk(on, {
            visit: "Identifier",
            enter: (pn, mn, vn) => {
              let xn = pn.name;
              xn === "top" ? pn.name = "flex-start" : xn === "middle" ? pn.name = "center" : xn === "bottom" && (pn.name = "flex-end");
            }
          }), on.property = "align-items"), on.property === "width" && (Kr === "top-left" || Kr === "top-center" || Kr === "top-right" || Kr === "bottom-left" || Kr === "bottom-center" || Kr === "bottom-right")) {
            let pn = csstree.clone(on);
            pn.property = "max-width", dn.appendData(pn);
          }
          if (on.property === "height" && (Kr === "left-top" || Kr === "left-middle" || Kr === "left-bottom" || Kr === "right-top" || Kr === "right-middle" || Kr === "right-bottom")) {
            let pn = csstree.clone(on);
            pn.property = "max-height", dn.appendData(pn);
          }
        }
      });
      let tn = this.selectorsForPageMargin(ze, Kr), rn = this.createRule(tn, Zr);
      Wr.appendData(rn);
      let sn = csstree.generate({
        type: "Selector",
        children: tn
      });
      this.marginalia[sn] = {
        page: ze,
        selector: sn,
        block: ze.marginalia[Kr],
        hasContent: en
      };
    }
  }
  addMarginaliaContent(ze, Wr, Yr, Qr) {
    let Kr;
    for (let Zr in ze.marginalia) {
      let en = csstree.clone(ze.marginalia[Zr]);
      if (csstree.walk(en, {
        visit: "Declaration",
        enter: (dn, pn, mn) => {
          dn.property !== "content" && mn.remove(pn), dn.value.children && dn.value.children.first().name === "none" && (Kr = !0);
        }
      }), en.children.isEmpty())
        continue;
      let tn = this.selectorsForPageMargin(ze, Zr), rn;
      tn.insertData({
        type: "Combinator",
        name: ">"
      }), tn.insertData({
        type: "ClassSelector",
        name: "pagedjs_margin-content"
      }), tn.insertData({
        type: "Combinator",
        name: ">"
      }), tn.insertData({
        type: "TypeSelector",
        name: "*"
      }), Kr ? rn = this.createDeclaration("display", "none") : rn = this.createDeclaration("display", "block");
      let sn = this.createRule(tn, [rn]);
      Qr.insertRule(sn);
      let on = this.selectorsForPageMargin(ze, Zr);
      on.insertData({
        type: "Combinator",
        name: ">"
      }), on.insertData({
        type: "ClassSelector",
        name: "pagedjs_margin-content"
      }), on.insertData({
        type: "PseudoElementSelector",
        name: "after",
        children: null
      });
      let an = this.createRule(on, en);
      Qr.insertRule(an);
    }
  }
  addRootVars(ze, Wr, Yr, Qr, Kr, Zr, en, tn) {
    let rn = [], sn = new csstree.List();
    sn.insertData({
      type: "PseudoClassSelector",
      name: "root",
      children: null
    });
    let on, an, dn, pn, mn, vn;
    if (!Kr)
      on = CSSValueToString(Wr), an = CSSValueToString(Yr), dn = CSSValueToString(Wr), pn = CSSValueToString(Yr), mn = CSSValueToString(Wr), vn = CSSValueToString(Yr);
    else {
      on = `calc( ${CSSValueToString(Wr)} + ${CSSValueToString(Kr.left)} + ${CSSValueToString(Kr.right)} )`, an = `calc( ${CSSValueToString(Yr)} + ${CSSValueToString(Kr.top)} + ${CSSValueToString(Kr.bottom)} )`, dn = `calc( ${CSSValueToString(Wr)} + ${CSSValueToString(Kr.left)} + ${CSSValueToString(Kr.right)} )`, pn = `calc( ${CSSValueToString(Yr)} + ${CSSValueToString(Kr.top)} + ${CSSValueToString(Kr.bottom)} )`, mn = `calc( ${CSSValueToString(Wr)} + ${CSSValueToString(Kr.left)} + ${CSSValueToString(Kr.right)} )`, vn = `calc( ${CSSValueToString(Yr)} + ${CSSValueToString(Kr.top)} + ${CSSValueToString(Kr.bottom)} )`;
      let Sn = this.createVariable("--pagedjs-bleed-top", CSSValueToString(Kr.top)), _n = this.createVariable("--pagedjs-bleed-right", CSSValueToString(Kr.right)), Tn = this.createVariable("--pagedjs-bleed-bottom", CSSValueToString(Kr.bottom)), Ln = this.createVariable("--pagedjs-bleed-left", CSSValueToString(Kr.left)), Pn = this.createVariable("--pagedjs-bleed-right-top", CSSValueToString(Kr.top)), In = this.createVariable("--pagedjs-bleed-right-right", CSSValueToString(Kr.right)), Mn = this.createVariable("--pagedjs-bleed-right-bottom", CSSValueToString(Kr.bottom)), Nn = this.createVariable("--pagedjs-bleed-right-left", CSSValueToString(Kr.left)), Gn = this.createVariable("--pagedjs-bleed-left-top", CSSValueToString(Kr.top)), Un = this.createVariable("--pagedjs-bleed-left-right", CSSValueToString(Kr.right)), Hn = this.createVariable("--pagedjs-bleed-left-bottom", CSSValueToString(Kr.bottom)), En = this.createVariable("--pagedjs-bleed-left-left", CSSValueToString(Kr.left));
      Zr && (Pn = this.createVariable("--pagedjs-bleed-right-top", CSSValueToString(Zr.top)), In = this.createVariable("--pagedjs-bleed-right-right", CSSValueToString(Zr.right)), Mn = this.createVariable("--pagedjs-bleed-right-bottom", CSSValueToString(Zr.bottom)), Nn = this.createVariable("--pagedjs-bleed-right-left", CSSValueToString(Zr.left)), dn = `calc( ${CSSValueToString(Wr)} + ${CSSValueToString(Zr.left)} + ${CSSValueToString(Zr.right)} )`, pn = `calc( ${CSSValueToString(Yr)} + ${CSSValueToString(Zr.top)} + ${CSSValueToString(Zr.bottom)} )`), en && (Gn = this.createVariable("--pagedjs-bleed-left-top", CSSValueToString(en.top)), Un = this.createVariable("--pagedjs-bleed-left-right", CSSValueToString(en.right)), Hn = this.createVariable("--pagedjs-bleed-left-bottom", CSSValueToString(en.bottom)), En = this.createVariable("--pagedjs-bleed-left-left", CSSValueToString(en.left)), mn = `calc( ${CSSValueToString(Wr)} + ${CSSValueToString(en.left)} + ${CSSValueToString(en.right)} )`, vn = `calc( ${CSSValueToString(Yr)} + ${CSSValueToString(en.top)} + ${CSSValueToString(en.bottom)} )`);
      let Yn = this.createVariable("--pagedjs-width", CSSValueToString(Wr)), Xn = this.createVariable("--pagedjs-height", CSSValueToString(Yr));
      rn.push(
        Sn,
        _n,
        Tn,
        Ln,
        Pn,
        In,
        Mn,
        Nn,
        Gn,
        Un,
        Hn,
        En,
        Yn,
        Xn
      );
    }
    if (tn && tn.forEach((Sn) => {
      let _n = this.createVariable("--pagedjs-mark-" + Sn + "-display", "block");
      rn.push(_n);
    }), Qr) {
      let Sn = this.createVariable("--pagedjs-orientation", Qr);
      rn.push(Sn), Qr !== "portrait" && ([on, an] = [an, on], [dn, pn] = [pn, dn], [mn, vn] = [vn, mn]);
    }
    let xn = this.createVariable("--pagedjs-width", on), gn = this.createVariable("--pagedjs-height", an), un = this.createVariable("--pagedjs-width-right", dn), fn = this.createVariable("--pagedjs-height-right", pn), cn = this.createVariable("--pagedjs-width-left", mn), Cn = this.createVariable("--pagedjs-height-left", vn);
    rn.push(xn, gn, un, fn, cn, Cn);
    let bn = this.createRule(sn, rn);
    ze.children.appendData(bn);
  }
  addNotesStyles(ze, Wr, Yr, Qr, Kr) {
    for (const Zr in ze) {
      let en = this.selectorsForPage(Wr);
      en.insertData({
        type: "Combinator",
        name: " "
      }), en.insertData({
        type: "ClassSelector",
        name: "pagedjs_" + Zr + "_content"
      });
      let tn = this.createRule(en, ze[Zr]);
      Yr.appendData(tn);
    }
  }
  /*
  @page {
  	size: var(--pagedjs-width) var(--pagedjs-height);
  	margin: 0;
  	padding: 0;
  }
  */
  addRootPage(ze, Wr, Yr, Qr, Kr) {
    let { width: Zr, height: en, orientation: tn, format: rn } = Wr, sn = new csstree.List(), on = new csstree.List(), an = new csstree.List(), dn = new csstree.List(), pn = new csstree.List(), mn = new csstree.List();
    if (Yr) {
      let xn = new csstree.List(), gn = new csstree.List();
      xn.appendData({
        type: "Dimension",
        unit: Zr.unit,
        value: Zr.value
      }), xn.appendData({
        type: "WhiteSpace",
        value: " "
      }), xn.appendData({
        type: "Operator",
        value: "+"
      }), xn.appendData({
        type: "WhiteSpace",
        value: " "
      }), xn.appendData({
        type: "Dimension",
        unit: Yr.left.unit,
        value: Yr.left.value
      }), xn.appendData({
        type: "WhiteSpace",
        value: " "
      }), xn.appendData({
        type: "Operator",
        value: "+"
      }), xn.appendData({
        type: "WhiteSpace",
        value: " "
      }), xn.appendData({
        type: "Dimension",
        unit: Yr.right.unit,
        value: Yr.right.value
      }), gn.appendData({
        type: "Dimension",
        unit: en.unit,
        value: en.value
      }), gn.appendData({
        type: "WhiteSpace",
        value: " "
      }), gn.appendData({
        type: "Operator",
        value: "+"
      }), gn.appendData({
        type: "WhiteSpace",
        value: " "
      }), gn.appendData({
        type: "Dimension",
        unit: Yr.top.unit,
        value: Yr.top.value
      }), gn.appendData({
        type: "WhiteSpace",
        value: " "
      }), gn.appendData({
        type: "Operator",
        value: "+"
      }), gn.appendData({
        type: "WhiteSpace",
        value: " "
      }), gn.appendData({
        type: "Dimension",
        unit: Yr.bottom.unit,
        value: Yr.bottom.value
      }), dn.appendData({
        type: "Function",
        name: "calc",
        children: xn
      }), dn.appendData({
        type: "WhiteSpace",
        value: " "
      }), dn.appendData({
        type: "Function",
        name: "calc",
        children: gn
      });
    } else rn ? (dn.appendData({
      type: "Identifier",
      name: rn
    }), tn && (dn.appendData({
      type: "WhiteSpace",
      value: " "
    }), dn.appendData({
      type: "Identifier",
      name: tn
    }))) : (dn.appendData({
      type: "Dimension",
      unit: Zr.unit,
      value: Zr.value
    }), dn.appendData({
      type: "WhiteSpace",
      value: " "
    }), dn.appendData({
      type: "Dimension",
      unit: en.unit,
      value: en.value
    }));
    sn.appendData({
      type: "Declaration",
      property: "size",
      loc: null,
      value: {
        type: "Value",
        children: dn
      }
    }), sn.appendData({
      type: "Declaration",
      property: "margin",
      loc: null,
      value: {
        type: "Value",
        children: [{
          type: "Dimension",
          unit: "px",
          value: 0
        }]
      }
    }), sn.appendData({
      type: "Declaration",
      property: "padding",
      loc: null,
      value: {
        type: "Value",
        children: [{
          type: "Dimension",
          unit: "px",
          value: 0
        }]
      }
    }), sn.appendData({
      type: "Declaration",
      property: "padding",
      loc: null,
      value: {
        type: "Value",
        children: [{
          type: "Dimension",
          unit: "px",
          value: 0
        }]
      }
    });
    let vn = ze.children.createItem({
      type: "Atrule",
      prelude: null,
      name: "page",
      block: {
        type: "Block",
        loc: null,
        children: sn
      }
    });
    if (ze.children.append(vn), Kr) {
      let xn = new csstree.List(), gn = new csstree.List();
      xn.appendData({
        type: "Dimension",
        unit: Zr.unit,
        value: Zr.value
      }), xn.appendData({
        type: "WhiteSpace",
        value: " "
      }), xn.appendData({
        type: "Operator",
        value: "+"
      }), xn.appendData({
        type: "WhiteSpace",
        value: " "
      }), xn.appendData({
        type: "Dimension",
        unit: Kr.left.unit,
        value: Kr.left.value
      }), xn.appendData({
        type: "WhiteSpace",
        value: " "
      }), xn.appendData({
        type: "Operator",
        value: "+"
      }), xn.appendData({
        type: "WhiteSpace",
        value: " "
      }), xn.appendData({
        type: "Dimension",
        unit: Kr.right.unit,
        value: Kr.right.value
      }), gn.appendData({
        type: "Dimension",
        unit: en.unit,
        value: en.value
      }), gn.appendData({
        type: "WhiteSpace",
        value: " "
      }), gn.appendData({
        type: "Operator",
        value: "+"
      }), gn.appendData({
        type: "WhiteSpace",
        value: " "
      }), gn.appendData({
        type: "Dimension",
        unit: Kr.top.unit,
        value: Kr.top.value
      }), gn.appendData({
        type: "WhiteSpace",
        value: " "
      }), gn.appendData({
        type: "Operator",
        value: "+"
      }), gn.appendData({
        type: "WhiteSpace",
        value: " "
      }), gn.appendData({
        type: "Dimension",
        unit: Kr.bottom.unit,
        value: Kr.bottom.value
      }), pn.appendData({
        type: "Function",
        name: "calc",
        children: xn
      }), pn.appendData({
        type: "WhiteSpace",
        value: " "
      }), pn.appendData({
        type: "Function",
        name: "calc",
        children: gn
      }), on.appendData({
        type: "Declaration",
        property: "size",
        loc: null,
        value: {
          type: "Value",
          children: pn
        }
      });
      let un = ze.children.createItem({
        type: "Atrule",
        prelude: null,
        name: "page :left",
        block: {
          type: "Block",
          loc: null,
          children: on
        }
      });
      ze.children.append(un);
    }
    if (Qr) {
      let xn = new csstree.List(), gn = new csstree.List();
      xn.appendData({
        type: "Dimension",
        unit: Zr.unit,
        value: Zr.value
      }), xn.appendData({
        type: "WhiteSpace",
        value: " "
      }), xn.appendData({
        type: "Operator",
        value: "+"
      }), xn.appendData({
        type: "WhiteSpace",
        value: " "
      }), xn.appendData({
        type: "Dimension",
        unit: Qr.left.unit,
        value: Qr.left.value
      }), xn.appendData({
        type: "WhiteSpace",
        value: " "
      }), xn.appendData({
        type: "Operator",
        value: "+"
      }), xn.appendData({
        type: "WhiteSpace",
        value: " "
      }), xn.appendData({
        type: "Dimension",
        unit: Qr.right.unit,
        value: Qr.right.value
      }), gn.appendData({
        type: "Dimension",
        unit: en.unit,
        value: en.value
      }), gn.appendData({
        type: "WhiteSpace",
        value: " "
      }), gn.appendData({
        type: "Operator",
        value: "+"
      }), gn.appendData({
        type: "WhiteSpace",
        value: " "
      }), gn.appendData({
        type: "Dimension",
        unit: Qr.top.unit,
        value: Qr.top.value
      }), gn.appendData({
        type: "WhiteSpace",
        value: " "
      }), gn.appendData({
        type: "Operator",
        value: "+"
      }), gn.appendData({
        type: "WhiteSpace",
        value: " "
      }), gn.appendData({
        type: "Dimension",
        unit: Qr.bottom.unit,
        value: Qr.bottom.value
      }), mn.appendData({
        type: "Function",
        name: "calc",
        children: xn
      }), mn.appendData({
        type: "WhiteSpace",
        value: " "
      }), mn.appendData({
        type: "Function",
        name: "calc",
        children: gn
      }), an.appendData({
        type: "Declaration",
        property: "size",
        loc: null,
        value: {
          type: "Value",
          children: mn
        }
      });
      let un = ze.children.createItem({
        type: "Atrule",
        prelude: null,
        name: "page :right",
        block: {
          type: "Block",
          loc: null,
          children: an
        }
      });
      ze.children.append(un);
    }
  }
  getNth(ze) {
    let Wr = ze.indexOf("n"), Yr = ze.indexOf("+"), Qr = ze.split("n"), Kr = ze.split("+"), Zr = null, en = null;
    return Wr > -1 ? (Zr = Qr[0], Yr > -1 && (en = Kr[1])) : en = ze, {
      type: "Nth",
      loc: null,
      selector: null,
      nth: {
        type: "AnPlusB",
        loc: null,
        a: Zr,
        b: en
      }
    };
  }
  addPageAttributes(ze, Wr, Yr) {
    let Qr = [Wr.dataset.page];
    if (Qr && Qr.length)
      for (const Kr of Qr)
        Kr && (ze.name = Kr, ze.element.classList.add("pagedjs_named_page"), ze.element.classList.add("pagedjs_" + Kr + "_page"), Wr.dataset.splitFrom || ze.element.classList.add("pagedjs_" + Kr + "_first_page"));
  }
  getStartElement(ze, Wr) {
    let Yr = Wr && Wr.node;
    if (!ze && !Wr)
      return;
    if (!Yr)
      return ze.children[0];
    if (Yr.nodeType === 1 && Yr.parentNode.nodeType === 11 || Yr.nodeType === 1 && Yr.dataset.page)
      return Yr;
    let Qr = rebuildAncestors(Yr), Kr = Qr.querySelectorAll("[data-page]");
    return Kr.length ? Kr[Kr.length - 1] : Qr.children[0];
  }
  beforePageLayout(ze, Wr, Yr, Qr) {
    let Kr = this.getStartElement(Wr, Yr);
    Kr && this.addPageAttributes(ze, Kr, Qr.pages);
  }
  finalizePage(ze, Wr, Yr, Qr) {
    for (let Kr in this.marginalia) {
      let Zr = this.marginalia[Kr], en = Kr.split(" "), tn;
      Wr.element.matches(en[0]) && Zr.hasContent && (tn = Wr.element.querySelector(en[1]), tn.classList.add("hasContent"));
    }
    ["top", "bottom"].forEach((Kr) => {
      let Zr = Wr.element.querySelector(".pagedjs_margin-" + Kr), en = Wr.element.querySelector(".pagedjs_margin-" + Kr + "-center"), tn = Wr.element.querySelector(".pagedjs_margin-" + Kr + "-left"), rn = Wr.element.querySelector(".pagedjs_margin-" + Kr + "-right"), sn = en.classList.contains("hasContent"), on = tn.classList.contains("hasContent"), an = rn.classList.contains("hasContent"), dn, pn, mn;
      if (on && (pn = window.getComputedStyle(tn)["max-width"]), an && (mn = window.getComputedStyle(rn)["max-width"]), sn)
        if (dn = window.getComputedStyle(en)["max-width"], dn === "none" || dn === "auto")
          if (!on && !an)
            Zr.style["grid-template-columns"] = "0 1fr 0";
          else if (on)
            if (an)
              if (pn !== "none" && pn !== "auto")
                mn !== "none" && mn !== "auto" ? Zr.style["grid-template-columns"] = pn + " 1fr " + mn : Zr.style["grid-template-columns"] = pn + " 1fr " + pn;
              else if (mn !== "none" && mn !== "auto")
                Zr.style["grid-template-columns"] = mn + " 1fr " + mn;
              else {
                Zr.style["grid-template-columns"] = "auto auto 1fr", tn.style["white-space"] = "nowrap", en.style["white-space"] = "nowrap", rn.style["white-space"] = "nowrap";
                let vn = tn.offsetWidth, xn = en.offsetWidth, gn = rn.offsetWidth, un = vn + xn + gn, fn = xn * 100 / un;
                fn > 40 ? Zr.style["grid-template-columns"] = "minmax(16.66%, 1fr) minmax(33%, " + fn + "%) minmax(16.66%, 1fr)" : Zr.style["grid-template-columns"] = "repeat(3, 1fr)", tn.style["white-space"] = "normal", en.style["white-space"] = "normal", rn.style["white-space"] = "normal";
              }
            else if (pn !== "none" && pn !== "auto")
              Zr.style["grid-template-columns"] = pn + " 1fr " + pn;
            else {
              Zr.style["grid-template-columns"] = "auto auto 1fr", tn.style["white-space"] = "nowrap", en.style["white-space"] = "nowrap";
              let vn = tn.offsetWidth, xn = en.offsetWidth, gn = vn + xn, un = xn * 100 / gn;
              Zr.style["grid-template-columns"] = "minmax(16.66%, 1fr) minmax(33%, " + un + "%) minmax(16.66%, 1fr)", tn.style["white-space"] = "normal", en.style["white-space"] = "normal";
            }
          else if (mn !== "none" && mn !== "auto")
            Zr.style["grid-template-columns"] = mn + " 1fr " + mn;
          else {
            Zr.style["grid-template-columns"] = "auto auto 1fr", rn.style["white-space"] = "nowrap", en.style["white-space"] = "nowrap";
            let vn = rn.offsetWidth, xn = en.offsetWidth, gn = vn + xn, un = xn * 100 / gn;
            Zr.style["grid-template-columns"] = "minmax(16.66%, 1fr) minmax(33%, " + un + "%) minmax(16.66%, 1fr)", rn.style["white-space"] = "normal", en.style["white-space"] = "normal";
          }
        else dn !== "none" && dn !== "auto" && (on && pn !== "none" && pn !== "auto" ? Zr.style["grid-template-columns"] = pn + " " + dn + " 1fr" : an && mn !== "none" && mn !== "auto" ? Zr.style["grid-template-columns"] = "1fr " + dn + " " + mn : Zr.style["grid-template-columns"] = "1fr " + dn + " 1fr");
      else if (on)
        if (!an)
          Zr.style["grid-template-columns"] = "1fr 0 0";
        else if (pn !== "none" && pn !== "auto")
          mn !== "none" && mn !== "auto" ? Zr.style["grid-template-columns"] = pn + " 1fr " + mn : Zr.style["grid-template-columns"] = pn + " 0 1fr";
        else if (mn !== "none" && mn !== "auto")
          Zr.style["grid-template-columns"] = "1fr 0 " + mn;
        else {
          Zr.style["grid-template-columns"] = "auto 1fr auto", tn.style["white-space"] = "nowrap", rn.style["white-space"] = "nowrap";
          let vn = tn.offsetWidth, xn = rn.offsetWidth, gn = vn + xn, un = vn * 100 / gn;
          Zr.style["grid-template-columns"] = "minmax(16.66%, " + un + "%) 0 1fr", tn.style["white-space"] = "normal", rn.style["white-space"] = "normal";
        }
      else
        mn !== "none" && mn !== "auto" ? Zr.style["grid-template-columns"] = "1fr 0 " + mn : Zr.style["grid-template-columns"] = "0 0 1fr";
    }), ["left", "right"].forEach((Kr) => {
      let Zr = Wr.element.querySelector(".pagedjs_margin-" + Kr + "-middle.hasContent"), en = Wr.element.querySelector(".pagedjs_margin-" + Kr), tn = Wr.element.querySelector(".pagedjs_margin-" + Kr + "-top"), rn = Wr.element.querySelector(".pagedjs_margin-" + Kr + "-bottom"), sn = tn.classList.contains("hasContent"), on = rn.classList.contains("hasContent"), an, dn, pn;
      sn && (dn = window.getComputedStyle(tn)["max-height"]), on && (pn = window.getComputedStyle(rn)["max-height"]), Zr ? (an = window.getComputedStyle(Zr)["max-height"], an === "none" || an === "auto" ? !sn && !on ? en.style["grid-template-rows"] = "0 1fr 0" : sn ? on ? dn !== "none" && dn !== "auto" ? pn !== "none" && pn !== "auto" ? en.style["grid-template-rows"] = dn + " calc(100% - " + dn + " - " + pn + ") " + pn : en.style["grid-template-rows"] = dn + " calc(100% - " + dn + "*2) " + dn : pn !== "none" && pn !== "auto" && (en.style["grid-template-rows"] = pn + " calc(100% - " + pn + "*2) " + pn) : dn !== "none" && dn !== "auto" && (en.style["grid-template-rows"] = dn + " calc(100% - " + dn + "*2) " + dn) : pn !== "none" && pn !== "auto" && (en.style["grid-template-rows"] = pn + " calc(100% - " + pn + "*2) " + pn) : sn && dn !== "none" && dn !== "auto" ? en.style["grid-template-rows"] = dn + " " + an + " calc(100% - (" + dn + " + " + an + "))" : on && pn !== "none" && pn !== "auto" ? en.style["grid-template-rows"] = "1fr " + an + " " + pn : en.style["grid-template-rows"] = "calc((100% - " + an + ")/2) " + an + " calc((100% - " + an + ")/2)") : sn ? on ? dn !== "none" && dn !== "auto" ? pn !== "none" && pn !== "auto" ? en.style["grid-template-rows"] = dn + " 1fr " + pn : en.style["grid-template-rows"] = dn + " 0 1fr" : pn !== "none" && pn !== "auto" ? en.style["grid-template-rows"] = "1fr 0 " + pn : en.style["grid-template-rows"] = "1fr 0 1fr" : en.style["grid-template-rows"] = "1fr 0 0" : pn !== "none" && pn !== "auto" ? en.style["grid-template-rows"] = "1fr 0 " + pn : en.style["grid-template-rows"] = "0 0 1fr";
    });
  }
  // CSS Tree Helpers
  selectorsForPage(ze) {
    let Wr, Yr, Qr = new csstree.List();
    return Qr.insertData({
      type: "ClassSelector",
      name: "pagedjs_page"
    }), ze.name && (Qr.insertData({
      type: "ClassSelector",
      name: "pagedjs_named_page"
    }), Qr.insertData({
      type: "ClassSelector",
      name: "pagedjs_" + ze.name + "_page"
    })), ze.psuedo && !(ze.name && ze.psuedo === "first") && Qr.insertData({
      type: "ClassSelector",
      name: "pagedjs_" + ze.psuedo + "_page"
    }), ze.name && ze.psuedo === "first" && Qr.insertData({
      type: "ClassSelector",
      name: "pagedjs_" + ze.name + "_" + ze.psuedo + "_page"
    }), ze.nth && (Wr = new csstree.List(), Yr = this.getNth(ze.nth), Wr.insertData(Yr), Qr.insertData({
      type: "PseudoClassSelector",
      name: "nth-of-type",
      children: Wr
    })), Qr;
  }
  selectorsForPageMargin(ze, Wr) {
    let Yr = this.selectorsForPage(ze);
    return Yr.insertData({
      type: "Combinator",
      name: " "
    }), Yr.insertData({
      type: "ClassSelector",
      name: "pagedjs_margin-" + Wr
    }), Yr;
  }
  createDeclaration(ze, Wr, Yr) {
    let Qr = new csstree.List();
    return Qr.insertData({
      type: "Identifier",
      loc: null,
      name: Wr
    }), {
      type: "Declaration",
      loc: null,
      important: Yr,
      property: ze,
      value: {
        type: "Value",
        loc: null,
        children: Qr
      }
    };
  }
  createVariable(ze, Wr) {
    return {
      type: "Declaration",
      loc: null,
      property: ze,
      value: {
        type: "Raw",
        value: Wr
      }
    };
  }
  createCalculatedDimension(ze, Wr, Yr, Qr = "+") {
    let Kr = new csstree.List(), Zr = new csstree.List();
    return Wr.forEach((en, tn) => {
      Zr.appendData({
        type: "Dimension",
        unit: en.unit,
        value: en.value
      }), Zr.appendData({
        type: "WhiteSpace",
        value: " "
      }), tn + 1 < Wr.length && (Zr.appendData({
        type: "Operator",
        value: Qr
      }), Zr.appendData({
        type: "WhiteSpace",
        value: " "
      }));
    }), Kr.insertData({
      type: "Function",
      loc: null,
      name: "calc",
      children: Zr
    }), {
      type: "Declaration",
      loc: null,
      important: Yr,
      property: ze,
      value: {
        type: "Value",
        loc: null,
        children: Kr
      }
    };
  }
  createDimension(ze, Wr, Yr) {
    let Qr = new csstree.List();
    return Qr.insertData({
      type: "Dimension",
      loc: null,
      value: Wr.value,
      unit: Wr.unit
    }), {
      type: "Declaration",
      loc: null,
      important: Yr,
      property: ze,
      value: {
        type: "Value",
        loc: null,
        children: Qr
      }
    };
  }
  createBlock(ze) {
    let Wr = new csstree.List();
    return ze.forEach((Yr) => {
      Wr.insertData(Yr);
    }), {
      type: "Block",
      loc: null,
      children: Wr
    };
  }
  createRule(ze, Wr) {
    let Yr = new csstree.List();
    return Yr.insertData({
      type: "Selector",
      children: ze
    }), Array.isArray(Wr) && (Wr = this.createBlock(Wr)), {
      type: "Rule",
      prelude: {
        type: "SelectorList",
        children: Yr
      },
      block: Wr
    };
  }
}
class Breaks extends Handler {
  constructor(ze, Wr, Yr) {
    super(ze, Wr, Yr), this.breaks = {};
  }
  onDeclaration(ze, Wr, Yr, Qr) {
    let Kr = ze.property;
    if (Kr === "page") {
      let en = ze.value.children.first().name, tn = csstree.generate(Qr.ruleNode.prelude), sn = {
        property: Kr,
        value: en,
        selector: tn,
        name: en
      };
      tn.split(",").forEach((on) => {
        this.breaks[on] ? this.breaks[on].push(sn) : this.breaks[on] = [sn];
      }), Yr.remove(Wr);
    }
    if (Kr === "break-before" || Kr === "break-after" || Kr === "page-break-before" || Kr === "page-break-after") {
      let en = ze.value.children.first().name, tn = csstree.generate(Qr.ruleNode.prelude);
      Kr === "page-break-before" ? Kr = "break-before" : Kr === "page-break-after" && (Kr = "break-after");
      let rn = {
        property: Kr,
        value: en,
        selector: tn
      };
      tn.split(",").forEach((sn) => {
        this.breaks[sn] ? this.breaks[sn].push(rn) : this.breaks[sn] = [rn];
      }), Yr.remove(Wr);
    }
  }
  afterParsed(ze) {
    this.processBreaks(ze, this.breaks);
  }
  processBreaks(ze, Wr) {
    for (let Qr in Wr) {
      let Kr = ze.querySelectorAll(Qr);
      for (var Yr = 0; Yr < Kr.length; Yr++)
        for (let Zr of Wr[Qr])
          if (Zr.property === "break-after") {
            let en = displayedElementAfter(Kr[Yr], ze);
            Kr[Yr].setAttribute("data-break-after", Zr.value), en && en.setAttribute("data-previous-break-after", Zr.value);
          } else if (Zr.property === "break-before") {
            let en = displayedElementBefore(Kr[Yr], ze);
            if (en) {
              if (Zr.value === "page" && needsPageBreak(Kr[Yr], en))
                continue;
              Kr[Yr].setAttribute("data-break-before", Zr.value), en.setAttribute("data-next-break-before", Zr.value);
            }
          } else if (Zr.property === "page") {
            Kr[Yr].setAttribute("data-page", Zr.value);
            let en = displayedElementAfter(Kr[Yr], ze);
            en && en.setAttribute("data-after-page", Zr.value);
          } else
            Kr[Yr].setAttribute("data-" + Zr.property, Zr.value);
    }
  }
  mergeBreaks(ze, Wr) {
    for (let Yr in Wr)
      Yr in ze ? ze[Yr] = ze[Yr].concat(Wr[Yr]) : ze[Yr] = Wr[Yr];
    return ze;
  }
  addBreakAttributes(ze, Wr) {
    let Yr = ze.querySelector("[data-break-before]"), Qr = ze.querySelector("[data-break-after]"), Kr = ze.querySelector("[data-previous-break-after]");
    Yr && (Yr.dataset.splitFrom ? (Wr.splitFrom = Yr.dataset.splitFrom, ze.setAttribute("data-split-from", Yr.dataset.splitFrom)) : Yr.dataset.breakBefore && Yr.dataset.breakBefore !== "avoid" && (Wr.breakBefore = Yr.dataset.breakBefore, ze.setAttribute("data-break-before", Yr.dataset.breakBefore))), Qr && Qr.dataset && (Qr.dataset.splitTo ? (Wr.splitTo = Qr.dataset.splitTo, ze.setAttribute("data-split-to", Qr.dataset.splitTo)) : Qr.dataset.breakAfter && Qr.dataset.breakAfter !== "avoid" && (Wr.breakAfter = Qr.dataset.breakAfter, ze.setAttribute("data-break-after", Qr.dataset.breakAfter))), Kr && Kr.dataset && Kr.dataset.previousBreakAfter && Kr.dataset.previousBreakAfter !== "avoid" && (Wr.previousBreakAfter = Kr.dataset.previousBreakAfter);
  }
  afterPageLayout(ze, Wr) {
    this.addBreakAttributes(ze, Wr);
  }
}
class PrintMedia extends Handler {
  constructor(ze, Wr, Yr) {
    super(ze, Wr, Yr);
  }
  onAtMedia(ze, Wr, Yr) {
    let Qr = this.getMediaName(ze), Kr;
    Qr.includes("print") ? (Kr = ze.block.children, Yr.appendList(Kr), Yr.remove(Wr)) : !Qr.includes("all") && !Qr.includes("pagedjs-ignore") && Yr.remove(Wr);
  }
  getMediaName(ze) {
    let Wr = [];
    if (!(typeof ze.prelude > "u" || ze.prelude.type !== "AtrulePrelude"))
      return csstree.walk(ze.prelude, {
        visit: "Identifier",
        enter: (Yr, Qr, Kr) => {
          Wr.push(Yr.name);
        }
      }), Wr;
  }
}
class Splits extends Handler {
  constructor(ze, Wr, Yr) {
    super(ze, Wr, Yr);
  }
  afterPageLayout(ze, Wr, Yr, Qr) {
    let Kr = Array.from(ze.querySelectorAll("[data-split-from]")), Zr = ze.parentNode, en = Array.prototype.indexOf.call(Zr.children, ze), tn;
    if (en === 0)
      return;
    tn = Zr.children[en - 1];
    let rn;
    Kr.forEach((sn) => {
      let on = sn.dataset.ref;
      rn = tn.querySelector("[data-ref='" + on + "']:not([data-split-to])"), rn && (rn.dataset.splitTo = on, rn.dataset.splitFrom || (rn.dataset.splitOriginal = !0));
    }), rn && this.handleAlignment(rn);
  }
  handleAlignment(ze) {
    let Wr = window.getComputedStyle(ze), Yr = Wr["text-align"], Qr = Wr["text-align-last"];
    ze.dataset.lastSplitElement = "true", Yr === "justify" && Qr === "auto" ? ze.dataset.alignLastSplitElement = "justify" : ze.dataset.alignLastSplitElement = Qr;
  }
}
class Counters extends Handler {
  constructor(ze, Wr, Yr) {
    super(ze, Wr, Yr), this.styleSheet = Wr.styleSheet, this.counters = {}, this.resetCountersMap = /* @__PURE__ */ new Map();
  }
  onDeclaration(ze, Wr, Yr, Qr) {
    let Kr = ze.property;
    if (Kr === "counter-increment") {
      this.handleIncrement(ze, Qr);
      let Zr = !1;
      ze.value.children.forEach((en) => {
        en.type && en.type !== "WhiteSpace" && (Zr = !0);
      }), Zr || Yr.remove(Wr);
    } else if (Kr === "counter-reset") {
      this.handleReset(ze, Qr);
      let Zr = !1;
      ze.value.children.forEach((en) => {
        en.type && en.type !== "WhiteSpace" && (Zr = !0);
      }), Zr || Yr.remove(Wr);
    }
  }
  afterParsed(ze) {
    this.processCounters(ze, this.counters), this.scopeCounters(this.counters);
  }
  addCounter(ze) {
    return ze in this.counters ? this.counters[ze] : (this.counters[ze] = {
      name: ze,
      increments: {},
      resets: {}
    }, this.counters[ze]);
  }
  handleIncrement(ze, Wr) {
    let Yr = [], Qr = ze.value.children;
    return Qr.forEach((Kr, Zr) => {
      if (Kr.type && Kr.type === "Identifier") {
        let en = Kr.name;
        if (en === "page" || en.indexOf("target-counter-") === 0)
          return;
        let tn, rn, sn;
        Zr.next && Zr.next.data.type === "WhiteSpace" && (tn = Zr.next), tn && tn.next && tn.next.data.type === "Number" && (rn = tn.next, sn = parseInt(rn.data.value));
        let on = csstree.generate(Wr.ruleNode.prelude), an;
        en in this.counters ? an = this.counters[en] : an = this.addCounter(en);
        let dn = {
          selector: on,
          number: sn || 1
        };
        an.increments[on] = dn, Yr.push(dn), Qr.remove(Zr), tn && Qr.remove(tn), rn && Qr.remove(rn);
      }
    }), Yr;
  }
  handleReset(ze, Wr) {
    let Yr = ze.value.children;
    Yr.forEach((Qr, Kr) => {
      if (Qr.type && Qr.type === "Identifier") {
        let Zr = Qr.name, en, tn, rn;
        Kr.next && Kr.next.data.type === "WhiteSpace" && (en = Kr.next), en && en.next && (en.next.data.type === "Number" ? (tn = en.next, rn = parseInt(tn.data.value)) : en.next.data.type === "Function" && en.next.data.name === "var" && (tn = en.next, rn = en.next.data.children.head.data.name));
        let sn, on, an = Wr.ruleNode.prelude;
        Wr.ruleNode.type === "Atrule" && Wr.ruleNode.name === "page" ? on = ".pagedjs_page" : on = csstree.generate(an || Wr.ruleNode), Zr === "footnote" && this.addFootnoteMarkerCounter(ze.value.children), Zr in this.counters ? sn = this.counters[Zr] : sn = this.addCounter(Zr);
        let dn = {
          selector: on,
          number: rn || 0
        };
        sn.resets[on] = dn, on !== ".pagedjs_page" && (Yr.remove(Kr), en && Yr.remove(en), tn && Yr.remove(tn));
      }
    });
  }
  processCounters(ze, Wr) {
    let Yr;
    for (let Qr in Wr)
      Yr = this.counters[Qr], this.processCounterIncrements(ze, Yr), this.processCounterResets(ze, Yr), Qr !== "page" && this.addCounterValues(ze, Yr);
  }
  scopeCounters(ze) {
    let Wr = [];
    for (let Yr in ze)
      Yr !== "page" && Wr.push(`${ze[Yr].name} 0`);
    this.insertRule(`.pagedjs_pages { counter-reset: ${Wr.join(" ")} page 0 pages var(--pagedjs-page-count) footnote var(--pagedjs-footnotes-count) footnote-marker var(--pagedjs-footnotes-count)}`);
  }
  insertRule(ze) {
    this.styleSheet.insertRule(ze, this.styleSheet.cssRules.length);
  }
  processCounterIncrements(ze, Wr) {
    let Yr;
    for (let Qr in Wr.increments) {
      Yr = Wr.increments[Qr];
      let Kr = ze.querySelectorAll(Yr.selector);
      for (let Zr = 0; Zr < Kr.length; Zr++)
        Kr[Zr].setAttribute("data-counter-" + Wr.name + "-increment", Yr.number), Kr[Zr].getAttribute("data-counter-increment") ? Kr[Zr].setAttribute("data-counter-increment", Kr[Zr].getAttribute("data-counter-increment") + " " + Wr.name) : Kr[Zr].setAttribute("data-counter-increment", Wr.name);
    }
  }
  processCounterResets(ze, Wr) {
    let Yr;
    for (let Kr in Wr.resets) {
      Yr = Wr.resets[Kr];
      let Zr = ze.querySelectorAll(Yr.selector);
      for (var Qr = 0; Qr < Zr.length; Qr++) {
        let en = Yr.number;
        typeof en == "string" && en.startsWith("--") && (en = Zr[Qr].style.getPropertyValue(en) || 0), Zr[Qr].setAttribute("data-counter-" + Wr.name + "-reset", en), Zr[Qr].getAttribute("data-counter-reset") ? Zr[Qr].setAttribute("data-counter-reset", Zr[Qr].getAttribute("data-counter-reset") + " " + Wr.name) : Zr[Qr].setAttribute("data-counter-reset", Wr.name);
      }
    }
  }
  addCounterValues(ze, Wr) {
    let Yr = Wr.name;
    if (Yr === "page" || Yr === "footnote")
      return;
    let Qr = ze.querySelectorAll("[data-counter-" + Yr + "-reset], [data-counter-" + Yr + "-increment]"), Kr = 0, Zr, en, tn, rn, sn, on, an;
    for (let dn = 0; dn < Qr.length; dn++)
      Zr = Qr[dn], on = 0, an = [], Zr.hasAttribute("data-counter-" + Yr + "-reset") && (tn = Zr.getAttribute("data-counter-" + Yr + "-reset"), rn = parseInt(tn), on = rn - Kr, an.push(`${Yr} ${on}`), Kr = rn), Zr.hasAttribute("data-counter-" + Yr + "-increment") && (en = Zr.getAttribute("data-counter-" + Yr + "-increment"), sn = parseInt(en), Kr += sn, Zr.setAttribute("data-counter-" + Yr + "-value", Kr), an.push(`${Yr} ${sn}`)), an.length > 0 && this.incrementCounterForElement(Zr, an);
  }
  addFootnoteMarkerCounter(ze) {
    let Wr = [];
    csstree.walk(ze, {
      visit: "Identifier",
      enter: (Yr, Qr, Kr) => {
        Wr.push(Yr.name);
      }
    }), !Wr.includes("footnote-maker") && (ze.insertData({
      type: "WhiteSpace",
      value: " "
    }), ze.insertData({
      type: "Identifier",
      name: "footnote-marker"
    }), ze.insertData({
      type: "WhiteSpace",
      value: " "
    }), ze.insertData({
      type: "Number",
      value: 0
    }));
  }
  incrementCounterForElement(ze, Wr) {
    if (!ze || !Wr || Wr.length === 0) return;
    const Yr = ze.dataset.ref, Qr = Array.from(this.styleSheet.cssRules).filter((Zr) => Zr.selectorText === `[data-ref="${ze.dataset.ref}"]:not([data-split-from])` && Zr.style[0] === "counter-increment").map((Zr) => Zr.style.counterIncrement);
    Qr.push(this.mergeIncrements(
      Wr,
      (Zr, en) => (parseInt(Zr) || 0) + (parseInt(en) || 0)
    ));
    const Kr = this.mergeIncrements(Qr, (Zr, en) => en);
    this.insertRule(`[data-ref="${Yr}"]:not([data-split-from]) { counter-increment: ${Kr} }`);
  }
  /**
   * Merge multiple values of a counter-increment CSS rule, using the specified operator.
   *
   * @param {Array} incrementArray the values to merge, e.g. ['c1 1', 'c1 -7 c2 1']
   * @param {Function} operator the function used to merge counter values (e.g. keep the last value of a counter or sum
   *					the counter values)
   * @return {string} the merged value of the counter-increment CSS rule
   */
  mergeIncrements(ze, Wr) {
    const Yr = {};
    return ze.forEach((Qr) => {
      let Kr = Qr.split(" ");
      for (let Zr = 0; Zr < Kr.length; Zr += 2)
        Yr[Kr[Zr]] = Wr(Yr[Kr[Zr]], Kr[Zr + 1]);
    }), Object.entries(Yr).map(([Qr, Kr]) => `${Qr} ${Kr}`).join(" ");
  }
  afterPageLayout(ze, Wr) {
    let Yr = [];
    ze.querySelectorAll("[data-counter-page-reset]:not([data-split-from])").forEach((Zr) => {
      const en = Zr.dataset && Zr.dataset.ref;
      if (!(en && this.resetCountersMap.has(en))) {
        en && this.resetCountersMap.set(en, "");
        let tn = Zr.dataset.counterPageReset;
        Yr.push(`page ${tn}`);
      }
    }), ze.querySelectorAll("[data-counter-footnote-reset]:not([data-split-from])").forEach((Zr) => {
      let en = Zr.dataset.counterFootnoteReset;
      Yr.push(`footnote ${en}`), Yr.push(`footnote-marker ${en}`);
    }), Yr.length && this.styleSheet.insertRule(`[data-page-number="${ze.dataset.pageNumber}"] { counter-increment: none; counter-reset: ${Yr.join(" ")} }`, this.styleSheet.cssRules.length);
  }
}
class Lists extends Handler {
  constructor(ze, Wr, Yr) {
    super(ze, Wr, Yr);
  }
  afterParsed(ze) {
    const Wr = ze.querySelectorAll("ol");
    for (var Yr of Wr)
      this.addDataNumbers(Yr);
  }
  afterPageLayout(ze, Wr, Yr, Qr) {
    var Kr = ze.getElementsByTagName("ol");
    for (var Zr of Kr)
      Zr.firstElementChild && (Zr.start = Zr.firstElementChild.dataset.itemNum);
  }
  addDataNumbers(ze) {
    let Wr = 1;
    ze.hasAttribute("start") && (Wr = parseInt(ze.getAttribute("start"), 10), isNaN(Wr) && (Wr = 1));
    let Yr = ze.children;
    for (var Qr = 0; Qr < Yr.length; Qr++)
      Yr[Qr].setAttribute("data-item-num", Qr + Wr);
  }
}
class PositionFixed extends Handler {
  constructor(ze, Wr, Yr) {
    super(ze, Wr, Yr), this.styleSheet = Wr.styleSheet, this.fixedElementsSelector = [], this.fixedElements = [];
  }
  onDeclaration(ze, Wr, Yr, Qr) {
    if (ze.property === "position" && ze.value.children.first().name === "fixed") {
      let Kr = csstree.generate(Qr.ruleNode.prelude);
      this.fixedElementsSelector.push(Kr), Yr.remove(Wr);
    }
  }
  afterParsed(ze) {
    this.fixedElementsSelector.forEach((Wr) => {
      ze.querySelectorAll(`${Wr}`).forEach((Yr) => {
        Yr.style.setProperty("position", "absolute"), this.fixedElements.push(Yr), Yr.remove();
      });
    });
  }
  afterPageLayout(ze, Wr, Yr) {
    this.fixedElements.forEach((Qr) => {
      const Kr = Qr.cloneNode(!0);
      ze.querySelector(".pagedjs_pagebox").insertAdjacentElement("afterbegin", Kr);
    });
  }
}
class PageCounterIncrement extends Handler {
  constructor(ze, Wr, Yr) {
    super(ze, Wr, Yr), this.styleSheet = Wr.styleSheet, this.pageCounter = {
      name: "page",
      increments: {},
      resets: {}
    };
  }
  onDeclaration(ze, Wr, Yr, Qr) {
    ze.property === "counter-increment" && this.handleIncrement(ze, Qr) && Yr.remove(Wr);
  }
  afterParsed(ze) {
    for (const Wr in this.pageCounter.increments) {
      const Yr = this.pageCounter.increments[Wr];
      this.insertRule(`${Yr.selector} { --pagedjs-page-counter-increment: ${Yr.number} }`);
    }
  }
  handleIncrement(ze, Wr) {
    const Yr = ze.value.children.first(), Qr = ze.value.children.getSize() > 1 ? ze.value.children.last().value : 1, Kr = Yr && Yr.name;
    if (Kr && Kr.indexOf("target-counter-") === 0 || Kr !== "page" || Wr.ruleNode.name === "page" && Wr.ruleNode.type === "Atrule")
      return;
    const Zr = csstree.generate(Wr.ruleNode.prelude);
    return this.pageCounter.increments[Zr] = {
      selector: Zr,
      number: Qr
    };
  }
  insertRule(ze) {
    this.styleSheet.insertRule(ze, this.styleSheet.cssRules.length);
  }
}
class NthOfType extends Handler {
  constructor(ze, Wr, Yr) {
    super(ze, Wr, Yr), this.styleSheet = Wr.styleSheet, this.selectors = {};
  }
  onRule(ze, Wr, Yr) {
    let Qr = csstree.generate(ze.prelude);
    if (Qr.match(/:(first|last|nth)-of-type/)) {
      let Kr = csstree.generate(ze.block);
      Kr = Kr.replace(/[{}]/g, "");
      let Zr = "nth-of-type-" + UUID();
      Qr.split(",").forEach((en) => {
        this.selectors[en] ? this.selectors[en][1] = `${this.selectors[en][1]};${Kr}` : this.selectors[en] = [Zr, Kr];
      }), Yr.remove(Wr);
    }
  }
  afterParsed(ze) {
    this.processSelectors(ze, this.selectors);
  }
  processSelectors(ze, Wr) {
    for (let Qr in Wr) {
      let Kr = ze.querySelectorAll(Qr);
      for (var Yr = 0; Yr < Kr.length; Yr++) {
        let en = Kr[Yr].getAttribute("data-nth-of-type");
        en && en != "" ? (en = `${en},${Wr[Qr][0]}`, Kr[Yr].setAttribute("data-nth-of-type", en)) : Kr[Yr].setAttribute("data-nth-of-type", Wr[Qr][0]);
      }
      let Zr = `*[data-nth-of-type*='${Wr[Qr][0]}'] { ${Wr[Qr][1]}; }`;
      this.styleSheet.insertRule(Zr, this.styleSheet.cssRules.length);
    }
  }
}
class Following extends Handler {
  constructor(ze, Wr, Yr) {
    super(ze, Wr, Yr), this.styleSheet = Wr.styleSheet, this.selectors = {};
  }
  onRule(ze, Wr, Yr) {
    let Qr = csstree.generate(ze.prelude);
    if (Qr.match(/\+/)) {
      let Kr = csstree.generate(ze.block);
      Kr = Kr.replace(/[{}]/g, "");
      let Zr = "following-" + UUID();
      Qr.split(",").forEach((en) => {
        this.selectors[en] ? this.selectors[en][1] = `${this.selectors[en][1]};${Kr}` : this.selectors[en] = [Zr, Kr];
      }), Yr.remove(Wr);
    }
  }
  afterParsed(ze) {
    this.processSelectors(ze, this.selectors);
  }
  processSelectors(ze, Wr) {
    for (let Qr in Wr) {
      let Kr = ze.querySelectorAll(Qr);
      for (var Yr = 0; Yr < Kr.length; Yr++) {
        let en = Kr[Yr].getAttribute("data-following");
        en && en != "" ? (en = `${en},${Wr[Qr][0]}`, Kr[Yr].setAttribute("data-following", en)) : Kr[Yr].setAttribute("data-following", Wr[Qr][0]);
      }
      let Zr = `*[data-following*='${Wr[Qr][0]}'] { ${Wr[Qr][1]}; }`;
      this.styleSheet.insertRule(Zr, this.styleSheet.cssRules.length);
    }
  }
}
class Footnotes extends Handler {
  constructor(ze, Wr, Yr) {
    super(ze, Wr, Yr), this.footnotes = {}, this.needsLayout = [];
  }
  onDeclaration(ze, Wr, Yr, Qr) {
    let Kr = ze.property;
    if (Kr === "float") {
      let Zr = ze.value.children && ze.value.children.first();
      if ((Zr && Zr.name) === "footnote") {
        let tn = csstree.generate(Qr.ruleNode.prelude);
        this.footnotes[tn] = {
          selector: tn,
          policy: "auto",
          display: "block"
        }, Yr.remove(Wr);
      }
    }
    if (Kr === "footnote-policy") {
      let Zr = ze.value.children && ze.value.children.first(), en = Zr && Zr.name;
      if (en) {
        let tn = csstree.generate(Qr.ruleNode.prelude), rn = this.footnotes[tn];
        rn && (rn.policy = en);
      }
    }
    if (Kr === "footnote-display") {
      let Zr = ze.value.children && ze.value.children.first(), en = Zr && Zr.name, tn = csstree.generate(Qr.ruleNode.prelude);
      if (en && this.footnotes[tn]) {
        let rn = this.footnotes[tn];
        rn && (rn.display = en);
      }
    }
  }
  onPseudoSelector(ze, Wr, Yr, Qr, Kr) {
    let Zr = ze.name;
    if (Zr === "footnote-marker") {
      let en = Kr.ruleNode.prelude, tn = new csstree.List();
      en.children.first().children.each((rn) => {
        rn.type !== "PseudoElementSelector" && tn.appendData(rn);
      }), tn.appendData({
        type: "AttributeSelector",
        name: {
          type: "Identifier",
          name: "data-footnote-marker"
        },
        flags: null,
        loc: null,
        matcher: null,
        value: null
      }), tn.appendData({
        type: "PseudoElementSelector",
        name: "marker",
        loc: null,
        children: null
      }), en.children.first().children = tn;
    }
    if (Zr === "footnote-call") {
      let en = Kr.ruleNode.prelude, tn = new csstree.List();
      en.children.first().children.each((rn) => {
        rn.type !== "PseudoElementSelector" && tn.appendData(rn);
      }), tn.appendData({
        type: "AttributeSelector",
        name: {
          type: "Identifier",
          name: "data-footnote-call"
        },
        flags: null,
        loc: null,
        matcher: null,
        value: null
      }), tn.appendData({
        type: "PseudoElementSelector",
        name: "after",
        loc: null,
        children: null
      }), en.children.first().children = tn;
    }
  }
  afterParsed(ze) {
    this.processFootnotes(ze, this.footnotes);
  }
  processFootnotes(ze, Wr) {
    for (let Qr in Wr) {
      let Kr = ze.querySelectorAll(Qr), Zr, en = Wr[Qr];
      for (var Yr = 0; Yr < Kr.length; Yr++)
        Zr = Kr[Yr], Zr.setAttribute("data-note", "footnote"), Zr.setAttribute("data-break-before", "avoid"), Zr.setAttribute("data-note-policy", en.policy || "auto"), Zr.setAttribute("data-note-display", en.display || "block"), this.processFootnoteContainer(Zr);
    }
  }
  processFootnoteContainer(ze) {
    let Wr = ze.parentElement, Yr = Wr;
    for (; Wr; ) {
      if (isContainer(Wr)) {
        Yr.setAttribute("data-has-notes", "true");
        break;
      }
      Yr = Wr, Wr = Wr.parentElement, Wr || Yr.setAttribute("data-has-notes", "true");
    }
  }
  renderNode(ze) {
    if (ze.nodeType == 1) {
      let Wr;
      if (!ze.dataset)
        return;
      ze.dataset.note === "footnote" ? Wr = [ze] : (ze.dataset.hasNotes || ze.querySelectorAll("[data-note='footnote']")) && (Wr = ze.querySelectorAll("[data-note='footnote']")), Wr && Wr.length && this.findVisibleFootnotes(Wr, ze);
    }
  }
  findVisibleFootnotes(ze, Wr) {
    let Yr, Qr, Kr;
    Yr = Wr.closest(".pagedjs_page_content"), Qr = Yr.getBoundingClientRect(), Kr = Qr.left + Qr.width;
    for (let Zr = 0; Zr < ze.length; ++Zr) {
      let en = ze[Zr];
      en.getBoundingClientRect().left < Kr && this.moveFootnote(en, Wr.closest(".pagedjs_area"), !0);
    }
  }
  moveFootnote(ze, Wr, Yr) {
    let Qr = Wr.querySelector(".pagedjs_footnote_area"), Kr = Qr.querySelector(".pagedjs_footnote_content"), Zr = Kr.querySelector(".pagedjs_footnote_inner_content");
    if (!isElement(ze))
      return;
    let en;
    if (Yr && (en = this.createFootnoteCall(ze)), ze.removeAttribute("data-break-before"), Zr.querySelector(`[data-ref="${ze.dataset.ref}"]`)) {
      ze.remove();
      return;
    }
    Zr.appendChild(ze), Kr.classList.contains("pagedjs_footnote_empty") && Kr.classList.remove("pagedjs_footnote_empty"), ze.dataset.footnoteMarker = ze.dataset.ref, ze.id = `note-${ze.dataset.ref}`;
    let rn = Kr.scrollHeight, on = Wr.querySelector(".pagedjs_page_content").getBoundingClientRect(), an = on.left + on.width, dn = en && en.getBoundingClientRect(), pn = Qr.getBoundingClientRect(), mn = this.marginsHeight(Kr), vn = this.paddingHeight(Kr), xn = this.borderHeight(Kr), gn = mn + vn + xn, un = Math.floor(pn.top);
    pn.height === 0 && (un -= this.marginsHeight(Kr, !1), un -= this.paddingHeight(Kr, !1), un -= this.borderHeight(Kr, !1));
    let fn = ze.dataset.notePolicy, cn = 0, Cn = 0;
    if (en) {
      let Ln = en.previousSibling, Pn = new Range();
      Ln ? Pn.setStartBefore(Ln) : Pn.setStartBefore(en), Pn.setEndAfter(en);
      let In = Pn.getBoundingClientRect();
      if (cn = In.bottom, !fn || fn === "auto")
        Cn = Math.ceil(In.bottom);
      else if (fn === "line")
        Cn = Math.ceil(In.top);
      else if (fn === "block") {
        let Mn = en.closest("p").previousElementSibling;
        Mn ? Cn = Math.ceil(
          Mn.getBoundingClientRect().bottom
        ) : Cn = Math.ceil(In.bottom);
      }
    }
    let bn = rn + gn - pn.height, Sn = cn ? un - cn : 0, _n = cn ? Math.floor(pn.top) - Cn : 0, Tn = Qr.querySelector("[data-note='footnote']");
    if (Yr && dn.left > an)
      ze.remove();
    else if (!Tn && Yr && gn > Sn) {
      Wr.style.setProperty("--pagedjs-footnotes-height", "0px");
      let Ln = document.createElement("div");
      Ln.appendChild(ze), this.needsLayout.push(Ln);
    } else Yr ? cn < pn.top - bn ? Wr.style.setProperty(
      "--pagedjs-footnotes-height",
      `${rn + mn + xn}px`
    ) : (Wr.style.setProperty(
      "--pagedjs-footnotes-height",
      `${pn.height + _n}px`
    ), Zr.style.height = pn.height + _n - gn + "px") : Wr.style.setProperty(
      "--pagedjs-footnotes-height",
      `${rn + gn}px`
    );
  }
  createFootnoteCall(ze) {
    let Wr = ze.parentElement, Yr = document.createElement("a");
    for (const Qr of ze.classList)
      Yr.classList.add(`${Qr}`);
    return Yr.dataset.footnoteCall = ze.dataset.ref, Yr.dataset.ref = ze.dataset.ref, Yr.dataset.dataCounterFootnoteIncrement = 1, Yr.href = `#note-${ze.dataset.ref}`, Wr.insertBefore(Yr, ze), Yr;
  }
  afterPageLayout(ze, Wr, Yr, Qr) {
    let Kr = ze.querySelector(".pagedjs_area"), Zr = Wr.footnotesArea, en = Zr.querySelector(".pagedjs_footnote_content"), tn = Zr.querySelector(".pagedjs_footnote_inner_content"), rn = en.getBoundingClientRect(), { width: sn } = rn;
    tn.style.columnWidth = Math.round(sn) + "px", tn.style.columnGap = "calc(var(--pagedjs-margin-right) + var(--pagedjs-margin-left))";
    let an = new Layout(Zr, void 0, Qr.settings).findOverflow(tn, rn);
    if (an) {
      let { startContainer: dn, startOffset: pn } = an, mn;
      if (isElement(dn)) {
        let Cn = dn.childNodes[pn];
        mn = isElement(Cn) && Cn.hasAttribute("data-footnote-marker");
      }
      let vn = an.extractContents();
      if (!mn) {
        let Cn = vn.firstElementChild;
        Cn.dataset.splitFrom = Cn.dataset.ref, this.handleAlignment(tn.lastElementChild);
      }
      this.needsLayout.push(vn), en.style.removeProperty("height"), tn.style.removeProperty("height");
      let xn = tn.getBoundingClientRect(), { height: gn } = xn, un = this.marginsHeight(en), fn = this.paddingHeight(en), cn = this.borderHeight(en);
      if (Kr.style.setProperty(
        "--pagedjs-footnotes-height",
        `${gn + un + cn + fn}px`
      ), tn.childNodes.length === 0 && en.classList.add("pagedjs_footnote_empty"), !Yr)
        Qr.clonePage(Wr);
      else {
        let Cn, bn;
        Yr.node && typeof Yr.node.dataset < "u" && typeof Yr.node.dataset.previousBreakAfter < "u" && (bn = Yr.node.dataset.previousBreakAfter), Yr.node && typeof Yr.node.dataset < "u" && typeof Yr.node.dataset.breakBefore < "u" && (Cn = Yr.node.dataset.breakBefore), (Cn || bn) && Qr.clonePage(Wr);
      }
    }
    tn.style.height = "auto";
  }
  handleAlignment(ze) {
    let Yr = window.getComputedStyle(ze)["text-align-last"];
    ze.dataset.lastSplitElement = "true", Yr === "auto" ? ze.dataset.alignLastSplitElement = "justify" : ze.dataset.alignLastSplitElement = Yr;
  }
  beforePageLayout(ze) {
    for (; this.needsLayout.length; ) {
      let Wr = this.needsLayout.shift();
      Array.from(Wr.childNodes).forEach((Yr) => {
        this.moveFootnote(
          Yr,
          ze.element.querySelector(".pagedjs_area"),
          !1
        );
      });
    }
  }
  afterOverflowRemoved(ze, Wr) {
    let Yr = Wr.closest(".pagedjs_area"), Qr = Yr.querySelectorAll(".pagedjs_footnote_area [data-note='footnote']");
    for (let Zr = 0; Zr < Qr.length; Zr++) {
      const en = Qr[Zr];
      ze.querySelector(`[data-footnote-call="${en.dataset.ref}"]`) && en.remove();
    }
    let Kr = Yr.querySelector(".pagedjs_footnote_inner_content");
    Kr && Kr.childNodes.length === 0 && Kr.parentElement.classList.add("pagedjs_footnote_empty");
  }
  marginsHeight(ze, Wr = !0) {
    let Yr = window.getComputedStyle(ze), Qr = parseInt(Yr.marginTop), Kr = parseInt(Yr.marginBottom), Zr = 0;
    return Qr && (Zr += Qr), Kr && Wr && (Zr += Kr), Zr;
  }
  paddingHeight(ze, Wr = !0) {
    let Yr = window.getComputedStyle(ze), Qr = parseInt(Yr.paddingTop), Kr = parseInt(Yr.paddingBottom), Zr = 0;
    return Qr && (Zr += Qr), Kr && Wr && (Zr += Kr), Zr;
  }
  borderHeight(ze, Wr = !0) {
    let Yr = window.getComputedStyle(ze), Qr = parseInt(Yr.borderTop), Kr = parseInt(Yr.borderBottom), Zr = 0;
    return Qr && (Zr += Qr), Kr && Wr && (Zr += Kr), Zr;
  }
}
const pagedMediaHandlers = [
  PrintMedia,
  AtPage,
  Breaks,
  Splits,
  Counters,
  Lists,
  PositionFixed,
  PageCounterIncrement,
  NthOfType,
  Following,
  Footnotes
];
class RunningHeaders extends Handler {
  constructor(ze, Wr, Yr) {
    super(ze, Wr, Yr), this.runningSelectors = {}, this.elements = {};
  }
  onDeclaration(ze, Wr, Yr, Qr) {
    if (ze.property === "position") {
      let Kr = csstree.generate(Qr.ruleNode.prelude), Zr = ze.value.children.first().name;
      if (Zr === "running") {
        let en;
        csstree.walk(ze, {
          visit: "Function",
          enter: (tn, rn, sn) => {
            en = tn.children.first().name;
          }
        }), this.runningSelectors[en] = {
          identifier: Zr,
          value: en,
          selector: Kr
        };
      }
    }
    ze.property === "content" && csstree.walk(ze, {
      visit: "Function",
      enter: (Kr, Zr, en) => {
        if (Kr.name.indexOf("element") > -1) {
          let tn = csstree.generate(Qr.ruleNode.prelude), rn = Kr.name, sn = Kr.children.first().name, on = [sn], an = "first";
          tn.split(",").forEach((dn) => {
            dn = dn.replace(/::after|::before/, ""), this.elements[dn] = {
              func: rn,
              args: on,
              value: sn,
              style: an,
              selector: dn,
              fullSelector: tn
            };
          });
        }
      }
    });
  }
  afterParsed(ze) {
    for (let Wr of Object.keys(this.runningSelectors)) {
      let Yr = this.runningSelectors[Wr], Qr = Array.from(ze.querySelectorAll(Yr.selector));
      if (Yr.identifier === "running")
        for (let Kr of Qr)
          Kr.style.display = "none";
    }
  }
  afterPageLayout(ze) {
    for (let Wr of Object.keys(this.runningSelectors)) {
      let Yr = this.runningSelectors[Wr], Qr = ze.querySelector(Yr.selector);
      Qr && (Yr.identifier === "running" ? Yr.first = Qr : console.warn(Yr.value + "needs css replacement"));
    }
    this.orderedSelectors || (this.orderedSelectors = this.orderSelectors(this.elements));
    for (let Wr of this.orderedSelectors)
      if (Wr) {
        let Yr = this.elements[Wr], Qr = ze.querySelector(Wr);
        if (Qr) {
          let Kr = this.runningSelectors[Yr.args[0]];
          if (Kr && Kr.first) {
            Qr.innerHTML = "";
            let Zr = Kr.first.cloneNode(!0);
            Zr.style.display = null, Qr.appendChild(Zr);
          }
        }
      }
  }
  /**
  * Assign a weight to @page selector classes
  * 1) page
  * 2) left & right
  * 3) blank
  * 4) first & nth
  * 5) named page
  * 6) named left & right
  * 7) named first & nth
  * @param {string} [s] selector string
  * @return {int} weight
  */
  pageWeight(ze) {
    let Wr = 1, Yr = ze.split(" "), Qr = Yr.length && Yr[0].split(".");
    switch (Qr.shift(), Qr.length) {
      case 4:
        /^pagedjs_[\w-]+_first_page$/.test(Qr[3]) ? Wr = 7 : (Qr[3] === "pagedjs_left_page" || Qr[3] === "pagedjs_right_page") && (Wr = 6);
        break;
      case 3:
        Qr[1] === "pagedjs_named_page" && (Qr[2].indexOf(":nth-of-type") > -1 ? Wr = 7 : Wr = 5);
        break;
      case 2:
        Qr[1] === "pagedjs_first_page" ? Wr = 4 : Qr[1] === "pagedjs_blank_page" ? Wr = 3 : (Qr[1] === "pagedjs_left_page" || Qr[1] === "pagedjs_right_page") && (Wr = 2);
        break;
      default:
        Qr[0].indexOf(":nth-of-type") > -1 ? Wr = 4 : Wr = 1;
    }
    return Wr;
  }
  /**
  * Orders the selectors based on weight
  *
  * Does not try to deduplicate base on specifity of the selector
  * Previous matched selector will just be overwritten
  * @param {obj} [obj] selectors object
  * @return {Array} orderedSelectors
  */
  orderSelectors(ze) {
    let Wr = Object.keys(ze), Yr = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: []
    }, Qr = [];
    for (let Zr of Wr) {
      let en = this.pageWeight(Zr);
      Yr[en].unshift(Zr);
    }
    for (var Kr = 1; Kr <= 7; Kr++)
      Qr = Qr.concat(Yr[Kr]);
    return Qr;
  }
  beforeTreeParse(ze, Wr) {
    Wr.text = ze.replace(/element[\s]*\(([^|^#)]*)\)/g, "element-ident($1)");
  }
}
function cleanPseudoContent(Gr, ze = `"' `) {
  if (Gr != null)
    return Gr.replace(new RegExp(`^[${ze}]+`), "").replace(new RegExp(`[${ze}]+$`), "").replace(/["']/g, (Wr) => "\\" + Wr).replace(/[\n]/g, (Wr) => "\\00000A");
}
function cleanSelector(Gr) {
  if (Gr != null)
    return Gr.replace(new RegExp("::footnote-call", "g"), "").replace(new RegExp("::footnote-marker", "g"), "");
}
class StringSets extends Handler {
  constructor(ze, Wr, Yr) {
    super(ze, Wr, Yr), this.stringSetSelectors = {}, this.type, this.pageLastString;
  }
  onDeclaration(ze, Wr, Yr, Qr) {
    if (ze.property === "string-set") {
      let Kr = csstree.generate(Qr.ruleNode.prelude), Zr = [], en = [], tn = [];
      ze.value.children.forEach((rn) => {
        rn.type === "Identifier" && Zr.push(rn.name), rn.type === "Function" && (en.push(rn.name), rn.children.forEach((sn) => {
          sn.type === "Identifier" && tn.push(sn.name);
        }));
      }), Zr.forEach((rn, sn) => {
        let on = en[sn], an = tn[sn];
        this.stringSetSelectors[rn] = {
          identifier: rn,
          func: on,
          value: an,
          selector: Kr
        };
      });
    }
  }
  onContent(ze, Wr, Yr, Qr, Kr) {
    if (ze.name === "string") {
      let Zr = ze.children && ze.children.first().name;
      this.type = ze.children.last().name, ze.name = "var", ze.children = new csstree.List(), this.type === "first" || this.type === "last" || this.type === "start" || this.type === "first-except" ? ze.children.append(
        ze.children.createItem({
          type: "Identifier",
          loc: null,
          name: "--pagedjs-string-" + this.type + "-" + Zr
        })
      ) : ze.children.append(
        ze.children.createItem({
          type: "Identifier",
          loc: null,
          name: "--pagedjs-string-first-" + Zr
        })
      );
    }
  }
  afterPageLayout(ze) {
    this.pageLastString === void 0 && (this.pageLastString = {});
    for (let Wr of Object.keys(this.stringSetSelectors)) {
      let Yr = this.stringSetSelectors[Wr], Qr = Yr.value, Kr = Yr.func, Zr = ze.querySelectorAll(Yr.selector), en = Wr in this.pageLastString ? this.pageLastString[Wr] : "", tn, rn, sn, on;
      if (Zr.length == 0)
        tn = en, rn = en, sn = en, on = en;
      else {
        Zr.forEach((mn) => {
          Kr === "content" && (this.pageLastString[Wr] = Zr[Zr.length - 1].textContent), Kr === "attr" && (this.pageLastString[Wr] = Zr[Zr.length - 1].getAttribute(Qr) || "");
        }), Kr === "content" && (tn = Zr[0].textContent), Kr === "attr" && (tn = Zr[0].getAttribute(Qr) || ""), Kr === "content" && (rn = Zr[Zr.length - 1].textContent), Kr === "attr" && (rn = Zr[Zr.length - 1].getAttribute(Qr) || "");
        let an = Zr[0].getBoundingClientRect().top, pn = Zr[0].closest(".pagedjs_page_content").getBoundingClientRect().top;
        an == pn ? sn = tn : sn = en, on = "";
      }
      ze.style.setProperty(`--pagedjs-string-first-${Wr}`, `"${cleanPseudoContent(tn)}`), ze.style.setProperty(`--pagedjs-string-last-${Wr}`, `"${cleanPseudoContent(rn)}`), ze.style.setProperty(`--pagedjs-string-start-${Wr}`, `"${cleanPseudoContent(sn)}`), ze.style.setProperty(`--pagedjs-string-first-except-${Wr}`, `"${cleanPseudoContent(on)}`);
    }
  }
}
class TargetCounters extends Handler {
  constructor(ze, Wr, Yr) {
    super(ze, Wr, Yr), this.styleSheet = Wr.styleSheet, this.counterTargets = {};
  }
  onContent(ze, Wr, Yr, Qr, Kr) {
    if (ze.name === "target-counter") {
      let Zr = csstree.generate(Kr.ruleNode.prelude), en = ze.children.first(), tn = en.name, rn = csstree.generate(ze), sn = [];
      en.children.forEach((mn) => {
        mn.type === "Identifier" && sn.push(mn.name);
      });
      let on, an, dn;
      ze.children.forEach((mn) => {
        mn.type === "Identifier" && (on ? an || (dn = csstree.clone(mn), an = mn.name) : on = mn.name);
      });
      let pn = "target-counter-" + UUID();
      Zr.split(",").forEach((mn) => {
        this.counterTargets[mn] = {
          func: tn,
          args: sn,
          value: rn,
          counter: on,
          style: an,
          selector: mn,
          fullSelector: Zr,
          variable: pn
        };
      }), ze.name = "counter", ze.children = new csstree.List(), ze.children.appendData({
        type: "Identifier",
        loc: 0,
        name: pn
      }), dn && (ze.children.appendData({ type: "Operator", loc: null, value: "," }), ze.children.appendData(dn));
    }
  }
  afterPageLayout(ze, Wr, Yr, Qr) {
    Object.keys(this.counterTargets).forEach((Kr) => {
      let Zr = this.counterTargets[Kr], en = Zr.selector.split(/::?/g), tn = en[0];
      Qr.pagesArea.querySelectorAll(tn + ":not([data-" + Zr.variable + "])").forEach((sn, on) => {
        if (Zr.func !== "attr")
          return;
        let an = attr(sn, Zr.args), dn = Qr.pagesArea.querySelector(querySelectorEscape(an));
        if (dn) {
          let pn = UUID();
          sn.setAttribute("data-" + Zr.variable, pn);
          let mn = "";
          if (en.length > 1 && (mn += "::" + en[1]), Zr.counter === "page") {
            let xn = Qr.pagesArea.querySelectorAll(".pagedjs_page"), gn = 0;
            for (let un = 0; un < xn.length; un++) {
              let fn = xn[un], cn = window.getComputedStyle(fn), Cn = cn["counter-reset"].replace("page", "").trim(), bn = cn["counter-increment"].replace("page", "").trim();
              if (Cn !== "none" && (gn = parseInt(Cn)), bn !== "none" && (gn += parseInt(bn)), fn.contains(dn))
                break;
            }
            this.styleSheet.insertRule(`[data-${Zr.variable}="${pn}"]${mn} { counter-reset: ${Zr.variable} ${gn}; }`, this.styleSheet.cssRules.length);
          } else {
            let xn = dn.getAttribute(`data-counter-${Zr.counter}-value`);
            xn && this.styleSheet.insertRule(`[data-${Zr.variable}="${pn}"]${mn} { counter-reset: ${Zr.variable} ${Zr.variable} ${parseInt(xn)}; }`, this.styleSheet.cssRules.length);
          }
          let vn = document.querySelector(`[data-${Zr.variable}="${pn}"]`);
          vn && (vn.style.display = "none", vn.clientHeight, vn.style.removeProperty("display"));
        }
      });
    });
  }
}
class TargetText extends Handler {
  constructor(ze, Wr, Yr) {
    super(ze, Wr, Yr), this.styleSheet = Wr.styleSheet, this.textTargets = {}, this.beforeContent = "", this.afterContent = "", this.selector = {};
  }
  onContent(ze, Wr, Yr, Qr, Kr) {
    if (ze.name === "target-text") {
      this.selector = csstree.generate(Kr.ruleNode.prelude);
      let Zr = ze.children.first(), en = ze.children.last(), tn = Zr.name, rn = csstree.generate(ze), sn = [];
      Zr.children.forEach((dn) => {
        dn.type === "Identifier" && sn.push(dn.name);
      });
      let on;
      en !== Zr && (on = en.name);
      let an = "--pagedjs-" + UUID();
      this.selector.split(",").forEach((dn) => {
        this.textTargets[dn] = {
          func: tn,
          args: sn,
          value: rn,
          style: on || "content",
          selector: dn,
          fullSelector: this.selector,
          variable: an
        };
      }), ze.name = "var", ze.children = new csstree.List(), ze.children.appendData({
        type: "Identifier",
        loc: 0,
        name: an
      });
    }
  }
  //   parse this on the ONCONTENT : get all before and after and replace the value with a variable
  onPseudoSelector(ze, Wr, Yr, Qr, Kr) {
    Kr.ruleNode.block.children.forEach((Zr) => {
      ze.name === "before" && Zr.property === "content" ? Zr.value.children.forEach((tn) => {
        tn.type === "String" && (this.beforeContent = tn.value);
      }) : ze.name === "after" && Zr.property === "content" && Zr.value.children.forEach((en) => {
        en.type === "String" && (this.afterContent = en.value);
      });
    });
  }
  afterParsed(ze) {
    Object.keys(this.textTargets).forEach((Wr) => {
      let Yr = this.textTargets[Wr], Qr = Yr.selector.split("::"), Kr = Qr[0], Zr = ze.querySelectorAll(Kr), en;
      Zr.forEach((tn, rn) => {
        let sn = attr(tn, Yr.args), on = ze.querySelector(querySelectorEscape(sn));
        if (on)
          if (Yr.style) {
            this.selector = UUID(), tn.setAttribute("data-target-text", this.selector);
            let an = "";
            if (Qr.length > 1 && (an += "::" + Qr[1]), Yr.style === "before" || Yr.style === "after") {
              const dn = `${Yr.style}Content`;
              en = cleanPseudoContent(this[dn]);
            } else
              en = cleanPseudoContent(on.textContent, " ");
            en = Yr.style === "first-letter" ? en.charAt(0) : en, this.styleSheet.insertRule(`[data-target-text="${this.selector}"]${an} { ${Yr.variable}: "${en}" }`);
          } else
            console.warn("missed target", sn);
      });
    });
  }
}
const generatedContentHandlers = [
  RunningHeaders,
  StringSets,
  TargetCounters,
  TargetText
];
class WhiteSpaceFilter extends Handler {
  constructor(ze, Wr, Yr) {
    super(ze, Wr, Yr);
  }
  filter(ze) {
    filterTree(ze, (Wr) => this.filterEmpty(Wr), NodeFilter.SHOW_TEXT);
  }
  filterEmpty(ze) {
    if (ze.textContent.length > 1 && isIgnorable(ze)) {
      let Wr = ze.parentNode;
      if (isElement(Wr) && Wr.closest("pre"))
        return NodeFilter.FILTER_REJECT;
      const Qr = previousSignificantNode(ze), Kr = nextSignificantNode(ze);
      return Kr === null && Qr === null ? (ze.textContent = " ", NodeFilter.FILTER_REJECT) : Kr === null || Qr === null ? NodeFilter.FILTER_ACCEPT : (ze.textContent = " ", NodeFilter.FILTER_REJECT);
    } else
      return NodeFilter.FILTER_REJECT;
  }
}
class CommentsFilter extends Handler {
  constructor(ze, Wr, Yr) {
    super(ze, Wr, Yr);
  }
  filter(ze) {
    filterTree(ze, null, NodeFilter.SHOW_COMMENT);
  }
}
class ScriptsFilter extends Handler {
  constructor(ze, Wr, Yr) {
    super(ze, Wr, Yr);
  }
  filter(ze) {
    ze.querySelectorAll("script").forEach((Wr) => {
      Wr.remove();
    });
  }
}
var clearCut = {}, hasRequiredClearCut;
function requireClearCut() {
  return hasRequiredClearCut || (hasRequiredClearCut = 1, function(Gr) {
    var ze = /(\[[^\]]+\])/g, Wr = /(#[^\s\+>~\.\[:]+)/g, Yr = /(\.[^\s\+>~\.\[:]+)/g, Qr = /(::[^\s\+>~\.\[:]+|:first-line|:first-letter|:before|:after)/g, Kr = /(:[^\s\+>~\.\[:]+)/g, Zr = /([^\s\+>~\.\[:]+)/g, en = /:not\(([^\)]*)\)/g, tn = /\{[^]*/gm, rn = /[\*\s\+>~]/g, sn = /[#\.]/g, on = function(vn, xn, gn, un) {
      var fn = un.match(vn);
      if (fn)
        for (var cn = 0; cn < fn.length; cn++)
          gn[xn]++, un = un.replace(fn[cn], " ");
      return un;
    }, an = function(vn) {
      var xn = vn.indexOf(",");
      xn !== -1 && (vn = vn.substring(0, xn));
      var gn = {
        a: 0,
        b: 0,
        c: 0
      };
      return vn = vn.replace(en, " $1 "), vn = vn.replace(tn, " "), vn = on(ze, "b", gn, vn), vn = on(Wr, "a", gn, vn), vn = on(Yr, "b", gn, vn), vn = on(Qr, "c", gn, vn), vn = on(Kr, "b", gn, vn), vn = vn.replace(rn, " "), vn = vn.replace(sn, " "), on(Zr, "c", gn, vn), gn.a * 100 + gn.b * 10 + gn.c * 1;
    }, dn = {};
    Gr.calculateSpecificity = function(vn) {
      var xn = dn[vn];
      return xn === void 0 && (xn = an(vn), dn[vn] = xn), xn;
    };
    var pn = {}, mn = null;
    Gr.isSelectorValid = function(vn) {
      var xn = pn[vn];
      if (xn === void 0) {
        mn == null && (mn = document.createElement("div"));
        try {
          mn.querySelector(vn), xn = !0;
        } catch {
          xn = !1;
        }
        pn[vn] = xn;
      }
      return xn;
    }, Gr.validateSelector = function(vn) {
      if (!Gr.isSelectorValid(vn)) {
        var xn = new SyntaxError(vn + " is not a valid selector");
        throw xn.code = "EBADSELECTOR", xn;
      }
    };
  }(clearCut)), clearCut;
}
var clearCutExports = requireClearCut();
class UndisplayedFilter extends Handler {
  constructor(ze, Wr, Yr) {
    super(ze, Wr, Yr), this.displayRules = {};
  }
  onDeclaration(ze, Wr, Yr, Qr) {
    if (ze.property === "display") {
      let Kr = csstree.generate(Qr.ruleNode.prelude), Zr = ze.value.children.first().name;
      Kr.split(",").forEach((en) => {
        this.displayRules[en] = {
          value: Zr,
          selector: en,
          specificity: clearCutExports.calculateSpecificity(en),
          important: ze.important
        };
      });
    }
  }
  filter(ze) {
    let { matches: Wr, selectors: Yr } = this.sortDisplayedSelectors(ze, this.displayRules);
    for (let Kr = 0; Kr < Wr.length; Kr++) {
      let Zr = Wr[Kr], en = Yr[Kr], tn = en[en.length - 1].value;
      this.removable(Zr) && tn === "none" && (Zr.dataset.undisplayed = "undisplayed");
    }
    let Qr = ze.querySelectorAll("[style]");
    for (let Kr = 0; Kr < Qr.length; Kr++) {
      let Zr = Qr[Kr];
      this.removable(Zr) && (Zr.dataset.undisplayed = "undisplayed");
    }
  }
  sorter(ze, Wr) {
    return ze.important && !Wr.important ? 1 : Wr.important && !ze.important ? -1 : ze.specificity - Wr.specificity;
  }
  sortDisplayedSelectors(ze, Wr = []) {
    let Yr = [], Qr = [];
    for (let Kr in Wr) {
      let Zr = Wr[Kr], en = Zr.selector, tn = [];
      try {
        try {
          tn = ze.querySelectorAll(en);
        } catch {
          tn = ze.querySelectorAll(cleanSelector(en));
        }
      } catch {
        tn = [];
      }
      let rn = Array.from(tn);
      for (let sn of rn)
        if (Yr.includes(sn)) {
          let on = Yr.indexOf(sn);
          Qr[on].push(Zr), Qr[on] = Qr[on].sort(this.sorter);
        } else
          Yr.push(sn), Qr.push([Zr]);
    }
    return { matches: Yr, selectors: Qr };
  }
  removable(ze) {
    return !(ze.style && ze.style.display !== "" && ze.style.display !== "none");
  }
}
const filters = [
  WhiteSpaceFilter,
  CommentsFilter,
  ScriptsFilter,
  UndisplayedFilter
];
var isImplemented$4, hasRequiredIsImplemented$4;
function requireIsImplemented$4() {
  return hasRequiredIsImplemented$4 || (hasRequiredIsImplemented$4 = 1, isImplemented$4 = function() {
    var Gr = Array.from, ze, Wr;
    return typeof Gr != "function" ? !1 : (ze = ["raz", "dwa"], Wr = Gr(ze), !!(Wr && Wr !== ze && Wr[1] === "dwa"));
  }), isImplemented$4;
}
var isImplemented$3, hasRequiredIsImplemented$3;
function requireIsImplemented$3() {
  return hasRequiredIsImplemented$3 || (hasRequiredIsImplemented$3 = 1, isImplemented$3 = function() {
    return typeof globalThis != "object" || !globalThis ? !1 : globalThis.Array === Array;
  }), isImplemented$3;
}
var implementation, hasRequiredImplementation;
function requireImplementation() {
  if (hasRequiredImplementation) return implementation;
  hasRequiredImplementation = 1;
  var Gr = function() {
    if (typeof self == "object" && self) return self;
    if (typeof window == "object" && window) return window;
    throw new Error("Unable to resolve global `this`");
  };
  return implementation = function() {
    if (this) return this;
    try {
      Object.defineProperty(Object.prototype, "__global__", {
        get: function() {
          return this;
        },
        configurable: !0
      });
    } catch {
      return Gr();
    }
    try {
      return __global__ || Gr();
    } finally {
      delete Object.prototype.__global__;
    }
  }(), implementation;
}
var globalThis_1, hasRequiredGlobalThis;
function requireGlobalThis() {
  return hasRequiredGlobalThis || (hasRequiredGlobalThis = 1, globalThis_1 = requireIsImplemented$3()() ? globalThis : requireImplementation()), globalThis_1;
}
var isImplemented$2, hasRequiredIsImplemented$2;
function requireIsImplemented$2() {
  if (hasRequiredIsImplemented$2) return isImplemented$2;
  hasRequiredIsImplemented$2 = 1;
  var Gr = requireGlobalThis(), ze = { object: !0, symbol: !0 };
  return isImplemented$2 = function() {
    var Wr = Gr.Symbol, Yr;
    if (typeof Wr != "function") return !1;
    Yr = Wr("test symbol");
    try {
      String(Yr);
    } catch {
      return !1;
    }
    return !(!ze[typeof Wr.iterator] || !ze[typeof Wr.toPrimitive] || !ze[typeof Wr.toStringTag]);
  }, isImplemented$2;
}
var isSymbol, hasRequiredIsSymbol;
function requireIsSymbol() {
  return hasRequiredIsSymbol || (hasRequiredIsSymbol = 1, isSymbol = function(Gr) {
    return Gr ? typeof Gr == "symbol" ? !0 : !Gr.constructor || Gr.constructor.name !== "Symbol" ? !1 : Gr[Gr.constructor.toStringTag] === "Symbol" : !1;
  }), isSymbol;
}
var validateSymbol, hasRequiredValidateSymbol;
function requireValidateSymbol() {
  if (hasRequiredValidateSymbol) return validateSymbol;
  hasRequiredValidateSymbol = 1;
  var Gr = requireIsSymbol();
  return validateSymbol = function(ze) {
    if (!Gr(ze)) throw new TypeError(ze + " is not a symbol");
    return ze;
  }, validateSymbol;
}
var generateName, hasRequiredGenerateName;
function requireGenerateName() {
  if (hasRequiredGenerateName) return generateName;
  hasRequiredGenerateName = 1;
  var Gr = requireD(), ze = Object.create, Wr = Object.defineProperty, Yr = Object.prototype, Qr = ze(null);
  return generateName = function(Kr) {
    for (var Zr = 0, en, tn; Qr[Kr + (Zr || "")]; ) ++Zr;
    return Kr += Zr || "", Qr[Kr] = !0, en = "@@" + Kr, Wr(
      Yr,
      en,
      Gr.gs(null, function(rn) {
        tn || (tn = !0, Wr(this, en, Gr(rn)), tn = !1);
      })
    ), en;
  }, generateName;
}
var standardSymbols, hasRequiredStandardSymbols;
function requireStandardSymbols() {
  if (hasRequiredStandardSymbols) return standardSymbols;
  hasRequiredStandardSymbols = 1;
  var Gr = requireD(), ze = requireGlobalThis().Symbol;
  return standardSymbols = function(Wr) {
    return Object.defineProperties(Wr, {
      // To ensure proper interoperability with other native functions (e.g. Array.from)
      // fallback to eventual native implementation of given symbol
      hasInstance: Gr(
        "",
        ze && ze.hasInstance || Wr("hasInstance")
      ),
      isConcatSpreadable: Gr(
        "",
        ze && ze.isConcatSpreadable || Wr("isConcatSpreadable")
      ),
      iterator: Gr("", ze && ze.iterator || Wr("iterator")),
      match: Gr("", ze && ze.match || Wr("match")),
      replace: Gr("", ze && ze.replace || Wr("replace")),
      search: Gr("", ze && ze.search || Wr("search")),
      species: Gr("", ze && ze.species || Wr("species")),
      split: Gr("", ze && ze.split || Wr("split")),
      toPrimitive: Gr(
        "",
        ze && ze.toPrimitive || Wr("toPrimitive")
      ),
      toStringTag: Gr(
        "",
        ze && ze.toStringTag || Wr("toStringTag")
      ),
      unscopables: Gr(
        "",
        ze && ze.unscopables || Wr("unscopables")
      )
    });
  }, standardSymbols;
}
var symbolRegistry, hasRequiredSymbolRegistry;
function requireSymbolRegistry() {
  if (hasRequiredSymbolRegistry) return symbolRegistry;
  hasRequiredSymbolRegistry = 1;
  var Gr = requireD(), ze = requireValidateSymbol(), Wr = /* @__PURE__ */ Object.create(null);
  return symbolRegistry = function(Yr) {
    return Object.defineProperties(Yr, {
      for: Gr(function(Qr) {
        return Wr[Qr] ? Wr[Qr] : Wr[Qr] = Yr(String(Qr));
      }),
      keyFor: Gr(function(Qr) {
        var Kr;
        ze(Qr);
        for (Kr in Wr)
          if (Wr[Kr] === Qr) return Kr;
      })
    });
  }, symbolRegistry;
}
var polyfill, hasRequiredPolyfill;
function requirePolyfill() {
  if (hasRequiredPolyfill) return polyfill;
  hasRequiredPolyfill = 1;
  var Gr = requireD(), ze = requireValidateSymbol(), Wr = requireGlobalThis().Symbol, Yr = requireGenerateName(), Qr = requireStandardSymbols(), Kr = requireSymbolRegistry(), Zr = Object.create, en = Object.defineProperties, tn = Object.defineProperty, rn, sn, on;
  if (typeof Wr == "function")
    try {
      String(Wr()), on = !0;
    } catch {
    }
  else
    Wr = null;
  return sn = function(dn) {
    if (this instanceof sn) throw new TypeError("Symbol is not a constructor");
    return rn(dn);
  }, polyfill = rn = function an(dn) {
    var pn;
    if (this instanceof an) throw new TypeError("Symbol is not a constructor");
    return on ? Wr(dn) : (pn = Zr(sn.prototype), dn = dn === void 0 ? "" : String(dn), en(pn, {
      __description__: Gr("", dn),
      __name__: Gr("", Yr(dn))
    }));
  }, Qr(rn), Kr(rn), en(sn.prototype, {
    constructor: Gr(rn),
    toString: Gr("", function() {
      return this.__name__;
    })
  }), en(rn.prototype, {
    toString: Gr(function() {
      return "Symbol (" + ze(this).__description__ + ")";
    }),
    valueOf: Gr(function() {
      return ze(this);
    })
  }), tn(
    rn.prototype,
    rn.toPrimitive,
    Gr("", function() {
      var an = ze(this);
      return typeof an == "symbol" ? an : an.toString();
    })
  ), tn(rn.prototype, rn.toStringTag, Gr("c", "Symbol")), tn(
    sn.prototype,
    rn.toStringTag,
    Gr("c", rn.prototype[rn.toStringTag])
  ), tn(
    sn.prototype,
    rn.toPrimitive,
    Gr("c", rn.prototype[rn.toPrimitive])
  ), polyfill;
}
var es6Symbol, hasRequiredEs6Symbol;
function requireEs6Symbol() {
  return hasRequiredEs6Symbol || (hasRequiredEs6Symbol = 1, es6Symbol = requireIsImplemented$2()() ? requireGlobalThis().Symbol : requirePolyfill()), es6Symbol;
}
var isArguments, hasRequiredIsArguments;
function requireIsArguments() {
  if (hasRequiredIsArguments) return isArguments;
  hasRequiredIsArguments = 1;
  var Gr = Object.prototype.toString, ze = Gr.call(/* @__PURE__ */ function() {
    return arguments;
  }());
  return isArguments = function(Wr) {
    return Gr.call(Wr) === ze;
  }, isArguments;
}
var isFunction, hasRequiredIsFunction;
function requireIsFunction() {
  if (hasRequiredIsFunction) return isFunction;
  hasRequiredIsFunction = 1;
  var Gr = Object.prototype.toString, ze = RegExp.prototype.test.bind(/^[object [A-Za-z0-9]*Function]$/);
  return isFunction = function(Wr) {
    return typeof Wr == "function" && ze(Gr.call(Wr));
  }, isFunction;
}
var isImplemented$1, hasRequiredIsImplemented$1;
function requireIsImplemented$1() {
  return hasRequiredIsImplemented$1 || (hasRequiredIsImplemented$1 = 1, isImplemented$1 = function() {
    var Gr = Math.sign;
    return typeof Gr != "function" ? !1 : Gr(10) === 1 && Gr(-20) === -1;
  }), isImplemented$1;
}
var shim$2, hasRequiredShim$2;
function requireShim$2() {
  return hasRequiredShim$2 || (hasRequiredShim$2 = 1, shim$2 = function(Gr) {
    return Gr = Number(Gr), isNaN(Gr) || Gr === 0 ? Gr : Gr > 0 ? 1 : -1;
  }), shim$2;
}
var sign, hasRequiredSign;
function requireSign() {
  return hasRequiredSign || (hasRequiredSign = 1, sign = requireIsImplemented$1()() ? Math.sign : requireShim$2()), sign;
}
var toInteger, hasRequiredToInteger;
function requireToInteger() {
  if (hasRequiredToInteger) return toInteger;
  hasRequiredToInteger = 1;
  var Gr = requireSign(), ze = Math.abs, Wr = Math.floor;
  return toInteger = function(Yr) {
    return isNaN(Yr) ? 0 : (Yr = Number(Yr), Yr === 0 || !isFinite(Yr) ? Yr : Gr(Yr) * Wr(ze(Yr)));
  }, toInteger;
}
var toPosInteger, hasRequiredToPosInteger;
function requireToPosInteger() {
  if (hasRequiredToPosInteger) return toPosInteger;
  hasRequiredToPosInteger = 1;
  var Gr = requireToInteger(), ze = Math.max;
  return toPosInteger = function(Wr) {
    return ze(0, Gr(Wr));
  }, toPosInteger;
}
var isString, hasRequiredIsString;
function requireIsString() {
  if (hasRequiredIsString) return isString;
  hasRequiredIsString = 1;
  var Gr = Object.prototype.toString, ze = Gr.call("");
  return isString = function(Wr) {
    return typeof Wr == "string" || Wr && typeof Wr == "object" && (Wr instanceof String || Gr.call(Wr) === ze) || !1;
  }, isString;
}
var shim$1, hasRequiredShim$1;
function requireShim$1() {
  if (hasRequiredShim$1) return shim$1;
  hasRequiredShim$1 = 1;
  var Gr = requireEs6Symbol().iterator, ze = requireIsArguments(), Wr = requireIsFunction(), Yr = requireToPosInteger(), Qr = requireValidCallable(), Kr = requireValidValue(), Zr = requireIsValue(), en = requireIsString(), tn = Array.isArray, rn = Function.prototype.call, sn = { configurable: !0, enumerable: !0, writable: !0, value: null }, on = Object.defineProperty;
  return shim$1 = function(an) {
    var dn = arguments[1], pn = arguments[2], mn, vn, xn, gn, un, fn, cn, Cn, bn, Sn;
    if (an = Object(Kr(an)), Zr(dn) && Qr(dn), !this || this === Array || !Wr(this)) {
      if (!dn) {
        if (ze(an))
          return un = an.length, un !== 1 ? Array.apply(null, an) : (gn = new Array(1), gn[0] = an[0], gn);
        if (tn(an)) {
          for (gn = new Array(un = an.length), vn = 0; vn < un; ++vn) gn[vn] = an[vn];
          return gn;
        }
      }
      gn = [];
    } else
      mn = this;
    if (!tn(an)) {
      if ((bn = an[Gr]) !== void 0) {
        for (cn = Qr(bn).call(an), mn && (gn = new mn()), Cn = cn.next(), vn = 0; !Cn.done; )
          Sn = dn ? rn.call(dn, pn, Cn.value, vn) : Cn.value, mn ? (sn.value = Sn, on(gn, vn, sn)) : gn[vn] = Sn, Cn = cn.next(), ++vn;
        un = vn;
      } else if (en(an)) {
        for (un = an.length, mn && (gn = new mn()), vn = 0, xn = 0; vn < un; ++vn)
          Sn = an[vn], vn + 1 < un && (fn = Sn.charCodeAt(0), fn >= 55296 && fn <= 56319 && (Sn += an[++vn])), Sn = dn ? rn.call(dn, pn, Sn, xn) : Sn, mn ? (sn.value = Sn, on(gn, xn, sn)) : gn[xn] = Sn, ++xn;
        un = xn;
      }
    }
    if (un === void 0)
      for (un = Yr(an.length), mn && (gn = new mn(un)), vn = 0; vn < un; ++vn)
        Sn = dn ? rn.call(dn, pn, an[vn], vn) : an[vn], mn ? (sn.value = Sn, on(gn, vn, sn)) : gn[vn] = Sn;
    return mn && (sn.value = null, gn.length = un), gn;
  }, shim$1;
}
var from, hasRequiredFrom;
function requireFrom() {
  return hasRequiredFrom || (hasRequiredFrom = 1, from = requireIsImplemented$4()() ? Array.from : requireShim$1()), from;
}
var isImplemented, hasRequiredIsImplemented;
function requireIsImplemented() {
  return hasRequiredIsImplemented || (hasRequiredIsImplemented = 1, isImplemented = function() {
    var Gr = Number.isNaN;
    return typeof Gr != "function" ? !1 : !Gr({}) && Gr(NaN) && !Gr(34);
  }), isImplemented;
}
var shim, hasRequiredShim;
function requireShim() {
  return hasRequiredShim || (hasRequiredShim = 1, shim = function(Gr) {
    return Gr !== Gr;
  }), shim;
}
var isNan, hasRequiredIsNan;
function requireIsNan() {
  return hasRequiredIsNan || (hasRequiredIsNan = 1, isNan = requireIsImplemented()() ? Number.isNaN : requireShim()), isNan;
}
var eIndexOf, hasRequiredEIndexOf;
function requireEIndexOf() {
  if (hasRequiredEIndexOf) return eIndexOf;
  hasRequiredEIndexOf = 1;
  var Gr = requireIsNan(), ze = requireToPosInteger(), Wr = requireValidValue(), Yr = Array.prototype.indexOf, Qr = Object.prototype.hasOwnProperty, Kr = Math.abs, Zr = Math.floor;
  return eIndexOf = function(en) {
    var tn, rn, sn, on;
    if (!Gr(en)) return Yr.apply(this, arguments);
    for (rn = ze(Wr(this).length), sn = arguments[1], isNaN(sn) ? sn = 0 : sn >= 0 ? sn = Zr(sn) : sn = ze(this.length) - Zr(Kr(sn)), tn = sn; tn < rn; ++tn)
      if (Qr.call(this, tn) && (on = this[tn], Gr(on)))
        return tn;
    return -1;
  }, eIndexOf;
}
var remove, hasRequiredRemove;
function requireRemove() {
  if (hasRequiredRemove) return remove;
  hasRequiredRemove = 1;
  var Gr = requireEIndexOf(), ze = Array.prototype.forEach, Wr = Array.prototype.splice;
  return remove = function(Yr) {
    ze.call(
      arguments,
      function(Qr) {
        var Kr = Gr.call(this, Qr);
        Kr !== -1 && Wr.call(this, Kr, 1);
      },
      this
    );
  }, remove;
}
var isObject, hasRequiredIsObject;
function requireIsObject() {
  if (hasRequiredIsObject) return isObject;
  hasRequiredIsObject = 1;
  var Gr = requireIsValue(), ze = { function: !0, object: !0 };
  return isObject = function(Wr) {
    return Gr(Wr) && ze[typeof Wr] || !1;
  }, isObject;
}
var validObject, hasRequiredValidObject;
function requireValidObject() {
  if (hasRequiredValidObject) return validObject;
  hasRequiredValidObject = 1;
  var Gr = requireIsObject();
  return validObject = function(ze) {
    if (!Gr(ze)) throw new TypeError(ze + " is not an Object");
    return ze;
  }, validObject;
}
var pipe$1, hasRequiredPipe;
function requirePipe() {
  if (hasRequiredPipe) return pipe$1;
  hasRequiredPipe = 1;
  var Gr = requireFrom(), ze = requireRemove(), Wr = requireValidObject(), Yr = requireD(), Qr = requireEventEmitter().methods.emit, Kr = Object.defineProperty, Zr = Object.prototype.hasOwnProperty, en = Object.getOwnPropertyDescriptor;
  return pipe$1 = function(tn, rn) {
    var sn, on, an, dn;
    return Wr(tn) && Wr(rn), dn = arguments[2], dn === void 0 && (dn = "emit"), on = {
      close: function() {
        ze.call(sn, rn);
      }
    }, Zr.call(tn, "__eePipes__") ? ((sn = tn.__eePipes__).push(rn), on) : (Kr(tn, "__eePipes__", Yr("c", sn = [rn])), an = en(tn, dn), an ? (delete an.get, delete an.set) : an = Yr("c", void 0), an.value = function() {
      var pn, mn, vn = Gr(sn);
      for (Qr.apply(this, arguments), pn = 0; mn = vn[pn]; ++pn) Qr.apply(mn, arguments);
    }, Kr(tn, dn, an), on);
  }, pipe$1;
}
var pipeExports = requirePipe();
const pipe = /* @__PURE__ */ getDefaultExportFromCjs(pipeExports);
let registeredHandlers = [...pagedMediaHandlers, ...generatedContentHandlers, ...filters];
class Handlers {
  constructor(ze, Wr, Yr) {
    registeredHandlers.forEach((Qr) => {
      let Kr = new Qr(ze, Wr, Yr);
      pipe(Kr, this);
    });
  }
}
EventEmitter(Handlers.prototype);
function registerHandlers() {
  for (var Gr = 0; Gr < arguments.length; Gr++)
    registeredHandlers.push(arguments[Gr]);
}
function initializeHandlers(Gr, ze, Wr) {
  return new Handlers(Gr, ze, Wr);
}
class Previewer {
  constructor(ze) {
    this.settings = ze || {}, this.polisher = new Polisher(!1), this.chunker = new Chunker(void 0, void 0, this.settings), this.hooks = {}, this.hooks.beforePreview = new Hook(this), this.hooks.afterPreview = new Hook(this), this.size = {
      width: {
        value: 8.5,
        unit: "in"
      },
      height: {
        value: 11,
        unit: "in"
      },
      format: void 0,
      orientation: void 0
    }, this.chunker.on("page", (Wr) => {
      this.emit("page", Wr);
    }), this.chunker.on("rendering", () => {
      this.emit("rendering", this.chunker);
    });
  }
  initializeHandlers() {
    let ze = initializeHandlers(this.chunker, this.polisher, this);
    return ze.on("size", (Wr) => {
      this.size = Wr, this.emit("size", Wr);
    }), ze.on("atpages", (Wr) => {
      this.atpages = Wr, this.emit("atpages", Wr);
    }), ze;
  }
  registerHandlers() {
    return registerHandlers.apply(registerHandlers, arguments);
  }
  getParams(ze) {
    let Wr, Yr = new URL(window.location), Qr = new URLSearchParams(Yr.search);
    for (var Kr of Qr.entries())
      Kr[0] === ze && (Wr = Kr[1]);
    return Wr;
  }
  wrapContent() {
    let ze = document.querySelector("body"), Wr;
    return Wr = ze.querySelector(":scope > template[data-ref='pagedjs-content']"), Wr || (Wr = document.createElement("template"), Wr.dataset.ref = "pagedjs-content", Wr.innerHTML = ze.innerHTML, ze.innerHTML = "", ze.appendChild(Wr)), Wr.content;
  }
  removeStyles(ze = document) {
    const Wr = Array.from(ze.querySelectorAll("link[rel='stylesheet']:not([data-pagedjs-ignore], [media~='screen'])")), Yr = Array.from(ze.querySelectorAll("style:not([data-pagedjs-inserted-styles], [data-pagedjs-ignore], [media~='screen'])"));
    return [...Wr, ...Yr].sort(function(Kr, Zr) {
      const en = Kr.compareDocumentPosition(Zr);
      return en === Node.DOCUMENT_POSITION_PRECEDING ? 1 : en === Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 0;
    }).map((Kr) => {
      if (Kr.nodeName === "STYLE") {
        const Zr = {};
        return Zr[window.location.href] = Kr.textContent, Kr.remove(), Zr;
      }
      if (Kr.nodeName === "LINK")
        return Kr.remove(), Kr.href;
      console.warn(`Unable to process: ${Kr}, ignoring.`);
    });
  }
  async preview(ze, Wr, Yr) {
    await this.hooks.beforePreview.trigger(ze, Yr), ze || (ze = this.wrapContent()), Wr || (Wr = this.removeStyles()), this.polisher.setup(), this.handlers = this.initializeHandlers(), await this.polisher.add(...Wr);
    let Qr = performance.now(), Kr = await this.chunker.flow(ze, Yr), Zr = performance.now();
    return Kr.performance = Zr - Qr, Kr.size = this.size, this.emit("rendered", Kr), await this.hooks.afterPreview.trigger(Kr.pages), Kr;
  }
}
EventEmitter(Previewer.prototype);
class ToolTip extends HTMLElement {
  static get observedAttributes() {
    return ["position", "timeout"];
  }
  constructor() {
    super(), this._tooltipBox = null, this._timeout = 200, this._hideTimeout = null, this._hiddenTimeout = null;
  }
  connectedCallback() {
    this.classList.add("relative", "block", "leading-none", "[&>*]:leading-normal");
    const ze = this.querySelector(".data-tip"), Wr = ze ? ze.innerHTML : "Tooltip";
    ze && ze.classList.add("hidden"), this._tooltipBox = document.createElement("div"), this._tooltipBox.innerHTML = Wr, this._tooltipBox.className = [
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
  attributeChangedCallback(ze, Wr, Yr) {
    ze === "position" && this._tooltipBox && this._updatePosition(), ze === "timeout" && Yr && (this._timeout = parseInt(Yr) || 200);
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
const ATTR_XSLT_ONLOAD = "script[xslt-onload]", ATTR_XSLT_TEMPLATE = "xslt-template", ATTR_XSLT_STATE = "xslt-transformed", SCROLL_BUTTON_ELEMENT = "scroll-button", TOOLTIP_ELEMENT = "tool-tip";
var ji, oa, ro;
class XSLTParseProcess {
  constructor() {
    Da(this, oa);
    Da(this, ji);
    eo(this, ji, /* @__PURE__ */ new Map());
  }
  setup() {
    let ze = htmx.findAll(ATTR_XSLT_ONLOAD);
    for (let Wr of ze)
      to(this, oa, ro).call(this, Wr);
  }
  hookupHTMX() {
    htmx.on("htmx:load", (ze) => {
      this.setup();
    });
  }
}
ji = new WeakMap(), oa = new WeakSet(), ro = function(ze) {
  if (ze.getAttribute(ATTR_XSLT_STATE) === "true" || !ze.hasAttribute(ATTR_XSLT_TEMPLATE))
    return;
  let Wr = "#" + ze.getAttribute(ATTR_XSLT_TEMPLATE), Yr = Na(this, ji).get(Wr);
  if (!Yr) {
    let en = htmx.find(Wr);
    if (en) {
      let tn = en.innerHTML ? new DOMParser().parseFromString(en.innerHTML, "application/xml") : en.contentDocument;
      Yr = new XSLTProcessor(), Yr.importStylesheet(tn), Na(this, ji).set(Wr, Yr);
    } else
      throw new Error("Unknown XSLT template: " + Wr);
  }
  let Qr = new DOMParser().parseFromString(ze.innerHTML, "application/xml"), Kr = Yr.transformToFragment(Qr, document), Zr = new XMLSerializer().serializeToString(Kr);
  ze.outerHTML = Zr;
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
let positionedIntervals = [];
function alignSidenotes() {
  positionedIntervals = [], _alignSidenotes(".count", ".page", ".eanchor-page"), _alignSidenotes(".notes", ".note-hand", ".hand"), _alignSidenotes(".notes", ".note-sidenote-meta", ".sidenote");
}
function _alignSidenotes(Gr, ze, Wr) {
  const Yr = document.querySelector(".fulltext"), Qr = document.querySelector(Gr);
  if (!Qr) return;
  const Kr = Array.from(Qr.querySelectorAll(ze));
  if (Kr.forEach((tn) => {
    tn.classList.remove("margin-note"), tn.style.top = "";
  }), window.matchMedia("print").matches) return;
  const Zr = Qr.getBoundingClientRect(), en = 0;
  Kr.forEach((tn) => {
    const rn = tn.id;
    if (!rn) return;
    const sn = Yr.querySelector(`${Wr}[aria-describedby="${rn}"]`);
    if (!sn) return;
    tn.classList.add("margin-note");
    const an = sn.getBoundingClientRect().top - Zr.top, dn = tn.getBoundingClientRect().height;
    let pn = an, mn;
    do {
      mn = !1;
      for (const vn of positionedIntervals) {
        const xn = vn.top, gn = vn.bottom;
        pn < gn && pn + dn > xn && (console.log("Collision detected", {
          top: pn,
          bottom: pn + dn,
          intervalTop: xn,
          intervalBottom: gn,
          newTop: gn + en
        }), pn = gn + en, mn = !0);
      }
    } while (mn);
    positionedIntervals.push({ top: pn, bottom: pn + dn }), tn.style.top = `${pn}px`;
  }), Kr.forEach((tn) => {
    tn.style.visibility = "visible";
  });
}
function Startup() {
  let Gr = null;
  new URL(window.location).searchParams.get("print") === "true" && ze(), window.addEventListener("resize", alignSidenotes);
  function ze() {
    Gr || (Gr = new Previewer()), Gr.preview().then(() => {
      document.body.classList.add("previewing");
    }), window.addEventListener("popstate", (Wr) => {
      window.location.reload();
    });
  }
}
customElements.define(SCROLL_BUTTON_ELEMENT, ScrollButton);
customElements.define(TOOLTIP_ELEMENT, ToolTip);
window.alignSidenotes = alignSidenotes;
export {
  Previewer,
  ScrollButton,
  Startup,
  XSLTParseProcess,
  alignSidenotes
};
