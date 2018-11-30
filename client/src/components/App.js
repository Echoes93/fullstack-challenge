import React from "react";
import { Provider } from "react-redux";

import UploadComponent from "./Upload";
import SearchComponent from "./Search";
import { store } from "../state/state-store";


const App = () => (
  <Provider store={ store }>
    <div>
      <UploadComponent />
      <SearchComponent />
    </div>
  </Provider>
);

export default App;
