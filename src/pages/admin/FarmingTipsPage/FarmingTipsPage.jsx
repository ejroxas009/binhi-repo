import { Box } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import AdminAppbar from '../../../component/admin/appbar/AdminAppbar'
import FarmingTipsCard from '../../../component/admin/Cards/FarmingTips/FarmingTipsData'
import AdminSidebar from '../../../component/admin/sidebar/AdminSidebar'
import * as farmingTipsService from '../../../service/admin/farmingTipsService'

const FarmingTipsPage = () => {
  const [contentTips, setcontentTips] = useState();
  const [contentTipsToggle, setcontentTipsToggle] = useState();

  useEffect(() => {
    const viewTips = async () => {
      const res = await farmingTipsService.viewTips();
      setcontentTips(res.data);
    }
    
    viewTips();
    setcontentTipsToggle(!contentTipsToggle);
  },[])

  useEffect(() => {
    console.log(contentTips);
  },[contentTipsToggle])
  return (
    <>
      <AdminAppbar/>
      <AdminSidebar/>
      <Container fixed>
        <Box mt={20}>
          {contentTips &&(
            <FarmingTipsCard content={contentTips}/>
          )}
        </Box>
      </Container>
    </>
  )
}

export default FarmingTipsPage