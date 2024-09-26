export interface OptionsState {
    options: Options | null
    status: 'idle' | 'loading' | 'failed' | 'succeeded'
    error: string | null
}


export interface Options {
    statusWorkOptions: string[]
}