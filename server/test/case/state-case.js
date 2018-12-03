const R = require("ramda");

/*
 * Populates state with all possible combinations of vals list and 0..10 range, 30 entries total.
*/
const populateState = (state) => {
  const vals = [
    ["A"],
    ["AB"],
    ["ABC"]
  ];

  R.pipe(
    R.xprod(R.times(n => String(n), 10)),
    R.forEach(state.put)
  )(vals);
};

const matchesQuery = (query, matchedField) => 
  R.contains(
    R.toLower(query),
    R.toLower(matchedField)
  );

module.exports = { populateState, matchesQuery };