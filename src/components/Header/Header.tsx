import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface IHeader {
    title: String,
}

const Header: React.FC<IHeader> = ({title}) => {
    return (
        <div className="auth py-4 border-dashed mb-5">
            <div className="container">
                <h1 className="fw-bold">{title}</h1>
            </div>
        </div>
    )
}

export default Header