import React from "react";

interface RecordProps {
    duration: {
        from: number,
        to: number
    },
    car: string,
    description: string
}

const Record: React.FC<RecordProps> = ({duration, car, description}) => {
    return (
        <div className="card w-25">
            <div className="card-header d-flex align-items-center justify-content-between">
                <h5 className="mb-0">{duration.from}-{duration.to}</h5>
                <div className="badge bg-primary">Подъемник</div>
            </div>
            <div className="card-body">
                <h4>{car} - Дмитрий</h4>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default Record;