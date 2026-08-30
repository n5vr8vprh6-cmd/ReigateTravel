import type { Metadata } from "next";
import { ShellPage } from "@/components/layout/ShellPage";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms for using the Reigate Travel & Co. website and services.",
};

/**
 * Still a holding page, and deliberately so.
 *
 * Terms of service create obligations rather than describe behaviour, and for a business in a
 * regulated category that means TICO disclosure, who the contract is with when a supplier is
 * involved, cancellation, and liability. Drafting that here would mean inventing terms Reigate
 * has not agreed to and publishing them as if binding — wrong terms are worse than absent ones,
 * because a visitor can rely on them. It gets the same treatment the Privacy Policy got: a
 * supplied document, transcribed verbatim.
 *
 * What changed is the copy. "Content pending legal review" told a visitor nothing they could
 * use. The three facts below are true of the build today and are the ones actually worth knowing
 * while the document is written: nothing here takes money, nothing here books anything, and the
 * one thing the site does collect is already governed by a policy that exists.
 *
 * The drafting brief is at `docs/legal/terms-brief.md`.
 */
export default function TermsPage() {
  return (
    <ShellPage
      eyebrow="Terms"
      heading="Terms"
      lead="A full set of terms, reviewed for the applicable jurisdiction and business structure, is still being prepared. Until it exists, here is what governs the use of this site."
      body={[
        "This website does not take payment, hold card details, or create a booking. Nothing you do here commits you to anything, and no travel is reserved until Reigate has spoken with you and confirmed arrangements separately.",
        "The one thing this site collects is what you choose to put into the guided inquiry. That is covered by the Privacy Policy, which is published in full — it is emailed to Tyler so she can reply, and it is not stored on this website, sold, or added to any mailing list.",
        "When travel is arranged, suppliers such as airlines, hotels and tour operators have their own terms and conditions, and those apply to the arrangements they provide. Reigate will set out how that works, in writing, before anything is booked.",
      ]}
      primaryCta={{ label: "Read the Privacy Policy", href: "/privacy" }}
      secondaryCta={{ label: "Contact Reigate", href: "/contact" }}
    />
  );
}
