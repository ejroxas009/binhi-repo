import React from "react";
import { Grid } from "@mui/material";
//components
import BuyerSidebar from "../../component/buyer/BuyerSidebar";
import Appbar from "../../component/shared/appbar/Appbar";
import CurrentAdsCard from "../../component/buyer/CurrentAdsCard";

const CurrentAdsPage = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Appbar />
        </Grid>
        <Grid item md={3}>
          <BuyerSidebar />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ marginTop: 10 }}>
          <CurrentAdsCard />
        </Grid>
      </Grid>
    </>
  );
};

export default CurrentAdsPage;
