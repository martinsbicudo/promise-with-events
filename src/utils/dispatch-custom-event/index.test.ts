import { dispatchCustomEvent } from ".";
import { EventEmitter } from "events";

describe("utils > dispatchCustomEvent", () => {
  const spyEmitterEmit = jest.spyOn(EventEmitter.prototype, "emit");

  test("should calls event emit without data", () => {
    dispatchCustomEvent("test");
    expect(spyEmitterEmit).toHaveBeenCalledWith("test", undefined);
  });

  test("should calls event emit with data", () => {
    dispatchCustomEvent("test", "test");
    expect(spyEmitterEmit).toHaveBeenCalledWith("test", "test");
  });
});
