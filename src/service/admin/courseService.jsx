import http from "../shared/http";

export function viewCourses() {
    return http.get("/course");
  }

  export function addCourse(form) {
    return http.post("/course",form);
  }
  
export function getCourseById(id) {
    return http.get(`/course/${id}`);
  }

export function deleteCourse(id) {
  return http.delete(`/course/${id}`);
}
  
export function getCourseEnroll(){
  return http.get("/enroll-course")
}

export function postCourseEnroll(form){
  return http.post("/enroll-course", form)
}

export function getAccessToken() {
    return localStorage.getItem("accessToken");
  }