import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SectionIntro } from "@/components/content/SectionIntro";
import { RecognitionList } from "@/components/content/RecognitionList";
import { ProcessSteps } from "@/components/content/ProcessSteps";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { CTAPanel } from "@/components/ui/CTAPanel";
import { TextLink } from "@/components/ui/TextLink";
import { TrackedCTA } from "@/components/analytics/TrackedCTA";
import { travelPlanning as tp } from "@/content/travel-planning";

export const metadata: Metadata = {
  title: "Bespoke Travel Planning",
  description:
    "One advisor, one relationship, and a journey shaped around the people travelling. How Reigate plans, what it helps with, and how to begin.",
};

/**
 * Charter §8 page 2 — "Convert qualified travel-ready visitors into inquiries."
 *
 * This is the page the Charter routes visitors through before the guided inquiry: Journey A is
 * Homepage → Bespoke Travel Planning → understand fit, value, process and investment → Begin
 * Planning. It had been a Milestone-1 shell, which meant people reached a six-step form having
 * never been told what the service is or how it works.
 *
 * Every string is [D] draft pending copy approval, and the page states no fee, no destination,
 * no supplier relationship and no volume claim — see the header of `travel-planning.ts` for
 * what is deliberately absent and why.
 */
export default function TravelPlanningPage() {
  return (
    <>
      <Section surface="ivory" size="lg" aria-labelledby="tp-heading">
        <div className="max-w-[42rem]">
          <SectionIntro
            as="h1"
            eyebrow={tp.eyebrow}
            heading={tp.heading}
            headingId="tp-heading"
            lead={tp.lead}
            size="statement"
          />
          {/* The page's own CTA, in the hero rather than only at the bottom. This is the page
              Charter Journey A routes travel-ready visitors through, and it previously asked
              them to read all nine sections before offering the action they arrived for. The
              homepage's two-CTA discipline is a homepage rule — this page exists to convert. */}
          <div className="mt-9">
            <TrackedCTA location="travel-planning" href="/begin-planning" variant="primary">
              Begin Planning
            </TrackedCTA>
          </div>
        </div>
      </Section>

      <Section surface="sand" aria-labelledby="tp-audience">
        <div className="max-w-[46rem]">
          <SectionIntro
            heading={tp.audience.heading}
            headingId="tp-audience"
            lead={tp.audience.lead}
          />
        </div>
        <RecognitionList statements={tp.audience.statements} />
      </Section>

      <Section surface="ivory" aria-labelledby="tp-helps">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="reveal max-w-[34rem]">
            <SectionIntro heading={tp.helpsWith.heading} headingId="tp-helps" />
            {tp.helpsWith.body.map((paragraph) => (
              <p key={paragraph} className="text-body text-ink/85 mt-4">
                {paragraph}
              </p>
            ))}
          </div>
          <EditorialImage
            src={tp.helpsWith.image.src}
            alt={tp.helpsWith.image.alt}
            ratio="landscape"
            className="lg:order-last"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </div>
      </Section>

      {/* The concrete counterpart to the section above it: that one says how Reigate thinks,
          this one says what actually gets done. Sand so it separates from the philosophy. */}
      <Section surface="sand" aria-labelledby="tp-handled">
        <div className="max-w-[44rem]">
          <SectionIntro
            heading={tp.handled.heading}
            headingId="tp-handled"
            lead={tp.handled.lead}
          />
        </div>
        <dl className="reveal-stagger mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {tp.handled.items.map((item) => (
            <div key={item.title}>
              <dt className="text-body-lg text-ink font-semibold">{item.title}</dt>
              <dd className="text-body text-ink/85 mt-2">{item.body}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-12">
          <TrackedCTA location="method" href="/begin-planning" variant="primary">
            Begin Planning
          </TrackedCTA>
        </div>
      </Section>

      {/* Bleeds into the right gutter, the opposite direction to the image above it. Three
          text-only bands were about to run consecutively here, which is precisely the flatness
          the design audit identified: alternating Ivory and Sand is not on its own a rhythm. */}
      <Section surface="ivory" aria-labelledby="tp-why">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="reveal max-w-[34rem]">
            <SectionIntro heading={tp.whyAdvisor.heading} headingId="tp-why" />
            {tp.whyAdvisor.body.map((paragraph) => (
              <p key={paragraph} className="text-body text-ink/85 mt-4">
                {paragraph}
              </p>
            ))}
          </div>
          <EditorialImage
            src={tp.whyAdvisor.image.src}
            alt={tp.whyAdvisor.image.alt}
            ratio="landscape"
            className="lg:-mr-[max(1.5rem,calc((100vw-var(--container-content))/2))] lg:w-[calc(100%+max(1.5rem,calc((100vw-var(--container-content))/2)))]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </Section>

      {/* The Method, reused rather than restated. It is the same five approved stages the
          homepage shows; a second wording of them would be a second thing to keep in sync. */}
      <Section surface="sand" aria-labelledby="tp-method">
        <div className="max-w-[44rem]">
          <SectionIntro
            eyebrow={tp.method.eyebrow}
            heading={tp.method.heading}
            headingId="tp-method"
            lead={tp.method.lead}
          />
        </div>
        <ProcessSteps />
      </Section>

      <Section surface="ivory" aria-labelledby="tp-scope">
        <div className="reveal max-w-[40rem]">
          <SectionIntro heading={tp.scope.heading} headingId="tp-scope" />
          {tp.scope.body.map((paragraph) => (
            <p key={paragraph} className="text-body text-ink/85 mt-4">
              {paragraph}
            </p>
          ))}
          <div className="mt-6">
            <TextLink href={tp.scope.link.href}>{tp.scope.link.label}</TextLink>
          </div>
        </div>
      </Section>

      <Section surface="sand" aria-labelledby="tp-investment">
        <div className="reveal max-w-[40rem]">
          <SectionIntro heading={tp.investment.heading} headingId="tp-investment" />
          {tp.investment.body.map((paragraph) => (
            <p key={paragraph} className="text-body text-ink/85 mt-4">
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      <Section surface="ivory" size="sm" aria-labelledby="tp-questions">
        <div className="max-w-[44rem]">
          <SectionIntro heading={tp.questions.heading} headingId="tp-questions" size="sm" />
          <dl className="reveal-stagger mt-8">
            {tp.questions.items.map((item) => (
              <div key={item.q} className="border-ink/15 border-t py-5 last:border-b">
                <dt className="text-body-lg text-ink font-semibold">{item.q}</dt>
                <dd className="text-body text-ink/85 mt-2 max-w-[40rem]">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section surface="inverse" size="lg" className="cta-frame" aria-labelledby="tp-cta">
        <CTAPanel
          heading={tp.cta.heading}
          headingId="tp-cta"
          body={tp.cta.body}
          primary={tp.cta.primary}
          secondary={tp.cta.secondary}
          inverse
        />
      </Section>
    </>
  );
}
