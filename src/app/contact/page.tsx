import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SectionIntro } from "@/components/content/SectionIntro";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Reigate Travel & Co.",
};

export default function ContactPage() {
  return (
    <Section surface="ivory" width="prose" aria-labelledby="contact-heading">
      <SectionIntro
        eyebrow="Contact"
        heading="Start a conversation."
        headingId="contact-heading"
        lead={`For travel inquiries and partnerships, email Reigate directly. Tyler typically replies within ${site.inquiryResponseTime}.`}
      />
      <p className="text-body mt-6">
        <a
          href={`mailto:${site.inquiryEmail}`}
          className="font-display text-h3 text-ink decoration-taupe hover:decoration-copper underline underline-offset-4 focus-visible:outline-3"
        >
          {site.inquiryEmail}
        </a>
      </p>
    </Section>
  );
}
