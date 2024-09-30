import { createSlice } from "@reduxjs/toolkit";
import { OptionsState } from "./optionsTypes";
import { addStatusRecord, loadOptions } from "./optionsThunks";


const initialState : OptionsState = {
    options: null,
    status: 'idle',
    error: null
}

const optionsSlice = createSlice({
    name: 'options',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(loadOptions.pending, state => {
            state.status = 'loading'
        })
        .addCase(loadOptions.fulfilled, (state, action) => {
            state.options = action.payload
            state.status = 'succeeded'
        })
        .addCase(loadOptions.rejected, (state, action) => {
            if(action.payload)
                state.error = action.payload as string
            else
                state.error = "Something went wrong!"
        })
        .addCase(addStatusRecord.pending, state => {
            state.status = 'loading'
        })
        .addCase(addStatusRecord.fulfilled, (state, action) => {
            state.options = action.payload
            state.status = 'succeeded'
        })
        .addCase(addStatusRecord.rejected, (state, action) => {
            if(action.payload)
                state.error = action.payload as string
            else
                state.error = "Something went wrong!"
        })
    }
})

export default optionsSlice.reducer