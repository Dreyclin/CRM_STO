import React from "react";

const ClientsHeader: React.FC = () => {
    return (
        <div className="top-btns d-flex justify-content-between mb-4">
            <div className="btn-group">
                <button className="btn btn-primary active">Календарь</button>
                <button className="btn btn-primary">Список</button>
            </div>
            <button className="btn btn-success">Записать клиента</button>
        </div>
    )
}

export default ClientsHeader;