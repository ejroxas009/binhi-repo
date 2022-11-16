import { Box, Container } from '@mui/material'
import React from 'react'
import AdminAppbar from '../../../component/admin/appbar/AdminAppbar'
import AdminSidebar from '../../../component/admin/sidebar/AdminSidebar'
import Profile from '../../../component/shared/Profile'

const AdminProfile = () => {
  return (
    <>
      <AdminAppbar/>
      <AdminSidebar/>
      <Box sx={{marginLeft:25, marginTop:15}}>
      <Profile/>
      </Box>
      
    </>
  )
}

export default AdminProfile