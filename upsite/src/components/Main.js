import React from "react"
import Logo from "./ladder_coin.jpg"
import {BrowserRouter as Router, Link, Route, Routes, useNavigate, renderMatches} from "react-router-dom";
import Button from "react-bootstrap/Button";
import FreeTrial from "./FreeTrial";

export default function Main()  {

    return  (
        <Router>
            <main className="baseBody">
                <h2 className="storNet">Reliable Secure Storage on A Decentralized Network</h2>
                <Link to="FreeTrial">
                    <Button className="trialFree" onClick={<useNavigate to FreeTrial/>}>Free Trial</Button>
                </Link>
                <Link to="Signup">
                    <Button className="upSign">Sign up Now</Button>
                </Link>
                <Link to="Moreinfo">
                    <Button className="infoMore">More info</Button>
                </Link>
                <h2 className="serviceProv">Provided Services</h2>
                <Link to="Redundancy">
                    <Button className="redundantMain">Redundancy</Button>
                </Link>
                <Link to="Security">
                    <Button className="secureMain">Security</Button>
                </Link>
                <img src={Logo} className="coinPic"/>
                <Link to="Decentralized">
                    <Button className="decentralMain">Decentralization</Button>
                </Link>
                <Link to="CloudProviders">
                    <Button className="cloudMain">Cloud providers</Button>
                </Link>
            </main>
        </Router>
    )
}