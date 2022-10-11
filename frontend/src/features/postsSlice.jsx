import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPosts = createAsyncThunk(
    "posts/getPosts",
    async (num) => {
        const res = await axios.get(`http://localhost:3000/api/post/`)
        const array = res.data.slice(0, num);
        return array
    }
)

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

const postsSlice = createSlice({
    name: "posts",
    initialState,
    extraReducers: {
        [getPosts.pending]: (state, action) => {
            state.status = "loading"
        },
        [getPosts.fulfilled]: (state, action) => {
            state.status= "success";
            state.posts = action.payload
        },
        [getPosts.rejected]: (state, action) => {
            state.status = "failed"
        }
    }
});

export default postsSlice.reducer;




