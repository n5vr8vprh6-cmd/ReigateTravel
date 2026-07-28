# CLAUDE.md

Claude Code-specific notes for the Reigate Travel & Co. website.

**Read `AGENTS.md` first** — it is the shared operating contract (stack, commands, layout,
non-negotiable constraints, completion checks). This file only adds Claude-specific guidance.
Detailed strategy, copy, decisions, and QA live in `/docs`; do not duplicate them here.

## Working method

- Follow the source-of-truth order in `AGENTS.md`. Never edit the Brand Book, Charter, or Fable
  storyboard. Surface conflicts in `docs/decisions/source-conflicts.md` rather than resolving them silently.
- Prefer editing typed content in `src/content/*` over embedding copy in JSX.
- Build reusable components; do not grow `src/app/page.tsx` into one large component.
- Path-scoped rules live in `.claude/rules/`:
  - `brand-and-content.md` — voice, offer status, content safety (scope: `src/content/**`, `src/components/**`).
  - `accessibility.md` — WCAG 2.2 AA checklist (scope: `src/**`).
  - `frontend.md` — design tokens + anti-patterns (scope: `src/components/**`, `src/styles/**`).
  - `testing.md` — how to run and extend tests (scope: `tests/**`).

## Verifying changes

Run `npm run verify` for static checks, then `npm run build && npm run test:e2e` for browser
checks. When a change is visible in the browser, start the app and confirm it renders correctly and
has no console errors before reporting done — don't ask the user to check manually.

## Guardrails specific to this repo

- No deploy, push, branch changes, DNS, or external-account changes without explicit approval.
- No email provider is approved: never simulate a successful inquiry submission.
- Community section stays in **State B** (philosophy + Substack invitation) until a real event with
  full details is supplied. Never fabricate an event.
- Travel Notes renders a neutral Substack invitation until three approved articles exist. Never
  render placeholder article cards.
- Tyler's founder section uses the typographic fallback until an approved headshot is supplied.
  Never use AI imagery for Tyler.
