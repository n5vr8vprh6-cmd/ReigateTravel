import type { Metadata } from "next";
import { ShellPage } from "@/components/layout/ShellPage";

export const metadata: Metadata = {
  title: "Partnerships",
  description: "How Reigate works with wellness, lifestyle, and community businesses.",
};

export default function PartnershipsPage() {
  return (
    <ShellPage
      eyebrow="Partnerships"
      heading="Built around shared values."
      lead="Reigate works with trusted wellness and lifestyle businesses to create community experiences and travel opportunities that extend naturally from the work they already do with their clients."
      body={[
        "A full partnership overview is in development. If you'd like to explore working together, we'd welcome a conversation.",
      ]}
      primaryCta={{ label: "Contact Reigate", href: "/contact" }}
    />
  );
}
