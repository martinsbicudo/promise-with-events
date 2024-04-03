import { dispatchCustomEvent } from "../../../../utils/dispatch-custom-event";
import { TFunctionPromise, TPromiseWatched } from "../../types";
import { ICallPromise } from "./types";

export const callPromise: ICallPromise = (
  promise: TPromiseWatched | TFunctionPromise
) => {
  if (typeof promise === "function") return promise();

  if (
    "autoStartEvent" in promise &&
    "watchedEventName" in promise &&
    !promise.autoStartEvent
  ) {
    const eventName = promise.watchedEventName;
    dispatchCustomEvent(`start.${eventName}`);
    return promise;
  }

  return undefined;
};
