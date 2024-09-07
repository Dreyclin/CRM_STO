import React from "react";

const Clients: React.FC = () => {
    return (
        <div className="w-100 d-flex flex-column gap-4">
            <input type="text" placeholder="Поиск по номеру телефона" className="form-control w-15"/>
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