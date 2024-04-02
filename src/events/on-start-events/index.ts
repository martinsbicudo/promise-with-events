import { watchCustomEvents } from "../../utils";
import { IOnCallEventEvents } from "../types";

export const onStartEvents: IOnCallEventEvents = (callback, eventNames) =>
  watchCustomEvents(eventNames, "start", callback);
