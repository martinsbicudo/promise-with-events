import { EventEmitter } from "events";

export const emitter = new EventEmitter();

export const dispatchCustomEvent = (name: string, detail?: any) =>
  emitter.emit(name, detail);
