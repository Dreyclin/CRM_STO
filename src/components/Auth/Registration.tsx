import React, { useState } from "react";
import Header from "../Header/Header";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/auth/authThunks";
import { AppDispatch, RootState } from "../../app/store";

const Registration: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch: AppDispatch = useDispatch();

    const { error } = useSelector((state: RootState) => state.auth);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (password === confirmPassword)
            dispatch(registerUser({ email, password, confirmPassword }))
        else
            alert("Passwords do not match!");
    }

    return (
        <div className="">
            {error && <p className="h1 text-center fw-bold">{error}</p>}
            <Header title={"AutoService CRM"} />
            <form onSubmit={handleSubmit} className="d-flex flex-column w-100 h-8 justify-content-center align-items-center gap-4">
                <input type="text" className="form-control w-25 py-3" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="text" className="form-control w-25 py-3" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} />
                <input type="text" className="form-control w-25 py-3" placeholder="Подтвердите пароль" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                <div className="btn-container d-flex gap-4">
                    <button type="submit" className="btn btn-success py-3 px-4 fw-bold">Зарегистрироваться</button>
                    <NavLink to={"/"} className="btn btn-primary py-3 px-4 fw-bold">Авторизироваться</NavLink>
                </div>
            </form>
        </div>
    )
}

export default Registration;