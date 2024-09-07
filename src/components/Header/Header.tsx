import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface IHeader {
    title: String,
<<<<<<< HEAD
    welcomeName: String | null
}

const Header: React.FC<IHeader> = ({title, welcomeName}) => {
=======
    welcome: String | undefined
}

const Header: React.FC<IHeader> = ({title, welcome}) => {
    
    const user = useSelector((state: RootState) => state.auth.user?.email)

>>>>>>> cae365874edba02897930e786b56539144be80bb
    return (
        <div className="auth py-4 border-dashed mb-5">
            <div className="container d-flex align-items-center justify-content-between">
                <h1 className="fw-bold">{title}</h1>
<<<<<<< HEAD
                <h3 className="">{welcomeName && `Welcome, ${welcomeName}!`}</h3>
=======
                {user && <h3>Welcome, {user}!</h3>}
>>>>>>> cae365874edba02897930e786b56539144be80bb
            </div>
        </div>
    )
}

export default Header