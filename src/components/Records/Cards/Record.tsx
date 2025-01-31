import React from "react";
import { useRecordStatus } from "../../../hooks/useRecordStatus";
import { useRecordsServices } from "../../../hooks/useRecordsServices";

interface RecordProps {
    id: string;
    client: string;
    day: Date | null;
    duration: {
        from: number;
        to: number;
    };
    car: string;
    totalCost: number;
    description: string;
    status: string;
}

const Record: React.FC<RecordProps> = ({
    duration,
    car,
    description,
    status,
    id,
    client,
    day,
    totalCost,
}) => {
    const {
        getBadgeClass,
        handleStatusClick,
        options,
        isOptionsOpen,
        toggleOptions,
    } = useRecordStatus();
    const { handleServiceClick, services, toggleServices, isServicesOpen } =
        useRecordsServices();

    return (
        <div className="card w-25">
            <div className="card-header d-flex align-items-center justify-content-between">
                <h5 className="mb-0">
                    {duration.from}:00-{duration.to}:00
                </h5>
                <div className="badges d-flex gap-2">
                    <div
                        className={getBadgeClass(status)}
                        onClick={() => {
                            toggleOptions();
                            isServicesOpen && toggleServices();
                        }}
                    >
                        {status}
                    </div>
                    <div
                        className="badge bg-primary status-badge"
                        onClick={() => {
                            toggleServices();
                            isOptionsOpen && toggleOptions();
                        }}
                    >
                        Услуги
                    </div>
                    <div className="d-flex flex-column record-status">
                        {services &&
                            isServicesOpen &&
                            services.map((option) => (
                                <div
                                    className="status-item p-2"
                                    onClick={() => {
                                        handleServiceClick(id, day, {
                                            serviceName: option.service,
                                            cost: option.cost,
                                        });
                                        toggleServices();
                                    }}
                                >
                                    {option.service} - {option.cost}
                                </div>
                            ))}
                        {options.options &&
                            isOptionsOpen &&
                            options.options.statusWorkOptions.map((option) => (
                                <div
                                    className="status-item p-2"
                                    onClick={() => {
                                        handleStatusClick(id, option, day);
                                        toggleOptions();
                                    }}
                                >
                                    {option}
                                </div>
                            ))}
                    </div>
                    {/* <div className="badge bg-primary">Подъемник</div> */}
                </div>
            </div>
            <div className="card-body">
                <h4>
                    {car} - {client}
                </h4>
                {description.split("\n").map((line, index) => (
                    <p key={index}>
                        {line}
                        <br />
                    </p>
                ))}
                {totalCost !== 0 && (
                    <p className="fw-bold">Разом: {totalCost}</p>
                )}
                <div className="d-flex gap-2">
                    <button className="btn btn-primary">Редагувати</button>
                    <button
                        className="btn btn-danger"
                        onClick={() => handleStatusClick(id, "Закрыт", day)}
                    >
                        Закрити заявку
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Record;
