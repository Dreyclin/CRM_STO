import React from "react";
import { useModal } from "../../hooks/useModal";

const RecordsHeader: React.FC = () => {
    const {toggle, isOpen} = useModal();
    console.log(isOpen);
    return (
        <div className="top-btns d-flex justify-content-between mb-4">
            <div className="btn-group">
                <button className="btn btn-primary active">Календарь</button>
                <button className="btn btn-primary">Список</button>
            </div>
            <button className="btn btn-success" onClick={toggle}>Записать клиента</button>
        </div>
    )
}

export default RecordsHeader;