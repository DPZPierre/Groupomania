import { configureStore } from "@reduxjs/toolkit";
// import postsReducer from '../reducers/post'
import postsSlice from"../features/postsSlice";
import userReducer from '../features/userSlice'
import errorsReducer from "../reducers/errors";
import usersReducer from "../features/usersSlice";
import addPostSlice from "../features/postsSlice";


const store = configureStore({
    reducer : { posts : postsSlice,
                addPost : addPostSlice,
                user : userReducer,
                users : usersReducer,
                errors : errorsReducer
              },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
    
});

export default store