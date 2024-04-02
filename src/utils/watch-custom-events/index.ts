import { watchCustomEvent } from "../watch-custom-event";
import { IWatchCustomEvents } from "./types";

export const watchCustomEvents: IWatchCustomEvents = (
  eventNames,
  prefix,
  callback
) => {
  const events = Array.isArray(eventNames) ? eventNames : [eventNames];
  const watchs = events.map((eventName) => watchCustomEvent(eventName, prefix));

  return Promise.all(watchs)
    .then((responses) => callback(undefined, ...responses))
    .catch(callback);
};
