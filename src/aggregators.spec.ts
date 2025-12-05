import { describe, expect, it } from "vitest";
import { postgres } from "./aggregators";

describe("postgres", () => {
  it("adds a postgres url", () => {
    const { DATABASE_URL } = postgres({
      USERNAME: "USERNAME",
      PASSWORD: "PASSWORD",
      ENDPOINT: "ENDPOINT",
      DATABASE: "DATABASE",
    });

    expect(DATABASE_URL).toBe(
      "postgresql://USERNAME:PASSWORD@ENDPOINT/DATABASE",
    );
  });

  it("does nothing if the postgres fields are missing", () => {
    expect(postgres({ a: 1 })).toEqual({ a: 1 });
  });
});
