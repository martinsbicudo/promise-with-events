import { callAndStartPromises } from "./call-and-start-promises";
import { dispatchCustomEvent } from "../../utils";
import { createWatchEvent } from ".";

jest.mock("./call-and-start-promises", () => ({
  __esModule: true,
  callAndStartPromises: jest.fn().mockReturnValue({
    then: (callback: VoidFunction) => {
      callback();
      return {
        catch: (callback: VoidFunction) => callback(),
      };
    },
  }),
}));

describe("helpers > createWatchEvent", () => {
  const promiseResolve1 = () => new Promise((resolve) => resolve("resolve1"));

  test("should calls callAndStartPromises | single promise", async () => {
    const promise = createWatchEvent(promiseResolve1, "test");
    dispatchCustomEvent("start.test");

    await promise;
    expect(callAndStartPromises).toHaveBeenCalledWith(
      promiseResolve1,
      "test",
      "all"
    );
  });

  test("should calls callAndStartPromises | single promise and autoStart", async () => {
    const promise = createWatchEvent(promiseResolve1, {
      eventName: "test",
      autoStart: true,
    });

    await promise;
    expect(callAndStartPromises).toHaveBeenCalledWith(
      promiseResolve1,
      "test",
      undefined
    );
  });

  test("should calls callAndStartPromises | multi promise", async () => {
    const promise = createWatchEvent(
      [promiseResolve1, promiseResolve1],
      "test"
    );
    dispatchCustomEvent("start.test");

    await promise;
    expect(callAndStartPromises).toHaveBeenCalledWith(
      [promiseResolve1, promiseResolve1],
      "test",
      "all"
    );
  });

  test("should calls callAndStartPromises | multi promise and autoStart", async () => {
    const promise = createWatchEvent([promiseResolve1, promiseResolve1], {
      eventName: "test",
      autoStart: true,
    });

    await promise;
    expect(callAndStartPromises).toHaveBeenCalledWith(
      [promiseResolve1, promiseResolve1],
      "test",
      undefined
    );
  });

  test("should calls callAndStartPromises | multi promise and promiseMethod", async () => {
    const promise = createWatchEvent([promiseResolve1, promiseResolve1], {
      eventName: "test",
      promiseMethod: "any",
    });
    dispatchCustomEvent("start.test");

    await promise;
    expect(callAndStartPromises).toHaveBeenCalledWith(
      [promiseResolve1, promiseResolve1],
      "test",
      "any"
    );
  });
});
