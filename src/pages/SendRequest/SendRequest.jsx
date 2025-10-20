import { Box } from "@mui/material";

import { Typography, Button, Avatar } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const SendRequest = ({ currentUser }) => {
  return (
    <Box sx={{ height: "100vh", pt: 10 }}>
      <Box
        sx={{
          maxWidth: 420,
          m: "0 auto",
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
          textAlign: "center",
          bgcolor: "background.paper",
        }}
      >
        {/* Hình minh họa */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Box
            sx={{
              width: 120,
              height: 120,
              bgcolor: "#E8F0FE",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LockOutlinedIcon sx={{ fontSize: 60, color: "#5C6BC0" }} />
          </Box>
        </Box>

        <Typography variant="h5" fontWeight={600} gutterBottom>
          This board is private
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Send a request to this board’s admins to get access. If you’re
          approved to join, you'll receive a notification.
        </Typography>

        {/* Thông tin user */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            mb: 3,
            gap: 2,
          }}
        >
          <Avatar src={currentUser?.avatar}></Avatar>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography fontWeight={600}>{currentUser?.displayName}</Typography>
            <Typography color="text.secondary" fontSize={14}>
              {currentUser?.username}
            </Typography>
          </Box>
        </Box>

        <Button variant="contained" fullWidth size="large">
          Send request
        </Button>

        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          sx={{ mt: 2 }}
        >
          By requesting access, you agree to share your account information with
          the board admins.
        </Typography>
      </Box>
    </Box>
  );
};

export default SendRequest;
