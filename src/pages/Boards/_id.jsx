// Board Details
import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar";
import BoardBar from "./BoardBar";
import BoardContent from "./BoardContent";
import { useColorScheme } from "@mui/material";

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
      <BoardBar resolvedMode={resolvedMode} />
      <BoardContent resolvedMode={resolvedMode} />
    </Container>
  );
};

export default Board;
