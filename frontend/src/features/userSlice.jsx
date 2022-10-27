// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const getUser = createAsyncThunk(
//     "user/getUser",
//     async (userId) => {
//         console.log(userId)
//         const res = await axios.get(`http://localhost:3000/api/auth/${userId}`)
//         console.log(res.data)
//         return await res.data
//     }
// )

// const userSlice = createSlice({
//     name: "user",
//     initialState: {
//         user: [],
//         status: null,
//     },
//     extraReducers: {
//         [getUser.pending]: (state) => {
//             state.status = "loading"
//         },
//         [getUser.fulfilled]: (state, action) => {
//             state.status= "success";
//             state.user = action.payload
//         },
//     }
// });


// export default userSlice.reducer;
