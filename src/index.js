import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import LocationContextProvider from "./store/context-store/Location-Context-Store";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LocationContextProvider>
      <App />
    </LocationContextProvider>
  </React.StrictMode>
);
