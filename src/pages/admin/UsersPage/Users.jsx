import { Box, Container } from '@mui/material'
import React from 'react'
import AdminAppbar from '../../../component/admin/appbar/AdminAppbar'
import AdminSidebar from '../../../component/admin/sidebar/AdminSidebar'
import UserTable from '../../../component/admin/tables/UserTable/UserTable'

const Users = () => {
  return (
    <>
        <AdminAppbar/>
        <AdminSidebar/>
        <Container fixed>
          <Box mt={20}>
            <UserTable/>
          </Box>
        </Container>
        
        
    </>
  )
}

export default Users