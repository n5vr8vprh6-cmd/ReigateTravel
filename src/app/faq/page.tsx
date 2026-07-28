import type { Metadata } from "next";
import { ShellPage } from "@/components/layout/ShellPage";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers about planning, community, and how Reigate works.",
};

export default function FaqPage() {
  return (
    <ShellPage
      eyebrow="Frequently Asked Questions"
      heading="Answers, as they take shape."
      lead="This section will cover planning, fees, group travel, wellbeing, community events, and professional support."
      body={[
        "The full set of questions and answers is being written and will be published once reviewed. If there's something you'd like to know now, please reach out.",
      ]}
      primaryCta={{ label: "Contact Reigate", href: "/contact" }}
      secondaryCta={{ label: "Explore Travel Planning", href: "/travel-planning" }}
    />
  );
}
