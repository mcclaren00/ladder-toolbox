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
        <h1>My DashBoard Test</h1>
        <div className="dashBoard--FileWrapper">
            {data}
        </div>
    </div>
    )
}

export default MyDashBoard