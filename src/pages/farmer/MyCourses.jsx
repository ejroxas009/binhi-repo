import React from 'react'

import EnrolledCourses from '../../component/farmer/EnrolledCourses';
import FarmerSidebar from "../../component/farmer/FarmerSidebar";
import Appbar from "../../component/shared/appbar/Appbar";

const MyCourses = () => {
  return (
    <>
      <Appbar/>
      <FarmerSidebar/>
      <EnrolledCourses/>
    </>
  );
}

export default MyCourses