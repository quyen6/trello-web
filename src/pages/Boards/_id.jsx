// Board Details
import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { useColorScheme } from "@mui/material";
// import { mockData } from "~/apis/mock-data";
import { useEffect, useState } from "react";
import {
  fetchBoardDetailsAPI,
  createNewColumnAPI,
  createNewCardAPI,
} from "~/apis";
import { generatePlaceholderCard } from "~/utils/formatter";
import { isEmpty } from "lodash";
const Board = () => {
  const [board, setBoard] = useState(null);
  useEffect(() => {
    // Tạm thời fix cứng boardId
    const boardId = "689b5a2f5a34f634e2fe9c8d";

    // call api
    fetchBoardDetailsAPI(boardId).then((board) => {
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
        }
      });
      console.log("🚀 ~ Board ~ board:", board);
      setBoard(board);
    });
  }, []);

  // Gọi API tạo mới Column và làm lại dữ liệu State Board
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id,
    });
    // Khi tạo mới Column thì nó sẽ chưa có Card, cần xử lý vấn đề kéo thả vào 1 column rỗng
    createdColumn.cards = [generatePlaceholderCard(createdColumn)];
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id];

    // Cập nhật lại state board
    const newBoard = { ...board };
    newBoard.columns.push(createdColumn);
    newBoard.columnOrderIds.push(createdColumn._id);
    setBoard(newBoard);
  };
  // Gọi API tạo mới Column và làm lại dữ liệu State Board
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id,
    });

    // Cập nhật lại state board
    const newBoard = { ...board };
    const columnToUpdate = newBoard.columns.find(
      (c) => c._id === createdCard.columnId
    );
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard);
      columnToUpdate.cardOrderIds.push(createdCard._id);
    }
    setBoard(newBoard);
  };
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
      <BoardContent
        resolvedMode={resolvedMode}
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
      />
    </Container>
  );
};

export default Board;
