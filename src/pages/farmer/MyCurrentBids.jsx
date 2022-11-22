import React from "react";
import { Grid } from "@mui/material";

//components
import BidCard from "../../component/farmer/BidCard";
import FarmerSidebar from "../../component/farmer/FarmerSidebar";
import Appbar from "../../component/shared/Appbar";

const MyCurrentBids = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Appbar />
        </Grid>
        <Grid item md={3}>
          <FarmerSidebar />
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} sx={{ marginTop: 10 }}>
        <BidCard />
        </Grid>
      </Grid>
    </>
  );
};

export default MyCurrentBids;
