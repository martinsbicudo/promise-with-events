import { dispatchCustomEvent } from "../../utils/dispatch-custom-event";
import { onFinallyEvents } from ".";

describe("events > onFinallyEvents", () => {
  const spyCallback = jest.fn();

  test("should calls dispatchCustomEvent", () => {
    onFinallyEvents(spyCallback, ["test1", "test2"]);
    dispatchCustomEvent("finally.test1");
    dispatchCustomEvent("finally.test2");
  });
});
