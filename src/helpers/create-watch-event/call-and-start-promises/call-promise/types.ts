import { TPromise, TFunctionPromise, TPromiseWatched } from "../../types";

export interface ICallPromise {
  (promise: TPromiseWatched | TFunctionPromise): undefined | TPromise;
}
