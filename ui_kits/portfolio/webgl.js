/* ============================================================
   avdeev — webgl engine (three.js r128, global THREE)
   Two scenes, both attach to window.AVGL:
     heroField(canvas, opts)   -> inky topographic data-field (light/sand)
     edgeTerrain(canvas, opts) -> 3D equity surface (dark/holo)
   Each returns a cleanup() fn. Always paints one synchronous frame
   (so content shows even before rAF starts / when rAF is throttled),
   then animates via rAF unless prefers-reduced-motion is set.
   Resizes to its parent.
   ============================================================ */
(function () {
  "use strict";

  var REDUCED =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SMALL = window.matchMedia && window.matchMedia("(max-width: 760px)").matches;

  // registry of mounted scenes — verification reads AVGL.scenes.length /
  // scene.calls (renderer.info.render.calls). Each mount pushes; cleanup splices.
  var scenes = [];
  function register(rec) {
    scenes.push(rec);
    return function () {
      var i = scenes.indexOf(rec);
      if (i >= 0) scenes.splice(i, 1);
    };
  }

  function col(hex) {
    return new THREE.Color(hex);
  }
  // a soft round sprite so signal nodes read as glowing dots, not squares
  var _dotTex = null;
  function dotTexture() {
    if (_dotTex) return _dotTex;
    var cv = document.createElement("canvas");
    cv.width = cv.height = 64;
    var g = cv.getContext("2d");
    var grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
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
  function smoothstep(a, b, x) {
    var t = Math.max(0, Math.min(1, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  }
  // read a CSS custom property off :root (theme-aware), with a fallback
  var _rootCS = null;
  function cssVar(name, fallback) {
    if (!_rootCS) _rootCS = getComputedStyle(document.documentElement);
    var v = _rootCS.getPropertyValue(name);
    return (v && v.trim()) || fallback;
  }
  // create a renderer; on failure flag the parent for the CSS fallback panel
  function makeRenderer(canvas) {
    try {
      var r = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: true, // so pixels survive for verification / static capture
      });
      r.setPixelRatio(Math.min(window.devicePixelRatio || 1, SMALL ? 1.5 : 2));
      return r;
    } catch (e) {
      var host = canvas.parentElement;
      if (host) host.classList.add("av-gl-failed");
      return null;
    }
  }
  function observeSize(el, cb) {
    var ro = new ResizeObserver(function () {
      cb(el.clientWidth, el.clientHeight);
    });
    ro.observe(el);
    return function () {
      ro.disconnect();
    };
  }

  /* ==========================================================
     HERO FIELD — topographic point terrain on a transparent bg
     ========================================================== */
  function heroField(canvas, opts) {
    opts = opts || {};
    var parent = canvas.parentElement;
    var W = parent.clientWidth || 800;
    var H = parent.clientHeight || 500;

    var renderer = makeRenderer(canvas);
    if (!renderer) return function () {}; // no-WebGL: CSS fallback panel shows
    renderer.setSize(W, H, false);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(46, W / H, 0.1, 200);
    camera.position.set(0, 13, 25);
    camera.lookAt(0, -1, -6);

    var GW = SMALL ? 64 : 108;
    var GD = SMALL ? 44 : 74;
    var SPAN_X = 64;
    var SPAN_Z = 52;
    var count = GW * GD;

    var positions = new Float32Array(count * 3);
    var colors = new Float32Array(count * 3);
    var baseXZ = new Float32Array(count * 2);
    // colors from theme tokens (fallbacks match the light-sand kit)
    var inkLow = col(opts.low || cssVar("--ink-300", "#b3a48f"));
    var inkMid = col(opts.mid || cssVar("--ink-800", "#3a2f26"));
    var spark = col(opts.spark || cssVar("--spark", "#34bfff"));

    var i = 0;
    for (var r = 0; r < GD; r++) {
      for (var c = 0; c < GW; c++) {
        var x = (c / (GW - 1) - 0.5) * SPAN_X;
        var z = (r / (GD - 1) - 0.5) * SPAN_Z - 6;
        baseXZ[i * 2] = x;
        baseXZ[i * 2 + 1] = z;
        positions[i * 3] = x;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = z;
        i++;
      }
    }

    var geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    var mat = new THREE.PointsMaterial({
      size: SMALL ? 0.42 : 0.34,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      sizeAttenuation: true,
      depthWrite: false,
    });
    var points = new THREE.Points(geom, mat);
    scene.add(points);

    var ptr = { x: 0, z: -6, tx: 0, tz: -6, active: 0, tactive: 0 };
    function onMove(e) {
      var rect = parent.getBoundingClientRect();
      var nx = (e.clientX - rect.left) / rect.width;
      var ny = (e.clientY - rect.top) / rect.height;
      // clamp slightly past the edges so the cursor can drive the very front
      // and very back rows, and so positions outside the hero (over the
      // work/trading/about areas) stick to the nearest grid edge instead of
      // pushing the influence point off-grid (which killed the reaction).
      nx = Math.max(-0.12, Math.min(1.12, nx));
      ny = Math.max(-0.12, Math.min(1.12, ny));
      // map the full vertical range onto the full grid depth (was *0.5, which
      // only reached the middle band of waves).
      ptr.tx = (nx - 0.5) * SPAN_X;
      ptr.tz = (ny - 0.5) * SPAN_Z - 6;
      ptr.tactive = 1;
    }
    function onLeave() {
      ptr.tactive = 0;
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    parent.addEventListener("pointerleave", onLeave);

    var posAttr = geom.attributes.position;
    var colAttr = geom.attributes.color;

    function field(x, z, t) {
      return (
        Math.sin(x * 0.18 + t * 0.6) * 1.5 +
        Math.sin(z * 0.22 - t * 0.45) * 1.2 +
        Math.sin((x + z) * 0.12 + t * 0.32) * 0.9 +
        Math.sin((x - z) * 0.3 - t * 0.5) * 0.45
      );
    }

    function compute(t) {
      ptr.x += (ptr.tx - ptr.x) * 0.08;
      ptr.z += (ptr.tz - ptr.z) * 0.08;
      ptr.active += (ptr.tactive - ptr.active) * 0.06;

      for (var k = 0; k < count; k++) {
        var x = baseXZ[k * 2];
        var z = baseXZ[k * 2 + 1];
        var h = field(x, z, t);

        var dx = x - ptr.x;
        var dz = z - ptr.z;
        var d2 = dx * dx + dz * dz;
        // wider gaussian so the ripple reaches the far/back waves, not just a
        // tight bump around the cursor.
        h += Math.exp(-d2 / 150) * 4.6 * ptr.active;

        positions[k * 3 + 1] = h;

        var t01 = smoothstep(-1.5, 3.4, h);
        var cr, cg, cb;
        if (t01 < 0.55) {
          var u = t01 / 0.55;
          cr = inkLow.r + (inkMid.r - inkLow.r) * u;
          cg = inkLow.g + (inkMid.g - inkLow.g) * u;
          cb = inkLow.b + (inkMid.b - inkLow.b) * u;
        } else {
          var v = (t01 - 0.55) / 0.45;
          cr = inkMid.r + (spark.r - inkMid.r) * v;
          cg = inkMid.g + (spark.g - inkMid.g) * v;
          cb = inkMid.b + (spark.b - inkMid.b) * v;
        }
        colors[k * 3] = cr;
        colors[k * 3 + 1] = cg;
        colors[k * 3 + 2] = cb;
      }
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
    }

    function render() {
      camera.position.x += (ptr.x * 0.12 - camera.position.x) * 0.03;
      camera.lookAt(0, -2, -6);
      renderer.render(scene, camera);
    }

    // pre-warm to a composed pose so the synchronous first frame is the hero
    // shot (not a flat t=0 state) — works even when rAF is paused / throttled.
    var WARM = 0.9;
    var raf = null;
    var start = performance.now() - WARM * 1000; // continue the loop from WARM, no jump
    function loop(now) {
      compute((now - start) / 1000);
      render();
      raf = requestAnimationFrame(loop);
    }

    compute(WARM);
    render();
    if (!REDUCED) raf = requestAnimationFrame(loop);

    var stopResize = observeSize(parent, function (w, h) {
      if (!w || !h) return;
      W = w;
      H = h;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      render();
    });

    var unregister = register({
      type: "hero",
      canvas: canvas,
      renderer: renderer,
      scene: scene,
      camera: camera,
      get calls() {
        return renderer.info.render.calls;
      },
    });

    return function cleanup() {
      if (raf) cancelAnimationFrame(raf);
      stopResize();
      unregister();
      window.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
      geom.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }

  /* ==========================================================
     EDGE TERRAIN — 3D equity surface (dark holo panel)
     opts.equity = [0..1] heights for the FRONT ridge (the live curve)
     ========================================================== */
  function edgeTerrain(canvas, opts) {
    opts = opts || {};
    var equity = opts.equity || [
      0.12, 0.16, 0.15, 0.26, 0.24, 0.4, 0.36, 0.5, 0.48, 0.66, 0.62, 0.8,
      0.86, 0.98,
    ];
    var signals = opts.signals || [];
    var parent = canvas.parentElement;
    var W = parent.clientWidth || 600;
    var H = parent.clientHeight || 320;

    var renderer = makeRenderer(canvas);
    if (!renderer) return function () {}; // no-WebGL: CSS fallback panel shows
    renderer.setSize(W, H, false);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 200);
    camera.position.set(0, 11, 22);
    camera.lookAt(0, 0.5, 0);

    var spark = col(cssVar("--spark", "#34bfff"));
    var sparkDeep = col(cssVar("--spark-deep", "#0086bb"));
    var holoLine = col(cssVar("--holo-500", "#2b5a93"));

    var COLS = SMALL ? 40 : 64;
    var ROWS = SMALL ? 26 : 40;
    var SX = 30;
    var SZ = 20;

    function sampleEquity(u) {
      var f = u * (equity.length - 1);
      var a = Math.floor(f);
      var b = Math.min(equity.length - 1, a + 1);
      var m = f - a;
      return equity[a] * (1 - m) + equity[b] * m;
    }

    var positions = new Float32Array(COLS * ROWS * 3);
    var baseXZ = new Float32Array(COLS * ROWS * 2);
    var idx = 0;
    for (var r = 0; r < ROWS; r++) {
      for (var c = 0; c < COLS; c++) {
        var x = (c / (COLS - 1) - 0.5) * SX;
        var z = (r / (ROWS - 1) - 0.5) * SZ;
        baseXZ[idx * 2] = c / (COLS - 1);
        baseXZ[idx * 2 + 1] = r / (ROWS - 1);
        positions[idx * 3] = x;
        positions[idx * 3 + 1] = 0;
        positions[idx * 3 + 2] = z;
        idx++;
      }
    }

    var segs = [];
    function vi(c, r) {
      return r * COLS + c;
    }
    for (var rr = 0; rr < ROWS; rr++) {
      for (var cc = 0; cc < COLS; cc++) {
        if (cc < COLS - 1) segs.push(vi(cc, rr), vi(cc + 1, rr));
        if (rr < ROWS - 1) segs.push(vi(cc, rr), vi(cc, rr + 1));
      }
    }

    var geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setIndex(segs);
    var lineMat = new THREE.LineBasicMaterial({
      color: holoLine,
      transparent: true,
      opacity: 0.55,
    });
    var wire = new THREE.LineSegments(geom, lineMat);

    var pcolors = new Float32Array(COLS * ROWS * 3);
    var pgeom = new THREE.BufferGeometry();
    pgeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pgeom.setAttribute("color", new THREE.BufferAttribute(pcolors, 3));
    var pMat = new THREE.PointsMaterial({
      size: SMALL ? 0.34 : 0.26,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    var pts = new THREE.Points(pgeom, pMat);

    var group = new THREE.Group();
    group.add(wire);
    group.add(pts);

    // signal nodes — small spark dots sitting on the FRONT ridge (the equity
    // curve), in depth. kind tints them within the one-accent family.
    var FRONT_Z = SZ / 2;
    var nodeMat = null,
      nodeGeom = null,
      nodes = null;
    var NODE_BASE = SMALL ? 1.05 : 0.82;
    if (signals.length) {
      var npos = new Float32Array(signals.length * 3);
      var ncol = new Float32Array(signals.length * 3);
      for (var s = 0; s < signals.length; s++) {
        var su = signals[s].i / (equity.length - 1);
        npos[s * 3] = (su - 0.5) * SX;
        npos[s * 3 + 1] = sampleEquity(su) * 7.0 + 0.55; // float just above ridge
        npos[s * 3 + 2] = FRONT_Z;
        var kc =
          signals[s].kind === "short"
            ? sparkDeep
            : signals[s].kind === "flat"
            ? holoLine
            : spark;
        ncol[s * 3] = kc.r;
        ncol[s * 3 + 1] = kc.g;
        ncol[s * 3 + 2] = kc.b;
      }
      nodeGeom = new THREE.BufferGeometry();
      nodeGeom.setAttribute("position", new THREE.BufferAttribute(npos, 3));
      nodeGeom.setAttribute("color", new THREE.BufferAttribute(ncol, 3));
      nodeMat = new THREE.PointsMaterial({
        size: NODE_BASE,
        map: dotTexture(),
        vertexColors: true,
        transparent: true,
        opacity: 0.98,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      nodes = new THREE.Points(nodeGeom, nodeMat);
      group.add(nodes);
    }

    scene.add(group);

    var posAttr = geom.attributes.position;
    var ppos = pgeom.attributes.position;
    var pcol = pgeom.attributes.color;

    function compute(t) {
      var i2 = 0;
      for (var r = 0; r < ROWS; r++) {
        for (var c = 0; c < COLS; c++) {
          var u = baseXZ[i2 * 2];
          var w = baseXZ[i2 * 2 + 1];
          var ridge = sampleEquity(u) * 7.0;
          var front = w;
          var noise =
            Math.sin(u * 9 + t * 0.8) * 0.5 +
            Math.sin(w * 7 - t * 0.6) * 0.4 +
            Math.sin((u + w) * 12 + t) * 0.25;
          var h = ridge * (0.35 + front * 0.65) + noise * (1 - front) * 1.3;
          positions[i2 * 3 + 1] = h;

          var t01 = smoothstep(0, 7, h);
          pcolors[i2 * 3] = sparkDeep.r + (spark.r - sparkDeep.r) * t01;
          pcolors[i2 * 3 + 1] = sparkDeep.g + (spark.g - sparkDeep.g) * t01;
          pcolors[i2 * 3 + 2] = sparkDeep.b + (spark.b - sparkDeep.b) * t01;
          i2++;
        }
      }
      posAttr.needsUpdate = true;
      ppos.needsUpdate = true;
      pcol.needsUpdate = true;
    }

    var tilt = { x: 0, y: 0, tx: 0, ty: 0 };
    function onMove(e) {
      var rect = parent.getBoundingClientRect();
      tilt.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 0.6;
      tilt.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 0.3;
    }
    parent.addEventListener("pointermove", onMove, { passive: true });

    function render(t) {
      tilt.x += (tilt.tx - tilt.x) * 0.05;
      tilt.y += (tilt.ty - tilt.y) * 0.05;
      group.rotation.y = Math.sin(t * 0.12) * 0.32 + tilt.x;
      group.rotation.x = -0.06 + tilt.y;
      if (nodeMat) nodeMat.size = NODE_BASE * (1 + 0.18 * Math.sin(t * 2.4));
      renderer.render(scene, camera);
    }

    var WARM = 1.2;
    var raf = null;
    var start = performance.now() - WARM * 1000;
    function loop(now) {
      var t = (now - start) / 1000;
      compute(t);
      render(t);
      raf = requestAnimationFrame(loop);
    }

    // pre-warm to a composed, slightly-orbited pose for the first frame
    compute(WARM);
    if (REDUCED) {
      group.rotation.y = 0.22;
      group.rotation.x = -0.06;
      renderer.render(scene, camera);
    } else {
      render(WARM);
      raf = requestAnimationFrame(loop);
    }

    var stopResize = observeSize(parent, function (w, h) {
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      renderer.render(scene, camera);
    });

    var unregister = register({
      type: "trading",
      canvas: canvas,
      renderer: renderer,
      scene: scene,
      camera: camera,
      get calls() {
        return renderer.info.render.calls;
      },
    });

    return function cleanup() {
      if (raf) cancelAnimationFrame(raf);
      stopResize();
      unregister();
      parent.removeEventListener("pointermove", onMove);
      geom.dispose();
      pgeom.dispose();
      if (nodeGeom) nodeGeom.dispose();
      lineMat.dispose();
      pMat.dispose();
      if (nodeMat) nodeMat.dispose();
      renderer.dispose();
    };
  }

  window.AVGL = {
    heroField: heroField,
    edgeTerrain: edgeTerrain,
    scenes: scenes,
  };
})();
