// App.jsx
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import HomeIcon from "@mui/icons-material/Home";
import { useColorScheme } from "@mui/material/styles";
import Card from "@mui/material/Card";

function ModeSwitcher() {
  const { mode, setMode } = useColorScheme();

  if (!mode) return null;

  return (
    <Button
      onClick={() => {
        setMode(mode === "light" ? "dark" : "light");
      }}
    >
      {mode === "light" ? "Turn dark" : "Turn light"}
    </Button>
  );
}
function App() {
  return (
    <>
      <ModeSwitcher />

      <Typography variant="body2" color="text.secondary">
        This is a simple example of using MaterialUI components in a React app.
      </Typography>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <AccessAlarmsIcon />
      <HomeIcon color="primary" />
    </>
  );
}

export default App;
