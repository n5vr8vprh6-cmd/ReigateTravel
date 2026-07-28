import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StatusLabel } from "@/components/ui/StatusLabel";

describe("StatusLabel", () => {
  it("communicates status with visible text, not colour alone", () => {
    render(<StatusLabel status="available" />);
    expect(screen.getByText("Available now")).toBeInTheDocument();
  });

  it("renders the in-development label", () => {
    render(<StatusLabel status="in-development" />);
    expect(screen.getByText("In development")).toBeInTheDocument();
  });
});
