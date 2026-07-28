# AGENTS.md — Reigate Travel & Co. Website

Shared operating contract for all coding agents (Claude Code, Codex). Keep it concise; the
detailed sources of truth live in `/docs`. Do not duplicate the Brand Book or Charter here.

## What this is

The Version 1 marketing website for Reigate Travel & Co. — a Lifestyle Wellness Travel company.
Brand idea: **"Travel is part of living well."** Commercial priority: **Bespoke Travel Planning**.

## Source of truth (in precedence order)

1. Brand Book — `docs/strategy/Reigate_Travel_Full_Brand_Book_v1.pdf` (strategy, voice, identity)
2. Website Charter — `docs/charter/Reigate_Travel_Website_Project_Charter_v1.pdf` (scope, architecture)
3. Fable homepage storyboard — `docs/wireframes/homepage-storyboard-v1.md` (homepage narrative)
4. Approved project metadata → `src/content/site.ts`
5. Logo/asset manifest — `docs/assets/asset-manifest.md`

Never edit the Brand Book, Charter, or Fable storyboard. On conflict, follow the higher source
and record it in `docs/decisions/source-conflicts.md`.

## Stack & commands

Next.js 15 (App Router, RSC by default) · React 19 · TypeScript · Tailwind CSS v4 · npm.

```bash
npm run dev            # local dev
npm run build          # production build (must pass)
npm run lint           # eslint
npm run typecheck      # tsc --noEmit
npm run format         # prettier --write
npm run test           # vitest unit tests
npm run test:e2e       # playwright (builds not required to be fresh; run `build` first)
npm run verify         # format:check + lint + typecheck + test + build
```

Playwright runs against `next start` on port 3100 (see `playwright.config.ts`); run `npm run build` first.

## Repository layout

- `src/app` — routes (RSC), `layout.tsx`, `robots.ts`, `sitemap.ts`, error/not-found/loading.
- `src/components` — `layout/`, `navigation/`, `ui/` (primitives), `content/` (section components).
- `src/content` — typed local content (`site.ts`, `home.ts`, `offers.ts`, `method.ts`, `navigation.ts`, `articles.ts`). No CMS.
- `src/lib` — `cn.ts`, `seo.ts`. `src/types` — shared content types. `src/styles/globals.css` — design tokens.
- `public/brand`, `public/images` — approved assets only. `docs/` — charter, strategy, decisions, qa, assets.
- `tests/` — `unit/` (vitest), `e2e/` + `a11y/` (playwright).

## Non-negotiable constraints

- **Offer status**: Bespoke Travel Planning = current; Community Experiences + Curated Wellness
  Journeys = in development; Concierge/Lifestyle = future. Never present future offers as current
  or give them visual weight equal to Bespoke. Always show status as visible **text**, not colour.
- **Content safety** (Charter §18): never invent testimonials, clients, credentials, partnerships,
  prices, dates, destinations, availability, scarcity, awards, health/transformation claims, or
  personal claims about Tyler. Missing facts → `docs/decisions/missing-inputs.md` with a neutral
  public fallback. The marker `[INPUT REQUIRED: …]` must NEVER render in the UI.
- **Credentials** — use exactly: `Certified TICO Travel Advisor`, `FORA Travel Advisor`, `WTA Member`.
  Do not expand "WTA", add numbers, or show certification logos.
- **Assets**: use approved source files only. Never redraw/recolour/crop/stretch the logo. AI
  imagery is conceptual/editorial only — never documentary proof, and never for Tyler.
- **Integrations**: read external URLs from `src/content/site.ts`; never hardcode/guess. No email
  provider is approved — do not simulate inquiry submission. Substack/Luma are the sources of truth
  for articles/events; do not rebuild them.
- **Accessibility**: WCAG 2.2 AA. Semantic landmarks, one H1, visible focus, keyboard-operable,
  reduced-motion honoured, meaningful alt text, no colour-only meaning. Review from 390px.
- **Design**: use the tokens in `src/styles/globals.css`. Ink/Olive body text on Ivory/White/Sand
  only; Copper/Taupe are accents. Avoid the anti-patterns in `.claude/rules/frontend.md`.

## Completion checks (before declaring work done)

1. `npm run verify` passes (format, lint, types, unit tests, build).
2. `npm run test:e2e` passes (smoke, links, a11y at 390/768/1440, keyboard, screenshots).
3. No console errors. Bespoke prioritized; future offers labelled; no unsupported claims/assets.
4. New decisions recorded in `docs/decisions/`; new missing facts in `missing-inputs.md`.
