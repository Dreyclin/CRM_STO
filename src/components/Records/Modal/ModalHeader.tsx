import React from "react";
import { useModal } from "../../../hooks/useModal";

const ModalHeader: React.FC = () => {

    const {toggle} = useModal();

    return (
        <div className="modal-header">
            <h5 className="modal-title">Записать клиента</h5>
            <button type="button" className="btn-close" onClick={toggle}></button>
        </div>
    )
}

export default ModalHeader