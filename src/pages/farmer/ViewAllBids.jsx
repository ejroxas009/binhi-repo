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

  const [bidsList, setBidsList] = useState();
  const [bidsListToggle, setBidsListToggle] = useState();

  const getAdsById = async () => {
    const res = await adsService.getAdsById(+params.id);
    // console.log(res.data);

    setBidsList(res.data);
    setBidsListToggle(!bidsListToggle);
  };

  useEffect(() => {
    getAdsById();
  }, []);

  return (
    <>
      <Appbar />
      <FarmerSidebar />
      <Container fixed>
        <Box mt={15}>
          {bidsList && (<ViewAllBidsTable bidsList={bidsList}/> )}
        </Box>
      </Container>
    </>
  );
};

export default ViewAllBids;
