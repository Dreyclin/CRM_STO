import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { Client } from "../features/clients/clientsTypes";
import { AutoServiceCredentials } from "../features/models/autoServiceModel";
import { loadClients } from "../features/clients/clientsThunks";


export const useClients = () => {
    const clients = useSelector((state: RootState) => state.client.clients);
    const dispatch: AppDispatch = useDispatch();
    const [filteredClients, setFilteredClients] = useState<Client[]>([]);
    const [phone, setPhone] = useState<string>('');

    useEffect(() => {
        const credentials: AutoServiceCredentials = {
            autoServiceId: localStorage.getItem("autoServiceId")
        }
        dispatch(loadClients(credentials)).catch(err => {
            alert(err);
        })
    }, [dispatch])

    useEffect(() => {
        if (clients) {
            setFilteredClients(clients.filter(client => 
                client.phoneNumber?.some(number => number.includes(phone))
            ));
        }
    }, [clients, phone]);

    return {filteredClients, phone, setPhone}
}