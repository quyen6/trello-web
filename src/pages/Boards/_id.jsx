// Board Details
import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { useColorScheme } from "@mui/material";
import { mockData } from "~/apis/mock-data";

const Board = () => {
  const { mode } = useColorScheme();
  const resolvedMode =
    mode === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : mode;
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar resolvedMode={resolvedMode} />
      <BoardBar resolvedMode={resolvedMode} board={mockData?.board} />
      <BoardContent resolvedMode={resolvedMode} board={mockData?.board} />
    </Container>
  );
};

export default Board;
