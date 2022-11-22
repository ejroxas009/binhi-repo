import React from 'react'
import { Grid } from '@mui/material'

//components
import Complaints from "../../component/farmer/Complaints";
import BuyerSidebar from "../../component/buyer/BuyerSidebar";
import Appbar from "../../component/shared/appbar/Appbar";

const ComplaintPage = () => {
  return (
   <>
      <Grid container>
        <Grid item xs={12}>
          <Appbar />
        </Grid>
        <Grid item md={3}>
          <BuyerSidebar />
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} sx={{ marginTop: 15 }}>
          <Complaints />
        </Grid>
      </Grid>
   </>
  )
}

export default ComplaintPage