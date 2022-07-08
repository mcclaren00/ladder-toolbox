import React, { useState} from "react"
import Navbar from "../components/Navbar.js"
import Footer from "../components/Footer.js"
import UploadPage from "../components/UploadPage.js";

const DashBoard = () => {

    const [page, setPage] = useState(<UploadPage/>)

    const DashBoardInerPageSelector = changePage => {
        setTimeout(() => {
            if (changePage === "MyDashBoard"){
                setPage(<UploadPage/>)
            }else if(changePage === "UploadPage"){
                setPage(<UploadPage/>)
            }else if(changePage === "AllFiles"){
                setPage(<UploadPage/>)
            }else if(changePage === "Recents"){
                setPage(<UploadPage/>)
            }else if(changePage === "Faviorits"){
                setPage(<UploadPage/>)
            } else{
                alert("Error")
                setPage(<UploadPage/>)
            }
        }, 400)
}


    return (
    <div className="mainContainer">
        <div className="mainGrid--Wrapper">
            <Navbar />
            <div className="dashBoard--Container">
                <div className="dashBoard--SideButtons">
                    <button onClick={DashBoardInerPageSelector("MyDashBoard")}>MyDashBoard</button>
                    <button onClick={DashBoardInerPageSelector("UploadPage")}>Upload Page</button>
                    <button onClick={DashBoardInerPageSelector("AllFiles")}>All Files</button>
                    <button onClick={DashBoardInerPageSelector("Recents")}>Recents</button>
                    <button onClick={DashBoardInerPageSelector("Faviorits")}>Faviorits</button>
                </div>
                {console.log(page)}
                {page}
            </div>
            <Footer />
        </div>
    </div>
)}


export default DashBoard