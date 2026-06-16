/* TradingR3F — dark quant band whose 3D equity surface is a React Three
   Fiber scene (_trading-r3f.js / window.AVR3F_TRADING). Same layout + copy
   as TradingGL; only the <canvas> is swapped for an R3F mount <div>, and
   the scene runs on the SAME three@0.160 as the R3F hero (no r128). */
function TradingR3F() {
  const { Stat } = window.AvdeevDesignSystem_a8f605;
  const D = window.AV_DATA.trading;
  const ref = window.useReveal();
  const mountRef = React.useRef(null);

  React.useEffect(() => {
    const node = mountRef.current;
    if (!node) return;
    let cancelled = false;
    let mountCleanup = null;
    let teardown = null;

    const start = () => {
      if (cancelled || !window.AVR3F_TRADING) return false;
      mountCleanup = window.AVR3F_TRADING.mountTrading(node, {
        equity: D.equity,
        signals: D.signals,
      });
      return true;
    };
    // the ESM module may resolve after this Babel component mounts —
    // start now if ready, else wait for its ready signal (with a safety poll).
    const begin = () => {
      if (!start()) {
        const onReady = () => start();
        window.addEventListener("avr3f-trading-ready", onReady, { once: true });
        const poll = setInterval(() => { if (start()) clearInterval(poll); }, 120);
        const stopPoll = setTimeout(() => clearInterval(poll), 8000);
        teardown = () => {
          clearInterval(poll);
          clearTimeout(stopPoll);
          window.removeEventListener("avr3f-trading-ready", onReady);
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

  const signals = D.feed;

  return (
    <section className="av-trading" id="trading">
      <div className="av-trading__bg" aria-hidden="true">
        <span
          className="av-blob"
          style={{
            width: 420,
            height: 420,
            top: -160,
            right: 60,
            background:
              "radial-gradient(circle at 40% 40%, var(--holo-500), transparent 70%)",
            opacity: 0.6,
          }}
        />
        <span
          className="av-blob"
          style={{
            width: 300,
            height: 300,
            bottom: -120,
            left: -40,
            background:
              "radial-gradient(circle at 40% 40%, var(--spark), transparent 70%)",
            opacity: 0.18,
          }}
        />
      </div>

      <div className="container av-trading__inner reveal" ref={ref}>
        <div className="av-trading__head">
          <div className="av-sec-eyebrow" style={{ color: "var(--spark)" }}>
            <span className="av-sec-num" style={{ color: "var(--spark)" }}>04</span> the quant half
          </div>
          <h2 className="av-trading__title">
            tools that <em>find</em> the edge &mdash; and prove it.
          </h2>
          {/* TODO(metrics): copy is honest-schematic. The 3D surface is a
              REPRESENTATIVE shape, not real P&L. Only restore "live book /
              real equity curve / real ticks" framing once it's driven by an
              actual backtest export. Never label the synthetic viz as real. */}
          <p className="av-trading__lead">
            the surface is a schematic equity field &mdash; not live p&amp;l.
            the idea behind the book: every signal
            ships with its backtest. local-first, reproducible. the qa brain,
            pointed at markets &mdash; and made to cite its evidence.
          </p>
          {/* honesty as signature (ARB-92): the agent shows "under audit",
              never an invented sharpe / track record / hit rate. */}
          <div className="av-trading__stats">
            <window.UnderAuditStat label="sharpe" dark />
            <window.UnderAuditStat label="track record" dark />
            <window.UnderAuditStat label="hit rate" dark />
          </div>
        </div>

        <div>
          <div className="av-tradinggl__viz">
            <div
              className="av-tradinggl__canvas"
              ref={mountRef}
              aria-hidden="true"
            />
            {/* ARB-74: first-load cue that the surface is interactive (auto-fades) */}
            <span className="av-tradinggl__hint" aria-hidden="true">hover to tilt</span>
            {/* ARB-95: label the surface for its actual domain — a schematic
                equity/backtest field (matches the lead copy + the sharpe/track-
                record stats above). polyKalshi is a cross-market ARB scanner and
                lives in the case files; borrowing its name for an equity surface
                read as a domain error to a quant juror. */}
            <span className="av-tradinggl__grid-label">
              <span className="dot" /> equity surface
            </span>
            <span className="av-tradinggl__axis">depth = lookback · height = pnl</span>
          </div>
          <div className="av-tradinggl__feet">
            {signals.map((g, i) => (
              <div className="av-sig" key={i} data-tone={g.tone}>
                <span className="av-sig__t">{g.t}</span>
                <span className="av-sig__s">{g.s}</span>
                <span className="av-sig__v">{g.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
window.TradingR3F = TradingR3F;
