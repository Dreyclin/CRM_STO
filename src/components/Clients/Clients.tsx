import React, { useState } from "react";
import { useClients } from "../../hooks/useClients";
import { useModal } from "../../hooks/useModal";
import { Client } from "../../features/clients/clientsTypes";

interface ClientsProps {
    onEditClient: (client: Client | null) => void;
}

const Clients: React.FC<ClientsProps> = ({onEditClient}) => {

    const {filteredClients, phone, setPhone} = useClients();
    const {toggle} = useModal();

    return (
        <div className="w-100 d-flex flex-column gap-4">
            <div className="input-container d-flex justify-content-between">
                <input type="text" placeholder="Поиск по номеру телефона" className="form-control w-15" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                <button className="btn btn-success" onClick={() => onEditClient(null)}>Добавить клиента</button>
            </div>
            <table className="table table-bordered text-center">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Номер(а) телефона</th>
                        <th scope="col">Авто</th>
                        <th scope="col">Персональная скидка</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredClients && filteredClients.map(client => {
                        return (
                            <tr onClick={() => onEditClient(client)}>
                                <td>{client.name}</td>
                                <td>{client.phoneNumber?.map(number => {return <p>{number}</p>})}</td>
                                <td>
                                    <table className="table table-bordered mb-0">
                                        <tbody>
                                            <tr>
                                                <td>{client.car.brand}</td>
                                                <td>{client.car.model}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>{client.car.number}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td>{client.personalDiscount}%</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Clients;