import http from "../shared/http";

export function getAllAds() {
  return http.get("/ads");
}

export function getAllCropPayment() {
  return http.get("/crop-payment");
}

export function getAllCropReceived() {
  return http.get("/crop-received");
}

export function addCropPayment(form) {
  return http.post("/crop-payment", form);
}

export function addCropReceived(form) {
  return http.post("crop-received", form);
}
