import { Grid } from '@mui/material'
import React, { useState, useEffect } from 'react'
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

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Appbar />
        </Grid>
        <Grid item md={3}>
          <AdminSidebar />
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} sx={{ marginTop: 10 }}>
        {userList &&(
              <UserTable 
              list={userList}
              onSetUserListToggle={setUserListToggle}
              userListToggle={userListToggle}
              />
            )}
        </Grid>
      </Grid>
    </>
  )
}

export default Users