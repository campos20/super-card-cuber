import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { App } from "./App";
import { fetchCompetitorInfo } from "./lib/wca.api";
import { sampleCompetitor } from "./test/fixtures";

vi.mock("./lib/wca.api", () => ({
  fetchCompetitorInfo: vi.fn(),
}));

const mockedFetch = vi.mocked(fetchCompetitorInfo);

const enterWcaId = (value: string) => {
  fireEvent.change(screen.getByPlaceholderText(/Enter a WCA ID/i), {
    target: { value },
  });
};

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.replaceState({}, "", "/");
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("shows no message or card before any ID is entered", () => {
    render(<App />);

    expect(mockedFetch).not.toHaveBeenCalled();
    expect(screen.queryByText(/Enter a valid WCA ID/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Couldn't find that competitor/i),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("fetches and displays a competitor once a valid WCA ID is entered", async () => {
    mockedFetch.mockResolvedValue(sampleCompetitor);

    render(<App />);
    enterWcaId("2015CAMP17");

    expect(await screen.findByText("John Doe")).toBeInTheDocument();
    expect(mockedFetch).toHaveBeenCalledWith("2015CAMP17");
  });

  it("only shows the 3x3x3 event by default", async () => {
    mockedFetch.mockResolvedValue(sampleCompetitor);

    render(<App />);
    enterWcaId("2015CAMP17");

    await screen.findByText("John Doe");
    expect(screen.getByText("3x3x3 Cube")).toBeInTheDocument();
    expect(screen.queryByText("2x2x2 Cube")).not.toBeInTheDocument();
  });

  it("shows a validation message for an incomplete WCA ID", async () => {
    render(<App />);

    enterWcaId("123");

    expect(
      await screen.findByText(/Enter a valid WCA ID/i),
    ).toBeInTheDocument();
    expect(mockedFetch).not.toHaveBeenCalled();
  });

  it("shows an error message when the lookup fails", async () => {
    mockedFetch.mockRejectedValue(new Error("not found"));

    render(<App />);
    enterWcaId("2015CAMP17");

    expect(
      await screen.findByText(/Couldn't find that competitor/i),
    ).toBeInTheDocument();
  });
});
