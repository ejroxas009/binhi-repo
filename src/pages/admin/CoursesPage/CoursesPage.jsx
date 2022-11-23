import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import AdminSidebar from "../../../component/admin/sidebar/AdminSidebar";
import CoursesTable from "../../../component/admin/tables/CoursesTable/CoursesTable";
import Appbar from "../../../component/shared/Appbar";
import * as courseService from "../../../service/admin/courseService";

const CoursesPage = () => {
  const [courseList, setCourseList] = useState();
  const [courseToggle, setCourseToggle] = useState(false);

  const getAllCoursesFunction = async () => {
    const res = await courseService.viewCourses();

    setCourseList(res.data);
    setCourseToggle(!courseToggle);
  };
  useEffect(() => {
    getAllCoursesFunction();
  }, []);

  useEffect(() => {
    console.log(courseList);
  }, [courseToggle]);
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Appbar />
        </Grid>
        <Grid item md={3}>
          <AdminSidebar />
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} sx={{ marginTop: 10 }}>
          {courseList && (
            <CoursesTable
              coursesList={courseList}
              onSetCourseListToggle={setCourseToggle}
              courseListToggle={courseToggle}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default CoursesPage;
