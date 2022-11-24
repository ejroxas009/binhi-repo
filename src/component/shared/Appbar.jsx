import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

import * as accountService from "../../service/shared/accountService"

import { getAccountById, changeProfileImage } from "../../service/shared/accountService";
import jwtDecode from "jwt-decode";

//----MUI-----------
import Avatar from "@mui/material/Avatar";
import { LogoStyle } from "../../styles/Appbar/AppbarStyles";
import Logo from "../../assets/images/Logo.png";
import { Button, Container, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";




export default function Appbar({ onLogout }){
  
  const navigate = useNavigate();

  const handleLogout = () => {
    accountService.logout();
    navigate("/")
    window.location.reload();
    
  };
 
  const [account, setAccount] = React.useState();
  const [toggle, setToggle] = React.useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [profileImageOpen, setProfileImageOpen] = useState(false);

  const [profileImgForm, setProfileImgForm] = useState({
    profileImage: "",
  });

  //accessToken
  const accessToken = accountService.getAccessToken(); 

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

  //------------Change profile Image ------------------
  const handleOpenProfileImage = () => setProfileImageOpen(true);
  const handleCloseProfileImage = () => setProfileImageOpen(false);

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
              {( account && (
                    <Avatar
                        alt="Profile Image"
                        src={account.profileImg}
                        sx={{ width: 50, height: 50 }}
                    />
                    ))}
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
                <MenuItem key={setting}
                onClick={() => {
                  handleCloseUserMenu();
                  handleLogout();
                }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
            
      </AppBar>

    );
}