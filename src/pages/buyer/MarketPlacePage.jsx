import React, { useEffect, useState } from "react";
import * as adsService from "../../service/buyer/AdvertisementService";
import MarketPlace from "../../component/shared/MarketPlace";

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
  return <>{adsList && <MarketPlace adsList={adsList} />}</>;
};

export default MarketPlacePage;
