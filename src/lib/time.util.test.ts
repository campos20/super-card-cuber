import { describe, expect, it } from "vitest";
import { formatResult } from "./time.util";

describe("formatResult", () => {
  it("formats a sub-minute single as seconds.centiseconds", () => {
    expect(formatResult(1325, "333", "single")).toBe("13.25");
  });

  it("carries seconds into minutes once over 60s", () => {
    expect(formatResult(19668, "555", "average")).toBe("3:16.68");
  });

  it("carries minutes into hours once over 60m", () => {
    // 1h 2m 3.45s, expressed in centiseconds.
    expect(formatResult(372345, "555bf", "single")).toBe("1:02:03.45");
  });

  it("reports DNF for -1", () => {
    expect(formatResult(-1, "333", "single")).toBe("DNF");
  });

  it("reports DNS for -2", () => {
    expect(formatResult(-2, "333", "single")).toBe("DNS");
  });

  it("passes 333fm single through as a raw move count", () => {
    expect(formatResult(21, "333fm", "single")).toBe("21");
  });

  it("formats 333fm average as a decimal move count", () => {
    expect(formatResult(2533, "333fm", "average")).toBe("25.33");
  });

  it("decodes a packed 333mbf result into solved/attempted [time]", () => {
    expect(formatResult(860352600, "333mbf", "single")).toBe("13/13 [58:46]");
  });

  it("decodes a packed 333mbf result whose attempt time is over an hour", () => {
    // DD=90, TTTTT=03661 (1h 1m 1s), MM=00
    expect(formatResult(900366100, "333mbf", "single")).toBe("9/9 [1:01:01]");
  });
});
