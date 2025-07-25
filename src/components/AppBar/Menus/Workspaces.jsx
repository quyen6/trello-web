import { useState, useRef } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Box,
  Divider,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@mui/material";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import Cloud from "@mui/icons-material/Cloud";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
const Workspaces = (props) => {
  const { isLg1024, isMdDown } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const buttonRef = useRef(); // 🔧 Dùng để khôi phục focus khi đóng Menu

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        sx={{
          color: "white",
        }}
        ref={buttonRef}
        id="basic-button-workspaces"
        aria-controls={open ? "basic-menu-workspaces" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={isLg1024 || !isMdDown ? <KeyboardArrowDownIcon /> : null}
      >
        {isLg1024 || isMdDown ? "Workspaces" : <WorkspacesIcon />}
      </Button>

      {isMdDown && (
        <Menu
          id="basic-menu-workspaces"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            list: {
              "aria-labelledby": "basic-button-workspaces",
            },
          }}
          MenuListProps={{
            autoFocus: false, // ⛔ Ngăn menu tự động lấy focus
          }}
        >
          <MenuItem>
            <ListItemIcon>
              <ContentCut fontSize="small" />
            </ListItemIcon>
            <ListItemText>Cut</ListItemText>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              ⌘X
            </Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentCopy fontSize="small" />
            </ListItemIcon>
            <ListItemText>Copy</ListItemText>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              ⌘C
            </Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentPaste fontSize="small" />
            </ListItemIcon>
            <ListItemText>Paste</ListItemText>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              ⌘V
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <Cloud fontSize="small" />
            </ListItemIcon>
            <ListItemText>Web Clipboard</ListItemText>
          </MenuItem>
        </Menu>
      )}
    </Box>
  );
};

export default Workspaces;
