import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AutoServiceCredentials } from "../models/autoServiceModel";
import { NewServiceCreds, NewStatusCreds } from "./optionsTypes";

export const loadOptions = createAsyncThunk(
    'options/loadOptions',
    async (credentials: AutoServiceCredentials, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:5000/loadOptions", credentials)
            return response.data
        } catch (error) {
            const err = error as Error;
            return thunkAPI.rejectWithValue(err.message);
        }

    }
)

export const addStatusRecord = createAsyncThunk(
    'option/addStatusRecord',
    async(credentials: NewStatusCreds, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:5000/addStatusRecord", credentials);
            return response.data;
        } catch (error) {
            const err = error as Error
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)

export const addService = createAsyncThunk(
    'option/addService',
    async(credentials: NewServiceCreds, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:5000/addService", credentials);
            return response.data;
        } catch (error) {
            const err = error as Error
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)