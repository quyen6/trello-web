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

import ListCards from "./ListCards/ListCards";
import { mapOrder } from "~/utils/sorts";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
const Column = (props) => {
  const { resolvedMode, column } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column._id, data: { ...column } });

  // Fix bug: transform
  const dndKitColumnStyles = {
    // touchAction: "none", // Dành cho sensor default dạng PointerSensor
    transform: CSS.Translate.toString(transform),
    transition,
    // Chiều cao phải luôn max 100% vì nếu không sẽ lỗi lúc kéo column ngắn qua 1 column dài thì phải kéo ở khu vực giữa giữa rất khó chịu. Lúc này phải kết hợp {...listeners} nằm ở Box chứ k phải div ở ngoài cùng
    height: "100%",
    opacity: isDragging ? 0.5 : undefined,
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, "_id");

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openNewCardForm, setOpenNewCardForm] = useState(false);
  const toggleOpenNewCardForm = () => {
    setOpenNewCardForm(!openNewCardForm);
    setNewCardTitle("");
  };
  const [newCardTitle, setNewCardTitle] = useState("");
  const addNewCard = () => {
    if (!newCardTitle) {
      toast.error("Please enter Card Title!", { position: "bottom-right" });

      return;
    }
    // console.log(newCardTitle);
    // Gọi API ở đây

    // Đóng lại trạng thái thêm Card mới và Clear Input
    toggleOpenNewCardForm();
    setNewCardTitle("");
  };
  return (
    // Bọc div ngoài cùng đẻ fix lỗi lúc kéo column ngắn qua 1 column dài
    <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
      <Box
        {...listeners}
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
            height: (theme) => theme.trello.columnHeaderHeight,
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
            {column?.title}
          </Typography>
          <Box>
            <Tooltip title="More options">
              <KeyboardArrowDownIcon
                sx={{
                  cursor: "pointer",
                  color: resolvedMode === "dark" ? "white" : "#000",
                }}
                id="basic-column-dropdown"
                aria-controls={open ? "basic-menu-column-dropdown" : undefined}
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
        <ListCards resolvedMode={resolvedMode} cards={orderedCards} />

        {/* Column Footer */}
        <Box
          sx={{
            height: (theme) => theme.trello.columnFooterHeight,
            p: "8px 16px 16px 16px",
          }}
        >
          {!openNewCardForm ? (
            <Box
              sx={{
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
                onClick={toggleOpenNewCardForm}
              >
                Add new card
              </Button>
              <Tooltip title="Drag to move">
                <DragHandleIcon sx={{ cursor: "pointer" }} />
              </Tooltip>
            </Box>
          ) : (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <TextField
                label="Enter card title..."
                type="text"
                size="small"
                variant="outlined"
                autoFocus
                data-no-dnd="true"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        sx={{
                          color: resolvedMode === "dark" ? "white" : "#000",
                        }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {/* <HighlightOffIcon
                      sx={{
                        // color: searchValue ? "white" : "transparent",
                        fontSize: "medium",
                        cursor: "pointer",
                        color: resolvedMode === "dark" ? "white" : "#000",
                      }}
                    /> */}
                    </InputAdornment>
                  ),
                }}
                sx={{
                  minWidth: 100,
                  "& label": {
                    color: resolvedMode === "dark" ? "white" : "#000",
                  },
                  "& input": {
                    color: resolvedMode === "dark" ? "white" : "#000",
                  },
                  "& label.Mui-focused": {
                    color: resolvedMode === "dark" ? "white" : "#000",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor:
                        resolvedMode === "dark" ? "#ffffff3d" : "#01a3a4",
                      // borderWidth: "0.5px !important",
                    },
                    "&:hover fieldset": {
                      borderColor:
                        resolvedMode === "dark" ? "#ffffff3d" : "#01a3a4",
                      // borderWidth: "1px !important",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor:
                        resolvedMode === "dark" ? "#ffffff3d" : "#01a3a4",
                      // borderWidth: "1px !important",
                    },
                  },
                }}
              />
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Button
                  onClick={() => addNewCard()}
                  variant="contained"
                  size="small"
                  sx={{
                    boxShadow: "none",
                    border: " 0.5px solid #ffffff3d",
                    bgcolor: resolvedMode === "dark" ? "#34495e" : "#01a3a4",
                  }}
                >
                  Add
                </Button>
                <CloseIcon
                  onClick={toggleOpenNewCardForm}
                  sx={{
                    color: resolvedMode === "dark" ? "white" : "#000",
                    fontSize: "large",
                    cursor: "pointer",
                  }}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Column;
