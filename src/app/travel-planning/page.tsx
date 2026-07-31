import type { Metadata } from "next";
import { ShellPage } from "@/components/layout/ShellPage";

export const metadata: Metadata = {
  title: "Bespoke Travel Planning",
  description:
    "Personalized travel designed around your goals, preferences, relationships, and pace.",
};

export default function TravelPlanningPage() {
  return (
    <ShellPage
      eyebrow="Bespoke Travel Planning"
      heading="Travel designed around how you want to feel."
      lead="Bespoke Travel Planning begins with how you want the journey to feel. Reigate turns your priorities, preferences, and ideas into a thoughtfully coordinated travel experience designed around you."
      body={[
        "The full details of the service, process, and how to begin are being finalized. In the meantime, you can start a conversation and Tyler will take it from there.",
      ]}
      primaryCta={{ label: "Begin Planning", href: "/begin-planning" }}
      secondaryCta={{ label: "Meet Tyler", href: "/about" }}
    />
  );
}
