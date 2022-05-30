import React from "react"
import Logo from "./ladder_coin.jpg"
import Button from "react-bootstrap/Button";

export default function Main()  {

    return  (
        <main className="baseBody">
            <h2 className="storNet">Reliable Secure Storage on A Decentralized Network</h2>
                <Button className="trialFree">FreeTrial</Button>
                <Button className="upSign">Sign up Now</Button>
                <Button className="infoMore">More info</Button>
            <h2 className="serviceProv">Provided Services</h2>
                <Button className="redundantMain">Redundancy</Button>
                <Button className="secureMain">Security</Button>
            <img src={Logo} className="coinPic"/>
                <Button className="decentralMain">Decentralization</Button>
                <Button className="cloudMain">Cloud providers</Button>
        </main>
    )
}