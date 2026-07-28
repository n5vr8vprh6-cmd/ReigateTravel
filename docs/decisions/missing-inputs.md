# Missing Inputs

Facts not yet supplied. Per content-safety rules these are **never invented** and the
`[INPUT REQUIRED: …]` marker is **never rendered in the public interface**. Each row lists the
neutral fallback shipped in Milestone 1.

| # | Missing input | Affects | Milestone 1 fallback (public-safe) | Blocks |
|---|---------------|---------|-------------------------------------|--------|
| 1 | Approved Tyler headshot photography | Founder feature (homepage §8, /about) | Olive typographic founder panel, no portrait. AI face prohibited. | Final visual polish |
| 2 | Three approved Travel Notes articles (title, summary, date, topic, per-article URL) | Homepage §9 Travel Notes | Neutral "New notes are on the way" holding copy; **no fabricated cards**, and no outbound promise while #9 is open. | Article grid |
| 3 | Fee / investment ranges & language | /travel-planning, /begin-planning | Homepage makes no fee claim; Bespoke section describes value, not price. | Pricing content |
| 4 | Confirmed Community Experience (name, date, location, description, expectations, Luma event URL) | Homepage §7 Community | State B: community philosophy + Substack invitation. Luma **calendar** link only; no event rendered. | State-A featured event |
| 5 | Approved OG / social share image | `opengraph-image`, Twitter card | Metadata structured; no fabricated OG image shipped. Favicon derived from approved symbol. | Social share preview |
| 6 | GitHub organization slug | Repo remote / push | Not needed for Milestone 1 (no push/deploy). Owner display name "Burnout Concierge Venture Studio" known. | Remote setup |
| 7 | Approved email-delivery provider | /begin-planning form submission | Form is a shell in M1; **no inquiry submission simulated**. | Working inquiry form |
| 8 | Full `/about` biography beyond approved paragraphs; legal copy (Privacy, Terms, Accessibility statement) | Route shells | Shells render approved/neutral holding copy; legal pages state "content pending legal review". | Real page content |
| 9 | **A live Tyler Takes Off publication.** `tylertakesoff.substack.com` returns HTTP 404 (verified 2026-07-27) | Homepage §9 Travel Notes + §10 signup, footer Connect list, `/travel-notes` | `site.social.substack = null` → signup renders the "Ask about the community" mailto fallback, the footer link is filtered out, and `/travel-notes` hides its outbound button. The publication *name* is approved copy and still appears; only the dead link is suppressed. | Newsletter signup, Travel Notes link |

When any input arrives, update `src/content/site.ts` or the relevant `src/content/*` object and
remove the corresponding fallback; do not hardcode elsewhere.

## Open technical findings (not missing inputs)

| # | Finding | Impact | Status |
|---|---------|--------|--------|
| T1 | **The homepage renders only "Loading…" with JavaScript disabled.** `src/app/loading.tsx` puts the route behind a Suspense boundary, so the served HTML keeps the real content in a hidden template and relies on inline scripts to move it into `<main>`. Verified: with JS off, `<main>` contains only the fallback and the section content is present but zero-height. | Pre-existing, unrelated to the design pass. Google executes JS so the SEO risk is limited, but no-JS visitors, text-mode readers, and non-executing crawlers see nothing. | **Open — needs a decision.** Removing `src/app/loading.tsx` would let the fully static homepage prerender its content inline; the cost is losing the loading UI on client-side navigation. Not changed unilaterally: routing architecture is outside the scope of a design pass. |
