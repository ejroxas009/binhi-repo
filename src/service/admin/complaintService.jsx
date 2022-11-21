import http from "../shared/http";

export function viewComplaints() {
    return http.get("/complaints");
  }

  export function getComplaintsById(id) {
    return http.get(`/complaints/${id}`)
  }
  
export function getAccountById(id) {
    return http.get(`/account/${id}`);
  }
  
  
export function getAccessToken() {
    return localStorage.getItem("accessToken");
  }