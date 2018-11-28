import React from "react";

const Upload = () => (
  <div className="container my-3">
    <h3>Upload</h3>
    <div className="form-group">
      <div className="input-group mb-3">
        <div className="custom-file">
          <input type="file" className="custom-file-input" id="inputGroupFile02" />
          <label className="custom-file-label" htmlFor="inputGroupFile02">Choose file</label>
        </div>
        <div className="input-group-append">
          <span className="input-group-text" id="">Upload</span>
        </div>
      </div>
    </div>
    <div className="progress">
      <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
  </div>
);

export default Upload;