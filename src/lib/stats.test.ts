import { describe, expect, it } from "vitest";
import { sampleCompetitor } from "../test/fixtures";
import { getStatValue } from "./stats";

describe("getStatValue", () => {
  it("reads the competition count", () => {
    expect(getStatValue(sampleCompetitor, "competitions")).toBe(50);
  });

  it("reads each medal count", () => {
    expect(getStatValue(sampleCompetitor, "gold")).toBe(40);
    expect(getStatValue(sampleCompetitor, "silver")).toBe(16);
    expect(getStatValue(sampleCompetitor, "bronze")).toBe(14);
  });

  it("reads the total record count", () => {
    expect(getStatValue(sampleCompetitor, "records")).toBe(1);
  });

  it("reads the total solve count", () => {
    expect(getStatValue(sampleCompetitor, "solves")).toBe(966);
  });
});
