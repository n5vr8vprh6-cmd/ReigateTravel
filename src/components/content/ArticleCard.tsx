import { TextLink } from "@/components/ui/TextLink";
import type { Article } from "@/types/content";

interface ArticleCardProps {
  article: Article;
}

/**
 * Section 9 — a single Travel Notes card. Only rendered when a real, approved article
 * exists (Charter §18: never fabricate titles/summaries/dates). Links out to Substack.
 */
export function ArticleCard({ article }: ArticleCardProps) {
  const dateLabel = new Date(article.date).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="border-taupe/50 flex flex-col border-t pt-5">
      <p className="text-eyebrow text-olive flex items-center gap-2 font-semibold uppercase">
        <time dateTime={article.date}>{dateLabel}</time>
        <span aria-hidden="true">·</span>
        <span>{article.topic}</span>
      </p>
      <h3 className="font-display text-h3 mt-3">{article.title}</h3>
      <p className="text-body text-ink/80 mt-2">{article.summary}</p>
      <div className="mt-auto pt-4">
        <TextLink
          href={article.url}
          external
          accessibleLabel={`Read "${article.title}" on Substack (opens in a new tab)`}
        >
          Read on Substack
        </TextLink>
      </div>
    </article>
  );
}
