import React, { Fragment } from "react";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import FreeTrial from "./components/FreeTrial";
import Signup from "./components/Signup";
import Moreinfo from "./components/Moreinfo";
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute";

const site = () =>  {
    return  (
        <Router>
            <Fragment>
                <Link to="/Home">Home</Link>
                <Link to="/FreeTrial">FreeTrial</Link>
                <Link to="/Signup">Signup</Link>
                <Link to="/Moreinfo">Moreinfo</Link>
                <Link to="/Redundancy">Redundancy</Link>
                <Link to="/Security">Security</Link>
                <Link to="/Decentralized">Decentralized</Link>
                <Link to="/CloudProviders">CloudProviders</Link>
                <Routes>
                    <Route exact path="/" element={<PrivateRoute/>}>
                    <Route exact path="/Home" element={<Home/>}/>
                    </Route>
                    <Route exact path="/FreeTrial" element={<FreeTrial/>}>
                    </Route>
                    <Route exact path="/Signup" element={<Signup/>}>
                    </Route>
                    <Route exact path="/Moreinfo" element={<Moreinfo/>}>
                    </Route>
                </Routes>
            </Fragment>
        </Router>
    );
}
export default site;
