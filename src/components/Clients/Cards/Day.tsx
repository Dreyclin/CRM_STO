import React from "react";
import Record from "./Record";

const Day: React.FC = () => {
    return (
        <div className="card p-4">
            <p>Сегодня (2 сентября)</p>
            <div className="records d-flex gap-4 flex-wrap">
                <Record />
                <Record />
                <Record />
                <Record />
            </div>
        </div>
    )
}

export default Day;