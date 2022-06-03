import React from "react"
import {Link} from "react-router-dom";

export default function Navbar()    {
    return  (
        <nav className="navTool">
            <Link to="/Home">
                <h1>LadderCorp</h1>
            </Link>
            <Link to="/Signup">
                <h2>Login</h2>
            </Link>
        </nav>
    )
}