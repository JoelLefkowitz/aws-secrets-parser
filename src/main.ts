#!/usr/bin/env node
import { cli } from "./cli";
import { emit } from "./emitters";
import { hideBin } from "yargs/helpers";
import { retrieve } from "./secrets";

const { name, region, naming, output } = cli(hideBin(process.argv));

retrieve(name, region)
  .then((secret) => {
    emit(secret, naming, output);
  })
  .catch(console.error);
