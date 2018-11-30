import React from "react";
import { connect } from "react-redux";
import { ACTION_CREATORS } from "../../state/actions";


const UploadStatusComponent = ({ progress, status, dismiss }) => {
  switch (status) {
    case "Pending": 
      return (
        <div className="progress">
          <div 
            className="progress-bar progress-bar-striped progress-bar-animated" 
            role="progressbar" 
            style={{width: `${progress}%`}}
            aria-valuemin="0" 
            aria-valuemax="100">
          </div>
        </div>);

    case "Success":
      return (
        <div>
          <div className="alert alert-dismissible alert-success">
            <button type="button" className="close" data-dismiss="alert" onClick={ dismiss }>&times;</button>
            <strong>File uploaded!</strong> You can query its data now.
          </div>
        </div>);

    case "Errored":
      return (
        <div>
          <div className="alert alert-dismissible alert-danger">
            <button type="button" className="close" data-dismiss="alert" onClick={ dismiss }>&times;</button>
            <strong>Oops!</strong> Error occured.
          </div>
        </div>)
      
    default: return <div></div>     
  }
};

export default connect(
  state => ({
    status: state.upload.status,
    progress: state.upload.progress
  }),
  dispatch => ({
    dismiss: () => dispatch(ACTION_CREATORS.resetStatus())
  })
)(UploadStatusComponent)