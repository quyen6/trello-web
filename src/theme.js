import { extendTheme } from "@mui/material/styles";
import { pink, teal } from "@mui/material/colors";
const theme = extendTheme({
  trello: {
    appBarHeight: "48px",
    boardBarHeight: "58px",
  },
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        primary: {
          main: teal[500],
        },
      },
    },
    dark: {
      palette: {
        mode: "dark",
        primary: {
          main: pink[100],
        },
      },
    },
  },
  colorSchemeSelector: "class",
});

export default theme;
