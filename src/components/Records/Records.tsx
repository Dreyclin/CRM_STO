import React from "react";
import RecordsHeader from "./RecordsHeader";
import RecordsContent from "./RecordsContent";
import RecordsFooter from "./RecordsFooter";

const Records: React.FC = () => {
    return (
        <div className="w-100">
            <RecordsHeader />
            <RecordsContent />
            <RecordsFooter />
        </div>
    )
}

export default Records;