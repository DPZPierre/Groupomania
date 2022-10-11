import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPosts = createAsyncThunk(
    "posts/getPosts",
    async () => {
        const res = await axios.get(`http://localhost:3000/api/post`)
        console.log("hello")
        return res.data
    }
)


const postsSlice = createSlice({
    name: "posts",
    initialState: [],
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




// const postsSlice = createSlice({
//     name: "posts",
//     initialState: [],
//     reducers: {
//         fetchPosts(state, action) {
//             console.log("hello")
//             state = action.payload
//         },
//         addPost(state, action) {
//             const newState = [...state];
//             newState.push(action.payload);
//         }
//     }
// });
// export const { fetchPosts, addPost } = postsSlice.actions;

// export const showPosts = () => async (dispatch) =>{
//     try {
//         const res = await axios.get("http://localhost:3000/api/post");
//         dispatch(fetchPosts(res.data))
//     } catch (error) {
//         console.log(error)
//     }  
// }


// export const createPost = (data) => async (dispatch) => {
//     try {
//         const res = axios.post(`http://localhost:3000/api/post/`, data, {
//             headers: {
//               'content-type': 'multipart/form-data',
//             }
//         });
//     dispatch(addPost(res.data))
//     } catch (error) {
//         console.log(error)
//     }
// }

export default postsSlice.reducer;
