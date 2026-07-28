# Reigate Travel & Co. — Website

The Version 1 marketing website for **Reigate Travel & Co.**, a Lifestyle Wellness Travel company.

> Travel is part of living well.

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · deployed on Vercel.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Command             | Purpose                                                           |
| ------------------- | ----------------------------------------------------------------- |
| `npm run dev`       | Local development server                                          |
| `npm run build`     | Production build                                                  |
| `npm run start`     | Serve the production build                                        |
| `npm run lint`      | ESLint                                                            |
| `npm run typecheck` | TypeScript (`tsc --noEmit`)                                       |
| `npm run format`    | Prettier (write)                                                  |
| `npm run test`      | Vitest unit tests                                                 |
| `npm run test:e2e`  | Playwright smoke + a11y + screenshots (run `npm run build` first) |
| `npm run verify`    | format:check + lint + typecheck + unit tests + build              |

## Verifying the site

```bash
npm run verify                 # static checks + unit tests + build
npm run build && npm run test:e2e   # browser smoke, internal-link, a11y (390/768/1440), screenshots
```

Playwright serves the production build on port 3100. Homepage screenshots are written to
`tests/screenshots/`.

## Project structure

- `src/app` — routes (React Server Components), root layout, `robots.ts`, `sitemap.ts`.
- `src/components` — `layout/`, `navigation/`, `ui/` (primitives), `content/` (section components).
- `src/content` — typed local content (no CMS). Business facts + integration URLs in `site.ts`.
- `src/styles/globals.css` — design tokens (palette, type, spacing, motion).
- `docs/` — Charter, Brand Book, decisions, QA reports, asset manifest.
- `AGENTS.md` / `CLAUDE.md` / `.claude/rules/` — operating instructions for coding agents.

## Environment

Copy `.env.example` → `.env.local`. Indexing is disabled unless
`NEXT_PUBLIC_ALLOW_INDEXING=true` (set only on the approved production deployment), which keeps
preview deployments out of search results.

## Governance

The approved Brand Book (`docs/strategy`), Website Charter (`docs/charter`), and Fable homepage
storyboard (`docs/wireframes`) govern this build and are never edited here. See
`docs/decisions/` for the decision log, resolved source conflicts, and outstanding inputs.
