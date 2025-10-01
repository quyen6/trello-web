import { Box } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { oauthLogin } from "~/apis";
import HeaderIntroduction from "~/pages/Introduction/HeaderIntroduction/HeaderIntroduction";
import { setCurrentUser } from "~/redux/user/userSlice";
import { API_ROOT } from "~/utils/constants";

const AuthSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const handleOAuthSuccess = async () => {
      const dataUser = await oauthLogin();
      if (dataUser) {
        dispatch(setCurrentUser(dataUser));
        navigate("/");
      }
    };
    handleOAuthSuccess();
  }, [dispatch, navigate]);

  return <></>;
};

export default AuthSuccess;
