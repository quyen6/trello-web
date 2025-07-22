import Board from "~/pages/Boards/_id";

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true };
//   }

//   componentDidCatch(error, info) {
//     console.error("Error caught by boundary:", error, info);
//   }

//   render() {
//     if (this.state.hasError) {
//       return <p>Đã có lỗi xảy ra trong component 😢</p>;
//     }

//     return this.props.children;
//   }
// }

function App() {
  return (
    <>
      {/* React Router Dom /boards /boards/{board_id} */}
      <Board />
    </>
  );
}

export default App;
