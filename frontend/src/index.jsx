import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./app/store";
import { Provider } from "react-redux";
import { getUsers } from "./features/usersSlice";
import { likePost } from "./actions/post";
import { getUser } from "./features/userSlice";
import { getPosts } from "./features/postsSlice";
import { addPost } from "./features/addPostSlice";


const root = ReactDOM.createRoot(document.getElementById("root"));

store.dispatch(getUsers());
store.dispatch(getPosts())
store.dispatch(getUser());
store.dispatch(addPost());
store.dispatch(likePost());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
