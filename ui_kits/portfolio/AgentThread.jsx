/* AgentThread — ARB-87's connective device. A fixed QA-agent console that
   threads the whole scroll: scroll is the camera, and the agent audits and
   stamps each scene "certified" as you pass it, coupling the separate scenes
   into one directed film. Reads existing section ids; mutates nothing in the
   scenes themselves (the wave + R3F exhibits stay exactly as they are). */
function AgentThread() {
  // document-order scenes the agent walks through, by existing section id.
  const SCENES = React.useMemo(() => ([
    { id: "top",        name: "the evidence field", meta: "the wave renders what the agent has gathered" },
    { id: "about",      name: "provenance",         meta: "where every verdict learned to cite itself" },
    { id: "work",       name: "the case files",     meta: "four tools — each cites its source or shows its backtest" },
    { id: "funagent",   name: "the auditor",        meta: "the agent itself, working its inbox on screen" },
    { id: "trading",    name: "the book",           meta: "the quant half — every signal ships with its backtest" },
    { id: "experience", name: "the track record",   meta: "qa → quant → agents, in order" },
    { id: "contact",    name: "the sign-off",       meta: "hand the agent your system; it'll prove it" },
  ]), []);

  const [active, setActive] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const rootRef = React.useRef(null);

  React.useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const vh = window.innerHeight;
      const els = SCENES.map((s) => document.getElementById(s.id));

      // the deepest scene whose start has crossed 58% of the viewport
      let idx = 0;
      els.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top < vh * 0.58) idx = i;
      });

      // overall film position
      const max = document.documentElement.scrollHeight - vh;
      const frac = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;

      // last scene well in view, or page bottom → fully certified
      const last = els[els.length - 1];
      const lastIn = last && last.getBoundingClientRect().top < vh * 0.34;
      const isDone = (idx >= SCENES.length - 1 && lastIn) || frac > 0.985;

      setActive(idx);
      setProgress(frac);
      setDone(isDone);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure); };

    measure();
    requestAnimationFrame(() => { if (rootRef.current) rootRef.current.classList.add("is-in"); });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [SCENES]);

  const total = SCENES.length;
  const certified = done ? total : active;            // scenes fully behind us
  const scene = done
    ? { name: "portfolio certified", meta: "every claim links to its source — read it back." }
    : SCENES[active];

  const go = (id) => {
    const el = document.getElementById(id);
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <aside
      className="av-agent"
      ref={rootRef}
      data-done={String(done)}
      role="status"
      aria-live="polite"
      aria-label="autonomous QA agent — certification progress"
    >
      <div className="av-agent__head">
        <window.AgentMark size={17} stroke={1.6} />
        <span className="av-agent__id">autonomous <b>qa agent</b></span>
        <span className="av-agent__live">
          <i />{done ? "certified" : "on shift"}
        </span>
      </div>

      <div className="av-agent__now">
        <div className="av-agent__verb">
          {done ? "verdict" : "now auditing"}<span className="car" />
        </div>
        <div className="av-agent__scene">{scene.name}</div>
        <div className="av-agent__meta">{scene.meta}</div>
      </div>

      <div className="av-agent__foot">
        <div className="av-agent__count">
          <span>scenes certified</span>
          <span><b>{certified}</b> / {total}</span>
        </div>
        <div className="av-agent__dots" aria-hidden="true">
          {SCENES.map((s, i) => (
            <i
              key={s.id}
              data-on={String(done || i < active)}
              data-active={String(!done && i === active)}
              title={s.name}
              style={{ cursor: "pointer" }}
              onClick={() => go(s.id)}
            />
          ))}
        </div>
        <div className="av-agent__track" aria-hidden="true">
          <i style={{ width: (progress * 100).toFixed(1) + "%" }} />
        </div>
      </div>
    </aside>
  );
}
window.AgentThread = AgentThread;
