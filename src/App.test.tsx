import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { App } from "./App";
import { fetchCompetitorInfo } from "./lib/wca.api";
import { sampleCompetitor } from "./test/fixtures";

vi.mock("./lib/wca.api", () => ({
  fetchCompetitorInfo: vi.fn(),
}));

const mockedFetch = vi.mocked(fetchCompetitorInfo);

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("fetches and displays the default competitor on load", async () => {
    mockedFetch.mockResolvedValue(sampleCompetitor);

    render(<App />);

    expect(await screen.findByText("John Doe")).toBeInTheDocument();
    expect(mockedFetch).toHaveBeenCalledWith("2015CAMP17");
  });

  it("only shows the 3x3x3 event by default", async () => {
    mockedFetch.mockResolvedValue(sampleCompetitor);

    render(<App />);

    await screen.findByText("John Doe");
    expect(screen.getByText("3x3x3 Cube")).toBeInTheDocument();
    expect(screen.queryByText("2x2x2 Cube")).not.toBeInTheDocument();
  });

  it("shows a validation message for an incomplete WCA ID", async () => {
    mockedFetch.mockResolvedValue(sampleCompetitor);

    render(<App />);
    await screen.findByText("John Doe");

    fireEvent.change(screen.getByPlaceholderText(/Enter a WCA ID/i), {
      target: { value: "123" },
    });

    expect(
      await screen.findByText(/Enter a valid WCA ID/i),
    ).toBeInTheDocument();
  });

  it("shows an error message when the lookup fails", async () => {
    mockedFetch.mockRejectedValue(new Error("not found"));

    render(<App />);

    expect(
      await screen.findByText(/Couldn't find that competitor/i),
    ).toBeInTheDocument();
  });
});
