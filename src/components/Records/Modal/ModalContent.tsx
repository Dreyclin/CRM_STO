import React, { useRef, useState } from "react";
import { useModal } from "../../../hooks/useModal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { addRecord } from "../../../features/records/recordsThunks";
import { NewRecord } from "../../../features/records/recordsTypes";

const ModalContent: React.FC = () => {
    const dateInputRef = useRef<HTMLInputElement>(null);

    const dispatch: AppDispatch = useDispatch();

    const { toggle } = useModal();


    const [client, setClient] = useState<string>('');
    const [markModel, setMarkModel] = useState<string>('');
    const [numbers, setNumbers] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [from, setFrom] = useState<number>(0);
    const [to, setTo] = useState<number>(0);

    function handleCalendar() {
        dateInputRef.current?.showPicker();
    }

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    };


    const handleSubmit = () => {
        if (!client || !markModel || !numbers || !description || !date || from === 0 || to === 0) {
            alert("Заполните все поля!");
        } else {
            const credentials: NewRecord = {
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

            console.log("Client:", client);
            console.log("Mark and Model:", markModel);
            console.log("Numbers:", numbers);
            console.log("Description:", description);
            console.log("Date:", date);
            console.log("From:", from);
            console.log("To:", to);
            toggle();
        }
    };

    return (
        <div className="">
            <div className="py-3 d-flex flex-column justify-content-center align-items-center w-80 px-3 gap-3">
                <div className="input-group">
                    <span className="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                    </svg></span>
                    <input type="text" placeholder="Клиент" className="form-control" required value={client} onChange={(e) => setClient(e.target.value)} />
                </div>
                <div className="d-flex justify-content-between gap-3 w-100">
                    <input type="text" className="form-control" placeholder="Марка и модель" required value={markModel} onChange={(e) => setMarkModel(e.target.value)} />
                    <input type="text" className="form-control" placeholder="Номерной знак" required value={numbers} onChange={(e) => setNumbers(e.target.value)} />
                </div>

                <div className="w-100">
                    <textarea name="" id="" className="form-control" placeholder="Описание" rows={5} required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>

                <div className="input-group">
                    <span className="input-group-text"><svg onClick={handleCalendar} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar" viewBox="0 0 16 16">
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                    </svg></span>
                    <input className="form-control" type="date" ref={dateInputRef} required value={date} onChange={handleDateChange} />
                </div>

                <div className="d-flex justify-content-between gap-3 w-100">
                    <input type="number" min={0} max={23} className="form-control" placeholder="С" required value={from} onChange={(e) => setFrom(Number(e.target.value))} />
                    <input type="number" min={0} max={23} className="form-control" placeholder="До" required value={to} onChange={(e) => setTo(Number(e.target.value))} />
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={toggle}>Закрыть</button>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Добавить</button>
            </div>
        </div>

    )
}

export default ModalContent