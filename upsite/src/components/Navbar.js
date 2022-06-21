import React from "react"
import {Link} from "react-router-dom";

export default function Navbar()    {
    return  (
        <nav className="navBar">
            <Link to="/Home">
                <h1 className="navBar--LadderText">LadderCorp</h1>
            </Link>
            <Link to="/Signup">
                <h2 className="navBar--LoginText">Login</h2>
            </Link>
        </nav>
    )
}