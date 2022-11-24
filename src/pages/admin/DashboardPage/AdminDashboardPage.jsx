import { Box, Container, Grid } from '@mui/material'
import React from 'react'
import AdminAppbar from '../../../component/admin/appbar/AdminAppbar'
import DashboardCards from '../../../component/admin/Cards/Dashboard/DashboardCards'
import AdminSidebar from '../../../component/admin/sidebar/AdminSidebar'
import Appbar from '../../../component/shared/Appbar'
import DashboardCard from '../../../component/shared/DashboardCard'

const AdminDashboardPage = () => {
  return (
    <>
      <Appbar/>
      <AdminSidebar/>
      <Grid container mt={10}>
        <Container>
          <DashboardCard/>
        </Container>
      </Grid>
    </>
  )
}

export default AdminDashboardPage