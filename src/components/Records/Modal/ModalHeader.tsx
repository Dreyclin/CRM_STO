import React from "react";
import { useModal } from "../../../hooks/useModal";

interface ModalProps {
    modalTitle: string
}

const ModalHeader: React.FC<ModalProps> = ({modalTitle}) => {

    const {toggle} = useModal();

    return (
        <div className="modal-header">
            <h5 className="modal-title">{modalTitle} клиента</h5>
            <button type="button" className="btn-close" onClick={toggle}></button>
        </div>
    )
}

export default ModalHeader