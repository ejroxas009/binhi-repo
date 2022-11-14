import { Box, Container } from '@mui/material'
import React, { useState, useEffect } from 'react'
import AdminAppbar from '../../../component/admin/appbar/AdminAppbar'
import AdminSidebar from '../../../component/admin/sidebar/AdminSidebar'
import ComplaintsTable from '../../../component/admin/tables/ComplaintsTable/ComplaintsTable'
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
      <AdminAppbar/>
      <AdminSidebar/>
      <Container fixed>
          <Box mt={20}>
            {complaintsList &&(
              <ComplaintsTable details={complaintsList}/>
            )}
          </Box>
        </Container>
    </>
  )
}

export default ComplaintsPage