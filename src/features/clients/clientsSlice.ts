import { createSlice } from "@reduxjs/toolkit";
import { Client, ClientsState } from "./clientsTypes";
import { addClient } from "./clientsThunks";

const initialState: ClientsState = {
    clients: null,
    status: "idle",
    error: null
}

const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
    .addCase(addClient.pending, state => {
        state.status = "loading"
    })
    .addCase(addClient.fulfilled, (state, action) => {
        state.clients = action.payload;
    })
    .addCase(addClient.rejected, (state, action) => {
        state.error = action.payload as string
    })
    }

})

export default clientsSlice.reducer;