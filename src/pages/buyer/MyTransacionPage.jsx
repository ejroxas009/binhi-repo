import React from "react";
import MyTransaction from "../../component/shared/MyTransaction";
import BuyerSidebar from "../../component/buyer/BuyerSidebar";
import Appbar from "../../component/shared/Appbar";
import Grid from "@mui/material/Grid";

const MyTransacionPage = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Appbar />
        </Grid>
        <Grid item md={3}>
          <BuyerSidebar />
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} sx={{ marginTop: 10 }}>
          <MyTransaction />
        </Grid>
      </Grid>
    </>
  );
};

export default MyTransacionPage;
