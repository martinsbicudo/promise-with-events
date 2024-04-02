import { IWatchCustomEvent } from "./type";
import { emitter } from "../dispatch-custom-event";

export const watchCustomEvent: IWatchCustomEvent = (
  eventName: string,
  prefix: string
) =>
  new Promise((resolve, reject) => {
    try {
      const event = prefix ? `${prefix}.${eventName}` : eventName;
      emitter.once(event, resolve);
    } catch (e) {
      reject(e);
    }
  });
