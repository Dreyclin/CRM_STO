import React from "react";
import Header from "../Header/Header";
import { NavLink } from "react-router-dom";

const Registration: React.FC = () => {
    return(
        <div className="">
            <Header title={"AutoService CRM"} />
            <form action="" className="d-flex flex-column w-100 h-8 justify-content-center align-items-center gap-4">
                <input type="text" className="form-control w-25 py-3" placeholder="Email" />
                <input type="text" className="form-control w-25 py-3" placeholder="Пароль" />
                <input type="text" className="form-control w-25 py-3" placeholder="Подтвердите пароль" />
                <div className="btn-container d-flex gap-4">
                    <button className="btn btn-success py-3 px-4 fw-bold">Зарегистрироваться</button>
                    <NavLink to={"/"} className="btn btn-primary py-3 px-4 fw-bold">Авторизироваться</NavLink>
                </div>
            </form>
        </div>
    )
}

export default Registration;