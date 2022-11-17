import React, { useState, useEffect } from 'react'
import { Box, Container } from '@mui/material'

//components
import CoursesList from '../../component/farmer/CoursesList';
import FarmerSidebar from "../../component/farmer/FarmerSidebar";
import Appbar from "../../component/shared/appbar/Appbar";

//services
import * as courseService from '../../service/admin/courseService'

const Courses = () => {
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
      <Appbar/>
      <FarmerSidebar/>
      <Container fixed>
          <Box mt={20}>
            {courseList &&(
      <CoursesList details={courseList}/>
      )}
    </Box>
  </Container>
    </>
  );
}

export default Courses;