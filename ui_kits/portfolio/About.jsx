/* About — narrative + fact grid */
function About() {
  const D = window.AV_DATA;
  const ref = window.useReveal();
  return (
    <section className="av-section" id="about">
      <div className="container">
        <window.SectionHead index="01" eyebrow="about" title="i don&rsquo;t trust a system <em>until it proves itself.</em>" />
        <div className="reveal av-about-grid" ref={ref}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {D.about.body.map((p, i) => (
              <p key={i} style={{ fontSize: "var(--fs-lg)", lineHeight: 1.65, color: "var(--text-body)", textWrap: "pretty", maxWidth: "var(--measure-body, 66ch)" }}>{p}</p>
            ))}
          </div>
          <div className="av-card av-fact-grid" style={{ padding: 12 }}>
            {D.about.facts.map((f, i) => (
              <div key={i} className="av-fact">
                <span className="av-fact__k">{f.k}</span>
                <span className="av-fact__v">{f.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
window.About = About;
