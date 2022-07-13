import React, { useState} from "react"
import Navbar from "../components/Navbar.js"
import Footer from "../components/Footer.js"
import UploadPage from "../components/UploadPage.js";
import MyDashBoard from "../components/MyDashBoard.js";
import AllFiles from "../components/AllFiles.js";
import Recents from "../components/Recents.js";
import Faviorits from "../components/Faviorits.js";

const DashBoard = () => {

    const [page, setPage] = useState(<MyDashBoard/>)

    const MyDashBoardF = () => {
        setPage(<MyDashBoard/>)
    }
    const UploadPageF = () => {
        setPage(<UploadPage/>)
    }
    const AllFilesF = () => {
        setPage(<AllFiles/>)
    }
    const RecentsF = () => {
        setPage(<Recents/>)
    }
    const FavioritsF = () => {
        setPage(<Faviorits/>)
    }

    return (
    <div className="mainContainer">
        <div className="mainGrid--Wrapper">
            <Navbar />
            <div className="dashBoard--Container">
                <div className="dashBoard--SideButtons">
                    <button className="dashBoard--Buttons" onClick={MyDashBoardF}>MyDashBoard</button>
                    <button className="dashBoard--Buttons" onClick={UploadPageF}>Upload Page</button>
                    <button className="dashBoard--Buttons" onClick={AllFilesF}>All Files</button>
                    <button className="dashBoard--Buttons" onClick={RecentsF}>Recents</button>
                    <button className="dashBoard--Buttons" onClick={FavioritsF}>Faviorits</button>
                </div>
                {console.log(page)}
                {page}
            </div>
            <Footer />
        </div>
    </div>
)}


export default DashBoard