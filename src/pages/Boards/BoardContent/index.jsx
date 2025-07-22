import Box from "@mui/material/Box";

const BoardContent = () => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        display: "flex",
        alignItems: "center",
        height: (theme) =>
          `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
      }}
    >
      Box Content
    </Box>
  );
};

export default BoardContent;
