import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { CTAPanel } from "@/components/ui/CTAPanel";
import { EditorialHero } from "@/components/content/EditorialHero";
import { SectionIntro } from "@/components/content/SectionIntro";
import { RecognitionList } from "@/components/content/RecognitionList";
import { OfferCard } from "@/components/content/OfferCard";
import { ProcessSteps } from "@/components/content/ProcessSteps";
import { FounderFeature } from "@/components/content/FounderFeature";
import { ArticleCard } from "@/components/content/ArticleCard";
import { NewsletterSignup } from "@/components/content/NewsletterSignup";
import { Interlude } from "@/components/content/Interlude";
import { ScrollSequence } from "@/components/content/ScrollSequence";
import { AmbientVideo } from "@/components/content/AmbientVideo";
import { home } from "@/content/home";
import { offers } from "@/content/offers";
import { featuredArticles } from "@/content/articles";

/**
 * Homepage band rhythm: Ivory and Sand alternate, opened by the full-bleed photographic
 * hero and closed by the single Olive band.
 *
 * White is deliberately no longer used as a band. Ivory (#f6f2ed) and White (#ffffff) are
 * a 3% luminance step, so an Ivory→White transition is invisible and the page read as one
 * continuous beige field — the exact "beige template" the frontend rules forbid. White is
 * retained for its real job: raised surfaces (cards, form fields) that need to lift off a
 * band. See docs/decisions/source-conflicts.md #4.
 */
export default function HomePage() {
  return (
    <>
      {/* 1 — Hero */}
      <EditorialHero />

      {/* 2 — Clear explanation. `lg` so the page opens with more air than it carries mid-scroll. */}
      <Section surface="ivory" size="lg" id="what-is-reigate" aria-labelledby="explanation-heading">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="reveal max-w-[34rem]">
            <SectionIntro heading={home.explanation.heading} headingId="explanation-heading" />
            {home.explanation.body.map((paragraph) => (
              <p key={paragraph} className="text-body text-ink/85 mt-4">
                {paragraph}
              </p>
            ))}
            <div className="mt-6">
              <TextLink href={home.explanation.link.href}>{home.explanation.link.label}</TextLink>
            </div>
          </div>
          {/* Scroll-scrubbed: she walks down the steps toward the water as the visitor
              descends the page, and back up them scrolling up. 24 frames in one strip,
              stepped by a scroll timeline — no JavaScript, and no playhead to reverse.
              See decision-log.md #46. */}
          <ScrollSequence
            src={home.explanation.image.src}
            still={home.explanation.image.sourceStill}
            alt={home.explanation.image.alt}
            frames={home.explanation.image.frames}
            frameWidth={home.explanation.image.frameWidth}
            frameHeight={home.explanation.image.frameHeight}
            className="rounded-sm lg:order-last"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </div>
      </Section>

      {/* 3 — Audience recognition */}
      <Section surface="sand" aria-labelledby="recognition-heading">
        <div className="max-w-[46rem]">
          <SectionIntro heading={home.recognition.heading} headingId="recognition-heading" />
        </div>
        <div>
          <RecognitionList statements={home.recognition.statements} />
          <p className="reveal text-body-lg text-ink/85 mt-6 max-w-[40rem]">
            {home.recognition.bridge}
          </p>
        </div>
      </Section>

      {/* 4 — Bespoke Travel Planning (the current commercial priority — largest offer treatment) */}
      <Section surface="ivory" aria-labelledby="bespoke-heading">
        <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* Bleeds into the gutter at lg so one composition escapes the repeating box. */}
          <EditorialImage
            src={home.bespoke.image.src}
            alt={home.bespoke.image.alt}
            ratio="landscape"
            className="lg:-ml-[max(1.5rem,calc((100vw-var(--container-content))/2))] lg:w-[calc(100%+max(1.5rem,calc((100vw-var(--container-content))/2)))]"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
          <div className="reveal max-w-[36rem]">
            <h2 id="bespoke-heading" className="text-h2">
              {home.bespoke.heading}
            </h2>
            {home.bespoke.body.map((paragraph) => (
              <p key={paragraph} className="text-body text-ink/85 mt-4">
                {paragraph}
              </p>
            ))}
            <div className="mt-8">
              <Button href={home.bespoke.cta.href} variant="primary">
                {home.bespoke.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Interlude — the coastline between the commercial act and the method. No copy, no CTA,
          nothing to read: it exists to change the page's tempo (decision-log #36).
          A clip that plays itself rather than a scroll-scrubbed strip. Client direction, and it
          reverses part of #43 for this band only - the hero still carries no video. It also
          gives the band its full 100svh back, which the 16:9 strip had cost it, worst on a
          phone where it had shrunk from 844px to 219px. */}
      <AmbientVideo src={home.coastline.src} poster={home.coastline.poster} position="50% 55%" />

      {/* 5 — The Reigate Method (process proof). The page's pinned moment — the frame holds
          while the five stages advance. Earned rather than decorative: these stages are a
          real sequence and the order carries meaning. Static five-column list everywhere
          the pinning does not apply. */}
      <Section surface="sand" aria-labelledby="method-heading">
        {/* The track and frame enclose the heading as well as the stages. Pinning the stages
            alone left five floating labels with no context once the heading scrolled past the
            sticky frame — the whole composition has to hold together. */}
        <div className="method-track">
          <div className="method-frame">
            <div className="max-w-[44rem]">
              <SectionIntro
                eyebrow={home.method.eyebrow}
                heading={home.method.heading}
                headingId="method-heading"
                size="statement"
                revealByWord
              />
            </div>
            <ProcessSteps />
          </div>
        </div>
      </Section>

      {/* 6 — Connected ecosystem */}
      <Section surface="ivory" aria-labelledby="ecosystem-heading">
        <div className="max-w-[44rem]">
          <SectionIntro
            heading={home.ecosystem.heading}
            headingId="ecosystem-heading"
            lead={home.ecosystem.subheading}
          />
        </div>
        <div className="reveal-stagger mt-10 space-y-6">
          {offers
            .filter((offer) => offer.emphasis === "primary")
            .map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          <div className="reveal-stagger grid gap-6 sm:grid-cols-2">
            {offers
              .filter((offer) => offer.emphasis === "secondary")
              .map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
          </div>
        </div>
      </Section>

      {/* 7 — Community (State B: philosophy + invitation; no event is confirmed).
          The page's one full-bleed break. Ten of eleven bands otherwise repeat the same
          1152px box, which is the structural cause of the flatness — so this one goes
          edge to edge and the copy panel overlaps upward into it for depth. Built from
          primitives rather than <Section> because it deliberately has no band padding
          above the image. Legibility comes from the solid panel, never from the
          photograph, so it holds regardless of which image is placed here. */}
      <section aria-labelledby="community-heading" className="bg-surface-sand relative isolate">
        {/* Copper hairline marking the page's one structural break. The accent earns its
            place here rather than being sprinkled; it is decorative and carries no meaning. */}
        <div aria-hidden="true" className="bg-copper/70 h-px w-full" />
        {/* Scroll-scrubbed: the water moves and the sailboat drifts right-to-left, toward
            the copy panel that overlaps this band. 20 frames stepped by scroll — the band's
            height is derived from the frame aspect rather than set in vh, because the window
            has to be exactly one frame tall or the next frame bleeds in underneath. */}
        <ScrollSequence
          src={home.community.image.src}
          still={home.community.image.sourceStill}
          alt={home.community.image.alt}
          frames={home.community.image.frames}
          frameWidth={home.community.image.frameWidth}
          frameHeight={home.community.image.frameHeight}
          sizes="100vw"
        />
        <Container className="pb-[var(--spacing-section)]">
          <div className="bg-surface relative -mt-12 max-w-[40rem] p-8 sm:p-10 lg:-mt-28 lg:p-12">
            <SectionIntro heading={home.community.heading} headingId="community-heading" />
            {home.community.body.map((paragraph) => (
              <p key={paragraph} className="text-body text-ink/85 mt-4">
                {paragraph}
              </p>
            ))}
            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                href={home.community.primaryCta.href}
                variant="primary"
                external={home.community.primaryCta.external}
                accessibleLabel={
                  home.community.primaryCta.external ? "Join the Community on Luma" : undefined
                }
              >
                {home.community.primaryCta.label}
              </Button>
              <TextLink href={home.community.secondaryLink.href}>
                {home.community.secondaryLink.label}
              </TextLink>
            </div>
          </div>
        </Container>
      </section>

      {/* 8 — Tyler introduction */}
      <Section surface="ivory" aria-label="About the founder">
        <div className="reveal">
          <FounderFeature />
        </div>
      </Section>

      {/* Interlude — the second tempo change, after the founder act and before the closing
          beats. Warmer and more intimate than the coastline, so the two are not the same
          gesture repeated. */}
      <Interlude src="/images/outdoor-table.png" position="50% 45%" />

      {/* 9 — Travel Notes. Was heading + paragraph + button on a flat band, which read as an
          afterthought. The empty state is inherently thin — there are no approved articles yet
          and none may be invented — so the section earns its presence from art direction
          instead: a tall photograph bleeding out to the right gutter, with the copy held on a
          narrow measure beside it. Mirrors the Bespoke bleed in the other direction so the two
          asymmetries read as a system rather than a repeated trick. */}
      <Section surface="sand" size="sm" aria-labelledby="travel-notes-heading">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="reveal max-w-[34rem]">
            <SectionIntro
              heading={home.travelNotes.heading}
              headingId="travel-notes-heading"
              lead={home.travelNotes.subheading}
              size="sm"
            />
            {featuredArticles.length > 0 ? null : (
              // Neutral state — no approved articles yet (never fabricate cards).
              <p className="text-body text-ink/80 mt-6">{home.travelNotes.emptyState}</p>
            )}
            <div className="mt-7">
              <Button href="/travel-notes" variant="secondary">
                {home.travelNotes.readAllLabel}
              </Button>
            </div>
          </div>

          <EditorialImage
            src="/images/botanical-shadow.png"
            /* Decorative: this is texture and mood, not information the copy depends on. */
            alt=""
            ratio="portrait"
            className="lg:-mr-[max(1.5rem,calc((100vw-var(--container-content))/2))] lg:w-[calc(100%+max(1.5rem,calc((100vw-var(--container-content))/2)))]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {featuredArticles.length > 0 ? (
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {featuredArticles.slice(0, 3).map((article) => (
              <ArticleCard key={article.url} article={article} />
            ))}
          </div>
        ) : null}
      </Section>

      {/* 10 — Tyler Takes Off invitation */}
      <Section surface="ivory" size="sm" aria-label="Join the community">
        <div id="join" className="reveal scroll-mt-[var(--header-height,4.5rem)]">
          <NewsletterSignup />
        </div>
      </Section>

      {/* 11 — Final CTA. `lg` so the page closes with the same air it opened with. */}
      <Section
        surface="inverse"
        size="lg"
        className="cta-frame"
        aria-labelledby="final-cta-heading"
      >
        <CTAPanel
          heading={home.finalCta.heading}
          headingId="final-cta-heading"
          body={home.finalCta.body}
          primary={home.finalCta.primaryCta}
          secondary={home.finalCta.secondaryCta}
          endline={home.finalCta.endline}
          inverse
        />
      </Section>
    </>
  );
}
