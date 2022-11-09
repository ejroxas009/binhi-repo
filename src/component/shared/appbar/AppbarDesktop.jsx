import { 
  ActionIconsContainerDesktop,
  ActionIconsContainerMobile,
  AppbarContainer,
  AppbarHeader, 
  LogoStyle,
  MyList } from "../../../styles/Appbar/AppbarStyles";
import Logo from "../../../assets/images/Logo-white.png";
import { Divider, IconButton, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';


const settings = ['Profile', 'Logout'];

export default function AppbarDesktop({matches}){

    const Component = matches ? ActionIconsContainerMobile : ActionIconsContainerDesktop
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    return(
      <AppbarContainer >
        <AppbarHeader sx={{justifyContent:'center'}}>
            <img src={Logo} style={LogoStyle} />
        </AppbarHeader>
        <MyList type = "row" sx={{justifyContent:'right'}}>
            <Divider>
              <ListItemButton sx={{textAlign:'center'}}>
                <ListItemText primary="Home" />
              </ListItemButton>
            </Divider>
            <Divider orientation="vertical" flexItem/>
            <Divider>
              <ListItemButton sx={{textAlign:'center'}}>
                <ListItemText primary="About Us" />
              </ListItemButton>
            </Divider>
            <Divider orientation="vertical" flexItem/>
            <Divider>
              <ListItemButton sx={{textAlign:'center'}}>
                <ListItemText primary="Contact" />
              </ListItemButton>
            </Divider>
            <Divider orientation="vertical" flexItem/>
            <Divider>
            
            {/* Avatar Logo */}
            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
            </Divider>
        </MyList>
      </AppbarContainer>
    );
  }