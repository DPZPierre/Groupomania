import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const fetchPosts = createSlice({
    name: "posts",
    initialState: [],
    reducers: {
        fillPosts(state, action) {
            console.log("hello")
            state = action.payload
        }
    }
});
export const { fillPosts } = fetchPosts.actions;

export const showPosts = () => async (dispatch) =>{
    try {
        const res = await axios.get("http://localhost:3000/api/post");
        dispatch(fillPosts(res.data))
    } catch (error) {
        console.log(error)
    }
    
}



export default fetchPosts.reducer;
