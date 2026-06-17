/* portfolio content — brand voice: lowercase, terse, evidence-backed.
   NOTE: project + experience copy is representative placeholder content
   for the kit; swap with real history. */

window.AV_DATA = {
  // LOWERCASE-VOICE RULE (ARB-83): all UI copy is lowercase by design. The single
  // sanctioned exception is the proper name below — it stays correctly capitalized and
  // is rendered as small-caps in the footer (Contact.jsx) so the exception reads as a
  // deliberate typographic choice, not an inconsistency.
  name: "Grigorii Avdeev",
  wordmark: "avdeev",
  role: "ai & quant engineer",
  // ARB-76: removed the orphaned `hero` copy block — the live HeroR3F.jsx hardcodes
  // its own (richer) hero copy and there is no longer a vanilla Hero.jsx consuming this,
  // so it was a stale, divergent source-of-truth that changed nothing on the shipped page.
  // ARB-97: nav in RENDER ORDER, reaching every content section (was mis-ordered
  // and omitted funagent + stack). Render order: about → work → funagent → trading
  // → experience → stack. #top is the logo's target; contact is the prominent
  // "let's talk" CTA + footer, so it isn't duplicated as a pill (keeps the bar from
  // overflowing). Objects so the label can differ from the section id.
  nav: [
    { id: "about", label: "about" },
    { id: "work", label: "work" },
    { id: "funagent", label: "agent" },
    { id: "trading", label: "trading" },
    { id: "experience", label: "experience" },
    { id: "stack", label: "stack" },
  ],
  // TODO(metrics): schematic placeholders — NONE of these are measured yet.
  // Drop in real figures (and restore the units: %, ms, /d) once the evals
  // and the live book actually back them. Never ship invented numbers here.
  stats: [
    { value: "—", unit: "tbd", label: "citation recall" },
    { value: "—", unit: "tbd", label: "sharpe · live" },
    { value: "—", unit: "tbd", label: "docs qa’d" },
    { value: "—", unit: "tbd", label: "p50 latency" },
  ],
  /* trading — THE swap-in seam for the 3D edge terrain.
     Replace `equity` / `signals` with a real backtest export to drive the
     surface from live data. Values are schematic/representative, NOT real P&L.
       equity  : number[]  0..1 normalized heights = the front-ridge curve
       signals : {i,kind}  i = index into equity, kind = long|short|flat (node tint)
       feed    : the chips rendered under the viz (display only) */
  trading: {
    equity: [
      0.14, 0.17, 0.16, 0.26, 0.24, 0.39, 0.35, 0.49, 0.46, 0.64, 0.6, 0.76,
      0.81, 0.91,
    ],
    signals: [
      { i: 1, kind: "flat" },
      { i: 3, kind: "long" },
      { i: 6, kind: "short" },
      { i: 9, kind: "long" },
      { i: 12, kind: "long" },
    ],
    // TODO(metrics): sample feed — the long/short/flat directions are
    // illustrative only and the returns are placeholders (—), not real
    // trades. Wire to a real signal log before presenting any % here.
    feed: [
      { t: "btc · 4h", s: "long", v: "—", tone: "up" },
      { t: "eth · 1h", s: "flat", v: "—", tone: "flat" },
      { t: "spy · 1d", s: "short", v: "—", tone: "down" },
      { t: "sol · 4h", s: "long", v: "—", tone: "up" },
    ],
  },
  about: {
    body: [
      "i came up through qa, so i don’t trust a system until it can prove itself. evidence over vibes — every agent i ship links its claims to a source span, and every verdict cites the line it stands on.",
      "now i build tools that back their own conclusions: fun-agent (an autonomous qa assistant), polyKalshi (cross-market arbitrage), jarvis (agent orchestration), and hr-breaker (an agentic data pipeline). file-first, local-first, reproducible by default.",
    ],
    facts: [
      { k: "based", v: "remote · gmt+1" },
      { k: "focus", v: "agents · evals · quant" },
      { k: "stack", v: "python · rust · ts" },
      { k: "status", v: "open to the right thing" },
    ],
  },
  projects: [
    {
      id: "fun-agent",
      title: "fun-agent",
      kind: "autonomous qa assistant",
      blurb: "an autonomous qa assistant: takes a case, gathers the context, runs the checks, and backs every verdict with a cited source. file-first, human-approved.",
      stat: { value: "—", unit: "tbd", label: "evidence-cited verdicts" },
      tags: ["typescript", "retrieval", "evals", "cli"],
      tone: "spark",
      holo: true,
    },
    {
      id: "polyKalshi",
      title: "polyKalshi",
      kind: "cross-market arbitrage",
      blurb: "scans matched markets across polymarket and kalshi for price dislocations, then shows the arb — its spread and the exact trade it would place.",
      stat: { value: "—", unit: "tbd", label: "markets watched" },
      tags: ["python", "polars", "arbitrage"],
      tone: "accent",
    },
    {
      id: "jarvis",
      title: "jarvis",
      kind: "agent orchestration",
      blurb: "an orchestration layer that routes work across specialized agents — it plans, dispatches and verifies, with a human gate on anything irreversible.",
      stat: { value: "—", unit: "tbd", label: "agents coordinated" },
      tags: ["typescript", "agents", "orchestration"],
      tone: "honey",
    },
    {
      id: "hr-breaker",
      title: "hr-breaker",
      kind: "agentic data pipeline",
      blurb: "an agentic pipeline that turns messy source data into structured, queryable records — every step auditable, nothing silently transformed.",
      stat: { value: "—", unit: "tbd", label: "records structured" },
      tags: ["python", "pipeline", "llm"],
      tone: "mauve",
    },
  ],
  experience: [
    { period: "2024 — now", role: "ai engineer", org: "independent", note: "agents that cite their evidence. shipped fun-agent + jarvis.", current: true },
    { period: "2022 — 24", role: "quant developer", org: "trading desk", note: "intraday signals + execution tooling. live trading book." }, // TODO(metrics): dropped invented "+1.8 sharpe" figure
    { period: "2020 — 22", role: "qa engineer", org: "saas", note: "test infra, ci, eval pipelines. the qa brain, in writing." },
    { period: "2019 — 20", role: "b.sc. computer science", org: "university", note: "numerical methods, market microstructure." },
  ],
  stack: {
    languages: ["python", "rust", "typescript", "sql"],
    ml: ["pytorch", "langgraph", "transformers", "duckdb", "polars"],
    infra: ["postgres", "docker", "aws", "ci/cd", "react"],
  },
  contact: {
    blurb: "got a system that needs to prove itself? i ship tools that back their own verdicts.",
    email: "grigorii584@gmail.com",
    links: [
      { label: "github", handle: "CodeAvd", href: "https://github.com/CodeAvd" },
      { label: "linkedin", handle: "in/grigoriiavdeev", href: "https://www.linkedin.com/in/grigoriiavdeev" },
      { label: "email", handle: "grigorii584@gmail.com", href: "mailto:grigorii584@gmail.com" },
    ],
  },
};
