import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

const raiz = ReactDOM.createRoot(document.getElementById("root"));
raiz.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
