import React, { useState } from "react";
import Header from "../Header/Header";
import { NavLink, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authThunks";

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const {error} = useSelector((state: RootState) => state.auth);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch(loginUser({email, password})).unwrap().then(() => {
            navigate('/control')
        }).catch(err => {
            alert(err);
        })
   
    }

    return (
        <div className="">
            <Header title={"AutoService CRM"} welcomeName={null}/>
            <form onSubmit={handleSubmit} action="" className="d-flex flex-column w-100 h-8 justify-content-center align-items-center gap-4">
                <input type="text" className="form-control w-25 py-3" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="text" className="form-control w-25 py-3" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)}/>
                <div className="btn-container d-flex gap-4">
                    <button type="submit" className="btn btn-success py-3 px-4 fw-bold">Войти</button>
                    <NavLink to={"/registration"} className="btn btn-primary py-3 px-4 fw-bold">Зарегистрироваться</NavLink>
                </div>
            </form>
        </div>
    )
}