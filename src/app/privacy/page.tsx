import type { Metadata } from "next";
import { ShellPage } from "@/components/layout/ShellPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Reigate Travel & Co. handles personal information.",
};

export default function PrivacyPage() {
  return (
    <ShellPage
      eyebrow="Privacy Policy"
      heading="Privacy Policy"
      lead="Reigate takes the handling of personal information seriously."
      body={[
        "This policy is being prepared and reviewed for the applicable jurisdiction and business structure before launch. Content pending legal review.",
      ]}
      primaryCta={{ label: "Contact Reigate", href: "/contact" }}
    />
  );
}
