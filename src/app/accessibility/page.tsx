import type { Metadata } from "next";
import { ShellPage } from "@/components/layout/ShellPage";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Reigate Travel & Co. is committed to an accessible, inclusive website.",
};

export default function AccessibilityPage() {
  return (
    <ShellPage
      eyebrow="Accessibility"
      heading="Designed to be usable by everyone."
      lead="Reigate is committed to meeting WCAG 2.2 AA and to an experience that is readable, keyboard-operable, and respectful of different needs."
      body={[
        "A full accessibility statement, including how to report a barrier, is being finalized. If you encounter a difficulty using this site, please let us know so we can address it.",
      ]}
      primaryCta={{ label: "Contact Reigate", href: "/contact" }}
    />
  );
}
