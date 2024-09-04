import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginCredentials, RegistrationCredentials, User } from "./authTypes";
import axios from "axios";

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async(credentials: LoginCredentials): Promise<User> => {
        const response = await axios.post<User>("http://localhost:5000/login", credentials);
        return response.data;
    }
)

export const registerUser = createAsyncThunk(
    'auth/register',
    async(credentials: RegistrationCredentials): Promise<User> => {
        const response = await axios.post<User>("http://localhost:5000/reg", credentials);
        return response.data;
    }
)