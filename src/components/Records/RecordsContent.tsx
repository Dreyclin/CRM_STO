import React from "react";
import Day from "./Cards/Day";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";

const RecordsContent: React.FC = () => {

    const { days } = useSelector((state: RootState) => state.record)


    return (
        <div className="content d-flex flex-column gap-4 mb-4">
            {days && days.map(day => {return <Day day={day}/>})}
        </div>
    )
}

export default RecordsContent;