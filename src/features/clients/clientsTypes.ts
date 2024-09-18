import { AutoServiceCredentials } from "../models/autoServiceModel"

export interface Client extends AutoServiceCredentials {
    id: string | null
    name: string | null,
    phoneNumber: string[] | null,
    car: {
        brand: string | null,
        model: string | null,
        number: string | null
    },
    personalDiscount: number | null
}

export interface ClientsState {
    clients: Client[] | null,
    status: "idle" | "loading" | "failed" | "succeeded"
    error: string | null
}