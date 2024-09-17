import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


export const addClient = createAsyncThunk(
    'clients/addClient',
    async(_, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:5000/insertClient");
            return response.data
        } catch (error) {
            const err = error as Error;
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)