import React from "react"

export default function Footer()    {
    return  (
        <footer>
            <h5 className="usJoin">Join us</h5>
            <ul className="logUp">
                <li>Discord</li>
                <li>Twitter</li>
                <li>Github</li>
                <li>Signup</li>
                <li>Login</li>
            </ul>
            <h5 className="standOur">Our standards</h5>
            <ul className="policyUse">
                <li>Privacy</li>
                <li>Security</li>
                <li>Terms of service</li>
                <li>Acceptable use policy</li>
            </ul>
            <h5 className="usHelp">Help</h5>
            <ul className="recoveryBack">
                <li>Support</li>
                <li>More information</li>
                <li>Backup/Recovery</li>
            </ul>
        </footer>
    )
}