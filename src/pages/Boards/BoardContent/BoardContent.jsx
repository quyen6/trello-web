import Box from "@mui/material/Box";

import ListColumns from "./ListColumns/ListColumns";

const BoardContent = (props) => {
  const { resolvedMode } = props;

  return (
    <Box
      sx={{
        width: "100%",
        height: (theme) => theme.trello.boardContentHeight,
        backgroundColor: resolvedMode === "dark" ? "#34495e" : "#f5f7fa",
        p: "10px 0",
      }}
    >
      <ListColumns resolvedMode={resolvedMode} />
    </Box>
  );
};

export default BoardContent;
