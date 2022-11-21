import http from "../shared/http";

export function viewAccount() {
    return http.get("/account");
  }

export function addUser() {
  return http.post("/register");
}
  
export function getAccountById(id) {
    return http.get(`/account/${id}`);
  }

export function blockUser(id){
  return http.put(`/account/set-active/${id}`);
}
  
export function getAccessToken() {
    return localStorage.getItem("accessToken");
  }