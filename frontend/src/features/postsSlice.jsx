// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const url = "http://localhost:3000/api/post/";

// export const getPosts = createAsyncThunk("posts/getPosts", async (num) => {
//   try {
//     const res = await axios.get(url);
//     const array = res.data.slice(0, num);
//     // console.log(array);
//     return array;
//   } catch (error) {
//     console.log(error);
//   }
// });

// export const newPost = createAsyncThunk("posts/newPost", async (data) => {
//   try {
//     console.log(data)
//     const res = await axios.post(url, data, {
//       headers: {
//         "content-type": "multipart/form-data",
//       },
//     });
//     console.log(res);
//     return await res.data;
//   } catch (error) {
//     console.log(error);
//   }
// });

// export const likePost = createAsyncThunk(
//   "posts/likePost",
//   async (postId, userId) => {
//     try {
//       const res = await axios({
//         method: "patch",
//         url: `http://localhost:3000/api/post/like/${postId}`,
//         data: { id: userId },
//       });
//       console.log(res);
//       return res.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

// export const updatePost = createAsyncThunk(
//   "posts/updatePost",
//   async (postId, message, picture) => {
//     try {
//       const res = await axios({
//         method: "put",
//         url: `http://localhost:3000/api/post/${postId}`,
//         data: { message, picture },
//       });
//       return res.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

// export const deletePost = createAsyncThunk("posts/deletePost", async (postId) => {
//   try {
//     const res = await axios({
//       method: "delete",
//       url: `http://localhost:3000/api/post/${postId}`,
//     })
//     return res.postId
//   } catch (error) {
//     console.log(error)
//   }
  
// });


// export const addComment = createAsyncThunk("posts/addComment", async (postId, commenterId, text) => {
//   try {
//     const res = await axios({
//       method: "patch",
//       url: `http://localhost:3000/api/post/comment-post/${postId}`,
//       data: { commenterId, text },
//     })
//     return res.postId
//   } catch (error) {
//     console.log(error)
//   }
// });




// export const editComment = createAsyncThunk("posts/editComment", async (postId, commentId, text) => {
//   console.log(postId, commentId, text);
//   try {
//     const res = await axios({
//       method: "patch",
//       url: `http://localhost:3000/api/post/edit-comment-post/${postId}`,
//       data: { commentId, text },
//     })
//     return res.data
//   } catch (error) {
//     console.log(error)
//   }

// });

// // const initialState = {
// //   posts: [],
// //   status: "idle",
// //   error: null,
// // };

// const postsSlice = createSlice({
//   name: "posts",
//   initialState: {
//     posts: {},
//     status: "idle",
//     error: null,
//   },
//   reducers: {},
//   extraReducers(builder) {
//     builder
//       .addCase(getPosts.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(getPosts.fulfilled, (state, action) => {
//         state.status = "success";
//         state.posts = action.payload;
//       })
//       .addCase(getPosts.rejected, (state) => {
//         state.status = "rejected";
//       })
//       .addCase(newPost.fulfilled, (state, action) => {
//         state.posts.push(action.payload);
//       })
//   },
// });



// export default postsSlice.reducer;
