import { Section } from "@/components/layout/Section";
import { SectionIntro } from "@/components/content/SectionIntro";
import { Button } from "@/components/ui/Button";
import type { CtaLink } from "@/types/content";

interface ShellPageProps {
  eyebrow: string;
  heading: string;
  lead: string;
  /** Extra approved/neutral paragraphs. */
  body?: string[];
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  /**
   * Heading level for the page title. A standalone route needs its own H1, and
   * `SectionIntro` defaults to h2 — so every ShellPage route rendered without one until
   * this was passed through. Overridable only for a shell nested inside a page that
   * already owns an H1.
   */
  as?: "h1" | "h2";
}

/**
 * Milestone-1 route shell. Every Charter sitemap route renders one of these so navigation
 * and internal-link checks are coherent, WITHOUT fabricating page content. Real content is
 * later-milestone work. Copy passed in is approved or neutral holding language only.
 */
export function ShellPage({
  eyebrow,
  heading,
  lead,
  body = [],
  primaryCta,
  secondaryCta,
  as = "h1",
}: ShellPageProps) {
  return (
    <Section surface="ivory" width="prose" aria-labelledby="shell-heading">
      <SectionIntro
        as={as}
        eyebrow={eyebrow}
        heading={heading}
        headingId="shell-heading"
        lead={lead}
      />
      {body.map((paragraph) => (
        <p key={paragraph} className="text-body text-ink/85 mt-4">
          {paragraph}
        </p>
      ))}
      {primaryCta || secondaryCta ? (
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          {primaryCta ? (
            <Button
              href={primaryCta.href}
              variant="primary"
              external={primaryCta.external}
              accessibleLabel={primaryCta.accessibleLabel}
            >
              {primaryCta.label}
            </Button>
          ) : null}
          {secondaryCta ? (
            <Button
              href={secondaryCta.href}
              variant="secondary"
              external={secondaryCta.external}
              accessibleLabel={secondaryCta.accessibleLabel}
            >
              {secondaryCta.label}
            </Button>
          ) : null}
        </div>
      ) : null}
    </Section>
  );
}
