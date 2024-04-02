import { TPromiseMethods, ArrayWithMinTwoItems } from "../../../types";
import { TPromise, TFunctionPromise, TPromiseWatched } from "../types";

export interface ICallPromiseMethod {
  (promises: TPromise[], promiseMethod?: TPromiseMethods): Promise<any>;
}

export interface ICallPromise {
  (promise: TPromiseWatched | TFunctionPromise): undefined | TPromise;
}

export interface ICallAndStartPromises {
  (
    promises:
      | TPromiseWatched
      | TFunctionPromise
      | ArrayWithMinTwoItems<TPromiseWatched | TFunctionPromise>,
    eventName: string,
    promiseMethod: TPromiseMethods
  ): Promise<any>;
}
