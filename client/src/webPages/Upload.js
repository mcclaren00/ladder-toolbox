import React from "react";
import Footer from "../components/Footer.js";
import Navbar from "../components/Navbar.js";
import AddFile from "../components/AddFile.tsx";


export default function Upload()  {
    return  (
        <div className="mainContainer">
            <Navbar />
            <AddFile />
            <Footer />
        </div>
    )
}