import React from "react"
import GrabFile from "../functions/GrabFile.js"
import RemoveFile from "../functions/RemoveFile.js"

export default function UploadPage(){
    return (
        <div className="dashBoard--FileDisplay">
            <h1>Files</h1>
            <input type="file" id="fileUpload"/>
            <button id="fileSubmit" onClick={GrabFile}>Submit</button>
            <input type="button" value="Delete File" onClick={RemoveFile}/>
        </div>
    )
}