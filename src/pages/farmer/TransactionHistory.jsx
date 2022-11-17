import React from "react";
import Grid from "@mui/material/Grid";

import FarmerSidebar from "../../component/farmer/FarmerSidebar";
import Appbar from "../../component/shared/appbar/Appbar";
import MyTransaction from "../../component/shared/MyTransaction";

const TransactionHistory = () => {
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
          <MyTransaction />
        </Grid>
      </Grid>
    </>
  );
};

export default TransactionHistory;
