import { Box, Container } from '@mui/material'
import React, { useState, useEffect } from 'react'
import AdminAppbar from '../../../component/admin/appbar/AdminAppbar'
import AdminSidebar from '../../../component/admin/sidebar/AdminSidebar'
import UserTable from '../../../component/admin/tables/UserTable/UserTable'
import * as userService from '../../../service/admin/userService'




const Users = () => {
  const [accountList, setAccountList] = useState();
  useEffect(() => {
    const viewUsers = async () => {
      const res = await userService.viewAccount()
      console.log(res.data);
    }
    viewUsers();
  },[])

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