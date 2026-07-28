# Decision Log

Chronological record of implementation decisions for the Reigate Travel & Co. Version 1 website.
Source-of-truth order: Brand Book → Charter → Fable storyboard → project metadata → logo manifest
→ asset library → identity board.

## 2026-07-19 / 20 — Milestone 1 (Foundation + Homepage)

| # | Decision | Rationale | Source |
|---|----------|-----------|--------|
| 1 | Package manager: **npm** | Only manager present on the machine (npm 11.16.0, Node 26.3.1); no pnpm/yarn. Greenfield repo, so no lockfile to preserve. | Charter §14 "preserve existing package manager" |
| 2 | **Tailwind CSS v4** (CSS-first `@theme` tokens) | Current stable; CSS-first token model maps cleanly to the semantic design-token requirement. | User decision, this session |
| 3 | **Next.js 15 App Router**, React 19, RSC by default; Client Components only for the mobile-nav disclosure | Charter-mandated architecture; minimizes client JS. | Charter §14 |
| 4 | Vendor Charter + Brand Book PDFs into `docs/charter` and `docs/strategy`; `git init` | Self-contained, version-controlled repo. No commits/pushes without separate approval. | User decision, this session |
| 5 | All four external integrations treated as **confirmed & live** (Substack, Luma, Instagram, LinkedIn) | User supplied and re-confirmed the URLs in conversation. See `source-conflicts.md` #1. | User decision |
| 6 | **Route shells** created for every Charter sitemap route | Keeps header/footer nav coherent and internal-link checks green without fabricating page content. Real content is later-milestone work. | Charter §8 sitemap |
| 7 | Community homepage section renders **State B** (philosophy + Tyler Takes Off invitation) | No Community Experience is confirmed; the storyboard's State-A event must never be fabricated. | Storyboard §5; Charter §4 |
| 8 | Travel Notes renders a **neutral Substack invitation, zero fabricated cards** | Three approved articles not yet supplied; content-safety rules forbid inventing article titles/summaries. | Charter §18; storyboard §9 |
| 9 | Founder feature uses an **Olive typographic fallback**, no portrait | No approved Tyler headshot; AI imagery is prohibited for Tyler. | Storyboard §8; project rules §3 |
| 10 | Hero CTA order: **Begin Planning primary / Explore Reigate secondary** | Charter governs website conversion hierarchy over the Brand Book Core Copy System variant. See `source-conflicts.md` #2. | Charter §9 |
| 11 | Signature design device: **editorial rule-and-margin system** with one restrained SVG horizon divider (independent of the logo) | Grounded in the Brand Book "travel journal / cultural publication" reference and horizon/wave motif; avoids generic-luxury and beige-template anti-patterns. Logo never redrawn. | Brand Book ch. 37, 43; §8 project brief |
| 12 | Favicon derived from approved symbol `11 - Full-colour transparent symbol.png`; **no fabricated OG share image** | Favicon resize of an approved asset is permitted; a bespoke OG image is deferred to a visual gate. | Logo manifest; Charter §14 |
| 13 | Production domain **reigatetravel.co** (not `.com`) | Approved project metadata governs factual company info over the Charter's `.com` sketch. See `source-conflicts.md` #3. | Project metadata |

## 2026-07-27 — Design quality pass (homepage)

Audit run against the shipped homepage using the Impeccable and UI-UX Pro Max checklists, with
contrast measured on **composited pixels** (photograph + scrim + text alpha), not token values.
Architecture unchanged: the same eleven storyboard sections, in the same order, with the same copy.

| # | Decision | Rationale | Source |
|---|----------|-----------|--------|
| 14 | Headings on an inverse surface inherit **Ivory** via `[data-surface="inverse"] :is(h1..h4)` in `globals.css`; `CTAPanel` also sets it explicitly | The base layer sets `color: Ink` on all headings, which beat the section's `text-ivory` and rendered the final CTA headline at **1.77:1** — the page's most important conversion element was effectively unreadable. Fixed at the system level so the class of bug cannot recur, not just at the one call site. Guarded by `tests/e2e/contrast.spec.ts`. | WCAG 2.2 AA 1.4.3 |
| 15 | Reigate Method numerals switch **Copper → Olive**; layout goes 1-col → 5-col at `lg` | Copper `#c8906a` on white is **2.74:1**, under the 3:1 floor for large text, and the numeral is the only visual carrier of sequence for sighted users — so it is meaning, not decoration, and Copper is barred from carrying meaning. Five items in a 3- or 2-column grid also left a ragged trailing cell; five columns render the sequence as a sequence. | WCAG 2.2 AA 1.4.3; `frontend.md` palette roles |
| 16 | Eyebrows cut from **9 rendered to 2** (hero, Method) | The eyebrow is documented as a *signature device*; on every section it is scaffolding rather than voice, and several were pure restatement — "Travel Notes" above a "Travel Notes" heading, "Meet Tyler" above a "Meet Tyler" button. Kept where the label carries information the heading does not: the brand category, and the name of a proprietary method. | `frontend.md` signature device; Impeccable absolute bans |
| 17 | Homepage bands alternate **Ivory / Sand**; White retained for raised surfaces only | Ivory→White is a ~3% luminance step and read as no transition at all, so ten of eleven sections landed as one beige field. See `source-conflicts.md` #4. | `frontend.md` "never the same beige" |
| 18 | Hero becomes a **full-bleed photograph** with a fixed contrast scrim | This is an image-led travel brand and the photography is its strongest asset; the split text/image panel was the category-default composition. The scrim holds ≥0.74 alpha across the full copy block, so legibility never depends on the photograph — measured at **5.29:1 worst case** across 390/768/1440. | Brand register (image-led briefs); WCAG 2.2 AA |
| 19 | Recognition list goes single-column; per-item `HorizonRule` removed | Five items in two columns left a ragged empty cell, and the signature rule appeared six times in one section, which spends it. Hairline rules alone carry the index rhythm. | `frontend.md` signature device |
| 20 | Motion: **one hero entrance, no scroll reveals** | A staggered CSS entrance on load, never gated behind an observer, so the page renders identically headless, on hidden tabs, and with JS off. Per-section scroll reveals are the uniform reflex the brand register warns against. `prefers-reduced-motion` now also collapses `animation-delay`, without which a `both`-filled stagger held its from-state and flashed blank content. | Impeccable motion rules; WCAG 2.2 AA 2.3.3 |
| 21 | `site.social.substack` set to **`null`** | The URL returns HTTP 404; the signup iframe rendered as an empty white rectangle and three links pointed at a dead destination. See `source-conflicts.md` #1 and `missing-inputs.md` #9. | Charter §18 content safety |

## 2026-07-27 — Spacing + motion pass

| # | Decision | Rationale | Source |
|---|----------|-----------|--------|
| 22 | **Design tokens must be consumed as `var(--token)`** inside Tailwind arbitrary values, never as a bare custom-property name | In Tailwind v4 the bare bracket form is a *literal* arbitrary value and emits a declaration whose value is the property name — invalid CSS, dropped silently with no error or warning. Six tokens were dead in production: every section rendered at **0px** vertical padding, `--container-content` never capped content (1425px at a 1440 viewport), the header collapsed to 48.75px against a mobile nav panel that assumed 4.5rem, and button/link transitions were 0s. Also broke `scroll-mt` on `#join`, so that anchor landed under the sticky header. Fixed in 7 usages across 6 files and pinned by `tests/e2e/tokens.spec.ts`. | Tailwind v4 arbitrary-value syntax; WCAG 2.2 AA 2.4.11 (focus not obscured) |
| 23 | Section rhythm raised to `clamp(4.5rem, 3rem + 5vw, 9rem)`, plus a `size="lg"` variant at `clamp(6rem, 4rem + 6vw, 12rem)` | 72px mobile / 120px desktop, with the opening and closing bands at 96/150px so spacing varies for rhythm instead of being uniform. The brand character is "spacious, editorial"; the previous scale was never actually visible because of #22. | `frontend.md` design character |
| 24 | Scroll reveals are **transform-only and never animate opacity** | The first implementation faded 0 → 1 and had two measured failure modes that both shipped blank content: arming the hidden state made copy visibly fade *out* after load (caught at opacity 0.046), and a missed IntersectionObserver callback left elements at opacity 0 permanently — three of four reveals were still invisible after a full scroll-through. Transform-only makes the worst case "readable but offset by 1.5rem" instead of "invisible", and a 6s safety timer settles anything the observer misses. Applied to 4 moments, not all 11 sections. Pinned by `tests/e2e/reveal.spec.ts`. | Impeccable motion rules; `frontend.md` (no gratuitous animation) |
| 25 | **No AI-generated video** on the site (Kling or otherwise), despite it being requested | AI imagery is approved as "conceptual/editorial only — never documentary proof". A still of a woman on a cliff reads as mood; video of her reads as footage of a real client on a real trip, which is exactly the claim Charter §18 forbids. Secondary: images ship as 24–64KB AVIF today and a hero video loop is 1–5MB. Motion is CSS-only, no new dependencies. | Charter §18; project asset rules |
