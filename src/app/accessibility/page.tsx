import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SectionIntro } from "@/components/content/SectionIntro";
import { TextLink } from "@/components/ui/TextLink";
import { accessibility } from "@/content/accessibility";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "How Reigate Travel & Co. approaches WCAG 2.2 AA on this site, how it is tested, where the gaps are, and how to report a barrier.",
};

/**
 * The accessibility statement, replacing the "being finalized" shell.
 *
 * Unlike Privacy and Terms this is not legal copy, which is why it could be written here: it
 * describes what the build does rather than creating an obligation. Every claim in
 * `content/accessibility.ts` is enforced by a test or is an implemented design rule — see the
 * header there for why the wording is narrow in places.
 *
 * This page is itself part of the axe run. A statement about accessibility that had never been
 * scanned would be the worst page on the site to get wrong.
 */
export default function AccessibilityPage() {
  return (
    <Section surface="ivory" width="prose" aria-labelledby="accessibility-heading">
      <SectionIntro
        as="h1"
        eyebrow={accessibility.eyebrow}
        heading={accessibility.heading}
        headingId="accessibility-heading"
        lead={accessibility.lead}
      />
      <p className="text-eyebrow text-olive mt-6 font-semibold tracking-[0.14em] uppercase">
        Last reviewed {accessibility.lastReviewed}
      </p>

      {accessibility.groups.map((group) => (
        <section key={group.id} aria-labelledby={`a11y-${group.id}`} className="mt-12">
          <h2 id={`a11y-${group.id}`} className="text-h3 font-display">
            {group.heading}
          </h2>
          {group.intro ? <p className="text-body text-ink/85 mt-3">{group.intro}</p> : null}
          <ul className="mt-5">
            {group.items.map((item) => (
              <li
                key={item}
                className="border-ink/15 text-body text-ink/85 border-t py-4 last:border-b"
              >
                {item}
              </li>
            ))}
          </ul>
          {/* Rendered from data so the page cannot claim coverage the suite does not have. */}
          {group.id === "how-it-is-checked" ? (
            <ul className="mt-5">
              {accessibility.testedRoutes.map((route) => (
                <li key={route.path} className="text-body text-ink/85 mt-2 list-inside list-disc">
                  {route.label}{" "}
                  {/* ink/70, not ink/60. ink/60 is 4.36:1 on Ivory and fails 1.4.3 — caught by
                      this page's own axe scan, which is the argument for having added it. */}
                  <span className="text-ink/70">({route.path})</span>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}

      <section aria-labelledby="a11y-feedback" className="mt-14">
        <h2 id="a11y-feedback" className="text-h3 font-display">
          {accessibility.feedback.heading}
        </h2>
        {accessibility.feedback.body.map((paragraph) => (
          <p key={paragraph} className="text-body text-ink/85 mt-4">
            {paragraph}
          </p>
        ))}
        <p className="text-body mt-6">
          <TextLink href={`mailto:${site.inquiryEmail}`} external>
            Email {site.inquiryEmail}
          </TextLink>
        </p>
      </section>
    </Section>
  );
}
