import React, { Fragment} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import FreeTrial from "./components/FreeTrial";
import Signup from "./components/Signup";
import Moreinfo from "./components/Moreinfo";
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute";
import Redundancy from "./components/Redundancy";
import Security from "./components/Security";
import Decentralize from "./components/Decentralization";
import CloudProviders from "./components/CloudProviders";
import Upload from "./components/Upload";
import Main from "./webPages/Main.js";


export default function site ()  {

    return  (
        <Router>
            <Fragment>
                <Routes>
                    <Route excat path="/Main" element={<Main/>}>
                    </Route>
                    <Route exact path="/" element={<PrivateRoute/>}>
                    </Route>
                    <Route exact path="/Home" element={<Home/>}>
                    </Route>
                    <Route exact path="/Upload" element={<Upload/>}>
                    </Route>
                    <Route exact path="/FreeTrial" element={<FreeTrial/>}>
                    </Route>
                    <Route exact path="/Signup" element={<Signup/>}>
                    </Route>
                    <Route exact path="/Moreinfo" element={<Moreinfo/>}>
                    </Route>
                    <Route exact path="/Redundancy" element={<Redundancy/>}>
                    </Route>
                    <Route exact path="/Security" element={<Security/>}>
                    </Route>
                    <Route exact path="/Decentralize" element={<Decentralize/>}>
                    </Route>
                    <Route exact path="/CloudProviders" element={<CloudProviders/>}>
                    </Route>
                </Routes>
            </Fragment>
        </Router>
    );
}
