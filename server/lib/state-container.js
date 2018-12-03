const H = require("highland");

/*
 * Creates new StateContainer. Has put and search methods. 
 * 
 * put() pushes argument into state collection.
 * put() supposed to be called with List of Strings. 
 *
 * search() accepts query (default: "") and limit (default: 20) parameters.
 * search() returns corresponding results in ES6 Promise.
 * search() assumes that values in State are Lists of Strings.
 * search() uses Highland.js to lazily traverse over state collection.
 * 
 * Note!
 * Adding typechecks to put() would ensure that values are List of Strings,
 * however this would significally affect on put() performance, whereas 
 * it is used only in one place in application and it would be sufficient
 * to just ensure in tests that caller (csv parser) uses it with proper argument.
*/

function StateContainer () {
  const state = [];

  this.put = (record) => state.push(record);
  this.search = (query = "", limit = 20) => 
    H(state)
      .filter(filterByQueryInclusion(query))
      .take(limit)
      .collect()
      .toPromise(Promise);

  return this;
};

StateContainer.withState = (stateContainer) => (req, _res, next) => {
  req.stateContainer = stateContainer;
  next();
};

module.exports = StateContainer;


// HELPERS
const filterByQueryInclusion = (query) => (entry) => 
  String(entry[1]).toLowerCase().includes(query.toLowerCase());