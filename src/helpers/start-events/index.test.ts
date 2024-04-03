import { dispatchCustomEvent } from "../../utils/dispatch-custom-event";
import { startEvents } from ".";

jest.mock("../../utils/dispatch-custom-event", () => ({
  __esModule: true,
  dispatchCustomEvent: jest.fn(),
}));

describe("helpers > startEvents", () => {
  test("should calls dispatchCustomEvent", () => {
    startEvents(["test1", "test2"]);
    expect(dispatchCustomEvent).toHaveBeenNthCalledWith(1, "start.test1");
    expect(dispatchCustomEvent).toHaveBeenNthCalledWith(2, "start.test2");
  });
});
