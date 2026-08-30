import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { sampleCompetitor } from "../test/fixtures";
import { Card } from "./Card";

describe("Card", () => {
  it("renders the competitor's name, id and general stats", () => {
    render(<Card competitor={sampleCompetitor} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("9999DOEJ01")).toBeInTheDocument();
    expect(screen.getByText("40")).toBeInTheDocument(); // gold
    expect(screen.getByText("16")).toBeInTheDocument(); // silver
    expect(screen.getByText("14")).toBeInTheDocument(); // bronze
  });

  it("shows every event that has personal records by default", () => {
    render(<Card competitor={sampleCompetitor} />);

    expect(screen.getByText("3x3x3 Cube")).toBeInTheDocument();
    expect(screen.getByText("2x2x2 Cube")).toBeInTheDocument();
    expect(screen.getByText("3x3x3 Fewest Moves")).toBeInTheDocument();
  });

  it("hides a stat that's in hiddenStats", () => {
    render(
      <Card competitor={sampleCompetitor} hiddenStats={new Set(["records"])} />,
    );

    expect(screen.queryByText("Records")).not.toBeInTheDocument();
    expect(screen.getByText("Gold")).toBeInTheDocument();
  });

  it("hides an event that's in hiddenEvents", () => {
    render(
      <Card competitor={sampleCompetitor} hiddenEvents={new Set(["222"])} />,
    );

    expect(screen.queryByText("2x2x2 Cube")).not.toBeInTheDocument();
    expect(screen.getByText("3x3x3 Cube")).toBeInTheDocument();
  });

  it("omits icons entirely when showIcons is false", () => {
    const { container } = render(
      <Card competitor={sampleCompetitor} showIcons={false} />,
    );

    expect(container.querySelector(".sc-card__stat-icon")).toBeNull();
    expect(container.querySelector(".cubing-icon")).toBeNull();
  });

  it("applies the requested layout class", () => {
    const { container } = render(
      <Card competitor={sampleCompetitor} layout="poster" />,
    );

    expect(container.querySelector(".sc-card--layout-poster")).not.toBeNull();
  });

  it("uses the legendary tier for a high medal count", () => {
    const { container } = render(<Card competitor={sampleCompetitor} />);

    // sampleCompetitor has 70 total medals, comfortably over the legendary threshold.
    expect(container.querySelector(".sc-card--legendary")).not.toBeNull();
  });
});
