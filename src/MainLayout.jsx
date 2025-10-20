import { Box, Container } from "@mui/material";
import AppBar from "./components/AppBar/AppBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      {/* AppBar xuất hiện xuyên suốt */}
      <AppBar />
      {/* Chỗ này render các page con */}
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#34495e" : "#f5f7fa",
        }}
      >
        <Outlet />
      </Box>
    </Container>
  );
};

export default MainLayout;
