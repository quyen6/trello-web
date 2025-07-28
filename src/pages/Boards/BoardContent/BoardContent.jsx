import Box from "@mui/material/Box";

import ListColumns from "./ListColumns/ListColumns";

import { mapOrder } from "~/utils/sorts";
import {
  DndContext,
  // PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
const BoardContent = (props) => {
  const { resolvedMode, board } = props;

  const [orderedColumns, setOrderedColumns] = useState([]);

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, "_id"));
  }, [board]);

  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: { distance: 10 },
  // });

  // Yêu cầu chuột di chuyển 10px thì mới kích hoạt event, fix truongf hợp click bị gọi event
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });

  // Nhấn giữ 250ms và dung sai của cảm ứng 500px thì mới kích hoạt event
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 500 },
  });
  // Ưu tiên sử dụng kết hợp 2 loại sensors là mouse và touch để có trải nghiệm trên mobile tốt nhất, không bị bug
  // const sensors = useSensors(pointerSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  const handleDragEnd = (event) => {
    // console.log("🚀 ~ handleDragEnd ~ event:", event);
    const { active, over } = event;

    // Kiểm tra nếu không tồn tại over(kéo linh tinh ra ngoài) thì return để tránh lỗi
    if (!over) return;

    if (active.id !== over.id) {
      // Lấy vị trí cũ từ thằng active
      const oldIndex = orderedColumns.findIndex((c) => c._id === active.id);
      // Lấy vị trí mới từ thằng over
      const newIndex = orderedColumns.findIndex((c) => c._id === over.id);

      // dùng arrayMove để sắp xếp lại columns ban đầu
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);
      // console.log("🚀 ~ handleDragEnd ~ dndOrderedColumns:", dndOrderedColumns);
      // const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
      // console.log(
      //   "🚀 ~ handleDragEnd ~ dndOrderedColumnsIds:",
      //   dndOrderedColumnsIds
      // );
      setOrderedColumns(dndOrderedColumns);
    }
  };
  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Box
        sx={{
          width: "100%",
          height: (theme) => theme.trello.boardContentHeight,
          backgroundColor: resolvedMode === "dark" ? "#34495e" : "#f5f7fa",
          p: "10px 0",
        }}
      >
        <ListColumns resolvedMode={resolvedMode} columns={orderedColumns} />
      </Box>
    </DndContext>
  );
};

export default BoardContent;
