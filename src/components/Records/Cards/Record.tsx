import React from "react";
import { useRecordStatus } from "../../../hooks/useRecordStatus";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";

interface RecordProps {
    id: string,
    duration: {
        from: number,
        to: number
    },
    car: string,
    description: string,
    status: string
}

const Record: React.FC<RecordProps> = ({duration, car, description, status, id}) => {
    const {getBadgeClass, handleStatusClick} = useRecordStatus();

    return (
        <div className="card w-25">
            <div className="card-header d-flex align-items-center justify-content-between">
                <h5 className="mb-0">{duration.from}:00-{duration.to}:00</h5>
                <div className="badges d-flex gap-2">
                    <div className={getBadgeClass(status)} onClick={() => handleStatusClick(id)}>{status}</div>
                    <div className="badge bg-primary status-badge">Подъемник</div>
                </div>
   
            </div>
            <div className="card-body">
                <h4>{car} - Дмитрий</h4>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default Record;