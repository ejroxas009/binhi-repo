import http from "./http";

export function addAccount(account) {
  return http.post("/account/register", account);
}

export function getAllAccount() {
  return http.get("/account");
}

export function getAccountById(id) {
  return http.get(`/account/${id}`);
}

export function login(form) {
  return http.post("account/login", form);
}

export function logout() {
  localStorage.removeItem("accessToken");
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}
