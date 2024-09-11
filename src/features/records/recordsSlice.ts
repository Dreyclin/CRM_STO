import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Record, RecordState } from "./recordsTypes";
import { changeStatus, loadRecords } from "./recordsThunks";

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
            .addCase(loadRecords.fulfilled, (state, action: PayloadAction<Record[] | undefined>) => {
                state.status = "succseeded";
                if(action.payload)
                    state.records = action.payload;
                else
                    state.records = [];
            })
            .addCase(loadRecords.rejected, (state, action) => {
                state.status = "failed"
                if (action.payload) {
                    state.error = action.payload as string;
                } else {
                    state.error = "Что то пошло не так"
                }
            })
            .addCase(changeStatus.pending, state => {
                state.status = 'loading';
            })
            .addCase(changeStatus.fulfilled, (state, action: PayloadAction<Record[] | undefined>) => {
                if(action.payload)
                    state.records = action.payload;
            })
            .addCase(changeStatus.rejected, (state, action) => {
                if(action.payload)
                    state.error = action.payload as string;
                else
                    state.error = "Something went wrong"
            })
    }
})

export default recordSlice.reducer;