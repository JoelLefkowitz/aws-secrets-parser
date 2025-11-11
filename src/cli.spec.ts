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
    expect(cli(["name", "--region", "us-east-2"]).region).toBe("us-east-2");
  });

  it('defaults the region to "us-east-1"', () => {
    expect(cli(["name"]).region).toBe("us-east-1");
  });

  it("parses the naming format", () => {
    expect(cli(["name", "--naming", "pascal"]).naming.format).toBe("pascal");
  });

  it('defaults the naming format to "preserve"', () => {
    expect(cli(["name"]).naming.format).toBe("preserve");
  });

  it("parses the prefix", () => {
    expect(cli(["name", "--prefix", "prefix"]).naming.prefix).toBe("prefix");
  });

  it("parses the output format", () => {
    expect(cli(["name", "--output", "dotenv"]).output.format).toBe("dotenv");
  });

  it('defaults the output format to "export"', () => {
    expect(cli(["name"]).output.format).toBe("export");
  });
});
