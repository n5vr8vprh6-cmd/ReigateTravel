# Terms of Service — drafting brief

**Status:** `/terms` is a holding page. Nothing has been drafted, and nothing should be published
until a real document exists. This file is a brief for whoever writes it — it is not a draft, and
none of it should be treated as legal advice.

## Why this is a brief and not a draft

The Privacy Policy arrived as a supplied document and shipped verbatim. Terms should get the same
treatment, for a sharper reason: a privacy policy mostly *describes* what a business does, while
terms of service *create obligations* between Reigate and the people reading them. Drafting those
here would mean inventing terms Reigate has not agreed to, on behalf of a business in a regulated
category, and publishing them as if binding. Wrong terms are worse than absent ones, because a
visitor can rely on them.

What follows is what a drafter needs to know about the site as built, plus the questions the
document has to answer. Everything in the first section is verifiable in this repository.

---

## What the website actually does today

Ground the document in this rather than a generic template. All of it is current as of 30 August
2026.

| Behaviour | Detail |
|---|---|
| Guided inquiry | Around 25 fields across six steps at `/begin-planning`. Submissions are emailed to Reigate via Resend and are **not** written to any database. |
| Consent | An explicit, never pre-ticked checkbox, referencing the Privacy Policy. |
| Payments | **None.** The site takes no payment, holds no card details, and has no checkout. |
| Accounts | **None.** There is no login, no user account, no stored profile. |
| Newsletter | A Substack invitation. Currently inert — the publication is not live (`missing-inputs` #9). |
| Events | Links out to a Luma calendar. Registration happens on Luma, under Luma's terms. |
| Measurement | Vercel Web Analytics: cookieless, aggregate, no visitor profiling. |
| Offers described | Bespoke Travel Planning is the only current service. Community Experiences and Curated Wellness Journeys are described as in development. |
| Content | Photography is licensed conceptual imagery, not documentary evidence of trips, clients or properties. |

## Questions the document needs to answer

Grouped roughly in the order a reader meets them. These are the questions, not the answers —
several depend on facts only Tyler and her advisors have.

### 1. Who the contract is with

- When a booking is made, is the contract between the client and Reigate, or between the client
  and the supplier (airline, hotel, tour operator) with Reigate acting as agent?
- How does Reigate's host agency relationship affect that? The Privacy Policy already references
  "Reigate's host agency" in §4, so the document should be consistent with it.
- What is Reigate's TICO registration number, and where must it be displayed? Registration is
  already named on the site as a credential; the terms are the usual place for the number itself.

### 2. Scope of the service

- What does a planning engagement include and exclude?
- Is there a planning fee, is it separate from the cost of travel, and is it refundable? This is
  the same gap as `missing-inputs` #3 and it blocks `/travel-planning` too.
- What is the client responsible for — passport validity, visas, entry requirements, health
  requirements, travel insurance?

### 3. Money

- Deposits, payment schedules, who payment is made to, and what happens to a payment made
  directly to a supplier.
- Cancellation and change: by the client, by Reigate, by a supplier.
- How refunds work when a supplier's own policy governs the outcome.

### 4. Liability

- What Reigate is and is not responsible for when an independent supplier fails to perform.
- Any limitation or cap, and whether it survives under Ontario consumer protection law.
- Force majeure.

### 5. Travel insurance

- Whether Reigate recommends it, offers it, or requires a declination in writing. Frequently a
  regulatory point rather than a commercial preference.

### 6. Website terms proper

- Acceptable use, and what happens to information submitted through the inquiry form.
- Ownership of site content and photography.
- Links to third-party sites and platforms — Luma and Substack specifically.
- No-warranty language for the website itself, as distinct from the travel services.

### 7. Housekeeping

- Governing law and forum. Ontario is the obvious answer; it should be stated rather than assumed.
- How changes to the terms are made and communicated.
- Effective date, matching the pattern the Privacy Policy set.
- A contact route. Note that `concierge@reigatetravel.co` still has **no MX records** and cannot
  receive mail — see `missing-inputs` T2. The Privacy Policy already publishes it as the privacy
  contact, so this is now two documents pointing at an address that does not yet work.

## What must not happen

- No invented TICO registration number, fee, cancellation window, or liability cap.
- No claim about insurance, bonding or consumer protection coverage that has not been confirmed.
  Charter §18 bars this, and the credentials on the site are limited to three approved strings for
  exactly this reason.
- `/terms` must not publish a draft dressed as a finished document. The current holding page is
  honest; a plausible-looking invented contract would not be.

## When the document arrives

Follow what the Privacy Policy did: transcribe it verbatim into `src/content/`, render it, add it
to the axe run in `tests/a11y/legal.a11y.spec.ts`, and close the `missing-inputs` row. Do not
edit, tighten or re-order the supplied text.
