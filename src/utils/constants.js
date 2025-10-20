let apiRoot = "";

if (import.meta.env.DEV === true) {
  apiRoot = "http://localhost:8017";
}
if (import.meta.env.PROD === true) {
  apiRoot = "https://trello-api-hzwk.onrender.com";
}

export const API_ROOT = apiRoot;

export const DEFAULT_PAGE = 1;
export const DEFAULT_ITEM_PER_PAGE = 12;

export const CARD_MEMBER_ACTIONS = {
  ADD: "ADD",
  REMOVE: "REMOVE",
};

export const ROLE_USER = {
  ADMIN: "Admin",
  MANAGER: "Manager",
  MEMBER: "Member",
  // VIEWER: "Viewer",
};
export const CHANGE_ROLE_USER_OR_KICK_LEAVE = {
  // ADMIN: "Admin",
  MANAGER: "Manager",
  MEMBER: "Member",
  KICK: "Kick",
  LEAVE: "Leave",
  // VIEWER: "Viewer",
};
