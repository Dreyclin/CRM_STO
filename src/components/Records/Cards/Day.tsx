import React from "react";
import Record from "./Record";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

const Day: React.FC = () => {
    
    const {records} = useSelector((state: RootState) => state.record)
    console.log(records);
    return (
        <div className="card p-4">
            <p>Сегодня (2 сентября)</p>
            <div className="records d-flex gap-4 flex-wrap">
                {records && records.map((record, key) => {
                    return <Record 
                    car={record.car} 
                    description={record.description} 
                    duration={record.duration} 
                    key={key}
                    status={record.status}
                    id={record._id}
                    />})}
            </div>
        </div>
    )
}

export default Day;