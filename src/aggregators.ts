import { assoc } from "ramda";
import { isRecordOfAtLeast, isString } from "reviewed";

export interface AggregationOptions {
  postgres: boolean;
}

const isPostgres = isRecordOfAtLeast({
  USERNAME: isString,
  PASSWORD: isString,
  ENDPOINT: isString,
  DATABASE: isString,
});

export const postgres = (
  fields: Record<string, unknown>,
): Record<string, unknown> => {
  const { valid, parsed } = isPostgres(fields);

  if (!valid) {
    return fields;
  }

  const { USERNAME, PASSWORD, ENDPOINT, DATABASE } = parsed;

  return assoc(
    "DATABASE_URL",
    `postgresql://${USERNAME}:${PASSWORD}@${ENDPOINT}/${DATABASE}`,
    fields,
  );
};
