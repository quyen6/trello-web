import { TextField } from "@mui/material";

export const FormTextField = ({
  name,
  label,
  type = "text",
  register,
  rules,
  sx = {},
  ...props
}) => {
  return (
    <TextField
      autoFocus={props.autoFocus}
      fullWidth
      label={label}
      type={type}
      variant="outlined"
      // chỉ spread register nếu có (để component vẫn dùng được mà không cần hook form)
      {...(register ? register(name, rules) : {})}
      sx={{
        ...sx,
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#c4c4c4", // màu mặc định khi chưa hover/focus
          },
          "&:hover fieldset": {
            borderColor: "rgb(0, 134, 137)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "rgb(0, 134, 137)",
            borderWidth: "1px",
          },
        },
        "& .MuiInputLabel-root": {
          "&.Mui-focused": {
            color: "rgb(0, 134, 137)",
          },
        },
      }}
      {...props}
    />
  );
};
