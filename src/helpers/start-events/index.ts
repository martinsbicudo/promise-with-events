import { dispatchCustomEvent } from "../../utils/dispatch-custom-event";
import { IStartEvents } from "./types";

export const startEvents: IStartEvents = (eventNames) => {
  for (const eventName of eventNames) {
    dispatchCustomEvent(`start.${eventName}`);
  }
};
