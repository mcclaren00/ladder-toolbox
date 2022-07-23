import axios from 'axios';
import React, { Component } from 'react';
import DashBoardData from "../data/DashBoardData"
import UserFile from "./UserFile"
const data = DashBoardData.map(item => {
    return (
        <UserFile 
            className="dashBoard--Files"
            key = {item.id}
            item = {item}
        />
    )
})
export default class DashboardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({value: e.target.value});
    }
    handleSubmit(e) {
        e.preventDefault()
        const cid = (this.state.value);
        console.log('loaded!')
        var data = JSON.stringify({
            "title": cid
          });
          
          var config = {
            method: 'post',
            url: 'http://localhost:4001/api/download',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    render() {
        return (
        <div className="myDashBoard--Wrapper">
            <h1><span className="dashBoard--HeaderText">My DashBoard</span></h1>
            <div className="UserFile--FileHeader">
                <p>File Name</p>
                <p>File Type</p>
                <p>File Upload Date</p>
            </div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    CID:
                    <input type="text" name="CID" onChange={this.handleChange}/>
                </label>
                <button type="submit">Fetch</button>
            </form>
            <div className="dashBoard--FileWrapper">
                
            </div>
        </div>
        )
    }
    //export default MyDashBoard
}
