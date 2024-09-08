export interface Record {
    car: String,
    carNumber: String,
    description: String,
    date: Date,
    duration: Number,
    status: String
}


export interface RecordState {
    id: string | null,
    status: 'idle' | 'failed' | 'succseeded',
    records: [Record] | null
}