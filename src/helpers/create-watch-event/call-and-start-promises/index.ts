import { dispatchCustomEvent } from "../../../utils/dispatch-custom-event";
import { ICallAndStartPromises } from "./types";
import { callPromise } from "./call-promise";
import { callPromiseMethod } from "./call-promise-method";

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
      let startedPromises = Array.isArray(promises)
        ? promises.map((promise) => callPromise(promise))
        : [callPromise(promises)];
      startedPromises = startedPromises.filter((promise) => Boolean(promise));
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
