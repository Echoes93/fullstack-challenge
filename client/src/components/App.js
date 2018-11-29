import React from "react";
import { Provider } from "react-redux";

import Upload from "./Upload";
import Search from "./Search";
import { store } from "../state/state-store";


const App = () => (
  <Provider store={ store }>
    <div>
      <Upload />
      <Search />
    </div>
  </Provider>
);

export default App;
