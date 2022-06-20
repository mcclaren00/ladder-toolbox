import React from "react"
//import Logo from "./ladder_coin.jpg"
//import Button from "react-bootstrap/Button";
//import {Link} from "react-router-dom";
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
        <div>
            <Navbar />
            <main className="baseBody">
                <h2>Reliable Secure Storage on A Decentralized Network</h2>
                {buttons}
            </main>
            <Footer />
        </div>
    )
}


// export default function Main()  {

//     return  (
//         <main className="baseBody">
//             <h2 className="storNet">Reliable Secure Storage on A Decentralized Network</h2>
//             <Link to="/FreeTrial">
//                 <Button className="trialFree">FreeTrial</Button>
//             </Link>
//             <Link to="/Signup">
//                 <Button className="upSign">Sign up Now</Button>
//             </Link>
//             <Link to="/Moreinfo">
//             <Button className="infoMore">More info</Button>
//             </Link>
//             <h2 className="serviceProv">Provided Services</h2>
//             <Link to="/Redundancy">
//                 <Button className="redundantMain">Redundancy</Button>
//             </Link>
//             <Link to="/Security">
//                 <Button className="secureMain">Security</Button>
//             </Link>
//             <Link to="/Upload">
//                 <img src={Logo} className="coinPic"/>
//             </Link>
//             <Link to="/Decentralize">
//                 <Button className="decentralMain">Decentralized</Button>
//             </Link>
//             <Link to="/CloudProviders">
//                 <Button className="cloudMain">Cloud Providers</Button>
//             </Link>
//         </main>
//     )
// }