import { ROLE_USER } from "~/utils/constants";

// Các quyền
export const permission = {
  VIEW_CARD: "view_card",
  VIEW_COLUMN: "view_column",
  VIEW_BOARD: "view_board",

  CREATE_CARD: "create_card",
  CREATE_COLUMN: "create_column",
  // CREATE_BOARD: "create_board",

  UPDATE_CARD: "update_card",
  UPDATE_COLUMN: "update_column",
  UPDATE_BOARD: "update_board",

  DELETE_CARD: "delete_card",
  DELETE_COLUMN: "delete_column",
  DELETE_BOARD: "delete_board",

  INVITE_USER: "invite_user",

  REQUEST_JOIN_BOARD: "request_join_board",

  CHANGE_ROLE_USER: "change_role_user",
};

// Kết hợp role với permission
export const rolePermission = {
  [ROLE_USER.MEMBER]: [
    permission.VIEW_CARD,
    permission.VIEW_COLUMN,
    permission.VIEW_BOARD,
    permission.CREATE_CARD,
    permission.CREATE_COLUMN,
    permission.UPDATE_CARD,
    permission.DELETE_CARD,
  ],
  [ROLE_USER.MANAGER]: [
    permission.VIEW_CARD,
    permission.VIEW_COLUMN,
    permission.VIEW_BOARD,
    permission.CREATE_CARD,
    permission.CREATE_COLUMN,
    permission.UPDATE_CARD,
    permission.UPDATE_COLUMN,
    permission.UPDATE_BOARD,
    permission.DELETE_CARD,
    permission.DELETE_COLUMN,
    permission.INVITE_USER,
    permission.REQUEST_JOIN_BOARD,
  ],
  [ROLE_USER.ADMIN]: Object.values(permission),
};
