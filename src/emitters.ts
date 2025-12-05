import { IJSON, isRecord } from "reviewed";
import { Options } from "./options";
import { formatKey } from "./formatters";
import { postgres } from "./aggregators";

export interface OutputOptions {
  format: "export" | "dotenv";
}

export const emit = (json: IJSON, { naming, aggregation, output }: Options) => {
  const { valid, parsed } = isRecord(json);

  if (!valid) {
    throw new Error(
      "Did not receive key-value pairs for environment variables.",
    );
  }

  const aggregators = [];

  if (aggregation.postgres) {
    aggregators.push(postgres);
  }

  const fields = aggregators.reduce((acc, x) => x(acc), parsed);

  Object.entries(fields).forEach(([k, v]) => {
    const key = formatKey(k, naming);
    const value = String(v);

    if (output.format === "export") {
      console.log(`export ${key}='${value}'`);
    }

    if (output.format === "dotenv") {
      console.log(`${key}=${value}`);
    }
  });
};
