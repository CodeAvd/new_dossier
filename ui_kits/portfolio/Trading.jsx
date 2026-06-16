/* Trading — full-bleed holographic data band for the quant side */
function Trading() {
  const { Stat, Tag } = window.AvdeevDesignSystem_a8f605;
  const ref = window.useReveal();
  const signals = [
    { t: "btc · 4h", s: "long", v: "+2.4%", tone: "up" },
    { t: "eth · 1h", s: "flat", v: "0.0%", tone: "flat" },
    { t: "spy · 1d", s: "short", v: "-0.8%", tone: "down" },
    { t: "sol · 4h", s: "long", v: "+5.1%", tone: "up" },
  ];
  return (
    <section className="av-trading" id="trading">
      <div className="av-trading__bg" aria-hidden="true">
        <span className="av-blob" style={{ width: 420, height: 420, top: -160, right: 60, background: "radial-gradient(circle at 40% 40%, var(--holo-500), transparent 70%)", opacity: 0.6 }} />
        <span className="av-blob" style={{ width: 300, height: 300, bottom: -120, left: -40, background: "radial-gradient(circle at 40% 40%, var(--spark), transparent 70%)", opacity: 0.18 }} />
      </div>
      <div className="container av-trading__inner reveal" ref={ref}>
        <div className="av-trading__head">
          <div className="av-sec-eyebrow" style={{ color: "var(--spark)" }}>
            <span style={{ color: "var(--spark)" }}>·</span> the quant half
          </div>
          <h2 className="av-trading__title">tools that <em>find</em> the edge — and prove it.</h2>
          <p className="av-trading__lead">every signal ships with its backtest. local-first, reproducible, on real ticks. the qa brain, pointed at markets.</p>
          <div className="av-trading__stats">
            <Stat value="+1.8" label="sharpe · live" size="sm" />
            <Stat value="14" unit="mo" label="track record" size="sm" />
            <Stat value="62" unit="%" label="hit rate" size="sm" />
          </div>
        </div>

        <div className="av-trading__panel">
          <div className="av-trading__panel-top">
            <span className="av-trading__chip"><span className="dot" /> polyKalshi · live book</span>
            <span className="av-trading__since">equity curve · 14mo</span>
          </div>
          <svg className="av-trading__chart" viewBox="0 0 520 160" preserveAspectRatio="none" fill="none">
            <defs>
              <linearGradient id="eqfill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#34bfff" stopOpacity="0.28" />
                <stop offset="1" stopColor="#34bfff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,138 L40,132 L80,134 L120,118 L160,122 L200,98 L240,104 L280,82 L320,86 L360,58 L400,64 L440,38 L480,30 L520,14 L520,160 L0,160 Z" fill="url(#eqfill)" />
            <polyline points="0,138 40,132 80,134 120,118 160,122 200,98 240,104 280,82 320,86 360,58 400,64 440,38 480,30 520,14" stroke="#34bfff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="0,150 40,149 80,151 120,147 160,149 200,144 240,147 280,141 320,144 360,136 400,140 440,132 480,134 520,128" stroke="rgba(225,245,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <div className="av-trading__feed">
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
window.Trading = Trading;
