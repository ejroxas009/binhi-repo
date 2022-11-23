import React from "react";
import BuyerDashboard from "../../component/buyer/BuyerDashboard";
import AppSettingsAltIcon from "@mui/icons-material/AppSettingsAlt";
import Grid from "@mui/material/Grid";
import BuyerSidebar from "../../component/buyer/BuyerSidebar";
import Appbar from "../../component/shared/Appbar";

const BuyerDashboardPage = () => {
  const AppSettingAltIcon = <AppSettingsAltIcon />;
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Appbar />
        </Grid>
        <Grid item md={3}>
          <BuyerSidebar />
        </Grid>

        <Grid item xs={12} sm={12} md={9} lg={9} sx={{ marginTop: 15 }}>
          <BuyerDashboard />
        </Grid>
      </Grid>
    </>
  );
};

export default BuyerDashboardPage;
