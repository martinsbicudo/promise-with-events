import { TPromiseMethods, ArrayWithMinTwoItems } from "../../../types";
import { TFunctionPromise, TPromiseWatched } from "../types";

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
