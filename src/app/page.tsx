import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { StatusLabel } from "@/components/ui/StatusLabel";
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
          <div className="max-w-[34rem]">
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
          <EditorialImage
            src={home.explanation.image.src}
            alt={home.explanation.image.alt}
            ratio="portrait"
            className="lg:order-last"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </div>
      </Section>

      {/* 3 — Audience recognition */}
      <Section surface="sand" aria-labelledby="recognition-heading">
        <div className="max-w-[46rem]">
          <SectionIntro heading={home.recognition.heading} headingId="recognition-heading" />
        </div>
        <div className="reveal">
          <RecognitionList statements={home.recognition.statements} />
          <p className="text-body-lg text-ink/85 mt-6 max-w-[40rem]">{home.recognition.bridge}</p>
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
          <div className="max-w-[36rem]">
            <StatusLabel status="available" className="mb-5" />
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

      {/* 5 — The Reigate Method (process proof) */}
      <Section surface="sand" aria-labelledby="method-heading">
        <div className="max-w-[44rem]">
          <SectionIntro
            eyebrow={home.method.eyebrow}
            heading={home.method.heading}
            headingId="method-heading"
            size="statement"
          />
        </div>
        <ProcessSteps />
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
        <div className="reveal mt-10 space-y-6">
          {offers
            .filter((offer) => offer.emphasis === "primary")
            .map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          <div className="grid gap-6 sm:grid-cols-2">
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
        <div className="relative h-[38vh] min-h-[15rem] w-full overflow-hidden lg:h-[30rem]">
          <Image
            src={home.community.image.src}
            alt={home.community.image.alt}
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <Container className="pb-[var(--spacing-section)]">
          <div className="bg-surface relative -mt-12 max-w-[40rem] p-8 sm:p-10 lg:-mt-28 lg:p-12">
            <SectionIntro heading={home.community.heading} headingId="community-heading" />
            {home.community.body.map((paragraph) => (
              <p key={paragraph} className="text-body text-ink/85 mt-4">
                {paragraph}
              </p>
            ))}
            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button href={home.community.primaryCta.href} variant="primary">
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

      {/* 9 — Travel Notes */}
      <Section surface="sand" aria-labelledby="travel-notes-heading">
        <div className="max-w-[44rem]">
          <SectionIntro
            heading={home.travelNotes.heading}
            headingId="travel-notes-heading"
            lead={home.travelNotes.subheading}
            size="sm"
          />
        </div>
        {featuredArticles.length > 0 ? (
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {featuredArticles.slice(0, 3).map((article) => (
              <ArticleCard key={article.url} article={article} />
            ))}
          </div>
        ) : (
          // Neutral state — no approved articles yet (never fabricate cards).
          <div className="mt-8 max-w-[40rem]">
            <p className="text-body text-ink/80">{home.travelNotes.emptyState}</p>
            <div className="mt-6">
              <Button href="/travel-notes" variant="secondary">
                {home.travelNotes.readAllLabel}
              </Button>
            </div>
          </div>
        )}
      </Section>

      {/* 10 — Tyler Takes Off invitation */}
      <Section surface="ivory" aria-label="Join the community">
        <div id="join" className="scroll-mt-[var(--header-height,4.5rem)]">
          <NewsletterSignup />
        </div>
      </Section>

      {/* 11 — Final CTA. `lg` so the page closes with the same air it opened with. */}
      <Section surface="inverse" size="lg" aria-labelledby="final-cta-heading">
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
