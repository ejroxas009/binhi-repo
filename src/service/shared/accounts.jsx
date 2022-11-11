import http from "./http";

export function login(form) {
  return http.post("/login", form);
}

export function getUserById(id) {
  //   console.log("getUserById(id)");
  return http.get(`/account/${id}`);
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function logout() {
  localStorage.removeItem("accessToken");
}

export function getAllAccount() {
  return http.get("/account");
}
