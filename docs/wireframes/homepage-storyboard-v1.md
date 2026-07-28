# Reigate Travel & Co. — Homepage Storyboard v1

| Control | Value |
|---|---|
| Document | Homepage Storyboard, Website Version 1.0 |
| Author role | Fable — narrative sequencing and experience storyboarding |
| Status | **Approved at Gate 4 — 19 July 2026.** Draft copy folded forward to Gate 3. |
| Governing sources | Brand Book v1.0 (strategy, language) → Website Project Charter v1.0 (scope, architecture) → Approved project metadata → Logo pack → Approved image library |
| Date | 19 July 2026 |

**Approved inputs supplied 19 July 2026** (folded into the sections below): Substack publication `https://tylertakesoff.substack.com` · Tyler biography (full text, approved for `/about`; one approved sentence used on the homepage) · Luma calendar `https://luma.com/reigatetravelco` · Instagram `https://www.instagram.com/reigatetravel.co/` · LinkedIn `https://ca.linkedin.com/in/tyler-reigate-13b3aa2b2` · inquiry response time 24–48 hours. **Still open (placeholders retained):** Tyler headshot, three Travel Notes articles, fee/investment language, any confirmed Community Experience.

**Language markers used throughout:**

- **[A]** — Approved language, quoted or lightly normalized from the Brand Book, Charter, or approved metadata.
- **[D]** — Editorially derived draft language, written in brand voice for this storyboard. Requires Gate 3 copy approval.
- **[INPUT REQUIRED: …]** — Missing fact. Must be supplied by a human. Never invent.

---

# 1. Strategic Alignment

**The homepage's job.** Introduce the brand, establish relevance, clarify the offer ecosystem, and direct visitors toward the right next step (Charter §8, Page 1). It is a relationship-building and qualification system, not a travel brochure (Charter §1). It sells through clarity, relevance, specificity, trust, warm personal guidance, transparent process, and thoughtful invitation — never manufactured urgency, fake exclusivity, or aggressive lead capture (Charter §2).

**The primary visitor.** The Intentional Living Woman, generally approximately 28–55, with flexibility beyond that range when mindset, values and purchasing behaviour align **[A]**. She arrives via referral, search, LinkedIn, Instagram, or a partner. She values time, quality, connection, personal attention, wellbeing without perfection, beauty without pretension, thoughtful experiences, travel with substance, and community without pressure **[A]**. Companion travellers and partners must not feel excluded.

**The current commercial priority.** Bespoke Travel Planning is the only Current offer and the revenue-generating priority. Community Experiences and Curated Wellness Journeys are In development. Concierge Travel and Lifestyle Travel are Future direction and appear on the homepage only implicitly (they are not shown as offers). Future offers must never receive visual prominence equal to Bespoke Travel Planning.

**The intended emotional progression.**

recognition → clarity → relevance → trust → proof of process → appropriate action

Mapped to sections: the Hero creates recognition of a value system ("travel is part of living well"); Sections 2–3 create clarity and self-recognition; Sections 4–5 convert interest into trust through specificity and process proof; Sections 6–9 deepen trust through honest offer status, community, Tyler, and her thinking; Sections 10–11 offer two calibrated levels of action.

**Conversions.**

- **Primary:** Begin Planning → `/begin-planning` (guided inquiry form). For travel-ready visitors.
- **Secondary:** Join the Community → embedded Substack signup (Section 10) for the *Tyler Takes Off* publication. For not-yet-ready visitors who should stay connected.
- **Contextual:** Explore Travel Planning (`/travel-planning`), Meet Tyler (`/about`), Travel Notes article links (external Substack), confirmed event registration (external Luma).

---

# 2. Recommended Narrative

The homepage tells one story: **a considered welcome from a trusted guide.**

The visitor arrives carrying a familiar tension — she loves travel but is tired of carrying every planning decision, and she is skeptical of both generic luxury and performative wellness. The page never diagnoses her. Instead it opens with a belief she already holds ("Travel is part of living well"), states plainly what Reigate is and what is available today, and then shows her herself — five short recognition statements in second person, no burnout language, no pressure.

From recognition, the page earns trust the only honest way an emerging brand can: **specificity instead of testimonials.** Bespoke Travel Planning is presented as the single clear thing she can do now, immediately backed by the Reigate Method — five named stages that prove a professional process exists behind the warm language. The ecosystem section then widens the frame truthfully: three offers, one relationship, with Current and In development status labels doing the honesty work in plain text.

The final third of the page makes the brand human and ongoing. Community appears as either a confirmed, concretely described event or an honest "in development" philosophy — never a simulation of traction. Tyler is introduced as a careful listener with verifiable credentials, not an influencer. Travel Notes shows her thinking as living evidence. The email invitation offers the low-commitment way to stay close.

The close is a calm fork, not a funnel squeeze: *Begin with how you want the journey to feel* — Begin Planning for the ready, Join the Community for everyone else.

**Sequencing decision: the approved 11-section order is retained unchanged.** It already delivers the required emotional progression, keeps Bespoke prioritized ahead of the ecosystem overview, and needs no merges. No section's communication purpose is altered.

---

# 3. Homepage Storyboard

### Section 1 — Hero ("The Belief")

- **Visitor question:** Where am I, and is this worth my next thirty seconds?
- **Emotional shift:** From neutral arrival to recognition — "this brand values what I value."
- **Approved strategic message:** Brand idea + promise. "Travel is part of living well." **[A]**; supporting direction: Reigate helps people invest in living well through meaningful travel, thoughtful service and genuine community **[A]**.
- **Draft headline:** "Travel is part of living well." **[A]**
- **Copy direction:** One headline, one supporting sentence, one context label. The hero orients without trying to communicate every offer (Charter §9). Approved supporting copy from the Brand Book Core Copy System: "Reigate creates thoughtful journeys, personalized travel experiences, and welcoming community events for people who want to explore with greater intention." **[A]**
- **Essential content:** Eyebrow "Lifestyle Wellness Travel" **[A]** · headline · one supporting sentence · two CTAs.
- **CTAs:** Primary — **Begin Planning** → `/begin-planning`. Secondary — **Explore Reigate** → in-page anchor to Section 2 (`#what-is-reigate`). *(Note: the Brand Book's Core Copy System lists "Explore Reigate" as the hero's primary action; the Charter §9 assigns Begin Planning as primary. The Charter governs website conversion hierarchy, so Begin Planning is primary. Recorded here so no later reviewer treats it as an unresolved conflict.)*
- **Proof mechanism:** None. The hero makes a belief claim, not an evidence claim.
- **Offer-status treatment:** No offers named; nothing to label.
- **Image/visual role:** Full-bleed or large editorial image with natural negative space for text. Recommended: `Duncan_So_Adult_woman_sitting_alone_on_a_stone_wall_overlooki_9cb4b6d1…_0.png` (solo woman, coastal calm, off-centre subject) or `Duncan_So_Quiet_elevated_view_of_a_Mediterranean_coastline_at_1bb4a8b6…_1.png` (no faces — safest under the AI-realism rule). Editorial/concept use only. Alt-text direction: describe the scene plainly ("A woman sits alone on a stone wall overlooking a calm coastline in late-afternoon light"); never imply a Reigate client or trip.
- **Transition out:** The secondary CTA and scroll position both land on the answer to the question the hero deliberately leaves open: *what exactly is Reigate?*
- **Mobile note:** Headline first, supporting sentence second, stacked CTAs (Begin Planning on top), image as backdrop with a solid Ivory or Olive text field to guarantee contrast. No text over busy image regions at 390px.
- **Implementation notes:** `EditorialHero` component. H1 lives here and only here. Text must be real text, never embedded in the image. Respect `prefers-reduced-motion`: no parallax; static image acceptable at all times.

### Section 2 — Clear Explanation ("What Reigate Is")

- **Visitor question:** What is Reigate, in plain words?
- **Emotional shift:** From curiosity to clarity — the category becomes concrete.
- **Approved strategic message:** Business definition: "Reigate is a lifestyle brand that curates meaningful experiences through travel, community and personal connection." **[A]** Offer clarity: "Bespoke Travel Planning is available now. Community Experiences and Curated Wellness Journeys are in development." **[A — Charter copy direction]** The section connects travel, wellbeing, personal service, community (Charter §9).
- **Draft headline:** "Thoughtful travel and meaningful experiences for people who want to live well." **[A — approved one-line description]**
- **Copy direction:** Two short paragraphs maximum. Paragraph one: the business definition, in company voice. Paragraph two: the honest offer-status sentence, stated as helpful orientation rather than a disclaimer. No metaphors, no category jargon without explanation.
- **Essential content:** Eyebrow · headline · 2 short paragraphs · optional quiet text link to About.
- **CTAs:** None primary. Optional inline text link "Read the Reigate story" → `/about` **[D]**.
- **Proof mechanism:** Plain-spokenness itself; clarity is the trust device (Charter §2).
- **Offer-status treatment:** First appearance of status language, in prose ("available now… in development") — deliberately conversational here; formal labels arrive in Section 6.
- **Image/visual role:** One vertical editorial image beside text (`ImageTextSplit`): `Duncan_So_Vertical_editorial_view_through_an_arched_doorway_t_a74601c0…_1.png` — a threshold image; place without people, no proof implication. Alt: "View through an arched stone doorway toward a sunlit courtyard."
- **Transition out:** Ends on "available now / in development" → the visitor's natural next question is *is this for me?*
- **Mobile note:** Text before image. Keep paragraph two intact — offer honesty must not be trimmed on mobile.
- **Implementation notes:** `SectionIntro` + `ImageTextSplit`. H2. Anchor id `what-is-reigate` (hero secondary CTA target).

### Section 3 — Audience Recognition ("Is This Me?")

- **Visitor question:** Is Reigate relevant to me?
- **Emotional shift:** From understanding the company to recognizing herself — the page's empathy beat.
- **Approved strategic message:** The five Charter themes **[A]**:
  1. You want the trip to feel as good as the destination.
  2. You are tired of carrying every planning decision.
  3. You value thoughtful recommendations over endless options.
  4. You want a journey shaped around your pace and priorities.
  5. You want connection without losing personal space.
  Constraint: do not diagnose the visitor with burnout **[A]**.
- **Draft headline:** "Does this sound like you?" **[D]** (one meaningful question, per Writing Style guidance).
- **Copy direction:** Headline plus the five statements as a clean list. No commentary paragraph needed; a single closing line may bridge to the offer: "If any of these feel familiar, Reigate was designed for you." **[D]** Keep companion travellers implicitly welcome — statements are about planning and pace, not gender or wellness identity.
- **Essential content:** Eyebrow ("Who Reigate serves" **[D]**) · headline · five statements · one bridge line.
- **CTAs:** None. This section must feel like recognition, not capture.
- **Proof mechanism:** Accuracy of observation — the statements mirror documented audience tensions (Brand Book ch. 10).
- **Offer-status treatment:** N/A.
- **Image/visual role:** Optional, restrained: `Duncan_So_Two_women_in_their_late_thirties_walking_slowly_thr_b0dea836…_0.png` (unposed, walking, connection with personal space). Acceptable to run this section typographically with a Sand background band and no image — recommended at mobile.
- **Transition out:** The bridge line hands the recognized visitor directly to the thing she can act on now.
- **Mobile note:** All five statements retained (they are short); stacked list with generous line spacing. If an image is used on desktop, drop it on mobile.
- **Implementation notes:** H2 + `<ul>`; statements are list items, not headings. Background band (Sand `#DCCFBE`) for gentle rhythm; text in Ink.

### Section 4 — Bespoke Travel Planning ("What You Can Do Now")

- **Visitor question:** What exactly can I get from Reigate today, and why is it better than planning it myself?
- **Emotional shift:** From "this is for me" to "this is worth a conversation" — relevance becomes intent.
- **Approved strategic message:** Offer definition: personalized travel planning designed around the client's purpose, preferences, pace, relationships, investment and desired level of support **[A]**. Approved introduction: "Bespoke Travel Planning begins with how you want the journey to feel. Reigate turns your priorities, preferences, and ideas into a thoughtfully coordinated travel experience designed around you." **[A]** Value framing: the value is judgment, curation, context, coordination, time saved, confidence created — not access to a booking platform **[A — Brand Book ch. 17]**.
- **Draft headline:** "Bespoke Travel Planning" **[A — offer name]** with supporting subline "Begins with how you want the journey to feel." **[A-derived from approved intro]**
- **Copy direction:** Approved intro as lead paragraph. Second short paragraph on what Tyler handles: destination and accommodation recommendations, itinerary development, coordination, preparation, and support while travelling **[D — condensed from approved inclusion list]**. Third element: one sentence of emotional value ("Fewer decisions to carry. More room to be present." **[D]**). Avoid: perfect, effortless, stress-free, guaranteed, VIP (prohibited vocabulary).
- **Essential content:** Status label **Available now** · offer name · 2–3 short paragraphs · CTA.
- **CTAs:** Primary — **Explore Travel Planning** → `/travel-planning` **[A — Charter CTA]**. (Begin Planning is intentionally *not* duplicated here; the service page qualifies before the form, matching Journey A.)
- **Proof mechanism:** Specificity of scope. No invented testimonials, client stories, fee claims, or destination-expertise claims.
- **Offer-status treatment:** `StatusLabel` "Available now" — text chip, not colour-coded alone.
- **Image/visual role:** Object still-life, deliberately not a staged advisor-client scene (avoids implying a documented client engagement): `Duncan_So_Open_travel_journal_with_blank_cream_pages_beside_a_a6ba885f…_0.png` or `Duncan_So_Close_editorial_still_life_of_a_leather_luggage_tag_f2ba64cd…_0.png`. Alt: "An open travel journal with blank cream pages beside a cup of coffee."
- **Transition out:** The natural objection after any service claim is *how do you actually work?* The Method answers it immediately.
- **Mobile note:** Status label and offer name first, image after the copy, CTA full-width. This section must remain visibly the most substantial offer treatment on the page at every width.
- **Implementation notes:** `ImageTextSplit` variant with `StatusLabel` and `CTAPanel` slot. H2. This is the page's largest single-offer section by design — Gate 4 reviewers should verify no later section exceeds its visual weight.

### Section 5 — The Reigate Method ("How It Works")

- **Visitor question:** Is there a real process behind the warm language?
- **Emotional shift:** From interest to professional trust — process replaces testimonials as proof (Charter §9: "establishes process proof before extensive testimonials exist").
- **Approved strategic message:** The five stages **[A]**: 1. Listen · 2. Define · 3. Curate · 4. Support · 5. Remember.
- **Draft headline:** "The Reigate Method" **[A — name]** with subline "Thoughtful travel begins by understanding the person before recommending the place." **[A — Brand Book ch. 14 principle]**
- **Copy direction:** One line per stage, derived from approved chapter content **[D]**:
  1. **Listen** — We begin with conversation: why you're travelling, how you want to feel, who is coming.
  2. **Define** — Your answers become a clear experience brief — purpose, pace, priorities, investment range.
  3. **Curate** — Informed recommendations, not endless options. Every choice has a reason.
  4. **Support** — Clear documentation, preparation, and accessible help while plans are in motion.
  5. **Remember** — Your preferences are kept, so every future journey starts more personal than the last.
- **Essential content:** Eyebrow · headline · subline · five numbered stages with one-liners.
- **CTAs:** None (keeps the section as pure proof; the Section 4 CTA above and Section 11 below carry action).
- **Proof mechanism:** The method itself — named, ordered, specific.
- **Offer-status treatment:** N/A (the method spans all offers).
- **Image/visual role:** No photography. Typographic/numbered treatment on Ivory, optionally with approved-style line icons (simple, linear, consistent weight). Numbers in Cormorant Garamond as quiet display elements; Copper permitted for large numerals (decorative, non-essential).
- **Transition out:** Having shown *how* Reigate works, the page can now show *everything* Reigate is building — honestly.
- **Mobile note:** Vertical numbered list, one stage per row. Never a horizontal scroller — order is meaning.
- **Implementation notes:** `ProcessSteps` component; ordered list semantics (`<ol>`); stage names as `<h3>`. Reduced-motion: no step-by-step reveal animations required; if used, they must be disabled under `prefers-reduced-motion`.

### Section 6 — Connected Ecosystem ("One Relationship")

- **Visitor question:** What else does Reigate offer — and what's real today?
- **Emotional shift:** From single-service trust to brand depth, with honesty preserved.
- **Approved strategic message:** Three offers, one connected relationship **[A — Brand Book ch. 15]**; status labels must be clear; future services must not receive equal prominence **[A — Charter §9]**. Approved offer descriptors:
  - Bespoke Travel Planning — "Personalized travel designed around the client's individual goals, preferences, relationships, and pace." **[A]**
  - Community Experiences — "Local, accessible opportunities to meet the brand and participate in intentional living." **[A]**
  - Curated Wellness Journeys — "Small-group travel experiences shaped around wellbeing, connection, culture, and thoughtful exploration." **[A]**
- **Draft headline:** "One connected relationship" **[A — framework name]** · subline "Every Reigate experience strengthens the others." **[D — from ch. 15 'Every offering strengthens the others']**
- **Copy direction:** Three offer cards. Bespoke card is visually primary (first position, larger or full-width on desktop, filled treatment). The two In-development cards are secondary (smaller, outlined treatment). Each card: offer name, status label, one approved descriptor sentence, one link.
- **Essential content:** Headline · 3 `OfferCard`s with `StatusLabel`s · links.
- **CTAs:** Card links — Bespoke → `/travel-planning`; Community Experiences → `/community`; Curated Wellness Journeys → `/curated-journeys` (interest registration lives there). Text links, descriptive: "Explore Travel Planning", "About Community Experiences", "Learn about Curated Wellness Journeys" **[D]**.
- **Proof mechanism:** Honest status labelling is itself the credibility device.
- **Offer-status treatment:** Formal labels: **Available now** / **In development** / **In development**. Text chips; label text visible on every card at every breakpoint; never conveyed by colour alone.
- **Image/visual role:** Optional small card imagery: Bespoke — `Duncan_So_Boutique_hotel_room_prepared_with_understated_care__03a28859…_0.png`; Community — `Duncan_So_Wide_editorial_photograph_of_Bronte_Harbour_in_Oakv_f9f215ad…_0.png` (local grounding); Journeys — `Duncan_So_A_small_group_of_five_women_walking_along_a_scenic__a3244edc…_0.png`. All concept/editorial use; alt text must not imply completed Reigate events or client trips ("Concept imagery" framing handled through page context and factual alt text, e.g., "A small group of women walks along a scenic coastal path").
- **Transition out:** The Community card opens a question the next section answers with either a real event or an honest philosophy.
- **Mobile note:** Cards stack in the same priority order; Bespoke card keeps its distinct filled treatment so hierarchy survives the stack.
- **Implementation notes:** `OfferCard` + `StatusLabel` (reused from Section 4). Card headings `<h3>`. Do not equalize card sizes on desktop.

### Section 7 — Featured Community Experience (conditional)

- **Visitor question:** Is anything actually happening that I could join?
- **Emotional shift:** From reading about a brand to seeing a door she could walk through (State A), or from curiosity to respect for honesty (State B).
- **Approved strategic message:** State A shows only confirmed events with name, date, location, description, expectations, external Luma registration **[A — Charter §9]**. State B replaces the section with community philosophy and a Substack invitation **[A — Charter §9]**. Approved community introduction: "Reigate Community Experiences bring people together through movement, conversation, local partnerships, and shared moments designed to support living well." **[A]**
- **Draft headline:** State A: the confirmed event name **[IR]**. State B: "Community begins close to home." **[D — derived from pillar language 'Community begins locally and can extend globally']**
- **Copy direction:** Full field specification in **Part 5** below.
- **CTAs:** State A: **Register on Luma** (external, clearly marked). State B: **Join the Community** → anchor `#join` (Section 10) plus text link to `/community`.
- **Proof mechanism:** State A: a real, dated, located event — the strongest early proof the brand has. State B: candour ("in development" said plainly).
- **Offer-status treatment:** State B carries an explicit **In development** status label. State A needs none (a confirmed event is current by definition).
- **Image/visual role:** State A: real event photography when it exists **[IR]**; otherwise the local-waterfront concept image with non-documentary alt text, or no image. State B: `Duncan_So_Minimal_Lake_Ontario_horizon_from_the_Oakville_wate_9355fa4c…_2.png` (place, not people — cannot imply attendance). Alt: "The Lake Ontario horizon seen from the Oakville waterfront."
- **Transition out:** Community raises the natural question of *who is behind all this* — Tyler follows.
- **Mobile note:** State A: date, location, and the external-registration button must be visible without expanding anything. State B: keep to headline + two short paragraphs + one CTA.
- **Implementation notes:** `EventCard` (State A) / `SectionIntro` variant (State B). Render logic driven by a single content field (`featuredEvent: Event | null`). External Luma link: `rel="noopener"`, visible "opens Luma in a new tab" affordance for screen readers.

### Section 8 — Tyler Introduction ("The Person Behind It")

- **Visitor question:** Who is Tyler, and can I trust her?
- **Emotional shift:** Trust becomes personal — a face, a philosophy, verifiable credentials.
- **Approved strategic message:** Make the founder visible and trustworthy **[A — Charter §9]**. Tyler is positioned as a thoughtful travel advisor, a curious host, a community builder, a careful listener, a guide who brings the right experts together **[A — Brand Book ch. 59]**. Approved credentials, used exactly as supplied: **Certified TICO Travel Advisor · FORA Travel Advisor · WTA Member** **[A — approved metadata]**. Do not expand "WTA", add numbers, or display certification logos.
- **Draft headline:** "Planned by someone who listens first." **[D]** Eyebrow: "Meet Tyler" **[A — CTA language]**.
- **Copy direction:** One short paragraph in company voice introducing Tyler's role and approach **[D scaffold in Part 4]**; one line of credentials **[A]**; one approved biographical sentence on the homepage (the full approved bio lives on `/about`). No personal claims (age, travel history, destination counts) beyond approved inputs. Tone: personal, not private; founder, not influencer.
- **Essential content:** Headshot · eyebrow · headline · 1–2 short paragraphs · credentials line · CTA.
- **CTAs:** **Meet Tyler** → `/about` **[A]**.
- **Proof mechanism:** The three approved credentials — the page's only formal credentials, deliberately placed at the trust-personification moment.
- **Offer-status treatment:** N/A.
- **Image/visual role:** **[INPUT REQUIRED: approved Tyler headshot]**. A real photograph is mandatory here; AI imagery must not stand in for Tyler under any circumstances. Until supplied, ship the section with a quiet Olive typographic panel and no portrait rather than a placeholder face. Alt when supplied: "Tyler, founder of Reigate Travel & Co."
- **Transition out:** From who Tyler is to how she thinks — her writing is the ongoing evidence.
- **Mobile note:** Portrait above text, modest size (not hero-scale); credentials line must wrap cleanly, not truncate.
- **Implementation notes:** `FounderFeature` component. H2. Credentials as a single text line separated by middle dots (decorative separators aria-hidden).

### Section 9 — Travel Notes ("How She Thinks")

- **Visitor question:** What does this brand's judgment actually sound like?
- **Emotional shift:** Trust through usefulness — the visitor samples value before committing to anything.
- **Approved strategic message:** Approximately three recent or featured Substack articles; each card: title, short summary, publication date, topic, link to read on Substack **[A — Charter §9]**. Travel Notes is presented as part of the Reigate brand experience; Substack hosts the full articles **[A — Charter §11]**.
- **Draft headline:** "Travel Notes" **[A — section name]** · subline "Notes on living and travelling well, from Tyler Takes Off." **[D]**
- **Copy direction:** No editorial framing paragraph needed; the cards are the content. Card summaries stay under ~25 words.
- **Essential content:** Headline · 3 `ArticleCard`s **[INPUT REQUIRED: three approved articles — title, summary, date, topic, Substack URL]** · "View all Travel Notes" link → `/travel-notes`.
- **CTAs:** Card links → external Substack articles **[IR: URLs]**. Accessible link text pattern: "Read '{article title}' on Substack (opens in a new tab)".
- **Proof mechanism:** Real published writing. If fewer than three articles exist at build time, show the real count — never pad with placeholder cards.
- **Offer-status treatment:** N/A.
- **Image/visual role:** Cards may be typographic (preferred at launch) or use the postcard/journal still-lifes (`Duncan_So_Layered_blank_postcards_textured_paper_an_unmarked__44091b44…_0.png`) as quiet, repeated card art. Do not attach destination photos to articles they don't describe.
- **Transition out:** Reading is a relationship on the visitor's terms; the next section offers to make that ongoing.
- **Mobile note:** Cards stack; date and topic remain visible (metadata line above title). Max three cards — no carousel.
- **Implementation notes:** `ArticleCard`; card titles `<h3>`; publication dates in `<time>` elements. Content sourced from structured local content files (no live Substack API dependency at Version 1).

### Section 10 — Email Invitation ("Stay Close")

- **Visitor question:** How do I stay connected without committing to anything?
- **Emotional shift:** From interested to belonging — the lowest-pressure yes on the page.
- **Approved strategic message:** The promise: "Thoughtful travel ideas, community invitations and practical guidance for living and travelling well." **[A — Charter §9/§10 supporting promise]** Embed the official Substack signup form **[A]**. Newsletter consent is separate and explicit; inquiry-form users are never auto-subscribed **[A — Charter §10]**.
- **Draft headline:** "Join the Reigate community." **[A — CTA language, used as headline]** Eyebrow: "Tyler Takes Off" **[A — publication name]**.
- **Copy direction:** Promise sentence verbatim, then one short reassurance line ("No noise. Unsubscribe anytime." **[D]** — keep only if factually consistent with Substack defaults, which it is).
- **Essential content:** Eyebrow · headline · promise · embedded official Substack signup form for `https://tylertakesoff.substack.com` **[A]**.
- **CTAs:** The form's subscribe action. No competing CTA in this section.
- **Proof mechanism:** The specificity of the promise (subscribers know exactly what they'll receive).
- **Offer-status treatment:** N/A.
- **Image/visual role:** Quiet texture only: `Duncan_So_Soft_botanical_shadows_falling_across_natural_ivory_05bf956b…_0.png` as a background field, or plain Sand band. Nothing that competes with the form.
- **Transition out:** The visitor has been offered the ongoing relationship; the final section asks the direct question.
- **Mobile note:** Full-width single-field form, minimum 44px tap targets, visible label (not placeholder-only), error text below field.
- **Implementation notes:** `NewsletterSignup` wrapping the official Substack embed. Anchor id `#join` (target of all "Join the Community" links). If the embed cannot meet contrast/label accessibility, use Substack's minimal form endpoint with a native labelled input. Minimal third-party scripts per Charter §14.

### Section 11 — Final CTA ("The Fork")

- **Visitor question:** What should I do now?
- **Emotional shift:** Calm resolution — two doors, clearly marked, no pressure.
- **Approved strategic message:** Headline direction: "Begin with how you want the journey to feel." **[A — Charter §9]** Primary Begin Planning, secondary Join the Community **[A]**.
- **Draft headline:** "Begin with how you want the journey to feel." **[A]**
- **Copy direction:** Headline plus at most one supporting line: "Tell us what you're considering, or simply stay connected — both are welcome." **[D]** Optionally close the page with the endline "Experiences That Stay With You." **[A]** used once, small, as a quiet signature beneath the CTAs — its only appearance on the homepage (sparing use rule).
- **Essential content:** Headline · support line · two CTAs · optional endline signature.
- **CTAs:** Primary — **Begin Planning** → `/begin-planning`. Secondary — **Join the Community** → `#join` (Section 10 anchor).
- **Proof mechanism:** None; the page has already done that work.
- **Offer-status treatment:** N/A.
- **Image/visual role:** Deep Olive panel with Ivory text (strong close, breaks any beige monotony), or a final wide landscape (`Duncan_So_Quiet_morning_in_a_beautiful_walkable_European_neig_3ca2210a…_1.png`) with a solid text field. Olive panel recommended — calmer, faster, no alt-text burden.
- **Mobile note:** Stacked buttons, Begin Planning first, both full-width.
- **Implementation notes:** `CTAPanel`. H2. The secondary CTA scrolls up to `#join` — ensure focus moves to the form for keyboard users.

---

# 4. Copy Scaffold

Draft website copy for implementation. **[A]** items are approved language; everything else is **[D]** draft pending Gate 3. Not new brand strategy.

### 1 — Hero
- Eyebrow: `LIFESTYLE WELLNESS TRAVEL` [A]
- H1: `Travel is part of living well.` [A]
- Body: `Reigate creates thoughtful journeys, personalized travel experiences, and welcoming community events for people who want to explore with greater intention.` [A]
- CTA primary: `Begin Planning` [A] · CTA secondary: `Explore Reigate` [A]
- Accessible names: "Begin Planning — start a travel conversation" · "Explore Reigate — learn what Reigate is"

### 2 — What Reigate Is
- Eyebrow: `What Reigate is` [D]
- H2: `Thoughtful travel and meaningful experiences for people who want to live well.` [A]
- Body 1: `Reigate is a lifestyle brand that curates meaningful experiences through travel, community, and personal connection. We bring travel, wellbeing, personal service, and community together in one place.` [A first sentence / D second]
- Body 2: `Bespoke Travel Planning is available now. Community Experiences and Curated Wellness Journeys are in development — and you're welcome to follow along as they take shape.` [A first two sentences / D final clause]
- Inline link: `Read the Reigate story` → /about [D]

### 3 — Audience Recognition
- Eyebrow: `Who Reigate serves` [D]
- H2: `Does this sound like you?` [D]
- List [A]:
  - `You want the trip to feel as good as the destination.`
  - `You are tired of carrying every planning decision.`
  - `You value thoughtful recommendations over endless options.`
  - `You want a journey shaped around your pace and priorities.`
  - `You want connection without losing personal space.`
- Bridge: `If any of these feel familiar, Reigate was designed for you.` [D]

### 4 — Bespoke Travel Planning
- Status label: `Available now` [D — label wording; status itself A]
- H2: `Bespoke Travel Planning` [A]
- Body 1: `Bespoke Travel Planning begins with how you want the journey to feel. Reigate turns your priorities, preferences, and ideas into a thoughtfully coordinated travel experience designed around you.` [A]
- Body 2: `Tyler handles the thinking and the logistics — destinations, accommodations, pacing, reservations, and preparation — so the plan reflects your life, not a template.` [D]
- Body 3: `Fewer decisions to carry. More room to be present.` [D]
- CTA: `Explore Travel Planning` [A]

### 5 — The Reigate Method
- Eyebrow: `The Reigate Method` [A]
- H2: `Thoughtful travel begins by understanding the person before recommending the place.` [A]
- Steps [names A / one-liners D]:
  1. `Listen` — `We begin with conversation: why you're travelling, how you want to feel, who is coming.`
  2. `Define` — `Your answers become a clear experience brief — purpose, pace, priorities, investment range.`
  3. `Curate` — `Informed recommendations, not endless options. Every choice has a reason.`
  4. `Support` — `Clear documentation, preparation, and accessible help while plans are in motion.`
  5. `Remember` — `Your preferences are kept, so every future journey starts more personal than the last.`

### 6 — Connected Ecosystem
- H2: `One connected relationship` [A]
- Subline: `Every Reigate experience strengthens the others.` [D]
- Card 1 — `Bespoke Travel Planning` [A] · label `Available now` · `Personalized travel designed around your goals, preferences, relationships, and pace.` [A, person-shifted] · link `Explore Travel Planning`
- Card 2 — `Community Experiences` [A] · label `In development` · `Local, accessible gatherings — a way to meet Reigate and participate in intentional living.` [A, lightly adapted] · link `About Community Experiences`
- Card 3 — `Curated Wellness Journeys` [A] · label `In development` · `Small-group travel shaped around wellbeing, connection, culture, and thoughtful exploration.` [A, lightly adapted] · link `Learn about Curated Wellness Journeys`

### 7 — Community (State A / State B)
*(Full copy in Part 5 below.)*

### 8 — Tyler
- Eyebrow: `Meet Tyler` [A]
- H2: `Planned by someone who listens first.` [D]
- Body 1: `Reigate was founded by Tyler — a thoughtful travel advisor, a curious host, and a careful listener. Her approach is simple: understand the person before recommending the place.` [D, from approved positioning]
- Body 2: `Based in the Greater Toronto Area, Tyler is building Reigate as a trusted relationship clients can return to across different journeys, destinations, and stages of life.` [A — verbatim from approved bio]
- Credentials: `Certified TICO Travel Advisor · FORA Travel Advisor · WTA Member` [A — exact]
- CTA: `Meet Tyler` [A] → /about
- *Full approved bio (for `/about`, not the homepage):* the five-paragraph founder biography supplied 19 July 2026, beginning "Tyler is the founder of Reigate Travel & Co., a Lifestyle Wellness Travel company built around the belief that travel should contribute to a life well lived." [A]

### 9 — Travel Notes
- H2: `Travel Notes` [A]
- Subline: `Notes on living and travelling well, from Tyler Takes Off.` [D]
- Cards ×3: `[INPUT REQUIRED: article title]` · `[INPUT REQUIRED: ≤25-word summary]` · `[INPUT REQUIRED: publication date]` · `[INPUT REQUIRED: topic]` · link `Read "{title}" on Substack (opens in a new tab)` → `[INPUT REQUIRED: article URL]`
- Section link: `View all Travel Notes` → /travel-notes [D]

### 10 — Email Invitation
- Eyebrow: `Tyler Takes Off` [A]
- H2: `Join the Reigate community.` [A]
- Body: `Thoughtful travel ideas, community invitations, and practical guidance for living and travelling well.` [A]
- Reassurance: `Unsubscribe anytime.` [D]
- Form: official Substack embed → `https://tylertakesoff.substack.com` [A]

### 11 — Final CTA
- H2: `Begin with how you want the journey to feel.` [A]
- Body: `Tell us what you're considering, or simply stay connected — both are welcome.` [D]
- CTA primary: `Begin Planning` [A] → /begin-planning
- CTA secondary: `Join the Community` [A] → #join
- Signature (once, small): `Experiences That Stay With You.` [A]

---

# 5. Conditional Content States — Community Section

One content field drives the render: `featuredEvent` (object or null).

### State A — A confirmed event exists

| Field | Content | Source |
|---|---|---|
| Eyebrow | `Community Experience` [A — offer name, singular] | Brand Book |
| Event name | `[INPUT REQUIRED: confirmed event name]` | Human |
| Date & time | `[INPUT REQUIRED: confirmed date and time]` | Human |
| Location | `[INPUT REQUIRED: venue and city]` | Human |
| Description | `[INPUT REQUIRED: 1–2 sentence approved description]` | Human |
| What to expect | `[INPUT REQUIRED: pace, what to bring, physical expectations, whether attending alone is welcome, free or paid]` — the Brand Book's "clear invitation" standard | Human, per ch. 16 |
| CTA | `Register on Luma` → `[INPUT REQUIRED: confirmed Luma event URL]` (the Reigate calendar is `https://luma.com/reigatetravelco`; a State-A section still needs the specific event's page), external, opens in new tab, screen-reader note "opens Luma in a new tab" | Human |
| Image | Real event/venue photography if available `[INPUT REQUIRED]`; otherwise omit the image rather than substituting concept imagery for a real event | Human |

Rules: only confirmed events, ever. No invented attendance, history, or "back by popular demand" framing. Luma remains the registration system — the site links out and does not recreate registration.

### State B — No event is confirmed (launch default)

- Eyebrow: `Community Experiences` [A] + status label `In development`
- H2: `Community begins close to home.` [D]
- Body 1: `Reigate Community Experiences bring people together through movement, conversation, local partnerships, and shared moments designed to support living well.` [A]
- Body 2: `We're developing our first local gatherings now. There's nothing to register for yet — and we'd rather say that plainly than pretend otherwise. If you'd like to be invited when the first experience is confirmed, the Reigate community is the place to be.` [D]
- CTA: `Join the Community` [A] → `#join` · secondary text link `About Community Experiences` → /community [D]
- Image: Oakville waterfront horizon (place-only, no people) — cannot be mistaken for a past event.

---

# 6. Narrative Transitions

Each transition is a question handed forward. All transitions are plain scroll boundaries — background-colour shifts (Ivory → Sand → Ivory → Olive) and spacing do the pacing work. No decorative animation is required for coherence; any motion is enhancement only and must respect reduced-motion.

| From → To | Narrative function |
|---|---|
| 1 → 2 | The hero states a belief and deliberately withholds detail; the visitor's question "what *is* this?" is answered immediately. The secondary CTA (Explore Reigate) is a literal shortcut across this transition. |
| 2 → 3 | Definition creates the next question — "fine, but is it for *me*?" The page pivots from company voice to second person. |
| 3 → 4 | Recognition without an offer would be manipulation; the bridge line delivers the recognized visitor to the one thing she can act on today. |
| 4 → 5 | Every service claim invites the objection "how, exactly?" The Method answers before she can scroll past it — claim, then process. |
| 5 → 6 | Process proof earns the right to widen the frame: the same method, one connected relationship, three honestly-labelled offers. |
| 6 → 7 | The ecosystem names Community as in development; Section 7 immediately shows what that means in practice — a real event, or a straight answer. |
| 7 → 8 | Community and hospitality imply a host; the visitor meets her. Institutional trust becomes personal trust. |
| 8 → 9 | A person becomes trustworthy through her thinking, not her bio; Travel Notes lets Tyler's judgment speak in her own format. |
| 9 → 10 | Reading one article is a moment; the email invitation converts the moment into a standing relationship, at the lowest possible commitment. |
| 10 → 11 | The relationship offer is on the table; the close asks the direct question once, with both doors — plan now, or stay close. |

---

# 7. Responsive Story Logic (~390px)

**What must appear first.** The narrative order is identical on mobile — the 11 sections are the story, and the story survives because each section leads with text, not image. Above the fold: eyebrow, H1, supporting sentence, Begin Planning button. The visitor should be able to understand and act without seeing a single photograph.

**What can be shortened.** Section 2 keeps both paragraphs (offer honesty is non-negotiable). Section 3 keeps all five statements — they are the empathy engine and each is under twelve words. Section 4 may drop Body 3. Section 6 card descriptors stay to one sentence. Section 7 State B may drop the secondary text link. Desktop-only images (Sections 3, 9 card art) are removed, not shrunk.

**CTA priority.** One primary action per viewport-ish stretch: Begin Planning (hero) → Explore Travel Planning (Section 4) → card links (Section 6) → Register on Luma / Join (Section 7) → Meet Tyler → article links → subscribe → final fork. All buttons full-width, minimum 44px, primary always stacked above secondary. Begin Planning appears exactly twice (hero, final CTA) — enough to act, not enough to nag.

**Images support, never interrupt.** No image between a heading and its first paragraph. Images follow copy within each section, cropped 3:2 or 4:5, `max-width:100%`. Hero text sits on a solid field, never on the busy region of the photograph. Total homepage images at mobile: roughly six, optimized (`next/image`, explicit dimensions, lazy-loaded below the fold) to protect Core Web Vitals.

**Status labels stay unmistakable.** Labels are text chips ("Available now", "In development") rendered inside the card/section header, before the description, at readable size (never below ~12px Montserrat SemiBold), Ink or Olive text on Sand — meeting contrast, and meaningful without colour. They are never icons alone, never tooltips, never truncated.

**Reading order stays logical.** DOM order equals visual order equals narrative order — no CSS reordering between breakpoints. One H1; H2 per section in sequence; cards as H3. The Section 11 secondary CTA moves keyboard/screen-reader focus to the Section 10 form when activated.

---

# 8. Implementation Handoff

### Final section order (unchanged from Charter §9)

1. Hero → 2. Clear Explanation → 3. Audience Recognition → 4. Bespoke Travel Planning → 5. Reigate Method → 6. Connected Ecosystem → 7. Featured Community Experience (conditional) → 8. Tyler Introduction → 9. Travel Notes → 10. Email Invitation → 11. Final CTA

### Reusable components (all from the Charter §14 component list — no new one-offs)

| Component | Used in | Notes |
|---|---|---|
| `EditorialHero` | 1 | H1, solid text field over image |
| `SectionIntro` | 2, 3, 7B | Eyebrow + heading + short body |
| `ImageTextSplit` | 2, 4 | Text-first DOM order |
| `StatusLabel` | 4, 6, 7B | Text chip; single source of label strings |
| `ProcessSteps` | 5 | `<ol>` semantics |
| `OfferCard` | 6 | Primary (filled) and secondary (outlined) variants |
| `EventCard` | 7A | External-link affordance built in |
| `FounderFeature` | 8 | Portrait + credentials line |
| `ArticleCard` | 9 | `<time>` element, external-link pattern |
| `NewsletterSignup` | 10 | Wraps official Substack embed; anchor `#join` |
| `CTAPanel` | 4 (slot), 11 | Primary/secondary button pair |

### Content model (structured local content, per Charter §14)

```ts
// src/content/pages/home.ts (shape only — not implementation)
{
  hero: { eyebrow, headline, body, primaryCta, secondaryCta },
  explanation: { headline, body: [p1, p2] },
  recognition: { headline, statements: string[5], bridge },
  bespoke: { statusLabel, name, body: [p1, p2, p3?], cta },
  method: { headline, subline, steps: {name, line}[5] },
  ecosystem: { headline, subline, offers: {name, status, description, href, linkLabel}[3] },
  featuredEvent: {
    name, dateTime, location, description, expectations, lumaUrl, image?
  } | null,                      // null → State B
  communityFallback: { headline, body: [p1, p2], primaryCta, pageLink },
  tyler: { headline, body, credentials, headshot, cta },
  travelNotes: { articles: {title, summary, date, topic, url}[≤3] },
  newsletter: { eyebrow, headline, promise, substackUrl },
  finalCta: { headline, body, primaryCta, secondaryCta, endline }
}
```

### CTA destinations

| CTA | Destination | Type |
|---|---|---|
| Begin Planning | `/begin-planning` | Internal |
| Explore Reigate | `#what-is-reigate` (Section 2) | In-page anchor |
| Explore Travel Planning | `/travel-planning` | Internal |
| About Community Experiences | `/community` | Internal |
| Learn about Curated Wellness Journeys | `/curated-journeys` | Internal |
| Register on Luma | [INPUT REQUIRED: confirmed Luma *event* URL] — calendar is `https://luma.com/reigatetravelco` | External, new tab, announced |
| Meet Tyler | `/about` | Internal |
| Article links / View all | [INPUT REQUIRED: per-article Substack URLs under `https://tylertakesoff.substack.com`] / `/travel-notes` | External / internal |
| Join the Community | `#join` (Section 10 form) | In-page anchor, focus moved to form |
| Substack subscribe | Official embed → `https://tylertakesoff.substack.com` | Third-party form |
| Instagram (footer) | `https://www.instagram.com/reigatetravel.co/` | External |
| LinkedIn (footer) | `https://ca.linkedin.com/in/tyler-reigate-13b3aa2b2` | External |

### Asset requirements (record: filename · source · approval status)

All photography below: **source Midjourney, supplied via approved project library ("Reigate Travel Image Library.zip", 78 files verified), approved for full commercial use, usage class: editorial/concept only — never documentary proof.** Do not generate substitute images. Do not publicly describe image provenance unless instructed.

| Section | Recommended file(s) |
|---|---|
| 1 Hero | `…Adult_woman_sitting_alone_on_a_stone_wall_overlooki_9cb4b6d1…_0.png` (alt: coastline option `…Quiet_elevated_view_of_a_Mediterranean_coastline_at_1bb4a8b6…_1.png`) |
| 2 Explanation | `…Vertical_editorial_view_through_an_arched_doorway_t_a74601c0…_1.png` |
| 3 Recognition (desktop only, optional) | `…Two_women_in_their_late_thirties_walking_slowly_thr_b0dea836…_0.png` |
| 4 Bespoke | `…Open_travel_journal_with_blank_cream_pages_beside_a_a6ba885f…_0.png` or `…Close_editorial_still_life_of_a_leather_luggage_tag_f2ba64cd…_0.png` |
| 6 Ecosystem cards | Bespoke `…Boutique_hotel_room_prepared_with_understated_care__03a28859…_0.png` · Community `…Wide_editorial_photograph_of_Bronte_Harbour_in_Oakv_f9f215ad…_0.png` · Journeys `…A_small_group_of_five_women_walking_along_a_scenic__a3244edc…_0.png` |
| 7B Community fallback | `…Minimal_Lake_Ontario_horizon_from_the_Oakville_wate_9355fa4c…_2.png` |
| 10 Email (background texture, optional) | `…Soft_botanical_shadows_falling_across_natural_ivory_05bf956b…_0.png` |
| 8 Tyler | **[INPUT REQUIRED: real headshot — AI imagery prohibited for Tyler]** |
| Logos | Logo pack (12 files verified): use `06 - Transparent primary logo.png` (header, if dark-on-light), `13 - White transparent symbol for dark backgrounds.png` (Olive CTA panel/footer), `11 - Full-colour transparent symbol.png` (favicon source). Never redraw, stretch, recolour, or shadow. Vector masters remain a production need. |

Final crops and any substitutions are a Gate 5 (visual direction) decision; flag any asset whose provenance or approval status cannot be confirmed.

### Accessibility (WCAG 2.2 AA)

- One `<h1>` (hero). Sequential `<h2>` per section, `<h3>` for cards/steps. No skipped levels.
- All body text Ink `#1B1B1B` or Olive `#404639` on Ivory/white/Sand. Copper and Taupe never used for body text on Ivory; Copper permitted only for large decorative elements and rules.
- Status conveyed by visible text labels, never colour alone.
- Descriptive CTAs (no bare "Learn more"); external links announce destination and new-tab behaviour.
- Newsletter input has a visible `<label>`; errors are text, associated via `aria-describedby`.
- All images: meaningful alt text per the directions above; purely decorative textures get empty `alt=""`.
- No essential text embedded in images. Visible keyboard focus throughout; logical tab order = DOM order; anchor CTAs move focus.
- `prefers-reduced-motion` honoured globally; page fully functional with zero animation.
- Mobile review begins at 390px.

### Acceptance criteria (per section)

1. **Hero:** H1 renders as text over a solid field; both CTAs keyboard-operable; Begin Planning visually dominant; LCP image optimized.
2. **Explanation:** Both paragraphs present at every breakpoint; anchor `#what-is-reigate` receives hero secondary CTA.
3. **Recognition:** Five statements as a semantic list; no CTA present; no burnout/diagnostic language.
4. **Bespoke:** "Available now" label visible before description at all widths; visually the heaviest offer treatment on the page; CTA routes to `/travel-planning`.
5. **Method:** Five stages in an `<ol>`, correct order at all widths; no photography; no required animation.
6. **Ecosystem:** Three cards; Bespoke card first and visually distinct; both in-development cards carry visible "In development" text labels; links route correctly.
7. **Community:** With `featuredEvent` set, all six approved fields render and the Luma link opens externally with announcement; with `null`, State B renders with status label and no event-like framing; no unconfirmed event ever renderable.
8. **Tyler:** Credentials render exactly as `Certified TICO Travel Advisor · FORA Travel Advisor · WTA Member`; no AI portrait; section renders gracefully with no headshot until supplied.
9. **Travel Notes:** ≤3 cards, each with title, summary, date (`<time>`), topic, accessible external link; renders real article count without padding.
10. **Email:** Official Substack embed loads; labelled input; promise text verbatim; anchor `#join` works and receives focus from Section 11.
11. **Final CTA:** Approved headline verbatim; both CTAs correct; endline appears once, small; panel meets contrast on Olive.

---

# 9. Inputs and Risks

### Resolved 19 July 2026 (no longer blocking)

- **Substack publication** — `https://tylertakesoff.substack.com`. Unblocks Section 10 embed and the Travel Notes publication base. (Also resolves the Charter's open `notes.`/`journal.` subdomain question: the publication lives on substack.com.)
- **Tyler biography** — full five-paragraph bio approved for `/about`; one verbatim sentence used as Section 8 Body 2.
- **Luma calendar** — `https://luma.com/reigatetravelco` (footer/Community). *Note:* a State-A featured event still needs its own specific event URL.
- **Instagram / LinkedIn** — supplied; wired into footer navigation.
- **Inquiry response time** — 24–48 hours. Used on the Begin Planning confirmation/acknowledgement (adjacent page); the homepage itself makes no timing claim.

### Still missing (blocking the noted sections)

1. **[INPUT REQUIRED: approved Tyler headshot photography]** — blocks Section 8 portrait; AI substitution prohibited. Section ships with the Olive typographic fallback until supplied.
2. **[INPUT REQUIRED: three approved Travel Notes articles — titles, summaries, dates, topics, per-article URLs under tylertakesoff.substack.com]** — blocks Section 9 cards. Show the real count; do not pad.
3. **[INPUT REQUIRED: confirmed Community Experience — name, date/time, location, description, expectations, specific Luma event URL]** — determines Section 7 state; launch default is State B.
4. **[INPUT REQUIRED: investment ranges / fee language]** — needed for `/travel-planning` and the inquiry form; the homepage deliberately makes no fee claims.

### Missing image assets

- Real photography of Tyler (headshot and working portraits).
- Real event photography (required before any State A event imagery implies a real occasion).
- Vector logo masters (PNG-only pack is sufficient for web launch but remains a recorded production need).

### Unclear CTA destinations

- None structural. Two conventions decided here and open to reviewer override: **Explore Reigate** as an in-page anchor to Section 2 (rather than a separate page), and **Join the Community** as an anchor to the Section 10 embed (keeping the visitor on-site, per Charter §11 "avoid forcing visitors to leave the site").

### Unconfirmed integrations

- Substack embed specifics (full embed vs. minimal labelled form endpoint) — a build/accessibility decision now that the publication (`tylertakesoff.substack.com`) is confirmed.
- Luma outbound-click tracking approach ("where appropriate", Charter §12) — analytics decision, not a launch blocker.
- Form-delivery provider for `/begin-planning` (Charter §13: selected during technical setup) — outside homepage scope but on the conversion path.

### Copy requiring human approval

- All **[D]** items in Parts 3–5, notably: Section 3 headline and bridge line, Section 4 Bodies 2–3, Method one-liners, Section 7B Body 2, Section 8 headline and Body 1, Section 10 reassurance line, Section 11 support line. Gate 3 governs.

### Strategic conflicts

- **Hero CTA order:** Brand Book Core Copy System lists "Explore Reigate" as the hero's primary action; Charter §9 assigns Begin Planning primary / Explore Reigate secondary. Resolved in the Charter's favour (it governs website conversion hierarchy and was written against the approved Brand Book). Documented in Section 1's storyboard entry; no stop-work required.
- **Domain:** Charter §11 sketches `reigatetravel.com`; approved project metadata supplies `https://www.reigatetravel.co`. Approved metadata governs factual company information — the site targets **reigatetravel.co**. The Charter's subdomain suggestion (`notes.` / `journal.`) is resolved: the publication lives at `https://tylertakesoff.substack.com`, so Travel Notes links out to that domain and no Reigate subdomain is needed for Version 1.
- No other conflicts identified between the Brand Book, Charter, and approved metadata as they apply to the homepage.

---

*Self-review completed against the ten verification points (all 11 purposes represented; Bespoke prioritized; future offers labelled; no unsupported proof; Reigate voice; Tyler visible, not influencer-framed; flow works without testimonials; both conversions clear; mobile narrative preserved; no strategic ambiguity left for implementation). One revision pass applied: Section 4 imagery changed from an advisor-client scene to object still-life to remove any implied client documentation; endline usage constrained to a single small appearance in Section 11; Section 9 padding rule added (“show the real count”).*

*Storyboard stops here. Implementation does not begin until this document is reviewed and approved at Gate 4.*
