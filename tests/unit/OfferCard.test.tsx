import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { OfferCard } from "@/components/content/OfferCard";
import { offers } from "@/content/offers";

describe("OfferCard + offer content", () => {
  it("renders each offer's name, status text, and link", () => {
    const bespoke = offers.find((o) => o.id === "bespoke")!;
    render(<OfferCard offer={bespoke} />);
    expect(screen.getByRole("heading", { name: "Bespoke Travel Planning" })).toBeInTheDocument();
    expect(screen.getByText("Available now")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Explore Travel Planning/ })).toBeInTheDocument();
  });

  it("keeps exactly one current offer; the rest are in development (priority is unambiguous)", () => {
    const current = offers.filter((o) => o.status === "available");
    const inDev = offers.filter((o) => o.status === "in-development");
    expect(current).toHaveLength(1);
    expect(current[0].id).toBe("bespoke");
    expect(current[0].emphasis).toBe("primary");
    expect(inDev.every((o) => o.emphasis === "secondary")).toBe(true);
  });
});
