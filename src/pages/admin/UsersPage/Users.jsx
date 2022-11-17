import { Box, Container } from '@mui/material'
import React, { useState, useEffect } from 'react'
import AdminAppbar from '../../../component/admin/appbar/AdminAppbar'
import AdminSidebar from '../../../component/admin/sidebar/AdminSidebar'
import UserTable from '../../../component/admin/tables/UserTable/UserTable'
import * as userService from '../../../service/admin/userService'




const Users = () => {

  const [userList, setUserList] = useState();
  const [userListToggle, setUserListToggle] = useState();

  useEffect(() => {
    const viewUsers = async () => {
      const res = await userService.viewAccount()
      setUserList(res.data);
    }
    
    viewUsers();
    setUserListToggle(!userListToggle);
  },[])

  useEffect(() => {
    console.log(userList);
  },[userListToggle])

  return (
    <>
        <AdminSidebar/>
        <Container fixed>
          <Box mt={20}>
            {userList &&(
              <UserTable list={userList}/>
            )}
          </Box>
        </Container>
    </>
  )
}

export default Users