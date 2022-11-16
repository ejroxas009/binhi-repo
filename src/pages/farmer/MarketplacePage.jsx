import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";

//service
import * as adsService from "../../service/buyer/AdvertisementService";

//components
import MarketPlace from "../../component/shared/MarketPlace";
import FarmerSidebar from "../../component/farmer/FarmerSidebar";
import Appbar from "../../component/shared/appbar/Appbar";

const MarketplacePage = () => {
  const [adsList, setAdsList] = useState();
  const [adsListToggle, setAdsListToggle] = useState(false);

  const getAllAdsFunction = async () => {
    const res = await adsService.getAllAds();

    setAdsList(res.data);
    setAdsListToggle(!adsListToggle);
  };
  useEffect(() => {
    getAllAdsFunction();
  }, []);

  useEffect(() => {
    console.log(adsList);
  }, [adsListToggle]);
  return (
    <>
      <Appbar />
      <FarmerSidebar />
      <Container fixed>
        <Box mt={10}>{adsList && <MarketPlace adsList={adsList} />}</Box>
      </Container>
    </>
  );
};

export default MarketplacePage;
