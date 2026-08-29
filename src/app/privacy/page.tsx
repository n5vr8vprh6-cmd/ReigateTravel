import type { Metadata } from "next";
import { ShellPage } from "@/components/layout/ShellPage";
import { analyticsEnabled } from "@/lib/analytics";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Reigate Travel & Co. handles personal information.",
};

/**
 * The policy itself is still missing-inputs #8 and #12 — it needs a lawyer, not an agent, and
 * nothing here pretends otherwise. What IS written here is a plain statement of what the site
 * actually does, which is a factual description rather than legal drafting, and which the
 * visitor is owed now rather than at launch.
 *
 * The measurement paragraph is driven by the same flag that loads the script. That is the point:
 * a privacy page that describes analytics the build is not running, or stays silent about
 * analytics it is, is worse than one that says nothing. Tying both to `analyticsEnabled` means
 * the page cannot drift from the deployment — the same way /begin-planning renders the form or
 * the mailto fallback from `emailConfigured`.
 */
export default function PrivacyPage() {
  const measurement = analyticsEnabled
    ? "This site records anonymous, aggregate usage: which pages are opened, and how far through the guided inquiry visitors get. It sets no cookies for this, does not identify you, does not follow you to other websites, and never records anything you type into the form."
    : "This site sets no cookies, loads no advertising or tracking scripts, and does not measure how you use it.";

  return (
    <ShellPage
      eyebrow="Privacy Policy"
      heading="Privacy Policy"
      lead="Reigate takes the handling of personal information seriously."
      body={[
        "This policy is being prepared and reviewed for the applicable jurisdiction and business structure before launch. Content pending legal review.",
        "In the meantime, plainly: what you enter into the guided inquiry is emailed to Tyler so he can reply. It is not stored on this website, sold, or added to any mailing list.",
        measurement,
      ]}
      primaryCta={{ label: "Contact Reigate", href: "/contact" }}
    />
  );
}
