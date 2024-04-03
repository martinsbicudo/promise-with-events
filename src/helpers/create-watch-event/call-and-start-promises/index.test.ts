import { dispatchCustomEvent } from "../../../utils/dispatch-custom-event";
import { callAndStartPromises } from ".";

jest.mock("../../../utils/dispatch-custom-event", () => ({
  __esModule: true,
  dispatchCustomEvent: jest.fn(),
}));

describe("helpers > createWatchEvent > callAndStartPromises", () => {
  const promiseResolve1 = () =>
    new Promise<any>((resolve) => {
      setTimeout(resolve, 100, "resolve1");
    });
  const promiseReject1 = () =>
    new Promise((_, reject) => {
      setTimeout(reject, 100, "reject1");
    });

  describe("success", () => {
    test("should calls dispatch start, resolve and finally events | single promise", async () => {
      await callAndStartPromises(promiseResolve1, "test", "all");
      expect(dispatchCustomEvent).toHaveBeenNthCalledWith(
        1,
        "start.test",
        "all"
      );
      expect(dispatchCustomEvent).toHaveBeenNthCalledWith(
        2,
        "resolve.test",
        "resolve1"
      );
      expect(dispatchCustomEvent).toHaveBeenNthCalledWith(3, "finally.test", {
        error: undefined,
        response: "resolve1",
      });

      (dispatchCustomEvent as jest.Mock).mockReset();
    });

    test("should calls dispatch start, resolve and finally events | multi promise", async () => {
      await callAndStartPromises(
        [promiseResolve1, promiseResolve1],
        "test",
        "all"
      );
      expect(dispatchCustomEvent).toHaveBeenNthCalledWith(
        1,
        "start.test",
        "all"
      );
      expect(dispatchCustomEvent).toHaveBeenNthCalledWith(2, "resolve.test", [
        "resolve1",
        "resolve1",
      ]);
      expect(dispatchCustomEvent).toHaveBeenNthCalledWith(3, "finally.test", {
        error: undefined,
        response: ["resolve1", "resolve1"],
      });

      (dispatchCustomEvent as jest.Mock).mockReset();
    });
  });

  describe("error", () => {
    test("should calls dispatch start, reject and finally events | single promise", async () => {
      try {
        await callAndStartPromises(promiseReject1, "test", "all");
      } catch {
        expect(dispatchCustomEvent).toHaveBeenNthCalledWith(
          1,
          "start.test",
          "all"
        );
        expect(dispatchCustomEvent).toHaveBeenNthCalledWith(
          2,
          "reject.test",
          "reject1"
        );
        expect(dispatchCustomEvent).toHaveBeenNthCalledWith(3, "finally.test", {
          error: "reject1",
          response: undefined,
        });

        (dispatchCustomEvent as jest.Mock).mockReset();
      }
    });

    test("should calls dispatch start, reject and finally events | multi promise", async () => {
      try {
        await callAndStartPromises(
          [promiseReject1, promiseReject1],
          "test",
          "all"
        );
      } catch {
        expect(dispatchCustomEvent).toHaveBeenNthCalledWith(
          1,
          "start.test",
          "all"
        );
        expect(dispatchCustomEvent).toHaveBeenNthCalledWith(
          2,
          "reject.test",
          "reject1"
        );
        expect(dispatchCustomEvent).toHaveBeenNthCalledWith(3, "finally.test", {
          error: "reject1",
          response: undefined,
        });
      }
    });
  });
});
