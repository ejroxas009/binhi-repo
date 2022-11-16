import React from "react";
import { Box, Container } from '@mui/material'

//components
import ComplaintsTable from "../../component/farmer/ComplaintsTable";
import FarmerSidebar from "../../component/farmer/FarmerSidebar";
import Appbar from "../../component/shared/appbar/Appbar";

const MyComplaints = () => {
  return (
    <>
      <Appbar />
      <FarmerSidebar />
      <Container fixed>
        <Box mt={15}>
          <ComplaintsTable />
        </Box>
      </Container>
    </>
  );
};

export default MyComplaints;
