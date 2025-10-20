// Board Details
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";

// import { mockData } from "~/apis/mock-data";
import { useEffect, useState } from "react";
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
  clearCurrentActiveBoard,
  updateCardInBoard,
} from "~/redux/activeBoard/activeBoardSlice";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import PageLoadingSpinner from "~/components/Loading/PageLoadingSpinner";
import { Box } from "@mui/material";
import ActiveCard from "~/components/Modal/ActiveCard/ActiveCard";
import { Typography, Button, Avatar } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { selectorCurrentUser } from "~/redux/user/userSlice";
import { socketIoInstane } from "~/socketClient";
import SendRequest from "../SendRequest/SendRequest";
const Board = () => {
  const dispatch = useDispatch();
  // Không dùng State của component nữa mà chuyển qua State của Redux
  // const [board, setBoard] = useState(null);
  const board = useSelector(selectorCurrentActiveBoard);
  const { boardId } = useParams();
  const currentUser = useSelector(selectorCurrentUser);
  const [requestJoinBoard, setRequestJoinBoard] = useState(false);

  // 1️ Lấy dữ liệu board
  useEffect(() => {
    dispatch(fetchBoardDetailsAPI(boardId)).then((res) => {
      if (res.payload?.statusCode === 403) {
        setRequestJoinBoard(true);
      }
    });
  }, [dispatch, boardId]);

  // 2️ Socket: user được accept vào board
  useEffect(() => {
    const memberAcceptJoinBoardSocket = (updatedBoard) => {
      // console.log("🚀 ~ memberAcceptJoinBoard ~ updatedBoard:", updatedBoard);
      if (updatedBoard._id === boardId)
        dispatch(updateCurrentActiveBoard(updatedBoard));
    };

    socketIoInstane.on("BE_USER_JOIN_BOARD", memberAcceptJoinBoardSocket);
    return () =>
      socketIoInstane.off("BE_USER_JOIN_BOARD", memberAcceptJoinBoardSocket);
  }, [dispatch, boardId]);

  // 3️ Socket: user bị kick khỏi board
  useEffect(() => {
    const changeRoleOrKickLeaveSocket = (updatedBoard) => {
      if (updatedBoard._id === boardId) {
        dispatch(updateCurrentActiveBoard(updatedBoard));
        dispatch(fetchBoardDetailsAPI(boardId)).then((res) => {
          if (res.payload?.statusCode === 403) setRequestJoinBoard(true);
        });
        // dispatch(updateCardInBoard(updatedBoard?.cards));
      }
    };

    socketIoInstane.on(
      "BE_CHANGE_ROLE_OR_KICK_LEAVE",
      changeRoleOrKickLeaveSocket
    );
    return () =>
      socketIoInstane.off(
        "BE_CHANGE_ROLE_OR_KICK_LEAVE",
        changeRoleOrKickLeaveSocket
      );
  }, [dispatch, boardId]);

  // 4 Socket: tạo mới column
  useEffect(() => {
    const createNewColumnSocket = (data) => {
      dispatch(updateCurrentActiveBoard(data));
    };

    socketIoInstane.on("BE_CREATE_NEW_COLUMN", createNewColumnSocket);
    return () =>
      socketIoInstane.off("BE_CREATE_NEW_COLUMN", createNewColumnSocket);
  }, [dispatch]);
  // 5 Socket: xóa column
  useEffect(() => {
    const deleteColumnSocket = (data) => {
      dispatch(updateCurrentActiveBoard(data));
    };

    socketIoInstane.on("BE_DELETE_COLUMN", deleteColumnSocket);
    return () => socketIoInstane.off("BE_DELETE_COLUMN", deleteColumnSocket);
  }, [dispatch]);
  //  6Socket: tạo mới card
  useEffect(() => {
    const createCardSocket = (data) => {
      dispatch(updateCurrentActiveBoard(data));
    };

    socketIoInstane.on("BE_CREATE_NEW_CARD", createCardSocket);
    return () => socketIoInstane.off("BE_CREATE_NEW_CARD", createCardSocket);
  }, [dispatch]);
  //  7 Socket: move column
  useEffect(() => {
    const moveColumnSocket = (data) => {
      dispatch(updateCurrentActiveBoard(data));
    };

    socketIoInstane.on("BE_MOVE_COLUMN", moveColumnSocket);
    return () => socketIoInstane.off("BE_MOVE_COLUMN", moveColumnSocket);
  }, [dispatch]);
  //  8 Socket: move card in the same column
  useEffect(() => {
    const moveCardInTheSameColumnSocket = (data) => {
      dispatch(updateCurrentActiveBoard(data));
    };

    socketIoInstane.on(
      "BE_MOVE_CARD_IN_THE_SAME_COLUMN",
      moveCardInTheSameColumnSocket
    );
    return () =>
      socketIoInstane.off(
        "BE_MOVE_CARD_IN_THE_SAME_COLUMN",
        moveCardInTheSameColumnSocket
      );
  }, [dispatch]);
  useEffect(() => {
    const moveCardToDifferentColumnSocket = (data) => {
      dispatch(updateCurrentActiveBoard(data));
    };

    socketIoInstane.on(
      "BE_MOVE_CARD_TO_DIFFERENT_COLUMN",
      moveCardToDifferentColumnSocket
    );
    return () =>
      socketIoInstane.off(
        "BE_MOVE_CARD_TO_DIFFERENT_COLUMN",
        moveCardToDifferentColumnSocket
      );
  }, [dispatch]);

  // Gọi API và xử lí khi kéo thả Column xong xuôi
  const moveColumns = (dndOrderedColumns) => {
    //Update cho chuẩn dữ liệu state board
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    // setBoard(newBoard);
    dispatch(updateCurrentActiveBoard(newBoard));
    socketIoInstane.emit("FE_MOVE_COLUMN", newBoard);

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
    socketIoInstane.emit("FE_MOVE_CARD_IN_THE_SAME_COLUMN", newBoard);
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
    socketIoInstane.emit("FE_MOVE_CARD_TO_DIFFERENT_COLUMN", newBoard);
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
      {requestJoinBoard ? (
        <SendRequest currentUser={currentUser} />
      ) : !board || isEmpty(board) ? (
        // Loading UI
        <PageLoadingSpinner caption="Loading Board..." />
      ) : (
        <Box>
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
        </Box>
      )}
    </Box>
  );
};
export default Board;
