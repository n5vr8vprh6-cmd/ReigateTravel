import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { OfferCard } from "@/components/content/OfferCard";
import { offers } from "@/content/offers";

describe("OfferCard + offer content", () => {
  it("renders each offer's name and link", () => {
    const bespoke = offers.find((o) => o.id === "bespoke")!;
    render(<OfferCard offer={bespoke} />);
    expect(screen.getByRole("heading", { name: "Bespoke Travel Planning" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Explore Travel Planning/ })).toBeInTheDocument();
  });

  // Status chips were removed at the client's direction (decision-log #31). The data model
  // still carries `status`, and it still has to drive emphasis — that hierarchy is now the
  // only thing in the UI keeping in-development offers from reading as bookable, so the
  // assertion below matters more than it did when a visible chip backed it up.
  it("gives in-development offers a visibly quieter treatment than the current offer", () => {
    const inDev = offers.find((o) => o.status === "in-development")!;
    const { container: quiet } = render(<OfferCard offer={inDev} />);
    // Secondary cards are text-only: no photography is attached to an offer that isn't running.
    expect(quiet.querySelector("img")).toBeNull();

    const bespoke = offers.find((o) => o.id === "bespoke")!;
    const { container: primary } = render(<OfferCard offer={bespoke} />);
    expect(primary.querySelector("img")).not.toBeNull();
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
