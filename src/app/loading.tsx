import { Section } from "@/components/layout/Section";

export default function Loading() {
  return (
    <Section surface="ivory" aria-label="Loading">
      <p className="text-body text-ink/70" role="status">
        Loading…
      </p>
    </Section>
  );
}
