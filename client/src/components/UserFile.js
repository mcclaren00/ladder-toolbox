import React from "react"

const UserFile = props => {
    return(
        <div className="UserFile--File">
            <p className="UserFile--FileData">{props.item.title}</p>
            <p className="UserFile--FileData">{props.item.kind}</p>
            <p className="UserFile--FileData">{props.item.dateLO}</p>
        </div>
    )
}

export default UserFile