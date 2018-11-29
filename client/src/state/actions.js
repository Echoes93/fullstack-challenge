export const ACTIONS = {
  QUERY_CHANGED: "QUERY_CHANGED",
  RESULTS_RECEIVED: "RESULTS_RECEIVED"
};

export const ACTION_CREATORS = {
  searchQueryChanged: query => ({type: ACTIONS.QUERY_CHANGED, payload: query}),
  resultsReceived: results => ({ type: ACTIONS.RESULTS_RECEIVED, payload: results })
};
