import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AutoServiceCredentials } from "../models/autoServiceModel";
import { Record } from "./recordsTypes";

export const loadRecords = createAsyncThunk(
    'records/load',
    async (credentials: AutoServiceCredentials, thunkAPI) => {
        try {
            const response = await axios.post<Record[]>('http://localhost:5000/loadRecords', credentials);
            console.log(response.data);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)