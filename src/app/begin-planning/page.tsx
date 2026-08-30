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
 *
 * Width is `content`, not `prose`. At prose the form was a 40rem column with the right half of
 * the page empty, and there was nowhere to stand the step index that shows the visitor how much
 * of the inquiry is left. The form manages its own two-column grid inside; the heading cluster
 * is capped at 38rem so it still aligns with the fields rather than stretching to 72rem.
 *
 * The H1 steps down from `statement` to `default`. Two statement-scale headings stacked - the
 * page title and the step's question - compete, and the question is the one that should win:
 * it is what the visitor is actually being asked. An H1 set smaller than the H2 beneath it is
 * a deliberate editorial call, and changes nothing about the heading order.
 */
export default function BeginPlanningPage() {
  return (
    <Section surface="ivory" aria-labelledby="begin-planning-heading">
      <SectionIntro
        as="h1"
        eyebrow={inquiryCopy.eyebrow}
        heading={inquiryCopy.heading}
        headingId="begin-planning-heading"
        lead={emailConfigured ? inquiryCopy.lead : undefined}
        className="max-w-[38rem]"
      />

      {emailConfigured ? (
        <>
          {/* States what is verifiable from the form itself — how many steps, how little is
              compulsory, and who reads the result. Deliberately not "takes about N minutes":
              nobody has measured that, and inventing a figure to reduce friction is a small
              untruth this project does not trade in. */}
          <p className="text-eyebrow text-olive mt-6 max-w-[38rem] tracking-[0.14em] uppercase">
            {inquiryCopy.expectation}
          </p>
          <div className="mt-12">
            <InquiryForm />
          </div>
        </>
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
