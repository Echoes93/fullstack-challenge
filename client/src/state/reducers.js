import { combineReducers } from "redux";
import { ACTIONS } from "./actions";

const file = (state = null, { type, payload }) => {
  switch (type) {
    case ACTIONS.FILE_SELECTED:
      return payload;
    default:
      return state;
  }
};

const valid = (state = false, { type, payload }) => {
  switch (type) {
    case ACTIONS.FILE_SELECTED:
      return /.*\.csv$/.test(payload.name);
    default:
      return state;
  }
};

const status = (state = null, { type }) => {
  switch (type) {
    case ACTIONS.FILE_UPLOAD_ATTEMPT:
      return "Pending";
    case ACTIONS.FILE_UPLOAD_SUCCESS:
      return "Success";
    case ACTIONS.FILE_UPLOAD_ERROR:
      return "Errored";
    case ACTIONS.RESET_STATUS:
      return "";
    default:
      return state;
  }
};

const progress = (state = 0, { type, payload }) => {
  switch (type) {
    case ACTIONS.FILE_UPLOAD_PROGRESS:
      return payload;
    case ACTIONS.FILE_SELECTED:
      return 0;
    default:
      return state;
  }
};

/* 
 * ------------------------ Kludge ----------------------------
 * React-Autosuggest returns undefined instead of empty string; 
 * Return "" in such case;
 * ------------------------------------------------------------
*/ 
const query = (state = "", { type, payload }) => {
  switch (type) {
    case ACTIONS.QUERY_CHANGED:
      return payload ? payload : "";
    default:
      return state;
  }
};

const suggestions = (state = [], { type, payload }) => {
  switch (type) {
    case ACTIONS.SUGGESTIONS_RECEIVED:
      return payload;
    case ACTIONS.CLEAR_SUGGESTIONS:
      return [];
    default:
      return state;
    }
};

const results = (state = [], { type, payload }) => {
  switch (type) {
    case ACTIONS.DISPLAY_RESULTS:
      return payload;
    default:
      return state;
  }
};


const searchReducer = combineReducers({ query, suggestions, results });
const uploadReducer = combineReducers({ file, valid, status, progress });

const rootReducer = combineReducers({
  upload: uploadReducer,
  search: searchReducer
});

export default rootReducer;