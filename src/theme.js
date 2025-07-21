import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "light", // default
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#856c19ff",
    },
    error: {
      main: red.A400,
    },
    text: {
      secondary: red[500],
    },
  },
});

export default theme;
