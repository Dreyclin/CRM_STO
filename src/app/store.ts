import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import recordsSlice from "../features/records/recordsSlice";
import clientsSlice from "../features/clients/clientsSlice";
import optionsSlice from "../features/options/optionsSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        record: recordsSlice,
        client: clientsSlice,
        options: optionsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;