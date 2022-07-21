import axios from 'axios';
import React, { Component } from 'react';
import DashBoardData from "../data/DashBoardData"
import UserFile from "./UserFile"
//const data = DashBoardData.map(item => {
    //return (
        //<UserFile 
            //className="dashBoard--Files"
            //key = {item.id}
            //item = {item}
        ///>
    //)
//})
export default class DashboardComponent extends Component {
    onClick(e) {
        e.preventDefault()
        console.log('loaded!')
        const formdata = new FormData()
        cid = "QmR9AZtQM3cqACWirHDbWAbqy3BVK2VwnNHfNbn7s7cx2q";
        axios.post("http://localhost:4001/api/download", { title: cid })
        .then(res => {
            console.log(res)
        });
        //window.print('SUCCESS!')
        //API call to run SQL query
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
            <form onClick={this.onClick}>
                <button type="submit">Fetch</button>
            </form>
            <div className="dashBoard--FileWrapper">
                
            </div>
        </div>
        )
    }
    //export default MyDashBoard
}