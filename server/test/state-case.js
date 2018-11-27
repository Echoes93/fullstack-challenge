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
    R.xprod(R.range(0, 10)),
    R.forEach(state.put)
  )(vals);
};

const justifiesQuery = (records, string) => 
  R.all(R.any(R.contains(string)))(records)

module.exports = { populateState, justifiesQuery };