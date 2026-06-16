/* Header — fixed, blurs on scroll. logo + pill nav + theme toggle + cta */
function Header() {
  const { Button, PillNav, ThemeToggle } = window.AvdeevDesignSystem_a8f605;
  const D = window.AV_DATA;
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    const el = document.getElementById(id);
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <header className="av-header" data-scrolled={String(scrolled)}>
      <div className="av-logo" onClick={() => window.scrollTo({ top: 0, behavior: (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) ? "auto" : "smooth" })}>
        <img src="../../assets/monogram.svg" alt="" />
        <span>{D.wordmark}<span className="dot">.</span></span>
      </div>
      <nav className="av-header__nav">
        <div className="av-header__links">
          <PillNav items={D.nav} onChange={go} />
        </div>
        <ThemeToggle />
        <Button variant="primary" size="sm" onClick={() => go("contact")}>let's talk</Button>
      </nav>
    </header>
  );
}
window.Header = Header;
