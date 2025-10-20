import Box from "@mui/material/Box";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Button from "@mui/material/Button";
import Column from "./Column/Column";

import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { generatePlaceholderCard } from "~/utils/formatter";
import { createNewColumnAPI } from "~/apis";
import { cloneDeep } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCurrentActiveBoard,
  selectorCurrentActiveBoard,
} from "~/redux/activeBoard/activeBoardSlice";
import { socketIoInstane } from "~/socketClient";

const ListColumns = (props) => {
  const dispatch = useDispatch();
  // Không dùng State của component nữa mà chuyển qua State của Redux
  const board = useSelector(selectorCurrentActiveBoard);
  const { columns } = props;

  const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
  const toggleOpenNewColumnForm = () => {
    setOpenNewColumnForm(!openNewColumnForm);
    setNewColumnTitle("");
  };
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const addNewColumn = async () => {
    if (!newColumnTitle.trim()) {
      toast.error("Please enter Column Title!", { position: "bottom-left" });
      return; // không làm gì thêm
    }

    // Tạo dữ liệu Column để gọi API
    const newColumnData = {
      title: newColumnTitle,
    };
    //  Gọi API tạo mới Column và làm lại dữ liệu State Board
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id,
    });
    // Khi tạo mới Column thì nó sẽ chưa có Card, cần xử lý vấn đề kéo thả vào 1 column rỗng
    createdColumn.cards = [generatePlaceholderCard(createdColumn)];
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id];

    /**
     * Đoạn này sẽ dính lỗi object is not extensible bởi dù đã copy/clone ra giá tri newBoard nhưng bản chất của spread operator là Shallow Copy/Clone, nên dính phải rules Immutability trong Redux Toolkit không dùng được hàm PUSH (sửa giá trị mảng trực tiếp), cách đơn giản nhanh gọn nhất ở trường hợp này của chúng ta là dùng tới Deep Copy/Clone toàn bộ cái Board cho dễ hiểu và code ngắn gọn.
     * https://redux-toolkit.js.org/usage/immer-reducers
     * Tài liệu thêm về Shallow và Deep Copy Object trong JS:
     * https://www.javascripttutorial.net/object/3-ways-to-copy-objects-in-javascript/
     *
     *****************Ngoài ra nếu không muốn dùng cloneDeep thì thay push = concat*********************
     */
    // Cập nhật lại state board
    const newBoard = cloneDeep(board);
    newBoard.columns.push(createdColumn);
    newBoard.columnOrderIds.push(createdColumn._id);

    // Cập nhật lại dữ liệu Board trong Redux Store
    dispatch(updateCurrentActiveBoard(newBoard));
    socketIoInstane.emit("FE_CREATE_NEW_COLUMN", newBoard);
    toggleOpenNewColumnForm();
    setNewColumnTitle("");
  };

  return (
    // SortableContext dữ liệu truyền vào là mảng dạng ["id-1", "id-2"] chứ không phải dạng [{id:"id-1"},{id:"id-2"}]
    <SortableContext
      items={columns?.map((c) => c._id)}
      strategy={horizontalListSortingStrategy}
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
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? "#eee"
                : (theme) => theme.trello.subColorLight,
          },
        }}
      >
        {/* Box Column 01*/}
        {columns?.map((column) => (
          <Column key={column?._id} column={column} />
        ))}

        {/* Box Add new column CTA */}
        {!openNewColumnForm ? (
          <Box
            onClick={toggleOpenNewColumnForm}
            sx={{
              minWidth: "250px",
              maxWidth: "250px",
              mx: 2,
              borderRadius: "4px",
              height: "fit-content",
              bgcolor: (theme) =>
                theme.palette.mode === "dark"
                  ? "#ffffff3d"
                  : theme.trello.subColorLight,
            }}
          >
            <Button
              startIcon={<PostAddIcon />}
              sx={{
                color: "white",
                width: "100%",
                justifyContent: "flex-start",
                pl: 2.5,
                py: 1,
              }}
            >
              Add new column
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              minWidth: "250px",
              maxWidth: "250px",
              mx: 2,
              p: 1,
              borderRadius: "6px",
              height: "fit-content",
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#ffffff3d" : "#bae2e2",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <TextField
              label="Enter column title..."
              type="text"
              size="small"
              variant="outlined"
              autoFocus
              // data-no-dnd="true"
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
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
                onClick={() => addNewColumn()}
                variant="contained"
                size="small"
                sx={{
                  boxShadow: "none",
                  border: " 0.5px solid #ffffff3d",
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark"
                      ? (theme) => theme.trello.subColorDark
                      : (theme) => theme.trello.subColorLight,
                }}
              >
                Add Column
              </Button>
              <CloseIcon
                onClick={toggleOpenNewColumnForm}
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
    </SortableContext>
  );
};

export default ListColumns;
