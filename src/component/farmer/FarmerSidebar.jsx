import React from "react";
import { Link } from "react-router-dom";

//material UI
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

const drawerWidth = 240;

const FarmerSidebar = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", marginTop: "20px" }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton LinkComponent={Link} to="/farmer/dashboard">
                <ListItemIcon>
                  <DashboardRoundedIcon />
                </ListItemIcon>
                <ListItemText primary={"Dashboard"} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton LinkComponent={Link} to="/farmer/myProfile">
                <ListItemIcon>
                  <DashboardRoundedIcon />
                </ListItemIcon>
                <ListItemText primary={"Profile"} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton LinkComponent={Link} to="/farmer/marketplace">
                <ListItemIcon>
                  <DashboardRoundedIcon />
                </ListItemIcon>
                <ListItemText primary={"Marketplace"} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton LinkComponent={Link} to="/farmer/transactions">
                <ListItemIcon>
                  <DashboardRoundedIcon />
                </ListItemIcon>
                <ListItemText primary={"Transaction History"} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton LinkComponent={Link} to="/farmer/Courses">
                <ListItemIcon>
                  <DashboardRoundedIcon />
                </ListItemIcon>
                <ListItemText primary={"Courses"} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton LinkComponent={Link} to="/farmer/myCurrentBids">
                <ListItemIcon>
                  <DashboardRoundedIcon />
                </ListItemIcon>
                <ListItemText primary={"My Current Bids"} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton LinkComponent={Link} to="/farmer/myCurrentAds">
                <ListItemIcon>
                  <DashboardRoundedIcon />
                </ListItemIcon>
                <ListItemText primary={"My Current Ads"} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton LinkComponent={Link} to="/farmer/myComplaints">
                <ListItemIcon>
                  <DashboardRoundedIcon />
                </ListItemIcon>
                <ListItemText primary={"My Complaints"} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton LinkComponent={Link} to="/farmer/myCourses">
                <ListItemIcon>
                  <DashboardRoundedIcon />
                </ListItemIcon>
                <ListItemText primary={"My Courses"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default FarmerSidebar;