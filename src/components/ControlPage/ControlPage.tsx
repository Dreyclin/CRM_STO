import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import List from "../List/List";
import Records from "../Records/Records";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { checkAuth } from "../../features/auth/authThunks";
import { useNavigate } from "react-router-dom";
import Clients from "../Clients/Clients";
import Modal from "../Records/Modal/Modal";
import { useModal } from "../../hooks/useModal";
import ModalHeader from "../Records/Modal/ModalHeader";
import ModalContent from "../Records/Modal/ModalContent";

const ControlPage: React.FC = () => {
    const [title, setTitle] = useState('Запись')
    const dispatch: AppDispatch = useDispatch();
    const clients = useSelector((state: RootState) => state.client.clients)
    
    console.log(clients);

    const navigate = useNavigate();
    
    
    const { isOpen, toggle } = useModal();
    useEffect(() => {
        dispatch(checkAuth()).unwrap().catch(() => {
            navigate('/');
        })
    }, [dispatch, navigate])

    function handleTitleChange(e: React.MouseEvent<HTMLLIElement>) {
        const target = e.target as HTMLElement;
        setTitle(target.innerHTML);
    }

    return (
            <div className="">
                <Header title={title} />
                <div className="d-flex container gap-5">
                    <List navChange={handleTitleChange} activeTab={title} />
                    {title === "Запись" ? <Records /> : null}
                    {/* {title === "Клиенты" ? <Clients /> : null} */}
                </div>
                <Modal isOpen={isOpen} toggle={toggle}>
                    <ModalHeader/>
                    <ModalContent/>
                </Modal>
            </div>
    )


}

export default ControlPage;