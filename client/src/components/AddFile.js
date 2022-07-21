import React, { Component } from 'react';
import axios from 'axios';
export default class FilesUploadComponent extends Component {
    constructor(props) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            profileImg: ''
        }
    }
    onFileChange(e) {
        this.setState({ profileImg: e.target.files[0] })
    }
    onSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('profileImg', this.state.profileImg)
        axios.post("http://192.168.50.143:4000/api/user-profile", formData, {
        }).then(res => {
            console.log(res)
        })
    }

  //const AddFile = () => {
  // a local state to store the currently selected file.
  //const [selectedFile, setSelectedFile] = React.useState(null);

  //const handleSubmit = async (event) => {
    //event.preventDefault()
    //const formData = new FormData();
    //formData.append("selectedFile", selectedFile);
    //new Response(formData).text().then(console.log)
    //try {
        //axios.post('//localhost:5000/Upload', selectedFile,).then((response) => {
        //console.log("success")
        //console.log(response.data)
        //console.log(selectedFile);
        //})
        /*method: "post",*/
        /*url: "http://localhost:5000/Upload",*/
        /*data: formData,*/
        /*headers: { "Content-Type": "multipart/form-data" },*/
      
      //} catch(error) {
      //console.log(error)
    //}
  //}
    render() {
      return (
          <div className="container">
              <div className="row">
                  <form onSubmit={this.onSubmit}>
                      <div className="form-group">
                          <input type="file" onChange={this.onFileChange} />
                      </div>
                      <div className="form-group">
                          <button className="btn btn-primary" type="submit">Upload</button>
                      </div>
                  </form>
              </div>
          </div>
      )
  }
}
