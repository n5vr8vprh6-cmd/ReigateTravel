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
            New notes are on the way. In the meantime, you can read the latest thinking on the
            publication.
          </p>
          {site.social.substack ? (
            <div className="mt-6">
              <Button href={site.social.substack} variant="secondary" external>
                Read {site.social.substackPublicationName} on Substack
              </Button>
            </div>
          ) : null}
        </div>
      )}
    </Section>
  );
}
