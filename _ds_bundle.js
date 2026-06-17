/* @ds-bundle: {"format":3,"namespace":"AvdeevDesignSystem_a8f605","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Stat","sourcePath":"components/core/Stat.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"ThemeToggle","sourcePath":"components/forms/ThemeToggle.jsx"},{"name":"Avatar","sourcePath":"components/navigation/Avatar.jsx"},{"name":"PillNav","sourcePath":"components/navigation/PillNav.jsx"}],"sourceHashes":{"components/core/Button.jsx":"0e8270778ecc","components/core/Card.jsx":"220f157c4110","components/core/Stat.jsx":"35fc16154215","components/core/Tag.jsx":"567764d91967","components/forms/Input.jsx":"dbeb19e4bc27","components/forms/ThemeToggle.jsx":"27e6ff8101a4","components/navigation/Avatar.jsx":"763305d2c0cb","components/navigation/PillNav.jsx":"8e283090576c","ui_kits/portfolio/About.jsx":"806d0c8231fc","ui_kits/portfolio/Contact.jsx":"124c88db9bb8","ui_kits/portfolio/Experience.jsx":"71c1aad8d9eb","ui_kits/portfolio/FunAgent.jsx":"7d3ed6a5ee73","ui_kits/portfolio/Header.jsx":"6bfcfc0fad2b","ui_kits/portfolio/HeroR3F.jsx":"3b7e07a5aa62","ui_kits/portfolio/Projects.jsx":"c38f6ce37bf5","ui_kits/portfolio/Stack.jsx":"3af68210a690","ui_kits/portfolio/Trading.jsx":"c054b98f9917","ui_kits/portfolio/TradingGL.jsx":"c8f8a62acfd0","ui_kits/portfolio/TradingR3F.jsx":"d67b6ce2a79f","ui_kits/portfolio/av-utils.jsx":"d6677484894a","ui_kits/portfolio/data.js":"e677215e834b","ui_kits/portfolio/design-canvas.jsx":"bd8746af6e58","ui_kits/portfolio/tweaks-panel.jsx":"6591467622ed","ui_kits/portfolio/webgl.js":"19f011bac604"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AvdeevDesignSystem_a8f605 = window.AvdeevDesignSystem_a8f605 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* inject component styles once at module load */
const STYLE_ID = "av-button-styles";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .av-btn {
    --_bg: var(--accent);
    --_fg: var(--text-on-accent);
    font-family: var(--font-sans);
    font-weight: var(--fw-semibold);
    letter-spacing: -0.005em;
    display: inline-flex; align-items: center; justify-content: center;
    gap: 0.5em;
    border: 1px solid transparent;
    border-radius: var(--radius-pill);
    cursor: pointer;
    white-space: nowrap;
    text-decoration: none;
    background: var(--_bg);
    color: var(--_fg);
    transition: transform var(--dur-base) var(--ease-spring),
                background var(--dur-fast) var(--ease-out),
                box-shadow var(--dur-base) var(--ease-out),
                border-color var(--dur-fast) var(--ease-out);
  }
  .av-btn:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px; }
  .av-btn:active { transform: translateY(0) scale(0.97); }
  .av-btn[disabled] { opacity: 0.5; pointer-events: none; }

  /* sizes */
  .av-btn--sm { height: 34px; padding: 0 14px; font-size: var(--fs-sm); }
  .av-btn--md { height: 42px; padding: 0 20px; font-size: var(--fs-base); }
  .av-btn--lg { height: 52px; padding: 0 28px; font-size: var(--fs-md); }

  /* variants */
  .av-btn--primary { background: var(--accent); color: var(--text-on-accent); box-shadow: var(--shadow-sm); }
  .av-btn--primary:hover { background: var(--accent-hover); transform: translateY(-2px); box-shadow: var(--shadow-accent); }

  .av-btn--secondary { background: var(--surface-card); color: var(--text-strong); border-color: var(--border-line); box-shadow: var(--shadow-xs); }
  .av-btn--secondary:hover { background: var(--surface-card-2); transform: translateY(-2px); box-shadow: var(--shadow-sm); }

  .av-btn--ghost { background: transparent; color: var(--text-body); }
  .av-btn--ghost:hover { background: var(--accent-soft); color: var(--accent-press); }

  .av-btn--outline { background: transparent; color: var(--text-strong); border-color: var(--border-strong); }
  .av-btn--outline:hover { border-color: var(--accent); color: var(--accent-press); background: var(--accent-tint); }

  .av-btn__icon { display: inline-flex; flex: none; }
  `;
  document.head.appendChild(el);
}

/**
 * avdeev primary action button. Soft pill, warm terracotta, springy lift on hover.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  as = "button",
  className = "",
  ...props
}) {
  const Tag = as;
  const cls = ["av-btn", `av-btn--${variant}`, `av-btn--${size}`, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, props), iconLeft ? /*#__PURE__*/React.createElement("span", {
    className: "av-btn__icon"
  }, iconLeft) : null, children, iconRight ? /*#__PURE__*/React.createElement("span", {
    className: "av-btn__icon"
  }, iconRight) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "av-card-styles";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .av-card {
    position: relative;
    background: var(--surface-card);
    border: 1px solid var(--border-soft);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    transition: transform var(--dur-base) var(--ease-spring),
                box-shadow var(--dur-base) var(--ease-out),
                border-color var(--dur-base) var(--ease-out);
  }
  .av-card--flat   { box-shadow: none; }
  .av-card--raised { box-shadow: var(--shadow-lg); }
  .av-card--sunken { background: var(--bg-subtle); box-shadow: var(--shadow-inset); border-color: var(--border-soft); }
  .av-card--dashed { box-shadow: none; background: var(--sand-100); border: 2px dashed var(--border-strong); }
  .av-card--holo   { background: var(--holo-surface); border-color: color-mix(in srgb, var(--spark) 24%, transparent); box-shadow: var(--shadow-lg); color: var(--holo-text); }
  .av-card--pad-sm { padding: var(--space-4); }
  .av-card--pad-md { padding: var(--space-5); }
  .av-card--pad-lg { padding: var(--space-6); }
  .av-card--pad-none { padding: 0; }
  .av-card--interactive { cursor: pointer; }
  .av-card--interactive:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: var(--border-line); }
  .av-card--interactive:active { transform: translateY(-1px); }
  `;
  document.head.appendChild(el);
}

/**
 * Soft warm surface container. Generous rounding, warm-tinted shadow.
 */
function Card({
  children,
  elevation = "default",
  padding = "md",
  interactive = false,
  as = "div",
  className = "",
  ...props
}) {
  const Tag = as;
  const elevClass = elevation === "default" ? "" : `av-card--${elevation}`;
  const cls = ["av-card", elevClass, `av-card--pad-${padding}`, interactive ? "av-card--interactive" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, props), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Stat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "av-stat-styles";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .av-stat { display: flex; flex-direction: column; gap: 0.25rem; }
  .av-stat__value {
    font-family: var(--font-serif-display);
    font-weight: var(--fw-medium);
    line-height: 1;
    letter-spacing: -0.02em;
    color: var(--text-strong);
    display: flex; align-items: baseline; gap: 0.12em;
  }
  .av-stat--sm .av-stat__value { font-size: 2rem; }
  .av-stat--md .av-stat__value { font-size: 2.75rem; }
  .av-stat--lg .av-stat__value { font-size: 3.75rem; }
  .av-stat__unit { font-style: italic; font-weight: var(--fw-regular); color: var(--accent); font-size: 0.55em; }
  .av-stat__label {
    font-family: var(--font-mono);
    font-size: var(--fs-2xs);
    letter-spacing: var(--ls-label);
    text-transform: uppercase;
    color: var(--text-muted);
  }
  .av-stat__sub { font-family: var(--font-sans); font-size: var(--fs-sm); color: var(--text-faint); }
  `;
  document.head.appendChild(el);
}

/**
 * Evidence-first metric: big serif number, italic unit accent, mono label.
 */
function Stat({
  value,
  unit,
  label,
  sub,
  size = "md",
  className = "",
  ...props
}) {
  const cls = ["av-stat", `av-stat--${size}`, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, props), /*#__PURE__*/React.createElement("div", {
    className: "av-stat__value"
  }, /*#__PURE__*/React.createElement("span", null, value), unit ? /*#__PURE__*/React.createElement("span", {
    className: "av-stat__unit"
  }, unit) : null), label ? /*#__PURE__*/React.createElement("div", {
    className: "av-stat__label"
  }, label) : null, sub ? /*#__PURE__*/React.createElement("div", {
    className: "av-stat__sub"
  }, sub) : null);
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Stat.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "av-tag-styles";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .av-tag {
    display: inline-flex; align-items: center; gap: 0.4em;
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
    font-weight: var(--fw-medium);
    letter-spacing: 0.01em;
    padding: 0.28em 0.72em;
    border-radius: var(--radius-pill);
    border: 1px solid transparent;
    line-height: 1.3;
    white-space: nowrap;
  }
  .av-tag__dot { width: 0.5em; height: 0.5em; border-radius: 999px; background: currentColor; flex: none; opacity: 0.9; }

  .av-tag--accent  { background: var(--accent-soft); color: var(--accent-press); border-color: var(--border-soft); }
  .av-tag--neutral { background: var(--bg-sunken);   color: var(--text-muted);  border-color: var(--border-soft); }
  .av-tag--outline { background: transparent;        color: var(--text-body);   border-color: var(--border-line); }
  .av-tag--spark   { background: var(--spark-soft);  color: var(--spark-text);  border-color: color-mix(in srgb, var(--spark) 40%, transparent); }
  .av-tag--blush   { background: color-mix(in srgb, var(--blush) 32%, transparent); color: var(--blush-deep); }
  .av-tag--honey   { background: color-mix(in srgb, var(--honey) 34%, transparent); color: var(--honey-deep); }
  .av-tag--sage    { background: color-mix(in srgb, var(--sage) 34%, transparent);  color: var(--sage-deep); }
  .av-tag--sky     { background: color-mix(in srgb, var(--sky) 34%, transparent);   color: var(--sky-deep); }
  .av-tag--mauve   { background: color-mix(in srgb, var(--mauve) 34%, transparent); color: var(--mauve-deep); }

  .av-tag--success { background: var(--success-soft); color: var(--sage-deep); }
  .av-tag--warning { background: var(--warning-soft); color: var(--honey-deep); }
  .av-tag--danger  { background: var(--danger-soft);  color: var(--danger); }
  .av-tag--info    { background: var(--info-soft);    color: var(--sky-deep); }
  `;
  document.head.appendChild(el);
}

/**
 * Small mono chip — tech stack, evidence metrics, categories, statuses.
 */
function Tag({
  children,
  tone = "accent",
  dot = false,
  className = "",
  ...props
}) {
  const cls = ["av-tag", `av-tag--${tone}`, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, props), dot ? /*#__PURE__*/React.createElement("span", {
    className: "av-tag__dot"
  }) : null, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "av-input-styles";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .av-field { display: flex; flex-direction: column; gap: 0.45rem; font-family: var(--font-sans); }
  .av-field__label {
    font-family: var(--font-mono); font-size: var(--fs-2xs);
    letter-spacing: var(--ls-label); text-transform: uppercase; color: var(--text-muted);
  }
  .av-field__wrap {
    display: flex; align-items: center; gap: 0.6rem;
    background: var(--surface-card);
    border: 1.5px solid var(--border-line);
    border-radius: var(--radius-md);
    padding: 0 0.9rem; height: 46px;
    transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out);
  }
  .av-field__wrap:focus-within { border-color: var(--accent); box-shadow: 0 0 0 4px var(--accent-ring); }
  .av-field__icon { color: var(--text-faint); display: inline-flex; flex: none; }
  .av-field__input {
    flex: 1; border: 0; background: transparent; outline: none;
    font-family: var(--font-sans); font-size: var(--fs-base); color: var(--text-strong);
    min-width: 0;
  }
  .av-field__input::placeholder { color: var(--text-faint); }
  .av-field--textarea .av-field__wrap { height: auto; padding: 0.7rem 0.9rem; align-items: flex-start; }
  .av-field--textarea .av-field__input { resize: vertical; min-height: 90px; line-height: var(--lh-body); }
  .av-field__hint { font-size: var(--fs-sm); color: var(--text-faint); }
  .av-field--error .av-field__wrap { border-color: var(--danger); }
  .av-field--error .av-field__wrap:focus-within { box-shadow: 0 0 0 4px var(--danger-soft); }
  .av-field--error .av-field__hint { color: var(--danger); }
  `;
  document.head.appendChild(el);
}

/**
 * Warm text field — mono label, soft rounded well, accent focus glow.
 */
function Input({
  label,
  hint,
  error = false,
  iconLeft,
  multiline = false,
  id,
  className = "",
  ...props
}) {
  const fieldId = id || (label ? `f-${String(label).replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const cls = ["av-field", multiline ? "av-field--textarea" : "", error ? "av-field--error" : "", className].filter(Boolean).join(" ");
  const Control = multiline ? "textarea" : "input";
  return /*#__PURE__*/React.createElement("div", {
    className: cls
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "av-field__label",
    htmlFor: fieldId
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    className: "av-field__wrap"
  }, iconLeft && !multiline ? /*#__PURE__*/React.createElement("span", {
    className: "av-field__icon"
  }, iconLeft) : null, /*#__PURE__*/React.createElement(Control, _extends({
    id: fieldId,
    className: "av-field__input"
  }, props))), hint ? /*#__PURE__*/React.createElement("span", {
    className: "av-field__hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/ThemeToggle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "av-themetoggle-styles";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .av-theme {
    --_h: 34px;
    position: relative; display: inline-flex; align-items: center;
    width: 62px; height: var(--_h); padding: 3px;
    border-radius: var(--radius-pill);
    background: var(--bg-sunken);
    border: 1px solid var(--border-line);
    cursor: pointer;
    transition: background var(--dur-base) var(--ease-out);
    -webkit-tap-highlight-color: transparent;
  }
  .av-theme__knob {
    position: absolute; top: 3px; left: 3px;
    width: calc(var(--_h) - 8px); height: calc(var(--_h) - 8px);
    border-radius: 999px;
    background: var(--accent);
    box-shadow: var(--shadow-sm);
    display: grid; place-items: center;
    color: var(--text-on-accent);
    transition: transform var(--dur-slow) var(--ease-spring), background var(--dur-base) var(--ease-out);
  }
  .av-theme[data-on="true"] .av-theme__knob { transform: translateX(28px); }
  .av-theme__ico { position: absolute; display: inline-flex; transition: opacity var(--dur-base) var(--ease-out); }
  .av-theme__sun  { left: 9px;  color: var(--honey-deep); }
  .av-theme__moon { right: 9px; color: var(--text-faint); }
  .av-theme[data-on="true"] .av-theme__sun  { opacity: 0.35; }
  .av-theme[data-on="false"] .av-theme__moon { opacity: 0.35; }
  `;
  document.head.appendChild(el);
}
const Sun = () => /*#__PURE__*/React.createElement("svg", {
  width: "15",
  height: "15",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2.2",
  strokeLinecap: "round"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
}));
const Moon = () => /*#__PURE__*/React.createElement("svg", {
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "currentColor"
}, /*#__PURE__*/React.createElement("path", {
  d: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"
}));

/**
 * Playful sun/moon switch. Uncontrolled by default — toggles
 * [data-theme] on <html> and persists to localStorage.
 */
function ThemeToggle({
  checked,
  onChange,
  className = "",
  ...props
}) {
  const isControlled = checked !== undefined;
  const [on, setOn] = React.useState(() => {
    if (isControlled) return checked;
    if (typeof document === "undefined") return false;
    return document.documentElement.getAttribute("data-theme") === "dark";
  });
  React.useEffect(() => {
    if (isControlled) setOn(checked);
  }, [checked, isControlled]);
  const toggle = () => {
    const next = !on;
    if (!isControlled) {
      setOn(next);
      const t = next ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", t);
      try {
        localStorage.setItem("av-theme", t);
      } catch (e) {}
      window.dispatchEvent(new CustomEvent("theme-change", { detail: { theme: t } }));
    }
    onChange && onChange(next);
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: ["av-theme", className].filter(Boolean).join(" "),
    "data-on": String(on),
    role: "switch",
    "aria-checked": on,
    "aria-label": "toggle dark mode",
    onClick: toggle
  }, props), /*#__PURE__*/React.createElement("span", {
    className: "av-theme__ico av-theme__sun"
  }, /*#__PURE__*/React.createElement(Sun, null)), /*#__PURE__*/React.createElement("span", {
    className: "av-theme__ico av-theme__moon"
  }, /*#__PURE__*/React.createElement(Moon, null)), /*#__PURE__*/React.createElement("span", {
    className: "av-theme__knob"
  }, on ? /*#__PURE__*/React.createElement(Moon, null) : /*#__PURE__*/React.createElement(Sun, null)));
}
Object.assign(__ds_scope, { ThemeToggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/ThemeToggle.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "av-avatar-styles";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .av-avatar {
    position: relative; display: inline-grid; place-items: center;
    border-radius: 999px; flex: none;
    background: var(--accent-soft); color: var(--accent-press);
    font-family: var(--font-serif-display); font-style: italic; font-weight: 500;
    overflow: hidden; isolation: isolate;
  }
  .av-avatar--ring { box-shadow: 0 0 0 2px var(--bg-base), 0 0 0 4px var(--accent); }
  .av-avatar img { width: 100%; height: 100%; object-fit: cover; }
  .av-avatar--sm { width: 32px; height: 32px; font-size: 14px; }
  .av-avatar--md { width: 44px; height: 44px; font-size: 18px; }
  .av-avatar--lg { width: 64px; height: 64px; font-size: 26px; }
  .av-avatar--xl { width: 96px; height: 96px; font-size: 40px; }
  .av-avatar__status {
    position: absolute; right: 2px; bottom: 2px; width: 28%; height: 28%;
    min-width: 9px; min-height: 9px; border-radius: 999px;
    background: var(--success); box-shadow: 0 0 0 2px var(--surface-card);
  }
  `;
  document.head.appendChild(el);
}

/**
 * Round avatar — image or serif-italic initials, optional accent ring + status dot.
 */
function Avatar({
  src,
  alt = "",
  initials,
  size = "md",
  ring = false,
  status = false,
  className = "",
  ...props
}) {
  const cls = ["av-avatar", `av-avatar--${size}`, ring ? "av-avatar--ring" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, props), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt
  }) : /*#__PURE__*/React.createElement("span", null, initials), status ? /*#__PURE__*/React.createElement("span", {
    className: "av-avatar__status"
  }) : null);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/PillNav.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function PillNav({
  items = [],
  value,
  defaultValue,
  onChange,
  className = "",
  ...props
}) {
  const isControlled = value !== undefined;
  const ids = items.map(it => typeof it === "string" ? it : it.id);
  const [internal, setInternal] = React.useState(defaultValue ?? ids[0]);
  const active = isControlled ? value : internal;
  const wrapRef = React.useRef(null);
  const [pill, setPill] = React.useState({
    left: 4,
    width: 0
  });
  React.useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const node = wrap.querySelector(`[data-id="${CSS.escape(String(active))}"]`);
    if (node) setPill({
      left: node.offsetLeft,
      width: node.offsetWidth
    });
  }, [active, items]);
  const select = id => {
    if (!isControlled) setInternal(id);
    onChange && onChange(id);
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: wrapRef,
    className: ["av-pillnav", className].filter(Boolean).join(" "),
    role: "tablist"
  }, props), /*#__PURE__*/React.createElement("span", {
    className: "av-pillnav__pill",
    style: {
      transform: `translateX(${pill.left}px)`,
      width: pill.width
    }
  }), items.map(it => {
    const id = typeof it === "string" ? it : it.id;
    const label = typeof it === "string" ? it : it.label;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      type: "button",
      role: "tab",
      "data-id": id,
      "data-active": String(active === id),
      "aria-selected": active === id,
      className: "av-pillnav__item",
      onClick: () => select(id)
    }, label);
  }));
}
Object.assign(__ds_scope, { PillNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/PillNav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/About.jsx
try { (() => {
/* About — narrative + fact grid */
function About() {
  const D = window.AV_DATA;
  const ref = window.useReveal();
  return /*#__PURE__*/React.createElement("section", {
    className: "av-section",
    id: "about"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(window.SectionHead, {
    index: "01",
    eyebrow: "about",
    title: "i don't trust a system <em>until it proves itself.</em>"
  }), /*#__PURE__*/React.createElement("div", {
    className: "reveal av-about-grid",
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, D.about.body.map((p, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      fontSize: "var(--fs-lg)",
      lineHeight: 1.65,
      color: "var(--text-body)"
    }
  }, p))), /*#__PURE__*/React.createElement("div", {
    className: "av-card",
    style: {
      padding: 26,
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "18px 14px",
      alignSelf: "start"
    }
  }, D.about.facts.map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--text-faint)"
    }
  }, f.k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 15,
      fontWeight: 600,
      color: "var(--text-strong)"
    }
  }, f.v)))))));
}
window.About = About;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/About.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Contact.jsx
try { (() => {
/* Contact — dark warm card with links, + footer */
function Contact() {
  const {
    Button
  } = window.AvdeevDesignSystem_a8f605;
  const D = window.AV_DATA;
  const ref = window.useReveal();
  return /*#__PURE__*/React.createElement("section", {
    className: "av-section av-contact",
    id: "contact"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "av-contact__card reveal",
    ref: ref
  }, /*#__PURE__*/React.createElement("span", {
    className: "av-blob",
    style: {
      width: 340,
      height: 340,
      top: -120,
      right: -80,
      background: "radial-gradient(circle at 40% 40%, #e8a87c, #b1603b)",
      opacity: 0.5
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "av-blob",
    style: {
      width: 240,
      height: 240,
      bottom: -120,
      left: -60,
      background: "radial-gradient(circle at 40% 40%, var(--mauve), var(--blush-deep))",
      opacity: 0.3
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "av-contact__inner"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "av-contact__title"
  }, "let's build something that ", /*#__PURE__*/React.createElement("em", null, "proves itself.")), /*#__PURE__*/React.createElement("p", {
    className: "av-contact__blurb"
  }, D.contact.blurb), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 30
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    as: "a",
    href: "mailto:" + D.contact.email
  }, "email me"))), /*#__PURE__*/React.createElement("div", {
    className: "av-contact__links"
  }, D.contact.links.map(l => /*#__PURE__*/React.createElement("a", {
    className: "av-clink",
    key: l.label,
    href: l.href
  }, /*#__PURE__*/React.createElement("span", {
    className: "av-clink__l"
  }, l.label), /*#__PURE__*/React.createElement("span", {
    className: "av-clink__h"
  }, l.handle)))))), /*#__PURE__*/React.createElement("footer", {
    className: "av-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "av-footer__note"
  }, D.wordmark, " \u2014 built ", /*#__PURE__*/React.createElement("em", null, "file-first"), ", of course."), /*#__PURE__*/React.createElement("div", {
    className: "av-footer__note"
  }, "\xA9 2026 ", D.name))));
}
window.Contact = Contact;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Contact.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Experience.jsx
try { (() => {
/* Experience — hover-highlight timeline */
function Experience() {
  const {
    Tag
  } = window.AvdeevDesignSystem_a8f605;
  const D = window.AV_DATA;
  const ref = window.useReveal();
  return /*#__PURE__*/React.createElement("section", {
    className: "av-section",
    id: "experience"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(window.SectionHead, {
    index: "03",
    eyebrow: "experience",
    title: "qa brain, <em>builder</em> hands."
  }), /*#__PURE__*/React.createElement("div", {
    className: "av-timeline reveal",
    ref: ref
  }, D.experience.map((e, i) => /*#__PURE__*/React.createElement("div", {
    className: "av-tl",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "av-tl__period"
  }, e.period), /*#__PURE__*/React.createElement("div", {
    className: "av-tl__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "av-tl__role"
  }, /*#__PURE__*/React.createElement("h3", null, e.role), /*#__PURE__*/React.createElement("span", {
    className: "av-tl__org"
  }, e.org), e.current ? /*#__PURE__*/React.createElement(Tag, {
    tone: "sage",
    dot: true
  }, "now") : null), /*#__PURE__*/React.createElement("p", {
    className: "av-tl__note"
  }, e.note)))))));
}
window.Experience = Experience;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Experience.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/FunAgent.jsx
try { (() => {
/* FunAgent — the QA agent's ROOM (warm, cozy, character). A cream band
   whose stage is a React Three Fiber scene (_funagent-r3f.js /
   window.AVR3F_FUNAGENT), mounted with the SAME ready-poll pattern as
   HeroR3F. SLICE 2 of 2: the warm room + a soft cube-bot that autonomously
   works through a little inbox of case-cards — reading each one, stamping
   it "approved" with a springy bounce + warm confetti, and dropping it on a
   done pile. It still turns to follow the cursor, and a click lets the
   visitor approve the held case themselves. */
function FunAgent() {
  const ref = window.useReveal();
  const mountRef = React.useRef(null);
  React.useEffect(() => {
    const node = mountRef.current;
    if (!node) return;
    let cancelled = false;
    let mountCleanup = null;
    let teardown = null;
    const start = () => {
      if (cancelled || !window.AVR3F_FUNAGENT) return false;
      mountCleanup = window.AVR3F_FUNAGENT.mountFunAgent(node, {});
      return true;
    };
    // the ESM module may resolve after this Babel component mounts —
    // start now if ready, else wait for its ready signal (with a safety poll).
    const begin = () => {
      if (!start()) {
        const onReady = () => start();
        window.addEventListener("avr3f-funagent-ready", onReady, {
          once: true
        });
        const poll = setInterval(() => {
          if (start()) clearInterval(poll);
        }, 120);
        const stopPoll = setTimeout(() => clearInterval(poll), 8000);
        teardown = () => {
          clearInterval(poll);
          clearTimeout(stopPoll);
          window.removeEventListener("avr3f-funagent-ready", onReady);
          if (mountCleanup) mountCleanup();
        };
      } else {
        teardown = () => {
          if (mountCleanup) mountCleanup();
        };
      }
    };

    // PERF-3: below-fold GL — don't instantiate the context until near-viewport.
    let io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) {
        if (io) {
          io.disconnect();
          io = null;
        }
        begin();
      }
    }, {
      rootMargin: "200px"
    });
    io.observe(node);
    return () => {
      cancelled = true;
      if (io) io.disconnect();
      if (teardown) teardown();
    };
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    className: "av-funagent",
    id: "funagent"
  }, /*#__PURE__*/React.createElement("div", {
    className: "av-funagent__bg",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "av-blob",
    style: {
      width: 360,
      height: 360,
      top: -140,
      left: 30,
      background: "radial-gradient(circle at 40% 40%, var(--honey), transparent 70%)",
      opacity: 0.45
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "av-blob",
    style: {
      width: 300,
      height: 300,
      bottom: -120,
      right: -40,
      background: "radial-gradient(circle at 40% 40%, var(--blush), transparent 70%)",
      opacity: 0.4
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "container av-funagent__inner reveal",
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: "av-funagent__head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "av-sec-eyebrow",
    style: {
      color: "var(--terra-700)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--terra-600)"
    }
  }, "\xB7"), " autonomous qa assistant"), /*#__PURE__*/React.createElement("h2", {
    className: "av-funagent__title"
  }, "meet the agent ", /*#__PURE__*/React.createElement("em", null, "that runs qa"), " while you watch."), /*#__PURE__*/React.createElement("p", {
    className: "av-funagent__lead"
  }, "it works through its inbox on its own \u2014 reading each case, stamping it ", /*#__PURE__*/React.createElement("em", null, "approved"), ", dropping it on the done pile, then picking the next. move your cursor and it turns to watch you;", /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: 500,
      color: "var(--terra-700)"
    }
  }, " ", "click the room to approve a case yourself."))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "av-funagent__viz"
  }, /*#__PURE__*/React.createElement("div", {
    className: "av-funagent__canvas",
    ref: mountRef,
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    className: "av-funagent__label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), " qa assistant \xB7 auditing")))));
}
window.FunAgent = FunAgent;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/FunAgent.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Header.jsx
try { (() => {
/* Header — fixed, blurs on scroll. logo + pill nav + theme toggle + cta */
function Header() {
  const {
    Button,
    PillNav,
    ThemeToggle
  } = window.AvdeevDesignSystem_a8f605;
  const D = window.AV_DATA;
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const go = id => {
    const el = document.getElementById(id);
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (el) window.scrollTo({
      top: el.offsetTop - 80,
      behavior: reduce ? "auto" : "smooth"
    });
  };
  return /*#__PURE__*/React.createElement("header", {
    className: "av-header",
    "data-scrolled": String(scrolled)
  }, /*#__PURE__*/React.createElement("div", {
    className: "av-logo",
    onClick: () => window.scrollTo({
      top: 0,
      behavior: window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    })
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/monogram.svg",
    alt: ""
  }), /*#__PURE__*/React.createElement("span", null, D.wordmark, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }, "."))), /*#__PURE__*/React.createElement("nav", {
    className: "av-header__nav"
  }, /*#__PURE__*/React.createElement("div", {
    className: "av-header__links"
  }, /*#__PURE__*/React.createElement(PillNav, {
    items: D.nav,
    onChange: go
  })), /*#__PURE__*/React.createElement(ThemeToggle, null), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    onClick: () => go("contact")
  }, "let's talk")));
}
window.Header = Header;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/HeroR3F.jsx
try { (() => {
/* HeroR3F — B · urbanist-heavy hero whose data-field is a React Three Fiber
   scene (hero-r3f.js / window.AVR3F). Same layout + copy as HeroGL; only the
   canvas is swapped for an R3F mount point. */
function HeroR3F() {
  const {
    Button,
    Tag,
    Stat
  } = window.AvdeevDesignSystem_a8f605;
  const D = window.AV_DATA;
  const mountRef = React.useRef(null);
  React.useEffect(() => {
    const node = mountRef.current;
    if (!node) return;
    let cleanup = null;
    let cancelled = false;
    const start = () => {
      if (cancelled || !window.AVR3F) return false;
      cleanup = window.AVR3F.mountHero(node, {});
      return true;
    };
    // the ESM module may resolve after this Babel component mounts —
    // mount now if ready, else wait for its ready signal (with a safety poll).
    if (!start()) {
      const onReady = () => start();
      window.addEventListener("avr3f-ready", onReady, {
        once: true
      });
      const poll = setInterval(() => {
        if (start()) clearInterval(poll);
      }, 120);
      const stopPoll = setTimeout(() => clearInterval(poll), 8000);
      return () => {
        cancelled = true;
        clearInterval(poll);
        clearTimeout(stopPoll);
        window.removeEventListener("avr3f-ready", onReady);
        if (cleanup) cleanup();
      };
    }
    return () => {
      cancelled = true;
      if (cleanup) cleanup();
    };
  }, []);
  const go = id => {
    const el = document.getElementById(id);
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (el) window.scrollTo({
      top: el.offsetTop - 80,
      behavior: reduce ? "auto" : "smooth"
    });
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "av-herogl",
    id: "top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "av-herogl__canvas",
    ref: mountRef,
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "container av-herogl__inner"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "av-herogl__eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pulse"
  }), " qa brain, builder hands"), /*#__PURE__*/React.createElement("h1", {
    className: "av-herogl__title"
  }, "find the ", /*#__PURE__*/React.createElement("span", {
    className: "sp"
  }, "edge"), ".", /*#__PURE__*/React.createElement("br", null), "ship the ", /*#__PURE__*/React.createElement("span", {
    className: "ac"
  }, "proof"), "."), /*#__PURE__*/React.createElement("p", {
    className: "av-herogl__sub"
  }, "// agents that cite their evidence + trading tools that find the edge. file-first, local-first, reproducible \u2014 every claim ships with its backtest."), /*#__PURE__*/React.createElement("div", {
    className: "av-herogl__chips"
  }, /*#__PURE__*/React.createElement(Tag, {
    tone: "accent"
  }, "python"), /*#__PURE__*/React.createElement(Tag, {
    tone: "spark"
  }, "rust"), /*#__PURE__*/React.createElement(Tag, {
    tone: "neutral"
  }, "pytorch"), /*#__PURE__*/React.createElement(Tag, {
    tone: "outline"
  }, "sharpe \xB7 tbd")), /*#__PURE__*/React.createElement("div", {
    className: "av-herogl__cta"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: () => go("work")
  }, "see the work"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    onClick: () => go("trading")
  }, "the trading book")))), /*#__PURE__*/React.createElement("div", {
    className: "av-herogl__readout",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "polyKalshi \xB7 schematic"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, "sharpe ", /*#__PURE__*/React.createElement("b", null, "\u2014"), " \xB7 hit ", /*#__PURE__*/React.createElement("b", null, "\u2014")), /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "citation recall"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, /*#__PURE__*/React.createElement("b", null, "\u2014"), " \xB7 uncited claims ", /*#__PURE__*/React.createElement("b", null, "tbd"))), /*#__PURE__*/React.createElement("div", {
    className: "container av-herogl__stats"
  }, D.stats.map((s, i) => /*#__PURE__*/React.createElement(Stat, {
    key: i,
    value: s.value,
    unit: s.unit,
    label: s.label,
    size: "sm"
  }))));
}
window.HeroR3F = HeroR3F;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/HeroR3F.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Projects.jsx
try { (() => {
/* Projects — case-study cards with tone glow, stat, tags, hover arrow */
function Projects() {
  const {
    Tag
  } = window.AvdeevDesignSystem_a8f605;
  const D = window.AV_DATA;
  const ref = window.useReveal();
  const glow = {
    accent: "var(--terra-300)",
    sage: "var(--sage)",
    honey: "var(--honey)",
    mauve: "var(--mauve)",
    blush: "var(--blush)",
    sky: "var(--sky)"
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "av-section av-section--subtle",
    id: "work"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(window.SectionHead, {
    index: "02",
    eyebrow: "selected work",
    title: "things that <em>back</em> their own verdicts."
  }, "four shipped tools. each one cites its evidence or shows its backtest."), /*#__PURE__*/React.createElement("div", {
    className: "av-projects reveal",
    ref: ref
  }, D.projects.map(p => /*#__PURE__*/React.createElement("article", {
    className: "av-proj" + (p.holo ? " av-proj--holo" : ""),
    key: p.id
  }, /*#__PURE__*/React.createElement("span", {
    className: "av-proj__glow",
    style: {
      background: glow[p.tone] || glow.accent
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "av-proj__top"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "av-proj__kind"
  }, p.kind), /*#__PURE__*/React.createElement("h3", {
    className: "av-proj__title"
  }, p.title))), /*#__PURE__*/React.createElement("p", {
    className: "av-proj__blurb"
  }, p.blurb), /*#__PURE__*/React.createElement("div", {
    className: "av-proj__foot"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "av-proj__stat"
  }, p.stat.value, /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: "italic",
      fontWeight: 400,
      color: p.holo ? "var(--spark)" : "var(--accent)",
      fontSize: "0.6em"
    }
  }, p.stat.unit), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontFamily: "var(--font-mono)",
      fontSize: 10.5,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: p.holo ? "color-mix(in srgb, var(--holo-text) 70%, transparent)" : "var(--text-faint)",
      marginTop: 6
    }
  }, p.stat.label)), /*#__PURE__*/React.createElement("div", {
    className: "av-proj__tags"
  }, p.tags.map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t,
    tone: p.tone
  }, t)))), /*#__PURE__*/React.createElement("span", {
    className: "av-proj__arrow"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 17 17 7M9 7h8v8"
  })))))))));
}
window.Projects = Projects;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Projects.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Stack.jsx
try { (() => {
/* Stack — grouped chips + italic marquee */
function Stack() {
  const {
    Tag
  } = window.AvdeevDesignSystem_a8f605;
  const D = window.AV_DATA;
  const ref = window.useReveal();
  const cols = [{
    h: "languages",
    items: D.stack.languages,
    tone: "accent"
  }, {
    h: "ml / data",
    items: D.stack.ml,
    tone: "sage"
  }, {
    h: "infra",
    items: D.stack.infra,
    tone: "sky"
  }];
  const all = [...D.stack.languages, ...D.stack.ml, ...D.stack.infra];
  const loop = [...all, ...all];
  return /*#__PURE__*/React.createElement("section", {
    className: "av-section av-section--subtle",
    id: "stack"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(window.SectionHead, {
    index: "04",
    eyebrow: "stack",
    title: "the tools i <em>reach</em> for."
  }), /*#__PURE__*/React.createElement("div", {
    className: "av-stack reveal",
    ref: ref
  }, cols.map(c => /*#__PURE__*/React.createElement("div", {
    className: "av-stack__col",
    key: c.h
  }, /*#__PURE__*/React.createElement("h4", null, c.h), /*#__PURE__*/React.createElement("div", {
    className: "av-stack__list"
  }, c.items.map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t,
    tone: c.tone
  }, t))))))), /*#__PURE__*/React.createElement("div", {
    className: "av-marquee"
  }, /*#__PURE__*/React.createElement("div", {
    className: "av-marquee__track"
  }, loop.map((t, i) => /*#__PURE__*/React.createElement("span", {
    className: "av-marquee__item",
    key: i
  }, t)))));
}
window.Stack = Stack;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Stack.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Trading.jsx
try { (() => {
/* Trading — full-bleed holographic data band for the quant side */
function Trading() {
  const {
    Stat,
    Tag
  } = window.AvdeevDesignSystem_a8f605;
  const ref = window.useReveal();
  const signals = [{
    t: "btc · 4h",
    s: "long",
    v: "+2.4%",
    tone: "up"
  }, {
    t: "eth · 1h",
    s: "flat",
    v: "0.0%",
    tone: "flat"
  }, {
    t: "spy · 1d",
    s: "short",
    v: "-0.8%",
    tone: "down"
  }, {
    t: "sol · 4h",
    s: "long",
    v: "+5.1%",
    tone: "up"
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "av-trading",
    id: "trading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "av-trading__bg",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "av-blob",
    style: {
      width: 420,
      height: 420,
      top: -160,
      right: 60,
      background: "radial-gradient(circle at 40% 40%, var(--holo-500), transparent 70%)",
      opacity: 0.6
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "av-blob",
    style: {
      width: 300,
      height: 300,
      bottom: -120,
      left: -40,
      background: "radial-gradient(circle at 40% 40%, var(--spark), transparent 70%)",
      opacity: 0.18
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "container av-trading__inner reveal",
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: "av-trading__head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "av-sec-eyebrow",
    style: {
      color: "var(--spark)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--spark)"
    }
  }, "\xB7"), " the quant half"), /*#__PURE__*/React.createElement("h2", {
    className: "av-trading__title"
  }, "tools that ", /*#__PURE__*/React.createElement("em", null, "find"), " the edge \u2014 and prove it."), /*#__PURE__*/React.createElement("p", {
    className: "av-trading__lead"
  }, "every signal ships with its backtest. local-first, reproducible, on real ticks. the qa brain, pointed at markets."), /*#__PURE__*/React.createElement("div", {
    className: "av-trading__stats"
  }, /*#__PURE__*/React.createElement(Stat, {
    value: "+1.8",
    label: "sharpe \xB7 live",
    size: "sm"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "14",
    unit: "mo",
    label: "track record",
    size: "sm"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "62",
    unit: "%",
    label: "hit rate",
    size: "sm"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "av-trading__panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "av-trading__panel-top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "av-trading__chip"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), " polyKalshi \xB7 live book"), /*#__PURE__*/React.createElement("span", {
    className: "av-trading__since"
  }, "equity curve \xB7 14mo")), /*#__PURE__*/React.createElement("svg", {
    className: "av-trading__chart",
    viewBox: "0 0 520 160",
    preserveAspectRatio: "none",
    fill: "none"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "eqfill",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#34bfff",
    stopOpacity: "0.28"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#34bfff",
    stopOpacity: "0"
  }))), /*#__PURE__*/React.createElement("path", {
    d: "M0,138 L40,132 L80,134 L120,118 L160,122 L200,98 L240,104 L280,82 L320,86 L360,58 L400,64 L440,38 L480,30 L520,14 L520,160 L0,160 Z",
    fill: "url(#eqfill)"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "0,138 40,132 80,134 120,118 160,122 200,98 240,104 280,82 320,86 360,58 400,64 440,38 480,30 520,14",
    stroke: "#34bfff",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "0,150 40,149 80,151 120,147 160,149 200,144 240,147 280,141 320,144 360,136 400,140 440,132 480,134 520,128",
    stroke: "rgba(225,245,255,0.3)",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  })), /*#__PURE__*/React.createElement("div", {
    className: "av-trading__feed"
  }, signals.map((g, i) => /*#__PURE__*/React.createElement("div", {
    className: "av-sig",
    key: i,
    "data-tone": g.tone
  }, /*#__PURE__*/React.createElement("span", {
    className: "av-sig__t"
  }, g.t), /*#__PURE__*/React.createElement("span", {
    className: "av-sig__s"
  }, g.s), /*#__PURE__*/React.createElement("span", {
    className: "av-sig__v"
  }, g.v)))))));
}
window.Trading = Trading;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Trading.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/TradingGL.jsx
try { (() => {
/* TradingGL — dark quant band with a real three.js 3D equity surface.
   Front ridge of the terrain == the live equity curve from the book. */
function TradingGL() {
  const {
    Stat
  } = window.AvdeevDesignSystem_a8f605;
  const D = window.AV_DATA.trading;
  const ref = window.useReveal();
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    if (!canvasRef.current || !window.AVGL) return;
    const cleanup = window.AVGL.edgeTerrain(canvasRef.current, {
      equity: D.equity,
      signals: D.signals
    });
    return cleanup;
  }, []);
  const signals = D.feed;
  return /*#__PURE__*/React.createElement("section", {
    className: "av-trading",
    id: "trading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "av-trading__bg",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "av-blob",
    style: {
      width: 420,
      height: 420,
      top: -160,
      right: 60,
      background: "radial-gradient(circle at 40% 40%, var(--holo-500), transparent 70%)",
      opacity: 0.6
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "av-blob",
    style: {
      width: 300,
      height: 300,
      bottom: -120,
      left: -40,
      background: "radial-gradient(circle at 40% 40%, var(--spark), transparent 70%)",
      opacity: 0.18
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "container av-trading__inner reveal",
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: "av-trading__head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "av-sec-eyebrow",
    style: {
      color: "var(--spark)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--spark)"
    }
  }, "\xB7"), " the quant half"), /*#__PURE__*/React.createElement("h2", {
    className: "av-trading__title"
  }, "tools that ", /*#__PURE__*/React.createElement("em", null, "find"), " the edge \u2014 and prove it."), /*#__PURE__*/React.createElement("p", {
    className: "av-trading__lead"
  }, "the surface is the live book: its front ridge is the real equity curve, 14 months on real ticks. every signal ships with its backtest. local-first, reproducible. the qa brain, pointed at markets."), /*#__PURE__*/React.createElement("div", {
    className: "av-trading__stats"
  }, /*#__PURE__*/React.createElement(Stat, {
    value: "+1.8",
    label: "sharpe \xB7 live",
    size: "sm"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "14",
    unit: "mo",
    label: "track record",
    size: "sm"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "62",
    unit: "%",
    label: "hit rate",
    size: "sm"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "av-tradinggl__viz"
  }, /*#__PURE__*/React.createElement("canvas", {
    className: "av-tradinggl__canvas",
    ref: canvasRef,
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    className: "av-tradinggl__grid-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), " polyKalshi \xB7 equity surface"), /*#__PURE__*/React.createElement("span", {
    className: "av-tradinggl__axis"
  }, "depth = lookback \xB7 height = pnl")), /*#__PURE__*/React.createElement("div", {
    className: "av-tradinggl__feet"
  }, signals.map((g, i) => /*#__PURE__*/React.createElement("div", {
    className: "av-sig",
    key: i,
    "data-tone": g.tone
  }, /*#__PURE__*/React.createElement("span", {
    className: "av-sig__t"
  }, g.t), /*#__PURE__*/React.createElement("span", {
    className: "av-sig__s"
  }, g.s), /*#__PURE__*/React.createElement("span", {
    className: "av-sig__v"
  }, g.v)))))));
}
window.TradingGL = TradingGL;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/TradingGL.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/TradingR3F.jsx
try { (() => {
/* TradingR3F — dark quant band whose 3D equity surface is a React Three
   Fiber scene (_trading-r3f.js / window.AVR3F_TRADING). Same layout + copy
   as TradingGL; only the <canvas> is swapped for an R3F mount <div>, and
   the scene runs on the SAME three@0.160 as the R3F hero (no r128). */
function TradingR3F() {
  const {
    Stat
  } = window.AvdeevDesignSystem_a8f605;
  const D = window.AV_DATA.trading;
  const ref = window.useReveal();
  const mountRef = React.useRef(null);
  React.useEffect(() => {
    const node = mountRef.current;
    if (!node) return;
    let cancelled = false;
    let mountCleanup = null;
    let teardown = null;
    const start = () => {
      if (cancelled || !window.AVR3F_TRADING) return false;
      mountCleanup = window.AVR3F_TRADING.mountTrading(node, {
        equity: D.equity,
        signals: D.signals
      });
      return true;
    };
    // the ESM module may resolve after this Babel component mounts —
    // start now if ready, else wait for its ready signal (with a safety poll).
    const begin = () => {
      if (!start()) {
        const onReady = () => start();
        window.addEventListener("avr3f-trading-ready", onReady, {
          once: true
        });
        const poll = setInterval(() => {
          if (start()) clearInterval(poll);
        }, 120);
        const stopPoll = setTimeout(() => clearInterval(poll), 8000);
        teardown = () => {
          clearInterval(poll);
          clearTimeout(stopPoll);
          window.removeEventListener("avr3f-trading-ready", onReady);
          if (mountCleanup) mountCleanup();
        };
      } else {
        teardown = () => {
          if (mountCleanup) mountCleanup();
        };
      }
    };

    // PERF-3: below-fold GL — don't instantiate the context until near-viewport.
    let io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) {
        if (io) {
          io.disconnect();
          io = null;
        }
        begin();
      }
    }, {
      rootMargin: "200px"
    });
    io.observe(node);
    return () => {
      cancelled = true;
      if (io) io.disconnect();
      if (teardown) teardown();
    };
  }, []);
  const signals = D.feed;
  return /*#__PURE__*/React.createElement("section", {
    className: "av-trading",
    id: "trading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "av-trading__bg",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "av-blob",
    style: {
      width: 420,
      height: 420,
      top: -160,
      right: 60,
      background: "radial-gradient(circle at 40% 40%, var(--holo-500), transparent 70%)",
      opacity: 0.6
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "av-blob",
    style: {
      width: 300,
      height: 300,
      bottom: -120,
      left: -40,
      background: "radial-gradient(circle at 40% 40%, var(--spark), transparent 70%)",
      opacity: 0.18
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "container av-trading__inner reveal",
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: "av-trading__head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "av-sec-eyebrow",
    style: {
      color: "var(--spark)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--spark)"
    }
  }, "\xB7"), " the quant half"), /*#__PURE__*/React.createElement("h2", {
    className: "av-trading__title"
  }, "tools that ", /*#__PURE__*/React.createElement("em", null, "find"), " the edge \u2014 and prove it."), /*#__PURE__*/React.createElement("p", {
    className: "av-trading__lead"
  }, "the surface is a schematic equity field \u2014 a representative shape, not live p&l. the idea behind the book: every signal ships with its backtest. local-first, reproducible. the qa brain, pointed at markets."), /*#__PURE__*/React.createElement("div", {
    className: "av-trading__stats"
  }, /*#__PURE__*/React.createElement(Stat, {
    value: "\u2014",
    unit: "tbd",
    label: "sharpe",
    size: "sm"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "\u2014",
    unit: "tbd",
    label: "track record",
    size: "sm"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "\u2014",
    unit: "tbd",
    label: "hit rate",
    size: "sm"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "av-tradinggl__viz"
  }, /*#__PURE__*/React.createElement("div", {
    className: "av-tradinggl__canvas",
    ref: mountRef,
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    className: "av-tradinggl__grid-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), " polyKalshi \xB7 schematic surface"), /*#__PURE__*/React.createElement("span", {
    className: "av-tradinggl__axis"
  }, "depth = lookback \xB7 height = pnl (illustrative)")), /*#__PURE__*/React.createElement("div", {
    className: "av-tradinggl__feet"
  }, signals.map((g, i) => /*#__PURE__*/React.createElement("div", {
    className: "av-sig",
    key: i,
    "data-tone": g.tone
  }, /*#__PURE__*/React.createElement("span", {
    className: "av-sig__t"
  }, g.t), /*#__PURE__*/React.createElement("span", {
    className: "av-sig__s"
  }, g.s), /*#__PURE__*/React.createElement("span", {
    className: "av-sig__v"
  }, g.v)))))));
}
window.TradingR3F = TradingR3F;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/TradingR3F.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/av-utils.jsx
try { (() => {
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
    if (r.top < window.innerHeight * 0.92) {
      reveal();
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          reveal();
          io.unobserve(node);
        }
      });
    }, {
      threshold: 0,
      rootMargin: options.rootMargin ?? "0px 0px -10% 0px"
    });
    io.observe(node);
    // safety net: never let content stay hidden
    const t = setTimeout(reveal, 2500);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);
  return ref;
}

// section heading with eyebrow + serif title (italic accent supported via <em>)
function SectionHead({
  index,
  eyebrow,
  title,
  children
}) {
  const ref = useReveal();
  return /*#__PURE__*/React.createElement("div", {
    className: "av-sec-head reveal",
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: "av-sec-eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "av-sec-num"
  }, index), /*#__PURE__*/React.createElement("span", null, eyebrow)), /*#__PURE__*/React.createElement("h2", {
    className: "av-sec-title",
    dangerouslySetInnerHTML: {
      __html: title
    }
  }), children ? /*#__PURE__*/React.createElement("p", {
    className: "av-sec-lead"
  }, children) : null);
}
window.useReveal = useReveal;
window.SectionHead = SectionHead;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/av-utils.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/data.js
try { (() => {
/* portfolio content — brand voice: lowercase, terse, evidence-backed.
   NOTE: project + experience copy is representative placeholder content
   for the kit; swap with real history. */

window.AV_DATA = {
  name: "Grigorii Avdeev",
  wordmark: "avdeev",
  role: "ai & quant engineer",
  hero: {
    line: "i build agents that <em>cite</em> their evidence — and trading tools that <em>find</em> the edge.",
    sub: "file-first. evidence-backed. claims that prove themselves.",
    tag: "qa brain, builder hands."
  },
  nav: ["work", "trading", "about", "experience", "contact"],
  // TODO(metrics): schematic placeholders — NONE of these are measured yet.
  // Drop in real figures (and restore the units: %, ms, /d) once the evals
  // and the live book actually back them. Never ship invented numbers here.
  stats: [{
    value: "—",
    unit: "tbd",
    label: "citation recall"
  }, {
    value: "—",
    unit: "tbd",
    label: "sharpe · live"
  }, {
    value: "—",
    unit: "tbd",
    label: "docs qa'd"
  }, {
    value: "—",
    unit: "tbd",
    label: "p50 latency"
  }],
  /* trading — THE swap-in seam for the 3D edge terrain.
     Replace `equity` / `signals` with a real backtest export to drive the
     surface from live data. Values are schematic/representative, NOT real P&L.
       equity  : number[]  0..1 normalized heights = the front-ridge curve
       signals : {i,kind}  i = index into equity, kind = long|short|flat (node tint)
       feed    : the chips rendered under the viz (display only) */
  trading: {
    equity: [0.14, 0.17, 0.16, 0.26, 0.24, 0.39, 0.35, 0.49, 0.46, 0.64, 0.6, 0.76, 0.81, 0.91],
    signals: [{
      i: 1,
      kind: "flat"
    }, {
      i: 3,
      kind: "long"
    }, {
      i: 6,
      kind: "short"
    }, {
      i: 9,
      kind: "long"
    }, {
      i: 12,
      kind: "long"
    }],
    // TODO(metrics): sample feed — the long/short/flat directions are
    // illustrative only and the returns are placeholders (—), not real
    // trades. Wire to a real signal log before presenting any % here.
    feed: [{
      t: "btc · 4h",
      s: "long",
      v: "—",
      tone: "up"
    }, {
      t: "eth · 1h",
      s: "flat",
      v: "—",
      tone: "flat"
    }, {
      t: "spy · 1d",
      s: "short",
      v: "—",
      tone: "down"
    }, {
      t: "sol · 4h",
      s: "long",
      v: "—",
      tone: "up"
    }]
  },
  about: {
    body: ["i came up through qa, so i don't trust a system until it can prove itself. evidence over vibes — every agent i ship links its claims to a source span, and every verdict cites the line it stands on.", "now i build tools that back their own conclusions: fun-agent (an autonomous qa assistant), polyKalshi (cross-market arbitrage), jarvis (agent orchestration), and hr-breaker (an agentic data pipeline). file-first, local-first, reproducible by default."],
    facts: [{
      k: "based",
      v: "remote · gmt+1"
    }, {
      k: "focus",
      v: "agents · evals · quant"
    }, {
      k: "stack",
      v: "python · rust · ts"
    }, {
      k: "status",
      v: "open to the right thing"
    }]
  },
  projects: [{
    id: "fun-agent",
    title: "fun-agent",
    kind: "autonomous qa assistant",
    blurb: "an autonomous qa assistant: takes a case, gathers the context, runs the checks, and backs every verdict with a cited source. file-first, human-approved.",
    stat: {
      value: "—",
      unit: "tbd",
      label: "evidence-cited verdicts"
    },
    tags: ["typescript", "retrieval", "evals", "cli"],
    tone: "spark",
    holo: true
  }, {
    id: "polyKalshi",
    title: "polyKalshi",
    kind: "cross-market arbitrage",
    blurb: "scans matched markets across polymarket and kalshi for price dislocations, then shows the arb — its spread and the exact trade it would place.",
    stat: {
      value: "—",
      unit: "tbd",
      label: "markets watched"
    },
    tags: ["python", "polars", "arbitrage"],
    tone: "accent"
  }, {
    id: "jarvis",
    title: "jarvis",
    kind: "agent orchestration",
    blurb: "an orchestration layer that routes work across specialized agents — it plans, dispatches and verifies, with a human gate on anything irreversible.",
    stat: {
      value: "—",
      unit: "tbd",
      label: "agents coordinated"
    },
    tags: ["typescript", "agents", "orchestration"],
    tone: "honey"
  }, {
    id: "hr-breaker",
    title: "hr-breaker",
    kind: "agentic data pipeline",
    blurb: "an agentic pipeline that turns messy source data into structured, queryable records — every step auditable, nothing silently transformed.",
    stat: {
      value: "—",
      unit: "tbd",
      label: "records structured"
    },
    tags: ["python", "pipeline", "llm"],
    tone: "mauve"
  }],
  experience: [{
    period: "2024 — now",
    role: "ai engineer",
    org: "independent",
    note: "agents that cite their evidence. shipped fun-agent + jarvis.",
    current: true
  }, {
    period: "2022 — 24",
    role: "quant developer",
    org: "trading desk",
    note: "intraday signals + execution tooling. live trading book."
  },
  // TODO(metrics): dropped invented "+1.8 sharpe" figure
  {
    period: "2020 — 22",
    role: "qa engineer",
    org: "saas",
    note: "test infra, ci, eval pipelines. the qa brain, in writing."
  }, {
    period: "2019 — 20",
    role: "b.sc. computer science",
    org: "university",
    note: "numerical methods, market microstructure."
  }],
  stack: {
    languages: ["python", "rust", "typescript", "sql"],
    ml: ["pytorch", "langgraph", "transformers", "duckdb", "polars"],
    infra: ["postgres", "docker", "aws", "ci/cd", "react"]
  },
  contact: {
    blurb: "got a system that needs to prove itself? i ship tools that back their own verdicts.",
    email: "grigorii584@gmail.com",
    links: [{
      label: "github",
      handle: "CodeAvd",
      href: "https://github.com/CodeAvd"
    }, {
      label: "linkedin",
      handle: "in/grigoriiavdeev",
      href: "https://www.linkedin.com/in/grigoriiavdeev"
    }, {
      label: "email",
      handle: "grigorii584@gmail.com",
      href: "mailto:grigorii584@gmail.com"
    }]
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/data.js", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/design-canvas.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// DesignCanvas.jsx — Figma-ish design canvas wrapper
// Warm gray grid bg + Sections + Artboards + PostIt notes.
// Exports (to window): DesignCanvas, DCSection, DCArtboard, DCPostIt.
// Artboards are reorderable (grip-drag), deletable, labels/titles are
// inline-editable, and any artboard can be opened in a fullscreen focus
// overlay (←/→/Esc). State persists to a .design-canvas.state.json sidecar
// via the host bridge. No assets, no deps.
//
// Usage:
//   <DesignCanvas>
//     <DCSection id="onboarding" title="Onboarding" subtitle="First-run variants">
//       <DCArtboard id="a" label="A · Dusk" width={260} height={480}>…</DCArtboard>
//       <DCArtboard id="b" label="B · Minimal" width={260} height={480}>…</DCArtboard>
//     </DCSection>
//   </DesignCanvas>
//
// Artboards are static design frames, not scroll regions — never use
// height: 100% + overflow: auto/scroll on inner elements; size each artboard
// to fit its content (explicit pixel height, or let it grow).
/* END USAGE */

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  postitBg: '#fef4a8',
  postitText: '#5a4a2a',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
};

// One-time CSS injection (classes are dc-prefixed so they don't collide with
// the hosted design's own styles).
if (typeof document !== 'undefined' && !document.getElementById('dc-styles')) {
  const s = document.createElement('style');
  s.id = 'dc-styles';
  s.textContent = ['.dc-editable{cursor:text;outline:none;white-space:nowrap;border-radius:3px;padding:0 2px;margin:0 -2px}', '.dc-editable:focus{background:#fff;box-shadow:0 0 0 1.5px #c96442}', '[data-dc-slot]{transition:transform .18s cubic-bezier(.2,.7,.3,1)}', '[data-dc-slot].dc-dragging{transition:none;z-index:10;pointer-events:none}', '[data-dc-slot].dc-dragging .dc-card{box-shadow:0 12px 40px rgba(0,0,0,.25),0 0 0 2px #c96442;transform:scale(1.02)}',
  // isolation:isolate contains artboard content's z-indexes so a
  // z-indexed child (sticky navbar etc.) can't paint over .dc-header or
  // the .dc-menu popover that drops into the top of the card.
  '.dc-card{isolation:isolate;transition:box-shadow .15s,transform .15s}', '.dc-card *{scrollbar-width:none}', '.dc-card *::-webkit-scrollbar{display:none}',
  // Per-artboard header: grip + label on the left, delete/expand on the
  // right. Single flex row; when the artboard's on-screen width is too
  // narrow for both the label yields (ellipsis, then hidden entirely below
  // ~4ch via the container query) and the buttons stay on the row.
  '.dc-header{position:absolute;bottom:100%;left:-4px;margin-bottom:calc(4px * var(--dc-inv-zoom,1));z-index:2;', '  display:flex;align-items:center;container-type:inline-size}', '.dc-labelrow{display:flex;align-items:center;gap:4px;height:24px;flex:1 1 auto;min-width:0}', '.dc-grip{flex:0 0 auto;cursor:grab;display:flex;align-items:center;padding:5px 4px;border-radius:4px;transition:background .12s,opacity .12s}', '.dc-grip:hover{background:rgba(0,0,0,.08)}', '.dc-grip:active{cursor:grabbing}', '.dc-labeltext{flex:1 1 auto;min-width:0;cursor:pointer;border-radius:4px;padding:3px 6px;', '  display:flex;align-items:center;transition:background .12s;overflow:hidden}',
  // Below ~4ch of label room: hide the label entirely, and drop the grip to
  // hover-only (same reveal rule as .dc-btns) so a narrow header is clean
  // until the card is moused.
  '@container (max-width: 110px){', '  .dc-labeltext{display:none}', '  .dc-grip{opacity:0}', '  [data-dc-slot]:hover .dc-grip{opacity:1}', '}', '.dc-labeltext:hover{background:rgba(0,0,0,.05)}', '.dc-labeltext .dc-editable{overflow:hidden;text-overflow:ellipsis;max-width:100%}', '.dc-labeltext .dc-editable:focus{overflow:visible;text-overflow:clip}', '.dc-btns{flex:0 0 auto;margin-left:auto;display:flex;gap:2px;opacity:0;transition:opacity .12s}', '[data-dc-slot]:hover .dc-btns,.dc-btns:has(.dc-menu){opacity:1}', '.dc-expand,.dc-kebab{width:22px;height:22px;border-radius:5px;border:none;cursor:pointer;padding:0;', '  background:transparent;color:rgba(60,50,40,.7);display:flex;align-items:center;justify-content:center;', '  font:inherit;transition:background .12s,color .12s}', '.dc-expand:hover,.dc-kebab:hover{background:rgba(0,0,0,.06);color:#2a251f}',
  // Slot hosting an open menu floats above later siblings (which otherwise
  // paint on top — same z-index:auto, later DOM order) so the popup isn't
  // clipped by the next card.
  '[data-dc-slot]:has(.dc-menu){z-index:10}', '.dc-menu{position:absolute;top:100%;right:0;margin-top:4px;background:#fff;border-radius:8px;', '  box-shadow:0 8px 28px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.05);padding:4px;min-width:160px;z-index:10}', '.dc-menu button{display:block;width:100%;padding:7px 10px;border:0;background:transparent;', '  border-radius:5px;font-family:inherit;font-size:13px;font-weight:500;line-height:1.2;', '  color:#29261b;cursor:pointer;text-align:left;transition:background .12s;white-space:nowrap}', '.dc-menu button:hover{background:rgba(0,0,0,.05)}', '.dc-menu hr{border:0;border-top:1px solid rgba(0,0,0,.08);margin:4px 2px}', '.dc-menu .dc-danger{color:#c96442}', '.dc-menu .dc-danger:hover{background:rgba(201,100,66,.1)}',
  // Chrome (titles / labels / buttons) counter-scales against the viewport
  // zoom so it stays a constant on-screen size. --dc-inv-zoom is set by
  // DCViewport on every transform update and inherits to all descendants —
  // any overlay inside the world (e.g. a TweaksPanel on an artboard) can use
  // it the same way.
  //
  // The header uses transform:scale (out-of-flow, so layout impact doesn't
  // matter) with its world-space width set to card-width / inv-zoom so that
  // after counter-scaling its on-screen width exactly matches the card's —
  // that's what lets the container query + text-overflow behave against the
  // card's visible edge at every zoom level.
  //
  // The section head uses CSS zoom instead of transform so its layout box
  // grows with the counter-scale, pushing the card row down — otherwise the
  // constant-screen-size title would overflow into the (shrinking) world-
  // space gap and overlap the artboard headers at low zoom.
  '.dc-header{width:calc((100% + 4px) / var(--dc-inv-zoom,1));', '  transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom left}', '.dc-sectionhead{zoom:var(--dc-inv-zoom,1)}'].join('\n');
  document.head.appendChild(s);
}
const DCCtx = React.createContext(null);

// Recursively unwrap React.Fragment so <>…</> grouping doesn't hide
// DCSection/DCArtboard children from the type-based walks below.
function dcFlatten(children) {
  const out = [];
  React.Children.forEach(children, c => {
    if (c && c.type === React.Fragment) out.push(...dcFlatten(c.props.children));else out.push(c);
  });
  return out;
}

// ─────────────────────────────────────────────────────────────
// DesignCanvas — stateful wrapper around the pan/zoom viewport.
// Owns runtime state (per-section order, renamed titles/labels, hidden
// artboards, focused artboard). Order/titles/labels/hidden persist to a
// .design-canvas.state.json
// sidecar next to the HTML. Reads go via plain fetch() so the saved
// arrangement is visible anywhere the HTML + sidecar are served together
// (omelette preview, direct link, downloaded zip). Writes go through the
// host's window.omelette bridge — editing requires the omelette runtime.
// Focus is ephemeral.
// ─────────────────────────────────────────────────────────────
const DC_STATE_FILE = '.design-canvas.state.json';
function DesignCanvas({
  children,
  minScale,
  maxScale,
  style
}) {
  const [state, setState] = React.useState({
    sections: {},
    focus: null
  });
  // Hold rendering until the sidecar read settles so the saved order/titles
  // appear on first paint (no source-order flash). didRead gates writes until
  // the read settles so the empty initial state can't clobber a slow read;
  // skipNextWrite suppresses the one echo-write that would otherwise follow
  // hydration.
  const [ready, setReady] = React.useState(false);
  const didRead = React.useRef(false);
  const skipNextWrite = React.useRef(false);
  React.useEffect(() => {
    let off = false;
    fetch('./' + DC_STATE_FILE).then(r => r.ok ? r.json() : null).then(saved => {
      if (off || !saved || !saved.sections) return;
      skipNextWrite.current = true;
      setState(s => ({
        ...s,
        sections: saved.sections
      }));
    }).catch(() => {}).finally(() => {
      didRead.current = true;
      if (!off) setReady(true);
    });
    const t = setTimeout(() => {
      if (!off) setReady(true);
    }, 150);
    return () => {
      off = true;
      clearTimeout(t);
    };
  }, []);
  React.useEffect(() => {
    if (!didRead.current) return;
    if (skipNextWrite.current) {
      skipNextWrite.current = false;
      return;
    }
    const t = setTimeout(() => {
      window.omelette?.writeFile(DC_STATE_FILE, JSON.stringify({
        sections: state.sections
      })).catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [state.sections]);

  // Build registries synchronously from children so FocusOverlay can read
  // them in the same render. Fragments are flattened; wrapping in other
  // elements still opts out of focus/reorder.
  const registry = {}; // slotId -> { sectionId, artboard }
  const sectionMeta = {}; // sectionId -> { title, subtitle, slotIds[] }
  const sectionOrder = [];
  dcFlatten(children).forEach(sec => {
    if (!sec || sec.type !== DCSection) return;
    const sid = sec.props.id ?? sec.props.title;
    if (!sid) return;
    sectionOrder.push(sid);
    const persisted = state.sections[sid] || {};
    const abs = [];
    dcFlatten(sec.props.children).forEach(ab => {
      if (!ab || ab.type !== DCArtboard) return;
      const aid = ab.props.id ?? ab.props.label;
      if (aid) abs.push([aid, ab]);
    });
    // hidden is scoped to one source revision — when the agent regenerates
    // (artboard-ID set changes), prior deletes don't apply to new content.
    const srcKey = abs.map(([k]) => k).join('\x1f');
    const hidden = persisted.srcKey === srcKey ? persisted.hidden || [] : [];
    const srcIds = [];
    abs.forEach(([aid, ab]) => {
      if (hidden.includes(aid)) return;
      registry[`${sid}/${aid}`] = {
        sectionId: sid,
        artboard: ab
      };
      srcIds.push(aid);
    });
    const kept = (persisted.order || []).filter(k => srcIds.includes(k));
    sectionMeta[sid] = {
      title: persisted.title ?? sec.props.title,
      subtitle: sec.props.subtitle,
      slotIds: [...kept, ...srcIds.filter(k => !kept.includes(k))]
    };
  });
  const api = React.useMemo(() => ({
    state,
    section: id => state.sections[id] || {},
    patchSection: (id, p) => setState(s => ({
      ...s,
      sections: {
        ...s.sections,
        [id]: {
          ...s.sections[id],
          ...(typeof p === 'function' ? p(s.sections[id] || {}) : p)
        }
      }
    })),
    setFocus: slotId => setState(s => ({
      ...s,
      focus: slotId
    }))
  }), [state]);

  // Esc exits focus; any outside pointerdown commits an in-progress rename.
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') api.setFocus(null);
    };
    const onPd = e => {
      const ae = document.activeElement;
      if (ae && ae.isContentEditable && !ae.contains(e.target)) ae.blur();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPd, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPd, true);
    };
  }, [api]);
  return /*#__PURE__*/React.createElement(DCCtx.Provider, {
    value: api
  }, /*#__PURE__*/React.createElement(DCViewport, {
    minScale: minScale,
    maxScale: maxScale,
    style: style
  }, ready && children), state.focus && registry[state.focus] && /*#__PURE__*/React.createElement(DCFocusOverlay, {
    entry: registry[state.focus],
    sectionMeta: sectionMeta,
    sectionOrder: sectionOrder
  }));
}

// ─────────────────────────────────────────────────────────────
// DCViewport — transform-based pan/zoom (internal)
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel ticks don't go through React —
// keeps pans at 60fps on dense canvases.
// ─────────────────────────────────────────────────────────────
function DCViewport({
  children,
  minScale = 0.1,
  maxScale = 8,
  style = {}
}) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({
    x: 0,
    y: 0,
    scale: 1
  });
  // Persist viewport across reloads so the user lands back where they were
  // after an agent edit or browser refresh. The sandbox origin is already
  // per-project; pathname keeps multiple canvas files in one project apart.
  const tfKey = 'dc-viewport:' + location.pathname;
  const saveT = React.useRef(0);
  const lastPostedScale = React.useRef();
  const apply = React.useCallback(() => {
    const {
      x,
      y,
      scale
    } = tf.current;
    const el = worldRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    // Exposed for zoom-invariant chrome (labels, buttons, TweaksPanel).
    el.style.setProperty('--dc-inv-zoom', String(1 / scale));
    // Keep the host toolbar's % readout in sync with the canvas scale. Pan
    // ticks leave scale unchanged — skip the cross-frame post for those.
    if (lastPostedScale.current !== scale) {
      lastPostedScale.current = scale;
      window.parent.postMessage({
        type: '__dc_zoom',
        scale
      }, '*');
    }
    clearTimeout(saveT.current);
    saveT.current = setTimeout(() => {
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    }, 200);
  }, [tfKey]);
  React.useLayoutEffect(() => {
    const flush = () => {
      clearTimeout(saveT.current);
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    };
    try {
      const s = JSON.parse(localStorage.getItem(tfKey) || 'null');
      if (s && Number.isFinite(s.x) && Number.isFinite(s.y) && Number.isFinite(s.scale)) {
        tf.current = {
          x: s.x,
          y: s.y,
          scale: Math.min(maxScale, Math.max(minScale, s.scale))
        };
        apply();
      }
    } catch {}
    // Flush on pagehide and unmount so a reload within the 200ms debounce
    // window doesn't drop the last pan/zoom.
    window.addEventListener('pagehide', flush);
    return () => {
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, []);
  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const zoomAt = (cx, cy, factor) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left,
        py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // --dc-inv-zoom consumers (.dc-sectionhead's CSS zoom, each section's
      // marginBottom) reflow on every scale change, vertically shifting the
      // world layout — so a world point mathematically pinned under the cursor
      // drifts as you zoom (content creeps up on zoom-in, down on zoom-out).
      // Anchor the DOM element under the cursor instead: record its screen Y,
      // apply the transform + --dc-inv-zoom, then cancel whatever vertical
      // drift the reflow introduced so it stays put on screen.
      let marker = null,
        markerY0 = 0;
      if (k !== 1) {
        const hit = document.elementFromPoint(cx, cy);
        marker = hit && hit.closest ? hit.closest('[data-dc-slot],[data-dc-section]') : null;
        if (marker) markerY0 = marker.getBoundingClientRect().top;
      }
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
      if (marker) {
        // A pure zoom around (cx, cy) maps screen Y → cy + (Y - cy) * k. Any
        // departure after the --dc-inv-zoom reflow is the layout drift.
        const drift = marker.getBoundingClientRect().top - (cy + (markerY0 - cy) * k);
        if (Math.abs(drift) > 0.1) {
          t.y -= drift;
          apply();
        }
      }
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari, typically multiples of 100/120). Trackpad
    // two-finger scroll sends small/fractional pixel deltas, often with
    // non-zero deltaX. ctrlKey is set by the browser for trackpad pinch.
    const isMouseWheel = e => e.deltaMode !== 0 || e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40;
    const onWheel = e => {
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if ((e.ctrlKey || e.metaKey) && !isMouseWheel(e)) {
        // trackpad pinch, or ctrl/cmd + smooth-scroll mouse. Notched
        // wheels fall through to the fixed-step branch below.
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        // notched mouse wheel — fixed-ratio step per click
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari sends native gesture* events for trackpad pinch with a smooth
    // e.scale; preferring these over the ctrl+wheel fallback gives a much
    // better feel there. No-ops on other browsers. Safari also fires
    // ctrlKey wheel events during the same pinch — isGesturing makes
    // onWheel drop those entirely so they neither zoom nor pan.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = e => {
      e.preventDefault();
      isGesturing = true;
      gsBase = tf.current.scale;
    };
    const onGestureChange = e => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, gsBase * e.scale / tf.current.scale);
    };
    const onGestureEnd = e => {
      e.preventDefault();
      isGesturing = false;
    };

    // Drag-pan: middle button anywhere, or primary button on canvas
    // background (anything that isn't an artboard or an inline editor).
    let drag = null;
    const onPointerDown = e => {
      const onBg = !e.target.closest('[data-dc-slot], .dc-editable');
      if (!(e.button === 1 || e.button === 0 && onBg)) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = {
        id: e.pointerId,
        lx: e.clientX,
        ly: e.clientY
      };
      vp.style.cursor = 'grabbing';
    };
    const onPointerMove = e => {
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX;
      drag.ly = e.clientY;
      apply();
    };
    const onPointerUp = e => {
      if (!drag || e.pointerId !== drag.id) return;
      vp.releasePointerCapture(e.pointerId);
      drag = null;
      vp.style.cursor = '';
    };

    // Host-driven zoom (toolbar % menu). Zooms around viewport centre so the
    // visible midpoint stays fixed — matching the host's iframe-zoom feel.
    const onHostMsg = e => {
      const d = e.data;
      if (d && d.type === '__dc_set_zoom' && typeof d.scale === 'number') {
        const r = vp.getBoundingClientRect();
        zoomAt(r.left + r.width / 2, r.top + r.height / 2, d.scale / tf.current.scale);
      } else if (d && d.type === '__dc_probe') {
        // Host's [readyGen] reset asks whether a canvas is present; it
        // fires on the iframe's native 'load', which for canvases with
        // images/fonts is after our mount-time announce, so re-announce.
        // Clear the pan-tick guard so apply() re-posts the current scale
        // even if it's unchanged — the host just reset dcScale to 1.
        window.parent.postMessage({
          type: '__dc_present'
        }, '*');
        lastPostedScale.current = undefined;
        apply();
      }
    };
    window.addEventListener('message', onHostMsg);
    // Announce canvas mode so the host toolbar proxies its % control here
    // instead of scaling the iframe element (which would just shrink the
    // viewport window of an infinite canvas). The apply() that follows emits
    // the initial __dc_zoom so the toolbar % is correct before first pinch.
    // lastPostedScale reset mirrors the __dc_probe handler: the layout
    // effect's restore-path apply() may already have posted the restored
    // scale (before __dc_present), so clear the guard to re-post it in order.
    window.parent.postMessage({
      type: '__dc_present'
    }, '*');
    lastPostedScale.current = undefined;
    apply();
    vp.addEventListener('wheel', onWheel, {
      passive: false
    });
    vp.addEventListener('gesturestart', onGestureStart, {
      passive: false
    });
    vp.addEventListener('gesturechange', onGestureChange, {
      passive: false
    });
    vp.addEventListener('gestureend', onGestureEnd, {
      passive: false
    });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    return () => {
      window.removeEventListener('message', onHostMsg);
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('gesturestart', onGestureStart);
      vp.removeEventListener('gesturechange', onGestureChange);
      vp.removeEventListener('gestureend', onGestureEnd);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
    };
  }, [apply, minScale, maxScale]);
  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return /*#__PURE__*/React.createElement("div", {
    ref: vpRef,
    className: "design-canvas",
    style: {
      height: '100vh',
      width: '100vw',
      background: DC.bg,
      overflow: 'hidden',
      overscrollBehavior: 'none',
      touchAction: 'none',
      position: 'relative',
      fontFamily: DC.font,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: worldRef,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      transformOrigin: '0 0',
      willChange: 'transform',
      width: 'max-content',
      minWidth: '100%',
      minHeight: '100%',
      padding: '60px 0 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: -6000,
      backgroundImage: gridSvg,
      backgroundSize: '120px 120px',
      pointerEvents: 'none',
      zIndex: -1
    }
  }), children));
}

// ─────────────────────────────────────────────────────────────
// DCSection — editable title + h-row of artboards in persisted order
// ─────────────────────────────────────────────────────────────
function DCSection({
  id,
  title,
  subtitle,
  children,
  gap = 48
}) {
  const ctx = React.useContext(DCCtx);
  const sid = id ?? title;
  const all = React.Children.toArray(dcFlatten(children));
  const artboards = all.filter(c => c && c.type === DCArtboard);
  const rest = all.filter(c => !(c && c.type === DCArtboard));
  const sec = ctx && sid && ctx.section(sid) || {};
  // Must match DesignCanvas's srcKey computation exactly (it filters falsy
  // IDs), or onDelete persists a srcKey that DesignCanvas never recognizes.
  const allIds = artboards.map(a => a.props.id ?? a.props.label).filter(Boolean);
  const srcKey = allIds.join('\x1f');
  const hidden = sec.srcKey === srcKey ? sec.hidden || [] : [];
  const srcOrder = allIds.filter(k => !hidden.includes(k));
  const order = React.useMemo(() => {
    const kept = (sec.order || []).filter(k => srcOrder.includes(k));
    return [...kept, ...srcOrder.filter(k => !kept.includes(k))];
  }, [sec.order, srcOrder.join('|')]);
  const byId = Object.fromEntries(artboards.map(a => [a.props.id ?? a.props.label, a]));

  // marginBottom counter-scales so the on-screen gap between sections stays
  // constant — otherwise at low zoom the (world-space) gap collapses while
  // the screen-constant sectionhead below it doesn't, and the title reads as
  // belonging to the section above. paddingBottom below is just enough for
  // the 24px artboard-header (abs-positioned above each card) plus ~8px, so
  // the title sits tight against its own row at every zoom.
  return /*#__PURE__*/React.createElement("div", {
    "data-dc-section": sid,
    style: {
      marginBottom: 'calc(80px * var(--dc-inv-zoom, 1))',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-sectionhead",
    style: {
      paddingBottom: 36
    }
  }, /*#__PURE__*/React.createElement(DCEditable, {
    tag: "div",
    value: sec.title ?? title,
    onChange: v => ctx && sid && ctx.patchSection(sid, {
      title: v
    }),
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: DC.title,
      letterSpacing: -0.4,
      marginBottom: 6,
      display: 'inline-block'
    }
  }), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: DC.subtitle
    }
  }, subtitle))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap,
      padding: '0 60px',
      alignItems: 'flex-start',
      width: 'max-content'
    }
  }, order.map(k => /*#__PURE__*/React.createElement(DCArtboardFrame, {
    key: k,
    sectionId: sid,
    artboard: byId[k],
    order: order,
    label: (sec.labels || {})[k] ?? byId[k].props.label,
    onRename: v => ctx && ctx.patchSection(sid, x => ({
      labels: {
        ...x.labels,
        [k]: v
      }
    })),
    onReorder: next => ctx && ctx.patchSection(sid, {
      order: next
    }),
    onDelete: () => ctx && ctx.patchSection(sid, x => ({
      hidden: [...(x.srcKey === srcKey ? x.hidden || [] : []), k],
      srcKey
    })),
    onFocus: () => ctx && ctx.setFocus(`${sid}/${k}`)
  }))), rest);
}

// DCArtboard — marker; rendered by DCArtboardFrame via DCSection.
function DCArtboard() {
  return null;
}

// Per-artboard export (kind: 'png' | 'html'). Both paths share the same
// self-contained clone: computed styles baked in, @font-face / <img> /
// inline-style background-image urls inlined as data URIs. PNG wraps the
// clone in foreignObject→canvas at 3× the artboard's natural width×height
// (same pipeline the host uses for page captures); HTML wraps it in a
// minimal standalone document. Both are independent of viewport zoom.
async function dcExport(node, w, h, name, kind) {
  try {
    await document.fonts.ready;
  } catch {}
  const toDataURL = url => fetch(url).then(r => r.blob()).then(b => new Promise(res => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = () => res(url);
    fr.readAsDataURL(b);
  })).catch(() => url);

  // Collect @font-face rules. ss.cssRules throws SecurityError on
  // cross-origin sheets (e.g. fonts.googleapis.com) — in that case fetch
  // the CSS text directly (those endpoints send ACAO:*) and regex-extract
  // the blocks. @import and @media/@supports are walked so nested
  // @font-face rules aren't missed.
  const fontRules = [],
    pending = [],
    seen = new Set();
  const scrapeCss = href => {
    if (seen.has(href)) return;
    seen.add(href);
    pending.push(fetch(href).then(r => r.text()).then(css => {
      for (const m of css.match(/@font-face\s*{[^}]*}/g) || []) fontRules.push({
        css: m,
        base: href
      });
      for (const m of css.matchAll(/@import\s+(?:url\()?['"]?([^'")\s;]+)/g)) scrapeCss(new URL(m[1], href).href);
    }).catch(() => {}));
  };
  const walk = (rules, base) => {
    for (const r of rules) {
      if (r.type === CSSRule.FONT_FACE_RULE) fontRules.push({
        css: r.cssText,
        base
      });else if (r.type === CSSRule.IMPORT_RULE && r.styleSheet) {
        const ibase = r.styleSheet.href || base;
        try {
          walk(r.styleSheet.cssRules, ibase);
        } catch {
          scrapeCss(ibase);
        }
      } else if (r.cssRules) walk(r.cssRules, base);
    }
  };
  for (const ss of document.styleSheets) {
    const base = ss.href || location.href;
    try {
      walk(ss.cssRules, base);
    } catch {
      if (ss.href) scrapeCss(ss.href);
    }
  }
  while (pending.length) await pending.shift();
  const fontCss = (await Promise.all(fontRules.map(async rule => {
    let out = rule.css,
      m;
    const re = /url\((['"]?)([^'")]+)\1\)/g;
    while (m = re.exec(rule.css)) {
      if (m[2].indexOf('data:') === 0) continue;
      let abs;
      try {
        abs = new URL(m[2], rule.base).href;
      } catch {
        continue;
      }
      out = out.split(m[0]).join('url("' + (await toDataURL(abs)) + '")');
    }
    return out;
  }))).join('\n');
  const cloneStyled = src => {
    if (src.nodeType === 8 || src.nodeType === 1 && src.tagName === 'SCRIPT') return document.createTextNode('');
    const dst = src.cloneNode(false);
    if (src.nodeType === 1) {
      const cs = getComputedStyle(src);
      let txt = '';
      for (let i = 0; i < cs.length; i++) txt += cs[i] + ':' + cs.getPropertyValue(cs[i]) + ';';
      dst.setAttribute('style', txt + 'animation:none;transition:none;');
      if (src.tagName === 'CANVAS') try {
        const im = document.createElement('img');
        im.src = src.toDataURL();
        im.setAttribute('style', txt);
        return im;
      } catch {}
    }
    for (let c = src.firstChild; c; c = c.nextSibling) dst.appendChild(cloneStyled(c));
    return dst;
  };
  const clone = cloneStyled(node);
  clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  // Drop the card's own shadow/radius so the export is a flush w×h rect;
  // the artboard's own background (if any) is already in the computed style.
  clone.style.boxShadow = 'none';
  clone.style.borderRadius = '0';
  const jobs = [];
  clone.querySelectorAll('img').forEach(el => {
    const s = el.getAttribute('src');
    if (s && s.indexOf('data:') !== 0) jobs.push(toDataURL(el.src).then(d => el.setAttribute('src', d)));
  });
  [clone, ...clone.querySelectorAll('*')].forEach(el => {
    const bg = el.style.backgroundImage;
    if (!bg) return;
    let m;
    const re = /url\(["']?([^"')]+)["']?\)/g;
    while (m = re.exec(bg)) {
      const tok = m[0],
        url = m[1];
      if (url.indexOf('data:') === 0) continue;
      jobs.push(toDataURL(url).then(d => {
        el.style.backgroundImage = el.style.backgroundImage.split(tok).join('url("' + d + '")');
      }));
    }
  });
  await Promise.all(jobs);
  const xml = new XMLSerializer().serializeToString(clone);
  const save = (blob, ext) => {
    if (!blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name + '.' + ext;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  if (kind === 'html') {
    const html = '<!doctype html><html><head><meta charset="utf-8"><title>' + name + '</title>' + (fontCss ? '<style>' + fontCss + '</style>' : '') + '</head><body style="margin:0">' + xml + '</body></html>';
    return save(new Blob([html], {
      type: 'text/html'
    }), 'html');
  }

  // PNG: the SVG's own width/height must be the output resolution — an
  // <img>-loaded SVG rasterizes at its intrinsic size, so sizing it at 1×
  // and ctx.scale()-ing up would just upscale a 1× bitmap. viewBox maps the
  // w×h foreignObject onto the px·w × px·h SVG canvas so the browser renders
  // the HTML at full resolution.
  const px = 3;
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w * px + '" height="' + h * px + '" viewBox="0 0 ' + w + ' ' + h + '"><foreignObject width="' + w + '" height="' + h + '">' + (fontCss ? '<style><![CDATA[' + fontCss + ']]></style>' : '') + xml + '</foreignObject></svg>';
  const img = new Image();
  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = () => rej(new Error('svg load failed'));
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });
  const cv = document.createElement('canvas');
  cv.width = w * px;
  cv.height = h * px;
  cv.getContext('2d').drawImage(img, 0, 0);
  cv.toBlob(blob => save(blob, 'png'), 'image/png');
}
function DCArtboardFrame({
  sectionId,
  artboard,
  label,
  order,
  onRename,
  onReorder,
  onFocus,
  onDelete
}) {
  const {
    id: rawId,
    label: rawLabel,
    width = 260,
    height = 480,
    children,
    style = {}
  } = artboard.props;
  const id = rawId ?? rawLabel;
  const ref = React.useRef(null);
  const cardRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [confirming, setConfirming] = React.useState(false);

  // ⋯ menu: close on any outside pointerdown. Two-click delete lives inside
  // the menu — first click arms the row, second commits; closing disarms.
  React.useEffect(() => {
    if (!menuOpen) {
      setConfirming(false);
      return;
    }
    const off = e => {
      if (!menuRef.current || !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', off, true);
    return () => document.removeEventListener('pointerdown', off, true);
  }, [menuOpen]);
  const doExport = kind => {
    setMenuOpen(false);
    if (!cardRef.current) return;
    const name = String(label || id || 'artboard').replace(/[^\w\s.-]+/g, '_');
    dcExport(cardRef.current, width, height, name, kind).catch(e => console.error('[design-canvas] export failed:', e));
  };

  // Live drag-reorder: dragged card sticks to cursor; siblings slide into
  // their would-be slots in real time via transforms. DOM order only
  // changes on drop.
  const onGripDown = e => {
    e.preventDefault();
    e.stopPropagation();
    const me = ref.current;
    // translateX is applied in local (pre-scale) space but pointer deltas and
    // getBoundingClientRect().left are screen-space — divide by the viewport's
    // current scale so the dragged card tracks the cursor at any zoom level.
    const scale = me.getBoundingClientRect().width / me.offsetWidth || 1;
    const peers = Array.from(document.querySelectorAll(`[data-dc-section="${sectionId}"] [data-dc-slot]`));
    const homes = peers.map(el => ({
      el,
      id: el.dataset.dcSlot,
      x: el.getBoundingClientRect().left
    }));
    const slotXs = homes.map(h => h.x);
    const startIdx = order.indexOf(id);
    const startX = e.clientX;
    let liveOrder = order.slice();
    me.classList.add('dc-dragging');
    const layout = () => {
      for (const h of homes) {
        if (h.id === id) continue;
        const slot = liveOrder.indexOf(h.id);
        h.el.style.transform = `translateX(${(slotXs[slot] - h.x) / scale}px)`;
      }
    };
    const move = ev => {
      const dx = ev.clientX - startX;
      me.style.transform = `translateX(${dx / scale}px)`;
      const cur = homes[startIdx].x + dx;
      let nearest = 0,
        best = Infinity;
      for (let i = 0; i < slotXs.length; i++) {
        const d = Math.abs(slotXs[i] - cur);
        if (d < best) {
          best = d;
          nearest = i;
        }
      }
      if (liveOrder.indexOf(id) !== nearest) {
        liveOrder = order.filter(k => k !== id);
        liveOrder.splice(nearest, 0, id);
        layout();
      }
    };
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      const finalSlot = liveOrder.indexOf(id);
      me.classList.remove('dc-dragging');
      me.style.transform = `translateX(${(slotXs[finalSlot] - homes[startIdx].x) / scale}px)`;
      // After the settle transition, kill transitions + clear transforms +
      // commit the reorder in the same frame so there's no visual snap-back.
      setTimeout(() => {
        for (const h of homes) {
          h.el.style.transition = 'none';
          h.el.style.transform = '';
        }
        if (liveOrder.join('|') !== order.join('|')) onReorder(liveOrder);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          for (const h of homes) h.el.style.transition = '';
        }));
      }, 180);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    "data-dc-slot": id,
    style: {
      position: 'relative',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-header",
    "data-omelette-chrome": "",
    style: {
      color: DC.label
    },
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-labelrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-grip",
    onPointerDown: onGripDown,
    title: "Drag to reorder"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "13",
    viewBox: "0 0 9 13",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "11",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "11",
    r: "1.1"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-labeltext",
    onClick: onFocus,
    title: "Click to focus"
  }, /*#__PURE__*/React.createElement(DCEditable, {
    value: label,
    onChange: onRename,
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: DC.label,
      lineHeight: 1
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-btns"
  }, /*#__PURE__*/React.createElement("div", {
    ref: menuRef,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "dc-kebab",
    title: "More",
    onClick: () => setMenuOpen(o => !o)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2.5",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9.5",
    cy: "6",
    r: "1.1"
  }))), menuOpen && /*#__PURE__*/React.createElement("div", {
    className: "dc-menu",
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('png')
  }, "Download PNG"), /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('html')
  }, "Download HTML"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("button", {
    className: "dc-danger",
    onClick: () => {
      if (confirming) {
        setMenuOpen(false);
        onDelete();
      } else setConfirming(true);
    }
  }, confirming ? 'Click again to delete' : 'Delete'))), /*#__PURE__*/React.createElement("button", {
    className: "dc-expand",
    onClick: onFocus,
    title: "Focus"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 1h4v4M5 11H1V7M11 1L7.5 4.5M1 11l3.5-3.5"
  }))))), /*#__PURE__*/React.createElement("div", {
    ref: cardRef,
    className: "dc-card",
    style: {
      borderRadius: 2,
      boxShadow: '0 1px 3px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.06)',
      overflow: 'hidden',
      width,
      height,
      background: '#fff',
      ...style
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb',
      fontSize: 13,
      fontFamily: DC.font
    }
  }, id)));
}

// Inline rename — commits on blur or Enter.
function DCEditable({
  value,
  onChange,
  style,
  tag = 'span',
  onClick
}) {
  const T = tag;
  return /*#__PURE__*/React.createElement(T, {
    className: "dc-editable",
    contentEditable: true,
    suppressContentEditableWarning: true,
    onClick: onClick,
    onPointerDown: e => e.stopPropagation(),
    onBlur: e => onChange && onChange(e.currentTarget.textContent),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.currentTarget.blur();
      }
    },
    style: style
  }, value);
}

// ─────────────────────────────────────────────────────────────
// Focus mode — overlay one artboard; ←/→ within section, ↑/↓ across
// sections, Esc or backdrop click to exit.
// ─────────────────────────────────────────────────────────────
function DCFocusOverlay({
  entry,
  sectionMeta,
  sectionOrder
}) {
  const ctx = React.useContext(DCCtx);
  const {
    sectionId,
    artboard
  } = entry;
  const sec = ctx.section(sectionId);
  const meta = sectionMeta[sectionId];
  const peers = meta.slotIds;
  const aid = artboard.props.id ?? artboard.props.label;
  const idx = peers.indexOf(aid);
  const secIdx = sectionOrder.indexOf(sectionId);
  const go = d => {
    const n = peers[(idx + d + peers.length) % peers.length];
    if (n) ctx.setFocus(`${sectionId}/${n}`);
  };
  const goSection = d => {
    // Sections whose artboards are all deleted have slotIds:[] — step past
    // them to the next non-empty section so ↑/↓ doesn't dead-end.
    const n = sectionOrder.length;
    for (let i = 1; i < n; i++) {
      const ns = sectionOrder[((secIdx + d * i) % n + n) % n];
      const first = sectionMeta[ns] && sectionMeta[ns].slotIds[0];
      if (first) {
        ctx.setFocus(`${ns}/${first}`);
        return;
      }
    }
  };
  React.useEffect(() => {
    const k = e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goSection(-1);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goSection(1);
      }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  });
  const {
    width = 260,
    height = 480,
    children
  } = artboard.props;
  const [vp, setVp] = React.useState({
    w: window.innerWidth,
    h: window.innerHeight
  });
  React.useEffect(() => {
    const r = () => setVp({
      w: window.innerWidth,
      h: window.innerHeight
    });
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);
  const scale = Math.max(0.1, Math.min((vp.w - 200) / width, (vp.h - 260) / height, 2));
  const [ddOpen, setDd] = React.useState(false);
  const Arrow = ({
    dir,
    onClick
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onClick();
    },
    style: {
      position: 'absolute',
      top: '50%',
      [dir]: 28,
      transform: 'translateY(-50%)',
      border: 'none',
      background: 'rgba(255,255,255,.08)',
      color: 'rgba(255,255,255,.9)',
      width: 44,
      height: 44,
      borderRadius: 22,
      fontSize: 18,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background .15s'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.18)',
    onMouseLeave: e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: dir === 'left' ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'
  })));

  // Portal to body so position:fixed is the real viewport regardless of any
  // transform on DesignCanvas's ancestors (including the canvas zoom itself).
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    onClick: () => ctx.setFocus(null),
    onWheel: e => e.preventDefault(),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(24,20,16,.6)',
      backdropFilter: 'blur(14px)',
      fontFamily: DC.font,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 72,
      display: 'flex',
      alignItems: 'flex-start',
      padding: '16px 20px 0',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setDd(o => !o),
    style: {
      border: 'none',
      background: 'transparent',
      color: '#fff',
      cursor: 'pointer',
      padding: '6px 8px',
      borderRadius: 6,
      textAlign: 'left',
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: -0.3
    }
  }, meta.title), /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 11 11",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    style: {
      opacity: .7
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 4l3.5 3.5L9 4"
  }))), meta.subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      opacity: .6,
      fontWeight: 400,
      marginTop: 2
    }
  }, meta.subtitle)), ddOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 4,
      background: '#2a251f',
      borderRadius: 8,
      boxShadow: '0 8px 32px rgba(0,0,0,.4)',
      padding: 4,
      minWidth: 200,
      zIndex: 10
    }
  }, sectionOrder.filter(sid => sectionMeta[sid].slotIds.length).map(sid => /*#__PURE__*/React.createElement("button", {
    key: sid,
    onClick: () => {
      setDd(false);
      const f = sectionMeta[sid].slotIds[0];
      if (f) ctx.setFocus(`${sid}/${f}`);
    },
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      border: 'none',
      cursor: 'pointer',
      background: sid === sectionId ? 'rgba(255,255,255,.1)' : 'transparent',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: 5,
      fontSize: 14,
      fontWeight: sid === sectionId ? 600 : 400,
      fontFamily: 'inherit'
    }
  }, sectionMeta[sid].title)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.setFocus(null),
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.12)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent',
    style: {
      border: 'none',
      background: 'transparent',
      color: 'rgba(255,255,255,.7)',
      width: 32,
      height: 32,
      borderRadius: 16,
      fontSize: 20,
      cursor: 'pointer',
      lineHeight: 1,
      transition: 'background .12s'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 64,
      bottom: 56,
      left: 100,
      right: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: width * scale,
      height: height * scale,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      background: '#fff',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 20px 80px rgba(0,0,0,.4)'
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb'
    }
  }, aid))), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 14,
      fontWeight: 500,
      opacity: .85,
      textAlign: 'center'
    }
  }, (sec.labels || {})[aid] ?? artboard.props.label, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5,
      marginLeft: 10,
      fontVariantNumeric: 'tabular-nums'
    }
  }, idx + 1, " / ", peers.length))), /*#__PURE__*/React.createElement(Arrow, {
    dir: "left",
    onClick: () => go(-1)
  }), /*#__PURE__*/React.createElement(Arrow, {
    dir: "right",
    onClick: () => go(1)
  }), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 8
    }
  }, peers.map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => ctx.setFocus(`${sectionId}/${p}`),
    style: {
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      width: 6,
      height: 6,
      borderRadius: 3,
      background: i === idx ? '#fff' : 'rgba(255,255,255,.3)'
    }
  })))), document.body);
}

// ─────────────────────────────────────────────────────────────
// Post-it — absolute-positioned sticky note
// ─────────────────────────────────────────────────────────────
function DCPostIt({
  children,
  top,
  left,
  right,
  bottom,
  rotate = -2,
  width = 180
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top,
      left,
      right,
      bottom,
      width,
      background: DC.postitBg,
      padding: '14px 16px',
      fontFamily: '"Comic Sans MS", "Marker Felt", "Segoe Print", cursive',
      fontSize: 14,
      lineHeight: 1.4,
      color: DC.postitText,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      zIndex: 5
    }
  }, children);
}
Object.assign(window, {
  DesignCanvas,
  DCSection,
  DCArtboard,
  DCPostIt
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/design-canvas.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/webgl.js
try { (() => {
/* ============================================================
   avdeev — webgl engine (three.js r128, global THREE)
   Two scenes, both attach to window.AVGL:
     heroField(canvas, opts)   -> inky topographic data-field (light/sand)
     edgeTerrain(canvas, opts) -> 3D equity surface (dark/holo)
   Each returns a cleanup() fn. Always paints one synchronous frame
   (so content shows even before rAF starts / when rAF is throttled),
   then animates via rAF unless prefers-reduced-motion is set.
   Resizes to its parent.
   ============================================================ */
(function () {
  "use strict";

  var REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SMALL = window.matchMedia && window.matchMedia("(max-width: 760px)").matches;

  // registry of mounted scenes — verification reads AVGL.scenes.length /
  // scene.calls (renderer.info.render.calls). Each mount pushes; cleanup splices.
  var scenes = [];
  function register(rec) {
    scenes.push(rec);
    return function () {
      var i = scenes.indexOf(rec);
      if (i >= 0) scenes.splice(i, 1);
    };
  }
  function col(hex) {
    return new THREE.Color(hex);
  }
  // a soft round sprite so signal nodes read as glowing dots, not squares
  var _dotTex = null;
  function dotTexture() {
    if (_dotTex) return _dotTex;
    var cv = document.createElement("canvas");
    cv.width = cv.height = 64;
    var g = cv.getContext("2d");
    var grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, "rgba(255,255,255,1)");
    grd.addColorStop(0.45, "rgba(255,255,255,0.85)");
    grd.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grd;
    g.beginPath();
    g.arc(32, 32, 32, 0, Math.PI * 2);
    g.fill();
    _dotTex = new THREE.CanvasTexture(cv);
    return _dotTex;
  }
  function smoothstep(a, b, x) {
    var t = Math.max(0, Math.min(1, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  }
  // read a CSS custom property off :root (theme-aware), with a fallback
  var _rootCS = null;
  function cssVar(name, fallback) {
    if (!_rootCS) _rootCS = getComputedStyle(document.documentElement);
    var v = _rootCS.getPropertyValue(name);
    return v && v.trim() || fallback;
  }
  // create a renderer; on failure flag the parent for the CSS fallback panel
  function makeRenderer(canvas) {
    try {
      var r = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: true // so pixels survive for verification / static capture
      });
      r.setPixelRatio(Math.min(window.devicePixelRatio || 1, SMALL ? 1.5 : 2));
      return r;
    } catch (e) {
      var host = canvas.parentElement;
      if (host) host.classList.add("av-gl-failed");
      return null;
    }
  }
  function observeSize(el, cb) {
    var ro = new ResizeObserver(function () {
      cb(el.clientWidth, el.clientHeight);
    });
    ro.observe(el);
    return function () {
      ro.disconnect();
    };
  }

  /* ==========================================================
     HERO FIELD — topographic point terrain on a transparent bg
     ========================================================== */
  function heroField(canvas, opts) {
    opts = opts || {};
    var parent = canvas.parentElement;
    var W = parent.clientWidth || 800;
    var H = parent.clientHeight || 500;
    var renderer = makeRenderer(canvas);
    if (!renderer) return function () {}; // no-WebGL: CSS fallback panel shows
    renderer.setSize(W, H, false);
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(46, W / H, 0.1, 200);
    camera.position.set(0, 13, 25);
    camera.lookAt(0, -1, -6);
    var GW = SMALL ? 64 : 108;
    var GD = SMALL ? 44 : 74;
    var SPAN_X = 64;
    var SPAN_Z = 52;
    var count = GW * GD;
    var positions = new Float32Array(count * 3);
    var colors = new Float32Array(count * 3);
    var baseXZ = new Float32Array(count * 2);
    // colors from theme tokens (fallbacks match the light-sand kit)
    var inkLow = col(opts.low || cssVar("--ink-300", "#b3a48f"));
    var inkMid = col(opts.mid || cssVar("--ink-800", "#3a2f26"));
    var spark = col(opts.spark || cssVar("--spark", "#34bfff"));
    var i = 0;
    for (var r = 0; r < GD; r++) {
      for (var c = 0; c < GW; c++) {
        var x = (c / (GW - 1) - 0.5) * SPAN_X;
        var z = (r / (GD - 1) - 0.5) * SPAN_Z - 6;
        baseXZ[i * 2] = x;
        baseXZ[i * 2 + 1] = z;
        positions[i * 3] = x;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = z;
        i++;
      }
    }
    var geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    var mat = new THREE.PointsMaterial({
      size: SMALL ? 0.42 : 0.34,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      sizeAttenuation: true,
      depthWrite: false
    });
    var points = new THREE.Points(geom, mat);
    scene.add(points);
    var ptr = {
      x: 0,
      z: -6,
      tx: 0,
      tz: -6,
      active: 0,
      tactive: 0
    };
    function onMove(e) {
      var rect = parent.getBoundingClientRect();
      var nx = (e.clientX - rect.left) / rect.width;
      var ny = (e.clientY - rect.top) / rect.height;
      // clamp slightly past the edges so the cursor can drive the very front
      // and very back rows, and so positions outside the hero (over the
      // work/trading/about areas) stick to the nearest grid edge instead of
      // pushing the influence point off-grid (which killed the reaction).
      nx = Math.max(-0.12, Math.min(1.12, nx));
      ny = Math.max(-0.12, Math.min(1.12, ny));
      // map the full vertical range onto the full grid depth (was *0.5, which
      // only reached the middle band of waves).
      ptr.tx = (nx - 0.5) * SPAN_X;
      ptr.tz = (ny - 0.5) * SPAN_Z - 6;
      ptr.tactive = 1;
    }
    function onLeave() {
      ptr.tactive = 0;
    }
    window.addEventListener("pointermove", onMove, {
      passive: true
    });
    parent.addEventListener("pointerleave", onLeave);
    var posAttr = geom.attributes.position;
    var colAttr = geom.attributes.color;
    function field(x, z, t) {
      return Math.sin(x * 0.18 + t * 0.6) * 1.5 + Math.sin(z * 0.22 - t * 0.45) * 1.2 + Math.sin((x + z) * 0.12 + t * 0.32) * 0.9 + Math.sin((x - z) * 0.3 - t * 0.5) * 0.45;
    }
    function compute(t) {
      ptr.x += (ptr.tx - ptr.x) * 0.08;
      ptr.z += (ptr.tz - ptr.z) * 0.08;
      ptr.active += (ptr.tactive - ptr.active) * 0.06;
      for (var k = 0; k < count; k++) {
        var x = baseXZ[k * 2];
        var z = baseXZ[k * 2 + 1];
        var h = field(x, z, t);
        var dx = x - ptr.x;
        var dz = z - ptr.z;
        var d2 = dx * dx + dz * dz;
        // wider gaussian so the ripple reaches the far/back waves, not just a
        // tight bump around the cursor.
        h += Math.exp(-d2 / 150) * 4.6 * ptr.active;
        positions[k * 3 + 1] = h;
        var t01 = smoothstep(-1.5, 3.4, h);
        var cr, cg, cb;
        if (t01 < 0.55) {
          var u = t01 / 0.55;
          cr = inkLow.r + (inkMid.r - inkLow.r) * u;
          cg = inkLow.g + (inkMid.g - inkLow.g) * u;
          cb = inkLow.b + (inkMid.b - inkLow.b) * u;
        } else {
          var v = (t01 - 0.55) / 0.45;
          cr = inkMid.r + (spark.r - inkMid.r) * v;
          cg = inkMid.g + (spark.g - inkMid.g) * v;
          cb = inkMid.b + (spark.b - inkMid.b) * v;
        }
        colors[k * 3] = cr;
        colors[k * 3 + 1] = cg;
        colors[k * 3 + 2] = cb;
      }
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
    }
    function render() {
      camera.position.x += (ptr.x * 0.12 - camera.position.x) * 0.03;
      camera.lookAt(0, -2, -6);
      renderer.render(scene, camera);
    }

    // pre-warm to a composed pose so the synchronous first frame is the hero
    // shot (not a flat t=0 state) — works even when rAF is paused / throttled.
    var WARM = 0.9;
    var raf = null;
    var start = performance.now() - WARM * 1000; // continue the loop from WARM, no jump
    function loop(now) {
      compute((now - start) / 1000);
      render();
      raf = requestAnimationFrame(loop);
    }
    compute(WARM);
    render();
    if (!REDUCED) raf = requestAnimationFrame(loop);
    var stopResize = observeSize(parent, function (w, h) {
      if (!w || !h) return;
      W = w;
      H = h;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      render();
    });
    var unregister = register({
      type: "hero",
      canvas: canvas,
      renderer: renderer,
      scene: scene,
      camera: camera,
      get calls() {
        return renderer.info.render.calls;
      }
    });
    return function cleanup() {
      if (raf) cancelAnimationFrame(raf);
      stopResize();
      unregister();
      window.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
      geom.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }

  /* ==========================================================
     EDGE TERRAIN — 3D equity surface (dark holo panel)
     opts.equity = [0..1] heights for the FRONT ridge (the live curve)
     ========================================================== */
  function edgeTerrain(canvas, opts) {
    opts = opts || {};
    var equity = opts.equity || [0.12, 0.16, 0.15, 0.26, 0.24, 0.4, 0.36, 0.5, 0.48, 0.66, 0.62, 0.8, 0.86, 0.98];
    var signals = opts.signals || [];
    var parent = canvas.parentElement;
    var W = parent.clientWidth || 600;
    var H = parent.clientHeight || 320;
    var renderer = makeRenderer(canvas);
    if (!renderer) return function () {}; // no-WebGL: CSS fallback panel shows
    renderer.setSize(W, H, false);
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 200);
    camera.position.set(0, 11, 22);
    camera.lookAt(0, 0.5, 0);
    var spark = col(cssVar("--spark", "#34bfff"));
    var sparkDeep = col(cssVar("--spark-deep", "#0086bb"));
    var holoLine = col(cssVar("--holo-500", "#2b5a93"));
    var COLS = SMALL ? 40 : 64;
    var ROWS = SMALL ? 26 : 40;
    var SX = 30;
    var SZ = 20;
    function sampleEquity(u) {
      var f = u * (equity.length - 1);
      var a = Math.floor(f);
      var b = Math.min(equity.length - 1, a + 1);
      var m = f - a;
      return equity[a] * (1 - m) + equity[b] * m;
    }
    var positions = new Float32Array(COLS * ROWS * 3);
    var baseXZ = new Float32Array(COLS * ROWS * 2);
    var idx = 0;
    for (var r = 0; r < ROWS; r++) {
      for (var c = 0; c < COLS; c++) {
        var x = (c / (COLS - 1) - 0.5) * SX;
        var z = (r / (ROWS - 1) - 0.5) * SZ;
        baseXZ[idx * 2] = c / (COLS - 1);
        baseXZ[idx * 2 + 1] = r / (ROWS - 1);
        positions[idx * 3] = x;
        positions[idx * 3 + 1] = 0;
        positions[idx * 3 + 2] = z;
        idx++;
      }
    }
    var segs = [];
    function vi(c, r) {
      return r * COLS + c;
    }
    for (var rr = 0; rr < ROWS; rr++) {
      for (var cc = 0; cc < COLS; cc++) {
        if (cc < COLS - 1) segs.push(vi(cc, rr), vi(cc + 1, rr));
        if (rr < ROWS - 1) segs.push(vi(cc, rr), vi(cc, rr + 1));
      }
    }
    var geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setIndex(segs);
    var lineMat = new THREE.LineBasicMaterial({
      color: holoLine,
      transparent: true,
      opacity: 0.55
    });
    var wire = new THREE.LineSegments(geom, lineMat);
    var pcolors = new Float32Array(COLS * ROWS * 3);
    var pgeom = new THREE.BufferGeometry();
    pgeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pgeom.setAttribute("color", new THREE.BufferAttribute(pcolors, 3));
    var pMat = new THREE.PointsMaterial({
      size: SMALL ? 0.34 : 0.26,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    var pts = new THREE.Points(pgeom, pMat);
    var group = new THREE.Group();
    group.add(wire);
    group.add(pts);

    // signal nodes — small spark dots sitting on the FRONT ridge (the equity
    // curve), in depth. kind tints them within the one-accent family.
    var FRONT_Z = SZ / 2;
    var nodeMat = null,
      nodeGeom = null,
      nodes = null;
    var NODE_BASE = SMALL ? 1.05 : 0.82;
    if (signals.length) {
      var npos = new Float32Array(signals.length * 3);
      var ncol = new Float32Array(signals.length * 3);
      for (var s = 0; s < signals.length; s++) {
        var su = signals[s].i / (equity.length - 1);
        npos[s * 3] = (su - 0.5) * SX;
        npos[s * 3 + 1] = sampleEquity(su) * 7.0 + 0.55; // float just above ridge
        npos[s * 3 + 2] = FRONT_Z;
        var kc = signals[s].kind === "short" ? sparkDeep : signals[s].kind === "flat" ? holoLine : spark;
        ncol[s * 3] = kc.r;
        ncol[s * 3 + 1] = kc.g;
        ncol[s * 3 + 2] = kc.b;
      }
      nodeGeom = new THREE.BufferGeometry();
      nodeGeom.setAttribute("position", new THREE.BufferAttribute(npos, 3));
      nodeGeom.setAttribute("color", new THREE.BufferAttribute(ncol, 3));
      nodeMat = new THREE.PointsMaterial({
        size: NODE_BASE,
        map: dotTexture(),
        vertexColors: true,
        transparent: true,
        opacity: 0.98,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });
      nodes = new THREE.Points(nodeGeom, nodeMat);
      group.add(nodes);
    }
    scene.add(group);
    var posAttr = geom.attributes.position;
    var ppos = pgeom.attributes.position;
    var pcol = pgeom.attributes.color;
    function compute(t) {
      var i2 = 0;
      for (var r = 0; r < ROWS; r++) {
        for (var c = 0; c < COLS; c++) {
          var u = baseXZ[i2 * 2];
          var w = baseXZ[i2 * 2 + 1];
          var ridge = sampleEquity(u) * 7.0;
          var front = w;
          var noise = Math.sin(u * 9 + t * 0.8) * 0.5 + Math.sin(w * 7 - t * 0.6) * 0.4 + Math.sin((u + w) * 12 + t) * 0.25;
          var h = ridge * (0.35 + front * 0.65) + noise * (1 - front) * 1.3;
          positions[i2 * 3 + 1] = h;
          var t01 = smoothstep(0, 7, h);
          pcolors[i2 * 3] = sparkDeep.r + (spark.r - sparkDeep.r) * t01;
          pcolors[i2 * 3 + 1] = sparkDeep.g + (spark.g - sparkDeep.g) * t01;
          pcolors[i2 * 3 + 2] = sparkDeep.b + (spark.b - sparkDeep.b) * t01;
          i2++;
        }
      }
      posAttr.needsUpdate = true;
      ppos.needsUpdate = true;
      pcol.needsUpdate = true;
    }
    var tilt = {
      x: 0,
      y: 0,
      tx: 0,
      ty: 0
    };
    function onMove(e) {
      var rect = parent.getBoundingClientRect();
      tilt.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 0.6;
      tilt.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 0.3;
    }
    parent.addEventListener("pointermove", onMove, {
      passive: true
    });
    function render(t) {
      tilt.x += (tilt.tx - tilt.x) * 0.05;
      tilt.y += (tilt.ty - tilt.y) * 0.05;
      group.rotation.y = Math.sin(t * 0.12) * 0.32 + tilt.x;
      group.rotation.x = -0.06 + tilt.y;
      if (nodeMat) nodeMat.size = NODE_BASE * (1 + 0.18 * Math.sin(t * 2.4));
      renderer.render(scene, camera);
    }
    var WARM = 1.2;
    var raf = null;
    var start = performance.now() - WARM * 1000;
    function loop(now) {
      var t = (now - start) / 1000;
      compute(t);
      render(t);
      raf = requestAnimationFrame(loop);
    }

    // pre-warm to a composed, slightly-orbited pose for the first frame
    compute(WARM);
    if (REDUCED) {
      group.rotation.y = 0.22;
      group.rotation.x = -0.06;
      renderer.render(scene, camera);
    } else {
      render(WARM);
      raf = requestAnimationFrame(loop);
    }
    var stopResize = observeSize(parent, function (w, h) {
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      renderer.render(scene, camera);
    });
    var unregister = register({
      type: "trading",
      canvas: canvas,
      renderer: renderer,
      scene: scene,
      camera: camera,
      get calls() {
        return renderer.info.render.calls;
      }
    });
    return function cleanup() {
      if (raf) cancelAnimationFrame(raf);
      stopResize();
      unregister();
      parent.removeEventListener("pointermove", onMove);
      geom.dispose();
      pgeom.dispose();
      if (nodeGeom) nodeGeom.dispose();
      lineMat.dispose();
      pMat.dispose();
      if (nodeMat) nodeMat.dispose();
      renderer.dispose();
    };
  }
  window.AVGL = {
    heroField: heroField,
    edgeTerrain: edgeTerrain,
    scenes: scenes
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/webgl.js", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.ThemeToggle = __ds_scope.ThemeToggle;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.PillNav = __ds_scope.PillNav;

})();
