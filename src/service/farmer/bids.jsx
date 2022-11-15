import http from "../shared/http";

export function getAllBid() {
  return http.get("/bid");
}

export function getBidById(id) {
  return http.get(`/bid/${id}`);
}

export function addBid(form) {
  return http.post("/bid", form);
}
export function getCurrentUser() {
  return http.get();
}
