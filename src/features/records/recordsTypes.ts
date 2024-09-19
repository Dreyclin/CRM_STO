import { AutoServiceCredentials } from "../models/autoServiceModel"

export interface Record {
    _id: string | null,
    clientName: string,
    clientId: string,
    day: Date,
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
    days: DaysRecords[] | null
    error: string | null
}

export enum StatusEnum {
    New = "Новый",
    InProgress = "В работе",
    Completed = "Ждет клиента"
}

export interface RecordCredentials extends AutoServiceCredentials {
    recordId: string,
    day: Date | null,
    status: string | null
}

export interface DaysRecords {
    dayDate: Date | null,
    records: Record[] | null
}

export interface NewRecord extends AutoServiceCredentials{
    clientId: string | null
    client: string,
    car: string,
    carNumber: string,
    description: string,
    date: string,
    duration: {
        from: number,
        to: number
    },
    status: string
}