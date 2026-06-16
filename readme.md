# avdeev — design system

a warm, pastel design system for **Grigorii Avdeev** (`avdeev`) — an ai & quant engineer's personal portfolio. peach / terracotta / apricot on cream, elegant serif display over a soft humanist sans, motion-forward and a little playful. light + warm dark.

> **voice in one line:** _i build agents that cite their evidence — and trading tools that find the edge. qa brain, builder hands._

---

## what this is

A self-contained design system: warm color + type + spacing tokens, a small set of React UI primitives, brand assets, and a full interactive portfolio UI kit. Consumers link one file — `styles.css` — and read components from the compiled bundle.

Built to dress a personal site that has to feel **crafted and human** (soft pastels, serif headlines, springy micro-interactions) while staying **credible and evidence-first** (mono metadata, real numbers, file-first motifs).

---

## sources & references

This system was briefed against an AI-engineer portfolio direction, drawing aesthetic inspiration from award-winning interactive/3D portfolios. The reference repositories below were provided as inspiration for the motion + "3D-ish depth" energy — explore them to push the interactive layer further (parallax, WebGL heroes, scroll-driven scenes):

- Bruno Simon — `github.com/brunosimon/folio-2019` (the drivable-car portfolio)
- Bruno Simon — `github.com/brunosimon/folio-2025` (MIT; TSL / WebGL + WebGPU)
- Bruno Simon — `github.com/brunosimon/my-room-in-3d`
- Bruno Simon — `github.com/brunosimon/infinite-world`
- Bruno Simon — `github.com/brunosimon/threejs-template-complex` (the canonical singleton `Experience` class architecture)
- Bruno Simon — `github.com/brunosimon/webgl-black-hole`
- Bruno Simon — `github.com/brunosimon/three.js-tsl-sandbox`

The accompanying brief also included a Three.js skill-suite blueprint (architecture rules, performance budgets, R3F vs vanilla decisions). None of that code is vendored here; the references are pointers for whoever extends the portfolio's interactive layer. The hero in this system fakes the "3D depth" with cheap, performant CSS (pointer parallax + a tilting evidence card) — a real WebGL hero would slot into the same `av-hero__visual` container.

> **fonts:** no font binaries were supplied, so type is loaded from **Google Fonts** (Newsreader, Hanken Grotesk, Urbanist, JetBrains Mono). These are my picks for the brief, flagged as substitutions — send real files and I'll self-host them.

---

## design lineage — scraped references

Two warm-cream interactive-portfolio sites were attached as design-language extractions and folded directly into the tokens. Both **validated** the warm-pastel + springy + cream-first direction and supplied **real, tested values** (not invented ones):

- **david-hckh.com** — David Heckhoff, a WebGL / Node.js developer's portfolio. _Flat material, warm beige (`#f5efe6 → #dfd1bc`), bold orange + a **vivid cyan `#34bfff`**, and a **holographic deep-blue** (`#152242 / #002474`) for 3D/data scenes. Urbanist 900 display + a mono body. Pill buttons, dashed-outline cards, `cubic-bezier(.6,0,.25,1)` route easing._
- **room.bokoko33.me** (かまぼこのへや) — a soft, cute 3D-room portfolio. _Cream `#fbf4e4`, **pink `#eaa1ac`**, **mint `#7bd0ad`**, **periwinkle `#95abe5`**, navy. Big 999px pills, bouncy `--ease-back: cubic-bezier(.38,1.8,.51,.96)`._

**What got adopted (additively — the approved serif-pastel core is unchanged):**
1. **Neutrals retuned** to David's exact warm-beige ramp (`--cream-200`, `--sand-100…400`). `--ink-600 #5f5246` was already an exact match.
2. **Spark accent** — David's vivid cyan `#34bfff` as the one cool pop (`--spark*`). Warm/cool tension against terracotta is what makes both references sing.
3. **Playful pastels grounded** in bokoko33's real values — `--blush` (pink), `--sage` (mint), `--sky` (periwinkle).
4. **Holographic deep-blue surfaces** (`--holo-*`) for quant/data panels + dramatic dark sections. Used live on the _edgefinder_ project card and the `Card elevation="holo"` variant.
5. **Urbanist** added as `--font-geo-display` — the heavy geometric "engineer" voice (pair 800/900 titles with mono body) as an alternative to the serif.
6. **Bouncier easing** (`--ease-back`) + David's `--ease-smooth` / `--ease-expo` route easings.
7. **Dashed-outline `Card` variant** (David motif) and a **`spark` `Tag` tone**.

---

## content fundamentals

How copy is written in this brand. **Match this exactly** when generating new text.

- **person & casing:** first person, singular. **all lowercase**, including headlines and the wordmark. (`avdeev`, not `Avdeev`.) The full name `Grigorii Avdeev` keeps normal casing — it's the searchable, recruiter-facing asset.
- **register:** casual-technical. confident, dry, a little edge. an engineer talking — never a brand, never salesy.
- **every claim carries proof.** a number or an artifact backs each statement. no adjective does the work a fact should do. _"+1.8 sharpe, live 14mo"_ not _"high-performing strategy"._
- **rhythm:** short declaratives and fragments. one concrete noun, one verb, the proof. _"reads the pdf, flags the mismatch, cites the line."_
- **motifs (reuse these):** "cites its evidence" · "finds the edge" · "file-first" · "evidence-backed" · "ships" · "qa brain, builder hands" · "proves itself" · "backs their own verdicts".
- **ban-list:** passionate, leverage, cutting-edge, synergy, journey, empower, seamless. no decorative emoji. no exclamation marks. no title-case headlines.
- **punctuation:** em-dashes and middots (`·`) are welcome. periods end fragments. lowercase after them is fine in display type.

example headline pattern: `things that <em>back</em> their own verdicts.` — lowercase serif with a single italic accent word in terracotta.

---

## visual foundations

**palette.** warm pastels only. a peach → apricot → terracotta ramp (`--terra-*`) is the brand spine; `--terra-500` is primary. Backgrounds are cream (`--bg-base #fbf4ec`), surfaces a touch warmer-white (`--surface-card #fffaf3`). Text is a **warm brown-charcoal ink scale**, never pure grey or black. A small playful pastel set — pink (`--blush`), mint (`--sage`), periwinkle (`--sky`), honey, mauve — tints tags and project glows, used sparingly (one tone per project). The one **cool** note is **spark** (`--spark #34bfff`), a vivid cyan used against terracotta for warm/cool tension — links, focus pops, data, never large fills. A **holographic deep-blue** set (`--holo-*`) backs quant/data panels and dramatic dark surfaces. Warm dark flips to espresso backgrounds (`#1e1813`) with cream text and brightened apricot accent.

**type.** elegant editorial serif (**Newsreader**) for all display/headlines, set in weight 500 with negative tracking; its **italic** is a deliberate accent motif — one or two words per headline go italic + terracotta. An alternative **heavy geometric display** (**Urbanist** 800/900, `--font-geo-display`) carries the blockier "engineer/tool" voice when a page should read as a product, not an essay. Body is **Hanken Grotesk**, a soft humanist sans, 400/500/600. **JetBrains Mono** carries every label, eyebrow, metric unit, tag and code — uppercase + `0.14em` tracking for eyebrows. Big numbers are serif (the `Stat` component): proof rendered as typography.

**spacing & layout.** 4px base scale. generous section rhythm (`--section-y` clamps 4–8rem). max container 1180px, prose 680px. fluid gutters.

**radii.** soft and generous — the friendly half of the brand. cards use `--radius-lg/xl` (22–30px), the contact card `--radius-2xl` (40px), buttons + tags + nav are full pills.

**shadows.** warm-tinted, **brown not grey** — `rgba(74,48,28,…)`. diffuse and low-opacity for a soft lift. primary buttons get a terracotta-tinted `--shadow-accent` on hover. dark mode uses true-black shadows.

**borders.** hairlines are warm ink at low alpha (`--border-soft/line`). inputs use a 1.5px line that turns terracotta with a 4px accent glow ring on focus.

**backgrounds & texture.** a subtle SVG **paper grain** (`.av-grain`) multiplies over the page for warmth. heroes use a soft radial **dawn-glow** wash (`.av-glow`) plus blurred floating **blobs** (peach / blush / honey) that parallax to the pointer. no harsh gradients, no purple, ever.

**motion.** gentle and slightly springy. easing is `--ease-out` (cinematic settle) and `--ease-spring` (soft overshoot, used on lifts/toggles/sliding pills). durations 140–680ms. scroll-reveal fades sections up 22px. an italic-serif marquee drifts the stack. **everything respects `prefers-reduced-motion`** — reveals resolve, marquee + parallax stop.

**hover / press.** hover lifts (`translateY(-2…-6px)`) + deepens shadow + warms color. press settles back with a `scale(0.97)`. project cards reveal a colored glow and rotate their arrow to point out (-45°). links nudge `translateX(4px)`.

**cards.** soft warm surface, 1px hairline border, `--shadow-sm` at rest → `--shadow-lg` on hover, large rounding. project cards carry a blurred tone-colored glow that fades in on hover. the contact card inverts to warm-dark.

**imagery vibe.** warm, soft, sunlit. nothing cold, high-contrast, or grey. avatars fall back to serif-italic initials on an apricot tint.

---

## iconography

- **system:** thin-stroke line icons drawn inline as SVG at `stroke-width: 2.2–2.4`, rounded caps + joins — matching [Lucide](https://lucide.dev). Used sparingly: a checkmark on the evidence card, an arrow on project cards, sun/moon in the theme toggle. For new icons, **use Lucide** (CDN or inline) at that stroke weight to stay consistent.
- **no emoji.** the brand never uses emoji as decoration or as iconography.
- **unicode:** the middot `·` is used as a typographic separator and the only "glyph" used decoratively. the terracotta period/dot after the wordmark (`avdeev.`) is a brand mark, not punctuation.
- **brand marks (in `assets/`):** `monogram.svg` (serif-italic `ga` on a terracotta gradient rounded square) and `favicon.svg` (16px-friendly variant). The wordmark `avdeev` is purely typographic — set Newsreader 500 with a terracotta `.` — not an image.

---

## index — what's in here

**foundations**
- `styles.css` — the entry point. link this. imports-only.
- `tokens/colors.css` — ramps + semantic aliases, light + warm dark.
- `tokens/typography.css` — families, fluid display scale, type roles.
- `tokens/fonts.css` — Google Fonts import + family vars.
- `tokens/spacing.css` — spacing, radii, warm shadows, motion easing.
- `tokens/base.css` — element defaults + brand utilities (`.av-grain`, `.av-glow`, `.av-blob`, `.av-card`).
- `cards/*.html` — 13 foundation specimen cards (Colors, Type, Spacing, Brand).

**components** (`window.AvdeevDesignSystem_a8f605.*`)
- `components/core/` — **Button, Tag, Stat, Card**
- `components/forms/` — **Input, ThemeToggle**
- `components/navigation/` — **PillNav, Avatar**

**ui kit**
- `ui_kits/portfolio/` — the full interactive portfolio (`index.html`): header, hero with parallax evidence card, about, project case studies, experience timeline, stack + marquee, warm-dark contact.

**assets**
- `assets/monogram.svg`, `assets/favicon.svg`

**meta**
- `SKILL.md` — makes this usable as a downloadable Agent Skill.

---

## caveats

- **fonts are Google-Fonts substitutions** — swap for real binaries to self-host.
- **project + experience copy is representative placeholder** matching the voice; replace with real history (firms, dates, links). GitHub `CodeAvd`, LinkedIn `in/grigoriiavdeev` are the real handles given.
- the hero's "3D" is CSS parallax, not WebGL — a real Three.js / R3F hero (per the Bruno Simon references) is the natural next step.
