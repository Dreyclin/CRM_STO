import React, { useState } from "react";
import { AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";
import { addService, addStatusRecord } from "../../features/options/optionsThunks";
import { NewServiceCreds, NewStatusCreds } from "../../features/options/optionsTypes";

const Options: React.FC = () => {

    const dispatch: AppDispatch = useDispatch();
    const [statusRecord, setStatusRecord] = useState<string>('')
    const [service, setService] = useState<string>('')
    const [serviceCost, setServiceCost] = useState<number>(0);

    const handleAddStatus = (statusRecord: string) => {
        if(statusRecord !== ""){
            const creds: NewStatusCreds = {
                status: statusRecord,
                autoServiceId: localStorage.getItem("autoServiceId")
            }
            dispatch(addStatusRecord(creds)).unwrap().catch(err => {
                alert(err)
            })
            setStatusRecord("")
            alert("Успешно добавлена новый статус!")
        } else {
            alert("Заполните все поля!")
        }
    }

    const handleAddService = (service: string, cost: number) => {
        console.log(service, cost);
        if(service !== "" && cost !== 0){
            const creds: NewServiceCreds = {
                service: {
                    serviceName: service,
                    cost: cost
                },
                autoServiceId: localStorage.getItem("autoServiceId")
            }

            dispatch(addService(creds)).unwrap().catch(err => {
                alert(err)
            })
            setService('');
            setServiceCost(0);
            alert("Успешно добавлена новая услуга!")
        } else {
            alert("Заполните все поля!")
        }
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
                            <input type="text" className="form-control" placeholder="Услуга" value={service} onChange={(e) => setService(e.target.value)}/>
                            <input type="number" className="form-control w-50" placeholder="Цена" value={serviceCost} onChange={(e) => setServiceCost(Number(e.target.value))}/>
                        </div>
                        <button className="btn btn-primary" onClick={() => handleAddService(service, serviceCost)}>Добавить</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Options;