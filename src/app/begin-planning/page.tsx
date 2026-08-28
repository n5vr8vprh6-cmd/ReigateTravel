import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SectionIntro } from "@/components/content/SectionIntro";
import { Button } from "@/components/ui/Button";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { emailConfigured } from "@/lib/email/config";
import { inquiryCopy } from "@/content/inquiry";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Begin Planning",
  description:
    "Tell us what you are considering. A short guided inquiry so Tyler can understand what matters to you before you speak.",
};

/**
 * The guided inquiry — Charter §10, and the site's primary conversion.
 *
 * The form only renders when delivery is actually configured. With no Resend key the page
 * falls back to the approved mailto path rather than showing a submit button that cannot
 * honour itself: CLAUDE.md's standing rule is that a submission is never simulated, and a
 * form that silently discards an inquiry is the worst version of simulating one.
 */
export default function BeginPlanningPage() {
  return (
    <Section surface="ivory" width="prose" aria-labelledby="begin-planning-heading">
      <SectionIntro
        as="h1"
        eyebrow={inquiryCopy.eyebrow}
        heading={inquiryCopy.heading}
        headingId="begin-planning-heading"
        lead={emailConfigured ? inquiryCopy.lead : undefined}
        size="statement"
      />

      {emailConfigured ? (
        <div className="mt-12">
          <InquiryForm />
        </div>
      ) : (
        <div className="mt-8">
          <p className="text-body text-ink/85 max-w-[38rem]">
            The guided inquiry is not accepting submissions just yet. In the meantime the fastest
            route is a direct email — Tyler reads every one, and typically replies within{" "}
            {site.inquiryResponseTime}.
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
