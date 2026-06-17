/* shared hooks + helpers for the portfolio kit. attaches to window. */

// scroll-reveal: adds .is-in when element enters viewport
function useReveal(options = {}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reveal = () => node.classList.add("is-in");

    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return;
    }
    // already in (or above) the viewport on mount → reveal immediately
    const r = node.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.92) { reveal(); return; }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { reveal(); io.unobserve(node); }
        });
      },
      { threshold: 0, rootMargin: options.rootMargin ?? "0px 0px -10% 0px" }
    );
    io.observe(node);
    // safety net: never let content stay hidden
    const t = setTimeout(reveal, 2500);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);
  return ref;
}

// R3F visibility ownership: mount near viewport, reclaim the WebGL context when
// the section stays far offscreen, and remount on re-entry.
function useR3FVisibilityMount(mountRef, options) {
  React.useEffect(() => {
    const node = mountRef.current;
    if (!node) return;

    const readyEvent = options.readyEvent;
    const mount = options.mount;
    const rootMargin = options.rootMargin || "300px 0px";
    const reclaimDelay = options.reclaimDelay || 700;
    let cancelled = false;
    let mounted = false;
    let mountCleanup = null;
    let waitCleanup = null;
    let reclaimTimer = null;

    const clearWait = () => {
      if (waitCleanup) waitCleanup();
      waitCleanup = null;
    };
    const clearReclaim = () => {
      if (reclaimTimer) clearTimeout(reclaimTimer);
      reclaimTimer = null;
    };
    const tryMount = () => {
      if (cancelled || mounted) return true;
      const cleanup = mount(node);
      if (!cleanup) return false;
      mountCleanup = cleanup;
      mounted = true;
      return true;
    };
    const armReadyMount = () => {
      clearReclaim();
      if (tryMount()) { clearWait(); return; }
      clearWait();
      const onReady = () => { if (tryMount()) clearWait(); };
      window.addEventListener(readyEvent, onReady, { once: true });
      const poll = setInterval(() => { if (tryMount()) clearWait(); }, 120);
      const stopPoll = setTimeout(clearWait, 8000);
      waitCleanup = () => {
        clearInterval(poll);
        clearTimeout(stopPoll);
        window.removeEventListener(readyEvent, onReady);
      };
    };
    const reclaim = () => {
      clearWait();
      clearReclaim();
      if (mountCleanup) mountCleanup();
      mountCleanup = null;
      mounted = false;
    };
    const scheduleReclaim = () => {
      clearWait();
      if (!mounted || reclaimTimer) return;
      reclaimTimer = setTimeout(reclaim, reclaimDelay);
    };

    if (typeof IntersectionObserver === "undefined") {
      armReadyMount();
      return () => {
        cancelled = true;
        reclaim();
      };
    }

    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) armReadyMount();
      else scheduleReclaim();
    }, { rootMargin, threshold: 0 });
    io.observe(node);

    return () => {
      cancelled = true;
      io.disconnect();
      reclaim();
    };
  }, []);
}

// section heading with eyebrow + serif title (italic accent supported via <em>)
function SectionHead({ index, eyebrow, title, children }) {
  const ref = useReveal();
  return (
    <div className="av-sec-head reveal" ref={ref}>
      <div className="av-sec-eyebrow">
        <span className="av-sec-num">{index}</span>
        <span>{eyebrow}</span>
      </div>
      <h2 className="av-sec-title" dangerouslySetInnerHTML={{ __html: title }} />
      {children ? <p className="av-sec-lead">{children}</p> : null}
    </div>
  );
}

// the agent's sigil — an isometric cube wireframe (simple geometry only).
// the cube-bot, reduced to a mark, so it can echo anywhere on the site.
function AgentMark({ size = 18, stroke = 1.6, className = "" }) {
  return (
    <svg
      className={"av-mark " + className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <polygon points="12,2.4 20.7,7.2 20.7,16.8 12,21.6 3.3,16.8 3.3,7.2" />
      <line x1="12" y1="12" x2="12" y2="2.4" />
      <line x1="12" y1="12" x2="20.7" y2="16.8" />
      <line x1="12" y1="12" x2="3.3" y2="16.8" />
    </svg>
  );
}

// honesty-as-signature: a blank metric reframed as the agent's deliberate
// "under audit" state. The dash stays; the framing makes it read as
// evidentiary restraint, not missing data.
function UnderAuditStat({ label, dark = false }) {
  return (
    <div className={"av-ua" + (dark ? " av-ua--dark" : "")}>
      <div className="av-ua__top">
        <span className="av-ua__dash">—</span>
        <span className="av-ua__scan" aria-hidden="true" />
      </div>
      {label ? <div className="av-ua__label">{label}</div> : null}
      <div className="av-ua__tag">under audit · evidence pending</div>
    </div>
  );
}

window.useReveal = useReveal;
window.useR3FVisibilityMount = useR3FVisibilityMount;
window.SectionHead = SectionHead;
window.AgentMark = AgentMark;
window.UnderAuditStat = UnderAuditStat;
