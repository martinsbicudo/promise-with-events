import { EventEmitter } from "events";

export const emitter = new EventEmitter();

export const dispatchCustomEvent = (name: string, data?: any) =>
  emitter.emit(name, data);
