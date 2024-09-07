import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import List from "../List/List";
import Records from "../Clients/Records";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { checkAuth } from "../../features/auth/authThunks";
import { useNavigate } from "react-router-dom";

const ControlPage: React.FC = () => {
    const [title, setTitle] = useState('Запись')
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(checkAuth()).unwrap().catch(() => {
            navigate('/');
        })
    }, [])

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