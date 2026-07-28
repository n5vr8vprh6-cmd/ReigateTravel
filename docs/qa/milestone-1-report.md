# Milestone 1 — QA Report

**Scope:** Repository foundation + global website system + approved homepage.
**Date:** 2026-07-20 · **Stack:** Next.js 15.5 (App Router) · React 19 · TypeScript · Tailwind v4 · npm.
**Result:** ✅ Complete — all acceptance criteria met.

## Commands run & results

| Command | Result |
|---|---|
| `npm install` | 473 packages, 0 vulnerabilities blocking. sharp + esbuild native binaries verified working. |
| `npm run format:check` (prettier) | ✅ All files match Prettier style. |
| `npm run lint` (eslint / next core-web-vitals + typescript) | ✅ No warnings or errors. |
| `npm run typecheck` (`tsc --noEmit`) | ✅ Exit 0, no type errors. |
| `npm run test` (Vitest) | ✅ 4 files, **11/11 unit tests pass**. |
| `npm run build` (`next build`) | ✅ Compiled successfully. **19 routes, all static (○)**. Homepage 111 kB First Load JS; shared 102 kB. |
| `npm run test:e2e` (Playwright vs `next start`) | ✅ **28/28 pass** as of 2026-07-27 (smoke, links, a11y ×3 widths, keyboard, screenshots, contrast, design tokens, scroll reveals). Was 14/14 at Milestone 1. |
| Live console check (`next start`, in-app browser) | ✅ No console errors, no failed requests at 390/768/1440. |

> **Build hazard:** `npm run build` overwrites `.next` beneath a running `npm run dev`, which
> silently breaks the dev server's CSS and JS chunks (they 400). A stale `next start` process left
> running across a rebuild fails the same way. Both produced misleading verification results during
> this work — restart the server after any build, and prefer letting Playwright manage its own.

### Unit tests (Vitest)
- `StatusLabel` — renders "Available now" / "In development" as visible text (not colour-only).
- `Button` — internal link href + label; `accessibleLabel` becomes the accessible name; external
  links get `target=_blank` + `rel="noopener noreferrer"`.
- `OfferCard` / offers — Bespoke is the single `available` + `primary` offer; the rest are
  `in-development` + `secondary` (priority is unambiguous).
- Content safety — exact Reigate Method stages in order; zero fabricated Travel Notes articles;
  locked hero language intact; no `INPUT REQUIRED` marker anywhere in homepage content.

### E2E / accessibility (Playwright + axe)
- One `<h1>` = "Travel is part of living well."; hero has Begin Planning (primary) + Explore Reigate.
- Offer status: "Available now" present; exactly two "In development" chips; Bespoke heading present.
- Reigate Method renders Listen → Define → Curate → Support → Remember in order.
- Final CTA heading verbatim + Begin Planning / Join the Community.
- No `INPUT REQUIRED` text in rendered DOM.
- Mobile nav (390px): opens, Escape closes and returns focus to the toggle.
- All internal homepage links resolve to HTTP 200 (no dangling routes).
- **axe: 0 serious/critical violations at 390 / 768 / 1440px.**

## Screenshots reviewed (`tests/screenshots/`)

Reviewed `home-390.png`, `home-768.png`, `home-1440.png` for clipping, overflow, contrast,
logo use, template/beige patterns, image crops, and whether future offers read as current.

> **Superseded 2026-07-27.** The original review below called the page "spacious" and credited an
> Ivory/White/Sand rhythm. Both claims were wrong, and by-eye review is why they survived: a
> Tailwind v4 syntax defect meant every section rendered at **0px** vertical padding, and the
> Ivory→White transition is a ~3% luminance step that is not actually visible. Silent CSS failures
> are invisible to screenshot review — this is the reason `tests/e2e/tokens.spec.ts` now asserts
> computed values. See `decision-log.md` #22 and `source-conflicts.md` #4.

Current state (measured, production build, 2026-07-27):

- **1440px** — 11 sections; padding 120px (150px on the opening and closing bands); content capped
  at 1152px; page height 8240px; no horizontal overflow. Full-bleed photographic hero with a
  measured worst-case text contrast of 6.26:1 over the photograph.
- **768px** — padding 86/110px; container 768px; page 9906px; no overflow.
- **390px** — padding 72/96px; page 10352px; no overflow. Hero worst-case contrast 5.20:1.
- All four scroll reveals settle to `transform: none` at opacity 1 at every width; no element a
  reveal wraps ever drops below opacity 1 (decorative `opacity-70` on one HorizonRule aside).

**Issues found during review and fixed:** (1) the three ecosystem cards initially read as roughly
equal weight → restructured to a full-width primary card + two quieter text-only cards; (2) the
recognition grid left an awkward empty framed cell → changed to a hairline editorial index; (3) the
final CTA headline rendered Ink on Olive at 1.77:1 → fixed at the base layer; (4) six design tokens
were emitting invalid CSS and doing nothing → fixed and pinned by tests. All re-verified.

## Acceptance criteria

| Criterion | Status |
|---|---|
| Production build succeeds | ✅ |
| Lint + type checking pass | ✅ |
| Homepage works at mobile + desktop widths | ✅ (390/768/1440) |
| Navigation keyboard accessible | ✅ (skip link, desktop + mobile nav, Escape/focus return) |
| No obvious console errors | ✅ |
| Locked brand idea + promise intact | ✅ |
| Bespoke Travel Planning clearly prioritized | ✅ |
| Future services accurately labelled | ✅ ("In development", quieter treatment) |
| No unsupported claims/proof added | ✅ (no testimonials, prices, events, credentials beyond approved) |
| Only approved assets used | ✅ (9 images + 4 logos from the approved library; manifest recorded) |
| Follows the Fable narrative | ✅ (all 11 sections in order) |
| Missing info recorded internally | ✅ (`docs/decisions/missing-inputs.md`) |
| Docs explain how to run/verify | ✅ (`README.md`, `AGENTS.md`) |
| This QA report exists | ✅ |

## Limitations / deferred (later milestones)

- Guided inquiry form + secure email delivery (no provider approved; **no submission simulated**).
- Real content for route shells (`/travel-planning`, `/about`, etc. are accessible holding shells).
- Real Tyler headshot (founder section uses the Olive typographic fallback).
- Three approved Travel Notes articles (section shows a neutral Substack invitation, no fake cards).
- Fee / investment language; confirmed Community Experience (State B until then).
- OG share image; GitHub org slug; deployment/DNS.

## Remaining inputs

See `docs/decisions/missing-inputs.md`. Blocking-for-later, not for Milestone 1.

## How to review locally

```bash
npm install
npm run build && npm run start   # http://localhost:3000
# or full verification:
npm run verify && npm run build && npm run test:e2e
```
