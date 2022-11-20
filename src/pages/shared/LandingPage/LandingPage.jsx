import React from 'react'
import { Box, Button, Container, Fab, Grid, ThemeProvider, Typography } from '@mui/material';
import Banner from '../../../component/shared/banner/banner';
import { Colors } from '../../../styles/Theme/Theme';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { fullWidthClassName, noScrollbarsClassName, RemoveScrollBar } from 'react-remove-scroll-bar';
import LandingAppbar from './LandingAppbar';
import { Link } from "react-router-dom";
import LandingPageCard from '../../../component/shared/Cards/LandingPageCard';
import FarmerBanner from "../../../assets/images/farmerbanner.jpg";
import Appbar from '../../../component/shared/Appbar';

import * as accountService from "../../../service/shared/accountService"



const landingpage = () => {
  const accessToken = accountService.getAccessToken(); 
  
  return (
    
    <React.Fragment>
    <LandingAppbar/>
    <div className={noScrollbarsClassName}/>
      <div className={fullWidthClassName}/>
      <RemoveScrollBar/>
    <Box sx={{
      display: 'flex',
      height:"100vh",
      width:"100vw",
      backgroundColor: 'primary.white',
      backgroundImage: `url(${FarmerBanner})`,
      backgroundRepeat  : 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      flexGrow: 1,
      marginTop: 10
    }}>
      <Grid container spacing={2}>
      {( accessToken ) ? (
          <Grid mt={10}  container
          direction="row"
          justifyContent="center"
          alignItems="center">
            <Button 
            size="large" 
            variant="contained" 
            LinkComponent={Link} 
            to="/admin/dashboard" 
            sx={{borderRadius:5, marginLeft:2}} >
              Go to Dashboard
            </Button>
          </Grid>
        ) : (
          <Grid mt={10}  container
          direction="row"
          justifyContent="center"
          alignItems="center" >
        
          <Button 
          size="large" 
          variant="contained" 
          LinkComponent={Link} 
          to="/login" 
          sx={{borderRadius:5, marginRight:2}}>
            Login
          </Button>

          <Button 
          size="large" 
          variant="outlined" 
          LinkComponent={Link} 
          to="/register" 
          sx={{borderRadius:5, marginLeft:2}} >
            Register
          </Button>
        </Grid>
        )}
      </Grid>
    </Box>
    
    </React.Fragment>
  )
}

export default landingpage