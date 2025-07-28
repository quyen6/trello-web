import Box from "@mui/material/Box";

import ListColumns from "./ListColumns/ListColumns";

import { mapOrder } from "~/utils/sorts";
const BoardContent = (props) => {
  const { resolvedMode, board } = props;

  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, "_id");

  return (
    <Box
      sx={{
        width: "100%",
        height: (theme) => theme.trello.boardContentHeight,
        backgroundColor: resolvedMode === "dark" ? "#34495e" : "#f5f7fa",
        p: "10px 0",
      }}
    >
      <ListColumns resolvedMode={resolvedMode} columns={orderedColumns} />
    </Box>
  );
};

export default BoardContent;
