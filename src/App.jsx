import Button from "@mui/material/Button";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import HomeIcon from "@mui/icons-material/Home";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";

function App() {
  useEffect(() => {}, []);
  return (
    <>
      <div>CONTAINED</div>
      <Typography variant="body2" color="text.secondary">
        This is a simple example of using Material-UI components in a React app.
      </Typography>
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
