import React from "react"
import Navbar from "../components/Navbar.js"
import Footer from "../components/Footer.js"

import {Link} from "react-router-dom";

export default function DashBoard(){
    return (
        <div className="mainContainer">
            <div className="mainGrid--Wrapper">
                <Navbar />
                <div className="dashBoard--Container">
                    <div className="dashBoard--SideButtons">
                        <Link to="/Home">
                            <input type="button" value="My Dashboard"></input>
                        </Link>
                        <Link to="/Home">
                            <input type="button" value="All Files"></input>
                        </Link>
                        <Link to="/Home">
                            <input type="button" value="Recents"></input>
                        </Link>
                        <Link to="/Home">
                            <input type="button" value="Faviorits"></input>
                        </Link>
                    </div>
                    <div className="dashBoard--FileDisplay">
                        <h1>Files</h1>
                        <input type="file" id="fileUpload"/>
                        <button id="fileSubmit">Submit</button>
                        <input type="button" value="Delete File"/>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

