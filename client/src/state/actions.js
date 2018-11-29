export const ACTIONS = {
  QUERY_CHANGED: "QUERY_CHANGED",
  RESULTS_RECEIVED: "RESULTS_RECEIVED",
  FILE_SELECTED: "FILE_SELECTED",
  AJAX_ERROR: "AJAX_ERROR",
  // File ajax
  FILE_UPLOAD_ATTEMPT: "FILE_UPLOAD_ATTEMPT",
  FILE_UPLOAD_SUCCESS: "FILE_UPLOAD_SUCCESS",
  FILE_UPLOAD_ERROR: "FILE_UPLOAD_ERROR"
};

export const ACTION_CREATORS = {
  searchQueryChanged: query => ({type: ACTIONS.QUERY_CHANGED, payload: query}),
  resultsReceived: results => ({ type: ACTIONS.RESULTS_RECEIVED, payload: results }),
  fileSelected: file => ({ type: ACTIONS.FILE_SELECTED, payload: file }),
  ajaxError: err => ({ type: ACTIONS.AJAX_ERROR, payload: err }),
  fileUploadAttempt: file => ({ type: ACTIONS.FILE_UPLOAD_ATTEMPT, payload: file }),
  fileUploadSuccess: () => ({ type: ACTIONS.FILE_UPLOAD_SUCCESS }),
  fileUploadError: err => ({ type: ACTIONS.FILE_UPLOAD_ERROR, payload: err })
};
