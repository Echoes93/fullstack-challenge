const R = require("ramda");
const supertest = require("supertest");
const createApp = require("../lib/app");
const StateContainer = require("../lib/state-container");
const { populateState } = require("./case/state-case");

describe("createApp()", () => {
  it("is Function", () => {
    expect(createApp).toBeInstanceOf(Function);
  });

  it("throws with message if no StateContainer were given", () => {
    const errorMessage = "createApp() requires a StateContainer instance";

    expect(() => createApp()).toThrow(errorMessage);
  });
});

describe("POST /import", () => {
  it("populates state container with parsed data from attached file", () => {
    const container = new StateContainer();
    const request = supertest(createApp(container));
    const filePath = __dirname.concat("/case/testfile.csv");

    return request
      .post("/import")
      .attach("csv-file", filePath)
      .expect(201)
      .then(() => container.search())
      .then(results => expect(results.length).toBeGreaterThan(0));
  });

  it("returns 415, if content-type is not multipart", () => {
    const container = new StateContainer();
    const request = supertest(createApp(container));

    return request
      .post("/import")
      .expect(415)
  });

  it("returns 415, if related file is not csv", () => {
    const container = new StateContainer();
    const request = supertest(createApp(container));
    const filePath = __dirname.concat("/case/not-csv.json");

    return request
      .post("/import")
      .attach("not-csv-file", filePath)
      .expect(415)
  });
});

describe("POST /search", () => {
  it("returns entries, which contain string with specified query", () => {
    const container = new StateContainer();
    const request = supertest(createApp(container));
    const query = "AB";
    const expectedKeys = ["id", "name", "age", "address", "team"];
    populateState(container);

    return request
      .post("/search")
      .send({ query })
      .expect(200)
      .then(({ body }) => {
        expect(body.results).toBeInstanceOf(Array);
        body.results.forEach(entry => {
          // has expected keys
          expect(R.keys(entry)).toEqual(expect.arrayContaining(expectedKeys));

          // Contains specified query in any of properties
          expect(entry.name).toEqual(
            expect.stringContaining(query)
          );
        });
      });
  });
});