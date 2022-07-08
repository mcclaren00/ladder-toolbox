import React from "react"
import Navbar from "../components/Navbar.js"
import Footer from "../components/Footer.js"
import UploadPage from "../components/UploadPage.js";

let curPage = <UploadPage/>


const DashBoard = () => {
    return (
    <div className="mainContainer">
        <div className="mainGrid--Wrapper">
            <Navbar />
            <div className="dashBoard--Container">
                <div className="dashBoard--SideButtons">
                    <input type="button" value="My Dashboard" onClick={DashBoardInerPageSelector("MyDashBoard")}></input>
                    <input type="button" value="Upload File" onClick={DashBoardInerPageSelector("UploadPage")}></input>
                    <input type="button" value="All Files" onClick={DashBoardInerPageSelector("AllFiles")}></input>
                    <input type="button" value="Recents" onClick={DashBoardInerPageSelector("Recents")}></input>
                    <input type="button" value="Faviorits" onClick={DashBoardInerPageSelector("Faviorits")}></input>
                </div>
                {curPage}
            </div>
            <Footer />
        </div>
    </div>
)}

const DashBoardInerPageSelector = page => {
        if (page === "MyDashBoard"){
            curPage = <UploadPage/>
        }else if(page === "UploadPage"){
            curPage = <UploadPage/>
        }else if(page === "AllFiles"){
            curPage = <UploadPage/>
        }else if(page === "Recents"){
            curPage = <UploadPage/>
        }else if(page === "Faviorits"){
            curPage = <UploadPage/>
        } else{
            alert("Error")
            curPage = <UploadPage/>
        }
}

export default DashBoard