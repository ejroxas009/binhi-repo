import React, { useEffect, useState } from "react";
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
import Avatar from "@mui/material/Avatar";
import Divider from '@mui/material/Divider';

//icons
import StorefrontIcon from '@mui/icons-material/Storefront';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import FeedbackIcon from '@mui/icons-material/Feedback';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import DvrIcon from '@mui/icons-material/Dvr';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

import { getAccountById } from "../../service/shared/accountService";
import jwtDecode from "jwt-decode";

const drawerWidth = 240;

const FarmerSidebar = () => {
  const [account, setAccount] = useState();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const decoded = jwtDecode(token);
    const getCurrentAccount = async (id) => {
      const res = await getAccountById(id);
      setAccount(res.data);
      setToggle(!toggle);
    };

    getCurrentAccount(decoded.id);
  }, []);

  useEffect(() => {
    console.log(account);
  }, [toggle]);

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
              {account && (
                <ListItemButton LinkComponent={Link} to="/farmer/profile">
                  <ListItemIcon>
                  
                  <Avatar
                    alt="Profile Image"
                    src={account.profileImg}
                    sx={{ width: 50, height: 50 }}
                  />
                  
                  </ListItemIcon>
                  <ListItemText disableTypography sx={{ fontWeight: 'bold' }} primary={account.username} />
                </ListItemButton>
                )}
              </ListItem>
              <Divider />

            <ListItem disablePadding>
              <ListItemButton LinkComponent={Link} to="/farmer/dashboard">
                <ListItemIcon>
                  <DashboardRoundedIcon />
                </ListItemIcon>
                <ListItemText primary={"Dashboard"} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton LinkComponent={Link} to="/farmer/marketplace">
                <ListItemIcon>
                  <StorefrontIcon />
                </ListItemIcon>
                <ListItemText primary={"Marketplace"} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                LinkComponent={Link}
                to="/farmer/transaction-history"
              >
                <ListItemIcon>
                  <ReceiptLongIcon />
                </ListItemIcon>
                <ListItemText primary={"Transaction History"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton LinkComponent={Link} to="/farmer/my-orders">
                <ListItemIcon>
                  <ShoppingCartCheckoutIcon />
                </ListItemIcon>
                <ListItemText primary={"My Orders"} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton LinkComponent={Link} to="/farmer/courses">
                <ListItemIcon>
                  <MenuBookIcon />
                </ListItemIcon>
                <ListItemText primary={"Courses"} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton LinkComponent={Link} to="/farmer/current-ads">
                <ListItemIcon>
                  <DvrIcon />
                </ListItemIcon>
                <ListItemText primary={"My Current Ads"} />
              </ListItemButton>
            </ListItem>
            
            <ListItem disablePadding>
              <ListItemButton LinkComponent={Link} to="/farmer/current-bids">
                <ListItemIcon>
                  <SpeakerNotesIcon />
                </ListItemIcon>
                <ListItemText primary={"My Current Bids"} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton LinkComponent={Link} to="/farmer/complaints">
                <ListItemIcon>
                  <FeedbackIcon />
                </ListItemIcon>
                <ListItemText primary={"My Complaints"} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                LinkComponent={Link}
                to="/farmer/enrolled-courses"
              >
                <ListItemIcon>
                  <LocalLibraryIcon />
                </ListItemIcon>
                <ListItemText primary={"My Courses"} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton LinkComponent={Link} to="/farmer/farming-tips">
                <ListItemIcon>
                  <TipsAndUpdatesIcon />
                </ListItemIcon>
                <ListItemText primary={"Farming Tips"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default FarmerSidebar;
