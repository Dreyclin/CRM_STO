import { RecordCredentials } from "../features/records/recordsTypes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { changeStatus } from "../features/records/recordsThunks";

export const useRecordStatus = () => {
    const dispatch: AppDispatch = useDispatch();

    const handleStatusClick = (id: string, status: string | null) => {
        console.log(status);
        const recordCredentials: RecordCredentials = {
            id: localStorage.getItem('autoServiceId'),
            recordId: id,
            status: status
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