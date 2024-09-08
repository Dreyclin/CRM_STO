import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loadRecords = createAsyncThunk(
    'records/load',
    async () => {
        try {
            const response = await axios.post('http://localhost:5000/loadRecords');
            return response.data;
        } catch (error) {
            
        }
    }
)