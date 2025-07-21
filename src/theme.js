// theme.js
import { extendTheme } from "@mui/material/styles";
import "./theme.css"; // Import the CSS file for color scheme
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        primary: {
          main: "#1976d2",
        },
      },
    },
    dark: {
      palette: {
        mode: "dark",
        primary: {
          main: "#90caf9",
        },
      },
    },
  },
  colorSchemeSelector: "class",
});

export default theme;
