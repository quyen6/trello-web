import Box from "@mui/material/Box";
import ModeSwitcher from "../ModeSwitcher";
import AppsIcon from "@mui/icons-material/Apps";
import TrelloIcon from "~/assets/trello.svg?react";

import SvgIcon from "@mui/material/SvgIcon";
import {
  Button,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Workspaces from "./Menus/Workspaces";
import Recent from "./Menus/Recent";
import Templates from "./Menus/Templates";
import Starred from "./Menus/Starred";

import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Profile from "./Menus/Profile";
import MobileMenuDrawer from "./Menus/MobileMenuDrawer";
import { useState } from "react";
const AppBar = () => {
  const [open, setOpen] = useState(false);
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
        overflowX: "auto",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <AppsIcon
          onClick={() => setOpen(true)}
          sx={{ display: { xs: "block", md: "none" }, color: "primary.main" }}
          size="small"
        />
        <MobileMenuDrawer open={open} setOpen={setOpen} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <SvgIcon
            component={TrelloIcon}
            inheritViewBox
            fontSize={!isMdDown === true ? "large" : "small"}
            sx={{ color: "primary.main" }}
          />
          <Typography
            variant="span"
            sx={{
              fontSize: { xs: "1.2rem", md: "1.4rem" },
              fontWeight: "bold",
              color: "primary.main",
            }}
          >
            Trello
          </Typography>
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 1,
          }}
        >
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
          <Button variant="outlined">Create</Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <TextField
          id="outlined-search"
          label="Search..."
          type="search"
          size="small"
          sx={{ minWidth: 100 }}
        />
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            gap: 1,
          }}
        >
          <ModeSwitcher />
          <Tooltip title="Notifications">
            <Badge color="error" variant="dot" sx={{ cursor: "pointer" }}>
              <NotificationsNoneIcon sx={{ color: "primary.main" }} />
            </Badge>
          </Tooltip>
          <Tooltip title="Help">
            <HelpOutlineIcon
              sx={{ cursor: "pointer", color: "primary.main" }}
            />
          </Tooltip>
        </Box>
        <Profile />
      </Box>
    </Box>
  );
};

export default AppBar;
