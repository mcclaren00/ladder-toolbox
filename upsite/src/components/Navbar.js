import React from "react"
import {Link} from "react-router-dom";
import Logo from "../images/ladder_corp.png"

export default function Navbar()    {
    return  (
        <nav className="navBar">
            <Link to="/Home">
                <img src={Logo} className="navBar--LogoImg" alt=""/>
                <h1 className="navBar--LadderText">LadderCorp</h1>
            </Link>
            <Link to="/Login">
                <h2 className="navBar--LoginText">Login</h2>
            </Link>
        </nav>
    )
}