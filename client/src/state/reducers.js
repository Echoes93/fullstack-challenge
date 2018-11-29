import { combineReducers } from "redux";
import { ACTIONS } from "./actions";

const query = (state = "", {type, payload}) => {
  switch (type) {
    case ACTIONS.QUERY_CHANGED:
      return payload;
    default:
      return state;
  }
};

const results = (state = [], { type, payload }) => {
  switch (type) {
    case ACTIONS.RESULTS_RECEIVED:
      return payload;
    default:
      return state;
  }
};

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

const searchReducer = combineReducers({ query, results });
const uploadReducer = combineReducers({ file, valid });

const rootReducer = combineReducers({
  upload: uploadReducer,
  search: searchReducer
});

export default rootReducer;