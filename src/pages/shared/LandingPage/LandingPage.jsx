import React from 'react'
import { Box, Button, Container, Fab, Grid, ThemeProvider, Typography } from '@mui/material';
import Banner from '../../../component/shared/banner/banner';
import { Colors } from '../../../styles/Theme/Theme';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { fullWidthClassName, noScrollbarsClassName, RemoveScrollBar } from 'react-remove-scroll-bar';
import LandingAppbar from './LandingAppbar';
import { Link } from "react-router-dom";
import LandingPageCard from '../../../component/shared/Cards/LandingPageCard';
import FarmerBanner from "../../../assets/images/Banner-new.jpg";
import Appbar from '../../../component/shared/Appbar';



const landingpage = () => {
  
  return (
    
    <React.Fragment>
    <Appbar/>
    <div className={noScrollbarsClassName}/>
      <div className={fullWidthClassName}/>
      <RemoveScrollBar/>
    <Box sx={{
      display: 'flex',
      height:"100vh",
      backgroundColor: 'primary.white',
      backgroundImage: `url(${FarmerBanner})`,
      backgroundRepeat  : 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'auto',
      flexGrow: 1
    }}>
      <Grid container spacing={2}>
        <Grid mt={25} xs={9} >
          <LandingPageCard/>
        </Grid>
        <Grid mt={20} xs={3} >
          
        </Grid>
      </Grid>
    </Box>
    
    </React.Fragment>
  )
}

export default landingpage