import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { SectionIntro } from "@/components/content/SectionIntro";
import { CTAPanel } from "@/components/ui/CTAPanel";
import { about } from "@/content/about";
import { credentials } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Reigate was founded by Tyler on the belief that travel is part of living well. Why it exists, how it works, and what it will not claim.",
};

/**
 * Charter §8 page 5 — "Build trust in Tyler and explain why Reigate exists."
 *
 * It answers the second half properly and the first half only as far as approved material
 * allows. Tyler's perspective, the founding story and her values need her own words: §18 bars
 * inventing personal claims about her, and missing-inputs #8 records the biography as
 * outstanding. See the header of `about.ts` for exactly what is sourced from where.
 *
 * The portrait sits at the top rather than beside the credentials, because the page's job is
 * trust and a face does more of that than a paragraph.
 */
export default function AboutPage() {
  return (
    <>
      <Section surface="ivory" size="lg" aria-labelledby="about-heading">
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <figure className="m-0">
            <div className="bg-sand relative aspect-square overflow-hidden rounded-sm">
              <Image
                src={about.portrait.src}
                alt={about.portrait.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </figure>

          <div>
            <SectionIntro
              as="h1"
              eyebrow={about.eyebrow}
              heading={about.heading}
              headingId="about-heading"
              lead={about.intro}
            />
            <p className="text-body text-ink/85 mt-4 max-w-[36rem]">{about.founder}</p>
            {/* The three approved strings, exactly as approved. Nothing is said about what any
                of the bodies behind them do or entitle a client to — §18 lists certifications
                among the things that must never be invented. */}
            <p className="text-body text-olive mt-6 font-semibold">{credentials.join(" · ")}</p>
          </div>
        </div>
      </Section>

      {/* Tyler's own words, in her own section, ahead of everything derived. Placed before
          "Why Reigate exists" deliberately: that section is [D] copy reasoning about the
          business, and this is the founder actually speaking. The approved voice leads. */}
      <Section surface="sand" aria-labelledby="about-meet-tyler">
        <div className="reveal max-w-[40rem]">
          <SectionIntro heading={about.meetTyler.heading} headingId="about-meet-tyler" />
          {about.meetTyler.body.map((paragraph) => (
            <p key={paragraph} className="text-body text-ink/85 mt-4">
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      <Section surface="ivory" aria-labelledby="about-story">
        <div className="reveal max-w-[40rem]">
          <SectionIntro heading={about.story.heading} headingId="about-story" />
          {about.story.body.map((paragraph) => (
            <p key={paragraph} className="text-body text-ink/85 mt-4">
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      <Section surface="sand" aria-labelledby="about-principles">
        <div className="max-w-[44rem]">
          <SectionIntro
            heading={about.principles.heading}
            headingId="about-principles"
            lead={about.principles.lead}
          />
        </div>
        <ol className="reveal-stagger mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
          {about.principles.items.map((item, index) => (
            <li key={item.name} className="relative pt-5">
              <span
                aria-hidden="true"
                className="bg-taupe/50 absolute inset-x-0 top-0 block h-px"
              />
              <span className="font-display text-olive block text-[1.75rem] leading-none">
                {index + 1}
              </span>
              <h3 className="font-display text-h3 mt-3">{item.name}</h3>
              <p className="text-body text-ink/80 mt-2 max-w-[26rem]">{item.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Charter §2's "it will not rely on" list, published as a public commitment. It is the
          brand's own stated position, and it explains the absence of proof a visitor might
          otherwise expect to find on a page like this. */}
      <Section surface="ivory" aria-labelledby="about-restraint">
        <div className="max-w-[44rem]">
          <SectionIntro
            heading={about.restraint.heading}
            headingId="about-restraint"
            lead={about.restraint.lead}
          />
          <ul className="reveal-stagger mt-8">
            {about.restraint.items.map((item) => (
              <li
                key={item}
                className="border-ink/15 text-body-lg text-ink border-t py-5 last:border-b"
              >
                <span className="block max-w-[40rem]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section surface="inverse" size="lg" className="cta-frame" aria-labelledby="about-cta">
        <CTAPanel
          heading={about.cta.heading}
          headingId="about-cta"
          body={about.cta.body}
          primary={about.cta.primary}
          secondary={about.cta.secondary}
          inverse
        />
      </Section>
    </>
  );
}
