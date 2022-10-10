import { configureStore } from "@reduxjs/toolkit";
// import postsReducer from '../reducers/post'
import postsReducer from"../features/postsSlice";
import userReducer from '../reducers/user'
import errorsReducer from "../reducers/errors";
import usersReducer from "../features/usersSlice";


const store = configureStore({
    reducer : { posts : postsReducer,
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