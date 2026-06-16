/* About — narrative + fact grid */
function About() {
  const D = window.AV_DATA;
  const ref = window.useReveal();
  return (
    <section className="av-section" id="about">
      <div className="container">
        <window.SectionHead index="01" eyebrow="about" title="i don't trust a system <em>until it proves itself.</em>" />
        <div className="reveal av-about-grid" ref={ref}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {D.about.body.map((p, i) => (
              <p key={i} style={{ fontSize: "var(--fs-lg)", lineHeight: 1.65, color: "var(--text-body)", textWrap: "pretty" }}>{p}</p>
            ))}
          </div>
          <div className="av-card" style={{ padding: 26, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px 14px", alignSelf: "start" }}>
            {D.about.facts.map((f, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-faint)" }}>{f.k}</span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: "var(--text-strong)" }}>{f.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
window.About = About;
