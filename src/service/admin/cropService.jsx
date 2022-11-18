import http from "../shared/http";

export function getAllCrops() {
  return http.get("/crop");
}
