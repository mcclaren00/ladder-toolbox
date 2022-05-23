import React from "react"
import Navbar from "./components/Navbar"
import Main from "./components/Main"

export default function Site()   {
    return  (
        <div className = "container">
            <Navbar />
            <Main   />
        </div>
    )
}