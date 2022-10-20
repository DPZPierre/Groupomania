import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk(
    "user/getUser",
    async (userId) => {
        const res = await axios.get(`http://localhost:3000/api/auth/${userId}`)
        console.log(res.data)
        return res.data
    }
)

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: [],
        status: null,
    },
    extraReducers: {
        [getUser.pending]: (state, action) => {
            state.status = "loading"
        },
        [getUser.fulfilled]: (state, action) => {
            state.status= "success";
            state.users = action.payload
        },
        [getUser.rejected]: (state, action) => {
            state.status = "failed"
        }
    }
});


export default userSlice.reducer;
