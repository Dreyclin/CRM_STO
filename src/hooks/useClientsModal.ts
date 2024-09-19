import { useEffect, useState } from "react";
import { Client } from "../features/clients/clientsTypes";
import { addClient, updateClient } from "../features/clients/clientsThunks";
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";

export const useClientsModal = (client: Client | null, toggle: () => void) => {

    const dispatch: AppDispatch = useDispatch();
    const [name, setName] = useState<string>('');
    const [mark, setMark] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [numbers, setNumbers] = useState<string>('');
    const [phonePrimary, setPhonePrimary] = useState<string>('');
    const [phoneSecondary, setPhoneSecondary] = useState<string>('');
    const [personalDiscount, setPersonalDiscount] = useState<number>(0);

    useEffect(() => {
        if (client) {
            setName(client.name || '');
            setMark(client.car?.brand || '');
            setModel(client.car?.model || '');
            setNumbers(client.car?.number || '');
            setPhonePrimary(client.phoneNumber ? client.phoneNumber[0] : '');
            setPhoneSecondary(client.phoneNumber && client.phoneNumber[1] ? client.phoneNumber[1] : '');
            setPersonalDiscount(client.personalDiscount || 0);
        }
    }, [client]);

    function handleSubmit() {
        if(!name || !mark || !model || !numbers || !phonePrimary || personalDiscount < 0) {
            alert("Заполните все поля!")
        } else if(!client) {
            const credentials: Client = {
                _id: null,
                name: name,
                car: {
                    brand: mark,
                    model: model,
                    number: numbers
                },
                phoneNumber: [phonePrimary, phoneSecondary],
                personalDiscount: personalDiscount,
                autoServiceId: localStorage.getItem("autoServiceId")
            }

            dispatch(addClient(credentials)).catch(err => {
                alert(err);
            })
            toggle();
        } else {
            console.log(client);
            const credentials: Client = {
                _id: client._id,
                name: name,
                car: {
                    brand: mark,
                    model: model,
                    number: numbers
                },
                phoneNumber: [phonePrimary, phoneSecondary],
                personalDiscount: personalDiscount,
                autoServiceId: localStorage.getItem("autoServiceId")
            }

            dispatch(updateClient(credentials)).catch(err => {
                alert(err);
            })
            toggle();
        }
    }

    return({name, mark, model, numbers, phonePrimary, phoneSecondary, personalDiscount, 
        setName, setMark, setModel, setNumbers, setPhonePrimary, setPhoneSecondary, setPersonalDiscount, handleSubmit})
}