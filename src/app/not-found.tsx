import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SectionIntro } from "@/components/content/SectionIntro";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <Section surface="ivory" width="prose" aria-labelledby="notfound-heading">
      <SectionIntro
        as="h1"
        eyebrow="404"
        heading="This page has wandered off."
        headingId="notfound-heading"
        lead="The page you were looking for isn't here. Let's get you back to somewhere useful."
      />
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button href="/" variant="primary">
          Return home
        </Button>
        <Button href="/travel-planning" variant="secondary">
          Explore Travel Planning
        </Button>
      </div>
    </Section>
  );
}
