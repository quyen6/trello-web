import { useState } from "react";
import ModeSwitcher from "../ModeSwitcher/ModeSwitcher";

import Profile from "./Menus/Profile";
import MobileMenuDrawer from "./Menus/MobileMenuDrawer";
import TrelloIcon from "~/assets/trello.svg?react";

import SvgIcon from "@mui/material/SvgIcon";
import { Button, Tooltip, Typography, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import Notifications from "./Notifications/Notifications";
import AutoCompleteSearchBoard from "./SearchBoards/AutoCompleteSearchBoard";

const AppBar = (props) => {
  const { resolvedMode } = props;
  const [open, setOpen] = useState(false);
  const isLg1024 = useMediaQuery("(min-width:1024px)");
  const isMdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));
  return (
    <Box
      px={2}
      sx={{
        // backgroundColor: "primary.light",
        width: "100%",
        height: (theme) => theme.trello.appBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        // overflowX: "auto",
        backgroundColor:
          resolvedMode === "dark"
            ? "#1c2a40"
            : (theme) => theme.trello.mainColorLight,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <MenuIcon
          onClick={() => setOpen(true)}
          sx={{
            display: { xs: "block", md: "none" },
            color: "white",
            cursor: "pointer",
          }}
          size="large"
        />
        <MobileMenuDrawer
          open={open}
          setOpen={setOpen}
          resolvedMode={resolvedMode}
          isMdDown={isMdDown}
        />
        <Link to="/boards">
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <SvgIcon
              component={TrelloIcon}
              inheritViewBox
              fontSize="medium"
              sx={{ color: "white" }}
            />
            <Typography
              variant="span"
              sx={{
                fontSize: "1.4rem",
                fontWeight: "bold",
                color: "white",
              }}
            >
              Trello
            </Typography>
          </Box>
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <AutoCompleteSearchBoard />
      </Box>
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          alignItems: "center",
          gap: 1,
        }}
      >
        {/* Dark-Light Mode */}
        <ModeSwitcher />
        {/* xử lý hiển thị notifications */}
        <Notifications />
        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ cursor: "pointer", color: "white" }} />
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  );
};

export default AppBar;
