import { callPromiseMethod } from ".";

jest.mock("../../../../utils/dispatch-custom-event", () => ({
  __esModule: true,
  dispatchCustomEvent: jest.fn(),
}));

describe("helpers > createWatchEvent > callAndStartPromises > callPromiseMethod", () => {
  const promiseResolve1 = () =>
    new Promise((resolve) => {
      setTimeout(resolve, 100, "resolve1");
    });
  const getPromises = () => [promiseResolve1(), promiseResolve1()];

  const spyPromiseAll = jest.spyOn(Promise, "all");
  const spyPromiseAllSettled = jest.spyOn(Promise, "allSettled");
  const spyPromiseAny = jest.spyOn(Promise, "any");
  const spyPromiseRace = jest.spyOn(Promise, "race");

  test("should not calls Promise", async () => {
    const response = await callPromiseMethod([promiseResolve1()]);
    expect(response).toBe("resolve1");
    expect(spyPromiseAll).toHaveBeenCalledTimes(0);
    expect(spyPromiseAllSettled).toHaveBeenCalledTimes(0);
    expect(spyPromiseAny).toHaveBeenCalledTimes(0);
    expect(spyPromiseRace).toHaveBeenCalledTimes(0);
  });

  test("should calls Promise.all", async () => {
    await callPromiseMethod(getPromises());
    expect(spyPromiseAll).toHaveBeenCalledTimes(1);
    spyPromiseAll.mockReset();
  });

  test("should calls Promise.all passing promiseMethod all", async () => {
    await callPromiseMethod(getPromises(), "all");
    expect(spyPromiseAll).toHaveBeenCalledTimes(1);
  });

  test("should calls Promise.allSettled passing promiseMethod allSettled", async () => {
    await callPromiseMethod(getPromises(), "allSettled");
    expect(spyPromiseAllSettled).toHaveBeenCalledTimes(1);
  });

  test("should calls Promise.any passing promiseMethod any", async () => {
    await callPromiseMethod(getPromises(), "any");
    expect(spyPromiseAny).toHaveBeenCalledTimes(1);
  });

  test("should calls Promise.race passing promiseMethod race", async () => {
    await callPromiseMethod(getPromises(), "race");
    expect(spyPromiseRace).toHaveBeenCalledTimes(1);
  });
});
