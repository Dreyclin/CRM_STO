import React, { useState } from "react";
import Header from "../Header/Header";
import Clients from "../Clients/Clients";
import List from "../List/List";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const ControlPage: React.FC = () => {
    const [title, setTitle] = useState('Запись')
    const userName = useSelector((state: RootState) => state.auth.user?.email)
    
    

    return (
        <div className="">
            <Header title={title} welcome={userName}/>
            <div className="d-flex container gap-5">
                <List />
                {title === "Запись" ? <Clients /> : null}
            </div>
        </div>
    )


}

export default ControlPage;