import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import List from "../List/List";
import Records from "../Records/Records";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { checkAuth } from "../../features/auth/authThunks";
import { useNavigate } from "react-router-dom";
import Clients from "../Clients/Clients";
import Modal from "../Records/Modal/Modal";
import { useModal } from "../../hooks/useModal";
import ModalHeader from "../Records/Modal/ModalHeader";
import ModalContent from "../Records/Modal/ModalContent";
import ClientsModal from "../Clients/ClientsModal";
import { Client } from "../../features/clients/clientsTypes";
import Options from "../Options/Options";

const ControlPage: React.FC = () => {
    const [title, setTitle] = useState("Запис");
    const dispatch: AppDispatch = useDispatch();
    const [selectedClient, setSelectedClient] = useState<Client | null>();
    const navigate = useNavigate();

    const { isOpen, toggle } = useModal();
    const [isClientsModalOpen, setIsClientsModalOpen] = useState(false);
    const handleEditClient = (client: Client | null) => {
        setSelectedClient(client);
        toggle();
    };

    useEffect(() => {
        dispatch(checkAuth())
            .unwrap()
            .catch(() => {
                navigate("/");
            });
    }, [dispatch, navigate]);

    function handleTitleChange(e: React.MouseEvent<HTMLLIElement>) {
        const target = e.target as HTMLElement;
        setTitle(target.innerHTML);
    }

    const toggleClientsModal = () => {
        setIsClientsModalOpen(!isClientsModalOpen);
    };

    return (
        <div className="">
            <Header title={title} />
            <div className="d-flex container gap-5">
                <List navChange={handleTitleChange} activeTab={title} />
                {title === "Запис" ? <Records /> : null}
                {title === "Кліенти" ? (
                    <Clients onEditClient={handleEditClient} />
                ) : null}
                {title === "Налаштування" && <Options />}
            </div>
            {title === "Запис" && !isClientsModalOpen && (
                <Modal isOpen={isOpen} toggle={toggle}>
                    <ModalHeader modalTitle="Записати" />
                    <ModalContent toggleClientModal={toggleClientsModal} />
                </Modal>
            )}
            {title === "Запис" && isClientsModalOpen && (
                <Modal isOpen={isClientsModalOpen} toggle={toggleClientsModal}>
                    <ModalHeader modalTitle="Створити" />
                    <ClientsModal client={null} toggle={toggleClientsModal} />
                </Modal>
            )}
            {title === "Кліенти" && (
                <Modal isOpen={isOpen} toggle={toggle}>
                    <ModalHeader modalTitle="Створити" />
                    <ClientsModal client={selectedClient} toggle={toggle} />
                </Modal>
            )}
        </div>
    );
};

export default ControlPage;
