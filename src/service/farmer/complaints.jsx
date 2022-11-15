import http from "../shared/http";

export function getAllComplaints() {
  return http.get("/complaints");
}

export function addComplaints(form) {
  return http.post("/complaints", form);
}
