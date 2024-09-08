import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import recordsSlice from "../features/records/recordsSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        record: recordsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;