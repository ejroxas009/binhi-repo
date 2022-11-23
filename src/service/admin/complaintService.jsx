import http from "../shared/http";

export function viewComplaints() {
  return http.get("/complaints");
}

export function getComplaintsById(id) {
  return http.get(`/complaints/${id}`);
}

export function toogleIsRead(id) {
  return http.put(`/complaints/complaint-status/${id}`);
}

export function toggleIsResolved(id) {
  return http.put(`/complaints/complaint-solution/${id}`);
}

export function getAccountById(id) {
  return http.get(`/account/${id}`);
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}
