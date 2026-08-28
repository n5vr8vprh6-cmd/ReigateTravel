import { cn } from "@/lib/cn";
import { buttonBase, buttonVariants, type ButtonVariant } from "@/components/ui/buttonStyles";

interface ActionButtonProps {
  children: React.ReactNode;
  type?: "submit" | "button";
  variant?: ButtonVariant;
  inverse?: boolean;
  /** Renders the busy label and blocks re-entry, without disabling the control. */
  busy?: boolean;
  busyLabel?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * A real `<button>`, sharing its appearance with `Button` via `buttonStyles`.
 *
 * `Button` stays link-only on purpose: its docblock records that every Version 1 CTA
 * navigates, and it is imported by server-rendered route shells. Widening it into something
 * that can also carry an onClick risks pulling a client boundary into those pages.
 *
 * **Busy does not disable.** A disabled button leaves the keyboard on a dead control in the
 * middle of a flow and drops out of the tab order without explanation. Instead the control
 * stays focusable, announces itself with `aria-busy`, and swaps its label; re-entry is blocked
 * by the caller.
 */
export function ActionButton({
  children,
  type = "button",
  variant = "primary",
  inverse = false,
  busy = false,
  busyLabel,
  onClick,
  className,
}: ActionButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-busy={busy || undefined}
      className={cn(
        buttonBase,
        buttonVariants[inverse ? "inverse" : "default"][variant],
        className
      )}
    >
      {busy && busyLabel ? busyLabel : children}
    </button>
  );
}
