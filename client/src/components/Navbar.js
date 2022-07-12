import React from "react"
import {Link} from "react-router-dom";
import Logo from "../images/ladder_corp.png"

const Navbar = () => {
    return  (
        <nav className="navBar--Container">
            <img src={Logo} className="navBar--LogoImg" alt=""/>
            <button className="navBar--LadderButton">LadderCorp</button>
            <button className="navBar--LoginButton">Login</button>
        </nav>
    )
}

export default Navbar
