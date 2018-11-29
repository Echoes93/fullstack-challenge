import React from "react";
import { connect } from "react-redux";
import { ACTION_CREATORS } from "../state/actions";

const UploadComponent = ({ file, valid, progress, onFileSelected, onFileUpload }) => (
  <div className="container my-3">
    <h3>Upload</h3>
    <div className="form-group">
      <div className="input-group mb-3">
        <div className="custom-file">
          <input 
            type="file" 
            id="uploadField"
            className="custom-file-input" 
            onChange={e => onFileSelected(e.target.files[0])} />
          <label className="custom-file-label" htmlFor="inputGroupFile02">
            {file ? file.name : "Choose File"}
          </label>
        </div>
        <div className="input-group-append">
          <button 
            type="button" 
            id="uploadButton"
            className="btn btn-outline-primary" 
            onClick={() => onFileUpload(file)}
            disabled={!valid}
            >Upload</button>
        </div>
      </div>
    </div>
    <div className="progress">
      <div 
        className="progress-bar progress-bar-striped progress-bar-animated" 
        role="progressbar" 
        style={{width: `${progress}%`}} 
        aria-valuenow="25" 
        aria-valuemin="0" 
        aria-valuemax="100"></div>
    </div>
  </div>
);

export default connect(
  state => ({
    file: state.upload.file,
    valid: state.upload.valid,
    progress: state.upload.progress
  }),
  dispatch => ({
    onFileSelected: file => dispatch(ACTION_CREATORS.fileSelected(file)),
    onFileUpload: file => dispatch(ACTION_CREATORS.fileUploadAttempt(file))
  })
)(UploadComponent);