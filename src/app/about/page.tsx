import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SectionIntro } from "@/components/content/SectionIntro";
import { Button } from "@/components/ui/Button";
import { credentials } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: "Reigate was founded by Tyler on the belief that travel is part of living well.",
};

export default function AboutPage() {
  return (
    <Section surface="ivory" width="prose" aria-labelledby="about-heading">
      <SectionIntro
        eyebrow="About Reigate"
        heading="Planned by someone who listens first."
        headingId="about-heading"
        lead="Reigate was founded by Tyler — a thoughtful travel advisor, a curious host, and a careful listener. Her approach is simple: understand the person before recommending the place."
      />
      <p className="text-body text-ink/85 mt-4">
        Based in the Greater Toronto Area, Tyler is building Reigate as a trusted relationship
        clients can return to across different journeys, destinations, and stages of life.
      </p>
      <p className="text-body text-olive mt-6 font-semibold">{credentials.join(" · ")}</p>
      <div className="mt-8">
        <Button href="/begin-planning" variant="primary">
          Begin Planning
        </Button>
      </div>
    </Section>
  );
}
