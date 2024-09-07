import React, { useState } from "react";
import Header from "../Header/Header";
import List from "../List/List";
import Records from "../Clients/Records";

const ControlPage: React.FC = () => {
    const [title, setTitle] = useState('Запись')

    return (
        <div className="">
            <Header title={title} />
            <div className="d-flex container gap-5">
                <List />
                {title === "Запись" ? <Records /> : null}
            </div>
        </div>
    )


}

export default ControlPage;