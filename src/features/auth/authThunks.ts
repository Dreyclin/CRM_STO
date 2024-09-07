import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginCredentials, LoginResponse, RegisterResponse, RegistrationCredentials, User } from "./authTypes";
import axios from "axios";

export const loginUser = createAsyncThunk<LoginResponse, LoginCredentials, {rejectValue: string}>(
    'auth/loginUser',
    
    async (credentials: LoginCredentials, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:5000/login", credentials);
            console.log(response.data);
            localStorage.setItem('token', response.data.token)
            return response.data;
        } catch (error: any) {
            console.log(error.response.data.message);
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async(_, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            if(!token) throw new Error ("Нет токена!");

            const response = await axios.post<User>('http://localhost:5000/checkAuth', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const registerUser = createAsyncThunk<RegisterResponse, RegistrationCredentials, { rejectValue: string }>(
    'auth/register',
    async (credentials, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:5000/reg", credentials);
            return response.data;
        } catch (error: any) {
            console.log(error.response.data.message);
            return thunkAPI.rejectWithValue(error.response.data.message);
        }

    }
)