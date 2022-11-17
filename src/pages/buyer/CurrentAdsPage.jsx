import React from 'react'
import { Box, Container } from "@mui/material";
//components
import BuyerSidebar from "../../component/buyer/BuyerSidebar";
import Appbar from "../../component/shared/appbar/Appbar";
import CurrentAdsCard from '../../component/buyer/CurrentAdsCard';

const CurrentAdsPage = () => {
  return (
    <>
    <Appbar/>
    <BuyerSidebar/>
    <Container fixed>
        <Box mt={10}>
          <CurrentAdsCard />
        </Box>
      </Container>
    </>
  )
}

export default CurrentAdsPage