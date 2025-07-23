import { useColorScheme } from "@mui/material/styles";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";

const ModeSwitcher = () => {
  const { mode, setMode } = useColorScheme();
  const handleSetMode = (event) => {
    setMode(event.target.value);
  };

  if (!mode) return null;

  return (
    <FormControl sx={{ m: 0, minWidth: 120 }} size="small">
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
};

export default ModeSwitcher;
