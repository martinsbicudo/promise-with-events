import { ICallPromiseMethod } from "./types";

export const callPromiseMethod: ICallPromiseMethod = (
  promises,
  promiseMethod = "all"
) => {
  if (promises.length === 1) return promises[0];

  const allowedPromiseMethods = {
    all: () => Promise.all(promises),
    allSettled: () =>
      Promise.allSettled(promises).then(([...responses]: any[]) =>
        responses.map((response) => response.value)
      ),
    any: () => Promise.any(promises),
    race: () => Promise.race(promises),
  };

  return allowedPromiseMethods[promiseMethod]();
};
