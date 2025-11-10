import { FormatOptions, formatKey } from "./formatters";
import { IJSON, isRecord } from "reviewed";

export const emit = (json: IJSON, options: FormatOptions) => {
  const { valid, parsed } = isRecord(json);

  if (!valid) {
    throw new Error(
      "Did not receive key-value pairs for environment variables.",
    );
  }

  Object.entries(parsed).forEach(([k, v]) => {
    const key = formatKey(k, options);
    const value = String(v);
    console.log(`export ${key}="${value}"`);
  });
};
