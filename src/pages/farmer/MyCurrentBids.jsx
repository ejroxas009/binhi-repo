import React from "react";

//material
import Grid from "@mui/material/Grid";

//components
import BidContent from "../../component/farmer/BidContent";

const MyCurrentBids = () => {
  return (
    <Grid container direction="row">
      <Grid item container={true}>
        <Grid sm={2} />
        <Grid xs={12} sm={8}>
          <BidContent />
        </Grid>
        <Grid sm={2} />
      </Grid>
    </Grid>
  );
};

export default MyCurrentBids;
