import http from "../shared/http";

export function getAllBid(){
    return http.get("/bid");
}

export function getBidById(id) {
    return http.get(`/bid/${id}`);
}

export function getAllAds() {
    return http.get("/ads");
}