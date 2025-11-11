import { describe, expect, it, vi } from "vitest";
import { retrieve } from "./secrets";

const stub = vi.fn();

vi.mock("@aws-sdk/client-secrets-manager", () => ({
  GetSecretValueCommand: class {},
  SecretsManagerClient: class {
    send = stub;
  },
}));

describe("retrieve", () => {
  it.each([null, true, 1, "a", [1], { a: 1 }])("parses %s", async (secret) => {
    stub.mockResolvedValueOnce({ SecretString: JSON.stringify(secret) });
    const response = await retrieve("secret", "us-east-1");
    expect(response).toEqual(secret);
  });

  it("throws for a missing secret", async () => {
    stub.mockRejectedValueOnce(new Error(""));
    await expect(retrieve("secret", "us-east-1")).rejects.toThrow(
      "Missing secret",
    );
  });

  it("throws for invalid JSON", async () => {
    stub.mockResolvedValueOnce("_");
    await expect(retrieve("secret", "us-east-1")).rejects.toThrow(
      "Received invalid JSON",
    );
  });
});
