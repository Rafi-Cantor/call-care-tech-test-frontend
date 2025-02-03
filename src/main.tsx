import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@mui/material";
import theme from "../muiTheme.ts";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store/store.ts";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <ToastContainer position="top-right" />
            <App />
          </Provider>
        </ThemeProvider>
      </PersistGate>
    </BrowserRouter>
  </StrictMode>
);
