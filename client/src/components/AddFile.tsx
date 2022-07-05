import React, { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ipfsClient from 'ipfs-http-client';



const projectId = process.env.PROJECT_ID; 
const projectSecret = process.env.PROJECT_SECRET; 


const authorization = "Basic " + btoa(projectId + ":" + projectSecret);

function AddFile() {
  const [images, setImages] = React.useState<{ cid: ipfsClient.CID; path: string }[]>([]);

  let ipfs: ipfsClient.IPFSHTTPClient | undefined;
  try {
    ipfs = ipfsClient.create({
      url: "https://ipfs.infura.io:5001/api/v0",
      headers: {
        authorization,
      },
    });
  } catch (error) {
    console.error("IPFS error ", error);
    ipfs = undefined;
  }

  /**
   * @description event handler that uploads the file selected by the user
   */
  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const files = (form[0] as HTMLInputElement).files;

    if (!files || files.length === 0) {
      return alert("No files selected");
    }

    const file = files[0];
    // upload files
    const result = await (ipfs as ipfsClient.IPFSHTTPClient).add(file);

    const uniquePaths = new Set([
      ...images.map((image) => image.path),
      result.path,
    ]);
    // @ts-ignore
    const uniqueImages = [...uniquePaths.values()]
      .map((path) => {
        return [
          ...images,
          {
            cid: result.cid,
            path: result.path,
          },
        ].find((image) => image.path === path);
      });
    
      // @ts-ignore
    setImages(uniqueImages);

    form.reset();
  };

  console.log("images ", images);

  return (
    <div className="App">
      <header className="App-header">
        {ipfs && (
          <>
            <p>Upload File using IPFS</p>

            <form onSubmit={onSubmitHandler}>
              <input name="file" type="file" />

              <button type="submit">Upload File</button>
            </form>

            <div>
              {images.map((image, index) => (
                <img
                  alt={`Uploaded #${index + 1}`}
                  src={"https://ipfs.infura.io/ipfs/" + image.path}
                  style={{ maxWidth: "400px", margin: "15px" }}
                  key={image.cid.toString() + index}
                />
              ))}
            </div>
          </>
        )}

        {!ipfs && (
          <p>Oh oh, Not connected to IPFS. Checkout out the logs for errors</p>
        )}
      </header>
    </div>
  );
}
export default AddFile; 


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
   