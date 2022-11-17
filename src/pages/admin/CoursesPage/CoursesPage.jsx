import { Box, Container } from '@mui/material'
import React, { useState, useEffect } from 'react'
import AdminAppbar from '../../../component/admin/appbar/AdminAppbar'
import AdminSidebar from '../../../component/admin/sidebar/AdminSidebar'
import CoursesTable from '../../../component/admin/tables/CoursesTable/CoursesTable'
import * as courseService from '../../../service/admin/courseService'

const CoursesPage = () => {
  const [courseList, setCourseList] = useState();
  const [courseListToggle, setCourseListToggle] = useState();

  useEffect(() => {
    const viewCourses = async () => {
      const res = await courseService.viewCourses();
      // console.log(res.data);
      setCourseList(res.data);
    }
    
    viewCourses();
    setCourseListToggle(!courseListToggle);
  },[])

  useEffect(() => {
    console.log(courseList);
  },[courseListToggle])
  return (
    <>
        <AdminSidebar/>
        <Container fixed>
          <Box mt={20}>
            {courseList &&(
              <CoursesTable details={courseList}/>
            )}
          </Box>
        </Container>
    </>
  )
}

export default CoursesPage