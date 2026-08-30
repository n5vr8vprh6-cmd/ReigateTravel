import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SectionIntro } from "@/components/content/SectionIntro";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Reigate Travel & Co.",
};

/**
 * Two routes, not one.
 *
 * This page used to offer a single email address "for travel inquiries and partnerships",
 * which quietly competed with the guided inquiry: a travel-ready visitor was given a
 * lower-friction path that skipped every qualifying question and arrived as an unstructured
 * email. Planning now goes to the brief; everything else goes to the inbox.
 *
 * Known defect, deliberately not papered over: reigatetravel.co has no MX records, so mail to
 * the address below currently bounces (missing-inputs T2, open). That is a DNS change, not a
 * code change. Routing travel inquiries into the form makes it less costly in the meantime,
 * because the form delivers through Resend and does not depend on that mailbox existing.
 */
export default function ContactPage() {
  return (
    <Section surface="ivory" width="prose" aria-labelledby="contact-heading">
      <SectionIntro
        as="h1"
        eyebrow="Contact"
        heading="Start a conversation."
        headingId="contact-heading"
        lead="There are two ways in, depending on what you are here for."
      />

      <div className="border-taupe/40 mt-12 border-t pt-8">
        <h2 className="text-h3 font-display">Planning a trip?</h2>
        <p className="text-body text-ink/85 mt-3">
          The guided inquiry is the fastest route. It gives Tyler what she needs to tell you whether
          Reigate is the right fit, and nothing in it is a commitment.
        </p>
        <div className="mt-6">
          <Button href="/begin-planning" variant="primary">
            Begin your planning brief
          </Button>
        </div>
      </div>

      <div className="border-taupe/40 mt-10 border-t pt-8">
        <h2 className="text-h3 font-display">Partnerships, media, or something else?</h2>
        <p className="text-body text-ink/85 mt-3">
          Email Reigate directly. Tyler typically replies within {site.inquiryResponseTime}.
        </p>
        <p className="text-body mt-4">
          <a
            href={`mailto:${site.inquiryEmail}`}
            className="font-display text-h3 text-ink decoration-taupe hover:decoration-copper underline underline-offset-4 focus-visible:outline-3"
          >
            {site.inquiryEmail}
          </a>
        </p>
      </div>
    </Section>
  );
}
