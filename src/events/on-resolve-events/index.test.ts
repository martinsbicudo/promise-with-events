import { dispatchCustomEvent } from "../../utils/dispatch-custom-event";
import { onResolveEvents } from ".";

describe("events > onResolveEvents", () => {
  const spyCallback = jest.fn();

  test("should calls dispatchCustomEvent", () => {
    onResolveEvents(spyCallback, ["test1", "test2"]);
    dispatchCustomEvent("resolve.test1");
    dispatchCustomEvent("resolve.test2");
  });
});
