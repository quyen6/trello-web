import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Avatar } from "@mui/material";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CHANGE_ROLE_USER_OR_KICK_LEAVE, ROLE_USER } from "~/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { selectorCurrentUser } from "~/redux/user/userSlice";

import { usePermission } from "~/customHooks/usePermission";
import { permission } from "~/config/rbacConfig";
import { useConfirm } from "material-ui-confirm";
import { updateBoardDetailsAPI, updateRoleUserOrRemoveUser } from "~/apis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  fetchBoardDetailsAPI,
  selectorCurrentActiveBoard,
} from "~/redux/activeBoard/activeBoardSlice";
import { socketIoInstane } from "~/socketClient";

const MemberBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectorCurrentUser);
  const activeBoard = useSelector(selectorCurrentActiveBoard);

  const boardMembers = activeBoard.members;
  const sortMemberToDisplay = useMemo(() => {
    if (boardMembers.length <= 1) return boardMembers;

    const firstUser = boardMembers.find((u) => u._id === currentUser._id);
    if (!firstUser) return boardMembers;

    // lọc các phần tử còn lại trừ currentUser
    const others = boardMembers.filter((u) => u._id !== currentUser._id);
    return [firstUser, ...others];
  }, [boardMembers, currentUser]);

  const afterChangeMemberRole = () => {
    // Fetch lại danh sách board trong useEffect

    dispatch(fetchBoardDetailsAPI(activeBoard._id)).then(sortMemberToDisplay);
  };
  // Xử lý phân quyền
  const userRole = boardMembers.find((m) => m._id === currentUser._id)?.role;
  const { hasPermission } = usePermission(userRole);

  // Xử lý thay đổi quyền hoặc xóa member

  const handleChangeRoleOrDelete = async (option, member) => {
    if (option === CHANGE_ROLE_USER_OR_KICK_LEAVE.KICK) {
      await updateRoleUserOrRemoveUser(
        activeBoard._id,
        member._id,
        option
      ).then((res) => {
        // console.log("🚀 ~ handleChangeRoleOrDelete ~ res:", res);
        socketIoInstane.emit("FE_CHANGE_ROLE_OR_KICK_LEAVE", res?.result);

        afterChangeMemberRole();
        toast.success(res?.deleteResult);
      });
    } else if (option === CHANGE_ROLE_USER_OR_KICK_LEAVE.LEAVE) {
      await updateRoleUserOrRemoveUser(
        activeBoard._id,
        member._id,
        option
      ).then((res) => {
        // console.log("🚀 ~ handleChangeRoleOrDelete ~ res:", res);
        socketIoInstane.emit("FE_CHANGE_ROLE_OR_KICK_LEAVE", res?.result);

        navigate("/boards");
      });
      //
    } else if (option !== member.role) {
      await updateRoleUserOrRemoveUser(
        activeBoard._id,
        member._id,
        option
      ).then((res) => {
        socketIoInstane.emit("FE_CHANGE_ROLE_OR_KICK_LEAVE", res?.board);
        afterChangeMemberRole();
        toast.success(res?.message);
      });
      //
    }
  };
  const confirm = useConfirm();

  const handleChange = async (event, member) => {
    const newValue = event.target.value;
    if (newValue === member.role) return;
    // Nếu chọn Delete -> xác nhận trước
    if (newValue === CHANGE_ROLE_USER_OR_KICK_LEAVE.KICK) {
      try {
        await confirm({
          title: "Confirm Kick",
          description: `Are you sure you want to kick ${
            member.fullName || member.email
          } from this board?`,
          confirmationText: "Yes, Delete",
          cancellationText: "Cancel",
        });
        handleChangeRoleOrDelete(CHANGE_ROLE_USER_OR_KICK_LEAVE.KICK, member);
      } catch {
        // Người dùng bấm Cancel -> không làm gì cả
      }
      return;
    }
    if (newValue === CHANGE_ROLE_USER_OR_KICK_LEAVE.LEAVE) {
      try {
        await confirm({
          title: "Confirm Leave Board",
          description: (
            <>
              Are you sure you want to leave board{" "}
              <Typography
                component="span"
                sx={{
                  fontWeight: "bold",
                  color: (theme) => theme.trello.textColorLightDark(theme),
                }}
              >
                {activeBoard.title}
              </Typography>
              ?
            </>
          ),
          confirmationText: "Yes, Leave",
          cancellationText: "Cancel",
        });
        handleChangeRoleOrDelete(CHANGE_ROLE_USER_OR_KICK_LEAVE.LEAVE, member);
      } catch {
        // Người dùng bấm Cancel -> không làm gì cả
      }
      return;
    }

    // Nếu chọn role khác thì xác nhận nhẹ hoặc đổi trực tiếp
    if (newValue !== member.role) {
      try {
        await confirm({
          title: "Change Role",
          description: `Change ${
            member.fullName || member.email
          }'s role to ${newValue}?`,
          confirmationText: "Confirm",
          cancellationText: "Cancel",
        });
        handleChangeRoleOrDelete(newValue, member);
      } catch {
        // Cancel
      }
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {" "}
      {sortMemberToDisplay.map((member, index) => (
        <Box
          sx={{ display: "flex", justifyContent: "space-between" }}
          key={index}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
              width: "100%",
              pt: 1.5,
            }}
          >
            {/* <Tooltip title={`${comment?.userDisplayName}-${comment?.userEmail}`}> */}
            <Avatar
              sx={{ width: 40, height: 40, cursor: "pointer" }}
              alt={member?.userDisplayName}
              src={member?.avatar}
            />
            {/* </Tooltip> */}
            <Box
              sx={{
                width: "inherit",
                color: (theme) => theme.trello.textColorLightDark(theme),
              }}
            >
              <Typography
                variant="span"
                sx={{
                  mr: 1,
                  fontSize: "1rem",
                }}
              >
                {member?.displayName}{" "}
                {currentUser._id === member._id && "(you)"}
              </Typography>

              <Box
                sx={{
                  display: "block",

                  fontSize: "0.75rem",
                }}
              >
                @{member?.username} • {member?.role}
              </Box>
            </Box>
          </Box>
          <Box sx={{ minWidth: 150, alignContent: "center" }}>
            <FormControl fullWidth size="small">
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={member.role}
                onChange={(e) => handleChange(e, member)}
                disabled={member.role === ROLE_USER.ADMIN}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#c4c4c4", // màu mặc định
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#c4c4c4",
                  },
                  // "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  //   borderColor: (theme) =>
                  //     theme.palette.mode === "dark"
                  //       ? "#fff"
                  //       : "rgb(0, 134, 137)",
                  // },
                }}
              >
                <MenuItem value={ROLE_USER.ADMIN} disabled>
                  Admin
                </MenuItem>
                <MenuItem
                  value={ROLE_USER.MANAGER}
                  disabled={!hasPermission(permission.CHANGE_ROLE_USER)}
                >
                  Manager
                </MenuItem>
                <MenuItem
                  value={ROLE_USER.MEMBER}
                  disabled={!hasPermission(permission.CHANGE_ROLE_USER)}
                >
                  Member
                </MenuItem>
                {userRole !== ROLE_USER.ADMIN ? (
                  <MenuItem value={CHANGE_ROLE_USER_OR_KICK_LEAVE.LEAVE}>
                    Leave Board
                  </MenuItem>
                ) : (
                  <MenuItem value={CHANGE_ROLE_USER_OR_KICK_LEAVE.KICK}>
                    Kick
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default MemberBoard;
