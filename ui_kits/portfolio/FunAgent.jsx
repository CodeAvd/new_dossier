/* FunAgent — the QA agent's ROOM (warm, cozy, character). A cream band
   whose stage is a React Three Fiber scene (_funagent-r3f.js /
   window.AVR3F_FUNAGENT), mounted with the SAME ready-poll pattern as
   HeroR3F. SLICE 2 of 2: the warm room + a soft cube-bot that autonomously
   works through a little inbox of case-cards — reading each one, stamping
   it "approved" with a springy bounce + warm confetti, and dropping it on a
   done pile. It still turns to follow the cursor, and a click lets the
   visitor approve the held case themselves. */
function FunAgent() {
  const ref = window.useReveal();
  const mountRef = React.useRef(null);
  const [announce, setAnnounce] = React.useState("");

  // ARB-28: approve the held case from a REAL focusable control (keyboard + SR),
  // firing the same human-approve gate as a canvas click, and announce it politely.
  const approveCase = () => {
    if (window.AVR3F_FUNAGENT && window.AVR3F_FUNAGENT.approve) window.AVR3F_FUNAGENT.approve();
    setAnnounce("Case approved — the agent stamps it and files it on the done pile.");
  };

  React.useEffect(() => {
    const node = mountRef.current;
    if (!node) return;
    let cancelled = false;
    let mountCleanup = null;
    let teardown = null;

    const start = () => {
      if (cancelled || !window.AVR3F_FUNAGENT) return false;
      mountCleanup = window.AVR3F_FUNAGENT.mountFunAgent(node, {});
      return true;
    };
    // the ESM module may resolve after this Babel component mounts —
    // start now if ready, else wait for its ready signal (with a safety poll).
    const begin = () => {
      if (!start()) {
        const onReady = () => start();
        window.addEventListener("avr3f-funagent-ready", onReady, { once: true });
        const poll = setInterval(() => { if (start()) clearInterval(poll); }, 120);
        const stopPoll = setTimeout(() => clearInterval(poll), 8000);
        teardown = () => {
          clearInterval(poll);
          clearTimeout(stopPoll);
          window.removeEventListener("avr3f-funagent-ready", onReady);
          if (mountCleanup) mountCleanup();
        };
      } else {
        teardown = () => { if (mountCleanup) mountCleanup(); };
      }
    };

    // PERF-3: below-fold GL — don't instantiate the context until near-viewport.
    let io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        if (io) { io.disconnect(); io = null; }
        begin();
      }
    }, { rootMargin: "200px" });
    io.observe(node);

    return () => {
      cancelled = true;
      if (io) io.disconnect();
      if (teardown) teardown();
    };
  }, []);

  return (
    <section className="av-funagent" id="funagent">
      <div className="av-funagent__bg" aria-hidden="true">
        <span
          className="av-blob"
          style={{
            width: 360,
            height: 360,
            top: -140,
            left: 30,
            background:
              "radial-gradient(circle at 40% 40%, var(--honey), transparent 70%)",
            opacity: 0.45,
          }}
        />
        <span
          className="av-blob"
          style={{
            width: 300,
            height: 300,
            bottom: -120,
            right: -40,
            background:
              "radial-gradient(circle at 40% 40%, var(--blush), transparent 70%)",
            opacity: 0.4,
          }}
        />
      </div>

      <div className="container av-funagent__inner reveal" ref={ref}>
        <div className="av-funagent__head">
          <div className="av-sec-eyebrow" style={{ color: "var(--terra-700)" }}>
            <span className="av-sec-num" style={{ color: "var(--terra-600)" }}>03</span> autonomous qa assistant
          </div>
          <h2 className="av-funagent__title">
            meet the agent <em>that runs qa</em> while you watch.
          </h2>
          <p className="av-funagent__lead">
            it works through its inbox on its own &mdash; reading each case,
            stamping it <em>approved</em>, dropping it on the done pile, then
            picking the next. move your cursor and it turns to watch you;
            <strong style={{ fontWeight: 500, color: "var(--terra-700)" }}>
            {" "}click the room to approve a case yourself.</strong>
          </p>
        </div>

        <div>
          <div className="av-funagent__viz">
            <div
              className="av-funagent__canvas"
              ref={mountRef}
              aria-hidden="true"
            />
            {/* ARB-24: GL-less static fallback — if WebGL/ESM never resolves, the
                premise (a case, read → approved → filed) still survives. Shown only
                when the engine flags failure (.av-gl-failed). */}
            <div className="av-funagent__fallback" aria-hidden="true">
              <div className="av-funagent__fallback-card">
                <span className="av-funagent__fallback-check">&#10003;</span>
                <div>
                  <strong>case approved</strong>
                  <span>read &middot; stamped &middot; filed on the done pile</span>
                </div>
              </div>
            </div>
            {/* ARB-28/74: the one real interaction, made visible + operable. A real
                <button> (keyboard + screen reader) fires the same approve gate as a
                canvas click. */}
            <button type="button" className="av-funagent__approve" onClick={approveCase}>
              approve a case <kbd>&#9166;</kbd>
            </button>
            <span className="av-funagent__label">
              <span className="dot" /> qa assistant &middot; auditing
            </span>
          </div>
          {/* ARB-24: the literal narrative the (aria-hidden) canvas tells, for SR. */}
          <p className="sr-only">
            An autonomous QA agent works through a small inbox of case cards: it reads
            each one, stamps it &ldquo;approved&rdquo;, and files it on a growing done
            pile, then picks the next &mdash; always quietly busy. The 3D room is a
            decorative illustration of that loop; use the &ldquo;approve a case&rdquo;
            button to approve the current case yourself.
          </p>
          {/* ARB-28: polite SR feedback for the user-triggered approve. */}
          <div className="sr-only" role="status" aria-live="polite">{announce}</div>
        </div>
      </div>
    </section>
  );
}
window.FunAgent = FunAgent;
