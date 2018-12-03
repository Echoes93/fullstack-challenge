const StateContainer = require("../lib/state-container");
const { populateState, justifiesQuery } = require("./case/state-case");

describe("Calling new StateContainer() returns object", () => {
  it("is instance of StateContainer", () => {
    const container = new StateContainer();

    expect(container).toBeInstanceOf(StateContainer);
  });

  it("has 'put()' and 'search()' methods", () => {
    const { put, search } = new StateContainer();

    expect(put).toBeInstanceOf(Function);
    expect(search).toBeInstanceOf(Function);
  });
});

describe("Calling search()", () => {
  it("returns promise", () => {
    const container = new StateContainer();
    const result = container.search();

    expect(result).toBeInstanceOf(Promise);
  });

  it("returns entries, which contain string with specified query", () => {
    const container = new StateContainer();
    const query = "AB";
    populateState(container);

    container
      .search(query)
      .then(results => expect(justifiesQuery(results, query)).toBeTruthy());
  });

  it("returns list of maximum entries, specified by second parameter (limit)", () => {
    const container = new StateContainer();
    const limit = 5;
    populateState(container);

    container
      .search("", limit)
      .then(results => expect(results.length).toBeLessThanOrEqual(limit));
  });

  it("returns list of maximum 20 entries, if second parameter (limit) was not specified", () => {
    const container = new StateContainer();
    const defaultLimit = 20;
    populateState(container);

    container
      .search()
      .then(results => expect(results.length).toBeLessThanOrEqual(defaultLimit));
  });
});

describe("Calling put()", () => {
  it("pushes value into container", () => {
    const { put, search } = new StateContainer();
    const dummyRecord = ["dummy", "name_field"];

    put(dummyRecord);

    return search("name_field")
      .then(results => {
        expect(results).toContain(dummyRecord);
      });
  });
});
