import React from "react";
import { Grid } from "@mui/material";

//components
import AdsCard from "../../component/farmer/AdsCard";
import FarmerSidebar from "../../component/farmer/FarmerSidebar";
import Appbar from "../../component/shared/Appbar";

const MyCurrentAds = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Appbar />
        </Grid>
        <Grid item md={3}>
          <FarmerSidebar />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ marginTop: 10 }}>
          <AdsCard />
        </Grid>
      </Grid>
    </>
  );
};

export default MyCurrentAds;
