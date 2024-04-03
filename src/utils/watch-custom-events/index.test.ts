import { watchCustomEvents } from ".";
import { emitter } from "../dispatch-custom-event";
import {} from "jest";

describe("utils > watchCustomEvents", () => {
  const spyEmitterOnce = jest.spyOn(emitter, "once");
  const spyCallback = jest.fn();

  test("should calls event once and callback", () => {
    const promise = watchCustomEvents(["test1", "test2"], "test", spyCallback);

    emitter.emit("test.test1");
    emitter.emit("test.test2");

    promise.then(() => {
      expect(spyEmitterOnce).toHaveBeenCalledTimes(2);
      expect(spyCallback).toHaveBeenCalledTimes(1);
    });
  });
});
