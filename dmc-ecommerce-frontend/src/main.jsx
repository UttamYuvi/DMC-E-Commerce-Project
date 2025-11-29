import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import VendorProvider from "./providers/VendorProvider.jsx";

createRoot(document.getElementById("root")).render(
  <VendorProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </VendorProvider>
);
