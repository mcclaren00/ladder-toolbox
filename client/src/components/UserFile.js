import React from "react"

const UserFile = props => {
    return(
        <div>
            <p className="UserFile--Pieces">{props.item.title}</p>
            <p className="UserFile--Pieces">{props.item.kind}</p>
            <p className="UserFile--Pieces">{props.item.dateLO}</p>
        </div>
    )
}

export default UserFile