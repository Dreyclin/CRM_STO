import { createSlice } from "@reduxjs/toolkit";
import { ClientsState } from "./clientsTypes";
import { addClient, loadClients, updateClient } from "./clientsThunks";

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
        state.status = "succeeded"
    })
    .addCase(addClient.rejected, (state, action) => {
        if(action.payload)
            state.error = action.payload as string
        else
            state.error = "Something went wrong";
        state.status = "failed"
    })
    .addCase(loadClients.pending, state => {
        state.status = "loading"
    })
    .addCase(loadClients.fulfilled, (state, action) => {
        state.clients = action.payload;
        state.status = "succeeded"
    })
    .addCase(loadClients.rejected, (state, action) => {
        if(action.payload)
            state.error = action.payload as string
        else
            state.error = "Something went wrong";
        state.status = "failed"
    })
    .addCase(updateClient.pending, state => {
        state.status = "loading"
    })
    .addCase(updateClient.fulfilled, (state, action) => {
        state.clients = action.payload;
        state.status = "succeeded"
    })
    .addCase(updateClient.rejected, (state, action) => {
        if(action.payload)
            state.error = action.payload as string
        else
            state.error = "Something went wrong"
        state.status = "failed"
    })
    }

})

export default clientsSlice.reducer;