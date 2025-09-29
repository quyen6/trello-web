import {
  Box,
  Button,
  Container,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
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
const ContentHeader = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const handleRegister = (data) => {
    const { email } = data;
    return navigate("/register", { state: { email } });
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
        <Box
          sx={{
            display: "flex",
            width: "100%",

            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: { xs: "3rem 2rem 2rem 2rem", md: "7.5rem 0 3rem 2rem" },
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
                  color: "#091e42",
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
                  color: "#091e42",
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
                  type="submit"
                  variant="contained"
                  sx={{
                    padding: "0.8rem 1rem",

                    bgcolor: (theme) => theme.trello.subColorLight,
                    border: "none",
                    color: (theme) => theme.trello.mainColorDark,
                    fontSize: "1rem",
                    "&:hover": { bgcolor: "#017273" },
                  }}
                >
                  Sign up – it’s free
                </Button>
              </Stack>
            </form>
          </Box>

          <Box
            component="img"
            src={IntroductionTrello}
            loading="lazy"
            sx={{
              flex: 1,
              width: { xs: "80%", md: "50%" },
              height: "60%",
              mt: { xs: 4, md: 10, lg: 2 },
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

export default ContentHeader;
