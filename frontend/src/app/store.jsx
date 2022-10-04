import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../reducers/post'
import userReducer from '../reducers/user'
import usersReducer from '../reducers/users'
import errorsReducer from "../reducers/errors";

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