import { createSlice } from "@reduxjs/toolkit";
import Record from "../../components/Records/Cards/Record";
import { RecordState } from "./recordsTypes";

const state: RecordState = {
    id: null,
    status: 'idle',
    records: null
}

const recordSlice = createSlice({
    name: 'record',
    initialState: state,
    reducers: {},
    extraReducers: (builder) => {

    }
})

export default recordSlice.reducer;