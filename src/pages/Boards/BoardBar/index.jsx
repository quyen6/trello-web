import { Button, Chip, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PublicIcon from "@mui/icons-material/Public";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import FilterListIcon from "@mui/icons-material/FilterList";

import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
const MENU_STYLES = {
  color: "primary.main",
  backgroundColor: "white",
  border: "none",
  paddingX: "5px",
  borderRadius: "4px",
  "& .MuiSvgIcon-root": {
    color: "primary.main",
  },
  "&:hover": {
    backgroundColor: "primary.50",
  },
};
const BoardBar = () => {
  return (
    <Box
      px={2}
      sx={{
        // backgroundColor: "primary.dark",
        width: "100%",
        height: (theme) => theme.trello.boardBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        overflowX: "auto",
        borderTop: "1px solid #00bfa5",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label="Quinn MERN Stack Board"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<PublicIcon />}
          label="Public/Private Workspace"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<ElectricBoltIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label="Filters"
          clickable
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Button variant="outlined" startIcon={<PersonAddAlt1Icon />}>
          Invite
        </Button>
        <AvatarGroup
          max={3}
          sx={{
            "& .MuiAvatar-root": {
              width: 34,
              height: 34,
              fontSize: 16,
            },
          }}
        >
          <Tooltip title="miquyen">
            <Avatar
              alt="myquyen"
              src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/516556923_710968314904015_8095573414336475991_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeG3VMEUxqey5vc4BwHXtXbW5lRgVodcipfmVGBWh1yKlz5E9E1h87sA1m0JiAaiXngpIp8AXvrd88xnbIaY8Cvx&_nc_ohc=-sfmFYNc8mIQ7kNvwHm9-Sb&_nc_oc=AdnyZ3qzOWQWcAgFop4gl_RL0bnrUy6lsXqdJlyolred_XazSO99UcsbLGAnSUYdKHcANyKBziu3dxSLNfJ49zqx&_nc_zt=23&_nc_ht=scontent.fsgn5-10.fna&_nc_gid=_cq3ZpaT6LqKmpbGzovddg&oh=00_AfTI39rcCRBZPg1_Aev5UdAfEDVrMwOW4FiijB4eiPXEEA&oe=68861220"
            />
          </Tooltip>
          <Tooltip title="miquyen">
            <Avatar
              alt="myquyen"
              src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/516556923_710968314904015_8095573414336475991_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeG3VMEUxqey5vc4BwHXtXbW5lRgVodcipfmVGBWh1yKlz5E9E1h87sA1m0JiAaiXngpIp8AXvrd88xnbIaY8Cvx&_nc_ohc=-sfmFYNc8mIQ7kNvwHm9-Sb&_nc_oc=AdnyZ3qzOWQWcAgFop4gl_RL0bnrUy6lsXqdJlyolred_XazSO99UcsbLGAnSUYdKHcANyKBziu3dxSLNfJ49zqx&_nc_zt=23&_nc_ht=scontent.fsgn5-10.fna&_nc_gid=_cq3ZpaT6LqKmpbGzovddg&oh=00_AfTI39rcCRBZPg1_Aev5UdAfEDVrMwOW4FiijB4eiPXEEA&oe=68861220"
            />
          </Tooltip>
          <Tooltip title="miquyen">
            <Avatar
              alt="myquyen"
              src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/516556923_710968314904015_8095573414336475991_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeG3VMEUxqey5vc4BwHXtXbW5lRgVodcipfmVGBWh1yKlz5E9E1h87sA1m0JiAaiXngpIp8AXvrd88xnbIaY8Cvx&_nc_ohc=-sfmFYNc8mIQ7kNvwHm9-Sb&_nc_oc=AdnyZ3qzOWQWcAgFop4gl_RL0bnrUy6lsXqdJlyolred_XazSO99UcsbLGAnSUYdKHcANyKBziu3dxSLNfJ49zqx&_nc_zt=23&_nc_ht=scontent.fsgn5-10.fna&_nc_gid=_cq3ZpaT6LqKmpbGzovddg&oh=00_AfTI39rcCRBZPg1_Aev5UdAfEDVrMwOW4FiijB4eiPXEEA&oe=68861220"
            />
          </Tooltip>
          <Tooltip title="miquyen">
            <Avatar
              alt="myquyen"
              src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/516556923_710968314904015_8095573414336475991_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeG3VMEUxqey5vc4BwHXtXbW5lRgVodcipfmVGBWh1yKlz5E9E1h87sA1m0JiAaiXngpIp8AXvrd88xnbIaY8Cvx&_nc_ohc=-sfmFYNc8mIQ7kNvwHm9-Sb&_nc_oc=AdnyZ3qzOWQWcAgFop4gl_RL0bnrUy6lsXqdJlyolred_XazSO99UcsbLGAnSUYdKHcANyKBziu3dxSLNfJ49zqx&_nc_zt=23&_nc_ht=scontent.fsgn5-10.fna&_nc_gid=_cq3ZpaT6LqKmpbGzovddg&oh=00_AfTI39rcCRBZPg1_Aev5UdAfEDVrMwOW4FiijB4eiPXEEA&oe=68861220"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  );
};

export default BoardBar;
