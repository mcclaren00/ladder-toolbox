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