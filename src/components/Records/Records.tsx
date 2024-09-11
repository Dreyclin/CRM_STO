import React, { useEffect } from "react";
import RecordsHeader from "./RecordsHeader";
import RecordsContent from "./RecordsContent";
import RecordsFooter from "./RecordsFooter";
import { loadRecords } from "../../features/records/recordsThunks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { AutoServiceCredentials } from "../../features/models/autoServiceModel";

const Records: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const autoServiceId = localStorage.getItem("autoServiceId");
        const credentials: AutoServiceCredentials = {
            id: autoServiceId
        }
        dispatch(loadRecords(credentials)).catch(err => {
            alert(err);
        });
    }, [dispatch])
    
    return (
        <div className="w-100">
            <RecordsHeader />
            <RecordsContent />
            <RecordsFooter />
        </div>
    )
}

export default Records;