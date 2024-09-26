import React from "react";
import { useRecordStatus } from "../../../hooks/useRecordStatus";

interface RecordProps {
    id: string,
    client: string,
    day: Date | null,
    duration: {
        from: number,
        to: number
    },
    car: string,
    description: string,
    status: string
}

const Record: React.FC<RecordProps> = ({duration, car, description, status, id, client, day}) => {
    const {getBadgeClass, handleStatusClick, options, isOptionsOpen, toggleOptions} = useRecordStatus();

    return (
        <div className="card w-25">
            <div className="card-header d-flex align-items-center justify-content-between">
                <h5 className="mb-0">{duration.from}:00-{duration.to}:00</h5>
                <div className="badges d-flex gap-2">
                    <div className={getBadgeClass(status)} onClick={() => toggleOptions()}>{status}</div>
                    <div className="d-flex flex-column record-status">
                    {(options.options && isOptionsOpen) && options.options.statusWorkOptions.map(option => <div className="status-item p-2" onClick={() => {handleStatusClick(id, option, day); toggleOptions()}}>{option}</div>)}
                    </div>
                    {/* <div className="badge bg-primary">Подъемник</div> */}
                </div>
   
            </div>
            <div className="card-body">
                <h4>{car} - {client}</h4>
                <p>{description}</p>
                <div className="d-flex gap-2">
                    <button className="btn btn-primary">Редактировать</button>
                    <button className="btn btn-danger" onClick={() => handleStatusClick(id, "Закрыт", day)}>Закрыть заявку</button>
                </div>
            </div>
        </div>
    )
}

export default Record;