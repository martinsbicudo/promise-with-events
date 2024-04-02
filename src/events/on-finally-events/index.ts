import { watchCustomEvents } from "../../utils";
import { IOnCallEventEvents } from "../types";

export const onFinallyEvents: IOnCallEventEvents = (callback, eventNames) =>
  watchCustomEvents(eventNames, "finally", callback);
