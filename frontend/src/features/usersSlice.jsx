import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk(
    "users/getUsers",
    async () => {
        const res = await axios.get(`http://localhost:3000/api/auth`)
        console.log(res.data)
        return res.data
    }
)

const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        status: null,
    },
    extraReducers: {
        [getUsers.pending]: (state, action) => {
            state.status = "loading"
        },
        [getUsers.fulfilled]: (state, action) => {
            state.status= "success";
            state.users = action.payload
        },
        [getUsers.rejected]: (state, action) => {
            state.status = "failed"
        }
    }
});


export default usersSlice.reducer;

