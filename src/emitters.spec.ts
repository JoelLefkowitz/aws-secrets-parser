import { describe, expect, it, vi } from "vitest";
import { emit } from "./emitters";

describe("emit", () => {
  const spy = vi.spyOn(console, "log").mockImplementation(() => {});

  it("emits key-value pairs in export format", () => {
    emit({ a: 1, b: 2 }, { format: "preserve" }, { format: "export" });
    expect(spy).toHaveBeenCalledWith('export a="1"');
    expect(spy).toHaveBeenCalledWith('export b="2"');
  });

  it("emits key-value pairs in dotenv format", () => {
    emit({ a: 1, b: 2 }, { format: "preserve" }, { format: "dotenv" });
    expect(spy).toHaveBeenCalledWith('export a="1"');
    expect(spy).toHaveBeenCalledWith('export b="2"');
  });

  it("throws if the JSON is not a record", () => {
    expect(() => {
      emit([], { format: "preserve" }, { format: "export" });
    }).toThrow("Did not receive key-value pairs for environment variables.");
  });
});
