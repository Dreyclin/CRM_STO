import React from "react";
import { useModal } from "../../../hooks/useModal";

const ModalFooter: React.FC = () => {
    
    const {toggle} = useModal();
    
    return (
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={toggle}>Закрыть</button>
            <button type="submit" className="btn btn-primary" >Добавить</button>
        </div>
    )
}

export default ModalFooter