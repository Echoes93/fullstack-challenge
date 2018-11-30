import { ofType, combineEpics } from "redux-observable";
import { ajax } from "rxjs/ajax";
import { Subject, merge } from "rxjs";
import { debounceTime, throttleTime, switchMap, map, catchError } from "rxjs/operators";

import { ACTIONS, ACTION_CREATORS } from "./actions";
import { of } from "rxjs";

// const api_host = process.env.NODE_ENV === "development" ? "/api" : "https://api.echoes93.com";
const api_host = "http://localhost:8080";

const queryEpic = action$ => action$.pipe(
  ofType(ACTIONS.LOOKUP_SUGGESTIONS),
  debounceTime(550),
  switchMap(({ payload }) => ajax.post(`${api_host}/search`, { query: payload })),
  map(({ response }) => ACTION_CREATORS.suggestionsReceived(response.results)),
  catchError(error => of(ACTION_CREATORS.ajaxError(error)))
);

const uploadFileEpic = action$ => action$.pipe(
  ofType(ACTIONS.FILE_UPLOAD_ATTEMPT),
  throttleTime(2000),
  switchMap(({ payload }) => {
    const formData = new FormData();
    formData.append("file", payload);

    const progressSubscriber = new Subject();
    const request = ajax({
      url: `${api_host}/import`,
      method: "POST",
      body: formData,
      progressSubscriber
    });

    const requestObservable = request.pipe(
      map(() => ACTION_CREATORS.fileUploadSuccess()),
      catchError(error => of(ACTION_CREATORS.fileUploadError(error)))
    );

    const progressObsevable = progressSubscriber.pipe(
      map(e => {
        const pct = Math.round((e.loaded / e.total) * 100);
        return ACTION_CREATORS.fileUploadProgress(pct)
      })
    );

    return merge(requestObservable, progressObsevable);
  }),
);

const rootEpic = combineEpics(
  queryEpic,
  uploadFileEpic
);

export default rootEpic;