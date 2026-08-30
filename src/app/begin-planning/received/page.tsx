import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SectionIntro } from "@/components/content/SectionIntro";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Inquiry received",
  description: "Your inquiry has reached Reigate Travel & Co.",
  // A confirmation page has nothing to offer search, and indexing it would put a page
  // that reads as a completed action in front of people who never submitted anything.
  robots: { index: false, follow: true },
};

/**
 * Reached only by redirect from a successful submission. Charter §10 requires a clear
 * confirmation, the expected response time, and — because §10 also forbids auto-subscribing
 * inquiry users — an explicit statement that no mailing list was involved.
 */
export default function InquiryReceivedPage() {
  return (
    <Section surface="ivory" width="prose" aria-labelledby="received-heading">
      <SectionIntro
        as="h1"
        eyebrow="Thank you"
        heading="Your inquiry is with Tyler."
        headingId="received-heading"
        size="statement"
        lead={`She reads every inquiry personally and typically replies within ${site.inquiryResponseTime}.`}
      />

      <div className="mt-10 max-w-[38rem]">
        <h2 className="text-h3 font-display">What happens next</h2>
        <ol className="mt-4 list-inside list-decimal">
          <li className="text-body text-ink/85 mt-2">
            Tyler reads what you shared and considers whether Reigate is the right fit.
          </li>
          <li className="text-body text-ink/85 mt-2">
            You will hear back by email, or by phone if that is what you asked for.
          </li>
          <li className="text-body text-ink/85 mt-2">
            If it looks like a fit, the next step is a conversation — not a commitment.
          </li>
        </ol>

        <p className="text-body text-ink/85 mt-8">
          A copy of your inquiry is on its way to you. You have not been added to any mailing list.
        </p>

        <div className="mt-10">
          <Button href="/" variant="secondary">
            Back to the homepage
          </Button>
        </div>
      </div>
    </Section>
  );
}
