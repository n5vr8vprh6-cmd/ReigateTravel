import type { FieldErrors } from "@/lib/validation/inquiry";

/**
 * The action's return shape, kept out of the action module on purpose.
 *
 * A `"use server"` file may only export async functions. A non-function export from one does
 * not fail the build — it silently arrives as `undefined` on the client, which surfaced here as
 * "Cannot read properties of undefined" while prerendering, three layers away from the cause.
 */
export type InquiryStatus = "idle" | "invalid" | "rate_limited" | "delivery_failed";

export interface InquiryState {
  status: InquiryStatus;
  fieldErrors: FieldErrors;
  /** Echoed back so a failed submit never costs the visitor what they typed. */
  values: Record<string, string>;
}

export const initialInquiryState: InquiryState = {
  status: "idle",
  fieldErrors: {},
  values: {},
};
