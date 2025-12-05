import { Options } from "./options";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { emit } from "./emitters";

describe("emit", () => {
  const spy = vi.spyOn(console, "log").mockImplementation(() => {});

  beforeEach(() => {
    spy.mockClear();
  });

  const options: Options = {
    naming: {
      format: "preserve",
    },
    aggregation: {
      postgres: false,
    },
    output: {
      format: "export",
    },
  };

  it("emits key-value pairs in export format", () => {
    emit(
      {
        a: 1,
        b: 2,
      },
      options,
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
        ...options,
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
        ...options,
        aggregation: {
          postgres: true,
        },
      },
    );

    expect(spy).toHaveBeenCalledWith(
      "export DATABASE_URL='postgresql://USERNAME:PASSWORD@ENDPOINT/DATABASE'",
    );
  });

  it("throws if the JSON is not a record", () => {
    expect(() => {
      emit([], options);
    }).toThrow("Did not receive key-value pairs for environment variables.");
  });
});
