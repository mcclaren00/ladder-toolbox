import React from "react"
import frontPageData from "../data/frontPageData";
import ButtonCreation from "../components/ButtonCreation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Logo from "../images/ladder_corp.png"

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
                    <span className="home--TitleText">Reliable Secure Storage on A <span className="home--TitleTextBlue">Decentralized</span> Network</span>
                    <img src={Logo} className="home--LogoImg" alt=""/>
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