import { IWatchCustomEventsCallback } from "../utils/watch-custom-events/types";
import { ArrayWithMinOneItems } from "../types";

export interface IOnCallEventEvents {
  <R extends Array<any>, E = Error>(
    callback: IWatchCustomEventsCallback<R, E>,
    eventNames: ArrayWithMinOneItems<string>
  ): void;
}
