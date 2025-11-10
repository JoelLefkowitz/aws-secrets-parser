import { describe, expect, it, vi } from "vitest";
import { emit } from "./emitters";

describe("emit", () => {
  const spy = vi.spyOn(console, "log").mockImplementation(() => {});

  describe("with valid record objects", () => {
    it("should emit basic key-value pairs", () => {
      emit({ a: 1, b: 2 }, {});
      expect(spy).toHaveBeenCalledWith('export a="1"');
      expect(spy).toHaveBeenCalledWith('export b="2"');
    });
  });

  it("throws if the JSON is not a record", () => {
    expect(() => {
      emit([], {});
    }).toThrow("Did not receive key-value pairs for environment variables.");
  });
});
