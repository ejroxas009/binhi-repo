import { Box, Container, Grid } from "@mui/material";
import React from "react";
import AdminAppbar from "../../../component/admin/appbar/AdminAppbar";
import DashboardCards from "../../../component/admin/Cards/Dashboard/DashboardCards";
import AdminSidebar from "../../../component/admin/sidebar/AdminSidebar";
import Appbar from "../../../component/shared/Appbar";
import DashboardCard from "../../../component/shared/DashboardCard";
import AdminDashboard from "../../../component/admin/AdminDashboard";

const AdminDashboardPage = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Appbar />
        </Grid>
        <Grid item md={3}>
          <AdminSidebar />
        </Grid>

        <Grid item xs={12} sm={12} md={9} lg={8} sx={{ marginTop: 15 }}>
          <AdminDashboard />
        </Grid>
      </Grid>
    </>
  );
};

export default AdminDashboardPage;
