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

export function getCropPaymentById(id) {
  return http.get(`/crop-payment/${id}`);
}

export function addCropPayment(form) {
  return http.post("/crop-payment", form);
}

export function addCropReceived(form) {
  return http.post("crop-received", form);
}

export function setPaymentMethod(paymentId, form) {
  return http.put(`/crop-payment/change-payment-mode/${paymentId}`, form);
}

export function markAsPaid(paymentId) {
  return http.put(`crop-payment/mark-as-paid/${paymentId}`);
}

export function sendProofOfPayment(paymentId, form) {
  return http.put(`crop-payment/send-proof-of-payment/${paymentId}`, form);
}

export function sendProofOfPaymentCropReceived(paymentId, form) {
  return http.put(`crop-received/send-proof-of-payment/${paymentId}`, form);
}

export function receivePayment(paymentId) {
  return http.put(`/crop-payment/receive-payment/${paymentId}`);
}

export function receiveCrop(receiveId) {
  return http.put(`/crop-received/receive-crop/${receiveId}`);
}

export function markAsCOD(paymentId) {
  return http.put(`/crop-payment/mark-as-cod/${paymentId}`);
}
