/* Experience — hover-highlight timeline */
function Experience() {
  const { Tag } = window.AvdeevDesignSystem_a8f605;
  const D = window.AV_DATA;
  const ref = window.useReveal();
  return (
    <section className="av-section" id="experience">
      <div className="container">
        <window.SectionHead index="05" eyebrow="experience" title="qa brain, <em>builder</em> hands." />
        <div className="av-timeline reveal" ref={ref}>
          {D.experience.map((e, i) => (
            <div className="av-tl" key={i}>
              <div className="av-tl__period">{e.period}</div>
              <div className="av-tl__body">
                <div className="av-tl__role">
                  <h3>{e.role}</h3>
                  <span className="av-tl__org">{e.org}</span>
                  {e.current ? <Tag tone="sage" dot>now</Tag> : null}
                </div>
                <p className="av-tl__note">{e.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.Experience = Experience;
