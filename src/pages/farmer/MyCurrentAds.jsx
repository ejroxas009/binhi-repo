import React from "react";
import { Box, Container } from "@mui/material";

//components
import AdsCard from "../../component/farmer/AdsCard";
import FarmerSidebar from "../../component/farmer/FarmerSidebar";
import Appbar from "../../component/shared/appbar/Appbar";

const MyCurrentAds = () => {
  return (
    <>
      <Appbar />
      <FarmerSidebar />
      <Container fixed>
        <Box mt={10}>
          <AdsCard />
        </Box>
      </Container>
    </>
  );
};

export default MyCurrentAds;
