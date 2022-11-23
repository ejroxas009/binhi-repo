import React from "react";
import Profile from "../../component/shared/Profile";
import BuyerSidebar from "../../component/buyer/BuyerSidebar";
import Appbar from "../../component/shared/Appbar";
import Grid from "@mui/material/Grid";

const ProfilePage = () => {
  return (
    <>
      <Grid>
          <Appbar />
          <BuyerSidebar />
          <Profile />
      </Grid>
    </>
  );
};

export default ProfilePage;
