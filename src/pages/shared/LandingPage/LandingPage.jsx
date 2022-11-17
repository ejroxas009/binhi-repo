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
              right: (theme) => theme.spacing(10),
              backgroundColor:Colors.gold,
              width: '100px'
              }}
              LinkComponent={Link} to="/login"
              >
                  Sign in
              </Fab>
              <Fab variant="extended" sx={{
              position: "absolute",
              bottom: (theme) => theme.spacing(45),
              right: (theme) => theme.spacing(30),
              backgroundColor:Colors.primary,
              width: '100px'
              }}
              LinkComponent={Link} to="/register"
              >
                  Sign up
              </Fab>
          </Box>
      </Box>
      </Grid>
    </>
  )
}

export default landingpage