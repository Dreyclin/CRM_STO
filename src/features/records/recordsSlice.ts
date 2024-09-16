import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DaysRecords, RecordState } from "./recordsTypes";
import { changeStatus, loadRecords } from "./recordsThunks";

const state: RecordState = {
    id: null,
    status: 'idle',
    days: null,
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
            .addCase(loadRecords.fulfilled, (state, action: PayloadAction<DaysRecords[] | undefined>) => {
                state.status = "succseeded";
                if(action.payload)
                    state.days = action.payload;
                else
                    state.days = null;
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
            .addCase(changeStatus.fulfilled, (state, action: PayloadAction<DaysRecords[] | undefined>) => {
                if(action.payload)
                    state.days = action.payload;
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