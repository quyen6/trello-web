import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { oauthLogin } from "~/apis";
import { setCurrentUser } from "~/redux/user/userSlice";

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
