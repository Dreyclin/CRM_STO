import React, { useState } from "react";
import Header from "../Header/Header";
import Clients from "../Clients/Clients";
import List from "../List/List";

const ControlPage: React.FC = () => {
    const [title, setTitle] = useState('Запись')

    return (
        <div className="">
            <Header title={title} />
            <div className="d-flex container gap-5">
                <List />
                {title === "Запись" ? <Clients /> : null}
            </div>
        </div>
    )


}

export default ControlPage;