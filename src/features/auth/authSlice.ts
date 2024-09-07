import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "./authTypes";
import { loginUser, registerUser } from "./authThunks";

const state: AuthState = {
    token: null,
    user: null,
    status: "idle",
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState: state,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const {token, user} = action.payload;
                state.status = "succeded"
                state.token = token;
                state.user = user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed"
                if (action.payload)
                    state.error = action.payload
                else
                    state.error = "Something went wrong"
            })
            .addCase(registerUser.pending, state => {
                state.status = "loading";
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                const {user} = action.payload
                state.status = "succeded"
                state.user = user;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = "failed"
                if (action.payload)
                    state.error = action.payload
                else
                    state.error = "Something went wrong!"
            })
    }
})


export default authSlice.reducer;