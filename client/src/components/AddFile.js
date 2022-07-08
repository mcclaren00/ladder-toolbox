import React from 'react';
import axios from 'axios';

const AddFile = () => {
  // a local state to store the currently selected file.
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("selectedFile", selectedFile);
    new Response(formData).text().then(console.log)
    try {
        axios.post('//localhost:5000/Upload', selectedFile,).then((response) => {
        console.log("success")
        console.log(response.data)
        console.log(selectedFile);
        })
        /*method: "post",*/
        /*url: "http://localhost:5000/Upload",*/
        /*data: formData,*/
        /*headers: { "Content-Type": "multipart/form-data" },*/
      
      } catch(error) {
      console.log(error)
    }
  }
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileSelect}/>
      <input type="submit" value="Upload File" />
    </form>
  )
};

export default AddFile;
