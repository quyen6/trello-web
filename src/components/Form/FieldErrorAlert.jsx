import Alert from "@mui/material/Alert";

// Component này có nhiệm vụ trả về một Alert Message cho field chỉ định (nếu có).
function FieldErrorAlert({ errors, fieldName }) {
  if (!errors || !errors[fieldName]) return null;
  return (
    <Alert
      severity="error"
      sx={{
        mt: "0.7em",
        ".MuiAlert-message": { overflow: "hidden" },
        color: "rgb(95, 33, 32)",
        bgcolor: "rgb(253, 237, 237)",
      }}
    >
      {errors[fieldName]?.message}
    </Alert>
  );
}

export default FieldErrorAlert;
