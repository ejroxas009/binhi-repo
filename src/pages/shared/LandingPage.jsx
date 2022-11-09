import React from 'react'
import { Box, Button, Fab, ThemeProvider, Typography } from '@mui/material';
import Banner from '../../component/shared/banner/banner';
import NavigationIcon from '@mui/icons-material/Navigation';
import { Colors } from '../../styles/Theme/Theme';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Appbar from '../../component/shared/appbar';
import Sidebar from '../../component/shared/sidebar/Sidebar';

const landingpage = () => {
  return (
    <>
    <Appbar />
      <Box sx={{ display: 'flex' }}>
          <Banner />
          <Box textAlign='center'>
              <Fab variant="extended" sx={{
              position: "absolute",
              bottom: (theme) => theme.spacing(43),
              left: (theme) => theme.spacing(90),
              backgroundColor:Colors.gold
              }}>
                  Login
                  <KeyboardArrowRightIcon sx={{ ml: 1 }} />
              </Fab>
              <Fab variant="extended" sx={{
              position: "absolute",
              bottom: (theme) => theme.spacing(43),
              right: (theme) => theme.spacing(90),
              backgroundColor:Colors.olive
              }}>
                  Register
                  <KeyboardArrowRightIcon sx={{ ml: 2 }} />
              </Fab>
          </Box>
      </Box>
    </>
  )
}

export default landingpage