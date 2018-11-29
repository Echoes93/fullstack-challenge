import React from "react";
import { connect } from "react-redux";

import { ACTION_CREATORS } from "../state/actions";

const SearchComponent = ({ query, onSearchQueryChange, results }) => (
  <div className="container my-3">
    <h3>Search</h3>
    <div className="input-group"> 
      <input 
        className="form-control mr-sm-2" 
        type="text" 
        placeholder="Search"
        value={query}
        onChange={e => onSearchQueryChange(e.target.value)} />
      <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
    </div>
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
            <tr key={index}>
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