import http from "../shared/http";

export function viewAds() {
    return http.get("/ads");
  }
  
export function getAccountById(id) {
    return http.get(`/account/${id}`);
  }
  
  
export function getAccessToken() {
    return localStorage.getItem("accessToken");
  }