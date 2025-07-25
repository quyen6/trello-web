import Box from "@mui/material/Box";

const BoardContent = (props) => {
  const { resolvedMode } = props;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: (theme) =>
          `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
        backgroundColor: resolvedMode === "dark" ? "#34495e" : "#f5f7fa",
      }}
    >
      Box Content
    </Box>
  );
};

export default BoardContent;
