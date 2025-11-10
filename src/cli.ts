import { FormatOptions } from "./formatters";
import { applySpec, prop } from "ramda";
import yargs from "yargs";

export interface CLI {
  name: string;
  region: string;
  options: FormatOptions;
}

export const cli = (argv: string[]) =>
  applySpec<CLI>({
    name: prop("name"),
    region: prop("region"),
    options: {
      format: prop("format"),
      prefix: prop("prefix"),
    },
  })(
    yargs(argv)
      .command(
        "$0 <name>",
        "Fetch and parse JSON from AWS secrets manager.",
        (yargs) =>
          yargs
            .positional("name", {
              type: "string",
              demandOption: true,
            })
            .option("region", {
              type: "string",
              alias: "r",
            })
            .option("format", {
              type: "string",
              alias: "f",
              choices: ["constant", "pascal"],
            })
            .option("prefix", {
              type: "string",
              alias: "p",
            }),
      )
      .help()
      .version()
      .alias("help", "h")
      .alias("version", "v")
      .parseSync(),
  );
