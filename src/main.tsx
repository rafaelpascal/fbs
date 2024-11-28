import "./styles/index.css";
import { createRoot } from "react-dom/client";
import AppRouter from "./router/route.tsx";
import { Provider } from "react-redux";
import store from "./redux-store/store.ts";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AuthProvider } from "./context/auth_provider/index.tsx";
import { ThemeProvider } from "./context/theme-provider/index.tsx";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <ThemeProvider>
        <Provider store={store}>
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </Provider>
      </ThemeProvider>
    </React.StrictMode>
  );
}
