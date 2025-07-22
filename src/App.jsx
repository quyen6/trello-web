import React, { useState } from "react";
import { useColorScheme } from "@mui/material/styles";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import Container from "@mui/material/Container";
import theme from "./theme";

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
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <Box
        sx={{
          backgroundColor: "primary.light",
          width: "100%",
          height: (theme) => theme.trello.appBarHeight,
          display: "flex",
          alignItems: "center",
        }}
      >
        <ErrorBoundary>
          <ModeSwitcher />
        </ErrorBoundary>
      </Box>
      <Box
        sx={{
          backgroundColor: "primary.dark",
          width: "100%",
          height: (theme) => theme.trello.boardBarHeight,
          display: "flex",
          alignItems: "center",
        }}
      >
        Box bar
      </Box>
      <Box
        sx={{
          backgroundColor: "primary.main",
          display: "flex",
          alignItems: "center",
          height: (theme) =>
            `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
        }}
      >
        Box Content
      </Box>
    </Container>
  );
}

export default App;
