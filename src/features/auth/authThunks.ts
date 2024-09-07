import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginCredentials, RegistrationCredentials, User } from "./authTypes";
import axios, {  } from "axios";

export const loginUser = createAsyncThunk<User, LoginCredentials, { rejectValue: string }>(
    'auth/loginUser',
    
    async (credentials: LoginCredentials, {rejectWithValue}) => {
        try {
            const response = await axios.post("http://localhost:5000/login", credentials);
            console.log(response.data);
            localStorage.setItem('isAuthed', response.data.isAuthed)
            return response.data;
        } catch (error: any) {
            console.log(error.response.data.message);
            return rejectWithValue(error.response.data.message);
        }

    }
)

export const registerUser = createAsyncThunk(
    'auth/register',
    async (credentials: RegistrationCredentials): Promise<User> => {
        const response = await axios.post<User>("http://localhost:5000/reg", credentials);
        return response.data;
    }
)