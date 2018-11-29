import { ofType, combineEpics } from "redux-observable";
import { ajax } from "rxjs/ajax";
import { debounceTime, switchMap, map } from "rxjs/operators";

import { ACTIONS, ACTION_CREATORS } from "./actions";

const api_host = process.env.NODE_ENV === "development" ? "/api" : "https://api.echoes93.com";

const queryEpic = action$ => action$.pipe(
  ofType(ACTIONS.QUERY_CHANGED),
  debounceTime(500),
  switchMap(({ payload }) => ajax.post(`${api_host}/search`, { query: payload })),
  map(({ response }) => ACTION_CREATORS.resultsReceived(response.results))
);


const rootEpic = combineEpics(
  queryEpic
);

export default rootEpic;