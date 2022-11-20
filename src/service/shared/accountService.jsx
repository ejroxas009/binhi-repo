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

export function editAccount(id, form) {
  return http.put(`/account/edit/${id}`, form);
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

export function changePW(id, form) {
  return http.put(`/account/change-password/${id}`, form);
}

export function changeProfileImage(id, url) {
  return http.put(`/account/change-profileImg/${id}`, url);
}

export function getCurrentUser() {
  // console.log("getCurrentUser()");
  return http.get("");
}

export function uploadGCashQR(id, form) {
  return http.put(`account/change-gcash-qr/${id}`, form);
}
