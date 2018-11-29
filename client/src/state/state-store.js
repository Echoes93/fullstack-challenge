import { createStore, applyMiddleware, compose } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import { createEpicMiddleware } from "redux-observable";

import rootReducer from "./reducers";
import rootEpic from "./epics";

const epicMiddleware = createEpicMiddleware();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(epicMiddleware),
    devToolsEnhancer()
  )
);

epicMiddleware.run(rootEpic);

export { store };