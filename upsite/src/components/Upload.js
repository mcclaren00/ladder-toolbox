import React/*, { useState }*/ from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
/*import axios from "axios";*/

export default function Upload()  {
    /*const [file, setFile] = useState()

function handleChange(event) {
    setFile(event.target.files[0])
  }
  function handleSubmit(event) {
    event.preventDefault()
    const url = 'http://localhost:3000/Upload';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });

  }*/
    return  (
        <div className="containerUpload">
            <Navbar />
            <form>
                <h1>Upload file here</h1>
                <input type="file"></input>
                <button type="submit">Upload</button>
            </form>
            <Footer />
        </div>
    )
}