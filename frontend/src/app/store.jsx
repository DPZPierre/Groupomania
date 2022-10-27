import { configureStore } from "@reduxjs/toolkit";
import postsReducer from"../reducers/post";
import userReducer from "../reducers/user";
import errorsReducer from "../reducers/errors";
import usersReducer from "../reducers/users";


const store = configureStore({
    reducer : { user : userReducer,
                users : usersReducer,
                posts : postsReducer,              
                errors : errorsReducer
              },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
    
});

export default store