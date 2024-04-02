import { onStartEvents } from "../../events/on-start-events";
import { ICreateWatchEvent, TPromiseWatched } from "./types";
import { TPromiseMethods } from "../../types";
import { callAndStartPromises } from "./call-and-start-promises";

export const createWatchEvent: ICreateWatchEvent = (promises, config) => {
  let promise;
  const configIsString = typeof config === "string";
  const eventName = configIsString ? config : config.eventName;
  const autoStart = configIsString ? false : config.autoStart;

  let promiseMethod: TPromiseMethods;
  if (configIsString) promiseMethod = "all";
  if (!configIsString && "promiseMethod" in config)
    promiseMethod = config.promiseMethod;

  const startWatchedEvent = () =>
    callAndStartPromises(promises, eventName, promiseMethod);

  if (autoStart) promise = startWatchedEvent() as TPromiseWatched;
  else
    promise = new Promise((resolve, reject) => {
      onStartEvents(() => {
        startWatchedEvent().then(resolve).catch(reject);
      }, [eventName]);
    }) as TPromiseWatched;

  promise.watchedEventName = eventName;
  promise.autoStartEvent = autoStart;

  return promise;
};
