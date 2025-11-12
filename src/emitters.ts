import { IJSON, isRecord } from "reviewed";
import { NamingOptions, formatKey } from "./formatters";

export interface OutputOptions {
  format: "export" | "dotenv";
}

export const emit = (
  json: IJSON,
  naming: NamingOptions,
  { format }: OutputOptions,
) => {
  const { valid, parsed } = isRecord(json);

  if (!valid) {
    throw new Error(
      "Did not receive key-value pairs for environment variables.",
    );
  }

  Object.entries(parsed).forEach(([k, v]) => {
    const key = formatKey(k, naming);
    const value = String(v);

    if (format === "export") {
      console.log(`export ${key}='${value}'`);
    }

    if (format === "dotenv") {
      console.log(`${key}=${value}`);
    }
  });
};
