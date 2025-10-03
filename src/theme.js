import { createTheme } from "@mui/material/styles";

const APP_BAR_HEIGHT = "58px";
const INTRODUCTION_HEADER_HEIGHT = "56px";
const BOARD_BAR_HEIGHT = "60px";
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`;
const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTER_HEIGHT = "56px";
const MAIN_COLOR_LIGHT = "rgb(0, 134, 137)";
const SUB_COLOR_LIGHT = "#01a3a4";
const MAIN_COLOR_DARK = "#fff";
const SUB_COLOR_DARK = "#1c2a4094";
const TEXT_COLOR_PRIMARY = "#091e42";
//
const MOBILE_INTRODUCTION_CONTENT_HEIGHT = `calc(100vh - ${INTRODUCTION_HEADER_HEIGHT})`;
const TEXT_COLOR_LIGHT_DARK = (theme) =>
  theme.palette.mode === "dark"
    ? theme.trello.mainColorDark
    : theme.trello.textColorPrimary;
const theme = createTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    introductionHeaderHeight: INTRODUCTION_HEADER_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT,
    mainColorLight: MAIN_COLOR_LIGHT,
    subColorLight: SUB_COLOR_LIGHT,
    mainColorDark: MAIN_COLOR_DARK,
    subColorDark: SUB_COLOR_DARK,
    textColorPrimary: TEXT_COLOR_PRIMARY,
    textColorLightDark: TEXT_COLOR_LIGHT_DARK,
    //
    mobileIntroductionContentHeight: MOBILE_INTRODUCTION_CONTENT_HEIGHT,
  },
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        background: {
          body: "#ffffff", // màu nền chung
        },
        text: {
          primary: "#212121",
          secondary: "#555",
        },
        color: {
          primary: "rgb(0, 134, 137)",
          secondary: "#bae2e2",
          third: "#01a3a4",
        },
      },
    },
    dark: {
      palette: {
        mode: "dark",
        background: {
          body: "#34495e", // màu nền chung
        },
        text: {
          primary: "#ffffff",
        },
        color: {
          primary: "#1c2a40",
          secondary: "",
        },
      },
    },
  },

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
            backgroundColor: "#eee",
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
    MuiTypography: {
      styleOverrides: {
        root: {
          "&.MuiTypography-body1": {
            fontSize: "0.875rem",
          },
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
