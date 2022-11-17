import { Box } from '@mui/material'
import React, { useState, useEffect } from 'react'
import AdminAppbar from '../../../component/admin/appbar/AdminAppbar'
import AdminSidebar from '../../../component/admin/sidebar/AdminSidebar'
import MarketPlace from '../../../component/shared/MarketPlace'
import * as adsService from "../../../service/buyer/AdvertisementService";

const AdvertisementPage = () => {
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
  // const [adsList, setAdsList] = useState();
  // const [adsListToggle, setAdsListToggle] = useState();

  // useEffect(() => {
  //   const viewAds = async () => {
  //     const res = await adService.viewAds()
  //     setAdsList(res.data); 
  //   }
    
  //   viewAds();
  //   setAdsListToggle(!adsListToggle);
  // },[])

  // useEffect(() => {
  //   console.log(adsList);
  // },[adsListToggle])
  return (
    <>
      {/* <AdminAppbar/>
      <AdminSidebar/>
      <Container fixed>
      <Box mt={20}>
      {adsList &&(
              <AdsTable details={adsList}/>
            )}
      </Box>
      </Container> */}
      <AdminAppbar/>
      <AdminSidebar/>
      <Box mt={10}>
        {adsList && <MarketPlace adsList={adsList} />}
      </Box>
      
      </>
  )
}

export default AdvertisementPage