import React from 'react'
import { Box, Button, Fab, Grid, ThemeProvider, Typography } from '@mui/material';
import Banner from '../../../component/shared/banner/banner';
import { Colors } from '../../../styles/Theme/Theme';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { fullWidthClassName, noScrollbarsClassName, RemoveScrollBar } from 'react-remove-scroll-bar';
import LandingAppbar from './LandingAppbar';
import { Link } from "react-router-dom";


const landingpage = () => {
  
  return (
    
    <>
    <LandingAppbar/>
    <Grid>
      <Box sx={{ display: 'flex' }}>
        <div className={noScrollbarsClassName}/>
        <div className={fullWidthClassName}/>
        <RemoveScrollBar/>
          <Banner />
          
          <Box textAlign='center'>
              <Fab variant="extended" sx={{
              position: "absolute",
              bottom: (theme) => theme.spacing(45),
              left: (theme) => theme.spacing(90),
              backgroundColor:Colors.gold
              }}
              LinkComponent={Link} to="/login"
              >
                  Login
                  <KeyboardArrowRightIcon sx={{ ml: 1 }} />
              </Fab>
              <Fab variant="extended" sx={{
              position: "absolute",
              bottom: (theme) => theme.spacing(45),
              right: (theme) => theme.spacing(90),
              backgroundColor:Colors.olive
              }}
              LinkComponent={Link} to="/register"
              >
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