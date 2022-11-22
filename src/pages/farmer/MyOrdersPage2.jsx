import React from "react";
import MyOrders from "../../component/shared/MyOrders";
import FarmerSidebar from "../../component/farmer/FarmerSidebar";
import Appbar from "../../component/shared/Appbar";
import Grid from "@mui/material/Grid";

const MyOrdersPage2 = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Appbar />
      </Grid>
      <Grid item md={3}>
        <FarmerSidebar />
      </Grid>
      <Grid item xs={12} sm={12} md={8} lg={8} sx={{ marginTop: 10 }}>
        <MyOrders />
      </Grid>
    </Grid>
  );
};

export default MyOrdersPage2;
