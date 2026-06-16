/* ============================================================
   trading-r3f.js — React Three Fiber port of the vanilla edgeTerrain
   (webgl.js edgeTerrain). NEW FILE, leading "_" so the DS compiler
   skips it (same convention as _hero-r3f.js).

   Reproduces the READ of the vanilla trading viz, not its code:
     - a wireframe equity SURFACE (COLS x ROWS grid)
     - the FRONT ridge == AV_DATA.trading.equity (schematic curve),
       receding back into procedural noise
     - slow auto-orbit + tilt toward the pointer
     - trading.signals as small cyan spark nodes sitting on the ridge

   Shares ONE three / ONE React with _hero-r3f.js: both are native ES
   modules resolved through the same import map (three@0.160 + fiber v8
   via esm.sh ?external=... dedupe), so the page never loads r128.

   Exposes window.AVR3F_TRADING.mountTrading(container, opts) -> cleanup().
   Preview-hardened the same way as the hero: frameloop="demand" +
   invalidate() kicks, synthetic-resize bootstrap, synchronous pre-warm
   so the static (hidden-tab) preview shows a composed, orbited pose.
   ============================================================ */

import React, { useRef, useMemo, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const h = React.createElement;

/* ---- environment (mirror vanilla) ---- */
const REDUCED =
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const SMALL = window.matchMedia && window.matchMedia("(max-width: 760px)").matches;
const DPR_CAP = Math.min(window.devicePixelRatio || 1, SMALL ? 1.5 : 2);

/* ---- terrain params (mirror vanilla edgeTerrain exactly) ---- */
const COLS = SMALL ? 40 : 64;
const ROWS = SMALL ? 26 : 40;
const SX = 30;
const SZ = 20;
const FRONT_Z = SZ / 2; // front ridge row sits here (closest to camera)
const NODE_BASE = SMALL ? 1.05 : 0.82;
const WARM = 1.2; // pre-warm seconds -> a composed, slightly-orbited pose

/* ---- shared sim state (single trading instance) ---- */
const sim = {
  t: WARM,
  tilt: { x: 0, y: 0, tx: 0, ty: 0 },
  animate: !REDUCED,
};
/* ARB-61: element-level demand gate. The Driver's IntersectionObserver flips
   this as the trading canvas enters/leaves the viewport; BOTH the rAF pump and
   the useFrame self-invalidate honor it, so an off-screen terrain stops the
   full per-frame vertex rewrite instead of paying it for content scrolled past. */
let inView = true;
function resetSim() {
  sim.t = WARM;
  sim.tilt.x = 0; sim.tilt.y = 0; sim.tilt.tx = 0; sim.tilt.ty = 0;
  sim.animate = !REDUCED;
  inView = true;
}

function cssColor(name, fb) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return new THREE.Color(v || fb);
}
function smoothstep(a, b, x) {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

/* a soft round sprite so signal nodes read as glowing dots, not squares */
let _dotTex = null;
function dotTexture() {
  if (_dotTex) return _dotTex;
  const cv = document.createElement("canvas");
  cv.width = cv.height = 64;
  const g = cv.getContext("2d");
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, "rgba(255,255,255,1)");
  grd.addColorStop(0.45, "rgba(255,255,255,0.85)");
  grd.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grd;
  g.beginPath();
  g.arc(32, 32, 32, 0, Math.PI * 2);
  g.fill();
  _dotTex = new THREE.CanvasTexture(cv);
  return _dotTex;
}

function TradingScene({ equity, signals }) {
  const groupRef = useRef(null);
  const wireGeomRef = useRef(null);
  const ptsGeomRef = useRef(null);
  const nodeMatRef = useRef(null);
  const nodeGeomRef = useRef(null);

  const colors = useMemo(
    () => ({
      spark: cssColor("--spark-accent", "#34bfff"),
      sparkDeep: cssColor("--spark-deep", "#0086bb"),
      holoLine: cssColor("--holo-500", "#2b5a93"),
    }),
    []
  );

  const { invalidate } = useThree();
  useEffect(() => {
    const recolor = () => {
      colors.spark.copy(cssColor("--spark-accent", "#34bfff"));
      colors.sparkDeep.copy(cssColor("--spark-deep", "#0086bb"));
      colors.holoLine.copy(cssColor("--holo-500", "#2b5a93"));
      invalidate();
    };
    const mo = new MutationObserver(recolor);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, [colors, invalidate]);

  function sampleEquity(u) {
    const f = u * (equity.length - 1);
    const a = Math.floor(f);
    const b = Math.min(equity.length - 1, a + 1);
    const m = f - a;
    return equity[a] * (1 - m) + equity[b] * m;
  }

  // static buffers: positions (shared by wire + points), per-vertex u/w, line index
  const buffers = useMemo(() => {
    const positions = new Float32Array(COLS * ROWS * 3);
    const pcolors = new Float32Array(COLS * ROWS * 3);
    const baseUW = new Float32Array(COLS * ROWS * 2);
    let i = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const x = (c / (COLS - 1) - 0.5) * SX;
        const z = (r / (ROWS - 1) - 0.5) * SZ;
        baseUW[i * 2] = c / (COLS - 1);
        baseUW[i * 2 + 1] = r / (ROWS - 1);
        positions[i * 3] = x;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = z;
        i++;
      }
    }
    // wireframe line index (horizontal + vertical segments)
    const seg = [];
    const vi = (c, r) => r * COLS + c;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (c < COLS - 1) seg.push(vi(c, r), vi(c + 1, r));
        if (r < ROWS - 1) seg.push(vi(c, r), vi(c, r + 1));
      }
    }
    return { positions, pcolors, baseUW, index: new Uint32Array(seg) };
  }, []);

  // signal nodes — small spark dots floating just above the FRONT ridge
  const nodes = useMemo(() => {
    if (!signals || !signals.length) return null;
    const npos = new Float32Array(signals.length * 3);
    const ncol = new Float32Array(signals.length * 3);
    const npulse = new Float32Array(signals.length).fill(1);
    const { spark, sparkDeep, holoLine } = colors;
    for (let s = 0; s < signals.length; s++) {
      const su = signals[s].i / (equity.length - 1);
      npos[s * 3] = (su - 0.5) * SX;
      npos[s * 3 + 1] = sampleEquity(su) * 7.0 + 0.55;
      npos[s * 3 + 2] = FRONT_Z;
      const kc =
        signals[s].kind === "short"
          ? sparkDeep
          : signals[s].kind === "flat"
          ? holoLine
          : spark;
      ncol[s * 3] = kc.r;
      ncol[s * 3 + 1] = kc.g;
      ncol[s * 3 + 2] = kc.b;
    }
    return { npos, ncol, npulse };
  }, [colors]);

  function compute(t) {
    const { positions, pcolors, baseUW } = buffers;
    const { spark, sparkDeep } = colors;
    let i = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const u = baseUW[i * 2];
        const w = baseUW[i * 2 + 1];
        const ridge = sampleEquity(u) * 7.0;
        const front = w;
        const noise =
          Math.sin(u * 9 + t * 0.8) * 0.5 +
          Math.sin(w * 7 - t * 0.6) * 0.4 +
          Math.sin((u + w) * 12 + t) * 0.25;
        const hv = ridge * (0.35 + front * 0.65) + noise * (1 - front) * 1.3;
        positions[i * 3 + 1] = hv;

        const t01 = smoothstep(0, 7, hv);
        pcolors[i * 3] = sparkDeep.r + (spark.r - sparkDeep.r) * t01;
        pcolors[i * 3 + 1] = sparkDeep.g + (spark.g - sparkDeep.g) * t01;
        pcolors[i * 3 + 2] = sparkDeep.b + (spark.b - sparkDeep.b) * t01;
        i++;
      }
    }
    if (wireGeomRef.current) wireGeomRef.current.attributes.position.needsUpdate = true;
    if (ptsGeomRef.current) {
      ptsGeomRef.current.attributes.position.needsUpdate = true;
      ptsGeomRef.current.attributes.color.needsUpdate = true;
    }
  }

  useFrame((state, deltaRaw) => {
    const dt = Math.min(deltaRaw, 0.05);
    if (sim.animate) sim.t += dt;
    const t = sim.t;

    compute(t);

    // ease tilt toward pointer target (frame-rate-independent)
    const kTilt = 1 - Math.pow(1 - 0.05, dt * 60);
    sim.tilt.x += (sim.tilt.tx - sim.tilt.x) * kTilt;
    sim.tilt.y += (sim.tilt.ty - sim.tilt.y) * kTilt;

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.12) * 0.32 + sim.tilt.x;
      groupRef.current.rotation.x = -0.06 + sim.tilt.y;
    }
    // de-synced node shimmer: phase-offset each node by its index so the
    // ridge twinkles instead of blinking in unison (same amplitude & speed)
    if (nodeGeomRef.current) {
      const ap = nodeGeomRef.current.attributes.aPulse;
      if (ap) {
        for (let i = 0; i < ap.count; i++) {
          ap.setX(i, 1 + 0.18 * Math.sin(t * 2.4 + i * 1.3));
        }
        ap.needsUpdate = true;
      }
    }

    if (sim.animate && inView) state.invalidate();
  });

  return h(
    "group",
    { ref: groupRef },
    // wireframe surface
    h(
      "lineSegments",
      null,
      h(
        "bufferGeometry",
        { ref: wireGeomRef },
        h("bufferAttribute", {
          attach: "attributes-position",
          args: [buffers.positions, 3],
        }),
        h("bufferAttribute", { attach: "index", args: [buffers.index, 1] })
      ),
      h("lineBasicMaterial", {
        color: colors.holoLine,
        transparent: true,
        opacity: 0.55,
      })
    ),
    // colored vertex points (additive — gives the holo glow)
    h(
      "points",
      null,
      h(
        "bufferGeometry",
        { ref: ptsGeomRef },
        h("bufferAttribute", {
          attach: "attributes-position",
          args: [buffers.positions, 3],
        }),
        h("bufferAttribute", {
          attach: "attributes-color",
          args: [buffers.pcolors, 3],
        })
      ),
      h("pointsMaterial", {
        size: SMALL ? 0.34 : 0.26,
        vertexColors: true,
        transparent: true,
        opacity: 0.95,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    ),
    // signal spark nodes on the front ridge
    nodes &&
      h(
        "points",
        null,
        h(
          "bufferGeometry",
          { ref: nodeGeomRef },
          h("bufferAttribute", {
            attach: "attributes-position",
            args: [nodes.npos, 3],
          }),
          h("bufferAttribute", {
            attach: "attributes-color",
            args: [nodes.ncol, 3],
          }),
          h("bufferAttribute", {
            attach: "attributes-aPulse",
            args: [nodes.npulse, 1],
          })
        ),
        h("pointsMaterial", {
          ref: nodeMatRef,
          size: NODE_BASE,
          map: dotTexture(),
          vertexColors: true,
          transparent: true,
          opacity: 0.98,
          sizeAttenuation: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          onBeforeCompile: (shader) => {
            shader.vertexShader = shader.vertexShader
              .replace(
                "void main() {",
                "attribute float aPulse;\nvoid main() {"
              )
              .replace(
                "gl_PointSize = size;",
                "gl_PointSize = size * aPulse;"
              );
          },
        })
      )
  );
}

/* owns the demand-loop kicks + pointer-tilt wiring (mirror hero Driver) */
function Driver({ container }) {
  const { invalidate, advance, setSize, setDpr } = useThree();
  useEffect(() => {
    let alive = true;
    const pump = () => {
      if (!alive) return;
      const w = container.clientWidth || 600;
      const hgt = container.clientHeight || 360;
      try { setSize(w, hgt); } catch (e) {}
      invalidate();
      try { advance(performance.now()); } catch (e) {}
    };
    pump();
    const timers = [60, 160, 320, 600].map((ms) => setTimeout(pump, ms));

    // CONTINUOUS DRIVE (ARB-104): state.invalidate() inside useFrame does not
    // reliably re-arm the demand loop on a visible load (it only catches alive
    // after the first pointermove). An external rAF pump invalidates every frame
    // while motion is allowed and the tab is visible, so the field autoplays from
    // load with no cursor input. Under reduced-motion sim.animate is false, so it
    // never invalidates and the composed static frame stays put (mirrors _funagent-r3f.js).
    let rafId = null;
    const tick = () => {
      if (!alive) return;
      if (sim.animate && inView && document.visibilityState === "visible") invalidate();
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // ARB-61: element-level visibility — only pump while the trading canvas is
    // on screen. Off-screen its last frame stays composed; scrolling back in
    // re-arms with an immediate repaint.
    let io = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver((entries) => {
        const was = inView;
        inView = entries.some((e) => e.isIntersecting);
        if (inView && !was) pump();
      }, { threshold: 0 });
      io.observe(container);
    }

    // pointer tilts the terrain (container-relative, like the vanilla build)
    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      sim.tilt.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 0.6;
      sim.tilt.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 0.3;
      invalidate();
    };
    const onVis = () => { if (document.visibilityState === "visible") pump(); };
    const onResize = () => pump();

    // ARB-51: re-cap the device pixel ratio when the viewport class flips (e.g. a
    // phone loaded in landscape >760px then rotated to portrait was left pinned at
    // DPR 2). setDpr re-applies the pixel ratio in place — no remount. The terrain
    // DENSITY (COLS/ROWS baked into the useMemo buffers) needs a scene remount to
    // re-tier; that is delegated to ARB-32's lazy-mount/reclaim.
    const onTier = () => {
      const cap = Math.min(window.devicePixelRatio || 1,
        (window.matchMedia && window.matchMedia("(max-width: 760px)").matches) ? 1.5 : 2);
      try { if (setDpr) setDpr(cap); } catch (e) {}
      pump();
    };
    const mqSmall = window.matchMedia ? window.matchMedia("(max-width: 760px)") : null;

    container.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onTier);
    if (mqSmall && mqSmall.addEventListener) mqSmall.addEventListener("change", onTier);
    const ro = new ResizeObserver(() => pump());
    ro.observe(container);

    return () => {
      alive = false;
      if (rafId) cancelAnimationFrame(rafId);
      timers.forEach(clearTimeout);
      container.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onTier);
      if (mqSmall && mqSmall.removeEventListener) mqSmall.removeEventListener("change", onTier);
      ro.disconnect();
      if (io) io.disconnect();
    };
  }, [container, invalidate, advance, setSize]);
  return null;
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext &&
      (c.getContext("webgl") || c.getContext("experimental-webgl")));
  } catch (e) {
    return false;
  }
}

function mountTrading(container, opts) {
  opts = opts || {};
  if (!container) return function () {};
  const equity = opts.equity || [
    0.12, 0.16, 0.15, 0.26, 0.24, 0.4, 0.36, 0.5, 0.48, 0.66, 0.62, 0.8,
    0.86, 0.98,
  ];
  const signals = opts.signals || [];

  // no-WebGL: surface the CSS fallback (kit-gl.css .av-tradinggl__viz.av-gl-failed)
  if (!hasWebGL()) {
    const host = container.closest(".av-tradinggl__viz") || container.parentElement;
    if (host) host.classList.add("av-gl-failed");
    return function () {};
  }
  resetSim();

  let root;
  try {
    root = createRoot(container);
  } catch (e) {
    console.error("AVR3F_TRADING mount failed:", e && e.message);
    return function () {};
  }

  root.render(
    h(
      Canvas,
      {
        gl: {
          alpha: true,
          antialias: true,
          preserveDrawingBuffer: true,
          powerPreference: "high-performance",
        },
        dpr: [1, DPR_CAP],
        frameloop: "demand",
        camera: { position: [0, 11, 22], fov: 42, near: 0.1, far: 200 },
        style: { width: "100%", height: "100%", display: "block" },
        onCreated: (state) => {
          window.__r3fTrading = state;
          state.gl.setClearColor(0x000000, 0); // transparent over the panel gradient
          state.camera.lookAt(0, 0.5, 0);
          const w = container.clientWidth || 600;
          const hgt = container.clientHeight || 360;
          try { state.setSize(w, hgt); } catch (e) {}
          state.invalidate();
          const host = container.closest(".av-tradinggl__viz") || container.parentElement;
          if (host) host.classList.remove("av-gl-warming");
        },
      },
      h(Driver, { container }),
      h(TradingScene, { equity, signals })
    )
  );

  const warmHost = container.closest(".av-tradinggl__viz") || container.parentElement;
  if (warmHost && !window.__r3fTrading) warmHost.classList.add("av-gl-warming");

  // same synthetic-resize bootstrap as the hero: <Canvas> defers GL-root
  // creation until react-use-measure reports a non-zero size, which never
  // happens in the hidden-tab preview (RO throttled). Pump synthetic window
  // 'resize' events (a direct, un-throttled re-measure trigger) until the GL
  // root exists.
  let kicks = 0;
  let kickTimer = null;
  const KICK_CAP = 5;
  // ARB-84: on a real visible tab the container ResizeObserver (above) composes
  // the GL root on frame 1, so the global synthetic-resize storm (a retired
  // hidden-tab preview hack — each global resize forced every scene to re-measure,
  // ×3 ≈ 120 reflows at load) is pure churn. Fire the poke ONLY while hidden, and
  // cap it at ~5 either way; the cheap poll still guards the blank-box fallback.
  const forceMeasure = () => {
    if (window.__r3fTrading) return; // GL root composed — stop
    if (document.visibilityState !== "visible") {
      try { window.dispatchEvent(new Event("resize")); } catch (e) {}
    }
    if (++kicks < KICK_CAP) {
      kickTimer = setTimeout(forceMeasure, 120);
    } else if (!window.__r3fTrading) {
      // exhausted the capped kicks; GL root never composed — never ship a blank box
      const host = container.closest(".av-tradinggl__viz") || container.parentElement;
      if (host) { host.classList.add("av-gl-failed"); host.classList.remove("av-gl-warming"); }
    }
  };
  kickTimer = setTimeout(forceMeasure, 0);

  return function cleanup() {
    if (kickTimer) clearTimeout(kickTimer);
    try { root.unmount(); } catch (e) {}
    if (window.__r3fTrading) delete window.__r3fTrading;
  };
}

window.AVR3F_TRADING = {
  mountTrading,
  version: { three: THREE.REVISION, react: React.version },
};
window.dispatchEvent(new Event("avr3f-trading-ready"));
