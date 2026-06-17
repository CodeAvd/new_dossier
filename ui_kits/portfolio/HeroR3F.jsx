/* HeroR3F — B · urbanist-heavy hero whose data-field is a React Three Fiber
   scene (hero-r3f.js / window.AVR3F). Same layout + copy as HeroGL; only the
   canvas is swapped for an R3F mount point. */
function HeroR3F() {
  const { Button, Tag, Stat } = window.AvdeevDesignSystem_a8f605;
  const D = window.AV_DATA;
  const mountRef = React.useRef(null);

  window.useR3FVisibilityMount(mountRef, {
    readyEvent: "avr3f-ready",
    mount: (node) => window.AVR3F && window.AVR3F.mountHero(node, {}),
  });

  const go = (id) => {
    const el = document.getElementById(id);
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section className="av-herogl" id="top">
      <div className="av-herogl__canvas" ref={mountRef} aria-hidden="true" />
      <div className="av-herogl__field-label" aria-hidden="true">
        <span className="ln" /> evidence field · live
      </div>

      <div className="container av-herogl__inner">
        <div>
          <div className="av-herogl__eyebrow is-agent">
            <window.AgentMark size={16} stroke={1.7} />
            <span>an <b>autonomous qa agent</b> assembled this page</span>
            <span className="pulse" />
          </div>
          <h1 className="av-herogl__title">
            find the <span className="sp">edge</span>.<br />
            ship the <span className="ac">proof</span>.
          </h1>
          <p className="av-herogl__sub">
            <span className="cmt">//</span> the agent assembles this portfolio in front of you &mdash;
            reading each case, citing its source, stamping the verdict. the
            field to the right is its evidence; nothing here is claimed
            without it.
          </p>
          <div className="av-herogl__premise">
            <window.AgentMark size={15} stroke={1.6} />
            <span>
              scroll is the camera. the agent audits each scene and{" "}
              <b>certifies</b> it as you go &mdash; follow the console,
              lower-left.
            </span>
          </div>
          <div className="av-herogl__chips">
            <Tag tone="accent">python</Tag>
            <Tag tone="spark">rust</Tag>
            <Tag tone="neutral">pytorch</Tag>
            <Tag tone="outline">sharpe · tbd</Tag>
          </div>
          <div className="av-herogl__cta">
            <Button variant="primary" size="lg" onClick={() => go("work")}>
              see the proof
            </Button>
            <Button variant="secondary" size="lg" onClick={() => go("trading")}>
              read the book
            </Button>
          </div>
        </div>
      </div>

      {/* The agent's evidence-field status. Honesty as signature (ARB-92):
          it refuses to show a metric it has not measured — "under audit"
          is the deliberate state, not a missing number. */}
      <div className="av-herogl__readout" aria-hidden="true">
        <span className="badge"><i /> evidence field · live</span>
        <span className="k">citation recall</span>
        <span className="v"><b>under audit</b></span>
        <span className="k">policy</span>
        <span className="v">no claim without its source</span>
      </div>

      <div className="container av-herogl__stats">
        {D.stats.map((s, i) =>
          s.value === "\u2014" ? (
            <window.UnderAuditStat key={i} label={s.label} />
          ) : (
            <Stat key={i} value={s.value} unit={s.unit} label={s.label} size="sm" />
          )
        )}
      </div>
    </section>
  );
}
window.HeroR3F = HeroR3F;
