import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";

//components
import CoursesList from "../../component/farmer/CoursesList";
import FarmerSidebar from "../../component/farmer/FarmerSidebar";
import Appbar from "../../component/shared/appbar/Appbar";

//services
import * as courseService from "../../service/admin/courseService";

const Courses = () => {
  const [courseList, setCourseList] = useState();
  const [courseListToggle, setCourseListToggle] = useState();

  useEffect(() => {
    const viewCourses = async () => {
      const res = await courseService.viewCourses();
      // console.log(res.data);
      setCourseList(res.data);
    };

    viewCourses();
    setCourseListToggle(!courseListToggle);
  }, []);

  useEffect(() => {
    console.log(courseList);
  }, [courseListToggle]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Appbar />
      </Grid>
      <Grid item md={3}>
        <FarmerSidebar />
      </Grid>
      <Grid item xs={12} sm={12} md={8} lg={8} sx={{ marginTop: 10 }}>
        {courseList && <CoursesList details={courseList} />}
      </Grid>
    </Grid>
  );
};

export default Courses;
