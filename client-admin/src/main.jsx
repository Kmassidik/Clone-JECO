// import React from 'react'
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import ReactDOM from "react-dom/client";
// import App from './App.jsx'
import { Provider } from "react-redux";
import store from "./store/store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>,
);
