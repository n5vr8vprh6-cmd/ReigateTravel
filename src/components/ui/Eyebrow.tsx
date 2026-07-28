import { cn } from "@/lib/cn";
import { HorizonRule } from "@/components/ui/HorizonRule";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  /** Center the eyebrow + rule (for centred sections). */
  align?: "start" | "center";
  inverse?: boolean;
}

/** Small uppercase label led by the signature horizon rule. Part of the editorial system. */
export function Eyebrow({ children, className, align = "start", inverse = false }: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-eyebrow flex items-center gap-3 font-semibold uppercase",
        inverse ? "text-ivory/80" : "text-olive",
        align === "center" && "justify-center",
        className
      )}
    >
      <HorizonRule tone={inverse ? "rule" : "accent"} className="w-10" />
      <span>{children}</span>
    </p>
  );
}
