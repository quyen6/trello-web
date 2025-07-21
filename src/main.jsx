// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";

createRoot(document.getElementById("root")).render(
  <>
    <InitColorSchemeScript attribute="class" />
    <StrictMode>
      <ThemeProvider
        theme={theme}
        defaultMode="light"
        attribute="class"
        disableTransitionOnChange
      >
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StrictMode>
  </>
);
