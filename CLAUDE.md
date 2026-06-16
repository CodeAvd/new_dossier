# avdeev — R3F portfolio (dossier)

Awwwards-grade single-page portfolio. **Live build = `ui_kits/portfolio/index-r3f.html`**
(React Three Fiber, three r160, R3F v8, **WebGL only — NO WebGPU**). It loads react /
react-dom / three as native ES modules via an esm.sh importmap; the `*.jsx` sections are
transpiled in-browser by `@babel/standalone`; the compiled design system is `_ds_bundle.js`.

## Dev flow (local → GitHub → Vercel)

1. **Edit files here directly** (this repo is the source of truth — NOT claude.ai/design anymore).
2. **Verify from code:** `git diff` for the surgical change + `node --check` on the plain-JS
   engines (`_*-r3f.js`). JSX can't be `node --check`'d (babel) — rely on the diff + brace balance.
3. **Commit per task** (one logical change per commit; reference the ARB-id).
4. **Push to `origin/main` → Vercel auto-deploys** (project is linked to `CodeAvd/new_dossier`).
5. The owner reviews the **live deploy in BATCHES** — roughly after **2–3 big or 3–6 small** tasks,
   not after every task. Don't ask for a deploy each time; batch and tell them when a cluster is ready.
6. Motion / interaction / visual outcomes are **NOT verifiable from code** → mark **NEEDS-LIVE**
   so the owner confirms them on the batched deploy. The in-editor preview is gone; the live
   Vercel deploy is the only place motion runs.

Tasks live in **Linear** — team `Arbitrage1`, project **"dossier improve"** (`ARB-*`),
id `5b698e1a-1893-48ba-8c66-fd7340a5a110`. Set In Progress when starting, Done + an evidence
comment (what changed, files, `git` sha, NEEDS-LIVE caveat) when finished.

## Entry + key files (`ui_kits/portfolio/`)

- `index-r3f.html` — the shipped page: importmap, theme pre-paint script, esm.sh resource hints,
  the `@babel/standalone` section shell, `_ds_bundle.js` + `data.js`, the three `_*-r3f.js` modules.
- `_hero-r3f.js` / `_trading-r3f.js` / `_funagent-r3f.js` — plain-JS R3F engines (leading `_` so
  the DS Babel pass skips them). Built with `React.createElement` (`h`), heavy work in one `useFrame`.
- `*.jsx` sections — `Header`, `HeroR3F`, `About`, `Projects`, `FunAgent`, `TradingR3F`,
  `Experience`, `Stack`, `Contact`, `av-utils`.
- `kit.css`, `kit-gl.css`, `data.js`.
- Repo root: `index.html` (redirect → the portfolio), `styles.css` (`@import`s `tokens/*.css`),
  `_ds_bundle.js`, `assets/`.

## Guardrails (learned the hard way — do not regress)

- **WebGL only, never WebGPU.** Surgical, reversible edits — keep each diff to the intended change.
- **`_funagent-r3f.js` palette is intentionally LITERAL** (a warm cozy room, identical in both
  themes). Do NOT wire it to CSS tokens / theme.
- **Never invent metrics.** The `—`/`tbd` hero stats are deliberate honest placeholders
  (`data.js` + `HeroR3F.jsx` say so). The fix for "empty metrics" is one honest qualitative story,
  not fabricated numbers.
- The GL scenes already carry: a self-sustaining rAF autoplay pump so the demand loop runs on a
  visible load (ARB-104); a `MutationObserver` on `<html data-theme>` that re-derives `THREE.Color`s
  live + reads the brand cyan from `--spark-accent` (ARB-105); and a `ComposeBoundary` +
  `HAS_WEBGL2` guard around the hero bloom so a compose failure degrades to the raw field (ARB-8).
  Don't break these.
- The internal audit report and `scraps/` are deliberately **excluded** from this public repo.
  Don't re-add them.

## Backlog posture

Contained, code-verifiable tasks first (perf, a11y, typography, cleanup). The big signature epics
(hero composition / empty-metrics / motion-film / cube-bot-as-signature) are NEEDS-LIVE and must be
**grounded in the audit** before touching the signature hero — don't fire them off blind.
