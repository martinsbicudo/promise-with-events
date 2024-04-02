import { TPromiseMethods, ArrayWithMinTwoItems } from "../../types";

export type TPromise = Promise<any>;

export type TFunctionPromise = () => TPromise;

export type TPromiseWatched = Promise<any> & {
  watchedEventName: string;
  autoStartEvent: boolean;
};

export type TFunctionPromiseWithIsWatchedEvent = () => TPromiseWatched;

type TWatchPromisesConfig = {
  eventName: string;
  autoStart?: boolean;
  promiseMethod?: TPromiseMethods;
};

type TCreateWatchEventWithEventName = Parameters<
  <T>(
    promises:
      | TFunctionPromise
      | TPromiseWatched
      | ArrayWithMinTwoItems<TFunctionPromise | TPromiseWatched>,
    eventName: string
  ) => T
>;

type TCreateWatchEventWithConfig = Parameters<
  <T>(
    promises: ArrayWithMinTwoItems<TFunctionPromise | TPromiseWatched>,
    config: TWatchPromisesConfig
  ) => T
>;

type TCreateWatchEventWithConfigAndWithoutPromiseType = Parameters<
  <T>(
    promises: TFunctionPromise | TPromiseWatched,
    config: Omit<TWatchPromisesConfig, "promiseMethod">
  ) => T
>;

export interface ICreateWatchEvent {
  (
    ...params:
      | TCreateWatchEventWithEventName
      | TCreateWatchEventWithConfig
      | TCreateWatchEventWithConfigAndWithoutPromiseType
  ): TPromiseWatched;
}
