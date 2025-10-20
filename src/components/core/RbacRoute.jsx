import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { roles } from "~/config/rbacConfig";
import { usePermission } from "~/hooks/usePermission";
import { selectorCurrentActiveBoard } from "~/redux/activeBoard/activeBoardSlice";
import { selectorCurrentUser } from "~/redux/user/userSlice";
import { ROLE_USER } from "~/utils/constants";

const RbacRoute = ({
  requiredPermission,
  redirectTo = "/no_permission",
  children,
}) => {
  const activeBoard = useSelector(selectorCurrentActiveBoard);
  const currentUser = useSelector(selectorCurrentUser);
  const userRole =
    activeBoard.memberIds.find((m) => m.userId === currentUser._id)?.role ||
    ROLE_USER.MEMBER;

  const { hasPermission } = usePermission(userRole);

  if (!hasPermission(requiredPermission))
    return <Navigate to={redirectTo} replace={true} />;

  return <Outlet />; // dugf cho react-router-dom v6

  // return children; // dugf cho react-router-dom v5 trở xuống
};

export default RbacRoute;
