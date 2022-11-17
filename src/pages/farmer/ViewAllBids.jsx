import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//material
import { Box, Container } from "@mui/material";

//service
import * as adsService from "../../service/buyer/AdvertisementService";

//components
import FarmerSidebar from "../../component/farmer/FarmerSidebar";
import ViewAllBidsTable from "../../component/farmer/ViewAllBidsTable";
import Appbar from "../../component/shared/appbar/Appbar";

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
      <Appbar />
      <FarmerSidebar />
      <Container fixed>
        <Box mt={15}>{bids && <ViewAllBidsTable bids={bids} />}</Box>
      </Container>
    </>
  );
};

export default ViewAllBids;
