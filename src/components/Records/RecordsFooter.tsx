import React from "react";

interface RecordsFooterProps {
    onNext: () => void;
    onPrevious: () => void;
    hasNext: boolean | null;
    hasPrevious: boolean;
}

const RecordsFooter: React.FC<RecordsFooterProps> = ({
    onNext,
    onPrevious,
    hasNext,
    hasPrevious,
}) => {
    return (
        <div className="clients-footer d-flex justify-content-end mb-4">
            <div className="flex-container d-flex gap-4">
                <button
                    className="btn btn-success"
                    onClick={onPrevious}
                    disabled={!hasPrevious}
                >
                    &#60; Попередній
                </button>
                <button
                    className="btn btn-success"
                    onClick={onNext}
                    disabled={!hasNext}
                >
                    Наступний &#62;
                </button>
            </div>
        </div>
    );
};

export default RecordsFooter;
