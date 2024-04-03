import { TPromise } from "../../types";
import { TPromiseMethods } from "../../../../types";

export interface ICallPromiseMethod {
  (promises: TPromise[], promiseMethod?: TPromiseMethods): Promise<any>;
}
