# Asset Manifest

All imagery is Midjourney-generated, supplied via the approved project library, cleared for
commercial use, and used strictly as **conceptual / editorial** brand imagery — never as
documentary evidence of a client, trip, event, partnership, property, supplier, or Tyler's
personal experience. Logos are used from approved source files only: never redrawn, recoloured
outside approved variants, cropped, stretched, or effect-laden.

## Logos → `public/brand/`

| File (repo) | Source file | Role | Approval | Dimensions | Alt-text requirement |
|---|---|---|---|---|---|
| `reigate-primary.png` | `06 - Transparent primary logo.png` | Header wordmark (light backgrounds) | Approved | 1000×1000 (transparent) | "Reigate Travel & Co." |
| `reigate-circular.png` | `10 - Transparent circular logo.png` | Header fallback for tight widths | Approved | 1000×1000 (transparent) | "Reigate Travel & Co." |
| `reigate-symbol.png` | `11 - Full-colour transparent symbol.png` | Favicon / app icon source | Approved | 1000×1000 (transparent) | decorative (empty alt) |
| `reigate-symbol-white.png` | `13 - White transparent symbol for dark backgrounds.png` | Symbol on Olive footer/CTA | Approved | 1000×1000 (transparent) | decorative (empty alt) |

## Homepage imagery → `public/images/`

| File (repo) | Homepage use | Approval | Dimensions | Alt text (factual, non-documentary) |
|---|---|---|---|---|
| `hero-coast.png` | §1 Hero | Approved (editorial) | 1344×896 | "A woman sits alone on a stone wall overlooking a calm coastline in soft light." |
| `arched-doorway.png` | §2 Clear explanation | Approved (editorial) | 960×1200 | "A view through an arched stone doorway toward a sunlit courtyard." |
| `two-women-walking.png` | §3 Audience recognition (desktop only) | Approved (editorial) | 1344×896 | "Two women walk slowly along a quiet street in conversation." |
| `travel-journal.png` | §4 Bespoke Travel Planning | Approved (editorial) | 1344×896 | "An open travel journal with blank cream pages beside a cup of coffee." |
| `boutique-room.png` | §6 Ecosystem — Bespoke card | Approved (editorial) | 1344×896 | "A boutique hotel room prepared with understated care." |
| `bronte-harbour.png` | §6 Ecosystem — Community card | Approved (editorial) | 1456×816 | "Bronte Harbour in Oakville on a clear day." |
| `group-walking.png` | §6 Ecosystem — Journeys card | Approved (editorial) | 1456×816 | "A small group of women walks along a scenic coastal path." |
| `oakville-horizon.png` | §7 Community (State B) | Approved (editorial) | 1680×720 | "The Lake Ontario horizon seen from the Oakville waterfront." |
| `botanical-shadow.png` | §10 Newsletter (background texture) | Approved (editorial) | 1344×896 | decorative (empty alt) |

## Founder portrait → `public/images/`

The only photograph on the site of a real, identified person. It sits apart from the table above
because the rules differ: the editorial imagery is Midjourney-generated and conceptual, and its
alt text describes a scene without identifying anyone. This one is a real portrait, so its alt
names the person.

| File (repo) | Use | Approval | Dimensions | Alt text |
|---|---|---|---|---|
| `tyler-portrait.jpg` | Homepage §8 founder feature | Client-supplied; confirmed cleared for commercial use | 800x800 | "Tyler, founder of Reigate Travel & Co." |

**AI imagery for Tyler remains prohibited.** Supplying a real headshot closes the missing input;
it does not relax that rule. If this photograph is ever withdrawn, revert to the Olive
typographic panel rather than substituting anything generated.

## Scroll sequences → `public/images/`

Vertical sprite strips: every frame of a short clip stacked into one image, stepped one frame at
a time by a scroll timeline. No video ships with the site. Each strip's source still stays in
`public/images/` as the frame-0 image and as the fallback wherever the animation does not run.

| Strip | Source still | Homepage use | Frames | Frame size | Approval |
|---|---|---|---|---|---|
| `stairs-sequence.jpg` | `arched-doorway.png` | §2 Clear explanation | 24 | 512×640 | Approved (editorial) |
| `sailboat-sequence.jpg` | `oakville-horizon.png` | §7 Community | 20 | 1024×574 | Approved (editorial) |
| `coastline-sequence.jpg` | `mediterranean-coastline.png` | Interlude after §4 | 24 | 1024×576 | Approved (editorial) |

Generated with Kling from the approved still, then extracted with
`scripts/extract-sequence.mjs`. Alt text follows the source still, and is empty where the strip
is decorative — the coastline interlude carries no information the surrounding copy depends on.

The frame count is not free: `steps()` cannot take a custom property, so `globals.css` keys the
step count off a `data-frames` attribute and only 20 and 24 have rules. A strip with any other
count silently does not step.

## Fonts

| Family | Role | Source | Loading |
|---|---|---|---|
| Cormorant Garamond | Editorial headings / statements | Google Fonts | `next/font/google`, `display: swap`, subset latin |
| Montserrat | Body, navigation, labels, buttons, forms | Google Fonts | `next/font/google`, `display: swap`, subset latin |

## Notes / flags

- Vector logo masters remain a production need (PNG-only pack is sufficient for web launch).
- Header logo choice (`reigate-primary` vs `reigate-circular`) to be confirmed at the visual gate
  after reviewing rendered header height; both are approved variants.
- Full 78-image library is available but only the nine files above are imported to control weight.
