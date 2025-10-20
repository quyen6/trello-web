import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import styled from "@emotion/styled";
import { ArrowForwardIos } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectorCurrentUser } from "~/redux/user/userSlice";

const style = {
  position: "absolute",
  top: (theme) => theme.trello.introductionHeaderHeight,
  left: 0,
  // transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: "0 1rem 1rem",
  zIndex: 2,
};
const MobileModalHeader = ({ mobileHeader, setMobileHeader }) => {
  const user = useSelector(selectorCurrentUser);
  const toggleDrawer = (newOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setMobileHeader(newOpen);
  };
  return (
    <Box
      sx={{
        height: (theme) => theme.trello.mobileIntroductionContentHeight,
        display: "flex",
        alignItems: "stretch",
      }}
    >
      {/* <Modal
        disableScrollLock
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={mobileHeader}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={mobileHeader}>
          <Box sx={style}>
            <Box
              sx={{
                borderTop: "1px solid rgb(223, 225, 230)",
              }}
            >
              alo
            </Box>
            <Box>alo</Box>
            <Box>alo</Box>
            <Box>alo</Box>
            <Box>alo</Box>
            <Box>alo</Box>
          </Box>
        </Fade>
      </Modal> */}
      <Drawer anchor="top" open={mobileHeader} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: "auto",
            marginTop: (theme) => theme.trello.introductionHeaderHeight,
            height: "100vh",
            bgcolor: "#fff",
          }}
          role="presentation"
        >
          <List
            sx={{
              padding: "0 1rem 1rem",
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            <Box>
              {["Inbox", "Starred", "Send email", "Drafts"].map(
                (text, index) => (
                  <Box key={index}>
                    <Divider
                      sx={{
                        borderColor: "rgba(0,0,0,0.12)",
                      }}
                    />
                    <ListItem
                      key={text}
                      sx={{
                        padding: 0,
                      }}
                    >
                      <ListItemButton
                        sx={{
                          paddingX: 0,
                          paddingY: 2,
                        }}
                      >
                        <ListItemText
                          primary={text}
                          sx={{
                            "& span": {
                              fontSize: "1.2rem !important",
                              color: (theme) => theme.trello.textColorPrimary,
                            },
                          }}
                        />
                        <ListItemIcon
                          sx={{
                            minWidth: "35px",
                          }}
                        >
                          <ArrowForwardIos
                            fontSize="1rem"
                            sx={{ color: "rgba(0,0,0,0.54)" }}
                          />
                        </ListItemIcon>
                      </ListItemButton>
                    </ListItem>
                  </Box>
                )
              )}
              <Divider />
            </Box>
            {!user ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column-reverse",
                  height: "100%",
                  gap: 1.5,
                }}
              >
                {/* Login */}

                <Link to="/login">
                  <Box
                    sx={{
                      height: "100%",
                      padding: "1rem",
                      fontSize: "1.2rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: (theme) => theme.trello.textColorPrimary,
                      border: "1px solid",
                      borderColor: (theme) => theme.trello.subColorLight,
                    }}
                  >
                    Login
                  </Box>
                </Link>

                {/* Free */}
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "1rem",
                    fontSize: "1.2rem",
                    transition: "all 0.3s linear",
                    bgcolor: (theme) => theme.trello.subColorLight,
                    color: (theme) => theme.trello.mainColorDark,
                    "&:hover": { bgcolor: "#017273", cursor: "pointer" },
                  }}
                >
                  <Link to="/register" sx={{ display: "block" }}>
                    <Box
                      sx={{
                        color: "white",
                      }}
                    >
                      Get Trello for free
                    </Box>
                  </Link>
                </Box>
              </Box>
            ) : (
              <Box
                component={Link}
                to="/boards"
                sx={{
                  height: "100%",
                  padding: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "#024647",
                  fontSize: "1.2rem",
                  transition: "all 0.3s linear",
                  color: "white",
                  textDecoration: "none",
                  border: "1px solid",
                  borderColor: (theme) => theme.trello.subColorLight,
                  "&:hover": {
                    opacity: 0.9,
                    cursor: "pointer",
                  },
                }}
              >
                Go to your board
              </Box>
            )}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default MobileModalHeader;
