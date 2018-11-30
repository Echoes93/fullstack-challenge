export const ACTIONS = {
  // Search
  QUERY_CHANGED: "QUERY_CHANGED",
  LOOKUP_SUGGESTIONS: "LOOKUP_SUGGESTIONS",
  SUGGESTIONS_RECEIVED: "SUGGESTIONS_RECEIVED",
  CLEAR_SUGGESTIONS: "CLEAR_SUGGESTIONS",
  DISPLAY_RESULTS: "DISPLAY_RESULTS",
  AJAX_ERROR: "AJAX_ERROR",
  // File 
  FILE_SELECTED: "FILE_SELECTED",
  FILE_UPLOAD_ATTEMPT: "FILE_UPLOAD_ATTEMPT",
  FILE_UPLOAD_SUCCESS: "FILE_UPLOAD_SUCCESS",
  FILE_UPLOAD_ERROR: "FILE_UPLOAD_ERROR",
  FILE_UPLOAD_PROGRESS: "FILE_UPLOAD_PROGRESS",
  RESET_STATUS: "RESET_STATUS"
};

export const ACTION_CREATORS = {
  searchQueryChanged: query => ({type: ACTIONS.QUERY_CHANGED, payload: query}),
  lookupSuggestions: query => ({ type: ACTIONS.LOOKUP_SUGGESTIONS, payload: query }),
  clearSuggestions: () => ({ type: ACTIONS.CLEAR_SUGGESTIONS }),
  suggestionsReceived: results => ({ type: ACTIONS.SUGGESTIONS_RECEIVED, payload: results }),
  displayResults: results => ({ type: ACTIONS.DISPLAY_RESULTS, payload: results }),
  ajaxError: err => ({ type: ACTIONS.AJAX_ERROR, payload: err }),
  
  fileSelected: file => ({ type: ACTIONS.FILE_SELECTED, payload: file }),
  fileUploadAttempt: file => ({ type: ACTIONS.FILE_UPLOAD_ATTEMPT, payload: file }),
  fileUploadSuccess: () => ({ type: ACTIONS.FILE_UPLOAD_SUCCESS }),
  fileUploadError: err => ({ type: ACTIONS.FILE_UPLOAD_ERROR, payload: err }),
  fileUploadProgress: percentage => ({ type: ACTIONS.FILE_UPLOAD_PROGRESS, payload: percentage }),
  resetStatus: () => ({ type: ACTIONS.RESET_STATUS })
};
