import React from "react"

const InfoCard = props => {
    return (
        <div className="infoCards">
            <h1>{props.title}</h1>
            <p>{props.details}</p>
        </div>
    )
}

export default InfoCard