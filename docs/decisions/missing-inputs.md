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
| 7 | ~~Approved email-delivery provider~~ **RESOLVED** - Resend (decision-log #54). What remains is operational rather than a content input: a Resend-verified sending domain plus the three env vars. | /begin-planning | Form renders only when `emailConfigured`; otherwise the approved mailto shell. **Still never simulated.** | Live delivery |
| 8 | Full `/about` biography beyond approved paragraphs; legal copy (Privacy, Terms, Accessibility statement) | Route shells | Shells render approved/neutral holding copy; legal pages state "content pending legal review". | Real page content |
| 9 | **A live Tyler Takes Off publication.** `tylertakesoff.substack.com` returns HTTP 404 (verified 2026-07-27) | Homepage §9 Travel Notes + §10 signup, footer Connect list, `/travel-notes` | `site.social.substack = null` → signup renders the "Ask about the community" mailto fallback, the footer link is filtered out, and `/travel-notes` hides its outbound button. The publication *name* is approved copy and still appears; only the dead link is suppressed. | Newsletter signup, Travel Notes link |

| 10 | **A secure record of submissions.** Charter 10 lists "preserve a secure record" as a success-path requirement. Not selected for this build, and therefore **not implemented and not simulated** - no database, no file write, no third-party store. | /begin-planning | Email is the only record. **Consequence, stated plainly: if a delivery fails after validation passes, that inquiry is gone.** The error state mitigates by keeping the answers on screen and handing the visitor the direct-email path, so they still have the data even when we do not. | Submission audit trail |
| 11 | **Investment ranges** (see also #3) | /begin-planning Investment step | The step asks an open question and offers no ranges. A unit test asserts the content file carries no currency figure and no numeric range, so a range cannot appear later by accident. | Structured investment select |
| 12 | **A real Privacy Policy.** /privacy still reads "content pending legal review", and the form takes consent that references it. | /begin-planning consent, /privacy | Consent copy states the substance inline - what is collected, that it is emailed to Tyler, and that it is not stored on this website, sold, or added to a mailing list - so consent is informed without the policy page. Every clause is true of the build as it stands. | **Public launch of the form** |

When any input arrives, update `src/content/site.ts` or the relevant `src/content/*` object and
remove the corresponding fallback; do not hardcode elsewhere.

## Open technical findings (not missing inputs)

| # | Finding | Impact | Status |
|---|---------|--------|--------|
| T1 | **The homepage renders only "Loading…" with JavaScript disabled.** `src/app/loading.tsx` puts the route behind a Suspense boundary, so the served HTML keeps the real content in a hidden template and relies on inline scripts to move it into `<main>`. Verified: with JS off, `<main>` contains only the fallback and the section content is present but zero-height. | Pre-existing, unrelated to the design pass. Google executes JS so the SEO risk is limited, but no-JS visitors, text-mode readers, and non-executing crawlers see nothing. | **Open — needs a decision, and now blocks more than it did.** The guided inquiry at /begin-planning is built to work without JavaScript (36 fields and `method="post"` are present in the served HTML), but the same Suspense boundary keeps it invisible, so the site's primary conversion is JS-only in practice. Confirmed inert: `src/app/page.tsx` and every file in `src/content/` contain zero `async`/`await`/`fetch`, and all routes are statically prerendered, so the boundary has nothing to wait for. Removing `src/app/loading.tsx` would let the fully static homepage prerender its content inline; the cost is losing the loading UI on client-side navigation. Not changed unilaterally: routing architecture is outside the scope of a design pass. |
