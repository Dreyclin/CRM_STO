import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "./useModal";
import { AppDispatch, RootState } from "../app/store";
import { Client } from "../features/clients/clientsTypes";
import { AutoServiceCredentials } from "../features/models/autoServiceModel";
import { loadClients } from "../features/clients/clientsThunks";
import { NewRecord } from "../features/records/recordsTypes";
import { addRecord } from "../features/records/recordsThunks";


export const useRecordsModal = () => {

    const dateInputRef = useRef<HTMLInputElement>(null);
    const clientDropdownRef = useRef<HTMLDivElement>(null);
    const servicesDropdownRef = useRef<HTMLDivElement>(null)
    const dispatch: AppDispatch = useDispatch();

    const { toggle } = useModal();
    const clients = useSelector((state: RootState) => state.client.clients)
    const [selectedClient, setSelectedClient] = useState<Client | null>();
    const [clientDropdown, setClientDropdown] = useState<boolean>(false);
    const [numberOfServices, setNumberOfServices] = useState<number>(1);
    const [filteredClients, setFilteredClients] = useState<Client[]>([]);
    const [servicesDropdown, setServiceDropdown] = useState<boolean>(false);
    const options = useSelector((state: RootState) => state.options)

    const [client, setClient] = useState<string>('');
    const [markModel, setMarkModel] = useState<string>('');
    const [numbers, setNumbers] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [from, setFrom] = useState<number>(0);
    const [to, setTo] = useState<number>(0);


    useEffect(() => {
        const credentials : AutoServiceCredentials = {
            autoServiceId: localStorage.getItem("autoServiceId")
        }
        dispatch(loadClients(credentials)).catch(err => {
            alert(err)
        })
    }, [dispatch])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (clientDropdownRef.current && !clientDropdownRef.current.contains(event.target as Node)) {
                setClientDropdown(false);
            }
            if(servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
                setServiceDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    function handleCalendar() {
        dateInputRef.current?.showPicker();
    }

    useEffect(() => {
        if(selectedClient){
            setClient(selectedClient.name || '');
            setMarkModel(selectedClient.car.brand + " " + selectedClient.car.model);
            setNumbers(selectedClient.car.number || '');
            setClientDropdown(false);
        } else {
            setMarkModel("");
            setNumbers('');
            setClientDropdown(false);
        }
    }, [selectedClient])

    useEffect(() => {
        if (client) {
            const filtered = clients?.filter(c =>
                c.phoneNumber?.some(number => number.includes(client))
            ) || [];
            setFilteredClients(filtered);
        } else {
            setFilteredClients(clients || []);
        }
    }, [client, clients]);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    };

    const handleSubmit = () => {
        if (!client || !markModel || !numbers || !description || !date || from === 0 || to === 0) {
            alert("Заполните все поля!");
        } else if (selectedClient || client === "К.П.") {
            const credentials: NewRecord = {
                clientId: selectedClient?._id || null,
                client: client,
                car: markModel,
                carNumber: numbers,
                description: description,
                date: date,
                duration: {
                    from: from,
                    to: to
                },
                status: "Новый",
                autoServiceId: localStorage.getItem("autoServiceId")
            }

            dispatch(addRecord(credentials)).catch(err => {
                alert(err);
            });

            toggle();
        } else {
            console.log(client);
            alert("Выберите клиента")
        }
    };

    return {dateInputRef, clientDropdownRef, options, servicesDropdown, servicesDropdownRef, toggle, clients: filteredClients, selectedClient, numberOfServices, clientDropdown, client, markModel, numbers, description, date, from, to,
        setSelectedClient, setClientDropdown, setClient, setNumberOfServices, setServiceDropdown, setMarkModel, setNumbers, setDescription, setFrom, setTo, handleCalendar, handleSubmit, handleDateChange
    }

}