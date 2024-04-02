import { dispatchCustomEvent } from "../../../utils/dispatch-custom-event";
import {
  ICallPromiseMethod,
  ICallPromise,
  ICallAndStartPromises,
} from "./types";
import { TFunctionPromise, TPromiseWatched } from "../types";

const callPromiseMethod: ICallPromiseMethod = (
  promises,
  promiseMethod = "all"
) => {
  if (promises.length === 1) return promises[0];

  const allowedPromiseMethods = {
    all: () => Promise.all(promises),
    allSettled: () =>
      Promise.allSettled(promises).then(([...responses]: any[]) =>
        responses.map((response) => response.value)
      ),
    any: () => Promise.any(promises),
    race: () => Promise.race(promises),
  };

  return allowedPromiseMethods[promiseMethod]();
};

export const callPromise: ICallPromise = (
  promise: TPromiseWatched | TFunctionPromise
) => {
  if (typeof promise === "function") return promise();

  if ("waitingWatchedEventName" in promise) {
    const eventName = promise.waitingWatchedEventName;
    dispatchCustomEvent(`start.${eventName}`);
  }

  return promise;
};

export const callAndStartPromises: ICallAndStartPromises = (
  promises,
  eventName,
  promiseMethod
) => {
  return new Promise(async (resolve, reject) => {
    let response;
    let error;

    try {
      dispatchCustomEvent(`start.${eventName}`, promiseMethod);
      const startedPromises = Array.isArray(promises)
        ? promises.map((promise) => callPromise(promise))
        : [callPromise(promises)];
      response = await callPromiseMethod(startedPromises, promiseMethod);
      resolve(response);
      dispatchCustomEvent(`resolve.${eventName}`, response);
    } catch (e) {
      error = e;
      reject(e);
      dispatchCustomEvent(`reject.${eventName}`, error);
    } finally {
      dispatchCustomEvent(`finally.${eventName}`, {
        response,
        error,
      });
    }
  });
};
