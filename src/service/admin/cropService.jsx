import http from "../shared/http";

export function getAllCrops() {
  return http.get("/crop");
}

export function addCrop(form) {
  return http.post("/crop",form);
}

export function deleteCrop(id) {
  return http.delete(`/crop/${id}`);
}

export function getCropById(id) {
  return http.get(`/crop/${id}`);
}