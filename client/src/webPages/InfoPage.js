import React from "react";
import Footer from "../components/Footer.js"
import Navbar from "../components/Navbar.js"
import InfoCard from "../components/InfoCard.js"
import infoPageData from "../data/infoPageData.js";

export default function InfoPage(props)  {
    const card = infoPageData.find(item => item.id === props.ptype)
    return  (
        <div className="mainContainer">
            <div className="mainGrid-Wrapper">
                <Navbar />
                <InfoCard title={card.title} details={card.details}/>
                <Footer />
            </div>
        </div>
    )
}