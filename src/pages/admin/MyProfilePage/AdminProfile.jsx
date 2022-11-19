import { Box, Container } from '@mui/material'
import React from 'react'
import AdminAppbar from '../../../component/admin/appbar/AdminAppbar'
import AdminSidebar from '../../../component/admin/sidebar/AdminSidebar'
import Appbar from '../../../component/shared/Appbar'
import Profile from '../../../component/shared/Profile'

const AdminProfile = () => {
  return (
    <>
      <Appbar/>
      <AdminSidebar/>
      <Box sx={{marginLeft:5, marginTop:15}}>
      <Profile/>
      </Box>
      
    </>
  )
}

export default AdminProfile