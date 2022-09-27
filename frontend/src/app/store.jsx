import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../reducers/post'
import userReducer from '../reducers/user'
import usersReducer from '../reducers/users'
import errorsReducer from "../reducers/errors";
import logger from 'redux-logger'


const store = configureStore({
    reducer : { posts : postsReducer,
                user : userReducer,
                users : usersReducer,
                errors : errorsReducer
              },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    
});

export default store