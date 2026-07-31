import type { Metadata } from "next";
import { ShellPage } from "@/components/layout/ShellPage";

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
        "We're developing our first local gatherings now. There's nothing to register for yet — and we'd rather say that plainly than pretend otherwise. Join the community and you'll be invited when the first experience is confirmed.",
      ]}
      primaryCta={{ label: "Join the Community", href: "/#join" }}
    />
  );
}
