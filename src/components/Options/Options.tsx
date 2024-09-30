import React from "react";

const Options: React.FC = () => {
    return (
        <div className="options-container w-100 d-flex gap-5 flex-wrap">
            <div className="option-container d-flex flex-column">
                <h5>Добавление нового статуса заявки</h5>
                <div className="status-record-option d-flex flex-column gap-3">
                    <input type="text" className="form-control" placeholder="Новый статус заявки" />
                    <button className="btn btn-primary">Добавить</button>
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