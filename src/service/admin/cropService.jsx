import http from "../shared/http";

export function getAllCrops() {
  return http.get("/crop");
}

export function addCrop(form) {
  return http.post("/crop",form);
}
