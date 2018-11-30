import React from "react";

import FileInputComponent from "./FileInputComponent";
import UploadStatusComponent from "./UploadStatusComponent";


const UploadComponent = () => (
  <div className="container my-3">
    <h3>Upload</h3>
    <FileInputComponent />
    <UploadStatusComponent />
  </div>
);

export default UploadComponent;