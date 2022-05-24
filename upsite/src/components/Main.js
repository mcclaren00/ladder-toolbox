import React from "react"
import Logo from "./ladder_coin.jpg"

export default function Main()  {
    return  (
        <main className="baseBody">
            <h2 className="storNet">Reliable Secure Storage on A Decentralized Network</h2>
            <button className="trialFree">Free Trial</button>
            <button className="upSign">Sign up Now</button>
            <button className="infoMore">More info</button>
            <h2 className="serviceProv">Provided Services</h2>
            <p>Redundancy</p>
            <p>Security</p>
            
            <img src={Logo} className="coinPic"/>
            <p>Decentralization</p>
            <p>Cloud providers</p>
        </main>
    )
}