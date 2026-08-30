"use client";

import { submitEnrichment } from "@/app/begin-planning/prepare/actions";
import { initialInquiryState } from "@/lib/forms/inquiry-state";
import { GuidedForm } from "@/components/forms/GuidedForm";
import { enrichmentSteps, enrichmentCopy } from "@/content/inquiry";

/**
 * The pre-call enrichment form: Charter §10's Purpose, Style, Timing and Context groups, asked
 * after a conversation is booked rather than before one is offered.
 *
 * No consent field — the inquiry this follows already took it, and asking again would imply the
 * first one lapsed. Not tracked: mixing these steps into `inquiry_step_reached` would put two
 * different populations in one series and quietly make the funnel drop-off wrong.
 */
export function EnrichmentForm() {
  return (
    <GuidedForm
      steps={enrichmentSteps}
      copy={enrichmentCopy}
      action={submitEnrichment}
      initialState={initialInquiryState}
    />
  );
}
