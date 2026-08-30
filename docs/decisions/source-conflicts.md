# Source Conflicts

Conflicts between governing sources, resolved per the source-of-truth order
(Brand Book → Charter → Fable storyboard → project metadata → logo manifest → assets → identity board).
The approved Brand Book, Charter, and Fable storyboard files are **never edited** to resolve a conflict.

## 1 — Substack / integration URLs: "unconfirmed" vs. supplied

- **Conflict.** The Milestone 1 build brief (§3) states the Substack URL is "not yet confirmed" and
  must not be constructed or guessed. However, earlier in the same working session the user directly
  supplied and re-confirmed: Substack `https://tylertakesoff.substack.com`, Luma calendar
  `https://luma.com/reigatetravelco`, Instagram `https://www.instagram.com/reigatetravel.co/`,
  LinkedIn `https://ca.linkedin.com/in/tyler-reigate-13b3aa2b2`.
- **Resolution (Milestone 1).** A direct, current user instruction overrides templated brief
  boilerplate. All four URLs were treated as **confirmed and live** in Milestone 1 (confirmed again
  via AskUserQuestion). They live in the typed config `src/content/site.ts` so a single edit reverts
  them to placeholders if that ever changes.
- **Superseded 2026-07-27.** `https://tylertakesoff.substack.com` was verified during the design
  pass and returns **HTTP 404** at both `/` and `/embed`; the publication is not live. The homepage
  therefore rendered the Substack signup iframe as an empty white rectangle (the frame load failed,
  and the redirect to the publication root was blocked by Substack's own `frame-ancestors` CSP),
  and three separate links pointed at a dead URL. Per the content-safety rule that an unverified
  destination is **disabled rather than linked**, `social.substack` is now `null`, which activates
  the neutral fallbacks already coded into `NewsletterSignup`, `Footer`, and `/travel-notes`.
  A user instruction confirms a URL's *intent*, not its *availability* — availability is verifiable
  and was verified. Restore the URL in `src/content/site.ts` once the publication is published; no
  other file needs to change. Luma, Instagram, and LinkedIn are unaffected by this entry.

## 2 — Hero primary CTA: Brand Book vs. Charter

- **Conflict.** The Brand Book Core Copy System (ch. 36) lists **"Explore Reigate"** as the homepage
  hero's *primary* action with "Begin planning" secondary. The Charter (§9) assigns **"Begin
  Planning"** primary and "Explore Reigate" secondary.
- **Resolution.** The Charter governs website scope and conversion hierarchy and was itself
  reconciled against the approved Brand Book. Begin Planning is the primary hero CTA; Explore Reigate
  is secondary. The Fable storyboard already records and applies this.

## 3 — Production domain: `.com` vs `.co`

- **Conflict.** The Charter (§11) sketches `reigatetravel.com`; approved project metadata specifies
  `https://www.reigatetravel.co`.
- **Resolution.** Approved project metadata governs factual company information. The site targets
  **reigatetravel.co** (`metadataBase`, canonical URLs, JSON-LD). The Charter's `notes.`/`journal.`
  Substack subdomain suggestion is moot: the publication lives at `tylertakesoff.substack.com`.

## 4 — Band rhythm: "alternate Ivory / White / Sand" vs. "never the same beige"

- **Conflict.** `.claude/rules/frontend.md` prescribes alternating **Ivory / White / Sand** bands
  with a single Olive band for the final CTA, and in the same paragraph forbids letting "every
  section become the same beige". In practice the two clauses contradict each other: Ivory
  (`#f6f2ed`) and White (`#ffffff`) differ by roughly 3% relative luminance, so an Ivory→White
  transition is invisible. The homepage alternated correctly on paper while reading as one
  continuous warm field across ten of eleven sections — the exact outcome the second clause forbids.
- **Resolution (2026-07-27).** The intent clause governs over the mechanism clause. The homepage
  now alternates **Ivory / Sand** (a ~20% luminance step, legible at every transition), opens on a
  full-bleed photographic hero, and closes on the single Olive band as prescribed. **White is not
  retired** — it keeps its real role as `surface-raised` for cards and form fields that need to lift
  off a band, which is where a 3% step is an asset rather than a defect. No palette value changed;
  only which role each token plays at band level.

## 5 — Offer-status labels: client direction vs. the stated non-negotiable

- **Conflict.** `AGENTS.md` lists under non-negotiable constraints: *"Always show status as visible
  **text**, not colour"*, and `.claude/rules/brand-and-content.md` names `StatusLabel` as the
  mechanism. On 2026-07-28 the client directed that the "Available now" / "In development" chips be
  removed, on the design grounds that the boxed treatment looked cheap. The concern was raised
  explicitly — including that it breaks five test assertions and risks in-development offers reading
  as bookable — and the client reaffirmed the decision.
- **Resolution.** The chips are removed. Client direction governs their own site, and the residual
  risk is smaller than it first appears because **status is still stated in prose**: homepage
  section 2 carries the approved sentence *"Bespoke Travel Planning is available now. Community
  Experiences and Curated Wellness Journeys are in development."* That sentence is now load-bearing
  and is pinned by a test (`tests/e2e/homepage.spec.ts`), so it cannot be edited away silently.
- **What still enforces the rule's intent.** The `status` field remains in the data model and still
  drives `emphasis`; the current offer is the only one rendered with photography and a wide card,
  the two in-development offers stay text-only and quieter. Both the unit and e2e suites now assert
  that hierarchy directly rather than asserting the presence of a chip.
- **To reverse:** restore `StatusLabel`, re-add it to `OfferCard` and the Bespoke section. The
  `status` values never changed, so nothing else needs to move.

## 6 — Two photographic interludes vs. the 11-section Fable storyboard

- **Conflict.** The Fable storyboard defines eleven homepage sections and the build has followed it
  exactly. This pass inserts two full-bleed photographic interludes — after the Bespoke act and
  after the founder act — which are not in the storyboard.
- **Resolution.** They carry **no copy, no CTA and nothing to read**, so they add no claim, no
  content-safety surface, and nothing to approve; they exist purely to change tempo. All eleven
  approved sections remain present, in order, with their copy untouched. The storyboard governs the
  *narrative sequence*, and the narrative sequence is unchanged — an interlude is a pause between
  beats, not a beat. Measured justification: before this pass every section sat between 0.72 and 1.2
  viewports tall, which is why three prior passes of type, colour and motion work failed to register
  as anything other than flat.
- **To reverse:** delete the two `<Interlude>` calls in `src/app/page.tsx`. Nothing else depends on
  them; the two images can stay in `public/images/` unused or be removed.

## 7 — Rate limiting: a required control vs. the approved architecture

- **Conflict.** Charter 13 lists **rate limiting** among the required controls for inquiry
  delivery. Charter 14 mandates a Vercel serverless deployment. On serverless there is no shared
  memory between instances, so the usual in-process limiter cannot actually enforce a limit: Vercel
  runs many instances across regions and recycles them on cold start.
- **What shipped.** Layered, bounded, best-effort controls in `src/lib/forms/rate-limit.ts` and
  `src/lib/forms/spam.ts`: a honeypot, a minimum time-to-submit, two per-client sliding windows
  (3 per 15 minutes, 10 per 24 hours) keyed by a salted hash of the forwarding address, and a
  global cap of 40 sends per instance per hour so any bypass has a bounded blast radius. Resend's
  own 10 requests/second is a further backstop.
- **What this does not do, stated plainly.** The windows live in one instance's memory. An attacker
  who bursts, or whose requests simply land on fresh instances, walks through them. This is a speed
  bump against naive repetition, not a control against a determined attacker. It is described that
  way in the module's own header comment so nobody later mistakes it for enforcement.
- **Why not a shared store.** Upstash has a REST API, so it would cost no dependency. What it costs
  is infrastructure: an account, a fourth secret, and a service that can be down — at which point
  the choice is fail-open, losing the control, or fail-closed, losing real inquiries. For a form
  that has not yet received a submission, that is premature.
- **Escalation path, documented rather than built.** If abuse appears, the better answer is a Vercel
  Firewall rate-limit rule on `/begin-planning`: dashboard-configured, no code, no dependency, and
  enforced at the edge before the function runs. That is strictly better than a shared store for
  this shape of problem, which is why no code was written for it now.

## 8 — Inquiry length: Charter §10's six groups vs. a short qualification brief

- **Conflict.** Charter §10 specifies the guided inquiry's question set and groups it into Contact,
  Journey, Purpose, Style, Investment and Context, and decision #124 explicitly rejected a shorter
  rebuild ("25 fields across 25 screens is more clicking, not better, and the six groups are
  Charter §10's own grouping"). An external funnel review argued the opposite: that asking all of
  it before any personal contact makes a visitor complete most of a discovery call to earn a reply.
- **Resolution (2026-08-29).** The review is right about the *moment*, not about the *questions*.
  The inquiry is now three groups — Contact, Journey, Fit — and every remaining Charter question
  moved verbatim to a pre-call enrichment form at `/begin-planning/prepare`, offered after the
  booking step. Nothing was deleted, reworded, or made harder to answer; the deep discovery is
  asked of someone who has already decided to talk, when answering is obviously worth their time.
- **Why this is not a §10 breach.** §10 governs what the inquiry process asks and what it does with
  the answers. Both are unchanged: the same questions reach Tyler, by the same Resend path, under
  the same consent, and are never simulated. What changed is which side of the hand-raise each
  group sits on. `tests/forms/content-safety.test.ts` asserts the union of the two registries still
  contains every field name the six-group form carried, so this cannot decay into a real deletion.
- **What this supersedes.** Decision #124. Its reasoning about one-field-per-screen still stands
  and was not adopted — this is fewer groups, not more screens.
- **To reverse:** move the `enrichmentSteps` groups back into `inquirySteps` and delete
  `/begin-planning/prepare`. The field literals are unchanged, so it is a move, not a rewrite.

## 9 — Hero secondary CTA: "Explore Reigate" vs. "How Planning Works"

- **Conflict.** An external review recommended changing the hero's secondary CTA from "Explore
  Reigate" to "How Planning Works", on the grounds that the first is vague and the second is a
  low-commitment commercial next step. But "Explore Reigate" is `[A]` approved copy in the Gate-4
  storyboard, is named as a hero CTA in Brand Book ch. 36, and appears in Charter §9 — conflict #2
  above was resolved by keeping it as the *secondary* action precisely because all three sources
  carry it.
- **Raised first, then resolved by client direction (2026-08-30).** The concern was put to the
  client explicitly, including that three governing sources name the string and that a unit test
  pins it as locked hero language. The client directed the change. Conflict #5 is the precedent:
  client direction governs their own site, the concern is stated plainly beforehand, and the
  decision is recorded rather than absorbed.
- **What shipped.** `home.hero.secondaryCta` is now
  `{ label: "How Planning Works", href: "/travel-planning" }`. The destination moved too: the old
  CTA pointed at `#what-is-reigate`, an on-page explainer, and "how planning works" is a promise
  the service page actually keeps. `EditorialHero.tsx`'s `accessibleLabel` follows it.
- **The guard was repointed, not deleted.** `tests/unit/content-safety.test.ts` pinned the exact
  string, which is what made this a deliberate act rather than a typo. It now pins the new label
  *and* the new href. The point of that test is that hero copy cannot drift silently — not that it
  can never change — so removing it would have been the wrong resolution.
- **What is unchanged.** The hero H1, eyebrow and body are all `[A]` and were not touched. Charter
  §9's ordering — Begin Planning primary, this one secondary — is unchanged, so conflict #2 still
  holds as resolved.
- **To reverse:** restore the label and `href: "#what-is-reigate"` in `src/content/home.ts`, the
  `accessibleLabel`, and the two test expectations.

## 10 — Community in the primary navigation: Charter §8 vs. commercial hierarchy

- **Conflict.** Charter §8's sitemap lists Community alongside Travel Planning, Travel Notes and
  About in the primary navigation. Charter §2 separately requires that the site "must not present
  planned offers as though they are already operating", and §9 that future services must not be
  given "equal visual prominence to the current revenue-generating service". In the header those
  two clauses contradict each other: four equally-weighted links, one of which is the only thing
  anyone can buy and one of which is an offer in development.
- **Resolution (2026-08-29).** The prominence clause governs over the sitemap clause, on the same
  reasoning as conflict #4 — intent over mechanism. Community moves to the footer Explore column
  beside Curated Wellness Journeys, the other in-development offer. It remains in the sitemap, in
  the footer, and linked from the homepage's own community band with its Luma CTA; nothing is
  hidden and no route was removed.
- **To reverse:** move the entry from `footerNav` back to `primaryNav` in
  `src/content/navigation.ts`. `tests/unit/navigation.test.ts` asserts every nav href reaches the
  sitemap either way.

## 11 — A second third-party embed: Calendly vs. the single-embed rule

- **Conflict.** `.claude/rules/frontend.md` states "Minimal third-party JS (the only embed is the
  Substack signup, lazy-loaded)". The booking step on the confirmation page is a second embed.
  Charter §22 also excludes a "duplicate event-registration system" from Version 1 — though that
  clause is about rebuilding Luma, not about scheduling a sales call.
- **Resolution (2026-08-29).** Adopted, bounded. The gap between "inquiry sent" and "call booked"
  was the largest leak in the funnel, and closing it with an outbound link rather than an embed
  costs a page load at the exact moment intent is highest. The bounds: one noindexed page, no npm
  dependency (a script tag, as with Vercel Web Analytics per #131), nothing rendered at all unless
  `NEXT_PUBLIC_CALENDLY_URL` is set to an `https://calendly.com` URL, and a plain link to the same
  calendar always present so booking never depends on the script loading.
- **Also relevant.** Charter §10 permits a scheduling link "only after the intended sales process
  is confirmed", and §24 still lists the consultation method as an outstanding input. The env gate
  is the mechanism for that: with the URL unset the page renders exactly what it did before, so the
  code can ship ahead of the business decision without asserting one has been made.
- **To reverse:** unset the env var. To remove entirely, delete `src/lib/scheduling.ts`,
  `SchedulingEmbed.tsx` and the booking branch in `begin-planning/received/page.tsx`.

## 12 — "What you will not find here": Charter §2 as public copy vs. commercial read

- **Conflict.** Decision #98 published Charter §2's "will not rely on" list as public copy on
  /about — four items stating that the site carries no manufactured urgency, no testimonials, no
  health-outcome claims and no partnerships beyond the named credentials. An external review read
  it as commercially defensive: "You don't need to explain why you aren't doing bad marketing."
- **Resolved by client direction (2026-08-30).** The section is removed entirely. The client was
  asked and chose removal over trimming.
- **The concern, stated plainly, because it is not only a copy change.** Three unit tests used that
  section as *positive evidence* rather than merely tolerating it: `about-content.test.ts` asserted
  the page contained "not therapy", "when there are real ones to publish" and "manufactured
  urgency". Those existed because decision #100 records negative-space tests false-positiving three
  times, at which point the disclaimer sentences became the thing the assertions could anchor on.
  All three positive assertions are now gone.
- **What still holds.** The bans themselves are untouched and are the real guard: no health,
  transformation or outcome claim; no testimonial, partnership, award or affiliation; no urgency or
  scarcity phrasing. Charter §18 is unaffected — nothing may be invented, and nothing was. What
  changed is that the page no longer *says* why those things are absent. Absence now reads as
  absence, which is true but says less than the disclosure did.
- **The urgency test kept its phrase-shaped patterns** even though the sentence that forced them
  ("countdowns, limited spots") is gone. The lesson generalises: a ban must target the claim, not
  the vocabulary, and the next disclaimer written on this page would hit the same trap.
- **To reverse:** restore `about.restraint` in `src/content/about.ts`, its `Section` in
  `src/app/about/page.tsx` (Ivory, between Principles and the CTA), and the three assertions.
  Note the band rhythm currently reads Ivory → Sand → Ivory → Sand → Olive without it, and
  reinstating an Ivory band between Sand and Olive keeps that intact.

## Non-conflicts noted

- No conflict between the Brand Book, Charter, and storyboard on offer status, palette, typography,
  voice, or accessibility target as they apply to the homepage.
