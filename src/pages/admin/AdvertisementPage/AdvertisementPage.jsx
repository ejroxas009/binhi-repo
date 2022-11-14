import { Box, Container } from '@mui/material'
import React, { useState, useEffect } from 'react'
import AdminAppbar from '../../../component/admin/appbar/AdminAppbar'
import AdminSidebar from '../../../component/admin/sidebar/AdminSidebar'
import AdsTable from '../../../component/admin/tables/AdsTable/AdsTable'
import * as adService from '../../../service/admin/adService'

const AdvertisementPage = () => {
  const [adsList, setAdsList] = useState();
  const [adsListToggle, setAdsListToggle] = useState();

  useEffect(() => {
    const viewAds = async () => {
      const res = await adService.viewAds()
      setAdsList(res.data); 
    }
    
    viewAds();
    setAdsListToggle(!adsListToggle);
  },[])

  useEffect(() => {
    console.log(adsList);
  },[adsListToggle])
  return (
    <>
      <AdminAppbar/>
      <AdminSidebar/>
      <Container fixed>
      <Box mt={20}>
      {adsList &&(
              <AdsTable details={adsList}/>
            )}
      </Box>
      </Container>
      
    </>
  )
}

export default AdvertisementPage