import { Box, Container, Grid } from '@mui/material'
import React, { useState, useEffect } from 'react'
import AdminAppbar from '../../../component/admin/appbar/AdminAppbar'
import CourseModal from '../../../component/admin/modals/CourseModal/CourseModal'
import AdminSidebar from '../../../component/admin/sidebar/AdminSidebar'
import CoursesTable from '../../../component/admin/tables/CoursesTable/CoursesTable'
import Appbar from '../../../component/shared/Appbar'
import * as courseService from '../../../service/admin/courseService'

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
      <Grid>
        <Grid item xs={12}>
          <Appbar/>
        </Grid>
        <Grid item md={3}>
          <AdminSidebar />
        </Grid>
          <Container fixed>
            <Box mt={20}>
              {courseList && (
                <CoursesTable
                  coursesList={courseList}
                  onSetCourseListToggle={setCourseToggle}
                  courseListToggle={courseToggle}
                />
              )}
            </Box>
          </Container>
      </Grid>
    </>
  )
}

export default CoursesPage