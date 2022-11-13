import { Box, Container } from '@mui/material'
import React from 'react'
import AdminAppbar from '../../../component/admin/appbar/AdminAppbar'
import AdminSidebar from '../../../component/admin/sidebar/AdminSidebar'
import AdsTable from '../../../component/admin/tables/AdsTable/AdsTable'

const AdvertisementPage = () => {
  return (
    <>
      <AdminAppbar/>
      <AdminSidebar/>
      <Container fixed>
      <Box mt={20}>
        <AdsTable/>
      </Box>
      </Container>
      
    </>
  )
}

export default AdvertisementPage