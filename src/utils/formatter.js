/**
 * Capitalize the first letter of a string
 */
export const capitalizeFirstLetter = (val) => {
  if (!val) return "";
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`;
};

/**
 * Video 37.2 hàm generatePlaceholderCard: Cách xử lý bug logic thư viện Dnd-kit khi Column là rồng:
 * Phía FE sẽ tự tạo ra một cái card đặc biệt: Placeholder Card, không liên quan tới Back-end
 * Card đặc biệt này sẽ được ần ở giao diện UI người dùng.
 * Cầu trúc Id của cái card này đề Unique rất đơn giản, không cần phải làm random phức tạp:
 * "columnId-placeholder-card" (mỗi column chỉ có thể có tổi đa một cái Placeholder Card)
 * Quan trong khi tạo: phải đầy đủ: (_id, boardId, columnId, FE_PlaceholderCard)
 */
export const generatePlaceholderCard = (column) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceholderCard: true,
  };
};
