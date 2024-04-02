import { ArrayWithMinOneItems } from "../../types";

export interface IWatchCustomEventsCallback<R extends Array<any>, E = Error> {
  (error: E, ...responses: R): void;
}

export interface IWatchCustomEvents {
  (
    eventNames: ArrayWithMinOneItems<string>,
    prefix: string,
    callback: IWatchCustomEventsCallback<any, any>
  ): any;
}
