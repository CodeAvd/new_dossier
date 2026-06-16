/* ============================================================
   hero-r3f.js — React Three Fiber port of the vanilla heroField
   (webgl.js heroField). NEW FILE — does not touch the vanilla build.

   Authored as a native ES module (no DS-Babel): the scene graph is
   built with React.createElement (h), the heavy per-vertex work is
   imperative via refs in a single useFrame.

   Loaded via <script type="module"> with an import-map that resolves
   react / react-dom / three to ONE copy each, and every @react-three
   package with ?external=... so esm.sh does not inline its own three /
   react (one three, one React, no reconciler mismatch).

   Exposes window.AVR3F.mountHero(container, opts) -> cleanup().
   Preview-hardened: frameloop="demand" + invalidate() kicks +
   synchronous pre-warm so the STATIC (hidden-tab) preview shows the
   finished hero pose, exactly like the vanilla synchronous-first-frame.
   ============================================================ */

import React, { useRef, useMemo, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const h = React.createElement;

/* ARB-8: the EffectComposer/Bloom compose stage is the single fragile link in
   the hero. A postprocessing/three resolution skew, a half-resolved esm.sh
   chunk, or a WebGL1-only context (postprocessing 6.x requires WebGL2) makes it
   throw at mount — and an UNGUARDED throw there unmounts the whole <Canvas>
   subtree, blanking the signature scene. This boundary contains a compose
   failure: the raw wave-field keeps rendering, only the faint bloom is dropped. */
class ComposeBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(err) {
    console.warn(
      "AVR3F hero: bloom compose stage failed — rendering raw field:",
      err && err.message
    );
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/* ---- environment ---- */
const REDUCED =
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const SMALL = window.matchMedia && window.matchMedia("(max-width: 760px)").matches;
const DPR_CAP = Math.min(window.devicePixelRatio || 1, SMALL ? 1.5 : 2);
// postprocessing 6.x needs WebGL2; without it the compose stage throws at mount.
const HAS_WEBGL2 = (() => {
  try { return !!document.createElement("canvas").getContext("webgl2"); }
  catch (e) { return false; }
})();

/* ---- grid params (mirror the vanilla heroField exactly) ---- */
const GW = SMALL ? 64 : 108;
const GD = SMALL ? 44 : 74;
const SPAN_X = 64;
const SPAN_Z = 52;
const Z0 = -6;
const COUNT = GW * GD;
const WARM = 6.4; // pre-warm seconds -> a composed rolling pose

/* ---- shared sim state (single hero instance) ---- */
const sim = {
  t: WARM,
  ptr: { x: 0, z: Z0, tx: 0, tz: Z0, active: 0, tactive: 0 },
  animate: !REDUCED,
};
/* ARB-61: element-level demand gate. The Driver's IntersectionObserver flips
   this as the hero canvas enters/leaves the viewport; BOTH the rAF pump and the
   useFrame self-invalidate honor it, so an off-screen hero stops rendering
   entirely (its last frame stays composed) instead of paying the field rewrite
   every frame for content the visitor has already scrolled past. */
let inView = true;
function resetSim() {
  sim.t = WARM;
  sim.ptr.x = 0; sim.ptr.z = Z0; sim.ptr.tx = 0; sim.ptr.tz = Z0;
  sim.ptr.active = 0; sim.ptr.tactive = 0;
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

/* topographic field + gaussian lift toward the cursor (same math as vanilla) */
function fieldHeight(x, z, t) {
  let v =
    Math.sin(x * 0.18 + t * 0.6) * 1.5 +
    Math.sin(z * 0.22 - t * 0.45) * 1.2 +
    Math.sin((x + z) * 0.12 + t * 0.32) * 0.9 +
    Math.sin((x - z) * 0.3 - t * 0.5) * 0.45;
  const dx = x - sim.ptr.x;
  const dz = z - sim.ptr.z;
  const d2 = dx * dx + dz * dz;
  v += Math.exp(-d2 / 150) * 4.6 * sim.ptr.active;
  return v;
}

function HeroScene({ container }) {
  const geomRef = useRef(null);
  const invalidateRef = useRef(null);

  const colors = useMemo(
    () => ({
      low: cssColor("--ink-300", "#bcad9c"),
      mid: cssColor("--ink-800", "#322a23"),
      spark: cssColor("--spark-accent", "#34bfff"),
    }),
    []
  );

  const { invalidate } = useThree();
  useEffect(() => {
    const recolor = () => {
      colors.low.copy(cssColor("--ink-300", "#bcad9c"));
      colors.mid.copy(cssColor("--ink-800", "#322a23"));
      colors.spark.copy(cssColor("--spark-accent", "#34bfff"));
      invalidate();
    };
    const mo = new MutationObserver(recolor);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, [colors, invalidate]);

  // field buffers
  const buffers = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const cols = new Float32Array(COUNT * 3);
    const baseXZ = new Float32Array(COUNT * 2);
    let i = 0;
    for (let r = 0; r < GD; r++) {
      for (let c = 0; c < GW; c++) {
        const x = (c / (GW - 1) - 0.5) * SPAN_X;
        const z = (r / (GD - 1) - 0.5) * SPAN_Z + Z0;
        baseXZ[i * 2] = x;
        baseXZ[i * 2 + 1] = z;
        positions[i * 3] = x;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = z;
        i++;
      }
    }
    return { positions, cols, baseXZ };
  }, []);

  useFrame((state, deltaRaw) => {
    const dt = Math.min(deltaRaw, 0.05);
    invalidateRef.current = state.invalidate;
    if (sim.animate) sim.t += dt;
    const t = sim.t;

    // ease pointer (frame-rate-independent: identical feel at any refresh rate)
    const kPtr = 1 - Math.pow(1 - 0.08, dt * 60);
    sim.ptr.x += (sim.ptr.tx - sim.ptr.x) * kPtr;
    sim.ptr.z += (sim.ptr.tz - sim.ptr.z) * kPtr;
    const kActive = 1 - Math.pow(1 - 0.06, dt * 60);
    sim.ptr.active += (sim.ptr.tactive - sim.ptr.active) * kActive;

    // ---- field points ----
    const { positions, cols, baseXZ } = buffers;
    const { low, mid, spark } = colors;
    for (let k = 0; k < COUNT; k++) {
      const x = baseXZ[k * 2];
      const z = baseXZ[k * 2 + 1];
      const hv = fieldHeight(x, z, t);
      positions[k * 3 + 1] = hv;
      const t01 = smoothstep(-1.5, 3.4, hv);
      let cr, cg, cb;
      if (t01 < 0.55) {
        const u = t01 / 0.55;
        cr = low.r + (mid.r - low.r) * u;
        cg = low.g + (mid.g - low.g) * u;
        cb = low.b + (mid.b - low.b) * u;
      } else {
        const v = (t01 - 0.55) / 0.45;
        cr = mid.r + (spark.r - mid.r) * v;
        cg = mid.g + (spark.g - mid.g) * v;
        cb = mid.b + (spark.b - mid.b) * v;
      }
      cols[k * 3] = cr; cols[k * 3 + 1] = cg; cols[k * 3 + 2] = cb;
    }
    if (geomRef.current) {
      geomRef.current.attributes.position.needsUpdate = true;
      geomRef.current.attributes.color.needsUpdate = true;
    }

    // ---- camera drift + framing ----
    const kCam = 1 - Math.pow(1 - 0.03, dt * 60);
    state.camera.position.x += (sim.ptr.x * 0.12 - state.camera.position.x) * kCam;
    state.camera.lookAt(0, -2, Z0);

    if (sim.animate && inView) state.invalidate();
  });

  return h(
    React.Fragment,
    null,
    // topographic wave field — the whole hero
    h(
      "points",
      null,
      h(
        "bufferGeometry",
        { ref: geomRef },
        h("bufferAttribute", {
          attach: "attributes-position",
          args: [buffers.positions, 3],
        }),
        h("bufferAttribute", {
          attach: "attributes-color",
          args: [buffers.cols, 3],
        })
      ),
      h("pointsMaterial", {
        vertexColors: true,
        size: SMALL ? 0.42 : 0.34,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
      })
    ),
    // restrained: a faint cyan sheen on the brightest crests only — not a glow bath.
    // ARB-8: guarded (module present + WebGL2) AND wrapped in a boundary, so a
    // compose failure degrades to the raw field instead of blanking the canvas.
    EffectComposer && Bloom && HAS_WEBGL2
      ? h(
          ComposeBoundary,
          null,
          h(
            EffectComposer,
            { multisampling: 0 },
            h(Bloom, {
              intensity: 0.3,
              luminanceThreshold: 0.62,
              luminanceSmoothing: 0.9,
              mipmapBlur: true,
              radius: 0.45,
            })
          )
        )
      : null
  );
}

/* component that owns the demand-loop kicks + window pointer wiring */
function Driver({ container }) {
  const { invalidate, advance, setSize, setDpr } = useThree();
  useEffect(() => {
    // pump a few synchronous frames so the hidden-tab static preview is composed
    let alive = true;
    const pump = () => {
      if (!alive) return;
      const w = container.clientWidth || 900;
      const hgt = container.clientHeight || 560;
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

    // ARB-61: element-level visibility — only pump while the hero canvas is on
    // screen. Off-screen its last frame stays composed (frameloop="demand" never
    // clears it); scrolling back into view re-arms with an immediate repaint.
    let io = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver((entries) => {
        const was = inView;
        inView = entries.some((e) => e.isIntersecting);
        if (inView && !was) pump();
      }, { threshold: 0 });
      io.observe(container);
    }

    // pointer drives the field (window-wide, like the vanilla build)
    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      let nx = (e.clientX - rect.left) / rect.width;
      let ny = (e.clientY - rect.top) / rect.height;
      nx = Math.max(-0.12, Math.min(1.12, nx));
      ny = Math.max(-0.12, Math.min(1.12, ny));
      sim.ptr.tx = (nx - 0.5) * SPAN_X;
      sim.ptr.tz = (ny - 0.5) * SPAN_Z + Z0;
      sim.ptr.tactive = 1;
      invalidate();
    };
    const onLeave = () => { sim.ptr.tactive = 0; invalidate(); };
    const onVis = () => { if (document.visibilityState === "visible") pump(); };
    const onResize = () => pump();

    // ARB-51: re-cap the device pixel ratio when the viewport class flips (e.g. a
    // phone loaded in landscape >760px then rotated to portrait was left pinned at
    // DPR 2). setDpr re-applies the pixel ratio in place — no remount. The grid
    // DENSITY (GW/GD baked into the useMemo Float32Array buffers) needs a scene
    // remount to re-tier; that is delegated to ARB-32's lazy-mount/reclaim.
    const onTier = () => {
      const cap = Math.min(window.devicePixelRatio || 1,
        (window.matchMedia && window.matchMedia("(max-width: 760px)").matches) ? 1.5 : 2);
      try { if (setDpr) setDpr(cap); } catch (e) {}
      pump();
    };
    const mqSmall = window.matchMedia ? window.matchMedia("(max-width: 760px)") : null;

    window.addEventListener("pointermove", onMove, { passive: true });
    container.addEventListener("pointerleave", onLeave);
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
      window.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", onLeave);
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

function mountHero(container, opts) {
  opts = opts || {};
  if (!container) return function () {};
  // no-WebGL: surface the CSS fallback (kit-gl.css .av-herogl.av-gl-failed)
  if (!hasWebGL()) {
    const host = container.closest(".av-herogl") || container.parentElement;
    if (host) host.classList.add("av-gl-failed");
    return function () {};
  }
  resetSim();

  let root;
  try {
    root = createRoot(container);
  } catch (e) {
    console.error("AVR3F mount failed:", e && e.message);
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
        camera: { position: [0, 13, 25], fov: 46, near: 0.1, far: 200 },
        style: { width: "100%", height: "100%", display: "block" },
        onCreated: (state) => {
          window.__r3fHero = state;
          state.gl.setClearColor(0x000000, 0); // keep the canvas transparent
          state.camera.lookAt(0, -2, Z0);
          const w = container.clientWidth || 900;
          const hgt = container.clientHeight || 560;
          try { state.setSize(w, hgt); } catch (e) {}
          state.invalidate();
          const host = container.closest(".av-herogl") || container.parentElement;
          if (host) host.classList.remove("av-gl-warming");
        },
      },
      h(Driver, { container }),
      h(HeroScene, { container })
    )
  );

  const warmHost = container.closest(".av-herogl") || container.parentElement;
  if (warmHost && !window.__r3fHero) warmHost.classList.add("av-gl-warming");

  // R3F's <Canvas> defers creating the GL root until react-use-measure reports
  // a non-zero size. In the Claude Design preview (visibilityState=hidden) the
  // ResizeObserver is throttled and may NEVER fire, so onCreated never runs and
  // the canvas stays at its default 300x150. react-use-measure also re-measures
  // on window 'resize' (a direct event, not throttled like RO) — so we pump
  // synthetic resize events until the GL root exists, forcing the measurement.
  let kicks = 0;
  let kickTimer = null;
  const KICK_CAP = 5;
  // ARB-84: on a real visible tab the container ResizeObserver (above) composes
  // the GL root on frame 1, so the global synthetic-resize storm (a retired
  // hidden-tab preview hack — each global resize forced every scene to re-measure,
  // ×3 ≈ 120 reflows at load) is pure churn. Fire the poke ONLY while hidden, and
  // cap it at ~5 either way; the cheap poll still guards the blank-box fallback.
  const forceMeasure = () => {
    if (window.__r3fHero) return; // GL root composed — stop
    if (document.visibilityState !== "visible") {
      try { window.dispatchEvent(new Event("resize")); } catch (e) {}
    }
    if (++kicks < KICK_CAP) {
      kickTimer = setTimeout(forceMeasure, 120);
    } else if (!window.__r3fHero) {
      // exhausted the capped kicks; GL root never composed — never ship a blank box
      const host = container.closest(".av-herogl") || container.parentElement;
      if (host) { host.classList.add("av-gl-failed"); host.classList.remove("av-gl-warming"); }
    }
  };
  kickTimer = setTimeout(forceMeasure, 0);

  return function cleanup() {
    if (kickTimer) clearTimeout(kickTimer);
    try { root.unmount(); } catch (e) {}
    if (window.__r3fHero) delete window.__r3fHero;
  };
}

window.AVR3F = { mountHero, version: { three: THREE.REVISION, react: React.version } };
window.dispatchEvent(new Event("avr3f-ready"));
