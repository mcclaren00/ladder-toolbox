import React from "react";
import Footer from "../components/Footer.js";
import Navbar from "../components/Navbar.js";
import AddFile from "../components/AddFile.js";


export default function Upload()  {
    return  (
        <div className="mainContainer">
            <div className="mainGrid--Wrapper">
                <Navbar />
                <AddFile />
                <Footer />
            </div>
        </div>
    )
}