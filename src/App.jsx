import { Navigate, Route, Routes } from "react-router-dom";
import Board from "~/pages/Boards/_id";
import NotFound from "./pages/404/NotFound";
import Auth from "./pages/Auth/Auth";

function App() {
  return (
    <Routes>
      {/* Redirect Route */}
      <Route
        path="/"
        element={
          // Ở đây cần replace giá trị true để nó thay thế route /, có thể hiểu là route / sẽ không còn nằm trong history của Browser
          // Thực hành dễ hiều hơn bằng cách nhấn Go Home từ trang 404 xong thử quay lại bằng nút back của trình duyệt giữa 2 trường hợp có replace hoặc không có
          <Navigate to="/boards/689b5a2f5a34f634e2fe9c8d" replace={true} />
        }
      />

      {/* React Router Dom /boards /boards/{board_id} */}
      <Route path="/boards/:boardId" element={<Board />} />

      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />

      {/* Authentication */}
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
    </Routes>
  );
}

export default App;
