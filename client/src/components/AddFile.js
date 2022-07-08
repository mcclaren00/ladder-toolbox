import React from "react";

const AddFile = () => {
  return  (
    <form className="fileUploader">
      <h1>Upload file here</h1>
      <input type="file"></input>
      <input type="submit" value="Upload"/>
    </form>
  )
}

export default AddFile