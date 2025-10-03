import {
  Box,
  Button,
  Container,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import IntroductionTrello from "~/assets/introduction_trello.png";
import { useForm } from "react-hook-form";

import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
} from "~/utils/validators";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useSelector } from "react-redux";
import { selectorCurrentUser } from "~/redux/user/userSlice";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const ContentIntroduction = () => {
  const isMdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const user = useSelector(selectorCurrentUser);
  const handleRegister = (data) => {
    const { email } = data;
    return navigate("/register", { state: { email } });
  };
  const wiggle = {
    "@keyframes wiggle": {
      "0%": { transform: "rotate(0deg)" },
      "10%": { transform: "rotate(4deg)" },
      "20%": { transform: "rotate(-4deg)" },
      "30%": { transform: "rotate(4deg)" },
      "40%": { transform: "rotate(-4deg)" },
      "50%": { transform: "rotate(0deg)" }, // kết thúc lắc
      "100%": { transform: "rotate(0deg)" },
    },
  };

  return (
    <Box
      sx={{
        bgcolor: "rgb(244, 246, 254)",
        mt: (theme) => theme.trello.introductionHeaderHeight,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          padding: {
            xs: "0 0.5rem",
            md: "0 1rem",
          },
          // maxWidth: {
          //   xs: "720px",
          //   md: "100%",
          // },
          margin: "0 auto",
        }}
      >
        {user && (
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              fontWeight: 600,
              padding: "4rem 0 0 0",

              color: (theme) => theme.trello.textColorPrimary,
            }}
          >
            🎉 Welcome {user?.displayName}
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            width: "100%",

            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* Left */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: {
                xs: "3rem 2rem 2rem 2rem",
                md: user ? "6rem 1rem" : "9rem 1rem",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "2rem", md: "3rem" },
                  textAlign: { xs: "center", md: "left" },
                  color: (theme) => theme.trello.textColorPrimary,
                }}
              >
                Trello brings all your tasks, teammates, and tools together
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  mt: 2,
                  fontSize: { xs: "1.25rem", md: "1.5rem" },
                  textAlign: { xs: "center", md: "left" },
                  color: (theme) => theme.trello.textColorPrimary,
                }}
              >
                Keep everything in the same place—even if your team isn't.
              </Typography>
            </Box>
            <form onSubmit={handleSubmit(handleRegister)}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1}
                sx={{
                  width: "100%",
                  mt: {
                    xs: 2,
                    md: 4,
                  },
                  justifyContent: {
                    xs: "center",
                    md: "flex-start",
                  },
                }}
              >
                <TextField
                  fullWidth
                  sx={{
                    flex: { xs: 0, sm: 0.6, md: 1 },
                    maxWidth: "300px",
                    display: {
                      xs: "none",
                      sm: "flex",
                    },
                    opacity: !isMdDown ? (user ? 0 : 1) : undefined,
                    visibility: !isMdDown
                      ? user
                        ? "hidden"
                        : "unset"
                      : undefined,

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
                      color: "#212121",
                      "&.Mui-focused": {
                        color: "rgb(0, 134, 137)",
                      },
                    },
                  }}
                  label="Enter Email..."
                  type="email"
                  {...register("email", {
                    validate: (value) => {
                      if (!value) return true;
                      return EMAIL_RULE.test(value) || EMAIL_RULE_MESSAGE;
                    },
                  })}
                />

                <Button
                  type={!user ? "submit" : "button"}
                  variant="contained"
                  sx={{
                    padding: "0.8rem 1rem",
                    bgcolor: (theme) => theme.trello.subColorLight,
                    border: "none",
                    color: (theme) => theme.trello.mainColorDark,
                    fontSize: "1rem",
                    "&:hover": { bgcolor: "#017273" },
                    ...wiggle,
                    animation: "wiggle 3s ease-in-out infinite",
                  }}
                  endIcon={user ? <ArrowForwardIcon /> : null}
                  onClick={user ? () => navigate("/boards") : null}
                >
                  {!user ? "Sign up – it’s free" : "Start Using Trello"}
                </Button>
              </Stack>
            </form>
          </Box>

          {/* Right */}
          <Box
            component="img"
            src={IntroductionTrello}
            loading="lazy"
            sx={{
              flex: 1,
              width: { xs: "80%", md: "50%" },
              height: "60%",
              mt: { xs: 4, md: 10 },
              margin: {
                xs: "0 auto",
                md: "",
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default ContentIntroduction;
