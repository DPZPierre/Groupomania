import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./app/store";
import { Provider } from "react-redux";
import { getUsers } from "./actions/users";
import { getPosts } from "./actions/post";


const root = ReactDOM.createRoot(document.getElementById("root"));

store.dispatch(getUsers());
store.dispatch(getPosts());


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
