import { describe, expect, it } from "vitest";
import { isValidWcaId } from "./wca.util";

describe("isValidWcaId", () => {
  it("accepts a well-formed WCA ID", () => {
    expect(isValidWcaId("2015CAMP17")).toBe(true);
  });

  it("rejects an empty string", () => {
    expect(isValidWcaId("")).toBe(false);
  });

  it("rejects lowercase letters", () => {
    expect(isValidWcaId("2015camp17")).toBe(false);
  });

  it("rejects a wrong-length ID", () => {
    expect(isValidWcaId("2015CAMP1")).toBe(false);
  });

  it("rejects a partially typed ID", () => {
    expect(isValidWcaId("2015CA")).toBe(false);
  });
});
