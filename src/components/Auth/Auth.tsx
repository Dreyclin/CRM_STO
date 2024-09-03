import React from "react";
import Header from "../Header/Header";

export default function Auth() {
    return (
        <div className="">
            <Header title={"AutoService CRM"}/>
            <form action="" className="d-flex flex-column w-100 h-8 justify-content-center align-items-center gap-4">
                <input type="text" className="form-control w-25 py-3" placeholder="Логін або email"/>
                <input type="text"className="form-control w-25 py-3" placeholder="Пароль"/>
                <button className="btn btn-success py-3 px-4 fw-bold">Войти</button>
            </form>
        </div>

    )
}