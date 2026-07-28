---
description: How to run and extend tests
globs:
  - "tests/**"
---

# Testing Rules

## Layers

- **Unit** (`tests/unit`, Vitest + Testing Library): pure components and content invariants.
  Existing coverage: `StatusLabel`, `Button`, `OfferCard`/offer priority, content-safety
  (method stages, no fabricated articles, locked hero language, no leaked marker).
- **E2E / smoke** (`tests/e2e`, Playwright vs `next start`): homepage narrative + conversions,
  mobile-nav keyboard behaviour, internal-link resolution (no 404s), screenshots at 390/768/1440.
- **Accessibility** (`tests/a11y`, axe): 0 serious/critical violations at 390/768/1440.

## Commands

```bash
npm run test        # unit
npm run build       # required before e2e (Playwright runs next start on :3100)
npm run test:e2e    # e2e + a11y + screenshots
```

## Rules

- Never claim a test passed without running it.
- When adding UI, add or extend a test that proves the behaviour (especially offer status,
  content-safety, and accessibility).
- Assert offer-status text with `{ exact: true }` — page copy legitimately contains the phrase
  "in development" outside the status chips.
- Keep screenshots reviewed by eye, not just captured: check clipping, overflow, contrast, logo
  use, template/beige patterns, image crops, and whether future offers look current.
