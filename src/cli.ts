import { Options } from "./options";
import { applySpec, prop } from "ramda";
import yargs from "yargs";

export interface CLI {
  name: string;
  region: string;
  options: Options;
}

export const cli = (argv: string[]) =>
  applySpec<CLI>({
    name: prop("name"),
    region: prop("region"),
    options: {
      naming: {
        format: prop("naming"),
        prefix: prop("prefix"),
      },
      aggregation: {
        postgres: prop("postgres"),
      },
      output: {
        format: prop("output"),
      },
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
              description: "The secret name",
              demandOption: true,
            })
            .option("region", {
              type: "string",
              description: "Set the AWS region",
              alias: "r",
              default: "us-east-1",
            })
            .option("naming", {
              type: "string",
              description: "Set the key naming format",
              alias: "n",
              choices: ["preserve", "constant", "pascal"],
              default: "preserve",
            })
            .option("prefix", {
              type: "string",
              description: "Add a prefix to the keys",
              alias: "p",
            })
            .option("postgres", {
              type: "boolean",
              description: "Aggregate postgres variables",
              alias: "P",
              default: false,
            })
            .option("output", {
              type: "string",
              description: "Set the output format",
              alias: "o",
              choices: ["export", "dotenv"],
              default: "export",
            }),
      )
      .help()
      .version()
      .alias("help", "h")
      .alias("version", "v")
      .wrap(Math.min(yargs().terminalWidth(), 120))
      .parseSync(),
  );
