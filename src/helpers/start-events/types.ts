import { ArrayWithMinOneItems } from "../../types";

export interface IStartEvents {
  (eventNames: ArrayWithMinOneItems<string>): void;
}
