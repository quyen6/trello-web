// Board Details
import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { useColorScheme } from "@mui/material";
import { mockData } from "~/apis/mock-data";
import { useEffect, useState } from "react";
import { fetchBoardDetailsAPI } from "~/apis";

const Board = () => {
  const [board, setBoard] = useState(null);
  useEffect(() => {
    // Tạm thời fix cứng boardId
    const boardId = "68957580e7b952e57f6470b2";

    // call api
    fetchBoardDetailsAPI(boardId).then((board) => {
      setBoard(board);
    });
  }, []);
  // const getBoardData = async (boardId) => {
  //   const respone = await fetchBoardDetailsAPI(boardId);
  //   .then((board) => {
  //     setBoard(board);
  //   });
  //   if (respone) setBoard(board);
  //   // console.log("🚀 ~ getBoardData ~ respone:", respone);
  // };
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
      <BoardBar resolvedMode={resolvedMode} board={board} />
      <BoardContent resolvedMode={resolvedMode} board={board} />
    </Container>
  );
};

export default Board;
