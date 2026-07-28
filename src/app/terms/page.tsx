import type { Metadata } from "next";
import { ShellPage } from "@/components/layout/ShellPage";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms for using the Reigate Travel & Co. website and services.",
};

export default function TermsPage() {
  return (
    <ShellPage
      eyebrow="Terms"
      heading="Terms"
      lead="The terms that govern the use of this website and Reigate's services."
      body={[
        "These terms are being prepared and reviewed for the applicable jurisdiction and business structure before launch. Content pending legal review.",
      ]}
      primaryCta={{ label: "Contact Reigate", href: "/contact" }}
    />
  );
}
