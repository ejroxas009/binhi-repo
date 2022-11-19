import { Grid } from '@mui/material'
import React, { useState, useEffect } from 'react'
import AdminAppbar from '../../../component/admin/appbar/AdminAppbar'
import AdminSidebar from '../../../component/admin/sidebar/AdminSidebar'
import ComplaintsTable from '../../../component/admin/tables/ComplaintsTable/ComplaintsTable'
import Appbar from '../../../component/shared/Appbar'
import * as complaintService from '../../../service/admin/complaintService'

const ComplaintsPage = () => {
  const [complaintsList, setComplaintsList] = useState();
  const [complaintsListToggle, setComplaintsListToggle] = useState();

  useEffect(() => {
    const viewComplaints = async () => {
      const res = await complaintService.viewComplaints();
      console.log(res.data);
      setComplaintsList(res.data);
    }
    
    viewComplaints();
    setComplaintsListToggle(!complaintsListToggle);
  },[])

  useEffect(() => {
    console.log(complaintsList);
  },[complaintsListToggle])
  return (
    <>
        <Grid container>
        <Grid item xs={12}>
          <Appbar />
        </Grid>
        <Grid item md={3}>
          <AdminSidebar />
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} sx={{ marginTop: 15 }}>
        {complaintsList &&(
              <ComplaintsTable details={complaintsList}/>
            )}
        </Grid>
      </Grid>
    </>
  )
}

export default ComplaintsPage