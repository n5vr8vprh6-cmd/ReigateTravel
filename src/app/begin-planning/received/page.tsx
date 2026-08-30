import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SectionIntro } from "@/components/content/SectionIntro";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { SchedulingEmbed } from "@/components/forms/SchedulingEmbed";
import { InquiryReceivedBeacon } from "@/components/analytics/InquiryReceivedBeacon";
import { schedulingUrl } from "@/lib/scheduling";
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
 *
 * **The booking step is the point of this page.** It used to end at "Tyler will read this and
 * reply", which asked the most motivated visitor on the site — someone who had just finished a
 * form — to stop, wait for an email, and start a scheduling conversation by hand. When a
 * Calendly URL is configured, they can book instead, while intent is still high. Tyler still
 * reviews every inquiry personally; that has not changed and is said here plainly.
 *
 * With no URL configured the page renders exactly what it rendered before, because promising a
 * booking step that does not exist is the same class of error as simulating a submission.
 */
export default function InquiryReceivedPage() {
  const booking = schedulingUrl;

  return (
    <Section
      surface="ivory"
      width={booking ? "content" : "prose"}
      aria-labelledby="received-heading"
    >
      <InquiryReceivedBeacon />

      <SectionIntro
        as="h1"
        eyebrow="Thank you"
        heading="Your inquiry is with Tyler."
        headingId="received-heading"
        size="statement"
        lead={
          booking
            ? "She reads every inquiry personally. If you already know you would like to talk, you can choose a time below."
            : `She reads every inquiry personally and typically replies within ${site.inquiryResponseTime}.`
        }
        className="max-w-[38rem]"
      />

      {booking ? (
        <div className="mt-12">
          <h2 className="text-h2-sm font-display">Choose a time to speak with Tyler</h2>
          <p className="text-body text-ink/85 mt-3 max-w-[38rem]">
            Around twenty to thirty minutes, and nothing here is a commitment. If nothing suits,
            leave it — Tyler will reply within {site.inquiryResponseTime} either way.
          </p>
          <div className="mt-8">
            <SchedulingEmbed url={booking} />
          </div>
        </div>
      ) : null}

      <div className="mt-14 max-w-[38rem]">
        <h2 className="text-h3 font-display">What happens next</h2>
        <ol className="mt-4 list-inside list-decimal">
          <li className="text-body text-ink/85 mt-2">
            Tyler reads what you shared and considers whether Reigate is the right fit.
          </li>
          <li className="text-body text-ink/85 mt-2">
            {booking
              ? "If you booked a time, that is the conversation. If not, you will hear back by email, or by phone if that is what you asked for."
              : "You will hear back by email, or by phone if that is what you asked for."}
          </li>
          <li className="text-body text-ink/85 mt-2">
            {booking
              ? "The conversation is where the planning actually starts — it is not a commitment."
              : "If it looks like a fit, the next step is a conversation — not a commitment."}
          </li>
        </ol>

        <p className="text-body text-ink/85 mt-8">
          A copy of your inquiry is on its way to you. You have not been added to any mailing list.
        </p>

        {/* Offered after the booking step, never before it. These questions used to sit inside
            the inquiry, where they asked for most of a discovery call up front; here they are
            optional depth for someone who has already decided to talk. */}
        <p className="text-body text-ink/85 mt-8">
          If you would like the conversation to start further along,{" "}
          <TextLink href="/begin-planning/prepare">you can tell Tyler more about the trip</TextLink>
          . Entirely optional.
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
