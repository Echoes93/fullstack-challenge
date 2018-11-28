import React from "react";

const Search = () => (
  <div className="container my-3">
    <h3>Search</h3>
    <div className="input-group"> 
      <input className="form-control mr-sm-2" type="text" placeholder="Search" />
      <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
    </div>
    <table className="table my-2">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>age</th>
          <th>address</th>
          <th>team</th>
        </tr>
      </thead>
      <tbody>
        <tr className="table-light">
          <td>Active</td>
          <td>Column content</td>
          <td>Column content</td>
          <td>Column content</td>
          <td>Column content</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default Search;