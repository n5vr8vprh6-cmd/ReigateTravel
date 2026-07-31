import type { Metadata } from "next";
import { ShellPage } from "@/components/layout/ShellPage";

export const metadata: Metadata = {
  title: "Curated Wellness Journeys",
  description:
    "Small-group travel shaped around wellbeing, connection, culture, and thoughtful exploration.",
};

export default function CuratedJourneysPage() {
  return (
    <ShellPage
      eyebrow="Curated Wellness Journeys"
      heading="Small-group journeys, shaped with intention."
      lead="Curated Wellness Journeys are thoughtfully designed small-group experiences that bring together wellbeing, culture, connection, and time to explore at a more intentional pace."
      body={[
        "This offer is in development. When a journey with real details is ready, you'll hear about it first through the community — no dates, destinations, or prices are promised before they exist.",
      ]}
      primaryCta={{ label: "Join the Community", href: "/#join" }}
    />
  );
}
