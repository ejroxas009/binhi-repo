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
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import { Navigate, useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';

import { v4 } from "uuid";
import { storage } from "../../service/shared/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  getAccountById,
  changePW,
  changeProfileImage,
  editAccount,
} from "../../service/shared/accountService";
import jwtDecode from "jwt-decode";
//----MUI-----------
import Avatar from "@mui/material/Avatar";
import { LogoStyle } from "../../styles/Appbar/AppbarStyles";
import Logo from "../../assets/images/Logo.png";
import { Container, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";

export default function Appbar({accessToken}){
  
  const navigate = useNavigate();

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


  //From MUI
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = ['Logout'];
    return(
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src={Logo} style={LogoStyle} />
          </Typography>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src={Logo} style={LogoStyle} />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {(accessToken && account) && (
                    <Avatar
                        alt="Profile"
                        src={account.profileImg}
                        sx={{ width: 50, height: 50 }}
                    />
                    )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => {
                  localStorage.removeItem("accessToken");
                  navigate("/");
                  handleCloseUserMenu();
                  
                }}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
            
      </AppBar>

    );
}