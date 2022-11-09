import React from 'react'
import { Box, Button, Fab, Grid, ThemeProvider, Typography } from '@mui/material';
import Banner from '../../../component/shared/banner/banner';
import NavigationIcon from '@mui/icons-material/Navigation';
import { Colors } from '../../../styles/Theme/Theme';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Appbar from '../../../component/shared/appbar';
import Sidebar from '../../../component/shared/sidebar/Sidebar';
import Home from '../../../component/shared/sidebar/SidebarData';

const landingpage = () => {
  return (
    
    <>
    
    <Sidebar/>
    <Grid>
      <Box sx={{ display: 'flex' }}>
          <Banner ml="2"/>
          <Box textAlign='center'>
              <Fab variant="extended" sx={{
              position: "absolute",
              bottom: (theme) => theme.spacing(37),
              left: (theme) => theme.spacing(90),
              backgroundColor:Colors.gold
              }}>
                  Login
                  <KeyboardArrowRightIcon sx={{ ml: 1 }} />
              </Fab>
              <Fab variant="extended" sx={{
              position: "absolute",
              bottom: (theme) => theme.spacing(37),
              right: (theme) => theme.spacing(90),
              backgroundColor:Colors.olive
              }}>
                  Register
                  <KeyboardArrowRightIcon sx={{ ml: 2 }} />
              </Fab>
          </Box>
      </Box>
      </Grid>
    </>
  )
}

export default landingpage