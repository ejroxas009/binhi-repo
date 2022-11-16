import React from "react";
import { Box, Container } from "@mui/material";

//components
import BidCard from "../../component/farmer/BidCard";
import FarmerSidebar from "../../component/farmer/FarmerSidebar";
import Appbar from "../../component/shared/appbar/Appbar";

const MyCurrentBids = () => {
  return (
    <>
      <Appbar />
      <FarmerSidebar />
      <Container fixed>
        <Box mt={10}>
          <BidCard />
        </Box>
      </Container>
    </>
  );
};

export default MyCurrentBids;
