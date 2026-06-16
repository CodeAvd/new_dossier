/* Header — fixed, blurs on scroll. logo + primary nav + theme toggle + cta.
   ARB-30: the nav is now SEMANTIC — a real <nav aria-label="primary"> of
   <a href="#section"> links (native link semantics + open-in-new-tab), NOT the
   DS PillNav's role=tablist/tab (which announced "tab" + promised an arrow-key
   model it lacked). The springy sliding indicator survives purely as a visual,
   aria-hidden pill.
   ARB-29: an IntersectionObserver scroll-spy drives the active section, so the
   indicator + aria-current track scroll position (the primary interaction)
   instead of the last click; nothing is "current" at the very top.
   ARB-97: nav data is render-order + reaches every content section; the logo
   is a real <a href="#top">, not a <div onClick>. */
function Header() {
  const { Button, ThemeToggle } = window.AvdeevDesignSystem_a8f605;
  const D = window.AV_DATA;
  const items = D.nav.map((it) => (typeof it === "string" ? { id: it, label: it } : it));

  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState(null); // null = nothing current (hero top)
  const navRef = React.useRef(null);
  const pillRef = React.useRef(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ARB-29 scroll-spy: track which section sits in the viewport's center band.
  // We keep the FULL intersecting set so scrolling back to the hero (no section
  // centered) yields active=null — the indicator hides instead of lying.
  React.useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const ids = items.map((it) => it.id);
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;
    const inBand = new Set();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) inBand.add(e.target.id);
          else inBand.delete(e.target.id);
        });
        const ordered = ids.filter((id) => inBand.has(id));
        setActive(ordered.length ? ordered[0] : null);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // slide the purely-visual pill under the active link (hidden when none is current)
  React.useLayoutEffect(() => {
    const nav = navRef.current, pill = pillRef.current;
    if (!nav || !pill) return;
    const el = active ? nav.querySelector(`[data-id="${CSS.escape(String(active))}"]`) : null;
    if (el) {
      pill.style.transform = `translateX(${el.offsetLeft}px)`;
      pill.style.width = el.offsetWidth + "px";
      pill.style.opacity = "1";
    } else {
      pill.style.opacity = "0";
    }
  }, [active]);

  // ARB-30: real anchors — honor cmd/ctrl/shift/middle-click (open in new tab);
  // only a plain left-click is intercepted for the header-offset smooth-scroll.
  const go = (id, e) => {
    if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1)) return;
    if (e) e.preventDefault();
    const el = document.getElementById(id);
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <React.Fragment>
    <header className="av-header" data-scrolled={String(scrolled)}>
      <a className="av-logo" href="#top" aria-label="avdeev — back to top" onClick={(e) => go("top", e)}>
        <img src="../../assets/monogram.svg" alt="" />
        <span>{D.wordmark}<span className="dot">.</span></span>
      </a>
      <nav className="av-header__nav" aria-label="primary">
        <div className="av-nav av-header__links" ref={navRef}>
          <span className="av-nav__pill" ref={pillRef} aria-hidden="true" />
          {items.map((it) => (
            <a
              key={it.id}
              href={"#" + it.id}
              data-id={it.id}
              className="av-nav__link"
              aria-current={active === it.id ? "page" : undefined}
              onClick={(e) => go(it.id, e)}
            >
              {it.label}
            </a>
          ))}
        </div>
        <ThemeToggle />
        <Button variant="primary" size="sm" onClick={(e) => go("contact", e)}>let's talk</Button>
      </nav>
    </header>

    {/* ARB-29: <880px the primary nav is display:none (and out of the a11y tree),
        so this is a REAL replacement nav — a compact bottom progress rail of the
        same section links, tracking the same scroll-spy active section. Each link
        carries an aria-label so it stays named even when the visible label is
        hidden on the narrowest phones (dots-only). */}
    <nav className="av-progress" aria-label="sections">
      {items.map((it) => (
        <a
          key={it.id}
          href={"#" + it.id}
          className="av-progress__item"
          aria-label={it.label}
          aria-current={active === it.id ? "page" : undefined}
          onClick={(e) => go(it.id, e)}
        >
          <span className="av-progress__dot" aria-hidden="true" />
          <span className="av-progress__label" aria-hidden="true">{it.label}</span>
        </a>
      ))}
    </nav>
    </React.Fragment>
  );
}
window.Header = Header;
