import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { useEffect, useState } from "react";
import { RecordCredentials } from "../features/records/recordsTypes";
import { AutoServiceCredentials } from "../features/models/autoServiceModel";
import { loadOptions } from "../features/options/optionsThunks";
import {
    AddServiceCreds,
    NewServiceCreds,
} from "../features/options/optionsTypes";
import { setService } from "../features/records/recordsThunks";

export const useRecordsServices = () => {
    const dispatch: AppDispatch = useDispatch();
    const services = useSelector(
        (state: RootState) => state.options.options?.servicesOptions
    );

    const [isServicesOpen, setIsServicesOpen] = useState<boolean>(false);

    const toggleServices = () => {
        setIsServicesOpen(!isServicesOpen);
    };

    const handleServiceClick = (
        id: string,
        day: Date | null,
        service: {
            serviceName: string;
            cost: number;
        }
    ) => {
        const serviceCredentials: AddServiceCreds = {
            autoServiceId: localStorage.getItem("autoServiceId"),
            day: day,
            recordId: id,
            service: service,
        };
        dispatch(setService(serviceCredentials))
            .unwrap()
            .then((response) => {})
            .catch((err) => {
                alert(err);
            });
    };
    useEffect(() => {
        const credentials: AutoServiceCredentials = {
            autoServiceId: localStorage.getItem("autoServiceId"),
        };
        dispatch(loadOptions(credentials)).catch((err) => {
            alert(err);
        });
    }, [dispatch]);

    return {
        services,
        isServicesOpen,
        toggleServices,
        handleServiceClick,
    };
};
