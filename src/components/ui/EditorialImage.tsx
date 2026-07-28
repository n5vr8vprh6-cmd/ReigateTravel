import Image from "next/image";
import { cn } from "@/lib/cn";

type Ratio = "portrait" | "landscape" | "wide" | "square";

const ratioClass: Record<Ratio, string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[3/2]",
  wide: "aspect-[16/9]",
  square: "aspect-square",
};

interface EditorialImageProps {
  src: string;
  /** Empty string marks a decorative image (renders alt=""). */
  alt: string;
  ratio?: Ratio;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

/**
 * Editorial image treatment. Conceptual/editorial brand imagery only — never framed as
 * documentary proof. Uses next/image with a fixed ratio box so layout never shifts.
 */
export function EditorialImage({
  src,
  alt,
  ratio = "landscape",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className,
}: EditorialImageProps) {
  return (
    <div
      className={cn(
        "editorial-image bg-sand relative overflow-hidden rounded-sm",
        ratioClass[ratio],
        className
      )}
    >
      <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
    </div>
  );
}
