import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const style = {
  position: "absolute",
  top: (theme) => theme.trello.introductionHeaderHeight,
  left: 0,
  // transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  zIndex: 2,
};
const ModalHeader = ({ value, handleClose, open }) => {
  return (
    <Box sx={{ height: "100%", display: "flex", alignItems: "stretch" }}>
      <Modal
        disableScrollLock
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {value === "1" && (
              <div>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Text in a modal
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  Workspace.
                </Typography>
              </div>
            )}
            {value === "2" && (
              <div>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Text in a modal
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  Templates.
                </Typography>
              </div>
            )}
            {value === "3" && (
              <div>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Text in a modal
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  Recent.
                </Typography>
              </div>
            )}
            {value === "4" && (
              <div>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Text in a modal
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  Starred.
                </Typography>
              </div>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default ModalHeader;
