import { dispatchCustomEvent } from "../../utils/dispatch-custom-event";
import { onRejectEvents } from ".";

describe("events > onRejectEvents", () => {
  const spyCallback = jest.fn();

  test("should calls dispatchCustomEvent", () => {
    onRejectEvents(spyCallback, ["test1", "test2"]);
    dispatchCustomEvent("reject.test1");
    dispatchCustomEvent("reject.test2");
  });
});
