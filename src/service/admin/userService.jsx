import http from "./http";

export function viewAccount(id) {
    return http.get(`/account/${id}`);
  }
  
export function getAllAccount() {
    return http.get("/account");
  }
  
export function getAccountById(id) {
    return http.get(`/account/${id}`);
  }
  
export function logout() {
    localStorage.removeItem("accessToken");
  }
  
export function getAccessToken() {
    return localStorage.getItem("accessToken");
  }