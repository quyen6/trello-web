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
const ListColumns = (props) => {
  const { resolvedMode, columns } = props;
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
  const toggleOpenNewColumnForm = () =>
    setOpenNewColumnForm(!openNewColumnForm);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const addNewColumn = () => {
    if (!newColumnTitle) {
      // console.error("Please enter Column Title");

      return;
    }
    // console.log(newColumnTitle);
    // Gọi API ở đây

    // Đóng lại trạng thái thêm Column mới và Clear Input
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
            backgroundColor: resolvedMode === "dark" ? "#eee" : "#01a3a4",
          },
        }}
      >
        {/* Box Column 01*/}
        {columns?.map((column) => (
          <Column
            resolvedMode={resolvedMode}
            key={column?._id}
            column={column}
          />
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
              bgcolor: resolvedMode === "dark" ? "#ffffff3d" : "#01a3a4",
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
              bgcolor: resolvedMode === "dark" ? "#ffffff3d" : "#bae2e2",
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
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{ color: resolvedMode === "dark" ? "white" : "#000" }}
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
                onClick={() => addNewColumn()}
                variant="contained"
                size="small"
                sx={{
                  boxShadow: "none",
                  border: " 0.5px solid #ffffff3d",
                  bgcolor: resolvedMode === "dark" ? "#1c2a4094" : "#01a3a4",
                }}
              >
                Add Column
              </Button>
              <CloseIcon
                onClick={toggleOpenNewColumnForm}
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
    </SortableContext>
  );
};

export default ListColumns;
