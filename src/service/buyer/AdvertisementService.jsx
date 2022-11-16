import http from "../shared/http";

export function getAllAds() {
  return http.get("/ads");
}

export function getAdsById(id){
  return http.get(`/ads/${id}`);
}

export function addPost(form) {
  return http.post("/ads", form);
}
