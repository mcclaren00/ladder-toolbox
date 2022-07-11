import React from "react"
import {Link} from "react-router-dom";
import Logo from "../images/ladder_corp.png"

const Navbar = () => {
    return  (
        <nav className="navBar--Container">
            <img src={Logo} className="navBar--LogoImg" alt=""/>
            <Link className="navBar--Button1" to="/Home">
                <button className="navBar--LadderButton">LadderCorp</button>
            </Link>
            <Link className="navBar--Button2" to="/Login">
                <button className="navBar--LoginButton">Login</button>
            </Link>
        </nav>
    )
}

export default Navbar
