import { Box, CircularProgress } from "@mui/material";
import React from "react";

const PageLoadingSpinner = ({ caption }) => {
  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress sx={{ mr: 2 }} />
      <i>{caption}</i>
    </Box>
  );
};

export default PageLoadingSpinner;
