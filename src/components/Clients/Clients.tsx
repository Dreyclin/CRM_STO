import React from "react";
import { Client } from "../../features/clients/clientsTypes";


interface ClientsProps {
    clients: Client[]
}


const Clients: React.FC<ClientsProps> = ({clients}) => {


    return (
        <div className="w-100 d-flex flex-column gap-4">
            <div className="input-container d-flex justify-content-between">
                <input type="text" placeholder="Поиск по номеру телефона" className="form-control w-15" />
                <button className="btn btn-success">Добавить клиента</button>
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
                    <tr>
                        <td>Mark</td>
                        <td>+380673664557</td>
                        <td>
                            <table className="table table-bordered mb-0">
                                <tbody>
                                    <tr>
                                        <td>BMW</td>
                                        <td>X6</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>AP67826AB</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td>5%</td>
                    </tr>
                    <tr>
                        <td>Jacob</td>
                        <td>+380673664557</td>
                        <td>
                            <table className="table table-bordered mb-0">
                                <tbody>
                                    <tr>
                                        <td>BMW</td>
                                        <td>X6</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>AP67826AB</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td>10%</td>
                    </tr>
                    <tr>
                        <td>Larry</td>
                        <td>+380673664557</td>
                        <td>
                            <table className="table table-bordered mb-0">
                                <tbody>
                                    <tr>
                                        <td>BMW</td>
                                        <td>X6</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>AP67826AB</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td>15%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Clients;