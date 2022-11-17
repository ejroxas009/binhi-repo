import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//material
import { Grid } from "@mui/material";

//service
import * as adsService from "../../service/buyer/AdvertisementService";

//components
import BuyerSidebar from "../../component/buyer/BuyerSidebar";
import ViewAllBidsTable from "../../component/farmer/ViewAllBidsTable";
import Appbar from "../../component/shared/appbar/Appbar";

const ViewMyBids = () => {
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
          <BuyerSidebar />
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} sx={{ marginTop: 15 }}>
            {bids && <ViewAllBidsTable bids={bids} />}
        </Grid>
      </Grid>
    </>
  );
};

export default ViewMyBids;
