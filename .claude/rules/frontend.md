---
description: Design tokens, component patterns, and anti-patterns
globs:
  - "src/components/**"
  - "src/styles/**"
  - "src/app/**"
---

# Frontend / Design Rules

## Tokens (source: `src/styles/globals.css` `@theme`)

- Palette: Ink `#1B1B1B`, Olive `#404639`, Taupe `#A79886`, Sand `#DCCFBE`, Ivory `#F6F2ED`,
  Copper `#C8906A`. Semantic roles: `surface` (Ivory), `surface-raised` (White),
  `surface-sand`, `surface-inverse` (Olive), `text` (Ink), `text-muted` (Olive), `accent` (Copper),
  `rule` (Taupe).
- Type: `font-display` (Cormorant Garamond, editorial headings only), `font-sans` (Montserrat,
  everything functional). Fluid sizes: `text-display`, `text-h2`, `text-h3`, `text-body-lg`,
  `text-body`, `text-eyebrow`.
- Use `Section` for bands (pick a `surface`), `Container` for width. Signature device: the
  `HorizonRule` and `Eyebrow` pair (an editorial rule/margin system). Never redraw the logo.

## Rhythm

Alternate Ivory / White / Sand bands; use the single Olive band for the final CTA + footer. Never
let every section become the same beige.

## Reusable primitives

`Button`, `TextLink`, `StatusLabel`, `EditorialImage`, `CTAPanel`, `Eyebrow`, `HorizonRule`,
`SectionIntro`, `OfferCard`, `ProcessSteps`, `FounderFeature`, `ArticleCard`, `NewsletterSignup`.
Compose pages from these — don't build oversized one-off page components.

## Ink tints — the measured floor

Two audits in a row reached for a tint that fails contrast, so the numbers live here now. Measured
Ink `#1B1B1B` over the surfaces it is used on:

| Tint     | On Ivory | On Sand | Use for                                                                                                           |
| -------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------- |
| `ink/55` | 3.73     | 3.39    | **Non-text only.** Clears SC 1.4.11's 3:1 for a control boundary; fails for text. This is the input-border value. |
| `ink/60` | 4.36     | 3.89    | **Nothing.** Looks safe and is not — it fails 1.4.3 on both surfaces.                                             |
| `ink/70` | 5.99     | 5.14    | The lightest tint safe for body text anywhere on the site.                                                        |

The two floors are not interchangeable: 3:1 governs a control's boundary, 4.5:1 governs the words.
Reaching for the border value to make text quieter is the specific mistake both times.

## Avoid (project anti-patterns)

generic luxury-agency styling · beige template sections · excessive/rounded card grids · heavy
shadows · decorative blobs · gradients (unless an approved source requires one) · oversized logos ·
centred body-copy paragraphs · gold-and-champagne clichés · spa/yoga stereotypes · influencer
styling · medical-wellness styling · gratuitous animation.

## Rendering

RSC by default; add `"use client"` only for interaction (e.g. `MobileNav`). Local images via
`next/image` with explicit sizes/ratios. Minimal third-party JS (the only embed is the Substack
signup, lazy-loaded).
