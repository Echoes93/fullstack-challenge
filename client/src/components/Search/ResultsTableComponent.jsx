import React from "react";
import { connect } from "react-redux";
import { generate as generateKey } from "shortid";


const ResultsTableComponent = ({ results }) => (
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
);

export default connect(
  state => ({
    results: state.search.results
  })
)(ResultsTableComponent);