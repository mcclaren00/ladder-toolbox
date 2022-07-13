import React from "react"
import { useNavigate } from "react-router-dom"
import Logo from "../images/ladder_corp.png"

const Navbar = () => {

    let navigate = useNavigate()

    return  (
        <nav className="navBar--Container">
            <img src={Logo} className="navBar--LogoImg" alt=""/>
            <button className="navBar--LadderButton" onClick={() => {navigate("/Home")}}>LadderCorp</button>
            <button className="navBar--LoginButton" onClick ={() => {navigate("/Login")}}>Login</button>
        </nav>
    )
}

export default Navbar
