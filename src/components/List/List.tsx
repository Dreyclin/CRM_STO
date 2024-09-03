import React from "react";
import Header from "../Header/Header";


const List: React.FC = () => {
    return(
        <div className="">
            <div className="container">
                <ul className="list-group">
                    <li className="list-group-item active">Запись</li>
                    <li className="list-group-item">Клиенты</li>
                    <li className="list-group-item">Настройки</li>
                    <li className="list-group-item">Выйти</li>
                </ul>
            </div>
        </div>
    )
}

export default List;