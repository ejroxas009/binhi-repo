import React from "react";

//material
import Grid from "@mui/material/Grid";

//components
import BidCard from "../../component/farmer/BidCard";

const BidContent = () => {
  return (
    <Grid container spacing={2}>
      <Grid item={true} ></Grid>
      <Grid item xs={12}>
        <BidCard />
      </Grid>
    </Grid>
  );
};

export default BidContent;
