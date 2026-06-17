/* Projects — case-study cards with tone glow, stat, tags, hover arrow */
function Projects() {
  const { Tag } = window.AvdeevDesignSystem_a8f605;
  const D = window.AV_DATA;
  const ref = window.useReveal();

  const glow = {
    accent: "var(--terra-300)", sage: "var(--sage)", honey: "var(--honey)",
    mauve: "var(--mauve)", blush: "var(--blush)", sky: "var(--sky)",
  };

  return (
    <section className="av-section av-section--subtle" id="work">
      <div className="container">
        <window.SectionHead index="02" eyebrow="the agent's case files" title="things that back their own verdicts.">
          four shipped tools, certified the same way: the agent links every
          verdict to its source or its backtest.
        </window.SectionHead>
        <div className="av-projects reveal" ref={ref}>
          {D.projects.map((p) => (
            <article className={"av-proj" + (p.holo ? " av-proj--holo" : "")} key={p.id}>
              <span className="av-proj__glow" style={{ background: glow[p.tone] || glow.accent }} />
              <div className="av-proj__top">
                <div>
                  <div className="av-proj__kind">{p.kind}</div>
                  <h3 className="av-proj__title">{p.title}</h3>
                </div>
              </div>
              <p className="av-proj__blurb">{p.blurb}</p>
              <div className="av-proj__foot">
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {p.stat.value === "\u2014" ? (
                    <window.UnderAuditStat label={p.stat.label} dark={p.holo} />
                  ) : (
                    <div className="av-proj__stat">
                      {p.stat.value}<span style={{ fontStyle: "italic", fontWeight: 400, color: p.holo ? "var(--spark)" : "var(--accent)", fontSize: "0.6em" }}>{p.stat.unit}</span>
                      <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", color: p.holo ? "color-mix(in srgb, var(--holo-text) 70%, transparent)" : "var(--text-faint)", marginTop: 6 }}>{p.stat.label}</span>
                    </div>
                  )}
                  <div className="av-proj__tags">
                    {p.tags.map((t) => <Tag key={t} tone={p.tone}>{t}</Tag>)}
                  </div>
                </div>
                <span className="av-proj__arrow">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
window.Projects = Projects;
