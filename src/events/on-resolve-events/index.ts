import { watchCustomEvents } from "../../utils";
import { IOnCallEventEvents } from "../types";

export const onResolveEvents: IOnCallEventEvents = (callback, eventNames) =>
  watchCustomEvents(eventNames, "resolve", callback);
