import React from 'react'
import { Box, Container } from "@mui/material";
//components
import BuyerSidebar from "../../component/buyer/BuyerSidebar";
import Appbar from "../../component/shared/appbar/Appbar";
import BidCard from "../../component/farmer/BidCard";

const CurrentBidsPage = () => {
  return (
    <>
    <Appbar/>
    <BuyerSidebar/>
    <Container fixed>
        <Box mt={10}>
          <BidCard />
        </Box>
      </Container>
    </>
  )
}

export default CurrentBidsPage