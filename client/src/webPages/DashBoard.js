import React from "react"
import Navbar from "../components/Navbar.js"
import Footer from "../components/Footer.js"

import {Link} from "react-router-dom";

export default function DashBoard(){
    return (
        <div className="mainContainer">
            <div className="mainGrid--Wrapper">
                <Navbar />
                <div className="sideBar--Container">
                    <div className="sideBar--Buttons">
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
                </div>
                <Footer />
            </div>
        </div>
    )
}