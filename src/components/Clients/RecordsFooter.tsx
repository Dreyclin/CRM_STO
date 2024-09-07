import React from "react";

const RecordsFooter: React.FC = () => {
    return (
        <div className="clients-footer d-flex justify-content-end mb-4">
            <div className="flex-container d-flex gap-4">
                <button className="btn btn-success">&#60; Предыдущий</button>
                <button className="btn btn-success">Следующий &#62;</button>
            </div>
        </div>
    )
}

export default RecordsFooter;