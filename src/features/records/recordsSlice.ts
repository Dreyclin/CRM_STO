import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Record, RecordState } from "./recordsTypes";
import { loadRecords } from "./recordsThunks";

const state: RecordState = {
    id: null,
    status: 'idle',
    records: null,
    error: null
}

const recordSlice = createSlice({
    name: 'record',
    initialState: state,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadRecords.pending, (state) => {
                state.status = "loading"
            })
            .addCase(loadRecords.fulfilled, (state, action: PayloadAction<Record[]>) => {
                state.status = "succseeded";
                state.records = action.payload;
            })
            .addCase(loadRecords.rejected, (state, action) => {
                state.status = "failed"
                if (action.payload) {
                    state.error = action.payload as string;
                } else {
                    state.error = "Что то пошло не так"
                }
            })
    }
})

export default recordSlice.reducer;