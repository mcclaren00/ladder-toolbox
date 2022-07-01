import React from "react"
import Navbar from "../components/Navbar.js"
import Footer from "../components/Footer.js"

import {Link} from "react-router-dom";

export default function DashBoard(){
    return (
        <div className="mainContainer">
            <div className="mainGrid-Wrapper">
                <Navbar />
                <div>
                    <div className="sideBar--Container">
                        <Link to="/Home">
                            <input type="button" value="button"></input>
                        </Link>

                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}