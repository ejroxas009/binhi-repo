import http from "../shared/http";

export function getAllAds() {
  return http.get("/ads");
}

export function getAllCropPayment() {
  return http.get("/crop-payment");
}

export function getAllCropReceived() {
  return http.get("crop-received");
}
