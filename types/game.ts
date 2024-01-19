/**
 * I feel like this section needs to more granular
 * as each end of a phase will trigger a ready-up sequence.
 */

export type Phase =
  | "start"
  | "private-auction-start"
  | "private-auction-bid"
  | "private-auction-end"
  | "stock-round"
  | "operating-round"
  | "end";
