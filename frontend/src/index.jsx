import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./app/store";
import { Provider } from "react-redux";
import { getUsers } from "./actions/users";
import { addPost, likePost } from "./actions/post";
import { getUser } from "./actions/user";
import { showPosts } from "./features/postsSlice";

const root = ReactDOM.createRoot(document.getElementById("root"));

store.dispatch(getUsers());
showPosts();
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
