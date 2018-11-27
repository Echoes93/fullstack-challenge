const createApp = require("../lib/app");

describe("createApp()", () => {
  it("is Function", () => {
    expect(createApp).toBeInstanceOf(Function);
  });

  it("throws with message if no StateContainer were given", () => {
    const errorMessage = "createApp() requires a StateContainer instance";

    expect(() => createApp()).toThrow(errorMessage);
  });
});