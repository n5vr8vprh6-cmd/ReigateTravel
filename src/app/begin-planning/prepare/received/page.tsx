import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SectionIntro } from "@/components/content/SectionIntro";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Notes received",
  description: "Your pre-call notes have reached Reigate Travel & Co.",
  robots: { index: false, follow: true },
};

/** Reached only by redirect from a successful enrichment submission. */
export default function EnrichmentReceivedPage() {
  return (
    <Section surface="ivory" width="prose" aria-labelledby="prepare-received-heading">
      <SectionIntro
        as="h1"
        eyebrow="Thank you"
        heading="Tyler has your notes."
        headingId="prepare-received-heading"
        size="statement"
        lead="These will be read before you speak, so the conversation can start further along than an introduction."
      />
      <div className="mt-10">
        <Button href="/" variant="secondary">
          Back to the homepage
        </Button>
      </div>
    </Section>
  );
}
