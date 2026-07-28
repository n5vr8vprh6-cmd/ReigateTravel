import Image from "next/image";
import { StatusLabel } from "@/components/ui/StatusLabel";
import { TextLink } from "@/components/ui/TextLink";
import type { Offer } from "@/types/content";

interface OfferCardProps {
  offer: Offer;
}

/**
 * Ecosystem offer card. The primary (current) offer is a wide horizontal card with imagery;
 * in-development offers are quieter, text-only outlined cards. This enforces the rule that
 * future services never carry visual weight equal to the current commercial service, and
 * avoids attaching photography to offers that are not yet operating. Status is always shown
 * as visible text, never colour alone.
 */
export function OfferCard({ offer }: OfferCardProps) {
  if (offer.emphasis === "primary") {
    return (
      <article className="bg-surface-raised ring-ink/10 grid overflow-hidden rounded-sm ring-1 lg:grid-cols-2">
        {offer.image ? (
          <div className="bg-sand relative min-h-[15rem] lg:min-h-full">
            <Image
              src={offer.image.src}
              alt={offer.image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        ) : null}
        <div className="flex flex-col gap-3 p-7 lg:p-9">
          <StatusLabel status={offer.status} className="self-start" />
          <h3 className="font-display text-h3">{offer.name}</h3>
          <p className="text-body text-ink/80">{offer.description}</p>
          <div className="mt-auto pt-3">
            <TextLink href={offer.href}>{offer.linkLabel}</TextLink>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="border-ink/15 flex flex-col gap-3 rounded-sm border p-6">
      <StatusLabel status={offer.status} className="self-start" />
      <h3 className="font-display text-[1.2rem] font-medium">{offer.name}</h3>
      <p className="text-body text-ink/75">{offer.description}</p>
      <div className="mt-auto pt-3">
        <TextLink href={offer.href}>{offer.linkLabel}</TextLink>
      </div>
    </article>
  );
}
