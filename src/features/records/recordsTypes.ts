export interface Record {
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