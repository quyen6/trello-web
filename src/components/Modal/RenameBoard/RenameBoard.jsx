import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import CancelIcon from "@mui/icons-material/Cancel";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { FIELD_REQUIRED_MESSAGE } from "~/utils/validators";
import FieldErrorAlert from "~/components/Form/FieldErrorAlert";
import AbcIcon from "@mui/icons-material/Abc";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { styled } from "@mui/material/styles";
import { updateBoardDetailsAPI } from "~/apis";
import { FormTextField } from "~/components/Form/FormTextField";
import { toast } from "react-toastify";
import { useConfirm } from "material-ui-confirm";

// BOARD_TYPES tương tự bên model phía Back-end (nếu cần dùng nhiều nơi thì hãy đưa ra file constants, không thì cứ để ở đây)
const BOARD_TYPES = {
  PUBLIC: "public",
  PRIVATE: "private",
};

const SidebarItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  padding: "12px 16px",
  borderRadius: "8px",
  color: theme.trello.textColorLightDark(theme),
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark" ? "#576c816a" : theme.palette.grey[300],
  },
  "&.active": {
    color: theme.palette.mode === "dark" ? "#90caf9" : "#0c66e4",
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#e9f2ff",
  },
}));
/**
 * Bản chất của cái component SidebarCreateBoardModal này chúng ta sẽ trả về một cái SidebarItem để hiển thị ở màn Board List cho phù hợp giao diện bên đó, đồng thời nó cũng chứa thêm một cái Modal để xử lý riêng form create board nhé.
 * Note: Modal là một low-component mà bọn MUI sử dụng bên trong những thứ như Dialog, Drawer, Menu, Popover. Ở đây dĩ nhiên chúng ta có thể sử dụng Dialog cũng không thành vấn đề gì, nhưng sẽ sử dụng Modal để dễ linh hoạt tùy biến giao diện từ con số 0 cho phù hợp với mọi nhu cầu nhé.
 */
function SidebarRenameBoardModal({
  afterSettingBoard,
  openRenameModal,
  setOpenRenameModal,
  board,
}) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //   const [openRenameModal, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setOpenRenameModal(false);
    // Reset lại toàn bộ form khi đóng Modal
    reset();
  };

  const submitSettingBoard = (data) => {
    // const { title, description, type } = data;
    updateBoardDetailsAPI(board._id, data).then(() => {
      // đóng Modal
      handleCloseModal();
      // Thông báo đến component cha để xử lý
      afterSettingBoard();
      toast.success("Updated successfully!");
    });
  };

  const confirmChangeTypeBoard = useConfirm();

  return (
    <>
      <Modal
        open={openRenameModal}
        // onClose={handleCloseModal} // chỉ sử dụng onClose trong trường hợp muốn đóng Modal bằng nút ESC hoặc click ra ngoài Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "white",
            boxShadow: 24,
            borderRadius: "8px",
            border: "none",
            outline: 0,
            padding: "20px 30px",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1A2027" : "white",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
            }}
          >
            <CancelIcon
              color="error"
              sx={{ "&:hover": { color: "error.light" } }}
              onClick={handleCloseModal}
            />
          </Box>
          <Box
            id="modal-modal-title"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <LibraryAddIcon />
            <Typography variant="h6" component="h2">
              {" "}
              Setting board
            </Typography>
          </Box>
          <Box id="modal-modal-description" sx={{ my: 2 }}>
            <form onSubmit={handleSubmit(submitSettingBoard)}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box>
                  <FormTextField
                    // autoComplete="nope"
                    name="title"
                    autoFocus
                    label="Title"
                    type="text"
                    defaultValue={board?.title}
                    error={!!errors["title"]}
                    register={register}
                    rules={{
                      required: FIELD_REQUIRED_MESSAGE,
                      minLength: {
                        value: 3,
                        message: "Min Length is 3 characters",
                      },
                      maxLength: {
                        value: 50,
                        message: "Max Length is 50 characters",
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AbcIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <FieldErrorAlert errors={errors} fieldName={"title"} />
                </Box>

                <Box>
                  <FormTextField
                    // autoComplete="nope"
                    name="description"
                    label="Description"
                    type="text"
                    defaultValue={board?.description}
                    error={!!errors["description"]}
                    register={register}
                    rules={{
                      required: FIELD_REQUIRED_MESSAGE,
                      minLength: {
                        value: 3,
                        message: "Min Length is 3 characters",
                      },
                      maxLength: {
                        value: 255,
                        message: "Max Length is 255 characters",
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DescriptionOutlinedIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <FieldErrorAlert errors={errors} fieldName={"description"} />
                </Box>

                {/*
                 * Lưu ý đối với RadioGroup của MUI thì không thể dùng register tương tự TextField được mà phải sử dụng <Controller /> và props "control" của react-hook-form như cách làm dưới đây
                 * https://stackoverflow.com/a/73336101
                 * https://mui.com/material-ui/react-radio-button/
                 */}
                <Controller
                  name="type"
                  defaultValue={board?.type}
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      row
                      onChange={async (event, value) => {
                        if (value === field.value) return;

                        await confirmChangeTypeBoard({
                          title: "Change Type Board?",
                          description:
                            value === BOARD_TYPES.PUBLIC
                              ? "Switch this board to Public? Everyone will be able to see it."
                              : "Switch this board to Private? Only members will have access.",
                          confirmationText: "Yes",
                          cancellationText: "Cancel",
                        });
                        field.onChange(value);
                      }}
                      value={field.value}
                    >
                      <FormControlLabel
                        value={BOARD_TYPES.PUBLIC}
                        control={<Radio size="small" />}
                        label="Public"
                        labelPlacement="start"
                      />
                      <FormControlLabel
                        value={BOARD_TYPES.PRIVATE}
                        control={<Radio size="small" />}
                        label="Private"
                        labelPlacement="start"
                      />
                    </RadioGroup>
                  )}
                />

                <Box sx={{ alignSelf: "flex-end" }}>
                  <Button
                    className="interceptor-loading"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Change
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default SidebarRenameBoardModal;
