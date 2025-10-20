import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import {
  EMAIL_RULE,
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE_MESSAGE,
} from "~/utils/validators";
import FieldErrorAlert from "~/components/Form/FieldErrorAlert";
import { inviteUserToBoardAPI } from "~/apis";
import { socketIoInstane } from "~/socketClient";
import { Avatar, InputAdornment, Modal } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import LinkIcon from "@mui/icons-material/Link";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TabPanel } from "@mui/lab";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import MemberBoard from "~/components/Modal/MemberBoard/MemberBoard";
import { ROLE_USER } from "~/utils/constants";
import { useSelector } from "react-redux";
import { selectorCurrentUser } from "~/redux/user/userSlice";
import { selectorCurrentActiveBoard } from "~/redux/activeBoard/activeBoardSlice";
import { toast } from "react-toastify";
import { permission } from "~/config/rbacConfig";
import { usePermission } from "~/customHooks/usePermission";
import PageLoadingSpinner from "~/components/Loading/PageLoadingSpinner";

const style = {
  position: "absolute",
  left: "50%",
  transform: "translate(-50%, 30%)",
  maxWidth: "calc(100vw - 24px)",
  width: "584px",
  minHeight: "280px",
  maxHeight: "calc(100vh - (48px * 2))",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 4,
  p: "20px 24px 0",
  display: "flex",
  flexDirection: "column",
  gap: 2,
};
function InviteBoardUser({ boardId, boardMembers }) {
  const currentUser = useSelector(selectorCurrentUser);
  // const currentActiveBoard = useSelector(selectorCurrentActiveBoard);
  /**
   * Xử lý Popover để ẩn hoặc hiện một popup nhỏ, tương tự docs để tham khảo ở đây:
   * https://mui.com/material-ui/react-popover/
   */
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const submitInviteUserToBoard = (data) => {
    const { inviteeEmail, inviteeRole } = data;

    // console.log("🚀 ~ submitInviteUserToBoard ~ inviteeRole:", inviteeRole);
    // console.log("inviteeEmail:", inviteeEmail);
    if (boardMembers.some((m) => m.email === inviteeEmail)) {
      toast.error("You already joined this board");
      return;
    }
    // Goị API mời người dùng nào đó làm thành viên của Board
    inviteUserToBoardAPI({ inviteeEmail, boardId, inviteeRole }).then(
      (invitation) => {
        // Clear thẻ input sử dụng react-hook-form bằng setValue
        setValue("inviteeEmail", null);
        setOpen(null);

        // Mời một người dùng vào board xong thì sẽ gửi/emit sự kiện socket lên server (real-time)
        socketIoInstane.emit("FE_USER_INVITED_TO_BOARD", invitation);
      }
    );
  };

  const [valueTab, setValueTab] = useState("1");

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };
  // Xử lý phân quyền

  const userRole = boardMembers?.find((m) => m._id === currentUser._id)?.role;
  const { hasPermission } = usePermission(userRole);

  if (!boardMembers) {
    return <PageLoadingSpinner caption="Loading Board..." />;
  }
  return (
    <Box>
      <Tooltip title="Invite user to this board!">
        <Button
          // aria-describedby={popoverId}
          onClick={handleOpen}
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: (theme) =>
              theme.palette.mode === "dark"
                ? "white"
                : theme.trello.mainColorLight,
            borderColor: (theme) =>
              theme.palette.mode === "dark"
                ? "white"
                : theme.trello.mainColorLight,
            // "&:hover": { borderColor: "white" },
          }}
        >
          Invite
        </Button>
      </Tooltip>

      {/* Khi Click vào butotn Invite ở trên thì sẽ mở popover */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form
          onSubmit={handleSubmit(submitInviteUserToBoard)}
          style={{ width: "320px" }}
        >
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box id="modal-modal-title">
                <Typography variant="h6" component="h2">
                  {" "}
                  Share board
                </Typography>
              </Box>
              <CancelIcon
                color="error"
                sx={{ "&:hover": { color: "error.light" }, cursor: "pointer" }}
                onClick={handleClose}
              />
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                label="Enter email to invite..."
                type="text"
                variant="outlined"
                size="small"
                {...register("inviteeEmail", {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: { value: EMAIL_RULE, message: EMAIL_RULE_MESSAGE },
                })}
                error={!!errors["inviteeEmail"]}
                InputProps={{
                  endAdornment: errors["inviteeEmail"] && (
                    <InputAdornment position="end">
                      <ErrorOutlineIcon color="error" fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#c4c4c4", // màu mặc định khi chưa hover/focus
                    },
                    "&:hover fieldset": {
                      borderColor: (theme) =>
                        theme.palette.mode === "dark"
                          ? "#fff"
                          : "rgb(0, 134, 137)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: (theme) =>
                        theme.palette.mode === "dark"
                          ? "#fff"
                          : "rgb(0, 134, 137)",
                      borderWidth: "1px",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                      color: (theme) =>
                        theme.palette.mode === "dark"
                          ? "#fff"
                          : "rgb(0, 134, 137)",
                    },
                  },
                }}
              />

              <Box sx={{ minWidth: 110, maxWidth: 110 }}>
                <FormControl fulWidth size="small">
                  <Controller
                    name="inviteeRole"
                    control={control}
                    defaultValue={ROLE_USER.MEMBER}
                    render={({ field, fieldState }) => (
                      <Select
                        {...field}
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        onChange={(event, value) =>
                          field.onChange(event.target.value)
                        }
                        value={field.value || ROLE_USER.MEMBER}
                        sx={{
                          width: "110px",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#c4c4c4", // màu mặc định
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: (theme) =>
                              theme.palette.mode === "dark"
                                ? "#fff"
                                : "rgb(0, 134, 137)",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: (theme) =>
                              theme.palette.mode === "dark"
                                ? "#fff"
                                : "rgb(0, 134, 137)",
                          },
                        }}
                        error={!!fieldState.error}
                      >
                        <MenuItem value={ROLE_USER.MEMBER}>Member</MenuItem>
                        <MenuItem value={ROLE_USER.MANAGER}>Manager</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Box>
              <Box sx={{ alignSelf: "flex-end" }}>
                <Button
                  className="interceptor-loading"
                  type="submit"
                  variant="contained"
                  color="info"
                  disabled={!hasPermission(permission.INVITE_USER)}
                >
                  Invite
                </Button>
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <LinkIcon />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography>Share this Board with Link</Typography>
                <Typography>Create Link</Typography>
              </Box>
            </Box>

            <Box>
              <Box
                sx={{
                  width: "100%",
                  typography: "body1",
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  overflow: "hidden",
                }}
              >
                <TabContext value={valueTab}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChangeTab}
                      aria-label="lab API tabs example"
                    >
                      <Tab
                        disableRipple
                        label={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Typography>Member of your Board</Typography>
                            <Box
                              sx={{
                                bgcolor: "rgb(0,134,137)",
                                color: "white",
                                px: 1,
                                py: 0.5,
                                borderRadius: "4px",
                                fontSize: "12px",
                                minWidth: "20px",
                                textAlign: "center",
                              }}
                            >
                              {boardMembers?.length}
                            </Box>
                          </Box>
                        }
                        value="1"
                        sx={{ textTransform: "none" }}
                      />
                      {hasPermission(permission.REQUEST_JOIN_BOARD) && (
                        <Tab
                          disableRipple
                          label="Request to join"
                          value="2"
                          sx={{ textTransform: "none" }}
                        />
                      )}
                    </TabList>
                  </Box>
                  <TabPanel
                    value="1"
                    sx={{
                      p: 0,
                      paddingBottom: 1.5,
                      display: "flex",
                      minHeight: 60,
                      overflowY: "auto",
                      flexGrow: 1,
                    }}
                  >
                    <MemberBoard />
                  </TabPanel>
                  <TabPanel
                    value="2"
                    sx={{ minHeight: 60, overflowY: "auto", flexGrow: 1 }}
                  >
                    Item Two
                  </TabPanel>
                </TabContext>
              </Box>
            </Box>
          </Box>
        </form>
      </Modal>
    </Box>
  );
}

export default InviteBoardUser;
