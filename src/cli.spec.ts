import { cli } from "./cli";
import { describe, expect, it, vi } from "vitest";

describe("cli", () => {
  vi.spyOn(console, "error").mockImplementation(() => {});

  it("parses the name", () => {
    expect(cli(["name"]).name).toBe("name");
  });

  it("throws if the name is missing", () => {
    expect(() => cli([])).toThrow();
  });

  it("parses the region", () => {
    expect(cli(["_", "--region", "us-east-2"]).region).toBe("us-east-2");
  });

  it("parses the format", () => {
    expect(cli(["_", "--format", "pascal"]).options.format).toBe("pascal");
  });

  it("parses the prefix", () => {
    expect(cli(["_", "--prefix", "prefix"]).options.prefix).toBe("prefix");
  });
});
