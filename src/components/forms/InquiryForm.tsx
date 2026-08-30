"use client";

import { submitInquiry } from "@/app/begin-planning/actions";
import { initialInquiryState } from "@/lib/forms/inquiry-state";
import { GuidedForm } from "@/components/forms/GuidedForm";
import { inquirySteps, inquiryCopy } from "@/content/inquiry";

/**
 * The guided inquiry — Charter §10, and the site's primary conversion.
 *
 * All behaviour lives in `GuidedForm`, which the pre-call enrichment form also uses. This is
 * the inquiry's particular configuration: its three steps, its copy, its server action, consent
 * (an inquiry needs it), and tracking (this is the measured funnel; enrichment is not).
 */
export function InquiryForm() {
  return (
    <GuidedForm
      steps={inquirySteps}
      copy={inquiryCopy}
      action={submitInquiry}
      initialState={initialInquiryState}
      withConsent
      track
    />
  );
}
