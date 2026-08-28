import { site } from "@/content/site";

/**
 * Delivery configuration. Server-only: none of these are `NEXT_PUBLIC_`, so none reach the
 * browser bundle.
 *
 * `INQUIRY_TO_EMAIL` is an environment variable rather than a value in `site.ts` because
 * `site.ts` is compiled into the page source. It falls back to the published address, which is
 * already public in the mailto links, so the fallback leaks nothing new.
 */
export const resendApiKey = process.env.RESEND_API_KEY ?? "";
export const inquiryFromEmail = process.env.INQUIRY_FROM_EMAIL ?? "";
export const inquiryToEmail = process.env.INQUIRY_TO_EMAIL ?? site.inquiryEmail;

/**
 * Whether the form can actually deliver. When false the page renders the approved mailto
 * shell instead of a form — the site never shows a submit button it cannot honour, which is
 * the standing rule in CLAUDE.md: a submission is never simulated.
 */
export const emailConfigured = Boolean(resendApiKey && inquiryFromEmail && inquiryToEmail);
