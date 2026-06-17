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
  const marqueeRef = React.useRef(null);

  React.useEffect(() => {
    const node = marqueeRef.current;
    if (!node) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let lastY = window.scrollY || 0;
    let lastT = performance.now();
    let boost = 0;
    let raf = 0;
    const write = () => {
      boost *= 0.88;
      const duration = Math.max(18, 26 - boost * 10);
      node.style.setProperty("--marquee-boost", boost.toFixed(3));
      node.style.setProperty("--marquee-duration", duration.toFixed(2) + "s");
      node.style.setProperty("--marquee-sep-opacity", Math.min(1, 0.72 + boost * 0.28).toFixed(3));
      node.style.setProperty("--marquee-sep-scale", Math.min(1.18, 1 + boost * 0.18).toFixed(3));
      raf = boost > 0.01 ? requestAnimationFrame(write) : 0;
    };
    const onScroll = () => {
      const now = performance.now();
      const y = window.scrollY || 0;
      const dt = Math.max(16, now - lastT);
      const velocity = Math.abs(y - lastY) / dt;
      boost = Math.min(0.8, Math.max(boost, velocity * 0.28));
      lastY = y;
      lastT = now;
      if (!raf) raf = requestAnimationFrame(write);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="av-section av-section--subtle" id="stack">
      <div className="container">
        <window.SectionHead index="06" eyebrow="stack" title="the tools i reach for." />
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
      <div className="av-marquee" ref={marqueeRef}>
        <div className="av-marquee__track">
          {loop.map((t, i) => <span className="av-marquee__item" key={i}>{t}</span>)}
        </div>
      </div>
    </section>
  );
}
window.Stack = Stack;
