import { extendTheme } from "@mui/material/styles";
const theme = extendTheme({
  trello: {
    appBarHeight: "58px",
    boardBarHeight: "60px",
  },
  // colorSchemes: {
  //   light: {
  //     palette: {
  //       mode: "light",
  //     },
  //   },
  //   dark: {
  //     palette: {
  //       mode: "dark",
  //     },
  //   },
  // },
  colorSchemeSelector: "class",

  // ... other properties
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: "none",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "*::-webkit-scrollbar": {
            width: 6,
            height: 6,
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "#95afc0",
            borderRadius: 4,
          },
          "*::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#999999",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",

          "& fieldset": {
            borderWidth: "1px !important",
          },
          "&:hover fieldset": {
            borderWidth: "2px !important",
          },
          "&.Mui-focused fieldset": {
            borderWidth: "2px !important",
          },
        },
      },
    },
  },
});

export default theme;
