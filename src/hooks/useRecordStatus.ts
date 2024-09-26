import { RecordCredentials } from "../features/records/recordsTypes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { changeStatus } from "../features/records/recordsThunks";
import { useEffect, useState } from "react";
import { loadOptions } from "../features/options/optionsThunks";
import { AutoServiceCredentials } from "../features/models/autoServiceModel";

export const useRecordStatus = () => {
    const dispatch: AppDispatch = useDispatch();
    const options = useSelector((state: RootState) => state.options)

    const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);

    const toggleOptions = () => {
        setIsOptionsOpen(!isOptionsOpen);
    }

    const handleStatusClick = (id: string, status: string | null, day: Date | null) => {
        console.log(status);
        const recordCredentials: RecordCredentials = {
            autoServiceId: localStorage.getItem('autoServiceId'),
            day: day,
            recordId: id,
            status: status
        }
        dispatch(changeStatus(recordCredentials)).unwrap().then(response => {
        }).catch(err => {
            alert(err);
        })
    };
    useEffect(() => {
        const credentials : AutoServiceCredentials = {
            autoServiceId: localStorage.getItem("autoServiceId")
        }
        dispatch(loadOptions(credentials)).catch(err => {
            alert(err);
        })
    }, [dispatch])
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
        getBadgeClass,
        handleStatusClick,
        isOptionsOpen,
        options,
        toggleOptions
    };
};