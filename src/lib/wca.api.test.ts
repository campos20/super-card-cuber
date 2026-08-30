import { afterEach, describe, expect, it, vi } from "vitest";
import { sampleCompetitor } from "../test/fixtures";
import { fetchCompetitorInfo } from "./wca.api";

describe("fetchCompetitorInfo", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("resolves the parsed competitor on a successful response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(sampleCompetitor),
      }),
    );

    await expect(fetchCompetitorInfo("9999DOEJ01")).resolves.toEqual(
      sampleCompetitor,
    );
  });

  it("hits the WCA API with the given WCA ID", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(sampleCompetitor),
    });
    vi.stubGlobal("fetch", fetchMock);

    await fetchCompetitorInfo("9999DOEJ01");

    expect(fetchMock).toHaveBeenCalledWith(
      "https://www.worldcubeassociation.org/api/v0/persons/9999DOEJ01",
    );
  });

  it("throws when the response isn't ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, json: () => Promise.resolve({}) }),
    );

    await expect(fetchCompetitorInfo("0000XXXX00")).rejects.toThrow();
  });
});
