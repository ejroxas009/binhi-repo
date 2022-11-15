import http from "../shared/http";

export function getAllAds() {
  return http.get("/ads");
}

export function addPost(form) {
  return http.post("/ads", form);
}
