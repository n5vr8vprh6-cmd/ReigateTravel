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

## Non-conflicts noted

- No conflict between the Brand Book, Charter, and storyboard on offer status, palette, typography,
  voice, or accessibility target as they apply to the homepage.
