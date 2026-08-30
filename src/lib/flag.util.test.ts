import { describe, expect, it } from "vitest";
import { flagEmoji } from "./flag.util";

describe("flagEmoji", () => {
  it("converts an uppercase ISO2 code to its flag emoji", () => {
    expect(flagEmoji("BR")).toBe("🇧🇷");
  });

  it("uppercases a lowercase ISO2 code before converting", () => {
    expect(flagEmoji("us")).toBe("🇺🇸");
  });
});
