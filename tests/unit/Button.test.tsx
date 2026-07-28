import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders an internal link with href and label", () => {
    render(
      <Button href="/begin-planning" variant="primary">
        Begin Planning
      </Button>
    );
    const link = screen.getByRole("link", { name: "Begin Planning" });
    expect(link).toHaveAttribute("href", "/begin-planning");
  });

  it("uses accessibleLabel as the accessible name when provided", () => {
    render(
      <Button href="#what-is-reigate" accessibleLabel="Explore Reigate — learn what Reigate is">
        Explore Reigate
      </Button>
    );
    expect(
      screen.getByRole("link", { name: "Explore Reigate — learn what Reigate is" })
    ).toBeInTheDocument();
  });

  it("adds safe rel attributes for external links", () => {
    render(
      <Button href="https://example.com" external>
        External
      </Button>
    );
    const link = screen.getByRole("link", { name: "External" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
