import React from "react"
import {Link} from "react-router-dom"

const ButtonCreation = props => {
    return (
        <Link to={props.item.gate}>
            <input type="button" value={props.item.title}/>
        </Link>
    )
}

export default ButtonCreation