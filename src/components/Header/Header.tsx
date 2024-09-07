import React from "react";

interface IHeader {
    title: String,
    welcomeName: String | null
}

const Header: React.FC<IHeader> = ({title, welcomeName}) => {
    return (
        <div className="auth py-4 border-dashed mb-5">
            <div className="container d-flex align-items-center justify-content-between">
                <h1 className="fw-bold">{title}</h1>
                <h3 className="">{welcomeName && `Welcome, ${welcomeName}!`}</h3>
            </div>
        </div>
    )
}

export default Header