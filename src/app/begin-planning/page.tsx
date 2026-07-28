import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SectionIntro } from "@/components/content/SectionIntro";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Begin Planning",
  description: "Start a conversation with Reigate about the journey you're considering.",
};

/**
 * Milestone-1 shell. The guided inquiry form and its secure delivery are a later milestone;
 * no email provider is approved, so we do NOT simulate a submission. We offer the approved
 * business inquiry email as the honest interim path.
 */
export default function BeginPlanningPage() {
  return (
    <Section surface="ivory" width="prose" aria-labelledby="begin-heading">
      <SectionIntro
        eyebrow="Begin Planning"
        heading="Tell us what you're considering."
        headingId="begin-heading"
        lead="Your answers help Tyler understand what matters to you and whether Reigate is the right planning partner. The guided inquiry is on its way."
      />
      <p className="text-body text-ink/85 mt-4">
        In the meantime, you can start the conversation directly by email. Tyler typically replies
        within {site.inquiryResponseTime}.
      </p>
      <div className="mt-8">
        <Button href={`mailto:${site.inquiryEmail}`} variant="primary" external>
          Email {site.inquiryEmail}
        </Button>
      </div>
    </Section>
  );
}
