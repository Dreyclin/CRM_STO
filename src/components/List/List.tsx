import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { logOut } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

interface IList {
    navChange: (title: React.MouseEvent<HTMLLIElement>) => void;
    activeTab: string;
}

const List: React.FC<IList> = ({ navChange, activeTab }) => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogOut() {
        dispatch(logOut());
        navigate("/");
    }

    return (
        <div className="list-width">
            <ul className="list-group">
                <li
                    className={`list-group-item ${
                        activeTab === "Запис" ? "active" : ""
                    }`}
                    onClick={(e) => navChange(e)}
                >
                    Запис
                </li>
                <li
                    className={`list-group-item ${
                        activeTab === "Кліенти" ? "active" : ""
                    }`}
                    onClick={(e) => navChange(e)}
                >
                    Кліенти
                </li>
                <li
                    className={`list-group-item ${
                        activeTab === "Налаштування" ? "active" : ""
                    }`}
                    onClick={(e) => navChange(e)}
                >
                    Налаштування
                </li>
                <li className="list-group-item" onClick={handleLogOut}>
                    Вийти
                </li>
            </ul>
        </div>
    );
};

export default List;
