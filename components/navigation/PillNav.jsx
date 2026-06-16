import React from "react";

const STYLE_ID = "av-pillnav-styles";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .av-pillnav {
    position: relative; display: inline-flex; align-items: center; gap: 2px;
    padding: 4px; border-radius: var(--radius-pill);
    background: var(--surface-card);
    border: 1px solid var(--border-soft);
    box-shadow: var(--shadow-xs);
  }
  .av-pillnav__item {
    position: relative; z-index: 1;
    font-family: var(--font-sans); font-size: var(--fs-sm); font-weight: var(--fw-medium);
    color: var(--text-muted);
    padding: 0.5em 1em; border: 0; background: transparent; cursor: pointer;
    border-radius: var(--radius-pill); white-space: nowrap;
    transition: color var(--dur-base) var(--ease-out);
  }
  .av-pillnav__item:hover { color: var(--text-strong); }
  .av-pillnav__item[data-active="true"] { color: var(--text-on-accent); }
  .av-pillnav__pill {
    position: absolute; z-index: 0; top: 4px; left: 0; height: calc(100% - 8px);
    background: var(--accent); border-radius: var(--radius-pill);
    box-shadow: var(--shadow-sm);
    transition: transform var(--dur-slow) var(--ease-spring), width var(--dur-slow) var(--ease-spring);
  }
  `;
  document.head.appendChild(el);
}

/**
 * Segmented pill nav with a springy sliding indicator.
 */
export function PillNav({ items = [], value, defaultValue, onChange, className = "", ...props }) {
  const isControlled = value !== undefined;
  const ids = items.map((it) => (typeof it === "string" ? it : it.id));
  const [internal, setInternal] = React.useState(defaultValue ?? ids[0]);
  const active = isControlled ? value : internal;

  const wrapRef = React.useRef(null);
  const [pill, setPill] = React.useState({ left: 4, width: 0 });

  React.useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const node = wrap.querySelector(`[data-id="${CSS.escape(String(active))}"]`);
    if (node) setPill({ left: node.offsetLeft, width: node.offsetWidth });
  }, [active, items]);

  const select = (id) => {
    if (!isControlled) setInternal(id);
    onChange && onChange(id);
  };

  return (
    <div ref={wrapRef} className={["av-pillnav", className].filter(Boolean).join(" ")} role="tablist" {...props}>
      <span className="av-pillnav__pill" style={{ transform: `translateX(${pill.left}px)`, width: pill.width }} />
      {items.map((it) => {
        const id = typeof it === "string" ? it : it.id;
        const label = typeof it === "string" ? it : it.label;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            data-id={id}
            data-active={String(active === id)}
            aria-selected={active === id}
            className="av-pillnav__item"
            onClick={() => select(id)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
