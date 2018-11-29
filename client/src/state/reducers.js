import { combineReducers } from "redux";
import { ACTIONS } from "./actions";

const searchQuery = (state = "", {type, payload}) => {
  switch (type) {
    case ACTIONS.QUERY_CHANGED:
      return payload;
    default:
      return state;
  }
};

const results = (state = [], { type, payload }) =>{
  switch (type) {
    case ACTIONS.RESULTS_RECEIVED:
      return payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  searchQuery,
  results
});

export default rootReducer;