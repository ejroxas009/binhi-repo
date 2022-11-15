import http from "../shared/http";

export function viewTips() {
    return http.get("/farmingtips");
  }
  
export function getAccountById(id) {
    return http.get(`/account/${id}`);
  }
  
  
export function getAccessToken() {
    return localStorage.getItem("accessToken");
  }