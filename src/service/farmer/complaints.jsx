import http from "../shared/http";

export function getAllComplaints(){
    return http.get("/complaints");
}