import React from "react";

import SearchFieldComponent from "./SearchFieldComponent";
import ResultsTableComponent from "./ResultsTableComponent";


const SearchComponent = () => (
  <div className="container my-3">
    <h3>Search</h3>
    <SearchFieldComponent />
    <ResultsTableComponent />
  </div>
);

export default SearchComponent;