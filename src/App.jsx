// App.jsx
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import HomeIcon from "@mui/icons-material/Home";
import { useColorScheme } from "@mui/material/styles";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught by boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <p>Đã có lỗi xảy ra trong component 😢</p>;
    }

    return this.props.children;
  }
}

function ModeSwitcher() {
  const { mode, setMode } = useColorScheme();
  const handleSetMode = (event) => {
    setMode(event.target.value);
  };

  if (!mode) return null;

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={mode}
        onChange={handleSetMode}
      >
        <MenuItem value="dark">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <DarkModeIcon fontSize="small" /> &nbsp; Dark
          </Box>
        </MenuItem>
        <MenuItem value="light">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LightModeIcon fontSize="small" />
            &nbsp; Light
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <SettingsBrightnessIcon fontSize="small" /> &nbsp; System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
}
function App() {
  return (
    <>
      <ErrorBoundary>
        <ModeSwitcher />
      </ErrorBoundary>

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
