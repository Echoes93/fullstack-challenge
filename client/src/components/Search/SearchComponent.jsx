import React from "react";
import { connect } from "react-redux";
import { generate as generateKey } from "shortid";

import SearchFieldComponent from "./SearchFieldComponent";
import { ACTION_CREATORS } from "../../state/actions";

const SearchComponent = ({ query, onSearchQueryChange, results }) => (
  <div className="container my-3">
    <h3>Search</h3>
    <SearchFieldComponent />
    <table className="table my-2">
      <thead>
        <tr>
          <th style={{ width: "8%" }}>id</th>
          <th style={{ width: "30%" }}>name</th>
          <th style={{ width: "8%" }}>age</th>
          <th style={{ width: "40%" }}>address</th>
          <th style={{ width: "14%" }}>team</th>
        </tr>
      </thead>
      <tbody>
        {
          results.map((entry, index) => (
            <tr id={`result-${index}`} key={generateKey()}>
              <td>{entry.id}</td>
              <td>{entry.name}</td>
              <td>{entry.age}</td>
              <td>{entry.address}</td>
              <td>{entry.team}</td>
            </tr>)
          )
        }
      </tbody>
    </table>
  </div>
);

export default connect(
  state => ({
    query: state.search.searchQuery,
    results: state.search.results
  }),
  dispatch => ({
    onSearchQueryChange: query => dispatch(ACTION_CREATORS.searchQueryChanged(query))
  })
)(SearchComponent);