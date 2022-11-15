import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { getAccountById } from "../../service/shared/accountService";
import Profile from "../../component/shared/Profile";
import BuyerSidebar from "../../component/buyer/BuyerSidebar";
import Appbar from "../../component/shared/appbar/Appbar";
import Grid from "@mui/material/Grid";

const ProfilePage = ({ token }) => {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Appbar />
        </Grid>
        <Grid item md={3}>
          <BuyerSidebar />
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={9} sx={{ marginTop: 2 }}>
          <Profile />
        </Grid>
      </Grid>
    </>
  );
};

export default ProfilePage;
