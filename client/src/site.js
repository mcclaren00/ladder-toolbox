// import React, { Fragment} from "react";
import React from "react"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"



import Home from "./webPages/Home.js"
import Upload from "./webPages/Upload.js"
import InfoPage from "./webPages/InfoPage.js"
import Login from "./webPages/Login.js"
import PrivateRoute from "./PrivateRoute"
import DashBoard from "./webPages/DashBoard.js"

export default function site ()  {
    return  (
        <Router>
            <Routes>
                <Route exact path="/" element={<PrivateRoute/>}>
                </Route>
                <Route exact path="/Home" element={<Home/>}>
                </Route>
                <Route exact path="/Upload" element={<Upload/>}>
                </Route>
                <Route exact path="/FreeTrial" element={<InfoPage ptype="FreeTrial"/>}>
                </Route>
                <Route exact path="/Login" element={<Login />}>
                </Route>
                <Route exact path="/Moreinfo" element={<InfoPage ptype="MoreInfo"/>}>
                </Route>
                <Route exact path="/Redundancy" element={<InfoPage ptype="Redundancy"/>}>
                </Route>
                <Route exact path="/Security" element={<InfoPage ptype="Security"/>}>
                </Route>
                <Route exact path="/Decentralize" element={<InfoPage ptype="Decentralize"/>}>
                </Route>
                <Route exact path="/CloudProviders" element={<InfoPage ptype="CloudProviders"/>}>
                </Route>
                <Route exact path="/DashBoard" element={<DashBoard/>}>
                </Route>
            </Routes>
        </Router>
    );
}
