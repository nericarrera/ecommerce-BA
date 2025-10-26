import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import "bootswatch/dist/cosmo/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { AppProvider } from "./context/AppProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvided>
      <Router>
        <App />
      </Router>
    </AppProvided>
  </StrictMode>
);
