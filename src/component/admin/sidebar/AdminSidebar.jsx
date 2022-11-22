import React, { useEffect, useState } from "react";
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

import { v4 } from "uuid";
import { storage } from "../../../service/shared/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  getAccountById,
  changePW,
  changeProfileImage,
  editAccount,
} from "../../../service/shared/accountService";
import jwtDecode from "jwt-decode";
//----MUI-----------
import Avatar from "@mui/material/Avatar";

const drawerWidth = 240;

export default function AdminSidebar() {
  const [account, setAccount] = React.useState();
  const [toggle, setToggle] = React.useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [profileImageOpen, setProfileImageOpen] = useState(false);
  const [confirmNewPW, setConfirmNewPW] = useState("");
  const [changePWForm, setChangePWForm] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [profileImgForm, setProfileImgForm] = useState({
    profileImage: "",
  });
  const [proileImgToggle, setProfileImgToggle] = useState(false);

  const [profileImageUpload, setProfileImageUpload] = useState(null);
  const [profileImageRef, setProfileImageRef] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [profileImageToggle, setProfileImageToggle] = useState(false);
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
    //setProfileImg(account.profileImg);
    // console.log(profileImg);
  }, [toggle]);

  const handleChange = (event) => {
    setAccount({
      ...account,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  //------For change password----------------------
  const handlePWChange = (event) => {
    setChangePWForm({
      ...changePWForm,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleConfirmNewPWChange = (event) => {
    setConfirmNewPW(event.target.value);
  };

  const handleChangePWSubmit = async (event) => {
    event.preventDefault();
    console.log(changePWForm);
    console.log(account);
    const res = await changePW(account.accountId, changePWForm);
    console.log(res);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //-------end of change password -------------

  //------------Change profile Image ------------------
  const handleOpenProfileImage = () => setProfileImageOpen(true);
  const handleCloseProfileImage = () => setProfileImageOpen(false);
  const uploadProfileImage = async () => {
    if (profileImageUpload == null) return;
    const profileImageRef = ref(
      storage,
      `profile-image-testing/${profileImageUpload.name + v4()}`
    );
    setProfileImageRef(profileImageRef);
    try {
      console.log("uploading");
      await uploadBytes(profileImageRef, profileImageUpload);
      const url = await getDownloadURL(profileImageRef);

      return url;
    } catch {}
  };

  const handleSubmitProfileImage = async (event) => {
    event.preventDefault();
    console.log("Submitted");
    const url = await uploadProfileImage();
    console.log(typeof url);
    setProfileImgForm({
      profileImage: url,
    });
    setProfileImageToggle(!profileImageToggle);
    console.log(profileImgForm);

    alert("success");
  };

  //----ProfileImage toggle----
  useEffect(() => {
    console.log(profileImgForm);
    const changeProfileImageFunction = async () => {
      if (profileImgForm.profileImage !== "") {
        const res = await changeProfileImage(account.accountId, profileImgForm);
        console.log(res);
        handleCloseProfileImage();
        window.location.reload();
      }
    };

    changeProfileImageFunction();
  }, [profileImageToggle]);

  //---------end of profileImage---------------

  const handleSubmitEditAccount = async (event) => {
    event.preventDefault();
    const res = await editAccount(account.accountId, account);
    console.log(res);
    setIsEdit(false);
  };
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
              {account && (
                <ListItemButton LinkComponent={Link} to="/admin/profile">
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
                <ListItemButton LinkComponent={Link} to="/admin/crops">
                  <ListItemIcon>
                    <DashboardRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Crops"} />
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