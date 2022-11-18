import React from "react";
import { Grid } from "@mui/material";

import EnrolledCourses from "../../component/farmer/EnrolledCourses";
import FarmerSidebar from "../../component/farmer/FarmerSidebar";
import Appbar from "../../component/shared/appbar/Appbar";

const MyCourses = () => {
  return (
    <>
     <Grid container>
        <Grid item xs={12}>
          <Appbar />
        </Grid>
        <Grid item md={3}>
          <FarmerSidebar />
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} sx={{ marginTop: 15 }}>
          <EnrolledCourses />
        </Grid>
      </Grid>
    </>
  );
};

export default MyCourses;
