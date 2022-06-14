import React from "react";
import Navbar from "./Navbar";
import Main from "./Main";
import Footer from "./Footer";

export default function Home() {
    return  (
        <div className="container">
            <Navbar />
            <Main />
            <Footer />
        </div>    
    )
}