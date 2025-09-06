// Board Details
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";

// import { mockData } from "~/apis/mock-data";
import { useEffect } from "react";
import {
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardToDifferentColumnAPI,
} from "~/apis";
import { cloneDeep, isEmpty } from "lodash";
import {
  fetchBoardDetailsAPI,
  updateCurrentActiveBoard,
  selectorCurrentActiveBoard,
} from "~/redux/activeBoard/activeBoardSlice";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import PageLoadingSpinner from "~/components/Loading/PageLoadingSpinner";
import { Box } from "@mui/material";
import ActiveCard from "~/components/Modal/ActiveCard/ActiveCard";
const Board = () => {
  const dispatch = useDispatch();
  // Không dùng State của component nữa mà chuyển qua State của Redux
  // const [board, setBoard] = useState(null);
  const board = useSelector(selectorCurrentActiveBoard);
  console.log("🚀 ~ Board ~ board:", board);
  const { boardId } = useParams();

  useEffect(() => {
    // call api
    dispatch(fetchBoardDetailsAPI(boardId));
  }, [dispatch, boardId]);

  // Gọi API và xử lí khi kéo thả Column xong xuôi
  const moveColumns = (dndOrderedColumns) => {
    //Update cho chuẩn dữ liệu state board
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    // setBoard(newBoard);
    dispatch(updateCurrentActiveBoard(newBoard));

    // Gọi API Update Board
    updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: newBoard.columnOrderIds,
    });
  };
  /* Khi di chuyển Card trong cùng 1 Column, chỉ cần gọi API để cập nhật cardOrderIds của Column chứa nó  */
  const moveCardInTheSameColumn = (
    dndOrderedCards,
    dndOrderedCardIds,
    columnId
  ) => {
    //Update cho chuẩn dữ liệu state board
    const newBoard = cloneDeep(board);
    const columnToUpdate = newBoard.columns.find((c) => c._id === columnId);
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards;
      columnToUpdate.cardOrderIds = dndOrderedCardIds;
    }
    // setBoard(newBoard);
    dispatch(updateCurrentActiveBoard(newBoard));

    // Gọi API Update Column

    updateColumnDetailsAPI(columnToUpdate._id, {
      cardOrderIds: dndOrderedCardIds,
    });
  };

  /**
   * Khi di chuyển card sang Column khác:
   * B1: Cập nhật mảng cardOrderIds của Column ban đầu chứa nó (Hiểu bản chất là xóa cái id của Card ra khỏi mảng)
   * B2: Cập nhật mảng cardOrderIds của Column tiếp theo (Hiểu bản chất là thêm id của Card vào mảng)
   * B3: Cập nhật lại trường columnId mới của cái Card đã kéo
   * => Làm một API support riêng.
   */
  const moveCardToDifferentColumn = (
    curentCardId,
    prevColumnId,
    nextColumnId,
    dndOrderedColumns
  ) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    // setBoard(newBoard);
    dispatch(updateCurrentActiveBoard(newBoard));

    // Gọi API
    let prevCardOrderIds = dndOrderedColumns.find(
      (c) => c._id === prevColumnId
    )?.cardOrderIds;
    // Xử lí vấn đề khi kéo Card cuối cùng ra khỏi Column, Column rỗng có placeholder-card cần xóa nó đi trước khi gửi dữ liệu lên BE
    if (prevCardOrderIds[0].includes("placeholder-card")) {
      prevCardOrderIds = [];
    }
    moveCardToDifferentColumnAPI({
      curentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find((c) => c._id === nextColumnId)
        ?.cardOrderIds,
    });
  };

  return (
    <Box>
      {!board || isEmpty(board) ? (
        // Loading UI
        <PageLoadingSpinner caption="Loading Board..." />
      ) : (
        <>
          {/* Modal Active Card, check đóng/mở dựa theo State isShowModalActiveCard lưu trong Redux . Mỗi thời điểm chỉ tồn tại một cái Modal Card đang Active */}
          <ActiveCard />

          <BoardBar board={board} />
          <BoardContent
            board={board}
            // 3 cái trường hợp move dưới đây thì giữ nguyên để code xử lý kéo thả ở phần BoardContent không bị quá dài mất kiểm soát khi đọc code, aintain
            moveColumns={moveColumns}
            moveCardInTheSameColumn={moveCardInTheSameColumn}
            moveCardToDifferentColumn={moveCardToDifferentColumn}
          />
        </>
      )}
    </Box>
  );
};
export default Board;
