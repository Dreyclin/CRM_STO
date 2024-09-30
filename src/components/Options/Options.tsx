import React, { useState } from "react";
import { AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";
import { addStatusRecord } from "../../features/options/optionsThunks";
import { NewStatusCreds } from "../../features/options/optionsTypes";

const Options: React.FC = () => {

    const dispatch: AppDispatch = useDispatch();
    const [statusRecord, setStatusRecord] = useState<string>('')

    const handleAddStatus = (statusRecord: string) => {
        const creds: NewStatusCreds = {
            status: statusRecord,
            autoServiceId: localStorage.getItem("autoServiceId")
        }
        dispatch(addStatusRecord(creds)).unwrap().catch(err => {
            alert(err)
        })
        setStatusRecord("")
        alert("Успешно добавлена новый статус!")
    }

    return (
        <div className="options-container w-100 d-flex gap-5 flex-wrap">
            <div className="option-container d-flex flex-column">
                <h5>Добавление нового статуса заявки</h5>
                <div className="status-record-option d-flex flex-column gap-3">
                    <input type="text" className="form-control" placeholder="Новый статус заявки" value={statusRecord} onChange={(e) => setStatusRecord(e.target.value)}/>
                    <button className="btn btn-primary" onClick={() => handleAddStatus(statusRecord)}>Добавить</button>
                </div>
            </div>
            <div className="services-option d-flex align-items-start flex-column">
                <div className="option-container d-flex flex-column">
                    <h5>Добавление новой услуги</h5>
                    <div className="d-flex flex-column gap-3">
                        <div className="service-inputs d-flex gap-3 justify-content-between">
                            <input type="text" className="form-control" placeholder="Услуга" />
                            <input type="text" className="form-control w-50" placeholder="Цена" />
                        </div>
                        <button className="btn btn-primary">Добавить</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Options;