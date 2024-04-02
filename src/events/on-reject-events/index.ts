import { watchCustomEvents } from "../../utils";
import { IOnCallEventEvents } from "../types";

export const onRejectEvents: IOnCallEventEvents = (callback, eventNames) =>
  watchCustomEvents(eventNames, "reject", callback);
