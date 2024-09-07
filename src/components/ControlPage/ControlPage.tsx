import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import List from "../List/List";
import Records from "../Records/Records";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { checkAuth } from "../../features/auth/authThunks";
import { useNavigate } from "react-router-dom";
import Clients from "../Clients/Clients";

const ControlPage: React.FC = () => {
    const [title, setTitle] = useState('Запись')
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(checkAuth()).unwrap().catch(() => {
            navigate('/');
        })
    }, [])

    function handleTitleChange(e: React.MouseEvent<HTMLLIElement>) {
        const target = e.target as HTMLElement;
        setTitle(target.innerHTML);
    }

    return (
        <div className="">
            <Header title={title} />
            <div className="d-flex container gap-5">
                <List navChange={handleTitleChange} activeTab={title}/>
                {title === "Запись" ? <Records /> : null}
                {title === "Клиенты" ? <Clients /> : null}
            </div>
        </div>
    )


}

export default ControlPage;