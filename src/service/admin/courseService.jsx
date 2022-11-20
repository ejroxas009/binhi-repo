import http from "../shared/http";

export function viewCourses() {
    return http.get("/course");
  }

  export function addCourse(form) {
    return http.post("/course",form);
  }
  
export function getAccountById(id) {
    return http.get(`/account/${id}`);
  }
  
export function getCourseEnroll(){
  return http.get("/enroll-course")
}

export function postCourseEnroll(){
  return http.post("/enroll-course")
}
export function getAccessToken() {
    return localStorage.getItem("accessToken");
  }