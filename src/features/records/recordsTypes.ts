import { AutoServiceCredentials } from "../models/autoServiceModel"

export interface Record {
    _id: string,
    car: string,
    carNumber: string,
    description: string,
    date: Date,
    duration: {
        from: number,
        to: number
    },
    status: string
}


export interface RecordState {
    id: string | null,
    status: 'idle' | 'failed' | 'succseeded' | 'loading',
    records: Record[] | null,
    error: string | null
}

export enum StatusEnum {
    New = "Новый",
    InProgress = "В работе",
    Completed = "Ждет клиента"
}

export interface RecordCredentials extends AutoServiceCredentials {
    recordId: string,
    status: string | null
}