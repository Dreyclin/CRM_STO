import React from "react";
import Header from "../Header/Header";


const List: React.FC = () => {
    return (
        <div className="list-width">
            <ul className="list-group">
                <li className="list-group-item">Запись</li>
                <li className="list-group-item active">Клиенты</li>
                <li className="list-group-item">Настройки</li>
                <li className="list-group-item">Выйти</li>
            </ul>
        </div>
    )
}

export default List;