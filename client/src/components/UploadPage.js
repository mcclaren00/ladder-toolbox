import React from "react"
import GrabFile from "../functions/GrabFile.js"
import RemoveFile from "../functions/RemoveFile.js"

const UploadPage = () => {
    return(
        <div className="dashBoard--FileDisplay">
            <h1>Files</h1>
            <input type="file" id="fileUpload" className=""/>
            <button id="fileSubmit" onClick={GrabFile} className="uploadPage--Buttons">Submit</button>
            <input type="button" value="Delete File" onClick={RemoveFile} className="uploadPage--Buttons"/>
        </div>
    )
}

export default UploadPage