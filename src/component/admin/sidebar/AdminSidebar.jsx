import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Link } from "react-router-dom";
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';

const drawerWidth = 240;

export default function AdminSidebar() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', marginTop:'20px', }}>
          <List>
            

              <ListItem disablePadding>
                <ListItemButton LinkComponent={Link} to="/admin/dashboard">
                  <ListItemIcon>
                    <DashboardRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Dashboard"} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton LinkComponent={Link} to="/admin/ads">
                  <ListItemIcon>
                    <DashboardRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Advertisements"} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton LinkComponent={Link} to="/admin/courses">
                  <ListItemIcon>
                    <DashboardRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Courses"} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton LinkComponent={Link} to="/admin/complaints">
                  <ListItemIcon>
                    <DashboardRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Complaints"} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton LinkComponent={Link} to="/admin/farmingtips">
                  <ListItemIcon>
                    <DashboardRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Farming Tips"} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton LinkComponent={Link} to="/admin/users">
                  <ListItemIcon>
                    <DashboardRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Users"} />
                </ListItemButton>
              </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}