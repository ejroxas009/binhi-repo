import { Box, Container } from '@mui/material'
import React, { useState, useEffect } from 'react'
import AdminAppbar from '../../../component/admin/appbar/AdminAppbar'
import ViewDetailsModal from '../../../component/admin/modals/ViewDetailsModal/ViewDetailsModal'
import AdminSidebar from '../../../component/admin/sidebar/AdminSidebar'
import UserTable from '../../../component/admin/tables/UserTable/UserTable'
import Appbar from '../../../component/shared/Appbar'
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


  //View Details Modal
  const [detailsOpen, setDetailsOpen] = useState(false);
  const handleDetailsOpen = () => setDetailsOpen(true);
  const handleDetailsClose = () => setDetailsOpen(false);

  return (
    <>
        <Appbar/>
        <AdminSidebar/>
        <Container fixed>
          <Box mt={20}>
            {userList &&(
              <UserTable 
              list={userList}
              onSetUserListToggle={setUserListToggle}
              userListToggle={userListToggle}
              />
            )}
          </Box>
        </Container>
    </>
  )
}

export default Users