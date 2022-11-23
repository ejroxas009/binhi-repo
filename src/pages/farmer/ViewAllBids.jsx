import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//material
import { Grid } from "@mui/material";

//service
import * as adsService from "../../service/buyer/AdvertisementService";

//components
import FarmerSidebar from "../../component/farmer/FarmerSidebar";
import ViewAllBidsTable from "../../component/farmer/ViewAllBidsTable";
import Appbar from "../../component/shared/Appbar";

const ViewAllBids = () => {
  const params = useParams();

  const [bids, setBids] = useState();
  const [bidsToggle, setBidsToggle] = useState(false);

  useEffect(() => {
    const getBidsByAds = async () => {
      const res = await adsService.getAdsById(+params.id);
      console.log(res.data);
      setBids(res.data);
      setBidsToggle(!bidsToggle);
    };

    getBidsByAds();
  }, []);

  useEffect(() => {
    console.log(bids);
  }, [bidsToggle]);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Appbar />
        </Grid>
        <Grid item md={3}>
          <FarmerSidebar />
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} sx={{ marginTop: 15 }}>
          {bids && <ViewAllBidsTable bids={bids} />}
        </Grid>
      </Grid>
    </>
  );
};

export default ViewAllBids;
