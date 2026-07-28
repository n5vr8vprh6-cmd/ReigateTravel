---
description: WCAG 2.2 AA requirements for all UI
globs:
  - "src/**"
---

# Accessibility Rules (target: WCAG 2.2 AA)

- **Structure**: semantic landmarks (`header`/`nav`/`main`/`footer`); exactly one `<h1>` per page
  (the homepage H1 lives in the hero); no skipped heading levels; sections use `aria-labelledby`
  or `aria-label`.
- **Keyboard**: everything operable by keyboard; visible focus (global `:focus-visible` outline in
  `globals.css`); logical tab order = DOM order; the skip link is first; the mobile menu closes on
  Escape and returns focus to its toggle.
- **Colour & contrast**: body text is Ink or Olive on Ivory/White/Sand only. Copper/Taupe never
  carry body text or status meaning. Never communicate meaning by colour alone — pair with text.
- **Targets**: interactive controls ≥ 44px. Links are descriptive (no bare "learn more").
- **Images**: meaningful `alt` when the image conveys content; empty `alt=""` for decorative. No
  essential text baked into an image.
- **Motion**: honour `prefers-reduced-motion` (handled globally). No coherence should depend on animation.
- **External links**: `rel="noopener noreferrer"`, and announce new-tab behaviour to screen readers.
- **Forms**: visible `<label>`; errors as text associated via `aria-describedby`.
- **Review** from 390px upward. Automated check: `tests/a11y` (axe) must report 0 serious/critical
  at 390/768/1440.
