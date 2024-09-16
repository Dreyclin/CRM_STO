import React, { useRef } from "react";

const ModalContent: React.FC = () => {
    const dateInputRef = useRef<HTMLInputElement>(null);

    

    function handleCalendar() {
        dateInputRef.current?.showPicker();
    }

    return (
        <div className="py-3 d-flex flex-column justify-content-center align-items-center w-80 px-3 gap-3">
            <div className="input-group">
                <span className="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                </svg></span>
                <input type="text" placeholder="Клиент" className="form-control" required />
            </div>
            <div className="d-flex justify-content-between gap-3 w-100">
                <input type="text" className="form-control" placeholder="Марка и модель" required />
                <input type="text" className="form-control" placeholder="Номерной знак" required />
            </div>

            <div className="w-100">
                <textarea name="" id="" className="form-control" placeholder="Описание" rows={5} required></textarea>
            </div>

            <div className="input-group">
                <span className="input-group-text"><svg onClick={handleCalendar} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar" viewBox="0 0 16 16">
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                </svg></span>
                <input className="form-control" type="date" ref={dateInputRef} required />
            </div>

            <div className="d-flex justify-content-between gap-3 w-100">
                <input type="number" min={0} max={23} className="form-control" placeholder="С" required />
                <input type="number" min={0} max={23} className="form-control" placeholder="До" required />
            </div>
        </div>
    )
}

export default ModalContent