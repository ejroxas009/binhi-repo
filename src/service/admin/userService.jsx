import http from "../shared/http";

export function viewAccount() {
    return http.get("/account");
  }

export function addUser(account) {
  return http.post("/account/register", account);
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