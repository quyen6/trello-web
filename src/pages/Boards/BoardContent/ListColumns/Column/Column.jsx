import { useState } from "react";
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
import { useConfirm } from "material-ui-confirm";
import {
  createNewCardAPI,
  deleteColumnDetailsAPI,
  updateColumnDetailsAPI,
} from "~/apis";
import { cloneDeep } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  selectorCurrentActiveBoard,
  updateCurrentActiveBoard,
} from "~/redux/activeBoard/activeBoardSlice";
import ToggleFocusInput from "~/components/Form/ToggleFocusInput";
import { usePermission } from "~/customHooks/usePermission";
import { ROLE_USER } from "~/utils/constants";
import { permission } from "~/config/rbacConfig";
import { selectorCurrentUser } from "~/redux/user/userSlice";
import { socketIoInstane } from "~/socketClient";

const Column = (props) => {
  const { column } = props;
  // console.log("🚀 ~ Column ~ column:", column);
  const currentUser = useSelector(selectorCurrentUser);
  const dispatch = useDispatch();
  // Không dùng State của component nữa mà chuyển qua State của Redux
  const board = useSelector(selectorCurrentActiveBoard);
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

  const addNewCard = async () => {
    if (!newCardTitle) {
      toast.error("Please enter Card Title!", { position: "bottom-right" });

      return;
    }
    const newCardData = {
      title: newCardTitle,
      columnId: column._id,
    };
    // Gọi API tạo mới Card và làm lại dữ liệu State Board
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id,
    });

    // Cập nhật lại state board
    //Tương tự createNewColumn dùng cloneDeep
    const newBoard = cloneDeep(board);
    const columnToUpdate = newBoard.columns.find(
      (c) => c._id === createdCard.columnId
    );
    if (columnToUpdate) {
      // Nếu column rỗng bản chất là đang chứa một cái Placeholder card
      if (columnToUpdate.cards.some((c) => c.FE_PlaceholderCard)) {
        columnToUpdate.cards = [createdCard];
        columnToUpdate.cardOrderIds = [createdCard._id];
      } else {
        // Ngược lại Column đã có data thì push vào cuối mảng
        columnToUpdate.cards.push(createdCard);
        columnToUpdate.cardOrderIds.push(createdCard._id);
      }
    }

    dispatch(updateCurrentActiveBoard(newBoard));
    socketIoInstane.emit("FE_CREATE_NEW_CARD", newBoard);
    // Đóng lại trạng thái thêm Card mới và Clear Input
    toggleOpenNewCardForm();
    setNewCardTitle("");
  };

  // Xử lý xóa 1 Column và Cards
  const confirmDeleteColumn = useConfirm();
  const handleDeleteColumn = async () => {
    confirmDeleteColumn({
      title: "Delete Column?",
      description:
        "This action will permanently delete yout Column and its Cards! Are you sure?",
      // có thể ghi đè
      // allowClose: false,
      // confirmationText: "OK",
      // cancellationText: "CANCLE",
      // confirmationButtonProps: { color: "error", variant: "outlined" },
      // cancellationButtonProps: { color: "inherit" },
    })
      .then(async () => {
        const newBoard = { ...board };
        newBoard.columns = newBoard.columns.filter((c) => c._id !== column._id);
        newBoard.columnOrderIds = newBoard.columnOrderIds.filter(
          (_id) => _id !== column._id
        );
        dispatch(updateCurrentActiveBoard(newBoard));
        socketIoInstane.emit("FE_DELETE_COLUMN", newBoard);
        await deleteColumnDetailsAPI(column._id).then((res) => {
          toast.success(res?.deleteResult);
        });
      })
      .catch(() => {});
  };

  const onUpdateColumnTitle = (newTitle) => {
    // Gọi API update Column và xử lý dữ liệu board trong redux
    updateColumnDetailsAPI(column._id, { title: newTitle }).then(() => {
      const newBoard = cloneDeep(board);
      const columnToUpdate = newBoard.columns.find((c) => c._id === column._id);
      if (columnToUpdate) {
        columnToUpdate.title = newTitle;
      }
      // setBoard(newBoard);
      dispatch(updateCurrentActiveBoard(newBoard));
    });
  };
  // Xử lý phân quyền
  const userRole = board.memberIds.find(
    (m) => m.userId === currentUser._id
  )?.role;
  const { hasPermission } = usePermission(userRole);
  return (
    // Bọc div ngoài cùng đẻ fix lỗi lúc kéo column ngắn qua 1 column dài
    <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: "300px",
          maxWidth: "300px",
          bgcolor: (theme) =>
            theme.palette.mode === "dark"
              ? theme.trello.subColorDark
              : "#bae2e2",
          color: (theme) => theme.trello.textColorLightDark(theme),
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
          <ToggleFocusInput
            value={column?.title}
            onChangedValue={onUpdateColumnTitle}
            data-no-dnd="true"
            readOnly={!hasPermission(permission.UPDATE_COLUMN)}
          />
          <Box>
            <Tooltip title="More options">
              <KeyboardArrowDownIcon
                sx={{
                  cursor: "pointer",
                  color: (theme) => theme.trello.textColorLightDark(theme),
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
              onClick={handleClose}
              aria-hidden="false"
              disableRestoreFocus
              slotProps={{
                list: {
                  "aria-labelledby": "basic-column-dropdown",
                },
              }}
            >
              <MenuItem
                sx={{
                  ":hover": {
                    color: "success.light",
                    "& .add-card-icon": {
                      color: "success.light",
                    },
                  },
                }}
                onClick={() => {
                  toggleOpenNewCardForm();
                }}
              >
                <ListItemIcon>
                  <AddCardIcon className="add-card-icon" fontSize="small" />
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
              <MenuItem
                sx={{
                  ":hover": {
                    color: "error.light",
                    "& .delete-icon": {
                      color: "error.light",
                    },
                  },
                }}
                onClick={() => handleDeleteColumn()}
              >
                <ListItemIcon>
                  <DeleteIcon className="delete-icon" fontSize="small" />
                </ListItemIcon>
                <ListItemText>Delete this column</ListItemText>
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
        <ListCards cards={orderedCards} />

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
                    color: (theme) =>
                      theme.palette.mode === "dark" ? "white" : "",
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
                          color: (theme) =>
                            theme.trello.textColorLightDark(theme),
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
                        color: colorTextMain,
                      }}
                    /> */}
                    </InputAdornment>
                  ),
                }}
                sx={{
                  minWidth: 100,
                  "& label": {
                    color: (theme) => theme.trello.textColorLightDark(theme),
                  },
                  "& input": {
                    color: (theme) => theme.trello.textColorLightDark(theme),
                  },
                  "& label.Mui-focused": {
                    color: (theme) => theme.trello.textColorLightDark(theme),
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: (theme) =>
                        theme.palette.mode === "dark"
                          ? "#ffffff3d"
                          : (theme) => theme.trello.subColorLight,
                      // borderWidth: "0.5px !important",
                    },
                    "&:hover fieldset": {
                      borderColor: (theme) =>
                        theme.palette.mode === "dark"
                          ? "#ffffff3d"
                          : (theme) => theme.trello.subColorLight,
                      // borderWidth: "1px !important",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: (theme) =>
                        theme.palette.mode === "dark"
                          ? "#ffffff3d"
                          : (theme) => theme.trello.subColorLight,
                      // borderWidth: "1px !important",
                    },
                  },
                }}
              />
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Button
                  className="interceptor-loading"
                  onClick={() => addNewCard()}
                  variant="contained"
                  size="small"
                  sx={{
                    boxShadow: "none",
                    border: " 0.5px solid #ffffff3d",
                    bgcolor: (theme) =>
                      theme.palette.mode === "dark"
                        ? "#34495e"
                        : (theme) => theme.trello.subColorLight,
                  }}
                >
                  Add
                </Button>
                <CloseIcon
                  onClick={toggleOpenNewCardForm}
                  sx={{
                    color: (theme) => theme.trello.textColorLightDark(theme),
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
