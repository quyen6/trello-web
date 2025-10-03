import { Container } from "@mui/material";
import AppBar from "./components/AppBar/AppBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      {/* AppBar xuất hiện xuyên suốt */}
      <AppBar />
      {/* Chỗ này render các page con */}
      <Outlet />
    </Container>
  );
};

export default MainLayout;
