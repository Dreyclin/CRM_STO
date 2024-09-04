import React from "react";

const Record: React.FC = () => {
    return (
        <div className="card w-25">
            <div className="card-header d-flex align-items-center justify-content-between">
                <h5 className="mb-0">9:00-10:00</h5>
                <div className="badge bg-primary">Подъемник</div>
            </div>
            <div className="card-body">
                <h4>BMW X3 - Дмитрий</h4>
                <p>Замена масла, ТО, диагностика ходовки</p>
            </div>
        </div>
    )
}

export default Record;