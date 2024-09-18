import { createSlice } from "@reduxjs/toolkit";
import { ClientsState } from "./clientsTypes";
import { addClient, loadClients } from "./clientsThunks";

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
        state.error = action.payload as string
        state.status = "failed"
    })
    .addCase(loadClients.pending, state => {
        state.status = "loading"
    })
    .addCase(loadClients.fulfilled, (state, action) => {
        state.clients = action.payload;
        state.status = "succeeded"
    })
    }

})

export default clientsSlice.reducer;