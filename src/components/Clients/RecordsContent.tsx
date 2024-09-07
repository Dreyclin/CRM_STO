import React from "react";
import Day from "./Cards/Day";

const RecordsContent: React.FC = () => {
    return (
        <div className="content d-flex flex-column gap-4 mb-4">
            <Day />
            <Day />
        </div>
    )
}

export default RecordsContent;