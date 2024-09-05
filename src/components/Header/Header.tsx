import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface IHeader {
    title: String,
    welcome: String | undefined
}

const Header: React.FC<IHeader> = ({title, welcome}) => {
    
    const user = useSelector((state: RootState) => state.auth.user?.email)

    return (
        <div className="auth py-4 border-dashed mb-5">
            <div className="container d-flex align-items-center justify-content-between">
                <h1 className="fw-bold">{title}</h1>
                {user && <h3>Welcome, {user}!</h3>}
            </div>
        </div>
    )
}

export default Header