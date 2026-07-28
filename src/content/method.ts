import type { MethodStage } from "@/types/content";

/**
 * The Reigate Method — five stages, exact names (Brand Book ch. 14; Charter §9).
 * Descriptions are editorially condensed from the approved chapter (storyboard §5),
 * pending Gate 3 copy approval.
 */
export const methodStages: MethodStage[] = [
  {
    index: 1,
    name: "Listen",
    description:
      "We begin with conversation: why you're travelling, how you want to feel, who is coming.",
  },
  {
    index: 2,
    name: "Define",
    description:
      "Your answers become a clear experience brief — purpose, pace, priorities, investment range.",
  },
  {
    index: 3,
    name: "Curate",
    description: "Informed recommendations, not endless options. Every choice has a reason.",
  },
  {
    index: 4,
    name: "Support",
    description: "Clear documentation, preparation, and accessible help while plans are in motion.",
  },
  {
    index: 5,
    name: "Remember",
    description:
      "Your preferences are kept, so every future journey starts more personal than the last.",
  },
];
