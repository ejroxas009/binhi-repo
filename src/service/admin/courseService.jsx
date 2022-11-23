import http from "../shared/http";

export function viewCourses() {
  return http.get("/course");
}

export function addCourse(form) {
  return http.post("/course", form);
}

export function getAccountById(id) {
  return http.get(`/account/${id}`);
}

export function getCourseEnroll() {
  return http.get("/enroll-course");
}

export function getCourseEnrollById(id) {
  return http.get(`/enroll-course/${id}`);
  
export function getCourseById(id) {
    return http.get(`/course/${id}`);
  }

export function deleteCourse(id) {
  return http.delete(`/course/${id}`);
}

export function postCourseEnroll(form) {
  return http.post("/enroll-course", form);
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}
