import http from "../shared/http";

export function getAllAds() {
  return http.get("/ads");
}
