import http from "./http";

export function getAllAds() {
  return http.get("/ads");
}
