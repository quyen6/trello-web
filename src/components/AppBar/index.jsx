import Box from "@mui/material/Box";
import ModeSwitcher from "../ModeSwitcher";

const AppBar = () => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.light",
        width: "100%",
        height: (theme) => theme.trello.appBarHeight,
        display: "flex",
        alignItems: "center",
      }}
    >
      <ModeSwitcher />
    </Box>
  );
};

export default AppBar;
