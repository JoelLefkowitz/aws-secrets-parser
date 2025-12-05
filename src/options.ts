import { AggregationOptions } from "./aggregators";
import { NamingOptions } from "./formatters";
import { OutputOptions } from "./emitters";

export interface Options {
  naming: NamingOptions;
  aggregation: AggregationOptions;
  output: OutputOptions;
}
