import { capitalise, formatKey } from "./formatters";
import { describe, expect, it } from "vitest";

describe("capitalise", () => {
  it("capitalises a word", () => {
    expect(capitalise("abc")).toBe("Abc");
  });

  it("preserves empty strings", () => {
    expect(capitalise("")).toBe("");
  });
});

describe("formatKey", () => {
  const prefix = "prefix";

  it("preserves the case", () => {
    expect(formatKey("key", { format: "preserve" })).toBe("key");
  });

  it("formats to constant case", () => {
    expect(formatKey("key", { format: "constant", prefix })).toBe("PREFIX_KEY");
  });

  it("formats to pascal case", () => {
    expect(formatKey("key", { format: "pascal", prefix })).toBe("PrefixKey");
  });

  it("adds prefixes", () => {
    // cspell:disable-next-line
    expect(formatKey("key", { format: "preserve", prefix })).toBe("prefixkey");
  });
});
