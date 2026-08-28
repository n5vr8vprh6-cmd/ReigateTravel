import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { home } from "@/content/home";

/**
 * Section 10 — Tyler Takes Off invitation. Embeds the official Substack signup form (the
 * single third-party embed on the page, lazy-loaded). If the publication URL is ever
 * unconfirmed (null), falls back to an approved neutral state with no broken embed.
 * Newsletter consent stays separate and explicit; inquiry-form users are never auto-subscribed.
 */
export function NewsletterSignup() {
  const { heading, body, reassurance } = home.newsletter;
  const substack = site.social.substack;

  return (
    <div className="mx-auto max-w-[40rem] text-center">
      {/* Quieter step: this is a utility invitation, not one of the narrative beats. */}
      <h2 className="text-h2-sm">{heading}</h2>
      <p className="text-body-lg text-ink/85 mx-auto mt-4 max-w-[34rem]">{body}</p>

      {substack ? (
        <div className="mx-auto mt-8 w-full max-w-[26rem]">
          <iframe
            src={`${substack}/embed`}
            title={`Subscribe to ${site.social.substackPublicationName} on Substack`}
            className="border-ink/15 h-[150px] w-full rounded-sm border bg-white"
            loading="lazy"
          />
          <p className="text-eyebrow text-olive mt-3 uppercase">{reassurance}</p>
          <p className="text-body text-ink/70 mt-2">
            Prefer to read first?{" "}
            <a
              href={substack}
              target="_blank"
              rel="noopener noreferrer"
              className="decoration-taupe hover:decoration-copper link-motion font-semibold underline underline-offset-4"
            >
              Visit {site.social.substackPublicationName}
            </a>
            .
          </p>
        </div>
      ) : (
        // Neutral fallback — publication not confirmed.
        <div className="mt-8">
          <Button href={`mailto:${site.inquiryEmail}`} variant="secondary" external>
            Ask about the community
          </Button>
        </div>
      )}
    </div>
  );
}
