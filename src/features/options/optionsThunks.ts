import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AutoServiceCredentials } from "../models/autoServiceModel";

export const loadOptions = createAsyncThunk(
    'options/changeWorkStatus',
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