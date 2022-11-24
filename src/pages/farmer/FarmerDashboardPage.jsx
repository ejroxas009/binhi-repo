import React from "react";

import FarmerSidebar from "../../component/farmer/FarmerSidebar";
import Appbar from "../../component/shared/Appbar";
import FarmerDashboard from "../../component/farmer/FarmerDashboard";
import Grid from "@mui/material/Grid";

const FarmerDashboardPage = () => {
  return (
    <>
      <Appbar />
      <FarmerSidebar />

      <Grid container>
        <Grid item xs={12}>
          <Appbar />
        </Grid>
        <Grid item md={3}>
          <FarmerSidebar />
        </Grid>

        <Grid item xs={12} sm={12} md={9} lg={8} sx={{ marginTop: 15 }}>
          <FarmerDashboard />
        </Grid>
      </Grid>
    </>
  );
};

export default FarmerDashboardPage;
