import React from "react"
import frontPageData from "../data/frontPageData";
import ButtonCreation from "../components/ButtonCreation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function Home() {
    const buttons = frontPageData.map(item => {
        return (
            <ButtonCreation 
                key = {item.id}
                item = {item}
            />
        )
    })
    return (
        <div className="mainContainer">
            <Navbar />
            <main className="baseBody">
                <h2>Reliable Secure Storage on A Decentralized Network</h2>
                {buttons}
            </main>
            <Footer />
        </div>
    )
}
