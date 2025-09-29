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

export const DOMAIN_AUTH0 = "dev-1h2l1bn8zdriryq5.us.auth0.com";
export const CLIENTID = "6ckB1rMAdTDGc2x9CtFKh0hjYZSw7X5w";
