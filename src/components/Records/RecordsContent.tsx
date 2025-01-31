import React, { useState } from "react";
import Day from "./Cards/Day";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import RecordsFooter from "./RecordsFooter";

const RecordsContent: React.FC = () => {
    const { days } = useSelector((state: RootState) => state.record);

    const limitedDays = days && days.slice(0, 10);

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 2;

    const handleNext = () => {
        if (days && (currentPage + 1) * itemsPerPage < days.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedDays =
        limitedDays && limitedDays.slice(startIndex, endIndex);

    return (
        <div className="content d-flex flex-column gap-4 mb-4">
            {displayedDays &&
                displayedDays.map((day) => {
                    return <Day day={day} />;
                })}
            <RecordsFooter
                onNext={handleNext}
                onPrevious={handlePrevious}
                hasNext={days && endIndex < days?.length}
                hasPrevious={currentPage > 0}
            />
        </div>
    );
};

export default RecordsContent;
