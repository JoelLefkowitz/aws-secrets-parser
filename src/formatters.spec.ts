import { capitalise, formatKey } from "./formatters";
import { describe, expect, it } from "vitest";

describe("capitalise", () => {
  it("capitalises a word", () => {
    expect(capitalise("hello")).toBe("Hello");
  });

  it("preserves empty strings", () => {
    expect(capitalise("")).toBe("");
  });
});

describe("formatKey", () => {
  const prefix = "prefix";

  it("handles keys", () => {
    expect(formatKey("key", {})).toBe("key");
  });

  it("adds prefixes", () => {
    // cspell:disable-next-line
    expect(formatKey("key", { prefix })).toBe("prefixkey");
  });

  it("formats to constant case", () => {
    expect(formatKey("key", { format: "constant", prefix })).toBe("PREFIX_KEY");
  });

  it("formats to pascal case", () => {
    expect(formatKey("key", { format: "pascal", prefix })).toBe("PrefixKey");
  });
});
