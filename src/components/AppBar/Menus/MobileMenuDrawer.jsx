import {
  Box,
  Drawer,
  IconButton,
  Button,
  Divider,
  useMediaQuery,
} from "@mui/material";
import Workspaces from "./Workspaces";
import Recent from "./Recent";
import Starred from "./Starred";
import Templates from "./Templates";
import ModeSwitcher from "~/components/ModeSwitcher";

const MobileMenuDrawer = (props) => {
  const { open, setOpen } = props;
  const isSmUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <>
      {/* <IconButton
        sx={{ display: { xs: "block", md: "none" }, color: "primary.main" }}
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </IconButton> */}

      {!isMdUp && (
        <Drawer
          anchor="left"
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <Box
            sx={{
              width: 200,
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
            onClick={() => setOpen(false)}
          >
            <Workspaces />
            <Recent />
            <Starred />
            <Templates />
            <Button variant="outlined">Create</Button>
            {!isSmUp && <ModeSwitcher />}
          </Box>
        </Drawer>
      )}
    </>
  );
};

export default MobileMenuDrawer;
