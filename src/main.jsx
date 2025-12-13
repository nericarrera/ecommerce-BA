import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { AppProvider } from "./context/AppContext"; // ¡CORREGIDO! Importa desde AppContext.jsx
import "bootswatch/dist/cosmo/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider> {/* Esto debe ser el componente AppProvider de tu contexto */}
      <Router>
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <App />
      </Router>
    </AppProvider>
  </StrictMode>
);