/* ============================================================
   funagent-r3f.js — the QA agent's ROOM (warm, cozy, character).
   SLICE 2: ADD LIFE. The soft "kamaboko" cube-bot is no longer just
   standing there — it autonomously WORKS. On a calm cadence it turns to a
   little stack of case-cards, floats the top one up to read it, leans in,
   dips in anticipation, then STAMPS it "approved" with a springy overshoot
   bounce + a soft warm confetti puff, and the card drifts onto a small
   "done" pile. Then it picks the next one. Always quietly busy.

   Personality: slow idle breathe/bob, occasional blink, a happy wiggle +
   squash on each approve, a small look-around, a tiny anticipation dip
   before the stamp. The visitor can CLICK the scene to perform the approve
   themselves (the human approve gate). The cube-bot still springily turns
   to watch the cursor.

   HONEST: the stamp is the bot's action on an illustrative case — a soft
   "approved" check badge. NO metric, percentage, or number is invented.
   Warm palette only (cream / terracotta / honey + blush #eaa1ac /
   mint #7bd0ad). NO cyan.

   Authored as a native ES module resolved through the SAME import map as
   _hero-r3f.js. drei: RoundedBox (pillowy bodies + cards), ContactShadows
   (soft centered ground shadow). Exposes
   window.AVR3F_FUNAGENT.mountFunAgent(container, opts) -> cleanup().
   Preview-hardened identically to the hero: frameloop="demand" +
   invalidate() pump, Driver timers, synthetic-resize bootstrap, synchronous
   pre-warm so the static (hidden-tab) preview is composed. The audit
   animations drive the same invalidate() pump while they play, settling to
   a gentle idle pump.
   ============================================================ */

import React, { useRef } from "react";
import { createRoot } from "react-dom/client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, ContactShadows } from "@react-three/drei";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import * as THREE from "three";

const h = React.createElement;

/* ---- environment (mirror hero) ---- */
const REDUCED =
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const SMALL = window.matchMedia && window.matchMedia("(max-width: 919px)").matches;
const DPR_CAP = Math.min(window.devicePixelRatio || 1, SMALL ? 1.5 : 2);
const SMOOTH = SMALL ? 3 : 5; // RoundedBox bevel segments (perf on mobile)
const SPHSEG = SMALL ? 14 : 22; // eye / nub sphere segments
const SHADOW_RES = SMALL ? 256 : 512;
const WARM = 1.4; // pre-warm seconds -> a composed, settled pose

/* warm palette held literal so the room stays cozy even when an ancestor
   (.av-one-accent) has re-pointed the terracotta tokens at cyan. NO cyan. */
const COL = {
  body: new THREE.Color("#edb083"), // soft peach / terracotta
  visor: new THREE.Color("#3c2c25"), // soft warm dark brown screen
  eye: new THREE.Color("#fdf3e3"), // warm cream
  foot: new THREE.Color("#d8a85c"), // honey-deep
  nub: new THREE.Color("#eaa1ac"), // blush
  paper: new THREE.Color("#fbf1df"), // case-card paper, warm cream
  line: new THREE.Color("#d6ab83"), // muted tan "text" lines
  head: new THREE.Color("#cd7a50"), // terracotta header line
  mint: new THREE.Color("#7bd0ad"), // approved badge
  check: new THREE.Color("#fdf3e3"), // check mark on the badge
  glint: new THREE.Color("#fffaf0"), // tiny warm-white eye spark (NOT cyan)
};

/* ---- camera framing (pulled back so the whole vignette fits with margin;
   further back + tighter layout on narrow screens so nothing crops) ---- */
const CAM_Y = 0.5;
const CAM_Z = SMALL ? 10.1 : 8.8;

/* ---- layout (kept comfortably inside the frame on mobile) ---- */
const STACK_X = SMALL ? 1.66 : 1.92; // inbox left (-) / done pile right (+) — INSET off the edges
const STACK_N = 4; // visible cards in the inbox
const STACK_BASE_Y = -0.98;
const DONE_X = STACK_X;
const DONE_BASE_Y = -1.02;
const DONE_MAX = 4; // HARD cap on visible done cards — the oldest retires as new ones land
const DONE_STEP = 0.085; // gentle Y stagger so the pile never grows tall / off-screen
const READ = [0, -0.42, 1.72]; // held low (belly height) so the face stays visible looking down
/* FRONT_Z = the safe "front lane" depth a flying card must reach before its X
   ever crosses the bot's torso. The bot body's front face is ~z 1.06 and the
   eyes ~z 1.18, so any z >= this keeps the whole card clearly on the camera
   side of the robot — it can never clip through the body at any frame. */
const FRONT_Z = 1.6;

/* ---- audit phase machine ---- */
const DUR = { read: 1.15, dip: 0.34, stamp: 0.72, drop: 0.95, turn: 0.7, lift: 0.9 };
const NEXT = { read: "dip", dip: "stamp", stamp: "drop", drop: "turn", turn: "lift", lift: "read" };

/* ---- confetti pool (cheap; instanced) ---- */
const CONFETTI_N = SMALL ? 12 : 18;
const CONF_PER = SMALL ? 7 : 11;
const CONF_COLORS = ["#eaa1ac", "#e8b35e", "#7bd0ad", "#fdf3e3"]; // blush / honey / mint / cream
const confetti = [];
for (let i = 0; i < CONFETTI_N; i++) {
  confetti.push({ active: false, x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, rx: 0, ry: 0, rz: 0, vrx: 0, vry: 0, vrz: 0, life: 0, max: 1, scale: 0.1, col: 0 });
}
const _cObj = new THREE.Object3D();
const _cCol = new THREE.Color();
function spawnConfetti(cx, cy, cz, n) {
  let spawned = 0;
  for (let i = 0; i < confetti.length && spawned < n; i++) {
    const c = confetti[i];
    if (c.active) continue;
    c.active = true;
    c.x = cx + (Math.random() - 0.5) * 0.5;
    c.y = cy + (Math.random() - 0.2) * 0.3;
    c.z = cz + (Math.random() - 0.5) * 0.4;
    const ang = Math.random() * Math.PI * 2;
    const sp = 0.6 + Math.random() * 0.9;
    c.vx = Math.cos(ang) * sp;
    c.vy = 1.7 + Math.random() * 1.5;
    c.vz = Math.sin(ang) * sp * 0.6;
    c.rx = Math.random() * 6; c.ry = Math.random() * 6; c.rz = Math.random() * 6;
    c.vrx = (Math.random() - 0.5) * 9; c.vry = (Math.random() - 0.5) * 9; c.vrz = (Math.random() - 0.5) * 9;
    c.life = 0; c.max = 0.85 + Math.random() * 0.55;
    c.scale = 0.085 + Math.random() * 0.06;
    c.col = (Math.random() * CONF_COLORS.length) | 0;
    spawned++;
  }
}

/* ---- math helpers ---- */
const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
const lerp = (a, b, t) => a + (b - a) * t;
const easeInOut = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
const easeOut = (x) => 1 - (1 - x) * (1 - x);
function easeOutBack(x) {
  const c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

/* ---- shared sim state (single instance) ---- */
const sim = {
  t: WARM,
  ptr: { x: 0, y: 0, tx: 0, ty: 0 },
  active: 0,
  tactive: 0,
  look: { x: 0, y: 0, vx: 0, vy: 0 },
  animate: !REDUCED,
  audit: {
    phase: "read",
    phaseT: DUR.read * 0.55, // start mid-read -> a leaned, busy composed frame
    done: 0,
    stamped: false,
    stampFired: false,
    badgeT: 0,
    snapHeld: false,
    clickReq: false,
    wiggle: 0,
    blinking: false,
    blinkP: 0,
    blinkT: 2.4,
  },
};
/* ARB-61: element-level demand gate. The Driver's IntersectionObserver flips
   this as the funagent canvas enters/leaves the viewport; BOTH the rAF pump and
   the useFrame self-invalidate honor it, so the room (the heaviest, ~80-draw
   scene) stops rendering entirely when scrolled past instead of running its
   autonomy loop full-tilt off-screen. */
let inView = true;
function resetSim() {
  sim.t = WARM;
  sim.ptr.x = 0; sim.ptr.y = 0; sim.ptr.tx = 0; sim.ptr.ty = 0;
  sim.active = 0; sim.tactive = 0;
  sim.look.x = 0; sim.look.y = 0; sim.look.vx = 0; sim.look.vy = 0;
  sim.animate = !REDUCED;
  inView = true;
  const A = sim.audit;
  A.phase = "read"; A.phaseT = DUR.read * 0.55;
  A.done = 0; A.stamped = false; A.stampFired = false; A.badgeT = 0;
  A.snapHeld = false; A.clickReq = false; A.wiggle = 0;
  A.blinking = false; A.blinkP = 0; A.blinkT = 2.4;
  for (let i = 0; i < confetti.length; i++) confetti[i].active = false;
}

/* one shared flat-matte material maker (single warm albedo, no specular) */
function matte(color) {
  return h("meshStandardMaterial", {
    color,
    roughness: 1,
    metalness: 0,
    flatShading: false,
  });
}

/* a single case-card (paper + optional printed lines) */
function CaseCard(props) {
  const { withText, refCb } = props;
  return h(
    "group",
    { ref: refCb, position: props.position, rotation: props.rotation },
    h(
      RoundedBox,
      { args: [1.15, 0.78, 0.07], radius: 0.08, smoothness: Math.max(2, SMOOTH - 2) },
      matte(COL.paper)
    ),
    withText
      ? h(
          React.Fragment,
          null,
          // terracotta header tab + three muted "text" lines on the +z face
          h("mesh", { position: [-0.18, 0.235, 0.045] }, h("boxGeometry", { args: [0.46, 0.07, 0.02] }), matte(COL.head)),
          h("mesh", { position: [-0.05, 0.075, 0.045] }, h("boxGeometry", { args: [0.74, 0.05, 0.02] }), matte(COL.line)),
          h("mesh", { position: [-0.1, -0.06, 0.045] }, h("boxGeometry", { args: [0.64, 0.05, 0.02] }), matte(COL.line)),
          h("mesh", { position: [-0.26, -0.19, 0.045] }, h("boxGeometry", { args: [0.32, 0.05, 0.02] }), matte(COL.line))
        )
      : // done-pile cards carry just a tiny mint "approved" dot
        h("mesh", { position: [0.36, -0.22, 0.05], scale: [1, 1, 0.45] }, h("sphereGeometry", { args: [0.075, 12, 12] }), matte(COL.mint))
  );
}

function FunAgentScene() {
  const botRef = useRef(null);
  const eyeRef = useRef(null);
  const nubRef = useRef(null);
  const cardRef = useRef(null);
  const badgeRef = useRef(null);
  const confettiRef = useRef(null);
  const doneRefs = useRef([]);
  const dofTarget = React.useMemo(() => new THREE.Vector3(0, -0.05, 1.35), []);

  useFrame((state, deltaRaw) => {
    const dt = Math.min(deltaRaw, 0.05);
    const A = sim.audit;
    if (sim.animate) sim.t += dt;
    const t = sim.t;

    // ---- audit phase machine (the autonomy loop) ----
    if (sim.animate) {
      A.phaseT += dt;

      // CLICK = human approve gate: if a card is in hand, stamp it NOW
      if (A.clickReq) {
        A.clickReq = false;
        if (A.phase === "turn" || A.phase === "lift" || A.phase === "read" || A.phase === "dip") {
          A.phase = "stamp"; A.phaseT = 0; A.stampFired = false; A.snapHeld = true; A.wiggle = 1;
        } else {
          A.wiggle = Math.max(A.wiggle, 0.7); // happy wiggle if clicked mid-stamp/drop
        }
      }

      // the stamp "contact" moment: badge pops, confetti puffs, happy blink
      if (A.phase === "stamp" && !A.stampFired && A.phaseT >= DUR.stamp * 0.16) {
        A.stampFired = true; A.stamped = true; A.badgeT = 0; A.wiggle = 1;
        A.blinking = true; A.blinkP = 0;
        spawnConfetti(READ[0], READ[1] + 0.16, READ[2] + 0.05, CONF_PER);
      }

      // phase advance
      if (A.phaseT >= DUR[A.phase]) {
        const finishing = A.phase;
        A.phase = NEXT[finishing];
        A.phaseT = 0;
        if (finishing === "stamp") A.snapHeld = false;
        if (finishing === "drop") {
          A.done += 1; // card landed on the done pile
          A.stamped = false; A.stampFired = false; A.badgeT = 0; A.snapHeld = false;
        }
      }

      if (A.stamped) A.badgeT = Math.min(A.badgeT + dt * 3.2, 1);
      A.wiggle = Math.max(0, A.wiggle - dt * 1.7);

      // blink (occasional) — quick close/open pulse
      if (A.blinking) { A.blinkP += dt / 0.15; if (A.blinkP >= 1) A.blinking = false; }
      else { A.blinkT -= dt; if (A.blinkT <= 0) { A.blinking = true; A.blinkP = 0; A.blinkT = 2.6 + Math.random() * 3.0; } }
    }

    // ---- gaze: cursor when engaged, else looks at its own work ----
    // ARB-40: frame-rate-independent easing (was a raw *0.16 / *0.08 per-frame lerp,
    // which converged ~2.4x faster at 144Hz than 60Hz). Same form the hero/trading
    // Drivers already use; dt is clamped above so a stall can't over-shoot.
    const kP = 1 - Math.pow(1 - 0.16, dt * 60);
    sim.ptr.x += (sim.ptr.tx - sim.ptr.x) * kP;
    sim.ptr.y += (sim.ptr.ty - sim.ptr.y) * kP;
    const kA = 1 - Math.pow(1 - 0.08, dt * 60);
    sim.active += (sim.tactive - sim.active) * kA;

    const ph = A.phase, pt = A.phaseT;
    let gx = 0, gy = 0;
    if (ph === "turn") { gx = -0.55; gy = -0.16; }
    else if (ph === "lift") { const p = easeInOut(clamp01(pt / DUR.lift)); gx = lerp(-0.45, 0, p); gy = lerp(-0.16, -0.28, p); }
    else if (ph === "read") { gx = Math.sin(t * 2.0) * 0.06; gy = -0.34; }
    else if (ph === "dip") { gx = 0; gy = -0.42; }
    else if (ph === "stamp") { gx = 0; gy = lerp(-0.4, -0.1, clamp01(pt / DUR.stamp)); }
    else if (ph === "drop") { const p = easeInOut(clamp01(pt / DUR.drop)); gx = lerp(0, 0.5, p); gy = -0.12; }
    gx += Math.sin(t * 0.4 + 0.5) * 0.05; // tiny ambient look-around

    const act = sim.active;
    const tgX = sim.ptr.x * act + gx * (1 - act);
    const tgY = sim.ptr.y * act + gy * (1 - act);

    // springy (underdamped -> overshoot) integration of the look direction
    let lx, ly;
    if (sim.animate) {
      const L = sim.look;
      const STIFF = 88, DAMP = 10.5;
      const ax = STIFF * (tgX - L.x) - DAMP * L.vx;
      const ay = STIFF * (tgY - L.y) - DAMP * L.vy;
      L.vx += ax * dt; L.x += L.vx * dt;
      L.vy += ay * dt; L.y += L.vy * dt;
      lx = L.x; ly = L.y;
    } else {
      lx = tgX; ly = tgY; // reduced-motion: snap to the settled gaze, no spring
    }

    // ---- body motion: breathe bob + anticipation dip + springy stamp ----
    const bob = sim.animate ? Math.sin(t * 1.55) * 0.11 + Math.sin(t * 0.82 + 1) * 0.05 : 0;
    const sq = sim.animate ? Math.cos(t * 1.55) * 0.035 : 0;

    let punch = 0, squashY = 0, readLean = 0;
    if (ph === "read") {
      readLean = 0.16 * easeInOut(clamp01(pt / (DUR.read * 0.5)));
    } else if (ph === "dip") {
      const p = clamp01(pt / DUR.dip);
      readLean = 0.16 + 0.07 * easeInOut(p);
      punch = -0.1 * easeInOut(p);
      squashY = 0.05 * easeInOut(p);
    } else if (ph === "stamp") {
      const p = clamp01(pt / DUR.stamp);
      if (p < 0.16) {
        const q = p / 0.16;
        punch = -0.15 - 0.1 * q; squashY = 0.05 + 0.09 * q; readLean = 0.23 + 0.07 * q;
      } else {
        const q = easeOutBack((p - 0.16) / 0.84);
        punch = lerp(-0.25, 0, q); squashY = lerp(0.14, 0, q); readLean = lerp(0.3, 0, q);
      }
    } else if (ph === "lift") {
      readLean = 0.05;
    }

    const wig = sim.animate ? Math.sin(t * 20) * 0.05 * A.wiggle : 0;

    if (botRef.current) {
      const b = botRef.current;
      b.position.y = 0.05 + bob + punch;
      b.position.x = lx * 0.16;
      const sx = 1 - sq + squashY * 0.55 + A.wiggle * 0.015;
      const syv = 1 + sq - squashY;
      b.scale.set(sx, syv, sx);
      b.rotation.y = lx * 0.5;
      b.rotation.x = -ly * 0.3 + readLean;
      b.rotation.z = -lx * 0.09 + wig;
    }
    if (eyeRef.current) {
      const scan = ph === "read" && sim.animate ? Math.sin(t * 2.4) * 0.05 : 0;
      eyeRef.current.position.x = lx * 0.12 + scan;
      eyeRef.current.position.y = 0.2 + ly * 0.08;
      const blinkAmt = sim.animate && A.blinking ? Math.sin(clamp01(A.blinkP) * Math.PI) : 0;
      eyeRef.current.scale.y = 1 - 0.82 * blinkAmt;
    }
    // little antenna bobble — a soft idle sway, leans with the gaze, springs on approve
    if (nubRef.current) {
      const n = nubRef.current;
      n.position.x = sim.animate ? Math.sin(t * 1.7) * 0.05 + lx * 0.05 : 0;
      n.position.y = 1.28 + (sim.animate ? Math.sin(t * 2.3 + 1) * 0.03 : 0) + A.wiggle * 0.06;
      n.rotation.z = sim.animate ? Math.sin(t * 1.7) * 0.16 - lx * 0.12 : 0;
    }

    // ---- the held case-card: stack -> lift -> read -> stamp -> done pile ----
    if (cardRef.current) {
      const cr = cardRef.current;
      const stackTop = [-STACK_X + 0.03, STACK_BASE_Y + STACK_N * 0.06, 0.02];
      const idx = Math.min(A.done, DONE_MAX - 1);
      const dp = [DONE_X + (idx % 2 ? 0.05 : -0.04), DONE_BASE_Y + idx * DONE_STEP, 0.06];
      let px, py, pz, rx, ry = 0, rz;
      if (A.snapHeld) {
        px = READ[0]; py = READ[1]; pz = READ[2]; rx = -0.4; rz = 0;
      } else if (ph === "turn") {
        px = stackTop[0]; py = stackTop[1]; pz = stackTop[2]; rx = -1.15; rz = 0.04;
      } else if (ph === "lift") {
        const p = easeInOut(clamp01(pt / DUR.lift));
        // pull the card toward the camera FIRST (z reaches the front lane by
        // ~55%), and only THEN slide it across in x. So by the time the
        // card's x enters the bot's torso span it is already well in front of
        // the bot's face — it arcs up in front of the robot, never through it.
        const zp = easeOut(clamp01((pt / DUR.lift) / 0.55));
        const xp = easeInOut(clamp01(((pt / DUR.lift) - 0.18) / 0.82));
        const arc = Math.sin(clamp01(pt / DUR.lift) * Math.PI) * 0.45;
        px = lerp(stackTop[0], READ[0], xp); py = lerp(stackTop[1], READ[1], p) + arc; pz = lerp(stackTop[2], Math.max(READ[2], FRONT_Z), zp);
        rx = lerp(-1.15, -0.4, p); rz = lerp(0.04, 0, p);
      } else if (ph === "read" || ph === "dip" || ph === "stamp") {
        px = READ[0]; py = READ[1] + bob * 0.25 + punch * 0.6; pz = READ[2]; rx = -0.4; rz = 0;
      } else {
        // drop -> arc onto the done pile. Slide across in x FIRST while the
        // card stays out in the front lane (z held forward), and only drop
        // back in z onto the pile AFTER x has cleared the bot's torso to the
        // right. So the card swings around in front of the bot, never through
        // it, then settles onto the pile.
        const p = easeInOut(clamp01(pt / DUR.drop));
        const xp = easeInOut(clamp01((pt / DUR.drop) / 0.7));
        const zp = easeInOut(clamp01(((pt / DUR.drop) - 0.55) / 0.45));
        const arc = Math.sin(clamp01(pt / DUR.drop) * Math.PI) * 0.5;
        px = lerp(READ[0], dp[0], xp); py = lerp(READ[1], dp[1], p) + arc; pz = lerp(Math.max(READ[2], FRONT_Z), dp[2], zp);
        rx = lerp(-0.4, -1.05, p); rz = lerp(0, 0.05, p);
      }
      cr.position.set(px, py, pz); cr.rotation.set(rx, ry, rz);
    }
    if (badgeRef.current) {
      const s = A.stamped ? easeOutBack(clamp01(A.badgeT)) : 0;
      badgeRef.current.scale.setScalar(Math.max(0, s));
    }

    // ---- done pile: reveal cards as they accumulate; RECYCLE the oldest so
    // the pile is capped at DONE_MAX and never grows off-screen ----
    const cap = DONE_MAX;
    const shown = Math.min(A.done, cap);
    const dropping = A.phase === "drop";
    const dropP = dropping ? clamp01(A.phaseT / DUR.drop) : 0;
    const overflow = A.done >= cap; // pile full -> the incoming card retires the oldest
    for (let i = 0; i < doneRefs.current.length; i++) {
      const m = doneRefs.current[i];
      if (!m) continue;
      let s = i < shown ? 1 : 0;
      if (i === 0 && overflow && dropping) s = 1 - easeInOut(dropP); // oldest fades out as a new one lands
      m.visible = s > 0.001;
      m.scale.setScalar(s);
    }

    // ---- confetti pool update (gentle gravity + shrink-out fade) ----
    const cm = confettiRef.current;
    if (cm) {
      for (let i = 0; i < confetti.length; i++) {
        const c = confetti[i];
        if (!c.active) { _cObj.scale.set(0, 0, 0); _cObj.position.set(0, -999, 0); _cObj.updateMatrix(); cm.setMatrixAt(i, _cObj.matrix); continue; }
        if (sim.animate) {
          c.life += dt;
          c.vy -= 4.4 * dt;
          c.x += c.vx * dt; c.y += c.vy * dt; c.z += c.vz * dt;
          c.rx += c.vrx * dt; c.ry += c.vry * dt; c.rz += c.vrz * dt;
        }
        const k = c.life / c.max;
        if (k >= 1) { c.active = false; _cObj.scale.set(0, 0, 0); _cObj.updateMatrix(); cm.setMatrixAt(i, _cObj.matrix); continue; }
        const fade = 1 - k * k;
        const s = c.scale * (0.55 + 0.45 * fade);
        _cObj.position.set(c.x, c.y, c.z);
        _cObj.rotation.set(c.rx, c.ry, c.rz);
        _cObj.scale.set(s, s, s);
        _cObj.updateMatrix();
        cm.setMatrixAt(i, _cObj.matrix);
        cm.setColorAt(i, _cCol.set(CONF_COLORS[c.col]));
      }
      cm.instanceMatrix.needsUpdate = true;
      if (cm.instanceColor) cm.instanceColor.needsUpdate = true;
    }

    // soft camera parallax toward the look side, gently CLAMPED so the
    // vignette stays framed and nothing drifts out of the canvas bounds
    const camTargetX = Math.max(-0.3, Math.min(0.3, lx * 0.18));
    state.camera.position.x += (camTargetX - state.camera.position.x) * 0.04;
    state.camera.lookAt(0, 0.05, 0);

    // keep pumping while animating (the autonomy loop, the spring, the
    // confetti + card tweens all request the next frame -> a gentle, always-
    // working idle pump; settles only under reduced-motion).
    if (sim.animate && inView) state.invalidate();
  });

  // pre-build the done-pile card slots (revealed imperatively per frame)
  const doneCards = [];
  for (let i = 0; i < DONE_MAX; i++) {
    doneCards.push(
      h(CaseCard, {
        key: "done" + i,
        withText: false,
        refCb: (el) => { doneRefs.current[i] = el; },
        position: [DONE_X + (i % 2 ? 0.05 : -0.04), DONE_BASE_Y + i * DONE_STEP, 0.06],
        rotation: [-1.05, 0, i % 2 ? 0.05 : -0.04],
      })
    );
  }

  return h(
    React.Fragment,
    null,
    // ---- soft, even, warm light (flat read, no harsh PBR hotspot) ----
    h("hemisphereLight", { args: ["#fff5e8", "#f0ddc4", 1.15] }),
    h("ambientLight", { intensity: 0.5 }),
    h("directionalLight", { position: [2.4, 5, 5.5], intensity: 0.45, color: "#fff2dc" }),

    // ---- single soft, light, CENTERED contact shadow under the bot ----
    h(ContactShadows, {
      position: [0, -1.32, 0],
      scale: 6.2,
      blur: 3.0,
      far: 3.2,
      opacity: 0.34,
      color: "#a9744e",
      resolution: SHADOW_RES,
      frames: Infinity,
    }),

    // ---- the inbox: a small stack of pending case-cards on the left ----
    h(
      "group",
      null,
      Array.from({ length: STACK_N }, (_, i) =>
        h(CaseCard, {
          key: "stack" + i,
          withText: i === STACK_N - 1, // only the top card shows printed lines
          position: [-STACK_X + (i % 2 ? 0.04 : -0.03), STACK_BASE_Y + i * 0.06, i % 2 ? 0.03 : -0.02],
          rotation: [-1.15, 0, i % 2 ? 0.05 : -0.05],
        })
      )
    ),

    // ---- the done pile on the right ----
    h("group", null, doneCards),

    // ---- the active / held card (its position is driven each frame) ----
    h(
      "group",
      { ref: cardRef, position: READ, rotation: [-0.4, 0, 0] },
      h(
        RoundedBox,
        { args: [1.15, 0.78, 0.07], radius: 0.08, smoothness: Math.max(2, SMOOTH - 2) },
        matte(COL.paper)
      ),
      h("mesh", { position: [-0.18, 0.235, 0.045] }, h("boxGeometry", { args: [0.46, 0.07, 0.02] }), matte(COL.head)),
      h("mesh", { position: [-0.05, 0.075, 0.045] }, h("boxGeometry", { args: [0.74, 0.05, 0.02] }), matte(COL.line)),
      h("mesh", { position: [-0.1, -0.06, 0.045] }, h("boxGeometry", { args: [0.64, 0.05, 0.02] }), matte(COL.line)),
      h("mesh", { position: [-0.26, -0.19, 0.045] }, h("boxGeometry", { args: [0.32, 0.05, 0.02] }), matte(COL.line)),
      // the "approved" badge — a soft mint disc + a little cream check (pops in)
      h(
        "group",
        { ref: badgeRef, position: [0.3, -0.16, 0.07], scale: [0, 0, 0] },
        h("mesh", { scale: [1, 1, 0.4] }, h("sphereGeometry", { args: [0.17, 16, 16] }), matte(COL.mint)),
        h("mesh", { position: [-0.05, -0.025, 0.06], rotation: [0, 0, 0.92] }, h("boxGeometry", { args: [0.045, 0.12, 0.04] }), matte(COL.check)),
        h("mesh", { position: [0.04, 0.03, 0.06], rotation: [0, 0, -0.7] }, h("boxGeometry", { args: [0.045, 0.24, 0.04] }), matte(COL.check))
      )
    ),

    // ---- the cube-bot: pillowy rounded body + curved visor + soft eyes ----
    h(
      "group",
      { ref: botRef, position: [0, 0.05, 0] },
      h(
        RoundedBox,
        { args: [2.35, 2.18, 2.12], radius: 0.64, smoothness: SMOOTH },
        matte(COL.body)
      ),
      h(
        RoundedBox,
        { args: [1.5, 1.0, 0.5], radius: 0.32, smoothness: Math.max(3, SMOOTH - 1), position: [0, 0.18, 0.92] },
        matte(COL.visor)
      ),
      h(
        "group",
        { ref: eyeRef, position: [0, 0.2, 1.18] },
        h("mesh", { position: [-0.3, 0, 0], scale: [1, 1.15, 0.7] }, h("sphereGeometry", { args: [0.15, SPHSEG, SPHSEG] }), matte(COL.eye)),
        h("mesh", { position: [0.3, 0, 0], scale: [1, 1.15, 0.7] }, h("sphereGeometry", { args: [0.15, SPHSEG, SPHSEG] }), matte(COL.eye)),
        // tiny warm-white catch-lights -> the eyes read alive (NO cyan)
        h("mesh", { position: [-0.35, 0.055, 0.1], scale: [1, 1, 0.55] }, h("sphereGeometry", { args: [0.044, 10, 10] }), matte(COL.glint)),
        h("mesh", { position: [0.25, 0.055, 0.1], scale: [1, 1, 0.55] }, h("sphereGeometry", { args: [0.044, 10, 10] }), matte(COL.glint))
      ),
      // soft blush cheeks, just below the visor — a little warmth/charm
      h("mesh", { position: [-0.6, -0.5, 1.04], scale: [1.3, 0.85, 0.3] }, h("sphereGeometry", { args: [0.12, 14, 14] }), matte(COL.nub)),
      h("mesh", { position: [0.6, -0.5, 1.04], scale: [1.3, 0.85, 0.3] }, h("sphereGeometry", { args: [0.12, 14, 14] }), matte(COL.nub)),
      // antenna bobble (its own group so it can sway independently)
      h(
        "group",
        { ref: nubRef, position: [0, 1.28, 0.05] },
        h("mesh", null, h("sphereGeometry", { args: [0.17, SPHSEG, SPHSEG] }), matte(COL.nub))
      ),
      h(
        RoundedBox,
        { args: [0.66, 0.44, 0.82], radius: 0.2, smoothness: Math.max(3, SMOOTH - 1), position: [-0.54, -1.2, 0.16] },
        matte(COL.foot)
      ),
      h(
        RoundedBox,
        { args: [0.66, 0.44, 0.82], radius: 0.2, smoothness: Math.max(3, SMOOTH - 1), position: [0.54, -1.2, 0.16] },
        matte(COL.foot)
      )
    ),

    // ---- confetti: a tasteful warm puff (instanced; pooled) ----
    h(
      "instancedMesh",
      { ref: confettiRef, args: [undefined, undefined, CONFETTI_N], frustumCulled: false },
      h("boxGeometry", { args: [1, 1, 0.45] }),
      h("meshStandardMaterial", { roughness: 1, metalness: 0 })
    ),

    // ---- soft DEPTH-OF-FIELD: the bot stays crisp, the far cards + the
    // empty warm space behind melt into a gentle dreamy bokeh. Cheap (small
    // bokehScale, low internal res); renders under frameloop="demand" through
    // the same rAF/invalidate pump as the hero's EffectComposer/Bloom. ----
    // ARB-50: drop the DepthOfField pass entirely on SMALL (the costliest mobile
    // pass); ContactShadows already steps to 256 there and the bot still reads crisp.
    !SMALL &&
    h(
      EffectComposer,
      { multisampling: 0, enableNormalPass: false },
      h(DepthOfField, {
        target: dofTarget,
        focalLength: SMALL ? 0.022 : 0.03,
        focusRange: 0.075,
        bokehScale: SMALL ? 1.2 : 2.2,
        height: SMALL ? 360 : 480,
      })
    )
  );
}

/* owns the demand-loop kicks + pointer wiring (mirror hero Driver) */
function Driver({ container }) {
  const { invalidate, advance, setSize, setDpr } = useThree();
  React.useEffect(() => {
    let alive = true;
    const pump = () => {
      if (!alive) return;
      const w = container.clientWidth || 600;
      const hgt = container.clientHeight || 380;
      try { setSize(w, hgt); } catch (e) {}
      invalidate();
      try { advance(performance.now()); } catch (e) {}
    };
    pump();
    const timers = [60, 160, 320, 600].map((ms) => setTimeout(pump, ms));

    // CONTINUOUS DRIVE: the autonomy loop, the spring, the card tweens and
    // the confetti all need frames while they play. state.invalidate() from
    // inside useFrame does NOT reliably re-arm the demand loop in this build,
    // so an external rAF pump invalidates every frame while animating (and
    // the tab is visible) — the "keep the pump running while anything is
    // animating" contract. Under reduced-motion sim.animate is false, so this
    // never invalidates and the single composed static frame stays put.
    let rafId = null;
    // ARB-61: cap the always-busy idle at ~32fps. The funagent autonomy loop
    // never truly rests (phase machine + spring + confetti keep running), so
    // pumping every rAF burns its ~80-draw cost at the full display rate for
    // motion that reads identically at ~32fps. useFrame's delta stays wall-clock
    // so the animation remains time-correct, just cheaper. Direct invalidate()s
    // from pointer/visibility below are NOT throttled (interaction stays crisp).
    let lastPump = 0;
    const FA_MIN_DT = 1000 / 32;
    const tick = (now) => {
      if (!alive) return;
      if (sim.animate && inView && document.visibilityState === "visible") {
        if (now - lastPump >= FA_MIN_DT) { lastPump = now; invalidate(); }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // ARB-61: element-level visibility — only pump while the funagent canvas is
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

    // pointer steers the cube-bot's gaze (container-relative, clamped to
    // [-1..1]). invalidate() on every move so the demand loop renders the
    // new lean — and the spring keeps pumping until settled.
    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      let nx = (e.clientX - rect.left) / rect.width;
      let ny = (e.clientY - rect.top) / rect.height;
      sim.ptr.tx = Math.max(-1, Math.min(1, (nx - 0.5) * 2));
      sim.ptr.ty = Math.max(-1, Math.min(1, (ny - 0.5) * 2));
      sim.tactive = 1;
      invalidate();
    };
    const onLeave = () => { sim.tactive = 0; invalidate(); };
    // CLICK = the human approve gate: stamp the held case right now
    const onDown = () => { sim.audit.clickReq = true; sim.tactive = 1; invalidate(); };
    const onVis = () => { if (document.visibilityState === "visible") pump(); };
    const onResize = () => pump();

    // ARB-51: re-cap the device pixel ratio when the viewport class flips (e.g. a
    // phone loaded in landscape >919px then rotated to portrait was left pinned at
    // DPR 2). setDpr re-applies the pixel ratio in place — no remount. The bevel/
    // sphere detail tiers (SMOOTH/SPHSEG/SHADOW_RES) are baked into the meshes, so
    // re-tiering them needs a scene remount; that is delegated to ARB-32.
    const onTier = () => {
      const cap = Math.min(window.devicePixelRatio || 1,
        (window.matchMedia && window.matchMedia("(max-width: 919px)").matches) ? 1.5 : 2);
      try { if (setDpr) setDpr(cap); } catch (e) {}
      pump();
    };
    const mqSmall = window.matchMedia ? window.matchMedia("(max-width: 919px)") : null;

    container.addEventListener("pointermove", onMove, { passive: true });
    container.addEventListener("pointerleave", onLeave);
    container.addEventListener("pointerdown", onDown);
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
      container.removeEventListener("pointerleave", onLeave);
      container.removeEventListener("pointerdown", onDown);
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

function mountFunAgent(container, opts) {
  opts = opts || {};
  if (!container) return function () {};
  // no-WebGL: surface the CSS fallback (kit.css .av-funagent__viz.av-gl-failed)
  if (!hasWebGL()) {
    const host = container.closest(".av-funagent__viz") || container.parentElement;
    if (host) host.classList.add("av-gl-failed");
    return function () {};
  }
  resetSim();
  // reduced-motion: a composed STATIC frame — the bot leaning over a card it
  // is HOLDING that already reads "approved" (the done state), a couple of
  // cards already on the done pile, no motion, no confetti. sim.animate is
  // false so the Driver's single advance renders this settled pose.
  if (REDUCED) {
    const A = sim.audit;
    A.phase = "read"; A.phaseT = DUR.read; // fully leaned in
    A.stamped = true; A.badgeT = 1; A.snapHeld = true; A.done = 2;
    sim.look.x = 0; sim.look.y = -0.34; // gaze settled down on the held card
  }

  let root;
  try {
    root = createRoot(container);
  } catch (e) {
    console.error("AVR3F_FUNAGENT mount failed:", e && e.message);
    return function () {};
  }

  root.render(
    h(
      Canvas,
      {
        gl: {
          alpha: true,
          antialias: true,
          preserveDrawingBuffer: false,
          powerPreference: "high-performance",
        },
        dpr: [1, DPR_CAP],
        frameloop: "demand",
        camera: { position: [0, CAM_Y, CAM_Z], fov: 42, near: 0.1, far: 100 },
        style: { width: "100%", height: "100%", display: "block" },
        onCreated: (state) => {
          window.__r3fFunAgent = state;
          state.gl.setClearColor(0x000000, 0); // transparent over the cream band
          state.camera.lookAt(0, 0.05, 0);
          const w = container.clientWidth || 600;
          const hgt = container.clientHeight || 380;
          try { state.setSize(w, hgt); } catch (e) {}
          state.invalidate();
          // ARB-49: surface the on-brand fallback (incl. the static "case approved" card)
          // on a mid-session context loss, and self-heal when the context returns.
          const host = container.closest(".av-funagent__viz") || container.parentElement;
          const cv = state.gl.domElement;
          cv.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            if (host) host.classList.add("av-gl-failed");
          });
          cv.addEventListener("webglcontextrestored", () => {
            if (host) host.classList.remove("av-gl-failed");
            state.invalidate();
          });
        },
      },
      h(Driver, { container }),
      h(FunAgentScene, null)
    )
  );

  // same synthetic-resize bootstrap as the hero: <Canvas> defers GL-root
  // creation until react-use-measure reports a non-zero size, which never
  // happens in the hidden-tab preview (RO throttled). Pump synthetic window
  // 'resize' events until the GL root exists, forcing the measurement.
  let kicks = 0;
  let kickTimer = null;
  const KICK_CAP = 5;
  // ARB-84: fire the synthetic-resize poke ONLY while hidden/throttled (the
  // retired preview case); a visible tab composes the GL root via the container
  // ResizeObserver on frame 1. Capped at ~5 (was 40) to kill the load-time
  // reflow storm (×3 scenes ≈ 120 global resizes before).
  const forceMeasure = () => {
    if (window.__r3fFunAgent) return;
    if (document.visibilityState !== "visible") {
      try { window.dispatchEvent(new Event("resize")); } catch (e) {}
    }
    if (++kicks < KICK_CAP) kickTimer = setTimeout(forceMeasure, 120);
  };
  kickTimer = setTimeout(forceMeasure, 0);

  return function cleanup() {
    if (kickTimer) clearTimeout(kickTimer);
    try { root.unmount(); } catch (e) {}
    if (window.__r3fFunAgent) delete window.__r3fFunAgent;
  };
}

window.AVR3F_FUNAGENT = {
  mountFunAgent,
  // ARB-28: external trigger for the human approve-gate — same path as a canvas
  // pointerdown (sets sim.audit.clickReq, consumed by the audit machine). Lets a
  // real focusable DOM <button> approve the current case for keyboard + SR users.
  approve: () => { sim.audit.clickReq = true; },
  version: { three: THREE.REVISION, react: React.version },
};
window.dispatchEvent(new Event("avr3f-funagent-ready"));
