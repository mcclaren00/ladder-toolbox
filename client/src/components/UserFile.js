import React from "react"

const UserFile = props => {
    return(
        <div>
            <p>{props.item.title}</p>
            <p>{props.item.kind}</p>
            <p>{props.item.dateLO}</p>
        </div>
    )
}

export default UserFile