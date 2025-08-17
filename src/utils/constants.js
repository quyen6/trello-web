let apiRoot = "";

if (import.meta.env.DEV === true) {
  apiRoot = "http://localhost:8017";
}
if (import.meta.env.PROD === true) {
  apiRoot = "https://trello-api-hzwk.onrender.com";
}

export const API_ROOT = apiRoot;
