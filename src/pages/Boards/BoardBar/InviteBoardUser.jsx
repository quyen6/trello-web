import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import {
  EMAIL_RULE,
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE_MESSAGE,
} from "~/utils/validators";
import FieldErrorAlert from "~/components/Form/FieldErrorAlert";
import { useOutletContext } from "react-router-dom";
import { inviteUserToBoardAPI } from "~/apis";

function InviteBoardUser({ boardId }) {
  console.log("🚀 ~ InviteBoardUser ~ boardId:", boardId);
  const { resolvedMode, colorTextMain } = useOutletContext();
  /**
   * Xử lý Popover để ẩn hoặc hiện một popup nhỏ, tương tự docs để tham khảo ở đây:
   * https://mui.com/material-ui/react-popover/
   */
  const [anchorPopoverElement, setAnchorPopoverElement] = useState(null);
  const isOpenPopover = Boolean(anchorPopoverElement);
  const popoverId = isOpenPopover ? "invite-board-user-popover" : undefined;
  const handleTogglePopover = (event) => {
    if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget);
    else setAnchorPopoverElement(null);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const submitInviteUserToBoard = (data) => {
    const { inviteeEmail } = data;
    // console.log("inviteeEmail:", inviteeEmail);

    // Goị API mời người dùng nào đó làm thành viên của Board
    inviteUserToBoardAPI({ inviteeEmail, boardId }).then(() => {
      // Clear thẻ input sử dụng react-hook-form bằng setValue
      setValue("inviteeEmail", null);
      setAnchorPopoverElement(null);

      // Mời một người dùng vào board xong thì sẽ gửi /emit sự kiện socket lên server (real-time)
    });
  };

  return (
    <Box>
      <Tooltip title="Invite user to this board!">
        <Button
          aria-describedby={popoverId}
          onClick={handleTogglePopover}
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: resolvedMode === "dark" ? "white" : "rgb(0, 134, 137)",
            borderColor: resolvedMode === "dark" ? "white" : "rgb(0, 134, 137)",
            // "&:hover": { borderColor: "white" },
          }}
        >
          Invite
        </Button>
      </Tooltip>

      {/* Khi Click vào butotn Invite ở trên thì sẽ mở popover */}
      <Popover
        id={popoverId}
        open={isOpenPopover}
        anchorEl={anchorPopoverElement}
        onClose={handleTogglePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <form
          onSubmit={handleSubmit(submitInviteUserToBoard)}
          style={{ width: "320px" }}
        >
          <Box
            sx={{
              p: "15px 20px 20px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography
              variant="span"
              sx={{ fontWeight: "bold", fontSize: "16px" }}
            >
              Invite User To This Board!
            </Typography>
            <Box>
              <TextField
                autoFocus
                fullWidth
                label="Enter email to invite..."
                type="text"
                variant="outlined"
                {...register("inviteeEmail", {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: { value: EMAIL_RULE, message: EMAIL_RULE_MESSAGE },
                })}
                error={!!errors["inviteeEmail"]}
              />
              <FieldErrorAlert errors={errors} fieldName={"inviteeEmail"} />
            </Box>

            <Box sx={{ alignSelf: "flex-end" }}>
              <Button
                className="interceptor-loading"
                type="submit"
                variant="contained"
                color="info"
              >
                Invite
              </Button>
            </Box>
          </Box>
        </form>
      </Popover>
    </Box>
  );
}

export default InviteBoardUser;
