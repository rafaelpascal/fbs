import "./styles/index.css";
import { createRoot } from "react-dom/client";
import AppRouter from "./router/route.tsx";
import { Provider } from "react-redux";
import store from "./redux-store/store.ts";
import React from "react";
import { AuthProvider } from "./context/auth_provider/index.tsx";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </Provider>
    </React.StrictMode>
  );
}
