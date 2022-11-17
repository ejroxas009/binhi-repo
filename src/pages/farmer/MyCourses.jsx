import React from "react";
import { Box, Container } from "@mui/material";

import EnrolledCourses from "../../component/farmer/EnrolledCourses";
import FarmerSidebar from "../../component/farmer/FarmerSidebar";
import Appbar from "../../component/shared/appbar/Appbar";

const MyCourses = () => {
  return (
    <>
      <Appbar />
      <FarmerSidebar />
      <Container fixed>
        <Box mt={20}>
          <EnrolledCourses />
        </Box>
      </Container>
    </>
  );
};

export default MyCourses;
