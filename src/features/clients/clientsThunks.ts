import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { AutoServiceCredentials } from "../models/autoServiceModel";
import { Client } from "./clientsTypes";


export const addClient = createAsyncThunk(
    'clients/addClient',
    async(credentials: Client, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:5000/addClient", credentials);
            return response.data
        } catch (error) {
            const err = error as Error;
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)

export const loadClients = createAsyncThunk(
    'clients/loadClients',
    async(credentials: AutoServiceCredentials, thunkAPI) => {
        try {
            const response = await axios.post<Client[]>("http://localhost:5000/loadClients", credentials);
            return response.data;
        } catch (error) {
            const err = error as Error;
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)

export const updateClient = createAsyncThunk(
    'clients/update',
    async(credentials: Client, thunkAPI) => {
        try {
            const response = await axios.post<Client[]>('http://localhost:5000/updateClient', credentials);
            return response.data;
        } catch (error) {
            const err = error as Error;
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)