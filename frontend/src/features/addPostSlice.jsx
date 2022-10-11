import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addPost = createAsyncThunk(
    "post/addPost",
    async (data) => {
        const res = await axios.post(`http://localhost:3000/api/post/`,data, {
            headers: {
                'content-type': 'multipart/form-data',
            }

        });
        console.log(res.data)
        return res.data
        
    });
console.log(addPost())
  

const initialState = {
    post: [],
    status: 'idle',
    error: null
}

const addPostSlice = createSlice({
    name: "post",
    initialState,
    extraReducers: {
        [addPost.pending]: (state, action) => {
            state.status = "loading"
        },
        [addPost.fulfilled]: (state, action) => {
            state.status = "success";
            const newState = [...state];
            newState.post.push(action.payload);
        },
        [addPost.rejected]: (state, action) => {
            state.status = "failed"
        }
    }
});

export const selectAllPosts = (state) => state.posts.posts

export default addPostSlice.reducer;