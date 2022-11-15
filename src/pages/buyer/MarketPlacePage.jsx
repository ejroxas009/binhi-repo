import React, { useEffect, useState } from "react";
import * as adsService from "../../service/buyer/AdvertisementService";
import MarketPlace from "../../component/shared/MarketPlace";
import BuyerSidebar from "../../component/buyer/BuyerSidebar";
import Appbar from "../../component/shared/appbar/Appbar";
import Grid from "@mui/material/Grid";

const MarketPlacePage = () => {
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
      <Grid container>
        <Grid item xs={12}>
          <Appbar />
        </Grid>
        <Grid item md={3}>
          <BuyerSidebar />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ marginTop: 10 }}>
          {adsList && (
            <MarketPlace
              adsList={adsList}
              onSetAdsListToggle={setAdsListToggle}
              adsListToggle={adsListToggle}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default MarketPlacePage;
