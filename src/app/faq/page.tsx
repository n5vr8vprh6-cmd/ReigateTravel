import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SectionIntro } from "@/components/content/SectionIntro";
import { CTAPanel } from "@/components/ui/CTAPanel";
import { faq } from "@/content/faq";
import { faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Planning, fees, travelling with others, what wellbeing means here, community, and the professional side of working with Reigate.",
};

/**
 * Charter §8 page 9 — "Reduce uncertainty across planning, fees, group travel, wellness,
 * community events and professional support." Those six areas are the six groups.
 *
 * Every answer is [D] draft pending copy approval, and each traces to the Method, the inquiry
 * form's own fields, approved metadata, or approved offer status. See the header of
 * `src/content/faq.ts` for what is deliberately not answered and why — fees and credentials are
 * both answered by declining, on purpose.
 *
 * Bands alternate rather than running as one long list: six groups of beige in a row is the
 * flatness the design audit named, and an FAQ is the page most likely to become exactly that.
 */
export default function FaqPage() {
  return (
    <>
      <Section surface="ivory" size="lg" aria-labelledby="faq-heading">
        <div className="max-w-[42rem]">
          <SectionIntro
            as="h1"
            eyebrow={faq.eyebrow}
            heading={faq.heading}
            headingId="faq-heading"
            lead={faq.lead}
            size="statement"
          />
        </div>
      </Section>

      {faq.groups.map((group, index) => (
        <Section
          key={group.id}
          surface={index % 2 === 0 ? "sand" : "ivory"}
          size="sm"
          id={group.id}
          aria-labelledby={`faq-${group.id}`}
        >
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            {/* The group name sits beside its questions rather than above them, so a long page
                of Q&A keeps a left edge to scan and never becomes one undifferentiated column. */}
            <h2
              id={`faq-${group.id}`}
              className="text-h3 font-display text-olive lg:sticky lg:top-[calc(var(--header-height,4.5rem)+2rem)] lg:self-start"
            >
              {group.name}
            </h2>

            <dl className="reveal-stagger">
              {group.items.map((item) => (
                <div
                  key={item.q}
                  className="border-ink/15 border-t py-5 first:border-t-0 first:pt-0"
                >
                  <dt className="text-body-lg text-ink font-semibold">{item.q}</dt>
                  <dd className="text-body text-ink/85 mt-2 max-w-[42rem]">{item.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>
      ))}

      <Section surface="inverse" size="lg" className="cta-frame" aria-labelledby="faq-cta">
        <CTAPanel
          heading={faq.cta.heading}
          headingId="faq-cta"
          body={faq.cta.body}
          primary={faq.cta.primary}
          secondary={faq.cta.secondary}
          inverse
        />
      </Section>

      {/* Built from the rendered content, so the markup and the page cannot disagree. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faq.groups)) }}
      />
    </>
  );
}
