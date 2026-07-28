import { cn } from "@/lib/cn";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Narrow measure for long-form reading. */
  width?: "content" | "prose";
  as?: "div" | "section" | "header" | "footer" | "nav";
}

/** Horizontal page gutter + max width. Editorial default; prose for readable text blocks. */
export function Container({
  children,
  className,
  width = "content",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-6 sm:px-8 lg:px-12",
        // var() is required — a bare custom-property name in a Tailwind arbitrary value
        // compiles to invalid CSS in v4 and is dropped. See globals.css --container-content.
        width === "content" ? "max-w-[var(--container-content)]" : "max-w-[var(--container-prose)]",
        className
      )}
    >
      {children}
    </Tag>
  );
}
