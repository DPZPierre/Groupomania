import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// export const getUsers = createAsyncThunk(
//     "users/getUsers",
//     async () => {
//         const res = await axios.get(`http://localhost:3000/api/auth`)
//         return res.data
//     }
// )

const usersSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {
      fillUsers(state, action) {
        state = action.payload;
      }
    }
});

export const { fillUsers } = usersSlice.actions;

export const fetchUsers = () => async (dispatch) =>{
    try {
        const res = await axios.get("http://localhost:3000/api/auth");
        dispatch(fillUsers(res.data))
    } catch (error) {
        console.log(error)
    }
    
}

export default usersSlice.reducer;
