// TrungQuanDev: https://youtube.com/@trungquandev
import { Link, useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";
import { Divider, Card as MuiCard, SvgIcon } from "@mui/material";
import TrelloIcon from "~/assets/trello.svg?react";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import Zoom from "@mui/material/Zoom";
import { useForm } from "react-hook-form";
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_CONFIRMATION_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
} from "~/utils/validators";
import FieldErrorAlert from "~/components/Form/FieldErrorAlert";
import { toast } from "react-toastify";
import { registerUserAPI } from "~/apis";
import GgIcon from "~/assets/auth/icon-google.svg?react";
import GhIcon from "~/assets/auth/icon-github.svg?react";

import { API_ROOT } from "~/utils/constants";
import { FormTextField } from "~/components/Form/FormTextField";
function RegisterForm() {
  const location = useLocation();
  const emailFromSignup = location.state?.email || "";
  const emailWantToRegister = location.state?.emailWantToRegister || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      email: emailFromSignup || emailWantToRegister,
    },
  });
  const navigate = useNavigate();
  const submitRegister = async (data) => {
    const { email, password } = data;
    toast
      .promise(registerUserAPI({ email, password }), {
        pending: "Registration is in progress...",
      })
      .then((user) => {
        navigate(`/login?registeredEmail=${user.email}`);
      });
  };
  const socialLogins = [
    {
      label: "Google",
      url: `${API_ROOT}/v1/auth/google`,
      icon: GgIcon,
    },
    {
      label: "GitHub",
      url: `${API_ROOT}/v1/auth/github`,
      icon: GhIcon,
    },
  ];
  return (
    <form onSubmit={handleSubmit(submitRegister)}>
      <Zoom in={true} style={{ transitionDelay: "200ms" }}>
        <MuiCard
          sx={{
            minWidth: 350,
            maxWidth: 350,
            marginTop: "4em",
            py: 2,
            bgcolor: "#fff",
            "& .MuiInputBase-input": {
              color: "#212121", // màu chữ của input + label
            },
            "& .MuiInputLabel-root": {
              color: "#c4c4c4",
            },
          }}
        >
          <Box
            sx={{
              margin: "1em",
              display: "flex",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Avatar sx={{ bgcolor: "#1976d2" }}>
              <LockIcon sx={{ color: "white" }} />
            </Avatar>
            <Avatar sx={{ bgcolor: "#1976d2" }}>
              <SvgIcon
                component={TrelloIcon}
                inheritViewBox
                fontSize="medium"
                sx={{ color: "white" }}
              />
            </Avatar>
          </Box>
          {/* <Box
            sx={{
              marginTop: "1em",
              display: "flex",
              justifyContent: "center",
              color: (theme) => theme.palette.grey[500],
            }}
          >
            Author: TrungQuanDev
          </Box> */}
          <Box sx={{ padding: "0 1em 1em 1em" }}>
            <Box sx={{ marginTop: "1em" }}>
              <FormTextField
                // autoComplete="nope"
                name="email"
                autoFocus
                label="Enter Email..."
                type="text"
                error={!!errors["email"]}
                register={register}
                rules={{
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: EMAIL_RULE,
                    message: EMAIL_RULE_MESSAGE,
                  },
                }}
              />

              <FieldErrorAlert errors={errors} fieldName={"email"} />
            </Box>
            <Box sx={{ marginTop: "1em" }}>
              <FormTextField
                // autoComplete="nope"
                name="password"
                label="Enter Password..."
                type="password"
                error={!!errors["password"]}
                register={register}
                rules={{
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE,
                  },
                }}
              />

              {/* errors bên trong là errors của react hook form */}
              <FieldErrorAlert errors={errors} fieldName={"password"} />
            </Box>
            <Box sx={{ marginTop: "1em" }}>
              <FormTextField
                // autoComplete="nope"
                name="confirmPassword"
                label="Enter Password Confirmation..."
                type="password"
                error={!!errors["confirmPassword"]}
                register={register}
                rules={{
                  validate: (value) => {
                    if (value === watch("password")) return true;
                    return PASSWORD_CONFIRMATION_MESSAGE;
                  },
                }}
              />

              {/* errors bên trong là errors của react hook form */}
              <FieldErrorAlert errors={errors} fieldName={"confirmPassword"} />
            </Box>
          </Box>
          <CardActions sx={{ padding: "0 1em 1em 1em" }}>
            <Button
              className="interceptor-loading"
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{
                fontSize: "1rem",
                backgroundColor: "rgb(0, 134, 137)",
                color: "#fff",
              }}
            >
              Sign up
            </Button>
          </CardActions>{" "}
          <Box
            sx={{
              padding: "0 1em 1em 1em",
              textAlign: "center",
              display: "flex",
            }}
          >
            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: "500",
                color: "#091e42",
              }}
            >
              &nbsp; Already have an account!{" "}
            </Typography>
            <Link
              to="/login"
              state={{ emailWantToRegister: watch("email") }}
              style={{ textDecoration: "none" }}
            >
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  color: "rgb(218, 28, 45)",
                  "&:hover": { color: "rgba(171, 5, 19, 1)" },
                }}
              >
                &nbsp; Log in!
              </Typography>
            </Link>
          </Box>
          <Divider
            sx={{
              mx: 2,
              mb: 1,

              "&::before, &::after": {
                borderColor: "#c4c4c4",
              },
            }}
          >
            <Typography
              variant="body2"
              color="#212121"
              sx={{ fontSize: "1rem" }}
            >
              Or continue with
            </Typography>
          </Divider>
          {/* <Divider sx={{ mx: 2, mb: 1 }} /> */}
          {socialLogins.map((i) => (
            <CardActions sx={{ px: 2 }} key={i.label}>
              <Button
                disableRipple
                onClick={() => {
                  window.location.href = i.url;
                }}
                variant="outlined"
                size="large"
                fullWidth
                startIcon={
                  <SvgIcon
                    component={i.icon}
                    inheritViewBox
                    fontSize="large"
                    sx={{ width: "25px", height: "25px" }}
                  />
                }
                sx={{
                  borderColor: "rgb(0, 134, 137)",

                  fontWeight: 600,
                  fontSize: "1rem",
                  color: "#091e42",
                  lineHeight: 1.75,
                  borderRadius: 1,
                  transition: "all 0.3s ease",
                  // "&:hover": {
                  //   backgroundColor: "#1976d2",
                  //   boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
                  // },
                }}
              >
                {i.label}
              </Button>
            </CardActions>
          ))}
        </MuiCard>
      </Zoom>
    </form>
  );
}

export default RegisterForm;
