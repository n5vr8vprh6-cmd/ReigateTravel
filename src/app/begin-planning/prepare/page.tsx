import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SectionIntro } from "@/components/content/SectionIntro";
import { Button } from "@/components/ui/Button";
import { EnrichmentForm } from "@/components/forms/EnrichmentForm";
import { emailConfigured } from "@/lib/email/config";
import { enrichmentCopy } from "@/content/inquiry";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Help Tyler prepare",
  description:
    "Optional notes before your planning conversation, so the call starts further along than an introduction.",
  // Reached from the confirmation page, not from search. Indexing it would put a form that
  // assumes a booked call in front of people who have not made an inquiry.
  robots: { index: false, follow: true },
};

/**
 * Pre-call enrichment — Charter §10's Purpose, Style, Timing and Context groups.
 *
 * These used to sit inside the inquiry, where they asked someone to complete most of a
 * discovery call before they had earned any personal interaction. Here they are asked of
 * someone who has already raised their hand and, ideally, booked a time — at which point the
 * same questions are obviously worth answering rather than a wall to climb.
 *
 * Same delivery discipline as the inquiry: with Resend unconfigured the form does not render at
 * all, because a form that cannot deliver is worse than an honest absence.
 */
export default function PreparePage() {
  return (
    <Section surface="ivory" aria-labelledby="prepare-heading">
      <SectionIntro
        as="h1"
        eyebrow={enrichmentCopy.eyebrow}
        heading={enrichmentCopy.heading}
        headingId="prepare-heading"
        lead={emailConfigured ? enrichmentCopy.lead : undefined}
        className="max-w-[38rem]"
      />

      {emailConfigured ? (
        <>
          <p className="text-eyebrow text-olive mt-6 max-w-[38rem] tracking-[0.14em] uppercase">
            {enrichmentCopy.expectation}
          </p>
          <div className="mt-12">
            <EnrichmentForm />
          </div>
        </>
      ) : (
        <div className="mt-8">
          <p className="text-body text-ink/85 max-w-[38rem]">
            This form is not accepting submissions just yet. If there is anything you would like
            Tyler to know before you speak, a direct email is the fastest route.
          </p>
          <div className="mt-8">
            <Button href={`mailto:${site.inquiryEmail}`} variant="primary" external>
              Email {site.inquiryEmail}
            </Button>
          </div>
        </div>
      )}
    </Section>
  );
}
