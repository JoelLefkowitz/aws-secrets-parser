import { fetch } from "./secrets";

const stub = jest.fn();

jest.mock("@aws-sdk/client-secrets-manager", () => ({
  GetSecretValueCommand: class {},
  SecretsManagerClient: class {
    send = stub;
  },
}));

describe("fetch", () => {
  it.each([null, true, 1, "a", [1], { a: 1 }])("parses %s", async (secret) => {
    stub.mockResolvedValueOnce({ SecretString: JSON.stringify(secret) });
    const response = await fetch("");
    expect(response).toEqual(secret);
  });

  it("throws for a missing secret", async () => {
    stub.mockRejectedValueOnce(new Error(""));
    await expect(fetch("")).rejects.toThrow("Missing secret");
  });

  it("throws for invalid JSON", async () => {
    stub.mockResolvedValueOnce("_");
    await expect(fetch("")).rejects.toThrow("Received invalid JSON");
  });
});
