import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConfirmProvider } from "material-ui-confirm";

createRoot(document.getElementById("root")).render(
  <>
    <InitColorSchemeScript attribute="class" defaultMode="light" />
    {/* <StrictMode> */}
    <ThemeProvider theme={theme} attribute="class">
      <ConfirmProvider
        defaultOptions={{
          allowClose: false,
          confirmationText: "OK",
          cancellationText: "CANCLE",
          confirmationButtonProps: { color: "error", variant: "outlined" },
          cancellationButtonProps: { color: "inherit" },
        }}
      >
        <CssBaseline />
        <App />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </ConfirmProvider>
    </ThemeProvider>
    {/* </StrictMode> */}
  </>
);
