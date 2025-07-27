import Box from "@mui/material/Box";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Button from "@mui/material/Button";
import Column from "./Column/Column";

const ListColumns = (props) => {
  const { resolvedMode } = props;

  return (
    <Box
      sx={{
        bgcolor: "inherit",
        width: "100%",
        height: "100%",
        display: "flex",
        overflowX: "auto",
        overflowY: "hidden",
        "&::-webkit-scrollbar-track": { m: 2 },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: resolvedMode === "dark" ? "#eee" : "#01a3a4",
        },
      }}
    >
      {/* Box Column 01*/}
      <Column resolvedMode={resolvedMode} />

      <Box
        sx={{
          minWidth: "200px",
          maxWidth: "200px",
          mx: 2,
          borderRadius: "4px",
          height: "fit-content",
          bgcolor: resolvedMode === "dark" ? "#ffffff3d" : "#01a3a4",
        }}
      >
        <Button
          startIcon={<PostAddIcon />}
          sx={{
            color: "white",
            width: "100%",
            justifyContent: "flex-start",
            pl: 2.5,
            py: 1,
          }}
        >
          Add new column
        </Button>
      </Box>
    </Box>
  );
};

export default ListColumns;
