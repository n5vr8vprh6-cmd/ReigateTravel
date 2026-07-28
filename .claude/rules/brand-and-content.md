---
description: Brand voice, offer status, and content-safety rules
globs:
  - "src/content/**"
  - "src/components/**"
  - "src/app/**"
---

# Brand & Content Rules

## Voice

Warm, clear, thoughtful, personal, grounded, optimistic, quietly confident. Specific over
superlative. Avoid: manufactured urgency, fake exclusivity, vague luxury language, wellness
clichés, spa/yoga stereotypes, influencer tone, "book now" for consultative services.

## Offer status (must stay accurate)

- **Current**: Bespoke Travel Planning — the commercial priority. Give it the most weight.
- **In development**: Community Experiences, Curated Wellness Journeys — always labelled, never
  equal in prominence to Bespoke.
- **Future direction**: Concierge Travel, Lifestyle Travel — mention only within the broader story;
  never as bookable offers.

Status is shown as visible **text** (`StatusLabel`), never by colour alone.

## Content safety (Charter §18 — never invent)

testimonials · client stories · credentials · affiliations · partnerships · supplier relationships
· destination expertise · travel volume · event attendance/history · prices · journey dates ·
confirmed properties · availability · scarcity · awards · health/transformation outcomes · personal
claims about Tyler.

When a fact is missing: omit the element, use an approved neutral fallback, disable the external
link, and record it in `docs/decisions/missing-inputs.md`. The marker `[INPUT REQUIRED: …]` may
appear only in `/docs` and code comments — **never in rendered output**.

## Approved specifics

- Credentials, verbatim: `Certified TICO Travel Advisor`, `FORA Travel Advisor`, `WTA Member`.
- Endline `Experiences That Stay With You.` — used sparingly (currently once, in the final CTA).
  Never decoratively repeated, never replacing the brand promise.
- Community section = State B (philosophy + Substack invitation) until a real event exists.
- Travel Notes = neutral Substack invitation until approved articles exist (no placeholder cards).
