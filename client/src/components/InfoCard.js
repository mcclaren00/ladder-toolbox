import React from "react"

export default function InfoCard(props){
    return (
        <div className="infoCards">
            <h1>{props.title}</h1>
            <p>{props.details}</p>
        </div>
    )
}