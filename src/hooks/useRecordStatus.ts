import { useState } from "react";
import { RecordCredentials } from "../features/records/recordsTypes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { changeStatus } from "../features/records/recordsThunks";

export const useRecordStatus = () => {
    const dispatch: AppDispatch = useDispatch();

    const handleStatusClick = (id: string) => {
        const recordCredentials: RecordCredentials = {
            id: localStorage.getItem('autoServiceId'),
            recordId: id
        }
        dispatch(changeStatus(recordCredentials)).unwrap().then(response => {
        }).catch(err => {
            alert(err);
        })
    };

    const getBadgeClass = (status: string) => {
        switch (status) {
            case "Новый":
                return "status-badge badge bg-primary";
            case "В работе":
                return "status-badge badge bg-warning";
            case "Ждет клиента":
                return "status-badge badge bg-success";
            default:
                return "status-badge badge bg-secondary";
        }
    };

    return {
        handleStatusClick,
        getBadgeClass
    };
};