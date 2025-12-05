#!/usr/bin/env node
import { cli } from "./cli";
import { emit } from "./emitters";
import { hideBin } from "yargs/helpers";
import { retrieve } from "./secrets";

const { name, region, options } = cli(hideBin(process.argv));

retrieve(name, region)
  .then((secret) => {
    emit(secret, options);
  })
  .catch(console.error);
