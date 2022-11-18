import React from "react";
// import { Box, Container } from '@mui/material'
import Grid from "@mui/material/Grid";

//components
import ComplaintsTable from "../../component/farmer/ComplaintsTable";
import FarmerSidebar from "../../component/farmer/FarmerSidebar";
import Appbar from "../../component/shared/appbar/Appbar";

const MyComplaints = () => {
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
          <ComplaintsTable />
        </Grid>
      </Grid>
    </>
  );
};

export default MyComplaints;
