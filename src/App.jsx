import Button from "@mui/material/Button";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import HomeIcon from "@mui/icons-material/Home";
import { useEffect } from "react";
function App() {
  useEffect(() => {}, []);
  return (
    <>
      <div>CONTAINED</div>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <br />
      <AccessAlarmsIcon />
      <HomeIcon color="primary" />
    </>
  );
}

export default App;
