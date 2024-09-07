import React from "react";
import Header from "../Header/Header";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { logOut } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";


const List: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    function handleLogOut() {
        dispatch(logOut());
        navigate('/');
    }

    return (
        <div className="list-width">
            <ul className="list-group">
                <li className="list-group-item active">Запись</li>
                <li className="list-group-item">Клиенты</li>
                <li className="list-group-item">Настройки</li>
                <li className="list-group-item" onClick={handleLogOut}>Выйти</li>
            </ul>
        </div>
    )
}

export default List;