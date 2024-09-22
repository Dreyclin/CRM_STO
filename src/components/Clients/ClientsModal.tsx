import React from "react";
import { Client } from "../../features/clients/clientsTypes";
import { useClientsModal } from "../../hooks/useClientsModal";

interface ClientsModalProps {
    client? : Client | null,
    toggle: () => void
}

const ClientsModal: React.FC<ClientsModalProps> = ({client, toggle}) => {
  
    const {name, mark, model, numbers, phonePrimary, phoneSecondary, personalDiscount, setName, setMark, setModel, setNumbers, setPhonePrimary, setPhoneSecondary, setPersonalDiscount, handleSubmit} = useClientsModal(client || null, toggle)

    return (
        <div className="">
            <div className="py-3 d-flex flex-column justify-content-center w-80 px-3 gap-5">
                <div className="input-group">
                    <span className="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                    </svg></span>
                    <input type="text" className="form-control" placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="car-container d-flex flex-column gap-3">
                    <div className="mark-model d-flex gap-3">
                        <input type="text" placeholder="Марка" className="form-control" value={mark} onChange={(e) => setMark(e.target.value)}/>
                        <input type="text" placeholder="Модель" className="form-control" value={model} onChange={(e) => setModel(e.target.value)}/>
                    </div>
                    <input type="text" placeholder="Номерной знак" className="form-control" value={numbers} onChange={(e) => setNumbers(e.target.value)}/>
                </div>
                <div className="phone-numbers-container d-flex gap-3">
                    <input type="text" placeholder="Телефон 1" className="form-control" value={phonePrimary} onChange={(e) => setPhonePrimary(e.target.value)}/>
                    <input type="text" placeholder="Телефон 2 (опционально)" className="form-control" value={phoneSecondary} onChange={(e) => setPhoneSecondary(e.target.value)}/>
                </div>

                <input type="number" placeholder="Персональная скидка в %" min={0} className="form-control" value={personalDiscount} onChange={(e) => setPersonalDiscount(Number(e.target.value))}/>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={toggle}>Закрыть</button>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Сохранить</button>
            </div>

        </div>
    )
}

export default ClientsModal;