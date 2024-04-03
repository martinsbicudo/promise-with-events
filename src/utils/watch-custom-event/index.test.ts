import { watchCustomEvent } from ".";
import { emitter } from "../dispatch-custom-event";

describe("utils > watchCustomEvent", () => {
  const spyEmitterOnce = jest.spyOn(emitter, "once");

  test("should calls event once", () => {
    watchCustomEvent("test", "test");
    emitter.emit("test.test");
    expect(spyEmitterOnce).toHaveBeenCalledTimes(1);
  });
});
