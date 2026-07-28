import { clsx, type ClassValue } from "clsx";

/** Compose conditional class names. Thin wrapper over clsx for a single import site. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
