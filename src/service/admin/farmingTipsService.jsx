import http from "../shared/http";

export function viewTips() {
    return http.get("/farmingtips");
  }
  
  export function addTips(form) {
    return http.post("/farmingtips", form);
  }