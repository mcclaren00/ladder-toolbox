import React from "react";
import Footer from "../components/Footer.js";
import Navbar from "../components/Navbar.js";
import AddFile from "../components/AddFile.js";


export default function Upload()  {
    return  (
        <div className="containerUpload">
            <Navbar />
            <AddFile />
            <Footer />
        </div>
    )
}