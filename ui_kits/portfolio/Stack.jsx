/* Stack — grouped chips + italic marquee */
function Stack() {
  const { Tag } = window.AvdeevDesignSystem_a8f605;
  const D = window.AV_DATA;
  const ref = window.useReveal();
  const cols = [
    { h: "languages", items: D.stack.languages, tone: "accent" },
    { h: "ml / data", items: D.stack.ml, tone: "sage" },
    { h: "infra", items: D.stack.infra, tone: "sky" },
  ];
  const all = [...D.stack.languages, ...D.stack.ml, ...D.stack.infra];
  const loop = [...all, ...all];
  return (
    <section className="av-section av-section--subtle" id="stack">
      <div className="container">
        <window.SectionHead index="06" eyebrow="stack" title="the tools i <em>reach</em> for." />
        <div className="av-stack reveal" ref={ref}>
          {cols.map((c) => (
            <div className="av-stack__col" key={c.h}>
              <h4>{c.h}</h4>
              <div className="av-stack__list">
                {c.items.map((t) => <Tag key={t} tone={c.tone}>{t}</Tag>)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="av-marquee">
        <div className="av-marquee__track">
          {loop.map((t, i) => <span className="av-marquee__item" key={i}>{t}</span>)}
        </div>
      </div>
    </section>
  );
}
window.Stack = Stack;
