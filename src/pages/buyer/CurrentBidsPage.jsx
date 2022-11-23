import React from 'react'
import { Grid } from "@mui/material";
//components
import BuyerSidebar from "../../component/buyer/BuyerSidebar";
import Appbar from "../../component/shared/Appbar";
import BidCard from "../../component/farmer/BidCard";

const CurrentBidsPage = () => {
  return (
    <>
     <Grid container>
        <Grid item xs={12}>
          <Appbar />
        </Grid>
        <Grid item md={3}>
        <BuyerSidebar/>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} sx={{ marginTop: 10 }}>
        <BidCard />
        </Grid>
      </Grid>
      </>
  )
}

export default CurrentBidsPage