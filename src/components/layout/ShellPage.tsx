import { Section } from "@/components/layout/Section";
import { SectionIntro } from "@/components/content/SectionIntro";
import { Button } from "@/components/ui/Button";
import { StatusLabel } from "@/components/ui/StatusLabel";
import type { OfferStatus } from "@/types/content";

interface ShellPageProps {
  eyebrow: string;
  heading: string;
  lead: string;
  /** Extra approved/neutral paragraphs. */
  body?: string[];
  status?: OfferStatus;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
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
  status,
  primaryCta,
  secondaryCta,
}: ShellPageProps) {
  return (
    <Section surface="ivory" width="prose" aria-labelledby="shell-heading">
      {status ? <StatusLabel status={status} className="mb-5" /> : null}
      <SectionIntro eyebrow={eyebrow} heading={heading} headingId="shell-heading" lead={lead} />
      {body.map((paragraph) => (
        <p key={paragraph} className="text-body text-ink/85 mt-4">
          {paragraph}
        </p>
      ))}
      {primaryCta || secondaryCta ? (
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          {primaryCta ? (
            <Button href={primaryCta.href} variant="primary">
              {primaryCta.label}
            </Button>
          ) : null}
          {secondaryCta ? (
            <Button href={secondaryCta.href} variant="secondary">
              {secondaryCta.label}
            </Button>
          ) : null}
        </div>
      ) : null}
    </Section>
  );
}
