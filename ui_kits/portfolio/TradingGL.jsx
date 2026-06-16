/* TradingGL — dark quant band with a real three.js 3D equity surface.
   Front ridge of the terrain == the live equity curve from the book. */
function TradingGL() {
  const { Stat } = window.AvdeevDesignSystem_a8f605;
  const D = window.AV_DATA.trading;
  const ref = window.useReveal();
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    if (!canvasRef.current || !window.AVGL) return;
    const cleanup = window.AVGL.edgeTerrain(canvasRef.current, {
      equity: D.equity,
      signals: D.signals,
    });
    return cleanup;
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
            <span style={{ color: "var(--spark)" }}>·</span> the quant half
          </div>
          <h2 className="av-trading__title">
            tools that <em>find</em> the edge &mdash; and prove it.
          </h2>
          <p className="av-trading__lead">
            the surface is the live book: its front ridge is the real equity
            curve, 14 months on real ticks. every signal ships with its
            backtest. local-first, reproducible. the qa brain, pointed at
            markets.
          </p>
          <div className="av-trading__stats">
            <Stat value="+1.8" label="sharpe · live" size="sm" />
            <Stat value="14" unit="mo" label="track record" size="sm" />
            <Stat value="62" unit="%" label="hit rate" size="sm" />
          </div>
        </div>

        <div>
          <div className="av-tradinggl__viz">
            <canvas
              className="av-tradinggl__canvas"
              ref={canvasRef}
              aria-hidden="true"
            />
            <span className="av-tradinggl__grid-label">
              <span className="dot" /> polyKalshi · equity surface
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
window.TradingGL = TradingGL;
