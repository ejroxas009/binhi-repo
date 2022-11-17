import { Grid } from '@mui/material'
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
        <Grid container>
        <Grid item xs={12}>
          <AdminAppbar />
        </Grid>
        <Grid item md={3}>
          <AdminSidebar />
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} sx={{ marginTop: 15 }}>
        {courseList &&(
              <CoursesTable details={courseList}/>
            )}
        </Grid>
      </Grid>
    </>
  )
}

export default CoursesPage