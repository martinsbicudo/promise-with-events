import { dispatchCustomEvent } from "../../../../utils/dispatch-custom-event";
import { TPromiseWatched } from "../../types";
import { callPromise } from ".";

jest.mock("../../../../utils/dispatch-custom-event", () => ({
  __esModule: true,
  dispatchCustomEvent: jest.fn(),
}));

describe("helpers > createWatchEvent > callAndStartPromises > callPromise", () => {
  test("should calls function promise", () => {
    const spyPromise = jest.fn();
    callPromise(spyPromise);
    expect(spyPromise).toHaveBeenCalledTimes(1);
  });

  test("should calls watched promise with dispatchCustomEvent", async () => {
    const promise = new Promise((resolve) => {
      setTimeout(resolve, 100, "resolve1");
    }) as TPromiseWatched;
    promise.watchedEventName = "test";
    promise.autoStartEvent = false;

    await callPromise(promise);
    expect(dispatchCustomEvent).toHaveBeenCalledWith("start.test");
  });

  test("should return undefined", async () => {
    const promise = new Promise((resolve) => {
      setTimeout(resolve, 100, "resolve1");
    }) as TPromiseWatched;
    promise.watchedEventName = "test";
    promise.autoStartEvent = true;

    const response = await callPromise(promise);
    expect(response).toBeFalsy();
  });
});
