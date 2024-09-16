import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DaysRecords, NewRecord, Record, RecordCredentials } from "./recordsTypes";
import { AutoServiceCredentials } from "../models/autoServiceModel";

export const loadRecords = createAsyncThunk(
    'records/load',
    async (credentials: AutoServiceCredentials, thunkAPI) => {
        try {
            const response = await axios.post<DaysRecords[]>('http://localhost:5000/loadRecords', credentials);
            return response.data;
        } catch (error) {
            const err = error as Error;
            thunkAPI.rejectWithValue(err.message);
        }
    }
)

export const changeStatus = createAsyncThunk(
    'records/changeStatus',
    async(credentials: RecordCredentials, thunkAPI) => {
        try {
            const response = await axios.post<DaysRecords[]>('http://localhost:5000/changeStatus', credentials);
            return response.data;
        } catch (error) {
            const err = error as Error;
            thunkAPI.rejectWithValue(err.message);
        }
    }
)

export const addRecord = createAsyncThunk(
    'records/addRecord',
    async(credentials: NewRecord, thunkAPI) => {
        try {
            const response = await axios.post<DaysRecords[]>('http://localhost:5000/addRecord', credentials);
            return response.data;
        } catch (error) {
            const err = error as Error;
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)