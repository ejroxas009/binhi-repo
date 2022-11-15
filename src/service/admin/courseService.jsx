import http from "../shared/http";

export function viewCourses() {
    return http.get("/course");
  }
  
export function getAccountById(id) {
    return http.get(`/account/${id}`);
  }
  
  
export function getAccessToken() {
    return localStorage.getItem("accessToken");
  }