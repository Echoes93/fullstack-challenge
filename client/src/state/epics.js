import { ofType, combineEpics } from "redux-observable";
import { ajax } from "rxjs/ajax";
import { debounceTime, switchMap, map, catchError, mergeMap } from "rxjs/operators";

import { ACTIONS, ACTION_CREATORS } from "./actions";
import { of } from "rxjs";

const api_host = process.env.NODE_ENV === "development" ? "/api" : "https://api.echoes93.com";

const queryEpic = action$ => action$.pipe(
  ofType(ACTIONS.QUERY_CHANGED),
  debounceTime(500),
  switchMap(({ payload }) => ajax.post(`${api_host}/search`, { query: payload })),
  map(({ response }) => ACTION_CREATORS.resultsReceived(response.results)),
  catchError(error => of(ACTION_CREATORS.ajaxError(error)))
);

const uploadFileEpic = action$ => action$.pipe(
  ofType(ACTIONS.FILE_UPLOAD_ATTEMPT),
  mergeMap(({ payload }) => {
    const formData = new FormData();
    formData.append("file", payload);

    return ajax({
      url: `${api_host}/import`,
      method: "POST",
      body: formData
    }).pipe(
      map(() => ACTION_CREATORS.fileUploadSuccess()),
      catchError(error => of(ACTION_CREATORS.fileUploadError(error)))
    );
  })
);

const rootEpic = combineEpics(
  queryEpic,
  uploadFileEpic
);

export default rootEpic;