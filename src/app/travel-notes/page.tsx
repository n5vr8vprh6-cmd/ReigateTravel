import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SectionIntro } from "@/components/content/SectionIntro";
import { ArticleCard } from "@/components/content/ArticleCard";
import { Button } from "@/components/ui/Button";
import { featuredArticles } from "@/content/articles";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Travel Notes",
  description: `Notes on living and travelling well, from ${site.social.substackPublicationName}.`,
};

export default function TravelNotesPage() {
  return (
    <Section surface="ivory" aria-labelledby="notes-heading">
      <div className="max-w-[44rem]">
        <SectionIntro
          as="h1"
          eyebrow="Travel Notes"
          heading="Travel Notes"
          headingId="notes-heading"
          lead={`Notes on living and travelling well, from ${site.social.substackPublicationName}.`}
        />
      </div>
      {featuredArticles.length > 0 ? (
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.url} article={article} />
          ))}
        </div>
      ) : (
        <div className="mt-8 max-w-[40rem]">
          <p className="text-body text-ink/80">
            {site.social.substack
              ? "New notes are on the way. In the meantime, you can read the latest thinking on the publication."
              : `New notes are on the way. ${site.social.substackPublicationName} is not published yet — rather than point you at a page that is not there, we would rather say so.`}
          </p>
          {/*
            Until the publication exists this page had no action at all: its only button was
            gated on a URL that is currently null, so a visitor who arrived here could do
            nothing but leave. The planning CTA is the honest thing to offer in its place —
            it is the one thing Reigate can actually do today.
          */}
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            {site.social.substack ? (
              <Button href={site.social.substack} variant="secondary" external>
                Read {site.social.substackPublicationName} on Substack
              </Button>
            ) : null}
            <Button href="/begin-planning" variant={site.social.substack ? "secondary" : "primary"}>
              Begin Planning
            </Button>
          </div>
        </div>
      )}
    </Section>
  );
}
