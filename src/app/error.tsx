"use client";

import { useEffect } from "react";
import { Section } from "@/components/layout/Section";
import { SectionIntro } from "@/components/content/SectionIntro";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface for monitoring in a later milestone; no PII, no external call in M1.
    console.error(error);
  }, [error]);

  return (
    <Section surface="ivory" width="prose" aria-labelledby="error-heading">
      <SectionIntro
        as="h1"
        eyebrow="Something went wrong"
        heading="We hit an unexpected problem."
        headingId="error-heading"
        lead="Please try again. If it keeps happening, we'd like to know."
      />
      <div className="mt-8">
        <button
          type="button"
          onClick={reset}
          className="bg-ink text-ivory hover:bg-olive inline-flex min-h-[44px] items-center justify-center rounded-sm px-6 py-3 font-sans text-[0.9375rem] font-semibold transition-colors focus-visible:outline-3"
        >
          Try again
        </button>
      </div>
    </Section>
  );
}
