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

## Non-conflicts noted

- No conflict between the Brand Book, Charter, and storyboard on offer status, palette, typography,
  voice, or accessibility target as they apply to the homepage.
