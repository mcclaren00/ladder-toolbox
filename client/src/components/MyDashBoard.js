import axios from "axios"
import React from "react"
import DashBoardData from "../data/DashBoardData"
import UserFile from "./UserFile"

const MyDashBoard = () => {

    const data = DashBoardData.map(item => {
        return (
            <UserFile 
                className="dashBoard--Files"
                key = {item.id}
                item = {item}
            />
        )
    })
    const newData = DashBoardData.map(item => {
        return (
            <UserFile
                className="dashBoard--Files"
                key = {item.id}
                item = {item}
            />
        )
    })
    async function test(callback) {
        const userId = 'john';
        var data = JSON.stringify({
            "title": userId
        });
        var config = {
            method: 'post',
            url: 'http://localhost:4001/api/fetch',
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };
        axios(config)
        .then(function (response) {
            const fileInfo = JSON.stringify(response.data)
            return callback(fileInfo);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const parent = () => {
        var responseData = '';
        try {
            test(function(results) {
                responseData = results;
                console.log(responseData);
                const fetchUserFiles = responseData.map()
            })
        } catch(e) {
            console.log(e);
        }
    }
    parent()
    return (
    <div className="myDashBoard--Wrapper">
        <h1><span className="dashBoard--HeaderText">My DashBoard</span></h1>
        <div className="UserFile--FileHeader">
            <p>File Name</p>
            <p>File Type</p>
            <p>File Upload Date</p>
        </div>
        <div className="dashBoard--FileWrapper">
            {data}
        </div>
    </div>
    )
}

export default MyDashBoard