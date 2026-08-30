import type { Metadata } from "next";
import { ShellPage } from "@/components/layout/ShellPage";
import { site, communityCta } from "@/content/site";

export const metadata: Metadata = {
  title: "Community Experiences",
  description:
    "Local, accessible gatherings — a way to meet Reigate and participate in intentional living.",
};

export default function CommunityPage() {
  return (
    <ShellPage
      eyebrow="Community Experiences"
      heading="Community begins close to home."
      lead="Reigate Community Experiences bring people together through movement, conversation, local partnerships, and shared moments designed to support living well."
      body={[
        "We're developing our first local gatherings now. There's nothing to register for yet — and we'd rather say that plainly than pretend otherwise. Follow Reigate on Luma and you'll see the first experience as soon as it is confirmed.",
      ]}
      // Only when Luma is confirmed. The generic fallback resolves to this page, and a
      // primary CTA that links to the page you are already on is worse than no CTA.
      primaryCta={site.social.luma ? communityCta : undefined}
    />
  );
}
