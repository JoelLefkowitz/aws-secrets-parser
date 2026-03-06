import { beforeEach, describe, expect, it, vi } from "vitest";
import { emit } from "./emitters";

describe("emit", () => {
  const spy = vi.spyOn(console, "log").mockImplementation(() => {});

  beforeEach(() => {
    spy.mockClear();
  });

  it("emits JSON", () => {
    emit(
      {
        a: 1,
        b: 2,
      },
      {
        naming: {
          format: "preserve",
        },
        aggregation: {
          postgres: false,
        },
        output: {
          format: "json",
        },
      },
    );

    expect(spy).toHaveBeenCalledWith('{"a":1,"b":2}');
  });

  it("emits key-value pairs in export format", () => {
    emit(
      {
        a: 1,
        b: 2,
      },
      {
        naming: {
          format: "preserve",
        },
        aggregation: {
          postgres: false,
        },
        output: {
          format: "export",
        },
      },
    );

    expect(spy).toHaveBeenCalledWith("export a='1'");
    expect(spy).toHaveBeenCalledWith("export b='2'");
  });

  it("emits key-value pairs in dotenv format", () => {
    emit(
      {
        a: 1,
        b: 2,
      },
      {
        naming: {
          format: "preserve",
        },
        aggregation: {
          postgres: false,
        },
        output: {
          format: "dotenv",
        },
      },
    );

    expect(spy).toHaveBeenCalledWith("a=1");
    expect(spy).toHaveBeenCalledWith("b=2");
  });

  it("emits key-value pairs in export format", () => {
    emit(
      {
        USERNAME: "USERNAME",
        PASSWORD: "PASSWORD",
        ENDPOINT: "ENDPOINT",
        DATABASE: "DATABASE",
      },
      {
        naming: {
          format: "preserve",
        },
        aggregation: {
          postgres: true,
        },
        output: {
          format: "export",
        },
      },
    );

    expect(spy).toHaveBeenCalledWith(
      "export DATABASE_URL='postgresql://USERNAME:PASSWORD@ENDPOINT/DATABASE'",
    );
  });

  it("throws if the JSON is not a record", () => {
    expect(() => {
      emit([], {
        naming: {
          format: "preserve",
        },
        aggregation: {
          postgres: false,
        },
        output: {
          format: "export",
        },
      });
    }).toThrow("Did not receive key-value pairs for environment variables.");
  });
});
