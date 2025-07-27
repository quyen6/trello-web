import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ContentCut from "@mui/icons-material/ContentCut";
import DeleteIcon from "@mui/icons-material/Delete";
import Cloud from "@mui/icons-material/Cloud";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddCardIcon from "@mui/icons-material/AddCard";
import { Button, Tooltip } from "@mui/material";
import ContentPaste from "@mui/icons-material/ContentPaste";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import GroupIcon from "@mui/icons-material/Group";
import AttachmentIcon from "@mui/icons-material/Attachment";
import ModeCommentIcon from "@mui/icons-material/ModeComment";

const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTER_HEIGHT = "56px";

const BoardContent = (props) => {
  const { resolvedMode } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: (theme) => theme.trello.boardContentHeight,
        backgroundColor: resolvedMode === "dark" ? "#34495e" : "#f5f7fa",
        p: "10px 0",
      }}
    >
      <Box
        sx={{
          bgcolor: "inherit",
          width: "100%",
          height: "100%",
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          "&::-webkit-scrollbar-track": { m: 2 },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: resolvedMode === "dark" ? "#eee" : "#01a3a4",
          },
        }}
      >
        {/* Box Column 01*/}
        <Box
          sx={{
            minWidth: "300px",
            maxWidth: "300px",
            bgcolor: resolvedMode === "dark" ? "#1c2a4094" : "#bae2e2",
            color: resolvedMode === "dark" ? "white" : "#000",
            ml: 2,
            borderRadius: "6px",
            height: "fit-content",
            maxHeight: (theme) =>
              `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`,
          }}
        >
          {/* Column Header */}
          <Box
            sx={{
              height: COLUMN_HEADER_HEIGHT,
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: "pointer",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                maxWidth: "85%",
              }}
              component="div"
            >
              Column Title
            </Typography>
            <Box>
              <Tooltip title="More options">
                <KeyboardArrowDownIcon
                  sx={{
                    cursor: "pointer",
                    color: resolvedMode === "dark" ? "white" : "#000",
                  }}
                  id="basic-column-dropdown"
                  aria-controls={
                    open ? "basic-menu-column-dropdown" : undefined
                  }
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                />
              </Tooltip>

              <Menu
                id="basic-menu-column-dropdown"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                aria-hidden="false"
                slotProps={{
                  list: {
                    "aria-labelledby": "basic-column-dropdown",
                  },
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AddCardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCut fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentPaste fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Cloud fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          {/* List Card */}
          <Box
            sx={{
              p: "0 5px",
              m: "0 5px",
              display: "flex",
              flexDirection: "column",
              gap: 1,
              overflowX: "hidden",
              overflowY: "auto",
              maxHeight: (theme) =>
                `calc(${theme.trello.boardContentHeight} - 
              ${theme.spacing(5)} - 
              ${COLUMN_HEADER_HEIGHT} - 
              ${COLUMN_FOOTER_HEIGHT})`,
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: resolvedMode === "dark" ? "#eee" : "#01a3a4",
              },
            }}
          >
            <Card
              sx={{
                cursor: "pointer",
                // boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                overflow: "unset",
              }}
            >
              <CardMedia
                sx={{ height: 140 }}
                image="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/516556923_710968314904015_8095573414336475991_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeG3VMEUxqey5vc4BwHXtXbW5lRgVodcipfmVGBWh1yKlz5E9E1h87sA1m0JiAaiXngpIp8AXvrd88xnbIaY8Cvx&_nc_ohc=-sfmFYNc8mIQ7kNvwHm9-Sb&_nc_oc=AdnyZ3qzOWQWcAgFop4gl_RL0bnrUy6lsXqdJlyolred_XazSO99UcsbLGAnSUYdKHcANyKBziu3dxSLNfJ49zqx&_nc_zt=23&_nc_ht=scontent.fsgn5-10.fna&_nc_gid=_cq3ZpaT6LqKmpbGzovddg&oh=00_AfTI39rcCRBZPg1_Aev5UdAfEDVrMwOW4FiijB4eiPXEEA&oe=68861220"
                title="green iguana"
              />
              <CardContent
                sx={{
                  p: 1.5,
                  "&:last-child": {
                    p: 1.5,
                  },
                }}
              >
                <Typography>MiQuyen</Typography>
              </CardContent>
              <CardActions sx={{ p: "0 4px 8px 4px" }}>
                <Button size="small" startIcon={<GroupIcon />}>
                  20
                </Button>
                <Button size="small" startIcon={<ModeCommentIcon />}>
                  15
                </Button>
                <Button size="small" startIcon={<AttachmentIcon />}>
                  10
                </Button>
              </CardActions>
            </Card>
            <Card
              sx={{
                cursor: "pointer",
                // boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                overflow: "unset",
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  "&:last-child": {
                    p: 1.5,
                  },
                }}
              >
                <Typography>Card 1</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: "pointer",
                // boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                overflow: "unset",
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  "&:last-child": {
                    p: 1.5,
                  },
                }}
              >
                <Typography>Card 1</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: "pointer",
                // boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                overflow: "unset",
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  "&:last-child": {
                    p: 1.5,
                  },
                }}
              >
                <Typography>Card 1</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: "pointer",
                // boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                overflow: "unset",
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  "&:last-child": {
                    p: 1.5,
                  },
                }}
              >
                <Typography>Card 1</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: "pointer",
                // boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                overflow: "unset",
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  "&:last-child": {
                    p: 1.5,
                  },
                }}
              >
                <Typography>Card 1</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: "pointer",
                // boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                overflow: "unset",
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  "&:last-child": {
                    p: 1.5,
                  },
                }}
              >
                <Typography>Card 1</Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Column Footer */}
          <Box
            sx={{
              height: COLUMN_FOOTER_HEIGHT,
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              sx={{
                "&.MuiButton-text": {
                  color: resolvedMode === "dark" ? "white" : "",
                },
              }}
              startIcon={<AddCardIcon />}
            >
              Add new card
            </Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ cursor: "pointer" }} />
            </Tooltip>
          </Box>
        </Box>
        {/* Box Column 02 */}
        <Box
          sx={{
            minWidth: "300px",
            maxWidth: "300px",
            bgcolor: resolvedMode === "dark" ? "#1c2a4094" : "#bae2e2",
            color: resolvedMode === "dark" ? "white" : "#000",
            ml: 2,
            borderRadius: "6px",
            height: "fit-content",
            maxHeight: (theme) =>
              `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`,
          }}
        >
          {/* Column Header */}
          <Box
            sx={{
              height: COLUMN_HEADER_HEIGHT,
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: "pointer",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                maxWidth: "85%",
              }}
              component="div"
            >
              Column Title
            </Typography>
            <Box>
              <Tooltip title="More options">
                <KeyboardArrowDownIcon
                  sx={{
                    color: resolvedMode === "dark" ? "white" : "#000",
                    cursor: "pointer",
                  }}
                  id="basic-column-dropdown"
                  aria-controls={
                    open ? "basic-menu-column-dropdown" : undefined
                  }
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                />
              </Tooltip>

              <Menu
                id="basic-menu-column-dropdown"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                aria-hidden="false"
                slotProps={{
                  list: {
                    "aria-labelledby": "basic-column-dropdown",
                  },
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AddCardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCut fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentPaste fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Cloud fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          {/* List Card */}
          <Box
            sx={{
              p: "0 5px",
              m: "0 5px",
              display: "flex",
              flexDirection: "column",
              gap: 1,
              overflowX: "hidden",
              overflowY: "auto",
              maxHeight: (theme) =>
                `calc(${theme.trello.boardContentHeight} - 
              ${theme.spacing(5)} - 
              ${COLUMN_HEADER_HEIGHT} - 
              ${COLUMN_FOOTER_HEIGHT})`,
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: resolvedMode === "dark" ? "#eee" : "#01a3a4",
              },
            }}
          >
            <Card
              sx={{
                cursor: "pointer",
                // boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                overflow: "unset",
              }}
            >
              <CardMedia
                sx={{ height: 140 }}
                image="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/516556923_710968314904015_8095573414336475991_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeG3VMEUxqey5vc4BwHXtXbW5lRgVodcipfmVGBWh1yKlz5E9E1h87sA1m0JiAaiXngpIp8AXvrd88xnbIaY8Cvx&_nc_ohc=-sfmFYNc8mIQ7kNvwHm9-Sb&_nc_oc=AdnyZ3qzOWQWcAgFop4gl_RL0bnrUy6lsXqdJlyolred_XazSO99UcsbLGAnSUYdKHcANyKBziu3dxSLNfJ49zqx&_nc_zt=23&_nc_ht=scontent.fsgn5-10.fna&_nc_gid=_cq3ZpaT6LqKmpbGzovddg&oh=00_AfTI39rcCRBZPg1_Aev5UdAfEDVrMwOW4FiijB4eiPXEEA&oe=68861220"
                title="green iguana"
              />
              <CardContent
                sx={{
                  p: 1.5,
                  "&:last-child": {
                    p: 1.5,
                  },
                }}
              >
                <Typography>MiQuyen</Typography>
              </CardContent>
              <CardActions sx={{ p: "0 4px 8px 4px" }}>
                <Button size="small" startIcon={<GroupIcon />}>
                  20
                </Button>
                <Button size="small" startIcon={<ModeCommentIcon />}>
                  15
                </Button>
                <Button size="small" startIcon={<AttachmentIcon />}>
                  10
                </Button>
              </CardActions>
            </Card>
            <Card
              sx={{
                cursor: "pointer",
                // boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                overflow: "unset",
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  "&:last-child": {
                    p: 1.5,
                  },
                }}
              >
                <Typography>Card 1</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: "pointer",
                // boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                overflow: "unset",
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  "&:last-child": {
                    p: 1.5,
                  },
                }}
              >
                <Typography>Card 1</Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Column Footer */}
          <Box
            sx={{
              height: COLUMN_FOOTER_HEIGHT,
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              sx={{
                "&.MuiButton-text": {
                  color: resolvedMode === "dark" ? "white" : "",
                },
              }}
              startIcon={<AddCardIcon />}
            >
              Add new card
            </Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ cursor: "pointer" }} />
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BoardContent;
