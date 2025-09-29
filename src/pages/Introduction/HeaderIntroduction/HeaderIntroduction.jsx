import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import * as React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { useState } from "react";
import ModalHeader from "./ModalHeader";
import MobileModalHeader from "./MobileModalHeader";
import { useSelector } from "react-redux";
import { selectorCurrentUser } from "~/redux/user/userSlice";
import { useAuth0 } from "@auth0/auth0-react";
const HeaderIntroduction = ({
  boxShadowHeaderIntroduction,
  setBoxShadowHeaderIntroduction,
}) => {
  // const user = useSelector(selectorCurrentUser);
  const { user } = useAuth0();
  // console.log("🚀 ~ HeaderIntroduction ~ user:", user);
  const [open, setOpen] = useState(null);
  const [value, setValue] = useState(false);
  const [mobileHeader, setMobileHeader] = useState(false);
  const { loginWithRedirect } = useAuth0();

  const handleOpen = (tabValue) => {
    setOpen(true);
    setValue(tabValue);
    setBoxShadowHeaderIntroduction(true);
  };
  const handleClose = () => {
    setOpen(false);
    setBoxShadowHeaderIntroduction(false);
    setValue(null);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const tabs = [
    { label: "Workspace", value: "1" },
    { label: "Templates", value: "2" },
    { label: "Recent", value: "3" },
    { label: "Starred", value: "4" },
  ];

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1301, // zIndex của Modal default là 1300 nên Box Header sẽ cao hơn
        height: (theme) => theme.trello.introductionHeaderHeight,
        bgcolor: (theme) => theme.trello.mainColorDark,
        transition: "background-color 0.5s, box-shadow 0.5s",
        border: "none",
        display: "flex",
        alignItems: "center",
        "&:hover": {
          boxShadow: {
            md: "0 0.5rem 1rem rgba(9, 30, 66, 0.15)",
          },
        },
        boxShadow: boxShadowHeaderIntroduction
          ? "0 0.5rem 1rem rgba(9, 30, 66, 0.15)"
          : null,
      }}
    >
      <Box
        sx={{
          height: "100%",
          margin: "0 auto",
          maxWidth: "1320px",
          width: "100%",
          border: "none",
          display: "flex",
          alignItems: "stretch",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "stretch",
            height: "100%",
            justifyContent: "center",
          }}
        >
          {/* Icon */}
          <Link to="/" sx={{ height: "100%" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                padding: "0.5rem 1.5rem",
                height: "100%",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                Trello
              </Typography>
            </Box>
          </Link>

          {/* More */}
          <TabContext value={value}>
            <TabList
              sx={{
                height: "100%",
                "& .MuiButtonBase-root": {
                  padding: "0.5rem",
                },
                "& .MuiTabs-flexContainer": {
                  height: "100%",
                },
                "& .MuiTabs-indicator": {
                  bgcolor: "green",
                },
                display: {
                  xs: "none",
                  md: "flex",
                },
              }}
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.value}
                  disableRipple
                  label={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "1rem",
                      }}
                    >
                      {tab.label}

                      <KeyboardArrowDownIcon sx={{ fontSize: "1rem" }} />
                    </Box>
                  }
                  value={tab.value}
                  onClick={() => handleOpen(tab.value)}
                  sx={{
                    height: "100%",
                    color: value === tab.value ? "green" : "black",
                    fontWeight: 400,
                    transition: "color 0.3s linear",
                    bgcolor: "transparent",
                    textTransform: "none",
                    "& svg": {
                      color: value === tab.value ? "green" : "black",
                      transition: "color 0.3s linear",
                    },
                    "&.Mui-selected": {
                      color: "green",
                    },
                    "&:hover": {
                      color: "green",
                      "& svg": {
                        color: "green",
                      },
                    },
                  }}
                />
              ))}
            </TabList>
            <ModalHeader open={open} handleClose={handleClose} value={value} />
          </TabContext>
        </Box>

        {/* Login | Free | Go to */}
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "stretch",
          }}
        >
          {!user ? (
            <Box
              sx={{
                display: "flex",
              }}
            >
              {/* Login */}
              <Button
                onClick={() => loginWithRedirect()}
                disableRipple
                sx={{
                  height: "100%",
                  padding: "0.5rem 1.5rem",
                  fontSize: "1.2rem",
                  color: "#091e42",
                  "&:hover": {
                    bgcolor: "#fff",
                  },
                }}
              >
                Login
              </Button>

              {/* <Link to="/login">
                <Box
                  sx={{
                    height: "100%",
                    padding: "0.5rem 1.5rem",
                    fontSize: "1.2rem",
                    display: "flex",
                    alignItems: "center",
                    color: "#091e42",
                  }}
                >
                  Login
                </Box>
              </Link> */}

              {/* Free */}
              <Box
                onClick={() =>
                  loginWithRedirect({
                    authorizationParams: {
                      screen_hint: "signup", //  ép mở thẳng tab Sign up
                    },
                  })
                }
                sx={{
                  height: "100%",
                  display: {
                    xs: "none",
                    md: "flex",
                  },
                  alignItems: "center",
                  padding: "0.5rem 1.5rem",
                  fontSize: "1.2rem",
                  transition: "all 0.3s linear",
                  bgcolor: (theme) => theme.trello.subColorLight,
                  color: (theme) => theme.trello.mainColorDark,
                  "&:hover": { bgcolor: "#017273", cursor: "pointer" },
                }}
              >
                Get Trello for free
                {/* <Link to="/register" sx={{ display: "block" }}> */}
                {/* <Box
                    sx={{
                      color: "white",
                    }}
                  >
                    
                  </Box> */}
                {/* </Link> */}
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                height: "100%",
                display: {
                  xs: "none",
                  md: "flex",
                },
                alignItems: "center",
                padding: "0.5rem 1.5rem",
                bgcolor: "#024647",
                fontSize: "1.2rem",
                transition: "all 0.3s linear",
                "&:hover": {
                  opacity: 0.9,
                  cursor: "pointer",
                },
              }}
            >
              <Link to="/boards" sx={{ display: "block" }}>
                <Box
                  sx={{
                    color: "white",
                  }}
                >
                  Go to your board
                </Box>
              </Link>
            </Box>
          )}
        </Box>

        {/* Mobile Header */}
        <Box
          sx={{
            transition: "all 0.3s linear",
            "&:hover": {
              cursor: "pointer",
            },
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            padding: "0.5rem 1.5rem",
          }}
        >
          {!mobileHeader ? (
            <MenuIcon
              onClick={() => setMobileHeader(true)}
              sx={{
                color: "black",
                fontSize: "2.5rem",
                cursor: "pointer",
              }}
            />
          ) : (
            <CloseIcon
              onClick={() => setMobileHeader(false)}
              sx={{
                color: "black",
                fontSize: "2.5rem",
                cursor: "pointer",
              }}
            />
          )}
          <MobileModalHeader
            mobileHeader={mobileHeader}
            setMobileHeader={setMobileHeader}
            handleClose={() => setMobileHeader(false)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderIntroduction;
