import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "./authTypes";
import { checkAuth, loginUser, registerUser } from "./authThunks";

const state: AuthState = {
    token: null,
    user: null,
    status: "idle",
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState: state,
    reducers: {
        logOut(state) {
            state.user = null;
            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const {token, user} = action.payload;
                state.status = "succeded"
<<<<<<< HEAD
                state.token = token;
                state.user = user;
=======
                state.error = null;
                state.user = action.payload;
>>>>>>> cae365874edba02897930e786b56539144be80bb
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
            .addCase(checkAuth.fulfilled, (state, action: PayloadAction<User>) => {
                state.user = action.payload;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.status = 'failed';
                if(action.payload)
                    state.error = action.payload as string;
                else
                    state.error = 'Something went wrong';
            })
    }
})

export const {logOut} = authSlice.actions;
export default authSlice.reducer;