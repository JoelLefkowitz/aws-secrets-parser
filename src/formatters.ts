export interface NamingOptions {
  format: "preserve" | "constant" | "pascal";
  prefix?: string;
}

export const capitalise = (word: string): string =>
  (word[0] ?? "").toLocaleUpperCase().concat(word.slice(1));

export const formatKey = (
  key: string,
  { format, prefix }: NamingOptions,
): string => {
  const segments = (prefix ? [prefix] : []).concat(key);

  if (format === "pascal") {
    return segments.map(capitalise).join("");
  }

  if (format === "constant") {
    return segments.join("_").toLocaleUpperCase();
  }

  return segments.join("");
};
