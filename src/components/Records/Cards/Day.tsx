import React from "react";
import Record from "./Record";
import { DaysRecords } from "../../../features/records/recordsTypes";

interface DayCardProps {
    day: DaysRecords
}

const Day: React.FC<DayCardProps> = ({day}) => {

    return (
        <div className="card p-4">
        <p className="fw-bold h4 pb-3">{day.dayDate ? new Date(day.dayDate).toLocaleDateString("ru-RU", {day: 'numeric', month: 'long'}) : "Нет даты"}</p>
        <div className="records d-flex gap-4 flex-wrap">
            {day.records !== null && day.records.map((record, key) => {
                return <Record
                    car={record.car}
                    description={record.description}
                    duration={record.duration}
                    key={key}
                    totalCost={record.totalCost}
                    status={record.status}
                    id={record._id ? record._id : "no-id"}
                    client={record.clientName}
                    day={day && day.dayDate}
                />
            })}
        </div>
    </div>
    )
}

export default Day;