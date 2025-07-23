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
  useMediaQuery,
} from "@mui/material";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import Cloud from "@mui/icons-material/Cloud";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Workspaces = () => {
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const [anchorEl, setAnchorEl] = useState(null);
  const buttonRef = useRef(); // 🔧 Dùng để khôi phục focus khi đóng Menu

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setTimeout(() => {
      buttonRef.current?.focus(); // 🔁 Trả focus về nút sau khi Menu đóng
    }, 150);
  };

  return (
    <Box>
      <Button
        ref={buttonRef}
        id="basic-button-workspaces"
        aria-controls={open ? "basic-menu-workspaces" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={isMdUp ? <KeyboardArrowDownIcon /> : null}
      >
        Workspaces
      </Button>

      {isMdUp && (
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
