import { AutoServiceCredentials } from "../models/autoServiceModel"

export interface OptionsState {
    options: Options | null
    status: 'idle' | 'loading' | 'failed' | 'succeeded'
    error: string | null
}

export interface NewStatusCreds extends AutoServiceCredentials {
    status: string
}

export interface NewServiceCreds extends AutoServiceCredentials {
    service: {
        serviceName: string,
        cost: number
    }
}

export interface Options {
    statusWorkOptions: string[]
}