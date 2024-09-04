import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import { i18n } from "./components/i18/i18";
import { QueryClient, QueryClientProvider } from "react-query";
import { PrimeReactProvider } from "primereact/api";
import ContextApiProvider from "./context/ContextApi";

const root = ReactDOM.createRoot(document.getElementById("root"));

const client = new QueryClient();
root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <PrimeReactProvider>
          <ContextApiProvider>
            <App />
          </ContextApiProvider>
        </PrimeReactProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
