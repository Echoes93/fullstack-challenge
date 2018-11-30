import React from "react";
import { Provider } from "react-redux";

import UploadComponent from "./Upload/UploadComponent";
import SearchComponent from "./Search/SearchComponent";
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
