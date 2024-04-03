import { dispatchCustomEvent } from "../../utils/dispatch-custom-event";
import { onStartEvents } from ".";

describe("events > onStartEvents", () => {
  const spyCallback = jest.fn();

  test("should calls dispatchCustomEvent", () => {
    onStartEvents(spyCallback, ["test1", "test2"]);
    dispatchCustomEvent("start.test1");
    dispatchCustomEvent("start.test2");
  });
});
