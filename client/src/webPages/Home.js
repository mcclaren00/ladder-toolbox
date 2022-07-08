import React from "react"
import frontPageData from "../data/frontPageData";
import ButtonCreation from "../components/ButtonCreation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
    const buttons = frontPageData.map(item => {
        return (
            <ButtonCreation 
                className="home--ButtonContainer"
                key = {item.id}
                item = {item}
            />
        )
    })
    return (
        <div className="mainContainer">
            <div className="mainGrid--Wrapper">
                <Navbar />
                <main className="home--Container">
                    <h2>Reliable Secure Storage on A Decentralized Network</h2>
                    <div className="home--ButtonContainer">
                        {buttons}
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default Home