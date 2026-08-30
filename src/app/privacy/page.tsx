import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SectionIntro } from "@/components/content/SectionIntro";
import { TextLink } from "@/components/ui/TextLink";
import { privacyPolicy } from "@/content/privacy";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Reigate Travel & Co. collects, uses, shares, and protects personal information.",
};

/**
 * The real Privacy Policy, replacing the "content pending legal review" shell. Closes
 * missing-inputs #12, which the guided inquiry's consent checkbox has been referencing since
 * the form shipped.
 *
 * The copy is client-supplied legal text and lives verbatim in `content/privacy.ts` — see the
 * header there for why it is not edited. This file is presentation only.
 *
 * Contact details are read from `site.ts` rather than transcribed out of the PDF. The source
 * document names an email and a website inside §14, and hardcoding those here would create a
 * second place for them to go stale — the standing rule is that destinations come from
 * `site.ts`. Worth knowing: the address it publishes still has no MX records, so the policy
 * now advertises a privacy contact that cannot yet receive mail (missing-inputs T2).
 */
export default function PrivacyPage() {
  return (
    <Section surface="ivory" width="prose" aria-labelledby="privacy-heading">
      <SectionIntro
        as="h1"
        eyebrow="Legal"
        heading={privacyPolicy.title}
        headingId="privacy-heading"
      />
      <p className="text-eyebrow text-olive mt-5 font-semibold tracking-[0.14em] uppercase">
        Effective {privacyPolicy.effectiveDate}
      </p>

      {privacyPolicy.intro.map((block) =>
        block.kind === "p" ? (
          <p key={block.text} className="text-body text-ink/85 mt-5">
            {block.text}
          </p>
        ) : null
      )}

      {privacyPolicy.sections.map((section) => (
        <section key={section.id} aria-labelledby={`policy-${section.id}`} className="mt-12">
          <h2 id={`policy-${section.id}`} className="text-h3 font-display">
            {section.heading}
          </h2>
          {section.blocks.map((block, index) =>
            block.kind === "p" ? (
              <p key={`${section.id}-${index}`} className="text-body text-ink/85 mt-4">
                {block.text}
              </p>
            ) : block.kind === "sub" ? (
              // h3 under the section's h2 — these are labelled sub-parts in the source, and as
              // plain paragraphs they read as a sentence fragment rather than a label.
              <h3 key={`${section.id}-${index}`} className="text-body text-ink mt-6 font-semibold">
                {block.text}
              </h3>
            ) : (
              <ul key={`${section.id}-${index}`} className="mt-4">
                {block.items.map((item) => (
                  <li key={item} className="text-body text-ink/85 mt-2 list-inside list-disc">
                    {item}
                  </li>
                ))}
              </ul>
            )
          )}

          {/* §14 names the contact route. Rendered from site.ts so there is one source for it. */}
          {section.id === "contact" ? (
            <p className="text-body mt-4">
              <TextLink href={`mailto:${site.inquiryEmail}`} external>
                {site.inquiryEmail}
              </TextLink>
            </p>
          ) : null}
        </section>
      ))}
    </Section>
  );
}
