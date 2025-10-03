import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { useOutletContext } from "react-router-dom";

const PageLoadingSpinner = ({ caption }) => {
  const { resolvedMode } = useOutletContext() || "light";
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: (theme) => (theme.palette.mode === "dark" ? "#34495e" : ""),
        color: (theme) => (theme.palette.mode === "dark" ? "white" : ""),
      }}
    >
      <CircularProgress
        sx={{
          mr: 2,
          color: (theme) => (theme.palette.mode === "dark" ? "white" : ""),
        }}
      />
      <i>{caption}</i>
    </Box>
  );
};

export default PageLoadingSpinner;
