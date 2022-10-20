import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./app/store";
import { Provider } from "react-redux";
import { getUsers } from "./features/usersSlice";
import { likePost } from "./features/postsSlice";
import { getUser } from "./features/userSlice";
import { getPosts } from "./features/postsSlice";
import { newPost } from "./features/postsSlice";


const root = ReactDOM.createRoot(document.getElementById("root"));

store.dispatch(getUsers());
store.dispatch(getPosts())
store.dispatch(getUser());
store.dispatch(newPost());
store.dispatch(likePost());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
