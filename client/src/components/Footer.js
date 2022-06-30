import React from "react"

export default function Footer()    {
    return  (
        <footer className="footer--Container">
            <div>
                <h5 className="footer--Label">Join us</h5>
                <ul className="footer--JoinList">
                    <li>Discord</li>
                    <li>Twitter</li>
                    <li>Github</li>
                    <li>Signup</li>
                    <li>Login</li>
                </ul>
            </div>
            <div>
                <h5 className="footer--Label">Our standards</h5>
                <ul className="footer--StandardsList">
                    <li>Privacy</li>
                    <li>Security</li>
                    <li>Terms of service</li>
                    <li>Acceptable use policy</li>
                </ul>
            </div>
            <div>
                <h5 className="footer--Label">Help</h5>
                <ul className="footer--HelpList">
                    <li>Support</li>
                    <li>More information</li>
                    <li>Backup/Recovery</li>
                </ul>
            </div>
        </footer>
    )
}